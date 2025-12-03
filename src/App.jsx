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
    <text x="15" y="15" className="text-[10px] fill-blue-800" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>P Alta (CAD)</text>
  </svg>
);

const EcgSawtooth = () => (
  <svg viewBox="0 0 200 80" className="w-full h-20 stroke-purple-600 fill-none stroke-2">
    <path d="M0,50 L10,30 L20,50 L30,30 L40,50 L50,30 L60,50 L65,10 L70,80 L75,50 L85,30 L95,50 L105,30 L115,50" />
    <text x="10" y="75" className="text-[10px] fill-purple-800" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>Dientes de Sierra (Flutter)</text>
  </svg>
);

const EcgSTElevation = () => (
  <svg viewBox="0 0 100 80" className="w-full h-20 stroke-rose-600 fill-none stroke-2">
    <path d="M0,50 L10,50 L15,10 L20,70 L25,30 L40,30 L50,50 L80,50" />
    <text x="30" y="20" className="text-[10px] fill-rose-800 font-bold" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>Supradesnivel</text>
  </svg>
);

const EcgTInverted = () => (
  <svg viewBox="0 0 100 80" className="w-full h-20 stroke-rose-600 fill-none stroke-2">
    <path d="M0,50 L10,50 L15,10 L20,80 L25,50 L35,50 L45,65 L55,50 L80,50" />
    <text x="35" y="75" className="text-[10px] fill-rose-800 font-bold" style={{ fontFamily: "Aptos, 'Segoe UI', sans-serif" }}>T Invertida</text>
  </svg>
);

