var gameState = "newGame";
var team1Score = 0;
var team2Score = 0;
var dealer = 0;
var _gameDeck = [
    {
        suit:"c",
        rank:9,
        img:"cards\\c9.png"
    },
    {
        suit:"c",
        rank:10,
        img:"cards\\c10.png"
    },
    {
        suit:"c",
        rank:11,
        img:"cards\\c11.png"
    },
    {
        suit:"c",
        rank:12,
        img:"cards\\c12.png"
    },
    {
        suit:"c",
        rank:13,
        img:"cards\\c13.png"
    },
    {
        suit:"c",
        rank:14,
        img:"cards\\c14.png"
    },
    {
        suit:"s",
        rank:9,
        img:"cards\\s9.png"
    },
    {
        suit:"s",
        rank:10,
        img:"cards\\s10.png"
    },
    {
        suit:"s",
        rank:11,
        img:"cards\\s11.png"
    },
    {
        suit:"s",
        rank:12,
        img:"cards\\s12.png"
    },
    {
        suit:"s",
        rank:13,
        img:"cards\\s13.png"
    },
    {
        suit:"s",
        rank:14,
        img:"cards\\s14.png"
    },
    {
        suit:"h",
        rank:9,
        img:"cards\\h9.png"
    },
    {
        suit:"h",
        rank:10,
        img:"cards\\h10.png"
    },
    {
        suit:"h",
        rank:11,
        img:"cards\\h11.png"
    },
    {
        suit:"h",
        rank:12,
        img:"cards\\h12.png"
    },
    {
        suit:"h",
        rank:13,
        img:"cards\\h13.png"
    },
    {
        suit:"h",
        rank:14,
        img:"cards\\h14.png"
    },
    {
        suit:"d",
        rank:9,
        img:"cards\\d9.png"
    },
    {
        suit:"d",
        rank:10,
        img:"cards\\d10.png"
    },
    {
        suit:"d",
        rank:11,
        img:"cards\\d11.png"
    },
    {
        suit:"d",
        rank:12,
        img:"cards\\d12.png"
    },
    {
        suit:"d",
        rank:13,
        img:"cards\\d13.png"
    },
    {
        suit:"d",
        rank:14,
        img:"cards\\d14.png"
    }
];
var shuffledDeck = [];
//arrays for each player's hand
var p1Hand =[];
var p2Hand =[];
var p3Hand =[];
var p4Hand =[];

//array for hands
var playerHands = [p1Hand,p2Hand,p3Hand,p4Hand];

//array for player hand div element jquery strings
var playerHandDivs = ["#p1Hand","#p2Hand","#p3Hand","#p4Hand"];

//array for dealerDiv --shows which player is the dealer, also
//this is the div where the rest of the deck + overturned card go
var dealerDivs = ["#p1dealer","#p2dealer","#p3dealer","#p4dealer"];

//top trump suit card after deal
var topCard = {};

//global trump suit
var trump = "";

//array of trump cards.. changes based on suit, lowest to highest
var trumpCards = [];
var nextPlayer = 0;

