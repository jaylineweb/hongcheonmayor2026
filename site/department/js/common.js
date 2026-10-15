/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

	$(function() {
		var $header = element.$header,
            $footer = element.$footer,
            $html = element.$html,
            $htmlBody = element.$htmlBody;

		//배너
        var $banner = element.$banner = $footer.find('.banner'),
            $bannerList = element.$bannerList = $banner.find('.banner_list'),
            $bannerPrev = element.$bannerPrev = $banner.find('.banner_prev'),
            $bannerNext = element.$bannerNext = $banner.find('.banner_next'),
            $bannerAuto = element.$bannerAuto = $banner.find('.banner_auto');

        $bannerList.on('init.departmentCommon afterChange.departmentCommon', function(event, slick, currentSlide) {
            $bannerList.find('.slick-slide').removeAttr('tabindex');
        }).slick({
            draggable : false,
            swipe : false,
            touchMove : false,
            cssEase : 'cubic-bezier(1, 0, 0, 1)',
            speed : 250,
			slidesToShow : 6,
            variableWidth : true,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
            autoArrow : $bannerAuto,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            autoplay : true,
            playText : '재생',
            pauseText : '정지',
            responsive : [{
                breakpoint : 1001,
                settings : {
                    draggable : true,
                    swipe : true,
                    touchMove : true,
                    swipeToSlide : true
                }
            }]
        });

		//사이트
		var $site = element.$site = $footer.find('.site'),
			$siteOpen = element.$siteOpen = $site.find('.site_open'),
			$siteClose = element.$siteClose = $site.find('.site_close'),
            $sitePanel = element.$sitePanel = $site.find('.site_panel'),
			siteList = [];

		$siteOpen.each(function(index, element) {
			siteList[index] = {
				openElement : element,
				closeElement : $siteClose[index],
				panelElement : $sitePanel[index],
				mouseenter : false,
				mouseleave : false,
				popup : false,
				reset : true,
				toggle : false,
				link : false
			};
		});
	
        $site.tab({
            namespace : 'departmentCommon',
            list : siteList
        }).on('tab.departmentCommon', function(event, data) {
            var $panelElement = $(data.panelElement),
                $siteElement = $(data.openElement),
                $siteItem = $panelElement.parent('.site_item');

            $panelElement.stop(true, false);

            //활성화일 때
            if(data.state === 'active') {
                $panelElement.slideDown(250, 'easeInOutExpo');
                $siteElement.attr('title', '하위리스트 닫기');
                $siteItem.addClass('active');
            }else{
                $panelElement.slideUp(250, 'easeInOutExpo');
                $siteElement.attr('title', '하위리스트 열기');
                $siteItem.removeClass('active');
                $siteItem.find('.site_open').focus();
            }
        });

        //맞춤복지서비스, 홍천패밀리홈페이지
        var $gnb = element.$gnb = $header.find('.gnb'),
            $welfare = element.$welfare = $gnb.find('.welfare'),
            $welfareOpen = element.$welfareOpen = $welfare.find('.welfare_open'),
            $welfareClose = element.$welfareClose = $welfare.find('.welfare_close'),
            $welfarePanel = element.$welfarePanel = $welfare.find('.welfare_panel'),
            $family = element.$family = $gnb.find('.family'),
            $familyOpen = element.$familyOpen = $family.find('.family_open'),
            $familyClose = element.$familyClose = $family.find('.family_close'),
            $familyPanel = element.$familyPanel = $family.find('.family_panel');

        $gnb.tab({
            namespace : 'departmentCommon',
            list : [{
                openElement : $welfareOpen,
                closeElement : $welfareClose,
                panelElement : $welfarePanel,
                mouseenter : false,
                mouseleave : false,
                popup : false,
                reset : true,
                toggle : false,
                link : false
            }, {
                openElement : $familyOpen,
                closeElement : $familyClose,
                panelElement : $familyPanel,
                mouseenter : false,
                mouseleave : false,
                popup : false,
                reset : true,
                toggle : false,
                link : false
            }]
        }).on('tab.departmentCommon', function(event, data) {
            var $openElement = $(data.openElement),
                $gnbItem = $openElement.parent('.gnb_item');

            //활성화일 때
            if(data.state === 'active') {
                $gnbItem.addClass('active');
                $html.addClass('freeze');
            } else {
                $html.removeClass('freeze');
                $gnbItem.removeClass('active');
            }
            
            // 접근성 작업(25.02) welfare_open 및 family_open 버튼
            if ($openElement.hasClass('welfare_open')) {
                if (data.state === 'active') {
                    $openElement.attr('title', '맞춤복지서비스 닫기');
                } else {
                    $openElement.attr('title', '맞춤복지서비스 열기');
                }
            }
            else if ($openElement.hasClass('family_open')) {
                if (data.state === 'active') {
                    $openElement.attr('title', '홍천패밀리누리집 닫기');
                } else {
                    $openElement.attr('title', '홍천패밀리누리집 열기');
                }
            }
        });
        
        //검색
        var $search = element.$search = $('.search'),
            $searchKeyboard = element.$searchKeyboard = $search.find('.search_keyboard'),
            $searchOpen = element.$searchOpen = $search.find('.search_open'),
            $searchPanel = element.$searchPanel = $search.find('.search_panel'),
            $searchClose = element.$searchClose = $search.find('.search_close'),
            $searchQuery = element.$searchQuery = $search.find('.search_query'),
            nvk = new NeoVirtualKeyboard({
                inputElement : $searchQuery,
                keyLayoutType : 'MULTI'
            });
        
        $searchKeyboard.on('click.departmentCommon', function(event) {
            nvk.showKeyboard(this);
			$('#neoVirtualKeyboardClose').focus();
        });
		$(document).on('click', '#neoVirtualKeyboardClose', function(){
			$searchKeyboard.focus();
		});

        $search.tab({
            namespace : 'departmentCommon',
            list : [{
                openElement : $searchOpen,
                closeElement : $searchClose,
                panelElement : $searchPanel,
                mouseenter : false,
                mouseleave : false,
                popup : false,
                reset : false,
                toggle : false,
                link : false
            }]
        });
	});
})(window.jQuery);