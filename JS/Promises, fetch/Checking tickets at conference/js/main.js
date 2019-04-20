window.addEventListener("load", function () {
    'use strict';
    

    // функция которая показывает уведомление о не заполненном поле
                let showNotify = param => {
                    param.notify("Не заполнено поле", {
                        position: "right",
                        autoHideDelay: 3000
                    });
                }
    // функция, которая выводит пользователю дату и место выбранной конференции
                let showLocactionDate = () => {
                    const conference = getConference();
                    if (conference) {
                        $("#conf_data").append(
                            ` ${conference.dateTime}, город ${conference.city}, ${conference.location}`)
                    }
                };
     // функция, которая получает данные конференции
                let getConference = () => {
                    // получаем выбранные конференцию и город
                    const selectedCity = $("#city_select option:selected");
                    const selectedConference = $("#conf_select option:selected");
                    // если город и конференция выбраны     
                    if (selectedCity.val() && selectedConference.val()) {
                        const conference = {}
                        if (selectedConference[0].value == "Бизнес-молодость") {
                            conference.name = selectedConference[0].value,
                                conference.dateTime = selectedCity.attr("data-conf1Time"),
                                conference.city = selectedCity[0].value,
                                conference.location = selectedCity.attr("data-conf1Location")
                        } else {
                            conference.name = selectedConference[0].value,
                                conference.dateTime = selectedCity.attr("data-conf2Time"),
                                conference.city = selectedCity[0].value,
                                conference.location = selectedCity.attr("data-conf2Location")
                        };
                    // возвращаем объект "конференция"        
                        return conference;
                    }
                    // если город и конференция не выбраны, то ничего не возвращаем
                }
    //функция, которая получает данные пользователя
                let getUser = e => {
                    // получаем данные из полей
                    const userData = $(".userData");
                    // по умолчанию ставим флажок, что данные в полях заполнены
                    let fillData = true;
                    // проверяем все ли поля заполнены
                    userData.each(function () {
                        let elemInput = $(this)
                        // если что-то не заполнено выводим уведомление на данное поле и переключаем флажок на false
                        if (elemInput.val() === '') {
                            e.preventDefault();
                            this.style.border = "1px solid #800059";
                            showNotify(elemInput);
                            fillData = false;
                        }
                    });
                    // если всё заполенно, создаём объект "юзер" и возвращаем его
                    if (fillData === true) {
                        const user = {
                            name: userData[0].value,
                            lastName: userData[1].value,
                            email: userData[2].value
                        }
                        return user;
                    }
                }
                // получаем все "селекты"
                let selects = $('.select_city_conf');
                // вешаем обработчик на изменение каждого "селекта"
                selects.each(function () {
                    $(this).change(function () {
                        $("#conf_data").empty();
                        showLocactionDate();
                    });
                });
                // вешаем обработчки на кнопку "отправить"
                $("#button").click(function (e) {
                    // очищаем поле "статус"
                    $("#status").empty();
                    // проверяем выбран ли город
                    const selectCity = $("#city_select");
                    if (selectCity.val()) {
                        // проверяем выбраны ли конференция
                        const conference = getConference();
                        if (conference) {
                            // проверяем заполнены ли данные пользователя
                            const user = getUser(e);
                            if (user) {
                                // создаём новый массив, куда добавляем данные конференции и данные пользователя
                                let userConf = [];
                                userConf = [conference, user];
                                // бронируем билет 
                                bookTicket(userConf);
                            }
                        } 
                        // если конференция не выбрана
                        else {
                            e.preventDefault();
                            showNotify($("#conf_select"));
                            return;
                        }
                        // если город не выбран
                    } else {
                        e.preventDefault();
                        showNotify($(selectCity));
                        return;
                    }
                });
                // универсальная функция, которая возвращает промис
                function checkAvaillable (userConf, icon, rejectString) {
                    return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (Math.random() > 0.5) {
                                    icon.style.visibility = "hidden";
                                    $("#status").empty();
                                    resolve(userConf)
                                } else {
                                    icon.style.visibility = "hidden";
                                    userConf.push(rejectString);
                                    reject(userConf);
                                }
                            }, 2000);
                        });
                } 
                // функция с промисами, которая бронирует билеты
                let bookTicket = userConf => { 
                    const icon = $("#waitIcon")[0];
                    let rejectString = "";
                    let checkMoney = userConf => {
                        $("#status").append(' Проверка наличия денег...');
                        icon.style.visibility = "visible";
                        rejectString = "недостаточно средств!";
                        return checkAvaillable (userConf, icon, rejectString);
                        }

                    let checkInvite = userConf => {
                        $("#status").empty();
                        $("#status").append(' Проверка наличия приглашения...');
                        icon.style.visibility = "visible";
                        rejectString = "вы не приглашены!";
                        return checkAvaillable (userConf, icon, rejectString);
                        }

                    let checkFreePlaces = userConf => {
                        $("#status").empty();
                        $("#status").append(' Проверка наличия свободных мест...');
                        icon.style.visibility = "visible";
                        rejectString = "нет свободных мест!";
                        return checkAvaillable (userConf, icon, rejectString);
                        }
 
                    let sendConfirmEmail = userConf => {
                        const confirmLetter =
                            `Здравствуйте, уважаемый ${userConf[1].name}! Вы приглашены на конференцию ${userConf[0].name}, которая состоится в городе ${userConf[0].city} ${userConf[0].dateTime}  в ${userConf[0].location}. 
    Билеты отправлены на Ваш адрес электронной почты, указанный при регистрации.`;
                            $("#status").empty();
                            $("#status").append(confirmLetter);
                        const url = userConf[1].email
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: confirmLetter
                        });

                   }

                    let sendRejectEmail = userConf => {
                        const rejectLetter =
                            `Здравствуйте, уважаемый ${userConf[1].name}! К сожалению Вам отказано в приглашении на конференцию. Причина отказа: ${userConf[2]} `;
                            $("#status").empty();
                            $("#status").append(rejectLetter);
                       const url = userConf[1].email
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: rejectLetter
                        });
                    }
                    checkMoney(userConf)
                        .then(checkInvite)
                        .then(checkFreePlaces)
                        .then(sendConfirmEmail)
                        .catch(sendRejectEmail)
                }
            })