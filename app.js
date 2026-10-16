const { useState, useEffect, useRef } = React;

// --- MATH EXERCISE GENERATOR (Procedural Engine) ---
const MathEngine = {
    generateExercise: (grade, topicId = null) => {
        let topicList = [];
        if (grade === '9') {
            topicList = [
                { id: 'eq_lin', name: 'Ecuaciones Lineales', unit: 'Ecuaciones e inecuaciones' },
                { id: 'fact', name: 'Factorización de Trinomios', unit: 'Productos notables y factorización' },
                { id: 'pot_rad', name: 'Potenciación y Radicación', unit: 'Potenciación y radicación' }
            ];
        } else if (grade === '10') {
            topicList = [
                { id: 'quad_func', name: 'Funciones Cuadráticas', unit: 'Funciones lineales y cuadráticas' },
                { id: 'trig_identity', name: 'Trigonometría Fundamental', unit: 'Trigonometría' },
                { id: 'log_exp', name: 'Logaritmos y Exponentes', unit: 'Funciones exponenciales y logarítmicas' }
            ];
        } else {
            topicList = [
                { id: 'limits', name: 'Límites Directos e Indeterminados', unit: 'Límites y nociones de cálculo' },
                { id: 'derivatives', name: 'Derivadas Básicas', unit: 'Derivadas y sus aplicaciones' },
                { id: 'saber11', name: 'Preparación Pruebas Saber 11', unit: 'Preparación para pruebas Saber 11' }
            ];
        }

        const selectedTopic = topicId 
            ? topicList.find(t => t.id === topicId) || topicList[Math.floor(Math.random() * topicList.length)]
            : topicList[Math.floor(Math.random() * topicList.length)];

        let exercise = {};

        switch (selectedTopic.id) {
            case 'eq_lin': {
                const a = Math.floor(Math.random() * 8) + 2;
                const b = Math.floor(Math.random() * 20) - 10;
                const x = Math.floor(Math.random() * 12) - 5;
                const c = a * x + b;
                const options = [x, x + 2, x - 3, x * 2].sort(() => Math.random() - 0.5);

                exercise = {
                    title: `Resuelve la ecuación para x`,
                    statement: `Hallar el valor numérico de x en: ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}`,
                    type: 'mcq',
                    options: options.map(o => o.toString()),
                    correctAnswer: x.toString(),
                    topic: selectedTopic.name,
                    unit: selectedTopic.unit,
                    hints: [
                        `Identifica la operación para aislar la variable x. Comienza restando/sumando ${Math.abs(b)} en ambos lados.`,
                        `Te queda: ${a}x = ${c - b}. Ahora divide entre el coeficiente de x (${a}).`,
                        `Sustituye las opciones en la ecuación original para comprobar cuál mantiene la igualdad.`
                    ],
                    steps: [
                        `Paso 1: Transponer el término independiente ${b}: ${a}x = ${c} - (${b})`,
                        `Paso 2: Simplificar el término constante: ${a}x = ${c - b}`,
                        `Paso 3: Despejar x dividiendo entre ${a}: x = ${c - b} / ${a}`,
                        `Paso 4: Resultado final: x = ${x}`
                    ]
                };
                break;
            }
            case 'quad_func': {
                const h = Math.floor(Math.random() * 6) - 3;
                const k = Math.floor(Math.random() * 8) - 4;
                const a = 1;
                // f(x) = (x - h)^2 + k = x^2 - 2hx + (h^2 + k)
                const b = -2 * h;
                const cVal = h * h + k;
                
                exercise = {
                    title: 'Vértice de una Parábola',
                    statement: `Dada la función cuadrática f(x) = x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${cVal >= 0 ? '+ ' + cVal : '- ' + Math.abs(cVal)}, encuentra la coordenada X del vértice.`,
                    type: 'mcq',
                    options: [h.toString(), (-h).toString(), (h + 2).toString(), (k).toString()].sort(() => Math.random() - 0.5),
                    correctAnswer: h.toString(),
                    topic: selectedTopic.name,
                    unit: selectedTopic.unit,
                    hints: [
                        `Usa la fórmula del vértice para el eje X: x_v = -b / (2a).`,
                        `En este caso, a = 1 y b = ${b}.`,
                        `Recuerda aplicar el cambio de signo correspondiente: -(${b}) / 2.`
                    ],
                    steps: [
                        `Paso 1: Identificar coeficientes: a = 1, b = ${b}, c = ${cVal}`,
                        `Paso 2: Aplicar fórmula x_v = -b / (2a)`,
                        `Paso 3: Sustituir valores: x_v = -(${b}) / (2 * 1) = ${-b} / 2`,
                        `Paso 4: Resultado final: x = ${h}`
                    ]
                };
                break;
            }
            case 'limits': {
                const a = Math.floor(Math.random() * 5) + 1;
                const ans = 2 * a;
                
                exercise = {
                    title: 'Límite Indeterminado (0/0)',
                    statement: `Calcula el límite: lim (x -> ${a}) de (x² - ${a*a}) / (x - ${a})`,
                    type: 'mcq',
                    options: [ans.toString(), (a).toString(), '0', (ans + 3).toString()].sort(() => Math.random() - 0.5),
                    correctAnswer: ans.toString(),
                    topic: selectedTopic.name,
                    unit: selectedTopic.unit,
                    hints: [
                        `Si evalúas directamente x = ${a}, obtienes la forma indeterminada 0/0.`,
                        `Factoriza el numerador utilizando la diferencia de cuadrados: (x² - a²) = (x - a)(x + a).`,
                        `Cancela el factor común (x - ${a}) y evalúa el límite resultante.`
                    ],
                    steps: [
                        `Paso 1: Factorizar el numerador: (x² - ${a*a}) = (x - ${a})(x + ${a})`,
                        `Paso 2: Cancelar términos comunes: lim (x -> ${a}) (x + ${a})`,
                        `Paso 3: Evaluar el valor x = ${a}: ${a} + ${a}`,
                        `Paso 4: Resultado final: ${ans}`
                    ]
                };
                break;
            }
            default: {
                const base = Math.floor(Math.random() * 5) + 2;
                const exp = Math.floor(Math.random() * 3) + 2;
                const val = Math.pow(base, exp);

                exercise = {
                    title: 'Evaluación de Exponentes',
                    statement: `Simplifica la expresión: (${base}^${exp + 1}) / ${base}`,
                    type: 'mcq',
                    options: [val.toString(), (val * base).toString(), (base).toString(), (val - 2).toString()].sort(() => Math.random() - 0.5),
                    correctAnswer: val.toString(),
                    topic: selectedTopic.name,
                    unit: selectedTopic.unit,
                    hints: [
                        `Aplica la propiedad de cociente de potencias de igual base: a^m / a^n = a^(m-n).`,
                        `Resta los exponentes: (${exp + 1}) - 1 = ${exp}.`,
                        `Calcula ${base}^${exp}.`
                    ],
                    steps: [
                        `Paso 1: Aplicar ley de exponentes: ${base}^(${exp}+1-1)`,
                        `Paso 2: Simplificar exponente: ${base}^${exp}`,
                        `Paso 3: Calcular potencia: ${val}`
                    ]
                };
            }
        }

        return exercise;
    }
};

