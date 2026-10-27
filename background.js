// Service workers have no clipboard access, so the actual copy happens in an offscreen document.
const ensureOffscreen = async () => {
  const existing = await chrome.runtime.getContexts({ contextTypes: ["OFFSCREEN_DOCUMENT"] });
  if (existing.length) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["CLIPBOARD"],
    justification: "Write the selected tab links to the clipboard",
  });
};

const flashBadge = async (text, color) => {
  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1500);
};

const copySelectedTabLinks = async () => {
  const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
  const urls = tabs
    .sort((a, b) => a.index - b.index)
    .map((tab) => tab.url)
    .filter(Boolean);
  if (!urls.length) return;

  try {
    await ensureOffscreen();
    await chrome.runtime.sendMessage({ target: "offscreen", text: urls.join("\n") });
    await flashBadge(String(urls.length), "#16a34a");
  } catch (err) {
    console.error("Copy failed", err);
    await flashBadge("!", "#dc2626");
  }
};

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-links") copySelectedTabLinks();
});

chrome.action.onClicked.addListener(copySelectedTabLinks);
