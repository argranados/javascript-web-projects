const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log(randomNum);

// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)

window.SpechRecognition = 
window.SpechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpechRecognition();
recognition.lang = 'en-US'; // Set language

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    console.log(e);
    const msg = e.results[0][0].transcript;
    
    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">20</span>        
    `;
}

// Check msg against number
function checkNumber(msg) {
    const num = +msg;

    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML = '<div>Number musr be between 1 and 100</div>';
        return;
    }

    // Check number
    if (num === randomNum) {
      document.body.innerHTML = `
         <h2>Congrats! You have guessed the number! <br><br>
         It was ${num}</h2>
         <button class="play-again" id="play-again">Play Again</button>
    `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }

}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
});

 // Handle the result event
//  recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     outputDiv.textContent = `You said: ${transcript}`;
// };