// diagnostics_data.js
// Contiene la base de datos de preguntas y lógica de cruce científico para Kolb e Inteligencias Múltiples

export const KOLB_QUESTIONS = [
    { id: 1, title: "Cuando aprendo:", a: "Prefiero valerme de mis sensaciones y sentimientos", b: "Prefiero mirar y atender", c: "Prefiero pensar en las ideas", d: "Prefiero hacer cosas" },
    { id: 2, title: "Aprendo mejor cuando:", a: "Confío en mis corazonadas y sentimientos", b: "Atiendo y observo cuidadosamente", c: "Confío en mis pensamientos lógicos", d: "Trabajo duramente para que las cosas queden realizadas" },
    { id: 3, title: "Cuando estoy aprendiendo:", a: "Tengo sentimientos y reacciones fuertes", b: "Soy reservado y tranquilo", c: "Busco razonar sobre las cosas que están sucediendo", d: "Me siento responsable de las cosas" },
    { id: 4, title: "Aprendo a través de:", a: "Sentimientos", b: "Observaciones", c: "Razonamientos", d: "Acciones" },
    { id: 5, title: "Cuando aprendo:", a: "Estoy abierto a nuevas experiencias", b: "Tomo en cuenta todos los aspectos relacionados", c: "Prefiero analizar las cosas dividiéndolas en sus partes componentes", d: "Prefiero hacer las cosas directamente" },
    { id: 6, title: "Cuando estoy aprendiendo:", a: "Soy una persona intuitiva", b: "Soy una persona observadora", c: "Soy una persona lógica", d: "Soy una persona activa" },
    { id: 7, title: "Aprendo mejor a través de:", a: "Las relaciones con mis compañeros", b: "La observación", c: "Teorías racionales", d: "La práctica de los temas tratados" },
    { id: 8, title: "Cuando aprendo:", a: "Me siento involucrado en los temas tratados", b: "Me tomo mi tiempo antes de actuar", c: "Prefiero las teorías y las ideas", d: "Prefiero ver los resultados a través de mi propio trabajo" },
    { id: 9, title: "Aprendo mejor cuando:", a: "Me baso en mis intuiciones y sentimientos", b: "Me baso en observaciones personales", c: "Tomo en cuenta mis propias ideas sobre el tema", d: "Pruebo personalmente la tarea" },
    { id: 10, title: "Cuando estoy aprendiendo:", a: "Soy una persona abierta", b: "Soy una persona reservada", c: "Soy una persona racional", d: "Soy una persona responsable" },
    { id: 11, title: "Cuando aprendo:", a: "Me involucro", b: "Prefiero observar", c: "Prefiero evaluar las cosas", d: "Prefiero asumir una actitud activa" },
    { id: 12, title: "Aprendo mejor cuando:", a: "Soy receptivo y de mente abierta", b: "Soy cuidadoso", c: "Analizo las ideas", d: "Soy práctico" }
];

// Mapeo Kolb
// A = Experiencia Concreta (EC)
// B = Observación Reflexiva (OR)
// C = Conceptualización Abstracta (CA)
// D = Experimentación Activa (EA)

export const MI_QUESTIONS = [
    "Prefiero hacer un mapa que explicarle a alguien como tiene que llegar a un lugar determinado.",
    "Si estoy enojado o contento generalmente sé la razón exacta de por qué es así.",
    "Sé tocar, o antes sabía, un instrumento musical.",
    "Asocio la música con mis estados de ánimo.",
    "Puedo sumar o multiplicar mentalmente con mucha rapidez.",
    "Puedo ayudar a un amigo(a) a manejar y controlar sus sentimientos, porque yo lo pude hacer antes en relación a sentimientos parecidos.",
    "Me gusta trabajar con calculadora y computadoras.",
    "Aprendo rápidamente a bailar un baile nuevo.",
    "No me es difícil decir lo que pienso durante una discusión o debate.",
    "¿Disfruto de una buena charla, prédica o sermón?",
    "Siempre distingo el Norte del Sur, esté donde esté.",
    "Me gusta reunir grupos de personas en una fiesta o evento especial.",
    "Realmente la vida me parece vacía sin música.",
    "Siempre entiendo los gráficos que vienen en las instrucciones de equipos o instrumentos.",
    "Me gusta resolver puzzles y entretenerme con juegos electrónicos.",
    "Me fue fácil aprender a andar en bicicleta o patines.",
    "Me enojo cuando escucho una discusión o una afirmación que me parece ilógica o absurda.",
    "Soy capaz de convencer a otros que sigan mis planes o ideas.",
    "Tengo buen sentido del equilibrio y de coordinación.",
    "A menudo puedo captar relaciones entre números con mayor rapidez y facilidad que algunos de mis compañeros.",
    "Me gusta construir modelos, maquetas o hacer esculturas.",
    "Soy bueno para encontrar el significado preciso de las palabras.",
    "Puedo mirar un objeto de una manera y con la misma facilidad verlo dado vuelta o al revés.",
    "Con frecuencia establezco la relación que puede haber entre una música o canción y algo que haya ocurrido en mi vida.",
    "Me gusta trabajar con números y figuras.",
    "Me gusta sentarme muy callado y pensar, reflexionar sobre mis sentimientos más íntimos.",
    "Solamente con mirar las formas de las construcciones y estructuras me siento a gusto.",
    "Cuando estoy en la ducha, o cuando estoy solo me gusta tararear, cantar o silbar.",
    "Soy bueno para el atletismo.",
    "Me gusta escribir cartas largas a mis amigos.",
    "Generalmente me doy cuenta de la expresión o gestos que tengo en la cara.",
    "Muchas veces me doy cuenta de las expresiones o gestos en la cara de las otras personas.",
    "Reconozco mis estados de ánimo, no me cuesta identificarlos.",
    "Me doy cuenta de los estados de ánimo de las personas con quienes me encuentro.",
    "Me doy cuenta bastante bien de lo que los otros piensan de mí."
];

