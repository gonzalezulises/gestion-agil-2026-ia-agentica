import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ═══════════════════════════════════════════
   DESIGN SYSTEM — 1920×1080 Keynote
   ═══════════════════════════════════════════ */
const C = { bg: '#0B0F14', white: '#FFFFFF', accent: '#811937', highlight: '#22C55E', dim: '#64748B', surface: '#141A23', border: '#1E293B', red: '#EF4444' }
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
  /* 0b agenda */         'Este módulo combina fundamentos ágiles con evidencia de IA en 2026. Al final tendrás herramientas concretas para aplicar el lunes en tu proyecto y tu equipo.',
  /* 0c objectives */     'Las 6 competencias siguen la taxonomía de Bloom: de recordar conceptos (N1) a crear tu propio plan de implementación (N6). Cada bloque del módulo sube un nivel.',
  /* 1  contexto */       'La agilidad no es solo para equipos de software. Cualquier proyecto con incertidumbre — lanzar un producto, abrir una planta, rediseñar logística — se beneficia de ciclos cortos con retroalimentación.',
  /* 2  stats */          '71% ya usa IA, pero solo 17% ve impacto financiero. La diferencia no es la herramienta sino cómo se integra al flujo de trabajo del equipo. Eso aplica igual en calidad, finanzas o comercial.',
  /* 3  evidencia */      'Para un gerente: la IA mejora tareas individuales pero puede empeorar la coordinación. Tu rol cambia de ejecutar a diseñar cómo trabajan personas + IA juntos.',
  /* 3b manufactura */    'Manufactura y alimentos: el mayor impacto ágil está en desarrollo de producto (−55% time-to-market) y eficiencia operacional (+30-40%). Kanban + daily + retro son el punto de entrada más natural.',
  /* 3c farma */          'Farmacéutica: ciclos de desarrollo −40% y costos −25% con equipos cross-funcionales. El backlog regulatorio priorizado por impacto es la práctica más transferible a cualquier industria regulada.',
  /* 3d banca */          'Banca y servicios: productividad +25-35%, quejas −50%. ING pasó de 5-6 entregas/año a cada 2-3 semanas. El caso más documentado de transformación ágil fuera de tecnología.',
  /* 3e construcción */   'Construcción y retail: 3× más probable terminar a tiempo con Lean-Agile. Last Planner + compromisos semanales es el equivalente del daily standup en obra — y funciona.',
  /* 5  section fund */   'Estos principios no son "básicos" en el sentido de triviales — son prerrequisitos estructurales. Sin ellos, la IA no se adopta de forma efectiva, solo de forma caótica.',
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
  /* 15 >80% */           'El dato más incómodo: no es un problema de tecnología sino de liderazgo. Las organizaciones que "delegan sin gobernar" no fallan por la IA, fallan por el vacío de dirección.',
  /* 16 doramodel */      'El modelo DORA demuestra que capabilities técnicas, de proceso y culturales predicen software delivery performance, que a su vez predice resultados organizacionales. Sin mejorar el sistema completo, no hay mejora sostenible.',
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
  /* 30 autonomía */      'La mayoría opera en delegación con revisión. Saltar a autonomía alta sin pasar por acotada es la receta para incidentes de seguridad y compliance.',
  /* 32 section roles */  'En era agéntica no se elimina la accountability — se reubica. La unidad de trabajo cambia de "tareas humanas" a "tareas orquestadas humano-agente".',
  /* 31 PO */             'La accountability del PO no cambia pero su contexto sí: priorizar ya no es solo ordenar el backlog, es decidir qué trabajo se diseña para humanos, cuál para agentes y cuál es híbrido.',
  /* 32 SM */             'El Scrum Master como líder servidor cobra nueva dimensión: "servir" ahora incluye proteger al equipo de la sobreconfianza en outputs de IA y de la presión por adoptar sin evaluar.',
  /* 33 Devs */           'El Developer como "profesional" incluye juzgar cuándo el código generado por IA cumple el Definition of Done. La calidad no se delega — se verifica.',
  /* 34 section adopt */  'Stack Overflow 2024: 62% de devs ya usa IA. Pero uso ≠ valor enterprise. La trampa del "tool rollout" es confundir distribución de licencias con transformación.',
  /* 35 bars adopción */  'De 65% a 71% en un año no es gradual — es aceleración. Pero 88% usando IA en ≥1 función con >80% sin impacto EBIT significa que la brecha adopción-valor se está ampliando, no cerrando.',
  /* 36 lo que sube */    'La heterogeneidad importa: la mayor ganancia es en perfiles menos expertos (+34% novatos en contact center). Para expertos el efecto puede ser negativo (METR). No hay "efecto uniforme".',
  /* 37 METR */           'La brecha percepción-realidad es el riesgo de liderazgo más subestimado: si mides solo percepción de productividad, tu equipo puede estar destruyendo valor creyendo que lo crea.',
  /* 38 nota metod */     'No hay efecto uniforme. La variabilidad explica por qué coexisten +55% más rápido (lab) y +19% más lento (experto). Decisión: medir en tu contexto, no copiar benchmarks.',
  /* 39 DORA mejoras */   'Estas mejoras son "locales" — ocurren a nivel de tarea individual. El error es asumir que sumarlas produce mejora sistémica. DORA demuestra que no es así.',
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
  /* 53b gov questions */  'Si nadie en tu organización puede responder estas tres preguntas, la gobernanza de IA no existe — solo hay improvisación.',
  /* 54 centralizado */   'El trade-off real: en industrias reguladas, el costo de un incidente de IA (fuga de datos, sesgo en decisiones) supera con creces el costo de un cuello de botella por aprobación.',
  /* 55 federado */       'El riesgo de "shadow AI" no es teórico: equipos usando herramientas no autorizadas con datos sensibles ya es realidad en la mayoría de enterprises. El modelo federado lo contiene sin asfixiar.',
  /* 56 product-align */  'Este modelo solo funciona si ya tienes telemetría madura. Sin datos de impacto, "product-aligned governance" es solo un nombre bonito para "nadie gobierna".',
  /* 57 centralizar */    'La distinción es operacional: los equipos deciden cómo usar herramientas, pero el liderazgo centraliza políticas, evaluación e incidentes. Sin esto, "shadow AI" es inevitable.',
  /* 58 GMV */            'Estos 4 componentes son operables en 90 días. La gobernanza mínima viable no es burocracia — es el mínimo para que la adopción de IA no sea un riesgo sistémico.',
  /* 59 section metr */   'El tablero mínimo viable evita "local wins / system losses". Medir solo productividad individual es como medir solo goles sin ver el resultado del partido.',
  /* 58 metrics 1 */      'Lead time y estabilidad son las métricas que más rápido delatan la deuda oculta por IA. Si "más commits" no se traduce en más throughput, hay retrabajo invisible.',
  /* 59 metrics 2 */      'METR demostró que la percepción de productividad puede ser opuesta a la realidad (creen +20%, medido −19%). Sin ROI medido, estás en terreno de autoengaño organizacional.',
  /* 60 section casos */  'Nota metodológica: los efectos varían por especificidad de tarea, experiencia del profesional, madurez del repo y controles de calidad. Esto explica resultados contradictorios.',
  /* 61 copilot */        'La clave de Accenture no es Copilot — es que tenían telemetría y prácticas de revisión. Sin esos controles, el mismo tool produce "deuda acelerada" (coherente con DORA).',
  /* 62 klarna */         'Caveat: métricas de "equivalente FTE" dependen de supuestos internos. Para replicar, exige método de cálculo interno. Los "best case" deben auditarse, no copiarse.',
  /* 63 escritura */      'Transferencia directa a roles ágiles: PO para PRDs y criterios, SM para minutas y riesgos, liderazgo para síntesis ejecutiva. El mayor ROI está en la escritura estructurada.',
  /* 63b monday */         'Elige un proyecto real, arma un equipo pequeño, define un ciclo corto y mide. No necesitas permiso para empezar — necesitas un entregable concreto y una retrospectiva honesta.',
  /* 63c tools */          'Kanban, retrospectivas, dailies y backlogs ya no requieren expertise — la IA democratiza estas prácticas. La ventaja competitiva pasa de "saber la herramienta" a "aplicarla con criterio en tu contexto".',
  /* 64 section impl */   'PMI Sweden: 64% recomienda iniciar pequeño y escalar gradualmente. El ciclo empírico aplica a la propia adopción de IA: experimentar, medir, ajustar.',
  /* 65 checklist 1 */    'Antes de comprar herramientas: ¿hay liderazgo protector? ¿Equipos multifuncionales reales? ¿Cadencias de inspección? Sin esto, la IA amplifica la disfunción existente.',
  /* 66 checklist 2 */    'EU AI Act entra en vigor progresivamente 2025-2027. Definir guardrails ahora no es anticipación — es cumplimiento. Las obligaciones para GPAI aplican desde agosto 2025.',
  /* 67 cierre */         'Mensaje final: la IA agéntica amplifica lo que ya tienen. Si invierten en fundamentos antes que en herramientas, cada dólar en IA rinde exponencialmente más.',
  /* 68 bibfull */        '19 fuentes verificables. Cada dato tiene trazabilidad a su fuente primaria para validarlo con tu equipo.',
  /* 68b recursos */      'Estos recursos están seleccionados para project managers que quieren profundizar. No necesitas leerlos todos — elige uno por categoría y empieza.',
  /* 69 end */            '',
]

