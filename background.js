fetch(chrome.runtime.getURL("blocked_domains.json"))
  .then(res => res.json())
  .then(data => {
    const rules = data.domains.map((domain, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: `${domain}`
      }
    }));

    const resourcesRules = data.resources.map((resource, index) => ({
      id: index + 1001,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: resource
      }
    }));

    rules.push(...resourcesRules);

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map(r => r.id),
      addRules: rules
    });
  });

chrome.webNavigation.onCommitted.addListener(
  async function(_) {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ["blocker.js"]
    })
  }
);
