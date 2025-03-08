const express = require('express');
const firebase = require('firebase/app');
require('firebase/auth');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3004;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/extension/login', (req, res) => {
  res.render('login', {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  });
});

app.get('/extension/auth', async (req, res) => {
  const { idToken } = req.query;
  if (idToken) {
    // Store the token in local storage
    res.send(`
      <script>
        localStorage.setItem("firebaseAuthToken", "' + idToken + '"); 
        alert("Authentication successful. You can close this window.");
        
       </script>
      `);
  } else {
    res.status(400).send('Invalid request');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
