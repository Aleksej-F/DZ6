'use strict';




class Basket {  // корзина
    constructor() {
        this.segments = [];
    }
    /*
    completion() {  // наполнение корзины
        let a = Math.floor(Math.random() * (6) + 1);     // колличество товаров в корзине
        let title = ['кросовки', 'тапки', 'футболка', 'джинсы'];
        for (let i = 0; i < a; i++) {
            let productName = Math.floor(Math.random() * (3));            // выбор товара
            let quantity = Math.floor(Math.random() * (10) + 1);         // штук
            let productPrice = Math.floor(Math.random() * (300) + 50);  // цена
            this.segments.push(new Product(title[productName], quantity, productPrice));
        }
    }*/
    completion(product) {    // наполнение корзины
        let productName = catalog.segments[product].title;            // выбор товара
        let quantity = 1;         // штук
        for (let prod of this.segments){
            if (prod.title === productName) {
                ++prod.quantity;
                return;
            }
        }
        
        let productPrice = catalog.segments[product].price;  // цена
        this.segments.push(new Product(productName, quantity, productPrice));
    }
    renderingBasket(){      // отрисовка корзины
        let basket = document.getElementById('basket');
        basket.innerHTML = '';
        for (let i = 0; i<this.segments.length; i++ ){
        let productBasket = `
            <div class="product">
            <div>${this.segments[i].title}</div>
            <div>${this.segments[i].quantity}</div>
            <div class="price">${this.segments[i].price}</div>
            </div>
            `;
            
            basket.insertAdjacentHTML("beforeend", productBasket);
        }
    }
    countBasketPrice(){     // подсчет стоимости товара в корзине
        let total = 0;
        let quantity = 0;
        for (let i = 0; i<this.segments.length; i++ ){
            total += this.segments[i].quantity * this.segments[i].price;
            quantity += this.segments[i].quantity;
        }
        let board = document.getElementById('total');
        
        board.innerHTML = `В корзине: ${quantity} товаров на сумму ${total} рублей`;
    }
    
    getBasket() {            //создание окна корзины
        let board = document.getElementById('bask');
        board.className = 'basketwin';
        board.innerHTML = ` `;
    
        let productMarkup = `   
            <div class="product productzagl">
                <div>Наименование</div>
                <div>Колличество</div>
                <div>Цена</div>
            </div>
            <div id="basket"></div>
            <div class="productnav">
                <div id="total">Корзина пуста</div>
                <div class="butt"> <button data-some="clear">Очистить</button></div>
            </div>
        `;          // разметка корзины  
        //<button data-some="fill">Наполнить</button>
                   
        board.insertAdjacentHTML("afterbegin", productMarkup);
        
        const buttons = document.querySelectorAll('button'); //
        
        buttons.forEach(function(button) {   
            button.addEventListener('click', myCompl);   // вешаем слушатель на кнопки по клику
          
        });
    }   
} 
            
class Product {  // продукт
    constructor(title, quantity, price) {
        this.title = title;
        this.quantity = quantity;
        this.price = price;
    }
}


class Catalog {  // каталог
    constructor() {
        this.segments = [];
    }
    completion(){
        for (let a = 1; a < 8; ++a){
            let img = `img/rectangle_${a}.jpg`;
            let productName =`"rrrrr${a}"`;
            let productPrice = a * 100;
            let prod = new Product(productName, 1, productPrice);
            prod.slide = ["img/rectangle_1.jpg" ,"img/rectangle_2.jpg","img/rectangle_3.jpg","img/rectangle_4.jpg" ];
            prod.img = img;
            this.segments.push(prod);
        }
        console.log(catalog);
            
    }
 
    getCatalog() { // созадние окна каталога
    
        let board = document.getElementById('catalog');
        board.className = 'catalog';
        board.innerHTML = ` `;
        let y = Math.floor(Math.random() * (4) );
        for (let a = y; a < y+4; a++){
            let productMarkup = `   
            <div class="product-cont-elem">
                <img src="${catalog.segments[a].img}" alt="">
                <div class="product-cont-elem-img" data="${a}>
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
            butt[i].addEventListener('click', myClickToBasket);   // вешаем слушатель на кнопки по клику
            //butt1[i].addEventListener('click', myClickToSlaider);   // вешаем слушатель на изображение по клику
        };
    }

};


//console.log(catalogis);    

function myClickToBasket(params) {
    basket.completion(Number(this.getAttribute('data')));
    basket.countBasketPrice();
    basket.renderingBasket();
    //console.log('catalogis  ' + this.getAttribute('data'));
} 
 
function  myCompl(e) {     // клик по кнопкам
    //console.log(e.target.getAttribute('data-some'));
    if (e.target.getAttribute('data-some')== "clear"){ //очистка корзины
        //console.log("очистить");
        basket.segments=[];
        document.getElementById('basket').innerHTML = ` `;
        document.getElementById('total').innerHTML = `Корзина пуста`;
        //getBasket();
    }
}
/*
function myClickToSlaider(e){ //клик по товару для открытия слайдера
    let slade = `
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
    <script src="packages/slider/scripts/slider.js"></script>
    `
}*/

let basket = new Basket();      // создаем корзину 
let catalog = new Catalog();    // создаем каталог 
basket.getBasket();
catalog.completion();
catalog.getCatalog();