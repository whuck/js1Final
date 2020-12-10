// deck [ {card}, {card} ]
// card { suit:(c/s/h/d) rank:9-14 img:"suit+rank" (filename without extension) }
var _gameDeck = [
    {
        suit:"c",
        rank:9,
        img:"card\\c9.png"
    },
    {
        suit:"c",
        rank:10,
        img:"card\\c10.png"
    },
    {
        suit:"c",
        rank:11,
        img:"card\\c11.png"
    },
    {
        suit:"c",
        rank:12,
        img:"card\\c12.png"
    },
    {
        suit:"c",
        rank:13,
        img:"card\\c13.png"
    },
    {
        suit:"c",
        rank:14,
        img:"card\\c14.png"
    },
    {
        suit:"s",
        rank:9,
        img:"card\\s9.png"
    },
    {
        suit:"s",
        rank:10,
        img:"card\\s10.png"
    },
    {
        suit:"s",
        rank:11,
        img:"card\\s11.png"
    },
    {
        suit:"s",
        rank:12,
        img:"card\\s12.png"
    },
    {
        suit:"s",
        rank:13,
        img:"card\\s13.png"
    },
    {
        suit:"s",
        rank:14,
        img:"card\\s14.png"
    },
    {
        suit:"h",
        rank:9,
        img:"card\\h9.png"
    },
    {
        suit:"h",
        rank:10,
        img:"card\\h10.png"
    },
    {
        suit:"h",
        rank:11,
        img:"card\\h11.png"
    },
    {
        suit:"h",
        rank:12,
        img:"card\\h12.png"
    },
    {
        suit:"h",
        rank:13,
        img:"card\\h13.png"
    },
    {
        suit:"h",
        rank:14,
        img:"card\\h14.png"
    },
    {
        suit:"d",
        rank:9,
        img:"card\\d9.png"
    },
    {
        suit:"d",
        rank:10,
        img:"card\\d10.png"
    },
    {
        suit:"d",
        rank:11,
        img:"card\\d11.png"
    },
    {
        suit:"d",
        rank:12,
        img:"card\\d12.png"
    },
    {
        suit:"d",
        rank:13,
        img:"card\\d13.png"
    },
    {
        suit:"d",
        rank:14,
        img:"card\\d14.png"
    }
];

//arrays for each player's hand
var p0Hand =[];
var p1Hand =[];

//array for hands
var _playerHands = [p0Hand,p1Hand];

//array for player hand div element jquery strings
var _playerHandDivs = ["#p0Hand","#p1Hand"];

//array for dealerDiv --shows which player is the dealer
var dealerDivs = ["#p0dealer","#p1dealer"];

//global trump suit
var _trump = "";

//array of trump cards.. changes based on suit, lowest to highest
var trumpCards = [];

//keeps track of dealer
var _dealer = 0;
$(document).ready(function() {

});
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