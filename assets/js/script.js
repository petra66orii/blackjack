let playerHand = []
let dealerHand = []
let deckId = ''

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('bet').value = ''
    document.getElementById('bet').focus()

    document.getElementById('bet').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            updateBet()
        }
    })

    createDeck();
})

function updateBet() {
    let betInput = document.getElementById('bet')
    let maxInput = document.getElementById('max-amount')
    let betAmount = document.getElementById('bet-amount')

    // We'll get the bet input value and the max amount value
    let betValue = parseInt(betInput.value)
    let maxValue = parseInt(maxInput.textContent)

    // Validate the bet value to make sure 0 and/or negative numbers can't be entered
    if (isNaN(betValue) || betValue <= 0) {
        alert('Please enter a valid bet amount.')
        return
    }

    // Validate the bet as well to ensure you can't bet more than the actual money you've available
    if (betValue > maxValue) {
        alert('You can\'t bet what you don\'t have.')
        return
    }

    // Update the current bet display
    betAmount.innerText = betValue

    // Update the available amount as well
    maxInput.innerText = maxValue - betValue

    // Lock the bet so it can't be changed
    betInput.disabled = true
    let betButton = document.getElementById('place-bet')
    betButton.disabled = true

    deal()
}

/* This function will create a deck by making an API request using the deck of cards API.
 * Website is linked in the README.md. Also this snippet of code was from an article on how 
 * to call an API in JavaScript from FreeCodeCamp.org
 * The article is also linked in the README.md
 */
function createDeck() {
    // Define the API URL
    let newDeck = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
    // Make a GET request - if the response doesn't work, it throws an error; if it does work, it will
    // parse the data using the response.json() method
    fetch(newDeck)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response has problems')
            }
            return response.json()
        })
        // Finally, the data is logged to the console, or else logs an error
        .then(data => {
            deckId = data.deck_id;
            console.log(`Deck ID: ${deckId}`)
        })
        .catch(error => {
            console.log('Error creating deck', error)
        })
}

/* This function will draw two cards for both the player and the dealer (PC) by making an API
 * request using the same API from above. Credits are in the README.md
 */
async function drawDeck() {
    let drawCard = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    try {
        const response = await fetch(drawCard)
        if (!response.ok) {
            throw new Error('Network response has problems')
        }
        const data = await response.json()
        console.log('Drawn card data:', data)
        return data.cards[0]
    } catch (error) {
        console.log('Error drawing card', error)
    }
}

/**
 * This function takes the information from card objects and displays the cards on the website. 
 * @param {card information} card 
 * @param {player area or dealer area} classArea 
 */
function displayCard(card, classArea) {

    const container = document.querySelector(classArea)
    const cardImg = document.createElement('img')
    cardImg.src = card.image
    cardImg.alt = `${card.value} of ${card.suit}`
    cardImg.id = 'card-drawn'
    container.appendChild(cardImg)
}



/* This function will deal and output two cards for both players. Credits are due to W3Schools and their
 * tutorial on async and await functions.
 */
async function deal() {
    if (!deckId) {
        console.log('Deck ID is not set. Please create a deck first.')
        return;
    }

    // Start the game with an empty array
    playerHand = []
    dealerHand = []

    try {
        // Each player gets their card dealt
        let playerCard1 = await drawDeck()
        let playerCard2 = await drawDeck()

        let dealerCard1 = await drawDeck()
        let dealerCard2 = await drawDeck()

        // Only one of the dealer's cards is displayed at the start of the game
        displayBackCard('.dealer-area')
        dealerHand.push(dealerCard1, dealerCard2)

        displayCard(dealerCard2, '.dealer-area')

        // Push the cards onto their respective arrays
        playerHand.push(playerCard1, playerCard2);
        displayCard(playerCard1, '.player-area')
        displayCard(playerCard2, '.player-area')

        // Log the cards to the console
        console.log('Player hand', playerHand);
        console.log('Dealer hand', dealerHand);

        //const playerContainer = document.querySelector('.player-area')
        //const dealerContainer = document.querySelector('.dealer-area')

        playerContainer.innerHTML = ''
        dealerContainer.innerHTML = ''

        playerHand.forEach(card => displayCard(card, '.player-area'))
        //dealerHand.forEach(card => displayCard(card, '.dealer-area'))
    } catch (error) {
        console.log('Error dealing cards', error)
    }
}

function displayBackCard(classArea) {
    let container = document.querySelector(classArea)
    let backCardImg = document.createElement('img')
    backCardImg.src = 'assets/images/back-card.png'
    backCardImg.alt = 'Back of card'
    backCardImg.id = 'back-card'
    container.appendChild(backCardImg)
}

async function hitMe() {
    let newCard = await drawDeck()
    playerHand.push(newCard)
    displayCard(newCard, '.player-area')
    document.getElementById('card-drawn').style.flexDirection = 'row'
    document.getElementById('card-drawn').style.zIndex = 2
}

function stay() {

}

function getCount(hand) {
    let count = 0
    hand.forEach(card => {
        if (card.value === 'QUEEN' || card.value === 'JACK' || card.value === 'KING') {
            count += 10
        } else if (card.value === 'ACE') {
            count += 11
        } else {
            count += parseInt(card.value)
        }
    })
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
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}