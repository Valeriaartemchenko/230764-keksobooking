'use strict';

var IMAGE_INDEX = [1, 2, 3, 4, 5, 6, 7, 8];
var HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIMES = [12.00, 13.00, 14.00];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var POINTER_WIDTH = 56;
var POINTER_HEIGHT = 75;
var pointsFragment = document.createDocumentFragment();
var TokyoPinMap = document.querySelector('.tokyo__pin-map');
var NUMBER_OF_ADS = 8;
var lodgeTemplate = document.querySelector('#lodge-template').content;
var panelTitle = document.querySelector('.dialog__title');
var oldDialogPanel = document.querySelector('.dialog__panel');
var dialogPanelParent = oldDialogPanel.parentNode;
var offerDialog = document.querySelector('.dialog');
var closeDialogBtn = document.querySelector('.dialog__close');
var ads = [];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var tokyo = document.querySelector('.tokyo');
// var pin = document.querySelectorAll('.pin');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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

var defineAdvertObject = function () {
  var advertObject = {
    'author': {
      avatar: 'img/avatars/user0' + imageIndexRange[i] + '.png'
    },
    'offer': {
      'title': headingsRange[i],
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
  advertObject.offer.address = advertObject.location.x + ', ' + advertObject.location.y;
  return advertObject;
};

var generatePointer = function (advertObject) {
  var pointer = document.createElement('div');
  pointer.classList.add('pin');
  pointer.style.left = (advertObject.location.x + 0.5 * POINTER_WIDTH) + 'px';
  pointer.style.top = (advertObject.location.y + POINTER_HEIGHT) + 'px';
  pointer.tabIndex = '0';
  // pointer.dataset.searchIhdex = i;
  var pointerImage = document.createElement('img');
  pointerImage.src = advertObject.author.avatar;
  pointerImage.classList.add('rounded');
  pointerImage.style.height = '40px';
  pointerImage.style.width = '40px';
  pointer.appendChild(pointerImage);
  return pointer;
};

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  ads[i] = defineAdvertObject();
  pointsFragment.appendChild(generatePointer(ads[i]));
}

TokyoPinMap.appendChild(pointsFragment);

var createFeatureElement = function (feature) {
  var newFeatureElement = document.createElement('span');
  newFeatureElement.classList.add('feature__image');
  newFeatureElement.classList.add('feature__image--' + feature);
  return newFeatureElement;
};

var createNewDialogPanel = function (offerObj) {
  var dialogOffer = lodgeTemplate.cloneNode(true);
  var newDialogPanel = dialogOffer.querySelector('.dialog__panel');
  var dialogTitle = dialogOffer.querySelector('.lodge__title');
  var dialogAddress = dialogOffer.querySelector('.lodge__address');
  var dialogPrice = dialogOffer.querySelector('.lodge__price');
  var dialogType = dialogOffer.querySelector('.lodge__type');
  var dialogRoomGuests = dialogOffer.querySelector('.lodge__rooms-and-guests');
  var dialogCheckinTime = dialogOffer.querySelector('.lodge__checkin-time');
  var dialogFeatures = dialogOffer.querySelector('.lodge__features');
  var dialogDecription = dialogOffer.querySelector('.lodge__description');
  dialogTitle.textContent = offerObj.offer.title;
  dialogAddress.textContent = offerObj.offer.address;
  dialogPrice.textContent = offerObj.offer.price + ' &#x20bd;/ночь';
  dialogRoomGuests.textContent = 'Для ' + offerObj.offer.guests + ' гостей в ' + offerObj.offer.rooms + ' комнатах';
  dialogCheckinTime.textContent = 'Заезд после ' + offerObj.offer.checkin + ' , выезд до ' + offerObj.offer.checkout;
  dialogDecription.textContent = offerObj.offer.description;

  switch (offerObj.offer.type) {
    case 'flat': dialogType.textContent = 'Квартира';
      break;
    case 'house': dialogType.textContent = 'Дом';
      break;
    case 'bungalo': dialogType.textContent = 'Бунгало';
      break;
  }

  for (i = 0; i < offerObj.offer.features.length; i++) {
    dialogFeatures.appendChild(createFeatureElement(offerObj.offer.features[i]));
  }

  return newDialogPanel;
};

var changeDialogContent = function (inputObj) {
  var newDialogPanel = createNewDialogPanel(inputObj);
  panelTitle.querySelector('img').src = inputObj.author.avatar;
  dialogPanelParent.replaceChild(newDialogPanel, oldDialogPanel);
};

changeDialogContent(ads[0]);

// Обработка событий

/*
var getActivePin = function () {
  for (var j = 0; j < pin.length; j++) {
    if (pin[j].classList.contains('pin--active')) {
      pin[j].classList.remove('pin--active');
    }
  }
};
*/

var getActivePin = function () {
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

var renderCurrentPin = function (target) {
  getActivePin();
  target.parentNode.classList.add('pin--active');
  openPopUp();
};

tokyo.addEventListener('click', function (event) {
  var target = event.target;
  if (target.parentNode.classList.contains('pin')) {
    renderCurrentPin(target);
  }
});

tokyo.addEventListener('keydown', function (event) {
  var target = event.target;
  if (target.parentNode.classList.contains('pin') && event.keyCode === ENTER_KEYCODE) {
    renderCurrentPin(target);
  }
});

var onPopUpPressEsc = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopUp();
    getActivePin();
  }
};

var openPopUp = function () {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopUpPressEsc);
};

var closePopUp = function () {
  offerDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopUpPressEsc);
};

var closeDialog = function () {
  closeDialogBtn.addEventListener('click', function () {
    closePopUp();
    getActivePin();
  });
  closeDialogBtn.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      closePopUp();
      getActivePin();
    }
  });
};

closeDialog();

