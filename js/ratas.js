(function() {
  var card_strs = [
    "AC", "AS", "AH", "AD",
    "KC", "KS", "KH", "KD",
    "QC", "QS", "QH", "QD",
    "JC", "JS", "JH", "JD",
    "TC", "TS", "TH", "TD",
    "9C", "9S", "9H", "9D",
    "8C", "8S", "8H", "8D",
    "7C", "7S", "7H", "7D",
    "6C", "6S", "6H", "6D",
    "5C", "5S", "5H", "5D",
    "4C", "4S", "4H", "4D",
    "3C", "3S", "3H", "3D",
    "2C", "2S", "2H", "2D"
   ]
  var Card = function(i) {
    this.i = i;
    this.str = card_strs[i];
    this.rank = this.str[0];
    this.suit = this.str[1];
    this.id = "c" + i;
  };

  Card.prototype.display = function(left, top) {
    var attr = {
      id: this.id, 
      class: "card", 
      src: "img/cards/" + (this.i + 1) + ".png", 
      "data-bind": "click: on_select_card",
      style: "left: " + left + "; top: " + top
    }
    this.img = $("<img>", attr);
    $("#board").append(this.img);
  };
  
  Card.prototype.move = function(left, top) {
    this.img.animate({left: left, top: top});
  };
  
  Card.prototype.is_stronger = function(other, trumph_suit) {
    if (this.suit == trumph_suit && other.suit != trumph_suit)
      return false;

    if (this.suit != trumph_suit && other.suit == trumph_suit)
      return true;
      
    if (this.suit == other.suit && this.i > other.i)
      return true;
    
    return false;
  };
  
  var Deck = {
    cards: [], //no card on index zero
    drawn: 0,
    draw_cards: function(numcards) {
      var cards = [];
      for (var i = 0; i < numcards; i++) {
        cards.push(Deck.cards[Deck.drawn++]);
      }
      return cards;
    },
    
    shuffle: function () {
      Deck.drawn = 0;
      var array = Deck.cards;
      var counter = array.length, temp, index;

      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
    }
  };
  
  for (var i = 0; i < 36; i++) {
    Deck.cards.push(new Card(i));
  }
  
  var ratas = {
    deck: Deck,
    
    draw_cards: function(numcards) {
      return ratas.deck.draw_cards(numcards);
    },
    draw_card: function() {
      return ratas.deck.draw_cards(1)[0];
    }
  };

window.ratas = ratas;
})();
