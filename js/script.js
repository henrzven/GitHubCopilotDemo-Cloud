// GitHub Copilot Dev Days - UCV Caracas
// Script de la landing page (contiene bugs intencionales para la demo)

document.addEventListener("DOMContentLoaded", () => {
  startCountdown();
  setupRegisterForm();
});

function startCountdown() {
  // BUG: en JavaScript los meses van de 0 (enero) a 11 (diciembre).
  // El mes 10 corresponde a NOVIEMBRE, no a octubre, por lo que la cuenta
  // regresiva apunta a la fecha equivocada (debería ser 9 para octubre).
  const eventDate = new Date(2026, 10, 2, 9, 0, 0);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function update() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

function setupRegisterForm() {
  const form = document.getElementById("register-form");
  const message = document.getElementById("form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!isValidEmail(email) || name === "") {
      message.textContent = "Por favor completa el formulario con un correo válido.";
      message.style.color = "#cf222e";
      return;
    }

    message.textContent = `¡Gracias por registrarte, ${name}! Te esperamos el 2 de octubre.`;
    message.style.color = "#238636";
    form.reset();
  });
}

function isValidEmail(email) {
  // BUG: esta expresión regular no valida un correo real, solo revisa que
  // exista al menos un carácter antes y después de una arroba, por lo que
  // acepta direcciones inválidas como "a@b".
  const regex = /^.+@.+$/;
  return regex.test(email);
}
