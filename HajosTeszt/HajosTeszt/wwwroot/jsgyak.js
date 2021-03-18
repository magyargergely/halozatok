window.onload = () => {
    console.log("betöltődött")

    let sorszam = document.getElementById("1feladat");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("elem");
        sorszam.appendChild(sor);
        sor.innerText = s;
        sor.style.background = `rgb(${250/s}, 50, 50)`
    }
   
    var faktoriális = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriális(n - 1)
        }
    }

    let hszog = document.getElementById("pascal");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hszog.appendChild(sor);
        for (var o = 0; o <= s; o++) {
            let szám = document.createElement("div");

            szám.classList.add("elem");
            sor.appendChild(szám);
            szám.innerText = faktoriális(s) / (faktoriális(o) * faktoriális(s - o));
        }
    }
}