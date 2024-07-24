// Some global variables that are needed throughout the game
let playerHand = []
let dealerHand = []
let deckId = ''
let hitMeButton = document.getElementById('hit-me-button')
hitMeButton.disabled = true
let stayButton = document.getElementById('stay-button')
stayButton.disabled = true

// We'll place the focus on the bet input since that signals the start of the game
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('bet').value = ''
    document.getElementById('bet').focus()

    document.getElementById('bet').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            updateBet()
        }
    })

    createDeck();
})

/* This function sets the game in motion. The input is validated so you can't put in a number less than or equal
 * to 0, nor can you place a bet higher than your balance. After the bet, the input is locked so no other 
 * modifications are made until the game restarts.
 */
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
    betButton.textContent = 'Bet Locked'

    deal()
    hitMeButton.disabled = false
    stayButton.disabled = false
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

    // Declare the area where we want the card to show up
    const container = document.querySelector(classArea)

    // Create the image 
    const cardImg = document.createElement('img')

    // We input the source (the API), alt-text and we put an id for future reference and append it to the container
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

/**
 * This function will display the back of the dealer's second card until his turn
 * @param {dealer area} classArea 
 */
function displayBackCard(classArea) {
    let container = document.querySelector(classArea)
    let backCardImg = document.createElement('img')
    backCardImg.src = 'assets/images/back-card.png'
    backCardImg.alt = 'Back of card'
    backCardImg.id = 'back-card'
    container.appendChild(backCardImg)
}

/**
 * This function will count the points on each of the player's hands, while taking into account the number of Aces
 * that are drawn, and then return the counts, which will then be used to determine the winner.
 * @param {playerHand or dealerHand} hand 
 * @returns lowCount, highCount properties
 */
function getCount(hand) {
    let lowCount = 0
    let aceCount = 0

    // Calculate lowCount (if you only have one ace, it scores at 11; else it's 1) and count the number of Aces
    hand.forEach(card => {
        if (card.value === 'QUEEN' || card.value === 'JACK' || card.value === 'KING') {
            lowCount += 10
        } else if (card.value === 'ACE') {
            lowCount += 1
            aceCount++
        } else {
            lowCount += parseInt(card.value)
        }
    })

    // Calculate highCount depending on the number of Aces
    let highCount = lowCount
    if (aceCount > 0) {
        // Add 10 points for the first Ace if it doesn't bust the hand
        highCount += 10
        // If there are more than one Ace, adjust highCount accordingly 
        if (highCount > 21) {
            highCount -= 10
        }
    }
    return {
        lowCount,
        highCount
    }
}

/* This function draws a new card until you either you decide to stay, you bust or win by getting blackjack.  
 * If you win by getting blackjack or bust and lose, the game will automatically restart. You either earn or lose
 * your bet depending on the outcome. The function uses the lowCount property from the getCount() function to 
 * determine if it is a winning hand or not. 
 */
async function hitMe() {
    let newCard = await drawDeck()
    playerHand.push(newCard)
    displayCard(newCard, '.player-area')

    // Delay the alert messages by a second so the cards appear first
    setTimeout(() => {
        let count = getCount(playerHand)
        console.log('Player count:', count.lowCount)
        if (count.lowCount >= 22) {
            console.log('Bust')
            alert('Bust! You lose.')
            hitMeButton.disabled = true
            document.getElementById('bet-amount').innerText = 0

            // A timer is set so the game restarts 3 seconds after the game is over
            setTimeout(() => {
                restartGame()
            }, 3000)
        } else if (count.lowCount === 21) {
            console.log('Blackjack')
            alert('Blackjack! You win.')
            hitMeButton.disabled = true
            let betAmount = parseInt(document.getElementById('bet-amount').textContent)
            let maxAmount = parseInt(document.getElementById('max-amount').textContent)
            document.getElementById('max-amount').innerText = betAmount * 2 + maxAmount
            document.getElementById('bet-amount').innerText = 0

            // A timer is set so the game restarts 3 seconds after the game is over
            setTimeout(() => {
                restartGame()
            }, 3000)
        }
    }, 1000)
}

/* This function reveals the dealer's card when the player stays
 */
