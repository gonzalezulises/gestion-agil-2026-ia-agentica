import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const C = { bg: '#0B0F14', white: '#FFFFFF', accent: '#4F8CFF', highlight: '#22C55E', dim: '#64748B', surface: '#141A23', border: '#1E293B' }
const T = { hero: 88, title: 72, subtitle: 44, text: 34, bullet: 32, caption: 26 }

function Logos({ height = 128 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <img src="/logo-iesa.png" alt="IESA" style={{ height, objectFit: 'contain' }} draggable={false} />
      <img src="/logo-unikemia.webp" alt="UniKemia" style={{ height: height * 0.55, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} draggable={false} />
    </div>
  )
}

function LiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const fmt = (n) => String(n).padStart(2, '0')
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  return (
    <span style={{ fontSize: 18, color: C.dim, fontWeight: 400 }}>
      {dias[now.getDay()]} {now.getDate()} de {meses[now.getMonth()]} de {now.getFullYear()} — {fmt(now.getHours())}:{fmt(now.getMinutes())}:{fmt(now.getSeconds())}
    </span>
  )
}

const TAKEAWAYS = [
  /* 0  hero */            'La IA amplifica lo que ya existe. Disciplina y escalabilidad convierten capacidad en valor.',
  /* 1  agenda */          'Disciplina, escalabilidad, IA controlada, evidencia, sectores y checklist 30/90/180 días.',
  /* 2  stats */           '90% usa IA pero ~30% no confía. Adopción sin confianza = riesgo sistémico.',
  /* 3  causalLoop */      'DORA 2024: −1.5% ritmo, −7.2% estabilidad con IA sin controles. Velocidad sin red = inestabilidad.',
  /* 4  disciplina */      'Disciplina: reglas que hacen el trabajo verificable, integrable y entregable.',
  /* 5  inspección */      'Inspeccionar cada 2 semanas cuesta menos que descubrir el problema al trimestre.',
  /* 6  cadencias */       'Ciclos cortos (2-4 semanas) son contenedores de disciplina. ¿Cuál es tu cadencia real?',
  /* 7  dod bajo */        'Riesgo bajo: verificación básica, revisión aprobada, sin alertas, documentación al día.',
  /* 8  dod medio */       'Riesgo medio: todo lo anterior + integración, evaluación IA, trazabilidad, datos sensibles.',
  /* 9  dod alto */        'Riesgo alto: todo lo anterior + seguridad, sesgo, compliance y auditoría de IA.',
  /* 10 gates */           'Controles rígidos crean colas. Controles automáticos + reglas claras sostienen flujo.',
  /* 11 section escala */  'Escalabilidad: reducir dependencias sin que el costo de coordinación crezca.',
  /* 12 nexus less */      'Escalar ≠ multiplicar equipos. Si no integras, solo fragmentaste.',
  /* 13 safe */            'SAFe: ciclos de 8-12 semanas + controles presupuestarios. Para coordinación masiva.',
  /* 14 da */              'No hay talla única. Elige forma de trabajo según contexto.',
  /* 15 platform */        '80% de grandes orgs tendrán plataformas para 2026. Sin plataforma = burnout.',
  /* 16 section ia */      'La IA redefine qué hace cada quien. Diseñar colaboración humano-IA con control.',
  /* 17 orquestar */       'Del hacer al orquestar. Si usas Excel, correo o ERP, la IA llegará ahí.',
  /* 18 humanAgent */      'Capas: IA ejecuta, humanos deciden, plataforma controla, gobernanza gestiona riesgo.',
  /* 19 liderazgo */       'Tu rol: proteger al equipo de urgencias. >80% sin gobierno no logra retorno de IA.',
  /* 20 section evid */    'La IA mejora resultados donde hay disciplina previa. Sin ella, no se sostienen.',
  /* 21 accenture */       '+8.69% entregables, +15% aprobación, +84% sin reproceso. IA + controles = mejora.',
  /* 22 avantius */        '−47% defectos, 3 entregas/año, +30% satisfacción. Cadencia + calidad + feedback.',
  /* 23 sefaz */           '+296% funcionalidades, −12% incidentes. Escalar exige sincronización.',
  /* 24 bench std */       'Standard Bank: de 700 a 30 días. Rangos de referencia, no promesas.',
  /* 25 bench fan */       'Fannie Mae: de 1-2 entregas/año a mensual. Integración cada 2 semanas.',
  /* 26 metr */            'Expertos 19% más lentos con IA — creían ser más rápidos. Si no mides, te autoengañas.',
  /* 27 metrics 1 */       'Frecuencia de entrega, tiempo de ciclo y tasa de retrabajo: las 3 métricas clave.',
  /* 28 metrics 2 */       'Recuperación, cumplimiento de criterios y brecha de confianza IA completan el tablero.',
  /* 29 roles 1 */         'Responsable de prioridades y facilitador: nuevas responsabilidades con IA.',
  /* 30 roles 2 */         'Equipo y líderes: de ejecutar a orquestar y diseñar el sistema.',
  /* 31 colab 1 */         'Asistido y co-piloto: la IA sugiere o propone, tú decides.',
  /* 32 colab 2 */         'Delegado y autónomo acotado: mayor riesgo, mayor control necesario.',
  /* 33 gov preguntas */   '¿Quién decide qué IA se usa? ¿Qué datos compartes? ¿Quién es responsable?',
  /* 34 gov cards 1 */     'Gobernanza: núcleo central de normas + integración a equipos.',
  /* 35 gov cards 2 */     'Procesos estandarizados + presupuestos a cadenas de valor.',
  /* 36 compliance 1 */    'EU AI Act desde agosto 2026. NIST AI RMF como marco voluntario.',
  /* 37 compliance 2 */    'ISO 42001, 23894, 27001 y 5055 como sistema de gestión integrado.',
  /* 38 section sector */  'La agilidad se aplica diferente en cada industria. Adapta, no copies.',
  /* 39 agile manuf */     'Manufactura: kanban + daily 15 min + retrospectiva. −55% time-to-market.',
  /* 40 agile pharma */    'Farmacéutica: backlog regulatorio + revisiones cada 2 semanas. −40% ciclo.',
  /* 41 agile banca */     'Banca: equipos multifuncionales + ciclos cortos. −50-70% tiempo al mercado.',
  /* 42 agile retail */    'Construcción/retail: Last Planner + compromisos semanales. 3× más a tiempo.',
  /* 43 tools manuf */     'Manufactura + IA: kanban automático, resumen de avances, causa raíz en minutos.',
  /* 44 tools pharma */    'Farmacéutica + IA: checklist normativo, resumen para comité, trazabilidad.',
  /* 45 tools banca */     'Banca + IA: mapeo de cliente, estimación por históricos, síntesis ejecutiva.',
  /* 46 tools retail */    'Retail + IA: roadmap por impacto, análisis de encuestas, lecciones aprendidas.',
  /* 47 section quiz1 */   'Autocomprobación: escalado ágil, madurez previa y frameworks.',
  /* 48 q1 */              'Sin fundamentos, mejoras locales empeoran resultados sistémicos.',
  /* 49 q2 */              'Nexus: múltiples equipos → un entregable integrado → dependencias mínimas.',
  /* 50 q3 */              'LeSS: des-escalar complejidad. Mínimo proceso adicional.',
  /* 51 q4 */              'SAFe: planificación + calidad + presupuesto + arquitectura empresarial.',
  /* 52 q5 */              'DA: el mortero para encajar Scrum, XP, Kanban. Centrado en personas.',
  /* 53 section quiz2 */   'Autocomprobación: liderazgo y gobernanza de IA.',
  /* 54 q6 */              'No hay talla única. Analiza tu caso antes de elegir framework.',
  /* 55 q7 */              'Taxonomía modular: cliente + procesos + sistemas.',
  /* 56 q8 */              'Victorias fáciles no producen cambios sistémicos para escalar.',
  /* 57 q9 */              'Valores ágiles en toda la empresa — incluso áreas no ágiles.',
  /* 58 q10 */             'Presupuesto dinámico: como capital de riesgo interno.',
  /* 59 assess 1 */        'Diagnostica: madurez del equipo y capacidad de IA antes de implementar.',
  /* 60 assess 2 */        'Identifica oportunidades rápidas y riesgos a controlar.',
  /* 61 monday cal */      'Calidad/Operaciones: causa raíz con IA, riesgos y dashboards automáticos.',
  /* 62 monday fin */      'Finanzas: síntesis de reportes (−40% tiempo). IA nunca aprueba riesgo.',
  /* 63 monday prod */     'Producción: ciclo de 2 semanas de prueba. Mide: ¿terminamos lo planificado?',
  /* 64 monday com */      'Comercial: IA para borradores y pipeline. Criterio humano en marca.',
  /* 65 check 30 */        '30 días: criterios mínimos, métricas básicas, política IA, piloto controlado.',
  /* 66 check 90 */        '90 días: controles presupuesto, procesos estándar, evaluación IA, capacitación.',
  /* 67 check 180 */       '180 días: modelo humano-IA, plataforma interna, preparación normativa.',
  /* 68 bib 1 */           'Fuentes: DORA 2024/2025, McKinsey 2024/2025, Gartner 2024/2025.',
  /* 69 bib 2 */           'Fuentes: Scrum Guide, Nexus, LeSS, SAFe 6.0, Disciplined Agile.',
  /* 70 bib 3 */           'Fuentes: NIST AI RMF, ISO 42001, OWASP LLM Top 10.',
  /* 71 bib 4 */           'Fuentes: Accenture/GitHub, METR RCT, EU AI Act.',
  /* 72 bib 5 */           'Fuentes: Avantius, SEFAZ-SP, BCG, McKinsey Life Sciences, LCI.',
  /* 73 res frameworks */  'Frameworks: Scrum Guide, Nexus, SAFe 6.0, Disciplined Agile.',
  /* 74 res ia */          'IA y riesgo: NIST AI RMF, OWASP LLM, DORA, EU AI Act.',
  /* 75 res libros */      'Libros: Team Topologies, Accelerate, Co-Intelligence, Phoenix Project.',
  /* 76 end */             '',
]
const slides = [
  // 0: HERO
  { type: 'hero' },

  // 1: AGENDA
  { type: 'agenda' },

  // 2: STATS
  { type: 'stats', title: 'Datos que obligan a repensar', items: [
    { value: '90%', label: 'usa IA en el trabajo', source: 'DORA 2025' },
    { value: '~30%', label: 'no confía en resultados de IA', source: 'DORA 2025' },
    { value: '71%', label: 'usa IA generativa regularmente', source: 'McKinsey 2025' },
    { value: '40%', label: 'apps con agentes IA para 2026', source: 'Gartner 2025' },
  ]},

  // 3: CAUSAL LOOP
  { type: 'diagram', id: 'causalLoop' },

  // 4: DISCIPLINA
  { type: 'content', title: 'Disciplina ≠ burocracia', bullets: [
    'Reglas que hacen el trabajo verificable',
    'Criterios de terminado: contrato de calidad',
    'Si no cumple criterios, no cuenta como entregado',
  ], note: 'Fundamento' },

  // 5: INSPECCIÓN TEMPRANA
  { type: 'content', title: 'La inspección temprana reduce costos', bullets: [
    'Defecto al final del mes: costo multiplicado',
    'En proyectos: misma lógica',
    'Inspeccionar cada 2 semanas < descubrir al trimestre',
  ], note: 'Ejemplo práctico' },

  // 6: CADENCIAS
  { type: 'content', title: 'Cadencias: disciplina que coordina', bullets: [
    'Ciclos cortos (2-4 semanas) como contenedor',
    'Ciclos de planificación (8-12 semanas) para escala',
    '¿Cuál es tu cadencia real, no la declarada?',
  ], note: 'Cadencias' },

  // 7: DOD BAJO
  { type: 'dodLevel', levelIndex: 0 },
  // 8: DOD MEDIO
  { type: 'dodLevel', levelIndex: 1 },
  // 9: DOD ALTO
  { type: 'dodLevel', levelIndex: 2 },

  // 10: GATES vs GUARDRAILS
  { type: 'diagram', id: 'gatesGuardrails' },

  // 11: SECTION ESCALABILIDAD
  { type: 'section', title: 'Escalabilidad', subtitle: 'Coordinación, plataforma y gobernanza' },

  // 12: NEXUS/LESS
  { type: 'content', title: 'Escalar ≠ multiplicar equipos', bullets: [
    'Nexus: un entregable integrado, dependencias mínimas',
    'LeSS: des-escalar complejidad organizacional',
    'Si no integras, solo fragmentaste',
  ], note: 'Nexus y LeSS' },

  // 13: SAFE
  { type: 'content', title: 'SAFe: coordinación a gran escala', bullets: [
    'Ciclos de planificación de 8-12 semanas',
    'Controles de presupuesto por cadena de valor',
    'Útil para coordinación masiva, no para equipos autónomos',
  ], note: 'SAFe', color: 'accent' },

  // 14: DA
  { type: 'content', title: 'No hay talla única', bullets: [
    'Scrum, XP, Kanban = ladrillos; DA = mortero',
    'Elige forma de trabajo según contexto',
    'Tu nómina ≠ tu lanzamiento de producto',
  ], note: 'Disciplined Agile' },

  // 15: PLATFORM
  { type: 'platformEng' },

  // 16: SECTION IA
  { type: 'section', title: 'IA en gestión de proyectos', subtitle: 'Del hacer al orquestar', emphasis: true },

  // 17: ORQUESTAR
  { type: 'content', title: 'Del hacer al orquestar', bullets: [
    '40% apps con agentes IA para fin de 2026',
    'Si usas Excel, correo o ERP, la IA llegará ahí',
    '>40% proyectos IA podrían cancelarse sin disciplina',
  ], note: 'El cambio' },

  // 18: HUMAN-AGENT
  { type: 'diagram', id: 'humanAgent' },

  // 19: LIDERAZGO
  { type: 'content', title: 'Tu rol: diseñar el sistema', bullets: [
    'Tú eres el liderazgo del que hablamos',
    'Protege a tu equipo de urgencias diarias',
    '>80% sin gobierno ejecutivo no logra retorno de IA',
  ], note: 'Liderazgo 2026', color: 'accent' },

  // 20: SECTION EVIDENCIA
  { type: 'section', title: 'Evidencia y casos', subtitle: 'Números que importan' },

  // 21: ACCENTURE
  { type: 'bars', title: 'Copilot en Accenture (experimento controlado)', items: [
    { label: 'Entregables por persona', value: 8.69, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
    { label: 'Aprobación a la primera', value: 15, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
    { label: 'Ejecuciones sin reproceso', value: 84, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
  ], source: 'GitHub + Accenture 2024', note: 'IA mejora ritmo SI los controles se mantienen' },

  // 22: AVANTIUS
  { type: 'case', title: 'Avantius', subtitle: 'Sector justicia · SAFe · 2020–2022', color: C.accent, items: [
    { value: '−47%', label: 'defectos' },
    { value: '3/año', label: 'entregas predecibles' },
    { value: '+30%', label: 'satisfacción' },
    { value: '+25%', label: 'compromiso' },
  ], note: 'Cadencia + calidad + retroalimentación' },

  // 23: SEFAZ
  { type: 'case', title: 'SEFAZ-SP', subtitle: 'Tesorería São Paulo · SAFe · 2019–2021', color: C.highlight, items: [
    { value: '+296%', label: 'funcionalidades' },
    { value: '−12%', label: 'incidentes' },
    { value: '+42%', label: 'tasa de entrega' },
  ], note: 'Sincronización y claridad de roles' },

  // 24: BENCHMARK STANDARD BANK
  { type: 'benchmarkCard', orgIndex: 0 },
  // 25: BENCHMARK FANNIE MAE
  { type: 'benchmarkCard', orgIndex: 1 },

  // 26: METR
  { type: 'bigstat', value: '+19%', label: 'más lento para expertos con IA', source: 'Creían ser ~20% más rápidos. Si no mides, te autoengañas.', warn: true },

  // 27-28: METRICS TABLE (split 3+3)
  { type: 'metricsTable', page: 0 },
  { type: 'metricsTable', page: 1 },

  // 29-30: ROLES TABLE (split 2+2)
  { type: 'rolesTable', page: 0 },
  { type: 'rolesTable', page: 1 },

  // 31-32: COLLAB MODES (split 2+2)
  { type: 'collabModes', page: 0 },
  { type: 'collabModes', page: 1 },

  // 33: GOVERNANCE QUESTIONS
  { type: 'governanceQuestions' },
  // 34-35: GOVERNANCE CARDS (split 2+2)
  { type: 'governanceCards', page: 0 },
  { type: 'governanceCards', page: 1 },

  // 36-37: COMPLIANCE MAP (split 4+3)
  { type: 'complianceMap', page: 0 },
  { type: 'complianceMap', page: 1 },

  // 38: SECTION SECTOR
  { type: 'section', title: 'Aplicación por sector', subtitle: 'Evidencia y herramientas para tu industria' },

  // 39-42: AGILE BY SECTOR
  { type: 'agileBySector', sectorIndex: 0 },
  { type: 'agileBySector', sectorIndex: 1 },
  { type: 'agileBySector', sectorIndex: 2 },
  { type: 'agileBySector', sectorIndex: 3 },

  // 43-46: TOOLS BY SECTOR
  { type: 'toolsBySector', sectorIdx: 0 },
  { type: 'toolsBySector', sectorIdx: 1 },
  { type: 'toolsBySector', sectorIdx: 2 },
  { type: 'toolsBySector', sectorIdx: 3 },

  // 47: SECTION QUIZ 1
  { type: 'section', title: 'Autocomprobación', subtitle: 'Escalado ágil', quiz: true },

  // 48-52: QUIZ 0-4
  { type: 'quiz', idx: 0, q: 'Antes de introducir métodos ágiles de escalado,\nconviene evaluar el nivel de madurez del equipo\npara minimizar riesgos de adopción.', explanation: 'Sin fundamentos, mejoras locales empeoran\nresultados sistémicos (DORA).\nEn manufactura: inspección en línea vs. al final del lote.' },

  { type: 'quiz', idx: 1, q: 'Nexus implementa Scrum a escala:\nmúltiples equipos, una sola lista de trabajo,\nun entregable integrado por ciclo.', explanation: 'Schwaber diseñó Nexus para mantener\nla esencia de Scrum al escalar,\nminimizando complejidad adicional.' },

  { type: 'quiz', idx: 2, q: 'LeSS escala con mínimo proceso adicional\npara que varios equipos funcionen bien.', explanation: 'Larman y Vodde: "des-escalar" complejidad.\nTu nómina funciona con estabilidad.\nTu producto nuevo necesita iteración.' },

  { type: 'quiz', idx: 3, q: 'SAFe cubre implementación ágil a escala\nempresarial, incluyendo presupuesto\ny arquitectura.', explanation: 'Ciclos de planificación + calidad integrada\n+ controles de presupuesto.\nSin proteger el tiempo del equipo, el proyecto pierde.' },

  { type: 'quiz', idx: 4, q: 'Disciplined Agile toma prácticas de Scrum,\nXP, Kanban como ladrillos y provee\nel mortero para encajarlos.', explanation: 'Centrado en personas, consciente de la empresa.\nTu logística no trabaja igual que mercadeo.\nEl error es imponer un proceso único a todos.' },

  // 53: SECTION QUIZ 2
  { type: 'section', title: 'Autocomprobación', subtitle: 'Liderazgo y gobernanza', quiz: true },

  // 54-58: QUIZ 5-9
  { type: 'quiz', idx: 5, q: 'No existe "talla única" — hay que analizar\nnecesidades y limitaciones del caso\nespecífico antes de elegir modelo.', explanation: 'DA guía decisiones por contexto.\n¿Tus clientes son estables o cambian?\nEso define si necesitas agilidad o estabilidad.' },

  { type: 'quiz', idx: 6, q: 'Las empresas que escalan comienzan con\ntaxonomía: experiencia del cliente,\nprocesos y tecnología.', explanation: 'Enfoque modular: priorizar y secuenciar\nla transformación sin cambiar\ntodo simultáneamente.' },

  { type: 'quiz', idx: 7, q: '"Victorias fáciles" protegen equipos\nindividuales pero no producen cambios\norganizativos para escalar.', explanation: 'Se necesitan cambios sistémicos.\nTransferir poder ≠ perder control.\nEl equipo decide CÓMO, tú defines QUÉ.' },

  { type: 'quiz', idx: 8, q: 'El liderazgo debe inculcar valores ágiles\nmás allá de las áreas "ágiles",\nen toda la empresa.', explanation: 'Si finanzas y RRHH operan en cascada,\nel equipo ágil choca contra la pared.\nTu valor: crear condiciones, no tomar todas las decisiones.' },

  { type: 'quiz', idx: 9, q: 'En empresas con muchos equipos ágiles,\nla financiación evoluciona: abandonan\nfunciones y lanzan otras sin esperar el ciclo anual.', explanation: 'Presupuesto dinámico con control.\nComo capital de riesgo interno.\nAl inicio: gente creativa. Al final: gente rigurosa.' },

  // 59-60: ASSESSMENT (split 2+2)
  { type: 'assessment', page: 0 },
  { type: 'assessment', page: 1 },

  // 61-64: MONDAY
  { type: 'monday', areaIndex: 0 },
  { type: 'monday', areaIndex: 1 },
  { type: 'monday', areaIndex: 2 },
  { type: 'monday', areaIndex: 3 },

  // 65: CHECKLIST 30
  { type: 'checklist', title: '30 días — Control mínimo viable', items: [
    { step: 1, text: 'Equipo con objetivos claros y reunión quincenal' },
    { step: 2, text: 'Criterios de terminado: verificación y aprobación' },
    { step: 3, text: 'Política IA: qué se delega, qué no' },
    { step: 4, text: 'Piloto controlado en 1-2 procesos' },
  ]},

  // 66: CHECKLIST 90
  { type: 'checklist', title: '90 días — Disciplina repetible', items: [
    { step: 1, text: 'Controles de presupuesto por área' },
    { step: 2, text: 'Procesos estandarizados y medición de adopción' },
    { step: 3, text: 'Evaluación de resultados IA en criterios' },
    { step: 4, text: 'Capacitación de roles clave en gestión IA' },
  ]},

  // 67: CHECKLIST 180
  { type: 'checklist', title: '180 días — Escala sostenible', items: [
    { step: 1, text: 'Modelo operativo humano-IA con auditoría' },
    { step: 2, text: 'Plataforma interna como producto' },
    { step: 3, text: 'Preparación normativa AI Act / ISO' },
  ]},

  // 68-72: BIBLIOGRAPHY (5 entries per page)
  { type: 'bibPage', page: 0 },
  { type: 'bibPage', page: 1 },
  { type: 'bibPage', page: 2 },
  { type: 'bibPage', page: 3 },
  { type: 'bibPage', page: 4 },

  // 73-75: RESOURCES (1 category per page)
  { type: 'resourcePage', page: 0 },
  { type: 'resourcePage', page: 1 },
  { type: 'resourcePage', page: 2 },

  // 76: END
  { type: 'end' },
]/* ═══════════════════════════════════════════
   SVG DIAGRAMS
   ═══════════════════════════════════════════ */
function CausalLoopDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Más velocidad sin controles = inestabilidad</p>
      <svg viewBox="0 0 1000 420" width={1000} fill="none">
        {/* Top row */}
        <g className="anim-pop d1">
          <rect x="30" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="160" y="83" textAnchor="middle" fill={C.accent} fontSize="22" fontWeight="600" fontFamily="Inter">IA aumenta volumen</text>
        </g>
        <g className="anim-pop d2">
          <rect x="370" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="500" y="83" textAnchor="middle" fill={C.accent} fontSize="22" fontWeight="600" fontFamily="Inter">Más entregables</text>
        </g>
        <g className="anim-fade d2"><line x1="290" y1="75" x2="360" y2="75" stroke={C.dim} strokeWidth="2" markerEnd="url(#cl1)" /></g>

        {/* Decision */}
        <g className="anim-pop d3">
          <rect x="690" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.white} strokeWidth="2" />
          <text x="820" y="72" textAnchor="middle" fill={C.white} fontSize="20" fontWeight="600" fontFamily="Inter">¿Controles de calidad?</text>
          <text x="820" y="96" textAnchor="middle" fill={C.dim} fontSize="16" fontFamily="Inter">verificación + retroalimentación</text>
        </g>
        <g className="anim-fade d3"><line x1="630" y1="75" x2="680" y2="75" stroke={C.dim} strokeWidth="2" markerEnd="url(#cl1)" /></g>

        {/* NO branch — dim with opacity */}
        <g className="anim-pop d4">
          <rect x="550" y="200" width="220" height="60" rx="12" fill="rgba(100,116,139,0.08)" stroke={C.dim} strokeWidth="1.5" opacity="0.6" />
          <text x="660" y="237" textAnchor="middle" fill={C.dim} fontSize="20" fontWeight="600" fontFamily="Inter" opacity="0.6">Más fallas y retrabajo</text>
        </g>
        <g className="anim-pop d5">
          <rect x="550" y="300" width="220" height="60" rx="12" fill="rgba(100,116,139,0.08)" stroke={C.dim} strokeWidth="1.5" opacity="0.6" />
          <text x="660" y="337" textAnchor="middle" fill={C.dim} fontSize="20" fontWeight="600" fontFamily="Inter" opacity="0.6">Menos estabilidad</text>
        </g>
        <g className="anim-fade d4">
          <text x="780" y="140" fill={C.dim} fontSize="16" fontWeight="600" fontFamily="Inter" opacity="0.6">No</text>
          <line x1="780" y1="110" x2="700" y2="195" stroke={C.dim} strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6" markerEnd="url(#cl3)" />
          <line x1="660" y1="260" x2="660" y2="295" stroke={C.dim} strokeWidth="1.5" opacity="0.6" markerEnd="url(#cl3)" />
        </g>

        {/* YES branch */}
        <g className="anim-pop d4">
          <rect x="180" y="200" width="280" height="60" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="320" y="237" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Lotes pequeños + verificación</text>
        </g>
        <g className="anim-pop d5">
          <rect x="100" y="320" width="200" height="55" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="200" y="355" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Mejor ritmo</text>
        </g>
        <g className="anim-pop d5">
          <rect x="340" y="320" width="200" height="55" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="440" y="355" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Estabilidad</text>
        </g>
        <g className="anim-fade d4">
          <text x="730" y="140" fill={C.highlight} fontSize="16" fontWeight="600" fontFamily="Inter">Sí</text>
          <line x1="730" y1="110" x2="420" y2="195" stroke={C.highlight} strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#cl2)" />
          <line x1="280" y1="260" x2="220" y2="315" stroke={C.highlight} strokeWidth="1" markerEnd="url(#cl2)" />
          <line x1="380" y1="260" x2="420" y2="315" stroke={C.highlight} strokeWidth="1" markerEnd="url(#cl2)" />
        </g>

        {/* DORA source */}
        <g className="anim-fade d6">
          <text x="500" y="410" textAnchor="middle" fill={C.dim} fontSize="16" fontFamily="Inter">DORA 2024: −1.5% ritmo, −7.2% estabilidad sin controles</text>
        </g>

        <defs>
          <marker id="cl1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.dim} /></marker>
          <marker id="cl2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.highlight} /></marker>
          <marker id="cl3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.dim} opacity="0.6" /></marker>
        </defs>
      </svg>
    </div>
  )
}

function GatesGuardrailsDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Controles rígidos vs automáticos</p>
      <p style={{ fontSize: 20, color: C.dim }}>Rígidos crean colas — automáticos sostienen flujo</p>
      <svg viewBox="0 0 900 280" width={900} fill="none">
        <g className="anim-pop d1">
          <rect x="30" y="50" width="180" height="65" rx="12" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="120" y="89" textAnchor="middle" fill={C.accent} fontSize="20" fontWeight="600" fontFamily="Inter">Entregable</text>
        </g>
        <g className="anim-pop d2">
          <rect x="270" y="50" width="240" height="65" rx="12" fill={C.surface} stroke={C.highlight} strokeWidth="2" />
          <text x="390" y="82" textAnchor="middle" fill={C.highlight} fontSize="18" fontWeight="600" fontFamily="Inter">Verificación automática</text>
          <text x="390" y="102" textAnchor="middle" fill={C.dim} fontSize="14" fontFamily="Inter">calidad + seguridad</text>
        </g>
        <g className="anim-fade d2"><line x1="210" y1="82" x2="265" y2="82" stroke={C.dim} strokeWidth="2" markerEnd="url(#gg1)" /></g>

        <g className="anim-pop d3">
          <rect x="570" y="50" width="160" height="65" rx="12" fill={C.surface} stroke={C.white} strokeWidth="2" />
          <text x="650" y="82" textAnchor="middle" fill={C.white} fontSize="18" fontWeight="600" fontFamily="Inter">Riesgo / Impacto</text>
          <text x="650" y="100" textAnchor="middle" fill={C.dim} fontSize="13" fontFamily="Inter">¿bajo, medio, alto?</text>
        </g>
        <g className="anim-fade d3"><line x1="510" y1="82" x2="565" y2="82" stroke={C.dim} strokeWidth="2" markerEnd="url(#gg1)" /></g>

        {/* Three outcomes */}
        {[
          { label: 'Aprobación automática', y: 160, color: C.highlight, risk: 'Bajo' },
          { label: 'Automático + revisión humana', y: 200, color: C.accent, risk: 'Medio' },
          { label: 'Comité de cambio + evidencia', y: 240, color: C.dim, risk: 'Alto' },
        ].map((o, i) => (
          <g key={i} className={`anim-pop d${i + 4}`}>
            <rect x="570" y={o.y} width="290" height="32" rx="8" fill={C.surface} stroke={o.color} strokeWidth="1.5" />
            <text x="715" y={o.y + 22} textAnchor="middle" fill={o.color} fontSize="16" fontWeight="500" fontFamily="Inter">{o.label}</text>
            <text x="555" y={o.y + 22} textAnchor="end" fill={o.color} fontSize="13" fontWeight="600" fontFamily="Inter">{o.risk}</text>
          </g>
        ))}

        <defs>
          <marker id="gg1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.dim} /></marker>
        </defs>
      </svg>
    </div>
  )
}

