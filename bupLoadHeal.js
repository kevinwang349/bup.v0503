// Define the BUP function and BUP sequence
let bupText;
let bupForm;
let bupInput;
let bupSubmitBtn;
let buppingPlayer = -1;
let errorText;
function bup() {
    document.body.removeChild(loaderBtn);
    document.body.removeChild(bupBtn);
    document.body.removeChild(healBtn);
    bupText = document.createElement('p');
    buppingPlayer = currentTurn;
    document.body.appendChild(bupText);
    let time = tPm("Who would you like to BUP?", 50, bupText, 0, true);
    time = tP("<br>Please input your target's Player #:<br>", patience, bupText, time, false);
    bupForm = document.createElement('form');
    bupInput = document.createElement('input');
    bupSubmitBtn = document.createElement('input');
    bupForm.addEventListener('submit', chooseTarget);
    bupInput.type = 'number';
    bupSubmitBtn.type = 'submit';
    bupForm.appendChild(bupInput);
    bupForm.appendChild(bupSubmitBtn);
    setTimeout(() => {
        document.body.appendChild(bupForm);
        errorText = document.createElement('p')
        document.body.appendChild(errorText);
    }, time + patience);
}
errorFlag = false;
let errorFlag2 = false;
let errorFlag3 = false;
let target = 0;
function chooseTarget(e) {
    e.preventDefault();
    target = bupInput.valueAsNumber;
    target--;
    if (target === buppingPlayer) {
        if (!errorFlag2) {
            tP(`<br>Why are you trying to BUP yourself? Please try again.`, patience, errorText, 0, true);
        }
        errorFlag2 = true;
        errorFlag = false;
        errorFlag3 = false;
    } else if (lives[target] < 1) {
        if (!errorFlag3) {
            tP(`<br>${allPlayers[target]} is already dead. Please try again.`, patience, errorText, 0, true);
        }
        errorFlag3 = true;
        errorFlag = false;
        errorFlag2 = false;
    } else if (target > -1 && target < playerAmount) {
        bupText.innerText = '';
        document.body.removeChild(errorText);
        document.body.removeChild(bupForm);
        bupForm.removeChild(bupInput);
        bupForm.removeChild(bupSubmitBtn);
        setTimeout(() => {
            chooseBup();
        }, patience);
    } else if (!errorFlag) {
        tP(`<br>Sorry, that Player # is invalid. Please try again.`, patience, errorText, 0, true);
        errorFlag = true;
        errorFlag2 = false;
        errorFlag3 = false;
    }
}
let loadBtn;
let bupBtn;
let successful;
function chooseBup() {
    // Makes sure to reset the successful flag with every new BUP
    successful = true;
    loadBtn = document.createElement('button');
    bupBtn = document.createElement('button');
    if (revenge[buppingPlayer][target]) {
        revengeBup();
    } else if (load[buppingPlayer] > 0) {
        bupText.innerText = '';
        let time = tPm("Would you like to use a Loaded BUP or a regular BUP?", 50, bupText, 0);
        loadBtn.addEventListener('click', loadedBup);
        bupBtn.addEventListener('click', regularBup);
        loadBtn.innerText = 'Loaded BUP';
        bupBtn.innerText = 'Regular BUP';
        setTimeout(() => {
            document.body.appendChild(loadBtn);
            document.body.appendChild(bupBtn);
        }, time + patience);
    } else {
        regularBup();
    }
}
function revengeBup() {
    if (Math.floor(Math.random() * 4) === 3) {
        successful = false;
    }
    let time = tP("", 3, bupText, 0, true);
    time = tPm(" B U P ! ", 100, bupText, time);
    time = tP(`<br>You revengefully(?) struck ${players[target]} with a Revenge BUP!<br>`, patience, bupText, time, false);
    setTimeout(() => {
        FIRE();
    }, time + 3000);
}
function loadedBup() {
    document.body.removeChild(loadBtn);
    document.body.removeChild(bupBtn);
    load[buppingPlayer]--;
    let targetLoad = document.getElementById(`Player${buppingPlayer}Load`);
    targetLoad.innerText = `${load[buppingPlayer]} Loaded BUPs`;
    let time = tP("", 3, bupText, 0, true);
    time = tPm("BUP!", 100, bupText, time);
    time = tP(`<br>You unleashed a Loaded BUP on ${players[target]}!<br>`, patience, bupText, time, false);
    setTimeout(() => {
        FIRE();
    }, time + 3000);
}
function regularBup() {
    if (Math.floor(Math.random() * 2) === 1) {
        successful = false;
    }
    if (load[buppingPlayer] > 0) {
        document.body.removeChild(loadBtn);
        document.body.removeChild(bupBtn);
    }
    let time = tP("", 3, bupText, 0, true);
    time = tPm("BUP!", 100, bupText, time);
    time = tP(`<br>You attempted to BUP ${players[target]}.<br>`, patience, bupText, time, false);
    setTimeout(() => {
        FIRE();
    }, time + 3000);
}
function FIRE() {
    let time = 0;
    if (successful) {
        time = tPm("Your BUP was successful!", 100, bupText, 0);
        time = tP(`<br>${players[target]} lost 3 lives.`, patience, bupText, time, false);
        lives[target] = lives[target] - 3;
        let targetLives = document.getElementById(`Player${target}Lives`);
        if (lives[target] === 1) {
            targetLives.innerText = `1 life`;
        } else {
            targetLives.innerText = `${lives[target]} lives`;
        }
        let targetName = document.getElementById(`Player${target}ID`);
        targetName.innerText = `OOF!`;
        setTimeout(() => {
            targetName.innerText = `Player ${target + 1}`;
        }, 3000);
    } else {
        time = tP("Unfortunately, your BUP was not successful.", 100, bupText, 0);
        time = tP(`<br>Better luck next time!`, patience, bupText, time, false);
        let targetName = document.getElementById(`Player${target}ID`);
        targetName.innerText = `MISS!`;
        setTimeout(() => {
            targetName.innerText = `Player ${target + 1}`;
        }, 5000);
    }
    let empty = [];
    for (let i = 0; i < playerAmount; i++) {
        empty.push(false);
    } revenge[buppingPlayer] = empty;
    let buppingRevenge = document.getElementById(`Player${buppingPlayer}Revenge`);
    buppingRevenge.innerText = `No Revenge BUPs`;

    if (lives[target] < 1) {
        outPlayers[target] = true;
        revenge[target] = empty;
        revenge[0][target] = false;
        let targetOut = document.getElementById(`Player${target}Out`);
        targetOut.innerText = `Killed by ${players[buppingPlayer]}`;
        let targetRevenge = document.getElementById(`Player${target}Revenge`);
        targetRevenge.innerText = ``;
        targetRevenge = document.getElementById(`Player${target}Load`);
        targetRevenge.innerText = ``;
        time = tP(`<br>好球! You killed ${allPlayers[target]}.`, patience, bupText, time, false);
        players[target] = '';
        playersRemaining--;
    } else {
        if (!revenge[target][buppingPlayer]) {
            let targetRevenge = document.getElementById(`Player${target}Revenge`);
            if (revenge[target].includes(true)) {
                targetRevenge.innerHTML += `<br>Can Revenge BUP ${players[buppingPlayer]}`;
            } else {
                targetRevenge.innerText = `Can Revenge BUP ${players[buppingPlayer]}`;
            }
        }
        empty = [];
        for (let i = 0; i < playerAmount; i++) {
            empty[i] = revenge[target][i];
        }
        empty[buppingPlayer] = true;
        revenge[target] = empty;
    }
    setTimeout(() => {
        document.body.removeChild(bupText);
        turnEnd();
    }, time + patience);
}

