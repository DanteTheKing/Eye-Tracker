const pupil = document.getElementById("pupil");
const eye = document.querySelector(".eye");

// 1. Cursor Tracking
document.body.addEventListener("mousemove", (e) => {
  const eyeball = document.querySelector(".eyeball");
  const rect = eyeball.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const dist = Math.min(Math.sqrt(x * x + y * y), 30);
  const angle = Math.atan2(y, x);

  const newX = Math.cos(angle) * dist;
  const newY = Math.sin(angle) * dist;

  pupil.style.left = `${40 + newX}px`;
  pupil.style.top = `${40 + newY}px`;
});

// 2. Eye Color Generator
const colors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00", "#00f"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
eye.style.boxShadow = `0 0 30px ${randomColor}`;

// 3. Advanced Blink Styles
const blinkStyles = [
  () => eye.style.transform = "scaleY(0.1)", // fast blink
  () => eye.style.transform = "scaleY(0.4)", // squint
  () => eye.style.transform = "scaleY(0.01)" // intense blink
];

function blink() {
  const blink = blinkStyles[Math.floor(Math.random() * blinkStyles.length)];
  blink();
  setTimeout(() => {
    eye.style.transform = "scaleY(1)";
  }, 150);
}

setInterval(blink, Math.random() * 3000 + 3000);

// 4. Light/Dark Detection & Pupil Reaction
function getAverageBrightness() {
  // Simulate brightness detection using time of day
  const hour = new Date().getHours();
  return hour > 6 && hour < 18 ? "bright" : "dark";
}

function updatePupilBasedOnBrightness() {
  const brightness = getAverageBrightness();
  if (brightness === "bright") {
    pupil.style.width = "15px";
    pupil.style.height = "15px";
    pupil.style.backgroundColor = "#222";
  } else {
    pupil.style.width = "35px";
    pupil.style.height = "35px";
    pupil.style.backgroundColor = "#000";
  }
}

setInterval(updatePupilBasedOnBrightness, 3000);
updatePupilBasedOnBrightness(); // Initial call
