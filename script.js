// Убираем фокус с кнопки после клика
document.querySelector('.main-button').addEventListener('mouseup', function () {
    this.blur(); // Убираем фокус после клика
  }); 

// Смена маскота

let mascotMobile, mascotDesktop;

document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы маскота
  mascotMobile = document.getElementById('mascot-mobile');
  mascotDesktop = document.getElementById('mascot-desktop');
  
  // Проверка, что хотя бы один маскот найден
  if (mascotMobile || mascotDesktop) {
    console.log("Маскоты найдены в DOM");

    // Добавляем обработчик клика на оба маскота
    if (mascotMobile) {
      mascotMobile.addEventListener('click', function () {
        console.log("Маскот мобильной версии был кликнут!");
        changeMascotAnimation('mobile');
      });
    }
    if (mascotDesktop) {
      mascotDesktop.addEventListener('click', function () {
        console.log("Маскот десктопной версии был кликнут!");
        changeMascotAnimation('desktop');
      });
    }
  } else {
    console.log("Элемент маскота не найден.");
  }
});

function changeMascotAnimation(type) {
  console.log("Смена анимации началась");

  // Временно меняем на Landing2.gif для соответствующего маскота
  if (type === 'mobile') {
    mascotMobile.src = './pictures/Landing2.gif';
  } else if (type === 'desktop') {
    mascotDesktop.src = './pictures/Landing2.gif';
  }

  // Через 3 секунды возвращаем исходную анимацию
  setTimeout(() => {
    console.log("Возвращаем исходную анимацию");
    
    // Проверяем ширину экрана и меняем анимацию в зависимости от этого
    if (window.innerWidth <= 1200) {
      mascotMobile.src = './pictures/Landing1_mob.gif'; // для мобильных
    } else {
      mascotDesktop.src = './pictures/Landing1.gif'; // для десктопов
    }
  }, 3000); // Через 3 секунды (3000 миллисекунд)
}

/* Интерактив в функциях */

const features = document.querySelectorAll(".feature");
const checkboxes = document.querySelectorAll(".checkbox");

// Инициализация начального состояния
features.forEach((feature, index) => {
  if (index === 0) {
    feature.classList.add("active"); // Первая группа активна
    feature.classList.remove("inactive");
    checkboxes[index].classList.remove("checked");
    console.log(`Feature ${index + 1} initially set to active.`);
  } else {
    feature.classList.remove("active"); // Остальные группы неактивны
    feature.classList.add("inactive");
    checkboxes[index].classList.remove("checked");
    console.log(`Feature ${index + 1} initially set to inactive.`);
  }
});

// Обработчик кликов по чекбоксам
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    console.log(`Checkbox ${index + 1} clicked. Checked: ${checkbox.classList.contains("checked")}`);

    if (!checkbox.classList.contains("checked")) {
      // Активируем текущую группу
      features[index].classList.add("active");
      features[index].classList.remove("inactive");
      checkboxes[index].classList.add("checked");
      console.log(`Feature ${index + 1} opacity set to 1`);

      // Если есть следующая группа, делаем её активной (прозрачность 100%)
      if (index + 1 < features.length) {
        features[index + 1].classList.add("active");
        features[index + 1].classList.remove("inactive");
        console.log(`Feature ${index + 2} opacity set to 1 (next feature activated)`);
      }
    } else {
      // Если чекбокс активен, делаем все последующие группы неактивными
      for (let i = index; i < features.length; i++) {
        features[i].classList.remove("active");
        features[i].classList.add("inactive");
        checkboxes[i].classList.remove("checked");
        console.log(`Feature ${i + 1} opacity set to 0.4`);
      }
    }
  });
});

/* Смена отзывов */

// Элементы DOM
const reviewsContainer = document.querySelector('.reviews-container');
const leftArrow = document.querySelector('.left-review-arrow');
const rightArrow = document.querySelector('.right-review-arrow');
const progressBar = document.querySelector('.progress-indicator');
const avatars = document.querySelectorAll('.img_mob'); // Аватарки для мобильных устройств

// Переменные для управления слайдером
let currentIndex = 0; // Текущий индекс слайда
const reviews = document.querySelectorAll('.review'); // Все отзывы
const totalReviews = reviews.length; // Общее количество отзывов
let reviewsPerSlide = getReviewsPerSlide(); // Количество отзывов на экране
let totalSlides = Math.ceil(totalReviews / reviewsPerSlide); // Общее количество слайдов
let progressStep = 512 / totalSlides; // Шаг прогресса

