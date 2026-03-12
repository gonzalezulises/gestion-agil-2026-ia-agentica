# Prompt para Claude Code: Presentación Web Interactiva

## Contexto

Tienes el archivo `gestion-agil-2026-ia-agentica.md` que contiene una investigación completa sobre gestión ágil en 2026 con IA agéntica. Necesito que lo conviertas en una presentación web interactiva tipo slide deck.

## Stack técnico

- React (single file .jsx, Tailwind utility classes)
- Sin dependencias externas excepto las disponibles en el entorno (lucide-react, recharts, d3 si necesitas)
- Diagramas en SVG inline (NO usar librerías externas de diagramas)
- Fuentes: cargar desde Google Fonts (DM Sans para cuerpo, JetBrains Mono para datos/código)

## Estructura de slides

Convertir el contenido del .md en las siguientes slides, respetando el orden:

| # | Slide | Contenido del .md |
|---|-------|-------------------|
| 1 | Título + métricas clave | Resumen ejecutivo: 71% uso genAI, 62% experimenta agentes, >80% sin EBIT |
| 2 | Fundamento 1: Ciclo empírico | Sección "El objetivo central de la agilidad" |
| 3 | Fundamento 2: Cuándo sí/cuándo no | Sección "Cuándo la agilidad es esencial" + triángulo ágil/estable/automatizado |
| 4 | Fundamento 3: Liderazgo | Sección "El rol del liderazgo: proteger, habilitar, soltar" |
| 5 | Fundamento 4: Equipos multifuncionales | Sección "Equipos: composición dinámica y multifuncionalidad" |
| 6 | Fundamento 5: Delivery Manager | Sección "El Delivery Manager" |
| 7 | **QUIZ: Preguntas 1–5** | Ver sección "Preguntas de autocomprobación" abajo |
| 8 | Era agéntica | Slide 7 del .md: asistente → agente → multiagente → ecosistema |
| 9 | Scrum roles canónicos | Slide 8 del .md |
| 10 | Adopción de IA (datos) | Slide 9 del .md: series de datos de adopción |
| 11 | Productividad: lo que sube y baja | Slides 10-11 del .md: datos positivos y contracasos |
| 12 | DORA: local vs sistémico | Slide 12 del .md: mejoras locales vs pérdidas sistémicas |
| 13 | Vacuum effect | Slide 13 del .md |
| 14 | Sistema ágil-agéntico | Slide 16 del .md: diagrama end-to-end Discovery→Observe |
| 15 | Roles redefinidos | Slide 18 del .md: tabla comparativa roles clásicos vs 2026 |
| 16 | Gobernanza: 3 modelos | Slide 22 del .md: centralizado/federado/product-aligned |
| 17 | Métricas: tablero mínimo | Slide 23 del .md |
| 18 | **QUIZ: Preguntas 6–10** | Ver sección "Preguntas de autocomprobación" abajo |
| 19 | Casos cuantificados | Copilot+Accenture, Klarna, escritura profesional, contracaso METR |
| 20 | Checklist 30 días | Slide 28 del .md: 5 pasos de implementación |

## Preguntas de autocomprobación (para los quizzes)

Implementar como tarjetas interactivas Verdadero/Falso. Cada pregunta muestra feedback al responder (correcto/incorrecto + explicación). Todas son **Verdadero**.

### Quiz 1 (slide 7)

1. **Pregunta:** "El objetivo principal de la agilidad es ofrecer mejores resultados mediante la obtención de retroalimentación frecuente, la inspección de los resultados y la adaptación en función de esa retroalimentación."
   **Explicación:** El ciclo empírico (transparencia → inspección → adaptación) es el mecanismo central. En era agéntica se vuelve más necesario porque la IA amplifica aciertos y errores a mayor velocidad.

