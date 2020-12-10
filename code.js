//This is some async stuff i found to wait for user input
//https://stackoverflow.com/questions/51013412/how-to-do-javascript-await-on-user-input-in-an-async-function
// this is an async timeout util
const timeout = async ms => new Promise(res => setTimeout(res, ms));

var userClicked = false; // this is to be changed on user input

async function waitUserInput(e) {
    while (userClicked === false) await timeout(100); // pause script but avoid browser to freeze ;)
    const userInputVal = userClicked;
    userClicked = false; // reset var
    return userInputVal;
}


// deck [ {card}, {card} ]
// card { suit:(c/s/h/d) rank:9-14 img:"suit+rank" (filename without extension) }
var _gameDeck = [
    {
        suit:"c",
        rank:9,
        img:"c9"
    },
    {
        suit:"c",
        rank:10,
        img:"c10"
    },
    {
        suit:"c",
        rank:11,
        img:"c11"
    },
    {
        suit:"c",
        rank:12,
        img:"c12"
    },
    {
        suit:"c",
        rank:13,
        img:"c13"
    },
    {
        suit:"c",
        rank:14,
        img:"c14"
    },
    {
        suit:"s",
        rank:9,
        img:"s9"
    },
    {
        suit:"s",
        rank:10,
        img:"s10"
    },
    {
        suit:"s",
        rank:11,
        img:"s11"
    },
    {
        suit:"s",
        rank:12,
        img:"s12"
    },
    {
        suit:"s",
        rank:13,
        img:"s13"
    },
    {
        suit:"s",
        rank:14,
        img:"s14"
    },
    {
        suit:"h",
        rank:9,
        img:"h9"
    },
    {
        suit:"h",
        rank:10,
        img:"h10"
    },
    {
        suit:"h",
        rank:11,
        img:"h11"
    },
    {
        suit:"h",
        rank:12,
        img:"h12"
    },
    {
        suit:"h",
        rank:13,
        img:"h13"
    },
    {
        suit:"h",
        rank:14,
        img:"h14"
    },
    {
        suit:"d",
        rank:9,
        img:"d9"
    },
    {
        suit:"d",
        rank:10,
        img:"d10"
    },
    {
        suit:"d",
        rank:11,
        img:"d11"
    },
    {
        suit:"d",
        rank:12,
        img:"d12"
    },
    {
        suit:"d",
        rank:13,
        img:"d13"
    },
    {
        suit:"d",
        rank:14,
        img:"d14"
    }
];

//gamestate
var gameState = "";
//arrays for each player's hand
var p0Hand =[];
var p1Hand =[];
var p2Hand =[];
var p3Hand =[];

//array for hands
var playerHands = [p0Hand,p1Hand,p2Hand,p3Hand];

//array for player hand div element jquery strings
var playerHandDivs = ["#p0Hand","#p1Hand","#p2Hand","#p3Hand"];

//array for dealerDiv --shows which player is the dealer, also
//this is the div where the rest of the deck + overturned card go
var dealerDivs = ["#p0dealer","#p1dealer","#p2dealer","#p3dealer"];

//top trump suit card after deal
var topCard = {};

//global trump suit
var _trump = "";

//array of trump cards.. changes based on suit, lowest to highest
var trumpCards = [];

var _dealer = 0;
var _handOver = false;
var _currentPlayer = 1;
function rankCards() {
    switch (trump) {
        case "c" : trumpCards = [{suit:"c",rank:9},{suit:"c",rank:10},{suit:"c",rank:12},{suit:"c",rank:13},{suit:"c",rank:14},{suit:"s",rank:11},{suit:"c",rank:11}]; break;
        case "s" : trumpCards = [{suit:"s",rank:9},{suit:"s",rank:10},{suit:"s",rank:12},{suit:"s",rank:13},{suit:"s",rank:14},{suit:"c",rank:11},{suit:"s",rank:11}]; break;
        case "h" : trumpCards = [{suit:"h",rank:9},{suit:"h",rank:10},{suit:"h",rank:12},{suit:"h",rank:13},{suit:"h",rank:14},{suit:"d",rank:11},{suit:"h",rank:11}]; break;
        case "d" : trumpCards = [{suit:"d",rank:9},{suit:"d",rank:10},{suit:"d",rank:12},{suit:"d",rank:13},{suit:"d",rank:14},{suit:"h",rank:11},{suit:"d",rank:11}]; break;
    }
}

