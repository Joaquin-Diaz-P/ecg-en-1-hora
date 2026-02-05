import React, { useState } from 'react';
import {
Heart,
Activity,
Search,
FileText,
AlertCircle,
Menu,
X,
ChevronRight,
Stethoscope,
ArrowRight,
ImageIcon,
Maximize2,
Minimize2,
GitMerge,
ArrowUpCircle,
ArrowDownCircle,
AlertTriangle,
CheckCircle2,
MapPin,
MousePointerClick
} from 'lucide-react';

// --- SVG Components for ECG Visualization (Fallbacks & Generics) ---

const EcgPPeaked = () => (
<svg viewBox="0 0 100 80" className="w-full h-20 stroke-blue-600 fill-none stroke-2">
    <path d="M0,50 L20,50 L25,20 L30,50 L40,50" />
    <text x="15" y="15" className="text-[10px] fill-blue-800" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>P
        Alta (CAD)</text>
</svg>
);

const EcgSawtooth = () => (
<svg viewBox="0 0 200 80" className="w-full h-20 stroke-purple-600 fill-none stroke-2">
    <path d="M0,50 L10,30 L20,50 L30,30 L40,50 L50,30 L60,50 L65,10 L70,80 L75,50 L85,30 L95,50 L105,30 L115,50" />
    <text x="10" y="75" className="text-[10px] fill-purple-800" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif"
        }}>Dientes de Sierra (Flutter)</text>
</svg>
);

