// ===== GOOGLE APPS SCRIPT - EVALUACIONES DE DESEMPEÑO COMODIM =====

// Configuración
const SPREADSHEET_ID = 'TU_ID_DE_SPREADSHEET'; // Reemplazar con el ID de tu Google Sheet
const FOLDER_ID = 'TU_ID_DE_CARPETA'; // Reemplazar con el ID de la carpeta de Google Drive

// Nombres de las hojas según tipo de evaluación
const SHEET_NAMES = {
  'periodo-prueba': 'Periodo de Prueba',
  'farmaceutico': 'Farmacéuticos',
  'cajero': 'Cajeros',
  'auxiliar-farmacia': 'Auxiliares Farmacia',
  'cajero-repo': 'Cajeros Repovolante',
  'control-interno': 'Control Interno',
  'mensual-operativo': 'Evaluaciones Mensuales'
};

// ===== FUNCIÓN PRINCIPAL - RECIBIR DATOS DEL FORMULARIO WEB =====
function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    
    // Guardar en Google Sheets
    const resultado = guardarEnSheet(datos);
    
    // Generar PDF si se requiere
    if (datos.generarPDF) {
      const pdfUrl = generarPDF(datos, resultado.fila);
      resultado.pdfUrl = pdfUrl;
    }
    
    // Enviar email de confirmación
    if (datos.enviarEmail) {
      enviarEmailConfirmacion(datos, resultado);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        mensaje: 'Evaluación guardada exitosamente',
        datos: resultado
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== FUNCIÓN PARA MANEJAR SOLICITUDES GET (PARA CARGAR BORRADORES) =====
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'obtenerBorrador') {
    const dni = e.parameter.dni;
    return obtenerBorrador(dni);
  }
  
  if (action === 'listarEvaluaciones') {
    const tipo = e.parameter.tipo;
    return listarEvaluaciones(tipo);
  }
  
  return ContentService.createTextOutput('Acción no válida');
}

// ===== GUARDAR EVALUACIÓN EN GOOGLE SHEETS =====
function guardarEnSheet(datos) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = SHEET_NAMES[datos.tipo];
  let sheet = ss.getSheetByName(sheetName);
  
  // Crear hoja si no existe
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    crearEncabezados(sheet, datos.tipo);
  }
  
  // Preparar fila de datos
  const fila = prepararFilaDatos(datos);
  
  // Agregar timestamp
  fila.unshift(new Date());
  
  // Agregar al final de la hoja
  sheet.appendRow(fila);
  
  const ultimaFila = sheet.getLastRow();
  
  // Aplicar formato
  aplicarFormato(sheet, ultimaFila);
  
  return {
    fila: ultimaFila,
    sheetName: sheetName,
    timestamp: new Date()
  };
}

