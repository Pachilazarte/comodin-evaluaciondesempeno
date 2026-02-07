// ===== CONFIGURACIÓN Y DATOS =====

// Datos globales
let tipoEvaluacionSeleccionada = '';
let datosEmpleado = {};
let respuestasEvaluacion = {};

// Escalas de evaluación por tipo
const escalasEvaluacion = {
    'periodo-prueba': [
        { valor: 'M', label: 'No demostró', descripcion: 'Carece de la misma y tampoco cuenta con potencial de desarrollo en la misma.' },
        { valor: 'R', label: 'Demostró parcialmente', descripcion: 'Cuenta con conocimiento básico en la misma pero necesita desarrollo para adquirir un nivel de DEMOSTRÓ de la competencia.' },
        { valor: 'B', label: 'Demostró', descripcion: 'Cuenta con el conocimiento necesario para desarrollar la tarea.' },
        { valor: 'MB', label: 'Demostró totalmente', descripcion: 'Cuenta con un nivel de competencias superior al necesario para desarrollar la tarea.' }
    ],
    'farmaceutico': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido para el puesto' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente con lo requerido para el puesto. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple por lo requerido para el puesto' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido por el puesto' }
    ],
    'cajero': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido para el puesto' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente con lo requerido para el puesto. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple por lo requerido para el puesto' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido por el puesto' }
    ],
    'auxiliar-farmacia': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido para el puesto' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente con lo requerido para el puesto. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple por lo requerido para el puesto' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido por el puesto' }
    ],
    'cajero-repo': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido para el puesto' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente con lo requerido para el puesto. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple por lo requerido para el puesto' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido por el puesto' }
    ],
    'control-interno': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido para el puesto' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente con lo requerido para el puesto. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple por lo requerido para el puesto' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido por el puesto' }
    ],
    'mensual-operativo': [
        { valor: '0', label: 'No Satisface', descripcion: 'El evaluado no cumple con lo requerido' },
        { valor: '1', label: 'Satisface Parcial', descripcion: 'El evaluado cumple parcialmente. Necesita mejorar' },
        { valor: '2', label: 'Satisface', descripcion: 'El evaluado cumple con lo requerido' },
        { valor: '3', label: 'Supera', descripcion: 'El evaluado supera lo requerido' }
    ]
};