export const MI_KEYS = {
    verbal: [9, 10, 17, 22, 30],
    logica: [5, 7, 15, 20, 25],
    visual: [1, 11, 14, 23, 27],
    cinestesica: [8, 16, 19, 21, 29],
    musical: [3, 4, 13, 24, 28],
    intrapersonal: [2, 6, 26, 31, 33],
    interpersonal: [12, 18, 32, 34, 35]
};

// ============================================================================
// MOTOR DE INFERENCIA CIENTÍFICA (Convergencia CHAEA x Kolb x Gardner)
// ============================================================================

export function analyzeHolisticProfile(chaeaDominant, kolbDominant, topMI) {
    let consejos = [];
    let warnings = [];
    
    // 1. CHAEA vs Kolb Congruence Check
    const congruencia = {
        "activo": "acomodador",
        "reflexivo": "divergente",
        "teorico": "asimilador",
        "pragmatico": "convergente"
    };
    
    const isCongruent = (congruencia[chaeaDominant] === kolbDominant);
    if (!isCongruent) {
        warnings.push(`Tus respuestas en el test CHAEA indican un perfil predominante **${chaeaDominant.toUpperCase()}**, pero en el ciclo de Kolb procesas más como **${kolbDominant.toUpperCase()}**. Esto sugiere alta flexibilidad cognitiva o que tiendes a comportarte diferente dependiendo de si estás en el aula o en un laboratorio práctico.`);
    } else {
        warnings.push(`Existe una alta congruencia en tu perfil de procesamiento: Eres sólidamente **${kolbDominant.toUpperCase()} / ${chaeaDominant.toUpperCase()}**. Tu estilo de asimilar la información está muy definido.`);
    }

    // 2. Cross-Test Synthesis & Specific Advice
    if (kolbDominant === "acomodador" || chaeaDominant === "activo") {
        let advice = "Dado que eres de perfil Acomodador/Activo, necesitas acción.";
        if (topMI.includes("cinestesica")) {
            advice += " Con tu alta Inteligencia Cinestésica, **DEBES** construir circuitos físicos reales o usar guantes hápticos. Evita leer PDFs por más de 15 minutos sin interactuar con un simulador.";
        } else if (topMI.includes("interpersonal")) {
            advice += " Tu inteligencia Interpersonal sugiere que el aprendizaje basado en roles (ej. explicar un experimento a un compañero) disparará tu retención al máximo.";
        }
        consejos.push(advice);
    }
    
    if (kolbDominant === "asimilador" || chaeaDominant === "teorico") {
        let advice = "Como Asimilador/Teórico, tu cerebro busca la elegancia y la estructura del electromagnetismo.";
        if (topMI.includes("logica")) {
            advice += " Con tu predominancia Lógico-Matemática, tu camino al éxito es entender las ecuaciones de Maxwell a profundidad antes de memorizar nada. Demuestra las fórmulas.";
        } else if (topMI.includes("intrapersonal")) {
            advice += " Dedica tiempo a la 'Bóveda Obsidian'. Estructurar un mapa mental privado con tus propias reflexiones es clave para ti.";
        }
        consejos.push(advice);
    }
    
    if (kolbDominant === "convergente" || chaeaDominant === "pragmatico") {
        let advice = "Tu perfil Convergente/Pragmático requiere que la teoría sirva para algo tangible.";
        if (topMI.includes("visual")) {
            advice += " Tu alta inteligencia Visual/Espacial significa que debes diagramar los problemas. Dibuja los vectores de campo eléctrico o usa código computacional para graficar.";
        } else {
            advice += " Busca inmediatamente la aplicación tecnológica de cada ley física. Resuelve problemas numéricos antes de cuestionar la filosofía detrás de ellos.";
        }
        consejos.push(advice);
    }
    
    if (kolbDominant === "divergente" || chaeaDominant === "reflexivo") {
        let advice = "Como Divergente/Reflexivo, procesas observando y sintiendo las múltiples dimensiones de un problema.";
        if (topMI.includes("musical") || topMI.includes("verbal")) {
            advice += " Eres muy sensible a las narrativas y patrones sonoros. Aprovecha las analogías históricas (los debates de Faraday y Maxwell) o escucha música instrumental al abstraer los conceptos para aumentar tu enfoque.";
        } else {
            advice += " Tómate tu tiempo. Es preferible que leas diferentes fuentes y discutas el tema en foros antes de intentar resolver ecuaciones a ciegas.";
        }
        consejos.push(advice);
    }
    
    return { consejos, warnings };
}
