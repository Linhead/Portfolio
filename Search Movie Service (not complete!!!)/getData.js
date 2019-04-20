
function httpGet () {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open ('GET', url);

        xhr.send();

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                throw new Error('Ошибка');
            }

            resolve(xhr.responseText);
        });
    });

}


export default httpGet;