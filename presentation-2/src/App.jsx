import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ═══════════════════════════════════════════
   DESIGN SYSTEM — 1920×1080 Keynote
   ═══════════════════════════════════════════ */
const C = { bg: '#0B0F14', white: '#FFFFFF', accent: '#811937', highlight: '#22C55E', dim: '#64748B', surface: '#141A23', border: '#1E293B', red: '#EF4444', cyan: '#06b6d4', amber: '#F59E0B', purple: '#A855F7' }
const T = { hero: 88, title: 72, subtitle: 44, text: 34, bullet: 32, caption: 26 }

/* ═══════════════════════════════════════════
   LOGOS — IESA + UniKemia
   ═══════════════════════════════════════════ */
function Logos({ height = 128 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <img src="./logo-iesa.png" alt="IESA" style={{ height, objectFit: 'contain' }} draggable={false} />
      <img src="./logo-unikemia.webp" alt="UniKemia" style={{ height: height * 0.55, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} draggable={false} />
    </div>
  )
}

/* ═══════════════════════════════════════════
   LIVE CLOCK
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   TAKEAWAY NOTES (per slide)
   ═══════════════════════════════════════════ */
const TAKEAWAYS = [
  /* 0  hero */            'La IA no arregla equipos; amplifica lo que ya existe. Disciplina y escalabilidad son los mecanismos de control que convierten capacidad de cambio en valor.',
  /* 1  agenda */          'Este módulo cubre disciplina (DoD, cadencias, guardrails), escalabilidad (Nexus, LeSS, SAFe, DA, plataformas) e IA agéntica controlada. Al final: checklist 30/90/180 días.',
  /* 2  datos obligan */   '90% usa IA en el trabajo pero ~30% confía poco en el código generado. Adopción sin confianza = riesgo sistémico.',
  /* 3  trampa */          'DORA 2024: más IA → −1.5% throughput, −7.2% estabilidad cuando faltan básicos. Sin safety nets, más velocidad = más inestabilidad.',
  /* 4  disciplina def */  'Disciplina no es burocracia. Es cumplimiento consistente de reglas que hacen el trabajo verificable, integrable y liberable en cadencias cortas.',
  /* 5  cadencias */       'Sprint (Scrum) y Planning Interval (SAFe) son contenedores de disciplina. La pregunta: ¿cuál es tu cadencia real, no la declarada?',
  /* 6  DoD 2026 */        'En 2026, DoD incluye: evaluación de outputs IA, trazabilidad de prompts, seguridad de contexto. Si no cumple DoD, no cuenta como Increment.',
  /* 7  gates guard */     'Gates crean colas; guardrails + automatización sostienen flow. En IA agéntica: permisos, límites, auditoría — no revisión manual de todo.',
  /* 8  section escala */  'La escalabilidad no es "más equipos haciendo lo mismo". Es reducir dependencias y aumentar integración sin que el costo de coordinación crezca.',
  /* 9  escalar */         'Escalar no es multiplicar equipos. Es reducir dependencias para que más equipos integren sin fragmentar.',
  /* 9  SAFe */            'SAFe añade cadencia PI + Lean Budget Guardrails. Útil cuando el problema es coordinación + portafolio + funding — no para equipos que pueden ser autónomos.',
  /* 10 DA */              'Disciplined Agile: no hay talla única. Elige Way of Working según contexto — coexistencia de modelos es la norma.',
  /* 11 platform */        'Gartner: 80% de grandes orgs tendrán equipos de platform engineering para 2026. Sin plataforma, la escala se paga con coordinación y burnout.',
  /* 12 section IA */      'La IA agéntica no elimina roles — redefine qué hace cada quien. El reto es diseñar colaboración humano-agente con control, no con fe.',
  /* 13 hacer orquest */   'El rol cambia de "hacer" a "orquestar". Microsoft formaliza "agent boss": gestores de ratio humano-agente, no ejecutores directos.',
  /* 13 modelo h-a */      'Capas: agentes (ejecución), humanos (intención/decisión), plataforma (guardrails), gobernanza (riesgo). OWASP: exceso de agencia = vulnerabilidad.',
  /* 15 liderazgo */       'Disciplina: estabilizar prioridades. Escala: invertir en plataforma + capacitación. La IA no es proyecto — es cambio de operating model.',
  /* 16 section evid */    'Los casos cuantificados muestran un patrón claro: la IA mejora resultados donde hay disciplina previa. Sin ella, los números no se sostienen.',
  /* 17 accenture */       'Copilot en Accenture: +8.69% PRs, +15% merge rate, +84% builds exitosos. La IA mejora throughput SI pipeline y revisión sostienen calidad.',
  /* 16 avantius */        'Avantius: −47% bugs (2020-2022), 3 releases/año predecibles, +30% NPS. Disciplina = cadencia + calidad + feedback.',
  /* 17 sefaz */           'SEFAZ-SP: +296% features, −12% incidentes. Escala exige sincronización y claridad de roles/telemetría.',
  /* 18 standard */        'Standard Bank: 700→30 días time-to-market. Fannie Mae: entregas mensuales vs 1-2/año. Rangos de referencia, no promesas.',
  /* 19 contrapunto */     'METR RCT: expertos fueron 19% más lentos con IA (creían ser más rápidos). Disciplina incluye disciplina de medición.',
  /* 20 metricas */        'DORA evolucionó a 5 métricas: throughput + instability. Sin métricas comparables no hay escala — y sin métricas no hay disciplina.',
  /* 21 roles tabla */     'Cada rol clásico incorpora nuevas responsabilidades: policy, evaluación, seguridad, costos y control de exceso de agencia.',
  /* 22 modos colab */     'Cuatro modos humano-agente: asistido, co-pilot, delegado, autónomo acotado. El modo se selecciona por nivel de riesgo.',
  /* 23 gobernanza */      'Gobernanza práctica: núcleo central (NIST/ISO), federado a productos, plataforma (guardrails CI/CD), finanzas (value streams).',
  /* 24 compliance */      'EU AI Act aplica desde agosto 2026. NIST AI RMF 1.0 + ISO 42001 como sistema de gestión. Gobernanza como habilitador, no freno.',
  /* 25 section quiz1 */   'Estas preguntas verifican comprensión de escalado ágil: madurez previa, frameworks, trade-offs y liderazgo.',
  /* 26 q1 */              'Sin fundamentos (testing/feedback), incluso mejoras locales empeoran resultados sistémicos. DORA lo confirma.',
  /* 27 q2 */              'Nexus: múltiples equipos → un Product Backlog → un Integrated Increment → dependencias mínimas.',
  /* 28 q3 */              'LeSS: "des-escalar" complejidad organizacional. Mínimo proceso adicional para que funcione.',
  /* 29 q4 */              'SAFe cubre Planning Interval + Built-In Quality + Lean Budget Guardrails + arquitectura enterprise.',
  /* 30 q5 */              'DA provee mortero para encajar ladrillos (Scrum, XP, Kanban, AM). People-first, enterprise-aware.',
  /* 31 section quiz2 */   'Estas preguntas conectan liderazgo, escalado y gobernanza de IA agéntica.',
  /* 32 q6 */              'No hay talla única. Analiza necesidades y limitaciones de tu caso específico antes de elegir framework.',
  /* 33 q7 */              'Taxonomía modular: equipos de experiencia del cliente + procesos empresariales + sistemas tecnológicos.',
  /* 34 q8 */              'Victorias fáciles protegen equipos individuales pero no producen cambios sistémicos para escalar.',
  /* 35 q9 */              'Inculcar valores ágiles en toda la empresa — incluso partes que no se organizan en ágil.',
  /* 36 q10 */             'Funding dinámico: abandonar funciones y lanzar otras sin esperar ciclo anual. Como venture capital interno.',
  /* 37 checklist 30 */    'En 30 días: DoD mínima, DORA metrics básicas, política de uso IA, piloto controlado en 1-2 flujos.',
  /* 38 checklist 90 */    'En 90 días: guardrails presupuesto, paved road mínimo, evaluación de outputs IA en CI/DoD, entrenamiento agent boss.',
  /* 39 checklist 180 */   'En 180 días: operating model humano-agente, plataforma interna como producto, preparación normativa AI Act/ISO.',
  /* 40 biblio */          'Fuentes verificables: DORA, McKinsey, Gartner, NIST, ISO, Scrum Guide, OWASP, METR.',
  /* 41 recursos */        'Recursos seleccionados para profundizar: libros, videos, estándares y frameworks.',
  /* 42 end */             '',
]

/* ═══════════════════════════════════════════
   SLIDE DATA
   ═══════════════════════════════════════════ */
const slides = [

  // ── 0: TITLE ──
  { type: 'hero' },

  // ── 1: AGENDA ──
  { type: 'agenda' },

  // ── 2: DATOS QUE OBLIGAN ──
  { type: 'stats', title: 'Datos que obligan a repensar el delivery', items: [
    { value: '90%', label: 'usa IA en el trabajo', source: 'DORA 2025' },
    { value: '~30%', label: 'confía poco o nada en el código generado por IA', source: 'DORA 2025' },
    { value: '71%', label: 'de organizaciones usa genAI regularmente', source: 'McKinsey 2025' },
    { value: '40%', label: 'de apps empresariales con agentes para fin de 2026', source: 'Gartner 2025' },
  ]},

  // ── 3: LA TRAMPA ──
  { type: 'diagram', id: 'causalLoop' },

  // ── DISCIPLINA COMO SISTEMA ──
  { type: 'content', title: 'Qué significa "disciplina" en ágil', bullets: [
    'Cumplimiento consistente de reglas del sistema\npara trabajo verificable, integrable y liberable',
    'No es burocracia — es diseño del sistema de trabajo',
    'DoD como contrato de calidad:\nsi no cumple DoD, no cuenta como Increment',
    'La cultura es su combustible',
  ], note: 'Disciplina ≠ burocracia' },

  // ── CADENCIAS ──
  { type: 'content', title: 'Cadencias: la disciplina que habilita coordinación', bullets: [
    'Scrum: Sprint como contenedor de eventos,\nregularidad y timeboxes',
    'SAFe: Planning Interval (PI) de 8–12 semanas\npara sincronizar múltiples equipos (ARTs)',
    'Pregunta al grupo: ¿cuál es su cadencia real?\n(no la declarada)',
  ], note: 'Cadencias' },

  // ── DoD 2026 ──
  { type: 'dodLevels' },

  // ── GATES vs GUARDRAILS ──
  { type: 'diagram', id: 'gatesGuardrails' },

  // ── SECTION: ESCALABILIDAD ──
  { type: 'section', title: 'Escalabilidad', subtitle: 'Coordinación, plataforma y gobernanza' },

  // ── NEXUS / LESS ──
  { type: 'content', title: 'Escalar no es multiplicar equipos', bullets: [
    'Nexus (Schwaber): múltiples equipos desde un Product Backlog\nhacia un Integrated Increment — minimizando dependencias',
    'LeSS (Larman/Vodde): "barely sufficient" —\ndes-escalar complejidad organizacional',
    'Si no integras, no escalaste; solo fragmentaste',
  ], note: 'Nexus y LeSS' },

  // ── SAFe ──
  { type: 'content', title: 'SAFe: coordinación + portafolio + funding', bullets: [
    'Planning Interval de 8–12 semanas:\ncadencia y sincronización para ARTs',
    'Lean Budget Guardrails: reemplazar project-funding\npor budgets a value streams con guardrails',
    'Trade-off: útil para coordinación masiva,\npero pesado para equipos que pueden ser autónomos',
  ], note: 'SAFe', color: 'accent' },

  // ── DA ──
  { type: 'content', title: 'Disciplined Agile: escoger WoW según contexto', bullets: [
    'Toolkit híbrido, people-first, goal-driven y escalable',
    'Scrum, XP, Kanban, Agile Modeling = ladrillos\nDA = mortero para encajarlos',
    'Útil para organizaciones con coexistencia de modelos\n(regulado + producto)',
    'No hay "talla única"',
  ], note: 'Disciplined Agile' },

  // ── PLATFORM ENGINEERING ──
  { type: 'platformEng' },

  // ── SECTION: IA AGÉNTICA ──
  { type: 'section', title: 'IA agéntica en delivery', subtitle: 'Del hacer al orquestar', emphasis: true },

  // ── QUÉ CAMBIA CON AGENTES ──
  { type: 'content', title: 'Del "hacer" al "orquestar"', bullets: [
    'Gartner: agentes específicos se integran masivamente hacia 2026\n(<5% en 2025 → 40% fin 2026)',
    'Microsoft: "human-agent teams" y el rol emergente\nde "agent boss"',
    'Líderes como gestores de ratio humano-agente',
    'Gartner advierte: >40% de proyectos agénticos\npodrían cancelarse antes de 2027',
  ], note: 'El cambio' },

  // ── MODELO HUMANO-AGENTE ──
  { type: 'diagram', id: 'humanAgent' },

  // ── LIDERAZGO ──
  { type: 'content', title: 'De "gestionar recursos" a "diseñar el sistema"', bullets: [
    'Disciplina: estabilizar prioridades — DORA 2024\ndestaca el daño de "pivotar siempre"',
    'Escala: invertir en plataforma + capacitación\n(Gartner: 80% workforce upskilling por GenAI hasta 2027)',
    'La IA no es proyecto — es cambio de operating model',
  ], note: 'Liderazgo 2026', color: 'accent' },

  // ── SECTION: EVIDENCIA ──
  { type: 'section', title: 'Evidencia y casos', subtitle: 'Números que importan' },

  // ── CASO ACCENTURE ──
  { type: 'bars', title: 'Copilot en Accenture (RCT + telemetría)', items: [
    { label: 'PRs por developer', value: 8.69, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
    { label: 'PR merge rate', value: 15, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
    { label: 'Builds exitosos', value: 84, max: 100, color: C.highlight, suffix: '%', prefix: '+' },
  ], source: 'GitHub + Accenture 2024 · Adopción >80%, 67% uso ≥5 días/semana', note: 'IA mejora throughput SI pipeline y revisión sostienen calidad' },

  // ── CASO AVANTIUS ──
  { type: 'case', title: 'Avantius', subtitle: 'Sector justicia · SAFe · 2020–2022', color: C.cyan, items: [
    { value: '−47%', label: 'bugs' },
    { value: '3/año', label: 'releases predecibles' },
    { value: '+30%', label: 'NPS' },
    { value: '+25%', label: 'engagement' },
  ], note: 'Disciplina = cadencia + calidad + feedback' },

  // ── CASO SEFAZ ──
  { type: 'case', title: 'SEFAZ-SP', subtitle: 'Tesorería São Paulo · SAFe · 2019–2021', color: C.accent, items: [
    { value: '+296%', label: 'features delivered' },
    { value: '−12%', label: 'incidentes' },
    { value: '+42%', label: 'delivery rate infra' },
  ], note: 'Escala exige sincronización y claridad de roles' },

  // ── BENCHMARKS ──
  { type: 'benchmarks' },

  // ── CONTRAPUNTO METR ──
  { type: 'bigstat', value: '+19%', label: 'más lento para expertos open-source\ncon herramientas IA (METR RCT 2025)', source: 'Los desarrolladores creían ser ~20% más rápidos.\nDisciplina incluye disciplina de medición.', warn: true },

  // ── MÉTRICAS ──
  { type: 'metricsTable' },

  // ── ROLES TABLA ──
  { type: 'rolesTable' },

  // ── MODOS COLABORACIÓN ──
  { type: 'collabModes' },

  // ── GOBERNANZA ──
  { type: 'governanceArch' },

  // ── COMPLIANCE ──
  { type: 'complianceMap' },

  // ── QUIZ 1: PREGUNTAS 1-5 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Escalado ágil', quiz: true },

  { type: 'quiz', idx: 0, q: 'Antes de introducir métodos ágiles de\nescalado, conviene evaluar el nivel de\nmadurez del equipo para minimizar\nriesgos de adopción.', explanation: 'La evidencia DORA muestra que sin fundamentos\n(testing/feedback) incluso mejoras locales pueden\nempeorar resultados sistémicos.' },

  { type: 'quiz', idx: 1, q: 'Nexus (Scrum.org) implementa Scrum\na escala: múltiples equipos, un solo\nbacklog, un Integrated Increment\npor Sprint con dependencias mínimas.', explanation: 'Ken Schwaber diseñó Nexus específicamente\npara mantener la esencia de Scrum al escalar,\nminimizando la complejidad adicional.' },

  { type: 'quiz', idx: 2, q: 'LeSS escala con mínimo proceso\nadicional — utiliza el menor proceso\nposible para que varios equipos\nde Scrum funcionen bien.', explanation: 'Craig Larman y Bas Vodde crearon LeSS\npara "des-escalar" la complejidad organizacional,\nno para añadir más burocracia.' },

  { type: 'quiz', idx: 3, q: 'SAFe es una base de conocimientos\ninteractiva que cubre implementación\nágil a escala empresarial, incluyendo\nfinanciación y arquitectura.', explanation: 'SAFe proporciona Planning Interval +\nBuilt-In Quality + Lean Budget Guardrails.\nEs el framework más completo pero también más pesado.' },

  { type: 'quiz', idx: 4, q: 'Disciplined Agile es un toolkit híbrido\nque toma prácticas de Scrum, XP,\nKanban y Agile Modeling como ladrillos\ny provee el mortero para encajarlos.', explanation: 'DA es people-first, enterprise-aware y escalable.\nPermite elegir Way of Working según contexto\nen vez de imponer un solo marco.' },

  // ── QUIZ 2: PREGUNTAS 6-10 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Liderazgo y gobernanza', quiz: true },

  { type: 'quiz', idx: 5, q: 'No existe "talla única" — al decidir qué\nmodelo ágil a gran escala funciona mejor,\nhay que analizar necesidades y\nlimitaciones del caso específico.', explanation: 'DA explícitamente guía decisiones por contexto.\nCada organización debe elegir basándose\nen sus restricciones reales, no en modas.' },

  { type: 'quiz', idx: 6, q: 'Las empresas que escalan agilidad\ncomienzan creando una taxonomía de\noportunidades dividida en: experiencia\ndel cliente, procesos y tecnología.', explanation: 'Este enfoque modular permite priorizar\ny secuenciar la transformación sin intentar\ncambiar todo simultáneamente.' },

  { type: 'quiz', idx: 7, q: 'Ir a por "victorias fáciles" protege\nequipos individuales pero no produce\nlos cambios organizativos necesarios\npara escalar docenas o cientos.', explanation: 'DORA enfatiza cambios sistémicos (plataforma,\nworkflows, estabilidad de prioridades) — no solo\nherramientas o wins locales.' },

  { type: 'quiz', idx: 8, q: 'El liderazgo debe inculcar valores ágiles\nmás allá de las áreas "ágiles",\nen toda la empresa.', explanation: 'La escala falla si el sistema arriba mantiene\nsilos. Si finanzas y RRHH operan en cascada,\nel equipo ágil choca contra la pared.' },

  { type: 'quiz', idx: 9, q: 'En empresas con muchos equipos ágiles,\nla financiación evoluciona: los equipos\nabandonan funciones y lanzan otras\nsin esperar al ciclo anual.', explanation: 'Lean Budget Guardrails busca eliminar\nproject-funding tradicional y dar agilidad\ncon control — como venture capital interno.' },

  // ── CHECKLIST 30/90/180 ──
  { type: 'checklist', title: '30 días — Control mínimo viable', items: [
    { step: 1, text: 'Definir DoD mínima con seguridad,\ntesting y trazabilidad' },
    { step: 2, text: 'Instrumentar DORA metrics básicas\n(mediana/p95) y tablero semanal' },
    { step: 3, text: 'Política de uso IA: tareas delegables\nvs no delegables + acciones prohibidas' },
    { step: 4, text: 'Piloto controlado (A/B) para IA\nen 1–2 flujos, midiendo estabilidad' },
  ]},

  { type: 'checklist', title: '90 días — Disciplina repetible', items: [
    { step: 1, text: 'Guardrails de presupuesto/portafolio\npara evitar project-funding fragmentado' },
    { step: 2, text: 'Paved road mínimo: plantillas CI,\nescaneo, observabilidad — medir adopción' },
    { step: 3, text: 'Evaluación de outputs IA como parte\nde CI/DoD (calidad, seguridad, sesgo)' },
    { step: 4, text: 'Entrenar roles clave en "agent boss"\ny gestión de riesgo/telemetría' },
  ]},

  { type: 'checklist', title: '180 días — Escala sostenible', items: [
    { step: 1, text: 'Operating model humano-agente:\npermisos por rol, auditoría, runbooks' },
    { step: 2, text: 'Plataforma interna como "producto"\ncon roadmap y métricas propias' },
    { step: 3, text: 'Preparación normativa: AI Act,\nISO 42001/23894 como sistema de gestión' },
  ]},

  // ── BIBLIOGRAFÍA ──
  { type: 'bibfull', entries: [
    'DORA / Google Cloud. "Accelerate State of DevOps Report 2024". 2024.',
    'DORA. "State of DevOps Report 2025". Google Cloud, 2025.',
    'McKinsey. "The state of AI in early 2024". Global Survey, 2024.',
    'McKinsey. "How organizations are rewiring to capture value". 2025.',
    'Gartner. "40% of Enterprise Apps Will Have AI Agents by 2026". 2025.',
    'Gartner. "Platform Engineering". Research Note, 2024.',
    'Microsoft. "Work Trend Index 2025: The Frontier Firm". 2025.',
    'Schwaber & Sutherland. "La Guía de Scrum 2020". Scrum.org.',
    'Ken Schwaber. "Nexus Guide". Scrum.org, 2021.',
    'Larman & Vodde. "Large-Scale Scrum: More with LeSS". 2016.',
    'Scaled Agile Inc. "SAFe 6.0". scaledagileframework.com.',
    'PMI. "Disciplined Agile". pmi.org/disciplined-agile.',
    'NIST. "AI Risk Management Framework 1.0". 2023.',
    'NIST. "AI 600-1: GenAI Profile". 2024.',
    'ISO/IEC 42001:2023. "AI Management System".',
    'OWASP. "Top 10 for LLM Applications". 2024.',
    'GitHub + Accenture. "Copilot impact on code quality". 2024.',
    'METR. "AI Assistance on Open-Source Developers". RCT, 2025.',
    'EU. "AI Act (Regulation 2024/1689)". 2024.',
    'Tracasa / Avantius. "SAFe Case Study". scaledagileframework.com.',
    'SEFAZ-SP. "SAFe Case Study". scaledagileframework.com.',
  ]},

  // ── RECURSOS ──
  { type: 'resources' },

  // ── FINAL ──
  { type: 'end' },
]

/* ═══════════════════════════════════════════
   SVG DIAGRAMS
   ═══════════════════════════════════════════ */
function CausalLoopDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>La trampa: más velocidad local, peor rendimiento sistémico</p>
      <svg viewBox="0 0 1000 420" width={1000} fill="none">
        {/* Top row */}
        <g className="anim-pop d1">
          <rect x="30" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.amber} strokeWidth="2" />
          <text x="160" y="83" textAnchor="middle" fill={C.amber} fontSize="22" fontWeight="600" fontFamily="Inter">IA aumenta volumen</text>
        </g>
        <g className="anim-pop d2">
          <rect x="370" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="500" y="83" textAnchor="middle" fill={C.accent} fontSize="22" fontWeight="600" fontFamily="Inter">Más PRs / commits</text>
        </g>
        <g className="anim-fade d2"><line x1="290" y1="75" x2="360" y2="75" stroke={C.dim} strokeWidth="2" markerEnd="url(#cl1)" /></g>

        {/* Decision */}
        <g className="anim-pop d3">
          <rect x="690" y="40" width="260" height="70" rx="14" fill={C.surface} stroke={C.white} strokeWidth="2" />
          <text x="820" y="76" textAnchor="middle" fill={C.white} fontSize="20" fontWeight="600" fontFamily="Inter">¿Safety nets?</text>
          <text x="820" y="96" textAnchor="middle" fill={C.dim} fontSize="16" fontFamily="Inter">testing + feedback</text>
        </g>
        <g className="anim-fade d3"><line x1="630" y1="75" x2="680" y2="75" stroke={C.dim} strokeWidth="2" markerEnd="url(#cl1)" /></g>

        {/* NO branch */}
        <g className="anim-pop d4">
          <rect x="550" y="200" width="220" height="60" rx="12" fill="rgba(239,68,68,0.08)" stroke={C.red} strokeWidth="1.5" />
          <text x="660" y="237" textAnchor="middle" fill={C.red} fontSize="20" fontWeight="600" fontFamily="Inter">Más fallas y rework</text>
        </g>
        <g className="anim-pop d5">
          <rect x="550" y="300" width="220" height="60" rx="12" fill="rgba(239,68,68,0.08)" stroke={C.red} strokeWidth="1.5" />
          <text x="660" y="337" textAnchor="middle" fill={C.red} fontSize="20" fontWeight="600" fontFamily="Inter">Menos estabilidad</text>
        </g>
        <g className="anim-fade d4">
          <text x="780" y="140" fill={C.red} fontSize="16" fontWeight="600" fontFamily="Inter">No</text>
          <line x1="780" y1="110" x2="700" y2="195" stroke={C.red} strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#cl3)" />
          <line x1="660" y1="260" x2="660" y2="295" stroke={C.red} strokeWidth="1.5" markerEnd="url(#cl3)" />
        </g>

        {/* YES branch */}
        <g className="anim-pop d4">
          <rect x="180" y="200" width="280" height="60" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="320" y="237" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Small batches + testing</text>
        </g>
        <g className="anim-pop d5">
          <rect x="100" y="320" width="200" height="55" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="200" y="355" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Mejor throughput</text>
        </g>
        <g className="anim-pop d5">
          <rect x="340" y="320" width="200" height="55" rx="12" fill="rgba(34,197,94,0.08)" stroke={C.highlight} strokeWidth="1.5" />
          <text x="440" y="355" textAnchor="middle" fill={C.highlight} fontSize="20" fontWeight="600" fontFamily="Inter">Estabilidad sostenida</text>
        </g>
        <g className="anim-fade d4">
          <text x="730" y="140" fill={C.highlight} fontSize="16" fontWeight="600" fontFamily="Inter">Sí</text>
          <line x1="730" y1="110" x2="420" y2="195" stroke={C.highlight} strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#cl2)" />
          <line x1="280" y1="260" x2="220" y2="315" stroke={C.highlight} strokeWidth="1" markerEnd="url(#cl2)" />
          <line x1="380" y1="260" x2="420" y2="315" stroke={C.highlight} strokeWidth="1" markerEnd="url(#cl2)" />
        </g>

        {/* DORA source */}
        <g className="anim-fade d6">
          <text x="500" y="410" textAnchor="middle" fill={C.dim} fontSize="16" fontFamily="Inter">DORA 2024: −1.5% throughput, −7.2% estabilidad por +25% adopción IA sin safety nets</text>
        </g>

        <defs>
          <marker id="cl1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.dim} /></marker>
          <marker id="cl2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.highlight} /></marker>
          <marker id="cl3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.red} /></marker>
        </defs>
      </svg>
    </div>
  )
}

function GatesGuardrailsDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Gates vs Guardrails</p>
      <p style={{ fontSize: 20, color: C.dim }}>Gates rígidos crean colas — guardrails + automatización sostienen flow</p>
      <svg viewBox="0 0 900 280" width={900} fill="none">
        <g className="anim-pop d1">
          <rect x="30" y="50" width="180" height="65" rx="12" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="120" y="89" textAnchor="middle" fill={C.accent} fontSize="20" fontWeight="600" fontFamily="Inter">Work item</text>
        </g>
        <g className="anim-pop d2">
          <rect x="270" y="50" width="240" height="65" rx="12" fill={C.surface} stroke={C.cyan} strokeWidth="2" />
          <text x="390" y="82" textAnchor="middle" fill={C.cyan} fontSize="18" fontWeight="600" fontFamily="Inter">CI: pruebas + seguridad</text>
          <text x="390" y="102" textAnchor="middle" fill={C.dim} fontSize="14" fontFamily="Inter">+ calidad automática</text>
        </g>
        <g className="anim-fade d2"><line x1="210" y1="82" x2="265" y2="82" stroke={C.dim} strokeWidth="2" markerEnd="url(#gg1)" /></g>

        <g className="anim-pop d3">
          <rect x="570" y="50" width="160" height="65" rx="12" fill={C.surface} stroke={C.white} strokeWidth="2" />
          <text x="650" y="82" textAnchor="middle" fill={C.white} fontSize="18" fontWeight="600" fontFamily="Inter">Riesgo/Impacto</text>
          <text x="650" y="100" textAnchor="middle" fill={C.dim} fontSize="13" fontFamily="Inter">¿bajo, medio, alto?</text>
        </g>
        <g className="anim-fade d3"><line x1="510" y1="82" x2="565" y2="82" stroke={C.dim} strokeWidth="2" markerEnd="url(#gg1)" /></g>

        {/* Three outcomes */}
        {[
          { label: 'Autopromote', y: 160, color: C.highlight },
          { label: 'Auto + revisión humana', y: 200, color: C.amber },
          { label: 'Change Advisory + evidencia', y: 240, color: C.red },
        ].map((o, i) => (
          <g key={i} className={`anim-pop d${i + 4}`}>
            <rect x="570" y={o.y} width="290" height="32" rx="8" fill={C.surface} stroke={o.color} strokeWidth="1.5" />
            <text x="715" y={o.y + 22} textAnchor="middle" fill={o.color} fontSize="16" fontWeight="500" fontFamily="Inter">{o.label}</text>
            <text x="555" y={o.y + 22} textAnchor="end" fill={o.color} fontSize="13" fontWeight="600" fontFamily="Inter">{['Bajo', 'Medio', 'Alto'][i]}</text>
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
    { label: 'PO', sub: 'Intención + policy', x: 145, color: C.accent },
    { label: 'Agente', sub: 'Análisis', x: 280, color: C.amber },
    { label: 'Devs', sub: 'Diseño + revisión', x: 415, color: C.highlight },
    { label: 'Agente', sub: 'Código/tests', x: 550, color: C.amber },
    { label: 'CI/CD', sub: 'Controles', x: 685, color: C.cyan },
    { label: 'Prod', sub: 'Release', x: 820, color: C.purple },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Modelo humano-agente en delivery</p>
      <svg viewBox="0 0 960 240" width={960} fill="none">
        {phases.map((p, i) => (
          <g key={i} className={`anim-pop d${i + 1}`}>
            <rect x={p.x} y="60" width="120" height="60" rx="12" fill={C.surface} stroke={p.color} strokeWidth="1.5" />
            <text x={p.x + 60} y="87" textAnchor="middle" fill={p.color} fontSize="17" fontWeight="600" fontFamily="Inter">{p.label}</text>
            <text x={p.x + 60} y="107" textAnchor="middle" fill={C.dim} fontSize="13" fontFamily="Inter">{p.sub}</text>
            {i < 6 && <line x1={p.x + 120} y1="90" x2={p.x + 140} y2="90" stroke="white" strokeWidth="1" opacity="0.2" markerEnd="url(#ha1)" />}
          </g>
        ))}
        {/* Observability + Incident agent */}
        <g className="anim-pop d7">
          <rect x="650" y="160" width="160" height="45" rx="10" fill={C.surface} stroke={C.amber} strokeWidth="1" />
          <text x="730" y="189" textAnchor="middle" fill={C.amber} fontSize="14" fontWeight="500" fontFamily="Inter">Agente: incidentes</text>
          <line x1="880" y1="120" x2="810" y2="160" stroke={C.amber} strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
        </g>
        {/* Feedback loop */}
        <g className="anim-fade d7">
          <path d="M880 55 C910 20, 60 20, 70 55" fill="none" stroke={C.purple} strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#ha2)" />
          <text x="470" y="25" textAnchor="middle" fill={C.purple} fontSize="14" fontFamily="Inter">feedback</text>
        </g>
        <g className="anim-fade d7">
          <text x="480" y="230" textAnchor="middle" fill={C.red} fontSize="15" fontFamily="Inter">⚠ OWASP: "excessive agency" — agente ejecuta sin control = vulnerabilidad</text>
        </g>
        <defs>
          <marker id="ha1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="white" opacity="0.3" /></marker>
          <marker id="ha2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill={C.purple} /></marker>
        </defs>
      </svg>
    </div>
  )
}

const DIAGRAMS = { causalLoop: CausalLoopDiagram, gatesGuardrails: GatesGuardrailsDiagram, humanAgent: HumanAgentDiagram }

/* ═══════════════════════════════════════════
   SLIDE RENDERERS
   ═══════════════════════════════════════════ */
const MARGIN = 120
const inner = { paddingLeft: MARGIN, paddingRight: MARGIN }

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }
const popIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const slideTransition = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }, exit: { opacity: 0, y: -20, transition: { duration: 0.15 } } }

