window.onload = function () {
    var login = document.querySelectorAll ("#login");
    var input = document.querySelector("div.regForm div.input input[name=Username]");

    for (var i = 0; i < login.length; i++) {
        login[i].addEventListener('click', function () {
            input.focus()
        });
    }
}
 