// ===== CREAR ENCABEZADOS SEGÚN TIPO DE EVALUACIÓN =====
function crearEncabezados(sheet, tipo) {
  const encabezadosComunes = [
    'Fecha/Hora',
    'Nombre y Apellido',
    'DNI',
    'Legajo',
    'Puesto',
    'Categoría',
    'Área',
    'Fecha Ingreso',
    'Local/Sucursal',
    'Jefe Directo',
    'Legajo Jefe',
    'Puesto Jefe',
    'Período Evaluación'
  ];
  
  let encabezadosEspecificos = [];
  
  switch(tipo) {
    case 'periodo-prueba':
      encabezadosEspecificos = [
        'Conocimiento del Trabajo',
        'Responsabilidad',
        'Búsqueda de la excelencia',
        'Aceptación de normas y políticas',
        'Habilidades sociales',
        'Trabajo en equipo',
        'Ausentismo',
        'Días Ausentes',
        'Sanciones',
        'Detalle Sanciones',
        'Desvinculación'
      ];
      break;
      
    case 'farmaceutico':
      encabezadosEspecificos = [
        // Orientación a resultados
        'Ventas',
        'Quejas',
        'Faltantes y Sobrantes',
        // Cumplimiento de funciones
        'Liquidaciones Obras Sociales',
        'Control de Recetas',
        'Abastecimiento',
        'Instalaciones',
        'Profesionalismo',
        'Liderazgo',
        // Relaciones interpersonales
        'Comunicación',
        'Aprendizaje continuo',
        'Trabajo en Equipo',
        // Enfoque en el cliente
        'Cortesía',
        'Asesoramiento',
        'Confianza',
        'Satisfacción de necesidades',
        'Solución de Conflictos',
        // Cumplimiento de normativas
        'Adhesión a normas',
        'Conocimiento del trabajo',
        'Puntualidad',
        'Imagen y presencia',
        'Higiene y Seguridad'
      ];
      break;
      
    case 'cajero':
      encabezadosEspecificos = [
        'Ventas',
        'Arqueo de caja',
        'Faltantes y Sobrantes',
        'Atención al Cliente',
        'Operación de Caja',
        'Cobro y Medios de Pago',
        'Orden y Limpieza',
        'Comunicación',
        'Trabajo en Equipo',
        'Resolución de Problemas',
        'Cortesía',
        'Rapidez en la Atención',
        'Manejo de Quejas',
        'Adhesión a normas',
        'Puntualidad',
        'Imagen y Presencia'
      ];
      break;
      
    case 'auxiliar-farmacia':
      encabezadosEspecificos = [
        'Ventas',
        'Manejo de Caja',
        'Stock de Medicamentos',
        'Atención en Mostrador',
        'Dispensación de Medicamentos',
        'Operación de Caja',
        'Orden y Limpieza',
        'Reposición',
        'Comunicación',
        'Trabajo en Equipo',
        'Aprendizaje',
        'Cortesía',
        'Orientación al Cliente',
        'Rapidez',
        'Normas y Procedimientos',
        'Puntualidad',
        'Imagen y Presencia',
        'Higiene y Seguridad'
      ];
      break;
      
    case 'cajero-repo':
      encabezadosEspecificos = [
        'Ventas',
        'Gestión de Caja',
        'Reposición',
        'Atención en Caja',
        'Reposición en Góndolas',
        'Control de Stock',
        'Orden y Limpieza',
        'Flexibilidad',
        'Comunicación',
        'Trabajo en Equipo',
        'Iniciativa',
        'Cortesía',
        'Rapidez',
        'Disponibilidad de Productos',
        'Cumplimiento de Normas',
        'Puntualidad',
        'Imagen Personal',
        'Seguridad'
      ];
      break;
      
    case 'control-interno':
      encabezadosEspecificos = [
        'Cumplimiento de Auditorías',
        'Detección de Irregularidades',
        'Seguimiento',
        'Elaboración de Informes',
        'Revisión de Procesos',
        'Control de Inventarios',
        'Verificación de Documentación',
        'Objetividad',
        'Conocimiento de Normativas',
        'Análisis de Datos',
        'Manejo de Sistemas',
        'Comunicación',
        'Confidencialidad',
        'Colaboración',
        'Ética Profesional',
        'Puntualidad',
        'Actualización Continua'
      ];
      break;
      
    case 'mensual-operativo':
      encabezadosEspecificos = [
        'Cumplimiento de Ventas',
        'Rentabilidad',
        'Control de Gastos',
        'Gestión de Stock',
        'Control de Vencimientos',
        'Arqueos',
        'Conciliaciones',
        'Supervisión de Equipo',
        'Capacitación',
        'Gestión de Turnos',
        'Clima Laboral',
        'Satisfacción del Cliente',
        'Resolución de Reclamos',
        'Imagen del Local',
        'Normativas Farmacéuticas',
        'Procedimientos Internos',
        'Reportes',
        'Higiene y Seguridad'
      ];
      break;
  }
  
  const encabezadosObservaciones = [
    'Aspectos Destacados',
    'Habilidades',
    'Plan de Mejoras',
    'Comentarios Adicionales',
    'Puntaje Promedio'
  ];
  
  const todosLosEncabezados = [
    ...encabezadosComunes,
    ...encabezadosEspecificos,
    ...encabezadosObservaciones
  ];
  
  sheet.getRange(1, 1, 1, todosLosEncabezados.length).setValues([todosLosEncabezados]);
  
  // Aplicar formato a encabezados
  const headerRange = sheet.getRange(1, 1, 1, todosLosEncabezados.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setWrap(true);
  
  // Congelar primera fila
  sheet.setFrozenRows(1);
}

// ===== PREPARAR FILA DE DATOS =====
function prepararFilaDatos(datos) {
  const fila = [
    // Datos comunes
    datos.datosEmpleado.nombreApellido,
    datos.datosEmpleado.dni,
    datos.datosEmpleado.legajo || '',
    datos.datosEmpleado.puesto,
    datos.datosEmpleado.categoria || '',
    datos.datosEmpleado.area,
    datos.datosEmpleado.fechaIngreso || '',
    datos.datosEmpleado.local,
    datos.datosEmpleado.jefeNombre,
    datos.datosEmpleado.jefeLegajo || '',
    datos.datosEmpleado.jefePuesto,
    datos.datosEmpleado.periodoEvaluacion || ''
  ];
  
  // Agregar respuestas de competencias
  const respuestas = datos.respuestas;
  
  // Extraer valores de competencias en orden
  for (let key in respuestas) {
    if (key.startsWith('comp_')) {
      fila.push(respuestas[key]);
    }
  }
  
  // Agregar datos adicionales si es período de prueba
  if (datos.tipo === 'periodo-prueba') {
    fila.push(respuestas.ausentismo || '');
    fila.push(respuestas.diasAusentes || '');
    fila.push(respuestas.sanciones || '');
    fila.push(respuestas.detalleSanciones || '');
    fila.push(respuestas.desvinculacion || '');
  }
  
  // Agregar observaciones
  fila.push(respuestas.aspectosDestacados || '');
  fila.push(respuestas.habilidades || '');
  fila.push(respuestas.planMejoras || '');
  fila.push(respuestas.comentarios || '');
  
  // Calcular puntaje promedio
  const puntaje = calcularPuntajePromedio(respuestas);
  fila.push(puntaje);
  
  return fila;
}

// ===== CALCULAR PUNTAJE PROMEDIO =====
function calcularPuntajePromedio(respuestas) {
  let total = 0;
  let cantidad = 0;
  
  for (let key in respuestas) {
    if (key.startsWith('comp_')) {
      const valor = parseFloat(respuestas[key]);
      if (!isNaN(valor)) {
        total += valor;
        cantidad++;
      }
    }
  }
  
  return cantidad > 0 ? (total / cantidad).toFixed(2) : 0;
}

// ===== APLICAR FORMATO A LA FILA =====
function aplicarFormato(sheet, fila) {
  const ultimaColumna = sheet.getLastColumn();
  const rango = sheet.getRange(fila, 1, 1, ultimaColumna);
  
  // Bordes
  rango.setBorder(true, true, true, true, true, true);
  
  // Alineación
  rango.setVerticalAlignment('middle');
  
  // Color alternado
  if (fila % 2 === 0) {
    rango.setBackground('#f8f9fa');
  }
  
  // Formato condicional para puntajes
  const puntajeCol = ultimaColumna;
  const celdaPuntaje = sheet.getRange(fila, puntajeCol);
  const puntaje = parseFloat(celdaPuntaje.getValue());
  
  if (!isNaN(puntaje)) {
    if (puntaje >= 2.5) {
      celdaPuntaje.setBackground('#d4edda');
      celdaPuntaje.setFontColor('#155724');
    } else if (puntaje >= 1.5) {
      celdaPuntaje.setBackground('#fff3cd');
      celdaPuntaje.setFontColor('#856404');
    } else {
      celdaPuntaje.setBackground('#f8d7da');
      celdaPuntaje.setFontColor('#721c24');
    }
    celdaPuntaje.setFontWeight('bold');
  }
}

// ===== GENERAR PDF =====
function generarPDF(datos, fila) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = SHEET_NAMES[datos.tipo];
  const sheet = ss.getSheetByName(sheetName);
  
  // Crear PDF temporal
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const fileName = `Evaluacion_${datos.datosEmpleado.nombreApellido}_${new Date().getTime()}.pdf`;
  
  const blob = sheet.getRange(1, 1, fila, sheet.getLastColumn()).getAs('application/pdf');
  const file = folder.createFile(blob);
  file.setName(fileName);
  
  return file.getUrl();
}

