// Счётчик до свадьбы
function updateCountdown() {
    const weddingDate = new Date('May 16, 2026 12:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div><span>${days}</span><br>дней</div>
        <div><span>${hours}</span><br>часов</div>
        <div><span>${minutes}</span><br>минут</div>
        <div><span>${seconds}</span><br>секунд</div>
    `;
}

// Обновляем каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

// Простая галерея (если нужно)
const images = document.querySelectorAll('.gallery img');
images.forEach(img => {
    img.addEventListener('click', () => {
        // Можно добавить модальное окно для просмотра фото
        alert('Нажмите правой кнопкой → "Сохранить изображение"');
    });
});

// ===================== СЛАЙДЕР ФОТОГРАФИЙ =====================

class PhotoSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
        
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoPlayDelay = 5000; // 5 секунд
        
        this.init();
    }
    
    init() {
        // Инициализация первого слайда
        this.showSlide(this.currentSlide);
        
        // Запуск автоматической прокрутки
        this.startAutoPlay();
        
        // Добавление обработчиков событий
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });
        
        // Обработчики для точек
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
                this.resetAutoPlay();
            });
        });
        
        // Пауза при наведении
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Поддержка свайпов на мобильных
        this.setupTouchEvents();
    }
    
    showSlide(index) {
        // Скрываем все слайды
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убираем активный класс со всех точек
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем текущий слайд и активируем точку
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        // Обновляем текущий слайд
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0; // Возвращаемся к первому слайду
        }
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1; // Переходим к последнему слайду
        }
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Останавливаем предыдущий интервал, если был
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoPlay();
        });
        
        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoPlay();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50; // Минимальное расстояние свайпа
        
        if (startX - endX > swipeThreshold) {
            // Свайп влево = следующий слайд
            this.nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Свайп вправо = предыдущий слайд
            this.prevSlide();
        }
    }
}

// Инициализация слайдера когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    const slider = new PhotoSlider();
    
    // Дополнительно: добавление клавиатурной навигации
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                slider.prevSlide();
                slider.resetAutoPlay();
                break;
            case 'ArrowRight':
                slider.nextSlide();
                slider.resetAutoPlay();
                break;
            case ' ':
                e.preventDefault();
                if (slider.slideInterval) {
                    slider.stopAutoPlay();
                } else {
                    slider.startAutoPlay();
                }
                break;
        }
    });
});