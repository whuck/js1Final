// deck [ {card}, {card} ]
// card { suit:(c/s/h/d) rank:9-14 img:"suit+rank" (filename without extension) }
var _gameDeck = [
    {
        suit:"c",
        rank:9,
        img:"cards\\c9.png",
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
var _gameState = "new";
var _card = {
    suit:"",
    rank:0,
    img:""
}
var _player0 ={
    hand: [],
    handDiv: ['p0hand5','p0hand6','p0hand7','p0hand8'],
    piles: [],
    pileDivs: ['p0pile0','p0pile1','p0pile2','p0pile3'],
    dealerDiv: '#p0dealer',
    trickDiv: 'p0trick',
    clickables: [],
    cardElements:[],
    playableCards:[]

};
var _player1 ={
    hand: [],
    handDiv: 'p1hand',
    piles: [],
    pileDivs: ['p1pile0','p1pile1','p1pile2','p1pile3'],
    dealerDiv: '#p1dealer',
    trickDiv: 'p1trick',
    cardElements: [],
    clickables: [],
    playableCards:[]
};
var _dealOrder = [
    []
];
var _players = [_player0,_player1];

//global trump suit
var _trump = "";

//array of trump cards.. changes based on suit, lowest to highest
var trumpCards = [];

var playerCard = {suit:"","rank":0,"i":0};
var cpuCard =  {suit:"","rank":0,"i":0};
//keeps track of dealer
var _dealer = 1;
var _currentPlayer =0;
var _trumpHelp = {
    c: [],
    s: [],
    h: [],
    d: [],
};
$(document).ready(function() {
    $("#startGame").click(start);
});
var _clicked = "";
function setNextPlayer() {
    //console.log('next');
    //$("#p"+_currentPlayer).removeClass('whosTurn');
    _currentPlayer ++;
    if(_currentPlayer === 2) _currentPlayer = 0;
    //$("#p"+_currentPlayer).addClass('whosTurn');
}
function start() {
    //TODO add game reset
    var deck = _gameDeck;
    shuffle(deck);
    deal(deck);
    showMessage("Pick a Suit to be trump or pass");
    gameState = "pick";
    showPassBtn();
    enableClickyCards("pick");

}
function showPassBtn() {
    $("#passBtn").show();
    $("#passBtn").click(pass);
}
function hidePassBtn() {
    //$("#passBtn").unbind('click');
    console.log('asdf');
    $("#passBtn").hide();
}
function pass() {
    //disableClickyCards();
    hidePassBtn();
    cpuPickSuit();
    //set trump card to suit
    var t = $("<img>").attr('src',`cards\\${_trump}.png`).addClass('card');
    $("#p1dealer").append(t);

    //update dealer div so say trump
    var a = $("#p"+_dealer+"dealer").html();
    a += '&nbsp;Trump';
    $("#p"+_dealer+"dealer").html(a);
    gameState = "play";
    playCard();

}
function enableClickyCards() {
    console.log("enable  ");
    //lazy so I put a list of the jquery strings in the player object
    for(var c of _player0.clickables) {
        //console.log(c.id);
        $(c).click(pick);
        $(c).addClass('clicky');
    }
}
// function disableClickyCards(){
//     console.log("disable");
//     for(var c of _player0.clickables) {
//         $(c).off('click');
//         $(c).unbind();
//         $(c).off();
//         $(c).removeClass('clicky');
//     }
// }
function pick() {
    //grab what suit of card player picked
    if (gameState =="pick") {
        var s = $(this).data('suit');
        _trump = s;
        console.log("pick");
        //set trump card to suit
        var t = $("<img>").attr('src', `cards\\${_trump}.png`).addClass('card');
        $("#p1dealer").append(t);

        //update dealer div so say trump
        var a = $("#p" + _dealer + "dealer").html();
        a += '&nbsp;Trump';
        $("#p" + _dealer + "dealer").html(a);
        //disableClickyCards();
        gameState = "play";
        playCard();
    } else if (gameState = "play") {
        play($(this));
        cpuDecidePlayCard();
    }
}
function play(clickedCard) {
    //TODO add bottomrow / hand clickin
    console.log(clickedCard);

    if(clickedCard.data('ontop')) {
        var i = clickedCard.data('indexInPile');
        var cardBelow = $(".0bottom"+i);
        //TODO needs id
        var temp = $("<img>").attr('src',cardBelow.data('src'));
        $("#bottomPile0").detach(".0bottom"+i);
        $("#topPile0").append(temp)

        //var temp2 = {};
        //temp2 =clickedCard;
        //clickedCard.hide();
        //console.log(cardBelow.data('src'));
        cardBelow.hide();
        //clickedCard.removeClass();
        clickedCard.addClass("0trick0");
        $("#trick0").append(clickedCard);
        //console.log(cardBelow);
    } else {
        //card not on top of a card
    }
    //cpuPlayCard();
    //$("#trick0").append(clickedCard);
    console.log("clicked index in hand:"+clickedCard.data('indexInHand'));
    var indexInHand = clickedCard.data('indexInHand');
    console.log(_player0.hand);
    //_player0.hand.splice(indexInHand,1,{});
    _player0.hand[indexInHand] = undefined;
    console.log(_player0.hand);
}

function playCard() {
    buildTrumpHelp();
    showMessage("Select a card to play");
    //enableClickyCards("play");
}
function cpuDecidePlayCard() {
    //was suit trump?
    //play
    var suitPlayed = $('.0trick0').data('suit');
    var rankPlayed = $('.0trick0').data('rank');
    var leftJackSuit = getLeftJackSuit();
    var wasTrumpPlayed = (suitPlayed ===_trump) ? true : (suitPlayed===leftJackSuit && rankPlayed ===11) ? true : false;
    console.log(`cpuDecidePlayCard() ${suitPlayed}${rankPlayed} was played was truMP? ${wasTrumpPlayed}`)
    console.log(`player played the ${rankPlayed} of ${suitPlayed}`);
    if(wasTrumpPlayed) {
        console.log('trump lead');
        if(canIfollowSuit(suitPlayed,rankPlayed)) {
            console.log('cpu has to follow suit');
            if (canItakeThis(suitPlayed,rankPlayed)) {
                console.log('cpu can take');
                //take with lowest
                takeWithLowestSuit(suitPlayed,rankPlayed);
            } else {
                console.log('cpu can follow suit, but not take');
                //play lowest trump
                playLowest(suitPlayed,rankPlayed);
            }
        } else {
            console.log('cpu cannot follow suit, and not take');
            //play lowest non trump
            playLowestWhatever(suitPlayed,rankPlayed);
        }
    }else {//non-trump
        if(canIfollowSuit(suitPlayed,rankPlayed)) {
            console.log('cpu can follow suit');
            //follow suit
            if(canItakeThis) {
                console.log('cpu can follow suit, and take w/o trumping');
                //take with lowest
                takeWithLowestSuit(suitPlayed,rankPlayed);
            } else {
                console.log('cpu can follow suit, but cannot take');
                //play lowest
                playLowest(suitPlayed,rankPlayed);
            }
        } else {
            console.log('cpu cannot follow suit');
            if(canITrumpThis) {
                console.log('cpu cannot follow suit, but can trump this');
                //trump with lowest
                takeWithLowestTrump(suitPlayed,rankPlayed);
            } else {
                console.log('cpu cannot follow suit, and cannot trump this :(');
                //play lowest
                playLowestWhatever(suitPlayed,rankPlayed);
            }
        }
    }
}
function canITrumpThis() {
    var playableCards = [];
    playableCards = getPlayableCards(_trump,rankPlayed);
    console.log('canitrumpThis'+(playableCards.length > 0));
    return playableCards.length > 0;

}
function playLowestWhatever() {
    var playableCards = [];
    playableCards = getPlayableCards("",rankPlayed);
    var toPlay = playableCards[0];
    for(var c =0; c < playableCards.length-1; c++) {
        if (toPlay.rank < playableCards[(c+1)].rank) toPlay = c;
    }
    console.log('cpu takewith lowest trump : '+toPlay.suit+toPlay.rank);
    cpuPlayCard(toPlay);
}
function takeWithLowestTrump() {
    var playableCards = [];
    playableCards = getPlayableCards(_trump,rankPlayed);
    var toPlay = playableCards[0];
    for(var c =0; c < playableCards.length-1; c++) {
        if (toPlay.rank < playableCards[(c+1)].rank) toPlay = c;
    }
    console.log('cpu takewith lowest trump : '+toPlay.suit+toPlay.rank);
    cpuPlayCard(toPlay);
}
function playLowest(suitPlayed,rankPlayed) {
    var playableCards = [];
    playableCards = getPlayableCards(suitPlayed,rankPlayed);
    var toPlay = playableCards[0];
    for(var c =0; c < playableCards.length-1; c++) {
        if (toPlay.rank < playableCards[(c+1)].rank) toPlay = c;
    }
    console.log('cpu playing'+toPlay.toString());
    cpuPlayCard(toPlay);
}
function cpuPlayCard(clickedCard) {
    console.log('cpuPlayCard() '+clickedCard.suit+clickedCard.rank);
    console.log(clickedCard);
    clickedCard = $(clickedCard);
    if(clickedCard.data('ontop')) {
        var i = clickedCard.data('indexInPile');
        var cardBelow = $(".0bottom"+i);

        var temp = $("<img>").attr('src',cardBelow.data('src'));
        $("#bottomPile1").detach(".1bottom"+i);
        $("#topPile1").append(temp)

        //var temp2 = {};
        //temp2 =clickedCard;
        //clickedCard.hide();
        //console.log(cardBelow.data('src'));
        cardBelow.hide();
        //clickedCard.removeClass();
        clickedCard.addClass("1trick1");
        $("#trick1").append(clickedCard);
        //console.log(cardBelow);
    } else {
        //card not on top of a card
        console.log('not on pile');
        var i = clickedCard.data('indexInPile');
        var cardBelow = $(".0bottom"+i);

        var temp = $("<img>").attr('src',cardBelow.data('src'));
        $("#bottomPile1").detach(".1bottom"+i);
        $("#topPile1").append(temp)

        //var temp2 = {};
        //temp2 =clickedCard;
        //clickedCard.hide();
        //console.log(cardBelow.data('src'));
        cardBelow.hide();
        //clickedCard.removeClass();
        clickedCard.addClass("1trick1");
        $("#trick1").append(clickedCard);
    }
    //cpuPlayCard();
    //$("#trick0").append(clickedCard);
    //console.log("clicked index in hand:"+clickedCard.data('indexInHand'));
    var indexInHand = clickedCard.data('indexInHand');
    //console.log(_player1.hand);
    //_player0.hand.splice(indexInHand,1,{});
    _player1.hand[indexInHand] = undefined;
    //console.log(_player0.hand);
}
function canIfollowSuit(suitPlayed,rankPlayed) {
    var playableCards = [];
    //loop through players handssssssss...
    //caveat here... if trump led, the two jacks are trump suit
    //ie if diamonds was trump, and led, the jack of hearts is not a heart, its a diamond
    var leftJackSuit = getLeftJackSuit();
    playableCards = getPlayableCards(suitPlayed,rankPlayed);
    //console.log(`suit played:${suitPlayed} cpu can play ${playableCards.length}`);
    return playableCards.length > 0;
}
function getPlayableCards(suitPlayed,rankPlayed) {
    console.log('getPlayableCards('+suitPlayed+')');
    var playableCards = [];
    var leftJackSuit = getLeftJackSuit();
    var leftJackPlayed = (suitPlayed === leftJackSuit && rankPlayed ===11);
    for(var c of _player1.playableCards) {
        //if trump was played
        if(suitPlayed === _trump || leftJackPlayed ) {
            //if player has trump
            if(c.suit === _trump || (c.suit===leftJackSuit && c.rank ===11)) {
                playableCards.push(c);
            }
        } else {// else ezpz suit match
            if (c.suit === suitPlayed) {
                playableCards.push(c);
            }else {//playing whatever that isn't trump
                if(c.suit != _trump) {
                    playableCards.push(c);
                }
            }
        }
        // if(c.suit === suitPlayed && suitPlayed != _trump) playableCards.push(c);
        // else if (suitPlayed === _trump && c.suit === leftJackSuit && c.rank==11) playableCards.push(c);
    }
    return playableCards;
}
function getLeftJackSuit() {
    return (_trump === "c") ? "s"
            :(_trump === "s") ? "c"
            :(_trump === "h") ? "d"
            :(_trump === "d") ? "h" : "";
}
function canItakeThis(suitPlayed,rankPlayed) {
    var rankToBeat = 0;
    //find left jack suit
    var leftJackSuit = getLeftJackSuit();
    var playableCards = getPlayableCards(suitPlayed);
    console.log("canItakeThis("+suitPlayed+rankPlayed+")left jack suit: "+leftJackSuit);
    //is this card the right jack?
    if (rankPlayed === 11 && suitPlayed ===_trump) {
        //top trump I cannot take this trick
        console.log('cpu cannot beat top jack');
        return 0;
    } else if (rankPlayed === 11 && suitPlayed === leftJackSuit) {
        //2nd highest trump was played, do I have the highest?
        for(var c of _player1.playableCards) {
            if(c.suit === suitPlayed && c.rank ===11) {
                console.log('cpu has top jack');
                return 1;
            }
        }
    } else if (suitPlayed === _trump){
        //rest of the cards go in order =]
        //dont have to worry about the two jacks messing up the easy rank comparison
        //so i already checked if the two jacks were played, now two quick checks if the cpu
        //has the 2 trump jacks
        for(var c of _player1.playableCards) {
            //console.log('cpu can take this');
            //console.log(`${c.suit}+${c.rank}`);

            if((c.suit === _trump && c.rank == 11) || (c.suit === leftJackSuit && c.rank == 11)) return 1;
            else if(c.suit === suitPlayed && c.rank > rankPlayed) return 1;
        }
    }//else not trump
    else{
        console.log('not trump, dont care');
    }

}

function takeWithLowestSuit(suitPlayed,rankPlayed) {
    console.log('cpu taking with lowest');
    var leftJackSuit = getLeftJackSuit();
    var playableCards = getPlayableCards(suitPlayed);

    //function assumes cpu has a card that can take trick
    //just have to find the lowest rank card to take it with
    //ez check first, if the left jack was played, have to take it with the right
    if(suitPlayed===leftJackSuit && rankPlayed===11) {
        //find right jack in cpus hand
        for(var c of playableCards) {
            if (c.suit===_trump && c.rank===11) {
                console.log('cpu playing right jack to beat left jack');
                cpuPlayCard(c);
            }
        }
    } else {
        //var playableCards = [];
        //playableCards = getPlayableCards(suitPlayed,rankPlayed);
        var toPlay = playableCards[0];
        //first find highest card in hand
        for(var c =0; c < playableCards.length-1; c++) {
            if (toPlay.rank > playableCards[(c+1)].rank) toPlay = playableCards[c];
        }

        console.log('cpu playing'+toPlay.suit+toPlay.rank);
        cpuPlayCard(toPlay);
    }


}

function hideMessage() {
    $("#message").text("");
    $("#message").hide();
}
function showMessage(msg) {
    $("#message").show();
    $("#message").text(msg);
}
function buildTrumpHelp() {
    //switch trump suit , find 2nd jack
    var t = _trump;
    var jackSuit = "";
    switch (t) {
        case "c" : jackSuit = "s"; break;
        case "s" : jackSuit = "c"; break;
        case "h" : jackSuit = "d"; break;
        case "d" : jackSuit = "h"; break;
    }
    var p = $("<span>").text("Trump Help");
    $("#trumpHelp").append(p);
    // couldn't think of a clever way to add these in a loop, they're in a weird order
    //suit jack
    var card = $("<img>").attr('src',`cards\\${t}11.png`).addClass('card');
    $("#trumpHelp").append(card);
    //2nd jack
    var card = $("<img>").attr('src',`cards\\${jackSuit}11.png`).addClass('card');
    $("#trumpHelp").append(card);

    for (let i = 14; i >8 ; i--) {
        //skip the jack, its in there already
        if(i!=11) {
            var card = $("<img>").attr('src',`cards\\${t}${i}.png`).addClass('card');
            $("#trumpHelp").append(card);
        }
    }


}

function deal(deck) {
//deals cards out.. this will chop up the deck array
    //show the "Dealer" txt next to dealer's cards
    $(_players[_dealer].dealerDiv).show();

    for (var i = 0; i < 2; i++) {
        //first 4 in bottom pile, face down
        for (let j = 0; j < 4; j++) {
            //snag card out of deck
            var c = deck.pop();
            //put into players hand[]
            _players[i].hand.push(c);
            //make a card id for the <img> tag
            var cid = `${i}card${_players[i].hand.length-1}`;
            //make <img> for card
            var card = $("<img>").attr('src', `cards\\d0.png`)
                    .attr('id',cid)
                    .data('suit',c.suit)
                    .data('rank',c.rank)
                    .data('indexInHand',_players[i].hand.length-1)
                    .data('onbottom',true)
                    .data('indexInPile',j)
                .data('src',`cards\\${c.suit}${c.rank}.png`)
                    .addClass(i+'bottom'+j);
            _players[i].cardElements.push(card);
            //append to player's bottom pile
            $("#bottomPile"+i).append(card);
        }
        //next 4 in top pile face up
        for (let j = 0; j < 4; j++) {
            //snag card out of deck
            var c = deck.pop();
            //put into players hand[]
            _players[i].hand.push(c);
            //make a card id for the <img> tag
            var cid = `${i}card${_players[i].hand.length-1}`;
            //make <img> for card
            var card = $("<img>")
                .attr('src', `${c.img}`)
                .attr('id',cid)
                .data('suit',c.suit)
                .data('rank',c.rank)
                .data('indexInHand',_players[i].hand.length-1)
                .data('ontop',true)
                .data('indexInPile',j)
                .addClass(i+'top'+j);
            //append to player's bottom pile
            _players[i].cardElements.push(card);
            _players[i].clickables.push(card);
            _players[i].playableCards.push(c);
            $("#topPile"+i).append(card);
        }
        //last 4 in hand
        for (let j = 0; j < 4; j++) {
            //snag card out of deck
            var c = deck.pop();
            //put into players hand[]
            _players[i].hand.push(c);
            //make a card id for the <img> tag
            var cid = `${i}card${_players[i].hand.length-1}`;
            //make <img> for card
            var card = $("<img>").attr('src', `${c.img}`).attr('id',cid).data('suit',c.suit).data('rank',c.rank).data('i',_players[i].hand.length-1)
            _players[i].cardElements.push(card);
            _players[i].clickables.push(card);
            _players[i].playableCards.push(c);
            //append to player's bottom pile
            $("#hand"+i).append(card);
        }
    }
}
function cpuPickSuit() {
    var countHearts = 0;
    var countDiamonds = 0;
    var countClubs = 0;
    var countSpades = 0;

    //access the strengths of each suit
    //skipping the first 4 cards in the hand array those are the 4 that are turned over
    //each suit card above a 10 gets +1 to strength
    //each ace of the suit gets +2 strength
    //each jack of that color gets +3 strength
    //having the other jack of the same color gets +2strength
    for (let i = 4; i < 12; i++) {
        //console.log(_player1.hand[i]);
        switch (_player1.hand[i].suit) {

            case "c" :
                //+1 strength for any card over a ten
                if(_player1.hand[i].rank > 10 ) countClubs++;
                //+1 strength for an ace total +2
                if(_player1.hand[i].rank === 14 ) countClubs++;
                //+2 strength for a jack total +4
                if(_player1.hand[i].rank === 11 ) countClubs+=2;
                break;
            case "s" :
                if(_player1.hand[i].rank > 10 ) countSpades++;
                if(_player1.hand[i].rank === 14 ) countSpades++;
                if(_player1.hand[i].rank === 11 ) countSpades+=2;
                break;
            case "d" :
                if(_player1.hand[i].rank > 10 ) countDiamonds++;
                if(_player1.hand[i].rank === 14 ) countDiamonds++;
                if(_player1.hand[i].rank === 11 ) countDiamonds+=2;
                break;
            case "h" :
                if(_player1.hand[i].rank > 10) countHearts++;
                if(_player1.hand[i].rank === 14) countHearts++;
                if(_player1.hand[i].rank === 11 ) countHearts+=2;
                break;
        }
    }
    //check for jacks of same color
    if(haveJack("s")) countClubs += 2;
    if(haveJack("c")) countSpades += 2;
    if(haveJack("d")) countHearts += 2;
    if(haveJack("h")) countDiamonds += 2;
    //array to find highest strength suit
    var suitStrength = [countClubs,countSpades,countHearts,countDiamonds];
    var strongSuit = 0;
    for (let i = 0; i < 3; i++) {
        //console.log(suitStrength[strongSuit]+"<"+suitStrength[(i+1)]);
        if (suitStrength[strongSuit] < suitStrength[(i+1)]) strongSuit = i + 1;
    }
    //console.table(suitStrength);
    //cheater output array
    var suits = ["c","s","h","d"];
    _trump = suits[strongSuit];
}
function haveJack(suit) {
//function takes in a suit as a param, returns true if the CPU hand has the jack of that suit
    //skipping first 4 turned over cards
    for (let i = 4; i < 12; i++) {
        if (_player1.hand[i].suit === suit && _player1.hand[i].rank === 11) return 1;
    }
    return 0;
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