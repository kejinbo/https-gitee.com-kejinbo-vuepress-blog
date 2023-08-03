const fs = import('fs');
export default {
  mounted() {
    setTimeout(() => {
      console.log("mounted");
      document.querySelectorAll(".download-docs-file-btn").forEach((el) => {
        const filePath = el.dataset.downloadLink;
        console.log(filePath);
        el.addEventListener("click", (e) => {
          console.log(e);
          // e.stopPropagation();
          // e.preventDefault();
          // fs.readFileSync(filePath, 'utf-8', (err, data) => {
          //   console.log(data);
          // });
          // window.open(filePath);
        });
      });
    }, 200);
  },
};
