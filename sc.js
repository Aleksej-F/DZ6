'use strict';

let basket = {  // корзина
    
    segments : [],  // товары в корзине
       
    completion (product) {    // добавление товара в корзину
        let productName = catalog.segments[product].title;            // выбор товара
        let quantity = 1;         // штук по умолнанию
        for (let prod of this.segments){   //перебор товаров в корзине
            if (prod.title === productName) {  // если добавленный товар есть в корзине
                ++prod.quantity;               // увеличиваем кол-во штук в корзине
                return;
            }
        }
        
        let productPrice = catalog.segments[product].price;  // цена
        this.segments.push(new Product(productName, quantity, productPrice)); // добавляем товар в корзину
    },

    renderingBasket() {      // отрисовка товаров в корзине
        let bask = document.getElementById('basket');
        bask.innerHTML = '';
        
        for (let i = 0; i<this.segments.length; i++ ){
            let productBasket = `
            <div class="product">
            <div>${this.segments[i].title}</div>
            <div>${this.segments[i].quantity}</div>
            <div class="price">${this.segments[i].price}</div>
            <div> <i class="fas fa-times-circle basket-to-del" data="${i}"></i></div>
            </div>
            `;
            bask.insertAdjacentHTML("beforeend", productBasket);
            
            let divI = document.getElementsByClassName('basket-to-del');
                        
            divI[divI.length-1].addEventListener('click', basket.dellBasket);
           
        }
            
                  //  images.setNextLeftImage();            });
    },
    countBasketPrice() {     // подсчет стоимости товара в корзине
        let total = 0;
        let quantity = 0;
        for (let i = 0; i<this.segments.length; i++ ){
            total += this.segments[i].quantity * this.segments[i].price;
            quantity += this.segments[i].quantity;
        }
        let board = document.getElementById('total');
        
        board.innerHTML = `В корзине: ${quantity} товаров на сумму ${total} рублей`;
    },

    getBasket(){            // создание окна корзины
        let board = document.getElementById('bask');
        board.className = 'basketwin';
        board.innerHTML = ` `;
    
        let productMarkup = `   
            <div class="product productzagl">
                <div>Наименование</div>
                <div>Колличество</div>
                <div>Цена</div>
                <div></div>
            </div>
            <div id="basket"></div>
            <div class="productnav">
                <div id="total">Корзина пуста</div>
                <div class="butt"> <button data-some="clear">Очистить</button></div>
            </div>
        `;          // разметка корзины  
        
                   
        board.insertAdjacentHTML("afterbegin", productMarkup);
        
        const buttons = document.querySelectorAll('button'); //
        
        buttons.forEach(function(button) {   
            button.addEventListener('click', basket.clearBasket);   // вешаем слушатель на кнопки по клику очистка корзины
          
        });
    },  
    clearBasket() {         // очистка корзины
        this.segments=[];
        document.getElementById('basket').innerHTML = ` `;
        document.getElementById('total').innerHTML = `Корзина пуста`;
    },
    
    dellBasket (e) {          // удаление товара из корзины
        let node = e.target;
        let nodeDel = node.parentNode.parentNode;
        node.parentNode.parentNode.parentNode.removeChild(nodeDel);
        basket.segments.splice(this.getAttribute('data'),1);
        if (basket.segments.length === 0) {
            basket.clearBasket();
        } else {
            basket.countBasketPrice();
        }
    },
} 

            
class Product {  // продукт
    constructor(title, quantity, price) {
        this.title = title;
        this.quantity = quantity;
        this.price = price;
    }
}

