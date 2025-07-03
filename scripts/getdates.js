const getYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified")

const year = new Date().getFullYear();
getYear.textContent = year;

lastModified.textContent = `Last modifed ${document.lastModified}`


