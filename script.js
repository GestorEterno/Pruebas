// ============================================================
// OLYMPUS · GALAXIA CORPORATIVA - ESTRUCTURA FINAL (CORREGIDA)
// ============================================================
// ✅ Cambios aplicados:
//   - Intercambio de orden: MINDSET primero, TECHNOLOGY cuarto.
//   - MINDSET: 
//       * Compañía → MINDSET DIVISION (empresa)
//       * De MINDSET DIVISION:
//           → APLICACIONES (subempresa) que contiene las 4 apps (subempresas sin departamentos):
//                TEMPO, NOEMA, VITALION, OLYMPUS
//           → 3 departamentos: Programación (5 emp.), Legal (1 emp.), Testers (3 emp.)
//   - Corrección en computeBoundingRadii y placeAllNodes para manejar múltiples niveles de subempresas.
//   - Aumentado MAX_LENGTH a 15 para evitar particiones.
// ============================================================

// ==================== CONFIGURACIÓN GLOBAL ====================
const CONFIG = {
    width: 0,
    height: 0,

    sizes: {
        nucleo:      { widthBase: 280, heightBase: 120, padding: 24 },
        compania:    { widthBase: 240, heightBase: 100, padding: 20 },
        empresa:     { widthBase: 200, heightBase: 80,  padding: 18 },
        subEmpresa:  { widthBase: 160, heightBase: 60,  padding: 16 },
        departamento: { widthBase: 140, heightBase: 50, padding: 12 }
    },

    colors: {
        nucleo: '#ffd166',
        compania1: '#b583df',   // OLYMPUS MINDSET
        compania2: '#06d6a0',   // OLYMPUS SOCIETY
        compania3: '#ff9e00',   // OLYMPUS INTERACTIVE
        compania4: '#ef476f',   // OLYMPUS TECHNOLOGY
        compania5: '#4d7cfe'    // OLYMPUS REGALIS
    },

    // Colores distintos para cada nivel
    typeColors: {
        empresa:     '#4d7cfe', // Azul
        subEmpresa:  '#06d6a0', // Verde
        departamento:'#ef476f'  // Rojo
    },

    orbit: {
        distanceSubEmpresaToDepartamento: 260,
        distanceEmpresaToSubEmpresa:      280,
        distanceEmpresaToDepartamento:    200,
        distanceCompaniaToEmpresa:        540,
        distanceNucleoToCompania:         430,
        initialRadiusNucleoToCompania:    600,
        siblingMargin:                   40,
        globalMargin:                   60
    }
};

// ==================== DATOS GLOBALES ====================
const DATA = {
    nodes: [],
    links: [],
    selectedNode: null,
    transform: d3.zoomIdentity,
    groupVisibility: {}
};

// ==================== NUEVA ESTRUCTURA JERÁRQUICA ====================
const OLYMPUS_STRUCTURE = {
    nucleo: {
        id: 'nucleo',
        name: 'OLYMPUS',
        description: 'Holding estratégico que define la visión general, asigna recursos y coordina todas las compañías del ecosistema.',
        type: 'nucleo',
        color: CONFIG.colors.nucleo,
        mision: 'Unificar el progreso humano a través de tecnología, creatividad y conocimiento.',
        companias: []
    },
    companias: []
};

// ----- 1. OLYMPUS MINDSET -----
OLYMPUS_STRUCTURE.companias.push({
    id: 'olympus-mindset',
    name: 'OLYMPUS MINDSET',
    description: 'Aplicaciones digitales de desarrollo personal y rendimiento.',
    type: 'compania',
    color: CONFIG.colors.compania1,
    mision: 'Empoderar a las personas con herramientas digitales transformadoras.',
    empresas: [
        {
            id: 'mindset-division',
            name: 'MINDSET DIVISION',
            desc: 'Unidad que gestiona apps de desarrollo personal y los equipos de soporte.',
            type: 'empresa',
            // Departamentos directos
            departamentos: [
                { id: 'mindset-programacion', name: 'Departamento de Programación', desc: 'Desarrollo y mantenimiento de las aplicaciones.', type: 'departamento' },
                { id: 'mindset-legal', name: 'Departamento Legal', desc: 'Protección de datos, cumplimiento normativo digital.', type: 'departamento' },
                { id: 'mindset-testers', name: 'Departamento de Testers', desc: 'Pruebas de experiencia de usuario y control de calidad.', type: 'departamento' }
            ],
            // Subempresa contenedora de las apps
            subEmpresas: [
                {
                    id: 'aplicaciones-mindset',
                    name: 'APLICACIONES',
                    desc: 'Conjunto de aplicaciones de desarrollo personal.',
                    type: 'subEmpresa',
                    subEmpresas: [
                        {
                            id: 'tempo',
                            name: 'TEMPO',
                            desc: 'Gestión del tiempo y rutinas.',
                            type: 'subEmpresa'
                        },
                        {
                            id: 'noema',
                            name: 'NOEMA',
                            desc: 'Entrenamiento mental y cognitivo.',
                            type: 'subEmpresa'
                        },
                        {
                            id: 'vitalion',
                            name: 'VITALION',
                            desc: 'Entrenamiento físico y nutrición.',
                            type: 'subEmpresa'
                        },
                        {
                            id: 'olympus-app',
                            name: 'OLYMPUS',
                            desc: 'Plataforma integral de bienestar y productividad.',
                            type: 'subEmpresa'
                        }
                    ]
                }
            ]
        }
    ]
});

