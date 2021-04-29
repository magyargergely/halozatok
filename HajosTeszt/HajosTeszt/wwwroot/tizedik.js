window.onload = () => {
    init()
}

var kérdések;
var jóválasz;
var oldal = 1;

var hotList = [];
var questionsInHotList = 3;

var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

var timeoutHandler;

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`)
                }
                else {
                    return result.json()
                }
            })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );

}

function kérdésMegjelenítés() {

    let k = hotList[displayedQuestion].question;
    console.log(k);
    document.getElementById("kérdés").innerText = k.questionText;

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

    clearTimeout(timeoutHandler)

    document.getElementById(`válasz1`).style.pointerEvents = "auto"
    document.getElementById(`válasz2`).style.pointerEvents = "auto"
    document.getElementById(`válasz3`).style.pointerEvents = "auto"

    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");

    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");

    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");

    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;

    kérdésMegjelenítés();
}

function vissza() {

    document.getElementById(`válasz1`).style.pointerEvents = "auto"
    document.getElementById(`válasz2`).style.pointerEvents = "auto"
    document.getElementById(`válasz3`).style.pointerEvents = "auto"

    displayedQuestion--;
    if (displayedQuestion == 0) displayedQuestion = questionsInHotList - 1;

    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");

    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");

    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");

    kérdésMegjelenítés();
}

function jelöltVálasz1() {
    let megjelöltválasz1 = document.getElementById("válasz1")
    if (jóválasz == 1) {
        megjelöltválasz1.classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
    }
    else {
        megjelöltválasz1.classList.add("rossz")
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById(`válasz1`).style.pointerEvents = "none"
    document.getElementById(`válasz2`).style.pointerEvents = "none"
    document.getElementById(`válasz3`).style.pointerEvents = "none"

    if (hotList[displayedQuestion].goodAnswers == 3) {
        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
    }

    timeoutHandler = setTimeout(előre, 3000);
}

function jelöltVálasz2() {
    let megjelöltválasz2 = document.getElementById("válasz2")
    if (jóválasz == 2) {
        megjelöltválasz2.classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
    }
    else {
        megjelöltválasz2.classList.add("rossz");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById(`válasz1`).style.pointerEvents = "none"
    document.getElementById(`válasz2`).style.pointerEvents = "none"
    document.getElementById(`válasz3`).style.pointerEvents = "none"

    if (hotList[displayedQuestion].goodAnswers == 3) {
        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
    }

    timeoutHandler = setTimeout(előre, 3000);
}

function jelöltVálasz3() {
    let megjelöltválasz3 = document.getElementById("válasz3")
    if (jóválasz == 3) {
        megjelöltválasz3.classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
    }
    else {
        megjelöltválasz3.classList.add("rossz");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById(`válasz1`).style.pointerEvents = "none"
    document.getElementById(`válasz2`).style.pointerEvents = "none"
    document.getElementById(`válasz3`).style.pointerEvents = "none"

    if (hotList[displayedQuestion].goodAnswers == 3) {
        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
    }

    timeoutHandler = setTimeout(előre, 3000);
}