// ===== ENVIAR EMAIL DE CONFIRMACIÓN =====
function enviarEmailConfirmacion(datos, resultado) {
  const destinatario = datos.emailDestinatario || datos.datosEmpleado.email;
  
  if (!destinatario) return;
  
  const asunto = `Evaluación de Desempeño - ${datos.datosEmpleado.nombreApellido}`;
  
  const cuerpo = `
    <h2>Evaluación de Desempeño Registrada</h2>
    <p>Se ha registrado exitosamente la evaluación de desempeño con los siguientes datos:</p>
    
    <h3>Datos del Empleado:</h3>
    <ul>
      <li><strong>Nombre:</strong> ${datos.datosEmpleado.nombreApellido}</li>
      <li><strong>DNI:</strong> ${datos.datosEmpleado.dni}</li>
      <li><strong>Puesto:</strong> ${datos.datosEmpleado.puesto}</li>
      <li><strong>Local:</strong> ${datos.datosEmpleado.local}</li>
    </ul>
    
    <h3>Evaluador:</h3>
    <ul>
      <li><strong>Nombre:</strong> ${datos.datosEmpleado.jefeNombre}</li>
      <li><strong>Puesto:</strong> ${datos.datosEmpleado.jefePuesto}</li>
    </ul>
    
    <h3>Resultado:</h3>
    <p><strong>Puntaje Promedio:</strong> ${calcularPuntajePromedio(datos.respuestas)}</p>
    <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Este es un correo automático del Sistema de Evaluación de Desempeño - Comodim
    </p>
  `;
  
  GmailApp.sendEmail(destinatario, asunto, '', {
    htmlBody: cuerpo
  });
}

