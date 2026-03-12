import { useState, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════════
   DESIGN SYSTEM — 1920×1080 Keynote
   ═══════════════════════════════════════════ */
const C = { bg: '#0B0F14', white: '#FFFFFF', accent: '#4F8CFF', highlight: '#22C55E', dim: '#64748B', surface: '#141A23', border: '#1E293B', red: '#EF4444' }
const T = { hero: 88, title: 72, subtitle: 44, text: 34, bullet: 32, caption: 26 }

/* ═══════════════════════════════════════════
   LOGOS — IESA + UniKemia
   ═══════════════════════════════════════════ */
function Logos({ height = 128 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <img
        src="./logo-iesa.png"
        alt="IESA"
        style={{ height, objectFit: 'contain' }}
        draggable={false}
      />
      <img
        src="./logo-unikemia.webp"
        alt="UniKemia"
        style={{ height: height * 0.55, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        draggable={false}
      />
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
  /* 0  hero */           'La competencia en 2026 no es entre marcos (Scrum vs Kanban) sino entre sistemas de entrega capaces de absorber incertidumbre y rediseñar trabajo cuando la IA acelera la ejecución.',
  /* 1  stats */          'Adopción masiva no es valor: el 17% que sí logra ≥5% EBIT lo hace porque rediseñó workflows, no porque compró herramientas. El resto está en "AI theater".',
  /* 2  section fund */   'Estos principios no son "básicos" en el sentido de triviales — son prerrequisitos estructurales. Sin ellos, la IA no se adopta de forma efectiva, solo de forma caótica.',
  /* 3  overview */       'Los fundamentos son condiciones necesarias pero no suficientes. Una organización sin ellos no puede adoptar IA agéntica — solo puede adoptar herramientas de forma desorganizada.',
  /* 4  ciclo emp */      'Los equipos que mejoran calidad de documentación y código (+7.5%/+3.4% en DORA) son los que inspeccionan. Los que pierden estabilidad (−7.2%) son los que no revisan.',
  /* 5  diagram cycle */  'Pregunta clave para tu equipo: ¿tienen cadencias reales de inspección que incluyan la calidad del output generado por IA? Si no, están volando a ciegas a mayor velocidad.',
  /* 6  IA amplifica */   'DORA 2024 confirma: 39% reporta poca o ninguna confianza en código generado por IA. Si se ignora esa desconfianza, aumentan defectos. Si se atiende sin proceso, aumenta fricción.',
  /* 7  cuándo sí */      'La capacidad de iterar, validar y pivotar genera ventaja directa. Pero muchas organizaciones "agilizan" procesos que funcionan mejor con estabilidad, generando fricción sin valor.',
  /* 8  cuándo no */      'La distinción assistant vs agent vs multiagente (Gartner) implica diferentes niveles de estabilidad del workflow. No todo proceso se beneficia de agilidad — algunos se benefician de automatización.',
  /* 9  triangle */       'Pregunta para tu organización: ¿cada proceso es candidato a iteración ágil, a estabilización, o a automatización con agentes? La respuesta define tu modelo operativo.',
  /* 10 section lid */    'McKinsey 2025: rediseño de workflows y gobierno ejecutivo visible son los dos atributos con mayor correlación con EBIT atribuible a genAI. La tecnología es secundaria.',
  /* 11 proteger */       'En era agéntica, "proteger" también significa establecer políticas claras sobre qué pueden y qué no pueden hacer los agentes IA. Las presiones de productividad llevan a delegaciones sin control.',
  /* 12 crear esp */      'En era agéntica esto se traduce en autonomía por nivel y work charts dinámicos donde cada equipo define su human-agent ratio según contexto, no por mandato central.',
  /* 13 confiar */        'Matiz crítico 2026: la "inteligencia ascendente" ahora incluye agentes. El líder que no define límites de autonomía (humana Y de agentes) no está "soltando" — está abdicando.',
  /* 14 gobernar */       'Solo 21% de organizaciones reporta haber hecho rediseño fundamental de workflows (McKinsey 2025). El resto intenta insertar IA en procesos viejos — por eso no ven EBIT.',
  /* 15 diagram lid */    'El cuarto pilar (gobernar) no existía en agilidad clásica. Es la respuesta al riesgo de que la velocidad de los agentes supere la capacidad de supervisión humana.',
  /* 16 >80% */           'El dato más incómodo: no es un problema de tecnología sino de liderazgo. Las organizaciones que "delegan sin gobernar" no fallan por la IA, fallan por el vacío de dirección.',
  /* 17 equipos */        'En 2026 la composición dinámica no es solo por fase de proyecto — es dinámica a nivel de sprint. Nuevos roles como AI Security Specialist surgen según la madurez de la capacidad IA.',
  /* 18 centrado usr */   'Caso Klarna: la eficiencia es real (2.3M conversaciones, −25% repetición), pero el valor real está en resolución <2 min vs 11 — una métrica de experiencia de usuario, no de eficiencia interna.',
  /* 19 DM base */        'Conexión directa con el ciclo empírico: si el delivery manager no configura prácticas de revisión de outputs IA, la inspección del fundamento 1 simplemente no ocurre en la práctica.',
  /* 20 DM 2026 */        'Pregunta reveladora: ¿quién en tu equipo tiene la responsabilidad explícita de configurar cómo se integra IA al flujo de trabajo? Si nadie, tienes un gap de delivery management.',
  /* 21 section quiz1 */  'Estas preguntas están diseñadas para generar reflexión sobre la base empírica — cada una conecta un principio clásico con su implicación en contexto agéntico.',
  /* 22 quiz 1 */         'Si todo se vuelve más rápido, el costo de una mala decisión también. El empirismo no es ritual — es el único mecanismo de control cuando la incertidumbre es alta.',
  /* 23 quiz 2 */         'Transferir poder no es "delegar y olvidar". En contexto agéntico, el liderazgo define los límites de autonomía tanto humana como de agentes. Sin esto, la adopción es caótica.',
  /* 24 quiz 3 */         'Dato duro: >80% sin gobierno ejecutivo visible no logra retorno tangible. El apoyo ejecutivo no es motivacional — es condición estructural del sistema.',
  /* 25 quiz 4 */         'Gartner proyecta que el 40% de apps enterprise tendrá agentes específicos por tarea en 2026 (vs <5% en 2025). La automatización ya no es futuro — es el tercer vértice del triángulo.',
  /* 26 quiz 5 */         'El error más costoso no es "no adoptar agilidad" sino forzarla donde no aporta. Los procesos estables bien ejecutados generan eficiencia predecible sin la fricción de iteración constante.',
  /* 27 section era */    'Gartner alerta sobre "agentwashing": llamar agente a lo que es solo un chatbot. La distinción matters porque cada nivel de autonomía requiere diferente gobernanza y control.',
  /* 28 qué es agente */  'OWASP Top 10 para LLM incluye "excessive agency" como riesgo crítico. El problema no es que los agentes ejecuten mal — es que ejecuten cosas que nadie les pidió, con datos que no debían tocar.',
  /* 29 diagram agen */   'Microsoft formaliza el concepto "agent boss": el 82% de líderes considera 2025-2026 un punto de inflexión. La pregunta no es si adoptar agentes sino cómo gobernarlos.',
  /* 30 section roles */  'En era agéntica no se elimina la accountability — se reubica. La unidad de trabajo cambia de "tareas humanas" a "tareas orquestadas humano-agente".',
  /* 31 PO */             'La accountability del PO no cambia pero su contexto sí: priorizar ya no es solo ordenar el backlog, es decidir qué trabajo se diseña para humanos, cuál para agentes y cuál es híbrido.',
  /* 32 SM */             'El Scrum Master como líder servidor cobra nueva dimensión: "servir" ahora incluye proteger al equipo de la sobreconfianza en outputs de IA y de la presión por adoptar sin evaluar.',
  /* 33 Devs */           'El Developer como "profesional" incluye juzgar cuándo el código generado por IA cumple el Definition of Done. La calidad no se delega — se verifica.',
  /* 34 section adopt */  'Stack Overflow 2024: 62% de devs ya usa IA. Pero uso ≠ valor enterprise. La trampa del "tool rollout" es confundir distribución de licencias con transformación.',
  /* 35 bars adopción */  'De 65% a 71% en un año no es gradual — es aceleración. Pero 88% usando IA en ≥1 función con >80% sin impacto EBIT significa que la brecha adopción-valor se está ampliando, no cerrando.',
  /* 36 lo que sube */    'La heterogeneidad importa: la mayor ganancia es en perfiles menos expertos (+34% novatos en contact center). Para expertos el efecto puede ser negativo (METR). No hay "efecto uniforme".',
  /* 37 METR */           'La brecha percepción-realidad es el riesgo de liderazgo más subestimado: si mides solo percepción de productividad, tu equipo puede estar destruyendo valor creyendo que lo crea.',
  /* 38 DORA mejoras */   'Estas mejoras son "locales" — ocurren a nivel de tarea individual. El error es asumir que sumarlas produce mejora sistémica. DORA demuestra que no es así.',
  /* 39 DORA pérdidas */  'Aquí está el "porqué" de toda la sesión: la gestión ágil debe convertir mejoras locales en outcomes sistémicos. Sin el ciclo inspección → adaptación, estas mejoras nunca escalan.',
  /* 40 vacuum */         'DORA confirma que el tiempo en "trabajo valioso" cae (−2.6% estimado) aun cuando suben flow y productividad. El liderazgo debe proteger ese vacío para que se convierta en innovación.',
  /* 41 diagram E2E */    'El diferencial competitivo ya no está en la ejecución (los agentes la aceleran) sino en el diseño del sistema: gobernanza, plataformas, calidad y seguridad.',
  /* 42 section roles2 */ 'Los roles Scrum permanecen pero su contenido cambia radicalmente. La accountability no desaparece — se expande hacia la orquestación del trabajo humano-agente.',
  /* 43 PO 2026 */        'El PO que solo prioriza features se queda corto. En 2026 debe diseñar "value + guardrails": priorizar rediseño de workflow para capturar EBIT, no solo lanzar funcionalidades.',
  /* 44 SM/DM 2026 */     'El SM que no entiende cómo funcionan los agentes no puede facilitar su adopción. "Flow architect" significa medir, no solo facilitar. Métricas DevEx y confianza medible son su nuevo toolkit.',
  /* 45 Devs 2026 */      'El Developer que acepta todo lo que genera la IA sin evaluar está externalizando su profesionalismo. Orquestar agentes es la nueva competencia técnica — no usar un chatbot.',
  /* 46 Líderes 2026 */   'Microsoft describe la transición de org charts a work charts. El human-agent ratio no es reducción de headcount — es rediseño de capacidad organizacional.',
  /* 47 section quiz2 */  'Estas preguntas conectan los roles clásicos con su evolución agéntica. Cada respuesta correcta debería activar la reflexión: ¿mi equipo ya opera así o sigue en modo pre-2026?',
  /* 48 quiz 6 */         'No uniformar: si cada equipo define su human-agent ratio según su contexto, la organización evoluciona más rápido que con mandatos centralizados de adopción.',
  /* 49 quiz 7 */         'El líder que solo "suelta" sin gobernar en 2026 no está siendo ágil — está abdicando. La paradoja: hay que dar más autonomía Y más gobernanza simultáneamente.',
  /* 50 quiz 8 */         'Los roles emergentes (AI Security, AI Agent Specialist, AI ROI Analyst) no "inflan headcount" — clarifican ownership de decisiones de alto riesgo que nadie estaba tomando.',
  /* 51 quiz 9 */         'Un agente que "resuelve" tickets 5x más rápido pero degrada la satisfacción del cliente destruye valor. La multifuncionalidad evita que nadie monitoree solo la métrica de eficiencia.',
  /* 52 quiz 10 */        'Si nadie en el equipo tiene la responsabilidad explícita de configurar la integración de IA, tienes un gap operativo. El SM/DM es la persona natural para cerrarlo.',
  /* 53 section gob */    'Solo 18% tenía council con autoridad para IA responsable en 2024 (McKinsey). La privacidad/seguridad es preocupación #1 (72%, PMI Sweden). La gobernanza no es burocracia — es supervivencia.',
  /* 54 centralizado */   'El trade-off real: en industrias reguladas, el costo de un incidente de IA (fuga de datos, sesgo en decisiones) supera con creces el costo de un cuello de botella por aprobación.',
  /* 55 federado */       'El riesgo de "shadow AI" no es teórico: equipos usando herramientas no autorizadas con datos sensibles ya es realidad en la mayoría de enterprises. El modelo federado lo contiene sin asfixiar.',
  /* 56 product-align */  'Este modelo solo funciona si ya tienes telemetría madura. Sin datos de impacto, "product-aligned governance" es solo un nombre bonito para "nadie gobierna".',
  /* 57 section metr */   'El tablero mínimo viable evita "local wins / system losses". Medir solo productividad individual es como medir solo goles sin ver el resultado del partido.',
  /* 58 metrics 1 */      'Lead time y estabilidad son las métricas que más rápido delatan la deuda oculta por IA. Si "más commits" no se traduce en más throughput, hay retrabajo invisible.',
  /* 59 metrics 2 */      'METR demostró que la percepción de productividad puede ser opuesta a la realidad (creen +20%, medido −19%). Sin ROI medido, estás en terreno de autoengaño organizacional.',
  /* 60 section casos */  'Nota metodológica: los efectos varían por especificidad de tarea, experiencia del profesional, madurez del repo y controles de calidad. Esto explica resultados contradictorios.',
  /* 61 copilot */        'La clave de Accenture no es Copilot — es que tenían telemetría y prácticas de revisión. Sin esos controles, el mismo tool produce "deuda acelerada" (coherente con DORA).',
  /* 62 klarna */         'Caveat: métricas de "equivalente FTE" dependen de supuestos internos. Para replicar, exige método de cálculo interno. Los "best case" deben auditarse, no copiarse.',
  /* 63 escritura */      'Transferencia directa a roles ágiles: PO para PRDs y criterios, SM para minutas y riesgos, liderazgo para síntesis ejecutiva. El mayor ROI está en la escritura estructurada.',
  /* 64 section impl */   'PMI Sweden: 64% recomienda iniciar pequeño y escalar gradualmente. El ciclo empírico aplica a la propia adopción de IA: experimentar, medir, ajustar.',
  /* 65 checklist 1 */    'Antes de comprar herramientas: ¿hay liderazgo protector? ¿Equipos multifuncionales reales? ¿Cadencias de inspección? Sin esto, la IA amplifica la disfunción existente.',
  /* 66 checklist 2 */    'EU AI Act entra en vigor progresivamente 2025-2027. Definir guardrails ahora no es anticipación — es cumplimiento. Las obligaciones para GPAI aplican desde agosto 2025.',
  /* 67 cierre */         'Mensaje final: la IA agéntica amplifica lo que ya tienen. Si invierten en fundamentos antes que en herramientas, cada dólar en IA rinde exponencialmente más.',
  /* 68 section bib */    '17 fuentes verificables respaldan esta presentación. Cada dato tiene trazabilidad a su fuente primaria para que puedas validarlo con tu propio equipo.',
  /* 69 bib 1 */          '',
  /* 70 bib 2 */          '',
  /* 71 bib 3 */          '',
  /* 72 bib 4 */          '',
  /* 73 bib 5 */          '',
  /* 74 end */            '',
]

/* ═══════════════════════════════════════════
   SLIDE DATA
   ═══════════════════════════════════════════ */
const slides = [

  // ── 0: TITLE ──
  { type: 'hero' },

  // ── 1: KEY METRICS ──
  { type: 'stats', title: 'El contexto en números', items: [
    { value: '71%', label: 'uso regular de genAI', source: 'McKinsey 2025' },
    { value: '62%', label: 'experimenta con agentes', source: 'McKinsey 2025' },
    { value: '>80%', label: 'sin impacto en EBIT', source: 'McKinsey 2025' },
    { value: '82%', label: 'punto de inflexión', source: 'Microsoft WTI 2025' },
  ]},

  // ── SECTION: FUNDAMENTOS ──
  { type: 'section', title: 'Fundamentos ágiles', subtitle: 'La base que no cambia' },

  // ── OVERVIEW: 5 FUNDAMENTOS ──
  { type: 'overview' },

  // ── CICLO EMPÍRICO ──
  { type: 'content', title: 'El ciclo empírico', bullets: [
    'Retroalimentación frecuente',
    'Inspección de resultados',
    'Adaptación basada en evidencia',
  ], note: 'Fundamento 1' },

  { type: 'diagram', id: 'cycle' },

  { type: 'content', title: '¿Qué pasa sin inspección?', bullets: [
    'Los errores de IA se propagan sin freno',
    'La velocidad de ejecución supera la revisión',
    'La deuda técnica se acumula más rápido',
  ], note: 'Conexión agéntica', color: 'accent' },

  // ── CUÁNDO SÍ / CUÁNDO NO ──
  { type: 'content', title: '¿Cuándo es esencial la agilidad?', bullets: [
    'Grandes brechas de satisfacción del cliente',
    'Necesidades cambiando rápidamente',
    'Capacidad de iterar genera ventaja directa',
  ], note: 'Fundamento 2' },

  { type: 'content', title: '¿Cuándo no es necesaria?', bullets: [
    'Brechas pequeñas y necesidades estables',
    'Procesos predecibles satisfacen mejor',
    'En 2026: ¡la automatización directa es opción!',
  ], color: 'highlight' },

  { type: 'diagram', id: 'triangle' },

  // ── LIDERAZGO (EMPHASIS) ──
  { type: 'section', title: 'Liderazgo ágil', subtitle: 'Proteger, habilitar, soltar', emphasis: true },

  { type: 'content', title: 'Proteger', bullets: [
    'Blindar de interferencia burocrática',
    'Eliminar deadlines arbitrarios',
    'Establecer políticas claras sobre agentes IA',
    'Sin protección, los equipos son reabsorbidos',
  ], note: 'Fundamento 3 — Pilar 1', color: 'accent' },

  { type: 'content', title: 'Crear espacio', bullets: [
    'Diferentes equipos, diferentes caminos',
    'La diversidad de enfoques es fortaleza',
    'Transferir mecanismos de poder a equipos',
    'No existe un "camino único"',
  ], note: 'Fundamento 3 — Pilar 2', color: 'accent' },

  { type: 'content', title: 'Confiar y soltar', bullets: [
    'La inteligencia ascendente cambia el rol gerencial',
    'Crear condiciones, luego dar paso atrás',
    'Matiz 2026: paso atrás en ejecución',
    'Intensificar en gobernanza y diseño de sistema',
  ], note: 'Fundamento 3 — Pilar 3', color: 'accent' },

  { type: 'content', title: 'Gobernar (2026)', bullets: [
    'Definir límites de autonomía humana y de agentes',
    'Diseñar el sistema de trabajo',
    'Rediseño de workflows = mayor correlación con EBIT',
    '¡Gobierno ejecutivo visible es condición necesaria!',
  ], note: 'Fundamento 3 — Pilar 4 (nuevo)', color: 'highlight' },

  { type: 'diagram', id: 'leadership' },

  { type: 'bigstat', value: '>80%', label: 'sin gobierno ejecutivo visible\nno logra retorno tangible de genAI', source: 'McKinsey 2025' },

  // ── EQUIPOS ──
  { type: 'content', title: 'Equipos multifuncionales', bullets: [
    'Composición dinámica según la etapa',
    'Diseñadores, investigadores, desarrolladores juntos',
    'Evaluar agentes por impacto en usuario',
    'No solo por eficiencia interna',
  ], note: 'Fundamento 4' },

  { type: 'content', title: 'Centrado en el usuario, siempre', bullets: [
    'La multifuncionalidad evita silos',
    'Decisiones conectadas al usuario final',
    'Un agente 5x más rápido que degrada CSAT\n¡destruye valor!',
  ], color: 'accent' },

  // ── DELIVERY MANAGER ──
  { type: 'content', title: 'El Delivery Manager', bullets: [
    'Cadencias de trabajo y eliminación de impedimentos',
    'Colaboración entre disciplinas',
    'Acceso a recursos, datos y herramientas',
  ], note: 'Fundamento 5 — Responsabilidades base' },

  { type: 'content', title: 'Delivery Manager en 2026', bullets: [
    'Integración gobernada de IA',
    'Entrenamiento en validación de outputs',
    'Prácticas de revisión de código generado',
    'Si no configura revisión, ¡la inspección no ocurre!',
  ], note: 'Extensión agéntica', color: 'highlight' },

  // ── QUIZ 1 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Fundamentos ágiles', quiz: true },
  { type: 'quiz', idx: 0, q: 'El objetivo principal de la agilidad es\nofrecer mejores resultados mediante\nretroalimentación frecuente, inspección\ny adaptación.', explanation: 'El ciclo empírico es el mecanismo central.\nEn era agéntica se amplifica.' },
  { type: 'quiz', idx: 1, q: 'El liderazgo debe proteger a los equipos\nágiles de ser arrastrados a viejas formas\nde trabajo y transferir poder a los equipos.', explanation: 'Sin liderazgo protector, los equipos\nson reabsorbidos por la inercia burocrática.' },
  { type: 'quiz', idx: 2, q: 'Las transformaciones ágiles fracasan\ncuando no cuentan con apoyo ejecutivo\no de mandos medios.', explanation: 'El apoyo ejecutivo es condición estructural.\n>80% sin gobierno visible no logra retorno.' },
  { type: 'quiz', idx: 3, q: 'La agilidad es esencial cuando existen\ngrandes brechas de satisfacción\no necesidades cambiando rápidamente.', explanation: 'En 2026 se agrega automatización directa.\nTriángulo: ágil vs. estable vs. automatizado.' },
  { type: 'quiz', idx: 4, q: 'Los procesos estables satisfacen mejor\ncuando las brechas son pequeñas\ny las necesidades son estables.', explanation: 'No todo requiere agilidad.\nEl error es "agilizar" lo que funciona bien.' },

  // ── ERA AGÉNTICA ──
  { type: 'section', title: 'Era agéntica', subtitle: 'Lo que cambia en 2026' },

  { type: 'content', title: '¿Qué es un agente?', bullets: [
    'Sistema que planifica y ejecuta múltiples pasos',
    'No solo chat — ejecuta, coordina, decide',
    'Problema real: ¡agencia excesiva + bajo control!',
  ] },

  { type: 'diagram', id: 'agentic' },

  // ── SCRUM ROLES (EMPHASIS) ──
  { type: 'section', title: 'Roles Scrum', subtitle: 'El punto de partida canónico', emphasis: true },

  { type: 'content', title: 'Product Owner', bullets: [
    'Maximizar el valor del producto',
    'Gestionar el Product Backlog',
    'Comunicar el Objetivo del Producto',
    'Asegurar transparencia y orden',
  ], color: 'accent' },

  { type: 'content', title: 'Scrum Master', bullets: [
    'Establecer Scrum; lograr efectividad',
    'Líder servidor del equipo',
    'Coach en autogestión y multifuncionalidad',
    'Eliminar impedimentos; servir a la organización',
  ], color: 'highlight' },

  { type: 'content', title: 'Developers', bullets: [
    'Crear un Increment utilizable cada Sprint',
    'Plan del Sprint y calidad en la DoD',
    'Adaptar el plan diariamente',
    'Responsabilidad mutua como profesionales',
  ], color: 'accent' },

  // ── ADOPCIÓN IA ──
  { type: 'section', title: 'Adopción de IA', subtitle: 'Datos y evidencia' },

  { type: 'bars', title: 'Curva de adopción', items: [
    { label: 'Uso regular genAI (2024)', value: 65, color: C.highlight },
    { label: 'Uso regular genAI (2025)', value: 71, color: C.highlight },
    { label: 'IA en ≥1 función (2025)', value: 88, color: C.accent },
    { label: 'Experimenta con agentes', value: 62, color: C.accent },
  ], source: 'McKinsey 2024–2025' },

  // ── PRODUCTIVIDAD ──
  { type: 'content', title: '¿Qué mejora con IA?', bullets: [
    'Programación (lab): +55.8% más rápido',
    'Escritura: −40% tiempo, +18% calidad',
    'Contact center: +34% productividad en novatos',
    'Copilot/Accenture: +84% builds exitosos',
  ], note: 'Evidencia positiva', color: 'highlight' },

  { type: 'bigstat', value: '+19%', label: 'más lento para devs expertos\ncon IA (METR RCT 2025)', source: '¡Pese a creer ser ~20% más rápidos!', warn: true },

  { type: 'bars', title: 'DORA: mejoras locales', items: [
    { label: 'Calidad de documentación', value: 7.5, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Calidad de código', value: 3.4, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Velocidad de code review', value: 3.1, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Flow individual', value: 2.6, max: 12, color: C.accent, suffix: '%' },
  ], source: 'DORA 2024 — por +25% adopción IA', note: 'Lo que sube' },

  { type: 'bars', title: 'DORA: pérdidas sistémicas', items: [
    { label: 'Throughput de entrega', value: 1.5, max: 10, color: C.red, suffix: '%', prefix: '−' },
    { label: 'Estabilidad', value: 7.2, max: 10, color: C.red, suffix: '%', prefix: '−' },
  ], source: 'DORA 2024 — por +25% adopción IA', note: 'Lo que baja', warn: true },

  // ── VACUUM ──
  { type: 'quote', text: 'Si la IA acelera tareas valiosas,\nse crea un "vacío de tiempo".\nSin rediseño, ese vacío\nse rellena con burocracia.', source: 'El "Vacuum Effect"' },

  // ── SISTEMA E2E ──
  { type: 'diagram', id: 'system' },

  // ── ROLES REDEFINIDOS (EMPHASIS) ──
  { type: 'section', title: 'Roles redefinidos', subtitle: 'De "hacer" a "orquestar"', emphasis: true },

  { type: 'role', role: 'Product Owner', base: 'Maximizar valor;\ngestionar Product Backlog', upgrade: 'Diseñar value + guardrails:\ndecidir qué se delega a agentes\ny con qué límites', artifacts: 'Policy-by-design, eval sets,\ncriterios verificables', color: C.accent },

  { type: 'role', role: 'SM / Delivery Manager', base: 'Establecer Scrum;\nlograr efectividad;\nconfigurar entorno ágil', upgrade: 'Flow & adoption architect:\nentrenar uso/validación,\nbajar fricción, proteger foco', artifacts: 'Guías de uso, checklists,\nmétricas DevEx/Flow', color: C.highlight },

  { type: 'role', role: 'Developers', base: 'Entregar Increment;\ncalidad en DoD;\nplan del Sprint', upgrade: 'Engineer + evaluator:\norquestar agentes, revisar,\nasegurar seguridad, testear', artifacts: 'Suites de pruebas,\nlinters/SAST, revisión de prompts', color: C.accent },

  { type: 'role', role: 'Líderes', base: 'Crear condiciones;\nproteger equipos;\ntransferir poder', upgrade: 'Agent-boss / system steward:\nhuman-agent ratio, work charts,\ncentralización vs. federación', artifacts: 'Modelo de gobernanza,\nmétricas EBIT/ROI, controles', color: C.highlight },

  // ── QUIZ 2 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Roles y liderazgo', quiz: true },
  { type: 'quiz', idx: 5, q: 'Los líderes ágiles necesitan\ncrear espacio para que todos\ncontribuyan — diferentes equipos,\ndiferentes caminos.', explanation: 'En era agéntica: autonomía por nivel\ny work charts dinámicos.' },
  { type: 'quiz', idx: 6, q: 'Confiar en la inteligencia ascendente\ncambia el papel de los gerentes.\nCrean condiciones y dan paso atrás.', explanation: 'Matiz 2026: paso atrás en ejecución,\nintensifica en gobernanza.' },
  { type: 'quiz', idx: 7, q: 'El tamaño del equipo y los roles\ncambiarán según la etapa\nde desarrollo del servicio.', explanation: 'En 2026 es dinámico a nivel de sprint.\nNuevos roles IA según madurez.' },
  { type: 'quiz', idx: 8, q: 'Todo el equipo debe trabajar junto\npara diseñar, construir e iterar\nun servicio centrado en el usuario.', explanation: 'Los agentes se evalúan por impacto\nen experiencia de usuario.' },
  { type: 'quiz', idx: 9, q: 'El delivery manager configura\nel entorno ágil que su equipo\nnecesita para iterar.', explanation: 'En 2026 ese entorno incluye agentes.\nEl SM asegura integración gobernada.' },

  // ── GOBERNANZA ──
  { type: 'section', title: 'Gobernanza', subtitle: 'Modelos operativos' },

  { type: 'governance', model: 'Centralizado', subtitle: 'AI CoE fuerte', pros: 'Consistencia, control, cumplimiento', cons: 'Cuellos de botella, baja adopción', when: 'Industrias reguladas, riesgo alto', color: C.accent },

  { type: 'governance', model: 'Federado', subtitle: 'Centro define; unidades ejecutan', pros: 'Balance entre velocidad y control', cons: 'Inconsistencia, "shadow AI"', when: 'Empresas multi-unidad por productos', color: C.highlight },

  { type: 'governance', model: 'Product-aligned', subtitle: 'Governance en el flujo de producto', pros: 'Conecta IA con outcomes', cons: 'Requiere madurez de medición', when: 'Agile escalado con telemetría', color: C.accent },

  // ── MÉTRICAS ──
  { type: 'section', title: 'Métricas', subtitle: 'Tablero mínimo viable' },

  { type: 'metrics', title: 'Dimensiones sistémicas', items: [
    { dim: 'Velocidad E2E', metric: 'Lead time / throughput', alert: 'Baja con "más commits"' },
    { dim: 'Estabilidad', metric: 'Change failure rate', alert: 'Cae con IA (−7.2%)' },
    { dim: 'Calidad', metric: 'Build success, merge rate', alert: 'Volumen sube, calidad baja' },
  ]},

  { type: 'metrics', title: 'Dimensiones de impacto', items: [
    { dim: 'Productividad', metric: 'Flow / percepción', alert: 'Percepción ≠ realidad' },
    { dim: 'ROI', metric: '% EBIT atribuible', alert: '>80% sin impacto enterprise' },
    { dim: 'Riesgo', metric: 'Incidentes IA', alert: 'Privacidad, IP, sesgo' },
  ]},

  // ── CASOS ──
  { type: 'section', title: 'Casos cuantificados', subtitle: 'Evidencia real' },

  { type: 'case', title: 'Copilot + Accenture', subtitle: 'RCT en enterprise', items: [
    { label: 'Pull Requests', value: '+8.69%' },
    { label: 'Merge rate', value: '+15%' },
    { label: 'Builds exitosos', value: '+84%' },
    { label: 'Satisfacción', value: '90%' },
  ], color: C.highlight },

  { type: 'case', title: 'Klarna', subtitle: 'Agente end-to-end', items: [
    { label: 'Conversaciones', value: '2.3M' },
    { label: 'Equivalente FTE', value: '700' },
    { label: 'Resolución', value: '<2 min' },
    { label: 'Profit', value: '+$40M' },
  ], color: C.accent },

  { type: 'case', title: 'Escritura profesional', subtitle: 'Transferible a PO/SM', items: [
    { label: 'Tiempo', value: '−40%' },
    { label: 'Calidad', value: '+18%' },
  ], note: 'PRDs, historias, minutas, síntesis ejecutiva', color: C.highlight },

  // ── CHECKLIST ──
  { type: 'section', title: 'Implementación', subtitle: 'Checklist de 30 días' },

  { type: 'checklist', title: 'Primeros pasos', items: [
    { step: 1, text: 'Verificar fundamentos:\nliderazgo, equipos, inspección' },
    { step: 2, text: 'Medir baseline:\nDORA + DevEx + calidad' },
    { step: 3, text: 'Definir guardrails:\ndatos, IP, seguridad' },
  ]},

  { type: 'checklist', title: 'Escalar con evidencia', items: [
    { step: 4, text: 'Empezar con 1–2 workflows.\n64% recomienda iniciar pequeño.' },
    { step: 5, text: 'Iterar con evidencia.\nRevisar en 30 días con datos.' },
  ]},

  // ── CLOSING QUOTE ──
  { type: 'quote', text: 'La IA agéntica amplifica\nlo que ya tienen.\nSi los fundamentos son sólidos,\namplifica valor.\nSi son frágiles,\namplifica disfunción.', source: '' },

  // ── BIBLIOGRAPHY ──
  { type: 'section', title: 'Bibliografía', subtitle: 'Fuentes y referencias' },

  { type: 'bib', entries: [
    'DORA / Google Cloud. "Accelerate State of DevOps Report 2024". Google Cloud Blog, 2024.',
    'DORA. "Impact of Generative AI in Software Development". Google, 2025.',
    'McKinsey & Company. "The state of AI in early 2024". McKinsey Global Survey, 2024.',
    'McKinsey & Company. "The state of AI: How organizations are rewiring to capture value". Mar 2025.',
  ]},

  { type: 'bib', entries: [
    'McKinsey & Company. "The state of AI in 2025: Agents, innovation, and transformation". Nov 2025.',
    'Gartner. "Gartner Predicts 40% of Enterprise Apps Will Have AI Agents by 2026". Press Release, 2025.',
    'Microsoft. "Work Trend Index 2025: The Year the Frontier Firm is Born". Microsoft, 2025.',
    'Schwaber, K. & Sutherland, J. "La Guía de Scrum 2020". Scrum.org (Español LatAm).',
  ]},

  { type: 'bib', entries: [
    'NIST. "AI Risk Management Framework 1.0 (AI RMF)". National Institute of Standards and Technology, 2023.',
    'OWASP. "Top 10 for Large Language Model Applications". OWASP Foundation, 2024.',
    'Noy, S. & Zhang, W. "Experimental evidence on the productivity effects of generative AI". Science, 2023.',
    'Brynjolfsson, E. et al. "Generative AI at Work". NBER Working Paper 31161, 2023.',
  ]},

  { type: 'bib', entries: [
    'Peng, S. et al. "The Impact of AI on Developer Productivity". arXiv:2302.06590, 2023.',
    'METR. "Measuring the Impact of Early AI Assistance on Open-Source Developers". RCT, 2025.',
    'OpenAI. "Klarna: AI Assistant Case Study". OpenAI Customer Stories, 2024.',
    'PMI Sweden Chapter. "Navigating AI in Project Management". Survey Report, 2024.',
  ]},

  { type: 'bib', entries: [
    'EU. "AI Act (Regulation 2024/1689)". Official Journal of the European Union, 2024.',
    'GitHub. "Research: Quantifying Copilot\'s impact on code quality and developer productivity". GitHub Blog + Accenture, 2024.',
    'Stack Overflow. "Developer Survey 2024". Stack Overflow, 2024.',
  ]},

  // ── FINAL ──
  { type: 'end' },
]

/* ═══════════════════════════════════════════
   SVG DIAGRAMS
   ═══════════════════════════════════════════ */
function CycleDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Ciclo empírico</p>
      <svg viewBox="0 0 900 320" width={900} fill="none">
        {[
          { x: 40, label: 'Transparencia', color: C.accent },
          { x: 340, label: 'Inspección', color: C.accent },
          { x: 640, label: 'Adaptación', color: C.accent },
        ].map((n, i) => (
          <g key={i} className={`anim-pop d${i + 1}`}>
            <rect x={n.x} y="60" width="220" height="80" rx="16" fill={C.surface} stroke={n.color} strokeWidth="2" />
            <text x={n.x + 110} y="108" textAnchor="middle" fill={n.color} fontSize="28" fontWeight="600" fontFamily="Inter">{n.label}</text>
          </g>
        ))}
        <g className="anim-fade d3">
          <line x1="260" y1="100" x2="330" y2="100" stroke={C.accent} strokeWidth="2" markerEnd="url(#a1)" />
          <line x1="560" y1="100" x2="630" y2="100" stroke={C.accent} strokeWidth="2" markerEnd="url(#a1)" />
        </g>
        <g className="anim-fade d4">
          <path d="M750 145 C750 260, 150 260, 150 145" fill="none" stroke={C.highlight} strokeWidth="2" strokeDasharray="8 4" markerEnd="url(#a2)" />
          <text x="450" y="245" textAnchor="middle" fill={C.highlight} fontSize="22" fontFamily="Inter">feedback loop</text>
        </g>
        <g className="anim-pop d5">
          <rect x="270" y="275" width="360" height="40" rx="10" fill={C.surface} stroke="#F59E0B" strokeWidth="1" />
          <text x="450" y="302" textAnchor="middle" fill="#F59E0B" fontSize="20" fontFamily="Inter">⚡ La IA amplifica velocidad Y errores</text>
        </g>
        <defs>
          <marker id="a1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill={C.accent} /></marker>
          <marker id="a2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill={C.highlight} /></marker>
        </defs>
      </svg>
    </div>
  )
}

function TriangleDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Triángulo de decisión</p>
      <svg viewBox="0 0 800 500" width={800} fill="none">
        <g className="anim-pop d1">
          <rect x="300" y="40" width="200" height="70" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="400" y="83" textAnchor="middle" fill={C.accent} fontSize="28" fontWeight="600" fontFamily="Inter">Agilidad</text>
        </g>
        <g className="anim-pop d2">
          <rect x="50" y="350" width="220" height="70" rx="14" fill={C.surface} stroke={C.highlight} strokeWidth="2" />
          <text x="160" y="393" textAnchor="middle" fill={C.highlight} fontSize="28" fontWeight="600" fontFamily="Inter">Estabilidad</text>
        </g>
        <g className="anim-pop d3">
          <rect x="530" y="350" width="220" height="70" rx="14" fill={C.surface} stroke="#A855F7" strokeWidth="2" />
          <text x="640" y="393" textAnchor="middle" fill="#A855F7" fontSize="28" fontWeight="600" fontFamily="Inter">Automatización</text>
        </g>
        <g className="anim-fade d3" opacity="0.25">
          <line x1="350" y1="115" x2="200" y2="345" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="450" y1="115" x2="600" y2="345" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="270" y1="385" x2="530" y2="385" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>
        <g className="anim-fade d4">
          <text x="225" y="240" textAnchor="middle" fill={C.accent} fontSize="18" fontFamily="Inter" opacity="0.7">Brechas grandes</text>
          <text x="225" y="262" textAnchor="middle" fill={C.accent} fontSize="18" fontFamily="Inter" opacity="0.7">cambio rápido</text>
          <text x="575" y="240" textAnchor="middle" fill="#A855F7" fontSize="18" fontFamily="Inter" opacity="0.7">Repetitivo</text>
          <text x="575" y="262" textAnchor="middle" fill="#A855F7" fontSize="18" fontFamily="Inter" opacity="0.7">reglas claras</text>
          <text x="400" y="460" textAnchor="middle" fill={C.highlight} fontSize="18" fontFamily="Inter" opacity="0.7">Brechas pequeñas / necesidades estables</text>
        </g>
      </svg>
    </div>
  )
}

function LeadershipDiagram() {
  const pillars = [
    { label: 'Proteger', color: C.accent, x: 50 },
    { label: 'Habilitar', color: C.highlight, x: 250 },
    { label: 'Soltar', color: '#F59E0B', x: 450 },
    { label: 'Gobernar', color: '#A855F7', x: 650 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Liderazgo ágil</p>
      <svg viewBox="0 0 850 340" width={850} fill="none">
        <g className="anim-pop d1">
          <rect x="295" y="10" width="260" height="70" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2.5" />
          <text x="425" y="53" textAnchor="middle" fill={C.accent} fontSize="30" fontWeight="700" fontFamily="Inter">Líder ágil</text>
        </g>
        {pillars.map((p, i) => (
          <g key={i} className={`anim-pop d${i + 2}`}>
            <line x1="425" y1="80" x2={p.x + 75} y2="135" stroke={p.color} strokeWidth="1.5" opacity="0.4" />
            <rect x={p.x} y="135" width="150" height="60" rx="12" fill={C.surface} stroke={p.color} strokeWidth="1.5" />
            <text x={p.x + 75} y="172" textAnchor="middle" fill={p.color} fontSize="22" fontWeight="600" fontFamily="Inter">{p.label}</text>
            {i === 3 && <text x={p.x + 75} y="192" textAnchor="middle" fill={p.color} fontSize="13" fontFamily="Inter" opacity="0.6">2026</text>}
          </g>
        ))}
        <g className="anim-pop d6">
          <rect x="175" y="260" width="500" height="60" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" strokeDasharray="8 4" />
          <text x="425" y="297" textAnchor="middle" fill="white" fontSize="22" fontWeight="500" fontFamily="Inter">Equipo autogestionado + agentes</text>
        </g>
        {pillars.map((p, i) => (
          <line key={`l${i}`} x1={p.x + 75} y1="195" x2="425" y2="260" stroke="white" strokeWidth="1" opacity="0.1" className={`anim-fade d${i + 3}`} />
        ))}
      </svg>
    </div>
  )
}

function AgenticDiagram() {
  const stages = [
    { label: 'Asistente', sub: 'Responde', color: C.highlight, x: 30 },
    { label: 'Agente', sub: 'Ejecuta', color: C.accent, x: 240 },
    { label: 'Multiagente', sub: 'Coordina', color: '#F59E0B', x: 450 },
    { label: 'Ecosistema', sub: 'Cruza apps', color: '#A855F7', x: 660 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Evolución agéntica</p>
      <svg viewBox="0 0 880 260" width={880} fill="none">
        {stages.map((s, i) => (
          <g key={i} className={`anim-pop d${i + 1}`}>
            <rect x={s.x} y="50" width="170" height="80" rx="14" fill={C.surface} stroke={s.color} strokeWidth="2" />
            <text x={s.x + 85} y="85" textAnchor="middle" fill={s.color} fontSize="24" fontWeight="600" fontFamily="Inter">{s.label}</text>
            <text x={s.x + 85} y="112" textAnchor="middle" fill="white" fontSize="18" opacity="0.5" fontFamily="Inter">{s.sub}</text>
            {i < 3 && <line x1={s.x + 170} y1="90" x2={s.x + 210} y2="90" stroke="white" strokeWidth="1.5" opacity="0.3" markerEnd="url(#aw)" />}
          </g>
        ))}
        <g className="anim-pop d5">
          <rect x="290" y="180" width="300" height="50" rx="10" fill="rgba(239,68,68,0.08)" stroke={C.red} strokeWidth="1" />
          <text x="440" y="212" textAnchor="middle" fill={C.red} fontSize="20" fontFamily="Inter">⚠ Riesgo: agency sin control</text>
          <line x1="325" y1="130" x2="370" y2="180" stroke={C.red} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          <line x1="535" y1="130" x2="510" y2="180" stroke={C.red} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        </g>
        <defs>
          <marker id="aw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="white" opacity="0.4" /></marker>
        </defs>
      </svg>
    </div>
  )
}

function SystemDiagram() {
  const phases = [
    { label: 'Discovery', x: 20 }, { label: 'Backlog', x: 170 }, { label: 'Build', x: 320 },
    { label: 'Test', x: 470 }, { label: 'Release', x: 620 }, { label: 'Observe', x: 770 },
  ]
  const agents = [
    { label: 'Agent: PRD', x: 170 }, { label: 'Agent: Code', x: 320 },
    { label: 'Agent: Test', x: 470 }, { label: 'Agent: Incidents', x: 770 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Sistema ágil-agéntico end-to-end</p>
      <svg viewBox="0 0 920 290" width={920} fill="none">
        {phases.map((p, i) => (
          <g key={i} className={`anim-pop d${i + 1}`}>
            <rect x={p.x} y="60" width="120" height="55" rx="12" fill={C.surface} stroke={C.accent} strokeWidth="1.5" />
            <text x={p.x + 60} y="94" textAnchor="middle" fill={C.accent} fontSize="20" fontWeight="500" fontFamily="Inter">{p.label}</text>
            {i < 5 && <line x1={p.x + 120} y1="87" x2={p.x + 150} y2="87" stroke="white" strokeWidth="1" opacity="0.2" markerEnd="url(#as)" />}
          </g>
        ))}
        {agents.map((a, i) => (
          <g key={`a${i}`} className={`anim-pop d${i + 3}`}>
            <rect x={a.x - 10} y="170" width="140" height="45" rx="10" fill={C.surface} stroke="#F59E0B" strokeWidth="1" />
            <text x={a.x + 60} y="199" textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="500" fontFamily="Inter">{a.label}</text>
            <line x1={a.x + 60} y1="170" x2={a.x + 60} y2="115" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
          </g>
        ))}
        <g className="anim-fade d6">
          <path d="M830 55 C860 15, 60 15, 80 55" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#ap)" />
          <text x="450" y="22" textAnchor="middle" fill="#A855F7" fontSize="16" fontFamily="Inter">feedback</text>
        </g>
        <defs>
          <marker id="as" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="white" opacity="0.3" /></marker>
          <marker id="ap" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7" fill="#A855F7" /></marker>
        </defs>
      </svg>
    </div>
  )
}

const DIAGRAMS = { cycle: CycleDiagram, triangle: TriangleDiagram, leadership: LeadershipDiagram, agentic: AgenticDiagram, system: SystemDiagram }

/* ═══════════════════════════════════════════
   SLIDE RENDERERS
   ═══════════════════════════════════════════ */
const MARGIN = 120
const inner = { paddingLeft: MARGIN, paddingRight: MARGIN }

function SlideRenderer({ data, quizState, onQuizAnswer }) {
  switch (data.type) {

    case 'hero': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 36 }}>
        <div className="anim-fade d1"><Logos height={128} /></div>
        <p className="anim-fade d2" style={{ fontSize: T.caption, color: C.dim, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 500 }}>Gestión Ágil de Proyectos</p>
        <h1 className="anim-fade d3" style={{ fontSize: T.hero, fontWeight: 800, lineHeight: 1.1, color: C.white, maxWidth: 900 }}>
          Roles y <span style={{ color: C.accent }}>Liderazgo</span>
        </h1>
        <div style={{ height: 24 }} />
      </div>
    )

    case 'end': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 48 }}>
        <div className="anim-fade d1"><Logos height={128} /></div>
        <p className="anim-fade d2" style={{ fontSize: T.subtitle, color: C.dim, fontWeight: 500 }}>Gestión Ágil de Proyectos</p>
        <p className="anim-fade d3" style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>¡Gracias!</p>
      </div>
    )

    case 'section': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {data.emphasis && <div className="anim-fade d1" style={{ width: 60, height: 4, background: C.accent, borderRadius: 2 }} />}
        {data.quiz && <div className="anim-fade d1" style={{ width: 60, height: 4, background: C.highlight, borderRadius: 2 }} />}
        <h2 className="anim-fade d2" style={{ fontSize: T.title, fontWeight: 700, color: C.white, lineHeight: 1.15 }}>{data.title}</h2>
        {data.subtitle && <p className="anim-fade d3" style={{ fontSize: T.subtitle, color: C.dim, fontWeight: 400 }}>{data.subtitle}</p>}
      </div>
    )

    case 'overview': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        <p className="anim-fade d1" style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Agenda</p>
        <h2 className="anim-fade d1" style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, marginBottom: 12 }}>Cinco fundamentos</h2>
        {[
          { n: '01', title: 'El ciclo empírico', sub: 'Transparencia → inspección → adaptación' },
          { n: '02', title: '¿Cuándo sí, cuándo no?', sub: 'Ágil vs. estable vs. automatizado' },
          { n: '03', title: 'Liderazgo ágil', sub: 'Proteger, habilitar, soltar, gobernar' },
          { n: '04', title: 'Equipos multifuncionales', sub: 'Centrados en el usuario, no en eficiencia' },
          { n: '05', title: 'El Delivery Manager', sub: 'Configurar el entorno — ahora con agentes IA' },
        ].map((f, i) => (
          <div key={i} className={`anim-fade d${i + 2}`} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: C.accent, opacity: 0.4, minWidth: 60 }}>{f.n}</span>
            <div>
              <p style={{ fontSize: T.bullet, fontWeight: 600, color: C.white }}>{f.title}</p>
              <p style={{ fontSize: 22, color: C.dim }}>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    )

    case 'stats': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        {data.title && <h2 className="anim-fade d1" style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, width: '100%', maxWidth: 1500 }}>
          {data.items.map((s, i) => (
            <div key={i} className={`anim-pop d${i + 1}`} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
              <p style={{ fontSize: 72, fontWeight: 800, color: C.accent, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: T.caption, color: C.white, marginTop: 16 }}>{s.label}</p>
              <p style={{ fontSize: 18, color: C.dim, marginTop: 8 }}>{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    )

    case 'content': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        {data.note && <p className="anim-fade d1" style={{ fontSize: 20, color: data.color === 'highlight' ? C.highlight : data.color === 'accent' ? C.accent : C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</p>}
        <h2 className="anim-fade d2" style={{ fontSize: T.title, fontWeight: 700, color: C.white, lineHeight: 1.15, maxWidth: 900 }}>{data.title}</h2>
        <ul style={{ listStyle: 'none', padding: 0, maxWidth: 900 }}>
          {data.bullets.map((b, i) => (
            <li key={i} className={`anim-fade d${i + 3}`} style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, paddingLeft: 36, position: 'relative', marginBottom: 12 }}>
              <span style={{ position: 'absolute', left: 0, top: 6, width: 10, height: 10, borderRadius: '50%', background: data.color === 'highlight' ? C.highlight : C.accent, opacity: 0.6 }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    )

    case 'diagram': {
      const Comp = DIAGRAMS[data.id]
      return <div style={{ ...inner, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Comp /></div>
    }

    case 'bigstat': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 30 }}>
        <p className="anim-pop d1" style={{ fontSize: 120, fontWeight: 800, color: data.warn ? C.red : C.accent, lineHeight: 1 }}>{data.value}</p>
        <p className="anim-fade d2" style={{ fontSize: T.text, color: 'rgba(255,255,255,0.8)', maxWidth: 700, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{data.label}</p>
        {data.source && <p className="anim-fade d3" style={{ fontSize: T.caption, color: C.dim }}>{data.source}</p>}
      </div>
    )

    case 'quote': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 40 }}>
        {data.source && <p className="anim-fade d1" style={{ fontSize: T.caption, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.source}</p>}
        <p className="anim-fade d2" style={{ fontSize: T.subtitle, color: C.white, fontWeight: 500, lineHeight: 1.6, maxWidth: 800, whiteSpace: 'pre-line' }}>{data.text}</p>
      </div>
    )

    case 'bars': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        {data.note && <p className="anim-fade d1" style={{ fontSize: 20, color: data.warn ? C.red : C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</p>}
        <h2 className="anim-fade d1" style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
          {data.items.map((item, i) => <BarRow key={i} item={item} delay={i} />)}
        </div>
        {data.source && <p className="anim-fade d6" style={{ fontSize: 20, color: C.dim }}>{data.source}</p>}
      </div>
    )

    case 'quiz': {
      const state = quizState[data.idx]
      return (
        <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <p className="anim-fade d1" style={{ fontSize: 20, color: C.highlight, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Pregunta {data.idx + 1} de 10 — ¿Verdadero o falso?</p>
          <p className="anim-fade d2" style={{ fontSize: T.text, color: C.white, lineHeight: 1.6, maxWidth: 900, whiteSpace: 'pre-line', fontWeight: 500 }}>{data.q}</p>
          {state === null ? (
            <div className="anim-fade d3" style={{ display: 'flex', gap: 24, marginTop: 20 }}>
              <button onClick={() => onQuizAnswer(data.idx, true)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.highlight}`, background: 'rgba(34,197,94,0.08)', color: C.highlight, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Verdadero
              </button>
              <button onClick={() => onQuizAnswer(data.idx, false)}
                style={{ padding: '20px 64px', borderRadius: 14, border: `2px solid ${C.red}`, background: 'rgba(239,68,68,0.08)', color: C.red, fontSize: T.bullet, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter', transition: 'all 300ms' }}>
                Falso
              </button>
            </div>
          ) : (
            <div className="anim-fade" style={{ marginTop: 20 }}>
              <p style={{ fontSize: T.bullet, fontWeight: 700, color: state ? C.highlight : C.red, marginBottom: 16 }}>
                {state ? '✓ ¡Correcto!' : '✗ Incorrecto'} — La respuesta es Verdadero
              </p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.6, maxWidth: 800 }}>{data.explanation}</p>
            </div>
          )}
        </div>
      )
    }

    case 'role': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <div className="anim-fade d1" style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <h2 className="anim-fade d1" style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.role}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 8 }}>
          {[
            { label: 'Base', content: data.base },
            { label: 'Upgrade 2026', content: data.upgrade },
            { label: 'Artefactos nuevos', content: data.artifacts },
          ].map((col, i) => (
            <div key={i} className={`anim-pop d${i + 2}`} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
              <p style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, fontWeight: 600 }}>{col.label}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{col.content}</p>
            </div>
          ))}
        </div>
      </div>
    )

    case 'governance': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <div className="anim-fade d1" style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <h2 className="anim-fade d1" style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.model}</h2>
        <p className="anim-fade d2" style={{ fontSize: T.text, color: 'rgba(255,255,255,0.7)' }}>{data.subtitle}</p>
        <div style={{ display: 'flex', gap: 40, marginTop: 16 }}>
          {[
            { label: 'Ventajas', content: data.pros, color: C.highlight },
            { label: 'Riesgos', content: data.cons, color: C.red },
            { label: '¿Cuándo usar?', content: data.when, color: C.accent },
          ].map((col, i) => (
            <div key={i} className={`anim-pop d${i + 3}`} style={{ flex: 1, background: C.surface, borderRadius: 16, padding: 32, border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 20, color: col.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, fontWeight: 600 }}>{col.label}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{col.content}</p>
            </div>
          ))}
        </div>
      </div>
    )

    case 'metrics': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        {data.title && <h2 className="anim-fade d1" style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</h2>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {data.items.map((m, i) => (
            <div key={i} className={`anim-fade d${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 32, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 40px' }}>
              <p style={{ fontSize: T.text, fontWeight: 700, color: C.accent, minWidth: 240 }}>{m.dim}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.8)', flex: 1 }}>{m.metric}</p>
              <p style={{ fontSize: 20, color: C.red, fontWeight: 500 }}>⚠ {m.alert}</p>
            </div>
          ))}
        </div>
      </div>
    )

    case 'case': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <div className="anim-fade d1" style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <h2 className="anim-fade d1" style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.title}</h2>
        <p className="anim-fade d2" style={{ fontSize: T.caption, color: C.dim }}>{data.subtitle}</p>
        <div style={{ display: 'flex', gap: 32, marginTop: 8 }}>
          {data.items.map((item, i) => (
            <div key={i} className={`anim-pop d${i + 2}`} style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: 48, fontWeight: 800, color: data.color, lineHeight: 1 }}>{item.value}</p>
              <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', marginTop: 12 }}>{item.label}</p>
            </div>
          ))}
        </div>
        {data.note && <p className="anim-fade d6" style={{ fontSize: 22, color: C.dim, fontStyle: 'italic' }}>{data.note}</p>}
      </div>
    )

    case 'checklist': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        {data.title && <h2 className="anim-fade d1" style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, marginBottom: 8 }}>{data.title}</h2>}
        {data.items.map((item, i) => (
          <div key={i} className={`anim-fade d${i + 1}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 28, maxWidth: 900 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: C.surface, border: `2px solid ${C.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: C.accent }}>{item.step}</span>
            </div>
            <p style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, whiteSpace: 'pre-line', paddingTop: 8 }}>{item.text}</p>
          </div>
        ))}
      </div>
    )

    case 'bib': return (
      <div style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        <h3 className="anim-fade d1" style={{ fontSize: T.caption, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Referencias</h3>
        {data.entries.map((e, i) => (
          <p key={i} className={`anim-fade d${i + 2}`} style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 1300, borderLeft: `3px solid ${C.border}`, paddingLeft: 20 }}>{e}</p>
        ))}
      </div>
    )

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
  if (!visible || !text) return null
  return (
    <div style={{ position: 'absolute', bottom: 60, left: MARGIN, right: MARGIN, zIndex: 20, display: 'flex', justifyContent: 'center' }}>
      <div className="anim-fade" style={{ background: 'rgba(79,140,255,0.12)', border: `1px solid rgba(79,140,255,0.3)`, borderRadius: 16, padding: '20px 40px', maxWidth: 1200, backdropFilter: 'blur(16px)' }}>
        <p style={{ fontSize: 22, color: C.accent, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 2 }}>Takeaway</p>
        <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
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

        {/* Header: counter + clock */}
        <div style={{ position: 'absolute', top: 20, left: MARGIN, right: MARGIN, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 20, color: C.dim, fontWeight: 500 }}>
            {String(current + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
          <LiveClock />
        </div>

        {/* Slide content */}
        <div key={current} className="slide-enter" style={{ width: 1920, height: 1080 }}>
          <SlideRenderer data={slides[current]} quizState={quizState} onQuizAnswer={(idx, val) => setQuizState(prev => { const n = [...prev]; n[idx] = val; return n })} />
        </div>

        {/* Takeaway overlay */}
        <TakeawayOverlay text={TAKEAWAYS[current]} visible={showTakeaway} />

        {/* Nav arrows */}
        {current > 0 && (
          <button onClick={() => go(-1)} style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, transition: 'all 300ms', zIndex: 10 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = C.white }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = C.dim }}>‹</button>
        )}
        {current < TOTAL - 1 && (
          <button onClick={() => go(1)} style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: 14, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)', color: C.dim, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, transition: 'all 300ms', zIndex: 10 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = C.white }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = C.dim }}>›</button>
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
