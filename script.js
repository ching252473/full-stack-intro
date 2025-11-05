const projectItems = document.querySelectorAll(".project-item"); // 選取所有 project 卡片

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url"); // 在 HTML 加入的連結
        if (url) {
            window.open(url, "_blank"); // 在新分頁開啟
        }
    });
});