import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
import { Tabs } from './shared/Tabs';
import { FirebaseService } from './shared/FirebaseService';
import { Storage } from './shared/Storage';

export const tabs = new Tabs();
export const storage = new Storage();
export const firebaseService = new FirebaseService(storage);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Popup />);
