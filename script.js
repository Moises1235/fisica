// Get canvas and context
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = 400;

// Default parameters
let amplitude = 100;
let frequency = 1;
let speed = 2;
let wavelength = 300;
let time = 0;

// Input controls
const amplitudeSlider = document.getElementById('amplitude');
const frequencySlider = document.getElementById('frequency');
const wavelengthSlider = document.getElementById('wavelength');
const speedSlider = document.getElementById('speed');

// Update function based on slider changes
amplitudeSlider.addEventListener('input', (e) => {
    amplitude = parseFloat(e.target.value);
});
frequencySlider.addEventListener('input', (e) => {
    frequency = parseFloat(e.target.value);
    // Atualizar o comprimento de onda conforme a frequência
    wavelength = canvas.width / frequency;
    wavelengthSlider.value = wavelength;
});
wavelengthSlider.addEventListener('input', (e) => {
    wavelength = parseFloat(e.target.value);
    // Atualizar a frequência baseada no comprimento de onda
    frequency = canvas.width / wavelength;
    frequencySlider.value = frequency;
});
speedSlider.addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
});

// Function to draw waves
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
    // Campo elétrico (linha vermelha)
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + amplitude * Math.sin((2 * Math.PI * x) / wavelength - speed * time);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Campo magnético (linha azul)
    ctx.strokeStyle = '#0000FF';
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + amplitude * Math.cos((2 * Math.PI * x) / wavelength - speed * time);
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Atualizar tempo para animação
    time += 0.05;
}

// Animation loop
function animate() {
    drawWave();
    requestAnimationFrame(animate);
}

// Start animation
animate();
