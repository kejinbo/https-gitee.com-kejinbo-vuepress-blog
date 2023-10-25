/**
 * 页面报错：error in nextTick: "SyntaxError: Failed to execute 'querySelector' on 'Document': 'xxx' is not a valid selector."
 * 页面报错这个问题最简单粗暴的方式就是修改源码了，我们打开 node_modules/vuepress-plugin-smooth-scroll/lib/enhanceApp.js，直接修改：
 * const enhanceApp = ({ Vue, router }) => {
    router.options.scrollBehavior = (to, from, savedPosition) => {
				// ...
        else if (to.hash) {
            //...
          
          	// 加上 decodeURIComponent
            const targetElement = document.querySelector(decodeURIComponent(to.hash));
            
						//...
        }
				// ...
    };
};
 */
export default ({ router }) => {
  // router.onReady(() => {
  //   const { hash } = document.location;
  //   setTimeout(() => {
  //     if (hash.length > 1) {
  //       const id = decodeURIComponent(hash);
  //       const el = document.querySelector(`.reco-side-${decodeURIComponent(id).substring(1)}`);
  //       el.click();
  //     }
  //   }, 1000);
  // });
};
