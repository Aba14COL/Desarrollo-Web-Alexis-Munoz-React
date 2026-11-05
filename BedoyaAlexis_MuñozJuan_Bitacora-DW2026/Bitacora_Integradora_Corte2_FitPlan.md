---
tipo: bitacora-integradora
curso: Desarrollo Web
periodo: EAM-2026II
equipo: Equipo_Bedoya_Muñoz
corte: 2
fecha: 2026-10-22
estado: en-revision
tags:
  - desarrollo-web
  - bitacora
  - supabase
  - javascript
---

# Bitácora integradora — Corte 2 · FitPlan

> [!tip] Cómo leer esta nota
> Reúne las sesiones del segundo corte (17-sep a 22-oct de 2026). Los campos marcados con **[completar]** son datos que solo el equipo puede aportar (horas, enlaces, retroalimentación del docente).

## 1. Datos del proyecto

| Campo | Registro |
|---|---|
| Proyecto | FitPlan: rutinas de ejercicio según el IMC y registro de progreso |
| Docente | Robert Garcia Rey |
| Integrantes | Alexis Bedoya Arias · Juan Esteban Muñoz |
| Repositorio | https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz |
| Pull request de la funcionalidad IMC | https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz/pull/6 |
| Rama de trabajo | `Feature/javascript` |

## 2. Sesiones del corte

| Fecha | Tema | Qué se hizo | Responsables |
|---|---|---|---|
| 2026-09-17 | Introducción a JavaScript | Se definió el punto de partida y tres ideas: alimentación, animación al registrarse e IMC. Se eligió el IMC como primera funcionalidad, luego registro/login y contacto. | Alexis (apoyo en bitácora) · Muñoz (bitácora) |
| 2026-09-25 | JavaScript: cálculo del IMC | Script que calcula el IMC con peso y altura. Se corrigió una `section` que estaba fuera de `main`. Se sustentó la funcionalidad. | Alexis (sustentación) · Muñoz (desarrollo JS) |
| 2026-09-28 | Arreglos con JavaScript | Arreglo de rutinas con propiedad de categoría IMC para filtrar rutinas personalizadas. | Alexis (arreglos) · Muñoz (desarrollo JS) |
| 2026-10-01 | Arreglos + IMC | El IMC filtra y muestra las rutinas recomendadas. | Alexis (funcionalidad) · Muñoz (arreglos) |
| 2026-10-07 | Supabase, RLS y Google Auth | Acceso con Google y con correo, RLS, trigger de usuario, `sesion.js` y rediseño de estilos. | Alexis (Supabase, Google Auth, estilos) · Muñoz (bitácora) |
| 2026-10 (fecha por confirmar) | CRUD real con `fetch` | Tabla `registros_entrenamiento`, listar/crear/editar/eliminar, búsqueda, estados de carga/vacío/error y formulario de contacto. | **[completar]** |



## 3. Participación y responsabilidades

| Integrante | Asistió | Rol | Responsabilidad asumida | Aporte verificable |
|---|:---:|---|---|---|
| Alexis Bedoya Arias | Sí | Desarrollo y sustentación | Cálculo del IMC, arreglos, Supabase, Google Auth, estilos, sustentaciones | PR #6, rama `Feature/javascript`; commits **[completar enlaces]** |
| Juan Esteban Muñoz | Sí | Desarrollo y supervisión | Funcionalidad JavaScript, arreglos de rutinas, formulario de contacto y bitácora | Commits **[completar enlaces]** |

## 4. Reto aplicado al proyecto

### Funcionalidad trabajada

FitPlan recomienda rutinas según el IMC de la persona y permite que cada usuario, con su propia cuenta, registre, consulte, corrija y elimine sus entrenamientos. El formulario de contacto guarda los mensajes en la base de datos.

### Criterios de aceptación

