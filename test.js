function calculateEasterSunday(year) {
  // Calcul des dates mobiles basées sur la date de Pâques.
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

function calculateFrenchHolidays(year) {
  const easterSunday = calculateEasterSunday(year);
  const easterMonday = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 1);
  const ascension = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 39);
  const pentecostMonday = new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 50);

  return [
    new Date(year, 0, 1),  // Jour de l'An
    easterMonday,  // Lundi de Pâques
    new Date(year, 4, 1),  // Fête du Travail
    new Date(year, 4, 8),  // Victoire des Alliés
    ascension,  // Ascension
    pentecostMonday,  // Lundi de Pentecôte
    new Date(year, 6, 14),  // Fête Nationale
    new Date(year, 7, 15),  // Assomption
    new Date(year, 10, 1),  // Toussaint
    new Date(year, 10, 11),  // Armistice
    new Date(year, 11, 25),  // Noël
  ].map(date => date.toISOString().slice(0, 10));  // Convertit les dates en chaînes de caractères au format AAAA-MM-JJ
}

function updateDates() {
  // ... autres parties de la fonction ...

  // Récupère la valeur de la case à cocher "Exclure les jours fériés"
  const excludeHolidays = document.getElementById('excludeHolidays').checked;

  // Si la case à cocher "Exclure les jours fériés" est cochée, supprime les jours fériés de la liste des dates
  if (excludeHolidays) {
    const holidays = calculateFrenchHolidays(startDate.getFullYear());
    dateList = dateList.filter(date => !holidays.includes(date));
  }