// --- Main Application Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [activePathology, setActivePathology] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Definición de las pestañas
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: <Heart className="w-4 h-4" /> },
    { id: 'como-leer', label: '¿Cómo leer un ECG?', icon: <Search className="w-4 h-4" /> },
    { id: 'analisis-inicial', label: 'Análisis Inicial', icon: <Activity className="w-4 h-4" /> },
    { id: 'por-partes', label: 'Análisis por partes de la onda', icon: <FileText className="w-4 h-4" /> },
    { id: 'patologias', label: 'Patologías', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <InicioView setTab={setActiveTab} />;
      case 'como-leer':
        return <ComoLeerECGView />;
      case 'analisis-inicial':
        return <AnalisisInicialView />;
      case 'por-partes':
        return <PorPartesView />;
      case 'patologias':
        return <PatologiasView activeSub={activePathology} setActiveSub={setActivePathology} />;
      default:
        return <InicioView setTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-rose-200" style={{ fontFamily: "Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>

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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-rose-200 hover:text-white hover:bg-rose-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-rose-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3
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
        <div className="bg-rose-50 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 ring-4 ring-rose-100">
          <Stethoscope className="w-12 h-12 text-rose-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Aprende Electrocardiograma <br />
          <span className="text-rose-600">en una hora</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-prose mx-auto">
          Bienvenido a esta herramienta interactiva diseñada para entender el electrocardiograma rápidamente y de forma estructurada.
          Aquí encontrarás desde los conceptos básicos hasta las patologías más importantes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => setTab('como-leer')}
            className="px-8 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg hover:bg-rose-700 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Comenzar Aprendizaje <ArrowRight className="w-5 h-5" />
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
              Primero debemos revisar que esté bien tomado: debe tener la <span className="font-bold">onda P positiva (+) en D2</span> y <span className="font-bold">negativa (-) en aVR</span>.
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
              Recordar que además de esto, debemos reconocer otras patologías como arritmias, pericarditis, derrame, etc.
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
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="bg-indigo-600 p-4">
            <h3 className="text-white font-bold text-lg">1.1 Ritmo</h3>
          </div>
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-slate-900">¿Regular o Irregular?</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <span>Se toman 2 ondas R.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <span>Si la distancia se repite, es <strong>regular</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <span>Si varía, es <strong>irregular</strong>.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 1.2 Frecuencia */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="bg-rose-600 p-4">
            <h3 className="text-white font-bold text-lg">1.2 Frecuencia</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold mb-4">REGULAR</span>

              {/* Formula Visual 1 */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="border-b-2 border-slate-700 px-2 font-bold text-xl text-slate-800 w-full text-center">300</span>
                    <span className="text-xs text-slate-600 mt-1 font-medium">N° cuadrados grandes entre R-R</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs text-slate-400 italic">o también</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {/* Formula Visual 2 */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="border-b-2 border-slate-700 px-2 font-bold text-xl text-slate-800 w-full text-center">1500</span>
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
              <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold mb-4">IRREGULAR</span>

              {/* Fórmula Visual IRREGULAR (Nuevo Diseño) */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-700 text-center bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
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
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow md:col-span-2">
          <div className="bg-emerald-600 p-4">
            <h3 className="text-white font-bold text-lg">1.3 Eje Eléctrico</h3>
          </div>
          <div className="p-6 space-y-6 text-sm text-slate-700">

            <p className="italic text-slate-600">Una desviación puede hablar de hemibloqueos de rama izquierda (HBI)</p>

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
              <strong className="text-orange-700">OJO:</strong> Cuando D1 (+) y aVF (-) podría estar entre 0° y -30°, revisar <strong className="text-orange-700">D2</strong> para confirmar. (Si D2 (-) entonces efectivamente hay desviación)
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
                  <li>Colocación invertida de los electrodos en miembros superiores</li>
                  <li>Dextrocardia</li>
                  <li>Neumotórax izquierdo</li>
                </ul>
              </div>

              {/* Columna Extrema */}
              <div>
                <h5 className="font-bold text-slate-800 text-xs uppercase mb-3 border-b border-slate-200 pb-1">
                  Desviación extrema del eje
                </h5>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li>Error en las conexiones</li>
                  <li>Dextrocardia</li>
                  <li>Taquicardia ventricular</li>
                  <li>Enfermedades congénitas complejas</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

function PorPartesView() {
  return (
    <div className="p-6 md:p-10 space-y-8 animate-fadeIn">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">2. Onda por partes</h2>
        <p className="text-slate-500 mt-2">Detalle de cada componente del ciclo cardíaco.</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-6">
        <img src="Ondas.jpg" alt="Diagrama de ondas del ECG" className="w-full h-auto object-cover" />
      </div>

      <div className="space-y-6">
        {/* Onda P */}
        <PartCard title="Onda P (Generación)" color="border-l-blue-500">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4 text-slate-700 text-sm">
              <p className="italic text-slate-500">Sirve para ver ritmo sinusal y crecimiento de cavidades (ver P en DII)</p>

              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <strong>P ancha y mellada</strong> ({'>'} 0,12s o 3 cuadritos): crecimiento auricular <em>izquierdo</em>
                  <ul className="list-disc list-inside pl-4 text-blue-600 italic mt-1">
                    <li>"La Pancha es comunista"</li>
                  </ul>
                </li>
                <li>
                  <strong>P alta</strong> ({'>'} 2,5 mm o 2,5 cuadritos): crecimiento auricular <em>derecho</em>
                  <ul className="list-disc list-inside pl-4 text-blue-600 italic mt-1">
                    <li>"La Palta es de cuicos"</li>
                  </ul>
                </li>
                <li>Podría darse ambos, raro. CAI más común que CAD</li>
                <li><strong>Onda P presente</strong> indica ritmo sinusal, sino pensar en flutter o FA</li>
                <li><strong>P invertida indica</strong> ritmo nodal, o idioventricular</li>
                <li><strong>P bifásica</strong> indica retraso en conducción interauricular (si primera mitad de onda P bifásica en V1 es mayor a la primera mitad de onda P bifásica en V6 es derecho, al revés es izquierdo)</li>
              </ul>
            </div>
          </div>
        </PartCard>

        {/* Intervalo PR */}
        <PartCard title="Intervalo PR (Conducción)" color="border-l-purple-500">
          <div className="space-y-4 text-slate-700 text-sm">
            <p className="italic text-slate-500">Sirve para ver Bloqueos AV</p>
            <div>
              <strong className="block mb-2">Bloqueos AV:</strong>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>1° Grado:</strong> PR constante {'>'} 0.20s (1 cuadrado) (siempre conduce).</li>
                <li><strong>2° Grado Mobitz I (Wenckebach):</strong> PR cada vez más largo hasta que no conduce un QRS</li>
                <li>
                  <strong>2° Grado Mobitz II:</strong> PR normal/constante, de repente una P no conduce.
                  <br /><span className="pl-4 italic">* BAV 2° Grado Mobitz II 2x1: por cada 2 P hay 1 QRS</span>
                </li>
                <li>
                  <strong>3° Grado (Completo):</strong> P constante y disociado de QRS constante
                  <br /><span className="pl-4 italic">- Si P se superpone a QRS si o si es BAV 3°</span>
                </li>
              </ul>
            </div>
          </div>
        </PartCard>

        {/* Complejo QRS */}
        <PartCard title="Complejo QRS" color="border-l-rose-500">
          <div className="space-y-4 text-slate-700 text-sm">
            {/* Texto unificado: Sin comillas, mayúscula inicial, misma cursiva */}
            <p className="italic text-slate-500">Sirve para ver Bloqueo Completo de Rama, Infarto antiguo, Hipertrofia Ventricular</p>
            <ul className="space-y-3 list-disc pl-5">
              <li>QRS ancho ({'>'}0,12s o 3 cuadritos, "vaso de agua") indica BCR ("orejas de conejo")
                <ul className="pl-6 mt-1 space-y-1 list-disc">
                  <li><strong>BCRI (Cono de helado, V1): S profunda amplia</strong> en V1-V2. <strong>R'</strong> en D1, V5, V6.</li>
                  <li><strong>BCRD (Conejo, V1): R'</strong> (RSR) en V1-V2. <strong>S empastada</strong> en D1, V5, V6.</li>
                </ul>
              </li>
              <li>Q patológica (ancha ({'>'} 1 cuadrado) y negativa ({'>'} 1 cuadrado hacia abajo)):
                <ul className="pl-6 mt-1 list-disc">
                  <li>Infarto antiguo</li>
                  <li>***Q aislada en DIII la onda Q es normal/ fisiológica.</li>
                </ul>
              </li>
              <li>Hipertrofia ventricular izquierda (HVI):
                <ul className="pl-6 mt-1 list-disc">
                  <li>aVL R {'>'} 11 mm (2,5 cuadrados)</li>
                  <li>R V5 + S V1 {'>'} 35 mm</li>
                </ul>
              </li>
              <li>Hipertrofia ventricular derecha (HVD) (menos frecuente):
                <ul className="pl-6 mt-1 list-disc">
                  <li>R {'>'} S en V1</li>
                </ul>
              </li>
            </ul>
          </div>
        </PartCard>

        {/* Segmento ST y Onda T */}
        <div className="grid md:grid-cols-2 gap-6">
          <PartCard title="Segmento ST" color="border-l-orange-500">
            <div className="space-y-4 text-slate-700 text-sm">
              {/* Texto unificado: Sin comillas, mayúscula inicial */}
              <p className="italic text-slate-500">Sirve para ver supra o infradesnivel (supra indica infarto agudo)</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Supradesnivel: tomar como referencia el punto J (generalmente se mide la elevación a 2 cuadritos de J)</li>
                <li>Infradesnivel: V1-V3 puede indicar HVD</li>
                <li>Infradesnivel ST y T (-) asimétrica indica sobrecarga (HVI o infarto)</li>
              </ul>
            </div>
          </PartCard>

          <PartCard title="Onda T" color="border-l-teal-500">
            <div className="space-y-4 text-slate-700 text-sm">
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Negativa: Puede indicar isquemia. Además, podría ser un bloqueo de rama, embolia pulmonar, HV, miocardiopatía hipertrófica.
                  <br /><span className="pl-4 italic">"Puede tomarse como un signo de sobrecarga"</span>
                </li>
                <li>Onda T puntiaguda: hiperkalemia</li>
                <li>Onda T(-) asimétrica es más de sobrecarga, Onda T(-) simétrica es más de infarto</li>
                <li><strong>S</strong>imétrica {'->'} <strong>S</strong>CA</li>
              </ul>
            </div>
          </PartCard>
        </div>
      </div>
    </div>
  );
}

function PartCard({ title, children, color }) {
  return (
    <div className={`bg-white p-5 rounded-lg shadow border border-slate-100 border-l-4 ${color}`}>
      <h3 className="font-bold text-lg text-slate-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function PatologiasView({ activeSub, setActiveSub }) {
  return (
    <div className="animate-fadeIn flex flex-col h-full">
      {/* Sub-navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSub('isquemia')}
          className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors
            ${activeSub === 'isquemia' ? 'border-b-2 border-rose-600 text-rose-700 bg-rose-50' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Cardiopatía Isquémica
        </button>
        <button
          onClick={() => setActiveSub('arritmias')}
          className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors
            ${activeSub === 'arritmias' ? 'border-b-2 border-rose-600 text-rose-700 bg-rose-50' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Arritmias
        </button>
      </div>

      <div className="p-6 md:p-10 flex-grow">
        {!activeSub && (
          <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500 animate-fadeIn">
            <MousePointerClick className="w-12 h-12 mb-4 text-rose-300" />
            <p className="text-lg font-medium">Selecciona una patología para comenzar</p>
            <p className="text-sm mt-1">Elige entre Cardiopatía Isquémica o Arritmias en el menú superior</p>
          </div>
        )}

        {activeSub === 'isquemia' && <IsquemiaContent />}
        {activeSub === 'arritmias' && <ArritmiasContent />}
      </div>
    </div>
  );
}

function ArritmiasContent() {
  return (
    <div className="space-y-10 animate-slideIn pb-10">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">3.2 Arritmias</h3>

      {/* Supraventriculares */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-indigo-700 border-b border-indigo-200 pb-2">Supraventriculares (Estrechas):</h4>

        <div className="grid gap-6">
          {/* Extrasistolia ES supraventricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Extrasistolia (ES) supraventricular:</h5>
            <p className="text-slate-700 mb-3">P distinta a la sinusal o ausente, sin pausa compensadora. QRS angosto.</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded">
              <li>Aislada - par - tripleta/salvas: número de ES entre latidos sinusales**</li>
              <li>Bigeminada - trigeminada: Si 1 o 2 sinusales por extrasístole**</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2 italic">**Se puede usar esta clasificación en ES supra e infra ventriculares.</p>
          </div>

          {/* Flutter auricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Flutter auricular:</h5>
            <p className="text-slate-700 mb-2">Patrón regular. Ondas F "en serrucho" (frecuencia auricular ~300 lpm," 1 cuadrado grande por cada onda F").</p>
            <div className="bg-indigo-50 p-3 rounded text-sm text-indigo-800 border border-indigo-100">
              <strong>Ojo:</strong> El nodo AV frena los impulsos, por lo tanto, aunque la aurícula está comúnmente a ~300 los ventrículos están típicamente a 150 lpm (bloqueo 2:1) o 75 lpm (bloqueo 4:1).
            </div>
          </div>

          {/* Fibrilación auricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Fibrilación auricular:</h5>
            <p className="text-slate-700">Onda P ausente. Irregular.</p>
          </div>

          {/* Taquicardia paroxística supraventricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-indigo-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Taquicardia paroxística supraventricular:</h5>
            <p className="text-slate-700">Viene de la nada. Regular. P retrógrada al final del QRS o P ausente.</p>
          </div>
        </div>
      </div>

      {/* Ventriculares */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-rose-700 border-b border-rose-200 pb-2">Ventriculares (Anchas):</h4>

        <div className="grid gap-6">
          {/* Extrasístole ventricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-rose-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Extrasístole ventricular:</h5>
            <p className="text-slate-700 mb-3">QRS ancho, no precedido por onda P. P ausente, incluida o después del QRS, con pausa compensadora.</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded">
              <li>Aislada - par - tripleta/salvas: número de ES entre latidos sinusales**</li>
              <li>Bigeminada - trigeminada: Si 1 o 2 sinusales por extrasístole**</li>
              <li>Monomorfa - Polimorfa: Según si son iguales o diferentes entre sí.</li>
            </ul>
          </div>

          {/* Taquicardia ventricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-rose-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Taquicardia ventricular:</h5>
            <p className="text-slate-700 mb-3">QRS ancho, muy rápido. (Aquí se clasifican los QRS por morfología, etc.). Tres o más complejos ventriculares prematuros.</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 mb-4">
              <li>Sostenida - No sostenida/autolimitada: Si más o menos de 30 s.</li>
              <li>Monomorfa - Polimorfa: Según si son iguales o diferentes entre sí</li>
            </ul>

            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-sm text-slate-800 space-y-2">
              <p><em>Importante reconocer la "Torsión de Puntas" (Torsades de Pointes): Es una TV polimorfa específica asociada a QT largo. Visualmente, los complejos QRS parecen "girar" aumentando y disminuyendo su amplitud (patrón helicoidal). Puede evolucionar rápidamente a FV.</em></p>
              <p className="font-bold text-rose-700"><em>Las TV pueden evolucionar a fibrilación ventricular.</em></p>
            </div>
          </div>

          {/* Fibrilación ventricular */}
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-rose-500">
            <h5 className="font-bold text-slate-800 text-lg mb-2">Fibrilación ventricular:</h5>
            <p className="text-slate-700">Actividad eléctrica caótica, desorganizada, sin complejos QRS identificables.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IsquemiaContent() {
  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">3.1 Cardiopatía Isquémica</h3>
      </div>

      {/* Grid de las 3 fases */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Isquemia */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-yellow-500 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">1. Isquemia</h4>
          </div>
          <div className="p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Fase Reversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta en la Onda T.</p>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded min-h-[280px]">
                <span className="block font-bold text-slate-800 mb-2">Subendocárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Onda T Positiva, alta y picuda.</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <img src="isquemia_subendo.png" alt="Isquemia Subendocárdica" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-rose-100">
                <span className="block font-bold text-slate-800 mb-2">Subepicárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Onda T Negativa, simétrica y profunda.</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <img src="isquemia_subepi.png" alt="Isquemia Subepicárdica" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesión */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-orange-500 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">2. Lesión</h4>
          </div>
          <div className="p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Potencialmente Reversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta en el Segmento ST.</p>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded min-h-[280px]">
                <span className="block font-bold text-slate-800 mb-2">Subendocárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Descenso del ST (Infradesnivel).</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <img src="lesion_subendo.png" alt="Lesión Subendocárdica" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-rose-100">
                <span className="block font-bold text-slate-800 mb-2">Subepicárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Elevación del ST (Supradesnivel).</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <img src="lesion_subepi.png" alt="Lesión Subepicárdica" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>

            {/* Imagen de Lesiones agregada al final de la tarjeta */}
            <div className="bg-white rounded border border-slate-200 overflow-hidden mt-4">
              <img src="Lesiones.png" alt="Anatomía de lesiones SCASEST y SCACEST" className="w-full h-auto object-cover" />
            </div>

          </div>
        </div>

        {/* Necrosis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-rose-600 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">3. Necrosis</h4>
          </div>
          <div className="p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Irreversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta con Ondas Q Patológicas.</p>

            <div className="text-xs bg-rose-50 p-2 rounded text-rose-800 border border-rose-100 mb-2">
              <strong>Definición Q patológica:</strong> <br />Dura {'>'} 0.04s o profundidad {'>'} 25% de la R.
            </div>

            <div className="bg-white rounded border border-slate-200 overflow-hidden mb-2">
              <img src="necrosis.png" alt="Necrosis - Onda Q" className="w-full h-auto object-cover" />
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p><strong className="text-slate-800">Reciente:</strong> Q patológica + ST elevado.</p>
              <p><strong className="text-slate-800">Antigua:</strong> Q patológica aislada (ST normalizado).</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 mt-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-rose-500" /> Infarto
          </h4>

          <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 mb-4">
            <h5 className="font-bold text-rose-800 mb-1">¿Qué es?</h5>
            <p className="text-sm text-slate-700">
              Es la <strong>muerte de un tejido</strong> (necrosis) causada por la <strong>falta de aporte sanguíneo</strong> (isquemia) debido a la obstrucción de una arteria.
              El ejemplo más común es el <strong>infarto agudo de miocardio</strong> (IAM), cuando una arteria coronaria se bloquea y el músculo cardíaco muere.
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-slate-700 mb-3">Progresión Temporal</h5>
          <div className="w-full overflow-hidden rounded-lg border border-slate-100 mb-2">
            <img src="progresion_iam.png" alt="Progresión del IAM en el tiempo" className="w-full h-auto" />
          </div>
          <p className="text-xs text-center text-slate-500 italic bg-slate-50 p-1 rounded">
            (En general no dura más de algunas horas el ST elevado)
          </p>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {/* Empty space for "Normal" column */}
          <div></div>

          {/* Infarto Agudo spans 3 columns: Agudo, Horas, Días 1 y 2 */}
          <div className="col-span-3 bg-rose-600 text-white p-3 rounded-lg shadow-sm">
            <h6 className="font-bold text-sm mb-1">Infarto agudo</h6>
            <p className="text-xs opacity-90">Q patológica + Supradesnivel del ST</p>
          </div>

          {/* Infarto Reciente in "Días después" column */}
          <div className="bg-rose-500 text-white p-3 rounded-lg shadow-sm">
            <h6 className="font-bold text-sm mb-1">Infarto reciente</h6>
            <p className="text-xs opacity-90">Q patológica + T invertida</p>
          </div>

          {/* Infarto Antiguo in "Semana después" column */}
          <div className="bg-rose-400 text-white p-3 rounded-lg shadow-sm">
            <h6 className="font-bold text-sm mb-1">Infarto antiguo</h6>
            <p className="text-xs opacity-90">Q patológica</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h5 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wide">Consideraciones:</h5>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
            <li>Cuando hay <strong>Q patológica</strong> ya podemos hablar de infarto.</li>
            <li>Se puede hablar de <strong>IAM CEST</strong> pero no IAM SEST (en términos de Q).</li>
            <li className="bg-white p-3 rounded border border-slate-100 text-slate-700 italic">
              "Si el paciente tiene una elevación del ST, se puede llamar <strong>infarto agudo al miocardio</strong> en el <strong>diagnóstico electrocardiográfico</strong>, dada la gravedad de la condición."
            </li>
          </ul>
        </div>
      </div>

      {/* Nueva Sección Localización */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 mt-6 shadow-sm space-y-6">
        <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
          <MapPin className="w-5 h-5 text-indigo-500" /> Localización
        </h4>

        <div className="space-y-8">
          <div>
            <h5 className="font-bold text-slate-700 mb-2">Precordiales</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <img src="Precordiales.jpg" alt="Precordiales" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-700 mb-2">Derivadas frontales</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <img src="Derivadas frontales.png" alt="Derivadas frontales" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-700 mb-2">Derivaciones y Pared representada</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <img src="Derivaciones y Pared representada.png" alt="Derivaciones y Pared representada" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}