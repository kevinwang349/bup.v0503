// Pretend loading function
let loading = document.createElement('p');
let patienceControl = document.createElement('button');
let notPatienceControl = document.createElement('button');
function Load() {
    document.body.appendChild(loading);
    let time = tPm("Loading", 50, loading, 0);
    time = tPm("....", 1000, loading, time);
    time = tP("Done.", 1000, loading, time, true);
    patienceControl.addEventListener("click", PatienceControls);
    patienceControl.innerText = 'Yes';
    notPatienceControl.addEventListener("click", notPatienceControls);
    notPatienceControl.innerText = 'No';
    time = tP("", 2000, loading, time, true);

    // Open patience controls if needed
    time = tPm("Do you wish to open the patience controls?", 50, loading, time);
    time = tP("<br>By default, the patience level is set to 3 seconds, but you can change it using the patience controls.", 500, loading, time, false);
    setTimeout(() => {
        document.body.appendChild(patienceControl);
        document.body.appendChild(notPatienceControl);
    }, time + 1000)
}

// Patience controls
let patienceControlForm = document.createElement('form');
patienceControlForm.addEventListener('submit', PatienceSubmit);
let PatienceControlInput = document.createElement('input');
function PatienceControls() {
    document.body.removeChild(patienceControl);
    document.body.removeChild(notPatienceControl);
    let time = tP("How many seconds pause in between each line of text? (How much patience do you have?)", 0, loading, 0, true);
    time = tP("<br>This feature was created by popular demand and the need for it from the beta testing pains of the creator themselves.", 500, loading, time, false);
    time = tP("<br>If it's your first time here, 3 or 4 seconds is recommended to approach the game slowly, but if you're impatient, try 2.", 500, loading, time, false);
    time = tP("<br>If you've played before and just want slightly faster gameplay, anywhere from 1 to 2 should be okay for you.", 500, loading, time, false);
    time = tP("<br>Be really careful with fast times though, because sometimes when text is updated it replaces the old text, so you won't be able to to read it afterward.", 500, loading, time, false);
    time = tP("<br>Please note that some texts have a fixed time and this feature won't make them faster.<br>", 500, loading, time, false);
    time = tPm("Input your decision in seconds (1 to 10) below:", 50, loading, time, false);
    PatienceControlInput.type = 'number';
    let PatienceControlSubmitBtn = document.createElement('input');
    PatienceControlSubmitBtn.type = 'submit';
    patienceControlForm.appendChild(PatienceControlInput);
    patienceControlForm.appendChild(PatienceControlSubmitBtn);
    setTimeout(() => {
        document.body.appendChild(patienceControlForm);
    }, time);
} errorFlag = false;
function PatienceSubmit(e) {
    e.preventDefault();
    patience = PatienceControlInput.valueAsNumber;
    if (patience > 0 && patience < 11) {
        document.body.removeChild(patienceControlForm);
        if (patience === 1) {
            tP(`Your patience level is ${patience} second.`, 0, loading, 0, true);
        } else {
            tP(`Your patience level is ${patience} seconds.`, 0, loading, 0, true);
        } setTimeout(() => {
            document.body.removeChild(loading);
            patience *= 1000;
            Intro();
        }, patience * 1000);
    } else if (!errorFlag) {
        tP(`<br>Please choose a number between 1 and 10!`, 0, loading, 0, false);
        errorFlag = true;
    }
}

// Called if user decides not to use patience controls
function notPatienceControls() {
    tP(`Your patience level is ${patience} seconds.`, 0, loading, 0, true);
    setTimeout(() => {
        document.body.removeChild(patienceControl);
        document.body.removeChild(notPatienceControl);
        document.body.removeChild(loading);
        Intro();
    }, patience);
}

