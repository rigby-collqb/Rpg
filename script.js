document.getElementById("start-btn").addEventListener("click", () => {
  const title = document.getElementById("title");
  const msg = document.getElementById("message");
  
  title.textContent = "Mentira...";
  document.body.style.backgroundColor = "#111";
  msg.textContent = "Você não deveria estar aqui.";
  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.textContent = "Eles estão vindo.";
  }, 3000);

  setTimeout(() => {
    window.location.href = "/game";
  }, 6000);
});