// --- APP COMPONENT ---
function App() {
    // User State
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('nexum_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [activeTab, setActiveTab] = useState('dashboard'); // onboarding, dashboard, practice, evaluation, lab, profile, games
    const [currentGrade, setCurrentGrade] = useState('10');
    const [points, setPoints] = useState(1250);
    const [xp, setXp] = useState(3400);
    const [stars, setStars] = useState(14);
    const [streak, setStreak] = useState(5);
    const [exerciseCount, setExerciseCount] = useState(0);

    // Practice State
    const [currentExercise, setCurrentExercise] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [nexMessage, setNexMessage] = useState("¡Hola! Soy Nex. Estoy aquí para acompañarte en cada reto matemático.");

    // Evaluation State (Every 10 exercises)
    const [sessionHistory, setSessionHistory] = useState([]);

    useEffect(() => {
        if (!user) {
            setActiveTab('onboarding');
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('nexum_user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    const handleOnboarding = (name, grade) => {
        const newUser = { name, grade, createdAt: new Date().toISOString() };
        setUser(newUser);
        setCurrentGrade(grade);
        setActiveTab('dashboard');
        loadNewExercise(grade);
    };

    const loadNewExercise = (grade = currentGrade) => {
        const newEx = MathEngine.generateExercise(grade);
        setCurrentExercise(newEx);
        setSelectedOption(null);
        setHasSubmitted(false);
        setIsCorrect(false);
        setHintLevel(0);
        setNexMessage("¡Analiza la pregunta cuidadosamente! Si necesitas ayuda, haz clic en mis pistas.");
    };

    const handleAnswerSubmit = () => {
        if (!selectedOption || !currentExercise) return;

        const correct = selectedOption === currentExercise.correctAnswer;
        setIsCorrect(correct);
        setHasSubmitted(true);

        const newCount = exerciseCount + 1;
        setExerciseCount(newCount);

        const historyItem = {
            exercise: currentExercise,
            userAnswer: selectedOption,
            isCorrect: correct,
            timestamp: new Date()
        };
        const updatedHistory = [...sessionHistory, historyItem];
        setSessionHistory(updatedHistory);

        if (correct) {
            const addedPoints = 100 + (streak * 10);
            const addedXp = 150;
            setPoints(prev => prev + addedPoints);
            setXp(prev => prev + addedXp);
            setStreak(prev => prev + 1);
            setNexMessage("¡Excelente trabajo! Has aplicado los conceptos correctamente.");
        } else {
            setStreak(0);
            setNexMessage("No te preocupes. Revisa la solución paso a paso para dominar este concepto.");
        }

        // Check if evaluation trigger reached (every 10 exercises)
        if (newCount > 0 && newCount % 10 === 0) {
            setTimeout(() => {
                setActiveTab('evaluation');
            }, 2500);
        }
    };

    const getHint = () => {
        if (!currentExercise) return;
        if (hintLevel < currentExercise.hints.length) {
            setNexMessage(`💡 Pista ${hintLevel + 1}: ${currentExercise.hints[hintLevel]}`);
            setHintLevel(prev => prev + 1);
        } else {
            setNexMessage("Ya has visto todas las pistas disponibles. ¡Intenta responder con lo aprendido!");
        }
    };

    // Render Navigation Header
    const renderHeader = () => (
        <header className="bg-cardBg border-b border-gray-800 sticky top-0 z-50 px-4 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electricPurple to-neonCyan flex items-center justify-center font-heading font-black text-xl text-white shadow-lg glow-cyan">
                        N
                    </div>
                    <div>
                        <h1 className="font-heading font-bold text-lg tracking-wider text-white">NEXUM <span className="text-neonCyan">MATH</span></h1>
                        <span className="text-xs text-gray-400 font-mono">GRADO {currentGrade}º</span>
                    </div>
                </div>

                {user && (
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={() => { loadNewExercise(); setActiveTab('practice'); }} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'practice' ? 'bg-electricPurple text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                            <i data-lucide="gamepad-2" className="w-4 h-4"></i>
                            <span>Practicar</span>
                        </button>
                        <button onClick={() => setActiveTab('games')} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'games' ? 'bg-electricPurple text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                            <i data-lucide="trophy" className="w-4 h-4"></i>
                            <span>Modos Juego</span>
                        </button>
                        <button onClick={() => setActiveTab('lab')} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'lab' ? 'bg-electricPurple text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                            <i data-lucide="flask-conical" className="w-4 h-4"></i>
                            <span>Laboratorio</span>
                        </button>
                        <button onClick={() => setActiveTab('evaluation')} className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'evaluation' ? 'bg-electricPurple text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
                            <i data-lucide="bar-chart-3" className="w-4 h-4"></i>
                            <span>Evaluación ({exerciseCount % 10}/10)</span>
                        </button>
                    </div>
                )}

                {user && (
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5 bg-gray-900/80 px-3 py-1 rounded-full border border-gray-700">
                            <i data-lucide="zap" className="w-4 h-4 text-amber-400"></i>
                            <span className="text-xs font-bold text-amber-400">{streak}d Racha</span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-gray-900/80 px-3 py-1 rounded-full border border-gray-700">
                            <i data-lucide="star" className="w-4 h-4 text-goldStar"></i>
                            <span className="text-xs font-bold text-goldStar">{stars}</span>
                        </div>
                        <div onClick={() => setActiveTab('profile')} className="w-9 h-9 rounded-full bg-gradient-to-r from-neonCyan to-electricPurple flex items-center justify-center font-bold text-sm cursor-pointer border border-white/20">
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );

    // Render Onboarding Screen
    if (activeTab === 'onboarding') {
        return (
            <div className="min-h-screen bg-darkBg flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-cardBg rounded-2xl border border-gray-800 p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-electricPurple/20 rounded-full blur-3xl"></div>
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electricPurple to-neonCyan mx-auto flex items-center justify-center font-heading font-black text-3xl text-white shadow-xl glow-purple mb-4">
                            N
                        </div>
                        <h1 className="font-heading font-bold text-2xl text-white">NEXUM <span className="text-neonCyan">MATH</span></h1>
                        <p className="text-sm text-gray-400 mt-2">Aprende matemáticas jugando con la tecnología del futuro.</p>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const name = e.target.name.value;
                        const grade = e.target.grade.value;
                        if (name) handleOnboarding(name, grade);
                    }} className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tu Nombre o Apodo Gamer</label>
                            <input name="name" required type="text" placeholder="Ej: AlexMathMaster" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonCyan transition" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Selecciona tu Grado Académico</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: '9', name: 'Noveno', sub: '9.º Grade' },
                                    { id: '10', name: 'Décimo', sub: '10.º Grade' },
                                    { id: '11', name: 'Once', sub: '11.º Saber 11' }
                                ].map(g => (
                                    <label key={g.id} className="cursor-pointer">
                                        <input type="radio" name="grade" value={g.id} defaultChecked={g.id === '10'} className="peer hidden" />
                                        <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-center peer-checked:border-neonCyan peer-checked:bg-neonCyan/10 transition">
                                            <div className="font-bold text-sm text-white">{g.name}</div>
                                            <div className="text-xs text-gray-500">{g.sub}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electricPurple to-neonCyan font-bold text-white shadow-lg glow-cyan hover:opacity-90 transition">
                            ¡Comenzar Aventura!
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-darkBg text-white">
            {renderHeader()}

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
                {/* --- DASHBOARD TAB --- */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Welcome Hero Banner */}
                        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-cardBg to-purple-950 border border-gray-800 p-6 md:p-8 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-neonCyan/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <span className="px-3 py-1 rounded-full bg-electricPurple/20 text-electricPurple border border-electricPurple/30 text-xs font-bold uppercase tracking-wider">
                                        Nivel {Math.floor(xp / 1000) + 1} Explorador Matemático
                                    </span>
                                    <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mt-3">
                                        ¡Bienvenido de nuevo, <span className="text-neonCyan">{user?.name}</span>!
                                    </h2>
                                    <p className="text-gray-400 text-sm max-w-xl mt-2">
                                        Grado {currentGrade}º • Tienes <span className="text-amber-400 font-bold">{10 - (exerciseCount % 10)} ejercicios</span> restantes antes de tu próxima evaluación de desempeño.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-4">
                                        <button onClick={() => { loadNewExercise(); setActiveTab('practice'); }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-electricPurple to-neonCyan font-bold text-white shadow-lg glow-cyan hover:scale-105 transition flex items-center space-x-2">
                                            <i data-lucide="play" className="w-5 h-5"></i>
                                            <span>Continuar Practicando</span>
                                        </button>
                                        <button onClick={() => setActiveTab('games')} className="px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 font-bold text-white hover:bg-gray-700 transition flex items-center space-x-2">
                                            <i data-lucide="swords" className="w-5 h-5 text-neonCyan"></i>
                                            <span>Modos de Juego</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Companion Nex Widget */}
                                <div className="bg-cardBg/80 border border-gray-700/60 rounded-2xl p-4 w-full md:w-72 flex items-center space-x-4 shadow-xl backdrop-blur-md animate-float">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-neonCyan to-electricPurple flex items-center justify-center font-bold text-2xl text-white shadow-lg glow-cyan flex-shrink-0">
                                        🤖
                                    </div>
                                    <div>
                                        <div className="font-bold text-xs text-neonCyan uppercase tracking-wider">Tutor IA Nex</div>
                                        <p className="text-xs text-gray-300 mt-1 italic">
                                            "¿Listo para desafiar tus límites hoy? Hagamos 10 ejercicios juntos."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-4 relative overflow-hidden">
                                <div className="text-xs font-semibold text-gray-400 uppercase">Puntos Totales</div>
                                <div className="text-2xl font-heading font-black text-white mt-1">{points} PTS</div>
                                <div className="text-xs text-neonGreen mt-1 flex items-center"><i data-lucide="trending-up" className="w-3 h-3 mr-1"></i> +150 hoy</div>
                            </div>
                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-4 relative overflow-hidden">
                                <div className="text-xs font-semibold text-gray-400 uppercase">Experiencia XP</div>
                                <div className="text-2xl font-heading font-black text-electricPurple mt-1">{xp} XP</div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                                    <div className="bg-electricPurple h-full rounded-full" style={{ width: `${(xp % 1000) / 10}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-4 relative overflow-hidden">
                                <div className="text-xs font-semibold text-gray-400 uppercase">Estrellas Obt.</div>
                                <div className="text-2xl font-heading font-black text-goldStar mt-1">{stars} ⭐</div>
                                <div className="text-xs text-gray-400 mt-1">Evaluación niv. 4/5</div>
                            </div>
                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-4 relative overflow-hidden">
                                <div className="text-xs font-semibold text-gray-400 uppercase">Racha de Estudio</div>
                                <div className="text-2xl font-heading font-black text-amber-400 mt-1">{streak} Días 🔥</div>
                                <div className="text-xs text-gray-400 mt-1">¡Mantén el ritmo!</div>
                            </div>
                        </div>

                        {/* Quick Access Modules */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-lg text-white">Plan de Estudio Grado {currentGrade}º</h3>
                                    <i data-lucide="book-open" className="w-5 h-5 text-neonCyan"></i>
                                </div>
                                <div className="space-y-3">
                                    {['Ecuaciones e Inecuaciones', 'Funciones y Gráficas', 'Trigonometría Fundamental', 'Probabilidad y Estadística'].map((topic, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition">
                                            <span className="text-sm font-medium text-gray-300">{topic}</span>
                                            <span className="text-xs px-2 py-1 rounded bg-electricPurple/20 text-electricPurple font-bold">Completado {i * 25 + 20}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-lg text-white">Misiones Semanales</h3>
                                    <i data-lucide="target" className="w-5 h-5 text-neonPink"></i>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-300 font-semibold">Resuelve 20 ejercicios sin fallo</span>
                                            <span className="text-neonCyan font-bold">12/20</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-neonCyan h-full rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-300 font-semibold">Usa el Laboratorio de Funciones</span>
                                            <span className="text-neonGreen font-bold">1/1</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-neonGreen h-full rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cardBg border border-gray-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-lg text-white">Insignias Destacadas</h3>
                                    <i data-lucide="award" className="w-5 h-5 text-goldStar"></i>
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 flex flex-col items-center">
                                        <div className="text-2xl mb-1">⚡</div>
                                        <div className="text-[10px] font-bold text-gray-300">Veloz</div>
                                    </div>
                                    <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 flex flex-col items-center">
                                        <div className="text-2xl mb-1">🎯</div>
                                        <div className="text-[10px] font-bold text-gray-300">Preciso</div>
                                    </div>
                                    <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 flex flex-col items-center">
                                        <div className="text-2xl mb-1">🧠</div>
                                        <div className="text-[10px] font-bold text-gray-300">Genio 10º</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PRACTICE TAB --- */}
                {activeTab === 'practice' && currentExercise && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Exercise Card */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-cardBg border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
                                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                                    <div>
                                        <span className="text-xs font-mono font-bold text-neonCyan uppercase tracking-widest">{currentExercise.unit}</span>
                                        <h2 className="font-heading font-bold text-2xl text-white mt-1">{currentExercise.title}</h2>
                                    </div>
                                    <div className="text-xs bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-full font-mono text-gray-400">
                                        Ejercicio #{exerciseCount + 1}
                                    </div>
                                </div>

                                {/* Exercise Statement */}
                                <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 text-lg md:text-xl font-medium text-gray-100 shadow-inner mb-6">
                                    {currentExercise.statement}
                                </div>

                                {/* Answer Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {currentExercise.options.map((opt, idx) => {
                                        const isSelected = selectedOption === opt;
                                        let btnStyle = "bg-gray-900/80 border-gray-800 text-gray-200 hover:border-neonCyan/50";

                                        if (hasSubmitted) {
                                            if (opt === currentExercise.correctAnswer) {
                                                btnStyle = "bg-emerald-950/80 border-neonGreen text-neonGreen font-bold glow-green";
                                            } else if (isSelected) {
                                                btnStyle = "bg-rose-950/80 border-rose-500 text-rose-400";
                                            }
                                        } else if (isSelected) {
                                            btnStyle = "bg-electricPurple/20 border-electricPurple text-white font-bold glow-purple";
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={hasSubmitted}
                                                onClick={() => setSelectedOption(opt)}
                                                className={`p-4 rounded-2xl border text-left text-base transition flex items-center justify-between ${btnStyle}`}
                                            >
                                                <span>{opt}</span>
                                                <span className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center text-xs font-bold">
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                    <button onClick={getHint} disabled={hasSubmitted} className="flex items-center space-x-2 text-sm text-neonCyan hover:underline font-semibold disabled:opacity-50">
                                        <i data-lucide="lightbulb" className="w-4 h-4"></i>
                                        <span>Pedir Pista a Nex ({hintLevel}/3)</span>
                                    </button>

                                    {!hasSubmitted ? (
                                        <button onClick={handleAnswerSubmit} disabled={!selectedOption} className="px-8 py-3 rounded-xl bg-gradient-to-r from-electricPurple to-neonCyan font-bold text-white disabled:opacity-40 shadow-lg glow-cyan hover:scale-105 transition">
                                            Comprobar Respuesta
                                        </button>
                                    ) : (
                                        <button onClick={() => loadNewExercise()} className="px-8 py-3 rounded-xl bg-neonGreen font-bold text-gray-950 shadow-lg glow-green hover:scale-105 transition flex items-center space-x-2">
                                            <span>Siguiente Ejercicio</span>
                                            <i data-lucide="arrow-right" className="w-4 h-4"></i>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Step by step solution (shows after answering) */}
                            {hasSubmitted && (
                                <div className="bg-cardBg border border-gray-800 rounded-3xl p-6 md:p-8 space-y-4 animate-fade-in">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-neonGreen/20 text-neonGreen' : 'bg-rose-500/20 text-rose-400'}`}>
                                            <i data-lucide={isCorrect ? "check" : "x"} className="w-5 h-5"></i>
                                        </div>
                                        <h3 className="font-heading font-bold text-xl text-white">
                                            {isCorrect ? '¡Respuesta Correcta!' : 'Solución Paso a Paso'}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {currentExercise.steps.map((step, idx) => (
                                            <div key={idx} className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl text-sm text-gray-300 font-mono">
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar: AI Companion Nex Panel */}
                        <div className="space-y-6">
                            <div className="bg-cardBg border border-gray-800 rounded-3xl p-6 shadow-xl sticky top-24">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electricPurple to-neonCyan flex items-center justify-center text-3xl shadow-lg glow-cyan animate-pulse-subtle">
                                        🤖
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-white">Tutor IA Nex</h3>
                                        <span className="text-xs text-neonGreen font-mono">En línea • Asistente 24/7</span>
                                    </div>
                                </div>

                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-sm text-gray-200 min-h-[140px] leading-relaxed relative">
                                    {nexMessage}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button onClick={() => setNexMessage("💡 Pista clave: Lee bien las propiedades algebraicas y verifica los signos antes de operar.")} className="w-full text-left p-3 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 text-xs text-gray-300 transition flex items-center justify-between">
                                        <span>¿Por qué cometí un error?</span>
                                        <i data-lucide="chevron-right" className="w-4 h-4 text-gray-500"></i>
                                    </button>
                                    <button onClick={() => setNexMessage("📘 Explicación: Este problema se resuelve aislando las constantes a un lado de la igualdad.")} className="w-full text-left p-3 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 text-xs text-gray-300 transition flex items-center justify-between">
                                        <span>Explicar concepto clave</span>
                                        <i data-lucide="chevron-right" className="w-4 h-4 text-gray-500"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- EVALUATION CHECKPOINT TAB (EVERY 10 EXERCISES) --- */}
                {activeTab === 'evaluation' && (
                    <div className="max-w-3xl mx-auto bg-cardBg border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-goldStar to-amber-500 mx-auto flex items-center justify-center text-4xl shadow-xl glow-purple mb-2">
                            🏆
                        </div>

                        <h2 className="font-heading font-extrabold text-3xl text-white">Reporte de Evaluación de Rendimiento</h2>
                        <p className="text-gray-400 text-sm">Resumen de tu desempeño en los últimos 10 ejercicios completados.</p>

                        {/* Star Rating System */}
                        <div className="flex justify-center space-x-2 py-4">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <i key={s} data-lucide="star" className={`w-10 h-10 ${s <= 4 ? 'text-goldStar fill-goldStar' : 'text-gray-700'}`}></i>
                            ))}
                        </div>
                        <div className="text-sm font-bold text-goldStar uppercase tracking-widest">4 / 5 Estrellas - Dominio Alto</div>

                        {/* Evaluation Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                                <div className="text-2xl font-bold text-neonGreen">8 / 10</div>
                                <div className="text-xs text-gray-400 mt-1">Aciertos</div>
                            </div>
                            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                                <div className="text-2xl font-bold text-neonCyan">80%</div>
                                <div className="text-xs text-gray-400 mt-1">Precisión</div>
                            </div>
                            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                                <div className="text-2xl font-bold text-electricPurple">+450 XP</div>
                                <div className="text-xs text-gray-400 mt-1">Recompensa</div>
                            </div>
                        </div>

                        <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-800 text-left space-y-3">
                            <h4 className="font-heading font-bold text-white text-sm">Recomendaciones del Tutor Nex:</h4>
                            <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
                                <li>Dominas adecuadamente la resolución de ecuaciones lineales y transposición de términos.</li>
                                <li>Se recomienda repasar la simplificación de productos notables antes del siguiente capítulo.</li>
                            </ul>
                        </div>

                        <button onClick={() => { loadNewExercise(); setActiveTab('practice'); }} className="w-full py-4 rounded-xl bg-gradient-to-r from-electricPurple to-neonCyan font-bold text-white shadow-lg glow-cyan hover:opacity-90 transition">
                            Continuar al Siguiente Bloque
                        </button>
                    </div>
                )}

                {/* --- MATH LAB TAB --- */}
                {activeTab === 'lab' && (
                    <div className="bg-cardBg border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-heading font-bold text-2xl text-white">Laboratorio Matemático Interactivo</h2>
                                <p className="text-sm text-gray-400">Experimenta con funciones y visualiza sus representaciones gráficas en tiempo real.</p>
                            </div>
                            <i data-lucide="flask-conical" className="w-8 h-8 text-neonCyan"></i>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-white text-sm uppercase">Parámetros de Función Lineal</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-400">Pendiente (m)</label>
                                        <input type="range" min="-5" max="5" defaultValue="2" className="w-full accent-neonCyan" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400">Intersección Y (b)</label>
                                        <input type="range" min="-10" max="10" defaultValue="1" className="w-full accent-electricPurple" />
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-950 rounded-xl font-mono text-center text-neonCyan border border-gray-800">
                                    f(x) = 2x + 1
                                </div>
                            </div>

                            <div className="lg:col-span-2 bg-gray-950 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
                                <i data-lucide="line-chart" className="w-16 h-16 text-gray-700 mb-2"></i>
                                <span className="text-sm text-gray-500 font-mono">Renderizador de Gráficas f(x) en Tiempo Real</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- GAME MODES TAB --- */}
                {activeTab === 'games' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Modo Historia', desc: 'Avanza por mundos matemáticos y supera capítulos temáticos.', icon: 'map', color: 'from-electricPurple to-indigo-600' },
                            { title: 'Duelo Mental', desc: 'Desafíos de razonamiento a gran velocidad contrarreloj.', icon: 'zap', color: 'from-amber-500 to-rose-600' },
                            { title: 'Modo Jefe Final', desc: 'Enfréntate al reto integral de unidad y demuestra tu dominio.', icon: 'skull', color: 'from-rose-600 to-purple-800' },
                            { title: 'Modo Supervivencia', desc: 'Secuencia infinita de preguntas progresivas sin fallar.', icon: 'shield-alert', color: 'from-emerald-500 to-teal-700' },
                            { title: 'Torneos Amistosos', desc: 'Compite con compañeros de clase en desafíos privados.', icon: 'users', color: 'from-neonCyan to-blue-600' }
                        ].map((m, i) => (
                            <div key={i} className="bg-cardBg border border-gray-800 rounded-3xl p-6 space-y-4 hover:border-gray-700 transition cursor-pointer group">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                                    <i data-lucide={m.icon} className="w-6 h-6"></i>
                                </div>
                                <h3 className="font-heading font-bold text-xl text-white">{m.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                                <button onClick={() => { loadNewExercise(); setActiveTab('practice'); }} className="w-full py-2.5 rounded-xl bg-gray-900 border border-gray-800 font-semibold text-xs text-gray-300 group-hover:bg-electricPurple group-hover:text-white transition">
                                    Jugar Ahora
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- USER PROFILE TAB --- */}
                {activeTab === 'profile' && user && (
                    <div className="max-w-2xl mx-auto bg-cardBg border border-gray-800 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center space-x-4 border-b border-gray-800 pb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-neonCyan to-electricPurple flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                                {user.name[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 className="font-heading font-bold text-2xl text-white">{user.name}</h2>
                                <p className="text-xs text-gray-400">Estudiante de Grado {currentGrade}º</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-heading font-bold text-sm text-gray-400 uppercase tracking-wider">Cambiar Grado Académico</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {['9', '10', '11'].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => {
                                            setCurrentGrade(g);
                                            setUser({ ...user, grade: g });
                                            loadNewExercise(g);
                                        }}
                                        className={`p-3 rounded-xl border text-sm font-bold transition ${currentGrade === g ? 'bg-electricPurple/20 border-electricPurple text-white' : 'bg-gray-900 border-gray-800 text-gray-400'}`}
                                    >
                                        Grado {g}º
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button onClick={() => { localStorage.removeItem('nexum_user'); setUser(null); setActiveTab('onboarding'); }} className="w-full py-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400 font-bold text-sm hover:bg-rose-900/60 transition">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
