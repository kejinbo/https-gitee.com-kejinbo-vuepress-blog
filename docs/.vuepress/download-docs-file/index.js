export default {
  updated() {
    setTimeout(() => {
      // console.log("mounted");
      document.querySelectorAll('img[class*=custom-file-download]').forEach((el) => {
        const downloadList = el.parentElement.querySelectorAll('a[class*=custom-file-download]')
        // console.log(el, el.parentElement, downloadList.length);
        // 还没有创建这个元素
        if (!downloadList.length) {
          const a = document.createElement('a');
          a.setAttribute('href', el.getAttribute('src'));
          a.setAttribute('download', el.getAttribute('data-file-name'));
          a.innerHTML =  el.getAttribute('data-file-name');
          el.parentElement.appendChild(a);
        }
      });
    }, 100);
  },
};
