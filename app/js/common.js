$(function () {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	var sectionsSwiper = new Swiper('.swiper-container', {
		effect: 'fade',
		autoHeight: true,
		fadeEffect: { crossFade: true },
		direction: 'vertical',
		slidesPerView: 1,
		allowTouchMove: false,
		mousewheel: {
			eventsTarget: '.wrapper-content'
		},
		pagination: {
			el: '.nav-inner',
			clickable: true,
			renderBullet: function (index, className) {
				let nameSlide = this.slides[index].dataset.name,
					outterMenu = $('.nav-outter > .nav-outter__list'),
					indexAttr = index >= 9 ? index + 1 : '0' + parseInt(index + 1);

				outterMenu.append(`<li class="nav-outter__item" data-index="${index}">${nameSlide}</li>`);
				return '<span class="' + className + '" data-index="' + indexAttr + '">' + nameSlide + '</span>';
			},
		},
		on: {
			init: function () {
				let _self = this;

				var ts;
				$('.wrapper-content').bind('touchstart', function (e) {
					ts = e.originalEvent.touches[0].clientY;
				});

				$('.wrapper-content').bind('touchend', function (e) {
					var te = e.originalEvent.changedTouches[0].clientY;
					if (ts > te) {
						_self.slideNext();
					} else if (ts < te) {
						_self.slidePrev();
					}
				});
			},
		},
	});
	//navigation outter change section
	$('.nav-outter .nav-outter__item').click(function () {
		let itemMenu = $(this),
			index = itemMenu.data('index'),
			wrapper = $('.wrapper'),
			allItemMenu = $('.nav-outter > .nav-outter__list .nav-outter__item'),
			hamburger = $('.hamburger');

		sectionsSwiper.slideTo(index);
		allItemMenu.removeClass('nav-outter__item--active');
		itemMenu.addClass('nav-outter__item--active');
		wrapper.removeClass('wrapper--open');
		hamburger.removeClass('is-active');
	});
	//open outter menu
	$('.hamburger').click(function () {
		$('.wrapper').toggleClass('wrapper--open');
		$(this).toggleClass('is-active');
	});
	//when section change with scroll
	sectionsSwiper.on('slideChange', function () {
		let currentIndex = sectionsSwiper.activeIndex,
			itemsOutterMenu = $('.nav-outter .nav-outter__item');

		itemsOutterMenu.removeClass('nav-outter__item--active');
		itemsOutterMenu.parent().find(`[data-index=${currentIndex}]`).addClass('nav-outter__item--active');
	});

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	//fixes bug when change orientation, recalculete heigth swiperSlide
	window.addEventListener('orientationchange', () => {
		setTimeout(() => { sectionsSwiper.update(); }, 300)
	});

});
