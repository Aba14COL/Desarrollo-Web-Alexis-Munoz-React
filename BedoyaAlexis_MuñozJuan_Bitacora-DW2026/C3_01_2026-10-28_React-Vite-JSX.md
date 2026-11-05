---
tipo: bitacora-clase
curso: Desarrollo Web
periodo: EAM-2026II
equipo: Equipo_XX
corte: 3
semana:
clase: 01
fecha: 2026-10-28
estado: en-progreso
tags:
  - desarrollo-web
  - bitacora
---

# Bitácora — Clase [01]

> [!tip] Cómo usar esta plantilla
> Duplica esta nota al finalizar cada clase y nómbrala `C##_AAAA-MM-DD_Tema`. Completa los campos entre corchetes y conserva enlaces verificables.

## 1. Datos de la sesión

| Campo    | Registro                                                                    |
| -------- | --------------------------------------------------------------------------- |
| Tema     | [El proyecto en React: React, Vite y JSX]                                   |
| Objetivo | [Organizar la migración de FitPlan a React: inventario, componentes y plan] |
| Proyecto | [FitPlan]                                                                   |
| Inicio   | [7:00]                                                                      |
| Cierre   | [9:00]                                                                      |

## 2. Participación y responsabilidades

| Integrante | Asistió | Rol de la clase | Responsabilidad asumida                                | Aporte verificable |
| ---------- | :-----: | --------------- | ------------------------------------------------------ | ------------------ |
| [Juan Muñoz]    |   [Sí]    | [Rol]           | [Inventario de vistas y plan de migración]             | []                 |
| [Alexis Bedoya] |   [Sí]    | [Rol]           | [Propuesta de componentes de la vista Rutinas]         | []                 |

## 3. Reto aplicado al proyecto

Planificar la migración de FitPlan (HTML, CSS y JavaScript) a React con Vite: inventariar las vistas, elegir la primera vista a migrar, proponer sus componentes y definir qué se conserva y qué se adapta. En esta clase no se migró código; el producto es el plan documentado.

### Criterios de aceptación

- [x] Inventario de las vistas y funcionalidades actuales del proyecto
- [x] Primera vista elegida con al menos tres componentes propuestos
- [x] Qué se conserva y qué se adapta explicado, con responsables y orden de trabajo definidos
- [x] Enlace al repositorio con la versión del segundo corte identificada

### Archivos o componentes modificados

- Ninguno. Clase de planificación, no se modificó código.
- Componentes propuestos para la vista Rutinas: `Header`, `NivelRutina`, `PasoRutina`, `NotaConsejo`, `Footer`.

## 4. Decisiones técnicas

| Decisión                                         | Razón                                                                                               | Alternativa descartada                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [Migrar primero la vista Rutinas]                | [No tiene formularios ni API y repite tres veces la misma estructura, ideal para componentes y props] | [Empezar por Mi progreso, que depende de estado, formularios y Supabase] |
| [Convertir el encabezado en un solo componente]  | [Hoy está copiado en los seis archivos HTML]                                                        | [Mantener un encabezado por página]                                 |
| [Marcar el segundo corte con la etiqueta `v2-corte2`] | [Dejar esa versión como referencia para comparar la evolución del proyecto]                    | [Usar solo la rama `develop` como referencia]                       |

## 5. Problemas y soluciones

| Problema encontrado | Causa identificada | Solución aplicada | ¿Cómo se verificó? |
| ------------------- | ------------------ | ----------------- | ------------------ |
|                     |                    |                   |                    |

## 6. Evidencias

| Tipo        | Descripción                                          | Enlace o ruta                                                      |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| Repositorio | [Proyecto FitPlan del segundo corte]                 | [https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz]          |
| Etiqueta    | [Versión del segundo corte sobre `develop`]          | [`v2-corte2`]                                                      |
| Documento   | [Bitácora con inventario, componentes y plan]        | [Bitacora_FitPlan_React.docx]                                      |

## 7. Uso de inteligencia artificial

**Se utilizó inteligencia artificial en esta sesión.**

- Herramienta: [Claude]
- Para qué: [ redactar un borrador del plan de migración]
- Cómo se verificó: [El equipo revisó el inventario contra los archivos del repositorio y ajustó las decisiones y los responsables]

## 8. Defensa técnica y retroalimentación

| Campo                     | Registro            |
| ------------------------- | ------------------- |
| Integrante que defendió   | [Nombre]            |
| Pregunta recibida         | [Pregunta]          |
| Respuesta resumida        | [Respuesta]         |
| Retroalimentación docente | [Observación]       |
| Mejora acordada           | [Acción concreta]   |

## 9. Aprendizajes

- **Concepto comprendido:** [React organiza la interfaz con componentes reutilizables y Vite prepara el entorno para desarrollarla y publicarla]
- **Algo que aún genera duda:** []
- **Qué haríamos diferente:** []

## 10. Revisión antes de entregar

- [x] Todos los integrantes registraron un aporte verificable.
- [x] Los enlaces y rutas de evidencia funcionan.
- [x] Los criterios de aceptación están actualizados.
- [x] El uso de IA fue declarado y verificado.
- [x] El equipo puede explicar las decisiones registradas.
