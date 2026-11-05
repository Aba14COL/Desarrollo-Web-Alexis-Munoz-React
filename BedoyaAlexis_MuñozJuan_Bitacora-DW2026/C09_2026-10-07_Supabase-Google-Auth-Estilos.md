---
tipo: bitacora-clase
curso: Desarrollo Web
periodo: EAM-2026II
equipo: Equipo_XX
corte: 2
semana:
clase: 09
fecha: 2026-10-07
estado: en-progreso
tags:
  - desarrollo-web
  - bitacora
  - supabase
---

# Bitácora — Clase [09]

> [!tip] Cómo usar esta plantilla
> Duplica esta nota al finalizar cada clase y nómbrala `C##_AAAA-MM-DD_Tema`. Completa los campos entre corchetes y conserva enlaces verificables.

## 1. Datos de la sesión

| Campo    | Registro                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------- |
| Tema     | Supabase, RLS e inicio de sesión con Google                                                     |
| Objetivo | Autenticar usuarios con Google y con correo, proteger sus datos con RLS y rediseñar los estilos |
| Proyecto | FitPlan                                                                                         |
| Inicio   | [hora]                                                                                          |
| Cierre   | [hora]                                                                                          |

## 2. Participación y responsabilidades

| Integrante | Asistió | Rol de la clase          | Responsabilidad asumida                                     | Aporte verificable          |
| ---------- | :-----: | ------------------------ | ----------------------------------------------------------- | --------------------------- |
| [Alexis]   | [Sí/No] | [Rol]                    | Configuración de Supabase, Google Auth y estilos de FitPlan | [adjuntar enlace al commit] |
| [IMuñoz]   | [Sí/No] | [Supervisor profesional] | [Bitacora]                                                  | [adjuntar enlace al commit] |

## 3. Reto aplicado al proyecto

Integrar Supabase Auth en FitPlan con acceso por Google y por correo y contraseña, proteger las tablas `Usuario`, `Imc` y `Rutinas` con RLS, mantener la sesión al cambiar de página y rediseñar la interfaz. [Ajusta este texto al enunciado exacto del docente.]

### Criterios de aceptación

- [x] Una persona puede registrarse e iniciar sesión con Google.
- [x] Una persona puede registrarse e iniciar sesión con correo y contraseña.
- [x] Al registrarse se crea su fila en la tabla `Usuario`.
- [x] La sesión se mantiene al cambiar de página y se cierra con "Cerrar sesión".
- [x] Cada persona solo ve y guarda sus propios registros de `Imc`; `Rutinas` es de lectura pública.


### Archivos o componentes modificados

- `index.html`: portada nueva y calculadora de IMC que guarda el resultado en Supabase cuando hay sesión.
- `login.html` y `registro.html`: acceso con correo y contraseña, y con Google (Supabase Auth).
- `rutinas.html` y `contacto.html`: rediseño visual.
- `styles.css`: nuevo estilo (negro y amarillo, tipografías Barlow).
- `sesion.js`: módulo compartido que mantiene y muestra la sesión en todas las páginas.
- `auth.js` y `config.js`: cliente de Supabase y funciones de acceso.
- Supabase (SQL Editor): permisos, políticas RLS y trigger que crea la fila de `Usuario`.

## 4. Decisiones técnicas

| Decisión                                          | Razón                                                                           | Alternativa descartada                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| Acceso con Google y con correo y contraseña       | Ofrecer las dos formas de entrar con una sola base de usuarios en Supabase Auth | Solo Google, o solo correo y contraseña            |
| RLS en `Usuario`, `Imc` y `Rutinas`               | Cada persona ve solo sus datos; las rutinas son de lectura pública              | Desactivar RLS o abrir lectura y escritura         |
| Trigger que crea la fila de `Usuario`             | La fila se crea sola al registrarse, sin depender del frontend                  | Insertar la fila desde el navegador                |
| Módulo `sesion.js` cargado en todas las páginas   | Procesar el retorno de Google y mostrar la sesión al cambiar de página          | Repetir el código de sesión en cada HTML           |
| Clave publishable en `config.js`                  | Es la clave pensada para el navegador; el Client Secret queda solo en Supabase  | Usar claves secret o `service_role` en el frontend |
| Estilo negro y amarillo con titulares condensados | Referencia visual de SmartFit para dar identidad de gimnasio a FitPlan          | Mantener la paleta lima y naranja original         |
|                                                   |                                                                                 |                                                    |