2. **Pregunta:** "El liderazgo debe apoyar y proteger a los equipos ágiles de ser arrastrados de vuelta a viejas formas de trabajo, y deben cambiar la dinámica de poder transfiriendo mecanismos de poder a los equipos ágiles."
   **Explicación:** Sin liderazgo protector, los equipos son reabsorbidos por la inercia burocrática. McKinsey 2025: >80% sin gobierno ejecutivo visible no logra retorno tangible de genAI.

3. **Pregunta:** "Las transformaciones ágiles pueden fracasar porque no cuentan con el apoyo ejecutivo o de los mandos medios."
   **Explicación:** El apoyo ejecutivo es condición estructural. En contexto agéntico, el liderazgo define límites de autonomía (humana y de agentes); sin esto la adopción es caótica.

4. **Pregunta:** "La agilidad es esencial cuando existen grandes brechas de satisfacción del cliente o cuando las necesidades de los clientes están cambiando rápidamente."
   **Explicación:** En 2026 se agrega una tercera dimensión: automatización directa para workflows repetitivos. La decisión se convierte en triángulo: ágil vs. estable vs. automatizado.

5. **Pregunta:** "Cuando las brechas de satisfacción son pequeñas y las necesidades son estables, los procesos estables a menudo satisfacen mejor las necesidades de los clientes."
   **Explicación:** No todo requiere agilidad. Procesos estables bien ejecutados generan eficiencia predecible. El error es "agilizar" lo que funciona bien, generando fricción sin valor.

### Quiz 2 (slide 18)

6. **Pregunta:** "Diferentes equipos tomarán diferentes caminos hacia los objetivos de su organización. Los líderes ágiles necesitan crear espacio para que todos contribuyan."
   **Explicación:** La diversidad de enfoques es una fortaleza. En era agéntica se traduce en autonomía por nivel y work charts dinámicos donde cada equipo define su human-agent ratio.

7. **Pregunta:** "Aprender a confiar en la inteligencia ascendente cambia el papel de los gerentes. Los líderes ágiles crean condiciones para equipos autogestionados y luego dan un paso atrás."
   **Explicación:** Matiz 2026: el líder da paso atrás en ejecución táctica pero intensifica su rol en gobernanza, límites de autonomía y diseño del sistema de trabajo.

8. **Pregunta:** "El tamaño de su equipo y los roles que necesita cambiarán a medida que construya su servicio. Necesitará diferentes habilidades durante las diferentes etapas de desarrollo."
   **Explicación:** En 2026 esto es dinámico incluso a nivel de sprint: nuevos roles IA (AI Security Specialist, AI Agent Specialist) surgen según la madurez de la capacidad IA.

9. **Pregunta:** "Todo el equipo debe trabajar junto para diseñar, construir e iterar un servicio basado en las necesidades de usuario de las personas a las que va dirigido."
   **Explicación:** La multifuncionalidad evita silos y decisiones desconectadas. En era agéntica, los agentes se evalúan por impacto en experiencia de usuario, no solo eficiencia.

10. **Pregunta:** "El delivery manager es responsable de liderar la configuración del entorno ágil que su equipo necesita para crear e iterar un servicio centrado en el usuario."
    **Explicación:** En 2026, ese entorno incluye agentes IA. El delivery manager (SM) asegura que la integración de IA sea gobernada, evaluada y alineada con calidad y transparencia.

## Diagramas animados (SVG)

Construir los siguientes diagramas como SVG inline con animaciones CSS/JS (NO Mermaid). Cada nodo y flecha debe aparecer con stagger delay secuencial para guiar la narrativa.

### Diagrama 1: Ciclo empírico (slide 2)
```
Transparencia → Inspección → Adaptación
      ↑________________________________↓ (feedback loop)
      [⚡ IA amplifica velocidad Y errores]
```

