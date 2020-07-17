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
			eventsTarget: '.wrapper'
		},
		followFinger: true,
		effect: 'fade',
		pagination: {
			el: '.nav-inner',
			clickable: true,
		},
		on: {
			init: function () {
				let _self = this;

				var ts;
				$('.wrapper').bind('touchstart', function (e) {
					ts = e.originalEvent.touches[0].clientY;
				});

				$('.wrapper').bind('touchend', function (e) {
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