let loadHealText;
function heal() {
    document.body.removeChild(loaderBtn);
    document.body.removeChild(bupBtn);
    document.body.removeChild(healBtn);
    loadHealText = document.createElement('p');
    document.body.appendChild(loadHealText);
    let time = tP("", 0, loadHealText, 0, true);
    if (Math.floor(Math.random() * 4) != 0) {
        time = tP("You successfully regained 2 lives!", patience, loadHealText, 0, true);
        lives[currentTurn] = lives[currentTurn] + 2;
        let Lives = document.getElementById(`Player${currentTurn}Lives`);
        setTimeout(() => {
            Lives.innerText = `${lives[currentTurn]} lives`;
        }, patience);
    } else {
        time = tP("Unfortunately, you unsuccessfully attempted to heal yourself.", patience, loadHealText, 0, true);
        time = tP("<br>Better luck next time!", patience, loadHealText, time, false);
    }
    setTimeout(() => {
        document.body.removeChild(loadHealText);
        turnEnd();
    }, time + patience);
}
function loadBup() {
    document.body.removeChild(loaderBtn);
    document.body.removeChild(bupBtn);
    document.body.removeChild(healBtn);
    loadHealText = document.createElement('p');
    document.body.appendChild(loadHealText);
    let time = tP("", 0, loadHealText, 0, true);
    if (Math.floor(Math.random() * 4) != 0) {
        time = tP("You successfully loaded a BUP!<br>", patience, loadHealText, 0, true);
        time = tP("Get ready to unleash your Loaded BUP(s) next round :D", patience, loadHealText, time, false);
        load[currentTurn]++;
        let Load = document.getElementById(`Player${currentTurn}Load`);
        setTimeout(() => {
            Load.innerText = `${load[currentTurn]} Loaded BUP(s)`;
        }, patience);
    } else {
        time = tP("Unfortunately, you unsuccessfully tried to load a BUP.", patience, loadHealText, 0, true);
        time = tP("<br>Better luck next time!", patience, loadHealText, time, false);
    }
    setTimeout(() => {
        document.body.removeChild(loadHealText);
        turnEnd();
    }, time + patience);
}