// Функция для определения количества отзывов на экране
function getReviewsPerSlide() {
  if (window.innerWidth >= 375 && window.innerWidth < 720) {
    return 1; // Мобильные устройства — один отзыв
  } else if (window.innerWidth >= 720) {
    return 2; // Планшеты и десктопы — два отзыва
  } else {
    return 1; // По умолчанию (если слишком маленький экран)
  }
}

// Функция обновления прогресс-бара
function updateProgress() {
  const progressValue = Math.min((currentIndex + 1) * progressStep, 512);
  progressBar.style.width = `${(progressValue / 512) * 100}%`;
  document.querySelector('.current-progress').textContent = Math.round(progressValue);
}

// Функция обновления видимости аватарок
function updateAvatars() {
  avatars.forEach((avatar, index) => {
    if (window.innerWidth >= 375 && window.innerWidth < 720) {
      // Показываем аватарки только для мобильной версии
      const isVisible =
        index >= currentIndex * reviewsPerSlide &&
        index < (currentIndex + 1) * reviewsPerSlide;
      avatar.style.display = isVisible ? 'block' : 'none';
    } else {
      // Скрываем аватарки на планшетах и десктопах
      avatar.style.display = 'none';
    }
  });
}

// Функция для обновления видимости отзывов (только 2 на экране)
function updateReviews() {
  reviews.forEach((review, index) => {
    const isVisible =
      index >= currentIndex * reviewsPerSlide &&
      index < (currentIndex + 1) * reviewsPerSlide;
    review.style.display = isVisible ? 'block' : 'none';
  });
}

// Функция для перемещения слайдера
function moveSlider(direction) {
  // Обновляем индекс с учётом направления
  currentIndex = Math.max(0, Math.min(currentIndex + direction, totalSlides - 1));

  // Обновляем отзывы
  updateReviews();
  updateProgress(); // Обновляем прогресс-бар
  updateAvatars(); // Обновляем видимость аватарок
}

// События для стрелок
leftArrow.addEventListener('click', () => moveSlider(-1));
rightArrow.addEventListener('click', () => moveSlider(1));

// Адаптация при изменении размера окна
window.addEventListener('resize', () => {
  // Пересчитываем количество отзывов на экране
  reviewsPerSlide = getReviewsPerSlide(); // 2 отзыва для планшетов и десктопов, 1 для мобильных
  totalSlides = Math.ceil(totalReviews / reviewsPerSlide); // Пересчитываем общее количество слайдов
  progressStep = 512 / totalSlides; // Пересчитываем шаг прогресса
  moveSlider(0); // Обновляем слайдер при изменении размера окна
});

// Инициализация
updateReviews(); // Показываем только первые два отзыва при инициализации
updateProgress();
updateAvatars(); // Показываем аватарки для мобильной версии

/*Раскрытие меню*/
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const menuList = document.querySelector('.menu-list');
  const menuLinks = document.querySelectorAll('.menu-list a'); // Все ссылки в меню

  // Обработчик клика на иконке
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active'); // Поворот иконки
    menuList.classList.toggle('active'); // Раскрытие/закрытие меню
  });

  // Закрытие меню при клике на ссылку
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('active'); // Убираем активное состояние с иконки
      menuList.classList.remove('active'); // Закрываем меню
    });
  });

  // Закрытие меню при прокрутке страницы
  window.addEventListener('scroll', () => {
    // Проверка, если меню раскрыто
    if (menuList.classList.contains('active')) {
      menuIcon.classList.remove('active'); // Убираем активное состояние с иконки
      menuList.classList.remove('active'); // Закрываем меню
    }
  });
});

// Получаем кнопку по ID
const button1 = document.getElementById('main-button-1');
const button6 = document.getElementById('main-button-6');

// Добавляем обработчик события на клик
button1.addEventListener('click', () => {
  // Переход по ссылке при клике
  window.location.href = 'https://www.figma.com/design/Q6trEzrWvENO7yOFGBElDp/%D0%92%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5?node-id=0-1&node-type=canvas&t=be32FgjUiBow3FfG-0'; // Укажите нужный URL
});

button6.addEventListener('click', () => {
  // Переход по ссылке при клике
  window.location.href = 'https://www.figma.com/design/Q6trEzrWvENO7yOFGBElDp/%D0%92%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5?node-id=0-1&node-type=canvas&t=be32FgjUiBow3FfG-0'; // Укажите нужный URL
});