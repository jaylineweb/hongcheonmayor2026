/**
 * @author (주)한신정보기술 퍼블리셔팀 권정현
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    window.element = {};

    var $window = element.$window = $(window),
        $document = element.$document = $(document),
        $html = element.$html = $('html'),
        $head = element.$head = $('head'),
        $screen = $.screen;

    //사이트
    var site = window.site,
        id = site.id,
        key = site.key,
        href = location.href;

    //아이디가 없을 때
    if(!id || id.substring(0, 2) === '@@' || id[0] === '$') {
        site.id = id = getParam(href, 'id') || href.split('/')[4];
    }

    //키가 없을 때
    if(!key || key.substring(0, 2) === '@@' || key[0] === '$') {
        site.key = key = getParam(href, 'key');
    }

    $(function() {
        var $body = element.$body = $('body'),
            $htmlBody = element.$htmlBody = $html.add($body),
            $wrapper = element.$wrapper = $('#wrapper'),
            $header = element.$header = $('#header'),
            $container = element.$container = $('#container'),
            $footer = element.$footer = $('#footer'),
            $accessibility = element.$accessibility = $header.find('.accessibility'),
            $accessibilityBtn = element.$accessibilityBtn = $accessibility.find('a');

        $accessibilityBtn.anchor({
            animate : {
                properties : {
                    scrollTop : 'offset'
                },
                options : {
                    duration : 250,
                    easing : 'easeInOutExpo'
                }
            },
            stop : {
                clearQueue : true
            },
            targetElement : $accessibilityBtn.attr('href'),
            scrollingElement : $htmlBody,
            focus : true,
            hash : true,
            namespace : 'layout'
        });
        
        //메뉴 > 언어
        var $menu = element.$menu = $header.find('.menu'),
            $menuLang = element.$menuLang = $menu.find('.menu_lang'),
            $menuLangOpen = element.$menuLangOpen = $menuLang.find('.menu_lang_open'),
            $menuLangPanel = element.$menuLangPanel = $menuLang.find('.menu_lang_panel');

        $menuLang.tab({
            namespace : 'layout',
            list : [{
                openElement : $menuLangOpen,
                closeElement : undefined,
                panelElement : $menuLangPanel,
                mouseenter : false,
                mouseleave : false,
                popup : false,
                reset : false,
                toggle : true,
                link : false
            }]
        }).on('tab.layout', function(event, data) {
            $(data.panelElement).stop(true, false).slideToggle(250, 'easeInOutExpo');
        });

        //상단 바로가기
        var $up = element.$up = $footer.find('.up'),
            $upBtn = element.$upBtn = $up.find('a');

        $upBtn.anchor({
            animate : {
                properties : {
                    scrollTop : 'offset'
                },
                options : {
                    duration : 250,
                    easing : 'easeInOutExpo'
                }
            },
            stop : {
                clearQueue : true
            },
            targetElement : $upBtn.attr('href'),
            scrollingElement : $htmlBody,
            hash : true,
            focus : true,
            namespace : 'layout'
        });
    });

    $document.on('ready.layout', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1241
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1240,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });
})(window.jQuery);