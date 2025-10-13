fetch(chrome.runtime.getURL("blocked_domains.json"))
  .then(res => res.json())
  .then(data => {
    const rules = data.domains.map((domain, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: `*://${domain}/*`
      }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map(r => r.id),
      addRules: rules
    });
  });
