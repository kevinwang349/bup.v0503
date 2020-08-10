document.addEventListener('DOMContentLoaded', init);
// Time controls
let patience = 3000;
let roundFinished = true;

// Player statistics arrays
// For each array: Initialize the array's type, then turn it into empty array
let allPlayers = [""];
allPlayers = [];
let outPlayers = [false];
outPlayers = [];
let players = [""];
players = [];
let lives = [0];
lives = [];
let load = [0];
load = [];
let revenge = [outPlayers];
revenge = [];
let played = [false];
played = [];

// Reusable "ok" button
let okBtn = document.createElement('button');
okBtn.innerText = 'Ok';

// Reuseable error flag
let errorFlag = false;

// Number of players
let playerAmount = 0;

function init() {
    // Pretend to load the game
    // Calling Load() starts the entire game sequence
    Load();
}

// This function takes an element [el], usually a text element, and adds the string [s] to the element character by character with a specified delay in milliseconds [p]. It converts the string into an array and then iterates or loops over each character in the array before adding each character to the element. The last parameter, [time], is used to time everything so that it happens in order and at the right time.
function tPm(s, p, el, time) {
    let sArr = s.split("");
    for (const element of sArr) {
        setTimeout(() => {
            el.innerHTML += element;
        }, p + time)
        time += p;
    } return time;
}

// This function is like tPm, and uses the same four parameters as its first four parameters. But it deals with the entire string at once, rather than splitting it into characters. The [add] parameter, a boolean, is used to determine whether the new string [s] will replace the eisting text in element [el], or be added to the existing text in el.
function tP(s, p, el, time, add) {
    setTimeout(() => {
        if (add) {
            el.innerHTML = s;
        } else {
            el.innerHTML += s;
        }
    }, p + time)
    time += p;
    return time;
}

// Brainstorm some pro tips to give to the user(s). 
let tips = ["Use the healing action generously! It can get you out of a 'situation'. "];
tips.push("Don't be afraid to BUP! Take the chance and you just might reap the reward! ");
tips.push("Be patient, load your BUPs, and it could pay off - quite spectacularly! ");
tips.push("Strategically load your BUPs for an extra dose of guaranteed power!");
tips.push("Take your revenge when you can! Punish other Players for attacking you! ");
tips.push("Don't code games in Python! You'll just have to translate them into better languages like Java afterward.");

// Start the game!
let startH1;
let roundH2;
let gameText;
let roundNum = 1;
let playersRemaining = 0;
function gameStart() {
    playersRemaining = playerAmount;
    document.body.removeChild(SetupConfirmInput);
    document.body.removeChild(notSetupConfirmInput);
    document.body.removeChild(setupText);
    startH1 = document.createElement('h1');
    document.body.appendChild(startH1);
    roundH2 = document.createElement('h2');
    document.body.appendChild(roundH2);
    gameText = document.createElement('p');
    document.body.appendChild(gameText);
    let time = tP("", 0, startH1, 0, true);
    time = tP("<hr>Game Start<hr>", 3000, startH1, time, true);
    // Some loops are omitted; the nature of how I'm programming this means that because there are separate functions calling each other, the entire sequence forms a loop.
    setTimeout(() => {
        startRound();
    }, time);
    setTimeout(() => {
        document.body.removeChild(startH1);
    }, time + patience * 2);
}

function startRound() {
    let time = tP(`<hr>Round ${roundNum} Start!<hr>`, 2000, roundH2, 0, true);
    time = tP(`<hr>`, patience, roundH2, time, true);
    roundNum++;
    for (let i = 0; i < playerAmount; i++) {
        played[i] = false;
    }
    if (playersRemaining === 1) {
        let winner = outPlayers.indexOf(false);
        document.body.removeChild(gameText);
        document.body.removeChild(roundH2);
        gameEnd(winner);
        return;
    } else {
        // This starts the turn sequence
        setTimeout(() => {
            turn();
        }, time);
    }
}

let currentTurn = 0;
let loaderBtn;
let healBtn;
function turn() {
    if (played.includes(false)) {
        currentTurn = Math.floor(Math.random() * playerAmount);
        if (outPlayers[currentTurn] || played[currentTurn]) {
            played[currentTurn] = true;
            turn();
            return;
        } else if (!played[currentTurn]) {
            played[currentTurn] = true;
            let time = tP(`It's ${players[currentTurn]}'s turn!`, patience, gameText, 0, true);
            bupBtn = document.createElement('button');
            bupBtn.addEventListener('click', bup);
            bupBtn.innerText = 'BUP';
            healBtn = document.createElement('button');
            healBtn.addEventListener('click', heal);
            healBtn.innerText = 'Heal';
            loaderBtn = document.createElement('button');
            loaderBtn.addEventListener('click', loadBup);
            loaderBtn.innerText = 'Load';
            time = tP("<br>What would you like to do?", patience, gameText, time, false);
            setTimeout(() => {
                document.body.appendChild(loaderBtn);
                document.body.appendChild(bupBtn);
                document.body.appendChild(healBtn);
            }, patience * 2);
        }
    } else {
        // Start the next round
        startRound();
        return;
    }
}
function turnEnd() {
    let time = tP(`<br>${players[currentTurn]}, your turn is over.`, patience, gameText, 0, true);
    time = tP(`<br>Wish you luck for the next round!`, patience, gameText, time, false);
    time = tP(`<hr>`, patience, gameText, time, false);
    time = tP(`Pro tip: `, patience, gameText, time, false);
    const tip = Math.floor(Math.random() * 6);
    time = tP(`${tips[tip]}`, patience, gameText, time, false);
    time = tP(``, patience, gameText, time, true);
    setTimeout(() => {
        turn();
    }, time);
}
let endText = document.createElement('p');
let replay = document.createElement('button');
let notReplay = document.createElement('button');
function gameEnd(winIndex) {
    const winner = allPlayers[winIndex];
    document.body.appendChild(endText);
    let time = tP("<hr>Game End<hr>", 3000, startH1, 0, true);
    time = tPm(`Thank you for playing BUP!`, 50, endText, time, true);
    time = tP(`<br>The winner of this game of BUP! is...`, patience, endText, time, false);
    time = tP(`<br>drumroll please...`, patience, endText, time, false);
    time = tP(`<br><b>${winner}!</b>`, patience, endText, time, false);
    time = tP(`<br>Congratulations, ${winner}! `, patience, endText, time, false);
    time = tP(`You've earned the title of the current <b>BIG BUP</b>.`, patience, endText, time, false);
    time = tP(`<br>Ladies and mentlegen,`, patience, endText, time, false);
    time = tP(`<br>I present to you,`, patience, endText, time, false);
    time = tP(`<br>the reigning <b>BIG BUP</b>...<br>`, patience, endText, time, false);
    time = tP(`<br><b>${winner}!</b><br>`, patience, endText, time, false);
    time = tP(`<br>Once again, thamks for playing and we hope to see you soon!`, patience, endText, time, false);
    time = tP(`<br>Would you like to play again?`, patience, endText, time, false);
    replay.addEventListener('click', reee);
    replay.innerText = 'Replay';
    notReplay.addEventListener('click', end);
    notReplay.innerText = 'No thanks';
    setTimeout(() => {
        document.body.appendChild(replay);
        document.body.appendChild(notReplay);
    }, time + patience);
}
function reee() {
    location.reload();
}
function end() {
    document.body.removeChild(replay);
    document.body.removeChild(notReplay);
    tP(`Sorry to see you go. Goodbye, hope you had fun, and see you next time!`, patience, endText, 0, true)
    setTimeout(() => {
        document.removeChild(body);
    }, patience * 2);
}