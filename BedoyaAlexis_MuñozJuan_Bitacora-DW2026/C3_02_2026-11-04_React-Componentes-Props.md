---
tipo: bitacora-clase
curso: Desarrollo Web
periodo: EAM-2026II
equipo: Equipo_XX
corte: 3
semana:
clase: 02
fecha: 2026-11-04
estado: en-progreso
tags:
  - desarrollo-web
  - bitacora
  - react
  - componentes
  - props
---

# Bitácora — Clase 02

## 1. Datos de la sesión

| Campo    | Registro                                                                                  |
| -------- | ----------------------------------------------------------------------------------------- |
| Tema     | Migración a React: instalación de Vite, conversión de index.html y componentes con props  |
| Objetivo | Crear el proyecto React con Vite, migrar la estructura HTML a JSX y dividir una vista en componentes reutilizables que reciben datos mediante props |
| Proyecto | FitPlan                                                                                   |
| Inicio   | 7:00                                                                                      |
| Cierre   | 9:00                                                                                      |

## 2. Participación y responsabilidades

| Integrante      | Asistió | Rol de la clase   | Responsabilidad asumida                                           | Aporte verificable                                         |
| --------------- | :-----: | ----------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Juan Muñoz      |   Sí    | Desarrollo        | Instalación de Node, npm y creación del proyecto con Vite         | `package.json`, `vite.config.js`, `index.html`             |
| Alexis Bedoya   |   Sí    | Desarrollo        | Migración de la vista a componentes JSX y conexión de props       | `App.jsx`, componentes en `src/componentes/`               |

## 3. Reto aplicado al proyecto

### Funcionalidad trabajada

Se ejecutó la migración planificada en la clase anterior. Se instaló Node.js y npm, se creó el proyecto React con Vite (`npm create vite@latest`), se trasladó el `index.html` original al formato que Vite requiere (con el `<div id="root">` y el `<script type="module">`), se dividió la vista principal en componentes con función clara y se reutilizó una tarjeta que recibe datos por props para mostrar tres registros de progreso.

### Criterios de aceptación

- [x] Proyecto React creado con Vite y ejecutándose con `npm run dev`
- [x] `index.html` adaptado al formato de Vite con punto de montaje `#root`
- [x] Vista dividida en al menos tres componentes con función clara
- [x] Tarjeta reutilizada con tres registros recibidos mediante props
- [x] Estilos adaptados y verificados en dos anchos (escritorio y móvil ≤ 860 px)

### Archivos o componentes modificados

- `package.json`: creado con dependencias `react`, `react-dom`, `@vitejs/plugin-react` y `vite`
- `vite.config.js`: configuración base con plugin de React
- `index.html`: migrado para incluir `<div id="root">` y `<script type="module" src="/src/main.jsx">`
- `src/main.jsx`: punto de entrada que monta `<App />` en el DOM
- `src/App.jsx`: componente raíz que importa `registrosProgreso` desde `datos.js` y los pasa como prop `registros` a `SeccionProgreso`
- `src/datos.js`: se agregó el arreglo `registrosProgreso` con tres objetos de sesiones de entrenamiento
- `src/componentes/SeccionProgreso.jsx`: componente contenedor que recibe `registros` por props, calcula las completadas y compone los dos sub-componentes
- `src/componentes/CabeceraProgreso.jsx`: recibe props `total` y `completadas` para mostrar el resumen de la sección
- `src/componentes/TarjetaProgreso.jsx`: tarjeta reutilizable que recibe `rutina`, `fecha`, `duracionReal`, `estado` y `nota` por props; se renderiza tres veces con datos distintos
- `src/styles.css`: se agregaron estilos para `.progreso-cabecera`, `.progreso-resumen`, `.resumen-dato` y media query `@media (max-width: 860px)` para responsive

## 4. Decisiones técnicas

