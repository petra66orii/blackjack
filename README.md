# Blackjack

Blackjack is a classic casino game of chance and strategy. Blackjack is one of the most popular casino games in the world, partly due to the fact that it's an easy game to learn and build strategies upon. Whilst considered a game of luck, statistics play a massive role in the game as well, and mathematicians and intellectuals from all over the world are fascinated by the idea of making money through pure stats.

![Am I Responsive Website](assets/images/documentation/am-i-responsive.png)

See the live website here: [Blackjack](https://petra66orii.github.io/blackjack/)

# Table of Contents
1. **[Target Audience](#target-audience)**
   * [User Stories](#user-stories)
   * [User Goals](#user-goals)
2. **[Design](#design)**
   * [Color Palette](#color-palette)
   * [Typography](#typography)
       + [Kanit](#kanit)
   * [Imagery](#imagery)
   * [Wireframes](#wireframes)
       + [Mobile View](#mobile-view)
       + [Desktop View](#desktop-view)
3. **[Features](#features)**
   * [General Features](#general-features)
       + [Logo](#logo)
       + [Game Buttons](#game-buttons)
       + [How to Play Modal](#how-to-play-modal)
       + [Landing Page](#landing-page)
       + [Bet Input Area](#bet-input-area)
       + [Amount Available Section](#amount-available-section)
       + [Game Prompts](#game-prompts)
   * [Future Implementations](#future-implementations)
   * [Accessibility](#accessibility)
4. **[Technologies Used](#technologies-used)**
5. **[Languages Used](#languages-used)**
6. **[Deployment & Local Development](#deployment--local-development)**
   * [Deployment](#deployment)
       + [How to Deploy](#how-to-deploy)
   * [Local Development](#local-development)
       + [How to Clone](#how-to-clone)
       + [How to Fork](#how-to-fork)
7. **[Testing](#testing)**
   * [Validation](#validation)
       + [HTML Validator](#html-validator)
       + [CSS Validator](#css-validator)
       + [JSHint](#jshint)
       + [Lighthouse](#lighthouse)
   * [Accessibility](#accessibility)
   * [Devices Used](#devices-used)
       + [Laptops](#laptops)
       + [Mobile Devices](#mobile-devices)
       + [Browsers Used](#browsers-used)
   * [Full Testing](#full-testing)
   * [Bugs](#bugs)
8. **[Credits](#credits)**
   * [Code Used](#code-used)
   * [Content](#content)
   * [Acknowledgements](#acknowledgements)


# Target Audience

This game is destined for anyone who wants to have a little fun, and get the thrill of betting without actually putting any real money on the line. This game can be great practice to find and develop strategies before trying your luck at the casino! It's also a fun game to help develop your maths and statistics skills!

## User Stories

* As a player, I expect a pleasant design and a fully functional game.
* As a player, I expect to have a fun experience and to play proper Blackjack.
* As a player, I expect to balance increasing or decreasing depending on the outcome.

## User goals

The goals are to faithfully reproduce a Blackjack game for people to play and have fun with. There is a betting system in place as well to give that slight dopamine kick when you see money coming in. It's also a good way of practising and developing strategies that can be then implemented at the casino, should the user ever decide to go. 

# Design

## Color Palette
For the color scheme I chose these four colors that go with the cards displayed as well. The green color in the background is meant to mimic the tables in casinos, giving it an authentic feel to the game.

![Color scheme](assets/images/documentation/palette-blackjack.png)

## Typography

For the font I went with a simple Kanit font that stands out and it's elegant.

### Kanit
![Font family](assets/images/documentation/kanit-font-family.png)

## Imagery

The cards images were taken from the [Deck of Cards API](https://www.deckofcardsapi.com/) and displayed with the help of JavaScript. The back card image was from the same website.

## Wireframes

This initial design was made using Balsamiq. The mobile design is aiming to contain everything without scrolling down or with minimal scrolling, and the same idea is kept in mind while designing the desktop version.

### Mobile View

![Wireframe for mobile version](assets/images/documentation/blackjack-wireframe-mobile.png)

### Desktop View

![Wireframe for desktop version](assets/images/documentation/blackjack-game-desktop.png)

# Features

## Game Features

### Logo
### Game Buttons
### How to Play Modal
### Landing Page 
### Bet Input Area
### Amount Available Section
### Game Prompts

## Accessibility

* All card images have alt-descriptions
* There is a high contrast in colors, and the background isn't distracting the user from the foreground

# Technologies Used

* **Gitpod** - The IDE where all the coding and commits have been done
* **GitHub** - Where the website is stored and pushed. The website was deployed early via GitHub and it was constantly tested
* **HTML5** - The main structure of the website was created using HTML5
* **CSS** - This was used in order to style the webpage in way that is pleasing to the eye
* **Python** - Python3 was used to preview the website on a local http server
* **Balsamiq** - To create the wireframes
* **Google Chrome** - All the testing and building took place using Google Chrome
* **UNPKG** - The header icon was taken from UNPKG
* **Favicon** - The icon in the browser tab was taken from Favicon
* **DevTools** - Using Google Chromes' DevTools helped me play with the code to find the best properties for my webpage
* **Deck of Cards API** - The cards were sourced from this API
  
# Languages Used

* **HTML**
* **CSS**
* **JavaScript**

# Deployment & Local Development

## Deployment

### How to Deploy
1. Log in to your GitHub account
2. Go to the repository of this project /petra66orii/blackjack/
3. Under the repository name, click on Settings
4. On the left side of the page, click Pages
5. Select 'Deploy from a branch' under the 'Build and deployment' section
6. Set branch to 'root'
7. Click 'Save'
8. It might a few minutes to see the deployed website

## Local Development

### How to Clone
1. Log into your account on GitHub
2. Go to the repository of this project /petra66orii/blackjack/
3. Click on the code button, and copy your preferred clone link
4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory
5. Type 'git clone' into the terminal, paste the link you copied in step 3 and press enter

### How to Fork
To fork the repository:
1. Log in (or sign up) to Github.
2. Go to the repository for this project, petra66orii/blackjack
3. Click the Fork button in the top right corner.

# Testing 

## Validation

### HTML Validator

The HTML code passed the W3C Validator with no issues. 

![W3C Validator](assets/images/documentation/w3c-html-validator.png)

### CSS Validator

The CSS was validated using the official CSS Jigsaw validator.

![CSS Jigsaw](assets/images/documentation/css-jigsaw-validator.png)

### JSHint Validator

* No errors came up while testing the JavaScript code.
* There are a good few warnings, most of them are because of missing semicolons.
* There are also warnings regarding the ES6 compatibility; however, I am aware of these warning and I am happy to dismiss them, since the code is working properly.

### Lighthouse

Passed the Lighthouse test with flying colors. Even the browser's happy!

![Lighthouse test](assets/images/documentation/lighthouse-test.gif)

## Accessibility

Passed the Wave test as well with no issues.

![Wave testing](assets/images/documentation/wave-testing.png)

## Devices Used 
Testing was done on the following devices: 

### Laptops
* HP ProBook
* Acer Aspire E15
* Asus GL702Z

### Mobile Devices
* iPhone 11
* Samsung Galaxy Flip 5
* Samsung Galaxy S10

### Browsers Used
Each device used the following browsers for testing:

* Google Chrome
* Microsoft Edge
* Safari (Mobile only)
* Samsung Internet (Mobile only)

## Full Testing

# Credits

## Code Used

* [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/default.asp)
   - Modal container tutorial helped me with coding the "How to Play" and the pop up messages at the end of the game
   - Async and await functions tutorials helped me code the async functions hitMe(), deal()
 and dealerTurn()
   - Callback and Promise functions tutorials helped when trying to figure out how to delay the pop up messages from coming up before the score would update
* [FreeCodeCamp article on how to use fetch API to make GET requests](https://www.freecodecamp.org/news/make-api-calls-in-javascript/#how-to-use-the-fetch-api-for-get-requests)
   - Used and adapted this code snippet to use the fetch() method for the Deck of Cards API
* [Bootcamp article on fetching data from an API and render it with CSS and JavaScript](https://bootcamp.uxdesign.cc/fetch-data-from-a-sample-api-and-render-it-in-a-card-using-javascript-and-css-step-by-step-guide-332bd4b70346)
   - Used and adapted part of the code to render cards in the game

## Content
   - The images were all taken from the [Deck of Cards API](https://www.deckofcardsapi.com/)
   - The rules for Blackjack were written by me with help from [ChatGPT](https://chatgpt.com/)
   - Icons were used from [Favicon](https://favicon.io/) (for the browser tab) and [UNPKG](https://unpkg.com/) (for the header icon)
   - Font was taken from [Google Fonts](https://fonts.google.com/)
   - Color palette was determined using [Coolors](https://coolors.co/)
   - I used [Stack OverFlow](https://stackoverflow.com) to solve some code-related problems

## Acknowledgements