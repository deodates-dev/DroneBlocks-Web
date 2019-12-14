firebase.initializeApp({
    "apiKey": "AIzaSyAGgqla_TWV4wVgaQ87HG3VDT0igLA8KhU",
    "authDomain": "droneblocks-staging.firebaseapp.com",
    "databaseURL": "https://droneblocks-staging.firebaseio.com",
    "projectId": "droneblocks-staging",
    "storageBucket": "droneblocks-staging.appspot.com"
});


const db = firebase.firestore();
const rdb = firebase.database();


$(document).ready(() => {
    $('#moveMissions').click(async (e) => {
        try{
            $('#message').text('');
            $('#movieMissions').prop('disabled', true);
            e.preventDefault();
    
            const userId = $('#userId').val();

            if(!userId){
                throw Error('Invalid user ID')
            }

            let missions = [];

            const DJImissions = await new Promise((resolve) => {
                rdb.ref('droneblocks/missions').orderByChild('userId').equalTo(userId).on('value', (snap) => {
                    let result = [];

                    const values = snap.val();
                    for(let k in values){
                        result.push({
                            aircraft: 'DJI',
                            createdAt: new Date(values[k].createdAt),
                            missionXML: values[k].missionXML,
                            title: values[k].title,
                            uid: values[k].userId
                        })
                    }

                    resolve(result);
                })
            })

            const Tellomission = await new Promise((resolve) => {
                rdb.ref('droneblocks/tello_missions').orderByChild('userId').equalTo(userId).on('value', (snap) => {
                    let result = [];

                    const values = snap.val();
                    for(let k in values){
                        result.push({
                            aircraft: 'Tello',
                            createdAt: new Date(values[k].createdAt),
                            missionXML: values[k].missionXML,
                            title: values[k].title,
                            uid: values[k].userId
                        })
                    }

                    resolve(result);
                })
            })

            missions = missions.concat(DJImissions, Tellomission);

            for(let mission of missions){
                console.log('mission..');
                const {id} = await db.collection('missions').add(mission);

                console.log(id);
            }

            $('#message').text(`${missions.length} missions have been added.`);
            
        }catch({message}){
            $('#message').text(message);
        }finally{
            $('#movieMissions').prop('disabled', false);
        }
    })
})