import Vue from '../lib/vue/vue.min';
import * as moment from 'moment';
import * as firebaseModule from './source/firebase';

$(document).ready(() => {
  // This line exists for the purpose of this code not being executed when minified into main.js
  // There's got to be a better way...
  if(!location.pathname.match(/missions.html/) && !location.pathname.match(/code_board.html/) && !location.pathname.match(/droneblocks-admin/)){
    return;
  }

  // This changes the HOME link to simulator instead of chrome_app
  // We do this because by default the home link is hardcoded to chrome and in the simulator case we want to go back to sim
  if (location.search.match(/simulator/)) {
    $('#home-button').attr('href', '/simulator.html');
  } else if (location.search.match(/referrer/)) {
    let url = "/" + location.search.split("=")[1] + ".html";
    $('#home-button').attr('href', url);
  }

  var randomColors = [
    '#ddf3f5', '#a6dcef', '#f2aaaa', '#e36387',
    '#efee9d', '#d1eaa3', '#dbc6eb', '#abc2e8'
  ]
  var cardColors = [];

  const db = firebase.firestore();
  const PAGESIZE = 20;

  const secondQuery = text => {
    const lastLetter = String.fromCharCode(text.charCodeAt(text.length - 1) + 1);
    const query = text.slice(0, -1) + lastLetter;
    return query;
  }

  firebase.auth().onAuthStateChanged(user => {
    if(location.pathname.match(/missions.html/)) {
      new Vue({
        el: '#missions',
        template: `
          <template v-if="missions">
            <div v-if="missions.length">
              <div class="container">
  
                <div class="card">
                  <div class="card-content">
                    <table class="highlight missions-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Created</th>
                          <th>Make Public</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(mission, index) in missions">
                          <td>{{index + 1}}</td>
                          <td><div>{{mission.title}}</div></td>
                          <td>{{mission.createdAt}}</td>
                          <td>{{mission.createdAtShort}}</td>
                          <td>
                            <div class="switch" :id="mission.id">
                              <label>
                                Off
                                <input type="checkbox" checked v-if="mission.is_public">
                                <input type="checkbox" v-if="!mission.is_public">
                                <span class="lever"></span>
                                On
                              </label>
                            </div>
                          </td>
                          <td style="text-align: right;">
                            <button v-on:click="select(mission.id)" class="waves-effect waves-light btn z-depth-0 light-blue">
                              <i class="material-icons">edit</i>
                            </button>
                            <button v-on:click="share(mission.id)" class="waves-effect waves-light btn z-depth-0 light-blue">
                              <i class="material-icons">share</i>
                            </button>
                            <button v-on:click="removeItem(mission.id)" class="waves-effect waves-light btn z-depth-0 materialize-red">
                              <i class="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="center-align pt-20">
              <p>You don't have any missions.</p>
            </div>
          </template>
          <div v-else class="center-align pt-20">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
          </div>`,
        data: {
          missions: undefined
        },
        mounted: function(){
          this.getData();
        },
        updated: function () {
          this.$nextTick(function () {
            this.missions.forEach(mission => {
              $(`#${mission.id}`).find("input[type=checkbox]").on("change",function() {
                var status = $(this).prop('checked');
                db.collection('missions').doc(mission.id).update({
                  is_public: status
                }).then(() => {
                  var description = status ? 'public' : 'private';
                  Materialize.toast(`"${mission.title}" is ${description} now.`, 3000);
                });
              });
            })
          })
        },
        methods: {
          select: function(id) {
            localStorage.removeItem('backup');
            localStorage.setItem('missionId', id);
            
            if (location.search.indexOf('simulator') > -1) {
              location.href = '/simulator.html';
            } else if (location.pathname.indexOf('ios_missions') > -1) {
              location.href = '/ios.html';
            } else if (location.pathname.indexOf('android_missions') > -1) {
              location.href = '/android.html';

            // Added to start simplifying this code branch
            } else if (location.search.indexOf('referrer') > -1) {
              
              location.href = location.search.split("=")[1] + ".html";
          
            } else if (location.search.indexOf('chrome_app') > -1 || aircraft === 'Tello') {
              location.href = '/chrome_app.html';
            } else {
              location.href = '/';
            }
            
          },
          removeItem: function(id) {
            const that = this;
  
            $('#deleteMissionModal').openModal();
  
            $('#deleteMissionButton').off().click(() => {
              db.collection('missions').doc(id).delete();
  
              $('#deleteMissionModal').closeModal();
              that.getData();
  
              if(localStorage.getItem('missionId') === id){
                localStorage.removeItem('missionId');
              }
            })
          },
          share: function(id){
            $("#shareModal").openModal();
    
            if (location.search.indexOf('simulator') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/simulator.html?share=1&missionId=${id}&uid=${user.uid}`);
            // For iOS build 3.0 with camera blocks since we don't want camera blocks for Android or older DB versions on iOS
            } else if (location.pathname.indexOf('ios_missions') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/ios.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else if (location.pathname.indexOf('android_missions') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/android.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else if (aircraft == "Tello") {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/tello.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io?share=1&missionId=${id}&uid=${user.uid}`);
            }
          },
          getData: function() {
            db.collection('missions').where('uid', '==', user.uid).get().then((v) => {
              if(!v.empty){
                this.missions = v.docs
                  .map(v => ({
                    id: v.ref.id,
                    ...v.data()
                  }))
                  .map(v => ({
                    ...v,
                    createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                    createdAt: moment(v.createdAt.toDate()).format('LLL'),
                    createdAtShort: moment(v.createdAt.toDate()).format('l LT')
                  }))
                  .filter(v => {
                    if(v.aircraft === aircraft){
                      return true;
                    }
                    return false;
                  })
                  .sort((a, b) => a.createdAtTime > b.createdAtTime ? -1 : 1);
              }else{
                this.missions = [];
              }
            })
          }
        }
      });
    }

    if(location.pathname.match(/code_board.html/)) {
      
      new Vue({
        el: '#publicMissions',
        template: `
          <template v-if="missions">
            <div>
              <div class="container">
                <div class="row">
                  <form action="#">
                    <p>
                      Sort By:
                    </p>
                    <p>
                      <input class="with-gap" name="group1" type="radio" id="recenMissionFirst" checked />
                      <label for="recenMissionFirst">Recent</label>
                      <input class="with-gap" name="group1" type="radio" id="highRatingFirst" />
                      <label for="highRatingFirst">Popular</label>
                    </p>
                  </form>
                </div>
                <div class="row" v-if="missions.length">
                  <div class="col s12 m3" v-for="(mission, index) in missions" :key="mission.id">
                    <div class="card small">
                      <div class="card-image" :id="index">
                        <h5>
                          {{ mission.title }}
                        </h5>
                      </div>
                      <div class="card-content">
                        <p>
                          Created : {{ mission.createdAt }}
                        </p>
                        <div class="publicMissionShare">
                          <h5 class="likeCount"><small>{{ mission.likeCount || 0 }}</small></h5>
                          <a v-on:click="likeMission(mission)" class="btn-floating halfway-fab waves-effect waves-light pink iconMission"><i class="material-icons">favorite</i>123</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="center-align pt-20">
                  <i v-if="filterIndex > -1" class="fa fa-spinner fa-spin fa-2x"></i>
                  <p v-else>You don't have any missions.</p>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="center-align pt-20">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
          </div>`,
        data: {
          missions: undefined,
          filterIndex: -1,
        },
        mounted: function(){
          this.getData();
        },
        updated: function () {
          this.$nextTick(function () {
            var container = this;
            this.missions.map((mission, index) => {
              $(`#${index}`).css("background-color", cardColors[index]);
              $(`#${index}`).click(function(){
                window.open(`/simulator.html?share=1&missionId=${mission.id}&uid=${mission.uid}`);
              });
            });
            $("#recenMissionFirst").on("change", function () {
              var status = $(this).prop('checked');
              if (status === true) {
                container.missions = [];
                container.filterIndex = 0;
                container.getData();
              }
            });

            $("#highRatingFirst").on("change", function () {
              var status = $(this).prop('checked');
              if (status === true) {
                container.missions = [];
                container.filterIndex = 1;
                container.getData();
              }
            });
          })
        },
        methods: {
          select: function(id) {
            localStorage.removeItem('backup');
            localStorage.setItem('missionId', id);
            
            if (location.search.indexOf('simulator') > -1) {
              location.href = '/simulator.html';
            } else if (location.search.indexOf('chrome_app') > -1 || aircraft === 'Tello') {
              location.href = '/chrome_app.html';
            } else {
              location.href = '/';
            }
            
          },
          removeItem: function(id) {
            const that = this;

            $('#deleteMissionModal').openModal();

            $('#deleteMissionButton').off().click(() => {
              db.collection('missions').doc(id).delete();

              $('#deleteMissionModal').closeModal();
              that.getData();

              if(localStorage.getItem('missionId') === id){
                localStorage.removeItem('missionId');
              }
            })
          },
          share: function(id){
            $("#shareModal").openModal();
    
            if (location.search.indexOf('simulator') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/simulator.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else if (aircraft == "Tello") {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/tello.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io?share=1&missionId=${id}&uid=${user.uid}`);
            }
          },
          likeMission: function (myMission) {
            if (!user) {
              $("#redirectLoginModal").openModal();
              return;
            }
            if (!myMission.likeMembers || (myMission.likeMembers.length === 0)) {
              db.collection('missions').doc(myMission.id).update({
                likeCount: 1,
                likeMembers: [user.uid]
              }).then(() => {
                Materialize.toast(`You liked this mission.`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount = 1;
                    mission.likeMembers = [user.uid];
                  }
                });
              });
              return;
            }
            if (!myMission.likeMembers.includes(user.uid)) {
              db.collection('missions').doc(myMission.id).update({
                likeCount: firebase.firestore.FieldValue.increment(1),
                likeMembers: firebase.firestore.FieldValue.arrayUnion(user.uid),
              }).then(() => {
                Materialize.toast(`You liked this mission`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount++;
                    mission.likeMembers.push(user.uid);
                  }
                });
              });
              return;
            }
            if (myMission.likeMembers.includes(user.uid)) {

              db.collection('missions').doc(myMission.id).update({
                likeCount: firebase.firestore.FieldValue.increment(-1),
                likeMembers: firebase.firestore.FieldValue.arrayRemove(user.uid),
              }).then(() => {
                Materialize.toast(`You disliked this mission`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount--;
                    const index = mission.likeMembers.indexOf(user.uid);
                    mission.likeMembers.splice(index, 1);
                  }
                });
              });
              return;
            }
            /* db.collection('missions').doc(myMission.id).update({
              likeCount: firebase.firestore.FieldValue.increment(1)
            }).then(() => {
              Materialize.toast(`You liked Mission`, 3000);
            }); */
          },
          getData: function () {
            var dataQuery;
            if (this.filterIndex > 0) {
              dataQuery = db.collection('missions').where('is_public', '==', true).orderBy('likeCount', 'desc').limit(100);
            } else {
              dataQuery = db.collection('missions').where('is_public', '==', true).orderBy('createdAt', 'desc').limit(100);
            }
            
            dataQuery.get().then((v) => {
              if (!v.empty) {
                this.missions = v.docs
                  .map(v => ({
                    id: v.ref.id,
                    ...v.data()
                  }))
                  .map(v => ({
                    ...v,
                    createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                    createdAt: moment(v.createdAt.toDate()).format('LLL'),
                    createdAtShort: moment(v.createdAt.toDate()).format('l LT')
                  }))
                  .filter(v => {
                    if (v.aircraft === aircraft) {
                      return true;
                    }
                    return false;
                  });
                if (this.filterIndex < 1) {
                  this.missions.sort((a, b) => a.createdAtTime > b.createdAtTime ? -1 : 1);
                }
                for (var i = 0; i < this.missions.length; i++) {
                  cardColors.push(randomColors[Math.floor(Math.random() * 8)]);
                }
              }else{
                this.missions = [];
              }
            })
          }
        }
      });
    }

    if(location.pathname.match(/droneblocks-admin/)) {
      new Vue({
        el: '#adminSearch',
        template: `
          <template v-if="missions || users">
            <div>
              <div class="container">
                <div class="row">
                  <form action="#">
                    <p>
                      <input class="with-gap" name="group1" type="radio" id="userEmailSearch" checked />
                      <label for="userEmailSearch">Search Users By Email</label>
                      <input class="with-gap" name="group1" type="radio" id="missionTitleSearch" />
                      <label for="missionTitleSearch">Search Missions By Title</label>
                      <button class="waves-effect waves-light btn right" id="passCodeUpdateButton" v-on:click="passCodeModalOpen()">
                        <i class="material-icons left">lock_outline</i>
                        Passcode
                      </button>
                    </p>
                    <div class="input-field">
                      <input id="search" type="search" required>
                      <label class="label-icon search" for="search" id="searchSubmit"><i class="material-icons">search</i></label>
                      <i class="material-icons" id="searchClose">close</i>
                    </div>
                  </form>
                </div>
                <div class="row" v-if="missions && missions.length">
                  <table class="striped responsive highlight" v-if="filterIndex > 0">
                    <thead>
                      <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Likes</th>
                          <th>Public</th>
                          <th>CreatedAt</th>
                      </tr>
                    </thead>
            
                    <tbody>
                      <tr v-for="(mission, index) in missions" :key="mission.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ mission.title }}</td>
                        <td>{{ mission.likeCount || 0 }}</td>
                        <td>{{ mission.is_public || false }}</td>
                        <td>{{ mission.createdAt }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row" v-if="users && users.length">
                  <table class="striped responsive highlight" v-if="filterIndex < 1">
                    <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Simulator Access</th>
                          <th>CreatedAt</th>
                          <th>LoginAt</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      <tr v-for="(user, index) in users" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.displayName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.has_simulator_access || 0 }}</td>
                        <td>{{ user.createdAt }}</td>
                        <td>{{ user.loginAt }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="center-align pt-20">
                    <button class="waves-effect waves-light btn" id="loadMore" v-on:click="passCodeModalOpen()">
                      Load More Results
                    </button>
                  </div>
                </div>
                <div v-if="!users" class="center-align pt-20">
                  <i v-if="filterIndex > -1" class="fa fa-spinner fa-spin fa-2x"></i>
                  <p v-else>You don't have any missions.</p>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="center-align pt-20">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
          </div>`,
        data: {
          missions: undefined,
          users: undefined,
          filterIndex: -1,
        },
        mounted: function(){
          //this.getData();
        },
        updated: function () {
          this.$nextTick(function () {
            var container = this;
            $("#userEmailSearch").on("change", function () {
              var status = $(this).prop('checked');
              if (status === true) {
                container.missions = [];
                container.filterIndex = 0;
                container.getData();
              }
            });
  
            $("#missionTitleSearch").on("change", function () {
              var status = $(this).prop('checked');
              if (status === true) {
                container.missions = [];
                container.filterIndex = 1;
                container.getData();
              }
            });
  
            $("#searchSubmit").on("click", function () {
              console.log('clicked search button');
              var searchQuery = $('#search').val();
              container.getDataByQuery(searchQuery);
            });
  
            $("#searchClose").on("click", function () {
              console.log('clicked search close button');
              $('#search').val('');
              container.getData();
            });
  
          })
        },
        methods: {
          select: function(id) {
            localStorage.removeItem('backup');
            localStorage.setItem('missionId', id);
            
            if (location.search.indexOf('simulator') > -1) {
              location.href = '/simulator.html';
            } else if (location.search.indexOf('chrome_app') > -1 || aircraft === 'Tello') {
              location.href = '/chrome_app.html';
            } else {
              location.href = '/';
            }
            
          },
          removeItem: function(id) {
            const that = this;
  
            $('#deleteMissionModal').openModal();
  
            $('#deleteMissionButton').off().click(() => {
              db.collection('missions').doc(id).delete();
  
              $('#deleteMissionModal').closeModal();
              that.getData();
  
              if(localStorage.getItem('missionId') === id){
                localStorage.removeItem('missionId');
              }
            })
          },
          share: function(id){
            $("#shareModal").openModal();
    
            if (location.search.indexOf('simulator') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/simulator.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else if (aircraft == "Tello") {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/tello.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io?share=1&missionId=${id}&uid=${user.uid}`);
            }
          },
          passCodeModalOpen: function () {
            $("#passCodeModal").openModal();
            firebaseModule.getPassCode().then((v) => {
              $("#currentPassCode").val(v.passCode);
            })
          },
          likeMission: function (myMission) {
            if (!user) {
              $("#redirectLoginModal").openModal();
              return;
            }
            if (!myMission.likeMembers || (myMission.likeMembers.length === 0)) {
              db.collection('missions').doc(myMission.id).update({
                likeCount: 1,
                likeMembers: [user.uid]
              }).then(() => {
                Materialize.toast(`You liked this mission.`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount = 1;
                    mission.likeMembers = [user.uid];
                  }
                });
              });
              return;
            }
            if (!myMission.likeMembers.includes(user.uid)) {
              db.collection('missions').doc(myMission.id).update({
                likeCount: firebase.firestore.FieldValue.increment(1),
                likeMembers: firebase.firestore.FieldValue.arrayUnion(user.uid),
              }).then(() => {
                Materialize.toast(`You liked this mission`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount++;
                    mission.likeMembers.push(user.uid);
                  }
                });
              });
              return;
            }
            if (myMission.likeMembers.includes(user.uid)) {
  
              db.collection('missions').doc(myMission.id).update({
                likeCount: firebase.firestore.FieldValue.increment(-1),
                likeMembers: firebase.firestore.FieldValue.arrayRemove(user.uid),
              }).then(() => {
                Materialize.toast(`You disliked this mission`, 3000);
                this.missions.map(mission => {
                  if (mission.id === myMission.id) {
                    mission.likeCount--;
                    const index = mission.likeMembers.indexOf(user.uid);
                    mission.likeMembers.splice(index, 1);
                  }
                });
              });
              return;
            }
            /* db.collection('missions').doc(myMission.id).update({
              likeCount: firebase.firestore.FieldValue.increment(1)
            }).then(() => {
              Materialize.toast(`You liked Mission`, 3000);
            }); */
          },
          getData: function () {
            firebaseModule.getPassCode().then((v) => {
              $("#currentPassCode").val(v.passCode);
            })
  
            var dataQuery;
            if (this.filterIndex > 0) {
              dataQuery = db.collection('missions');
              dataQuery.get().then((v) => {
                if (!v.empty) {
                  this.missions = v.docs
                    .map(v => ({
                      id: v.ref.id,
                      ...v.data()
                    }))
                    .map(v => ({
                      ...v,
                      createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                      createdAt: moment(v.createdAt.toDate()).format('LLL'),
                      createdAtShort: moment(v.createdAt.toDate()).format('l LT')
                    }))
                    .filter(v => {
                      if (v.aircraft === aircraft) {
                        return true;
                      }
                      return false;
                    });
                }else{
                  this.missions = [];
                }
              })
            } else {
              dataQuery = db.collection('users');
              dataQuery.get().then((v) => {
                if (!v.empty) {
                  this.users = v.docs
                    .map(v => ({
                      id: v.ref.id,
                      ...v.data()
                    }))
                    .map(v => ({
                      ...v,
                      createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                      createdAt: moment(v.createdAt.toDate()).format('LLL'),
                      createdAtShort: moment(v.createdAt.toDate()).format('l LT'),
                      loginAtTime: v.loginAt ? new Date(v.loginAt.toDate()) : new Date(),
                      loginAt: moment(v.loginAt.toDate()).format('LLL'),
                      loginAtShort: moment(v.loginAt.toDate()).format('l LT')
                    }))
                }else{
                  this.users = [];
                }
                console.log(this.users);
              })
            }
  
          },
          getDataByQuery: function (searchkey) {
            var dataQuery;
            const query = searchkey.charAt(0) + searchkey.slice(1);
            const secondary = secondQuery(query);
            if (this.filterIndex > 0) {
              dataQuery = db.collection('missions')
                .where('title', '>=', query)
                .where('title', '<', secondary);
              
              dataQuery.get().then((v) => {
                if (!v.empty) {
                  this.missions = v.docs
                    .map(v => ({
                      id: v.ref.id,
                      ...v.data()
                    }))
                    .map(v => ({
                      ...v,
                      createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                      createdAt: moment(v.createdAt.toDate()).format('LLL'),
                      createdAtShort: moment(v.createdAt.toDate()).format('l LT')
                    }))
                    .filter(v => {
                      if (v.aircraft === aircraft) {
                        return true;
                      }
                      return false;
                    });
                  if (this.filterIndex < 1) {
                    this.missions.sort((a, b) => a.createdAtTime > b.createdAtTime ? -1 : 1);
                  }
                }else{
                  this.missions = [];
                }
              })
            } else {
              dataQuery = db.collection('users')
                .where('email', '>=', query)
                .where('email', '<', secondary);
              
              dataQuery.get().then((v) => {
                if (!v.empty) {
                  this.users = v.docs
                    .map(v => ({
                      id: v.ref.id,
                      ...v.data()
                    }))
                    .map(v => ({
                      ...v,
                      createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                      createdAt: moment(v.createdAt.toDate()).format('LLL'),
                      createdAtShort: moment(v.createdAt.toDate()).format('l LT'),
                      loginAtTime: v.loginAt ? new Date(v.loginAt.toDate()) : new Date(),
                      loginAt: moment(v.loginAt.toDate()).format('LLL'),
                      loginAtShort: moment(v.loginAt.toDate()).format('l LT')
                    }))
                }else{
                  this.users = [];
                }
              });
              console.log(this.users);
            }
          },
        }
      });
    }
  })
})