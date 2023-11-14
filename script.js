// Подключение jQuery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Подключение Chart.js
var chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
chartScript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(chartScript);

// Ожидание загрузки jQuery и Chart.js
script.onload = chartScript.onload = function() {
    // Ваш оригинальный код
    $(document).ready(function() {
        // Инициализация графика
        var ctx = document.getElementById('chart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Курс валюты',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        // Функция для генерации случайного курса
        function generateRandomRate() {
            return (Math.random() * (1 - 0.5) + 0.5).toFixed(2);
        }

        // Функция для обновления курса и графика каждый час
        function updateExchangeRate() {
            var newDataPoint = generateRandomRate();

            // Обновляем данные графика
            chart.data.labels.push(new Date().toLocaleTimeString());
            chart.data.datasets[0].data.push(newDataPoint);

            // Ограничиваем количество точек на графике (например, оставим только последние 10 точек)
            if (chart.data.labels.length > 10) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }

            // Обновляем значение на странице
            $('#exchange-rate').text('Текущий курс валюты: ' + newDataPoint + ' долларов');

            // Запоминаем время последнего обновления в localStorage
            localStorage.setItem('lastUpdateTime', Date.now());

            // Обновляем график
            chart.update();

            // Запускаем обновление каждый час
            setTimeout(updateExchangeRate, 3600000); // 3600000 миллисекунд в часе
        }

        // Запускаем обновление курса
        updateExchangeRate();
    });
};
