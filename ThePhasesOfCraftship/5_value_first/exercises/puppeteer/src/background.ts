// This file contains the background script for the Chrome extension. It handles events and manages the extension's lifecycle.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const text = request.data.text;
    fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb?output_format=mp3_44100_128",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": "sk_ec06ec64491298b62be6b9e3f372950721e5435e7b564ba3",
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    )
    .then((response) => response.blob())
    .then((blob) => {
        sendResponse({ status: "fetchingTextToSpeechAudioSuccess", data: blob })
        chrome.offscreen.createDocument({
            url: 'off_screen.html',
            reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
            justification: 'reason for needing the document',
          });

          chrome.runtime.sendMessage({
            type: 'audio',
            target: 'offscreen',
            data: blob
          });
    })
    
  return true;  // Important: return true to indicate asynchronous response
});
