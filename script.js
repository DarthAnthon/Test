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