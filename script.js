// Подключение jQuery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Подключение Chart.js
var chartScript = document.createElement('script');
chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js';
chartScript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(chartScript);

// Ожидание загрузки jQuery и Chart.js
script.onload = function() {
    // Ваш оригинальный код
    $(document).ready(function() {
        chartScript.onload = function() {
            // Ваш конфиг для графика
            const config = {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Курс валюты',
                        data: [],
                        borderColor: '#16A2DC',
                        borderWidth: 2,
                        fill: false,
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5,
                                callback: (value, index) => (index % 2 === 0 ? `${value}m` : '')
                            }
                        },
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 1,
                            ticks: {
                                stepSize: 0.1,
                                callback: (value) => value.toFixed(1)
                            }
                        }
                    },
                    responsive: true
                }
            };

            // Инициализация графика
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, config);

            // Функция для генерации случайного курса
            function generateRandomRate() {
                return { x: myChart.data.labels.length * 5, y: Math.random() };
            }

            // Функция для обновления графика каждые 5 секунд
            function updateChart() {
                var newDataPoint = generateRandomRate();

                // Обновляем данные графика
                myChart.data.labels.push(newDataPoint.x);
                myChart.data.datasets[0].data.push(newDataPoint.y);

                // Ограничиваем количество точек на графике (например, оставим только последние 10 точек)
                if (myChart.data.labels.length > 10) {
                    myChart.data.labels.shift();
                    myChart.data.datasets[0].data.shift();
                }

                // Обновляем график
                myChart.update();

                // Запускаем обновление каждые 5 секунд
                setTimeout(updateChart, 5000);
            }

            // Запускаем обновление графика
            updateChart();
        };
    });
};