function HumanAgentDiagram() {
  const phases = [
    { label: 'Usuarios', sub: 'Negocio', x: 10, color: C.dim },
    { label: 'Responsable', sub: 'Intención + reglas', x: 145, color: C.accent },
    { label: 'IA', sub: 'Análisis', x: 280, color: C.highlight },
    { label: 'Equipo', sub: 'Diseño + revisión', x: 415, color: C.accent },
    { label: 'IA', sub: 'Ejecución', x: 550, color: C.highlight },
    { label: 'Verificación', sub: 'Controles', x: 685, color: C.accent },
    { label: 'Entrega', sub: 'Producción', x: 820, color: C.highlight },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Modelo humano-IA en gestión de proyectos</p>
      <svg viewBox="0 0 960 240" width={960} fill="none">
        {phases.map((p, i) => (
          <g key={i} className={`anim-pop d${i + 1}`}>
            <rect x={p.x} y="60" width="120" height="60" rx="12" fill={C.surface} stroke={p.color} strokeWidth="1.5" />
            <text x={p.x + 60} y="87" textAnchor="middle" fill={p.color} fontSize="17" fontWeight="600" fontFamily="Inter">{p.label}</text>
            <text x={p.x + 60} y="107" textAnchor="middle" fill={C.dim} fontSize="13" fontFamily="Inter">{p.sub}</text>
            {i < 6 && <line x1={p.x + 120} y1="90" x2={p.x + 140} y2="90" stroke="white" strokeWidth="1" opacity="0.2" markerEnd="url(#ha1)" />}
          </g>
        ))}
        {/* Incident agent */}
        <g className="anim-pop d7">
          <rect x="630" y="160" width="200" height="45" rx="10" fill={C.surface} stroke={C.highlight} strokeWidth="1" />
          <text x="730" y="189" textAnchor="middle" fill={C.highlight} fontSize="14" fontWeight="500" fontFamily="Inter">IA: análisis de incidencias</text>
          <line x1="880" y1="120" x2="810" y2="160" stroke={C.highlight} strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
        </g>
        {/* Warning */}
        <g className="anim-fade d7">
          <text x="480" y="230" textAnchor="middle" fill={C.dim} fontSize="15" fontFamily="Inter">⚠ Exceso de autonomía sin control = vulnerabilidad</text>
        </g>
        {/* Feedback loop */}
        <g className="anim-fade d7">
          <path d="M880 55 C910 20, 60 20, 70 55" fill="none" stroke={C.accent} strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#ha2)" />
          <text x="470" y="25" textAnchor="middle" fill={C.accent} fontSize="14" fontFamily="Inter">feedback</text>
        </g>
        <defs>
          <marker id="ha1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="white" opacity="0.3" /></marker>
          <marker id="ha2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill={C.accent} /></marker>
        </defs>
      </svg>
    </div>
  )
}

