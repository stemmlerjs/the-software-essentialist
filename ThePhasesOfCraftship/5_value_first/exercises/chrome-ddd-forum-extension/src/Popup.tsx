import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { tabs } from '.';

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



  setTimeout(async() => {
    try {
      console.log('getting current tab')
      const tab = await tabs.getCurrentTab();
      console.log(tab);
    } catch (err) {
      console.log(err);
    }
  }, 1000);

  useEffect(() => {
    console.log('Popup component mounted');
    // chrome.storage.local.get(['pageTitle'], (result) => {
    //   if (result.pageTitle) {
    //     setTitle(result.pageTitle);
    //   }
    // });

    // Get the current tab when the component mounts
    const getTabInfo = async () => {
      console.log(Object.keys(chrome));
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(tabs)
        console.log('here', tabs.length)
        if (tabs && tabs.length > 0) {
          setTitle(tabs[0].title || '');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error getting tab info:', error);
        setLoading(false);
      }
    };

    getTabInfo();

    chrome.storage.local.get('firebaseAuthToken', (result) => {
      console.log('checking for firebase token');
      const idToken = result.firebaseAuthToken;
      if (idToken) {
        firebase.auth().signInWithCustomToken(idToken).then((userCredential) => {
          setUser(userCredential.user);
          setDetectingLoginState(false);
        }).catch((error) => {
          console.error('Error during sign-in with custom token:', error);
          setDetectingLoginState(false);
        });
      } else {
        console.log('No token found');
        console.log('wait, do i even need to updat this or can I just rebuild.')
        setDetectingLoginState(false);
      }
    });
  }, []);

  const handleLogin = () => {
    console.log('Login button clicked');
    window.open('http://localhost:3004/extension/login', '_blank');
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

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
      {title ? <div>{title}</div> : ''}
      {detectingLoginState ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <h2>Publish to Blog</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
          />
          <textarea
            value={description}
            placeholder='"I think this is a great article because..."'
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box' }}
          />
          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} style={{ width: '100%', padding: '10px' }}>Login with Google</button>
      )}
    </div>
  );
};

export default Popup;