// Output the game intro
function Intro() {
    let BupText = document.createElement('h1');
    let introText = document.createElement('h2');
    document.body.appendChild(BupText);
    document.body.appendChild(introText);
    let time = tP("<hr>BUP! (BETA V0.5)<hr>", 2000, BupText, 0);
    time = tP("Based on Bup V0.4.2.1", 2000, introText, time, true);
    time = tP("a multiplayer game by Cafeepy", 2000, introText, time, true);
    time = tP("Translated to JavaScript by Kevin W", 2000, introText, time, true);
    time = tP("Welcome to BUP! (beta), a multiplayer game of chance and skill ", 2000, introText, time, true);
    time = tP("where you and your friends can battle it out to the max ", patience, introText, time, false);
    time = tP("to be the last one standing and be crowned the BIG BUP!", patience, introText, time, false);
    setTimeout(() => {
        document.body.removeChild(BupText);
        document.body.removeChild(introText);
        TutorialPicker();
    }, time + patience);
}

// Give developer's notes and tutorial if requested
let tutorText = document.createElement('p');
let devNotesBtn = document.createElement('button');
let tutorBtn = document.createElement('button');
function TutorialPicker() {
    tP("Would you like a gameplay tutorial or the developer's notes?", 1000, tutorText, 0, false);
    document.body.appendChild(tutorText);
    devNotesBtn.addEventListener("click", devNotes);
    devNotesBtn.innerText = 'Developer notes';
    tutorBtn.addEventListener("click", Tutorial);
    tutorBtn.innerText = 'Show Tutorial';
    okBtn.addEventListener('click', postTutorial);
    okBtn.innerText = 'Skip Tutorial';
    setTimeout(() => {
        document.body.appendChild(devNotesBtn);
        document.body.appendChild(tutorBtn);
        document.body.appendChild(okBtn);
    }, 1000);
}
// Developer's notes
function devNotes() {
    document.body.removeChild(devNotesBtn);
    document.body.removeChild(tutorBtn);
    document.body.removeChild(okBtn);
    okBtn.removeEventListener('click', postTutorial);
    okBtn.addEventListener('click', preTutorial);
    okBtn.innerText = 'Ok';
    let time = tP("", 0, tutorText, 0, true);
    time = tP("Developer Cafeepy's note: as of V0.4.1, the game actually works! Here's what's next:<br>", 1000, tutorText, time, true);
    time = tP("This is still a beta game. Make the game at least somewhat fun before advancing it further...<br>", 500, tutorText, time, false);
    time = tP("Version 0.4.2.1 fixes minor bugs from 0.4.2 and adds stuff from few suggestions from my wonderful beta testers! This is not a major feature update.<br>", 500, tutorText, time, false);
    time = tP("Work on smoothening the dialogue and gameplay, as well as learning to add some visuals, images, and graphics for Python.<br>", 500, tutorText, time, false);
    time = tP("Fine-tune the hit rates and probabilities to make the game fair and fun. Maybe some balance changes on Revenge/Loaded? They're pretty overpowered...<br>", 500, tutorText, time, false);
    time = tP("A lot of troubleshooting has already been implemented, but I'll keep trying to add more.<br>", 500, tutorText, time, false);
    time = tP("Maybe create an exportable scorecard or prize?<br>", 500, tutorText, time, false);
    time = tP(`Kevin's comments: This game was originally created by Cafeepy using Python.<br>`, 500, tutorText, time, false);
    time = tP("I took the Python game and created this JavaScript version, giving it a better user interface and replacing text-based decisions with buttons.<br>", 500, tutorText, time, false);
    time = tP("I also made several other changes and improvements, including adding a basic replay function and nerfing Revenge BUPs so that they only work during the target's next BUP, rather than being kept until the target wishes to use it.<br>", 500, tutorText, time, false);
    time = tP("Version 0.5 should work, but I'm going to make it look better in Version 0.5.1.", 500, tutorText, time, false);
    time = tP("During the next few versions I'll adjust hit rates and other game mechanics and add other features...perhaps an Easter egg or two?<br>", 500, tutorText, time, false);
    setTimeout(() => {
        document.body.appendChild(okBtn);
    }, time + 1000);
}
// Tutorial
function Tutorial() {
    document.body.removeChild(devNotesBtn);
    document.body.removeChild(tutorBtn);
    document.body.removeChild(okBtn);
    okBtn.removeEventListener('click', postTutorial);
    okBtn.addEventListener('click', preTutorial);
    okBtn.innerText = 'Ok';
    let time = tP("", 0, tutorText, 0, true);
    time = tP("<hr>Tutorial Start<hr>", 1000, tutorText, time, false);
    time = tP("<br>Okay, let's learn how to play BUP!<br>", patience, tutorText, time, false);
    time = tP("BUP! is a 2 to 10 player game, so gather your friends. (Technically, there is no limit to the number of players, but we (the developers) recommend 2 to 10.)<br>", patience, tutorText, time, false);
    time = tP("The game starts with Round One. Each round, ", patience, tutorText, time, false);
    time = tP("the order of the players' turns will be generated randomly.<br>", patience, tutorText, time, false);
    time = tP("On your turn, you can choose to BUP, load, or heal.<br>", patience, tutorText, time, false);
    time = tP("A successful heal will restore 2 of your lives. Your turn will end.<br>", patience, tutorText, time, false);
    time = tP("You can heal yourself beyond your initial 7 lives.<br>", patience, tutorText, time, false);
    time = tP("If you choose to BUP, you will be choosing to attack someone.<br>", patience, tutorText, time, false);
    time = tP("You will have a 50% chance of a successful BUP.<br>", patience, tutorText, time, false);
    time = tP("If your BUP is successful, your target will lose 3 lives.<br>", patience, tutorText, time, false);
    time = tP("Because of your attempt at attacking your target, ", patience, tutorText, time, false);
    time = tP("regardless if your BUP is successful or not, ", patience, tutorText, time, false);
    time = tP("your target can choose to Revenge BUP you later on.<br>", patience, tutorText, time, false);
    time = tP("A player can only Revenge BUP during their first BUP after they were attacked.<br>", patience, tutorText, time, false);
    time = tP("This means that if you choose to load or heal, your Revenge BUP will be kept, ", patience, tutorText, time, false);
    time = tP("but if you BUP a different player, all your Revenge BUPs will be lost.<br>", patience, tutorText, time, false);
    time = tP("You can also choose to load a BUP.<br>", patience, tutorText, time, false);
    time = tP("If a BUP is a Revenge BUP, it will be given a 75% success rate.<br>", patience, tutorText, time, false);
    time = tP("If a BUP is a Loaded BUP, it will ALWAYS land on its target!<br>", patience, tutorText, time, false);
    time = tP("For both actions of healing and loading, you have a 75% success rate.<br>", patience, tutorText, time, false);
    time = tP("When you lose all your lives, you are out of the game.<br>", patience, tutorText, time, false);
    time = tP("BUP the other Players until they lose all their lives!<br>", patience, tutorText, time, false);
    time = tP("Be the last Player standing and win the game!", patience, tutorText, time, false);
    time = tP("<hr>Tutorial End<hr>", patience, tutorText, time, false);
    setTimeout(() => {
        document.body.appendChild(okBtn);
    }, time + 1000);
}
// Reset the tutorial for another run-through if needed
function preTutorial() {
    okBtn.removeEventListener('click', preTutorial);
    document.body.removeChild(okBtn);
    tutorText.innerHTML = '';
    TutorialPicker();
}
// End the tutorial
function postTutorial() {
    okBtn.removeEventListener('click', postTutorial);
    document.body.removeChild(okBtn);
    document.body.removeChild(devNotesBtn);
    document.body.removeChild(tutorBtn);
    tP("", 0, tutorText, 0, true);
    tP("All right!<br>", patience, tutorText, 0, true);
    tP("Let the games begin!", patience, tutorText, patience, false);
    setTimeout(() => {
        document.body.removeChild(tutorText);
        preGameSetup();
    }, patience * 3);
}