let catalog = {  // каталог
    
    segments : [], // товары в катологе

    completion(){ // наполнение каталога
        for (let a = 1; a < 9; ++a){
            let productName =`"rrrrr${a}"`;
            let productPrice = a * 100;
            let prod = new Product(productName, 1, productPrice);
            prod.slide = ["img/rectangle_1.jpg" ,"img/rectangle_2.jpg","img/rectangle_3.jpg","img/rectangle_4.jpg" ];
            prod.img = `img/rectangle_${a}.jpg`;
            this.segments.push(prod);
        }
    },

    getCatalog() { // создание окна каталога
        let board = document.getElementById('catalog');
        board.className = 'catalog';
        board.innerHTML = ` `;
        let y = Math.floor(Math.random() * (4) );
        for (let a = y; a < y+4; a++){
            let productMarkup = `   
            <div class="product-cont-elem">
                <img src="${catalog.segments[a].img}" alt="">
                <div class="product-cont-elem-img" >
                    <div class="product-cont-elem-img-1" data="${a}">
                        <img src="img/forma_1_copy_1287.png" alt="">
                        <p>Add to Cart</p>
                    </div>
                </div>
                <div class="product-cont-elem-text">
                    <p class="product-cont-img-p1">${catalog.segments[a].title}</p>
                    <p class="product-cont-img-p2">$${catalog.segments[a].price}</p>
                </div>
            </div>
            `;          // разметка каталога
            
            board.insertAdjacentHTML("beforeend", productMarkup);
    
        }
        const butt = document.getElementsByClassName('product-cont-elem-img-1'); //
        const butt1 = document.getElementsByClassName('product-cont-elem'); //
        for (let i = 0; i < butt.length; i++) {   
            butt[i].addEventListener('click', catalog.myClickToBasket);   // вешаем слушатель на кнопки по клику для добавления товара в корзину
            butt1[i].addEventListener('click', myClickToSlaider);   // вешаем слушатель на изображение по клику для открытия слайдера
        };
    },

    myClickToBasket(e) {   // клик по кнопке добавить товар в корзину 
        e.stopPropagation();
        basket.completion(Number(this.getAttribute('data')));   // добавить товар
        basket.countBasketPrice();   // пересчет стоимости в корзине
        basket.renderingBasket();   // отрисовка корзины
    }, 


};


function myClickToSlaider(e){ // клик по товару для открытия слайдера
    
    let slade = `
    <div class="slider-win">
        <div class="slider" data-width="720px" data-height="480px">
            <div class="slider-item hidden-slide">
                <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[0]} alt="">
            </div>
            <div class="slider-item hidden-slide">
                <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[1]} alt="">
            </div>
            <div class="slider-item hidden-slide">
                <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[2]} alt="">
            </div>
        </div>
    </div>
    `
    document.getElementById('catalog').insertAdjacentHTML("afterend", slade);

    let slider = document.querySelector('.slider');

    // Создаем иконку загрузки
    //let loadIcon = document.createElement('i');
    //loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
    //slider.insertAdjacentElement("afterbegin", loadIcon);
    
    // Создаем левую стрелку
    let leftArrow = document.createElement('i');
    leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
    slider.insertAdjacentElement("beforeend", leftArrow);
    
    // Создаем правую стрелку
    let rightArrow = document.createElement('i');
    rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
    slider.insertAdjacentElement("beforeend", rightArrow);
    
    // Создаем кнопку закрытия
    let closedCaptioning = document.createElement('i');
    closedCaptioning.classList.add('fas', 'fa-times', 'closed-captioning');
    slider.insertAdjacentElement("beforeend", closedCaptioning);
    

    setSizes(slider);
    images.init();

    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });
    
    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });
    
    closedCaptioning.addEventListener('click', function () {
        images.closedImage();
    });

    window.addEventListener('load', function () {
        
    
        // Инициализация слайдера
        images.init();
        // Скрываем иконку загрузки
        hideLoadIcon(loadIcon);
    });
   
}

basket.getBasket();             // отрисовка корзины
catalog.completion();           // наполнение каталога
catalog.getCatalog();           // отрисовка каталога

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

// Ждем когда весь контент целиком загрузится

/**
 * Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon 
 */
function hideLoadIcon(loadIcon) {
    loadIcon.style.display = "none";
}
/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider 
 */
function setSizes(slider) {
    let width = slider.getAttribute("data-width");
    let height = slider.getAttribute("data-height");
    if (width !== null && width !== "") {
        slider.style.width = width;
    }
    if (height !== null && height !== "") {
        slider.style.height = height;
    }
}

let images = {  // Объект слайдера
    /* {int} Номер текущего изображения */
    currentIdx: 0,

    /* {HTMLDivElement[]} slides элементы слайдов */
    slides: [],
    
    /** Получаем все слайды и показываем первый слайд. */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
    },

    /** Берем слайд с текущим индексом и убираем у него класс
     * hidden-slide. */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    },

    /** Видимому (текущему) слайду добавляем класс hidden-slide. */
      hideVisibleImage() {
        this.slides[this.currentIdx].classList.add("hidden-slide");
      },

    /** Переключиться на предыдущее изображение. */
    setNextLeftImage() {
        this.hideVisibleImage();
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        this.showImageWithCurrentIdx();
    },

    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        this.hideVisibleImage();
        if (this.currentIdx == this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        this.showImageWithCurrentIdx();
    },
    
    /** Закрыть слайдер. */
    closedImage() {
        let node = document.querySelector('.slider-win');
        node.parentNode.removeChild(node);
        
    },
}
