const currentYear = document.getElementById("currentYear");
const lastModified = document.getElementById("lastModified");

const year = new Date().getFullYear();

currentYear.textContent = year;
lastModified.textContent = `Last modified: ${document.lastModified}`