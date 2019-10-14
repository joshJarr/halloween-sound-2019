const player = require('play-sound')(opts = {})
var admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

/* denotes device setting are we running.
  * 0: Handles 'lightning', 'power-outage', 'spooky'
  * 1: Handles 'groan'
*/
const setting = 0;
const playing = false;
let setup = true;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brs-halloween.firebaseio.com/"
});

const db = admin.database();
const ref = db.ref();

function playSound (event) {
  if (setup) return
  console.log('playing ', event)
  player.play(`${event}.wav`, function(err){
    if (err) throw err
  })
}

ref.on('value', function(snapshot) {
  let event = snapshot.val().EVENT;

  if (playing) return;

  switch (event) {
    case ('lightning'):
      if (!setting) playSound(event);
      break;

    case 'power-outage':
      if (!setting) playSound(event);
      break;

    case 'power-on':
      if (!setting) playSound(event);
      break;

    case 'spooky':
      break;

    case 'groan':
      if (setting) playSound(event);
      break;

    default:
      break;
  }

  setup = false;

});
