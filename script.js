// Jaar in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Eenvoudige prijsindicatie
const distanceInput = document.getElementById('calc-distance');
const retourCheckbox = document.getElementById('calc-retour');
const calcBtn = document.getElementById('calc-btn');
const calcResult = document.getElementById('calc-result');

function calculatePrice() {
  if (!distanceInput || !calcResult) return;
  const d = parseFloat(distanceInput.value.replace(',', '.'));
  if (isNaN(d) || d <= 0) {
    calcResult.textContent = 'Vul een geldige afstand in.';
    return;
  }

  let distance = d;
  if (retourCheckbox && retourCheckbox.checked) {
    distance = d * 2;
  }

  let pricePerKm = 2.0;
  if (distance > 25) pricePerKm = 1.6;
  if (distance >= 75) pricePerKm = 1.35;

  const indicatie = distance * pricePerKm;
  calcResult.textContent = `Richtprijs: ongeveer € ${indicatie.toFixed(2).replace('.', ',')} (op basis van ${distance.toFixed(1).replace('.', ',')} km).`;
}

if (calcBtn) {
  calcBtn.addEventListener('click', calculatePrice);
}

// WhatsApp / e-mail bericht genereren
const prefillBtn = document.getElementById('prefill-whatsapp');
const whatsappLink = document.getElementById('whatsapp-link');

function buildMessage() {
  const naam = document.getElementById('naam')?.value || '';
  const tel = document.getElementById('telefoon')?.value || '';
  const datum = document.getElementById('datum')?.value || '';
  const tijd = document.getElementById('tijd')?.value || '';
  const van = document.getElementById('van')?.value || '';
  const naar = document.getElementById('naar')?.value || '';
  const afstand = document.getElementById('afstand-form')?.value || '';
  const rittype = document.getElementById('rittype')?.value || '';
  const opm = document.getElementById('opmerking')?.value || '';

  let msg = 'Aanvraag zorgvervoer via Taxicare:%0A%0A';
  if (naam) msg += `Naam: ${naam}%0A`;
  if (tel) msg += `Telefoon: ${tel}%0A`;
  if (datum) msg += `Datum rit: ${datum}%0A`;
  if (tijd) msg += `Tijd rit: ${tijd}%0A`;
  if (van) msg += `Opstapadres: ${van}%0A`;
  if (naar) msg += `Bestemming: ${naar}%0A`;
  if (afstand) msg += `Geschatte afstand: ${afstand} km%0A`;
  if (rittype) msg += `Rittype: ${rittype}%0A`;
  if (opm) msg += `%0ABijzonderheden:%0A${opm}%0A`;

  msg += '%0AAlvast bedankt.';

  return msg;
}

if (prefillBtn && whatsappLink) {
  prefillBtn.addEventListener('click', () => {
    const msg = buildMessage();
    // NL nummer zonder 0
    const phone = '31684675840';
    const url = `https://wa.me/${phone}?text=${msg}`;
    whatsappLink.href = url;
    alert('Klik nu op "Open WhatsApp met bericht" om het bericht te versturen.');
  });
}
