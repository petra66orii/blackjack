document.addEventListener("DOMContentLoaded", function() {
    let currentBet = 0;
    let playerHand = []
    let dealerHand = []
    let deck = []
    let betInput = document.getElementById('bet')
})

function createDeck() {

}

function shuffleDeck() {

}

function startGame() {

}

function deal() {
    
}

function hitMe() {

}

function stay() {

}

// This section of code opens and closes the modal containing the game rules - credits to W3Schools
// Get the modal and the button
let modal = document.getElementsByClassName('modal-container')
let buttonRules = document.getElementsByClassName('btn-rules')

// Get the span that closes the modal
let closeX = document.getElementsByClassName('close-x')[0]

// Function that opens the modal
function openModal() {
    modal.style.display = 'block'
}

// Function that closes the modal
function closeModal() {
    modal.style.display = 'none'
}

// Also, function that closes the modal when you click outside the modal as well
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}