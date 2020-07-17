$(function () {
	var swiper = new Swiper('.swiper-container', {
		fadeEffect: { crossFade: true },
		direction: 'vertical',
		slidesPerView: 1,
		spaceBetween: 30,
		mousewheel: true,
		effect: 'fade',
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
});
