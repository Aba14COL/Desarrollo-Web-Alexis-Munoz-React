
export const rutinas = [
  {
    id: 1,
    nombre: "Caminata activa + movilidad",
    descripcion: "Caminata de 20 minutos con ejercicios de movilidad articular para activar el cuerpo de forma segura.",
    duracion: "25 min",
    intensidad: "baja",
    categoriaIMC: "bajo_peso"
  },
  {
    id: 2,
    nombre: "Fuerza con peso corporal (básico)",
    descripcion: "Sentadillas asistidas, flexiones en pared y plancha de 15 segundos. Ideal para ganar masa muscular.",
    duracion: "30 min",
    intensidad: "baja",
    categoriaIMC: "bajo_peso"
  },
  {
    id: 3,
    nombre: "Yoga para flexibilidad",
    descripcion: "Secuencia de posturas enfocadas en flexibilidad, equilibrio y respiración consciente.",
    duracion: "35 min",
    intensidad: "baja",
    categoriaIMC: "bajo_peso"
  },
  {
    id: 4,
    nombre: "Entrenamiento funcional completo",
    descripcion: "Circuito de sentadillas, zancadas, flexiones y plancha. Mantén tu condición física óptima.",
    duracion: "40 min",
    intensidad: "media",
    categoriaIMC: "normal"
  },
  {
    id: 5,
    nombre: "Cardio + fuerza combinado",
    descripcion: "Intervalos de trote, burpees suaves y ejercicios con banda elástica para un entrenamiento equilibrado.",
    duracion: "45 min",
    intensidad: "media",
    categoriaIMC: "normal"
  },
  {
    id: 6,
    nombre: "Core y estabilidad",
    descripcion: "Plancha frontal, plancha lateral, bicicleta abdominal y puente de glúteos. Fortalece tu centro.",
    duracion: "30 min",
    intensidad: "media",
    categoriaIMC: "normal"
  },
  {
    id: 7,
    nombre: "Cardio de bajo impacto",
    descripcion: "Caminata rápida, elíptica o bicicleta estática a ritmo moderado para quemar calorías sin sobrecargar articulaciones.",
    duracion: "40 min",
    intensidad: "media",
    categoriaIMC: "sobrepeso"
  },
  {
    id: 8,
    nombre: "Circuito quema-grasa",
    descripcion: "Sentadillas, escaladores, jumping jacks y descansos activos. Diseñado para acelerar el metabolismo.",
    duracion: "35 min",
    intensidad: "media-alta",
    categoriaIMC: "sobrepeso"
  },
  {
    id: 9,
    nombre: "Fuerza con peso corporal (intermedio)",
    descripcion: "Flexiones completas, sentadillas búlgaras y remo invertido. Aumenta tu masa muscular para mejorar el metabolismo basal.",
    duracion: "40 min",
    intensidad: "media",
    categoriaIMC: "sobrepeso"
  },
  {
    id: 10,
    nombre: "Caminata guiada progresiva",
    descripcion: "Caminata de 30 minutos con incrementos graduales de velocidad. Segura y efectiva para iniciar.",
    duracion: "30 min",
    intensidad: "baja",
    categoriaIMC: "obesidad"
  },
  {
    id: 11,
    nombre: "Movilidad articular + estiramientos",
    descripcion: "Ejercicios suaves para mejorar el rango de movimiento en rodillas, cadera y espalda.",
    duracion: "25 min",
    intensidad: "baja",
    categoriaIMC: "obesidad"
  },
  {
    id: 12,
    nombre: "Ejercicios en silla",
    descripcion: "Elevaciones de rodilla, extensiones de pierna y giros de torso sentado. Sin impacto en las articulaciones.",
    duracion: "20 min",
    intensidad: "baja",
    categoriaIMC: "obesidad"
  }
];

/**
 * Determina la categoría de IMC a partir del valor numérico.
 * Retorna un texto que coincide con la propiedad categoriaIMC de cada rutina.
 */
export function obtenerCategoriaIMC(imc) {
  if (imc < 18.5) {
    return "bajo_peso";
  } else if (imc < 25) {
    return "normal";
  } else if (imc < 30) {
    return "sobrepeso";
  } else {
    return "obesidad";
  }
}

/**
 * Filtra las rutinas que corresponden a una categoría de IMC.
 * Devuelve un arreglo con las coincidencias o [] si no hay ninguna.
 */
export function filtrarRutinasPorIMC(imc) {
  const categoria = obtenerCategoriaIMC(imc);
  const resultados = rutinas.filter(function (rutina) {
    return rutina.categoriaIMC === categoria;
  });
  return resultados;
}

/**
 * Busca una rutina por su id.
 * Devuelve el objeto encontrado o undefined si no existe.
 */
export function buscarRutinaPorId(id) {
  const encontrada = rutinas.find(function (rutina) {
    return rutina.id === id;
  });
  return encontrada;
}


/**
 * Registros de progreso de ejemplo.
 * Cada objeto representa una sesión de entrenamiento completada.
 */
export const registrosProgreso = [
  {
    id: 1,
    rutina: "Entrenamiento funcional completo",
    fecha: "2026-11-02",
    duracionReal: "38 min",
    estado: "completada",
    nota: "Me sentí con mucha energía, aumenté repeticiones en sentadillas."
  },
  {
    id: 2,
    rutina: "Cardio + fuerza combinado",
    fecha: "2026-11-01",
    duracionReal: "42 min",
    estado: "completada",
    nota: "Buen ritmo cardíaco, los burpees siguen siendo un reto."
  },
  {
    id: 3,
    rutina: "Core y estabilidad",
    fecha: "2026-10-30",
    duracionReal: "25 min",
    estado: "parcial",
    nota: "Solo completé 3 de 4 series por falta de tiempo."
  }
];
