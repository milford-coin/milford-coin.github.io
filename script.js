// Подключение jQuery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Подключение Chart.js
var chartScript = document.createElement('script');
chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.1.0/chart.js';
chartScript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(chartScript);

// Ожидание загрузки jQuery и Chart.js
script.onload = function() {
    // Ваш оригинальный код
    $(document).ready(function() {
        chartScript.onload = function() {
            // Ваш конфиг для графика
            const config = {
                type: 'scatter',
                data: {
                    datasets: [{
                        data: [],
                        showLine: true,
                        backgroundColor: '#16A2DC',
                        borderColor: '#16A2DC',
                        tension: 0.4,
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
                            beginAtZero: true,
                            ticks: {
                                callback: (label) => `${label}h`
                            }
                        },
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 60,
                            ticks: {
                                stepSize: 15,
                                callback: (label) => (label < 60) ? `${label}min` : '1h+'
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
                return { x: new Date().getHours(), y: Math.floor(Math.random() * 60) };
            }

            // Функция для обновления графика каждые 5 секунд
            function updateChart() {
                var newDataPoint = generateRandomRate();

                // Обновляем данные графика
                myChart.data.datasets[0].data.push(newDataPoint);

                // Ограничиваем количество точек на графике (например, оставим только последние 10 точек)
                if (myChart.data.datasets[0].data.length > 10) {
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
