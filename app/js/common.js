$(function () {
	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	var sectionsSwiper = new Swiper('.sections', {
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

				const gestureZone = document.querySelector('.wrapper-content');
				gestureZone.addEventListener("touchstart", startTouch, false);
				gestureZone.addEventListener("touchmove", moveTouch, false);

				// Swipe Up / Down / Left / Right
				var initialX = null;
				var initialY = null;

				function startTouch(e) {
					initialX = e.touches[0].clientX;
					initialY = e.touches[0].clientY;
				};

				function moveTouch(e) {
					if (initialX === null) {
						return;
					}

					if (initialY === null) {
						return;
					}

					var currentX = e.touches[0].clientX;
					var currentY = e.touches[0].clientY;

					var diffX = initialX - currentX;
					var diffY = initialY - currentY;

					if (Math.abs(diffX) > Math.abs(diffY)) {
						// sliding horizontally
						if (diffX > 0) {
							// swiped left
						} else {
							// swiped right
						}
					} else {
						// sliding vertically
						if (diffY > 0) {
							_self.slidePrev();
						} else {
							_self.slideNext();
						}
					}

					initialX = null;
					initialY = null;

					e.preventDefault();
				};

			},
			slideChange: function() {
				let wrapperContent = wrapper = $('.wrapper > .wrapper-content'),
					slideName = this.slides[this.activeIndex].dataset.name;
				if (slideName === 'contact') {
					wrapperContent.addClass('is-contact');
				} else {
					wrapperContent.removeClass('is-contact');
				}
			}
		}
	});

	var worksSwiper = new Swiper('.section-works-slider', {
		autoHeight: true,
		slidesPerView: 3,
		spaceBetween: 30,
		navigation: {
			nextEl: '.section-works-slider-button__next',
			prevEl: '.section-works-slider-button__prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 0
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
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
		setTimeout(() => {
			sectionsSwiper.update();
			worksSwiper.update();
		}, 300)
	});

});