/* ═══════════════════════════════════════════
   SLIDE DATA
   ═══════════════════════════════════════════ */
const slides = [

  // ── 0: TITLE ──
  { type: 'hero' },

  // ── 1: AGENDA ──
  { type: 'agenda' },

  // ── 2: OBJETIVO + COMPETENCIAS BLOOM ──
  { type: 'objectives' },

  // ── 3: CONTEXTO NARRATIVO — conectado con el grupo ──
  { type: 'content', title: '¿Qué tiene que ver la agilidad con nosotros?', bullets: [
    'Alimentos, farma, banca, retail, construcción —\ntodos gestionan proyectos con incertidumbre creciente',
    'La IA ya está en sus procesos: reportes, análisis,\nplanificación — aunque no la llamen "agente"',
    'El reto no es adoptar un marco (Scrum, Kanban)\nsino mejorar cómo entregan resultados sus equipos',
    'Solo 21% ha rediseñado cómo trabaja (McKinsey 2025)\n— el resto insertó herramientas en procesos viejos',
  ], note: 'El contexto para logística, finanzas, calidad, RRHH, comercial y marketing' },

  // ── 3: CONTEXTO DATOS — con lectura para gerentes ──
  { type: 'stats', title: 'Lo que dicen los datos — y qué significa para tu empresa', items: [
    { value: '71%', label: 'ya usa genAI regularmente — incluye finanzas, RRHH, marketing', source: 'McKinsey 2025' },
    { value: '62%', label: 'experimenta con asistentes IA — no solo tecnología', source: 'McKinsey 2025' },
    { value: '17%', label: 'logra impacto financiero real — el resto está en "piloto eterno"', source: 'McKinsey 2025' },
    { value: '82%', label: 'de líderes dice: hay que replantear cómo operamos', source: 'Microsoft WTI 2025' },
  ]},

  // ── 4: CONTEXTO EVIDENCIA — traducido para no-tech ──
  { type: 'content', title: 'Lo que la evidencia le dice a un gerente', bullets: [
    'IA mejora tareas individuales (reportes, análisis)\npero puede empeorar la coordinación del equipo (−7.2% estabilidad)',
    '39% no confía en los resultados que genera la IA\n— sin revisión, los errores se multiplican',
    'En 2026, la IA ejecutará tareas rutinarias en todas las áreas:\nno solo en tecnología sino en operaciones, compras, calidad',
    'El rol del gerente cambia: de ejecutar a diseñar\ncómo trabajan las personas junto con la IA',
  ], note: 'Traducción para quien lidera equipos en manufactura, servicios o banca', color: 'accent' },

  // ── 5-8: OPORTUNIDAD ÁGIL POR SECTOR — 1 slide por sector ──
  { type: 'agileBySector', sectorIndex: 0 },
  { type: 'agileBySector', sectorIndex: 1 },
  { type: 'agileBySector', sectorIndex: 2 },
  { type: 'agileBySector', sectorIndex: 3 },

  // ── SECTION: FUNDAMENTOS ──
  { type: 'section', title: 'Fundamentos ágiles', subtitle: 'La base que no cambia' },

  // ── OVERVIEW: 5 FUNDAMENTOS ──
  { type: 'overview' },

  // ── CICLO EMPÍRICO ──
  { type: 'content', title: 'El ciclo empírico', bullets: [
    'Retroalimentación frecuente',
    'Inspección de resultados',
    'Adaptación basada en evidencia',
    'Ejemplo: inspeccionar cada 2 semanas cuesta menos\nque descubrir el problema al final del trimestre',
  ], note: 'Fundamento 1' },

  { type: 'diagram', id: 'cycle' },

  { type: 'content', title: '¿Qué pasa sin inspección?', bullets: [
    'Los errores de IA se propagan sin freno',
    '39% tiene poca o nula confianza en resultados de IA (DORA)',
    'Si se ignora: más defectos. Si se atiende sin proceso: más fricción',
    'Los errores y reprocesos se acumulan más rápido',
  ], note: 'Conexión agéntica', color: 'accent' },

  // ── CUÁNDO SÍ / CUÁNDO NO ──
  { type: 'content', title: '¿Cuándo es esencial la agilidad?', bullets: [
    'Grandes brechas de satisfacción del cliente',
    'Necesidades cambiando rápidamente',
    'Capacidad de iterar genera ventaja directa',
    '¿Lanzas producto nuevo y no sabes qué quiere\nel cliente? Necesitas iteración ágil',
  ], note: 'Fundamento 2' },

  { type: 'content', title: '¿Cuándo no es necesaria?', bullets: [
    'Brechas pequeñas y necesidades estables',
    'Procesos predecibles satisfacen mejor',
    'En 2026: ¡la automatización directa es opción!',
    '¿Tu despacho logístico funciona bien? Optimízalo,\nno lo "agilices". ¿Mismo reporte mensual? Automatiza',
  ], color: 'highlight' },

  { type: 'diagram', id: 'triangle' },

  // ── LIDERAZGO (EMPHASIS) ──
  { type: 'section', title: 'Liderazgo ágil', subtitle: 'Proteger, habilitar, soltar', emphasis: true },

  { type: 'content', title: 'Proteger', bullets: [
    'Blindar de interferencia burocrática',
    'Eliminar deadlines arbitrarios',
    'Establecer políticas claras sobre herramientas IA',
    'Como gerente, TÚ eres el liderazgo protector —\nno solo el CEO',
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

  { type: 'bigstat', value: '>80%', label: 'sin gobierno ejecutivo visible\nno logra retorno tangible de genAI', source: 'McKinsey 2025' },

  { type: 'doramodel' },

  // ── EQUIPOS ──
  { type: 'content', title: 'Equipos multifuncionales', bullets: [
    'Composición dinámica según la etapa',
    'Calidad, producción, mercadeo y logística juntos',
    'Si no trabajan juntos desde el inicio:\nretrabajo y retrasos',
    'Evaluar resultados por impacto en el cliente',
  ], note: 'Fundamento 4' },

  { type: 'content', title: 'Centrado en el usuario, siempre', bullets: [
    'La multifuncionalidad evita silos',
    'Decisiones conectadas al usuario final',
    'Una herramienta 5x más rápida que degrada\nla satisfacción del cliente ¡destruye valor!',
  ], color: 'accent' },

  // ── DELIVERY MANAGER ──
  { type: 'content', title: 'El líder de proceso', bullets: [
    'Cadencias de trabajo y eliminación de impedimentos',
    'Colaboración entre disciplinas',
    'Acceso a recursos, datos y herramientas',
  ], note: 'Fundamento 5 — Este rol puede ser tuyo' },

  { type: 'content', title: 'Líder de proceso en 2026', bullets: [
    'Integración gobernada de IA',
    'Entrenamiento en validación de resultados',
    'Prácticas de revisión de entregables generados por IA',
    'Si no configura revisión, ¡la inspección no ocurre!',
  ], note: 'Extensión agéntica', color: 'highlight' },

  // ── QUIZ 1 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Fundamentos ágiles', quiz: true },
  { type: 'quiz', idx: 0, q: 'El objetivo principal de la agilidad es\nofrecer mejores resultados mediante\nretroalimentación frecuente, inspección\ny adaptación.', explanation: 'En manufactura: inspección de calidad en línea vs.\nal final del lote. Cuanto antes detectes, menos cuesta.' },
  { type: 'quiz', idx: 1, q: 'El liderazgo debe proteger a los equipos\nágiles de ser arrastrados a viejas formas\nde trabajo y transferir poder a los equipos.', explanation: 'Transferir poder no es perder control. El equipo\ndecide el CÓMO; tú defines el QUÉ y el PARA QUÉ.' },
  { type: 'quiz', idx: 2, q: 'Las transformaciones ágiles fracasan\ncuando no cuentan con apoyo ejecutivo\no de mandos medios.', explanation: 'Si tu gerente general no protege el tiempo del equipo\nde las urgencias diarias, el proyecto siempre pierde.' },
  { type: 'quiz', idx: 3, q: 'La agilidad es esencial cuando existen\ngrandes brechas de satisfacción\no necesidades cambiando rápidamente.', explanation: 'Piensa en tu sector: ¿clientes satisfechos y estables,\no cambiando lo que necesitan? Eso define tu enfoque.' },
  { type: 'quiz', idx: 4, q: 'Los procesos estables satisfacen mejor\ncuando las brechas son pequeñas\ny las necesidades son estables.', explanation: 'Tu nómina funciona con estabilidad. Un lanzamiento\nnuevo necesita iteración. No fuerces agilidad donde no aporta.' },

  // ── ERA AGÉNTICA ──
  { type: 'section', title: 'Era agéntica', subtitle: 'Lo que cambia en 2026' },

  { type: 'content', title: '¿Qué es un agente?', bullets: [
    'Asistente: le preguntas, te responde (ChatGPT)',
    'Agente: le asignas tarea, la ejecuta completa',
    'Riesgo: que ejecute cosas que nadie le pidió,\ncon datos que no debía tocar',
  ], note: 'No necesitas ser empresa tech para que esto te afecte' },

  { type: 'diagram', id: 'agentic' },

  // ── NIVELES DE AUTONOMÍA ──
  { type: 'autonomy' },

  // ── SCRUM ROLES (EMPHASIS) ──
  { type: 'section', title: 'Roles ágiles', subtitle: '¿Quién hace qué?', emphasis: true },

  { type: 'content', title: 'Responsable de prioridades', bullets: [
    'Maximizar el valor del producto o servicio',
    'Gestionar la lista priorizada de trabajo',
    'Comunicar el objetivo a todo el equipo',
    'En tu organización: gerente de proyecto,\ngerente de producto, quien decide QUÉ se hace',
  ], color: 'accent' },

  { type: 'content', title: 'Facilitador del equipo', bullets: [
    'Lograr que el equipo sea efectivo',
    'Líder servidor — facilita, no manda',
    'Coach en autogestión y colaboración',
    'En tu organización: líder de proceso,\njefe de proyecto, quien configura CÓMO trabaja el equipo',
  ], color: 'highlight' },

  { type: 'content', title: 'Equipo de ejecución', bullets: [
    'Crear un resultado utilizable cada ciclo',
    'Planificar el ciclo y cuidar la calidad',
    'Adaptar el plan según lo aprendido',
    'En tu organización: analistas, técnicos,\noperadores — quienes ejecutan el trabajo',
  ], color: 'accent' },

  // ── ADOPCIÓN IA ──
  { type: 'section', title: 'Adopción de IA en proyectos', subtitle: 'Datos y evidencia' },

  { type: 'bars', title: 'Curva de adopción', items: [
    { label: 'Uso regular genAI (2024)', value: 65, color: C.highlight },
    { label: 'Uso regular genAI (2025)', value: 71, color: C.highlight },
    { label: 'IA en ≥1 función (Nov 2025)', value: 88, color: C.accent },
    { label: 'Experimenta con agentes (39% + 23% escala)', value: 62, color: C.accent },
  ], source: 'McKinsey 2024–2025', note: 'Datos globales — en LatAm: mayor oportunidad para quienes adopten con criterio' },

  // ── PRODUCTIVIDAD ──
  { type: 'content', title: '¿Qué mejora con IA?', bullets: [
    'Tareas técnicas repetitivas (lab): +55.8% más rápido',
    'Escritura: −40% tiempo, +18% calidad',
    'Equipos de atención (personal nuevo): +34% productividad',
    'Entregables aprobados a la primera: +84%',
  ], note: 'Evidencia positiva', color: 'highlight' },

  { type: 'bigstat', value: '+19%', label: 'más lento para profesionales expertos\ncon IA (METR RCT 2025)', source: 'Creían ser ~20% más rápidos.\nPara cualquier gerente: si no mides, te autoengañas', warn: true },

  { type: 'content', title: '¿Por qué resultados contradictorios?', bullets: [
    'Varía por especificidad de la tarea',
    'Varía por experiencia del profesional',
    'Varía por madurez del repositorio/proceso',
    'Varía por controles de calidad y contexto',
    'No existe un "efecto uniforme" de la IA',
  ], note: 'Nota metodológica' },

  { type: 'bars', title: 'DORA: mejoras locales', items: [
    { label: 'Calidad de documentación', value: 7.5, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Calidad de entregables', value: 3.4, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Velocidad de revisión y aprobación', value: 3.1, max: 12, color: C.highlight, suffix: '%' },
    { label: 'Flow individual', value: 2.6, max: 12, color: C.accent, suffix: '%' },
  ], source: 'DORA 2024 — por +25% adopción IA', note: 'Lo que sube' },

  { type: 'bars', title: 'DORA: pérdidas sistémicas', items: [
    { label: 'Ritmo de entrega completa', value: 1.5, max: 10, color: C.red, suffix: '%', prefix: '−' },
    { label: 'Estabilidad operativa', value: 7.2, max: 10, color: C.red, suffix: '%', prefix: '−' },
  ], source: 'DORA 2024 — por +25% adopción IA', note: 'Lo que baja', warn: true },

  // ── VACUUM ──
  { type: 'quote', text: 'Si la IA acelera tareas valiosas,\nse crea un "vacío de tiempo".\nSin rediseño, ese vacío\nse rellena con burocracia.\n\nEl tiempo en trabajo valioso\ncae −2.6% aun subiendo productividad.', source: 'El "Vacuum Effect"' },

  // ── SISTEMA E2E ──
  { type: 'diagram', id: 'system' },

  // ── ROLES REDEFINIDOS (EMPHASIS) ──
  { type: 'section', title: 'Roles redefinidos', subtitle: 'De "hacer" a "dirigir y verificar"', emphasis: true },

  { type: 'role', role: 'Resp. de prioridades', base: 'Maximizar valor;\ngestionar lista de trabajo', upgrade: 'Diseñar valor + límites:\ndecidir qué se delega a IA\ny con qué controles', artifacts: 'Políticas de uso,\ncriterios de calidad verificables', color: C.accent },

  { type: 'role', role: 'Facilitador / Líder de proceso', base: 'Configurar cómo trabaja\nel equipo; lograr efectividad;\neliminar obstáculos', upgrade: 'Arquitecto de flujo:\nentrenar uso/validación de IA,\nbajar fricción, proteger foco', artifacts: 'Guías de uso, checklists,\nmétricas de satisfacción del equipo', color: C.highlight },

  { type: 'role', role: 'Equipo de ejecución', base: 'Entregar resultados;\ncuidar calidad;\nplanificar el ciclo', upgrade: 'Ejecutor + evaluador:\nusar IA como herramienta, revisar,\nasegurar calidad de resultados', artifacts: 'Checklists de calidad,\nrevisión de resultados IA', color: C.accent },

  { type: 'role', role: 'Líderes / Gerentes', base: 'Crear condiciones;\nproteger equipos;\ntransferir poder', upgrade: 'Director del sistema:\nproporción automatización vs. humano,\ncentralización vs. autonomía', artifacts: 'Modelo de gobernanza,\nmétricas de retorno, controles', color: C.highlight },

  // ── QUIZ 2 ──
  { type: 'section', title: 'Autocomprobación', subtitle: 'Roles y liderazgo', quiz: true },
  { type: 'quiz', idx: 5, q: 'Los líderes ágiles necesitan\ncrear espacio para que todos\ncontribuyan — diferentes equipos,\ndiferentes caminos.', explanation: 'Tu equipo de logística no trabajará igual que el de\nmercadeo. Y eso está bien. No impongas proceso único.' },
  { type: 'quiz', idx: 6, q: 'Confiar en la inteligencia ascendente\ncambia el papel de los gerentes.\nCrean condiciones y dan paso atrás.', explanation: 'Tu valor como gerente: crear condiciones, no tomar\ntodas las decisiones. Incluye decidir qué se automatiza.' },
  { type: 'quiz', idx: 7, q: 'El tamaño del equipo y los roles\ncambiarán según la etapa\nde desarrollo del servicio.', explanation: 'Al inicio necesitas gente creativa explorando.\nAl final necesitas gente rigurosa ejecutando.' },
  { type: 'quiz', idx: 8, q: 'Todo el equipo debe trabajar junto\npara diseñar, construir e iterar\nun servicio centrado en el usuario.', explanation: 'En lanzamiento de producto alimenticio: si calidad,\nproducción y logística no van juntos, hay retrabajo.' },
  { type: 'quiz', idx: 9, q: 'El delivery manager configura\nel entorno ágil que su equipo\nnecesita para iterar.', explanation: 'Este rol puede ser tuyo. Si configuras las condiciones\nde trabajo de tu equipo, ya lo estás haciendo.' },

  // ── GOBERNANZA ──
  { type: 'section', title: 'Gobernanza', subtitle: 'Modelos operativos' },

  { type: 'content', title: '3 preguntas antes de elegir modelo', bullets: [
    '¿Quién en tu empresa decide qué herramientas de IA se pueden usar?',
    '¿Hay una política sobre qué datos puedes compartir con ChatGPT?',
    '¿Quién es responsable si una decisión basada en IA sale mal?',
    'Si no sabes la respuesta, necesitas gobernanza',
  ], note: 'Reflexión', color: 'accent' },

  { type: 'governance', model: 'Centralizado', subtitle: 'Comité central de IA', pros: 'Consistencia, control, cumplimiento', cons: 'Cuellos de botella, lentitud', when: 'Industrias reguladas, riesgo alto', color: C.accent },

  { type: 'governance', model: 'Federado', subtitle: 'Centro define; unidades ejecutan', pros: 'Balance entre velocidad y control', cons: 'Inconsistencia, uso no autorizado de IA', when: 'Empresas multi-unidad por productos', color: C.highlight },

  { type: 'governance', model: 'Integrado al negocio', subtitle: 'Gobernanza en el flujo del negocio', pros: 'Conecta IA con outcomes', cons: 'Requiere madurez de medición', when: 'Agile escalado con telemetría', color: C.accent },

  // ── QUÉ CENTRALIZAR ──
  { type: 'content', title: '¿Qué centralizar?', bullets: [
    'No centralices el uso de herramientas',
    'Sí centraliza: políticas de datos, IP y seguridad',
    'Sí centraliza: evaluación y métricas',
    'Sí centraliza: gestión de incidentes con IA',
    'Solo 18% tenía council con autoridad para IA responsable',
  ], note: 'McKinsey 2024', color: 'accent' },

  // ── GOBERNANZA MÍNIMA VIABLE ──
  { type: 'checklist', title: 'Gobernanza mínima viable (90 días)', items: [
    { step: 1, text: 'Política de datos:\nqué información puede entrar a herramientas IA,\nqué se prohíbe' },
    { step: 2, text: 'Controles de calidad:\nrevisión humana obligatoria en decisiones\nde alto impacto' },
    { step: 3, text: 'Sistema de medición:\nresultados + calidad + retorno + riesgo,\ncadencia mensual' },
    { step: 4, text: 'Responsabilidades claras:\nquién responde si la IA introduce errores\no problemas' },
  ]},

  // ── MÉTRICAS ──
  { type: 'section', title: 'Métricas', subtitle: 'Tablero mínimo viable' },

  { type: 'metrics', title: 'Dimensiones sistémicas', items: [
    { dim: 'Velocidad E2E', metric: 'Tiempo desde aprobación hasta entrega final', alert: 'Baja con "más tareas"' },
    { dim: 'Estabilidad', metric: '% de cambios que generan retrabajo', alert: 'Cae con IA (−7.2%)' },
    { dim: 'Calidad', metric: '% de entregables aprobados a la primera', alert: 'Volumen sube, calidad baja' },
  ]},

  { type: 'metrics', title: 'Dimensiones de impacto', items: [
    { dim: 'Productividad', metric: 'Qué tan fluido trabaja el equipo', alert: 'Percepción ≠ realidad' },
    { dim: 'ROI', metric: '¿Cuánto dinero genera o ahorra esto?', alert: '>80% sin impacto real' },
    { dim: 'Riesgo', metric: 'Problemas causados por herramientas IA', alert: 'Privacidad, datos, sesgo' },
  ]},

  // ── CASOS ──
  { type: 'section', title: 'Casos cuantificados', subtitle: 'Evidencia real' },

  { type: 'case', title: 'Copilot + Accenture', subtitle: 'Experimento controlado en empresa global', items: [
    { label: 'Entregables completados', value: '+8.69%' },
    { label: 'Aprobados a la primera', value: '+15%' },
    { label: 'Ejecuciones sin reproceso', value: '+84%' },
    { label: 'Aceptación sugerencias', value: '30%' },
    { label: 'Satisfacción', value: '90%' },
    { label: 'Disfruta más', value: '95%' },
  ], color: C.highlight },

  { type: 'case', title: 'Klarna', subtitle: 'Atención al cliente con IA', items: [
    { label: 'Consultas atendidas', value: '2.3M' },
    { label: 'Equivalente personas', value: '700' },
    { label: 'Resolución', value: '<2 min vs 11' },
    { label: '−Casos repetidos', value: '25%' },
    { label: 'Ingreso/empleado', value: '+73%' },
    { label: 'Ganancia', value: '+$40M' },
  ], color: C.accent },

  { type: 'case', title: 'Escritura profesional', subtitle: 'Reportes, minutas, propuestas — aplica desde el lunes', items: [
    { label: 'Tiempo', value: '−40%' },
    { label: 'Calidad', value: '+18%' },
  ], note: 'Reportes, minutas, propuestas, comunicaciones a stakeholders', color: C.highlight },

  // ── ¿Y YO QUÉ HAGO EL LUNES? ──
  { type: 'monday' },

  { type: 'toolsBySector' },

  // ── CHECKLIST ──
  { type: 'section', title: 'Implementación', subtitle: 'Checklist de 30 días' },

  { type: 'checklist', title: 'Primeros pasos', items: [
    { step: 1, text: '¿Tienes equipo con objetivos claros, un líder\nque protege su tiempo, y revisión quincenal\nde qué funcionó? Empieza por ahí' },
    { step: 2, text: 'Medir baseline:\nresultados actuales + satisfacción del equipo' },
    { step: 3, text: 'Definir guardrails:\ndatos, IP, seguridad' },
  ]},

  { type: 'checklist', title: 'Escalar con evidencia', items: [
    { step: 4, text: 'Empezar con 1–2 workflows.\n64% recomienda iniciar pequeño.' },
    { step: 5, text: 'Iterar con evidencia.\nRevisar en 30 días con datos.' },
  ]},

  // ── CLOSING QUOTE ──
  { type: 'quote', text: 'La IA agéntica amplifica\nlo que ya tienen.\nSi los fundamentos son sólidos,\namplifica valor.\nSi son frágiles,\namplifica disfunción.', source: '' },

  // ── BIBLIOGRAPHY (single slide, 2 columns) ──
  { type: 'bibfull', entries: [
    'DORA / Google Cloud. "Accelerate State of DevOps Report 2024". 2024.',
    'DORA. "Impact of Generative AI in Software Development". 2025.',
    'McKinsey. "The state of AI in early 2024". Global Survey, 2024.',
    'McKinsey. "How organizations are rewiring to capture value". 2025.',
    'McKinsey. "The state of AI in 2025: Agents, innovation". 2025.',
    'Gartner. "40% of Enterprise Apps Will Have AI Agents by 2026". 2025.',
    'Microsoft. "Work Trend Index 2025: The Frontier Firm". 2025.',
    'Schwaber & Sutherland. "La Guía de Scrum 2020". Scrum.org.',
    'NIST. "AI Risk Management Framework 1.0". 2023.',
    'OWASP. "Top 10 for LLM Applications". 2024.',
    'Noy & Zhang. "Productivity effects of generative AI". Science, 2023.',
    'Brynjolfsson et al. "Generative AI at Work". NBER, 2023.',
    'Peng et al. "Impact of AI on Developer Productivity". arXiv, 2023.',
    'METR. "AI Assistance on Open-Source Developers". RCT, 2025.',
    'OpenAI. "Klarna: AI Assistant Case Study". 2024.',
    'PMI Sweden. "Navigating AI in Project Management". 2024.',
    'EU. "AI Act (Regulation 2024/1689)". 2024.',
    'GitHub + Accenture. "Copilot impact on code quality". 2024.',
    'Stack Overflow. "Developer Survey 2024". 2024.',
  ]},

  // ── RECURSOS RECOMENDADOS ──
  { type: 'resources' },

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
    { label: 'Discovery', x: 20 }, { label: 'Priorización', x: 170 }, { label: 'Ejecución', x: 320 },
    { label: 'Verificación', x: 470 }, { label: 'Entrega', x: 620 }, { label: 'Seguimiento', x: 770 },
  ]
  const agents = [
    { label: 'IA: Borradores', x: 170 }, { label: 'IA: Ejecución', x: 320 },
    { label: 'IA: Verificación', x: 470 }, { label: 'IA: Análisis', x: 770 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      <p style={{ fontSize: T.subtitle, fontWeight: 600, color: C.white }}>Sistema ágil end-to-end con IA</p>
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

function DORAModelDiagram() {
  const [focused, setFocused] = useState(null)
  const toggle = (id) => setFocused(prev => prev === id ? null : id)
  const dimmed = (id) => focused !== null && focused !== id

  const capGroups = [
    { label: 'Técnicas', color: C.accent, items: ['CI/CD', 'Trunk-based dev', 'Arquitectura desacoplada', 'Automatización de tests', 'Monitoreo y observabilidad', 'Calidad de documentación'], detail: 'Las prácticas técnicas son la base. Sin integración continua, sin pruebas automatizadas y sin monitoreo, cualquier mejora es frágil. Son el "cómo se construye".' },
    { label: 'Proceso', color: C.highlight, items: ['Trabajo en lotes pequeños', 'Feedback de clientes', 'Visibilidad del trabajo', 'Límites de WIP'], detail: 'Trabajar en lotes pequeños permite detectar errores antes. La visibilidad y los límites de trabajo en proceso evitan la sobrecarga que mata la calidad.' },
    { label: 'Culturales', color: '#A855F7', items: ['Cultura Westrum', 'Liderazgo transformacional', 'Clima de aprendizaje'], detail: 'La cultura determina si la gente reporta problemas o los oculta. Sin seguridad psicológica y liderazgo que proteja, las capabilities técnicas no se sostienen.' },
  ]
  const metrics = [
    { label: 'Deployment\nFrequency', sub: 'Velocidad', color: C.accent, detail: 'Frecuencia de entrega: ¿cada cuánto tiempo tu equipo entrega algo terminado al cliente? Los mejores equipos entregan bajo demanda; los peores, cada varios meses.' },
    { label: 'Lead Time\nfor Changes', sub: 'Velocidad', color: C.accent, detail: 'Tiempo de ciclo: desde que se aprueba un cambio hasta que está en manos del cliente. Mide la agilidad real de tu sistema de entrega.' },
    { label: 'Change\nFailure Rate', sub: 'Estabilidad', color: '#F59E0B', detail: '% de cambios que generan retrabajo o problemas. Con IA, este indicador cae −7.2% — se entrega más rápido pero con más errores.' },
    { label: 'Time to\nRestore', sub: 'Estabilidad', color: '#F59E0B', detail: 'Tiempo de recuperación: cuando algo falla, ¿cuánto tardas en resolverlo? Es la medida de resiliencia de tu equipo.' },
  ]
  const outcomes = [
    { label: 'Rendimiento\norganizacional', sub: 'Rentabilidad, productividad', color: C.highlight, detail: 'Los equipos con mejor delivery performance logran mayor rentabilidad, productividad y cuota de mercado. DORA lo ha comprobado en 10 años de investigación.' },
    { label: 'Bienestar', sub: 'Menos burnout', color: '#A855F7', detail: 'Equipos con buenas prácticas sufren menos burnout y menor dolor en los despliegues. La calidad del sistema de trabajo afecta directamente a las personas.' },
  ]

  const reliabilityDetail = 'La confiabilidad conecta delivery con operaciones. No basta entregar rápido — el servicio debe funcionar de forma consistente para el usuario final.'

  return (
    <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }} initial="hidden" animate="visible"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          style={{ fontSize: 40, fontWeight: 700, color: C.white }}>DORA Core Model</motion.p>
        {focused && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 16, color: C.dim, cursor: 'pointer' }} onClick={() => setFocused(null)}>✕ cerrar zoom</motion.span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 1680, position: 'relative' }}>

        {/* ── CAPABILITIES ── */}
        <motion.div
          animate={{ opacity: dimmed('caps') ? 0.2 : 1, scale: focused === 'caps' ? 1.15 : 1, zIndex: focused === 'caps' ? 10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => toggle('caps')}
          style={{ flex: '0 0 420px', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', position: 'relative' }}>
          <p style={{ fontSize: 14, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, textAlign: 'center', marginBottom: 4 }}>Capabilities</p>
          {capGroups.map((g, gi) => (
            <div key={gi} style={{ background: focused === 'caps' ? '#1a2233' : C.surface, border: `1px solid ${focused === 'caps' ? g.color + '60' : C.border}`, borderRadius: 12, padding: '12px 16px', borderLeft: `3px solid ${g.color}`, transition: 'all 300ms' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: g.color, marginBottom: 6 }}>{g.label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {g.items.map((item, i) => (
                  <span key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '3px 8px' }}>{item}</span>
                ))}
              </div>
              <AnimatePresence>
                {focused === 'caps' && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8, lineHeight: 1.5, borderTop: `1px solid ${g.color}30`, paddingTop: 8 }}>{g.detail}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* ── ARROW 1 ── */}
        <motion.div animate={{ opacity: focused ? 0.15 : 1 }} transition={{ duration: 0.3 }}
          style={{ flex: '0 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="80" height="40" viewBox="0 0 80 40">
            <defs><marker id="dora-a1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.accent} /></marker></defs>
            <line x1="0" y1="20" x2="68" y2="20" stroke={C.accent} strokeWidth="2" markerEnd="url(#dora-a1)" />
          </svg>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 500 }}>impulsan</span>
        </motion.div>

        {/* ── SOFTWARE DELIVERY PERFORMANCE ── */}
        <motion.div
          animate={{ opacity: dimmed('perf') ? 0.2 : 1, scale: focused === 'perf' ? 1.18 : 1, zIndex: focused === 'perf' ? 10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => toggle('perf')}
          style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
          <p style={{ fontSize: 14, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, textAlign: 'center' }}>Software Delivery Performance</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ background: focused === 'perf' ? '#1a2233' : C.surface, border: `1px solid ${focused === 'perf' ? m.color + '60' : C.border}`, borderRadius: 12, padding: '16px 14px', textAlign: 'center', transition: 'all 300ms' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: m.color, whiteSpace: 'pre-line', lineHeight: 1.25 }}>{m.label}</p>
                <p style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>{m.sub}</p>
                <AnimatePresence>
                  {focused === 'perf' && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 8, lineHeight: 1.5, borderTop: `1px solid ${m.color}30`, paddingTop: 6, textAlign: 'left' }}>{m.detail}</motion.p>}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div style={{ background: focused === 'perf' ? '#1a2233' : C.surface, border: `1px solid ${focused === 'perf' ? C.highlight + '60' : C.border}`, borderRadius: 12, padding: '10px 24px', textAlign: 'center', width: '100%', transition: 'all 300ms' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.highlight }}>Reliability</p>
            <p style={{ fontSize: 11, color: C.dim }}>Operational Performance</p>
            <AnimatePresence>
              {focused === 'perf' && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 1.5, borderTop: `1px solid ${C.highlight}30`, paddingTop: 6 }}>{reliabilityDetail}</motion.p>}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── ARROW 2 ── */}
        <motion.div animate={{ opacity: focused ? 0.15 : 1 }} transition={{ duration: 0.3 }}
          style={{ flex: '0 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="80" height="40" viewBox="0 0 80 40">
            <defs><marker id="dora-a2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill={C.highlight} /></marker></defs>
            <line x1="0" y1="20" x2="68" y2="20" stroke={C.highlight} strokeWidth="2" markerEnd="url(#dora-a2)" />
          </svg>
          <span style={{ fontSize: 11, color: C.dim, fontWeight: 500 }}>predicen</span>
        </motion.div>

        {/* ── OUTCOMES ── */}
        <motion.div
          animate={{ opacity: dimmed('out') ? 0.2 : 1, scale: focused === 'out' ? 1.15 : 1, zIndex: focused === 'out' ? 10 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => toggle('out')}
          style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}>
          <p style={{ fontSize: 14, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600, textAlign: 'center', marginBottom: 4 }}>Outcomes</p>
          {outcomes.map((o, i) => (
            <div key={i} style={{ background: focused === 'out' ? '#1a2233' : C.surface, border: `1px solid ${focused === 'out' ? o.color + '60' : C.border}`, borderRadius: 12, padding: '20px 16px', textAlign: 'center', borderRight: `3px solid ${o.color}`, transition: 'all 300ms' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: o.color, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{o.label}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{o.sub}</p>
              <AnimatePresence>
                {focused === 'out' && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, lineHeight: 1.5, borderTop: `1px solid ${o.color}30`, paddingTop: 8 }}>{o.detail}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <motion.div animate={{ opacity: focused ? 0.3 : 1 }} transition={{ duration: 0.3 }}
        style={{ display: 'flex', gap: 32, marginTop: 4 }}>
        <span style={{ fontSize: 14, color: C.dim }}>dora.dev/research</span>
        <span style={{ fontSize: 14, color: C.red }}>⚠ Con IA: +3.4% entregables, +7.5% docs pero −7.2% estabilidad, −1.5% ritmo</span>
        {!focused && <span style={{ fontSize: 14, color: C.accent }}>Click en cualquier sección para explorar →</span>}
      </motion.div>
    </motion.div>
  )
}

const DIAGRAMS = { cycle: CycleDiagram, triangle: TriangleDiagram, leadership: LeadershipDiagram, agentic: AgenticDiagram, system: SystemDiagram }

/* ═══════════════════════════════════════════
   SLIDE RENDERERS
   ═══════════════════════════════════════════ */
const MARGIN = 120
const inner = { paddingLeft: MARGIN, paddingRight: MARGIN }

/* ─── Motion Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}
const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}
const slideTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
}

function SlideRenderer({ data, quizState, onQuizAnswer }) {
  switch (data.type) {

    case 'hero': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 36 }}>
          <motion.div variants={fadeUp}><Logos height={128} /></motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 500 }}>Gestión Ágil de Proyectos</motion.p>
          <motion.h1 variants={fadeUp} style={{ fontSize: T.hero, fontWeight: 800, lineHeight: 1.1, color: C.white, maxWidth: 900 }}>
            Roles y <span style={{ color: C.accent }}>Liderazgo</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', fontWeight: 400, maxWidth: 700 }}>Para líderes y gerentes que gestionan proyectos en manufactura, servicios, banca y operaciones</motion.p>
          <motion.a variants={fadeUp} href="https://www.linkedin.com/in/ulisesgonzalez/" target="_blank" rel="noopener noreferrer" style={{ fontSize: T.caption, color: C.dim, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', transition: 'color 200ms' }} onMouseEnter={e => e.currentTarget.style.color = C.white} onMouseLeave={e => e.currentTarget.style.color = C.dim}>Profesor: Ulises González</motion.a>
        </div>
      </motion.div>
    )

    case 'agileBySector': {
      const allSectors = [
        { sector: 'Manufactura y Alimentos', color: C.accent, orgs: 'Crustissimo · Polar · Botalón · Cabel', areas: [
          { area: 'Desarrollo de producto', metric: '−55%', metricLabel: 'time-to-market', useCase: 'Lanzamiento de nuevo SKU con equipo multifuncional (calidad + comercial + producción) en ciclos de 2 semanas', source: 'BCG/NielsenIQ' },
          { area: 'Eficiencia operacional', metric: '+30-40%', metricLabel: 'eficiencia', useCase: 'Optimización de línea de producción: kanban visual + daily de 15 min + retrospectiva quincenal', source: 'PA Consulting' },
          { area: 'Entrega a tiempo', metric: '>95%', metricLabel: 'on-time delivery', useCase: 'Planificación de despacho con ciclos cortos y ajuste semanal según demanda real', source: 'Tailor Benchmarks' },
        ]},
        { sector: 'Farmacéutica', color: '#06b6d4', orgs: 'Calox · Corp. JSL', areas: [
          { area: 'Ciclo de desarrollo', metric: '−40%', metricLabel: 'concepto → ensayo', useCase: 'Gestión de proyecto de registro sanitario con backlog priorizado por impacto regulatorio', source: 'McKinsey Life Sciences' },
          { area: 'Costos de proyecto', metric: '−25%', metricLabel: 'reducción', useCase: 'Proyecto de transferencia tecnológica con revisiones cada 2 semanas y decisiones tempranas de go/no-go', source: 'McKinsey Pharma' },
          { area: 'Acciones correctivas', metric: 'Continua', metricLabel: 'medición', useCase: 'Desviación de calidad → causa raíz → plan correctivo en días, no meses', source: 'McKinsey/Roche' },
        ]},
        { sector: 'Banca y Servicios', color: C.highlight, orgs: 'Bancrecer · Fulldata · Damasco · Netnovation', areas: [
          { area: 'Productividad de equipos', metric: '+25-35%', metricLabel: 'mejora', useCase: 'Proyecto de mejora de proceso de crédito: sprint de 2 semanas, entregable medible por ciclo', source: 'Hiperdrive Agile' },
          { area: 'Tiempo al mercado', metric: '−50-70%', metricLabel: 'ciclo de entrega', useCase: 'Lanzamiento de producto financiero o campaña con equipo cross-funcional y MVP en 4 semanas', source: 'ING/McKinsey' },
          { area: 'Servicio al cliente', metric: '−50%', metricLabel: 'quejas', useCase: 'Rediseño de journey de atención con feedback semanal de clientes reales + ajuste iterativo', source: 'BCG 2022' },
        ]},
        { sector: 'Construcción y Retail', color: '#A855F7', orgs: 'Pilperca · B&P · Tiendas Ciro · Promoting', areas: [
          { area: 'Cumplimiento de cronograma', metric: '3×', metricLabel: 'más probable a tiempo', useCase: 'Planificación de obra con Last Planner: compromisos semanales del equipo + % plan cumplido', source: 'LCI/Dodge 2021' },
          { area: 'Eficiencia de ruta crítica', metric: '+51.6%', metricLabel: 'mejora', useCase: 'Proyecto de construcción con Scrum adaptado: planning quincenal + coordinación visual de frentes', source: 'MDPI Buildings 2025' },
          { area: 'Precisión de inventario', metric: '82→98%', metricLabel: 'precisión', useCase: 'Proyecto de integración omnicanal con ciclos de ajuste cada 2 semanas según rotación real', source: 'Omniful' },
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

    case 'agenda': {
      const modules = [
        { num: '01', title: 'Contexto 2026', desc: 'Datos de adopción, evidencia y regulación', color: C.dim },
        { num: '02', title: 'Fundamentos ágiles', desc: 'Ciclo empírico, liderazgo, equipos y delivery', color: C.accent },
        { num: '03', title: 'Era agéntica', desc: 'Niveles de autonomía, roles emergentes y riesgos', color: '#F59E0B' },
        { num: '04', title: 'Roles redefinidos', desc: 'PO, SM y equipo en contexto humano-agente', color: C.highlight },
        { num: '05', title: 'Gobernanza y métricas', desc: 'Modelos de gobierno, tablero mínimo viable', color: '#06b6d4' },
        { num: '06', title: 'Casos y evidencia', desc: 'Datos cuantificados, productividad y contracasos', color: '#A855F7' },
        { num: '07', title: 'Aplicación práctica', desc: 'Herramientas por sector, checklist 30 días', color: C.accent },
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

    case 'objectives': {
      const bloomLevels = [
        { level: 'Recordar', color: C.dim, verb: 'Identificar', competency: 'Los 5 fundamentos ágiles y su relevancia en contextos de manufactura, servicios y banca', bloom: 1 },
        { level: 'Comprender', color: '#06b6d4', verb: 'Explicar', competency: 'Por qué la IA amplifica tanto aciertos como errores, y qué implica para la gestión de proyectos', bloom: 2 },
        { level: 'Aplicar', color: C.highlight, verb: 'Utilizar', competency: 'El ciclo empírico (inspección → adaptación) para gestionar un proyecto con asistencia de IA', bloom: 3 },
        { level: 'Analizar', color: '#F59E0B', verb: 'Distinguir', competency: 'Cuándo aplicar agilidad, estabilidad o automatización según el tipo de proyecto y sector', bloom: 4 },
        { level: 'Evaluar', color: '#A855F7', verb: 'Juzgar', competency: 'El impacto real de IA en un equipo usando métricas (no percepciones) y evidencia cuantificada', bloom: 5 },
        { level: 'Crear', color: C.accent, verb: 'Diseñar', competency: 'Un plan de implementación de proyecto piloto ágil con IA en tu área funcional (checklist 30 días)', bloom: 6 },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', gap: 56, alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
            <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Objetivo del módulo</motion.h2>
            <motion.div variants={fadeUp} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 32px', borderLeft: `4px solid ${C.accent}` }}>
              <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, fontWeight: 400 }}>
                Desarrollar la capacidad de <span style={{ color: C.white, fontWeight: 700 }}>gestionar proyectos con enfoque ágil</span> en contextos donde la IA transforma la ejecución, aplicando fundamentos de inspección, adaptación y gobernanza para <span style={{ color: C.white, fontWeight: 700 }}>generar resultados medibles</span> en manufactura, servicios, banca y operaciones.
              </p>
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: C.dim, marginTop: 4 }}>Taxonomía de Bloom: de recordar conceptos a crear tu propio plan de implementación</motion.p>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <motion.h3 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, marginBottom: 4 }}>Competencias clave</motion.h3>
            {bloomLevels.map((b, i) => (
              <motion.div key={i} variants={popIn} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 16px', borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${b.color}` }}>
                <div style={{ minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: b.color, fontFamily: "'JetBrains Mono', monospace" }}>N{b.bloom}</span>
                  <span style={{ fontSize: 13, color: b.color, fontWeight: 600 }}>{b.level}</span>
                </div>
                <div>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: b.color }}>{b.verb}</span> {b.competency}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'resources': {
      const resources = [
        { category: 'Libros', color: C.accent, items: [
          { title: 'Scrum: The Art of Doing Twice the Work in Half the Time', author: 'Jeff Sutherland', note: 'El fundamento — accesible para no técnicos' },
          { title: 'The Phoenix Project', author: 'Kim, Behr & Spafford', note: 'Novela de gestión que explica DevOps y flujo de valor' },
          { title: 'Team Topologies', author: 'Skelton & Pais', note: 'Cómo estructurar equipos para flujo rápido' },
          { title: 'Co-Intelligence: Living and Working with AI', author: 'Ethan Mollick', note: 'Guía práctica de IA para líderes — publicado 2024' },
        ]},
        { category: 'Videos y cursos', color: C.highlight, items: [
          { title: 'Agile Product Ownership in a Nutshell', author: 'Henrik Kniberg · YouTube', note: '15 min — la mejor explicación visual de priorización ágil' },
          { title: 'DORA Quick Check', author: 'dora.dev/quickcheck', note: 'Evalúa la madurez de entrega de tu equipo en 5 minutos' },
          { title: 'AI for Project Managers', author: 'PMI Learning · pmi.org', note: 'Curso gratuito de PMI sobre IA en gestión de proyectos' },
          { title: 'Spotify Engineering Culture', author: 'Henrik Kniberg · YouTube', note: '2 videos — modelo de squads, tribus y autonomía alineada' },
        ]},
        { category: 'Sitios web clave', color: '#06b6d4', items: [
          { title: 'dora.dev', author: 'Google Cloud DORA', note: 'Investigación anual sobre rendimiento de equipos — métricas clave' },
          { title: 'scrum.org/resources', author: 'Scrum.org', note: 'Guías oficiales, assessments y learning paths gratuitos' },
          { title: 'agilemanifesto.org', author: 'Los 17 firmantes', note: 'Los 4 valores y 12 principios — lectura obligatoria de 5 minutos' },
          { title: 'hbr.org/topic/ai', author: 'Harvard Business Review', note: 'Artículos de IA para líderes de negocio — perspectiva gerencial' },
        ]},
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Recursos recomendados</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 19, color: C.dim }}>Para profundizar después del módulo — seleccionados para project managers</motion.p>
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

    case 'overview': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        <motion.p variants={fadeUp} style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>Agenda</motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white, marginBottom: 12 }}>Cinco fundamentos</motion.h2>
        {[
          { n: '01', title: 'El ciclo empírico', sub: 'Transparencia → inspección → adaptación' },
          { n: '02', title: '¿Cuándo sí, cuándo no?', sub: 'Ágil vs. estable vs. automatizado' },
          { n: '03', title: 'Liderazgo ágil', sub: 'Proteger, habilitar, soltar, gobernar' },
          { n: '04', title: 'Equipos multifuncionales', sub: 'Centrados en el usuario, no en eficiencia' },
          { n: '05', title: 'El Delivery Manager', sub: 'Configurar el entorno — ahora con agentes IA' },
        ].map((f, i) => (
          <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: C.accent, opacity: 0.4, minWidth: 60 }}>{f.n}</span>
            <div>
              <p style={{ fontSize: T.bullet, fontWeight: 600, color: C.white }}>{f.title}</p>
              <p style={{ fontSize: 22, color: C.dim }}>{f.sub}</p>
            </div>
          </motion.div>
        ))}
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

    case 'content': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        {data.note && <motion.p variants={fadeUp} style={{ fontSize: 20, color: data.color === 'highlight' ? C.highlight : data.color === 'accent' ? C.accent : C.dim, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.note}</motion.p>}
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white, lineHeight: 1.15, maxWidth: 900 }}>{data.title}</motion.h2>
        <motion.ul variants={stagger} style={{ listStyle: 'none', padding: 0, maxWidth: 900 }}>
          {data.bullets.map((b, i) => (
            <motion.li key={i} variants={fadeUp} style={{ fontSize: T.bullet, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, paddingLeft: 36, position: 'relative', marginBottom: 12 }}>
              <span style={{ position: 'absolute', left: 0, top: 6, width: 10, height: 10, borderRadius: '50%', background: data.color === 'highlight' ? C.highlight : C.accent, opacity: 0.6 }} />
              {b}
            </motion.li>
          ))}
        </motion.ul>
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
        {data.source && <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.dim }}>{data.source}</motion.p>}
      </motion.div>
    )

    case 'quote': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 60 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40 }}>
          {data.source && <motion.p variants={fadeUp} style={{ fontSize: T.caption, color: C.accent, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 600 }}>{data.source}</motion.p>}
          <motion.p variants={fadeUp} style={{ fontSize: T.subtitle, color: C.white, fontWeight: 500, lineHeight: 1.6, maxWidth: 800, whiteSpace: 'pre-line' }}>{data.text}</motion.p>
        </div>
        <motion.div variants={fadeIn} style={{ width: 200, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 200, fontWeight: 800, color: C.accent, opacity: 0.08, lineHeight: 1 }}>"</span>
        </motion.div>
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

    case 'role': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <motion.div variants={fadeUp} style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.role}</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 8 }}>
          {[
            { label: 'Base', content: data.base },
            { label: 'Upgrade 2026', content: data.upgrade },
            { label: 'Artefactos nuevos', content: data.artifacts },
          ].map((col, i) => (
            <motion.div key={i} variants={popIn} whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
              <p style={{ fontSize: 20, color: C.dim, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, fontWeight: 600 }}>{col.label}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{col.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )

    case 'governance': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <motion.div variants={fadeUp} style={{ width: 60, height: 4, background: data.color, borderRadius: 2 }} />
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: data.color }}>{data.model}</motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: T.text, color: 'rgba(255,255,255,0.7)' }}>{data.subtitle}</motion.p>
        <div style={{ display: 'flex', gap: 40, marginTop: 16 }}>
          {[
            { label: 'Ventajas', content: data.pros, color: C.highlight },
            { label: 'Riesgos', content: data.cons, color: C.red },
            { label: '¿Cuándo usar?', content: data.when, color: C.accent },
          ].map((col, i) => (
            <motion.div key={i} variants={popIn} whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ flex: 1, background: C.surface, borderRadius: 16, padding: 32, border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 20, color: col.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, fontWeight: 600 }}>{col.label}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{col.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )

    case 'doramodel': return (
      <div style={{ ...inner, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DORAModelDiagram />
      </div>
    )

    case 'metrics': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        {data.title && <motion.h2 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>{data.title}</motion.h2>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {data.items.map((m, i) => (
            <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 32, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '28px 40px' }}>
              <p style={{ fontSize: T.text, fontWeight: 700, color: C.accent, minWidth: 240 }}>{m.dim}</p>
              <p style={{ fontSize: T.caption, color: 'rgba(255,255,255,0.8)', flex: 1 }}>{m.metric}</p>
              <p style={{ fontSize: 20, color: C.red, fontWeight: 500 }}>⚠ {m.alert}</p>
            </motion.div>
          ))}
        </div>
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

    case 'monday': return (
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>¿Y yo qué hago el lunes?</motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 22, color: C.dim, maxWidth: 1100, lineHeight: 1.5 }}>
          Elige <span style={{ color: C.white, fontWeight: 600 }}>un proyecto real</span> de tu área. Define un ciclo corto (2-4 semanas), un entregable medible y un equipo pequeño. Aplica estas acciones dentro de ese proyecto:
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 4 }}>
          {[
            { role: 'Calidad / Operaciones', color: C.accent, items: ['Análisis de causa raíz con IA: alimenta datos de no conformidades\ny obtén patrones, Paretos y borradores de acción correctiva en minutos', 'Gestión de riesgos del proyecto: matriz de riesgos\ngenerada por IA, revisada por el equipo cada ciclo', 'Dashboards automáticos: % avance, SLA, defectos\n— IA arma el tablero, tú tomas decisiones'] },
            { role: 'Finanzas / Administración', color: C.highlight, items: ['Estimación y costeo de proyectos: IA analiza históricos\ny genera rangos de estimación con supuestos explícitos', 'Síntesis ejecutiva: de 30 páginas a 1 resumen accionable\n(−40% tiempo documentado) — reporte listo para comité', 'Seguimiento de presupuesto vs. real: IA detecta\ndesviaciones y sugiere acciones correctivas'] },
            { role: 'Producción / Supervisión', color: '#F59E0B', items: ['Sprint de mejora: ciclo de 2 semanas con daily\nde 15 min, entregable medible y retrospectiva', 'Planificación de capacidad: IA cruza carga de trabajo,\ndisponibilidad y prioridades para proponer asignaciones', 'Lecciones aprendidas automatizadas: IA consolida\nretros anteriores y sugiere acciones para el nuevo ciclo'] },
            { role: 'Comercial / Marketing', color: '#A855F7', items: ['Propuestas y licitaciones: IA genera borradores\ncon análisis competitivo y pricing sugerido', 'Roadmap de producto/servicio: IA prioriza backlog\npor impacto estimado en ingreso y satisfacción', 'Seguimiento de pipeline: IA identifica cuellos de botella\nen el embudo y sugiere acciones por etapa'] },
          ].map((block, i) => (
            <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '22px 26px', borderTop: `3px solid ${block.color}` }}>
              <p style={{ fontSize: 21, fontWeight: 700, color: block.color, marginBottom: 10 }}>{block.role}</p>
              {block.items.map((item, j) => (
                <p key={j} style={{ fontSize: 19, color: 'rgba(255,255,255,0.8)', lineHeight: 1.45, marginBottom: 8, whiteSpace: 'pre-line', paddingLeft: 16, borderLeft: `2px solid ${block.color}30` }}>{item}</p>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeUp} style={{ fontSize: 17, color: C.dim, textAlign: 'center', marginTop: 4 }}>
          Formato: proyecto acotado → equipo pequeño → ciclo corto → medir → decidir si escalar
        </motion.p>
      </motion.div>
    )

    case 'toolsBySector': {
      const sectors = [
        { sector: 'Manufactura\ny Alimentos', color: C.accent, orgs: 'Crustissimo · Polar · Botalón · Pilperca · Cabel', tools: [
          { practice: 'Kanban visual', ai: 'IA genera tablero desde lista de tareas y sugiere WIP limits por capacidad del equipo' },
          { practice: 'Daily 15 min', ai: 'IA resume avances del día anterior y detecta bloqueos antes de la reunión' },
          { practice: 'Retrospectiva', ai: 'IA consolida incidentes, métricas de ciclo y sugiere 3 acciones priorizadas' },
          { practice: 'Gestión de riesgos', ai: 'Matriz de riesgos generada desde históricos de planta + análisis de causa raíz automático' },
        ]},
        { sector: 'Farmacéutica', color: '#06b6d4', orgs: 'Calox · Laboratorio Calox · Corp. JSL', tools: [
          { practice: 'Backlog priorizado', ai: 'IA ordena iniciativas por impacto regulatorio, costo y urgencia con trazabilidad' },
          { practice: 'Definition of Done', ai: 'Checklist de calidad generado por IA según normativa GMP/GLP vigente' },
          { practice: 'Sprint Review', ai: 'IA genera resumen ejecutivo de entregables del ciclo para comité de calidad' },
          { practice: 'Acción correctiva', ai: 'Desviación → causa raíz → plan correctivo generado por IA en minutos, no semanas' },
        ]},
        { sector: 'Banca\ny Servicios', color: C.highlight, orgs: 'Bancrecer · Fulldata · Damasco · Netnovation', tools: [
          { practice: 'User Story Mapping', ai: 'IA mapea journey del cliente desde datos de atención y genera historias priorizadas' },
          { practice: 'Estimación', ai: 'Rangos de esfuerzo basados en históricos similares — reduce sesgo de planificación' },
          { practice: 'Métricas de flujo', ai: 'Lead time, cycle time y throughput calculados en tiempo real desde herramientas existentes' },
          { practice: 'Reporte a stakeholders', ai: 'De 30 páginas a 1 resumen accionable — síntesis ejecutiva lista para comité' },
        ]},
        { sector: 'Retail, Educación\ny Comercio', color: '#A855F7', orgs: 'Tiendas Ciro · IESA · Promoting · Link 1720', tools: [
          { practice: 'Roadmap de producto', ai: 'IA prioriza backlog por impacto en ingreso y satisfacción con datos de mercado' },
          { practice: 'Ciclo de feedback', ai: 'Encuestas analizadas por IA → insights → backlog actualizado en horas, no semanas' },
          { practice: 'Planificación de sprint', ai: 'IA cruza capacidad del equipo + prioridades + dependencias para proponer plan' },
          { practice: 'Lecciones aprendidas', ai: 'IA consolida retros anteriores y sugiere patrones recurrentes a resolver' },
        ]},
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: T.title, fontWeight: 700, color: C.white }}>Herramientas ágiles × IA por sector</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 19, color: C.dim }}>Prácticas que ya se democratizan — aplicadas a los sectores de este grupo</motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
            {sectors.map((s, i) => (
              <motion.div key={i} variants={popIn} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', borderLeft: `3px solid ${s.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <p style={{ fontSize: 19, fontWeight: 700, color: s.color, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{s.sector}</p>
                  <p style={{ fontSize: 13, color: C.dim, textAlign: 'right', maxWidth: 260 }}>{s.orgs}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '6px 12px' }}>
                  {s.tools.map((t, j) => (
                    <React.Fragment key={j}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.35, paddingTop: 2 }}>{t.practice}</p>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4, borderLeft: `2px solid ${s.color}25`, paddingLeft: 10 }}>{t.ai}</p>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    case 'autonomy': {
      const levels = [
        { level: 'Asistencia', agent: 'Sugiere, resume, borradores', human: 'Decide y ejecuta', risk: 'Sobreconfianza', color: C.highlight },
        { level: 'Delegación', agent: 'Ejecuta subtareas, entregables', human: 'Revisa y aprueba', risk: 'Velocidad sin calidad', color: C.accent },
        { level: 'Autonomía acotada', agent: 'Opera dentro de límites definidos', human: 'Define límites, audita', risk: 'Exceso de autonomía', color: '#F59E0B' },
        { level: 'Autonomía alta', agent: 'Decide y ejecuta completo', human: 'Supervisión posterior', risk: 'Responsabilidad difusa', color: C.red },
      ]
      return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ ...inner, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <motion.h3 variants={fadeUp} style={{ fontSize: T.subtitle, fontWeight: 700, color: C.white }}>Niveles de autonomía humano-agente</motion.h3>
          <motion.div variants={fadeIn} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr', gap: '0', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {['Nivel', 'Agente hace', 'Humano hace', 'Riesgo'].map((h, i) => (
              <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', fontSize: 18, fontWeight: 600, color: C.dim, borderBottom: `1px solid ${C.border}` }}>{h}</div>
            ))}
            {levels.map((l, i) => (
              [
                <div key={`n${i}`} style={{ padding: '14px 16px', fontSize: 19, fontWeight: 600, color: l.color, borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>{l.level}</div>,
                <div key={`a${i}`} style={{ padding: '14px 16px', fontSize: 18, color: 'rgba(255,255,255,0.7)', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>{l.agent}</div>,
                <div key={`h${i}`} style={{ padding: '14px 16px', fontSize: 18, color: 'rgba(255,255,255,0.7)', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>{l.human}</div>,
                <div key={`r${i}`} style={{ padding: '14px 16px', fontSize: 18, color: l.color, fontWeight: 500, borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>{l.risk}</div>,
              ]
            ))}
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: C.dim }}>Autonomía alta es rara en 2026 — la mayoría opera en delegación con revisión</motion.p>
        </motion.div>
      )
    }

    case 'bib': return null

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
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

        {/* Header: counter + clock */}
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

        {/* Takeaway overlay */}
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
