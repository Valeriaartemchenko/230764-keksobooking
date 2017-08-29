'use strict';

var IMAGE_INDEX = [1, 2, 3, 4, 5, 6, 7, 8];
var HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIMES = [12.00, 13.00, 14.00];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var imageIndexRange = shuffleArray(IMAGE_INDEX);
var headingsRange = shuffleArray(HEADINGS);

var getValueFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateFeatures = function () {
  var featuresRandom = shuffleArray(FEATURES);
  var featuresNumber = getValueFromRange(1, featuresRandom.length);
  var featuresArray = featuresRandom.splice(0, featuresNumber);
  return featuresArray;
};

var advertObject = {
  'author': {
    avatar: 'img/avatars/user0' + imageIndexRange[i] + '.png'
  },
  'offer': {
    'title': headingsRange[i],
    'address': 'location.x, location.y',
    'price': getValueFromRange(MIN_PRICE, MAX_PRICE),
    'type': TYPES[getValueFromRange(0, TYPES.length)],
    'rooms': getValueFromRange(1, 5),
    'guests': getValueFromRange(1, 10),
    'checkin': CHECKIN_CHECKOUT_TIMES[getValueFromRange(0, CHECKIN_CHECKOUT_TIMES.length)],
    'checkout': CHECKIN_CHECKOUT_TIMES[getValueFromRange(0, CHECKIN_CHECKOUT_TIMES.length)],
    'features': generateFeatures(),
    'description': '',
    'photos': []

  },
  'location': {
    'x': getValueFromRange(300, 900),
    'y': getValueFromRange(100, 500)
  }
};
