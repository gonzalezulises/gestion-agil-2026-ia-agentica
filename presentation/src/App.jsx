import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Target, Shield, Users, UserCog,
  Bot, Zap, TrendingUp, TrendingDown, AlertTriangle, BarChart3,
  CheckCircle2, XCircle, Layout, Eye, Settings, Award, Layers,
  ArrowRight, Brain, Gauge, Briefcase, Clock, ChevronDown
} from 'lucide-react'

/* ─── Helpers ─── */
const mono = "font-['JetBrains_Mono',monospace]"
const card = "bg-bg-card border border-white/10 rounded-xl p-6"
const cardSm = "bg-bg-card border border-white/10 rounded-lg p-4"

function MetricCard({ icon: Icon, value, label, source, color = 'cyan', delay = 0 }) {
  return (
    <div className={`${cardSm} anim-pop flex flex-col items-center text-center gap-2`}
      style={{ animationDelay: `${delay}s` }}>
      <Icon className={`w-6 h-6 text-${color}`} />
      <span className={`${mono} text-2xl font-bold text-${color}`}>{value}</span>
      <span className="text-sm text-gray-300">{label}</span>
      {source && <span className="text-[10px] text-gray-500">{source}</span>}
    </div>
  )
}

function DataBar({ label, value, suffix = '%', color = '#10b981', max = 100, delay = 0 }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(Math.min(Math.abs(value) / max * 100, 100)), 100 + delay * 1000); return () => clearTimeout(t) }, [value, max, delay])
  return (
    <div className="flex items-center gap-3 anim-fade" style={{ animationDelay: `${delay}s` }}>
      <span className="text-sm text-gray-300 w-48 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-white/5 rounded-full h-7 relative overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
          style={{ width: `${w}%`, backgroundColor: color }}>
          <span className={`${mono} text-xs font-bold text-white`}>{value > 0 ? '+' : ''}{value}{suffix}</span>
        </div>
      </div>
    </div>
  )
}

