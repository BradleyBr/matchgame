$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardArray = [];
  var randomArray = [];
  for (i = 1; i <= 8; i++) {
    cardArray.push(i, i);
  };
  while (cardArray.length > 0) {
    var index = Math.floor((Math.random()) * (cardArray.length - 1));
    randomArray.push(cardArray[index]);
    cardArray.splice(index, 1);
  };
  return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data({"flip":  [] });
  window.cardArray = [];
  var cardcolor = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)",
    "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)",
    "hsl(360, 85%, 65%)"];
  $game.empty();
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-3 card"></div>');
    $card.data({"value": cardValues[i]});
    $card.data({"flipped": false});
    $card.data({"color": cardcolor[cardValues[i] - 1]});
    $game.append($card);
  };
  $('.card').click(function() {
    if ($(this).data('flipped') === false) {
      MatchGame.flipCard($(this), $game);
    } else {
      return;
    };
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flip') === true) {
    return;
  } else {
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
    $game.data('flip').push($card);
    cardArray.push($card.data('value'));
  };
  if ($game.data('flip').length === 2) {
    var gameArray = $game.data('flip');
    if (cardArray[0] === cardArray[1]) {
      gameArray[0].css('background-color', 'rgb(153, 153, 153)');
      gameArray[1].css('background-color', 'rgb(153, 153, 153)');
      $game.data('flip', []);
      cardArray = [];
    } else {
      var wrongCards = function() {
      gameArray[0].data('flipped', false);
      gameArray[1].data('flipped', false);
      gameArray[0].css('background-color', 'rgb(32, 64, 86)');
      gameArray[1].css('background-color', 'rgb(32, 64, 86)');
      gameArray[0].text('');
      gameArray[1].text('');
      $game.data('flip', []);
      cardArray = [];
      };
      setTimeout(wrongCards, 300);
    };
  };
};
