# Sistema de Evaluación de Desempeño - Comodim

Sistema web completo para gestionar evaluaciones de desempeño de empleados con integración a Google Sheets.

## 📋 Contenido del Proyecto

```
evaluacion-desempeno-comodim/
│
├── index.html          # Interfaz principal del sistema
├── styles.css          # Estilos y diseño visual
├── script.js           # Lógica del frontend
├── Code.gs            # Google Apps Script (backend)
└── README.md          # Este archivo
```

## 🚀 Características

### Tipos de Evaluación Soportados:

1. **Período de Prueba** - 6 competencias básicas
2. **Farmacéutico/Técnico Farmacéutico** - 24 competencias en 5 categorías
3. **Cajero** - 16 competencias en 5 categorías
4. **Auxiliar de Farmacia con Caja** - 18 competencias en 5 categorías
5. **Cajero y Repovolante** - 18 competencias en 5 categorías
6. **Control Interno** - 17 competencias en 5 categorías
7. **Evaluación Mensual Operativa** - 18 indicadores de gestión

### Funcionalidades:

- ✅ Formulario dinámico según tipo de evaluación
- ✅ Validación de datos en tiempo real
- ✅ Cálculo automático de puntajes
- ✅ Guardado de borradores en navegador
- ✅ Integración con Google Sheets
- ✅ Generación automática de PDFs
- ✅ Envío de emails de confirmación
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna e intuitiva

## 📦 Instalación

### Paso 1: Configurar Google Sheets

1. Crear una nueva Google Spreadsheet
2. Copiar el ID de la spreadsheet (está en la URL):
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### Paso 2: Crear Carpeta en Google Drive

1. Crear una carpeta en Google Drive para los PDFs
2. Copiar el ID de la carpeta (está en la URL):
   ```
   https://drive.google.com/drive/folders/[FOLDER_ID]
   ```

### Paso 3: Configurar Google Apps Script

1. Abrir la spreadsheet de Google Sheets
2. Ir a **Extensiones** > **Apps Script**
3. Eliminar el código por defecto
4. Copiar y pegar el contenido de `Code.gs`
5. Reemplazar estas líneas con tus IDs:
   ```javascript
   const SPREADSHEET_ID = 'TU_ID_DE_SPREADSHEET';
   const FOLDER_ID = 'TU_ID_DE_CARPETA';
   ```

### Paso 4: Implementar Web App

1. En el editor de Apps Script, hacer clic en **Implementar** > **Nueva implementación**
2. Seleccionar tipo: **Aplicación web**
3. Configurar:
   - **Descripción**: Sistema de Evaluación Comodim
   - **Ejecutar como**: Yo
   - **Quién tiene acceso**: Cualquier usuario
4. Hacer clic en **Implementar**
5. Copiar la **URL de la aplicación web**

### Paso 5: Configurar el Frontend

1. Abrir `script.js`
2. Buscar la línea:
   ```javascript
   const url = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
   ```
3. Reemplazar con la URL copiada en el paso anterior

### Paso 6: Hospedar los Archivos Web

Puedes hospedar los archivos HTML, CSS y JS en:

#### Opción A: Google Sites
1. Crear un nuevo Google Site
2. Insertar un elemento HTML personalizado
3. Pegar el código HTML completo

#### Opción B: GitHub Pages
1. Crear un repositorio en GitHub
2. Subir los archivos: `index.html`, `styles.css`, `script.js`
3. Activar GitHub Pages en la configuración del repositorio

#### Opción C: Servidor Web Propio
1. Subir los tres archivos a tu servidor
2. Asegurarte de que sean accesibles vía HTTP/HTTPS

## ⚙️ Configuración Adicional

### Personalizar Email de Confirmación

En `Code.gs`, modificar la función `enviarEmailConfirmacion()` para personalizar:
- Asunto del email
- Contenido del mensaje
- Destinatarios adicionales

### Personalizar Escalas de Evaluación

En `script.js`, modificar el objeto `escalasEvaluacion` para ajustar las escalas según necesidades.

### Agregar Nuevos Tipos de Evaluación

1. En `script.js`, agregar nueva entrada en `competenciasPorTipo`
2. En `Code.gs`, agregar nuevo caso en `crearEncabezados()`
3. Actualizar `SHEET_NAMES` con el nombre de la hoja

## 📊 Estructura de Datos en Google Sheets

Cada tipo de evaluación crea una hoja separada con:

### Columnas Comunes:
- Fecha/Hora
- Datos del Empleado (Nombre, DNI, Legajo, Puesto, etc.)
- Datos del Jefe Directo
- Período de Evaluación

### Columnas Específicas:
- Respuestas a cada competencia
- Aspectos destacados
- Plan de mejoras
- Comentarios
- **Puntaje Promedio** (calculado automáticamente)

### Formato Automático:
- Colores según puntaje:
  - 🟢 Verde (≥ 2.5): Supera expectativas
  - 🟡 Amarillo (1.5 - 2.4): Cumple expectativas
  - 🔴 Rojo (< 1.5): Necesita mejora

## 🎨 Personalización de Diseño

### Cambiar Colores

En `styles.css`, modificar las variables CSS:

```css
:root {
    --primary-color: #007bff;    /* Color principal */
    --primary-dark: #0056b3;     /* Color principal oscuro */
    --success-color: #28a745;    /* Color de éxito */
    /* ... más colores ... */
}
```

### Cambiar Logos

Reemplazar las URLs de las imágenes en `index.html`:

```html
<!-- Logo blanco (header) -->
<img src="https://imgur.com/tn0iB5X.png" alt="Escencial Logo" class="logo">

<!-- Logo negro (alternativo) -->
<img src="https://imgur.com/xPAholk.png" alt="Escencial Logo" class="logo">

<!-- Favicon -->
<link rel="icon" href="https://imgur.com/jvTcCL7.png" type="image/png">
```

## 📱 Uso del Sistema

### Para el Evaluador:

1. Acceder a la URL del sistema
2. Seleccionar el tipo de evaluación
3. Completar datos del empleado
4. Evaluar cada competencia usando la escala proporcionada
5. Agregar observaciones y comentarios
6. Enviar la evaluación

### Funciones Disponibles:

- **Guardar Borrador**: Guarda el progreso localmente
- **Enviar Evaluación**: Envía y guarda en Google Sheets
- **Descargar PDF**: Genera PDF de la evaluación
- **Nueva Evaluación**: Reinicia el formulario

## 🔒 Seguridad y Privacidad

- Los datos se almacenan en Google Sheets con permisos controlados
- Los borradores se guardan localmente en el navegador
- Las comunicaciones con Google Apps Script son seguras (HTTPS)
- Acceso restringido según configuración de Google Workspace

## 🐛 Solución de Problemas

### Error: "Script function not found"
- Verificar que el código de Apps Script esté guardado
- Implementar nuevamente la aplicación web

### Error: "Permission denied"
- Revisar permisos del script
- Autorizar el script la primera vez que se ejecuta

### Los datos no se guardan
- Verificar el SPREADSHEET_ID en Code.gs
- Comprobar la URL del Apps Script en script.js
- Revisar la consola del navegador (F12) para errores

### El formulario no se muestra correctamente
- Limpiar caché del navegador
- Verificar que todos los archivos (HTML, CSS, JS) estén cargados

## 📞 Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de TI de Comodim.

## 📄 Licencia

Sistema desarrollado exclusivamente para uso interno de Comodim.
Todos los derechos reservados © 2025 Comodim

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2025  
**Desarrollado para**: Comodim - Sistema de Evaluación de Desempeño
