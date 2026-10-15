
'use strict';

try {
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			var $window = $(window);
			$(function() {

				//여기서부터 코드 작성해주세요

				//가평 공약 슬라이드
				var $gpPromiseSlide = $('.rowgroup .promise .promise_slide'),
					$gpPromiseSlideList = $gpPromiseSlide.find('.promise_slide_list'),
					$gpPromiseSlidePhoto = $gpPromiseSlide.find('.promise_slide_photo .photo_list');

				var gpLabels = ["경제", "농림", "복지", "교육", "관광", "행정", "교통"];

				if($gpPromiseSlideList.length){
					$gpPromiseSlideList.slick({
						autoplay : false,
						dots: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						arrows: false,
						fade: true,
						asNavFor: $gpPromiseSlidePhoto,
						appendDots: $gpPromiseSlide.find('.custom-dots'),
						customPaging: function(slider, i) {
							return '<button>' + gpLabels[i] + '</button>';
						},
						responsive: [
							{
								breakpoint: 1001,
								settings: {
									swipe:true,
									draggable:true
								}
							}
						]
					});
					$gpPromiseSlidePhoto.slick({
						autoplay : false,
						dots: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						arrows: false,
						asNavFor: $gpPromiseSlideList,
						responsive: [
							{
								breakpoint: 1001,
								settings: {
									swipe:true,
									draggable:true
								}
							}
						]
					});
					$gpPromiseSlideList.on("afterChange", function(event, slick, currentSlide, nextSlide){
						var $this = $(this),
							$parents = $this.parents('.promise_slide'),
							$promisePhoto = $parents.find('.promise_slide_photo'),
							$promiseInfo = $promisePhoto.find('.promise_info .promise_info_box'),
							currentIndex = $this.slick('slickCurrentSlide');

						$promiseInfo.eq(currentIndex).addClass('active').siblings().removeClass('active');
					});
				}

				//스크롤이벤트
				var $window = $(window),
				$scrollcontent = $('.promise_slide, .group3_wrap');
				$scrollcontent.each(function(){
					var $this = $(this),
						scrollTop = $window.scrollTop(),
						scrollBottom = scrollTop + $window.height(),
						contentOffset = $this.offset();
					if(scrollBottom > contentOffset.top) {
						$this.addClass('active');
					};
				});

				$window.on('scroll', function(event) {
					$scrollcontent.each(function(){
						var $this = $(this),
							scrollTop = $window.scrollTop(),
							scrollBottom = scrollTop + $window.height(),
							contentOffset = $this.offset();
						if(scrollBottom > contentOffset.top) {
							$this.addClass('active');
						}else{
							$this.removeClass('active');
						};
					});
				});


				$window.on('screen:wide screen:web', function(event) {

				});

				$window.on('screen:tablet screen:phone', function(event) {

				});

			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}