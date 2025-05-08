# 📄 App de Predicciones

Este proyecto es una app desarrollada con React y Vite que permite obtener predicciones o recomendaciones utilizando modelos de NLP, conectandose al proyecto `predictions-api`.

## 🛠️ Requisitos

1. Instalar dependencias:
```bash
npm install
```

2. Agregar un archivo ``.env` con la siguiente variable de entorno:
```bash
REACT_APP_API_BASE_URL=url_de_predictions_api
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## ▶️ Ejecución

Una vez iniciado el proyecto, en la página web se muestra un cuadro para adjuntar archivos en formato PDF. Una vez adjuntos, luego de que el backend genere las predicciones, se mostrarán en pantalla.

A su vez, se encuentra la pestaña de "Recomendaciones" que permite, también, adjuntar archivos en formato PDF para obtener los "titulos" y los "enlaces" a los 5 archvios más similares.