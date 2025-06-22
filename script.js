// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // preveniamo invio diretto

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("Grazie! Ti ricontatterò a breve.");
        form.reset();
      } else {
        alert("Errore durante l'invio. Riprova o contattami via email.");
        form.scrollIntoView({ behavior: 'smooth' });
      }
    })
    .catch(() => {
      alert("Errore di rete. Controlla la connessione.");
    });
  });
});
