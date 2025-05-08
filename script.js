function applyPreferences(prefs) {
  // Changing the iheme
  document.body.classList.remove("dark-mode", "light-mode");
  document.body.classList.add(prefs.theme);

  // Font size
  document.body.classList.remove("font-small", "font-medium", "font-large");
  document.body.classList.add(prefs.fontSize);

  // Animate scale
  document.body.classList.add("scale-up");
  setTimeout(() => document.body.classList.remove("scale-up"), 400);

  // Language Selection
  const greeting = document.getElementById("greeting");
  greeting.textContent =
    prefs.language === "fr"
      ? "Bonjour! je parle français"
      : "Hello Dear! I speak English";
}

function getStoredPreferences() {
  return {
    theme: localStorage.getItem("theme") || "light-mode",
    fontSize: localStorage.getItem("fontSize") || "font-medium",
    language: localStorage.getItem("language") || "en",
  };
}

function storePreferences(prefs) {
  localStorage.setItem("theme", prefs.theme);
  localStorage.setItem("fontSize", prefs.fontSize);
  localStorage.setItem("language", prefs.language);
}

function toggleTheme(prefs) {
  prefs.theme = prefs.theme === "dark-mode" ? "light-mode" : "dark-mode";
  applyPreferences(prefs);
  storePreferences(prefs);
}

// Color Changing Box Logic
const colors = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f1c40f",
  "#9b59b6",
  "#1abc9c",
];
let colorIndex = 0;
function rotateColors() {
  const box = document.getElementById("rotatingBox");
  box.style.backgroundColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const preferences = getStoredPreferences();
  applyPreferences(preferences);

  document.getElementById("toggleThemeBtn").addEventListener("click", () => {
    toggleTheme(preferences);
  });

  document.getElementById("fontSize").addEventListener("change", (e) => {
    preferences.fontSize = e.target.value;
    applyPreferences(preferences);
    storePreferences(preferences);
  });

  document.getElementById("languageSelect").addEventListener("change", (e) => {
    preferences.language = e.target.value;
    applyPreferences(preferences);
    storePreferences(preferences);
  });

  // Start rotating colors every second
  rotateColors();
  setInterval(rotateColors, 1000);
});
