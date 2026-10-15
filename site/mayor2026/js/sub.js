

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//여기서부터 코드 작성해주세요

		//프린트
		$('.path_box .addon .print .print_btn').on('click',function() {
			var $contents = $('#contents'),
				ContentsClass = $contents.attr('class');
			let $head = $('head').clone();
			let $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사
			
			let headHtml = $head[0].innerHTML
			let innerHtml = $contentsClone[0].innerHTML
			let popupWindow = window.open("", "_blank", "width=1200,height=800")
			popupWindow.document.write('<!DOCTYPE html>'+
			  '<html style="overflow-x:hidden;">'+
				'<head>'+headHtml+'</head>'+
				'<body style="padding-right:20px; padding-left:20px;"><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+
			  '</html>')
			popupWindow.document.close();
			popupWindow.focus();

			setTimeout(function(){
				popupWindow.print();         // 팝업의 프린트 도구 시작
				popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
			}, 400);
		});

		$('.path_box .list_btn').on('click',function() {
			var IsActive = $(this).is('.active'),
				IsFirst = $(this).parent().index();
				$('.home').css('background-color','#fff');
			if(IsActive) {
				$(this).attr('title','목록열기').removeClass('active');
			} else {
				$('.path_box .list_btn').removeClass('active');
				$(this).attr('title','목록닫기').addClass('active');
				if(IsFirst === 1) {
					$('.home').css('background-color','#bd2b39');
				}
			}
		});



		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);