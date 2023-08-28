"use strict"
function solveEquation(a, b, c) {
  const d = Math.pow(b,2) - 4 * a * c;
  if (d < 0) {
    return [];
  } else if (d === 0) {
    return [-b / (2 * a)];
  } else {
    return [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d))/(2 * a)];
  }
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const credit = amount - contribution;
  const monthPercent = percent / 100 / 12;
  const paymentOfMonth = credit * (monthPercent + (monthPercent / (((1 + monthPercent)**countMonths) - 1)));
  return +(paymentOfMonth * countMonths).toFixed(2);
}