$(document).ready(function() {
    //createDeck();
    $("#p1").click(startGame);
});
// function createDeck() {
//     var deck = [
//     {
//         suit:"c",
//         rank:9,
//         img:"cards\\c9.png"
//     },
//     {
//         suit:"c",
//         rank:10,
//         img:"cards\\c10.png"
//     },
//     {
//         suit:"c",
//             rank:11,
//         img:"cards\\c11.png"
//     },
//     {
//         suit:"c",
//             rank:12,
//         img:"cards\\c12.png"
//     },
//     {
//         suit:"c",
//             rank:13,
//         img:"cards\\c13.png"
//     },
//     {
//         suit:"c",
//             rank:14,
//         img:"cards\\c14.png"
//     },
//     {
//         suit:"s",
//             rank:9,
//         img:"cards\\s9.png"
//     },
//     {
//         suit:"s",
//             rank:10,
//         img:"cards\\s10.png"
//     },
//     {
//         suit:"s",
//             rank:11,
//         img:"cards\\s11.png"
//     },
//     {
//         suit:"s",
//             rank:12,
//         img:"cards\\s12.png"
//     },
//     {
//         suit:"s",
//             rank:13,
//         img:"cards\\s13.png"
//     },
//     {
//         suit:"s",
//             rank:14,
//         img:"cards\\s14.png"
//     },
//     {
//         suit:"h",
//             rank:9,
//         img:"cards\\h9.png"
//     },
//     {
//         suit:"h",
//             rank:10,
//         img:"cards\\h10.png"
//     },
//     {
//         suit:"h",
//             rank:11,
//         img:"cards\\h11.png"
//     },
//     {
//         suit:"h",
//             rank:12,
//         img:"cards\\h12.png"
//     },
//     {
//         suit:"h",
//             rank:13,
//         img:"cards\\h13.png"
//     },
//     {
//         suit:"h",
//             rank:14,
//         img:"cards\\h14.png"
//     },
//     {
//         suit:"d",
//             rank:9,
//         img:"cards\\d9.png"
//     },
//     {
//         suit:"d",
//             rank:10,
//         img:"cards\\d10.png"
//     },
//     {
//         suit:"d",
//             rank:11,
//         img:"cards\\d11.png"
//     },
//     {
//         suit:"d",
//             rank:12,
//         img:"cards\\d12.png"
//     },
//     {
//         suit:"d",
//             rank:13,
//         img:"cards\\d13.png"
//     },
//     {
//         suit:"d",
//             rank:14,
//         img:"cards\\d14.png"
//     }
//     ];
//     for (let i = 0; i < 24; i++) {
//         var card = $('<img>').attr('src',deck[i].img).data('suit',deck[i].suit).data('rank',deck[i].rank);
//         _deck.push(card);
//     }
// }
async function startGame() {
    gameState="deal";
    //game loop
    while(gameState != "gameOver") {
        if(team1Score > 20) {
            gameState="gameOver";
            gameWon("team1");
        }
        else if (team2Score > 20) {
            gameState="gameOver";
            gameWon("team2");
        }
        await nextPlayerAction();
    }
}
async function nextPlayerAction() {
    switch (gameState) {
        case "deal" : dealCards(); break;
        case "pickOrPass" : shouldIpickOrPass();
    }
    return;
}
function dealCards() {
    // p1Hand =[];
    // p2Hand =[];
    // p3Hand =[];
    // p4Hand =[];
    p1Hand.length = 0;
    p2Hand.length = 0;
    p3Hand.length = 0;
    p4Hand.length = 0;
    for (let i = 0; i < 5; i++) {
        $(playerHandDivs[i]).empty();
        $(dealerDivs[i]).empty();
    }

    //copy array to var that will be shuffled and dealt
    var deck = [..._gameDeck];
    shuffle(deck);
    //playerHands= [p1,p2,p3,p4]
    //so the idea is that theres a four number array representing each player's hand
    //the dealer changes each game, going from player 1 to 2 to 3 to 4
    //cards are dealt clock-wise
    //          player 3
    //player2               player 4
    //          player 1
    //SO I change which element in the dealOrder array to start from with var nextCard
    //i.e. if player 1 is dealing, player 2 gets the first card
    //after player 4 gets a card, give player 1 a card etc.
    var dealOrder = [0,1,2,3];
    var nextCard = dealer+1;
    $(dealerDivs[dealer]).show();
    //because the deck array is being cut up, have to use a hard number check in the for loop
    //20 which gives each player 5 cards, 4 cards left.
    //the remaining cards are set aside, and the top card turned up
    for (var i = 0; i < 20; i++) {
        if(nextCard < dealOrder.length) {
            var c = deck.pop();
            playerHands[dealOrder[nextCard]].push(c);
            nextCard++;
        } else {
            nextCard = 0;
            playerHands[dealOrder[nextCard]].push(deck.pop());
            nextCard++;
        }
    }
    topCard = deck.pop();
    var topCardElem = $("<img>").attr('src',`${topCard.img}`).attr('id',"topCard");
    $(dealerDivs[dealer]).append(topCardElem);
    //rest of the deck doesn't matter
    //show cards in players' hands
    showCards();
}
function showCards() {

    var handNumber = 0;
    //for each player
    for (var hand of playerHands) {
        //console.log("showcards for player: "+handNumber);
        //for each card, make an img element with src from the card object
        for (let i = 0; i < 5; i++) {
            var cardImg = $("<img>").attr('src',`${hand[i].img}`).attr('id',`card${i}`);
            //$('#'+playerHandDivs[handNumber]).append(cardImg);
            $(playerHandDivs[handNumber]).append(cardImg);
        }
        handNumber++;
    }
    //gameState="pickOrPass";
}
async function pickOrPass() {
    console.log('pick or pass '+dealer+' is dealer');
    //var dealOrder = [0,1,2,3];
    //player to decide first is left of dealer
    var decider = dealer+1;
    //if player 4 is dealer, first to decide is player1
    if(dealer == 3) decider = 0;

    for (var i = 0; i < 4; i++) { //every player, loop 4 times, breaks if someone wants dealer to pick
        deciderDiv=decider+1;
        //console.log("#p"+deciderDiv);
        $("#p"+deciderDiv).addClass('whosTurn');
        if (decider === 0) { //players turn to decide
            $("#pickBtn").show();
            $("#passBtn").show();
            const userResponse = await waitUserInput();
            if(userResponse === "pick") {
                userClicked = false;
                pick(decider,dealer);
                return 1;
            } else {
                pass(decider);
            }
        } else if(countTrump(decider) < 2) { //cpu turn to decide
            await timeout(1500);
            pass(decider);
        }
        else {
            await timeout(1550);
            pick(decider,dealer);
            return 1;
        }
        $("#p"+deciderDiv).removeClass('whosTurn');
        decider++;
        if(decider > 3) decider = 0;
    }
    //if loop finishes everyone passed, move gamestate
    gameState="pickSuit";
}
function pick(decider,dealer) {
    console.log(`${decider} tells ${dealer} pick it up`);
    $("#p"+deciderDiv).removeClass('whosTurn');
    $("#p"+dealer).addClass('whosTurn');
    gameState="discard";
}
function pass(decider,dealer) {
    $("#p"+deciderDiv).removeClass('whosTurn');
    console.log(`${decider} passes`);

}
function countTrump(player) {
    trump = topCard.suit;
    var count = 0;
    //need to find 2nd jack
    var leftBowerSuit = "";
    switch (trump) {
        case "c" : leftBowerSuit = "s"; break;
        case "s" : leftBowerSuit = "c"; break;
        case "h" : leftBowerSuit = "d"; break;
        case "d" : leftBowerSuit = "h"; break;
    }
    for (var i = 0; i < 5; i++) {
        //if its the same suit, +1 count
        if (playerHands[player][i].suit === trump) count++;
        //else if its the left bower, the jack of the same color
        else if (playerHands[player][i].rank === 11 && playerHands[player][i].suit === leftBowerSuit) count++;
    }
    console.log(`player ${player} has ${count} trump`);
    return count;
}
async function discard() {
    //hide and remove click handlers from pick/pass btns
    $("#pickBtn").unbind('click');
    $("#passBtn").unbind('click');
    $("#pickBtn").hide();
    $("#passBtn").hide();
    //dealer has to pick up card on top,
    //that suit is trump
    // and he has to discard a card...
    //for brevity's sake and my sanity, i'll just make CPU players discard a random card
    if(dealer !=0 ) {
        //due to player divs being numbers 1-4, not 0-3
        var dealerDiv = dealer+1;
        var discard = Math.floor(Math.random()*5);
        //console.log(playerHands[dealer][discard]);
        console.log(`${dealer} decides to discard their ${discard} card`);
        playerHands[dealer][discard] = undefined;
        playerHands[dealer][discard] = topCard;
        //console.log(playerHands[dealer][discard]);
        //console.log(`cards\\${playerHands[dealer][discard].img}.png`);
        $("#p"+dealerDiv+"Hand #card"+discard).attr('src',`${playerHands[dealer][discard].img}`);
        $("#topCard").attr('src',`cards\\d0.png`);
        //console.table(playerHands[dealer]);
    } else {

        //player must discard... load click handlers on each card in hand
        for (let i = 0; i < 4; i++) {
            $("#p1Hand #card"+i).click(discardThis);
        }
        var discard = await waitUserInput();
        //game waits until user picks a card to discard

        console.log(`player discards${discard.img}`);
    }
    console.log("discard done");
    gameState="playHand";
    return 1;
}
async function discardThis() {
    console.log(this.id);
    for (let i = 0; i < 4; i++) {
        $("#p1Hand #card"+i).unbind('click');
    }
    var clickedCard = this.id[4];
    console.log(clickedCard);
    playerHands[0][clickedCard] = undefined;
    playerHands[0][clickedCard] = topCard;
    $("#p1Hand #card"+clickedCard).attr('src',topCard.img);
    gameState="playHand";
}
async function pickSuit() {
    console.log('pickSuit '+dealer+' is dealer');
    for (let i = 0; i < 4; i++) {
        //if pick
        if(Math.floor(Math.random()*2)){
            console.log(`player ${i} picks a suit.`);
            trump = "c";
            gameState="playHand";
            return;
        }
        //else pass
        else {
            console.log(`player ${i} passes.`);
        }
    }
    gameState="playHand";
    return 1;
}
async function playHand() {
    console.log('playHand '+dealer+' is dealer');
    for (let i = 0; i < 4; i++) {

    }
    var win = Math.floor(Math.random()*2);
    var points = Math.floor(Math.random()*3)+1;
    console.log('hand over team '+win+' won '+points+' points!');
    if(win===0) team1Score += points;
    else team2Score += points;
    if(dealer===3) dealer = 0;
    else dealer++;
    gameState="deal";
}
async function gameWon(winner) {
    console.log(winner+"wins!");
}