const EcgSTElevation = () => (
<svg viewBox="0 0 100 80" className="w-full h-20 stroke-rose-600 fill-none stroke-2">
    <path d="M0,50 L10,50 L15,10 L20,70 L25,30 L40,30 L50,50 L80,50" />
    <text x="30" y="20" className="text-[10px] fill-rose-800 font-bold" style={{
        fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>Supradesnivel</text>
</svg>
);

const EcgTInverted = () => (
<svg viewBox="0 0 100 80" className="w-full h-20 stroke-rose-600 fill-none stroke-2">
    <path d="M0,50 L10,50 L15,10 L20,80 L25,50 L35,50 L45,65 L55,50 L80,50" />
    <text x="35" y="75" className="text-[10px] fill-rose-800 font-bold" style={{
        fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>T Invertida</text>
</svg>
);

// --- Main Application Component ---

export default function App() {
const [activeTab, setActiveTab] = useState('inicio');
const [activePathology, setActivePathology] = useState(null);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Definición de las pestañas
const tabs = [
{ id: 'inicio', label: 'Inicio', icon:
<Heart className="w-4 h-4" /> },
{ id: 'como-leer', label: '¿Cómo leer un ECG?', icon:
<Search className="w-4 h-4" /> },
{ id: 'analisis-inicial', label: 'Análisis Inicial', icon:
<Activity className="w-4 h-4" /> },
{ id: 'por-partes', label: 'Análisis por partes de la onda', icon:
<FileText className="w-4 h-4" /> },
{ id: 'patologias', label: 'Patologías', icon:
<AlertCircle className="w-4 h-4" /> },
];

const renderContent = () => {
switch (activeTab) {
case 'inicio':
return
<InicioView setTab={setActiveTab} />;
case 'como-leer':
return
<ComoLeerECGView />;
case 'analisis-inicial':
return
<AnalisisInicialView />;
case 'por-partes':
return
<PorPartesView />;
case 'patologias':
return
<PatologiasView activeSub={activePathology} setActiveSub={setActivePathology} />;
default:
return
<InicioView setTab={setActiveTab} />;
}
};

return (
<div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-rose-200" style={{
    fontFamily: "Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>

    {/* Navbar */}
    <nav className="bg-rose-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-2">
                    <Activity className="w-8 h-8 text-rose-200" />
                    <div>
                        <span className="font-bold text-xl tracking-tight block leading-none">ECG en 1 hora</span>
                        <span className="text-xs text-rose-200 font-medium">Por Joaquín Díaz P.</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-1">
                    {tabs.map((tab) => (
                    <button key={tab.id} onClick={()=> setActiveTab(tab.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                        space-x-2
                        ${activeTab === tab.id
                        ? 'bg-rose-900 text-white shadow-inner'
                        : 'text-rose-100 hover:bg-rose-600 hover:text-white'}`}
                        >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-md text-rose-200 hover:text-white hover:bg-rose-600 focus:outline-none"
                        >
                        {mobileMenuOpen ?
                        <X className="w-6 h-6" /> :
                        <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
        <div className="md:hidden bg-rose-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
            {tabs.map((tab) => (
            <button key={tab.id} onClick={()=> {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium flex items-center
                space-x-3
                ${activeTab === tab.id
                ? 'bg-rose-900 text-white'
                : 'text-rose-100 hover:bg-rose-700 hover:text-white'}`}
                >
                {tab.icon}
                <span>{tab.label}</span>
            </button>
            ))}
        </div>
        )}
    </nav>

    {/* Main Content Area */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] border border-slate-100">
            {renderContent()}
        </div>
    </main>

    {/* Footer */}
    <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2025 ECG en 1 hora. Desarrollado con base en apuntes de cardiología.</p>
        <p className="mt-2">Creado por Joaquín Díaz P.</p>
    </footer>
</div>
);
}

// --- View Components ---

function InicioView({ setTab }) {
return (
<div className="p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
    <div className="w-full max-w-2xl space-y-6">
        <div
            className="bg-rose-50 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 ring-4 ring-rose-100">
            <Stethoscope className="w-12 h-12 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Aprende Electrocardiograma <br />
            <span className="text-rose-600">en una hora</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-prose mx-auto">
            Bienvenido a esta herramienta interactiva diseñada para entender el electrocardiograma rápidamente y de
            forma estructurada.
            Aquí encontrarás desde los conceptos básicos hasta las patologías más importantes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button onClick={()=> setTab('como-leer')}
                className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg hover:bg-rose-700 transform
                hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                Comenzar Aprendizaje
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>

        <div className="pt-12 border-t border-slate-100 mt-12">
            <p className="text-sm font-semibold text-rose-900 uppercase tracking-wider">Creado por</p>
            <h3 className="text-2xl font-serif font-bold text-slate-800 mt-1">Joaquín Díaz P.</h3>
        </div>
    </div>
</div>
);
}

function ComoLeerECGView() {
return (
<div className="p-6 md:p-10 space-y-8 animate-fadeIn">
    <div className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">¿Cómo leer un electrocardiograma?</h2>
        <p className="text-slate-500 mt-2">La sistematización es la clave para no pasar nada por alto.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="font-bold text-xl text-blue-900 mb-3">Antes de empezar</h3>
                <p className="text-blue-800">
                    Primero debemos revisar que esté bien tomado: debe tener la <span className="font-bold">onda P
                        positiva (+) en D2</span> y <span className="font-bold">negativa (-) en aVR</span>.
                </p>
            </div>

            <div className="prose prose-slate">
                <h3 className="text-xl font-bold text-slate-800">El orden ideal (RFE RCIH)</h3>
                <p>Lo que debemos hacer antes de ir en busca de cosas patológicas es revisar lo básico:</p>
                <ol className="list-decimal pl-5 space-y-2 font-medium text-slate-700">
                    <li><strong>R</strong>itmo</li>
                    <li><strong>F</strong>recuencia</li>
                    <li><strong>E</strong>je</li>
                </ol>
                <p className="mt-4">Luego buscamos los 4 elementos patológicos principales:</p>
                <ol className="list-decimal pl-5 space-y-2 font-medium text-slate-700" start={4}>
                    <li>Generación del <strong>R</strong>itmo (Onda P)</li>
                    <li><strong>C</strong>onducción (Intervalo PR)</li>
                    <li><strong>I</strong>squemia / Infarto</li>
                    <li><strong>H</strong>ipertrofia y Crecimiento de cavidades</li>
                </ol>
            </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center">
            <h3 className="text-rose-400 text-sm font-bold uppercase tracking-wider mb-4">La Gran Mnemotecnia</h3>
            <div className="text-center space-y-6">
                <div className="text-5xl md:text-6xl font-black tracking-tight">
                    "FREE RICH"
                </div>
                <div className="grid grid-cols-2 gap-4 text-left text-sm md:text-base border-t border-slate-700 pt-6">
                    <ul className="space-y-2">
                        <li><span className="text-rose-400 font-bold">F</span> recuencia</li>
                        <li><span className="text-rose-400 font-bold">R</span> itmo</li>
                        <li><span className="text-rose-400 font-bold">E</span> je</li>
                    </ul>
                    <ul className="space-y-2">
                        <li><span className="text-rose-400 font-bold">R</span> itmo (Generación)</li>
                        <li><span className="text-rose-400 font-bold">I</span> squemia</li>
                        <li><span className="text-rose-400 font-bold">C</span> onducción</li>
                        <li><span className="text-rose-400 font-bold">H</span> ipertrofia</li>
                    </ul>
                </div>
                <p className="text-xs text-slate-400 mt-4 italic">
                    Recordar que además de esto, debemos reconocer otras patologías como arritmias, pericarditis,
                    derrame, etc.
                </p>
            </div>
        </div>
    </div>
</div>
);
}

function AnalisisInicialView() {
return (
<div className="p-6 md:p-10 space-y-10 animate-fadeIn">
    <div className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">1. Análisis Inicial</h2>
        <p className="text-slate-500 mt-2">Ritmo, Frecuencia y Eje Eléctrico (RFE).</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1.1 Ritmo */}
        <div
            className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-indigo-600 p-4">
                <h3 className="text-white font-bold text-lg">1.1 Ritmo</h3>
            </div>
            <div className="p-6 space-y-4">
                <h4 className="font-semibold text-slate-900">¿Regular o Irregular?</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                        <span
                            className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                        <span>Se toman 2 ondas R.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span
                            className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                        <span>Si la distancia se repite, es <strong>regular</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span
                            className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                        <span>Si varía, es <strong>irregular</strong>.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Card 1.2 Frecuencia */}
        <div
            className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-rose-600 p-4">
                <h3 className="text-white font-bold text-lg">1.2 Frecuencia</h3>
            </div>
            <div className="p-6 space-y-6">
                <div>
                    <span
                        className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold mb-4">REGULAR</span>

                    {/* Formula Visual 1 */}
                    <div
                        className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <span
                                    className="border-b-2 border-slate-700 px-2 font-bold text-xl text-slate-800 w-full text-center">300</span>
                                <span className="text-xs text-slate-600 mt-1 font-medium">N° cuadrados grandes entre
                                    R-R</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-xs text-slate-400 italic">o también</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    {/* Formula Visual 2 */}
                    <div
                        className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                                <span
                                    className="border-b-2 border-slate-700 px-2 font-bold text-xl text-slate-800 w-full text-center">1500</span>
                                <span className="text-xs text-slate-600 mt-1 font-medium">N° cuadritos pequeños</span>
                            </div>
                        </div>
                    </div>

                    {/* Imagen para ritmo REGULAR */}
                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                        <img src="reg.png" alt="Ejemplo de ritmo regular" className="w-full h-auto object-cover" />
                    </div>

                </div>

                <div>
                    <span
                        className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold mb-4">IRREGULAR</span>

                    {/* Fórmula Visual IRREGULAR (Nuevo Diseño) */}
                    <div
                        className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <span
                                className="text-sm font-bold text-slate-700 text-center bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                                N° de R en 30 cuadrados
                            </span>
                            <span className="text-xl font-bold text-rose-600">×</span>
                            <span className="text-2xl font-bold text-slate-800">10</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2 italic">(aprox. 6 segundos)</span>
                    </div>

                    {/* Imagen para ritmo IRREGULAR */}
                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                        <img src="irreg.png" alt="Ejemplo de ritmo irregular" className="w-full h-auto object-cover" />
                    </div>

                </div>
            </div>
        </div>

        {/* Card 1.3 Eje - AHORA CON TODA LA INFORMACIÓN */}
        <div
            className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow md:col-span-2">
            <div className="bg-emerald-600 p-4">
                <h3 className="text-white font-bold text-lg">1.3 Eje Eléctrico</h3>
            </div>
            <div className="p-6 space-y-6 text-sm text-slate-700">

                <p className="italic text-slate-600">Una desviación puede hablar de hemibloqueos de rama izquierda (HBI)
                </p>

                {/* Tabla Principal */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-3 py-2">D1</th>
                                <th className="px-3 py-2">aVF</th>
                                <th className="px-3 py-2">Orientación eje</th>
                                <th className="px-3 py-2">Dx Probable</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-3 py-2 font-bold text-green-600">+</td>
                                <td className="px-3 py-2 font-bold text-green-600">+</td>
                                <td>Normal</td>
                                <td>Normal</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-bold text-green-600">+</td>
                                <td className="px-3 py-2 font-bold text-red-600">-</td>
                                <td>Desviación Izq ***</td>
                                <td>HBIA (↑↓↓) (D1+, D2-, D3- respectivamente)</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-bold text-red-600">-</td>
                                <td className="px-3 py-2 font-bold text-green-600">+</td>
                                <td>Desviación Der</td>
                                <td>HBIP (↓↑↑) (D1-, D2+, D3+ respectivamente)</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 font-bold text-red-600">-</td>
                                <td className="px-3 py-2 font-bold text-red-600">-</td>
                                <td>Indeterminado</td>
                                <td>Mal tomado / Dextrocardia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* OJO */}
                <div className="text-sm bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-900">
                    <strong className="text-orange-700">OJO:</strong> Cuando D1 (+) y aVF (-) podría estar entre 0° y
                    -30°, revisar <strong className="text-orange-700">D2</strong> para confirmar. (Si D2 (-) entonces
                    efectivamente hay desviación)
                </div>

                {/* Mnemotecnia */}
                <div>
                    <p className="font-bold text-orange-600 mb-2">Mnemotecnia Perpendiculares (FLoR):</p>
                    <ul className="list-disc list-inside space-y-1 ml-2 text-slate-700">
                        <li>aV<strong className="text-orange-600">F</strong> ⊥ D1</li>
                        <li>aV<strong className="text-orange-600">L</strong> ⊥ D2</li>
                        <li>aV<strong className="text-orange-600">R</strong> ⊥ D3</li>
                    </ul>
                </div>

                {/* Grid de Desviaciones (Copiado textual) */}
                <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                    {/* Columna Izquierda */}
                    <div>
                        <h5 className="font-bold text-slate-800 text-xs uppercase mb-3 border-b border-slate-200 pb-1">
                            Desviación izquierda del eje (-30° a -90°)
                        </h5>
                        <ul className="space-y-1 text-xs text-slate-600">
                            <li>Hemibloqueo izquierdo anterior</li>
                            <li>Bloqueo completo de rama izquierda</li>
                            <li>Hipertrofia VI</li>
                            <li>Ondas Q de infarto inferior</li>
                            <li>Marcapasos artificial</li>
                            <li>Hiperkalemia</li>
                            <li>Atresia tricuspídea</li>
                        </ul>
                    </div>

                    {/* Columna Derecha */}
                    <div>
                        <h5 className="font-bold text-slate-800 text-xs uppercase mb-3 border-b border-slate-200 pb-1">
                            Desviación derecha del eje (+90° a +180°)
                        </h5>
                        <ul className="space-y-1 text-xs text-slate-600">
                            <li>Variación normal (hasta 110º), sobre todo en niños y adultos jóvenes delgados</li>
                            <li>Hemibloqueo izquierdo posterior</li>
                            <li>Hipertrofia VD</li>
                            <li>Sobrecarga ventricular derecha (aguda o crónica): EPOC, TEP, CIA-CIV, etc.</li>
                            <li>Infarto de pared lateral del VI</li>
                            <li>Colocación invertida de los electrodos en miembro