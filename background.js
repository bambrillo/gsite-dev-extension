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
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const url = tab.url

    let css

    if (url.includes('komiinform.ru')) {
      css = '#header, .left-adv, .mainContent .text-right + p { display: none !important }'
    } else if (url.includes('pg11.ru')) {
      css = '#__next > div + div > div, #footer + div, .contentRightStretchBanner140 { display: none }'
    } else if (url.includes('komionline.ru')) {
      css = '.adv-side-left, .adv-side-right, .adv, .adv-row, .sape-links, #slinksBlock { display: none }'
    }

    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: css,
    })
  }
);
