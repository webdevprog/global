$(function () {
	var swiper = new Swiper('.swiper-container', {
		fadeEffect: { crossFade: true },
		direction: 'vertical',
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		slidesPerColumnFill: 'row',
		allowTouchMove: false,
		mousewheel: {
			eventsTarget: '.wrapper-content'
		},
		followFinger: true,
		effect: 'fade',
		pagination: {
			el: '.nav-inner',
			clickable: true,
			renderBullet: function (index, className) {
				let nameSlide = this.slides[index].dataset.name,
					outterMenu = $('.nav-outter > .nav-outter__list');

					outterMenu.append(`<li class="nav-outter__item">${nameSlide}</li>`);
				return '<span class="' + className + '">' + nameSlide + '</span>';
			},
		},
		on: {
			init: function () {
				let _self = this;
				console.log(this)
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
});
