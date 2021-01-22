var pictures = [
    {
        item: 'airplane',
        price: '$6.97'
    },
    {
        item: 'apple',
        price: '$0.99'
    },
    {
        item: 'book',
        price: '$2.85'
    },
    {
        item: 'bus',
        price: '$5.76'
    },
    {
        item: 'car',
        price: '$4.88'
    },
    {
        item: 'carrot',
        price: '$0.49'
    },
    {
        item: 'cat',
        price: '$12.00'
    },
    {
        item: 'dog',
        price: '$13.53'
    },
    {
        item: 'duck',
        price: '$6.27'
    },
    {
        item: 'elephant',
        price: '$9.99'
    },
    {
        item: 'fries',
        price: '$1.99'
    },
    {
        item: 'hamburger',
        price: '$3.25'
    },
    {
        item: 'helicopter',
        price: '$5.66'
    },
    {
        item: 'jet',
        price: '$3.75'
    },
    {
        item: 'lemon',
        price: '$1.37'
    },
    {
        item: 'monster truck',
        price: '$4.32'
    },
    {
        item: 'pizza',
        price: '$7.64'
    },
    {
        item: 'popcorn',
        price: '$2.77'
    },
    {
        item: 'puzzle',
        price: '$20.11'
    },
    {
        item: 'rabbit',
        price: '$5.75'
    },
    {
        item: 'taco',
        price: '$1.99'
    },
    {
        item: 'truck',
        price: '$8.44'
    },
    {
        item: 'hammer',
        price: '$4.44'
    },
    {
        item: 'screwdriver',
        price: '$3.33'
    },
    {
        item: 'sunglasses',
        price: '$9.77'
    },
    {
        item: 'school bus',
        price: '$7.42'
    },
    {
        item: 'phone',
        price: '$59.99'
    },
    {
        item: 'train',
        price: '$8.88'
    },
    {
        item: 'motorcycle',
        price: '$4.57'
    },
    {
        item: 'bicycle',
        price: '$109.77'
    },
    {
        item: 'space shuttle',
        price: '$15.23'
    },
    {
        item: 'bulldozer',
        price: '$12.21'
    }
];
var randomItems = ['gifts', 'cart', 'box', 'basket',
    'bag', 'gift', 'duck', 'elephant',
    'rabbit', 'dog', 'cat', 'car', 'bus',
    'jet', 'airplane', 'phone', 'school bus',
    'monster truck', 'sunglasses', 'hammer', 'screwdriver',
    'truck'];
