// Announce game setup
let setupText = document.createElement('p');
function preGameSetup() {
    document.body.appendChild(setupText);
    let time = tP("<hr>Game Setup<hr><br>", patience, setupText, 0, true);
    time = tP("It's time! Let's set up the game.<br>", patience, setupText, time, false);
    time = tP("", patience, setupText, time, false);
    // Get the number of players
    time = tPm("How many people are playing?", 50, setupText, time, false);
    setTimeout(() => {
        numberOfPlayers();
    }, time + 500);
}
// Form for number of players -- The same form is reused later in game setup
let gameSetupForm;
let NumOfPlayersInput;
let NumPlayersSubmitBtn;
function numberOfPlayers() {
    gameSetupForm = document.createElement('form');
    NumOfPlayersInput = document.createElement('input');
    NumPlayersSubmitBtn = document.createElement('input');
    gameSetupForm.addEventListener('submit', NumOfPlayersSubmit);
    NumOfPlayersInput.type = 'number';
    NumPlayersSubmitBtn.type = 'submit';
    gameSetupForm.appendChild(NumOfPlayersInput);
    gameSetupForm.appendChild(NumPlayersSubmitBtn);
    document.body.appendChild(gameSetupForm);
}
errorFlag = false;
function NumOfPlayersSubmit(e) {
    e.preventDefault();
    playerAmount = NumOfPlayersInput.valueAsNumber;
    if (playerAmount > 1 && playerAmount < 11) {
        document.body.removeChild(gameSetupForm);
        gameSetupForm.removeEventListener('submit', NumOfPlayersSubmit);
        gameSetupForm.removeChild(NumOfPlayersInput);
        gameSetupForm.removeChild(NumPlayersSubmitBtn);
        tP(`Ok, got it!`, patience, setupText, 0, true);
        setTimeout(() => {
            playerNames();
        }, patience * 2);
    } else if (!errorFlag) {
        tP(`<br><br>Please enter a number between 2 and 10!`, 0, setupText, 0, false);
        errorFlag = true;
    }
}// Game setup form is reused for player names input
let PlayerNameInput;
let currentPlayerNameIndex;
function playerNames() {
    PlayerNameInput = document.createElement('input');
    currentPlayerNameIndex = 0;
    gameSetupForm.addEventListener('submit', playerName);
    PlayerNameInput.type = 'text';
    let PlayerNameSubmitBtn = document.createElement('input');
    PlayerNameSubmitBtn.type = 'submit';
    gameSetupForm.appendChild(PlayerNameInput);
    gameSetupForm.appendChild(PlayerNameSubmitBtn);
    let time = tP("", 0, setupText, 0, true);
    time = tP(`Please enter the names of the ${playerAmount} players:`, patience, setupText, 0, true);
    setTimeout(() => {
        prePlayerName();
    }, time);
}// This repeats to get all the players' names
let playerNameText;
let lastPlayer;
function prePlayerName() {
    playerNameText = document.createElement('p');
    lastPlayer = false;
    document.body.appendChild(playerNameText);
    tP(`Player ${currentPlayerNameIndex + 1}'s name: `, patience, playerNameText, 0, true);
    setTimeout(() => {
        document.body.appendChild(gameSetupForm);
    }, patience);
    if (currentPlayerNameIndex == playerAmount - 1) {
        lastPlayer = true;
    }
}
// Fill the player stats arrays
function setStats() {
    let empty = [false];
    for (let i = 1; i < playerAmount; i++) {
        empty.push(false);
    } for (let i = 0; i < playerAmount; i++) {
        revenge.push(empty);
    }
    for (let i = 0; i < playerAmount; i++) {
        lives.push(7);
        load.push(0);
        played.push(false);
        outPlayers.push(false);
    }
}
// This also repeats--it is called on submit so it can't have parameters, but I used a lastPlayer flag to determine if the game already has all the player names. Once it's done, it calls prePlayerName to loop around and get the next player's name, as long as it isn't the last player already.
function playerName(e) {
    e.preventDefault();
    allPlayers.push(PlayerNameInput.value);
    document.body.removeChild(gameSetupForm);
    document.body.removeChild(playerNameText);
    PlayerNameInput.value = '';
    if (lastPlayer) {
        setupText.innerText = '';
        setStats();
        document.body.removeChild(setupText);
        setTimeout(() => {
            HUD();
        }, patience);
    } else {
        currentPlayerNameIndex++;
        prePlayerName();
    }
}
// Create the player stats display, or HUD(heads up display)
let HUDtable;

