
onmessage = function (e) {
    console.log('Получено сообщение от основного потока');
	if (e.data [1] == 0) {
		var workerResult = "На ноль делить нельзя!"
	} else {
    var workerResult = e.data[0] / e.data[1];
	}
    console.log('Отправка сообщения в основной поток');
    postMessage(workerResult);

	}



/*onmessage = function (e) {
    console.log('Получено сообщение от основного потока');
	var workerResult
	function divide () {
		if (e.data [1] == 0) {
			workerResult = "На ноль делить нельзя!"
		}
		else {
			workerResult = e.data[0] / e.data[1];
		}
	}
    console.log('Отправка сообщения в основной поток');
    postMessage(workerResult);
}
*/