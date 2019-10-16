'use strict';
(function () {
    var sizePrice = 0;
    var addingPrice = 0;
    var sizes = document.querySelectorAll('input[type=radio]');
    var sizesArray = Array.prototype.slice.call(sizes);
    var options = document.querySelectorAll('input[type=checkbox]');
    var optionsArray = Array.prototype.slice.call(options);
    var order = document.querySelector('#order');
    var price = document.querySelector('#price');
    var warning = document.querySelector('#warning');
    var Validator = (function () {
        function Validator() {
        }
        Validator.prototype.getResult = function () {
            if (this.size && this.addings) {
                this.text = "Мороженое успешно заказано";
                return true;
            }
            else if (!this.size && !this.addings) {
                this.text = "Пожалуйста, выберите размер мороженого и минимум одну добавку";
                return false;
            }
            else if (!this.addings) {
                this.text = "Пожалуйста, выберите минимум одну добавку";
                return false;
            }
            else if (!this.size) {
                this.text = "Пожалуйста, выберите размер мороженого";
                return false;
            }
        };
        return Validator;
    }());
    sizesArray.forEach(function (size) {
        size.addEventListener('click', function () {
            hideWarning();
            sizePrice = parseInt(this.getAttribute('data-price'));
            showPrice(sizePrice, addingPrice);
        });
    });
    optionsArray.forEach(function (option) {
        option.addEventListener('click', function () {
            hideWarning();
            if (this.checked) {
                addingPrice += parseInt(this.getAttribute('data-price'));
            }
            else {
                addingPrice -= parseInt(this.getAttribute('data-price'));
            }
            showPrice(sizePrice, addingPrice);
        });
    });
    function showPrice(sizePrice, addingPrice) {
        price.innerHTML = String(sizePrice + addingPrice);
    }
    function showWarning(warn) {
        warning.style.display = "block";
        warning.innerHTML = warn;
    }
    function hideWarning() {
        warning.style.display = "none";
    }
    function validateForm() {
        var formSize = document.querySelectorAll('input[name=size]');
        var formSizeArray = Array.prototype.slice.call(formSize);
        var formAddings = document.querySelectorAll('.addings');
        var formAddingsArray = Array.prototype.slice.call(formAddings);
        var validator = new Validator();
        formSizeArray.forEach(function (input) {
            if (input.checked) {
                validator.size = true;
            }
        });
        formAddingsArray.forEach(function (input) {
            if (input.checked) {
                validator.addings = true;
            }
        });
        return validator;
    }
    order.addEventListener('click', function (e) {
        var validator = validateForm();
        if (validator.getResult()) {
            showWarning(validator.text);
        }
        else {
            e.preventDefault();
            showWarning(validator.text);
        }
    });
})();
//# sourceMappingURL=app.js.map