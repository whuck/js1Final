function shuffle(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}
//deck of cards array of card objects
var _gameDeck = [
    {
        suit:"c",
        rank:2,
        img:"cards\\c2.png",
    },
    {
        suit:"c",
        rank:3,
        img:"cards\\c3.png",
    },
    {
        suit:"c",
        rank:4,
        img:"cards\\c4.png",
    },
    {
        suit:"c",
        rank:5,
        img:"cards\\c5.png",
    },
    {
        suit:"c",
        rank:6,
        img:"cards\\c6.png",
    },
    {
        suit:"c",
        rank:7,
        img:"cards\\c7.png",
    },
    {
        suit:"c",
        rank:8,
        img:"cards\\c8.png",
    },
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
        rank:10,
        img:"cards\\c11.png"
    },
    {
        suit:"c",
        rank:10,
        img:"cards\\c12.png"
    },
    {
        suit:"c",
        rank:10,
        img:"cards\\c13.png"
    },
    {
        suit:"c",
        rank:11,
        img:"cards\\c14.png"
    },
    {
        suit:"s",
        rank:2,
        img:"cards\\s2.png"
    },
    {
        suit:"s",
        rank:3,
        img:"cards\\s3.png"
    },
    {
        suit:"s",
        rank:4,
        img:"cards\\s4.png"
    },
    {
        suit:"s",
        rank:5,
        img:"cards\\s5.png"
    },
    {
        suit:"s",
        rank:6,
        img:"cards\\s6.png"
    },
    {
        suit:"s",
        rank:7,
        img:"cards\\s7.png"
    },
    {
        suit:"s",
        rank:8,
        img:"cards\\s8.png"
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
        rank:10,
        img:"cards\\s11.png"
    },
    {
        suit:"s",
        rank:10,
        img:"cards\\s12.png"
    },
    {
        suit:"s",
        rank:10,
        img:"cards\\s13.png"
    },
    {
        suit:"s",
        rank:11,
        img:"cards\\s14.png"
    },
    {
        suit:"h",
        rank:2,
        img:"cards\\h2.png"
    },
    {
        suit:"h",
        rank:3,
        img:"cards\\h3.png"
    },
    {
        suit:"h",
        rank:4,
        img:"cards\\h4.png"
    },
    {
        suit:"h",
        rank:5,
        img:"cards\\h5.png"
    },
    {
        suit:"h",
        rank:6,
        img:"cards\\h6.png"
    },
    {
        suit:"h",
        rank:7,
        img:"cards\\h7.png"
    },
    {
        suit:"h",
        rank:8,
        img:"cards\\h8.png"
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
        rank:10,
        img:"cards\\h11.png"
    },
    {
        suit:"h",
        rank:10,
        img:"cards\\h12.png"
    },
    {
        suit:"h",
        rank:10,
        img:"cards\\h13.png"
    },
    {
        suit:"h",
        rank:11,
        img:"cards\\h14.png"
    },
    {
        suit:"d",
        rank:2,
        img:"cards\\d2.png"
    },
    {
        suit:"d",
        rank:3,
        img:"cards\\d3.png"
    },
    {
        suit:"d",
        rank:4,
        img:"cards\\d4.png"
    },
    {
        suit:"d",
        rank:5,
        img:"cards\\d5.png"
    },
    {
        suit:"d",
        rank:6,
        img:"cards\\d6.png"
    },
    {
        suit:"d",
        rank:7,
        img:"cards\\d7.png"
    },
    {
        suit:"d",
        rank:8,
        img:"cards\\d8.png"
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
        rank:10,
        img:"cards\\d11.png"
    },
    {
        suit:"d",
        rank:10,
        img:"cards\\d12.png"
    },
    {
        suit:"d",
        rank:10,
        img:"cards\\d13.png"
    },
    {
        suit:"d",
        rank:11,
        img:"cards\\d14.png"
    }
];

