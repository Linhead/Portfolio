onmessage = function (e) {
    console.log('Получено сообщение от основного потока');
    var workerResult = e.data[0] * e.data[1];
    console.log('Отправка сообщения в основной поток');
    postMessage(workerResult);
}