function QuizCard({ q, explanation, index, onAnswer, answered, correct }) {
  return (
    <div className={`${card} transition-all duration-500 ${answered !== null ? (correct ? 'border-green/50 bg-green/5' : 'border-red/50 bg-red/5') : 'hover:border-cyan/30'}`}>
      <p className="text-sm text-gray-300 mb-1">Pregunta {index + 1}</p>
      <p className="text-base text-white mb-4 leading-relaxed">{q}</p>
      {answered === null ? (
        <div className="flex gap-3">
          <button onClick={() => onAnswer(true)}
            className="flex-1 py-2 rounded-lg bg-green/10 border border-green/30 text-green hover:bg-green/20 transition font-medium text-sm">Verdadero</button>
          <button onClick={() => onAnswer(false)}
            className="flex-1 py-2 rounded-lg bg-red/10 border border-red/30 text-red hover:bg-red/20 transition font-medium text-sm">Falso</button>
        </div>
      ) : (
        <div className="space-y-2 anim-fade">
          <div className="flex items-center gap-2">
            {correct ? <CheckCircle2 className="w-5 h-5 text-green" /> : <XCircle className="w-5 h-5 text-red" />}
            <span className={`font-medium ${correct ? 'text-green' : 'text-red'}`}>{correct ? 'Correcto' : 'Incorrecto'} — La respuesta es Verdadero</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}

/* ─── SVG Diagrams ─── */
function CycleEmpiricoSVG() {
  return (
    <svg viewBox="0 0 500 300" className="w-full max-w-lg mx-auto">
      {/* Nodes */}
      <g className="anim-pop stagger-1">
        <rect x="30" y="100" width="130" height="50" rx="10" fill="#111827" stroke="#06b6d4" strokeWidth="2" />
        <text x="95" y="130" textAnchor="middle" fill="#06b6d4" fontSize="14" fontFamily="DM Sans">Transparencia</text>
      </g>
      <g className="anim-pop stagger-2">
        <rect x="190" y="100" width="120" height="50" rx="10" fill="#111827" stroke="#06b6d4" strokeWidth="2" />
        <text x="250" y="130" textAnchor="middle" fill="#06b6d4" fontSize="14" fontFamily="DM Sans">Inspección</text>
      </g>
      <g className="anim-pop stagger-3">
        <rect x="340" y="100" width="130" height="50" rx="10" fill="#111827" stroke="#06b6d4" strokeWidth="2" />
        <text x="405" y="130" textAnchor="middle" fill="#06b6d4" fontSize="14" fontFamily="DM Sans">Adaptación</text>
      </g>
      {/* Arrows forward */}
      <g className="anim-fade stagger-2">
        <line x1="160" y1="125" x2="185" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan)" />
      </g>
      <g className="anim-fade stagger-3">
        <line x1="310" y1="125" x2="335" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan)" />
      </g>
      {/* Feedback arc */}
      <g className="anim-fade stagger-4">
        <path d="M405 155 C405 220, 95 220, 95 155" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#arrowAmber)" />
        <text x="250" y="210" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="DM Sans">feedback loop</text>
      </g>
      {/* IA warning */}
      <g className="anim-pop stagger-5">
        <rect x="145" y="240" width="210" height="36" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1" />
        <text x="250" y="263" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="DM Sans">⚡ IA amplifica velocidad Y errores</text>
      </g>
      <defs>
        <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#06b6d4" /></marker>
        <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#f59e0b" /></marker>
      </defs>
    </svg>
  )
}

function TriangleSVG() {
  return (
    <svg viewBox="0 0 500 380" className="w-full max-w-lg mx-auto">
      {/* Triangle nodes */}
      <g className="anim-pop stagger-1">
        <rect x="185" y="30" width="130" height="50" rx="12" fill="#111827" stroke="#06b6d4" strokeWidth="2" />
        <text x="250" y="60" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="600" fontFamily="DM Sans">Agilidad</text>
      </g>
      <g className="anim-pop stagger-2">
        <rect x="30" y="250" width="150" height="50" rx="12" fill="#111827" stroke="#10b981" strokeWidth="2" />
        <text x="105" y="280" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="600" fontFamily="DM Sans">Estabilidad</text>
      </g>
      <g className="anim-pop stagger-3">
        <rect x="320" y="250" width="150" height="50" rx="12" fill="#111827" stroke="#a855f7" strokeWidth="2" />
        <text x="395" y="280" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="600" fontFamily="DM Sans">Automatización</text>
      </g>
      {/* Lines */}
      <g className="anim-fade stagger-3">
        <line x1="210" y1="80" x2="120" y2="250" stroke="white" strokeWidth="1" strokeDasharray="5 4" opacity="0.3" />
        <line x1="290" y1="80" x2="380" y2="250" stroke="white" strokeWidth="1" strokeDasharray="5 4" opacity="0.3" />
        <line x1="180" y1="275" x2="320" y2="275" stroke="white" strokeWidth="1" strokeDasharray="5 4" opacity="0.3" />
      </g>
      {/* Labels */}
      <g className="anim-fade stagger-4">
        <text x="130" y="170" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="DM Sans" opacity="0.8">Brechas grandes</text>
        <text x="130" y="183" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="DM Sans" opacity="0.8">cambio rápido</text>
      </g>
      <g className="anim-fade stagger-5">
        <text x="370" y="170" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="DM Sans" opacity="0.8">Repetitivo</text>
        <text x="370" y="183" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="DM Sans" opacity="0.8">reglas claras</text>
      </g>
      <g className="anim-fade stagger-6">
        <text x="250" y="335" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="DM Sans" opacity="0.8">Brechas pequeñas / estable</text>
      </g>
    </svg>
  )
}

function LeadershipSVG() {
  return (
    <svg viewBox="0 0 520 360" className="w-full max-w-xl mx-auto">
      {/* Leader */}
      <g className="anim-pop stagger-1">
        <rect x="185" y="15" width="150" height="55" rx="12" fill="#111827" stroke="#06b6d4" strokeWidth="2.5" />
        <text x="260" y="48" textAnchor="middle" fill="#06b6d4" fontSize="15" fontWeight="700" fontFamily="DM Sans">Líder Ágil</text>
      </g>
      {/* Four pillars */}
      {[
        { x: 15, label: 'Proteger', sub: 'Blindar de\nburocracia', color: '#06b6d4', icon: '🛡️', delay: 2 },
        { x: 140, label: 'Habilitar', sub: 'Recursos,\nautonomía', color: '#10b981', icon: '🔓', delay: 3 },
        { x: 265, label: 'Soltar', sub: 'Paso atrás\nen ejecución', color: '#f59e0b', icon: '🤝', delay: 4 },
        { x: 390, label: 'Gobernar', sub: 'Límites de\nautonomía', color: '#a855f7', icon: '🆕', delay: 5 },
      ].map((p, i) => (
        <g key={i} className={`anim-pop stagger-${p.delay}`}>
          <rect x={p.x} y="120" width="115" height="70" rx="10" fill="#111827" stroke={p.color} strokeWidth="1.5" />
          <text x={p.x + 57} y="148" textAnchor="middle" fill={p.color} fontSize="13" fontWeight="600" fontFamily="DM Sans">{p.label}</text>
          <text x={p.x + 57} y="175" textAnchor="middle" fill="white" fontSize="9" opacity="0.6" fontFamily="DM Sans">
            {p.sub.split('\n').map((l, j) => <tspan key={j} x={p.x + 57} dy={j === 0 ? 0 : 12}>{l}</tspan>)}
          </text>
          <line x1={p.x + 57} y1="70" x2={p.x + 57} y2="120" stroke={p.color} strokeWidth="1.5" opacity="0.5" />
        </g>
      ))}
      {/* Team */}
      <g className="anim-pop stagger-6">
        <rect x="110" y="260" width="300" height="55" rx="12" fill="#111827" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 3" />
        <text x="260" y="290" textAnchor="middle" fill="white" fontSize="13" fontWeight="500" fontFamily="DM Sans">Equipo autogestionado + agentes</text>
      </g>
      {/* Connecting lines from pillars to team */}
      {[72, 197, 322, 447].map((x, i) => (
        <line key={i} x1={x} y1="190" x2="260" y2="260" stroke="white" strokeWidth="1" opacity="0.15" className={`anim-fade stagger-${i + 3}`} />
      ))}
    </svg>
  )
}

function AgenticEvolutionSVG() {
  const stages = [
    { label: 'Asistente', sub: 'Responde', color: '#10b981', x: 20 },
    { label: 'Agente', sub: 'Ejecuta tareas', color: '#06b6d4', x: 140 },
    { label: 'Multiagente', sub: 'Coordina', color: '#f59e0b', x: 270 },
    { label: 'Ecosistema', sub: 'Cruza apps', color: '#a855f7', x: 390 },
  ]
  return (
    <svg viewBox="0 0 520 220" className="w-full max-w-xl mx-auto">
      {stages.map((s, i) => (
        <g key={i} className={`anim-pop stagger-${i + 1}`}>
          <rect x={s.x} y="40" width="110" height="60" rx="10" fill="#111827" stroke={s.color} strokeWidth="2" />
          <text x={s.x + 55} y="65" textAnchor="middle" fill={s.color} fontSize="13" fontWeight="600" fontFamily="DM Sans">{s.label}</text>
          <text x={s.x + 55} y="85" textAnchor="middle" fill="white" fontSize="10" opacity="0.6" fontFamily="DM Sans">{s.sub}</text>
          {i < 3 && <line x1={s.x + 110} y1="70" x2={s.x + 130} y2="70" stroke="white" strokeWidth="1.5" opacity="0.4" markerEnd="url(#arrowW)" />}
        </g>
      ))}
      {/* Risk */}
      <g className="anim-pop stagger-5">
        <rect x="160" y="145" width="200" height="40" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
        <text x="260" y="170" textAnchor="middle" fill="#ef4444" fontSize="11" fontFamily="DM Sans">⚠️ Riesgo: agency sin control</text>
        <line x1="195" y1="100" x2="220" y2="145" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="325" y1="100" x2="300" y2="145" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      </g>
      <defs>
        <marker id="arrowW" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="white" opacity="0.5" /></marker>
      </defs>
    </svg>
  )
}

function SystemE2ESVG() {
  const phases = [
    { label: 'Discovery', color: '#06b6d4', x: 10 },
    { label: 'Backlog', color: '#06b6d4', x: 95 },
    { label: 'Build', color: '#06b6d4', x: 180 },
    { label: 'Test', color: '#06b6d4', x: 265 },
    { label: 'Release', color: '#06b6d4', x: 350 },
    { label: 'Observe', color: '#06b6d4', x: 435 },
  ]
  const agents = [
    { label: 'Agent: PRD', x: 95, color: '#f59e0b' },
    { label: 'Agent: Code', x: 180, color: '#f59e0b' },
    { label: 'Agent: Test', x: 265, color: '#f59e0b' },
    { label: 'Agent: Incidents', x: 435, color: '#f59e0b' },
  ]
  return (
    <svg viewBox="0 0 520 250" className="w-full max-w-2xl mx-auto">
      {/* Main pipeline */}
      {phases.map((p, i) => (
        <g key={i} className={`anim-pop stagger-${i + 1}`}>
          <rect x={p.x} y="50" width="75" height="40" rx="8" fill="#111827" stroke={p.color} strokeWidth="1.5" />
          <text x={p.x + 37} y="75" textAnchor="middle" fill={p.color} fontSize="11" fontWeight="500" fontFamily="DM Sans">{p.label}</text>
          {i < 5 && <line x1={p.x + 75} y1="70" x2={p.x + 85} y2="70" stroke="white" strokeWidth="1" opacity="0.3" markerEnd="url(#arrowW2)" />}
        </g>
      ))}
      {/* Agents below */}
      {agents.map((a, i) => (
        <g key={i} className={`anim-pop stagger-${i + 3}`}>
          <rect x={a.x - 5} y="140" width="85" height="35" rx="7" fill="#111827" stroke={a.color} strokeWidth="1" />
          <text x={a.x + 37} y="162" textAnchor="middle" fill={a.color} fontSize="9" fontWeight="500" fontFamily="DM Sans">{a.label}</text>
          <line x1={a.x + 37} y1="140" x2={a.x + 37} y2="90" stroke={a.color} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
        </g>
      ))}
      {/* Feedback arc */}
      <g className="anim-fade stagger-6">
        <path d="M472 50 C490 10, 30 10, 47 50" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrowPurple)" />
        <text x="260" y="18" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="DM Sans">feedback</text>
      </g>
      <defs>
        <marker id="arrowW2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="white" opacity="0.4" /></marker>
        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#a855f7" /></marker>
      </defs>
    </svg>
  )
}

