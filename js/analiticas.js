// import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', async (e) => {


    const response = await fetch('https://sheet.best/api/sheets/095a1cf0-bb91-410d-b2b1-76a9ee05baf3');
    const responseJson = await response.json();

    if (responseJson) {
        let prendas = responseJson.map(item => item.Producto);
        let ventas = responseJson.map(item => item.PrecioPagar);

        prendas = prendas.filter(producto => producto !== null);
        ventas = ventas.filter(precioPagar => precioPagar !== null);

        var canvas = document.getElementById("grafico");
        var ctx = canvas.getContext("2d");
     
        // Tamaño del lienzo
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        
        // Espacio entre las barras
        var barSpacing = 20;
        
        // Ancho de las barras
        var barWidth = (canvasWidth - (barSpacing * (ventas.length - 1))) / ventas.length;
        
        // Máximo valor en los datos de ventas
        var maxDataValue = Math.max(...ventas);
        
        // Escala para ajustar los datos al tamaño del lienzo
        var scale = canvasHeight / maxDataValue;
        
        // Dibuja las barras y etiquetas
        for (var i = 0; i < ventas.length; i++) {
            var barHeight = ventas[i] * scale;
            var x = i * (barWidth + barSpacing);
            var y = canvasHeight - barHeight;
        
            // Aplica el estilo CSS a las barras
            ctx.fillStyle = "darkblue";
            ctx.fillRect(x, y, barWidth, barHeight);
        
            // Dibuja la etiqueta de datos (nombre de la prenda)
            ctx.fillStyle = "black";
            ctx.fillText(prendas[i], x, canvasHeight + 15);
        
            // Dibuja la etiqueta de datos (total vendido)
            ctx.fillText(ventas[i], x, y - 5);
        }
    }


})