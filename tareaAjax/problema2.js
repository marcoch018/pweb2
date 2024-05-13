function generarGrafico() {
    // creacion del objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();
    //configuracion de la solicitud ajax
    xhr.open("GET", "./data.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            //regiones excluidas
            var regionesExcluidas = ['Lima', 'Callao'];
            var datosGrafico = data.filter(function (dato) {
                return !regionesExcluidas.includes(dato.region);
            }).map(function (dato) {
                var fechas = dato.confirmed.map(function (confirmed) {
                    return confirmed.date;
                });
                var confirmados = dato.confirmed.map(function (confirmed) {
                    return confirmed.value;
                });
                return {
                    label: dato.region,
                    data: confirmados,
                    fechas: fechas
                };
            });          
            //llamamos a la funcion para dibujar el grafico comparativo
            dibujarGrafico(datosGrafico);
        }
    };
    xhr.send();//enviamos la solicitud
}

function dibujarGrafico(datosGrafico) {
    var ctx = document.getElementById('grafico').getContext('2d');
    var datasets = datosGrafico.map(function (dato, index) {
        return {
            label: dato.label,
            data: dato.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'hsl(' + (index * 360 / datosGrafico.length) + ', 100%, 50%)', 
            borderWidth: 1
        };
    });
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datosGrafico[0].fechas, 
            datasets: datasets
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