// ----- 2. OLYMPUS SOCIETY -----
OLYMPUS_STRUCTURE.companias.push({
    id: 'olympus-society',
    name: 'OLYMPUS SOCIETY',
    description: 'Cultura, formación y expansión estratégica.',
    type: 'compania',
    color: CONFIG.colors.compania2,
    mision: 'Democratizar el conocimiento y expandir las fronteras de la ciencia.',
    empresas: [
        {
            id: 'olympus-academy',
            name: 'OLYMPUS ACADEMY',
            desc: 'Formación técnica, liderazgo y desarrollo interno.',
            type: 'empresa',
            departamentos: [
                { id: 'academy-tecnica', name: 'Departamento de Formación Técnica', desc: 'Cursos y certificaciones.', type: 'departamento' },
                { id: 'academy-liderazgo', name: 'Departamento de Liderazgo & Filosofía', desc: 'Desarrollo de líderes.', type: 'departamento' },
                { id: 'academy-interno', name: 'Departamento de Desarrollo Interno', desc: 'Capacitación corporativa.', type: 'departamento' }
            ]
        },
        {
            id: 'olympus-culture',
            name: 'OLYMPUS CULTURE & IDENTITY',
            desc: 'Identidad corporativa y sentido de pertenencia.',
            type: 'empresa',
            departamentos: [
                { id: 'culture-valores', name: 'Departamento de Cultura & Valores', desc: 'Definición y comunicación.', type: 'departamento' },
                { id: 'culture-experiencia', name: 'Departamento de Experiencia del Miembro', desc: 'Bienestar y clima laboral.', type: 'departamento' },
                { id: 'culture-rangos', name: 'Departamento de Sistema de Rangos & Reconocimiento', desc: 'Carrera y méritos.', type: 'departamento' }
            ]
        },
        {
            id: 'olympus-strategy',
            name: 'OLYMPUS STRATEGY & EXPANSION',
            desc: 'Estrategia global y nuevas iniciativas.',
            type: 'empresa',
            departamentos: [
                { id: 'strategy-global', name: 'Departamento de Estrategia Global', desc: 'Visión a largo plazo.', type: 'departamento' },
                { id: 'strategy-innovacion', name: 'Departamento de Innovación & Nuevas Iniciativas', desc: 'Nuevos negocios.', type: 'departamento' },
                { id: 'strategy-alianzas', name: 'Departamento de Expansión & Alianzas', desc: 'Relaciones institucionales.', type: 'departamento' }
            ]
        }
    ]
});

// ----- 3. OLYMPUS INTERACTIVE -----
OLYMPUS_STRUCTURE.companias.push({
    id: 'olympus-interactive',
    name: 'OLYMPUS INTERACTIVE',
    description: 'Videojuegos y experiencias digitales.',
    type: 'compania',
    color: CONFIG.colors.compania3,
    mision: 'Construir los mundos digitales del mañana.',
    empresas: [
        {
            id: 'olympus-games',
            name: 'OLYMPUS GAMES',
            desc: 'Desarrollo y publicación de videojuegos.',
            type: 'empresa',
            subEmpresas: [
                {
                    id: 'olympus-3d',
                    name: 'OLYMPUS 3D',
                    desc: 'Desarrollo de juegos en 3D.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'olympus-3d-modelado', name: 'Departamento de Modelado 3D', desc: 'Creación de modelos y entornos 3D.', type: 'departamento' },
                        { id: 'olympus-3d-animacion', name: 'Departamento de Animación 3D', desc: 'Animación de personajes y objetos.', type: 'departamento' },
                        { id: 'olympus-3d-programacion', name: 'Departamento de Programación 3D', desc: 'Desarrollo de mecánicas y gráficos.', type: 'departamento' }
                    ]
                },
                {
                    id: 'olympus-2d',
                    name: 'OLYMPUS 2D',
                    desc: 'Desarrollo de juegos en 2D.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'olympus-2d-arte', name: 'Departamento de Arte 2D', desc: 'Ilustración y diseño de sprites.', type: 'departamento' },
                        { id: 'olympus-2d-animacion', name: 'Departamento de Animación 2D', desc: 'Animación de personajes y escenarios.', type: 'departamento' },
                        { id: 'olympus-2d-programacion', name: 'Departamento de Programación 2D', desc: 'Desarrollo de lógica y motores 2D.', type: 'departamento' }
                    ]
                },
                {
                    id: 'olympus-vr',
                    name: 'OLYMPUS VR',
                    desc: 'Experiencias de realidad virtual.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'olympus-vr-realidad', name: 'Departamento de Realidad Virtual', desc: 'Desarrollo de entornos VR.', type: 'departamento' },
                        { id: 'olympus-vr-efectos', name: 'Departamento de Efectos Inmersivos', desc: 'Integración de efectos físicos.', type: 'departamento' },
                        { id: 'olympus-vr-experiencia', name: 'Departamento de Experiencia Inmersiva', desc: 'Diseño de interacción y usabilidad.', type: 'departamento' }
                    ]
                }
            ]
        }
    ]
});

// ----- 4. OLYMPUS TECHNOLOGY -----
OLYMPUS_STRUCTURE.companias.push({
    id: 'olympus-technology',
    name: 'OLYMPUS TECHNOLOGY',
    description: 'Innovación tecnológica avanzada.',
    type: 'compania',
    color: CONFIG.colors.compania4,
    mision: 'Forjar el futuro desde las estrellas hasta el átomo.',
    empresas: [
        {
            id: 'helios-forge',
            name: 'HELIOS FORGE',
            desc: 'Núcleo de desarrollo tecnológico.',
            type: 'empresa',
            subEmpresas: [
                {
                    id: 'helios-robotics',
                    name: 'HELIOS ROBOTICS',
                    desc: 'Desarrollo de hardware robótico.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'robotics-ing', name: 'Departamento de Ingeniería Robótica', desc: 'Diseño y construcción de robots.', type: 'departamento' },
                        { id: 'robotics-id', name: 'Departamento de Investigación & Desarrollo', desc: 'Nuevas tecnologías robóticas.', type: 'departamento' },
                        { id: 'robotics-prod', name: 'Departamento de Producción', desc: 'Fabricación y ensamblaje.', type: 'departamento' }
                    ]
                },
                {
                    id: 'helios-ai',
                    name: 'HELIOS AI',
                    desc: 'Sistemas de inteligencia artificial.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'ai-ing', name: 'Departamento de Ingeniería de IA', desc: 'Modelos y algoritmos.', type: 'departamento' },
                        { id: 'ai-id', name: 'Departamento de Investigación & Desarrollo', desc: 'IA avanzada.', type: 'departamento' },
                        { id: 'ai-impl', name: 'Departamento de Implementación', desc: 'Integración en productos.', type: 'departamento' }
                    ]
                },
                {
                    id: 'helios-software',
                    name: 'HELIOS SOFTWARE',
                    desc: 'Infraestructura y sistemas digitales.',
                    type: 'subEmpresa',
                    departamentos: [
                        { id: 'software-dev', name: 'Departamento de Desarrollo de Software', desc: 'Aplicaciones y servicios.', type: 'departamento' },
                        { id: 'software-arch', name: 'Departamento de Arquitectura & Sistemas', desc: 'Diseño de infraestructura.', type: 'departamento' },
                        { id: 'software-soporte', name: 'Departamento de Soporte Técnico', desc: 'Mantenimiento y asistencia.', type: 'departamento' }
                    ]
                }
            ]
        }
    ]
});

