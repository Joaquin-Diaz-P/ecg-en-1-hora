import React, { useEffect, useRef, useState } from 'react';
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
  ChevronLeft,
  ImageIcon,
  Maximize2,
  Minimize2,
  GitMerge,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  CheckCircle2,
  MapPin
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Definición de las pestañas
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: <Heart className="w-4 h-4" /> },
    { id: 'como-leer', label: '¿Cómo leer un ECG?', icon: <Search className="w-4 h-4" /> },
    { id: 'analisis-inicial', label: 'Análisis Inicial', icon: <Activity className="w-4 h-4" /> },
    { id: 'por-partes', label: 'Análisis por partes de la onda', icon: <FileText className="w-4 h-4" /> },
    { id: 'cardiopatia-isquemica', label: 'Cardiopatía Isquémica', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'arritmias', label: 'Arritmias', icon: <Activity className="w-4 h-4" /> },
  ];

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const previousTab = activeTabIndex > 0 ? tabs[activeTabIndex - 1] : null;
  const nextTab = activeTabIndex >= 0 && activeTabIndex < tabs.length - 1
    ? tabs[activeTabIndex + 1]
    : null;
  const showBottomNav = activeTab !== 'inicio';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [activeTab]);

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
      case 'cardiopatia-isquemica':
        return <IsquemiaContent />;
      case 'arritmias':
        return <ArritmiasContent />;
      default:
        return <InicioView setTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-rose-200" style={{ fontFamily: "Aptos, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>

      {/* Navbar */}
      <nav className="bg-rose-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            <div className="flex items-center space-x-2 min-w-0">
              <Activity className="w-7 h-7 sm:w-8 sm:h-8 text-rose-200 shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-lg sm:text-xl tracking-tight block leading-none truncate">ECG en 1 hora</span>
                <span className="text-[11px] sm:text-xs text-rose-200 font-medium block truncate">Por Joaquín Díaz P.</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap
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
            <div className="xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                className="p-2 rounded-md text-rose-200 hover:text-white hover:bg-rose-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-rose-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-3 rounded-md text-sm sm:text-base font-medium flex items-start space-x-3 leading-5
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
      <main className={`flex-1 w-full min-w-0 mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8 ${activeTab === 'arritmias' ? 'max-w-[1800px]' : 'max-w-6xl'}`}>
        <div className="min-w-0 bg-white rounded-lg sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden min-h-[520px] sm:min-h-[600px] border border-slate-100">
          {renderContent()}
          {showBottomNav && (
            <div className="border-t border-slate-100 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 bg-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex justify-center sm:justify-start">
                  {previousTab ? (
                    <button
                      onClick={() => setActiveTab(previousTab.id)}
                      className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg hover:bg-rose-700 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm sm:text-base leading-tight"
                    >
                      <ChevronLeft className="w-5 h-5 shrink-0" />
                      <span>{previousTab.label}</span>
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="flex justify-center sm:justify-end">
                  {nextTab && (
                    <button
                      onClick={() => setActiveTab(nextTab.id)}
                      className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg hover:bg-rose-700 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm sm:text-base leading-tight"
                    >
                      <span>{nextTab.label}</span>
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-6 sm:py-8 px-4 text-center text-xs sm:text-sm">
        <p>© 2025 ECG en 1 hora. Desarrollado con base en apuntes de cardiología.</p>
      </footer>
    </div>
  );
}

// --- View Components ---

function InicioView({ setTab }) {
  return (
    <div className="p-5 sm:p-8 lg:p-12 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="w-full min-w-0 max-w-2xl space-y-5 sm:space-y-6">
        <div className="bg-rose-50 p-4 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6 ring-4 ring-rose-100">
          <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-rose-600" />
        </div>
        <h1 className="max-w-full break-words text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Aprende Electrocardiograma <br />
          <span className="text-rose-600">en una hora</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-prose mx-auto">
          Bienvenido a esta herramienta interactiva diseñada para entender el electrocardiograma rápidamente y de forma estructurada.
          Aquí encontrarás desde los conceptos básicos hasta las patologías más importantes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => setTab('como-leer')}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-rose-600 text-white rounded-xl font-bold shadow-lg hover:bg-rose-700 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            ¿Cómo leer un ECG? <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}

function ComoLeerECGView() {
  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">¿Cómo leer un electrocardiograma?</h2>
        <p className="text-slate-500 mt-2">La sistematización es la clave para no pasar nada por alto.</p>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] items-start">
        <div className="prose prose-slate max-w-none">
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

        <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl flex flex-col justify-center">
          <div className="text-center space-y-5 sm:space-y-6">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight break-words">
              "FREE RICH"
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left text-sm sm:text-base border-t border-slate-700 pt-5 sm:pt-6">
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
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10 animate-fadeIn">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">1. Análisis Inicial</h2>
        <p className="text-slate-500 mt-2">Ritmo, Frecuencia y Eje Eléctrico (RFE).</p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-xl text-sm text-blue-900">
          <p>
            Antes de empezar, confirma que el ECG esté bien registrado y correctamente calibrado:
            velocidad estándar de <strong>25 mm/s</strong> y sensibilidad de <strong>10 mm/mV</strong>
            (es decir, <strong>1 mV = 10 mm</strong>).
          </p>
        </div>

        {/* Card 1.1 Ritmo */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="bg-indigo-600 p-3.5 sm:p-4">
            <h3 className="text-white font-bold text-lg">1.1 Ritmo</h3>
          </div>
          <div className="p-5 sm:p-6 space-y-4">
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
          <div className="bg-rose-600 p-3.5 sm:p-4">
            <h3 className="text-white font-bold text-lg">1.2 Frecuencia</h3>
          </div>
          <div className="p-4 sm:p-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-4">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold mb-4">REGULAR</span>

              {/* Formula Visual 1 */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100 mb-4">
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
              <div className="flex flex-col items-center justify-center bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="border-b-2 border-slate-700 px-2 font-bold text-xl text-slate-800 w-full text-center">1500</span>
                    <span className="text-xs text-slate-600 mt-1 font-medium">N° cuadritos pequeños</span>
                  </div>
                </div>
              </div>

              {/* Imagen para ritmo REGULAR */}
              <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                <ContentImage src="content-images/ritmo-regular.png" alt="Ejemplo de ritmo regular" className="w-full h-auto object-cover" />
              </div>

            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 space-y-4">
              <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-bold mb-4">IRREGULAR</span>

              {/* Fórmula Visual IRREGULAR (Nuevo Diseño) */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-700 text-center bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                    N° de R en 30 cuadrados
                  </span>
                  <span className="text-xl font-bold text-rose-600">×</span>
                  <span className="text-2xl font-bold text-slate-800">10</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 italic">(aprox. 6 segundos)</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs text-slate-400 italic">o si usas 10 segundos</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="flex flex-col items-center justify-center bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-700 text-center bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                    N° de R en 10 segundos
                  </span>
                  <span className="text-xl font-bold text-rose-600">×</span>
                  <span className="text-2xl font-bold text-slate-800">6</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 italic">(útil si estás viendo el ECG completo de 12 derivaciones)</span>
              </div>

              {/* Imagen para ritmo IRREGULAR */}
              <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                <ContentImage src="content-images/ritmo-irregular.png" alt="Ejemplo de ritmo irregular" className="w-full h-auto object-cover" />
              </div>

            </div>
          </div>
        </div>

        {/* Card 1.3 Eje - AHORA CON TODA LA INFORMACIÓN */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="bg-emerald-600 p-3.5 sm:p-4">
            <h3 className="text-white font-bold text-lg">1.3 Eje Eléctrico</h3>
          </div>
          <div className="p-4 sm:p-6 space-y-6 text-sm text-slate-700">

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
            <div className="grid gap-6 pt-4 border-t border-slate-100 sm:grid-cols-2 xl:grid-cols-3">
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
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">2. Onda por partes</h2>
        <p className="text-slate-500 mt-2">Detalle de cada componente del ciclo cardíaco.</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-4 sm:mb-6">
        <ContentImage src="content-images/ondas-ecg.png" alt="Diagrama de ondas del ECG" className="w-full h-auto object-cover" />
        <p className="px-3 py-2 text-right text-xs italic text-slate-500 bg-slate-50 border-t border-slate-200">Imagen generada por IA</p>
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
                <li><strong>Onda P antes de cada QRS</strong> sugiere ritmo sinusal si su eje/morfología son sinusales: P positiva en DI-DII, invertida en aVR y PR constante.</li>
                <li><strong>P invertida en derivaciones inferiores</strong> sugiere origen no sinusal: si PR {'<'} 120 ms pensar en unión AV; si PR {'≥'} 120 ms, foco auricular ectópico.</li>
                <li><strong>P bifásica en V1</strong> puede ser normal; orienta a crecimiento auricular derecho si el componente inicial positivo es {'>'} 1,5 mm, o izquierdo si la porción terminal negativa es {'>'} 40 ms y {'>'} 1 mm.</li>
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
                  <li><strong>BCRI (Cono de helado, V1): S profunda/dominante</strong> en V1-V3. <strong>R ancha, mellada o monofásica</strong> en DI, aVL, V5-V6, sin Q septales laterales.</li>
                  <li><strong>BCRD (Conejo, V1): R'</strong> (RSR) en V1-V2. <strong>S empastada</strong> en D1, V5, V6.</li>
                </ul>
              </li>
              <li>Q patológica: dura {'>'} 0,04 s, mide {'>'} 2 mm de profundidad, supera el 25% del QRS o aparece en V1-V3:
                <ul className="pl-6 mt-1 list-disc">
                  <li>Sugiere infarto actual o previo, pero considerar diferenciales como miocardiopatías, rotación cardíaca o error de electrodos.</li>
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
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <PartCard title="Segmento ST" color="border-l-orange-500">
            <div className="space-y-4 text-slate-700 text-sm">
              {/* Texto unificado: Sin comillas, mayúscula inicial */}
              <p className="italic text-slate-500">Sirve para ver supra o infradesnivel; el supra puede indicar infarto agudo, pero siempre debe interpretarse por derivaciones contiguas, morfología, cambios recíprocos y contexto clínico.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Supradesnivel: tomar como referencia el punto J y la línea isoeléctrica; confirma el patrón en derivaciones anatómicamente contiguas.</li>
                <li>Infradesnivel: puede indicar isquemia subendocárdica, cambios recíprocos o infarto posterior si predomina en V1-V3.</li>
                <li>Infradesnivel ST con T (-) puede verse en sobrecarga ventricular, bloqueos de rama, isquemia u otras causas; buscar distribución y cambios dinámicos.</li>
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
                <li>Onda T(-) simétrica, profunda o dinámica aumenta la sospecha de isquemia/SCA; la T(-) asimétrica suele verse más en sobrecarga o alteraciones secundarias de repolarización.</li>
                <li><strong>S</strong>imétrica + clínica compatible {'->'} pensar en <strong>S</strong>CA</li>
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
    <div className={`bg-white p-4 sm:p-5 rounded-xl shadow border border-slate-100 border-l-4 ${color}`}>
      <h3 className="font-bold text-lg text-slate-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function ContentImage({
  src,
  alt,
  className,
  fallbackClassName = "w-full min-h-40 flex items-center justify-center rounded bg-slate-100 px-4 py-10 text-center text-sm font-medium text-slate-500 border border-dashed border-slate-300",
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <div className={fallbackClassName}>Imagen generada por IA</div>;
  }

  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />;
}

const arrhythmiaGroups = [
  {
    title: 'Taquicardias Supraventriculares',
    tone: 'blue',
    items: [
      {
        id: 'taquicardia-sinusal',
        name: 'Taquicardia sinusal',
        type: 'REGULAR',
        image: 'arrhythmias/cl3J6dE.jpg',
        stripImage: 'arrhythmias/Y8dryEY.jpg',
        desc: 'Corresponde a un automatismo aumentado del nodo sinusal, donde la pendiente de despolarización es más marcada, alcanzando el umbral más rápido y disparando más frecuentemente. Esto está favorecido por la activación del sistema simpático.',
      },
      {
        id: 'taquicardia-auricular-focal',
        name: 'Taquicardia auricular focal',
        type: 'REGULAR',
        image: 'arrhythmias/pRl1WGa.jpg',
        stripImage: 'arrhythmias/o3yCUbN.jpg',
        desc: 'Es un mecanismo de automatismo anormal. Un foco ubicado en alguna parte de la aurícula aumenta su automatismo, sobrepasa la frecuencia de descarga del nodo sinusal y pasa a comandar el ritmo cardíaco.',
      },
      {
        id: 'taquicardia-auricular-multifocal',
        name: 'Taquicardia auricular multifocal',
        type: 'IRREGULAR',
        image: 'arrhythmias/53YUFBI.jpg',
        stripImage: 'arrhythmias/HHXcAxb.jpg',
        desc: 'Es una alteración en la formación del impulso donde existen varios focos auriculares que gatillan en tiempos separados. El ritmo es irregular porque el nodo AV conduce el estímulo de manera variable, según si se encuentra en periodo refractario.',
      },
      {
        id: 'flutter-auricular',
        name: 'Flutter auricular',
        type: 'REGULAR',
        image: 'arrhythmias/Mz0SsCH.jpg',
        stripImage: 'arrhythmias/GduJKen.jpg',
        desc: 'Es un mecanismo de reentrada o macroreentrada que ocurre con mayor frecuencia en la aurícula derecha. Genera un circuito con una frecuencia auricular de ≈ 300 lpm. El nodo AV tiene el rol de bloquear la conducción de estos estímulos, generalmente dejando pasar 1 de cada 2.',
      },
      {
        id: 'fibrilacion-auricular',
        name: 'Fibrilación auricular',
        type: 'IRREGULAR',
        image: 'arrhythmias/Jca0WE2.jpg',
        stripImage: 'arrhythmias/pWkeo85.jpg',
        desc: 'Se produce por una remodelación eléctrica y estructural de la aurícula (fibrosis y dilatación). Aunque el mecanismo no está claro, se postula que es causado por múltiples microreentradas o focos cerca de las venas pulmonares, resultando en un ritmo desordenado e irregularmente irregular.',
      },
      {
        id: 'reentrada-nodo-av',
        name: 'Taquicardia por reentrada del nodo AV',
        type: 'REGULAR',
        image: 'arrhythmias/3JgTZe0.jpg',
        stripImage: 'arrhythmias/i0oTpm4.jpg',
        desc: 'Es un mecanismo de reentrada funcional que ocurre dentro del nodo AV. Se requiere la existencia de dos vías nodales: una rápida que repolariza lento, y una lenta que repolariza rápido. Un extrasístole encuentra una vía bloqueada y desciende por la vía lenta, luego sube por la vía rápida ya repolarizada, estableciendo un circuito reverberante.',
      },
      {
        id: 'reentrada-av-ortodromica',
        name: 'Taquicardia por reentrada AV ortodrómica',
        type: 'REGULAR',
        image: 'arrhythmias/13zzABr.jpg',
        stripImage: 'arrhythmias/zpIDibB.jpg',
        desc: 'Es un mecanismo de reentrada que involucra el nodo AV y un haz paraespecífico o vía accesoria (Síndrome de Wolff-Parkinson-White). El estímulo baja por la vía normal (nodo AV) y sube por el haz paraespecífico. La despolarización ventricular se realiza por el haz de His, resultando en un QRS angosto.',
      },
      {
        id: 'reentrada-av-antidromica',
        name: 'Taquicardia por reentrada AV antidrómica',
        type: 'REGULAR',
        image: 'arrhythmias/CIecDKa.jpg',
        stripImage: 'arrhythmias/TcA8D73.jpg',
        desc: 'Es un mecanismo de reentrada que involucra la vía accesoria. El impulso baja por el haz paraespecífico (vía muscular) y sube por el nodo AV. Debido a que el impulso baja por vía muscular, el QRS es ancho.',
      },
    ],
  },
  {
    title: 'Bradicardias Supraventriculares',
    tone: 'indigo',
    items: [
      {
        id: 'bradicardia-sinusal',
        name: 'Bradicardia sinusal',
        type: 'REGULAR',
        image: 'arrhythmias/cl3J6dE.jpg',
        stripImage: 'arrhythmias/Xg1UGSJ.jpg',
        desc: 'Consiste en la disminución de la frecuencia de descarga del nódulo sinusal (< 60 lpm). Esto se produce porque la pendiente de despolarización se hace más plana, disminuyendo el automatismo. Puede deberse a la activación vagal o a una enfermedad intrínseca del sistema excitoconductor.',
      },
      {
        id: 'paro-sinusal',
        name: 'Paro sinusal / Pausa sinusal',
        type: 'IRREGULAR',
        image: 'arrhythmias/cl3J6dE.jpg',
        stripImage: 'arrhythmias/IgSjzEy.jpg',
        desc: 'Es una disfunción del nodo sinusal. Ocurre la desaparición repentina de toda actividad eléctrica por un intervalo prolongado, y el estímulo del nodo sinusal reaparece tardíamente. Es característico que no aparece un ritmo de escape que tome el comando, sugiriendo que el nodo AV también está enfermo.',
      },
      {
        id: 'bloqueo-sinoauricular',
        name: 'Bloqueo sinoauricular',
        type: 'IRREGULAR',
        image: 'arrhythmias/cl3J6dE.jpg',
        stripImage: 'arrhythmias/FTlkNGy.jpg',
        desc: 'Es un trastorno de la conducción del sistema excitoconductor. Implica una alteración en la salida del impulso desde el nodo sinusal hacia las aurículas, lo que impide la despolarización auricular y ventricular, manifestándose como un intervalo largo sin actividad.',
      },
      {
        id: 'bloqueo-av-1',
        name: 'Bloqueo AV de 1er grado',
        type: 'REGULAR',
        image: 'arrhythmias/r81Yf1r.jpg',
        stripImage: 'arrhythmias/miWlsHG.jpg',
        desc: 'Es un trastorno de la conducción que consiste en la prolongación temporal del intervalo PR a más de 0,20 segundos. Cada onda P es seguida por un complejo QRS, y el PR se mantiene constante.',
      },
      {
        id: 'bloqueo-av-2-mobitz-i',
        name: 'Bloqueo AV de 2º grado - Mobitz I',
        type: 'IRREGULAR',
        image: 'arrhythmias/r81Yf1r.jpg',
        stripImage: 'arrhythmias/Sdvjj07.jpg',
        desc: 'Es un trastorno de la conducción, generalmente suprahisiano o del nodo AV, donde el intervalo PR se prolonga paulatinamente hasta que una onda P no es conducida. La no conducción de la onda P genera la irregularidad del ritmo.',
      },
      {
        id: 'bloqueo-av-2-mobitz-ii',
        name: 'Bloqueo AV de 2º grado - Mobitz II',
        type: 'IRREGULAR',
        image: 'arrhythmias/cKhb8Su.jpg',
        stripImage: 'arrhythmias/itgsFGR.jpg',
        desc: 'Es un trastorno de la conducción más severo que se produce desde el haz de His hacia abajo. El intervalo PR de las ondas P conducidas es normal y constante, pero de repente, una onda P no conduce, generando pausas e irregularidad.',
      },
      {
        id: 'bloqueo-av-3-supra',
        name: 'Bloqueo AV de 3er grado',
        type: 'REGULAR',
        image: 'arrhythmias/Ap7JZX1.jpg',
        stripImage: 'arrhythmias/Y8yTK7X.jpg',
        desc: 'Es un bloqueo de conducción total que resulta en la disociación aurículo ventricular. Las aurículas y los ventrículos laten a sus propias frecuencias. El ritmo ventricular es comandado por un ritmo de escape.',
      },
    ],
  },
  {
    title: 'Taquicardias Ventriculares',
    tone: 'rose',
    items: [
      {
        id: 'tv-monomorfica',
        name: 'Taquicardia ventricular monomórfica',
        type: 'REGULAR',
        image: 'arrhythmias/TWmWNJ7.jpg',
        stripImage: 'arrhythmias/B15Fvcx.jpg',
        desc: 'Es una taquicardia de QRS ancho (> 0,12 s) originada bajo el haz de His. El mecanismo más frecuente es la reentrada, que se establece habitualmente alrededor de una cicatriz, por ejemplo post-infarto. Se caracteriza por complejos QRS idénticos y, a menudo, presenta disociación AV.',
      },
      {
        id: 'tv-polimorfica',
        name: 'Taquicardia ventricular polimórfica',
        type: 'IRREGULAR',
        image: 'arrhythmias/oyqrFen.jpg',
        stripImage: 'arrhythmias/a5tYWUY.jpg',
        desc: 'Es una taquicardia de QRS ancho donde los complejos cambian de morfología y eje. Su mecanismo puede ser actividad disparada o gatillada por pospotenciales precoces. La Torsión de Puntas es la variante clásica asociada a la prolongación del intervalo QT.',
      },
      {
        id: 'fibrilacion-ventricular',
        name: 'Fibrilación ventricular',
        type: 'IRREGULAR',
        image: 'arrhythmias/GGQBHCP.jpg',
        stripImage: 'arrhythmias/3cqr5bF.jpg',
        desc: 'Es una arritmia ventricular cuyo mecanismo es la presencia de múltiples ondas de reentrada en el ventrículo. Esto causa un trazado caótico, sin QRS distinguibles, que resulta en la pérdida del pulso.',
      },
      {
        id: 'taquicardia-preexcitada',
        name: 'Taquicardia preexcitada (FA + WPW)',
        type: 'IRREGULAR',
        image: 'arrhythmias/BDo3GU7.jpg',
        stripImage: 'arrhythmias/dtqeNsA.jpg',
        desc: 'Ocurre cuando un paciente con WPW desarrolla fibrilación auricular. Los impulsos desordenados de la FA se conducen al ventrículo rápidamente a través de la vía accesoria, que no tiene la latencia del nodo AV, resultando en una taquicardia de QRS ancho e irregular.',
      },
    ],
  },
  {
    title: 'Bradicardias Ventriculares',
    tone: 'slate',
    items: [
      {
        id: 'bloqueo-av-3-ventricular',
        name: 'Bloqueo AV de 3er grado',
        type: 'REGULAR',
        image: 'arrhythmias/Ap7JZX1.jpg',
        stripImage: 'arrhythmias/Y8yTK7X.jpg',
        desc: 'Es un bloqueo de conducción total que resulta en la disociación aurículo ventricular. Las aurículas y los ventrículos laten a sus propias frecuencias. El ritmo ventricular es comandado por un ritmo de escape.',
      },
    ],
  },
];

const allArrhythmias = arrhythmiaGroups.flatMap((group) => group.items);

const regularityStyles = {
  REGULAR: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  IRREGULAR: 'bg-amber-50 text-amber-700 ring-amber-200',
};

const groupToneStyles = {
  blue: 'text-blue-700 border-blue-100',
  indigo: 'text-indigo-700 border-indigo-100',
  rose: 'text-rose-700 border-rose-100',
  slate: 'text-slate-700 border-slate-100',
};

function RegularityBadge({ type }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-black tracking-wide ring-1 ${regularityStyles[type]}`}>
      {type}
    </span>
  );
}

function ArrhythmiaGroupCard({ group, selectedId, onSelect }) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className={`mb-3 border-b pb-2 text-base font-black leading-tight sm:text-lg ${groupToneStyles[group.tone]}`}>
        {group.title}
      </h4>
      <div className="min-w-0 space-y-1">
        {group.items.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm leading-snug transition-colors ${isSelected
                ? 'bg-rose-50 text-slate-950 ring-1 ring-rose-100'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'}`}
            >
              <span className="min-w-0 break-words font-semibold">{item.name}</span>
              <RegularityBadge type={item.type} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ArrhythmiaReferenceNotes() {
  return (
    <section className="min-w-0 space-y-6">
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h4 className="mb-4 border-b border-indigo-200 pb-2 text-lg font-black text-indigo-700 sm:text-xl">
          Supraventriculares (Estrechas):
        </h4>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Extrasistolia (ES) supraventricular:</h5>
            <p className="mb-3 text-sm leading-relaxed text-slate-700">
              P distinta a la sinusal o ausente, sin pausa compensadora. QRS angosto.
            </p>
            <ul className="space-y-1 rounded bg-white/80 p-3 text-sm text-slate-600">
              <li>Aislada - par - tripleta/salvas: número de ES entre latidos sinusales**</li>
              <li>Bigeminada - trigeminada: Si 1 o 2 sinusales por extrasístole**</li>
            </ul>
            <p className="mt-2 text-xs italic text-slate-500">
              **Se puede usar esta clasificación en ES supra e infra ventriculares.
            </p>
          </article>

          <article className="rounded-lg border border-indigo-100 bg-white p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Flutter auricular:</h5>
            <p className="mb-3 text-sm leading-relaxed text-slate-700">
              Ondas F "en serrucho" (frecuencia auricular ~300 lpm, "1 cuadrado grande por cada onda F"). Suele verse regular cuando la conducción AV es fija, pero puede ser irregular si el bloqueo AV es variable.
            </p>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm leading-relaxed text-indigo-900">
              <strong>Ojo:</strong> El nodo AV frena los impulsos, por lo tanto, aunque la aurícula está comúnmente a ~300 los ventrículos suelen estar a 150 lpm (bloqueo 2:1), 100 lpm (3:1) o 75 lpm (4:1). Si la conducción cambia, el ritmo ventricular puede ser irregular y parecer FA.
            </div>
          </article>

          <article className="rounded-lg border border-indigo-100 bg-white p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Fibrilación auricular:</h5>
            <p className="text-sm leading-relaxed text-slate-700">Onda P ausente. Irregular.</p>
          </article>

          <article className="rounded-lg border border-indigo-100 bg-white p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Taquicardia paroxística supraventricular:</h5>
            <p className="text-sm leading-relaxed text-slate-700">
              Viene de la nada. Regular. P retrógrada al final del QRS o P ausente.
            </p>
          </article>
        </div>
      </div>

      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h4 className="mb-4 border-b border-rose-200 pb-2 text-lg font-black text-rose-700 sm:text-xl">
          Ventriculares (Anchas):
        </h4>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-rose-100 bg-rose-50/60 p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Extrasístole ventricular:</h5>
            <p className="mb-3 text-sm leading-relaxed text-slate-700">
              QRS ancho, no precedido por onda P. P ausente, incluida o después del QRS, con pausa compensadora.
            </p>
            <ul className="space-y-1 rounded bg-white/80 p-3 text-sm text-slate-600">
              <li>Aislada - par - tripleta/salvas: número de ES entre latidos sinusales**</li>
              <li>Bigeminada - trigeminada: Si 1 o 2 sinusales por extrasístole**</li>
              <li>Monomorfa - Polimorfa: Según si son iguales o diferentes entre sí.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-rose-100 bg-white p-4">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Taquicardia ventricular:</h5>
            <p className="mb-3 text-sm leading-relaxed text-slate-700">
              QRS ancho, muy rápido. (Aquí se clasifican los QRS por morfología, etc.). Tres o más complejos ventriculares prematuros.
            </p>
            <ul className="mb-4 space-y-2 text-sm text-slate-600">
              <li>Sostenida - No sostenida/autolimitada: Si más o menos de 30 s.</li>
              <li>Monomorfa - Polimorfa: Según si son iguales o diferentes entre sí</li>
            </ul>
            <div className="space-y-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm leading-relaxed text-slate-800">
              <p>
                <em>Importante reconocer la "Torsión de Puntas" (Torsades de Pointes): Es una TV polimorfa específica asociada a QT largo. Visualmente, los complejos QRS parecen "girar" aumentando y disminuyendo su amplitud (patrón helicoidal). Puede evolucionar rápidamente a FV.</em>
              </p>
              <p className="font-bold text-rose-700">
                <em>Las TV pueden evolucionar a fibrilación ventricular.</em>
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-rose-100 bg-white p-4 lg:col-span-2">
            <h5 className="mb-2 text-lg font-bold text-slate-800">Fibrilación ventricular:</h5>
            <p className="text-sm leading-relaxed text-slate-700">
              Actividad eléctrica caótica, desorganizada, sin complejos QRS identificables.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ArritmiasContent() {
  const [selectedId, setSelectedId] = useState(arrhythmiaGroups[0].items[0].id);
  const viewerRef = useRef(null);
  const selectedArrhythmia = allArrhythmias.find((item) => item.id === selectedId) ?? allArrhythmias[0];
  const handleSelectArrhythmia = (id) => {
    setSelectedId(id);
    window.requestAnimationFrame(() => {
      viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="animate-slideIn bg-slate-50/80 p-4 pb-8 sm:p-6 sm:pb-10 lg:p-8">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 sm:text-2xl">3.2 Arritmias</h3>
            <p className="mt-1 text-sm text-slate-500">Clasificación por origen, velocidad y regularidad del ritmo.</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-100">
            Esquema interactivo
          </span>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.75fr)_minmax(260px,0.85fr)] xl:grid-rows-[auto_auto] xl:items-start">
        <div className="order-2 min-w-0 xl:order-none xl:col-start-1 xl:row-start-1">
          <ArrhythmiaGroupCard group={arrhythmiaGroups[0]} selectedId={selectedId} onSelect={handleSelectArrhythmia} />
        </div>

        <section ref={viewerRef} className="order-1 min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 xl:order-none xl:col-start-2 xl:row-span-2 xl:row-start-1">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-center">
            <h4 className="text-lg font-black text-slate-900 sm:text-xl">{selectedArrhythmia.name}</h4>
            <RegularityBadge type={selectedArrhythmia.type} />
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <ContentImage
              src={selectedArrhythmia.image}
              alt={selectedArrhythmia.name}
              className="mx-auto block h-auto max-h-[520px] w-auto max-w-full object-contain"
            />
          </div>

          <p className="px-1 py-3 text-sm leading-relaxed text-slate-600 sm:px-3">
            {selectedArrhythmia.desc}
          </p>

          <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <ContentImage
              src={selectedArrhythmia.stripImage}
              alt={`Tira de ECG de ${selectedArrhythmia.name}`}
              className="block h-auto max-h-[360px] w-full max-w-full object-contain"
            />
          </div>
          <p className="mt-2 px-1 text-xs font-medium text-slate-500 sm:px-3">
            Tira de ECG: {selectedArrhythmia.name}.
          </p>
        </section>

        <div className="order-3 min-w-0 xl:order-none xl:col-start-3 xl:row-start-1">
          <ArrhythmiaGroupCard group={arrhythmiaGroups[1]} selectedId={selectedId} onSelect={handleSelectArrhythmia} />
        </div>

        <div className="order-4 min-w-0 xl:order-none xl:col-start-1 xl:row-start-2">
          <ArrhythmiaGroupCard group={arrhythmiaGroups[2]} selectedId={selectedId} onSelect={handleSelectArrhythmia} />
        </div>

        <div className="order-5 min-w-0 xl:order-none xl:col-start-3 xl:row-start-2">
          <ArrhythmiaGroupCard group={arrhythmiaGroups[3]} selectedId={selectedId} onSelect={handleSelectArrhythmia} />
        </div>
      </div>

      <div className="mt-6">
        <ArrhythmiaReferenceNotes />
      </div>
    </div>
  );
}

function IsquemiaContent() {
  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 animate-slideIn">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">3.1 Cardiopatía Isquémica</h3>
        <p className="text-sm text-slate-500 -mt-2 mb-4">
          OJO: en la práctica se interpretan patrones dinámicos de ST/T, derivaciones contiguas, cambios recíprocos y contexto clínico.
        </p>
      </div>

      {/* Grid de las 3 fases */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">

        {/* Isquemia */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-yellow-500 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">1. Isquemia</h4>
          </div>
          <div className="p-4 sm:p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Fase Reversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta en la Onda T.</p>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded min-h-[220px] sm:min-h-[380px] flex flex-col">
                <span className="block font-bold text-slate-800 mb-2">Subendocárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Puede verse como T hiperaguda: alta, ancha o desproporcionada para el QRS, especialmente en fases tempranas de oclusión.</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden flex-1">
                  <ContentImage
                    src="content-images/isquemia-subendocardica.png"
                    alt="Isquemia Subendocárdica"
                    className="w-full h-full object-contain object-top"
                    fallbackClassName="w-full h-full min-h-40 flex items-center justify-center rounded bg-slate-100 px-4 py-10 text-center text-sm font-medium text-slate-500 border border-dashed border-slate-300"
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic mt-1 text-right">Fuente: LITFL</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-rose-100">
                <span className="block font-bold text-slate-800 mb-2">Subepicárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Onda T negativa, simétrica y profunda en derivaciones contiguas; si es dinámica aumenta la sospecha de isquemia.</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <ContentImage src="content-images/isquemia-subepicardica.png" alt="Isquemia Subepicárdica" className="w-full h-auto object-cover" />
                </div>
                <p className="text-[10px] text-slate-400 italic mt-1 text-right">Fuente: LITFL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lesión */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-orange-500 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">2. Lesión</h4>
          </div>
          <div className="p-4 sm:p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Potencialmente Reversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta en el Segmento ST.</p>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded min-h-[220px] sm:min-h-[380px] flex flex-col">
                <span className="block font-bold text-slate-800 mb-2">Subendocárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Descenso del ST (Infradesnivel).</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden flex-1">
                  <ContentImage
                    src="content-images/lesion-subendocardica.png"
                    alt="Lesión Subendocárdica"
                    className="w-full h-full object-contain object-top"
                    fallbackClassName="w-full h-full min-h-40 flex items-center justify-center rounded bg-slate-100 px-4 py-10 text-center text-sm font-medium text-slate-500 border border-dashed border-slate-300"
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic mt-1 text-right">Fuente: LITFL</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-rose-100">
                <span className="block font-bold text-slate-800 mb-2">Subepicárdica</span>
                <span className="text-slate-600 text-xs block mb-2">Elevación del ST (Supradesnivel).</span>
                <div className="bg-white rounded border border-slate-200 overflow-hidden">
                  <ContentImage src="content-images/lesion-subepicardica.png" alt="Lesión Subepicárdica" className="w-full h-auto object-cover" />
                </div>
                <p className="text-[10px] text-slate-400 italic mt-1 text-right">Fuente: LITFL</p>
              </div>
            </div>

            {/* Imagen de Lesiones agregada al final de la tarjeta */}
            <div className="bg-white rounded border border-slate-200 overflow-hidden mt-4">
              <ContentImage src="content-images/lesiones.png" alt="Anatomía de lesiones SCASEST y SCACEST" className="w-full h-auto object-cover" />
              <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Fuente: LITFL</p>
            </div>

          </div>
        </div>

        {/* Necrosis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="bg-rose-600 px-4 py-2 rounded-t-xl">
            <h4 className="font-bold text-white text-center">3. Necrosis</h4>
          </div>
          <div className="p-4 sm:p-5 flex-grow space-y-4">
            <p className="text-xs text-slate-500 text-center uppercase tracking-wide">Irreversible</p>
            <p className="text-sm text-slate-700 font-medium">Se manifiesta con Ondas Q Patológicas.</p>

            <div className="text-xs bg-rose-50 p-2 rounded text-rose-800 border border-rose-100 mb-2">
              <strong>Definición Q patológica:</strong> <br />Dura {'>'} 0,04 s, mide {'>'} 2 mm de profundidad, supera el 25% del QRS o aparece en V1-V3.
            </div>

            <div className="bg-white rounded border border-slate-200 overflow-hidden mb-2">
              <ContentImage src="content-images/necrosis.png" alt="Necrosis - Onda Q" className="w-full h-auto object-cover" />
              <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Fuente: LITFL</p>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p><strong className="text-slate-800">Agudo/reciente:</strong> Q patológica puede coexistir con ST elevado o T invertida, según el momento evolutivo.</p>
              <p><strong className="text-slate-800">Antiguo:</strong> Q patológica persistente con ST ya normalizado; si el ST sigue elevado semanas después, pensar también en aneurisma ventricular.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 mt-6 shadow-sm space-y-5 sm:space-y-6">
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
            <ContentImage src="content-images/progresion-iam.png" alt="Progresión del IAM en el tiempo" className="w-full h-auto" />
            <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Imagen extraída de ECG++</p>
          </div>
          <p className="text-xs text-center text-slate-500 italic bg-slate-50 p-1 rounded">
            (El ST suele tender a normalizarse en días; si persiste por semanas, considerar aneurisma ventricular u otros diferenciales)
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-6">
          {/* Empty space for "Normal" column */}
          <div className="hidden sm:block"></div>

          {/* Infarto Agudo spans 3 columns: Agudo, Horas, Días 1 y 2 */}
          <div className="sm:col-span-3 bg-rose-600 text-white p-3 rounded-lg shadow-sm">
            <h6 className="font-bold text-sm mb-1">Infarto agudo</h6>
            <p className="text-xs opacity-90">Supradesnivel del ST ± Q patológica</p>
          </div>

          {/* Infarto Reciente in "Días después" column */}
          <div className="bg-rose-500 text-white p-3 rounded-lg shadow-sm">
            <h6 className="font-bold text-sm mb-1">Infarto reciente</h6>
            <p className="text-xs opacity-90">Q patológica ± T invertida</p>
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
            <li>Cuando hay <strong>Q patológica</strong>, se debe sospechar infarto actual o previo en contexto compatible, sin olvidar diferenciales.</li>
            <li>IAM CEST/IAM SEST se definen por el patrón ST y el contexto clínico; las ondas Q ayudan a estimar necrosis/evolución, pero no reemplazan esa clasificación.</li>
            <li className="bg-white p-3 rounded border border-slate-100 text-slate-700 italic">
              "Si el paciente tiene una elevación del ST, se puede llamar <strong>infarto agudo al miocardio</strong> en el <strong>diagnóstico electrocardiográfico</strong>, dada la gravedad de la condición."
            </li>
          </ul>
        </div>
      </div>

      {/* Nueva Sección Localización */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 mt-6 shadow-sm space-y-5 sm:space-y-6">
        <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
          <MapPin className="w-5 h-5 text-indigo-500" /> Localización
        </h4>

        <div className="space-y-8">
          <div>
            <h5 className="font-bold text-slate-700 mb-2">Precordiales</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <ContentImage src="content-images/precordiales.png" alt="Precordiales" className="w-full h-auto object-cover" />
              <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Imagen extraída de ECG++</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-700 mb-2">Derivadas frontales</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <ContentImage src="content-images/derivadas-frontales.png" alt="Derivadas frontales" className="w-full h-auto object-cover" />
              <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Imagen extraída de ECG++</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-700 mb-2">Derivaciones y Pared representada</h5>
            <div className="w-full overflow-hidden rounded-lg border border-slate-100">
              <ContentImage src="content-images/derivaciones-pared.png" alt="Derivaciones y Pared representada" className="w-full h-auto object-cover" />
              <p className="text-[10px] text-slate-400 italic px-2 pb-1 text-right">Imagen extraída de ECG++</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
