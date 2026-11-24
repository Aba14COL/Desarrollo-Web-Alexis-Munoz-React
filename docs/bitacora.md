# Bitácora Principal — FitPlan · Tercer Corte

Documentación centralizada del proyecto FitPlan para la entrega y sustentación del Tercer Corte (EAM 2026-II).

## 📂 Bitácoras del Tercer Corte

1. **Clase 01 (2026-10-28):** [C3_01_2026-10-28_React-Vite-JSX.md](../BedoyaAlexis_MuñozJuan_Bitacora-DW2026/C3_01_2026-10-28_React-Vite-JSX.md) — Planificación de la migración, inventario y arquitectura de componentes.
2. **Clase 02 (2026-11-04):** [C3_02_2026-11-04_React-Componentes-Props.md](../BedoyaAlexis_MuñozJuan_Bitacora-DW2026/C3_02_2026-11-04_React-Componentes-Props.md) — Montaje en Vite, adaptación de HTML a JSX y paso de props en tarjetas.
3. **Clase 03 (2026-11-09):** [C3_03_2026-11-09_Interaccion-Formularios.md](../BedoyaAlexis_MuñozJuan_Bitacora-DW2026/C3_03_2026-11-09_Interaccion-Formularios.md) — Formulario controlado con validación, estado en memoria, filtros y hook `useToggle`.
4. **Clase 04 (2026-11-16):** [C3_04_2026-11-16_APIs-CRUD.md](../BedoyaAlexis_MuñozJuan_Bitacora-DW2026/C3_04_2026-11-16_APIs-CRUD.md) — Conexión a Supabase REST, hook `useProgreso` con `AbortController` y ciclo CRUD completo.
5. **Clase 05 (2026-11-23):** [C3_05_2026-11-23_Navegacion-Integracion.md](../BedoyaAlexis_MuñozJuan_Bitacora-DW2026/C3_05_2026-11-23_Navegacion-Integracion.md) — React Router, Context global de sesión, rutas protegidas y CSS Modules.

---

## 🛠️ Síntesis de Decisiones Técnicas y Arquitectura
- **Patrón Service-Hook-View:** La comunicación con la base de datos se encapsula en `src/servicios/`, los estados asíncronos y cancelaciones en `src/hooks/`, y la interfaz en `src/paginas/`.
- **CSS Modules:** Aplicado en componentes estructurales (`Encabezado` y `Pie`) para garantizar aislamiento de estilos.
- **Row Level Security:** Ninguna cuenta puede consultar ni modificar datos de otros usuarios gracias a las directivas de seguridad de PostgreSQL en Supabase.
