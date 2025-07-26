let aCourse = {
    code: "WDD131",
    title: "Dynamic Web Fundamentals",
    credits: 2,
    sections: [
        {
            sectionNumber: "001",
            enrolled: 95,
            instructor: "Roberto Diaz Rodriguez"
        },
        {
            sectionNumber: "002",
            enrolled: 80,
            instructor: "Sarah Gobble"
        }
    ]
};

function setCourseInformation(course) {
    document.getElementById("courseName").innerHTML = `${course.code} - ${course.title}`;
}

function sectionTemplate(section) {
    return `<tr>
    <td>${section.sectionNumber}</td>
    <td>${section.enrolled}</td>
    <td>${section.instructor}</td>
    </tr>`
}

function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    console.log(html)
    document.querySelector("#sections tbody").innerHTML = html.join("")
}



setCourseInformation(aCourse);
renderSections(aCourse.sections);


let esomeprazole = { 'id': 'mnb78932', 'amount': 23145, 'amountType': 'ct', 'expDate': '10/01/2021' };

// const dose = esomeprazole.amount

let dose = esomeprazole['amount'];

// const dose = amount

// const dose1 = esomeprazole[0].amount[1];

let dose2 = esomeprazole.amount;

console.log(dose2);
console.log(dose);