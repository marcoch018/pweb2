function crearInvitacion() {
    // almancenamos la hoja de calculo en la variable hoja
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // almacenamos los datos obtenidos de la hoja de calculo en la variable datos
    var datos = hoja.getDataRange().getValues();


    // for para recorrer todas las filas de la hoja de calculo
    for (var i = 1; i < datos.length; i++) {

        var fila = datos[i];
        var titulo = fila[0];
        var inicio = new Date(fila[1]);
        var fin = new Date(fila[2]);

        // dividimos a los participantes que se enviara la invitacion en una array
        var participantes = fila[3].split(',');

        // obtenemos el calendario del usuario y se crea un nuevo evento en este 
        var calendario = CalendarApp.getDefaultCalendar();
        var evento = calendario.createEvent(titulo, inicio, fin);

        // creacion del correo de invitacion
        for (var j = 0; j < participantes.length; j++) {
            var participante = participantes[j];
            var asunto = 'Inivtación: ' + titulo;
            var cuerpo = 'Título: ' + titulo + '\n' +
                'Inicio: ' + inicio + '\n' +
                'Fin: ' + fin + '\n\n' +
                'Miralo en Google Calendar.';

            // enviamos el correo de invitacion
            MailApp.sendEmail(participante, asunto, cuerpo);            
        }
    }
}