// ----- 5. OLYMPUS REGALIS -----
OLYMPUS_STRUCTURE.companias.push({
    id: 'olympus-regalis',
    name: 'OLYMPUS REGALIS',
    description: 'Moda y e‑commerce de lujo.',
    type: 'compania',
    color: CONFIG.colors.compania5,
    mision: 'Vestir el futuro con estilo y sostenibilidad.',
    empresas: [
        {
            id: 'olympus-atelier',
            name: 'OLYMPUS ATELIER',
            desc: 'Marca de ropa y e‑commerce de moda.',
            type: 'empresa',
            departamentos: [
                { id: 'olympus-atelier-diseno', name: 'Departamento de Diseño', desc: 'Creación de colecciones y tendencias.', type: 'departamento' },
                { id: 'olympus-atelier-produccion', name: 'Departamento de Producción Textil', desc: 'Fabricación y control de calidad.', type: 'departamento' },
                { id: 'olympus-atelier-marketing', name: 'Departamento de Marketing', desc: 'Estrategia digital y branding.', type: 'departamento' },
                { id: 'olympus-atelier-atencion', name: 'Departamento de Atención al Cliente', desc: 'Soporte postventa y experiencia.', type: 'departamento' },
                { id: 'olympus-atelier-logistica', name: 'Departamento de Logística', desc: 'Gestión de inventarios y envíos.', type: 'departamento' }
            ]
        }
    ]
});

// ==================== ASIGNACIÓN DE EMPLEADOS ====================
const SMALL_DEPARTMENTS = new Set([
    'academy-tecnica',
    'academy-liderazgo',
    'academy-interno',
    'culture-valores',
    'culture-experiencia',
    'culture-rangos',
    'strategy-global',
    'strategy-innovacion',
    'strategy-alianzas',
    'olympus-atelier-diseno',
    'olympus-atelier-produccion',
    'olympus-atelier-marketing',
    'olympus-atelier-atencion',
    'olympus-atelier-logistica'
]);

function assignEmployeeCounts(node) {
    if (node.type === 'departamento') {
        if (node.id === 'mindset-legal') {
            node.employees = 1;
        } else if (node.id === 'mindset-programacion') {
            node.employees = 5;
        } else if (node.id === 'mindset-testers') {
            node.employees = 3;
        } else if (SMALL_DEPARTMENTS.has(node.id)) {
            node.employees = Math.floor(Math.random() * 6) + 3;
        } else {
            node.employees = 0;
        }
        node.totalEmployees = node.employees;
        return node.totalEmployees;
    }
    
    let sum = 0;
    const children = [];
    if (node.departamentos) children.push(...node.departamentos);
    if (node.subEmpresas) children.push(...node.subEmpresas);
    if (node.empresas) children.push(...node.empresas);
    if (node.companias) children.push(...node.companias);
    
    children.forEach(child => {
        sum += assignEmployeeCounts(child);
    });
    
    node.totalEmployees = sum;
    return sum;
}

OLYMPUS_STRUCTURE.nucleo.companias = OLYMPUS_STRUCTURE.companias;
assignEmployeeCounts(OLYMPUS_STRUCTURE.nucleo);

// ==================== FUNCIONES AUXILIARES ====================
function formatDisplayName(rawName, type) {
    if (type === 'nucleo') return 'OLYMPUS';
    if (type === 'departamento' && rawName.length > 25) {
        const mid = Math.floor(rawName.length / 2);
        let splitPos = rawName.indexOf(' ', mid);
        if (splitPos === -1) splitPos = mid;
        return rawName.substring(0, splitPos) + '\n' + rawName.substring(splitPos + 1);
    }
    const words = rawName.split(' ');
    const MAX_LENGTH = 15;
    const processed = [];
    words.forEach(word => {
        if (word.length > MAX_LENGTH) {
            const mid = Math.ceil(word.length / 2);
            processed.push(word.slice(0, mid) + '-');
            processed.push(word.slice(mid));
        } else processed.push(word);
    });
    if (processed.length <= 2) return processed.join('\n');
    return processed.slice(0, 2).join(' ') + '\n' + processed.slice(2).join(' ');
}

function measureText(text, fontSize, weight = '600') {
    const tempSvg = d3.select('body').append('svg')
        .attr('width',0).attr('height',0)
        .style('position','absolute').style('visibility','hidden');
    const tempText = tempSvg.append('text')
        .attr('font-family','Inter, sans-serif')
        .attr('font-weight',weight)
        .attr('font-size',fontSize+'px')
        .text(text);
    const bbox = tempText.node().getBBox();
    tempSvg.remove();
    return { width: bbox.width, height: bbox.height };
}

function calculateOptimalSize(node) {
    const base = CONFIG.sizes[node.type];
    let fontSize = { nucleo:20, compania:16, empresa:14, subEmpresa:12, departamento:11 }[node.type];
    if (!node.displayName) node.displayName = formatDisplayName(node.name, node.type);
    const lineHeight = fontSize * 1.2;
    const lines = node.displayName.split('\n');
    let maxWidth = 0;
    lines.forEach(line => {
        const m = measureText(line, fontSize, node.type==='nucleo'?'700':'600');
        maxWidth = Math.max(maxWidth, m.width);
    });
    return {
        width: Math.max(base.widthBase, maxWidth + base.padding*2),
        height: Math.max(base.heightBase, lines.length * lineHeight + base.padding*2),
        fontSize
    };
}

