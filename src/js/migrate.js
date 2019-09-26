// firebase.initializeApp({
//     "apiKey": "AIzaSyAGgqla_TWV4wVgaQ87HG3VDT0igLA8KhU",
//     "authDomain": "droneblocks-staging.firebaseapp.com",
//     "databaseURL": "https://droneblocks-staging.firebaseio.com",
//     "projectId": "droneblocks-staging",
//     "storageBucket": "droneblocks-staging.appspot.com"
// });

firebase.initializeApp({
    "apiKey": "AIzaSyBcbAt69BGUjPiOucQbkcNNbcdaSmE-G0o",
    "authDomain": "fiery-inferno-4972.firebaseapp.com",
    "databaseURL": "https://fiery-inferno-4972.firebaseio.com",
    "projectId": "fiery-inferno-4972",
    "storageBucket": "fiery-inferno-4972.appspot.com"
 });

const db = firebase.firestore();
const rdb = firebase.database();

// rdb.ref('droneblocks/tello_missions').on('value', snap => {
//     const missions = []
//     snap.forEach((v) => {
//         const mis = v.val();
//         missions.push({
//             createdAt: new Date(mis.createdAt),
//             title: mis.title,
//             missionXML: mis.missionXML,
//             uid: mis.userId,
//             aircraft: 'Tello'
//         });
//     })

//     missions.forEach((mission) => {
//         const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

//         // db.collection('missions').doc(_missionId).set(mission);
//     })
// })

// rdb.ref('droneblocks/missions').on('value', snap => {
//     const missions = []
//     snap.forEach((v) => {
//         const mis = v.val();
//         missions.push({
//             createdAt: new Date(mis.createdAt),
//             title: mis.title,
//             missionXML: mis.missionXML,
//             uid: mis.userId,
//             aircraft: 'DJI'
//         });
//     })

//     missions.forEach((mission) => {
//         const _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

//         // db.collection('missions').doc(_missionId).set(mission);
//     })
// })

(async() => {
    return;
    
    let users = await new Promise((resolve) => {
        rdb.ref('droneblocks/users').on('value', async snap => {
            const users = []
            snap.forEach((v) => {
                users.push({
                    ...v.val(),
                    id: v.ref.key
                });
            })

            resolve(users);
        });
    })

    let i = 0;

    for(let v of users){
        if(!v.displayName || !v.email || !v.loginAt || !v.createdAt || !v.photoURL || !v.providerId || !v.uid){
            console.warn('User error', v);
        }

        try{
            // await db.collection('users').doc(v.id).set({
            //     createdAt: new Date(v.createdAt) || new Date(),
            //     displayName: v.displayName || '',
            //     email: v.email || '',
            //     loginAt: new Date(v.loginAt) || new Date(),
            //     photoURL: v.photoURL || '',
            //     providerId: v.providerId || '',
            //     uid: v.uid || ''
            // });

            console.log('Migrated user', i, v.id);
        }catch(e){
            console.error(e);
        }

        i++;
    }

    console.log('Done');
})();