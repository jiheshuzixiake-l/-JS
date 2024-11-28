// 获取按钮并添加点击事件监听
document.getElementById("run-script").addEventListener("click", () => {
  // 注入脚本到当前页面
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // 目标脚本
        const taskKeywords = ['Like', 'Visit'];
        const elementsToClick = Array.from(document.querySelectorAll('p')).filter(p =>
          taskKeywords.some(keyword => p.textContent.includes(keyword))
        );
        elementsToClick.forEach(element => {
          const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          element.dispatchEvent(event);
        });
        console.log(`${elementsToClick.length} elements clicked.`);
      }
    });
  });
});
