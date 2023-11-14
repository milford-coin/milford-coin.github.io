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
script.onload = function() {
    // Ваш оригинальный код
    $(document).ready(function() {
        chartScript.onload = function() {
            // Ваш конфиг для графика
            const xValues = [];
            const yValues = [];

            var myChart = new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    }]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5,
                                callback: (value) => `${value}m`
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
            });

            // Функция для обновления графика каждые 5 секунд
            function updateChart() {
                // Генерация новых данных
                const newXValue = myChart.data.labels.length * 5;
                const newYValue = Math.random();

                // Обновление данных графика
                myChart.data.labels.push(newXValue);
                myChart.data.datasets[0].data.push(newYValue);

                // Ограничение количества точек на графике (оставляем последние 12 точек)
                if (myChart.data.labels.length > 12) {
                    myChart.data.labels.shift();
                    myChart.data.datasets[0].data.shift();
                }

                // Обновление графика
                myChart.update();

                // Запуск обновления каждые 5 секунд
                setTimeout(updateChart, 5000);
            }

            // Запуск обновления графика
            updateChart();
        };
    });
};
