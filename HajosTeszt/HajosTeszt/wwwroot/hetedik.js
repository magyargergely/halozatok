window.onload = () => {
    kérdésBetöltés()
}

var kérdések;
var jóválasz;
var oldal=1;


function kérdésBetöltés(id = oldal) {
   fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}

function kérdésMegjelenítés(k) {

    console.log(k)
    let kerdes = document.getElementById("kérdés")
    kerdes.innerText = k.questionText;

    document.getElementById("válasz1").innerHTML = k.answer1;
    document.getElementById("válasz2").innerHTML = k.answer2;
    document.getElementById("válasz3").innerHTML = k.answer3;

    if (k.image == "") {
        document.getElementById("kép").style.visibility = 'hidden';
    }
    else {
        document.getElementById("kép").style.visibility = 'visible';
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + k.image;
    }
    
    jóválasz = k.correctAnswer;
}

function előre() {

    oldal = oldal + 1;

    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");

    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");

    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");

    kérdésBetöltés();
}

function vissza() {
    oldal = oldal - 1;

    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");

    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");

    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");

    kérdésBetöltés();
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
