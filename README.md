1. Change the config.prod.env file
2. run npm run dev
3. run firebase use default
4. run firebase deploy --only hosting

Make sure for production deployments this line:

https://github.com/dbaldwin/DroneBlocks-Web/blob/master/src/js/source/firebase.js#L1

in the dist folder dist/js/source/firebase.js

Points to:

config.prod.json