function rectanglesOverlap(a, b, margin = 0) {
    const aHalfW = a.size.width/2, aHalfH = a.size.height/2;
    const bHalfW = b.size.width/2, bHalfH = b.size.height/2;
    const aL = a.x - aHalfW - margin, aR = a.x + aHalfW + margin;
    const aT = a.y - aHalfH - margin, aB = a.y + aHalfH + margin;
    const bL = b.x - bHalfW - margin, bR = b.x + bHalfW + margin;
    const bT = b.y - bHalfH - margin, bB = b.y + bHalfH + margin;
    return !(aR < bL || aL > bR || aB < bT || aT > bB);
}

function computeOrbitRadius(parent, children, baseRadius, siblingMargin) {
    if (children.length === 0) return 0;
    const N = children.length;
    let radius = baseRadius;
    let placed = false;
    let iter = 0;
    while (!placed && iter++ < 200) {
        placed = true;
        const positions = [];
        for (let i = 0; i < N; i++) {
            const angle = (2 * Math.PI * i) / N;
            positions.push({ angle });
        }
        for (let i = 0; i < N && placed; i++) {
            for (let j = i+1; j < N; j++) {
                const angleDiff = Math.abs(positions[i].angle - positions[j].angle);
                const chordLength = 2 * radius * Math.sin(Math.min(angleDiff, 2*Math.PI - angleDiff) / 2);
                const minDist = children[i].boundingRadius + children[j].boundingRadius + siblingMargin;
                if (chordLength < minDist) { placed = false; break; }
            }
        }
        if (!placed) radius += 20;
    }
    return radius;
}

// ==================== CÁLCULO DE RADIOS (CORREGIDO PARA SUBEMPRESAS ANIDADAS) ====================
function computeBoundingRadii(node, type) {
    if (type === 'departamento') {
        node.selfRadius = Math.hypot(node.size.width, node.size.height) / 2;
        node.boundingRadius = node.selfRadius;
        node.orbitRadius = 0;
        return;
    }

    let children = [];
    if (type === 'subEmpresa') {
        if (node.subEmpresas) children.push(...node.subEmpresas);
        if (node.departamentos) children.push(...node.departamentos);
    } else if (type === 'empresa') {
        if (node.subEmpresas) children.push(...node.subEmpresas);
        if (node.departamentos) children.push(...node.departamentos);
    } else if (type === 'compania' && node.empresas) {
        children = node.empresas;
    } else if (type === 'nucleo' && node.companias) {
        children = node.companias;
    }

    children.forEach(child => {
        if (type === 'subEmpresa') computeBoundingRadii(child, child.type);
        else if (type === 'empresa') computeBoundingRadii(child, child.type);
        else if (type === 'compania') computeBoundingRadii(child, 'empresa');
        else if (type === 'nucleo') computeBoundingRadii(child, 'compania');
    });

    node.selfRadius = Math.hypot(node.size.width, node.size.height) / 2;

    let baseRadius = 0;
    if (type === 'subEmpresa') baseRadius = CONFIG.orbit.distanceSubEmpresaToDepartamento;
    else if (type === 'empresa') {
        if (node.subEmpresas && node.subEmpresas.length > 0) {
            baseRadius = CONFIG.orbit.distanceEmpresaToSubEmpresa;
        } else {
            baseRadius = CONFIG.orbit.distanceEmpresaToDepartamento;
        }
    } else if (type === 'compania') baseRadius = CONFIG.orbit.distanceCompaniaToEmpresa;
    else if (type === 'nucleo') baseRadius = CONFIG.orbit.distanceNucleoToCompania;

    if (children.length > 0) {
        node.orbitRadius = computeOrbitRadius(node, children, baseRadius, CONFIG.orbit.siblingMargin);
    } else {
        node.orbitRadius = 0;
    }

    let maxChildBounding = 0;
    children.forEach(child => { maxChildBounding = Math.max(maxChildBounding, child.boundingRadius); });
    node.boundingRadius = Math.max(node.selfRadius, node.orbitRadius + maxChildBounding);
}

function placeNodeChildren(parent, children) {
    if (!children || children.length === 0) return;
    const N = children.length;
    let angleOffset = 0;
    if (N === 2 || N === 4) angleOffset = Math.PI / 4;
    for (let i = 0; i < N; i++) {
        const angle = angleOffset + (2 * Math.PI * i) / N;
        const child = children[i];
        child.x = parent.x + parent.orbitRadius * Math.cos(angle);
        child.y = parent.y + parent.orbitRadius * Math.sin(angle);
        DATA.nodes.push(child);
        DATA.links.push({ source: parent, target: child });
    }
}