/* ─── SLIDES ─── */
const QUIZ_1 = [
  { q: "El objetivo principal de la agilidad es ofrecer mejores resultados mediante la obtención de retroalimentación frecuente, la inspección de los resultados y la adaptación en función de esa retroalimentación.", explanation: "El ciclo empírico (transparencia → inspección → adaptación) es el mecanismo central. En era agéntica se vuelve más necesario porque la IA amplifica aciertos y errores a mayor velocidad." },
  { q: "El liderazgo debe apoyar y proteger a los equipos ágiles de ser arrastrados de vuelta a viejas formas de trabajo, y deben cambiar la dinámica de poder transfiriendo mecanismos de poder a los equipos ágiles.", explanation: "Sin liderazgo protector, los equipos son reabsorbidos por la inercia burocrática. McKinsey 2025: >80% sin gobierno ejecutivo visible no logra retorno tangible de genAI." },
  { q: "Las transformaciones ágiles pueden fracasar porque no cuentan con el apoyo ejecutivo o de los mandos medios.", explanation: "El apoyo ejecutivo es condición estructural. En contexto agéntico, el liderazgo define límites de autonomía (humana y de agentes); sin esto la adopción es caótica." },
  { q: "La agilidad es esencial cuando existen grandes brechas de satisfacción del cliente o cuando las necesidades de los clientes están cambiando rápidamente.", explanation: "En 2026 se agrega una tercera dimensión: automatización directa para workflows repetitivos. La decisión se convierte en triángulo: ágil vs. estable vs. automatizado." },
  { q: "Cuando las brechas de satisfacción son pequeñas y las necesidades son estables, los procesos estables a menudo satisfacen mejor las necesidades de los clientes.", explanation: "No todo requiere agilidad. Procesos estables bien ejecutados generan eficiencia predecible. El error es \"agilizar\" lo que funciona bien, generando fricción sin valor." },
]

const QUIZ_2 = [
  { q: "Diferentes equipos tomarán diferentes caminos hacia los objetivos de su organización. Los líderes ágiles necesitan crear espacio para que todos contribuyan.", explanation: "La diversidad de enfoques es una fortaleza. En era agéntica se traduce en autonomía por nivel y work charts dinámicos donde cada equipo define su human-agent ratio." },
  { q: "Aprender a confiar en la inteligencia ascendente cambia el papel de los gerentes. Los líderes ágiles crean condiciones para equipos autogestionados y luego dan un paso atrás.", explanation: "Matiz 2026: el líder da paso atrás en ejecución táctica pero intensifica su rol en gobernanza, límites de autonomía y diseño del sistema de trabajo." },
  { q: "El tamaño de su equipo y los roles que necesita cambiarán a medida que construya su servicio. Necesitará diferentes habilidades durante las diferentes etapas de desarrollo.", explanation: "En 2026 esto es dinámico incluso a nivel de sprint: nuevos roles IA (AI Security Specialist, AI Agent Specialist) surgen según la madurez de la capacidad IA." },
  { q: "Todo el equipo debe trabajar junto para diseñar, construir e iterar un servicio basado en las necesidades de usuario de las personas a las que va dirigido.", explanation: "La multifuncionalidad evita silos y decisiones desconectadas. En era agéntica, los agentes se evalúan por impacto en experiencia de usuario, no solo eficiencia." },
  { q: "El delivery manager es responsable de liderar la configuración del entorno ágil que su equipo necesita para crear e iterar un servicio centrado en el usuario.", explanation: "En 2026, ese entorno incluye agentes IA. El delivery manager (SM) asegura que la integración de IA sea gobernada, evaluada y alineada con calidad y transparencia." },
]

function QuizSlide({ questions, title }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const handleAnswer = (idx, val) => {
    setAnswers(prev => { const n = [...prev]; n[idx] = val; return n })
  }
  const answered = answers.filter(a => a !== null).length
  const correct = answers.filter(a => a === true).length
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cyan mb-1">{title}</h2>
      <p className="text-sm text-gray-400 mb-4">Todas las preguntas son Verdadero/Falso. Selecciona tu respuesta.</p>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
        {questions.map((q, i) => (
          <QuizCard key={i} q={q.q} explanation={q.explanation} index={i}
            answered={answers[i]} correct={answers[i] === true}
            onAnswer={(val) => handleAnswer(i, val)} />
        ))}
      </div>
      {answered === questions.length && (
        <div className="mt-4 text-center anim-fade">
          <span className={`${mono} text-xl font-bold ${correct === questions.length ? 'text-green' : 'text-amber'}`}>
            {correct}/{questions.length} correctas
          </span>
        </div>
      )}
    </div>
  )
}

