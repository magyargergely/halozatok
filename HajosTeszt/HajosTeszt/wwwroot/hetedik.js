window.onload = () => {
    letöltés()
}

var kérdések;
var oldal = 0;
var jóválasz;

function letöltés() {
    fetch("/questions.json")
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés!")
    console.log(d)
    kérdések = d;

    kérdésMegjelenítés(1)
}


function kérdésMegjelenítés(k) {
    let kerdes = document.getElementById("kérdés")
    kerdes.innerText = kérdések[k].questionText;
    console.log(`${kérdések.length} kérdés érkezett`)

    document.getElementById("válasz1").innerHTML = kérdések[k].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[k].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[k].answer3;

    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image;

    jóválasz = kérdések[k].correctAnswer;
}

function előre() {
    oldal = oldal + 1;
    if (oldal == kérdések.length) {
        oldal = 0;
    }
    kérdésMegjelenítés(oldal);
}

function vissza() {
    if (oldal == 0) {
        oldal = kérdések.length - 1;
    }
    else {
        oldal = oldal - 1;
    }
    kérdésMegjelenítés(oldal);
}

function jelöltVálasz1() {
    let megjelöltválasz1 = document.getElementById("válasz1")
    if (jóválasz == 1) {
        megjelöltválasz1.classList.add("jó")
    }
    else {
        megjelöltválasz1.classList.add("rossz")
    }
}

function jelöltVálasz2() {
    let megjelöltválasz2 = document.getElementById("válasz2")
    if (jóválasz == 2) {
        megjelöltválasz2.classList.add("jó")
    }
    else {
        megjelöltválasz2.classList.add("rossz")
    }
}

function jelöltVálasz3() {
    let megjelöltválasz3 = document.getElementById("válasz3")
    if (jóválasz == 3) {
        megjelöltválasz3.classList.add("jó")
    }
    else {
        megjelöltválasz3.classList.add("rossz")
    }
}