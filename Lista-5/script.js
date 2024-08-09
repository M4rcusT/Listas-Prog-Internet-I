document.addEventListener("DOMContentLoaded", function() {
    const btnFill = document.getElementById("btnFill");
    btnFill.addEventListener("click", () => {
        let paragraph = document.getElementById("text1");
        paragraph.textContent = 'Marcus Túlio Souto Rocha';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnSw1 = document.getElementById("btnSw1");
    btnSw1.addEventListener("click", () => {
        let paragraph2 = document.getElementById("text3");
        let paragraph1 = document.getElementById("text2");

        let text1 = paragraph1.textContent;
        let text2 = paragraph2.textContent;

        paragraph1.textContent = text2;
        paragraph2.textContent = text1;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnSw2 = document.getElementById("btnSw2");
    btnSw2.addEventListener("click", () => {
        let imagem = document.getElementById("imagem");
        let srcValue = imagem.getAttribute('src');
        if (srcValue === 'https://www.w3schools.com/js/pic_bulboff.gif') {
            imagem.setAttribute("src", 'https://www.w3schools.com/js/pic_bulbon.gif');
        } else {
            imagem.setAttribute("src", 'https://www.w3schools.com/js/pic_bulboff.gif');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const nthC = document.getElementById("nthC");
    nthC.addEventListener("click", () => {
        const rows = document.querySelectorAll("tr:nth-child(even)");
        rows.forEach(row => {
            row.classList.toggle("white-background");
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnSw3 = document.getElementById("btnSw3");
    btnSw3.addEventListener("click", () => {
        let inputValue = document.getElementById("textSw").value;
        let paragraph2 = document.getElementById("text4");
        console.log(inputValue); 

        paragraph2.textContent = inputValue;
        console.log(paragraph2); 
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const txtColor = document.getElementById("txtColor");
    txtColor.addEventListener("change", () => {
        const text4 = document.getElementById("text4");
        text4.style.color = txtColor.value;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnColor = document.getElementById("btnColor");
    btnColor.addEventListener("click", () => {
        const title = document.getElementById("title");
        const p1 = document.getElementById("p1");
        const p2 = document.getElementById("p2");
        const p3 = document.getElementById("p3");

        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        const randomColor = `rgb(${red}, ${green}, ${blue})`;
        title.style.color = randomColor;
        p1.style.color = randomColor;
        p2.style.color = randomColor;
        p3.style.color = randomColor;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const names = ["José", "Matheus", "Renata", "Katarina", "Lucas", "Pedro"];
    const addBtn = document.getElementById("add");
    const delBtn = document.getElementById("del");
    const table2 = document.getElementById("table2");

    addBtn.addEventListener("click", () => {
        const newRow = table2.insertRow(-1);

        const name = names[Math.floor(Math.random() * names.length)];
        const number = Math.floor(Math.random() * 10);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.textContent = name; 
        cell2.textContent = number; 
    });

    delBtn.addEventListener("click", () => {
        if (table2.rows.length > 1) {
            table2.deleteRow(-1); 
        }
    });
});
