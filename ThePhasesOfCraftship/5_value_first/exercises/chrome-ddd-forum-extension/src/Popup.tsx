import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

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

const Popup = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectingLoginState, setDetectingLoginState] = useState(true);

  useEffect(() => {
    console.log('Popup component mounted');
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
        const activeTab = tabs[0];
        console.log('Active tab:', activeTab);
        setTitle(activeTab.title || '');
      });
    } else {
      console.error('chrome.tabs is not available');
    }

    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      setUser(user);
      setDetectingLoginState(false);
    });
  }, []);

  const handleLogin = () => {
    console.log('Login button clicked');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const idToken = await user.getIdToken();
      const activeTab = await new Promise<chrome.tabs.Tab>((resolve) =>
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs[0]))
      );

      const response = await fetch('https://dddforum.com/api/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          title,
          link: activeTab.url,
          text: description
        })
      });

      if (response.ok) {
        alert('Submitted');
      } else {
        alert('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  console.log('here')

  return (
    <div>
      {detectingLoginState ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <h2>Publish to Blog</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Popup;
