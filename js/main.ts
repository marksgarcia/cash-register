const pictures = [
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
]

const randomItems = ['gifts', 'cart', 'box', 'basket',
    'bag', 'gift', 'duck', 'elephant',
    'rabbit', 'dog', 'cat', 'car', 'bus',
    'jet', 'airplane', 'phone', 'school bus',
    'monster truck', 'sunglasses', 'hammer', 'screwdriver',
    'truck']

const generateRandomItem = () => {
    //     const randomSkuNumber = Math.floor(Math.random() * 1000000);
    const randomItemNumber = Math.floor(Math.random() * randomItems.length);
    const randomPrice = (Math.random() * (Math.random() * (100))).toFixed(2);

    const randomItem = {
        name: `Scanned Item`,
        image: randomItems[randomItemNumber],
        price: `$${randomPrice}`
    }

    return randomItem;
}

const updateTotal = (items: any, targetElement: HTMLElement) => {
    let updatedTotal = 0.00;

    items.forEach.call(items, (item) => {
        const itemCurrency = Number(item.innerHTML.replace(/[^0-9.-]+/g, ""));
        updatedTotal += itemCurrency;
    })

    targetElement.textContent = `$ ${updatedTotal.toFixed(2)}`;
}

const currentItems = (document.querySelectorAll<HTMLElement>('.item__price')) ? document.querySelectorAll<HTMLElement>('.item__price') : [];
const total = document.querySelector('.total__amount') as HTMLElement;
updateTotal(currentItems, total);

const registerSound = (src: string) => {
    const sound = document.createElement('audio');
    sound.src = src;
    sound.setAttribute('preload', 'audio');
    sound.setAttribute('controls', 'none');
    sound.style.display = 'none';
    sound.play();

    document.body.appendChild(sound);
}

const loadNewView = (targetContainer: HTMLElement) => {
    targetContainer.classList.remove('hidden');
    targetContainer.classList.add('visible');


    const id = targetContainer.id
    const list = targetContainer.querySelector(`.${id}__list`)

    switch (id) {
        case 'pictures':
            pictures.forEach.call(pictures, (picture) => {
                const item = picture.item;
                const cost = picture.price;

                list.appendChild(createItem(item, cost));
            })
            break;

        case 'scan':
            targetContainer.appendChild(createScanner());
            break;

        case 'pay':
            targetContainer.appendChild(createPaymentOptions());
            break;
    }
}

const createItem = (name: string, cost: string) => {
    const item = document.createElement('li');
    item.className = 'item__picture';
    item.appendChild(createItemLink(name, cost));
    return item;
}

const createItemLink = (name: string, cost: string) => {
    const itemTitle = name.charAt(0).toUpperCase() + name.slice(1)
    const imageName = name.replace(' ', '_');

    const itemLink = document.createElement('a');
    itemLink.className = 'item__link waves-effect waves-dark';
    itemLink.innerHTML = `<span class="item__title">${itemTitle}</span>` +
        `<img src="images/svgs/${imageName}.svg" alt="${itemTitle} icon"/>` +
        `<span class="item__cost">${cost}</span>`

    itemLink.onclick = (event) => {
        event.preventDefault();
        registerSound('../sounds/beep.mp3');
        if (!(itemLink.classList.contains('clicked'))) {
            itemLink.classList.add('clicked');
            addToRegister(itemTitle, cost);
            const currentItems = (document.querySelectorAll<HTMLElement>('.item__price')) ? document.querySelectorAll<HTMLElement>('.item__price') : [];
            const total = document.querySelector('.total__amount') as HTMLElement;
            updateTotal(currentItems, total);

            const parentView = itemLink.closest('.view');
            setTimeout(() => {
                parentView.classList.add('hidden');
                parentView.classList.remove('visible');
                parentView.querySelector('ul').innerHTML = '';
                itemLink.classList.remove('clicked');
            }, 1000);
        }
    }
    return itemLink;
}

const createScanner = () => {
    const scannerWrapper = document.createElement('div');
    scannerWrapper.className = 'scanner-wrapper';
    scannerWrapper.innerHTML = '<span class="quadrant upper-left"></span><span class="quadrant upper-right"></span><span class="quadrant lower-left"></span><span class="quadrant lower-right"></span>'
    scannerWrapper.appendChild(createScanButton());
    return scannerWrapper;

}

const createScanButton = () => {
    const scanButton = document.createElement('a');
    scanButton.href = '#'
    scanButton.className = 'scan-button waves-effect waves-light'
    scanButton.innerHTML = 'Press to Scan'
    scanButton.onclick = (event) => {
        event.preventDefault();
        scanButton.closest('.scanner-wrapper').classList.add('activated');
        registerSound('../sounds/scanner.mp3');

        const randomItem = generateRandomItem();
        addToRegister(randomItem.name, randomItem.price, randomItem.image);
        const currentItems = (document.querySelectorAll<HTMLElement>('.item__price')) ? document.querySelectorAll<HTMLElement>('.item__price') : [];
        const total = document.querySelector('.total__amount') as HTMLElement;
        updateTotal(currentItems, total);
        setTimeout(() => {
            const parent = scanButton.closest('.view')
            parent.classList.add('hidden');
            parent.classList.remove('visible');
            parent.innerHTML = '';
        }, 1500)
    }

    return scanButton;

}