### Diagrama 2: Triángulo de decisión (slide 3)
```
              [Agilidad]
             /          \
            /            \
   [Estabilidad] ---- [Automatización]
```
Con etiquetas: "Brechas grandes / cambio rápido", "Brechas pequeñas / estable", "Repetitivo / reglas claras". Flechas bidireccionales punteadas entre los tres.

### Diagrama 3: Liderazgo (slide 4)
```
           [Líder Ágil]
          /   |    \      \
   [Proteger] [Habilitar] [Soltar] [🆕 Gobernar]
          \   |    /      /
         [Equipo autogestionado + agentes]
```

### Diagrama 4: Evolución agéntica (slide 8)
```
[Asistente] → [Agente] → [Multiagente] → [Ecosistema]
                  ↓             ↓
            [⚠️ Riesgo: agency sin control]
```

### Diagrama 5: Sistema end-to-end (slide 14)
```
[Discovery] → [Backlog] → [Build] → [Test] → [Release] → [Observe]
                  ↑            ↑         ↑                    ↑
           [Agent: PRD] [Agent: Code] [Agent: Test]  [Agent: Incidents]
```
Con flecha de feedback de Observe a Discovery.

## Componentes interactivos requeridos

### Navegación
- Flechas ← → del teclado
- Botones anterior/siguiente
- Barra de progreso superior
- Indicador de slide actual (01/20)
- Dots clickeables para navegación directa (los dots de slides quiz deben verse diferente)
- Transición suave entre slides (fade + translateY)

### Quiz cards
- Cada pregunta es una tarjeta con dos botones: Verdadero / Falso
- Al responder: la tarjeta cambia de color (verde correcto, rojo incorrecto)
- Muestra explicación con el dato de evidencia
- El quiz scrollea verticalmente si las 5 preguntas no caben
- Mostrar contador de aciertos al final del quiz

### Data bars (para slide de productividad)
- Barras horizontales animadas que crecen al entrar en la slide
- Color verde para mejoras, rojo para alertas
- Valor numérico con sufijo %
- Stagger delay entre barras

### Metric cards (para datos destacados)
- Mini tarjetas con icono, valor grande, etiqueta y fuente
- Usar font monospace para valores numéricos

## Estética

- Tema oscuro (fondo ~#0a0f1a, superficies ~#111827)
- Acento cyan (#06b6d4) como color principal
- Amber (#f59e0b) para warnings y agentes
- Rojo (#ef4444) para alertas y contracasos
- Verde (#10b981) para datos positivos
- Púrpura (#a855f7) para elementos nuevos/2026
- Bordes sutiles, border-radius 8-12px
- Tipografía limpia: DM Sans para texto, JetBrains Mono para datos
- Animaciones contenidas y funcionales, no decorativas

## Datos clave del .md que deben aparecer con sus valores exactos

- 71% uso regular genAI (McKinsey 2025)
- 62% experimenta con agentes (McKinsey 2025)
- >80% sin impacto EBIT (McKinsey 2025)
- 82% líderes: punto de inflexión (Microsoft WTI)
- +55.8% más rápido programación lab
- −40% tiempo escritura, +18% calidad
- +34% productividad novatos contact center
- +19% más lento expertos (METR RCT)
- DORA: +7.5% doc, +3.4% code, +3.1% review, −1.5% throughput, −7.2% estabilidad
- Copilot/Accenture: +8.69% PRs, +15% merge, +84% builds
- Klarna: 2.3M conversaciones, 700 FTE, <2 min vs 11, +$40M
- Solo 18% tenía council IA responsable (McKinsey 2024)
- 72% preocupación privacidad/seguridad (PMI Sweden)
- 64% recomienda iniciar pequeño (PMI Sweden)

## Qué NO hacer

- No usar localStorage/sessionStorage
- No usar librerías externas de diagramas (Mermaid, etc.)
- No crear archivos separados para CSS/JS
- No usar fonts genéricas (Inter, Roboto, Arial)
- No poner gradientes morados sobre blanco
- No sobrecargar de animaciones decorativas
