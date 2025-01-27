// This file contains the background script for the Chrome extension. It handles events and manages the extension's lifecycle.

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startSpeechRecognition') {
        // Start speech recognition logic here
        sendResponse({ status: 'Speech recognition started' });
    } else if (request.action === 'stopSpeechRecognition') {
        // Stop speech recognition logic here
        sendResponse({ status: 'Speech recognition stopped' });
    }
});