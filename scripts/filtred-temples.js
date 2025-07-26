const getYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

const year = new Date().getFullYear();
getYear.textContent = year;

lastModified.textContent = `Last modified: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        this.textContent = isExpanded ? '☰' : '✕';
    });
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Budapest Hungary",
        location: "Budapest, Hungary",
        dedicated: "2025, June, 21",
        area: 18000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/budapest-hungary-temple/budapest-hungary-temple-58578-main.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1871, November, 9",
        area: 143969,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
    },
    {
        templeName: "Reno Nevada",
        location: "Reno, Nevada, United States",
        dedicated: "1999, July, 24",
        area:  10700,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/reno-nevada-temple/reno-nevada-temple-5681-main.jpg"
    }
    
]

function createTempleCard(filteredTemples) {
    const container = document.querySelector(".res-grid");

    // Clear previous content before rendering new results
    container.innerHTML = "";
    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");
        let figure = document.createElement("figure");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedication:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Size:</span> ${temple.area}`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName}`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "400");
        img.setAttribute("hight", "250");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        figure.appendChild(img);
        card.appendChild(figure);
        
        document.querySelector(".res-grid").appendChild(card);
    })
}

function clearAndRender(filteredTemples) {
    createTempleCard(filteredTemples);
}

document.getElementById("home").addEventListener("click", () => {
    clearAndRender(temples);
});

document.getElementById("old").addEventListener("click", () => {
    const oldTemples = temples.filter(t => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year < 1900;
    });
    clearAndRender(oldTemples);
});

document.getElementById("new").addEventListener("click", () => {
    const newTemples = temples.filter(t => {
        const year = parseInt(t.dedicated.split(",")[0]);
        return year > 2000;
    });
    clearAndRender(newTemples);
});

document.getElementById("large").addEventListener("click", () => {
    const largeTemples = temples.filter(t => t.area > 90000);
    clearAndRender(largeTemples);
});

document.getElementById("small").addEventListener("click", () => {
    const smallTemples = temples.filter(t => t.area < 10000);
    clearAndRender(smallTemples);
});


createTempleCard(temples);