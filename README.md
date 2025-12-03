# ECG en 1 Hora

Una aplicación web interactiva para aprender a interpretar electrocardiogramas de forma rápida y estructurada.

## 🩺 Descripción

"ECG en 1 Hora" es una herramienta educativa diseñada para estudiantes de medicina y profesionales de la salud que desean aprender o repasar la interpretación de electrocardiogramas. La aplicación presenta el contenido de manera organizada siguiendo la metodología "FREE RICH" para el análisis sistemático de ECGs.

## ✨ Características

- **Análisis Sistemático**: Guía paso a paso para leer un ECG siguiendo el método RFE RCIH
- **Análisis Inicial**: Ritmo, Frecuencia y Eje Eléctrico
- **Análisis por Partes**: Desglose detallado de cada componente de la onda ECG
- **Patologías**: Cobertura de cardiopatía isquémica y arritmias
- **Interfaz Intuitiva**: Navegación por pestañas con contenido visual
- **Responsive**: Funciona en dispositivos móviles y de escritorio

## 🚀 Demo

Visita la aplicación en vivo: [ECG en 1 Hora](https://joaquin-diaz-p.github.io/ecg-en-1-hora/)

## 🛠️ Tecnologías

- React 19
- Vite
- Tailwind CSS v4
- Lucide React (iconos)

## 💻 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Joaquin-Diaz-P/ecg-en-1-hora.git

# Navegar al directorio
cd ecg-en-1-hora

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Build para Producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`

## 📚 Contenido

### 1. ¿Cómo leer un ECG?
Introducción al método sistemático "FREE RICH" para el análisis de electrocardiogramas.

### 2. Análisis Inicial (RFE)
- Ritmo (Regular vs Irregular)
- Frecuencia (Cálculo para ritmos regulares e irregulares)
- Eje Eléctrico (Interpretación y desviaciones)

### 3. Análisis por Partes
- Onda P (Generación del ritmo)
- Intervalo PR (Conducción AV)
- Complejo QRS (Bloqueos de rama, infartos, hipertrofia)
- Segmento ST (Isquemia/lesión)
- Onda T (Alteraciones)

### 4. Patologías
- **Cardiopatía Isquémica**: Isquemia, Lesión, Necrosis, Infarto
- **Arritmias**: Supraventriculares y ventriculares

## 👨‍⚕️ Autor

**Joaquín Díaz P.**

Desarrollado con base en apuntes de cardiología para facilitar el aprendizaje de la interpretación electrocardiográfica.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias de mejora, no dudes en abrir un issue o pull request.

---

**Nota**: Esta aplicación está diseñada con fines educativos. Siempre consulta con un profesional médico para la interpretación de ECGs en casos clínicos reales.