## 5. Problemas y soluciones

| Problema encontrado                                                  | Causa identificada                                                                    | Solución aplicada                                                 | ¿Cómo se verificó?                                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Al pulsar el botón redirigía a un JSON con "No API key found"        | URL o clave de Supabase mal configuradas en `config.js`                               | Corregir `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY`              | El error cambió al siguiente paso del flujo de Google              |
| "Unsupported provider: provider is not enabled"                      | El proveedor Google no estaba activado en Supabase                                    | Activarlo y pegar el Client ID y el Client Secret de Google Cloud | El botón llevó a la pantalla de Google y volvió a la página        |
| Google mostraba el dominio de Supabase en vez de "FitPlan"           | La app no está verificada en Google, así que muestra el dominio del callback          | Se dejó así para la práctica; es un comportamiento esperado       | El acceso se completó y volvió a la página                         |
| "Email address is invalid" al registrarse con correo                 | Supabase rechazó la dirección usada                                                   | Registrar con un correo real                                      | [completar cómo lo verificaste]                                    |
| `otp_expired` en la URL tras confirmar el correo                     | El enlace de confirmación ya se había usado o estaba vencido                          | [completar: desactivar Confirm email o registrar de nuevo]        | [completar cómo lo verificaste]                                    |
| La sesión no se veía al cambiar de página                            | Solo login y registro cargaban Supabase; el inicio no procesaba el retorno de Google  | Crear `sesion.js` y cargarlo en todas las páginas                 | [completar: navegar entre páginas y ver el saludo y Cerrar sesión] |

## 6. Evidencias

| Tipo    | Descripción                                                       | Enlace o ruta                      |
| ------- | ----------------------------------------------------------------- | ---------------------------------- |
| Commit  | Nuevo Styles (ayuda de IA)                                        | ![[Nuevo formato de Stylles.jpeg]] |
| Captura | Usuarios creados en Authentication > Users (sin datos personales) | ![[Login con ambas formas.jpeg]]   |
| Captura | Tablas `Usuario` e `Imc` con filas del usuario                    | ![[Tabla IMC.jpeg]]                |
| Captura | Políticas RLS de las tres tablas                                  | [adjuntar captura]                 |
| Captura | Sesión iniciada visible en el menú al cambiar de página           |                                    |

## 7. Uso de inteligencia artificial

**Sí se utilizó inteligencia artificial en esta sesión.**

- **Herramienta:** Claude (Anthropic), en la aplicación de chat.
- **Para qué se usó:**
  - Guía para configurar Supabase: seguridad por filas (RLS), permisos por tabla y el trigger que crea la fila de `Usuario` al registrarse.
  - Guía para configurar Google Cloud (cliente OAuth) y el proveedor Google en Supabase Auth.
  - Código de acceso con Google y con correo y contraseña (`auth.js`, `login.html`, `registro.html`) y del módulo `sesion.js` para mantener la sesión entre páginas.
  -
  - Rediseño de estilos s (`styles.css`, `index.html`, `rutinas.html`, `contacto.html`).
- **Qué se hizo sin IA:** las tablas `Usuario`, `Imc` y `Rutinas` en Supabase, y la estructura y el contenido original de las páginas. [Agrega aquí cualquier otra parte propia.]
- **Cómo se verificó y adaptó:** el equipo ejecutó el SQL en su proyecto de Supabase, configuró los paneles de Supabase y Google Cloud, probó el acceso y revisó el resultado en Authentication > Users y en las tablas. [completa qué cambiaste tú].

## 8. Defensa técnica y retroalimentación

| Campo                     | Registro                |
| ------------------------- | ----------------------- |
| Integrante que defendió   | [Integrante]            |
| Pregunta recibida         | [Pregunta]              |
| Respuesta resumida        | [Respuesta]             |
| Retroalimentación docente | [Observación]           |
| Mejora acordada           | [Acción concreta]       |

## 9. Aprendizajes

- **Concepto comprendido:** []
- **Algo que aún genera duda:** []
- **Qué haríamos diferente:** []

## 10. Revisión antes de entregar

- [x] Todos los integrantes registraron un aporte verificable.
- [x] Los enlaces y rutas de evidencia funcionan.
- [x] Los criterios de aceptación están actualizados.
- [x] El uso de IA fue declarado y verificado.
- [x] El equipo puede explicar las decisiones registradas.
