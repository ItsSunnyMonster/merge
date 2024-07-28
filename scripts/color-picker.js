const select = document.querySelector("#color");

let theme = window.localStorage.getItem("theme");

if (theme != null) {
  select.value = theme;

  let html = document.querySelector("html");

  html.className = "";
  html.classList.add(`theme-${select.value}`);
}

select.addEventListener('change', () => {
  let html = document.querySelector("html");

  html.className = "";

  html.classList.add(`theme-${select.value}`)

  window.localStorage.setItem("theme", select.value)
})