# Guía de Implementación Paso a Paso

## 🎯 Objetivo
Implementar el Sistema de Evaluación de Desempeño de Comodim con integración completa a Google Sheets.

---

## PASO 1: Preparar Google Sheets

### 1.1 Crear la Spreadsheet Principal

1. Ir a [Google Sheets](https://sheets.google.com)
2. Crear nueva hoja de cálculo
3. Nombrarla: **"Evaluaciones de Desempeño Comodim 2025"**
4. Copiar el ID (de la URL):
   ```
   Ejemplo URL: https://docs.google.com/spreadsheets/d/1abc123XYZ456/edit
   El ID es: 1abc123XYZ456
   ```

### 1.2 Crear Carpeta en Drive

1. Ir a [Google Drive](https://drive.google.com)
2. Crear nueva carpeta: **"PDFs Evaluaciones Comodim"**
3. Copiar el ID de la carpeta (de la URL):
   ```
   Ejemplo URL: https://drive.google.com/drive/folders/1xyz789ABC123
   El ID es: 1xyz789ABC123
   ```

---

## PASO 2: Configurar Google Apps Script

### 2.1 Abrir Editor de Scripts

1. En la spreadsheet, ir a: **Extensiones** → **Apps Script**
2. Eliminar el código por defecto (`function myFunction()...`)

### 2.2 Pegar el Código

1. Copiar **TODO** el contenido del archivo `Code.gs`
2. Pegarlo en el editor
3. Cambiar nombre del archivo a: `Codigo`

### 2.3 Configurar IDs

Buscar estas dos líneas al inicio del código:
```javascript
const SPREADSHEET_ID = 'TU_ID_DE_SPREADSHEET';
const FOLDER_ID = 'TU_ID_DE_CARPETA';
```

Reemplazar con tus IDs:
```javascript
const SPREADSHEET_ID = '1abc123XYZ456';  // Tu ID de spreadsheet
const FOLDER_ID = '1xyz789ABC123';       // Tu ID de carpeta
```

### 2.4 Guardar el Proyecto

1. Hacer clic en el icono de **disco** o Ctrl+S
2. Nombrar el proyecto: **"Sistema Evaluación Comodim"**

---

## PASO 3: Implementar la Web App

### 3.1 Crear Implementación

1. En Apps Script, hacer clic en **Implementar** (botón azul arriba a la derecha)
2. Seleccionar **Nueva implementación**
3. Hacer clic en el engranaje junto a "Seleccionar tipo"
4. Elegir **Aplicación web**

### 3.2 Configurar la Implementación

Completar los campos:

**Descripción**: 
```
Sistema de Evaluación de Desempeño - Comodim v1.0
```

**Ejecutar como**: 
```
Yo (tu email)
```

**Quién tiene acceso**: 
```
Cualquier usuario
```
*Nota: Si quieres restringir, seleccionar "Solo usuarios de mi organización"*

### 3.3 Implementar

1. Hacer clic en **Implementar**
2. Autorizar permisos:
   - Hacer clic en **Autorizar acceso**
   - Seleccionar tu cuenta de Google
   - Hacer clic en **Avanzado**
   - Hacer clic en **Ir a Sistema Evaluación Comodim (no seguro)**
   - Hacer clic en **Permitir**

### 3.4 Copiar URL

Después de implementar, aparecerá una URL como:
```
https://script.google.com/macros/s/ABC123xyz/exec
```

**¡GUARDAR ESTA URL!** La necesitarás para el siguiente paso.

---

## PASO 4: Configurar Archivos Web

### 4.1 Actualizar script.js

1. Abrir el archivo `script.js`
2. Buscar la línea (aproximadamente línea 913):
   ```javascript
   const url = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
   ```

3. Reemplazar con tu URL:
   ```javascript
   const url = 'https://script.google.com/macros/s/ABC123xyz/exec';
   ```

### 4.2 Verificar Logos

En `index.html`, verificar que las URLs de los logos sean correctas:

```html
<!-- Logo header -->
<img src="https://imgur.com/tn0iB5X.png" alt="Escencial Logo" class="logo">

<!-- Favicon -->
<link rel="icon" href="https://imgur.com/jvTcCL7.png" type="image/png">
```

Si quieres usar tus propios logos:
1. Subir imágenes a Imgur o Google Drive
2. Obtener links públicos
3. Reemplazar las URLs

---

## PASO 5: Hospedar el Sistema

### Opción A: GitHub Pages (Recomendado - Gratis)

1. **Crear repositorio en GitHub**:
   - Ir a [GitHub](https://github.com)
   - Hacer clic en **New repository**
   - Nombre: `evaluacion-comodim`
   - Marcar **Public**
   - Crear repositorio

2. **Subir archivos**:
   - Hacer clic en **uploading an existing file**
   - Arrastrar los 3 archivos:
     - `index.html`
     - `styles.css`
     - `script.js`
   - Hacer clic en **Commit changes**

3. **Activar GitHub Pages**:
   - Ir a **Settings** del repositorio
   - Ir a **Pages** (menú lateral)
   - En **Source**, seleccionar `main` branch
   - Hacer clic en **Save**
   - Esperar 1-2 minutos

4. **Obtener URL**:
   Tu sistema estará en:
   ```
   https://TU-USUARIO.github.io/evaluacion-comodim/
   ```

### Opción B: Google Sites

1. Ir a [Google Sites](https://sites.google.com)
2. Crear nuevo sitio
3. Insertar elemento **Insertar código**
4. Pegar el código HTML completo
5. Publicar el sitio

### Opción C: Servidor Propio

Si tienes un servidor web:
1. Subir los 3 archivos a la carpeta pública
2. Acceder vía:
   ```
   https://tu-dominio.com/evaluacion/
   ```

---

## PASO 6: Probar el Sistema

### 6.1 Prueba Básica

1. Abrir la URL de tu sistema
2. Seleccionar **"Período de Prueba"**
3. Completar datos de prueba:
   - Nombre: Juan Pérez
   - DNI: 12345678
   - Puesto: Cajero
   - Etc.
4. Completar evaluación con valores aleatorios
5. Hacer clic en **Enviar Evaluación**

### 6.2 Verificar en Google Sheets

1. Abrir tu spreadsheet de Google Sheets
2. Debería aparecer una nueva hoja: **"Periodo de Prueba"**
3. Verificar que los datos estén guardados correctamente

### 6.3 Verificar PDF (si está configurado)

1. Ir a la carpeta de Google Drive que creaste
2. Debería aparecer un PDF con la evaluación

---

## PASO 7: Configuración de Emails (Opcional)

### 7.1 Habilitar Envío de Emails

En `Code.gs`, la función `enviarEmailConfirmacion()` ya está lista.

Para activarla, en el frontend (`script.js`), modificar la función `enviarEvaluacion()`:

```javascript
async function enviarEvaluacion() {
    mostrarLoading(true);
    
    respuestasEvaluacion = obtenerRespuestas();
    const puntaje = calcularPuntaje();
    
    // Preparar datos para enviar
    const datosCompletos = {
        tipo: tipoEvaluacionSeleccionada,
        datosEmpleado: datosEmpleado,
        respuestas: respuestasEvaluacion,
        generarPDF: true,        // ← Activar generación de PDF
        enviarEmail: true,        // ← Activar envío de email
        emailDestinatario: 'rrhh@comodim.com'  // ← Email destinatario
    };
    
    try {
        const resultado = await enviarAGoogleSheets(datosCompletos);
        mostrarLoading(false);
        mostrarConfirmacion(puntaje);
    } catch (error) {
        mostrarLoading(false);
        alert('Error al enviar evaluación: ' + error.message);
    }
}
```

---

## 📋 Checklist Final

Antes de poner en producción, verificar:

- [ ] Google Sheets creada y ID configurado
- [ ] Carpeta de Drive creada y ID configurado
- [ ] Apps Script configurado y desplegado
- [ ] URL del Apps Script copiada en script.js
- [ ] Archivos web hosteados y accesibles
- [ ] Prueba exitosa de evaluación
- [ ] Datos guardados correctamente en Sheets
- [ ] Logos cargando correctamente
- [ ] Sistema responsive en móvil
- [ ] Emails configurados (si aplica)
- [ ] PDFs generándose (si aplica)

---

## 🔧 Mantenimiento

### Actualizar Preguntas de Evaluación

Para modificar preguntas o agregar nuevas:

1. Abrir `script.js`
2. Buscar el objeto `competenciasPorTipo`
3. Modificar las competencias del tipo que necesites
4. Ejemplo para agregar una nueva competencia en "farmaceutico":

```javascript
{
    id: 'nueva_competencia',
    pregunta: 'Nueva Competencia',
    descripcion: 'Descripción de la nueva competencia'
}
```

5. **IMPORTANTE**: También actualizar `Code.gs`:
   - Buscar la función `crearEncabezados()`
   - Agregar el nuevo nombre de columna en `encabezadosEspecificos`

### Cambiar Escala de Evaluación

Para modificar la escala (ej: cambiar de 0-3 a 1-5):

1. Abrir `script.js`
2. Buscar `escalasEvaluacion`
3. Modificar los valores y descripciones
4. Ejemplo:

```javascript
'farmaceutico': [
    { valor: '1', label: 'Deficiente', descripcion: '...' },
    { valor: '2', label: 'Regular', descripcion: '...' },
    { valor: '3', label: 'Bueno', descripcion: '...' },
    { valor: '4', label: 'Muy Bueno', descripcion: '...' },
    { valor: '5', label: 'Excelente', descripcion: '...' }
]
```

---

## ⚠️ Errores Comunes y Soluciones

### Error: "Script function not found: doPost"

**Causa**: El código no está guardado o implementado correctamente.

**Solución**:
1. Guardar el código en Apps Script
2. Volver a implementar la aplicación web
3. Copiar la nueva URL

### Error: "Permission denied"

**Causa**: Falta autorización de permisos.

**Solución**:
1. Ir a Apps Script
2. Ejecutar función `testGuardarEvaluacion` manualmente
3. Autorizar todos los permisos

### Los datos no llegan a Sheets

**Causa**: URL incorrecta o problema de CORS.

**Solución**:
1. Verificar que la URL en `script.js` sea correcta
2. En Apps Script, verificar que "Quién tiene acceso" sea "Cualquier usuario"
3. Revisar la consola del navegador (F12) para ver errores

### El formulario se ve mal en móvil

**Causa**: Caché del navegador.

**Solución**:
1. Limpiar caché del navegador
2. Recargar con Ctrl+F5 (o Cmd+Shift+R en Mac)

---

## 📞 Contacto y Soporte

Para asistencia técnica:
- **Email**: soporte-ti@comodim.com
- **Interno**: Extensión 1234

---

**Última actualización**: Febrero 2025  
**Versión de la guía**: 1.0  
**Sistema**: Evaluación de Desempeño Comodim