// Competencias por tipo de evaluación
const competenciasPorTipo = {
    'periodo-prueba': {
        titulo: 'Evaluación del Período de Prueba',
        categorias: [
            {
                nombre: 'Competencias Generales',
                competencias: [
                    {
                        id: 'conocimiento_trabajo',
                        pregunta: 'Conocimiento del Trabajo',
                        descripcion: 'Comprensión y entendimiento de las tareas, de los procedimientos y técnicas de trabajo'
                    },
                    {
                        id: 'responsabilidad',
                        pregunta: 'Responsabilidad',
                        descripcion: 'Compromiso en la realización de las tareas encomendadas y el resultado de las mismas'
                    },
                    {
                        id: 'busqueda_excelencia',
                        pregunta: 'Búsqueda de la excelencia',
                        descripcion: 'Compromiso con las cosas bien hechas y el afán por mejorar cada vez más'
                    },
                    {
                        id: 'aceptacion_normas',
                        pregunta: 'Aceptación de normas y políticas',
                        descripcion: 'Disposición para entender y actuar dentro de las directrices y normas organizacionales y sociales'
                    },
                    {
                        id: 'habilidades_sociales',
                        pregunta: 'Habilidades sociales',
                        descripcion: 'Colaboración espontánea y capacidad para establecer y mantener relaciones cordiales, recíprocas y cálidas'
                    },
                    {
                        id: 'trabajo_equipo',
                        pregunta: 'Trabajo en equipo',
                        descripcion: 'Capacidad de trabajar cooperativamente y de manera complementaria con otros, dentro y fuera de su área de trabajo'
                    }
                ]
            }
        ]
    },
    'farmaceutico': {
        titulo: 'Evaluación de Desempeño - Farmacéutico / Técnico Farmacéutico',
        categorias: [
            {
                nombre: '1. Orientación a resultados',
                competencias: [
                    {
                        id: 'ventas',
                        pregunta: '1.1. Ventas',
                        descripcion: 'Alcanza los resultados en ventas previstas para el período considerado'
                    },
                    {
                        id: 'quejas',
                        pregunta: '1.2. Quejas',
                        descripcion: 'Gestiona de manera efectiva las quejas o inquietudes que se presentan por los diferentes canales. Esto incluye dar feedback a los clientes'
                    },
                    {
                        id: 'faltantes_sobrantes',
                        pregunta: '1.3. Faltantes y Sobrantes',
                        descripcion: 'Administra el stock de medicamentos de forma tal que el físico y el sistema coinciden en todo momento'
                    }
                ]
            },
            {
                nombre: '2. Cumplimiento de Funciones',
                competencias: [
                    {
                        id: 'liquidaciones_obras',
                        pregunta: '2.1. Liquidaciones Obras Sociales',
                        descripcion: 'Presenta en tiempo y forma las liquidaciones de obras sociales en caso que se le solicite'
                    },
                    {
                        id: 'control_recetas',
                        pregunta: '2.2. Control de Recetas',
                        descripcion: 'Controla las recetas recepcionadas y expide los medicamentos adecuados, brindando un buen servicio'
                    },
                    {
                        id: 'abastecimiento',
                        pregunta: '2.3. Abastecimiento',
                        descripcion: 'Controla diariamente los productos vendidos para asegurar el stock al turno siguiente, asegurando una buena experiencia de compra'
                    },
                    {
                        id: 'instalaciones',
                        pregunta: '2.4. Instalaciones',
                        descripcion: 'Mantiene el área de trabajo limpio y agradables a la vista, ordenado, brindando un aspecto de seguridad y confort al cliente'
                    },
                    {
                        id: 'profesionalismo',
                        pregunta: '2.5. Profesionalismo',
                        descripcion: 'Cumple y hace cumplir las obligaciones, directrices y legislación nacional, incluidos los códigos de ética profesional y sobre estupefacientes y psicotrópicos'
                    },
                    {
                        id: 'liderazgo',
                        pregunta: '2.6. Liderazgo',
                        descripcion: 'Supervisa, guía y/o corrige de ser necesario a los demás colaboradores a su cargo'
                    }
                ]
            },
            {
                nombre: '3. Relaciones Interpersonales',
                competencias: [
                    {
                        id: 'comunicacion',
                        pregunta: '3.1. Comunicación',
                        descripcion: 'Posee la habilidad para mantener informado a pares, subordinados y superiores en tiempo y forma. Escuchar, preguntar y expresarse'
                    },
                    {
                        id: 'aprendizaje_continuo',
                        pregunta: '3.2. Aprendizaje continuo',
                        descripcion: 'Esta dispuesto a incorporar nuevos conocimientos brindados por el equipo, o mejores prácticas que permitan asumir nuevos desafíos o mejorar su tarea'
                    },
                    {
                        id: 'trabajo_equipo',
                        pregunta: '3.3. Trabajo en Equipo',
                        descripcion: 'Es una persona que coopera con el trabajo del compañero y actúa con facilidad en equipo. Propicia el aporte de cada miembro de la farmacia para proponer y poner en práctica nuevas y mejores formas de trabajo'
                    }
                ]
            },
            {
                nombre: '4. Enfoque en el Cliente',
                competencias: [
                    {
                        id: 'cortesia',
                        pregunta: '4.1. Cortesía',
                        descripcion: 'Trata con amabilidad, consideración y buena educación a sus clientes / pacientes'
                    },
                    {
                        id: 'asesoramiento',
                        pregunta: '4.2. Asesoramiento',
                        descripcion: 'Proporciona asesoramiento o recomendaciones a los clientes basado en evidencia científica actualizada, de manera objetiva, comprensible, no promocional, precisa y apropiada'
                    },
                    {
                        id: 'confianza',
                        pregunta: '4.3. Confianza',
                        descripcion: 'Brinda confianza y seguridad en la compra al cliente, denotando el conocimiento que posee sobre lo que ofrece y gestionando ante el médico prescriptor ante dudas o discrepancias'
                    },
                    {
                        id: 'satisfaccion_necesidades',
                        pregunta: '4.4. Satisfacción de necesidades',
                        descripcion: 'Busca la satisfacción total de las necesidades de los clientes ofreciendo alternativas de forma tal de convertirse en una solución para el cliente'
                    },
                    {
                        id: 'solucion_conflictos',
                        pregunta: '4.5. Solución de Conflictos',
                        descripcion: 'Sabe resolver conflictos que se generen con el cliente, tomando la mejor solución posible para mantener el buen servicio y evitar la disconformidad del cliente'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento de normativas',
                competencias: [
                    {
                        id: 'adhesion_normas',
                        pregunta: '5.1. Adhesión a normas y políticas',
                        descripcion: 'Entiende, se compromete, cumple y actúa dentro de las directrices y normas organizacionales y sociales'
                    },
                    {
                        id: 'conocimiento_trabajo',
                        pregunta: '5.2. Conocimiento del trabajo',
                        descripcion: 'Conoce y cumple con los procedimientos y tareas en el ejercicio diario de sus funciones'
                    },
                    {
                        id: 'puntualidad',
                        pregunta: '5.3. Puntualidad',
                        descripcion: 'Ingresa a su jornada de trabajo en el horario establecido'
                    },
                    {
                        id: 'imagen_presencia',
                        pregunta: '5.4. Imagen y presencia',
                        descripcion: 'Cumple con los aspectos de arreglo personal, higiene y cuidado de su indumentaria planteados por la empresa'
                    },
                    {
                        id: 'higiene_seguridad',
                        pregunta: '5.5. Higiene y Seguridad',
                        descripcion: 'Conoce los riesgos laborales de su tarea y utiliza los elementos de protección personal pertinentes'
                    }
                ]
            }
        ]
    },
    'cajero': {
        titulo: 'Evaluación de Desempeño - Cajero',
        categorias: [
            {
                nombre: '1. Orientación a resultados',
                competencias: [
                    {
                        id: 'ventas',
                        pregunta: '1.1. Ventas',
                        descripcion: 'Alcanza los resultados en ventas previstas para el período considerado'
                    },
                    {
                        id: 'arqueo_caja',
                        pregunta: '1.2. Arqueo de caja',
                        descripcion: 'Realiza correctamente el arqueo de caja, cuadrando los montos al finalizar su turno'
                    },
                    {
                        id: 'faltantes_sobrantes',
                        pregunta: '1.3. Faltantes y Sobrantes',
                        descripcion: 'Minimiza los faltantes y sobrantes en caja, manteniendo un control riguroso del efectivo'
                    }
                ]
            },
            {
                nombre: '2. Cumplimiento de Funciones',
                competencias: [
                    {
                        id: 'atencion_cliente',
                        pregunta: '2.1. Atención al Cliente',
                        descripcion: 'Atiende a los clientes de manera eficiente, cortés y profesional'
                    },
                    {
                        id: 'operacion_caja',
                        pregunta: '2.2. Operación de Caja',
                        descripcion: 'Maneja correctamente el sistema de caja, procesando transacciones con precisión'
                    },
                    {
                        id: 'cobro_medios_pago',
                        pregunta: '2.3. Cobro y Medios de Pago',
                        descripcion: 'Gestiona correctamente los diferentes medios de pago (efectivo, tarjetas, obras sociales)'
                    },
                    {
                        id: 'orden_limpieza',
                        pregunta: '2.4. Orden y Limpieza',
                        descripcion: 'Mantiene su área de trabajo limpia, ordenada y presentable'
                    }
                ]
            },
            {
                nombre: '3. Relaciones Interpersonales',
                competencias: [
                    {
                        id: 'comunicacion',
                        pregunta: '3.1. Comunicación',
                        descripcion: 'Se comunica efectivamente con clientes, compañeros y superiores'
                    },
                    {
                        id: 'trabajo_equipo',
                        pregunta: '3.2. Trabajo en Equipo',
                        descripcion: 'Colabora con el equipo y apoya cuando es necesario'
                    },
                    {
                        id: 'resolucion_problemas',
                        pregunta: '3.3. Resolución de Problemas',
                        descripcion: 'Resuelve situaciones problemáticas de manera efectiva y profesional'
                    }
                ]
            },
            {
                nombre: '4. Enfoque en el Cliente',
                competencias: [
                    {
                        id: 'cortesia',
                        pregunta: '4.1. Cortesía',
                        descripcion: 'Trata a los clientes con amabilidad y respeto en todo momento'
                    },
                    {
                        id: 'rapidez_atencion',
                        pregunta: '4.2. Rapidez en la Atención',
                        descripcion: 'Atiende a los clientes de manera ágil, minimizando tiempos de espera'
                    },
                    {
                        id: 'manejo_quejas',
                        pregunta: '4.3. Manejo de Quejas',
                        descripcion: 'Gestiona las quejas de clientes de forma profesional y efectiva'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento de normativas',
                competencias: [
                    {
                        id: 'adhesion_normas',
                        pregunta: '5.1. Adhesión a normas',
                        descripcion: 'Cumple con las políticas y procedimientos de la empresa'
                    },
                    {
                        id: 'puntualidad',
                        pregunta: '5.2. Puntualidad',
                        descripcion: 'Cumple con los horarios establecidos de entrada y salida'
                    },
                    {
                        id: 'imagen_presencia',
                        pregunta: '5.3. Imagen y Presencia',
                        descripcion: 'Mantiene una imagen profesional acorde a los estándares de la empresa'
                    }
                ]
            }
        ]
    },
    'auxiliar-farmacia': {
        titulo: 'Evaluación de Desempeño - Auxiliar de Farmacia con Manejo de Caja',
        categorias: [
            {
                nombre: '1. Orientación a resultados',
                competencias: [
                    {
                        id: 'ventas',
                        pregunta: '1.1. Ventas',
                        descripcion: 'Contribuye al alcance de los resultados de ventas del local'
                    },
                    {
                        id: 'manejo_caja',
                        pregunta: '1.2. Manejo de Caja',
                        descripcion: 'Realiza correctamente las operaciones de caja, cuadrando los montos'
                    },
                    {
                        id: 'stock_medicamentos',
                        pregunta: '1.3. Stock de Medicamentos',
                        descripcion: 'Colabora en el control y orden del stock de medicamentos'
                    }
                ]
            },
            {
                nombre: '2. Cumplimiento de Funciones',
                competencias: [
                    {
                        id: 'atencion_mostrador',
                        pregunta: '2.1. Atención en Mostrador',
                        descripcion: 'Atiende a clientes en mostrador de forma eficiente y cortés'
                    },
                    {
                        id: 'dispensacion_medicamentos',
                        pregunta: '2.2. Dispensación de Medicamentos',
                        descripcion: 'Dispensa medicamentos de venta libre correctamente bajo supervisión farmacéutica'
                    },
                    {
                        id: 'operacion_caja',
                        pregunta: '2.3. Operación de Caja',
                        descripcion: 'Maneja el sistema de caja y procesa transacciones correctamente'
                    },
                    {
                        id: 'orden_limpieza',
                        pregunta: '2.4. Orden y Limpieza',
                        descripcion: 'Mantiene el área de trabajo limpia y ordenada'
                    },
                    {
                        id: 'reposicion',
                        pregunta: '2.5. Reposición',
                        descripcion: 'Colabora en la reposición de productos en góndolas y vitrinas'
                    }
                ]
            },
            {
                nombre: '3. Relaciones Interpersonales',
                competencias: [
                    {
                        id: 'comunicacion',
                        pregunta: '3.1. Comunicación',
                        descripcion: 'Se comunica efectivamente con el equipo y clientes'
                    },
                    {
                        id: 'trabajo_equipo',
                        pregunta: '3.2. Trabajo en Equipo',
                        descripcion: 'Colabora activamente con farmacéuticos y demás personal'
                    },
                    {
                        id: 'aprendizaje',
                        pregunta: '3.3. Aprendizaje',
                        descripcion: 'Muestra disposición para aprender y mejorar continuamente'
                    }
                ]
            },
            {
                nombre: '4. Enfoque en el Cliente',
                competencias: [
                    {
                        id: 'cortesia',
                        pregunta: '4.1. Cortesía',
                        descripcion: 'Trata a los clientes con amabilidad y profesionalismo'
                    },
                    {
                        id: 'orientacion_cliente',
                        pregunta: '4.2. Orientación al Cliente',
                        descripcion: 'Ayuda al cliente a encontrar productos y deriva consultas al farmacéutico cuando corresponde'
                    },
                    {
                        id: 'rapidez',
                        pregunta: '4.3. Rapidez',
                        descripcion: 'Atiende con agilidad minimizando tiempos de espera'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento de normativas',
                competencias: [
                    {
                        id: 'normas_procedimientos',
                        pregunta: '5.1. Normas y Procedimientos',
                        descripcion: 'Cumple con las políticas y procedimientos establecidos'
                    },
                    {
                        id: 'puntualidad',
                        pregunta: '5.2. Puntualidad',
                        descripcion: 'Cumple con los horarios de trabajo establecidos'
                    },
                    {
                        id: 'imagen_presencia',
                        pregunta: '5.3. Imagen y Presencia',
                        descripcion: 'Mantiene una imagen profesional y presentable'
                    },
                    {
                        id: 'higiene_seguridad',
                        pregunta: '5.4. Higiene y Seguridad',
                        descripcion: 'Conoce y aplica normas de higiene y seguridad'
                    }
                ]
            }
        ]
    },
    'cajero-repo': {
        titulo: 'Evaluación de Desempeño - Cajero y Repovolante',
        categorias: [
            {
                nombre: '1. Orientación a resultados',
                competencias: [
                    {
                        id: 'ventas',
                        pregunta: '1.1. Ventas',
                        descripcion: 'Contribuye al logro de objetivos de ventas del local'
                    },
                    {
                        id: 'caja',
                        pregunta: '1.2. Gestión de Caja',
                        descripcion: 'Realiza arqueos correctos y mantiene cuadrada la caja'
                    },
                    {
                        id: 'reposicion',
                        pregunta: '1.3. Reposición',
                        descripcion: 'Realiza la reposición de productos de manera eficiente'
                    }
                ]
            },
            {
                nombre: '2. Cumplimiento de Funciones',
                competencias: [
                    {
                        id: 'atencion_caja',
                        pregunta: '2.1. Atención en Caja',
                        descripcion: 'Atiende en caja de forma eficiente y cortés'
                    },
                    {
                        id: 'reposicion_gondolas',
                        pregunta: '2.2. Reposición en Góndolas',
                        descripcion: 'Repone productos manteniendo orden y rotación adecuada'
                    },
                    {
                        id: 'control_stock',
                        pregunta: '2.3. Control de Stock',
                        descripcion: 'Colabora en el control de stock y vencimientos'
                    },
                    {
                        id: 'orden_limpieza',
                        pregunta: '2.4. Orden y Limpieza',
                        descripcion: 'Mantiene limpio y ordenado tanto el área de caja como de reposición'
                    },
                    {
                        id: 'flexibilidad',
                        pregunta: '2.5. Flexibilidad',
                        descripcion: 'Se adapta eficientemente a las necesidades de caja y reposición según demanda'
                    }
                ]
            },
            {
                nombre: '3. Relaciones Interpersonales',
                competencias: [
                    {
                        id: 'comunicacion',
                        pregunta: '3.1. Comunicación',
                        descripcion: 'Se comunica efectivamente con el equipo y clientes'
                    },
                    {
                        id: 'trabajo_equipo',
                        pregunta: '3.2. Trabajo en Equipo',
                        descripcion: 'Colabora con el equipo en ambas funciones'
                    },
                    {
                        id: 'iniciativa',
                        pregunta: '3.3. Iniciativa',
                        descripcion: 'Toma iniciativa para resolver situaciones sin necesidad de supervisión constante'
                    }
                ]
            },
            {
                nombre: '4. Enfoque en el Cliente',
                competencias: [
                    {
                        id: 'cortesia',
                        pregunta: '4.1. Cortesía',
                        descripcion: 'Trata a los clientes con amabilidad'
                    },
                    {
                        id: 'rapidez',
                        pregunta: '4.2. Rapidez',
                        descripcion: 'Atiende con agilidad en caja'
                    },
                    {
                        id: 'disponibilidad',
                        pregunta: '4.3. Disponibilidad de Productos',
                        descripcion: 'Asegura disponibilidad de productos mediante reposición oportuna'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento de normativas',
                competencias: [
                    {
                        id: 'normas',
                        pregunta: '5.1. Cumplimiento de Normas',
                        descripcion: 'Cumple con políticas y procedimientos'
                    },
                    {
                        id: 'puntualidad',
                        pregunta: '5.2. Puntualidad',
                        descripcion: 'Cumple horarios establecidos'
                    },
                    {
                        id: 'imagen',
                        pregunta: '5.3. Imagen Personal',
                        descripcion: 'Mantiene imagen profesional'
                    },
                    {
                        id: 'seguridad',
                        pregunta: '5.4. Seguridad',
                        descripcion: 'Aplica normas de seguridad en manejo de productos y caja'
                    }
                ]
            }
        ]
    },
    'control-interno': {
        titulo: 'Evaluación de Desempeño - Control Interno',
        categorias: [
            {
                nombre: '1. Orientación a resultados',
                competencias: [
                    {
                        id: 'cumplimiento_auditorias',
                        pregunta: '1.1. Cumplimiento de Auditorías',
                        descripcion: 'Realiza las auditorías programadas en tiempo y forma'
                    },
                    {
                        id: 'deteccion_irregularidades',
                        pregunta: '1.2. Detección de Irregularidades',
                        descripcion: 'Identifica y reporta irregularidades de manera efectiva'
                    },
                    {
                        id: 'seguimiento',
                        pregunta: '1.3. Seguimiento',
                        descripcion: 'Realiza seguimiento de acciones correctivas implementadas'
                    }
                ]
            },
            {
                nombre: '2. Cumplimiento de Funciones',
                competencias: [
                    {
                        id: 'elaboracion_informes',
                        pregunta: '2.1. Elaboración de Informes',
                        descripcion: 'Elabora informes claros, precisos y oportunos'
                    },
                    {
                        id: 'revision_procesos',
                        pregunta: '2.2. Revisión de Procesos',
                        descripcion: 'Revisa procesos verificando cumplimiento de normativas'
                    },
                    {
                        id: 'control_inventarios',
                        pregunta: '2.3. Control de Inventarios',
                        descripcion: 'Realiza controles de inventario de manera exhaustiva'
                    },
                    {
                        id: 'verificacion_documentacion',
                        pregunta: '2.4. Verificación de Documentación',
                        descripcion: 'Verifica que la documentación esté completa y correcta'
                    },
                    {
                        id: 'objetividad',
                        pregunta: '2.5. Objetividad',
                        descripcion: 'Mantiene objetividad e imparcialidad en sus evaluaciones'
                    }
                ]
            },
            {
                nombre: '3. Competencias Técnicas',
                competencias: [
                    {
                        id: 'conocimiento_normativas',
                        pregunta: '3.1. Conocimiento de Normativas',
                        descripcion: 'Conoce y aplica normativas y regulaciones vigentes'
                    },
                    {
                        id: 'analisis_datos',
                        pregunta: '3.2. Análisis de Datos',
                        descripcion: 'Analiza datos e identifica patrones o anomalías'
                    },
                    {
                        id: 'sistemas',
                        pregunta: '3.3. Manejo de Sistemas',
                        descripcion: 'Utiliza eficientemente los sistemas de gestión y control'
                    }
                ]
            },
            {
                nombre: '4. Relaciones Interpersonales',
                competencias: [
                    {
                        id: 'comunicacion',
                        pregunta: '4.1. Comunicación',
                        descripcion: 'Comunica hallazgos de manera clara y profesional'
                    },
                    {
                        id: 'confidencialidad',
                        pregunta: '4.2. Confidencialidad',
                        descripcion: 'Mantiene confidencialidad de la información sensible'
                    },
                    {
                        id: 'colaboracion',
                        pregunta: '4.3. Colaboración',
                        descripcion: 'Colabora con las áreas auditadas de manera constructiva'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento de normativas',
                competencias: [
                    {
                        id: 'etica',
                        pregunta: '5.1. Ética Profesional',
                        descripcion: 'Actúa con integridad y ética profesional'
                    },
                    {
                        id: 'puntualidad',
                        pregunta: '5.2. Puntualidad',
                        descripcion: 'Cumple con horarios y plazos establecidos'
                    },
                    {
                        id: 'actualizacion',
                        pregunta: '5.3. Actualización Continua',
                        descripcion: 'Se mantiene actualizado en normativas y mejores prácticas'
                    }
                ]
            }
        ]
    },
    'mensual-operativo': {
        titulo: 'Evaluación Mensual de Desempeño Operativo',
        categorias: [
            {
                nombre: '1. Indicadores de Gestión',
                competencias: [
                    {
                        id: 'cumplimiento_ventas',
                        pregunta: '1.1. Cumplimiento de Ventas',
                        descripcion: 'Alcanza o supera los objetivos de ventas mensuales'
                    },
                    {
                        id: 'rentabilidad',
                        pregunta: '1.2. Rentabilidad',
                        descripcion: 'Gestiona la operación manteniendo o mejorando los márgenes de rentabilidad'
                    },
                    {
                        id: 'control_gastos',
                        pregunta: '1.3. Control de Gastos',
                        descripcion: 'Mantiene los gastos operativos dentro del presupuesto'
                    }
                ]
            },
            {
                nombre: '2. Operatividad Funcional',
                competencias: [
                    {
                        id: 'gestion_stock',
                        pregunta: '2.1. Gestión de Stock',
                        descripcion: 'Mantiene niveles óptimos de stock y rotación de productos'
                    },
                    {
                        id: 'control_vencimientos',
                        pregunta: '2.2. Control de Vencimientos',
                        descripcion: 'Gestiona adecuadamente productos próximos a vencer'
                    },
                    {
                        id: 'arqueos',
                        pregunta: '2.3. Arqueos',
                        descripcion: 'Realiza y supervisa arqueos de caja con precisión'
                    },
                    {
                        id: 'conciliaciones',
                        pregunta: '2.4. Conciliaciones',
                        descripcion: 'Realiza conciliaciones bancarias y de tarjetas en tiempo y forma'
                    }
                ]
            },
            {
                nombre: '3. Gestión de Personal',
                competencias: [
                    {
                        id: 'supervision_equipo',
                        pregunta: '3.1. Supervisión de Equipo',
                        descripcion: 'Supervisa efectivamente al equipo de trabajo'
                    },
                    {
                        id: 'capacitacion',
                        pregunta: '3.2. Capacitación',
                        descripcion: 'Capacita y desarrolla a su equipo continuamente'
                    },
                    {
                        id: 'gestion_turnos',
                        pregunta: '3.3. Gestión de Turnos',
                        descripcion: 'Organiza turnos y horarios eficientemente'
                    },
                    {
                        id: 'clima_laboral',
                        pregunta: '3.4. Clima Laboral',
                        descripcion: 'Mantiene un clima laboral positivo y productivo'
                    }
                ]
            },
            {
                nombre: '4. Atención al Cliente',
                competencias: [
                    {
                        id: 'satisfaccion_cliente',
                        pregunta: '4.1. Satisfacción del Cliente',
                        descripcion: 'Gestiona la experiencia del cliente logrando alta satisfacción'
                    },
                    {
                        id: 'resolucion_reclamos',
                        pregunta: '4.2. Resolución de Reclamos',
                        descripcion: 'Resuelve reclamos de manera efectiva y oportuna'
                    },
                    {
                        id: 'imagen_local',
                        pregunta: '4.3. Imagen del Local',
                        descripcion: 'Mantiene el local limpio, ordenado y atractivo'
                    }
                ]
            },
            {
                nombre: '5. Cumplimiento Normativo',
                competencias: [
                    {
                        id: 'normativas_farmaceuticas',
                        pregunta: '5.1. Normativas Farmacéuticas',
                        descripcion: 'Cumple con todas las normativas farmacéuticas vigentes'
                    },
                    {
                        id: 'procedimientos_internos',
                        pregunta: '5.2. Procedimientos Internos',
                        descripcion: 'Aplica y hace cumplir los procedimientos internos'
                    },
                    {
                        id: 'reportes',
                        pregunta: '5.3. Reportes',
                        descripcion: 'Presenta reportes requeridos en tiempo y forma'
                    },
                    {
                        id: 'higiene_seguridad',
                        pregunta: '5.4. Higiene y Seguridad',
                        descripcion: 'Implementa y supervisa normas de higiene y seguridad'
                    }
                ]
            }
        ]
    }
};

// ===== FUNCIONES DE NAVEGACIÓN =====

function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(seccionId).classList.remove('hidden');
}

function volverTipoEvaluacion() {
    mostrarSeccion('tipo-evaluacion-section');
    tipoEvaluacionSeleccionada = '';
}

function volverDatosEmpleado() {
    mostrarSeccion('datos-empleado-section');
}

function nuevaEvaluacion() {
    location.reload();
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
});

function inicializarEventos() {
    // Eventos para selección de tipo de evaluación
    document.querySelectorAll('.tipo-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            tipoEvaluacionSeleccionada = this.dataset.tipo;
            mostrarSeccion('datos-empleado-section');
        });
    });

    // Evento para formulario de datos del empleado
    document.getElementById('datos-empleado-form').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarDatosEmpleado();
        generarFormularioEvaluacion();
        mostrarSeccion('evaluacion-section');
    });

    // Evento para formulario de evaluación
    document.getElementById('evaluacion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        enviarEvaluacion();
    });

    // Eventos para campos condicionales
    document.querySelectorAll('input[name="ausentismo"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const diasInput = document.getElementById('dias-ausentes');
            if (this.value === 'SI') {
                diasInput.classList.remove('hidden');
            } else {
                diasInput.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('input[name="sanciones"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const detalleTextarea = document.getElementById('detalle-sanciones');
            if (this.value === 'SI') {
                detalleTextarea.classList.remove('hidden');
            } else {
                detalleTextarea.classList.add('hidden');
            }
        });
    });
}

// ===== FUNCIONES DE PROCESAMIENTO =====

function guardarDatosEmpleado() {
    datosEmpleado = {
        nombreApellido: document.getElementById('nombre-apellido').value,
        dni: document.getElementById('dni').value,
        legajo: document.getElementById('legajo').value,
        puesto: document.getElementById('puesto').value,
        categoria: document.getElementById('categoria').value,
        area: document.getElementById('area').value,
        fechaIngreso: document.getElementById('fecha-ingreso').value,
        local: document.getElementById('local').value,
        jefeNombre: document.getElementById('jefe-nombre').value,
        jefeLegajo: document.getElementById('jefe-legajo').value,
        jefePuesto: document.getElementById('jefe-puesto').value,
        periodoEvaluacion: document.getElementById('periodo-evaluacion').value
    };
}

function generarFormularioEvaluacion() {
    const config = competenciasPorTipo[tipoEvaluacionSeleccionada];
    const escala = escalasEvaluacion[tipoEvaluacionSeleccionada];
    
    // Actualizar título
    document.getElementById('evaluacion-titulo').textContent = config.titulo;
    
    // Mostrar resumen de datos
    mostrarResumenDatos();
    
    // Generar escala de evaluación
    generarEscalaEvaluacion(escala);
    
    // Generar competencias
    generarCompetencias(config.categorias, escala);
    
    // Mostrar sección adicional si es período de prueba
    if (tipoEvaluacionSeleccionada === 'periodo-prueba') {
        document.getElementById('seccion-adicional').classList.remove('hidden');
    }
}

function mostrarResumenDatos() {
    const resumen = document.getElementById('datos-resumen');
    resumen.innerHTML = `
        <div class="dato-item">
            <span class="dato-label">Empleado</span>
            <span class="dato-valor">${datosEmpleado.nombreApellido}</span>
        </div>
        <div class="dato-item">
            <span class="dato-label">DNI</span>
            <span class="dato-valor">${datosEmpleado.dni}</span>
        </div>
        <div class="dato-item">
            <span class="dato-label">Puesto</span>
            <span class="dato-valor">${datosEmpleado.puesto}</span>
        </div>
        <div class="dato-item">
            <span class="dato-label">Local/Sucursal</span>
            <span class="dato-valor">${datosEmpleado.local}</span>
        </div>
        <div class="dato-item">
            <span class="dato-label">Evaluador</span>
            <span class="dato-valor">${datosEmpleado.jefeNombre}</span>
        </div>
        <div class="dato-item">
            <span class="dato-label">Período</span>
            <span class="dato-valor">${datosEmpleado.periodoEvaluacion || 'N/A'}</span>
        </div>
    `;
}

function generarEscalaEvaluacion(escala) {
    const container = document.getElementById('escala-grid');
    container.innerHTML = escala.map(item => `
        <div class="escala-item">
            <div class="valor">${item.label} (${item.valor})</div>
            <div class="descripcion">${item.descripcion}</div>
        </div>
    `).join('');
}

function generarCompetencias(categorias, escala) {
    const container = document.getElementById('competencias-container');
    container.innerHTML = categorias.map((categoria, catIndex) => `
        <div class="competencia-categoria">
            <div class="categoria-header">${categoria.nombre}</div>
            ${categoria.competencias.map((comp, compIndex) => `
                <div class="competencia-item">
                    <div class="competencia-pregunta">${comp.pregunta}</div>
                    <div class="competencia-descripcion">${comp.descripcion}</div>
                    <div class="opciones-evaluacion">
                        ${escala.map(opcion => `
                            <label class="opcion-radio">
                                <input type="radio" 
                                       name="comp_${categoria.nombre}_${comp.id}" 
                                       value="${opcion.valor}"
                                       required>
                                <span>${opcion.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    // Añadir evento para resaltar opción seleccionada
    document.querySelectorAll('.opcion-radio').forEach(label => {
        label.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            const name = radio.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.opcion-radio').classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}

function guardarBorrador() {
    const borrador = {
        tipo: tipoEvaluacionSeleccionada,
        datosEmpleado: datosEmpleado,
        respuestas: obtenerRespuestas(),
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('borrador_evaluacion', JSON.stringify(borrador));
    
    alert('Borrador guardado exitosamente');
}

function obtenerRespuestas() {
    const respuestas = {};
    
    // Obtener respuestas de competencias
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        respuestas[radio.name] = radio.value;
    });
    
    // Obtener datos adicionales si es período de prueba
    if (tipoEvaluacionSeleccionada === 'periodo-prueba') {
        const ausentismoRadio = document.querySelector('input[name="ausentismo"]:checked');
        const sancionesRadio = document.querySelector('input[name="sanciones"]:checked');
        const desvinculacionRadio = document.querySelector('input[name="desvinculacion"]:checked');
        
        respuestas.ausentismo = ausentismoRadio ? ausentismoRadio.value : null;
        respuestas.diasAusentes = document.getElementById('dias-ausentes').value;
        respuestas.sanciones = sancionesRadio ? sancionesRadio.value : null;
        respuestas.detalleSanciones = document.getElementById('detalle-sanciones').value;
        respuestas.desvinculacion = desvinculacionRadio ? desvinculacionRadio.value : null;
    }
    
    // Obtener observaciones
    respuestas.aspectosDestacados = document.getElementById('aspectos-destacados').value;
    respuestas.habilidades = document.getElementById('habilidades').value;
    respuestas.planMejoras = document.getElementById('plan-mejoras').value;
    respuestas.comentarios = document.getElementById('comentarios').value;
    
    return respuestas;
}

function calcularPuntaje() {
    const respuestas = obtenerRespuestas();
    let total = 0;
    let cantidad = 0;
    
    Object.entries(respuestas).forEach(([key, value]) => {
        if (key.startsWith('comp_') && !isNaN(value)) {
            total += parseInt(value);
            cantidad++;
        }
    });
    
    return cantidad > 0 ? (total / cantidad).toFixed(2) : 0;
}

function enviarEvaluacion() {
    mostrarLoading(true);
    
    respuestasEvaluacion = obtenerRespuestas();
    const puntaje = calcularPuntaje();
    
    // Simular envío (aquí iría la integración con Google Apps Script)
    setTimeout(() => {
        mostrarLoading(false);
        mostrarConfirmacion(puntaje);
    }, 2000);
}

function mostrarLoading(mostrar) {
    const overlay = document.getElementById('loading-overlay');
    if (mostrar) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function mostrarConfirmacion(puntaje) {
    const resumenFinal = document.getElementById('resumen-final');
    const config = competenciasPorTipo[tipoEvaluacionSeleccionada];
    
    resumenFinal.innerHTML = `
        <h3>Resumen de la Evaluación</h3>
        <div class="datos-resumen">
            <div class="dato-item">
                <span class="dato-label">Empleado</span>
                <span class="dato-valor">${datosEmpleado.nombreApellido}</span>
            </div>
            <div class="dato-item">
                <span class="dato-label">Tipo de Evaluación</span>
                <span class="dato-valor">${config.titulo}</span>
            </div>
            <div class="dato-item">
                <span class="dato-label">Puntaje Promedio</span>
                <span class="dato-valor" style="font-size: 1.5rem; color: var(--primary-color);">${puntaje}</span>
            </div>
            <div class="dato-item">
                <span class="dato-label">Fecha</span>
                <span class="dato-valor">${new Date().toLocaleDateString('es-AR')}</span>
            </div>
        </div>
    `;
    
    mostrarSeccion('confirmacion-section');
}

function descargarPDF() {
    alert('Función de descarga de PDF en desarrollo. Se integrará con la generación de PDF del backend.');
    // Aquí iría la lógica para generar y descargar el PDF
}

// ===== INTEGRACIÓN CON GOOGLE APPS SCRIPT =====

async function enviarEvaluacion() {
    mostrarLoading(true);

    // 1. Recolectamos todos los datos en un solo objeto estructurado
    const datosParaEnviar = {
        tipo: tipoEvaluacionSeleccionada,
        datosEmpleado: datosEmpleado,
        respuestas: obtenerRespuestas()
    };

    // 2. Llamamos a la función de envío
    const resultado = await enviarAGoogleSheets(datosParaEnviar);

    if (resultado.success) {
        mostrarLoading(false);
        const puntaje = calcularPuntaje();
        mostrarConfirmacion(puntaje);
    } else {
        mostrarLoading(false);
        alert("Error al enviar la evaluación: " + resultado.error);
    }
}

async function enviarAGoogleSheets(datos) {
    const url = 'https://script.google.com/macros/s/AKfycbyAXZeV4IAtuR8Xaj8KpMnfW9pOCt1JdCnt4j1YlR61nWoHbCgAkIKBv3U6pzpP9MgV/exec';
    
    try {
        // Al usar 'no-cors', el navegador envía los datos pero no permite leer la respuesta.
        // Por eso forzamos el éxito a menos que el fetch mismo falle catastróficamente.
        await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Mantenemos esto para evitar bloqueos de seguridad
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error al enviar datos:', error);
        return { success: false, error: error.message };
    }
}