//
//the current player always goes clockwise, starting each hand with the
//player to the dealer's left.
//function sets the next player to take an action
function setNextPlayer() {
    console.log('next');
    $("#p"+_currentPlayer).removeClass('whosTurn');
    _currentPlayer ++;
    if(_currentPlayer === 4) _currentPlayer = 0;
    $("#p"+_currentPlayer).addClass('whosTurn');
}
//same deal. dealer rotates clockwise, when it hits 4 go back to 0
function setNextDealer() {
    _dealer ++;
    if(_dealer === 4) _dealer = 0;
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
function dealCards(deck) {
    $(dealerDivs[_dealer]).show();
    //because the deck array is being cut up, have to use a hard number check in the for loop
    //20 which gives each player 5 cards, 4 cards left.
    //the remaining cards are set aside, and the top card turned up
    for (var i = 0; i < 20; i++) {
        playerHands[_currentPlayer].push(deck.pop());
        setNextPlayer();
    }
    topCard = deck.pop();
    var topCardElem = $("<img>").attr('src',`cards\\${topCard.img}.png`).attr('id',"topCard");
    $(dealerDivs[_dealer]).append(topCardElem);
    //rest of the deck doesn't matter
    //show cards in players' hands
    showCards();
}
function showCards() {
    var handNumber = 0;
    //for each player
    for (var hand of playerHands) {
        //for each card, make an img element with src from the card object
        for (let i = 0; i < 5; i++) {
            var cardImg = $("<img>").attr('src',`cards\\${hand[i].img}.png`).attr('id',`card${i}`);

            $(playerHandDivs[handNumber]).append(cardImg);
        }
        handNumber++;
    }
}
//function for one trick
async function playTrick() {
    console.log(`playTrick(player:${_currentPlayer},dealer:${_dealer})`);
    // for (let i = 0; i < 4; i++) {
    //     //console.log("#p"+(i+1));
    //     $("#p"+(i+1)).removeClass('whosTurn');
    // }
    //if player is the dealer
    if (_currentPlayer !=0 ) {
        CPUplayCard();
    } else {
        for (let i = 0; i < 5; i++) {
            $("#p0Hand #card"+i).click(playerPlayCard);
        }
        // $("#p1").addClass('whosTurn');
        var playerCard = await waitUserInput();
        console.log('player turn!');
    }
    if ( _currentPlayer === _dealer ) {console.log('playTrick()trick over');}
}
async function playTrick2() {
    console.log(`playTrick2(player:${_currentPlayer},dealer:${_dealer})`);
    for (let i = 0; i < 4; i++) {
        if(_currentPlayer == 0) {
            //do player stuff
            //await playerPlayCard2();
        } else {
            //do cpu stuff
            CPUplayCard2();
        }
        setNextPlayer();
    }
    console.log('playTrick2DONE');
}
function playerPlayCard2() {
    console.log(`playThisCard2()`);

    userClicked = this.id;
    //console.log(this.id);

    //remove click handlers from players' cards
    for (let i = 0; i < 5; i++) {
        $("#p1Hand #card"+i).unbind('click');
    }
    //cheap ... this.id is always "card[0-4]"
    // so grabbing the card number is just this.id[4]
    var clickedCard = this.id[4];

    var cardToPlay = playerHands[0][clickedCard];
    console.log('player is playing '+cardToPlay.img);

    var c = $('<img>').attr('src',`cards\\${cardToPlay.img}.png`);


    //hide chosen card
    $("#p0Hand #card"+clickedCard).hide();
    $("#p0trick").append(c);

    //remove chosen card from hand array
    playerHands[0].splice(clickedCard,1);
    //$("#p1").removeClass('whosTurn');
    //playTrick();
}
function CPUplayCard2() {
    //highlight whos turn it is
    console.log(`CPUplayCard2(player:${_currentPlayer},dealer:${_dealer})`);
    // $("#p"+_currentPlayer).addClass('whosTurn');

    //have to save time and make cpu's play a random card!
    var card = Math.floor(Math.random()*5);
    //grab card info from hands array  playerHands[player][card]
    var cardToPlay = playerHands[_currentPlayer][card];
    console.log(`player ${_currentPlayer} plays ${cardToPlay.img}`);

    //make new img to put into trick area on table
    var c = $('<img>').attr('src',`cards\\${cardToPlay.img}.png`);

    //hide chosen card
    $("#p"+_currentPlayer+"Hand #card"+card).hide();
    $("#p"+_currentPlayer+"trick").append(c);

    //remove chosen card from hand array
    playerHands[_currentPlayer].splice(card,1);

    //de-highlight
    //$("#p"+_currentPlayer).removeClass('whosTurn');
    //setup next player to play a card
    //setNextPlayer();
    //if(_currentPlayer === _dealer) {
      //  console.log('playCard()trick over');
    //}
    //if(playTrick()) {
//        console.log('trick over');
  //  }
}
function playerPlayCard() {
    console.log(`playThisCard()`);

    userClicked = this.id;
    //console.log(this.id);

    //remove click handlers from players' cards
    for (let i = 0; i < 5; i++) {
        $("#p1Hand #card"+i).unbind('click');
    }
    //cheap ... this.id is always "card[0-4]"
    // so grabbing the card number is just this.id[4]
    var clickedCard = this.id[4];

    var cardToPlay = playerHands[0][clickedCard];
    console.log('player is playing '+cardToPlay.img);

    var c = $('<img>').attr('src',`cards\\${cardToPlay.img}.png`);


    //hide chosen card
    $("#p0Hand #card"+clickedCard).hide();
    $("#p0trick").append(c);

    //remove chosen card from hand array
    playerHands[0].splice(clickedCard,1);
    //$("#p1").removeClass('whosTurn');
    playTrick();
}
function CPUplayCard() {
    //highlight whos turn it is
    console.log(`playCard(player:${_currentPlayer},dealer:${_dealer})`);
    // $("#p"+_currentPlayer).addClass('whosTurn');

    //have to save time and make cpu's play a random card!
    var card = Math.floor(Math.random()*5);
    //grab card info from hands array  playerHands[player][card]
    var cardToPlay = playerHands[_currentPlayer][card];
    console.log('playing '+cardToPlay.img);

    //make new img to put into trick area on table
    var c = $('<img>').attr('src',`cards\\${cardToPlay.img}.png`);

    //hide chosen card
    $("#p"+_currentPlayer+"Hand #card"+card).hide();
    $("#p"+_currentPlayer+"trick").append(c);

    //remove chosen card from hand array
    playerHands[_currentPlayer].splice(card,1);

    //de-highlight
    //$("#p"+_currentPlayer).removeClass('whosTurn');
    //setup next player to play a card
    setNextPlayer();
    if(_currentPlayer === _dealer) {
        console.log('playCard()trick over');
    }
    if(playTrick()) {
        console.log('trick over');
    }
}
//function for one round/hand
async function playHand() {
    console.log(`playHand(dealer:${_dealer})`);
    //if(!_handOver) {
        //copy deck to be shuffled
        var deck = _gameDeck;
        shuffle(deck);
        //loop through deck and deal out the cards
        dealCards(deck);
        //go around table see if anyone wants top card to be trump
        //await pickOrPass(dealer);
    
        if(await pickOrPass()) {
            console.log(`${_trump} is trump`);
            var a = $("#p"+_dealer+"dealer").html();
            a += '&nbsp;Trump';
            $("#p"+_dealer+"dealer").html(a);
            $("#topCard").attr('src',`cards\\${topCard.suit}.png`);
            await pickAndDiscard();
        } else {
            hidePickPassBtns();
            console.log("went around, time to pick a suit");
            $("#topCard").attr('src',`cards\\d0.png`);
            await pickSuit();
        }

        //playTrick2();
    //}
}
function showPickSuitBtns() {
    $("#passBtn").click(function() {userClicked="pass";});
    $("#passBtn").show();
    for (let i = 0; i < 5; i++) {
        $("#p0Hand #card"+i).click(pickThisSuit);
    }
}
function hidePickSuitBtns() {
    $("#passBtn").unbind('click');
    $("#passBtn").hide();
    for (let i = 0; i < 5; i++) {
        $("#p0Hand #card"+i).unbind('click');
    }
}
//TODO add check for what suit
function pickThisSuit() {
    userClicked = this.id;
    var clickedCard = this.id[4];
    hidePickSuitBtns();
    var a = $("#p"+_dealer+"dealer").html();
    a += '&nbsp;Trump';
    $("#p"+_dealer+"dealer").html(a);
    _trump = playerHands[0][clickedCard].suit;
    $("#topCard").attr('src',`cards\\${_trump}.png`);
}
//TODO add check for what suit
async function pickSuit(){
    for (let i = 0; i < 4; i++) {
        if(_currentPlayer===0) {
            //let player pick suit
            showPickSuitBtns();
            const userResponse = await waitUserInput();
            if(userResponse != "pass") {
                //pick();
                console.log(userResponse);
                return 1;
            } else if(userResponse === "pass") {
                pass();
            }

        } else if(CPUpickSuit()) {
            //cpu picks
            await timeout(1500);
            var suits = ["c","s","h","d"];
            var choice = Math.floor(Math.random()*4);
            _trump = suits[choice];
            console.log(`${_currentPlayer} calls ${_trump}`);

            //set next play to dealer's left
            while (_currentPlayer != _dealer){setNextPlayer();}
            setNextPlayer();
            return;
        } else {
            await timeout(1500);
            pass();
        }
        //await timeout(1500);
        setNextPlayer();
    }
}
function CPUpickSuit() {
    //if want to pick a suit
return 0;

    //if decide to pick a suit
    return Math.floor(Math.random()*2);




}
function hidePickPassBtns() {
    //hide and remove click handlers from pick/pass btns
    $("#pickBtn").unbind('click');
    $("#passBtn").unbind('click');
    $("#pickBtn").hide();
    $("#passBtn").hide();
}
function showPickPassBtns() {
    $("#pickBtn").click(function() {userClicked="pick";});
    $("#passBtn").click(function() {userClicked="pass";});
    $("#pickBtn").show();
    $("#passBtn").show();
}
async function pickAndDiscard() {
    hidePickPassBtns();
    //dealer has to pick up card on top,
    //that suit is trump
    // and he has to discard a card...
    //for brevity's sake and my sanity, i'll just make CPU players discard a random card
    if(_dealer !=0 ) {

        //due to player divs being numbers 1-4, not 0-3
        var dealerDiv = _dealer;
        var discard = Math.floor(Math.random()*5);
        console.log(playerHands[_dealer][discard]);
        console.log(`${_dealer} decides to discard their ${discard} card`);
        //$("#p"+(_dealer+1)).removeClass('whosTurn');
        playerHands[_dealer][discard] = undefined;
        playerHands[_dealer][discard] = topCard;
        console.log(playerHands[_dealer][discard]);
        console.log(`cards\\${playerHands[_dealer][discard].img}.png`);
        $("#p"+dealerDiv+"Hand #card"+discard).attr('src',`cards\\${playerHands[_dealer][discard].img}.png`);
        $("#topCard").attr('src',`cards\\${_trump}.png`);
        //console.table(playerHands[dealer]);
    } else {
        //toss click events on player's cards
        for (let i = 0; i < 5; i++) {
            $("#p0Hand #card"+i).click(discardThis);
        }
        $("#discard").show();
        var discard = await waitUserInput();
        //console.log(`player discards${discard}`);
        //playerHands[dealer][discard] = undefined;
        //playerHands[dealer][discard] = topCard;
        //$("#p1 Hand #card"+discard).attr('src',`cards\\${playerHands[dealer][discard].img}.png`);

    }
    setNextPlayer();

}
function discardThis() {
    userClicked = this.id;
    //console.log(this.id);

    for (let i = 0; i < 5; i++) {
        $("#p0Hand #card"+i).unbind('click');
    }
    var clickedCard = this.id[4];
    //console.log(clickedCard);
    playerHands[0][clickedCard] = undefined;
    playerHands[0][clickedCard] = topCard;
    $("#p0Hand #card"+clickedCard).attr('src',`cards\\${topCard.img}.png`);
    $("#topCard").attr('src',`cards\\${_trump}.png`);
    //gameState="playHand";
    $("#discard").hide();
    //$("#p1").removeClass('whosTurn');
}
//beginning with person to the right of the dealer, decide if they want to pick or pass
// async function _pickOrPass(dealer){
//     var dealOrder = [0,1,2,3];
//     //player to decide first
//     var decider = dealer+1;
//     for (var i = 0; i < 4; i++) {
//         if (decider === 0) {
//             const userResponse = await waitUserInput();
//             if(userResponse === "pick") return 1;
//         }
//         if(countTrump(i) < 3) {
//             console.log(`player ${dealOrder[decider]} passes.`);
//         }
//         else {
//             console.log(`player ${dealOrder[decider]} says pickitup`);
//             return dealOrder[decider];
//         }
//         decider++;
//         if(decider > 3) decider = 0;
//     }
// }
//beginning with person to the right of the dealer, decide if they want to pick or pass
// each player looks at hand and either
// passes or tells the dealer to pick up the top card
async function pickOrPass(){
    //var dealOrder = [0,1,2,3];
    //player to decide first is left of dealer
    //var decider = _dealer+1;
    //if player 4 is dealer, first to decide is player1
    //if(_dealer == 3) decider = 0;

    for (var i = 0; i < 4; i++) { //every player, loop 4 times, breaks if someone wants dealer to pick
        //deciderDiv=decider+1;
        //console.log("#p"+deciderDiv);
        // $("#p"+deciderDiv).addClass('whosTurn');
        if (_currentPlayer === 0) { //players turn to decide
            showPickPassBtns();
            //console.log('asdfasdfa');
            const userResponse = await waitUserInput();
            if(userResponse === "pick") {
                pick();
                return 1;
            } else {
                pass();
            }
        } else if(countTrump() < 4) { //cpu turn to decide
            await timeout(1500);
            pass();
        }
        else {
            await timeout(1550);
            pick();
            return 1;
        }
        //$("#p"+deciderDiv).removeClass('whosTurn');
        setNextPlayer();
    }
    //if code makes it hear then everyone passed.
}
function pick() {
    console.log(`${_currentPlayer} tells ${_dealer} pick it up`);
    // $("#p"+deciderDiv).removeClass('whosTurn');
    // $("#p"+(_dealer+1)).addClass('whosTurn');
    //quick loop through players til dealers next
    while (_currentPlayer != _dealer){setNextPlayer();}
}
function pass() {
    // $("#p"+deciderDiv).removeClass('whosTurn');
    console.log(`${_currentPlayer} passes`);
    //setNextPlayer();
}
// async function cpuPass() {
//     return;
// }
// async function cpuPick() {
//     return;
// }
//count trump cards on hand, based off top card after deal
function countTrump() {
    _trump = topCard.suit;
    var count = 0;
    //need to find 2nd jack
    var leftBowerSuit = "";
    switch (_trump) {
        case "c" : leftBowerSuit = "s"; break;
        case "s" : leftBowerSuit = "c"; break;
        case "h" : leftBowerSuit = "d"; break;
        case "d" : leftBowerSuit = "h"; break;
    }
    for (var i = 0; i < 5; i++) {
        //if its the same suit, +1 count
        if (playerHands[_currentPlayer][i].suit === _trump) count++;
        //else if its the left bower, the jack of the same color
        else if (playerHands[_currentPlayer][i].rank === 11 && playerHands[_currentPlayer][i].suit === leftBowerSuit) count++;
    }
    console.log(`player ${_currentPlayer} has ${count} trump`);
    return count;
}
//function for one game
function playGame() {
    //player deals first
    _dealer = 0;
    _currentPlayer = 1;
    _handOver = false;
    //if(gameState!=="gameOver") {
        playHand();
        //update score
        //check for gameover
        //move dealer
    //}
}
$(document).ready(function(){

playGame();

});