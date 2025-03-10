console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTitle') {
    const title = document.title;
    chrome.storage.local.set({ pageTitle: title }, () => {
      console.log('Page title is set to ' + title);
      sendResponse({ title });
    });
    return true; // Keep the message channel open for sendResponse
  }
});

const logHello = () => {
  console.log('hello');
};

window.addEventListener('load', logHello);
window.addEventListener('popstate', logHello);
window.addEventListener('hashchange', logHello);


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
      chrome.runtime.sendMessage({ action: 'pageTitleChanged', title: document.title });
    }
  });
});

// Start observing the document title
observer.observe(document.querySelector('title'), { childList: true });

// Send initial page title
chrome.runtime.sendMessage({ action: 'pageTitleChanged', title: document.title });
