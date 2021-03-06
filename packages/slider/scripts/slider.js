'use strict';

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

function createSlaider (e) { // отрисовка слайдера
        let slade = `
            <div class="slider-win">
                <div class="slider" data-width="720px" data-height="480px">
                    <div class="slider-item hidden-slide">
                        <img src=${catalog.segments[e].slide[0]} alt="">
                    </div>
                    <div class="slider-item hidden-slide">
                         <img src=${catalog.segments[e].slide[1]} alt="">
                    </div>
                    <div class="slider-item hidden-slide">
                        <img src=${catalog.segments[e].slide[2]} alt="">
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
       
        // Объект слайдера
        let images = {
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