function SlideContent({ index }) {
  switch (index) {
    /* ── Slide 1: Título ── */
    case 0: return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <p className="text-sm text-cyan uppercase tracking-widest mb-4 anim-fade stagger-1">2026</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 anim-fade stagger-2 leading-tight">
          Gestión Ágil en la Era de la<br /><span className="text-cyan">IA Agéntica</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-10 anim-fade stagger-3">
          Liderazgo, roles y sistemas de entrega cuando la IA amplifica todo — lo bueno y lo malo
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          <MetricCard icon={TrendingUp} value="71%" label="Uso regular genAI" source="McKinsey 2025" delay={0.4} />
          <MetricCard icon={Bot} value="62%" label="Experimenta con agentes" source="McKinsey 2025" color="amber" delay={0.55} />
          <MetricCard icon={AlertTriangle} value=">80%" label="Sin impacto EBIT" source="McKinsey 2025" color="red" delay={0.7} />
          <MetricCard icon={Brain} value="82%" label="Punto de inflexión" source="Microsoft WTI" color="purple" delay={0.85} />
        </div>
      </div>
    )

    /* ── Slide 2: Ciclo empírico ── */
    case 1: return (
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-cyan uppercase tracking-wider">Fundamento 1</span>
          <h2 className="text-3xl font-bold text-white mt-1">El ciclo empírico</h2>
          <p className="text-gray-400 mt-2 max-w-2xl">El objetivo de la agilidad: mejores resultados mediante retroalimentación frecuente, inspección y adaptación. En era agéntica, este ciclo es más necesario — sin inspección, los errores de IA se propagan exponencialmente.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <CycleEmpiricoSVG />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className={cardSm + ' anim-pop stagger-4'}>
            <Eye className="w-5 h-5 text-cyan mb-2" />
            <p className="text-xs font-medium text-cyan">Transparencia</p>
            <p className="text-xs text-gray-400">Hacer visible el estado real del trabajo y la calidad del output IA</p>
          </div>
          <div className={cardSm + ' anim-pop stagger-5'}>
            <Target className="w-5 h-5 text-cyan mb-2" />
            <p className="text-xs font-medium text-cyan">Inspección</p>
            <p className="text-xs text-gray-400">Revisar artefactos y progreso con frecuencia — incluye lo generado por IA</p>
          </div>
          <div className={cardSm + ' anim-pop stagger-6'}>
            <Settings className="w-5 h-5 text-cyan mb-2" />
            <p className="text-xs font-medium text-cyan">Adaptación</p>
            <p className="text-xs text-gray-400">Ajustar proceso, herramientas y delegaciones basándose en evidencia</p>
          </div>
        </div>
      </div>
    )

    /* ── Slide 3: Triángulo de decisión ── */
    case 2: return (
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-cyan uppercase tracking-wider">Fundamento 2</span>
          <h2 className="text-3xl font-bold text-white mt-1">Cuándo sí, cuándo no</h2>
          <p className="text-gray-400 mt-2 max-w-2xl">En 2026 la decisión no es binaria. Tres opciones: iterar ágilmente, estabilizar procesos, o automatizar con agentes.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <TriangleSVG />
        </div>
      </div>
    )

    /* ── Slide 4: Liderazgo (EMPHASIS) ── */
    case 3: return (
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-purple uppercase tracking-wider font-bold">Fundamento 3 — Énfasis</span>
          <h2 className="text-3xl font-bold text-white mt-1">Liderazgo: proteger, habilitar, soltar</h2>
        </div>
        <div className="flex-1 flex flex-col lg:flex-row gap-4 items-start">
          <div className="lg:w-1/2">
            <LeadershipSVG />
          </div>
          <div className="lg:w-1/2 space-y-3">
            <div className={`${cardSm} border-cyan/30 anim-fade stagger-1`}>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-cyan" />
                <span className="font-semibold text-cyan text-sm">Proteger</span>
              </div>
              <p className="text-xs text-gray-300">Blindar equipos de interferencia burocrática, deadlines arbitrarios. En era agéntica: establecer políticas claras sobre qué pueden hacer los agentes IA.</p>
            </div>
            <div className={`${cardSm} border-green/30 anim-fade stagger-2`}>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-green" />
                <span className="font-semibold text-green text-sm">Crear espacio</span>
              </div>
              <p className="text-xs text-gray-300">Diferentes equipos, diferentes caminos. La diversidad de enfoques es fortaleza. Transferir mecanismos de poder a los equipos.</p>
            </div>
            <div className={`${cardSm} border-amber/30 anim-fade stagger-3`}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-amber" />
                <span className="font-semibold text-amber text-sm">Confiar y soltar</span>
              </div>
              <p className="text-xs text-gray-300">Líderes crean condiciones para equipos autogestionados y dan paso atrás. Matiz 2026: paso atrás en ejecución, pero intensifica en gobernanza.</p>
            </div>
            <div className={`${cardSm} border-purple/30 anim-fade stagger-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5 text-purple" />
                <span className="font-semibold text-purple text-sm">Gobernar (2026)</span>
              </div>
              <p className="text-xs text-gray-300">Definir límites de autonomía humana y de agentes. Diseñar el sistema de trabajo. Sin gobierno ejecutivo visible, &gt;80% no logra retorno tangible.</p>
            </div>
          </div>
        </div>
        <div className={`${cardSm} border-red/30 mt-2 anim-fade stagger-5 flex items-center gap-3`}>
          <AlertTriangle className="w-5 h-5 text-red shrink-0" />
          <p className="text-xs text-gray-300"><span className="text-red font-semibold">Dato clave:</span> McKinsey 2025 — el rediseño de workflows y el gobierno ejecutivo visible son los dos factores con mayor correlación con impacto en EBIT atribuible a genAI.</p>
        </div>
      </div>
    )

    /* ── Slide 5: Equipos multifuncionales (EMPHASIS) ── */
    case 4: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <span className="text-xs text-purple uppercase tracking-wider font-bold">Fundamento 4 — Énfasis</span>
          <h2 className="text-3xl font-bold text-white mt-1">Equipos multifuncionales centrados en usuario</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="space-y-3">
            <div className={`${card} anim-fade stagger-1`}>
              <Users className="w-6 h-6 text-cyan mb-2" />
              <h3 className="font-semibold text-white text-sm mb-2">Composición dinámica</h3>
              <p className="text-xs text-gray-300 leading-relaxed">El tamaño del equipo y los roles cambian según la etapa de desarrollo. En 2026 esto es dinámico a nivel de sprint — nuevos roles IA surgen según la madurez de la capacidad.</p>
            </div>
            <div className={`${card} anim-fade stagger-2`}>
              <Target className="w-6 h-6 text-green mb-2" />
              <h3 className="font-semibold text-white text-sm mb-2">Centrado en usuario, no en eficiencia</h3>
              <p className="text-xs text-gray-300 leading-relaxed">Diseñadores, investigadores, desarrolladores trabajan juntos. En era agéntica, los agentes IA se evalúan por impacto en experiencia del usuario, no solo por métricas de velocidad.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className={`${card} anim-fade stagger-3`}>
              <Layout className="w-6 h-6 text-amber mb-2" />
              <h3 className="font-semibold text-white text-sm mb-2">Multifuncionalidad = anti-silos</h3>
              <p className="text-xs text-gray-300 leading-relaxed">Evita decisiones desconectadas del usuario final. Un agente que resuelve tickets 5x más rápido pero degrada satisfacción del cliente destruye valor.</p>
            </div>
            <div className={`${card} border-amber/30 anim-fade stagger-4`}>
              <Briefcase className="w-6 h-6 text-amber mb-2" />
              <h3 className="font-semibold text-amber text-sm mb-2">Caso Klarna</h3>
              <p className="text-xs text-gray-300 leading-relaxed">2.3M conversaciones, equivalente a 700 FTE. Pero el valor real: resolución &lt;2 min vs 11 — una métrica de experiencia de usuario, no solo eficiencia.</p>
              <div className="flex gap-2 mt-2">
                <span className={`${mono} text-xs text-green bg-green/10 px-2 py-0.5 rounded`}>-25% repetición</span>
                <span className={`${mono} text-xs text-green bg-green/10 px-2 py-0.5 rounded`}>+$40M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    /* ── Slide 6: Delivery Manager (EMPHASIS) ── */
    case 5: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <span className="text-xs text-purple uppercase tracking-wider font-bold">Fundamento 5 — Énfasis</span>
          <h2 className="text-3xl font-bold text-white mt-1">El Delivery Manager</h2>
          <p className="text-gray-400 mt-2">Configurar el entorno para que el equipo funcione — ahora ese entorno incluye agentes IA.</p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${card} md:col-span-2 anim-fade stagger-1`}>
            <UserCog className="w-8 h-8 text-cyan mb-3" />
            <h3 className="font-semibold text-white text-lg mb-3">Responsabilidades del SM/Delivery Manager</h3>
            <div className="space-y-3">
              {[
                { text: 'Establecer cadencias de trabajo y eliminación de impedimentos', classic: true },
                { text: 'Facilitar colaboración entre disciplinas', classic: true },
                { text: 'Asegurar acceso a recursos, datos y herramientas', classic: true },
                { text: 'Integración gobernada de herramientas IA (agentes, copilots)', classic: false },
                { text: 'Entrenamiento en uso y validación de outputs IA', classic: false },
                { text: 'Prácticas de revisión de código/contenido generado por IA', classic: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 anim-fade`} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                  {item.classic ? <CheckCircle2 className="w-4 h-4 text-cyan mt-0.5 shrink-0" /> : <Zap className="w-4 h-4 text-purple mt-0.5 shrink-0" />}
                  <span className="text-sm text-gray-300">
                    {item.text}
                    {!item.classic && <span className="ml-2 text-[10px] text-purple bg-purple/10 px-1.5 py-0.5 rounded">2026</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className={`${cardSm} anim-pop stagger-3`}>
              <p className="text-xs text-gray-400 mb-1">Scrum Guide</p>
              <p className="text-sm text-white italic leading-relaxed">"El Scrum Master es responsable de establecer Scrum como se define en la Guía de Scrum. Logra esto ayudando al Scrum Team y la organización a comprender la teoría y la práctica."</p>
            </div>
            <div className={`${cardSm} border-purple/30 anim-pop stagger-4`}>
              <p className="text-xs text-purple mb-1">Extensión 2026</p>
              <p className="text-sm text-gray-300 leading-relaxed">Si el delivery manager no configura prácticas de revisión de outputs IA, la "inspección" del ciclo empírico <strong className="text-white">simplemente no ocurre</strong>.</p>
            </div>
            <div className={`${cardSm} border-amber/30 anim-pop stagger-5`}>
              <p className="text-xs text-amber mb-1">Pregunta clave</p>
              <p className="text-sm text-gray-300 italic">"¿Quién en su equipo tiene la responsabilidad explícita de configurar cómo se integra IA al flujo de trabajo?"</p>
            </div>
          </div>
        </div>
      </div>
    )

    /* ── Slide 7: Quiz 1 ── */
    case 6: return <QuizSlide questions={QUIZ_1} title="Quiz: Fundamentos Ágiles" />

    /* ── Slide 8: Era agéntica ── */
    case 7: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Qué entenderemos por <span className="text-amber">era agéntica</span></h2>
          <p className="text-gray-400 mt-2">Agentes = sistemas que planifican y ejecutan múltiples pasos. El problema real: agencia excesiva + bajo control.</p>
        </div>
        <div className="flex-1 flex items-center">
          <AgenticEvolutionSVG />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          <MetricCard icon={Bot} value="62%" label="Experimenta con agentes" source="McKinsey 2025" color="amber" delay={0.3} />
          <MetricCard icon={TrendingUp} value="23%" label="Escalando agentes" source="McKinsey 2025" color="green" delay={0.45} />
          <MetricCard icon={Layers} value="40%" label="Apps con agentes (2026)" source="Gartner" color="purple" delay={0.6} />
          <MetricCard icon={AlertTriangle} value="<5%" label="Apps con agentes (2025)" source="Gartner" color="red" delay={0.75} />
        </div>
      </div>
    )

    /* ── Slide 9: Scrum roles canónicos (EMPHASIS) ── */
    case 8: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <span className="text-xs text-purple uppercase tracking-wider font-bold">Roles — Base canónica</span>
          <h2 className="text-3xl font-bold text-white mt-1">Scrum: el punto de partida</h2>
          <p className="text-gray-400 mt-2">En era agéntica no se elimina la accountability; se reubica.</p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${card} anim-pop stagger-1 border-cyan/30`}>
            <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-7 h-7 text-cyan" />
            </div>
            <h3 className="text-lg font-bold text-cyan mb-2">Product Owner</h3>
            <p className="text-sm text-gray-300 mb-3">Maximizar el valor del producto resultante del trabajo del Scrum Team.</p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-cyan shrink-0" />Gestionar el Product Backlog</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-cyan shrink-0" />Comunicar el Objetivo del Producto</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-cyan shrink-0" />Ordenar items del Backlog</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-cyan shrink-0" />Asegurar transparencia</li>
            </ul>
          </div>
          <div className={`${card} anim-pop stagger-2 border-green/30`}>
            <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center mb-3">
              <UserCog className="w-7 h-7 text-green" />
            </div>
            <h3 className="text-lg font-bold text-green mb-2">Scrum Master</h3>
            <p className="text-sm text-gray-300 mb-3">Establecer Scrum, lograr efectividad del equipo como líder servidor.</p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-green shrink-0" />Coach del equipo en autogestión</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-green shrink-0" />Eliminar impedimentos</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-green shrink-0" />Asegurar eventos productivos</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-green shrink-0" />Servir a la organización</li>
            </ul>
          </div>
          <div className={`${card} anim-pop stagger-3 border-amber/30`}>
            <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-7 h-7 text-amber" />
            </div>
            <h3 className="text-lg font-bold text-amber mb-2">Developers</h3>
            <p className="text-sm text-gray-300 mb-3">Crear cualquier aspecto de un Increment utilizable cada Sprint.</p>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-amber shrink-0" />Plan del Sprint</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-amber shrink-0" />Calidad en Definition of Done</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-amber shrink-0" />Adaptar plan cada día</li>
              <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-0.5 text-amber shrink-0" />Responsabilidad mutua</li>
            </ul>
          </div>
        </div>
      </div>
    )

    /* ── Slide 10: Adopción de IA ── */
    case 9: return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white">Adopción de IA: la curva ya cruzó el umbral</h2>
          <p className="text-gray-400 mt-2">Uso ≠ valor enterprise. La trampa de "tool rollout".</p>
        </div>
        <div className="flex-1 space-y-4">
          <DataBar label="Uso regular genAI (2024)" value={65} color="#10b981" delay={0.1} />
          <DataBar label="Uso regular genAI (2025)" value={71} color="#10b981" delay={0.25} />
          <DataBar label="AI en ≥1 función (2025)" value={88} color="#06b6d4" delay={0.4} />
          <DataBar label="Experimenta con agentes" value={62} color="#f59e0b" delay={0.55} />
          <DataBar label="Escalando agentes" value={23} color="#a855f7" delay={0.7} />
          <DataBar label="Apps con agentes (proy. 2026)" value={40} color="#a855f7" delay={0.85} />
          <DataBar label="Devs usando AI" value={62} color="#06b6d4" delay={1} />
        </div>
        <p className="text-xs text-gray-500 mt-3">Fuentes: McKinsey 2024-2025, Gartner 2025, Stack Overflow 2024</p>
      </div>
    )

    /* ── Slide 11: Productividad sube y baja ── */
    case 10: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Productividad: lo que sube <span className="text-red">y lo que baja</span></h2>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-green font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Lo que sube</h3>
            <div className="space-y-3">
              <DataBar label="Programación (lab)" value={55.8} suffix="% más rápido" color="#10b981" max={60} delay={0.1} />
              <DataBar label="Escritura: tiempo" value={-40} suffix="% tiempo" color="#10b981" max={60} delay={0.25} />
              <DataBar label="Escritura: calidad" value={18} suffix="%" color="#10b981" max={60} delay={0.4} />
              <DataBar label="Novatos contact center" value={34} suffix="%" color="#10b981" max={60} delay={0.55} />
              <DataBar label="PRs (Copilot/Accenture)" value={8.69} suffix="%" color="#10b981" max={60} delay={0.7} />
              <DataBar label="Builds exitosos" value={84} suffix="%" color="#10b981" max={100} delay={0.85} />
            </div>
          </div>
          <div>
            <h3 className="text-red font-semibold mb-3 flex items-center gap-2"><TrendingDown className="w-5 h-5" /> Alertas</h3>
            <div className="space-y-3">
              <DataBar label="Expertos open-source (METR)" value={19} suffix="% más lento" color="#ef4444" max={60} delay={0.2} />
            </div>
            <div className={`${card} mt-4 border-red/30 anim-fade stagger-4`}>
              <AlertTriangle className="w-5 h-5 text-red mb-2" />
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-red">Brecha percepción-realidad:</strong> los desarrolladores expertos creen ser ~20% más rápidos con IA, pero en realidad tardan 19% más (METR RCT 2025).
              </p>
              <p className="text-xs text-gray-500 mt-2">Mensaje de liderazgo: "adopción selectiva + medición real + entrenamiento", no fe.</p>
            </div>
          </div>
        </div>
      </div>
    )

    /* ── Slide 12: DORA ── */
    case 11: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">DORA 2024: <span className="text-cyan">local</span> vs <span className="text-red">sistémico</span></h2>
          <p className="text-gray-400 mt-2">Con +25% adopción de IA, mejoras locales no se traducen automáticamente en outcomes.</p>
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-xs text-green font-semibold uppercase tracking-wider">Mejoras (por +25% adopción IA)</p>
          <DataBar label="Calidad documentación" value={7.5} color="#10b981" max={15} delay={0.1} />
          <DataBar label="Calidad código" value={3.4} color="#10b981" max={15} delay={0.2} />
          <DataBar label="Velocidad code review" value={3.1} color="#10b981" max={15} delay={0.3} />
          <DataBar label="Flow individual" value={2.6} color="#06b6d4" max={15} delay={0.4} />
          <DataBar label="Satisfacción laboral" value={2.2} color="#06b6d4" max={15} delay={0.5} />
          <p className="text-xs text-red font-semibold uppercase tracking-wider mt-4">Degradaciones sistémicas</p>
          <DataBar label="Throughput de entrega" value={-1.5} color="#ef4444" max={15} delay={0.6} />
          <DataBar label="Estabilidad" value={-7.2} color="#ef4444" max={15} delay={0.7} />
        </div>
        <div className={`${cardSm} border-amber/30 mt-3 anim-fade stagger-6`}>
          <p className="text-xs text-gray-300"><span className="text-amber font-semibold">Conexión con fundamentos:</span> sin el ciclo inspección → adaptación, las mejoras locales nunca se convierten en mejoras sistémicas. La gestión ágil debe convertir mejoras locales en outcomes.</p>
        </div>
      </div>
    )

    /* ── Slide 13: Vacuum effect ── */
    case 12: return (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-2xl">
          <AlertTriangle className="w-16 h-16 text-amber mx-auto mb-6 anim-pop stagger-1" />
          <h2 className="text-3xl font-bold text-white mb-4 anim-fade stagger-2">El "Vacuum Effect"</h2>
          <p className="text-lg text-gray-300 mb-8 anim-fade stagger-3">
            Si IA acelera tareas valiosas, se crea un <strong className="text-amber">"vacío de tiempo"</strong>. Si la organización no rediseña, ese vacío se rellena con más burocracia y retrabajo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`${card} anim-pop stagger-3`}>
              <Clock className="w-8 h-8 text-green mx-auto mb-2" />
              <p className={`${mono} text-xl text-green font-bold`}>Tiempo liberado</p>
              <p className="text-xs text-gray-400 mt-1">IA acelera tareas cognitivas</p>
            </div>
            <div className={`${card} anim-pop stagger-4 border-red/30`}>
              <AlertTriangle className="w-8 h-8 text-red mx-auto mb-2" />
              <p className={`${mono} text-xl text-red font-bold`}>Sin rediseño</p>
              <p className="text-xs text-gray-400 mt-1">Vacío se llena con burocracia</p>
            </div>
            <div className={`${card} anim-pop stagger-5 border-green/30`}>
              <TrendingUp className="w-8 h-8 text-cyan mx-auto mb-2" />
              <p className={`${mono} text-xl text-cyan font-bold`}>Con rediseño</p>
              <p className="text-xs text-gray-400 mt-1">Vacío se convierte en innovación</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 anim-fade stagger-6">DORA: tiempo en trabajo valioso cae (-2.6%) aun subiendo flow/productividad. El rol del liderazgo es proteger ese vacío.</p>
        </div>
      </div>
    )

    /* ── Slide 14: Sistema ágil-agéntico ── */
    case 13: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Sistema ágil-agéntico <span className="text-cyan">end-to-end</span></h2>
          <p className="text-gray-400 mt-2">Agentes aceleran cada fase; el control se desplaza a reglas, pruebas, políticas y revisión.</p>
        </div>
        <div className="flex-1 flex items-center">
          <SystemE2ESVG />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {[
            { label: 'Discovery', desc: 'Agente genera insights de usuario, sintetiza research', color: 'cyan' },
            { label: 'Build', desc: 'Agente genera código, refactors, documentación', color: 'amber' },
            { label: 'Test', desc: 'Agente genera tests, triage automatizado', color: 'green' },
            { label: 'Observe', desc: 'Agente resume incidentes, detecta anomalías', color: 'purple' },
          ].map((item, i) => (
            <div key={i} className={`${cardSm} anim-pop stagger-${i + 2}`}>
              <p className={`text-xs font-semibold text-${item.color} mb-1`}>{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )

    /* ── Slide 15: Roles redefinidos (EMPHASIS) ── */
    case 14: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <span className="text-xs text-purple uppercase tracking-wider font-bold">Roles — Redefinición 2026</span>
          <h2 className="text-3xl font-bold text-white mt-1">De "hacer" a "orquestar y asegurar"</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-2 px-2 text-cyan font-semibold w-28">Rol</th>
                <th className="py-2 px-2 text-gray-400 font-medium">Accountability base</th>
                <th className="py-2 px-2 text-purple font-medium">Upgrade 2026</th>
                <th className="py-2 px-2 text-amber font-medium">Artefactos nuevos</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-300">
              <tr className="border-b border-white/5 anim-fade stagger-1">
                <td className="py-3 px-2 font-semibold text-cyan">Product Owner</td>
                <td className="py-3 px-2">Maximizar valor; gestionar Product Backlog</td>
                <td className="py-3 px-2">Diseñar "value + guardrails": decidir qué se delega a agentes, con qué límites; priorizar rediseño de workflow para capturar EBIT</td>
                <td className="py-3 px-2 text-amber">Policy-by-design, criterios verificables, eval sets mínimos</td>
              </tr>
              <tr className="border-b border-white/5 anim-fade stagger-2 bg-purple/5">
                <td className="py-3 px-2 font-semibold text-green">SM / Delivery Manager</td>
                <td className="py-3 px-2">Establecer Scrum; lograr efectividad; liderazgo servidor; configurar entorno ágil</td>
                <td className="py-3 px-2">"Flow & adoption architect": entrenar uso/validación, bajar fricción, proteger foco; asegurar integración gobernada de IA</td>
                <td className="py-3 px-2 text-amber">Guías de uso, checklists de validación, métricas DevEx/Flow</td>
              </tr>
              <tr className="border-b border-white/5 anim-fade stagger-3">
                <td className="py-3 px-2 font-semibold text-amber">Developers</td>
                <td className="py-3 px-2">Entregar Increment; plan del Sprint; calidad en DoD</td>
                <td className="py-3 px-2">"Engineer + evaluator": orquestar agentes, revisar, asegurar seguridad, testear; gestionar deuda y contaminación</td>
                <td className="py-3 px-2 text-amber">Suites de pruebas, linters/SAST, revisión de prompts</td>
              </tr>
              <tr className="anim-fade stagger-4 bg-purple/5">
                <td className="py-3 px-2 font-semibold text-purple">Líderes</td>
                <td className="py-3 px-2">Crear condiciones para equipos efectivos; proteger; transferir poder</td>
                <td className="py-3 px-2">"Agent-boss / system steward": definir human-agent ratio, rediseñar estructura (work charts), decidir centralización vs federación</td>
                <td className="py-3 px-2 text-amber">Modelo de gobernanza, métricas de impacto (EBIT/ROI), controles de riesgo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`${cardSm} border-purple/30 mt-3 anim-fade stagger-5`}>
          <p className="text-xs text-gray-300"><span className="text-purple font-semibold">Clave:</span> La accountability no desaparece, se reubica y se expande. Los roles Scrum permanecen; cambia el contenido de lo que hacen día a día.</p>
        </div>
      </div>
    )

    /* ── Slide 16: Gobernanza 3 modelos ── */
    case 15: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Gobernanza: <span className="text-cyan">3 modelos</span></h2>
          <p className="text-gray-400 mt-2">Solo 18% reportaba un council/board con autoridad para IA responsable (McKinsey 2024). Esto es un gap crítico en 2026.</p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Centralizado', subtitle: 'AI CoE fuerte', pros: 'Consistencia, control, cumplimiento', cons: 'Cuellos de botella, baja adopción local', when: 'Industrias reguladas, riesgo alto', color: 'cyan', icon: Shield },
            { title: 'Federado', subtitle: 'Centro + unidades', pros: 'Balance velocidad/control', cons: 'Inconsistencia, "shadow AI"', when: 'Empresas multi-unidad por productos', color: 'amber', icon: Layers },
            { title: 'Product-aligned', subtitle: 'Por value streams', pros: 'Conecta IA con outcomes; mejor feedback loop', cons: 'Requiere madurez de medición', when: 'Agile ya escalado y hay telemetría', color: 'purple', icon: Layout },
          ].map((m, i) => (
            <div key={i} className={`${card} border-${m.color}/30 anim-pop stagger-${i + 1} flex flex-col`}>
              <m.icon className={`w-8 h-8 text-${m.color} mb-3`} />
              <h3 className={`text-lg font-bold text-${m.color} mb-1`}>{m.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{m.subtitle}</p>
              <div className="space-y-2 flex-1">
                <div><p className="text-[10px] text-green uppercase">Ventajas</p><p className="text-xs text-gray-300">{m.pros}</p></div>
                <div><p className="text-[10px] text-red uppercase">Riesgos</p><p className="text-xs text-gray-300">{m.cons}</p></div>
                <div><p className="text-[10px] text-cyan uppercase">Cuándo encaja</p><p className="text-xs text-gray-300">{m.when}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

    /* ── Slide 17: Métricas tablero mínimo ── */
    case 16: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Métricas: tablero mínimo viable</h2>
          <p className="text-gray-400 mt-2">Para evitar "local wins / system losses" — medir impacto neto.</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { dim: 'Velocidad E2E', metric: 'Lead time / throughput (DORA)', why: 'Captura el sistema completo', alert: 'Throughput baja con "más commits"', color: 'cyan', icon: Gauge },
              { dim: 'Estabilidad', metric: 'Change failure rate', why: 'Señala deuda y fragilidad', alert: 'Estabilidad cae con IA (-7.2%)', color: 'green', icon: Shield },
              { dim: 'Calidad', metric: 'Build success, PR merge rate, defect escape', why: 'IA puede inflar volumen con deuda', alert: 'Aumenta volumen; cae merge rate', color: 'amber', icon: CheckCircle2 },
              { dim: 'Productividad', metric: 'Flow / productividad percibida', why: 'Indicador humano (sostenibilidad)', alert: 'Suben percepciones, baja valor real', color: 'purple', icon: Brain },
              { dim: 'ROI', metric: '% EBIT atribuible; costo/beneficio', why: 'Evita "AI theater"', alert: '>80% sin impacto EBIT enterprise', color: 'red', icon: BarChart3 },
              { dim: 'Riesgo', metric: 'Incidentes IA (privacidad, IP, sesgo)', why: 'Cumplimiento y reputación', alert: 'Consecuencias por inexactitud', color: 'red', icon: AlertTriangle },
            ].map((m, i) => (
              <div key={i} className={`${cardSm} anim-fade stagger-${i + 1} flex gap-3`}>
                <m.icon className={`w-6 h-6 text-${m.color} shrink-0 mt-0.5`} />
                <div>
                  <p className={`text-sm font-semibold text-${m.color}`}>{m.dim}</p>
                  <p className="text-xs text-white mt-0.5">{m.metric}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{m.why}</p>
                  <p className="text-[10px] text-red/70 mt-0.5">⚠ {m.alert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

    /* ── Slide 18: Quiz 2 ── */
    case 17: return <QuizSlide questions={QUIZ_2} title="Quiz: Roles y Liderazgo en Era Agéntica" />

    /* ── Slide 19: Casos cuantificados ── */
    case 18: return (
      <div className="h-full flex flex-col">
        <div className="mb-3">
          <h2 className="text-3xl font-bold text-white">Casos cuantificados</h2>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          <div className={`${card} border-green/30 anim-pop stagger-1`}>
            <h3 className="font-bold text-green text-sm mb-2">Copilot + Accenture (RCT)</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-400">Pull Requests</span><span className={`${mono} text-green`}>+8.69%</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Merge rate</span><span className={`${mono} text-green`}>+15%</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Builds exitosos</span><span className={`${mono} text-green`}>+84%</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Satisfacción</span><span className={`${mono} text-green`}>90% más fulfilled</span></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Con telemetría y prácticas de calidad, el aumento de output acompaña señales de calidad.</p>
          </div>
          <div className={`${card} border-amber/30 anim-pop stagger-2`}>
            <h3 className="font-bold text-amber text-sm mb-2">Klarna — Agente end-to-end</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-400">Conversaciones</span><span className={`${mono} text-amber`}>2.3M</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Equivalente FTE</span><span className={`${mono} text-amber`}>700</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Resolución</span><span className={`${mono} text-amber`}>&lt;2 min vs 11</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Profit improvement</span><span className={`${mono} text-amber`}>+$40M</span></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Revenue por empleado +73% (SEK 4M→7M). Reducción vía attrition.</p>
          </div>
          <div className={`${card} border-cyan/30 anim-pop stagger-3`}>
            <h3 className="font-bold text-cyan text-sm mb-2">Escritura profesional</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-400">Tiempo</span><span className={`${mono} text-green`}>-40%</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Calidad</span><span className={`${mono} text-green`}>+18%</span></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Transferible a PO (PRDs, historias), SM (minutas, riesgos), Líderes (síntesis ejecutiva).</p>
          </div>
          <div className={`${card} border-red/30 anim-pop stagger-4`}>
            <h3 className="font-bold text-red text-sm mb-2">Contracaso: METR RCT</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-400">Devs expertos</span><span className={`${mono} text-red`}>+19% más lento</span></div>
              <div className="flex justify-between text-xs"><span className="text-gray-400">Percepción</span><span className={`${mono} text-red`}>Creen ser ~20% más rápidos</span></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Trabajo altamente contextual en repos grandes. Enseñanza: no medir = autoengaño.</p>
          </div>
        </div>
      </div>
    )

    /* ── Slide 20: Checklist 30 días ── */
    case 19: return (
      <div className="h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-6 text-center anim-fade">Checklist de implementación: <span className="text-cyan">30 días</span></h2>
        <div className="max-w-2xl mx-auto w-full space-y-4">
          {[
            { step: 1, title: 'Verificar fundamentos', desc: '¿Hay liderazgo protector, equipos multifuncionales, cadencias de inspección reales?', color: 'cyan' },
            { step: 2, title: 'Medir antes/después', desc: 'Establecer baseline: DORA + DevEx + calidad. Sin baseline no hay ROI.', color: 'green' },
            { step: 3, title: 'Definir guardrails', desc: 'Datos/IP/seguridad + entrenamiento. 72% preocupación privacidad/seguridad (PMI Sweden).', color: 'amber' },
            { step: 4, title: 'Empezar pequeño', desc: '1-2 workflows, no "comprar todo". 64% recomienda iniciar pequeño y escalar (PMI Sweden).', color: 'purple' },
            { step: 5, title: 'Iterar con evidencia', desc: 'Aplicar el ciclo empírico a la propia adopción de IA. Revisar en 30 días con datos.', color: 'cyan' },
          ].map((s, i) => (
            <div key={i} className={`${card} flex items-start gap-4 anim-fade`} style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <div className={`w-10 h-10 rounded-lg bg-${s.color}/10 border border-${s.color}/30 flex items-center justify-center shrink-0`}>
                <span className={`${mono} text-lg font-bold text-${s.color}`}>{s.step}</span>
              </div>
              <div>
                <h3 className={`font-semibold text-${s.color} text-sm`}>{s.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${cardSm} border-cyan/30 mt-6 max-w-2xl mx-auto w-full anim-fade stagger-6 text-center`}>
          <p className="text-sm text-gray-300 italic">"La IA agéntica amplifica lo que ya tienen. Si los fundamentos son sólidos, amplifica valor. Si son frágiles, amplifica disfunción."</p>
        </div>
      </div>
    )

    default: return null
  }
}

/* ─── SLIDE TITLES for nav ─── */
const SLIDE_TITLES = [
  'Título', 'Ciclo empírico', 'Cuándo sí/cuándo no', 'Liderazgo',
  'Equipos multifuncionales', 'Delivery Manager', 'Quiz: Fundamentos',
  'Era agéntica', 'Scrum roles', 'Adopción IA', 'Productividad',
  'DORA', 'Vacuum effect', 'Sistema E2E', 'Roles redefinidos',
  'Gobernanza', 'Métricas', 'Quiz: Roles', 'Casos', 'Checklist 30d'
]
const QUIZ_SLIDES = [6, 17]
const TOTAL = SLIDE_TITLES.length

/* ─── MAIN APP ─── */
export default function App() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const slideRef = useRef(null)

  const go = useCallback((dir) => {
    if (animating) return
    const next = dir === 'next' ? Math.min(current + 1, TOTAL - 1) : Math.max(current - 1, 0)
    if (next === current) return
    setAnimating(true)
    if (slideRef.current) slideRef.current.classList.replace('slide-enter', 'slide-exit')
    setTimeout(() => {
      setCurrent(next)
      setAnimating(false)
    }, 300)
  }, [current, animating])

  const goTo = useCallback((idx) => {
    if (animating || idx === current) return
    setAnimating(true)
    if (slideRef.current) slideRef.current.classList.replace('slide-enter', 'slide-exit')
    setTimeout(() => { setCurrent(idx); setAnimating(false); setShowNav(false) }, 300)
  }, [current, animating])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go('next') }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go('prev') }
      if (e.key === 'Escape') setShowNav(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  return (
    <div className="h-screen w-screen bg-bg-deep text-white flex flex-col overflow-hidden select-none">
      {/* Progress bar */}
      <div className="h-1 bg-white/5 w-full shrink-0">
        <div className="h-full bg-cyan transition-all duration-500 ease-out" style={{ width: `${((current + 1) / TOTAL) * 100}%` }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0">
        <span className={`${mono} text-xs text-gray-500`}>
          {String(current + 1).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-1">
          {SLIDE_TITLES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-cyan w-6' : QUIZ_SLIDES.includes(i) ? 'bg-amber/50 hover:bg-amber' : 'bg-white/15 hover:bg-white/30'}`}
              title={SLIDE_TITLES[i]} />
          ))}
        </div>
        <button onClick={() => setShowNav(!showNav)} className="text-xs text-gray-500 hover:text-cyan transition">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Nav dropdown */}
      {showNav && (
        <div className="absolute top-10 right-4 z-50 bg-bg-surface border border-white/10 rounded-xl p-3 w-72 max-h-96 overflow-y-auto shadow-2xl anim-fade">
          {SLIDE_TITLES.map((t, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition ${i === current ? 'bg-cyan/10 text-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <span className={`${mono} text-xs mr-2`}>{String(i + 1).padStart(2, '0')}</span>
              {t}
              {QUIZ_SLIDES.includes(i) && <span className="ml-2 text-[10px] text-amber bg-amber/10 px-1.5 py-0.5 rounded">Quiz</span>}
            </button>
          ))}
        </div>
      )}

      {/* Slide content */}
      <div className="flex-1 overflow-hidden px-6 md:px-12 py-4 relative">
        <div key={current} ref={slideRef} className="slide-enter h-full">
          <SlideContent index={current} />
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0">
        <button onClick={() => go('prev')} disabled={current === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${current === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <span className="text-xs text-gray-600">{SLIDE_TITLES[current]}</span>
        <button onClick={() => go('next')} disabled={current === TOTAL - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${current === TOTAL - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
          Siguiente <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
