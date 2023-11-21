function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}: any): string {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

document.querySelector("html")?.setAttribute("data-theme", currentThemeSetting);

const button = document.querySelector(".toggle");

button?.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html")?.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});