// ==================== COLOCACIÓN DE TODOS LOS NODOS (CORREGIDA) ====================
function placeAllNodes() {
    const nucleo = OLYMPUS_STRUCTURE.nucleo;
    nucleo.x = CONFIG.width / 2;
    nucleo.y = CONFIG.height / 2;
    DATA.nodes.push(nucleo);

    const companias = OLYMPUS_STRUCTURE.companias;
    const numCompanias = companias.length;
    let groupOrbitRadius = CONFIG.orbit.initialRadiusNucleoToCompania;
    let placed = false;
    let iter = 0;
    while (!placed && iter++ < 200) {
        placed = true;
        for (let i = 0; i < numCompanias; i++) {
            const angle = (2 * Math.PI * i) / numCompanias;
            companias[i].x = nucleo.x + groupOrbitRadius * Math.cos(angle);
            companias[i].y = nucleo.y + groupOrbitRadius * Math.sin(angle);
        }
        for (let i = 0; i < numCompanias && placed; i++) {
            for (let j = i+1; j < numCompanias; j++) {
                const dist = Math.hypot(companias[i].x - companias[j].x, companias[i].y - companias[j].y);
                const minDist = companias[i].boundingRadius + companias[j].boundingRadius + CONFIG.orbit.globalMargin;
                if (dist < minDist) { placed = false; break; }
            }
        }
        if (!placed) groupOrbitRadius += 50;
    }
    nucleo.orbitRadius = groupOrbitRadius;
    companias.forEach(compania => {
        DATA.nodes.push(compania);
        DATA.links.push({ source: nucleo, target: compania });
    });

    // Colocar hijos de compañías (empresas)
    companias.forEach(compania => {
        placeNodeChildren(compania, compania.empresas);
    });

    // Colocar hijos de empresas (subempresas y departamentos)
    companias.forEach(compania => {
        compania.empresas.forEach(empresa => {
            const hijos = [];
            if (empresa.subEmpresas) hijos.push(...empresa.subEmpresas);
            if (empresa.departamentos) hijos.push(...empresa.departamentos);
            placeNodeChildren(empresa, hijos);
        });
    });

    // Colocar hijos de subempresas (subempresas y departamentos) - esto permite anidación
    companias.forEach(compania => {
        compania.empresas.forEach(empresa => {
            if (empresa.subEmpresas) {
                empresa.subEmpresas.forEach(subEmpresa => {
                    const hijosSub = [];
                    if (subEmpresa.subEmpresas) hijosSub.push(...subEmpresa.subEmpresas);
                    if (subEmpresa.departamentos) hijosSub.push(...subEmpresa.departamentos);
                    placeNodeChildren(subEmpresa, hijosSub);
                });
            }
        });
    });
}

// ==================== ENLACES DE SERVICIO ====================
function agregarEnlacesServicio() {
    const serviceLinks = [
        { 
            source: 'helios-ai', 
            target: 'mindset-division', 
            desc: 'Modelos de IA para personalización, recomendación y optimización en las aplicaciones de Olympus Mindset (TEMPO, NOEMA, VITALION, OLYMPUS).' 
        }
    ];

    serviceLinks.forEach(sl => {
        const sourceNode = DATA.nodes.find(n => n.id === sl.source);
        const targetNode = DATA.nodes.find(n => n.id === sl.target);
        if (sourceNode && targetNode) {
            DATA.links.push({
                source: sourceNode,
                target: targetNode,
                type: 'service',
                description: sl.desc
            });
        }
    });
}

// ==================== VARIABLES GLOBALES Y FUNCIONES D3 ====================
let zoomBehavior, currentTransform = d3.zoomIdentity, immersionMode = false;

function updateDimensions() {
    const container = document.getElementById('graphContainer');
    CONFIG.width = container.clientWidth || 1400;
    CONFIG.height = container.clientHeight || 900;
}

function initSVG() {
    const svg = d3.select('#galaxySvg').attr('width', CONFIG.width).attr('height', CONFIG.height);
    svg.selectAll('*').remove();
    zoomBehavior = d3.zoom()
        .scaleExtent([0.01, 8])
        .on('zoom', (event) => {
            currentTransform = event.transform;
            svg.select('g').attr('transform', currentTransform);
        });
    svg.call(zoomBehavior).append('g');
}

function createGalaxy() {
    console.log('🌌 Construyendo OLYMPUS (estructura final)...');

    function assignGroupAndStripe(node, groupId) {
        node.groupId = groupId;
        if (node.type === 'nucleo' || node.type === 'compania') {
            node.stripeColor = node.color;
        } else {
            node.stripeColor = CONFIG.typeColors[node.type] || '#aaaaaa';
        }
        if (node.empresas) node.empresas.forEach(e => assignGroupAndStripe(e, groupId));
        if (node.subEmpresas) node.subEmpresas.forEach(s => assignGroupAndStripe(s, groupId));
        if (node.departamentos) node.departamentos.forEach(d => assignGroupAndStripe(d, groupId));
    }
    OLYMPUS_STRUCTURE.companias.forEach(c => assignGroupAndStripe(c, c.id));
    assignGroupAndStripe(OLYMPUS_STRUCTURE.nucleo, 'nucleo');

    function calcSizes(node) {
        node.size = calculateOptimalSize(node);
        if (node.empresas) node.empresas.forEach(calcSizes);
        if (node.subEmpresas) node.subEmpresas.forEach(calcSizes);
        if (node.departamentos) node.departamentos.forEach(calcSizes);
    }
    calcSizes(OLYMPUS_STRUCTURE.nucleo);
    OLYMPUS_STRUCTURE.companias.forEach(calcSizes);

    computeBoundingRadii(OLYMPUS_STRUCTURE.nucleo, 'nucleo');
    OLYMPUS_STRUCTURE.companias.forEach(c => computeBoundingRadii(c, 'compania'));

    DATA.nodes = [];
    DATA.links = [];
    placeAllNodes();
    agregarEnlacesServicio();

    console.log(`✅ OLYMPUS: ${DATA.nodes.length} nodos, ${DATA.links.length} enlaces`);
    console.log(`👥 Total empleados: ${OLYMPUS_STRUCTURE.nucleo.totalEmployees.toLocaleString()}`);
}

// ==================== FILTROS Y JERARQUÍA ====================
function createGroupFilters() {
    const container = document.getElementById('groupFilters');
    container.innerHTML = '';
    OLYMPUS_STRUCTURE.companias.forEach(c => {
        container.innerHTML += `<div class="group-filter-item"><input type="checkbox" id="chk_${c.id}" checked><span class="group-color-dot" style="background:${c.color};"></span><label for="chk_${c.id}">${c.name}</label></div>`;
    });
}

function initGroupVisibility() {
    OLYMPUS_STRUCTURE.companias.forEach(c => DATA.groupVisibility[c.id] = true);
}

function bindGroupFilters() {
    OLYMPUS_STRUCTURE.companias.forEach(c => {
        const chk = document.getElementById(`chk_${c.id}`);
        if (chk) chk.addEventListener('change', function() {
            DATA.groupVisibility[c.id] = this.checked;
            render();
            fitZoomToContent();
        });
    });
}

