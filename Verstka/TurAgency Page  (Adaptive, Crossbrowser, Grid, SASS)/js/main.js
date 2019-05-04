
	window.addEventListener("load", function () {

///////////////////////////////////////// БЛОКА КОДА ДЛЯ ИЗМЕНЕНИЯ КОЛИЧЕСТВА ДНЕЙ В РАЗДЕЛЕ ПОИСКА
			const daterange = $("#daterange");
			daterange.click(function () {
				let range = $("#range");
				if (range[0].style.display == 'none') {
					range[0].style.display = 'block';
					range.slider({
						animate: "slow",
						range: true,
						min: 1,
						max: 30,
						values: [6, 14],
						slide: function (event, ui) {
							daterange[0].value = ui.values[0] + " - " + ui.values[1];
						}
					});
				} else {
					range[0].style.display = 'none';
				}
			});
			
///////////////////////////////////// БЛОК КОДА ДЛЯ ИЗМЕНЕНИЯ КОЛИЧЕСТВА НАЖАТЫХ ЗВЁЗД В РАЗДЕЛЕ ПОИСКА ТУРА
            let stars =  $(".star");
            let star = undefined;
            let previousStar = undefined;
			stars.click(function () {
                if (star !== undefined) {
                    previousStar = star;
                }
                star = this;
				if (star.style.backgroundImage == "url(\u0022../img/star_active.png\u0022)") {
                    if (star == previousStar) {
					for (let item of stars) {
                        if (item !== stars [0]) {
                            item.style.backgroundImage = "url(../img/star.png)";	
                        }
                    }
                }
                else { 
                    let array = [];
                    for (let item of stars) {
                        if (item !== this) {
                        item.style.backgroundImage = "url(../img/star_active.png)";	
                        array.push(item);
						}
						else {
                            this.style.backgroundImage = "url(../img/star_active.png)";
                            array.push(this);
						    break;
                        }
                }
                for (let item of stars) {
                    if (array.indexOf(item) == - 1) {
                        item.style.backgroundImage = "url(../img/star.png)"; 
                    }
                }
            }
        }
				else {
					for (let item of stars) {
						if (item !== star) {
						item.style.backgroundImage = "url(../img/star_active.png)";	
						}
						else {
						this.style.backgroundImage = "url(../img/star_active.png)";
						return;
						}
					}
				}
                });
                
///////////////////////////////////// БЛОК ДЛЯ ИЗМЕНЕНИЯ ВИДИМОСТИ МОБИЛЬНОГО МЕНЮ  

                const openMenuButton = $("#menu_open");
                const closeMenuButton = $("#menu_close");
                
                openMenuButton.click(function () {
                    const mobileMenu = $("#mobile_menu");
                    mobileMenu[0].style.visibility = "visible";
                    mobileMenu[0].style.opacity= '1';
                })
               
                closeMenuButton.click(function () {
                    const mobileMenu = $("#mobile_menu");
                    mobileMenu[0].style.visibility = "hidden";
                    mobileMenu[0].style.opacity= '0';
                })
		});
	