// Lista de planetas (igual que en Arduino)
const planetas = [
  'mercurio', 'venus', 'tierra', 'luna', 'marte',
  'jupiter', 'saturno', 'urano', 'neptuno'
];

let indiceActual = 0;
let audioReproduciendo = false;

const imagenPlaneta = document.getElementById('imagen-planeta');
const nombrePlaneta = document.getElementById('nombre-planeta');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const audioPlayer = document.getElementById('audioPlayer');

// Mostrar planeta actual
function mostrarPlaneta() {
  const planeta = planetas[indiceActual];
  imagenPlaneta.src = `imagenes/${planeta}.png`;
  nombrePlaneta.textContent = planeta.charAt(0).toUpperCase() + planeta.slice(1);
  // Al cambiar de planeta, detener cualquier audio y quitar efecto visual
  if (audioReproduciendo) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioReproduciendo = false;
    imagenPlaneta.classList.remove('planeta-activo-efecto');
  }
}

// Navegación (solo cambia imagen, no reproduce audio)
btnAnterior.addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + planetas.length) % planetas.length;
  mostrarPlaneta();
});

btnSiguiente.addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % planetas.length;
  mostrarPlaneta();
});

// Teclado: solo navegación
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    btnAnterior.click();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    btnSiguiente.click();
  }
});

// INTERACCIÓN PRINCIPAL: clic en la imagen
imagenPlaneta.addEventListener('click', () => {
  if (audioReproduciendo) {
    // Detener audio
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioReproduciendo = false;
    imagenPlaneta.classList.remove('planeta-activo-efecto');
  } else {
    // Reproducir nuevo audio
    const planeta = planetas[indiceActual];
    const num = Math.floor(Math.random() * 5) + 1;
    const ruta = `audios/${planeta}${num}.mp3`;

    audioPlayer.src = ruta;
    audioPlayer.load();
    audioPlayer.play()
      .then(() => {
        audioReproduciendo = true;
        imagenPlaneta.classList.add('planeta-activo-efecto');
      })
      .catch(e => {
        console.warn("Audio no disponible:", ruta);
        audioReproduciendo = false;
      });

    // Si el audio termina solo, quitar efecto
    audioPlayer.onended = () => {
      audioReproduciendo = false;
      imagenPlaneta.classList.remove('planeta-activo-efecto');
    };
  }
});

// Iniciar
mostrarPlaneta();