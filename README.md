# FITPLAN — Plataforma de Entrenamiento y Progreso (React + Vite)

> Proyecto de desarrollo web correspondiente al **Tercer Corte (EAM 2026-II)**.  
> Migración completa de arquitectura multipágina tradicional a una **Single Page Application (SPA)** moderna construida con React, Vite y Supabase.

---

## 👥 Integrantes
- **Alexis Bedoya**
- **Juan Muñoz**

- **Repositorio Segundo Corte (Referencia de migración):** [Repositorio v2-corte2](https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz)
- **Documentación Principal y Bitácoras:** [docs/bitacora.md](docs/bitacora.md) (y carpeta `BedoyaAlexis_MuñozJuan_Bitacora-DW2026/`)

---

## 🚀 Tecnologías Utilizadas
- **Frontend:** React 19, Vite, React Router DOM 7
- **Estilos:** CSS3 nativo + CSS Modules (`*.module.css`) + variables CSS
- **Backend / Base de Datos:** Supabase (Auth, PostgreSQL, Row Level Security)
- **Despliegue:** Vercel Hobby

---

## ⚙️ Instalación y Ejecución Local

### 1. Requisitos
- Node.js (v18 o superior)
- npm o pnpm

### 2. Clonar el repositorio
```bash
git clone https://github.com/Aba14COL/Desarrollo-Web-Alexis-Munoz-React.git
cd Desarrollo-Web-Alexis-Munoz-React
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Configurar variables de entorno
Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```
Edita `.env.local` con tus credenciales de Supabase:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 6. Compilar para producción
```bash
npm run build
npm run preview
```

---

## 🗺️ Mapa de Rutas de la Aplicación

| Ruta | Vista | Acceso | Descripción |
|---|---|:---:|---|
| `/` | `Inicio` | Público | Portada, qué es FitPlan y Calculadora de IMC con rutinas recomendadas. |
| `/rutinas` | `Rutinas` | Público | 3 niveles de entrenamiento con calentamiento, circuitos y enfriamiento. |
| `/contacto` | `Contacto` | Público | Formulario de dudas y tabla comunitaria de preguntas conectada a Supabase. |
| `/login` | `Login` | Visitante | Inicio de sesión con correo/contraseña o Google OAuth. |
| `/registro` | `Registro` | Visitante | Registro de nuevas cuentas. |
| `/progreso` | `Progreso` | 🔒 Privado | **CRUD completo** de sesiones de entrenamiento con persistencia en Supabase. |
| `*` | `404` | Público | Vista amigable para enlaces inexistentes. |

---

## 🔒 Seguridad y Permisos
- **Rutas Protegidas en Frontend:** `RutaProtegida.jsx` evalúa el `SesionContext` y redirige a `/login` si no hay token activo.
- **Seguridad en Backend:** Políticas de acceso por fila (**Row Level Security - RLS**) en la tabla `registros_entrenamiento`. Los usuarios solo pueden leer, modificar y borrar sus propias filas.
