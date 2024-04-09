/*网页监听组件*/
// 监听 beforeunload 事件
window.addEventListener('pagehide', function() {
    // 清除所有 localStorage 数据
    localStorage.clear();
    console.log("clear");
  });