const DIAGRAMS = { causalLoop: CausalLoopDiagram, gatesGuardrails: GatesGuardrailsDiagram, humanAgent: HumanAgentDiagram }

/* ═══════════════════════════════════════════
   MOTION VARIANTS AND CONSTANTS
   ═══════════════════════════════════════════ */
const MARGIN = 120
const inner = { paddingLeft: MARGIN, paddingRight: MARGIN }
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }
const popIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } }
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const slideTransition = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }, exit: { opacity: 0, y: -20, transition: { duration: 0.15 } } }

/* ═══════════════════════════════════════════
   BAR ROW COMPONENT
   ═══════════════════════════════════════════ */
function BarRow({ item, delay }) {
  return (
    <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <span style={{ fontSize: 18, color: C.dim, minWidth: 220, textAlign: 'right' }}>{item.label}</span>
      <div style={{ flex: 1, height: 32, background: C.surface, borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / item.max) * 100}%` }} transition={{ duration: 0.8, delay: delay * 0.15, ease: [0.16, 1, 0.3, 1] }} style={{ height: '100%', background: item.color || C.highlight, borderRadius: 8 }} />
      </div>
      <span style={{ fontSize: 22, fontWeight: 700, color: item.color || C.highlight, minWidth: 80, fontFamily: "'JetBrains Mono', monospace" }}>{item.prefix || ''}{item.value}{item.suffix || ''}</span>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   SLIDE RENDERER
   ═══════════════════════════════════════════ */
function SlideRenderer({ data, quizState, onQuizAnswer }) {
  switch (data.type) {

    case 'hero': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 1100 }}>
          <motion.div variants={fadeUp}><Logos height={128} /></motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 500 }}>Gestión Ágil de Proyectos</motion.p>
          <motion.h1 variants={fadeUp} style={{ fontSize: T.hero, fontWeight: 800, lineHeight: 1.1, color: C.white }}>
            <span style={{ color: C.accent }}>Disciplina</span> y <span style={{ color: C.highlight }}>Escalabilidad</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 28, color: 'rgba(255,255,255,0.6)' }}>en la era de la IA agéntica</motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 22, color: 'rgba(255,255,255,0.35)' }}>Para líderes que gestionan proyectos en manufactura, servicios, banca y operaciones</motion.p>
          <motion.a variants={fadeUp} href="https://www.linkedin.com/in/ulisesgonzalez/" target="_blank" rel="noopener noreferrer" style={{ fontSize: T.caption, color: C.dim, textDecoration: 'none' }}>Profesor: Ulises González</motion.a>
        </div>
      </motion.div>
    )

    case 'agenda': {
      const modules = [
        { num: '01', title: 'Apertura', desc: 'Por qué disciplina y escala importan', color: C.dim },
        { num: '02', title: 'Disciplina', desc: 'Cadencias, criterios, controles', color: C.accent },
        { num: '03', title: 'Escalabilidad', desc: 'Nexus, LeSS, SAFe, DA, plataformas', color: C.highlight },
        { num: '04', title: 'IA en gestión', desc: 'Humano-IA, control, calidad', color: C.accent },
        { num: '05', title: 'Evidencia', desc: 'Casos cuantificados y contracasos', color: C.highlight },
        { num: '06', title: 'Tu sector', desc: 'Herramientas por industria', color: C.accent },
        { num: '07', title: 'Cierre', desc: 'Métricas, checklist 30/90/180 días', color: C.highlight },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1100 }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white, marginBottom: 8 }}>Índice del módulo</motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {modules.map((m, i) => (
                <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 20px', borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${m.color}` }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: m.color, fontFamily: "'JetBrains Mono', monospace", minWidth: 44 }}>{m.num}</span>
                  <div>
                    <p style={{ fontSize: 21, fontWeight: 600, color: C.white, lineHeight: 1.3 }}>{m.title}</p>
                    <p style={{ fontSize: 16, color: C.dim, lineHeight: 1.35 }}>{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )
    }

    case 'dodLevel': {
      const levels = [
        { risk: 'Bajo', color: C.highlight, items: ['Verificación básica aprobada', 'Revisión de entregables aprobada', 'Sin alertas de seguridad', 'Documentación actualizada'] },
        { risk: 'Medio', color: C.accent, items: ['Todo de "Bajo" +', 'Pruebas de integración', 'Evaluación de resultados IA', 'Trazabilidad de instrucciones', 'Revisión de datos sensibles'] },
        { risk: 'Alto', color: C.dim, items: ['Todo de "Medio" +', 'Seguridad dedicada', 'Validación de sesgo/equidad', 'Aprobación de compliance', 'Auditoría de autonomía IA'] },
      ]
      const level = levels[data.levelIndex]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Criterios de Terminado 2026</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: level.color }}>Riesgo {level.risk}</motion.h2>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '36px 40px', borderTop: `4px solid ${level.color}`, maxWidth: 900 }}>
            {level.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: level.color, opacity: 0.6, flexShrink: 0 }} />
                <p style={{ fontSize: 24, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{item}</p>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.dim }}>Si no cumple los criterios, no cuenta como entregado — Guía Scrum 2020</motion.p>
        </motion.div>
      )
    }

    case 'platformEng': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Condición de escalabilidad</motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Plataformas y herramientas compartidas</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 8 }}>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>80%</span>
              <span style={{ fontSize: 18, color: C.dim }}>de grandes organizaciones<br/>para 2026</span>
            </div>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>tendrán equipos dedicados a plataformas (45% en 2022)</p>
            <p style={{ fontSize: 16, color: C.dim, marginTop: 12 }}>Gartner 2024</p>
          </motion.div>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: C.highlight, fontFamily: "'JetBrains Mono', monospace" }}>90%</span>
              <span style={{ fontSize: 18, color: C.dim }}>correlación directa</span>
            </div>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>Correlación entre plataforma interna y capacidad de capturar valor de IA</p>
            <p style={{ fontSize: 16, color: C.dim, marginTop: 12 }}>DORA 2025</p>
          </motion.div>
        </div>
        <motion.p variants={fadeUp} style={{ fontSize: 22, color: C.dim, fontStyle: 'italic' }}>Sin plataforma, la escala se paga con agotamiento</motion.p>
      </motion.div>
    )

    case 'metricsTable': {
      const allMetrics = [
        { name: 'Frecuencia de entrega', what: 'Cadencia real de entrega', alert: 'Cae 2 ciclos seguidos', color: C.highlight },
        { name: 'Tiempo de ciclo', what: 'Aprobación → entrega final', alert: 'p95 sube = colas', color: C.highlight },
        { name: 'Tasa de retrabajo', what: '% entregas con reproceso', alert: '>15% sostenido', color: C.accent },
        { name: 'Tiempo de recuperación', what: 'Falla → servicio restaurado', alert: 'Sube o sin procedimientos', color: C.accent },
        { name: 'Cumplimiento criterios', what: '% que cumple criterios terminado', alert: '>5% "terminado sin terminar"', color: C.dim },
        { name: 'Brecha confianza IA', what: 'Baja confianza + uso alto', alert: 'Confianza baja + adopción sube', color: C.dim },
      ]
      const metrics = data.page === 0 ? allMetrics.slice(0, 3) : allMetrics.slice(3)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Tablero mínimo viable · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Métricas: disciplina + escala + IA</motion.h2>
          <motion.div variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '0', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {['Métrica', 'Qué mide', 'Alerta si...'].map((h, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', fontSize: 16, fontWeight: 600, color: C.dim, borderBottom: `1px solid ${C.border}` }}>{h}</div>
            ))}
            {metrics.map((m, i) => (
              <div key={`r${i}`} style={{ display: 'contents' }}>
                <div style={{ padding: '14px 16px', fontSize: 18, fontWeight: 600, color: m.color, borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>{m.name}</div>
                <div style={{ padding: '14px 16px', fontSize: 18, color: 'rgba(255,255,255,0.7)', borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>{m.what}</div>
                <div style={{ padding: '14px 16px', fontSize: 18, color: C.dim, fontWeight: 500, borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>{m.alert}</div>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: C.dim }}>DORA 2024/2025 · Métricas para gestión del sistema, no para evaluar individuos</motion.p>
        </motion.div>
      )
    }

    case 'rolesTable': {
      const allRoles = [
        { role: 'Responsable de prioridades', equiv: 'Gerente de proyecto — decide QUÉ', classic: 'Ordenar trabajo, negociar alcance', agentic: 'Políticas IA, taxonomía de riesgos', color: C.accent },
        { role: 'Facilitador del equipo', equiv: 'Líder de proceso — configura CÓMO', classic: 'Facilitar, eliminar obstáculos', agentic: 'Telemetría, cadencias, capacitación IA', color: C.highlight },
        { role: 'Equipo de ejecución', equiv: 'Analistas, técnicos, ejecutores', classic: 'Construir entregables, calidad', agentic: 'Revisión de IA, evaluación, seguridad', color: C.accent },
        { role: 'Líder / Gerente', equiv: 'Quienes crean las condiciones', classic: 'Priorización, asignación, entrega', agentic: 'Plataforma, automatización, costos', color: C.highlight },
      ]
      const roles = data.page === 0 ? allRoles.slice(0, 2) : allRoles.slice(2)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Roles · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Roles: clásico vs agéntico</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {roles.map((r, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px', borderLeft: `4px solid ${r.color}` }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.role}</p>
                <p style={{ fontSize: 16, color: C.dim, marginBottom: 20 }}>{r.equiv}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <p style={{ fontSize: 13, color: C.dim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Clásico</p>
                    <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{r.classic}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: C.highlight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Agéntico</p>
                    <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{r.agentic}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'collabModes': {
      const allModes = [
        { mode: 'Asistido', agent: 'Sugiere, resume', human: 'Decide y ejecuta', risk: 'Bajo', color: C.highlight },
        { mode: 'Co-piloto', agent: 'Propone plan', human: 'Decide y ajusta', risk: 'Bajo-Medio', color: C.highlight },
        { mode: 'Delegado', agent: 'Ejecuta con evidencia', human: 'Aprueba resultado', risk: 'Medio', color: C.accent },
        { mode: 'Autónomo acotado', agent: 'Actúa dentro de permisos', human: 'Define límites, audita', risk: 'Alto', color: C.accent },
      ]
      const modes = data.page === 0 ? allModes.slice(0, 2) : allModes.slice(2)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Modos de colaboración · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Colaboración humano-agente</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim }}>El modo se selecciona por nivel de riesgo</motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {modes.map((m, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px', borderLeft: `4px solid ${m.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 28, fontWeight: 700, color: m.color }}>{m.mode}</p>
                  <span style={{ fontSize: 16, color: m.color, fontWeight: 600, background: `${m.color}15`, padding: '6px 16px', borderRadius: 8 }}>Riesgo: {m.risk}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <p style={{ fontSize: 13, color: C.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Agente</p>
                    <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>{m.agent}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: C.highlight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Humano</p>
                    <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>{m.human}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'governanceQuestions': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Gobernanza</motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Las preguntas clave</motion.h2>
        {[
          '¿Quién decide qué herramientas de IA se usan?',
          '¿Hay política sobre qué datos compartes con IA?',
          '¿Quién es responsable si una decisión IA sale mal?',
        ].map((q, i) => (
          <motion.p key={i} variants={fadeUp} style={{ fontSize: T.text, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, maxWidth: 900, fontWeight: 500 }}>{q}</motion.p>
        ))}
      </motion.div>
    )

    case 'governanceCards': {
      const allCards = [
        { title: 'Núcleo central', desc: 'Normas y marco de gestión de riesgo IA\nNIST AI RMF + ISO 42001', color: C.accent },
        { title: 'Integrado a equipos', desc: 'Evaluación y criterios por dominio\nEvita cuello de botella central', color: C.highlight },
        { title: 'Procesos estandarizados', desc: 'Plantillas, verificación automática\nObservabilidad integrada', color: C.accent },
        { title: 'Presupuestos por valor', desc: 'Cadenas de valor con controles\nPivotar con evidencia, no por ciclo anual', color: C.highlight },
      ]
      const cards = data.page === 0 ? allCards.slice(0, 2) : allCards.slice(2)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Gobernanza práctica · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Estructura de gobernanza</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {cards.map((g, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '32px 36px', borderTop: `4px solid ${g.color}` }}>
                <p style={{ fontSize: 28, fontWeight: 700, color: g.color, marginBottom: 16 }}>{g.title}</p>
                <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'complianceMap': {
      const allItems = [
        { standard: 'EU AI Act (2024/1689)', scope: 'Obligaciones progresivas 2025-2027', date: 'Ago 2026', color: C.accent },
        { standard: 'NIST AI RMF 1.0', scope: 'Marco voluntario gestión riesgo IA', date: '2023', color: C.accent },
        { standard: 'NIST AI 600-1', scope: 'Perfil específico para IA generativa', date: '2024', color: C.accent },
        { standard: 'ISO/IEC 42001', scope: 'Sistema de gestión de IA', date: '2023', color: C.highlight },
        { standard: 'ISO/IEC 23894', scope: 'Guía gestión de riesgo IA', date: '2023', color: C.highlight },
        { standard: 'ISO/IEC 27001', scope: 'Seguridad de la información', date: '2022', color: C.highlight },
        { standard: 'ISO/IEC 5055', scope: 'Calidad estructural', date: '2021', color: C.dim },
      ]
      const items = data.page === 0 ? allItems.slice(0, 4) : allItems.slice(4)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Gobernanza como habilitador · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Mapa de compliance: NIST + ISO + UE</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '280px 1fr 100px', gap: 16, alignItems: 'center', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', borderLeft: `3px solid ${item.color}` }}>
                <p style={{ fontSize: 20, fontWeight: 600, color: item.color }}>{item.standard}</p>
                <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.7)' }}>{item.scope}</p>
                <p style={{ fontSize: 16, color: C.dim, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>{item.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'benchmarkCard': {
      const orgs = [
        { org: 'Standard Bank', items: [{ label: 'Tiempo al mercado', before: '700 días', after: '30 días' }, { label: 'Productividad', before: 'Baseline', after: '+50%' }, { label: 'Costos', before: 'Baseline', after: '−77%' }, { label: 'Predictibilidad', before: '—', after: '68%' }], color: C.accent },
        { org: 'Fannie Mae', items: [{ label: 'Frecuencia de entrega', before: '1-2/año', after: 'Mensual' }, { label: 'Integración', before: 'Trimestral', after: 'Cada 2 semanas' }, { label: 'Velocidad', before: '10 puntos', after: '>30 puntos' }], color: C.highlight },
      ]
      const b = orgs[data.orgIndex]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Benchmarks de escala</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: b.color }}>{b.org}</motion.h2>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px', borderTop: `4px solid ${b.color}`, maxWidth: 900 }}>
            {b.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < b.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 20, color: C.dim }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>{item.before}</span>
                  <span style={{ fontSize: 16, color: C.dim }}>→</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: b.color, fontFamily: "'JetBrains Mono', monospace" }}>{item.after}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.dim }}>Casos reportados por SAFe — usar como orientación</motion.p>
        </motion.div>
      )
    }

    case 'agileBySector': {
      const allSectors = [
        { sector: 'Manufactura y Alimentos', color: C.accent, orgs: 'Crustissimo · JSL · Polar · Botalón · Cabel', areas: [
          { area: 'Desarrollo de producto', metric: '−55%', metricLabel: 'time-to-market', useCase: 'Nuevo SKU con equipo multifuncional en ciclos de 2 semanas', source: 'BCG/NielsenIQ' },
          { area: 'Eficiencia operacional', metric: '+30-40%', metricLabel: 'eficiencia', useCase: 'Kanban visual + daily 15 min + retrospectiva quincenal', source: 'PA Consulting' },
          { area: 'Entrega a tiempo', metric: '>95%', metricLabel: 'on-time delivery', useCase: 'Despacho con ciclos cortos y ajuste semanal', source: 'Tailor Benchmarks' },
        ]},
        { sector: 'Farmacéutica', color: C.highlight, orgs: 'Calox International · Corp. JSL', areas: [
          { area: 'Ciclo de desarrollo', metric: '−40%', metricLabel: 'concepto → ensayo', useCase: 'Registro sanitario con lista por impacto regulatorio', source: 'McKinsey Life Sciences' },
          { area: 'Costos de proyecto', metric: '−25%', metricLabel: 'reducción', useCase: 'Revisiones cada 2 semanas con go/no-go temprano', source: 'McKinsey Pharma' },
          { area: 'Acciones correctivas', metric: 'Continua', metricLabel: 'medición', useCase: 'Causa raíz → plan correctivo en días', source: 'McKinsey/Roche' },
        ]},
        { sector: 'Banca y Servicios', color: C.accent, orgs: 'Bancrecer · Fulldata · Damasco', areas: [
          { area: 'Productividad de equipos', metric: '+25-35%', metricLabel: 'mejora', useCase: 'Proceso de crédito: ciclo de 2 semanas medible', source: 'Hiperdrive Agile' },
          { area: 'Tiempo al mercado', metric: '−50-70%', metricLabel: 'ciclo de entrega', useCase: 'Producto financiero con versión mínima en 4 semanas', source: 'ING/McKinsey' },
          { area: 'Servicio al cliente', metric: '−50%', metricLabel: 'quejas', useCase: 'Retroalimentación semanal + ajuste iterativo', source: 'BCG 2022' },
        ]},
        { sector: 'Construcción y Retail', color: C.highlight, orgs: 'Pilperca · B&P · Tiendas Ciro · Promoting', areas: [
          { area: 'Cumplimiento cronograma', metric: '3×', metricLabel: 'más probable a tiempo', useCase: 'Last Planner: compromisos semanales', source: 'LCI/Dodge 2021' },
          { area: 'Eficiencia ruta crítica', metric: '+51.6%', metricLabel: 'mejora', useCase: 'Scrum adaptado: planificación quincenal', source: 'MDPI Buildings 2025' },
          { area: 'Precisión inventario', metric: '82→98%', metricLabel: 'precisión', useCase: 'Ciclos de ajuste cada 2 semanas', source: 'Omniful' },
        ]},
      ]
      const s = allSectors[data.sectorIndex] || allSectors[0]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>Evidencia ágil por sector · {data.sectorIndex + 1}/4</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 52, fontWeight: 700, color: s.color }}>{s.sector}</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, marginTop: 6 }}>{s.orgs}</motion.p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {s.areas.map((a, j) => (
              <motion.div key={j} variants={popIn} style={{ display: 'grid', gridTemplateColumns: '220px 160px 1fr', gap: 24, alignItems: 'center', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '24px 28px', borderLeft: `4px solid ${s.color}` }}>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 600, color: C.white, lineHeight: 1.3 }}>{a.area}</p>
                  <p style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>{a.source}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 36, fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{a.metric}</p>
                  <p style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>{a.metricLabel}</p>
                </div>
                <div style={{ paddingLeft: 20, borderLeft: `2px solid ${s.color}30` }}>
                  <p style={{ fontSize: 12, color: s.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Caso de uso ideal</p>
                  <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{a.useCase}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'toolsBySector': {
      const allSectors = [
        { sector: 'Manufactura y Alimentos', color: C.accent, orgs: 'Crustissimo · JSL · Polar · Pilperca · Cabel', tools: [
          { practice: 'Kanban visual', ai: 'IA genera tablero y sugiere límites de trabajo en curso' },
          { practice: 'Reunión diaria 15 min', ai: 'IA resume avances y detecta bloqueos antes de reunión' },
          { practice: 'Retrospectiva', ai: 'IA consolida incidentes y sugiere 3 acciones priorizadas' },
          { practice: 'Gestión de riesgos', ai: 'Matriz desde históricos + causa raíz automático' },
        ]},
        { sector: 'Farmacéutica', color: C.highlight, orgs: 'Calox · Corp. JSL', tools: [
          { practice: 'Lista priorizada', ai: 'IA ordena por impacto regulatorio con trazabilidad' },
          { practice: 'Criterios terminado', ai: 'Checklist generado según normativa GMP/GLP' },
          { practice: 'Revisión de ciclo', ai: 'Resumen ejecutivo de entregables para comité' },
          { practice: 'Acción correctiva', ai: 'Causa raíz → plan correctivo en minutos' },
        ]},
        { sector: 'Banca y Servicios', color: C.accent, orgs: 'Bancrecer · Fulldata · Damasco', tools: [
          { practice: 'Mapeo de experiencia', ai: 'IA mapea recorrido del cliente y genera prioridades' },
          { practice: 'Estimación', ai: 'Rangos de esfuerzo por históricos similares' },
          { practice: 'Métricas de flujo', ai: 'Tiempo de ciclo calculado en tiempo real' },
          { practice: 'Reporte a directivos', ai: 'De 30 páginas a 1 resumen accionable' },
        ]},
        { sector: 'Retail, Educación y Comercio', color: C.highlight, orgs: 'Tiendas Ciro · IESA · Promoting · Link 1720', tools: [
          { practice: 'Hoja de ruta', ai: 'IA prioriza por impacto en ingreso y satisfacción' },
          { practice: 'Retroalimentación', ai: 'Encuestas analizadas → hallazgos en horas' },
          { practice: 'Planificación ciclo', ai: 'Cruza capacidad + prioridades + dependencias' },
          { practice: 'Lecciones aprendidas', ai: 'Consolida retrospectivas y sugiere patrones' },
        ]},
      ]
      const s = allSectors[data.sectorIdx] || allSectors[0]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>Herramientas ágiles × IA · {data.sectorIdx + 1}/4</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 52, fontWeight: 700, color: s.color }}>{s.sector}</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, marginTop: 6 }}>{s.orgs}</motion.p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {s.tools.map((t, j) => (
              <motion.div key={j} variants={popIn} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '26px 32px', borderLeft: `4px solid ${s.color}` }}>
                <div style={{ minWidth: 200 }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: C.white }}>{t.practice}</p>
                </div>
                <div style={{ flex: 1, paddingLeft: 20, borderLeft: `2px solid ${s.color}30` }}>
                  <p style={{ fontSize: 12, color: s.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Con IA</p>
                  <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>{t.ai}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'assessment': {
      const allCards = [
        { title: 'Madurez del equipo', questions: ['¿Objetivos claros y medibles?', '¿Cadencia de reuniones de revisión?', '¿Criterios de terminado definidos?'], color: C.accent },
        { title: 'Capacidad de IA', questions: ['¿Tareas repetitivas que consumen tiempo?', '¿Datos ya digitalizados?', '¿Política de uso de herramientas IA?'], color: C.highlight },
        { title: 'Oportunidades rápidas', questions: ['¿Dónde hay más retrabajo?', '¿Reportes manuales?', '¿Decisiones esperando información?'], color: C.accent },
        { title: 'Riesgos a controlar', questions: ['¿Procesos que NO automatizar?', '¿Datos confidenciales?', '¿Quién aprueba decisiones de riesgo?'], color: C.highlight },
      ]
      const cards = data.page === 0 ? allCards.slice(0, 2) : allCards.slice(2)
      const pageLabel = data.page === 0 ? '1/2' : '2/2'
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Diagnóstico · {pageLabel}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>¿Dónde estás hoy?</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {cards.map((c, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px', borderTop: `4px solid ${c.color}` }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: c.color, marginBottom: 20 }}>{c.title}</p>
                {c.questions.map((q, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, opacity: 0.6, flexShrink: 0 }} />
                    <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{q}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'monday': {
      const allAreas = [
        { role: 'Calidad / Operaciones', color: C.accent, items: [
          { title: 'Causa raíz con IA', desc: 'Datos de no conformidades → patrones y borradores de acción correctiva en minutos.' },
          { title: 'Gestión de riesgos', desc: 'Matriz generada por IA desde históricos, revisada cada ciclo.' },
          { title: 'Dashboards automáticos', desc: '% avance, SLA, defectos — IA arma tablero, tú interpretas.' },
        ]},
        { role: 'Finanzas / Administración', color: C.highlight, items: [
          { title: 'Estimación y costeo', desc: 'IA analiza históricos y genera rangos con supuestos explícitos.' },
          { title: 'Síntesis ejecutiva', desc: 'De 30 páginas a 1 resumen accionable (−40% tiempo).' },
          { title: 'Presupuesto vs. real', desc: 'IA detecta desviaciones y sugiere correctivos. Nunca aprueba riesgo.' },
        ]},
        { role: 'Producción / Supervisión', color: C.accent, items: [
          { title: 'Ciclo de 2 semanas', desc: 'Daily 15 min, entregable medible, retrospectiva al cierre.' },
          { title: 'Planificación capacidad', desc: 'IA cruza carga, disponibilidad y prioridades. Tú ajustas.' },
          { title: 'Lecciones aprendidas', desc: 'IA consolida retrospectivas e identifica patrones recurrentes.' },
        ]},
        { role: 'Comercial / Marketing', color: C.highlight, items: [
          { title: 'Propuestas y licitaciones', desc: 'IA genera borradores con análisis competitivo. Tú aportas criterio de marca.' },
          { title: 'Hoja de ruta producto', desc: 'IA prioriza por impacto en ingreso y satisfacción.' },
          { title: 'Embudo comercial', desc: 'IA identifica cuellos de botella por etapa del ciclo de venta.' },
        ]},
      ]
      const area = allAreas[data.areaIndex] || allAreas[0]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>¿Y yo qué hago el lunes? · {data.areaIndex + 1}/4</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 52, fontWeight: 700, color: area.color }}>{area.role}</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, marginTop: 8 }}>
              Elige <span style={{ color: C.white, fontWeight: 600 }}>un proyecto real</span> de tu área. Define un ciclo corto, un entregable medible y un equipo pequeño.
            </motion.p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {area.items.map((item, j) => (
              <motion.div key={j} variants={popIn} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 32px', borderLeft: `4px solid ${area.color}` }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: 12, background: `${area.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: area.color, fontFamily: "'JetBrains Mono', monospace" }}>{j + 1}</span>
                </div>
                <div>
                  <p style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 8 }}>{item.title}</p>
                  <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.dim, textAlign: 'center' }}>
            Formato: proyecto acotado → equipo pequeño → ciclo corto → medir → decidir si escalar
          </motion.p>
        </motion.div>
      )
    }

    case 'bibPage': {
      const allEntries = [
        'DORA / Google Cloud. "State of DevOps 2024".',
        'DORA. "State of DevOps 2025". Google Cloud.',
        'McKinsey. "The state of AI in early 2024".',
        'McKinsey. "How organizations capture value". 2025.',
        'Gartner. "40% Apps Will Have AI Agents". 2025.',
        'Gartner. "Platform Engineering". 2024.',
        'Microsoft. "Work Trend Index 2025".',
        'Schwaber & Sutherland. "Guía de Scrum 2020".',
        'Schwaber. "Nexus Guide". Scrum.org, 2021.',
        'Larman & Vodde. "Large-Scale Scrum". 2016.',
        'Scaled Agile. "SAFe 6.0".',
        'PMI. "Disciplined Agile".',
        'NIST. "AI Risk Management Framework 1.0". 2023.',
        'NIST. "AI 600-1: GenAI Profile". 2024.',
        'ISO/IEC 42001:2023. "AI Management System".',
        'OWASP. "Top 10 for LLM Applications". 2024.',
        'GitHub + Accenture. "Copilot impact". 2024.',
        'METR. "AI on Open-Source Developers". 2025.',
        'EU. "AI Act (Regulation 2024/1689)".',
        'Avantius. "SAFe Case Study".',
        'SEFAZ-SP. "SAFe Case Study".',
        'BCG/NielsenIQ. "Agile in CPG". 2023.',
        'McKinsey Life Sciences. "Agile in Pharma".',
        'Lean Construction Institute. "Last Planner".',
        'PA Consulting. "Agile Manufacturing". 2023.',
      ]
      const entries = allEntries.slice(data.page * 5, data.page * 5 + 5)
      const totalPages = Math.ceil(allEntries.length / 5)
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Bibliografía · {data.page + 1}/{totalPages}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Bibliografía</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {entries.map((entry, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: C.dim, fontFamily: "'JetBrains Mono', monospace", minWidth: 32 }}>{data.page * 5 + i + 1}.</span>
                <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{entry}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'resourcePage': {
      const allCategories = [
        { category: 'Frameworks', color: C.accent, items: [
          { title: 'Scrum Guide 2020', author: 'scrumguides.org', note: 'Documento oficial — 13 páginas' },
          { title: 'Nexus Guide', author: 'scrum.org', note: 'Escalar Scrum con mínima complejidad' },
          { title: 'SAFe 6.0', author: 'scaledagileframework.com', note: 'Framework enterprise' },
          { title: 'Disciplined Agile', author: 'pmi.org', note: 'Toolkit híbrido del PMI' },
        ]},
        { category: 'IA y Riesgo', color: C.highlight, items: [
          { title: 'NIST AI RMF 1.0', author: 'nist.gov', note: 'Marco de gestión de riesgo IA' },
          { title: 'OWASP Top 10 LLM', author: 'owasp.org', note: 'Riesgos de seguridad en apps LLM' },
          { title: 'DORA Reports', author: 'dora.dev', note: 'Métricas de delivery' },
          { title: 'EU AI Act', author: 'eur-lex.europa.eu', note: 'Regulación 2024/1689' },
        ]},
        { category: 'Libros', color: C.accent, items: [
          { title: 'Team Topologies', author: 'Skelton & Pais', note: 'Estructura de equipos' },
          { title: 'Accelerate', author: 'Forsgren, Humble & Kim', note: 'La ciencia de DevOps' },
          { title: 'Co-Intelligence', author: 'Ethan Mollick', note: 'IA práctica para líderes' },
          { title: 'The Phoenix Project', author: 'Kim, Behr & Spafford', note: 'Novela de gestión DevOps' },
        ]},
      ]
      const r = allCategories[data.page]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Recursos recomendados</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: r.color }}>{r.category}</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {r.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '24px 28px', borderLeft: `4px solid ${r.color}` }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 16, color: r.color, marginBottom: 6 }}>{item.author}</p>
                <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>{item.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'stats': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        {data.title && <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</motion.h2>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, width: '100%', maxWidth: 1200 }}>
          {data.items.map((s, i) => (
            <motion.div key={i} variants={popIn} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '36px 28px', textAlign: 'center' }}>
              <p style={{ fontSize: 64, fontWeight: 800, color: C.accent, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: T.caption, color: C.white, marginTop: 12 }}>{s.label}</p>
              <p style={{ fontSize: 16, color: C.dim, marginTop: 6 }}>{s.source}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )

    case 'diagram': {
      const Comp = DIAGRAMS[data.id]
      return <div style={{ ...inner, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Comp /></div>
    }

    case 'bigstat': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 30 }}>
        <motion.p variants={popIn} style={{ fontSize: 120, fontWeight: 800, color: C.accent, lineHeight: 1 }}>{data.value}</motion.p>
        <motion.p variants={fadeUp} style={{ fontSize: T.text, color: 'rgba(255,255,255,0.8)', maxWidth: 700, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{data.label}</motion.p>
        {data.source && <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, whiteSpace: 'pre-line' }}>{data.source}</motion.p>}
      </motion.div>
    )

    case 'bars': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        {data.note && <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</motion.p>}
        <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
          {data.items.map((item, i) => <BarRow key={i} item={item} delay={i} />)}
        </div>
        {data.source && <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim }}>{data.source}</motion.p>}
      </motion.div>
    )

    case 'case': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <motion.div variants={fadeUp} style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.title}</motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim }}>{data.subtitle}</motion.p>
        <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
          {data.items.map((item, i) => (
            <motion.div key={i} variants={popIn} whileHover={{ scale: 1.04, transition: { duration: 0.2 } }} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: 48, fontWeight: 800, color: data.color, lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', marginTop: 12 }}>{item.label}</p>
            </motion.div>
          ))}
        </div>
        {data.note && <motion.p variants={fadeUp} style={{ fontSize: 22, color: C.dim, fontStyle: 'italic' }}>{data.note}</motion.p>}
      </motion.div>
    )

    case 'quiz': {
      const state = quizState[data.idx]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.highlight, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Pregunta {data.idx + 1} de 10</motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: T.text, color: C.white, lineHeight: 1.6, maxWidth: 900, whiteSpace: 'pre-line', fontWeight: 500 }}>{data.q}</motion.p>
          {state === null ? (
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 24, marginTop: 20 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => onQuizAnswer(data.idx, true)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.highlight}`, background: 'rgba(34,197,94,0.08)', color: C.highlight, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Verdadero
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => onQuizAnswer(data.idx, false)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.dim}`, background: 'rgba(100,116,139,0.08)', color: C.dim, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Falso
              </motion.button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
              <p style={{ fontSize: T.bullet, fontWeight: 700, color: state ? C.highlight : C.dim, marginBottom: 16 }}>
                {state ? '✓ ¡Correcto!' : '✗ Incorrecto'} — La respuesta es Verdadero
              </p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.6, maxWidth: 800 }}>{data.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      )
    }

    case 'checklist': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        {data.title && <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, marginBottom: 8 }}>{data.title}</motion.h2>}
        {data.items.map((item, i) => (
          <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 28, maxWidth: 900 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: C.surface, border: `2px solid ${C.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: C.accent }}>{item.step}</span>
            </div>
            <p style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, whiteSpace: 'pre-line', paddingTop: 8 }}>{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    )

    case 'section': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <motion.div variants={fadeUp} style={{ width: 80, height: 5, background: C.accent, borderRadius: 3 }} />
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 800, color: C.white }}>{data.title}</motion.h2>
        {data.subtitle && <motion.p variants={fadeUp} style={{ fontSize: T.subtitle, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{data.subtitle}</motion.p>}
      </motion.div>
    )

    case 'content': {
      const bulletColor = data.color === 'accent' ? C.accent : C.accent
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          {data.note && <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</motion.p>}
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, maxWidth: 900 }}>{data.title}</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            {data.bullets.map((b, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, maxWidth: 900 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: bulletColor, opacity: 0.7, flexShrink: 0, marginTop: 10 }} />
                <p style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{b}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'end': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 36 }}>
        <motion.div variants={fadeUp}><Logos height={96} /></motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 800, color: C.white }}>Gracias</motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: T.text, color: 'rgba(255,255,255,0.5)' }}>Disciplina primero. Escala después. IA con control.</motion.p>
        <motion.a variants={fadeUp} href="https://www.linkedin.com/in/ulisesgonzalez/" target="_blank" rel="noopener noreferrer" style={{ fontSize: T.caption, color: C.dim, textDecoration: 'none' }}>linkedin.com/in/ulisesgonzalez</motion.a>
        <motion.div variants={fadeUp}><LiveClock /></motion.div>
      </motion.div>
    )

    default: return (
      <div style={{ ...inner, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: T.text, color: C.dim }}>Slide type "{data.type}" not implemented</p>
      </div>
    )
  }
}
function TakeawayOverlay({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', bottom: 60, left: MARGIN, right: MARGIN, zIndex: 20, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ background: 'rgba(79,140,255,0.12)', border: '1px solid rgba(79,140,255,0.3)', borderRadius: 16, padding: '20px 40px', maxWidth: 1200, backdropFilter: 'blur(16px)' }}>
            <p style={{ fontSize: 22, color: C.accent, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 2 }}>Takeaway</p>
            <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const TOTAL = slides.length

export default function App() {
  const [current, setCurrent] = useState(0)
  const [anim, setAnim] = useState(false)
  const [quizState, setQuizState] = useState(Array(10).fill(null))
  const [scale, setScale] = useState(1)
  const [showTakeaway, setShowTakeaway] = useState(false)

  useEffect(() => {
    const resize = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const go = useCallback((dir) => {
    if (anim) return
    const next = dir === 1 ? Math.min(current + 1, TOTAL - 1) : Math.max(current - 1, 0)
    if (next === current) return
    setAnim(true)
    setShowTakeaway(false)
    setTimeout(() => { setCurrent(next); setAnim(false) }, 150)
  }, [current, anim])

  const goTo = useCallback((idx) => {
    if (anim || idx === current) return
    setAnim(true)
    setShowTakeaway(false)
    setTimeout(() => { setCurrent(idx); setAnim(false) }, 150)
  }, [current, anim])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1) }
      if (e.key === 'Home') { e.preventDefault(); goTo(0) }
      if (e.key === 'End') { e.preventDefault(); goTo(TOTAL - 1) }
      if (e.key === 'n' || e.key === 'N') { e.preventDefault(); setShowTakeaway(prev => !prev) }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); if (!document.fullscreenElement) { document.documentElement.requestFullscreen().catch(() => {}) } else { document.exitFullscreen().catch(() => {}) } }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go, goTo])

  return (
    <div style={{ width: '100vw', height: '100vh', background: C.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center center', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.04)', zIndex: 10 }}>
          <div style={{ height: '100%', background: C.accent, transition: 'width 400ms ease-out', width: `${((current + 1) / TOTAL) * 100}%` }} />
        </div>
        <div style={{ position: 'absolute', top: 20, left: MARGIN, right: MARGIN, zIndex: 10, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <LiveClock />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={current} {...slideTransition} style={{ width: 1920, height: 1080 }}>
            <SlideRenderer data={slides[current]} quizState={quizState} onQuizAnswer={(idx, val) => setQuizState(prev => { const n = [...prev]; n[idx] = val; return n })} />
          </motion.div>
        </AnimatePresence>
        <TakeawayOverlay text={TAKEAWAYS[current]} visible={showTakeaway} />
        {current > 0 && (
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.95 }} onClick={() => go(-1)} style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, zIndex: 10 }}>&#8249;</motion.button>
        )}
        {current < TOTAL - 1 && (
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.95 }} onClick={() => go(1)} style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, zIndex: 10 }}>&#8250;</motion.button>
        )}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4, zIndex: 10 }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} title={`Slide ${i + 1}`}
              style={{ width: i === current ? 20 : 5, height: 5, borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 300ms', background: i === current ? C.accent : s.type === 'quiz' ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: MARGIN, zIndex: 10, fontSize: 16, color: 'rgba(255,255,255,0.15)' }}>
          ulises.gonzalez@iesa.edu.ve
        </div>
        <div style={{ position: 'absolute', bottom: 20, right: MARGIN, zIndex: 10, fontSize: 16, color: 'rgba(255,255,255,0.15)' }}>
          <kbd style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14 }}>N</kbd> takeaway{' · '}
          <kbd style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14 }}>F</kbd> pantalla completa
        </div>
      </div>
    </div>
  )
}