$(function () {

  /* CONST */
  // элементы страницы по id 
  const header = $('#header');

  // высота секции intro 
  const introHeight = $('#intro').innerHeight();

  // получение текущей высоты с учетом прокрутки
  let scrollOfFset = $(window).scrollTop();


  /* RUNNING FUNC */
  // запущенные сразу функции
  checkScroll(scrollOfFset);


  /* HEADER--FIXED */
  // появление header--fixed после прокрутки секции intro по событию scroll
  $(window).on('scroll', function () {
    scrollOfFset = $(this).scrollTop();

    checkScroll(scrollOfFset);
  });

  // функция, которая проверяет величину скролла для выдачи класса хедеру.
  // её запускаем сразу при загрузки скрипта (выше), чтобы если нажал F5 
  // проверка прошла с текущей высоты, без события скролл.
  function checkScroll(scrollOfFset) {

    if (scrollOfFset >= introHeight) {
      header.addClass('header--fixed');
    } else {
      header.removeClass('header--fixed');
    }
  }

  /* SMOOTH SCROLL */
  // в html необходимо добавить в каждый элемент навигации data-атрибут: data-scroll.
  // значением будет айди нужной секции.
  //  $('[data-scroll]') --> выбрать элементы с атрибутом data-scroll!Просто селектор.
  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();

    // получаем значение атрибута, по которому кликнули
    const blockId = $(this).data('scroll');
    
    // получаем значение отсутпа от верха страницы элемента с нужным айди
    const blockOffset = $(blockId).offset().top;
    
    // реализация самого перехода к нужной секции при помощи jquerry - animate().
    // отнимаю 25, чтобы скролл был чуть выше нужного блока - так красивее.
    $('html, body').animate({
      scrollTop: blockOffset - 25
    }, 600);
    
    // меняем класс active у выбранного элемента и удаляем у соседних
    $(event.currentTarget).addClass('active');
    $(event.currentTarget).siblings().removeClass('active');

    // удаление классов active после нажатия нужного пункта навигации
    $('#nav').toggleClass('active');
    $('#burger-menu').toggleClass('active');
  })


  /* BURGER MENU */
  // добавление/удаление классов active после нажатия на бургер меню
  $('#burger-menu').on('click', function (event) {
    event.preventDefault();

    $('#nav').toggleClass('active');
    $('#burger-menu').toggleClass('active');
  });

  /* */
});