const processingPayment = () => {
    const processing = document.createElement('div');
    processing.className = 'processing-container';
    processing.innerHTML = '<i class="fad fa-spinner-third"></i><span>Processing Payment</span>';
    return processing;
}

const thanks = () => {
    const thanksContainer = document.createElement('div');
    thanksContainer.className = 'thanks-container'
    thanksContainer.innerHTML = '<img src="images/svgs/thanks.svg" />'
    return thanksContainer;
}


const paymentAnimation = (name:string) => {

    const animations = [
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
    ]
    
    let setHTML

    for (let animation of animations) {
        if (animation.name === name) {
            setHTML = animation.html
        }
    }

    const animationContainer = document.createElement('div')
    animationContainer.className = 'animation-container'
    animationContainer.innerHTML = setHTML;
    return animationContainer;

}

const payNowButton = (name: string) => {
    const payNow = document.createElement('a')
    payNow.className = `pay-now-button waves-effect waves-light ${name.replace(' ', '-')}`
    payNow.innerHTML = 'Pay Now'
    payNow.onclick = (event) => {
        event.preventDefault();
        registerSound(`../sounds/${name.replace(' ', '-')}.mp3`);
        const parent = payNow.closest('.view');
        
        setTimeout(() => {
            parent.innerHTML = ''
            parent.appendChild(processingPayment())
            const registerList = document.querySelector('.items__list') as HTMLElement;
            registerList.innerHTML = '';
            const currentItems = (document.querySelectorAll<HTMLElement>('.item__price')) ? document.querySelectorAll<HTMLElement>('.item__price') : [];
            const total = document.querySelector('.total__amount') as HTMLElement;
            updateTotal(currentItems, total);
        }, 1000);

        setTimeout(() => {
            parent.innerHTML = ''
            parent.appendChild(thanks())
            registerSound('../sounds/grunt-birthday-party.mp3');
        }, 3000)

        setTimeout(() => {
            parent.innerHTML = ''
            parent.classList.remove('visible');
            parent.classList.add('hidden');
        }, 8000)
    }
    return payNow;
}

const createPaymentPanel = (name: string) => {
    const paymentUI = document.createElement('div')
    paymentUI.className = `payment-ui ${name}`;
    paymentUI.appendChild(paymentAnimation(name));
    paymentUI.appendChild(payNowButton(name));
    return paymentUI;
}

const createPaymentButton = (name: string, icon: string, waves: string) => {
    const paymentButton = document.createElement('a');
    paymentButton.className = `payment-button ${waves} ${name.replace(' ', '-')}`;
    paymentButton.innerHTML = `${icon}<span>${name}</span>`

    paymentButton.onclick = (event) => {
        event.preventDefault();
        registerSound('../sounds/beep.mp3');
        setTimeout(() => {
            const parentView = paymentButton.closest('.view')
            parentView.innerHTML = '';
            parentView.appendChild(createPaymentPanel(name));
        }, 1000);
    }
    return paymentButton;
}

const createPaymentOptions = () => {

    const payments = [
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
    ]

    const paymentsWrapper = document.createElement('div');
    paymentsWrapper.className = 'payments-wrapper';

    const paymentsList = document.createElement('ul')
    paymentsList.className = 'payments__list'

    payments.forEach.call(payments, (payment: Object) => {
        const paymentListItem = document.createElement('li')
        paymentListItem.className = 'payment__list__item'

        paymentListItem.appendChild(createPaymentButton(payment['name'], payment['icon'], payment['waves']));
        paymentsList.appendChild(paymentListItem);
    })

    paymentsWrapper.appendChild(paymentsList);
    return paymentsWrapper;
}

const addToRegister = (name: string, cost: string, scanned?: string) => {
    const register = document.querySelector('.register ul.items__list') as HTMLElement;
    register.appendChild(createRegisterItem(name, cost, scanned))
}

const createRegisterItem = (name: string, cost: string, scanned?: string) => {
    let itemName;

    if (name === 'Scanned Item') {
        itemName = scanned
    } else {
        itemName = name
    }
    console.log(itemName)
    const nameForSrc = itemName.toLowerCase().replace(' ', '_')

    const lineItem = document.createElement('li')
    lineItem.className = 'item'
    lineItem.innerHTML = `<span class="item__desc">${name}</span>` +
        `<img class="item__image" src="images/svgs/${nameForSrc}.svg" />` +
        `<span class="item__price">${cost}</span>`
    return lineItem;
}

const options = document.querySelectorAll<HTMLElement>('.options__list li a');

options.forEach.call(options, (option) => {

    option.onclick = (event) => {
        event.preventDefault();

        const getDataView = option.dataset.view
        const getView = document.querySelector(`#${getDataView}`) as HTMLElement;
        if (!(option.classList.contains('clicked'))) {
            registerSound('../sounds/beep.mp3');
            option.classList.add('clicked')
            setTimeout(() => {
                loadNewView(getView);
                option.classList.remove('clicked');
            }, 900);
        }

    }
})