function SlideRenderer({ data, quizState, onQuizAnswer }) {
  switch (data.type) {

    case 'hero': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 36 }}>
          <motion.div variants={fadeUp}><Logos height={128} /></motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 500 }}>Gestión Ágil de Proyectos</motion.p>
          <motion.h1 variants={fadeUp} style={{ fontSize: T.hero, fontWeight: 800, lineHeight: 1.1, color: C.white, maxWidth: 1000 }}>
            <span style={{ color: C.accent }}>Disciplina</span> y <span style={{ color: C.highlight }}>Escalabilidad</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 28, color: 'rgba(255,255,255,0.6)', fontWeight: 400, maxWidth: 800 }}>en la era de la IA agéntica</motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)', fontWeight: 400, maxWidth: 700 }}>La IA no arregla equipos — amplifica lo que ya existe</motion.p>
          <motion.a variants={fadeUp} href="https://www.linkedin.com/in/ulisesgonzalez/" target="_blank" rel="noopener noreferrer" style={{ fontSize: T.caption, color: C.dim, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', transition: 'color 200ms' }} onMouseEnter={e => e.currentTarget.style.color = C.white} onMouseLeave={e => e.currentTarget.style.color = C.dim}>Profesor: Ulises González</motion.a>
        </div>
      </motion.div>
    )

    case 'agenda': {
      const modules = [
        { num: '01', title: 'Apertura', desc: 'Por qué disciplina y escala son no negociables con IA', color: C.dim },
        { num: '02', title: 'Disciplina como sistema', desc: 'Cadencias, DoD, gates vs guardrails, telemetría', color: C.accent },
        { num: '03', title: 'Escalabilidad', desc: 'Nexus, LeSS, SAFe, DA y platform engineering', color: C.highlight },
        { num: '04', title: 'IA agéntica en delivery', desc: 'Humano-agente, control de agencia, costos y calidad', color: C.amber },
        { num: '05', title: 'Evidencia y casos', desc: 'Benchmarks y expectativas realistas', color: C.cyan },
        { num: '06', title: 'Cierre operativo', desc: 'Métricas, gobernanza y checklist 30/90/180 días', color: C.purple },
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

    case 'dodLevels': {
      const levels = [
        { risk: 'Bajo', color: C.highlight, items: ['Tests unitarios pasan', 'Code review aprobado', 'Sin warnings de seguridad', 'Documentación actualizada'] },
        { risk: 'Medio', color: C.amber, items: ['Todo de "Bajo" +', 'Tests de integración', 'Evaluación de output IA', 'Trazabilidad de prompts/contexto', 'Revisión de datos sensibles'] },
        { risk: 'Alto', color: C.red, items: ['Todo de "Medio" +', 'Prueba de seguridad dedicada', 'Validación de sesgo/fairness', 'Aprobación de compliance', 'Auditoría de agencia (OWASP)'] },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Definition of Done 2026</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>De "funciona" a "confiable + seguro + evaluado"</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 8 }}>
            {levels.map((l, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 24px', borderTop: `4px solid ${l.color}` }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: l.color, marginBottom: 16 }}>Riesgo {l.risk}</p>
                {l.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, opacity: 0.6, flexShrink: 0 }} />
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{item}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.dim }}>Si no cumple DoD, no cuenta como Increment — Scrum Guide 2020</motion.p>
        </motion.div>
      )
    }

    case 'platformEng': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.cyan, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Condición de escalabilidad</motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Platform Engineering</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 8 }}>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: C.cyan, fontFamily: "'JetBrains Mono', monospace" }}>80%</span>
              <span style={{ fontSize: 18, color: C.dim }}>de grandes orgs<br/>para 2026</span>
            </div>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>tendrán equipos de platform engineering (45% en 2022)</p>
            <p style={{ fontSize: 16, color: C.dim, marginTop: 12 }}>Gartner 2024</p>
          </motion.div>
          <motion.div variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 64, fontWeight: 800, color: C.highlight, fontFamily: "'JetBrains Mono', monospace" }}>90%</span>
              <span style={{ fontSize: 18, color: C.dim }}>ya adoptó al menos<br/>una plataforma</span>
            </div>
            <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>Correlación entre plataforma interna de calidad y capacidad de capturar valor de IA</p>
            <p style={{ fontSize: 16, color: C.dim, marginTop: 12 }}>DORA 2025</p>
          </motion.div>
        </div>
        <motion.p variants={fadeUp} style={{ fontSize: 22, color: C.dim, fontStyle: 'italic' }}>Sin plataforma, la escala se paga con coordinación y burnout</motion.p>
      </motion.div>
    )

    case 'benchmarks': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Benchmarks de escala (reportados)</motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Rangos de referencia, no promesas</motion.h2>
        <motion.div variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { org: 'Standard Bank', items: [{ label: 'Time-to-market', before: '700 días', after: '30 días' }, { label: 'Productividad', before: 'Baseline', after: '+50%' }, { label: 'Costos', before: 'Baseline', after: '−77%' }, { label: 'Predictability', before: '—', after: '68%' }], color: C.accent },
            { org: 'Fannie Mae', items: [{ label: 'Releasing', before: '1-2/año', after: 'Mensual' }, { label: 'Integración', before: 'Trimestral', after: 'Cada 2 semanas' }, { label: 'Velocidad', before: '10 story pts', after: '>30 story pts' }], color: C.highlight },
          ].map((b, bi) => (
            <motion.div key={bi} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 28px', borderTop: `3px solid ${b.color}` }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: b.color, marginBottom: 16 }}>{b.org}</p>
              {b.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < b.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontSize: 17, color: C.dim }}>{item.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>{item.before}</span>
                    <span style={{ fontSize: 14, color: C.dim }}>→</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: b.color, fontFamily: "'JetBrains Mono', monospace" }}>{item.after}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.red }}>⚠ Casos reportados por SAFe — método estadístico no especificado. Usar como orientación.</motion.p>
      </motion.div>
    )

    case 'metricsTable': {
      const metrics = [
        { name: 'Deployment frequency', what: 'Cadencia real de entrega', alert: 'Cae 2 ciclos seguidos o batch size crece', color: C.highlight },
        { name: 'Change lead time', what: 'Velocidad del flujo (commit→deploy)', alert: 'p95 sube = cola/dependencias', color: C.highlight },
        { name: 'Change fail rate', what: '% deploys con incidente', alert: '>15% sostenido', color: C.amber },
        { name: 'Recovery time', what: 'Tiempo falla→servicio ok', alert: 'MTTR sube o sin runbooks', color: C.amber },
        { name: 'DoD compliance', what: '% items que cumplen DoD', alert: '>5% "Done-but-not-Done"', color: C.red },
        { name: 'GenAI trust gap', what: '% baja confianza + uso alto', alert: 'Confianza baja + adopción sube', color: C.red },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.cyan, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Tablero mínimo viable</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Métricas: disciplina + escala + IA</motion.h2>
          <motion.div variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', gap: '0', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {['Métrica', 'Qué mide', 'Alerta si...'].map((h, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.04)', fontSize: 16, fontWeight: 600, color: C.dim, borderBottom: `1px solid ${C.border}` }}>{h}</div>
            ))}
            {metrics.map((m, i) => (
              <div key={`r${i}`} style={{ display: 'contents' }}>
                <div style={{ padding: '12px 16px', fontSize: 17, fontWeight: 600, color: m.color, borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>{m.name}</div>
                <div style={{ padding: '12px 16px', fontSize: 17, color: 'rgba(255,255,255,0.7)', borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>{m.what}</div>
                <div style={{ padding: '12px 16px', fontSize: 17, color: C.red, fontWeight: 500, borderBottom: i < metrics.length - 1 ? `1px solid ${C.border}` : 'none' }}>⚠ {m.alert}</div>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: C.dim }}>DORA 2024/2025 · Estas métricas son para gestión del sistema, no para evaluar individuos</motion.p>
        </motion.div>
      )
    }

    case 'rolesTable': {
      const roles = [
        { role: 'Product Owner', classic: 'Ordenar backlog, negociar alcance, asegurar DoD', agentic: 'Policy + intent owner: políticas de uso IA, taxonomía de riesgos, criterios de evaluación', risk: 'Agent washing; backlog inflado por IA', color: C.accent },
        { role: 'Scrum Master', classic: 'Facilitar eventos, eliminar impedimentos, mejorar flujo', agentic: 'Systems coach: telemetría, cadencias multi-equipo, entrenamiento "agent boss mindset"', risk: 'Ceremonias sin control; métricas manipulables', color: C.highlight },
        { role: 'Developers', classic: 'Construir Increment, cumplir DoD, calidad técnica', agentic: 'Directores de agentes: revisión, eval harness, seguridad de prompts', risk: 'Sobre-confianza; caída de estabilidad', color: C.cyan },
        { role: 'Líder / Gerente', classic: 'Priorización, staffing, delivery', agentic: 'Arquitecto del sistema: plataforma, automatización, control de costos (tokens)', risk: 'Escala imposible: coord cost explota', color: C.amber },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Roles: clásico vs agéntico</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {roles.map((r, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 250px', gap: 16, alignItems: 'center', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', borderLeft: `4px solid ${r.color}` }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: r.color }}>{r.role}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{r.classic}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{r.agentic}</p>
                <p style={{ fontSize: 14, color: C.red, lineHeight: 1.4 }}>⚠ {r.risk}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'collabModes': {
      const modes = [
        { mode: 'Asistido', agent: 'Sugiere, resume', human: 'Decide y ejecuta', risk: 'Bajo', color: C.highlight },
        { mode: 'Co-pilot', agent: 'Propone plan', human: 'Decide y ajusta', risk: 'Bajo-Medio', color: C.cyan },
        { mode: 'Delegado', agent: 'Ejecuta con evidencia', human: 'Aprueba resultado', risk: 'Medio', color: C.amber },
        { mode: 'Autónomo acotado', agent: 'Actúa dentro de permisos', human: 'Define límites, audita', risk: 'Alto', color: C.red },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>4 modos de colaboración humano-agente</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim }}>El modo se selecciona por nivel de riesgo — no por preferencia</motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {modes.map((m, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 28px', borderLeft: `4px solid ${m.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.mode}</p>
                  <span style={{ fontSize: 14, color: m.color, fontWeight: 600, background: `${m.color}15`, padding: '4px 12px', borderRadius: 8 }}>Riesgo: {m.risk}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <p style={{ fontSize: 13, color: C.amber, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Agente</p>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)' }}>{m.agent}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: C.highlight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Humano</p>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)' }}>{m.human}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.red }}>Modo 4 requiere control explícito de agencia (OWASP) + auditoría + políticas (NIST AI RMF)</motion.p>
        </motion.div>
      )
    }

    case 'governanceArch': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Gobernanza: práctica, no ceremonial</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { title: 'Núcleo central (ligero)', desc: 'AI governance / risk\nNIST AI RMF + GenAI Profile\nISO 42001 + 27001', color: C.accent },
            { title: 'Federado a productos', desc: 'Evaluación y DoD por dominio\nOwnership en equipos producto\nEvita cuello de botella central', color: C.highlight },
            { title: 'Plataforma', desc: 'Paved road, CI/CD guardrails\nObservabilidad integrada\nPlatform engineering (Gartner/DORA)', color: C.cyan },
            { title: 'Finanzas', desc: 'Presupuestos a value streams\nGuardrails (SAFe Lean Budgets)\nPivot con evidencia, no por ciclo anual', color: C.amber },
          ].map((g, i) => (
            <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px 28px', borderTop: `3px solid ${g.color}` }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: g.color, marginBottom: 12 }}>{g.title}</p>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )

    case 'complianceMap': {
      const items = [
        { standard: 'EU AI Act (2024/1689)', scope: 'Obligaciones progresivas 2025-2027', date: 'Ago 2026', color: C.red },
        { standard: 'NIST AI RMF 1.0', scope: 'Marco voluntario gestión riesgo IA', date: '2023', color: C.cyan },
        { standard: 'NIST AI 600-1', scope: 'Perfil específico para GenAI', date: '2024', color: C.cyan },
        { standard: 'ISO/IEC 42001', scope: 'Sistema de gestión de IA', date: '2023', color: C.purple },
        { standard: 'ISO/IEC 23894', scope: 'Guía gestión de riesgo IA', date: '2023', color: C.purple },
        { standard: 'ISO/IEC 27001', scope: 'Seguridad de la información', date: '2022', color: C.amber },
        { standard: 'ISO/IEC 5055', scope: 'Calidad estructural de código', date: '2021', color: C.amber },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Gobernanza como habilitador</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Mapa de compliance: NIST + ISO + UE</motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '280px 1fr 100px', gap: 16, alignItems: 'center', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', borderLeft: `3px solid ${item.color}` }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: item.color }}>{item.standard}</p>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)' }}>{item.scope}</p>
                <p style={{ fontSize: 16, color: C.dim, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>{item.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'resources': {
      const resources = [
        { category: 'Frameworks', color: C.accent, items: [
          { title: 'Scrum Guide 2020 (es-419)', author: 'scrumguides.org', note: 'Documento oficial — 13 páginas esenciales' },
          { title: 'Nexus Guide', author: 'scrum.org/nexus', note: 'Escalar Scrum con mínima complejidad' },
          { title: 'SAFe 6.0', author: 'scaledagileframework.com', note: 'Framework completo para enterprise' },
          { title: 'Disciplined Agile', author: 'pmi.org/disciplined-agile', note: 'Toolkit híbrido del PMI' },
        ]},
        { category: 'IA y Riesgo', color: C.cyan, items: [
          { title: 'NIST AI RMF 1.0', author: 'nist.gov', note: 'Marco de gestión de riesgo IA' },
          { title: 'OWASP Top 10 LLM', author: 'owasp.org', note: 'Riesgos de seguridad en apps LLM' },
          { title: 'DORA Reports', author: 'dora.dev', note: 'Métricas y research de delivery' },
          { title: 'EU AI Act', author: 'eur-lex.europa.eu', note: 'Regulación 2024/1689 — texto legal' },
        ]},
        { category: 'Libros', color: C.highlight, items: [
          { title: 'Team Topologies', author: 'Skelton & Pais', note: 'Estructura de equipos para flujo rápido' },
          { title: 'Accelerate', author: 'Forsgren, Humble & Kim', note: 'La ciencia de DevOps — base de DORA' },
          { title: 'Co-Intelligence', author: 'Ethan Mollick', note: 'IA práctica para líderes — 2024' },
          { title: 'The Phoenix Project', author: 'Kim, Behr & Spafford', note: 'Novela de gestión que explica DevOps' },
        ]},
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Recursos recomendados</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 19, color: C.dim }}>Para profundizar — seleccionados para gestión de proyectos a escala</motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 4 }}>
            {resources.map((r, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px 22px', borderTop: `3px solid ${r.color}` }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: r.color, marginBottom: 14 }}>{r.category}</p>
                {r.items.map((item, j) => (
                  <div key={j} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${r.color}30` }}>
                    <p style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.35 }}>{item.title}</p>
                    <p style={{ fontSize: 14, color: C.dim, lineHeight: 1.3 }}>{item.author}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.3, marginTop: 2 }}>{item.note}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'end': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 48 }}>
        <motion.div variants={fadeUp}><Logos height={128} /></motion.div>
        <motion.p variants={fadeUp} style={{ fontSize: T.subtitle, color: C.dim, fontWeight: 500 }}>Gestión Ágil de Proyectos</motion.p>
        <motion.p variants={popIn} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>¡Gracias!</motion.p>
        <motion.a variants={fadeUp} href="https://www.linkedin.com/in/ulisesgonzalez/" target="_blank" rel="noopener noreferrer" style={{ fontSize: T.caption, color: C.dim, fontWeight: 400, textDecoration: 'none', transition: 'color 200ms' }} onMouseEnter={e => e.currentTarget.style.color = C.white} onMouseLeave={e => e.currentTarget.style.color = C.dim}>Profesor: Ulises González</motion.a>
        <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>© 2026 Ulises González · Preparado con IA generativa como herramienta de investigación y diseño</motion.p>
      </motion.div>
    )

    case 'section': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          {data.emphasis && <motion.div variants={fadeUp} style={{ width: 60, height: 4, background: C.accent, borderRadius: 2 }} />}
          {data.quiz && <motion.div variants={fadeUp} style={{ width: 60, height: 4, background: C.highlight, borderRadius: 2 }} />}
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white, lineHeight: 1.15 }}>{data.title}</motion.h2>
          {data.subtitle && <motion.p variants={fadeUp} style={{ fontSize: T.subtitle, color: C.dim, fontWeight: 400 }}>{data.subtitle}</motion.p>}
        </div>
      </motion.div>
    )

    case 'content': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        {data.note && <motion.p variants={fadeUp} style={{ fontSize: 20, color: data.color === 'highlight' ? C.highlight : data.color === 'accent' ? C.accent : C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</motion.p>}
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white, lineHeight: 1.15, maxWidth: 900 }}>{data.title}</motion.h2>
        <motion.ul variants={stagger} style={{ listStyle: 'none', padding: 0, maxWidth: 900 }}>
          {data.bullets.map((b, i) => (
            <motion.li key={i} variants={fadeUp} style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, paddingLeft: 36, position: 'relative', marginBottom: 12, whiteSpace: 'pre-line' }}>
              <span style={{ position: 'absolute', left: 0, top: 6, width: 10, height: 10, borderRadius: '50%', background: data.color === 'highlight' ? C.highlight : C.accent, opacity: 0.6 }} />
              {b}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    )

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
        <motion.p variants={popIn} style={{ fontSize: 120, fontWeight: 800, color: data.warn ? C.red : C.accent, lineHeight: 1 }}>{data.value}</motion.p>
        <motion.p variants={fadeUp} style={{ fontSize: T.text, color: 'rgba(255,255,255,0.8)', maxWidth: 700, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{data.label}</motion.p>
        {data.source && <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, whiteSpace: 'pre-line' }}>{data.source}</motion.p>}
      </motion.div>
    )

    case 'bars': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        {data.note && <motion.p variants={fadeUp} style={{ fontSize: 20, color: data.warn ? C.red : C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</motion.p>}
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
          <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.highlight, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Pregunta {data.idx + 1} de 10 — ¿Verdadero o falso?</motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: T.text, color: C.white, lineHeight: 1.6, maxWidth: 900, whiteSpace: 'pre-line', fontWeight: 500 }}>{data.q}</motion.p>
          {state === null ? (
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 24, marginTop: 20 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => onQuizAnswer(data.idx, true)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.highlight}`, background: 'rgba(34,197,94,0.08)', color: C.highlight, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Verdadero
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => onQuizAnswer(data.idx, false)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.red}`, background: 'rgba(239,68,68,0.08)', color: C.red, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Falso
              </motion.button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: 20 }}>
              <p style={{ fontSize: T.bullet, fontWeight: 700, color: state ? C.highlight : C.red, marginBottom: 16 }}>
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

    case 'bibfull': {
      const half = Math.ceil(data.entries.length / 2)
      const col1 = data.entries.slice(0, half)
      const col2 = data.entries.slice(half)
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <motion.h3 variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Bibliografía</motion.h3>
          <motion.div variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 48px' }}>
            {[col1, col2].map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.map((e, i) => (
                  <p key={i} style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.45, borderLeft: `2px solid ${C.border}`, paddingLeft: 12 }}>{e}</p>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )
    }

    default: return null
  }
}

/* ─── Animated Bar ─── */
function BarRow({ item, delay }) {
  const [w, setW] = useState(0)
  const max = item.max || 100
  useEffect(() => { const t = setTimeout(() => setW(Math.min(Math.abs(item.value) / max * 100, 100)), 200 + delay * 150); return () => clearInterval(t) }, [item.value, max, delay])
  return (
    <div className={`anim-fade d${delay + 2}`} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', width: 320, textAlign: 'right', flexShrink: 0 }}>{item.label}</span>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 12, height: 44, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 12, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)', width: `${w}%`, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{item.prefix || '+'}{item.value}{item.suffix || '%'}</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TAKEAWAY OVERLAY
   ═══════════════════════════════════════════ */
function TakeawayOverlay({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', bottom: 60, left: MARGIN, right: MARGIN, zIndex: 20, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ background: 'rgba(79,140,255,0.12)', border: `1px solid rgba(79,140,255,0.3)`, borderRadius: 16, padding: '20px 40px', maxWidth: 1200, backdropFilter: 'blur(16px)' }}>
            <p style={{ fontSize: 22, color: C.accent, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 2 }}>Takeaway</p>
            <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
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
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go, goTo])

  return (
    <div style={{ width: '100vw', height: '100vh', background: C.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center center', position: 'relative', flexShrink: 0 }}>
        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.04)', zIndex: 10 }}>
          <div style={{ height: '100%', background: C.accent, transition: 'width 400ms ease-out', width: `${((current + 1) / TOTAL) * 100}%` }} />
        </div>

        {/* Header */}
        <div style={{ position: 'absolute', top: 20, left: MARGIN, right: MARGIN, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 20, color: C.dim, fontWeight: 500 }}>
            {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
          <LiveClock />
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div key={current} {...slideTransition} style={{ width: 1920, height: 1080 }}>
            <SlideRenderer data={slides[current]} quizState={quizState} onQuizAnswer={(idx, val) => setQuizState(prev => { const n = [...prev]; n[idx] = val; return n })} />
          </motion.div>
        </AnimatePresence>

        {/* Takeaway */}
        <TakeawayOverlay text={TAKEAWAYS[current]} visible={showTakeaway} />

        {/* Nav arrows */}
        {current > 0 && (
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.95 }} onClick={() => go(-1)} style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, zIndex: 10 }}>‹</motion.button>
        )}
        {current < TOTAL - 1 && (
          <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }} whileTap={{ scale: 0.95 }} onClick={() => go(1)} style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, zIndex: 10 }}>›</motion.button>
        )}

        {/* Dot nav */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5, zIndex: 10 }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} title={`Slide ${i + 1}`}
              style={{ width: i === current ? 24 : 7, height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 300ms', background: i === current ? C.accent : s.type === 'quiz' ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.12)' }} />
          ))}
        </div>

        {/* N key hint */}
        <div style={{ position: 'absolute', bottom: 20, right: MARGIN, zIndex: 10, fontSize: 16, color: 'rgba(255,255,255,0.15)' }}>
          <kbd style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', fontSize: 14 }}>N</kbd> takeaway
        </div>
      </div>
    </div>
  )
}
