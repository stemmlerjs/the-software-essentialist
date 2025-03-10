chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setAuthToken') {
    console.log('action came in!');
    chrome.storage.local.set({ firebaseAuthToken: request.token }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep the message channel open for sendResponse
  } else if (request.action === 'pageTitleChanged') {
    console.log('Page title changed:', request.title);
    // Perform any actions based on the new page title
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});