//deck to use in game
var _deck = [];

//game mode
var _easyMode = false;

//decktype
var _deckType = "d0"

var _player = "Player";
var _dealer = "Dealer";
var _dealerHand = {
    cards:[],
    sum:0
};
var _playerHand = {
    cards:[],
    sum:0
};
$(document).ready(function() {
    $("#PlayBtn").click(start);
    $("#hitBtn").click(hit);
    $("#stayBtn").click(stay);
    $("#newGameBtn").click(start);
    $("#newGameBtn").hide();
});
function start() {
    //make new deck and shuffle it
    _playerHand.sum = 0;
    _dealerHand.sum = 0;
    _playerHand.cards = [];
    _dealerHand.card = [];
    $("#playerCards").remove();
    $("#dealerCards").remove();
    $("#newGameBtn").hide();
    _deck = _gameDeck;
    shuffle(_deck);
    //hide the start button
    $(this).hide();

    var d = $("<img>").attr('src',`cards\\d0.png`);
    $("#deck").append(d);

    deal();
}
function addCards() {
    _dealerHand.sum = 0;
    _playerHand.sum = 0;
    //dealers hand first
    for(var c of _dealerHand.cards) {
        var pts = parseInt($(c).attr('rank'));
        //check if its an ace, but not blackjack already
        if (pts === 11 && (_dealerHand.sum != 10)) pts = 1;
        _dealerHand.sum += parseInt($(c).attr('rank'));
    }
    if (_dealerHand.sum >= 21) gameOver();

    for(var c of _playerHand.cards) {
        var pts = parseInt($(c).attr('rank'));
        if (pts === 11 && (_playerHand.sum != 10)) pts = 1;
        _playerHand.sum += c.rank;
    }
    if (_playerHand.sum >= 21) gameOver();
}
function deal() {
    //nab cards off top of deck 2 to each player
    //dealer first, first card face down if not on ez mode

    if(_easyMode) dealOneCard("dealer");
    else dealOneCard("faceDown");

    //2nd card face up
    dealOneCard("dealer");

    //now players turn, both right side up
    for (let i = 0; i < 2; i++) {
        dealOneCard("player");
    }
    //add up both hands
    addCards();

}
function dealOneCard(who) {
    var card = _deck.pop();
    var c = $("<img>").attr('rank', card.rank);
    if(who==="player") {
        c.attr('src', `${card.img}`);
        _playerHand.cards.push(c);
        $("#playerCards").append(c);
    } else if (who==="dealer"){
        c.attr('src',`${card.img}`);
        _dealerHand.cards.push(c);
        $("#dealerCards").append(c);
    } else if (who==="faceDown"){
        var src = `cards\\${_deckType}.png`;
        c.attr('src',`${src}`);
        _dealerHand.cards.push(c);
        $("#dealerCards").append(c);
    }
}
function hit() {
    //check to see if dealer is hitting or player
    if (this.id==="hitBtn") dealOneCard("player");
    else dealOneCard("dealer");
    addCards();
}
//player stays, dealer decides how many hits it can take
function stay() {
    var hitThreshold = _easyMode?  17 : 16;
    while(_dealerHand.sum < hitThreshold) {
        hit();
    }
    gameOver();
}
function gameOver() {
    var winner = "";
    var playerBlackJack = _playerHand.sum === 21 && _playerHand.cards.length === 2;
    var dealerBlackJack = _dealerHand.sum === 21 && _dealerHand.cards.length === 2;
    if(_dealerHand.sum > 21) winner = _player + " Wins!";
    else if(_playerHand.sum > 21) winner = _dealer + " Wins!";
    else if(playerBlackJack && dealerBlackJack) winner = "Draw";
    else if(playerBlackJack) winner = _player + " BlackJack!";
    else if(dealerBlackJack) winner = _dealer + " BlackJack!";
    $("#newGameBtn").show();

}