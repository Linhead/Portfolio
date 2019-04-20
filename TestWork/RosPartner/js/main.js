window.addEventListener("load", function () {
    const box = document.querySelector(".groupname");
    box.addEventListener ("click", function () {
        this.childNodes[3].focus();
    }, false);


}, false);