var generateRandomItem = function () {
    //     const randomSkuNumber = Math.floor(Math.random() * 1000000);
    var randomItemNumber = Math.floor(Math.random() * randomItems.length);
    var randomPrice = (Math.random() * (Math.random() * (100))).toFixed(2);
    var randomItem = {
        name: "Scanned Item",
        image: randomItems[randomItemNumber],
        price: "$" + randomPrice
    };
    return randomItem;
};
var updateTotal = function (items, targetElement) {
    var updatedTotal = 0.00;
    items.forEach.call(items, function (item) {
        var itemCurrency = Number(item.innerHTML.replace(/[^0-9.-]+/g, ""));
        updatedTotal += itemCurrency;
    });
    targetElement.textContent = "$ " + updatedTotal.toFixed(2);
};
var currentItems = (document.querySelectorAll('.item__price')) ? document.querySelectorAll('.item__price') : [];
var total = document.querySelector('.total__amount');
updateTotal(currentItems, total);
var registerSound = function (src) {
    var sound = document.createElement('audio');
    sound.src = src;
    sound.setAttribute('preload', 'audio');
    sound.setAttribute('controls', 'none');
    sound.style.display = 'none';
    sound.play();
    document.body.appendChild(sound);
};
var loadNewView = function (targetContainer) {
    targetContainer.classList.remove('hidden');
    targetContainer.classList.add('visible');
    var id = targetContainer.id;
    var list = targetContainer.querySelector("." + id + "__list");
    switch (id) {
        case 'pictures':
            pictures.forEach.call(pictures, function (picture) {
                var item = picture.item;
                var cost = picture.price;
                list.appendChild(createItem(item, cost));
            });
            break;
        case 'scan':
            targetContainer.appendChild(createScanner());
            break;
        case 'pay':
            targetContainer.appendChild(createPaymentOptions());
            break;
    }
};
var createItem = function (name, cost) {
    var item = document.createElement('li');
    item.className = 'item__picture';
    item.appendChild(createItemLink(name, cost));
    return item;
};
var createItemLink = function (name, cost) {
    var itemTitle = name.charAt(0).toUpperCase() + name.slice(1);
    var imageName = name.replace(' ', '_');
    var itemLink = document.createElement('a');
    itemLink.className = 'item__link waves-effect waves-dark';
    itemLink.innerHTML = "<span class=\"item__title\">" + itemTitle + "</span>" +
        ("<img src=\"images/svgs/" + imageName + ".svg\" alt=\"" + itemTitle + " icon\"/>") +
        ("<span class=\"item__cost\">" + cost + "</span>");
    itemLink.onclick = function (event) {
        event.preventDefault();
        registerSound('../sounds/beep.mp3');
        if (!(itemLink.classList.contains('clicked'))) {
            itemLink.classList.add('clicked');
            addToRegister(itemTitle, cost);
            var currentItems_1 = (document.querySelectorAll('.item__price')) ? document.querySelectorAll('.item__price') : [];
            var total_1 = document.querySelector('.total__amount');
            updateTotal(currentItems_1, total_1);
            var parentView_1 = itemLink.closest('.view');
            setTimeout(function () {
                parentView_1.classList.add('hidden');
                parentView_1.classList.remove('visible');
                parentView_1.querySelector('ul').innerHTML = '';
                itemLink.classList.remove('clicked');
            }, 1000);
        }
    };
    return itemLink;
};
var createScanner = function () {
    var scannerWrapper = document.createElement('div');
    scannerWrapper.className = 'scanner-wrapper';
    scannerWrapper.innerHTML = '<span class="quadrant upper-left"></span><span class="quadrant upper-right"></span><span class="quadrant lower-left"></span><span class="quadrant lower-right"></span>';
    scannerWrapper.appendChild(createScanButton());
    return scannerWrapper;
};
var createScanButton = function () {
    var scanButton = document.createElement('a');
    scanButton.href = '#';
    scanButton.className = 'scan-button waves-effect waves-light';
    scanButton.innerHTML = 'Press to Scan';
    scanButton.onclick = function (event) {
        event.preventDefault();
        scanButton.closest('.scanner-wrapper').classList.add('activated');
        registerSound('../sounds/scanner.mp3');
        var randomItem = generateRandomItem();
        addToRegister(randomItem.name, randomItem.price, randomItem.image);
        var currentItems = (document.querySelectorAll('.item__price')) ? document.querySelectorAll('.item__price') : [];
        var total = document.querySelector('.total__amount');
        updateTotal(currentItems, total);
        setTimeout(function () {
            var parent = scanButton.closest('.view');
            parent.classList.add('hidden');
            parent.classList.remove('visible');
            parent.innerHTML = '';
        }, 1500);
    };
    return scanButton;
};
var processingPayment = function () {
    var processing = document.createElement('div');
    processing.className = 'processing-container';
    processing.innerHTML = '<i class="fad fa-spinner-third"></i><span>Processing Payment</span>';
    return processing;
};
var thanks = function () {
    var thanksContainer = document.createElement('div');
    thanksContainer.className = 'thanks-container';
    thanksContainer.innerHTML = '<img src="images/svgs/thanks.svg" />';
    return thanksContainer;
};
var paymentAnimation = function (name) {
    var animations = [
        {
            name: 'credit card',
            html: '<div class="animation-wrapper credit-card"><span class="instructions">Please swipe your card on the right and then press Pay Now!</span><i class="fad fa-credit-card"></i></div>'
        },
        {
            name: 'gift card',
            html: '<div class="animation-wrapper gift-card"><span class="instructions">Please place your card at the bottom of the screen and then press Pay Now!</span><i class="fad fa-gift-card"></i></div>'
        },
        {
            name: 'cash',
            html: '<div class="animation-wrapper cash"><span class="instructions">Please place your bills and coins in their respective slots, and then press Pay Now!</span><span class="slot for-bills"></span><span class="for-coins"></span><i class="fas fa-coin"></i><i class="fad fa-money-bill"></i></div>'
        }
    ];
    var setHTML;
    for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
        var animation = animations_1[_i];
        if (animation.name === name) {
            setHTML = animation.html;
        }
    }
    var animationContainer = document.createElement('div');
    animationContainer.className = 'animation-container';
    animationContainer.innerHTML = setHTML;
    return animationContainer;
};
var payNowButton = function (name) {
    var payNow = document.createElement('a');
    payNow.className = "pay-now-button waves-effect waves-light " + name.replace(' ', '-');
    payNow.innerHTML = 'Pay Now';
    payNow.onclick = function (event) {
        event.preventDefault();
        registerSound("../sounds/" + name.replace(' ', '-') + ".mp3");
        var parent = payNow.closest('.view');
        setTimeout(function () {
            parent.innerHTML = '';
            parent.appendChild(processingPayment());
            var registerList = document.querySelector('.items__list');
            registerList.innerHTML = '';
            var currentItems = (document.querySelectorAll('.item__price')) ? document.querySelectorAll('.item__price') : [];
            var total = document.querySelector('.total__amount');
            updateTotal(currentItems, total);
        }, 1000);
        setTimeout(function () {
            parent.innerHTML = '';
            parent.appendChild(thanks());
            registerSound('../sounds/grunt-birthday-party.mp3');
        }, 3000);
        setTimeout(function () {
            parent.innerHTML = '';
            parent.classList.remove('visible');
            parent.classList.add('hidden');
        }, 8000);
    };
    return payNow;
};
var createPaymentPanel = function (name) {
    var paymentUI = document.createElement('div');
    paymentUI.className = "payment-ui " + name;
    paymentUI.appendChild(paymentAnimation(name));
    paymentUI.appendChild(payNowButton(name));
    return paymentUI;
};
var createPaymentButton = function (name, icon, waves) {
    var paymentButton = document.createElement('a');
    paymentButton.className = "payment-button " + waves + " " + name.replace(' ', '-');
    paymentButton.innerHTML = icon + "<span>" + name + "</span>";
    paymentButton.onclick = function (event) {
        event.preventDefault();
        registerSound('../sounds/beep.mp3');
        setTimeout(function () {
            var parentView = paymentButton.closest('.view');
            parentView.innerHTML = '';
            parentView.appendChild(createPaymentPanel(name));
        }, 1000);
    };
    return paymentButton;
};
var createPaymentOptions = function () {
    var payments = [
        {
            name: 'credit card',
            icon: '<i class="fad fa-credit-card"></i>',
            waves: 'waves-effect waves-blue'
        },
        {
            name: 'gift card',
            icon: '<i class="fad fa-gift-card"></i>',
            waves: 'waves-effect waves-red'
        },
        {
            name: 'cash',
            icon: '<i class="fad fa-money-bill-wave"></i>',
            waves: 'waves-effect waves-alt-green'
        }
    ];
    var paymentsWrapper = document.createElement('div');
    paymentsWrapper.className = 'payments-wrapper';
    var paymentsList = document.createElement('ul');
    paymentsList.className = 'payments__list';
    payments.forEach.call(payments, function (payment) {
        var paymentListItem = document.createElement('li');
        paymentListItem.className = 'payment__list__item';
        paymentListItem.appendChild(createPaymentButton(payment['name'], payment['icon'], payment['waves']));
        paymentsList.appendChild(paymentListItem);
    });
    paymentsWrapper.appendChild(paymentsList);
    return paymentsWrapper;
};
var addToRegister = function (name, cost, scanned) {
    var register = document.querySelector('.register ul.items__list');
    register.appendChild(createRegisterItem(name, cost, scanned));
};
var createRegisterItem = function (name, cost, scanned) {
    var itemName;
    if (name === 'Scanned Item') {
        itemName = scanned;
    }
    else {
        itemName = name;
    }
    console.log(itemName);
    var nameForSrc = itemName.toLowerCase().replace(' ', '_');
    var lineItem = document.createElement('li');
    lineItem.className = 'item';
    lineItem.innerHTML = "<span class=\"item__desc\">" + name + "</span>" +
        ("<img class=\"item__image\" src=\"images/svgs/" + nameForSrc + ".svg\" />") +
        ("<span class=\"item__price\">" + cost + "</span>");
    return lineItem;
};
var options = document.querySelectorAll('.options__list li a');
options.forEach.call(options, function (option) {
    option.onclick = function (event) {
        event.preventDefault();
        var getDataView = option.dataset.view;
        var getView = document.querySelector("#" + getDataView);
        if (!(option.classList.contains('clicked'))) {
            registerSound('../sounds/beep.mp3');
            option.classList.add('clicked');
            setTimeout(function () {
                loadNewView(getView);
                option.classList.remove('clicked');
            }, 900);
        }
    };
});