// This massive monstrosity of very repetitive code was all to create a table showing all the stats of the players in real time so recaps wouldn't be needed.
function HUD() {
    HUDtable = document.createElement('table');
    for (let i = 0; i < playerAmount; i++) {
        const td = document.createElement('td');
        HUDtable.appendChild(td);
        td.id = `Table${i}`;

        const playerStatsTable = document.createElement('table');
        playerStatsTable.className = `Player stats tables`;

        let headRow = document.createElement('tr');
        headRow.className = 'HeadRow';
        const playerID = document.createElement('td');
        playerID.id = `Player${i}ID`;
        playerID.innerText = `Player ${i + 1}`;
        headRow.appendChild(playerID);
        playerStatsTable.appendChild(headRow);

        let nameRow = document.createElement('th');
        nameRow.className = 'NameRow';
        const playerName = document.createElement('td');
        playerName.id = `Player${i}Name`;
        playerName.innerText = `${allPlayers[i]}`;
        nameRow.appendChild(playerName);
        playerStatsTable.appendChild(nameRow);

        let outRow = document.createElement('tr');
        outRow.className = 'OutRow';
        const playerOut = document.createElement('td');
        playerOut.id = `Player${i}Out`;
        playerOut.innerText = `Playing`;
        outRow.appendChild(playerOut);
        playerStatsTable.appendChild(outRow);

        let livesRow = document.createElement('tr');
        livesRow.className = 'LivesRow';
        const playerLives = document.createElement('td');
        playerLives.id = `Player${i}Lives`;
        playerLives.innerText = `${lives[i]} lives`;
        livesRow.appendChild(playerLives);
        playerStatsTable.appendChild(livesRow);

        let loadRow = document.createElement('tr');
        loadRow.className = 'LoadRow';
        const playerLoad = document.createElement('td');
        playerLoad.id = `Player${i}Load`;
        playerLoad.innerText = `${load[i]} Loaded BUPs`;
        loadRow.appendChild(playerLoad);
        playerStatsTable.appendChild(loadRow);

        let revengeRow = document.createElement('tr');
        revengeRow.className = 'RevengeRow';
        const playerRevenge = document.createElement('td');
        playerRevenge.id = `Player${i}Revenge`;
        playerRevenge.innerText = `No Revenge BUPs`;
        revengeRow.appendChild(playerRevenge);
        playerStatsTable.appendChild(revengeRow);

        td.appendChild(playerStatsTable);
    }
    document.body.appendChild(HUDtable);
    setTimeout(() => {
        postGameSetup();
    }, 1000);
}
let SetupConfirmInput = document.createElement('button');
let notSetupConfirmInput = document.createElement('button');
function postGameSetup() {
    players = allPlayers;
    document.body.appendChild(setupText);
    let time = tPm("Is this correct?", 50, setupText, 0);
    SetupConfirmInput.addEventListener('click', gameStart);
    notSetupConfirmInput.addEventListener('click', repeatSetup);
    SetupConfirmInput.innerText = 'Yes, start the game';
    notSetupConfirmInput.innerText = 'Nope';
    setTimeout(() => {
        document.body.appendChild(SetupConfirmInput);
        document.body.appendChild(notSetupConfirmInput);
    }, time + 1000);
}
function repeatSetup() {
    document.body.removeChild(SetupConfirmInput);
    document.body.removeChild(notSetupConfirmInput);
    setupText.innerText = '';
    tP("Oops! Let's set up the game again.", patience, setupText, 0, true);
    allPlayers = [];
    players = [];
    lives = [];
    load = [];
    revenge = [];
    gameSetupForm = null;
    document.body.removeChild(HUDtable);
    HUDtable = null;
    setTimeout(() => {
        document.body.removeChild(setupText);
        preGameSetup();
    }, patience);
}