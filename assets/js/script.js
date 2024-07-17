document.addEventListener("DOMContentLoaded", function() {
    let currentBet = 0;
    let playerHand = []
    let dealerHand = []
    let deckId = ''
    let betInput = document.getElementById('bet')

    createDeck()
})

/* This function will create a deck by making an API request using the deck of cards API.
 * Website is linked in the README.md. Also this snippet of code was from an article on how 
 * to call an API in JavaScript from FreeCodeCamp.org
 * The article is also linked in the README.md
 */
 
function createDeck() {
    let apiUrl = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response has problems')
            }
            return response.json
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log('Error creating deck', error)
        })
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
let modal = document.getElementsByClassName('modal-container')[0]
let buttonRules = document.getElementsByClassName('btn-rules')[0]

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