function buildHierarchyMenu() {
    const container = document.getElementById('hierarchyContainer');
    if (!container) return;
    let html = '<div class="hierarchy-item active" data-group="all"><i class="fas fa-globe-americas"></i><span>Toda la Galaxia</span></div>';
    html += '<div class="hierarchy-item" data-group="nucleo"><i class="fas fa-sun"></i><span>Núcleo: OLYMPUS</span></div>';
    OLYMPUS_STRUCTURE.companias.forEach(c => {
        html += `<div class="hierarchy-item" data-group="${c.id}"><i class="fas fa-building"></i><span>${c.name}</span></div>`;
    });
    container.innerHTML = html;

    document.querySelectorAll('#hierarchyContainer .hierarchy-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('#hierarchyContainer .hierarchy-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            navigateToGroup(this.getAttribute('data-group'));
        });
    });
}

// ==================== RENDERIZADO ====================
function render() {
    const svg = d3.select('#galaxySvg'), g = svg.select('g');
    g.selectAll('*').remove();
    const visibleNodes = DATA.nodes.filter(n => n.type === 'nucleo' || DATA.groupVisibility[n.groupId] === true);
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
    const visibleLinks = DATA.links.filter(l => 
        visibleNodeIds.has(l.source.id || l.source) && visibleNodeIds.has(l.target.id || l.target)
    );

    const linkGroup = g.selectAll('.link')
        .data(visibleLinks)
        .enter()
        .append('line')
        .attr('class', d => d.type === 'service' ? 'link service' : 'link')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', d => d.type === 'service' ? '#ffaa44' : '#6a9eff')
        .attr('stroke-width', d => d.type === 'service' ? 2.2 : 1.8)
        .attr('stroke-dasharray', d => d.type === 'service' ? '6,4' : null)
        .attr('opacity', 0.85)
        .on('mouseover', function(event, d) {
            if (d.type === 'service') {
                const tooltip = document.getElementById('nodeTooltip');
                let html = `<strong style="color:#ffaa44;">🔗 CONEXIÓN DE SERVICIO</strong><br>`;
                html += `<span style="color:#ffffff;">${d.source.name}</span> → <span style="color:#ffffff;">${d.target.name}</span><br>`;
                html += `<span style="color:#e6e9f0;">${d.description || 'Relación estratégica interna.'}</span><br>`;
                html += `<span style="color:#b0b8c9;">⚡ Valor para el ecosistema</span>`;
                tooltip.innerHTML = html;
                tooltip.style.display = 'block';
                tooltip.style.left = (event.clientX + 20) + 'px';
                tooltip.style.top = (event.clientY - 40) + 'px';
            }
        })
        .on('mouseout', function() {
            document.getElementById('nodeTooltip').style.display = 'none';
        });

    const nodes = g.selectAll('.node')
        .data(visibleNodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('id', d => `node-${d.id}`)
        .attr('data-type', d => d.type)
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', 'pointer')
        .on('click', function(e, d) { e.stopPropagation(); handleNodeClick(d); })
        .on('mouseover', function(e, d) { handleNodeMouseOver(d, e); })
        .on('mouseout', function(e, d) { handleNodeMouseOut(d); });

    nodes.each(function(d) {
        const group = d3.select(this);
        const w = d.size.width, h = d.size.height, x = -w/2, y = -h/2;
        const fontSize = d.size.fontSize || 12;
        group.append('rect').attr('class','node-rect').attr('x',x).attr('y',y).attr('width',w).attr('height',h).attr('rx',8).attr('ry',8);
        group.append('rect').attr('class','node-stripe').attr('x',x).attr('y',y).attr('width',5).attr('height',h).attr('rx',3).attr('ry',3).attr('fill', d.stripeColor);
        const lines = d.displayName.split('\n');
        const lineHeight = fontSize * 1.2;
        const totalTextHeight = lines.length * lineHeight;
        let startY = -totalTextHeight/2 + lineHeight/2;
        lines.forEach((line, i) => {
            group.append('text')
                .attr('class', `node-label ${d.type}`)
                .attr('x', 0)
                .attr('y', startY + i * lineHeight)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .style('font-size', fontSize + 'px')
                .text(line);
        });
    });
    updateStats();
}

// ==================== ZOOM Y EVENTOS ====================
function fitZoomToContent() {
    const svg = d3.select('#galaxySvg');
    const visibleNodes = DATA.nodes.filter(n => n.type === 'nucleo' || DATA.groupVisibility[n.groupId] === true);
    if (!visibleNodes.length) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    visibleNodes.forEach(n => {
        const hw = n.size.width/2, hh = n.size.height/2;
        minX = Math.min(minX, n.x - hw);
        maxX = Math.max(maxX, n.x + hw);
        minY = Math.min(minY, n.y - hh);
        maxY = Math.max(maxY, n.y + hh);
    });
    const padding = 150;
    const width = maxX - minX + padding*2;
    const height = maxY - minY + padding*2;
    const scale = Math.min(CONFIG.width / width, CONFIG.height / height) * 0.8;
    const cx = (minX + maxX)/2, cy = (minY + maxY)/2;
    const transform = d3.zoomIdentity.translate(CONFIG.width/2, CONFIG.height/2).scale(scale).translate(-cx, -cy);
    svg.transition().duration(600).call(zoomBehavior.transform, transform);
}

function getDescendantNodes(node) {
    let nodes = [node];
    if (node.empresas) {
        node.empresas.forEach(e => nodes = nodes.concat(getDescendantNodes(e)));
    }
    if (node.subEmpresas) {
        node.subEmpresas.forEach(s => nodes = nodes.concat(getDescendantNodes(s)));
    }
    if (node.departamentos) {
        node.departamentos.forEach(d => nodes = nodes.concat(getDescendantNodes(d)));
    }
    if (node.companias) {
        node.companias.forEach(c => nodes = nodes.concat(getDescendantNodes(c)));
    }
    return nodes;
}

function fitToNodeGroup(node) {
    const groupNodes = getDescendantNodes(node);
    const visibleGroupNodes = groupNodes.filter(n => 
        n.type === 'nucleo' || DATA.groupVisibility[n.groupId] === true
    );
    if (visibleGroupNodes.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    visibleGroupNodes.forEach(n => {
        const hw = n.size.width/2, hh = n.size.height/2;
        minX = Math.min(minX, n.x - hw);
        maxX = Math.max(maxX, n.x + hw);
        minY = Math.min(minY, n.y - hh);
        maxY = Math.max(maxY, n.y + hh);
    });
    const padding = 80;
    const width = maxX - minX + padding*2;
    const height = maxY - minY + padding*2;
    const scale = Math.min(CONFIG.width / width, CONFIG.height / height) * 0.9;
    const cx = (minX + maxX)/2, cy = (minY + maxY)/2;
    const transform = d3.zoomIdentity.translate(CONFIG.width/2, CONFIG.height/2).scale(scale).translate(-cx, -cy);
    d3.select('#galaxySvg').transition().duration(600).call(zoomBehavior.transform, transform);
}

function handleNodeMouseOver(node, event) {
    d3.select(`#node-${node.id} .node-rect`).attr('stroke','#fff').attr('stroke-width',2.5);
    d3.selectAll('.link').filter(d => d.source.id === node.id || d.target.id === node.id)
        .attr('stroke', d => d.type === 'service' ? '#ffdd44' : '#fff')
        .attr('stroke-width', 3)
        .attr('opacity', 1);
    
    const tooltip = document.getElementById('nodeTooltip');
    let tipo = '';
    if (node.type === 'nucleo') tipo = '🏛️ Corporación';
    else if (node.type === 'compania') tipo = '🏢 Compañía';
    else if (node.type === 'empresa') tipo = '📌 Empresa';
    else if (node.type === 'subEmpresa') tipo = '🔹 Sub‑empresa / Aplicación';
    else if (node.type === 'departamento') tipo = '📋 Departamento';
    
    let descripcion = node.desc || node.description || 'Sin descripción';
    let misionHtml = '';
    if (node.mision) misionHtml = `<br><span style="color:#aaccff; font-weight:600;">⚡ Misión:</span> ${node.mision}`;
    
    let empleadosHtml = `<br><span style="color:#b0b8c9;">👥 Total empleados: ${node.totalEmployees?.toLocaleString() || 0}</span>`;
    
    let extraInfo = '';
    if (node.type === 'compania') {
        const numEmpresas = node.empresas?.length || 0;
        extraInfo = `<br><span style="color:#b0b8c9;">📊 ${numEmpresas} empresas bajo su mando</span>`;
    } else if (node.type === 'empresa') {
        const numSub = node.subEmpresas?.length || 0;
        const numDept = node.departamentos?.length || 0;
        extraInfo = `<br><span style="color:#b0b8c9;">🔗 ${numSub} divisiones · 📋 ${numDept} departamentos directos</span>`;
    } else if (node.type === 'subEmpresa') {
        const numDept = node.departamentos?.length || 0;
        extraInfo = `<br><span style="color:#b0b8c9;">🧩 ${numDept} departamentos especializados</span>`;
    }
    
    let html = `<strong style="font-size:1.1em;">${node.name}</strong><br>${tipo}<br>`;
    html += `<span style="color:#e6e9f0;">${descripcion}</span>`;
    html += misionHtml;
    html += empleadosHtml;
    html += extraInfo;

    if (node.departamentos && node.departamentos.length) {
        html += '<br><span style="color:#aaccff; font-weight:600;">📂 Departamentos:</span><ul>';
        node.departamentos.slice(0, 6).forEach(d => {
            html += `<li>${d.name} (${d.employees} emp.)</li>`;
        });
        if (node.departamentos.length > 6) html += `<li>y ${node.departamentos.length-6} más...</li>`;
        html += '</ul>';
    }
    
    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.left = (event.clientX + 20) + 'px';
    tooltip.style.top = (event.clientY - 40) + 'px';
}

function handleNodeMouseOut(node) {
    d3.select(`#node-${node.id} .node-rect`).attr('stroke','#2a3a5c').attr('stroke-width',1.5);
    d3.selectAll('.link').attr('stroke', d => d.type === 'service' ? '#ffaa44' : '#6a9eff')
        .attr('stroke-width', d => d.type === 'service' ? 2.2 : 1.8)
        .attr('opacity', 0.85);
    document.getElementById('nodeTooltip').style.display = 'none';
}

function handleNodeClick(node) {
    document.getElementById('nodeTooltip').style.display = 'none';
    selectNode(node);
    if ((node.empresas && node.empresas.length) || 
        (node.subEmpresas && node.subEmpresas.length) || 
        (node.departamentos && node.departamentos.length) ||
        (node.companias && node.companias.length)) {
        fitToNodeGroup(node);
    } else {
        centerOnNode(node, 2);
    }
}

function selectNode(node) {
    if (DATA.selectedNode) {
        d3.select(`#node-${DATA.selectedNode.id} .node-rect`).attr('stroke','#2a3a5c').attr('stroke-width',1.5);
    }
    DATA.selectedNode = node;
    d3.select(`#node-${node.id} .node-rect`).attr('stroke','#fff').attr('stroke-width',2.5);
}

let searchDebounceTimer;
function setupEvents() {
    console.log('⚙️ Configurando eventos...');
    const toggleSidebar = () => {
        document.querySelector('.sidebar').classList.toggle('collapsed');
        setTimeout(handleResize, 300);
    };
    document.getElementById('sidebarCollapseBtn')?.addEventListener('click', toggleSidebar);
    document.getElementById('sidebarToggleBtn')?.addEventListener('click', toggleSidebar);
    
    buildHierarchyMenu();
    
    setTimeout(bindGroupFilters, 50);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
            performSearch();
        }, 150);
    });
    document.getElementById('searchBtn')?.addEventListener('click', performSearch);
    
    document.getElementById('centerBtn')?.addEventListener('click', centerOnNucleo);
    document.getElementById('zoomInBtn')?.addEventListener('click', () => d3.select('#galaxySvg').transition().call(zoomBehavior.scaleBy, 1.3));
    document.getElementById('zoomOutBtn')?.addEventListener('click', () => d3.select('#galaxySvg').transition().call(zoomBehavior.scaleBy, 0.7));
    document.getElementById('resetViewBtn')?.addEventListener('click', fitZoomToContent);
    window.addEventListener('resize', () => { clearTimeout(window.resizeTimeout); window.resizeTimeout = setTimeout(handleResize, 200); });
}

