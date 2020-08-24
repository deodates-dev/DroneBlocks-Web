import Vue from '../lib/vue/vue.min';
import * as moment from 'moment';

$(document).ready(() => {
  if(!location.pathname.match(/missions.html/) && !location.pathname.match(/code_board.html/)){
    return;
  }
  var randomColors = [
    '#ddf3f5', '#a6dcef', '#f2aaaa', '#e36387',
    '#efee9d', '#d1eaa3', '#dbc6eb', '#abc2e8'
  ]

  const db = firebase.firestore();

  firebase.auth().onAuthStateChanged(user => {
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
                    <label for="recenMissionFirst">Recents</label>
                    <input class="with-gap" name="group1" type="radio" id="highRatingFirst" />
                    <label for="highRatingFirst">Ratings</label>
                  </p>
                </form>
              </div>
              <div class="row" v-if="missions.length">
                <div class="col s12 m3" v-for="(mission, index) in missions" :key="mission.id">
                  <div class="card small">
                    <div class="card-image" :id="index">
                      <h5>
                        {{ mission.title.slice(0, 15) }}
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
            $(`#${index}`).css("background-color", randomColors[Math.floor(Math.random() * 8)]);
            $(`#${index}`).click(function(){
              window.location = `/simulator.html?share=1&missionId=${mission.id}&uid=${mission.uid}`;
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
            dataQuery = db.collection('missions').where('is_public', '==', true).orderBy('likeCount', 'desc');
          } else {
            dataQuery = db.collection('missions').where('is_public', '==', true)
          }
          
          dataQuery.get().then((v) => {
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
        }
      }
    });
  })
})

// var ref = firebase.database().ref();
// var userId;
// var missionToBeDeleted;


// $(document).ready(function() {
  
//   $("#deleteMissionButton").click(function() {
//     deleteMission();
//   });
  
//   firebase.auth().onAuthStateChanged(function(user) {
    
//     console.log("auth state changed: " + user.uid);
  
//     if (user && !userId) {
    
//       userId = user.uid;
      
//       var usersRef;
      
//       if (aircraft == "Tello") {
//         usersRef = ref.child("droneblocks/users/" + userId + "/tello_missions");
//       } else {
//         usersRef = ref.child("droneblocks/users/" + userId + "/missions");
//       }
    
//       usersRef.orderByChild("createdAt").on("child_added", function(snapshot) {
      
//         var row = '<tr>';

//         // Detect Chrome App
//         if (document.location.search.match(/chrome_app/i)) {
//           row += '<td style="padding-left: 25px"><a href="chrome_app.html?view=1&missionId=' + snapshot.key + '">' + snapshot.val().title + '</a></td>';
//         } else if (aircraft == "Tello") {
//           row += '<td style="padding-left: 25px"><a href="tello.html?view=1&missionId=' + snapshot.key + '">' + snapshot.val().title + '</a></td>';
//         } else {
//           row += '<td style="padding-left: 25px"><a href="index.html?view=1&missionId=' + snapshot.key + '">' + snapshot.val().title + '</a></td>';
//         }
        
//         row += '<td>' + new Date(snapshot.val().createdAt) + '</td>';
//         row += '<td>';
//         row += '<a href="#!" onClick="shareMission(\'' + snapshot.key +'\');"><i class="material-icons">share</i></a>';
//         row += '&nbsp;&nbsp;&nbsp;&nbsp;';
//         row += '<a href="#!" onClick="deleteMissionConfirm(\'' + snapshot.key +'\');"><i class="material-icons">delete</i></a>';
//         row += '</td></tr>'
    
//         $("#tbody").prepend(row);
    
//       });
    
//     // User is logged out
//     } else {
    
//       // TODO perhaps let them know they're logged out in the future instead of just redirecting
      
//       document.location.href = "./index.html";
    
//     }
  
//   });
  
// });

// function deleteMissionConfirm(missionId) {
//   missionToBeDeleted = missionId;
//   $('#deleteMissionModal').openModal();
// }

// // Delete the mission
// function deleteMission() {
  
//   // Remove the mission from the user's mission list
//   var usersRef;
  
//   if (aircraft == "Tello") {
//     usersRef = ref.child("droneblocks/users/" + userId + "/tello_missions/" + missionToBeDeleted);
//   } else {
//     usersRef = ref.child("droneblocks/users/" + userId + "/missions/" + missionToBeDeleted); 
//   }
//   usersRef.remove();
  
//   // Remove the mission 
//   var missionsRef;
  
//   if (aircraft == "Tello") {
//     missionsRef = ref.child("droneblocks/tello_missions/" + missionToBeDeleted);
//   } else {
//     missionsRef = ref.child("droneblocks/missions/" + missionToBeDeleted);
//   }
  
//   missionsRef.remove(function(error) {
//     console.log(error);
//     if(!error) {
//       Materialize.toast("Mission deleted successfully", 3000);
//     }
//   });
//   return;
  
//   // For now let's just reload the page
//   if (aircraft == "Tello") {
//     document.location.href = "tello_missions.html";
//   } else {
//     document.location.href = "missions.html";
//   }
  
// }

// function shareMission(missionId) {
//   $("#shareModal").openModal();
  
//   if (aircraft == "Tello") {
//     $("#iPadShareLink").val("droneblocks://?missionId=" + missionId + "&aircraft=tello");
//     $("#desktopShareLink").val("https://dev.droneblocks.io/tello.html?share=1&missionId=" + missionId);
//   } else {
//     $("#iPadShareLink").val("droneblocks://?missionId=" + missionId);
//     $("#desktopShareLink").val("https://dev.droneblocks.io?share=1&missionId=" + missionId);
//   }
// }