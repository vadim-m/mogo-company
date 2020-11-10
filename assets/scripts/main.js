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
  };

  /* SMOOTH SCROLL */
  // в html необходимо добавить в каждый элемент навигации data-атрибут: data-scroll,
  // значением которого будет айди нужной секции.
  //  $('[data-scroll]') --> выбрать элементы с атрибутом data-scroll! Просто селектор.
  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();

    // получаем значение атрибута, по которому кликнули
    const blockId = $(this).data('scroll');

    // получаем значение отсутпа от верха страницы элемента с нужным айди
    const blockOffset = $(blockId).offset().top;

    // реализация самого перехода к нужной секции при помощи jquerry - animate().
    // отнимаю 25, чтобы скролл был чуть выше нужного блока - так красивее.
    $('html, body').animate({
      scrollTop: blockOffset
    }, 600);

    // меняем класс active у выбранного элемента и удаляем у соседних
    $(event.currentTarget).addClass('active');
    $(event.currentTarget).siblings().removeClass('active');

    // удаление классов active после нажатия нужного пункта навигации
    $('#nav').toggleClass('active');
    $('#burger-menu').toggleClass('active');
  });

  //отдельная обработка клика на logo MoGo
  $('#logo').on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 600);;
  });

  //отдельная обработка клика на кнопку Learn more
  $('#intro-btn').on('click', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: introHeight
    }, 600);;
  });

  /* BURGER MENU */
  // добавление/удаление классов active после нажатия на бургер меню
  $('#burger-menu').on('click', function (event) {
    event.preventDefault();

    $('#nav').toggleClass('active');
    $('#burger-menu').toggleClass('active');
  });

  /* ACCORDION */
  // делаем по аналогии с навигацией при помощи data- атрибута. кликаем по 
  // accordion__header, на котором есть data- атрибут со значением нужного айди
  // #accitem, которому нужно добавить класс active, для работы стилей и появление текста.
  $('[data-collapse]').on('click', function (event) {
    event.preventDefault();

    // получаем значение атрибута - то есть айдишник нужного accordion__item
    const blockId = $(this).data('collapse');
    // снимаем или ставим класс нужному item
    $(blockId).toggleClass('active');
    // удаляем класс у соседних
    $(blockId).siblings().removeClass('active');
  });

});