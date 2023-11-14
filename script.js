// Подключение jQuery
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Ожидание загрузки jQuery
script.onload = function() {
    // Ваш оригинальный код
    $(document).ready(function() {
        // Функция для генерации случайного курса
        function generateRandomRate() {
            return (Math.random() * (1 - 0.5) + 0.5).toFixed(2);
        }

        // Функция для обновления курса каждые 5 секунд
        function updateExchangeRate() {
            // Генерируем случайный курс
            var newRate = generateRandomRate();

            // Обновляем значение на странице
            $('#exchange-rate').text('Новый курс валюты: ' + newRate + ' долларов');

            // Запускаем обновление каждые 5 секунд
            setTimeout(updateExchangeRate, 5000);
        }

        // Запускаем обновление курса
        updateExchangeRate();
    });
};
