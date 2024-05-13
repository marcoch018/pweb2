function generarGrafico() {
    //recogemos todas las regiones seleccionadas 
    var regionesSeleccionadas = Array.from(document.querySelectorAll('#regiones input:checked')).map(function (input) {
        return input.value;
    });

    //creacion del objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();
    //configuracion de la solicitud AJAX
    xhr.open("GET", "./data.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var datosParaGrafico = data.filter(function (dato) {
                return regionesSeleccionadas.includes(dato.region);
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
            //llamamos a la funcion para dibujar el grafico
            dibujarGrafico(datosParaGrafico);
        }
    };
    xhr.send();//enviamos la solicitud
}
//funcion para dibujar el grafico de las regiones seleccionadas
//usamos la biblioteca de chart.js para hacer los graficos
function dibujarGrafico(datosParaGrafico) {   
    var ctx = document.getElementById('grafico').getContext('2d');
    var datasets = datosParaGrafico.map(function (dato, index) {
        return {
            label: dato.label,
            data: dato.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'hsl(' + (index * 360 / datosParaGrafico.length) + ', 100%, 50%)', 
            borderWidth: 1
        };
    });
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datosParaGrafico[0].fechas, 
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
