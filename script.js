// Huidig jaar in de footer
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// Algemene prijsberekening
function berekenPrijs(afstandKm, isRetour) {
    const afstand = parseFloat(afstandKm);
    if (isNaN(afstand) || afstand <= 0) {
        return null;
    }

    let enkelPrijs;
    if (afstand <= 25) {
        enkelPrijs = afstand * 2.0;
    } else {
        const eersteDeel = 25 * 2.0;
        const resterend = afstand - 25;
        enkelPrijs = eersteDeel + resterend * 1.6;
    }

    let totaal = enkelPrijs;
    if (isRetour) {
        totaal = enkelPrijs * 2;
    }

    // Afronden op 2 decimalen
    totaal = Math.round(totaal * 100) / 100;
    return totaal;
}

// Hero calculator
const heroBtn = document.getElementById("hero-calc-btn");
if (heroBtn) {
    heroBtn.addEventListener("click", () => {
        const distanceInput = document.getElementById("hero-distance");
        const retourCheckbox = document.getElementById("hero-retour");
        const resultEl = document.getElementById("hero-result");

        const afstand = distanceInput.value;
        const isRetour = retourCheckbox.checked;

        const prijs = berekenPrijs(afstand, isRetour);

        if (!prijs) {
            resultEl.textContent = "Voer een geldige afstand in (in kilometers).";
            resultEl.style.color = "#fee2e2";
            return;
        }

        resultEl.style.color = "#facc15";
        resultEl.textContent = `Indicatieve ritprijs: € ${prijs.toFixed(2).replace('.', ',')} (${isRetour ? "retour" : "enkele rit"}).`;
    });
}

// Boekingformulier calculator + mailto
const calcBtn = document.getElementById("calc-btn");
const bookingForm = document.getElementById("booking-form");

if (calcBtn) {
    calcBtn.addEventListener("click", () => {
        const afstandEl = document.getElementById("afstand");
        const rittypeEl = document.getElementById("rittype");
        const resultEl = document.getElementById("calc-result");

        const afstand = afstandEl.value;
        const isRetour = rittypeEl.value === "retour";

        const prijs = berekenPrijs(afstand, isRetour);

        if (!prijs) {
            resultEl.textContent = "Voer een geldige afstand in (in kilometers).";
            resultEl.style.color = "#b91c1c";
            return;
        }

        resultEl.style.color = "#065f46";
        resultEl.textContent = `Indicatieve ritprijs: € ${prijs.toFixed(2).replace('.', ',')} (${isRetour ? "retour" : "enkele rit"}). De definitieve vaste prijs ontvangt u in de bevestiging.`;
    });
}

// Formulier versturen via mailto (werkt op GitHub Pages zonder backend)
if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const naam = document.getElementById("naam").value.trim();
        const telefoon = document.getElementById("telefoon").value.trim();
        const email = document.getElementById("email").value.trim();
        const datum = document.getElementById("datum").value;
        const tijd = document.getElementById("tijd").value;
        const opstap = document.getElementById("opstap").value.trim();
        const bestemming = document.getElementById("bestemming").value.trim();
        const afstand = document.getElementById("afstand").value;
        const rittype = document.getElementById("rittype").value;
        const opmerking = document.getElementById("opmerking").value.trim();

        const isRetour = rittype === "retour";
        const prijs = berekenPrijs(afstand, isRetour);

        // Bouw de e-mail
        const ontvanger = "info@jouwzorgtaxi.nl"; // <-- HIER je eigen e-mailadres invullen
        const onderwerp = encodeURIComponent("Nieuwe zorgtaxi boekingsaanvraag");
        let body = `Nieuwe boekingsaanvraag zorgvervoer:%0D%0A%0D%0A`;
        body += `Naam: ${naam}%0D%0A`;
        body += `Telefoon: ${telefoon}%0D%0A`;
        body += `E-mail: ${email || "-"}%0D%0A`;
        body += `Datum rit: ${datum}%0D%0A`;
        body += `Tijd rit: ${tijd}%0D%0A%0D%0A`;
        body += `Opstapadres: ${opstap}%0D%0A`;
        body += `Bestemmingsadres: ${bestemming}%0D%0A`;
        body += `Geschatte afstand: ${afstand} km%0D%0A`;
        body += `Rittype: ${rittype}%0D%0A`;

        if (prijs) {
            body += `%0D%0AIndicatieve prijs volgens tarief: € ${prijs.toFixed(2).replace('.', ',')}`;
        }

        body += `%0D%0A%0D%0AOpmerkingen / bijzonderheden:%0D%0A${opmerking || "-"}`;

        const mailtoLink = `mailto:${ontvanger}?subject=${onderwerp}&body=${body}`;

        window.location.href = mailtoLink;
    });
}
