firebase.initializeApp({
    "apiKey": "AIzaSyAGgqla_TWV4wVgaQ87HG3VDT0igLA8KhU",
    "authDomain": "droneblocks-staging.firebaseapp.com",
    "databaseURL": "https://droneblocks-staging.firebaseio.com",
    "projectId": "droneblocks-staging",
    "storageBucket": "droneblocks-staging.appspot.com"
});

const db = firebase.firestore();
const rdb = firebase.database();

return;

rdb.ref('droneblocks/tello_missions').on('value', snap => {
    const missions = []
    snap.forEach((v) => {
        const mis = v.val();
        missions.push({
            createdAt: new Date(mis.createdAt),
            title: mis.title,
            missionXML: mis.missionXML,
            uid: mis.userId,
            aircraft: 'Tello'
        });
    })

    missions.forEach((mission) => {
        const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        db.collection('missions').doc(_missionId).set(mission);
    })
})

rdb.ref('droneblocks/missions').on('value', snap => {
    const missions = []
    snap.forEach((v) => {
        const mis = v.val();
        missions.push({
            createdAt: new Date(mis.createdAt),
            title: mis.title,
            missionXML: mis.missionXML,
            uid: mis.userId,
            aircraft: 'DJI'
        });
    })

    missions.forEach((mission) => {
        const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        db.collection('missions').doc(_missionId).set(mission);
    })
})

rdb.ref('droneblocks/users').on('value', snap => {
    const users = []
    snap.forEach((v) => {
        users.push({
            ...v.val(),
            id: v.ref.key
        });
    })

    users.forEach((v, i) => {
        // if(v.missions){
        //     for(let key in v.tello_missions){
        //         new Promise(async(resolve, reject) => {
        //             const Tellomission = await rdb.ref(`droneblocks/tello_missions/${key}`).once('value');

        //             const data = Tellomission.val();

        //             resolve({
        //                 createdAt: new Date(data.createdAt),
        //                 aircraft: 'Tello',
        //                 uid: data.userId,
        //                 title: data.title,
        //                 missionXML: data.missionXML
        //             })
        //         }).then((mission) => {
        //             const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        //             // db.collection('missions').doc(_missionId).set(mission);
        //         })
        //     }
        //     for(let key in v.missions){
        //         new Promise(async (resolve, reject) => {
        //             const DJImission = await rdb.ref(`droneblocks/missions/${key}`).once('value');
        //             const data = DJImission.val();

        //             resolve({
        //                 createdAt: new Date(data.createdAt),
        //                 aircraft: 'DJI',
        //                 uid: data.userId,
        //                 title: data.title,
        //                 missionXML: data.missionXML
        //             })
        //         }).then((mission) => {
        //             const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        //             // db.collection('missions').doc(_missionId).set(mission);
        //         })
        //     }
        // }

        db.collection('users').doc(v.id).set({
            createdAt: new Date(v.createdAt),
            displayName: v.displayName || '',
            email: v.email,
            loginAt: new Date(v.loginAt),
            photoURL: v.photoURL,
            providerId: v.providerId,
            uid: v.uid
        });

        console.log('Migrated user', i, v.id);
    })
});