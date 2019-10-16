'use strict';

(function () {
    let sizePrice: number = 0;
    let addingPrice: number = 0;
    const sizes:NodeListOf<Element> = document.querySelectorAll('input[type=radio]');
    const sizesArray: Array<Element> = Array.prototype.slice.call(sizes);
    const options: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
    const optionsArray: Array<Element> = Array.prototype.slice.call(options);
    const order: HTMLInputElement = document.querySelector('#order');
    const price: HTMLInputElement = document.querySelector('#price');
    const warning: HTMLBodyElement = document.querySelector('#warning');

    class Validator {
        size: boolean;
        addings:boolean;
        text:string;
        getResult(): boolean {
            if(this.size && this.addings) {
                this.text = "Мороженое успешно заказано";
                return true;
            }
            else if(!this.size  && !this.addings){
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
        }
    }

    sizesArray.forEach(size => {
        size.addEventListener('click', function (): void {
            hideWarning();
            sizePrice = parseInt(this.getAttribute('data-price'));
            showPrice(sizePrice, addingPrice);
        }
        )
    });

    optionsArray.forEach(option => {
        option.addEventListener('click', function (): void {
            hideWarning();
            if (this.checked) {
                addingPrice += parseInt(this.getAttribute('data-price'));
            }
            else {
                addingPrice -= parseInt(this.getAttribute('data-price'));
            }
            showPrice(sizePrice, addingPrice);
        }
        )
    });

    function showPrice(sizePrice: number, addingPrice: number): void {
        price.innerHTML = String(sizePrice + addingPrice);
    }

    function showWarning(warn: string): void {
        warning.style.display = "block";
        warning.innerHTML = warn;
    }

    function hideWarning(): void {
        warning.style.display = "none";
    }

    function validateForm(): Validator {
        let formSize: NodeListOf<Element> = document.querySelectorAll('input[name=size]');
        let formSizeArray: Array<HTMLInputElement> = Array.prototype.slice.call(formSize);
        let formAddings: NodeListOf<Element> = document.querySelectorAll('.addings');
        let formAddingsArray: Array<HTMLInputElement> = Array.prototype.slice.call(formAddings);

        let validator:Validator = new Validator();
        
        formSizeArray.forEach(input => {
            if (input.checked) {
                validator.size = true;
            }
        })

        formAddingsArray.forEach(input => {
            if (input.checked) {
                validator.addings = true;
            }
        })

        return validator;
    }

    order.addEventListener('click', function (e): void {
        let validator: Validator = validateForm();
        if (validator.getResult()) {
            showWarning(validator.text);
        }
        else {
            e.preventDefault();
            showWarning(validator.text);
        }
    });

})();