function navigateToGroup(groupId) {
    if (groupId === 'all') {
        OLYMPUS_STRUCTURE.companias.forEach(c => { DATA.groupVisibility[c.id] = true; let chk = document.getElementById(`chk_${c.id}`); if(chk) chk.checked = true; });
        render(); fitZoomToContent();
    } else if (groupId === 'nucleo') {
        centerOnNucleo();
    } else {
        const node = DATA.nodes.find(n => n.id === groupId);
        if (node) {
            if (!DATA.groupVisibility[groupId]) {
                DATA.groupVisibility[groupId] = true;
                let chk = document.getElementById(`chk_${groupId}`);
                if(chk) chk.checked = true;
                render();
            }
            if ((node.empresas && node.empresas.length) || 
                (node.subEmpresas && node.subEmpresas.length) || 
                (node.departamentos && node.departamentos.length)) {
                fitToNodeGroup(node);
            } else {
                centerOnNode(node, 2);
            }
            handleNodeClick(node);
        }
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    if (!query) {
        resultsContainer.classList.remove('active');
        return;
    }
    const results = DATA.nodes.filter(n => 
        (n.name?.toLowerCase().includes(query) || 
         n.description?.toLowerCase().includes(query) || 
         n.mision?.toLowerCase().includes(query) || 
         n.desc?.toLowerCase().includes(query))
    );
    resultsContainer.innerHTML = '';
    if (results.length) {
        results.forEach(n => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            let icon = { nucleo:'sun', compania:'globe-americas', empresa:'sitemap', subEmpresa:'briefcase', departamento:'users' }[n.type] || 'building';
            div.innerHTML = `<i class="fas fa-${icon}"></i> ${n.name}`;
            div.addEventListener('click', () => {
                if ((n.empresas && n.empresas.length) || 
                    (n.subEmpresas && n.subEmpresas.length) || 
                    (n.departamentos && n.departamentos.length)) {
                    fitToNodeGroup(n);
                } else {
                    centerOnNode(n, 2);
                }
                handleNodeClick(n);
                resultsContainer.classList.remove('active');
                document.getElementById('searchInput').value = '';
            });
            resultsContainer.appendChild(div);
        });
        resultsContainer.classList.add('active');
    } else {
        resultsContainer.innerHTML = '<div class="search-result-item">Sin resultados</div>';
        resultsContainer.classList.add('active');
    }
}