// ===== OBTENER BORRADOR =====
function obtenerBorrador(dni) {
  // Implementar lógica para recuperar borrador guardado
  // Por ahora retorna un objeto vacío
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      borrador: null
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== LISTAR EVALUACIONES =====
function listarEvaluaciones(tipo) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetName = SHEET_NAMES[tipo];
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        mensaje: 'No hay evaluaciones de este tipo'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const datos = sheet.getDataRange().getValues();
  const encabezados = datos[0];
  const filas = datos.slice(1);
  
  const evaluaciones = filas.map(fila => {
    const obj = {};
    encabezados.forEach((header, index) => {
      obj[header] = fila[index];
    });
    return obj;
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      evaluaciones: evaluaciones
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== FUNCIÓN DE PRUEBA =====
function testGuardarEvaluacion() {
  const datosPrueba = {
    tipo: 'farmaceutico',
    datosEmpleado: {
      nombreApellido: 'Juan Pérez',
      dni: '12345678',
      legajo: 'L001',
      puesto: 'Farmacéutico',
      categoria: 'A',
      area: 'Farmacia',
      fechaIngreso: '2024-01-15',
      local: 'Sucursal Centro',
      jefeNombre: 'María González',
      jefeLegajo: 'L100',
      jefePuesto: 'Gerente',
      periodoEvaluacion: 'Enero 2025'
    },
    respuestas: {
      comp_ventas: '3',
      comp_quejas: '2',
      comp_faltantes: '3',
      aspectosDestacados: 'Excelente atención al cliente',
      planMejoras: 'Capacitación en nuevos productos'
    }
  };
  
  const resultado = guardarEnSheet(datosPrueba);
  Logger.log(resultado);
}
