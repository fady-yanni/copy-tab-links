chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target !== "offscreen") return;
  const buffer = document.getElementById("buffer");
  buffer.value = message.text;
  buffer.select();
  document.execCommand("copy");
  sendResponse(true);
});
