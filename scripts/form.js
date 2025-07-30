// Footer year & last modified
const getYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

const year = new Date().getFullYear();
getYear.textContent = year;

lastModified.textContent = `Last modified: ${document.lastModified}`;

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

 window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("product");
  products.forEach((product) => {
    const option = document.createElement("option");
    option.id = product.id;
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
 });

 // Increase review count in localStorage
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("review.html")) {
    let count = Number(localStorage.getItem("reviewCount")) || 0;
    count += 1;
    localStorage.setItem("reviewCount", count);
    const countSpan = document.getElementById("count");
    if (countSpan) countSpan.textContent = count;
  }
});