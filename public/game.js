const tlacitko = document.getElementById('tlacitko');
const nextTry = document.getElementById('nextTry');
const resetHighScore = document.getElementById('resetHighscore');
var skoreCounter = 0;
var highestScore = localStorage.getItem('bestRecord');
const tlacitkoSave = document.getElementById('saveName');
var nicknameSaved = localStorage.getItem('nickname');
const formular = document.getElementById('formular');


    tlacitkoSave.addEventListener('click', function(){
        var nickname = document.getElementById('name').value;
        localStorage.setItem('nickname', nickname);

    });
    if (nicknameSaved !== null) {
        formular.style.visibility = "hidden";
        console.log("Má vyplněné jméno")
    }
    else {
        console.log("Nemá jméno")
    }


tlacitko.addEventListener('click', function () {
    skoreCounter++;
    updateSkore();
    return
});


setTimeout(function () {
    init();
    document.getElementById('tlacitko').disabled = true;
    if (skoreCounter > highestScore) {
        localStorage.setItem('bestRecord', skoreCounter);
    };
}, 10000);


function updateSkore() {
    if (skoreCounter === 0) {
        document.getElementById('skore').textContent = "--";
    } else {
        document.getElementById('skore').textContent = skoreCounter;
    }
}

//LAST RECORD
setInterval(function () {
    document.getElementById('lastSkore').textContent = localStorage.getItem('bestRecord');
}, 10)



//zkusit znovu
nextTry.addEventListener('click', function () {
    window.location.reload();
})

//reset Highscore
resetHighScore.addEventListener('click', function () {
    localStorage.removeItem('bestRecord');
})

function init(){
   // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
     database = firebase.database();

     var nickname = document.getElementById('name').value;
     var listRecords = database.ref('Výsledky');
     var addRecord = listRecords.push();
     addRecord.set({
         highestscore: highestScore,
         nickname: nickname
     });

//Přenahrátí celé DB
//      database.ref('Výsledky/').set({
//      nickname: "jmeno",
//      score: "120"
//    });
}

var database = {};
const firebaseConfig = {
    apiKey: "AIzaSyATPSa9G96bQiXSLgsXp9gt8OClr1rHYCM",
    authDomain: "clicker-f81b0.firebaseapp.com",
    databaseURL: "https://clicker-f81b0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "clicker-f81b0",
    storageBucket: "clicker-f81b0.appspot.com",
    messagingSenderId: "611494009746",
    appId: "1:611494009746:web:24146a935ff6a13b707f4b",
    measurementId: "G-YHMVCPKT55"
  };

document.addEventListener("DOMContentLoaded", function () {
    updateSkore();
});