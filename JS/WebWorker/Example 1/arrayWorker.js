function createArray (i) {
    var arr = []                         //записываем в этот массив рандомные числа
    var max = 1000000;                              // максимальная длина массива 
    var rundomnumber;                     //случайное число
    
    while (arr.length < max - 1) {
    
        rundomnumber = Math.floor(Math.random() * max); //создадим случайное число
    
       
    
            arr.push(rundomnumber);         // записываем в массив т.к нету
    
        
     }
     
     arr.sort(function (a, b) {
        return a - b;
    });
    return arr[i];
}

addEventListener("message", function () {
	
    for (var i = 0; i < 1000000; i++) {
        postMessage(i + " = " + createArray (i) + "<br />");
    }
    
}, false);