function revealDealerCard() {
    let flipCardImg = document.getElementById('back-card')
    flipCardImg.src = dealerHand[0].image
    flipCardImg.alt = `${dealerHand[0].value} of ${dealerHand[0].suit}`

    let dealerContainer = document.querySelector('.dealer-area')
    dealerContainer.appendChild(flipCardImg)
}

/* This function automates the dealer's turn. Based on a few conditionals, the dealer will draw cards or stay.
 * The game automatically restarts after the game finishes.
 */
async function dealerTurn() {
    revealDealerCard()
    // Wait for 1 second to reveal the dealer's card for better UX experience - credits to W3Schools
    await new Promise(resolve => setTimeout(resolve, 1000))
    hitMeButton.disabled = true
    stayButton.disabled = true

    while (true) {
        let count = getCount(dealerHand)
        console.log('Dealer count:', count.lowCount)

        if (count.lowCount < 17) {
            let newCard = await drawDeck()
            dealerHand.push(newCard)
            displayCard(newCard, '.dealer-area')
            // I couldn't put in a delay for the dealer to draw a card, so I had to use an await Promise function as dealerTurn is an async function - credits to W3Schools 
            await new Promise(resolve => setTimeout(resolve, 2000))
        } else if (count.lowCount > 21) {
                console.log('Dealer bust')
                alert('Dealer bust! You win!')
                let betAmount = parseInt(document.getElementById('bet-amount').textContent)
                let maxAmount = parseInt(document.getElementById('max-amount').textContent)
                document.getElementById('max-amount').innerText = betAmount * 2 + maxAmount
                document.getElementById('bet-amount').innerText = 0
            
            setTimeout(() => {
                restartGame()
            }, 3000)
            break;
        } else if (count.lowCount === 21) {
                console.log('Dealer blackjack')
                alert('Dealer blackjack! You lose.')
                document.getElementById('bet-amount').innerText = 0

            setTimeout(() => {
                restartGame()
            }, 3000)
            break;
        } else {
            let playerCount = getCount(playerHand).lowCount
            let dealerCount = count.lowCount
            console.log('Player count:', playerCount)
            console.log('Dealer count:', dealerCount)

            if (playerCount > dealerCount) {
                console.log('Player wins')
                alert(`Player count: ${playerCount}\nDealer count: ${dealerCount}\nYou win!`)
                let betAmount = parseInt(document.getElementById('bet-amount').textContent)
                let maxAmount = parseInt(document.getElementById('max-amount').textContent)
                document.getElementById('max-amount').innerText = betAmount * 2 + maxAmount
                document.getElementById('bet-amount').innerText = 0

                setTimeout(() => {
                    restartGame()
                }, 3000)
                break;
            } else if (playerCount < dealerCount) {
                console.log('Dealer wins')
                alert(`Player count: ${playerCount}\nDealer count: ${dealerCount}\nDealer wins! You lose.`)
                document.getElementById('bet-amount').innerText = 0

                setTimeout(() => {
                    restartGame()
                }, 3000)
                break;
            } else {
                console.log('Push')
                alert('Push.')
                let betAmount = parseInt(document.getElementById('bet-amount').textContent)
                let maxAmount = parseInt(document.getElementById('max-amount').textContent)
                document.getElementById('max-amount').innerText = betAmount + maxAmount
                document.getElementById('bet-amount').innerText = 0

                setTimeout(() => {
                    restartGame()
                }, 3000)
                break;
            }
        }
    }
}

/* This function restarts the game and the player and dealer start again with a clean slate. You will see your 
 * balance updated and you will see that the betting input is unlocked in order to place a new bet.
 */
async function restartGame() {

    // Reset the player and dealer arrays
    playerHand = []
    dealerHand = []

    let playerContainer = document.querySelector('.player-area')
    let dealerContainer = document.querySelector('.dealer-area')

    playerContainer.innerHTML = ''
    dealerContainer.innerHTML = ''

    // Focus is placed back on bet input in order to place a new bet
    document.getElementById('bet').disabled = false
    document.getElementById('bet').value = ''
    document.getElementById('bet').focus()
    let betButton = document.getElementById('place-bet')
    betButton.disabled = false
    betButton.textContent = 'Place Bet'
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