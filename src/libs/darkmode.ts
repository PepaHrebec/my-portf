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

const button: HTMLButtonElement = document.querySelector(".toggle")!;

const pres = document.querySelectorAll("pre");

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
  button,
});

button.innerText = localStorageTheme === "dark" ? "Světlý" : "Temný";
document.querySelector("html")?.setAttribute("data-theme", currentThemeSetting);

button?.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  button.innerText = newTheme === "dark" ? "Světlý" : "Temný";
  document.querySelector("html")?.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});
