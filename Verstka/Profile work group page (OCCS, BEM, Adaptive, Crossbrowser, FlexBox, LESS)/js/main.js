'use strict';
(function () {
    const btnSend = document.querySelector("#btnSend");
    const btnSave = document.querySelector("#btnSave");
    const btnCancel = document.querySelector("#btnCancel");
    const formItems = document.querySelectorAll(".input-text__form");
    const alertText = document.querySelector(".text__alert");
    const alertPrgph = document.querySelector(".alert__main");
    const infoText = document.querySelector("#infoTxt");
    const infoPrgph = document.querySelector("#infoPrgph");

    btnSend.addEventListener("click", function (e) {
        for (let item of formItems) {
            item.parentNode.classList.remove("cell_withBorder");
        }
        let validated = checkValidate();

        if (validated) {
            alertPrgph.classList.add("alert_hidden");
            let infoTxt = "Данные успешно отправлены";
            showInfoTxt(infoTxt);
            setTimeout(hideInfoTxt, 3000);
            for (let item of formItems) {
                item.value = "";
            }


        } else {
            e.preventDefault();
        }
    });

    btnSave.addEventListener("click", function (e) {
        for (let item of formItems) {
            item.parentNode.classList.remove("cell_withBorder");
        }
        let validated = checkValidate();

        if (validated) {
            let infoTxt = "Данные успешно сохранены";
            alertPrgph.classList.add("alert_hidden");
            showInfoTxt(infoTxt);
            setTimeout(hideInfoTxt, 3000);
            for (let item of formItems) {
                item.value = "";
            }
        } else {
            e.preventDefault();
        }

    });

    btnCancel.addEventListener("click", function (e) {
        for (let item of formItems) {
            item.value = "";
            item.parentNode.classList.remove("cell_withBorder");
        }
        alertPrgph.classList.add("alert_hidden");
        alertText.innerHTML = '';

    });

    function checkValidate() {
        let validated = true;
        for (let item of formItems) {
            if (item.value.trim() === "") {
                let err = `Не заполнено поле ${item.dataset.name}`;
                showErrorMessage(err, item);
                validated = false;
                break;
            } else if (item.id === "phone") {
                let pattern = /^\d[\d\(\)\ -]{4,14}\d$/;
                if (!pattern.test(item.value)) {
                    let err = "Неправильно введён номер телефона";
                    showErrorMessage(err, item);
                    validated = false;
                    break;
                }
            } else if (item.id === "email") {
                let pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
                if (!pattern.test(item.value)) {
                    let err = "Неправильно введёна электронная почта";
                    showErrorMessage(err, item);
                    validated = false;
                    break;
                }
            }
        }
        return validated;
    }

    function showInfoTxt(infoTxt) {
        infoPrgph.classList.remove("info_hidden");
        infoText.innerHTML = infoTxt;
        infoPrgph.scrollIntoView();

    }

    function hideInfoTxt() {
        infoPrgph.classList.add("info_hidden");
        infoText.innerHTML = "";
    }


    function showErrorMessage(err, item) {
        alertPrgph.classList.remove("alert_hidden");
        alertText.innerHTML = err;
        item.parentNode.classList.add("cell_withBorder");
        item.focus();
    }

    for (let item of formItems) {
        item.addEventListener('change', function (e) {
            if (item.value.trim() === "") {
                alertPrgph.classList.add("alert_hidden");
            } else {
                alertPrgph.classList.remove("alert_hidden");
            }
            alertText.innerHTML = `Ваши данные сохранены в браузере, но не отправлены на сервер.
            Нажмите кнопку “Отправить”, чтобы завершить редактирование.`;
        })
    }

}());