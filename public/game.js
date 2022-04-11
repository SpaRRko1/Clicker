const mainButton = document.getElementById('mainButton');
const nicknameSave = document.getElementById('gameSaveButton');
const restartButton = document.getElementById('gameControlAgain');
var actualScore = 0;

nicknameSave.addEventListener('click', function () {
    var nickname = document.getElementById('nickname').value;
    localStorage.setItem('nickname', nickname);
    loginProcessCheck()
})


//Login process
function loginProcessCheck() {
    var nickname = localStorage.getItem('nickname');

    if (localStorage.getItem('nickname') !== null) {
        document.getElementById('gameContainer').style.display = 'block';
        document.getElementById('gamePanel').style.display = 'block';
        document.getElementById('gameControlPanel').style.display = 'flex';
        document.getElementById('gameLoginScreen').style.display = 'none';
    };
    //TopText
    document.getElementById('gameTextTop').textContent = nickname;
}



//Počítadlo skóre
mainButton.addEventListener('click', function () {
    actualScore++;
    updateScore(); //updates scoreline
})

function updateScore() {
    document.getElementById('score').textContent = actualScore;
}

mainButton.addEventListener("click", function () {
    setTimeout(function timeCounter() {
        document.getElementById('mainButton').disabled = true;
        init();
    }, 10000) //Ovládání času hry

}, {
    once: true
});

//restart počítadla
restartButton.addEventListener('click', function () {
    location.reload();
})
//Počítatdlo skóre end

//Database 
function init() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    var score = Number(document.getElementById('score').textContent);
    var nickname = localStorage.getItem('nickname', nickname);
    var listRecords = database.ref('Výsledky');
    var addRecord = listRecords.push();
    addRecord.set({
        score: score,
        nickname: nickname
    });
    var scoresRef = database.ref("Výsledky");
    scoresRef.orderByChild('score').limitToLast(4).on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            document.getElementById('gameLeaderboard').innerHTML = (data.val().nickname) + '<br />' + (data.val().score) + '<br />';
        });
    });
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
    loginProcessCheck();
})