| Decisión                                                       | Razón                                                                                                       | Alternativa descartada                                    |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Usar Vite como bundler del proyecto React                      | Es rápido, tiene HMR instantáneo y es el recomendado por la comunidad React actual                          | Create React App (CRA), que está descontinuado            |
| Centralizar los datos en `datos.js` y pasarlos como props      | Separa los datos de la presentación y permite reutilizar los componentes con distintos registros              | Escribir los datos directamente dentro de cada componente  |
| Dividir la sección Progreso en tres componentes                | Cada componente tiene una responsabilidad clara: contenedor, cabecera con resumen, y tarjeta reutilizable    | Poner todo en un solo componente grande                   |
| Breakpoint en 860 px para el diseño responsive                 | Coincide con el breakpoint que ya se usa en el resto del CSS del proyecto                                    | Usar un breakpoint distinto que rompa la consistencia     |

## 5. Problemas y soluciones

| Problema encontrado                                              | Causa identificada                                                                 | Solución aplicada                                                   | ¿Cómo se verificó?                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| La página aparecía en blanco al ejecutar `npm run dev`           | El archivo `Calculadoraimc.jsx` tenía la "i" minúscula pero se importaba como `CalculadoraIMC` (Vite es case-sensitive) | Se renombró el archivo a `CalculadoraIMC.jsx` para que coincida con el import | Se ejecutó `npm run dev` y la página se mostró correctamente |

## 6. Evidencias

| Tipo       | Descripción                                                       | Enlace o ruta                                                    |
| ---------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| Código     | Componente raíz con import de datos y paso de props               | `src/App.jsx`                                                    |
| Código     | Datos de progreso exportados como arreglo                         | `src/datos.js` (líneas 145-170)                                  |
| Código     | Componente contenedor que recibe y distribuye props               | `src/componentes/SeccionProgreso.jsx`                            |
| Código     | Cabecera con props `total` y `completadas`                        | `src/componentes/CabeceraProgreso.jsx`                           |
| Código     | Tarjeta reutilizable con cinco props                              | `src/componentes/TarjetaProgreso.jsx`                            |
| Código     | Estilos responsive para dos anchos                                | `src/styles.css` (sección "Progreso")                            |
| Repositorio| Proyecto FitPlan migrado a React                                  | https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz          |

## 7. Uso de inteligencia artificial

**Se utilizó inteligencia artificial en esta sesión.**

| Herramienta | Objetivo o pregunta                                        | Qué se utilizó                                                     | Cómo se verificó                                                    | Qué se modificó                          |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------- |
| Claude      | Diagnosticar por qué la página salía en blanco             | Identificación del error de case-sensitivity en el nombre del archivo | Se renombró el archivo y se confirmó que la app renderiza correctamente | Se renombró `Calculadoraimc.jsx` a `CalculadoraIMC.jsx` |
| Claude      | Crear los tres componentes de la sección Progreso con props | Estructura de los componentes y flujo de props                     | El equipo revisó cada componente, verificó los props y ejecutó `npm run dev` | Se adaptaron nombres y estilos al diseño de FitPlan |

## 8. Defensa técnica y retroalimentación

| Campo                     | Registro            |
| ------------------------- | ------------------- |
| Integrante que defendió   |                     |
| Pregunta recibida         |                     |
| Respuesta resumida        |                     |
| Retroalimentación docente |                     |
| Mejora acordada           |                     |

## 9. Aprendizajes

- **Concepto comprendido:** Los props en React permiten pasar datos de un componente padre a sus hijos, haciendo que una misma tarjeta se reutilice con información diferente sin duplicar código
- **Algo que aún genera duda:** Cuándo conviene usar estado local (`useState`) vs recibir datos por props desde el padre
- **Qué haríamos diferente:** Verificar desde el inicio que los nombres de archivo coincidan exactamente con los imports para evitar errores de case-sensitivity

## 10. Revisión antes de entregar

- [x] Todos los integrantes registraron un aporte verificable.
- [x] Los enlaces y rutas de evidencia funcionan.
- [x] Los criterios de aceptación están actualizados.
- [x] El uso de IA fue declarado y verificado.
- [x] El equipo puede explicar las decisiones registradas.