- [x] El IMC se calcula con peso y altura validados (> 0) y muestra la categoría.
- [x] Las rutinas se filtran por categoría de IMC desde un arreglo de objetos con `id`.
- [x] Registro e inicio de sesión con correo y con Google.
- [x] La sesión persiste entre páginas y se cierra con "Cerrar sesión".
- [x] CRUD de `registros_entrenamiento` con datos persistentes.
- [x] RLS: cada usuario solo ve sus propios registros.
- [x] Estados de carga, vacío y error; búsqueda con mensaje de "sin resultados".
- [x] Formulario de contacto guarda en `mensajes_contacto`.


### Archivos o componentes modificados

- `index.html`: portada y calculadora de IMC.
- `login.html` y `registro.html`: acceso con correo y con Google.
- `rutinas.html` y `contacto.html`: rediseño visual y formulario de contacto.
- `progreso.html` / `progreso.js`: CRUD de registros, búsqueda y estados.
- `styles.css`: estilo negro y amarillo, tipografía Barlow, diseño responsive.
- `app.js` y `datos.js`: cálculo del IMC, arreglo de rutinas, `filter` y `find`.
- `config.js`, `auth.js`, `sesion.js`, `registros-api.js`, `contacto.js`: módulos con `export`/`import`.
- `supabase/schema.sql` y `supabase/contacto.sql`: tablas y políticas RLS.

## 5. Decisiones técnicas

| Decisión | Razón | Alternativa descartada |
|---|---|---|
| IMC como criterio para filtrar rutinas | Es un punto de partida simple para una vida saludable | Recomendar por objetivo o nivel |
| Cada rutina es un objeto con `id` dentro de un arreglo | Identifica rutinas sin ambigüedad; el registro guarda `rutina_id` y se recupera con `find` | Guardar el nombre de la rutina como texto |
| Acceso con Google y con correo | Dos formas de entrar con una sola base de usuarios | Solo una de las dos |
| RLS con `auth.uid() = user_id` | La seguridad real está en la base de datos, no en ocultar botones | Confiar solo en redirigir desde el frontend |
| Solo política INSERT en `mensajes_contacto` | Cualquiera envía, nadie lee desde el navegador | Permitir SELECT público |
| Clave publishable en `config.js` | Es la clave pensada para el navegador; nunca `secret` ni `service_role` | Poner claves privadas en el frontend |
| PATCH para editar | Solo cambia los campos modificados; una edición no se convierte en creación | PUT |
| Borrado físico con filtro por `id` y verificación de 1 fila afectada | Son datos personales sin relaciones; no se anuncia un cambio que no ocurrió | Borrado lógico |
| Separar guardado y consulta de la lista | Evita duplicados y mensajes falsos si falla solo el GET | Una sola operación |
| Módulos ES (`type="module"`) | Cada archivo hace una sola tarea sin variables globales | Un único `app.js` |
| Estilo negro y amarillo | Identidad de gimnasio; más impactante que el verde claro | Verde claro (salud) |

## 6. Problemas y soluciones

| Problema encontrado | Causa identificada | Solución aplicada | ¿Cómo se verificó? |
|---|---|---|---|
| `section` de tamaño diferente | Estaba fuera de `main` | Moverla dentro de `main` | Se ve correctamente |
| "No API key found" al usar Google | URL o clave mal configuradas en `config.js` | Corregir `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` | El flujo avanzó al siguiente paso |
| "Unsupported provider: provider is not enabled" | Google no estaba activado en Supabase | Activarlo con Client ID y Secret de Google Cloud | Llegó a la pantalla de Google y volvió a la página |
| Google muestra el dominio de Supabase | App no verificada en Google | Se dejó así para la práctica | Acceso completado |
| "Email address is invalid" | Supabase rechazó la dirección | Registrar con un correo real | **[completar]** |
| `otp_expired` tras confirmar el correo | Enlace usado o vencido | **[completar: desactivar Confirm email o registrar de nuevo]** | **[completar]** |
| La sesión no se veía al cambiar de página | Solo login y registro cargaban Supabase | Crear `sesion.js` y cargarlo en todas las páginas | Saludo y "Cerrar sesión" visibles al navegar |
| Error 404 "Could not find the table 'public.registros_x'" al listar | Nombre de tabla incorrecto en la petición | Corregir el nombre a `registros_entrenamiento` | Se probó el estado de error con el botón Reintentar y luego la lista cargó |

