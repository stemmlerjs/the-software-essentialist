
export class Tabs {
  async getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const result = await chrome.tabs.query(queryOptions);
    return result;
  }
}