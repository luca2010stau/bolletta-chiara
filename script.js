document.addEventListener("DOMContentLoaded", () => {
  // === 1. INVIO FORM AJAX ===
  const form = document.querySelector("form");
  const feedback = document.querySelector(".form-feedback");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      fetch("/", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            feedback.textContent = "Grazie! Ti ricontatterò a breve.";
            feedback.classList.add("show");
            setTimeout(() => feedback.classList.remove("show"), 4000);
          } else {
            feedback.textContent = "Errore durante l'invio. Riprova o contattami via email.";
            feedback.classList.add("show");
          }
        })
        .catch(() => {
          feedback.textContent = "Errore di rete. Controlla la connessione.";
          feedback.classList.add("show");
        });
    });
  }

  // === 2. TOGGLE TEMA CHIARO/SCURO ===
  const themeToggle = document.querySelector(".theme-toggle");
  const isDark = localStorage.getItem("theme") === "dark";

  if (isDark) document.body.classList.add("dark-mode");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkNow = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    });
  }

  // === 3. FAQ DINAMICHE ===
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // === 4. SIMULATORE RISPARMIO ===
  const consumoInput = document.querySelector("#consumo");
  const prezzoAttualeInput = document.querySelector("#prezzo-attuale");
  const prezzoNuovoInput = document.querySelector("#prezzo-nuovo");
  const risultatoBox = document.querySelector(".risultato");

  function calcolaRisparmio() {
    const consumo = parseFloat(consumoInput?.value || 0);
    const prezzoAttuale = parseFloat(prezzoAttualeInput?.value || 0);
    const prezzoNuovo = parseFloat(prezzoNuovoInput?.value || 0);

    if (consumo > 0 && prezzoAttuale > 0 && prezzoNuovo > 0) {
      const risparmio = (prezzoAttuale - prezzoNuovo) * consumo;
      risultatoBox.textContent = `Risparmieresti circa €${risparmio.toFixed(2)} al mese.`;
    } else {
      risultatoBox.textContent = "Inserisci tutti i valori per calcolare il risparmio.";
    }
  }

  [consumoInput, prezzoAttualeInput, prezzoNuovoInput].forEach(input => {
    input?.addEventListener("input", calcolaRisparmio);
  });

  // === 5. SCROLL ANIMATIONS (FADE-UP CLASS SUPPORT) ===
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  sections.forEach(section => observer.observe(section));
});
