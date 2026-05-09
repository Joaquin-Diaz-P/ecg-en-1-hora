# Métricas para CV - ECG en 1 hora

Esta página ya usa Google Analytics 4 con el ID `G-CBXF831HJ7`.

## Qué mirar para el CV

Usa siempre un rango de fechas claro, por ejemplo: "desde septiembre de 2025 hasta mayo de 2026".

1. Usuarios
   - Google Analytics > Reports > Acquisition > User acquisition.
   - Métrica útil: `Total users` o `Active users`.
   - Frase sugerida: "utilizado por X usuarios únicos".

2. Visualizaciones
   - Google Analytics > Reports > Engagement > Pages and screens.
   - Métrica útil: `Views`.
   - Frase sugerida: "con Y visualizaciones".

3. Uso educativo real
   - Google Analytics > Reports > Engagement > Events.
   - Eventos propios:
     - `study_section_view`: alguien abrió una sección de estudio.
     - `arrhythmia_selected`: alguien usó el clasificador de arritmias.
     - `study_milestone`: alguien permaneció estudiando 30, 120 o 300 segundos.
     - `study_session_start`: se inició una sesión de estudio.

4. Alcance geográfico
   - Google Analytics > Reports > User > User attributes > Demographic details.
   - Dimensión útil: país.
   - Frase sugerida: "con uso registrado en X países".

## Dimensiones recomendadas en GA4

Para ver mejor los eventos propios, crea dimensiones personalizadas en:

Admin > Data display > Custom definitions > Create custom dimension.

Configura estas dimensiones de alcance `Event`:

- `section_id`
- `section_title`
- `arrhythmia_id`
- `arrhythmia_name`
- `arrhythmia_group`
- `rhythm_type`
- `study_seconds`
- `milestone_label`

Las dimensiones no son retroactivas: empiezan a mostrar datos desde que se crean.

## Frases listas para curriculum

Versión breve:

> Desarrollé ECG en 1 hora, recurso educativo web de electrocardiografía utilizado por X usuarios únicos, con Y visualizaciones registradas en Google Analytics.

Versión con interacción:

> Desarrollé ECG en 1 hora, plataforma educativa interactiva de electrocardiografía, con X usuarios únicos, Y visualizaciones y Z interacciones educativas registradas en secciones y clasificador de arritmias.

Versión académica:

> Diseñé y publiqué ECG en 1 hora, recurso educativo abierto para el aprendizaje de electrocardiografía, con X usuarios únicos, Y visualizaciones y uso registrado en Z países.
