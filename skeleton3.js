// deck [ {card}, {card} ]
// card { suit:(c/s/h/d) rank:9-14 img:"suit+rank" (filename without extension) }
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

var _player0 ={
    hand: [],
    handDiv: 'p0hand',
    piles: [],
    pileDivs: ['p0pile0','p0pile1','p0pile2','p0pile3'],
    dealerDiv: '#p0dealer',
    trickDiv: 'p0trick'
};
var _player1 ={
    hand: [],
    handDiv: 'p1hand',
    piles: [],
    pileDivs: ['p1pile0','p1pile1','p1pile2','p1pile3'],
    dealerDiv: '#p1dealer',
    trickDiv: 'p1trick'
};
var _dealOrder = [
    ['#p1pile0 div.bottom','#p0pile0 div.bottom','#p1pile1 div.bottom','#p0pile1 div.bottom',
        '#p1pile2 div.bottom','#p0pile2 div.bottom','#p1pile3 div.bottom','#p0pile3 div.bottom',
        '#p1pile0 div.top','#p0pile0 div.top','#p1pile1 div.top','#p0pile1 div.top',
        '#p1pile2 div.top','#p0pile2 div.top','#p1pile3 div.top','#p0pile3 div.top',
        '#p1hand','#p0hand','#p1hand','#p0hand',
        '#p1hand','#p0hand','#p1hand','#p0hand'],
    ['#p0pile0 div.bottom','#p1pile0 div.bottom','#p0pile1 div.bottom','#p1pile1 div.bottom',
        '#p0pile2 div.bottom','#p1pile2 div.bottom','#p0pile3 div.bottom','#p1pile3 div.bottom',
        '#p0pile0 div.top','#p1pile0 div.top','#p0pile1 div.top','#p1pile1 div.top',
        '#p0pile2 div.top','#p1pile2 div.top','#p0pile3 div.top','#p1pile3 div.top',
        '#p0hand','#p1hand','#p0hand','#p1hand',
        '#p0hand','#p1hand','#p0hand','#p1hand']
];
var _players = [_player0,_player1];

//global trump suit
var _trump = "";

//array of trump cards.. changes based on suit, lowest to highest
var trumpCards = [];

//keeps track of dealer
var _dealer = 0;
var _currentPlayer =1;
$(document).ready(function() {
    $("#startGame").click(start);
});
function setNextPlayer() {
    //console.log('next');
    //$("#p"+_currentPlayer).removeClass('whosTurn');
    _currentPlayer ++;
    if(_currentPlayer === 2) _currentPlayer = 0;
    //$("#p"+_currentPlayer).addClass('whosTurn');
}
function start() {
    var deck = _gameDeck;
    shuffle(deck);
    deal(deck);
}
function deal(deck) {
    $(_players[_dealer].dealerDiv).show();
    for (var i = 0; i < 8; i++) {
        var c = deck.pop();
        _players[_currentPlayer].hand.push(c);
        var cid = `p${_currentPlayer}bot${_players[_currentPlayer].hand.length-1}`;
        var card = $("<img>").attr('src','cards\\d0.png').attr('id',cid).data('s',c.img);
        console.log(_dealOrder[_dealer][i]);
        $(_dealOrder[_dealer][i]).append(card);
        setNextPlayer();
    }
    for (var i = 8; i < 16; i++) {
        var c = deck.pop();
        _players[_currentPlayer].hand.push(c);
        var cid = `p${_currentPlayer}top${_players[_currentPlayer].hand.length-4}`;
        var card = $("<img>").attr('src',`${c.img}`).attr('id',cid).data('s',c.img);
        console.log(_dealOrder[_dealer][i]);
        $(_dealOrder[_dealer][i]).append(card);
        setNextPlayer();
    }

    for (var i = 16; i < 24; i++) {
        var c = deck.pop();
        _players[_currentPlayer].hand.push(c);
        var cid = `p${_currentPlayer}hand${_players[_currentPlayer].hand.length-4}`;
        var card = $("<img>").attr('src',`${c.img}`).attr('id',cid).data('s',c.img);
        console.log(_dealOrder[_dealer][i]);
        $(_dealOrder[_dealer][i]).append(card);
        setNextPlayer();
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