function centerOnNucleo() { const n = DATA.nodes.find(n => n.id === 'nucleo'); if(n) centerOnNode(n, 1.2); }
function centerOnNode(node, scale = 2) {
    const svg = d3.select('#galaxySvg');
    const transform = d3.zoomIdentity.translate(CONFIG.width/2, CONFIG.height/2).scale(scale).translate(-node.x, -node.y);
    svg.transition().duration(600).call(zoomBehavior.transform, transform);
}

function handleResize() {
    updateDimensions();
    d3.select('#galaxySvg').attr('width', CONFIG.width).attr('height', CONFIG.height);
    createGalaxy();
    render();
    fitZoomToContent();
}

function updateStats() {
    document.getElementById('nodeCount').textContent = DATA.nodes.length;
    document.getElementById('linkCount').textContent = DATA.links.length;
    document.getElementById('companyCount').textContent = DATA.nodes.filter(n => n.type === 'compania').length;
    const totalEmpresas = DATA.nodes.filter(n => n.type === 'empresa' || n.type === 'subEmpresa').length;
    document.getElementById('empresaTotalCount').textContent = totalEmpresas;
    document.getElementById('departmentCount').textContent = DATA.nodes.filter(n => n.type === 'departamento').length;
    const nucleo = DATA.nodes.find(n => n.id === 'nucleo');
    document.getElementById('totalEmployees').textContent = nucleo?.totalEmployees?.toLocaleString() || '0';
}

function createImmersionButton() {
    if (document.getElementById('immersionBtn')) return;
    const btn = document.createElement('button');
    btn.className = 'immersion-btn'; btn.id = 'immersionBtn'; btn.title = 'Modo inmersión';
    btn.innerHTML = '<i class="fas fa-expand"></i>';
    document.body.appendChild(btn);
    btn.addEventListener('click', function() {
        immersionMode = !immersionMode;
        document.body.classList.toggle('immersion-mode');
        this.innerHTML = immersionMode ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
        setTimeout(handleResize, 300);
    });
}

// ==================== ARRANQUE ====================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            updateDimensions();
            initSVG();
            createGalaxy();
            createGroupFilters();
            initGroupVisibility();
            render();
            setupEvents();
            updateStats();
            createImmersionButton();
            fitZoomToContent();
            console.log('🚀 OLYMPUS – Estructura final: MINDSET (TEMPO, NOEMA, VITALION, OLYMPUS), SOCIETY, INTERACTIVE, TECHNOLOGY, REGALIS.');
        } catch(e) {
            console.error('❌ Error fatal:', e);
            document.getElementById('graphContainer').innerHTML = `<div style="color:#ff6b6b; padding:20px; text-align:center;"><h3>Error al cargar la galaxia</h3><p>${e.message}</p><button onclick="location.reload()" style="padding:10px 20px; background:#6a9eff; color:white; border:none; border-radius:4px; margin-top:10px; cursor:pointer;">Reintentar</button></div>`;
        }
    }, 100);
});
