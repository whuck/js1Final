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
    cardElements:[]

};
var _player1 ={
    hand: [],
    handDiv: 'p1hand',
    piles: [],
    pileDivs: ['p1pile0','p1pile1','p1pile2','p1pile3'],
    dealerDiv: '#p1dealer',
    trickDiv: 'p1trick',
    cardElements: [],
    clickables: []
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
        play();
        cpuPlayCard();
    }
}
function play() {
    console.log("play");
    var c = $(this);
    var i = c.data('i');
    var s = c.data('suit');
    var r = c.data('rank');
    playerCard.i = i;
    playerCard.rank = r;
    playerCard.suit = s;
    console.log(playerCard);

}
function playCard() {
    buildTrumpHelp();
    showMessage("Select a card to play");
    //enableClickyCards("play");
}
function cpuPlayCard() {

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
            var card = $("<img>").attr('src', `cards\\d0.png`).attr('id',cid).data('suit',c.suit).data('rank',c.rank).data('i',_players[i].hand.length-1);
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
            var card = $("<img>").attr('src', `${c.img}`).attr('id',cid).data('suit',c.suit).data('rank',c.rank).data('i',_players[i].hand.length-1);
            //append to player's bottom pile
            _players[i].cardElements.push(card);
            _players[i].clickables.push(card);
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