'use strict';
document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

let basket = {  // корзина
    
    segments : [],  // товары в корзине

    open : true,

    total: {}, // стоимость товаров в ко
      
    addProductToCart (product) {    // добавление товара в корзину
        let productName = catalog.segments[product].title;            // выбор товара
        let quantity = 1;         // штук по умолнанию
        for (let prod of this.segments){   //перебор товаров в корзине
            if (prod.title === productName) {  // если добавленный товар есть в корзине
                ++prod.quantity;               // увеличиваем кол-во штук в корзине
                return;
            }
        }
        let productPrice = catalog.segments[product].price;  // цена
        this.segments.push(new Product({title:productName, quantity:quantity, price:productPrice})); // добавляем товар в корзину
    },

    renderingBasket() {             // отрисовка товаров в корзине
        let bask = document.getElementById('basket');
        bask.innerHTML = '';
            
        for (let i = 0; i < this.segments.length; i++ ){     //
            let productBasket = `
            <div class="product">
                <div>${this.segments[i].title}</div>
                <div>${this.segments[i].quantity}</div>
                <div class="price">${this.segments[i].price}</div>
                <div> <i class="fas fa-times-circle basket-to-del" data="${i}"></i> </div>
            </div>
            `;
            bask.insertAdjacentHTML("beforeend", productBasket);
        }
        
        const total = this.countBasketPrice();
        let board = document.getElementById('total');
        if (total.quantity === 0) {
            board.innerHTML = `Корзина пуста`;
        } else{
            board.innerHTML = `В корзине: ${total.quantity} товаров на сумму ${total.total} рублей`;
        };
            
    },

    countBasketPrice() {           // подсчет стоимости товара в корзине
        let total = 0;
        let quantity = 0;
        for (let i = 0; i<this.segments.length; i++ ){
            total += this.segments[i].quantity * this.segments[i].price;
            quantity += this.segments[i].quantity;
        }
        
        return {quantity:quantity, total:total};
    },

    createBasket(){                 // создание окна корзины
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
                <div class="butt"> 
                    <button data-some="clear">Очистить</button> 
                    <button data-some="further">Далее</button>
                </div>
            </div>
        `;          // разметка корзины  
                       
        board.insertAdjacentHTML("afterbegin", productMarkup);
        
        let bord = document.getElementById('basket');
        bord.addEventListener('click',(event) => {this.proructDelBasket(event)});
        
        let butt = document.querySelector('.butt');
        butt.addEventListener('click',(event) => {this.clickButtonBasket(event)});
       
    },  
    
    clickButtonBasket(event) {      // обработчик клика по кнопкам навигации корзины
       
        switch (event.target.getAttribute('data-some')) {
            case "clear" :
                this.clearBasket();
                break;
            case "further" :
                this.further();
                break;
            
            case "back" :
                this.backToBasket();
                break;   
            case "furtherD" :
                this.furtherD();
                break; 
            
            case "stop" :
                this.stop();
                break; 
        
            }
    },

    clearBasket() {                 // очистка корзины
        this.segments = [];
        document.getElementById('basket').innerHTML = ` `;
        document.getElementById('total').innerHTML = `Корзина пуста`;
    },
    
    proructDelBasket (event) {       // удаление товара из корзины
        let node = event.target;
        let nodeDel = node.parentNode.parentNode;
        node.parentNode.parentNode.parentNode.removeChild(nodeDel);
        basket.segments.splice(event.target.getAttribute('data'),1);
        if (basket.segments.length === 0) {
            basket.clearBasket();
        } else {
            basket.countBasketPrice();
        }
    },

    further(e){                     // далее на адрес доставки
        this.open = false;
        
        let board = document.getElementById('bask');
        board.classList.add('bask-d');
                
        let productBasket = `
            <div class="address">
                <div class="shopping-cart_form_col">
                        <h3 class="shopping-cart_z">Адрес доставки</h3>
                        <input class="country" placeholder="Bangladesh" pattern="\S+[А-яа-я]">
                        <input class="country" placeholder="State" pattern="\S+[А-яа-я]">
                        <input class="country" placeholder="Postcode / Zip" pattern="\S+[А-яа-я]">
                        <div class="shopping-cart_button_2" >
                            <p>get a quote</p>
                        </div>
                </div>
                <div class="productnav">
                    <div id="total"></div>
                    <div class="butt"> 
                        <button data-some="back">Назад</button> 
                        <button data-some="furtherD">Далее</button>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            board.innerHTML = '';
            board.insertAdjacentHTML("beforeend", productBasket);
            let butt = document.querySelector('.butt');
            butt.addEventListener('click',(event) => {this.clickButtonBasket(event)});
            board.classList.remove('bask-d');
           
        }, 500);
    },

    furtherD(){                     // далее на отзывы
        let board = document.getElementById('bask');
        board.classList.add('bask-d');
                
        let productBasket = `
            <div class="reviews">
                <div class="shopping-cart_form_col">
                        <h3 class="shopping-cart_z">Оставить отзыв</h3>
                </div>
                <div class="productnav">
                    <div id="total"></div>
                    <div class="butt"> 
                        <button data-some="further">Назад</button> 
                        <button data-some="stop">Далее</button>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            board.innerHTML = '';
            board.insertAdjacentHTML("beforeend", productBasket);
            let butt = document.querySelector('.butt');
            butt.addEventListener('click',(event) => {this.clickButtonBasket(event)});
            board.classList.remove('bask-d');
        }, 500);
    },

    backToBasket(){                 // назад к корзине
        let board = document.getElementById('bask');
        board.classList.add('bask-d');
        setTimeout(() => {
            board.classList.remove('bask-d');
            basket.createBasket();
            basket.renderingBasket();
            basket.open = true;
        }, 500);
    },

    stop(){                          // далее от отзыва
    },
} 
            
class Product {  // продукт
    constructor(product = {}) {
        this.title = product.title;
        this.quantity = product.quantity;
        this.price = product.price;
    }
}

let catalog = {  // каталог
    
    segments : [], // товары в катологе

    addProductCatalog(){ // наполнение каталога
        for (let a = 1; a < 9; ++a){
            let productName =`"rrrrr${a}"`;
            let productPrice = a * 100;
            let prod = new Product({title:productName, quantity:1, price:productPrice});
            prod.slide = [`"img/rectangle_${a}.jpg"` ,"img/rectangle_2.jpg","img/rectangle_3.jpg","img/rectangle_4.jpg" ];
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
            <div class="product-cont-elem" data="${a}">
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
            butt[i].addEventListener('click', this.myClickToBasket);   // вешаем слушатель на кнопки по клику для добавления товара в корзину
            butt1[i].addEventListener('click', this.myClickToSlaider);   // вешаем слушатель на изображение по клику для открытия слайдера
        };
    },

    myClickToBasket(e) {   // клик по кнопке добавить товар в корзину 
        e.stopPropagation();
        if (basket.open) {  // если корзина открыта
            basket.addProductToCart(Number(this.getAttribute('data')));   // добавить товар в объект корзина
          //  basket.countBasketPrice();   // пересчет стоимости в корзине
            basket.renderingBasket();    // отрисовка корзины
        } else{
            alert('Вернитесь к корзине!');
        };
    }, 

    myClickToSlaider(e){ // клик по товару для открытия слайдера
        e.stopPropagation();
        let slade = `
        <div class="slider-win">
            <div class="slider" data-width="720px" data-height="480px">
                <div class="slider-item hidden-slide">
                    <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[0]} alt="">
                </div>
                <div class="slider-item hidden-slide">
                    <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[1]}  alt="">
                </div>
                <div class="slider-item hidden-slide">
                    <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[2]}  alt="">
                </div>
                <div class="slider-item hidden-slide">
                    <img src=${catalog.segments[Number(this.getAttribute('data'))].slide[3]}  alt="">
                </div>
            </div>
        </div>
        `
        document.getElementById('catalog').insertAdjacentHTML("afterend", slade);
    
        let slider = document.querySelector('.slider');
                
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
            images.setClosedSlaider();
        });
       
    },

};

basket.createBasket();                 // отрисовка корзины
catalog.addProductCatalog();           // наполнение каталога
catalog.getCatalog();                   // отрисовка каталога

/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider 
 */
function setSizes(slider) {   // размер картинки слайдера
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
    setClosedSlaider() {
        this.hideVisibleImage();
        this.currentIdx = 0;
        let node = document.querySelector('.slider-win');
        node.parentNode.removeChild(node);
    },
}