## 7. Evidencias

| Tipo    | Descripción                                               | Enlace o ruta                                                  |
| ------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Commit  | Funcionalidad JavaScript (IMC)                            | https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz/pull/6 |
| Commit  | Estilos nuevos                                            | ![[Nuevo formato de Stylles.jpeg]]                             |
| Captura | Acceso con ambas formas                                   | ![[Login con ambas formas.jpeg]]                               |
| Captura | Tablas con filas del usuario                              | ![[Tabla IMC.jpeg]]                                            |
| Captura | IMC calculado y rutinas recomendadas                      | Diapositiva 5 de la presentación                               |
| Captura | Estados de carga, vacío y error                           | Diapositiva 10                                                 |
| Captura | Recorrido con Google (acceso, saludo, cierre)             | Diapositiva 11                                                 |
| Captura | Formulario en edición, registro creado y fila en Supabase | Diapositiva 13                                                 |
| Captura | Confirmación de eliminar y lista vacía                    | Diapositiva 14                                                 |
| Captura | Políticas RLS                                             | **[adjuntar captura]**                                         |
| Captura | Dos cuentas: la segunda no ve los registros de la primera | **[adjuntar captura]**                                         |

## 8. Uso de inteligencia artificial

> [!important] Registrar la IA no reemplaza la explicación técnica. El equipo debe verificar, adaptar y comprender cualquier resultado utilizado.

| Herramienta | Objetivo o pregunta | Qué se utilizó | Cómo se verificó | Qué se modificó |
|---|---|---|---|---|
| Claude (Anthropic) | Configurar Supabase (RLS, permisos, trigger) y Google Cloud/Auth | Guía de configuración y SQL | Se ejecutó el SQL en Supabase y se revisó en Authentication > Users y en las tablas | **[completar adaptación propia]** |
| Claude (Anthropic) | Código de acceso y sesión | `auth.js`, `login.html`, `registro.html`, `sesion.js` | Pruebas de acceso con Google y con correo, y navegación entre páginas | **[completar]** |
| Claude (Anthropic) | Rediseño de estilos | `styles.css`, `index.html`, `rutinas.html`, `contacto.html` | Revisión visual en el navegador | **[completar]** |
| ChatGPT | CSS esqueleto (corte 1) | Base del CSS | Revisión visual | Ajustes de colores |

Las sesiones del 17-sep, 25-sep, 28-sep y 01-oct se declararon sin IA. Si el CRUD con `fetch` o el formulario de contacto contaron con ayuda de IA, **[declararlo aquí]**.

## 9. Defensa técnica y retroalimentación

| Campo | Registro |
|---|---|
| Integrante que defendió | Alexis (25-sep, 28-sep, 01-oct) |
| Pregunta recibida | Explicar la funcionalidad |
| Respuesta resumida | Se explicó cómo funciona el script del IMC y el filtrado de rutinas |
| Retroalimentación docente | **[completar]** |
| Mejora acordada | **[completar]** |

## 10. Aprendizajes

- **Conceptos comprendidos:** variables, funciones, eventos y DOM; arreglos de objetos con `find` y `filter`; módulos con `export`/`import`; `fetch` con `async/await`; RLS; diferencia entre PATCH y PUT.
- **Algo que aún genera duda:** **[completar]**
- **Qué haríamos diferente:** restricción única o clave de idempotencia en los POST, paginar la lista y usar el historial para ajustar las recomendaciones.

## 11. Revisión antes de entregar

- [ ] Todos los integrantes registraron un aporte verificable (faltan enlaces a commits).
- [ ] Los enlaces y rutas de evidencia funcionan.
- [x] Los criterios de aceptación están actualizados.
- [ ] El uso de IA fue declarado y verificado (revisar CRUD y contacto).
- [ ] El equipo puede explicar las decisiones registradas.