function rankCards() {
    switch (trump) {
        case "c" : trumpCards = [{suit:"c",rank:9},{suit:"c",rank:10},{suit:"c",rank:12},{suit:"c",rank:13},{suit:"c",rank:14},{suit:"s",rank:11},{suit:"c",rank:11}]; break;
        case "s" : trumpCards = [{suit:"s",rank:9},{suit:"s",rank:10},{suit:"s",rank:12},{suit:"s",rank:13},{suit:"s",rank:14},{suit:"c",rank:11},{suit:"s",rank:11}]; break;
        case "h" : trumpCards = [{suit:"h",rank:9},{suit:"h",rank:10},{suit:"h",rank:12},{suit:"h",rank:13},{suit:"h",rank:14},{suit:"d",rank:11},{suit:"h",rank:11}]; break;
        case "d" : trumpCards = [{suit:"d",rank:9},{suit:"d",rank:10},{suit:"d",rank:12},{suit:"d",rank:13},{suit:"d",rank:14},{suit:"h",rank:11},{suit:"d",rank:11}]; break;
    }
}

//found shuffle function
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
const timeout = async ms => new Promise(res => setTimeout(res, ms));

var userClicked = false; // this is to be changed on user input

async function waitUserInput(e) {
    while (userClicked === false) await timeout(e); // pause script but avoid browser to freeze ;)
    const userInputVal = userClicked;
    userClicked = false; // reset var
    return userInputVal;
}
