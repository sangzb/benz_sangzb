/**
 * fullPage 2.1.9
 * MIT licensed
 *
 */

(function($) {
	_smq.push(['custom','首页','首页_首页']);


	$.fn.fullpage = function(options) {
		// Create some defaults, extending them with any options that were provided
		options = $.extend({
			"verticalCentered": true,
			'resize': true,
			'sectionsColor' : [],
			'anchors':[],
			'scrollingSpeed': 1000,
			'easing': 'easeInQuart',
			'menu': false,
			'navigation': false,
			'navigationPosition': 'right',
			'navigationColor': '#000',
			'navigationTooltips': [],
			'slidesNavigation': false,
			'slidesNavPosition': 'bottom',
			'controlArrowColor': '#fff',
			'loopBottom': false,
			'loopTop': false,
			'loopHorizontal': false,
			'autoScrolling': true,
			'scrollOverflow': false,
			'css3': false,
			'paddingTop': 0,
			'paddingBottom': 0,
			'fixedElements': null,
			'normalScrollElements': null,
			'keyboardScrolling': true,
			'touchSensitivity': 5,
			'continuousVertical': false,
			'animateAnchor': true,
			'normalScrollElementTouchThreshold': 5,
			'sectionSelector': '.section',
			'slideSelector': '.slide',

			//events
			'afterLoad': null,
			'onLeave': null,
			'afterRender': null,
			'afterResize': null,
			'onSlideLeave': function(index, nextIndex, direction){
					$("div.pos,.b_img").css({"z-index":"0"})
					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
					$(".fp-slidesContainer section").stop().eq(direction).find(".text3").stop().animate({"left":"40px","opacity":"0",'filter':'alpha(opacity=0)'},800)	
					$(".fp-slidesContainer section").stop().eq(direction).find(".text5").stop().animate({"left":"40px","opacity":"0",'filter':'alpha(opacity=0)'},800)	
					$(".fp-slidesContainer section").stop().eq(direction).find(".dtext").stop().animate({"top":"253px","opacity":"0"},800)	
					$(".fp-slidesContainer section").stop().eq(direction).find(".panel").stop().eq(index).removeClass("show_1")
					//视频
					$(".active .video_list .v1").stop().animate({"left":"-20%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					$(".active .video_list .v2").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					$(".active .video_list .v3").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					//壁纸
					// $(".active .wallpaper_list .w1").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					// $(".active .wallpaper_list .w2").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					// $(".active .wallpaper_list .w3").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					// $(".active .wallpaper_list .w4").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					// $(".active .wallpaper_list .w5").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
					if(direction==9){
						$("#video_ipo").removeAttr("src","http://c.youku.com/NewC-Class/iframe?qq-pf-to=pcqq.c2c")	
//						setTimeout(function(){
//							   if (document.all) {//IE     
//									doc = document.frames["radio"].document;  
//									var bb=$(doc).find(".pause")
//									$(doc).find(".pause").trigger("click")
//								} else {//Firefox        
//									doc = document.getElementById("radio").contentDocument;  
//									var bb=$(doc).find(".pause")
//									$(doc).find(".pause").trigger("click")
//								}  
//						 
//						},3000);						
						
					}
				
				},
			
     		'afterSlideLoad': function(anchorLink, index, slideIndex, direction){
					//$("div.pos,.b_img").css({"z-index":"0"})
					$(".panel").eq(index).addClass("show_1")
					//$(".text").animate({"left":"40px","opacity":"1"})
					//$(".text2").animate({"top":"153px","opacity":"1"})	
					//$(".fp-slide").find(".text4").removeClass("texto").animate({"display":"","top":"173px","opacity":"1",'filter':'alpha(opacity=100)'},1500)	
					//$(".fp-slidesContainer section").eq(direction).find(".text3").animate({"left":"40px","opacity":"1",'filter':'alpha(opacity=100)'},1500)
					//$(".fp-slidesContainer section").eq(direction).find(".text5").animate({"left":"40px","opacity":"1",'filter':'alpha(opacity=100)'},1500)
					$(".fp-slidesContainer section").eq(direction).find(".dtext").animate({"top":"153px","opacity":"1"},1500)	
					//视频
					$(".active .video_list .v1").stop().animate({"left":"0%","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					$(".active .video_list .v2").stop().animate({"left":"520px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					$(".active .video_list .v3").stop().animate({"left":"520px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					//壁纸
					// $(".active .wallpaper_list .w1").stop().animate({"left":"162px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					// $(".active .wallpaper_list .w2").stop().animate({"left":"526px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					// $(".active .wallpaper_list .w3").stop().animate({"left":"0px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					// $(".active .wallpaper_list .w4").stop().animate({"left":"262px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					// $(".active .wallpaper_list .w5").stop().animate({"left":"526px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
					if(direction>=1){
						//$("#menu a").eq(direction+7).addClass("select2").siblings("a").removeClass("select2")
						//$("#menu a").removeClass("select2");
						//$("#menu a").eq(direction+$("#menu .lightspot").length).addClass("select2");
					}else{
						
					}
					 
					
					if(direction==9){
						$("#video_ipo").attr("src","http://c.youku.com/NewC-Class/iframe?qq-pf-to=pcqq.c2c")	
						$("#radio").trigger("click")
						
						
//						setTimeout(function(){
//							   if (document.all) {//IE     
//									doc = document.frames["radio"].document;  
//									var bb=$(doc).find(".pause")
//									$(doc).find(".pause").trigger("click")
//								} else {//Firefox        
//									doc = document.getElementById("radio").contentDocument;  
//									var bb=$(doc).find(".pause")
//									$(doc).find(".pause").trigger("click")
//								}  
//						 
//						},3000);
						}
						
							
//						
//						if(direction==0){
//							_smq.push(['custom','首页','首页_首页']);
//						}else if(direction==1){
//							_smq.push(['custom','改变1','改变1_让科技得心应手']);
//						}else if(direction==2){
//							_smq.push(['custom','改变2','改变2_让未知尽收眼底']);
//						}else if(direction==3){
//							_smq.push(['custom','改变3','改变3_让内涵不彰自显']);
//						}else if(direction==4){
//							_smq.push(['custom','改变4','改变4_让世界紧密联系']);
//						}else if(direction==5){
//							_smq.push(['custom','改变5','改变5_让风速追随脚步']);
//						}else if(direction==6){
//							_smq.push(['custom','改变6','改变6_让空间尽其所长']);
//						}else if(direction==7){
//							_smq.push(['custom','第7页','第7页_参数配置']);
//						}else if(direction==8){
//							_smq.push(['custom','第9页','第9页_预约试驾']);
//						}else if(direction==9){
//							_smq.push(['custom','第8页','第8页_更多精彩']);
//						}								
//								
//							
//						
//						
						
//						else{
//							setTimeout(function(){
//								   if (document.all) {//IE     
//										doc = document.frames["radio"].document;  
//										var bb=$(doc).find(".pause")
//										$(doc).find(".pause").trigger("click")
//									} else {//Firefox        
//										doc = document.getElementById("radio").contentDocument;  
//										var bb=$(doc).find(".pause")
//										$(doc).find(".pause").trigger("click")
//									}  
//							},3000);
				//	}

					//addMouseWheelHandler()	//添加鼠标事件					
			},			
			//afterSlideLoad
			//'onSlideLeave': null
		}, options);

	    // Disable mutually exclusive settings
		if (options.continuousVertical &&
			(options.loopTop || options.loopBottom)) {
		    options.continuousVertical = false;
		    console && console.log && console.log("Option loopTop/loopBottom is mutually exclusive with continuousVertical; continuousVertical disabled");
		}

		//Defines the delay to take place before being able to scroll to the next section
		//BE CAREFUL! Not recommened to change it under 400 for a good behavior in laptops and
		//Apple devices (laptops, mouses...)
		var scrollDelay = 60000000000000;

		$.fn.fullpage.setAutoScrolling = function(value){
			options.autoScrolling = value;

			var element = $('.fp-section.active');

			if(options.autoScrolling){
				$('html, body').css({
					'overflow' : 'hidden',
					'height' : '100%'
				});

				if(element.length){
					//moving the container up
					silentScroll(element.position().top);
				}

			}else{
				$('html, body').css({
					'overflow' : 'auto',
					'height' : 'auto'
				});

				silentScroll(0);

				//scrolling the page to the section with no animation
				$('html, body').scrollTop(element.position().top);
			}

		};

		/**
		* Defines the scrolling speed
		*/
		$.fn.fullpage.setScrollingSpeed = function(value){
		   options.scrollingSpeed = value;
		};

		/**
		* Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
		*/
		$.fn.fullpage.setMouseWheelScrolling = function (value){
			if(value){
				addMouseWheelHandler();
			}else{
				removeMouseWheelHandler();
			}
		};

		/**
		* Adds or remove the possiblity of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
		*/
		$.fn.fullpage.setAllowScrolling = function (value){
			if(value){
				$.fn.fullpage.setMouseWheelScrolling(true);
				addTouchHandler();
			}else{
				$.fn.fullpage.setMouseWheelScrolling(false);
				removeTouchHandler();
			}
		};

		/**
		* Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
		*/
		$.fn.fullpage.setKeyboardScrolling = function (value){
			options.keyboardScrolling = value;
		};

		//flag to avoid very fast sliding for landscape sliders
		var slideMoving = false;

		var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);
		var container = $(this);
		var windowsHeight = $(window).height();
		var isMoving = false;
		var isResizing = false;
		var lastScrolledDestiny;
		var lastScrolledSlide;
		var wrapperSelector = 'fullpage-wrapper';

		$.fn.fullpage.setAllowScrolling(true);

		//if css3 is not supported, it will use jQuery animations
		if(options.css3){
			options.css3 = support3d();
		}

		if($(this).length){
			container.css({
				'height': '100%',
				'position': 'relative',
				'-ms-touch-action': 'none'
			});

			//adding a class to recognize the container internally in the code
			container.addClass(wrapperSelector);
		}

		//trying to use fullpage without a selector?
		else{
			//console.error("Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();");
		}

		//adding internal class names to void problem with common ones
		$(options.sectionSelector).each(function(){
  			$(this).addClass('fp-section');
		});
		$(options.slideSelector).each(function(){
  			$(this).addClass('fp-slide');
		});

		//creating the navigation dots
		if (options.navigation) {
			$('body').append('<div id="fp-nav"><ul></ul></div>');
			var nav = $('#fp-nav');

			nav.css('color', options.navigationColor);
			nav.addClass(options.navigationPosition);
		}

		$('.fp-section').each(function(index){
			var that = $(this);
			var slides = $(this).find('.fp-slide');
			var numSlides = slides.length;

			//if no active section is defined, the 1st one will be the default one
			if(!index && $('.fp-section.active').length === 0) {
				$(this).addClass('active');
			}

			$(this).css('height', windowsHeight + 'px');

			if(options.paddingTop || options.paddingBottom){
				$(this).css('padding', options.paddingTop  + ' 0 ' + options.paddingBottom + ' 0');
			}

			if (typeof options.sectionsColor[index] !==  'undefined') {
				$(this).css('background-color', options.sectionsColor[index]);
			}

			if (typeof options.anchors[index] !== 'undefined') {
				$(this).attr('data-anchor', options.anchors[index]);
			}

			if (options.navigation) {
				var link = '';
				if(options.anchors.length){
					link = options.anchors[index];
				}
				var tooltip = options.navigationTooltips[index];
				if(typeof tooltip === 'undefined'){
					tooltip = '';
				}

				nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>');
			}


			// if there's any slide
			if (numSlides > 1) {
				var sliderWidth = numSlides * 100;
				var slideWidth = 100 / numSlides;

				slides.wrapAll('<div class="fp-slidesContainer" />');
				slides.parent().wrap('<div class="fp-slides" />');

				$(this).find('.fp-slidesContainer').css('width', sliderWidth + '%');
				$(this).find('.fp-slides').after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');

				if(options.controlArrowColor!='#fff'){
					$(this).find('.fp-controlArrow.fp-next').css('border-color', 'transparent transparent transparent '+options.controlArrowColor);
					$(this).find('.fp-controlArrow.fp-prev').css('border-color', 'transparent '+ options.controlArrowColor + ' transparent transparent');
				}

				if(!options.loopHorizontal){
					$(this).find('.fp-controlArrow.fp-prev').hide();
				}


				if(options.slidesNavigation){
					addSlidesNavigation($(this), numSlides);
				}

				slides.each(function(index) {
					var startingSlide = that.find('.fp-slide.active');

					//if the slide won#t be an starting point, the default will be the first one
					if(!index && startingSlide.length == 0){
						$(this).addClass('active');
					}

					//is there a starting point for a non-starting section?
					else{
						silentLandscapeScroll(startingSlide);
					}

					$(this).css('width', slideWidth + '%');

					if(options.verticalCentered){
						addTableClass($(this));
					}
				});
			}else{
				if(options.verticalCentered){
					addTableClass($(this));
				}
			}




		}).promise().done(function(){
			$.fn.fullpage.setAutoScrolling(options.autoScrolling);

			//the starting point is a slide?
			var activeSlide = $('.fp-section.active').find('.fp-slide.active');

			//the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
			if( activeSlide.length &&  ($('.fp-section.active').index('.fp-section') != 0 || ($('.fp-section.active').index('.fp-section') == 0 && activeSlide.index() != 0))){
				silentLandscapeScroll(activeSlide);
			}

			//fixed elements need to be moved out of the plugin container due to problems with CSS3.
			if(options.fixedElements && options.css3){
				$(options.fixedElements).appendTo('body');
			}

			//vertical centered of the navigation + first bullet active
			if(options.navigation){
				nav.css('margin-top', '-' + (nav.height()/2) + 'px');
				nav.find('li').eq($('.fp-section.active').index('.fp-section')).find('a').addClass('active');
			}

			//moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
			if(options.menu && options.css3 && $(options.menu).closest('.fullpage-wrapper').length){
				$(options.menu).appendTo('body');
			}

			if(options.scrollOverflow){
				if(container.hasClass('fullpage-used')){
					createSlimScrollingHandler();
				}
				//after DOM and images are loaded
				$(window).on('load', createSlimScrollingHandler);
			}else{
				$.isFunction( options.afterRender ) && options.afterRender.call( this);
			}


			//getting the anchor link in the URL and deleting the `#`
			var value =  window.location.hash.replace('#', '').split('/');
			var destiny = value[0];

			if(destiny.length){
				var section = $('[data-anchor="'+destiny+'"]');

				if(!options.animateAnchor && section.length){

					if(options.autoScrolling){
						silentScroll(section.position().top);
					}
					else{
						silentScroll(0);

						//scrolling the page to the section with no animation
						$('html, body').scrollTop(section.position().top);
					}

					activateMenuElement(destiny);
					activateNavDots(destiny, null);

					$.isFunction( options.afterLoad ) && options.afterLoad.call( this, destiny, (section.index('.fp-section') + 1));

					//updating the active class
					section.addClass('active').siblings().removeClass('active');
				}
			}


			$(window).on('load', function() {
				scrollToAnchor();
			});

		});

		function createSlimScrollingHandler(){
			$('.fp-section').each(function(){
				var slides = $(this).find('.fp-slide');

				if(slides.length){
					slides.each(function(){
						createSlimScrolling($(this));
					});
				}else{
					createSlimScrolling($(this));
				}

			});
			$.isFunction( options.afterRender ) && options.afterRender.call( this);
		}


		var scrollId;
		var isScrolling = false;

		//when scrolling...
		$(window).on('scroll', scrollHandler);

		function scrollHandler(){
			if(!options.autoScrolling){
				var currentScroll = $(window).scrollTop();

				var scrolledSections = $('.fp-section').map(function(){
					if ($(this).offset().top < (currentScroll + 100)){
						return $(this);
					}
				});

				//geting the last one, the current one on the screen
				var currentSection = scrolledSections[scrolledSections.length-1];

				//executing only once the first time we reach the section
				if(!currentSection.hasClass('active')){
					var leavingSection = $('.fp-section.active').index('.fp-section') + 1;

					isScrolling = true;

					var yMovement = getYmovement(currentSection);

					currentSection.addClass('active').siblings().removeClass('active');

					var anchorLink  = currentSection.data('anchor');
					$.isFunction( options.onLeave ) && options.onLeave.call( this, leavingSection, (currentSection.index('.fp-section') + 1), yMovement);

					$.isFunction( options.afterLoad ) && options.afterLoad.call( this, anchorLink, (currentSection.index('.fp-section') + 1));

					activateMenuElement(anchorLink);
					activateNavDots(anchorLink, 0);


					if(options.anchors.length && !isMoving){
						//needed to enter in hashChange event when using the menu with anchor links
						lastScrolledDestiny = anchorLink;

						location.hash = anchorLink;
					}

					//small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
					clearTimeout(scrollId);
					scrollId = setTimeout(function(){
						isScrolling = false;
					}, 100);
				}

			}
		}


		var touchStartY = 0;
		var touchStartX = 0;
		var touchEndY = 0;
		var touchEndX = 0;

		/* Detecting touch events

		* As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
		* This way, the touchstart and the touch moves shows an small difference between them which is the
		* used one to determine the direction.
		*/
		function touchMoveHandler(event){
			var e = event.originalEvent;

			if(options.autoScrolling){
				//preventing the easing on iOS devices
				event.preventDefault();
			}

			// additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
			if (!checkParentForNormalScrollElement(event.target)) {

				var touchMoved = false;
				var activeSection = $('.fp-section.active');
				var scrollable;

				if (!isMoving && !slideMoving) { //if theres any #
					var touchEvents = getEventsPage(e);
					touchEndY = touchEvents['y'];
					touchEndX = touchEvents['x'];

					//if movement in the X axys is greater than in the Y and the currect section has slides...
					if (activeSection.find('.fp-slides').length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

					    //is the movement greater than the minimum resistance to scroll?
					    if (Math.abs(touchStartX - touchEndX) > ($(window).width() / 100 * options.touchSensitivity)) {
					        if (touchStartX > touchEndX) {
					            $.fn.fullpage.moveSlideRight(); //next
					        } else {
					            $.fn.fullpage.moveSlideLeft(); //prev
					        }
					    }
						
					}

					//vertical scrolling (only when autoScrolling is enabled)
					else if(options.autoScrolling){

						//if there are landscape slides, we check if the scrolling bar is in the current one or not
						if(activeSection.find('.fp-slides').length){
							scrollable= activeSection.find('.fp-slide.active').find('.fp-scrollable');
						}else{
							scrollable = activeSection.find('.fp-scrollable');
						}

						//is the movement greater than the minimum resistance to scroll?
						if (Math.abs(touchStartY - touchEndY) > ($(window).height() / 100 * options.touchSensitivity)) {
							if (touchStartY > touchEndY) {
								if(scrollable.length > 0 ){
									//is the scrollbar at the end of the scroll?
									if(isScrolled('bottom', scrollable)){
										$.fn.fullpage.moveSlideRight(); //next
										$.fn.fullpage.moveSectionDown();
									}else{
										return true;
									}
								}else{
									// moved down
									$.fn.fullpage.moveSectionDown();
									$.fn.fullpage.moveSlideRight(); //next
								}
							} else if (touchEndY > touchStartY) {

								if(scrollable.length > 0){
									//is the scrollbar at the start of the scroll?
									if(isScrolled('top', scrollable)){
										$.fn.fullpage.moveSectionUp();
					          			$.fn.fullpage.moveSlideLeft(); //
									}
									else{
										return true;
									}
								}else{
									// moved up
									$.fn.fullpage.moveSectionUp();
					          		$.fn.fullpage.moveSlideLeft(); //
								}
							}
						}
					}
				}
			}

		}

		/**
		 * recursive function to loop up the parent nodes to check if one of them exists in options.normalScrollElements
		 * Currently works well for iOS - Android might need some testing
		 * @param  {Element} el  target element / jquery selector (in subsequent nodes)
		 * @param  {int}     hop current hop compared to options.normalScrollElementTouchThreshold
		 * @return {boolean} true if there is a match to options.normalScrollElements
		 */
		function checkParentForNormalScrollElement (el, hop) {
			hop = hop || 0;
			var parent = $(el).parent();

			if (hop < options.normalScrollElementTouchThreshold &&
				parent.is(options.normalScrollElements) ) {
				return true;
			} else if (hop == options.normalScrollElementTouchThreshold) {
				return false;
			} else {
				return checkParentForNormalScrollElement(parent, ++hop);
			}
		}

		function touchStartHandler(event){
			var e = event.originalEvent;
			var touchEvents = getEventsPage(e);
			touchStartY = touchEvents['y'];
			touchStartX = touchEvents['x'];
		}


		/**
		 * Detecting mousewheel scrolling
		 *
		 * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
		 * http://www.sitepoint.com/html5-javascript-mouse-wheel/
		 */
		function MouseWheelHandler(e) {
			if(options.autoScrolling){
				// cross-browser wheel delta
				e = window.event || e;
				var delta = Math.max(-1, Math.min(1,
						(e.wheelDelta || -e.deltaY || -e.detail)));
				var scrollable;
				var activeSection = $('.fp-section.active');

				if (!isMoving) { //if theres any #

					//if there are landscape slides, we check if the scrolling bar is in the current one or not
					if(activeSection.find('.fp-slides').length){
						scrollable= activeSection.find('.fp-slide.active').find('.fp-scrollable');
					}else{
						scrollable = activeSection.find('.fp-scrollable');
					}

					//scrolling down?
					if (delta < 0) {
						if(scrollable.length > 0 ){
							//is the scrollbar at the end of the scroll?
							if(isScrolled('bottom', scrollable)){
								$.fn.fullpage.moveSectionDown();
								$.fn.fullpage.moveSlideRight();
								//console.info(scrollable.length)
							}else{
								return true; //normal scroll
							}
						}else{
							$.fn.fullpage.moveSectionDown();
							$.fn.fullpage.moveSlideRight();
						}
					}

					//scrolling up?
					else {
						if(scrollable.length > 0){
							//is the scrollbar at the start of the scroll?
							if(isScrolled('top', scrollable)){
								$.fn.fullpage.moveSectionUp();
								//console.info()
								$.fn.fullpage.moveSlideLeft();
							}else{
								return true; //normal scroll
							}
						}else{
							$.fn.fullpage.moveSectionUp();
																$.fn.fullpage.moveSlideLeft();
						}
					}
				}

				return false;
			}
		}


		$.fn.fullpage.moveSectionUp = function(){
			var prev = $('.fp-section.active').prev('.fp-section');

			//looping to the bottom if there's no more sections above
			if (!prev.length && (options.loopTop || options.continuousVertical)) {
				prev = $('.fp-section').last();
			}

			if (prev.length) {
				scrollPage(prev, null, true);
			}
		};

		$.fn.fullpage.moveSectionDown = function (){
			var next = $('.fp-section.active').next('.fp-section');

			//looping to the top if there's no more sections below
			if(!next.length &&
				(options.loopBottom || options.continuousVertical)){
				next = $('.fp-section').first();
			}

			if(next.length > 0 ||
				(!next.length &&
				(options.loopBottom || options.continuousVertical))){
				scrollPage(next, null, false);
			}
		};

		$.fn.fullpage.moveTo = function (section, slide){
			var destiny = '';

			if(isNaN(section)){
				destiny = $('[data-anchor="'+section+'"]');
			}else{
				destiny = $('.fp-section').eq( (section -1) );
			}

			if (typeof slide !== 'undefined'){
				scrollPageAndSlide(section, slide);
			}else if(destiny.length > 0){
				scrollPage(destiny);
			}
		};
		function stopC(){
			$("#menu a").eq(indexTh-1).show().addClass("select2").siblings().hide().removeClass("select2")
			$("#menu a").click(function(){
				//alert("0")
				//return false;	
			})
		}
		function stopC2(){
			$("#menu a").eq(indexTh-1).show().addClass("select2").siblings().hide().removeClass("select2")
			$("#menu a").click(function(){
				//alert("0")
				//return false;	
			})
		}		
		
		
		function EscStop(){
			$("#menu a").show()
			$("#menu a").click(function(){
				//alert("1")
				//return true;	
				$(this).show()
			})			
		}

		function bzIn(){
			$(".active .wallpaper_list .w1").stop().animate({"left":"162px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
			$(".active .wallpaper_list .w2").stop().animate({"left":"526px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
			$(".active .wallpaper_list .w3").stop().animate({"left":"0px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
			$(".active .wallpaper_list .w4").stop().animate({"left":"262px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
			$(".active .wallpaper_list .w5").stop().animate({"left":"526px","opacity":"1",'filter':'alpha(opacity=80)'},1500)
		}

		function bzOver(){
			$(".active .wallpaper_list .w1").stop().css({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'})
			$(".active .wallpaper_list .w2").stop().css({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'})
			$(".active .wallpaper_list .w3").stop().css({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'})
			$(".active .wallpaper_list .w4").stop().css({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'})
			$(".active .wallpaper_list .w5").stop().css({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'})					

		}
		function bzOver2(){
			$(".active .wallpaper_list .w1").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
			$(".active .wallpaper_list .w2").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
			$(".active .wallpaper_list .w3").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
			$(".active .wallpaper_list .w4").stop().animate({"left":"100%","opacity":"0",'filter':'alpha(opacity=0)'},1500)
			$(".active .wallpaper_list .w5").stop().animate({"left":"-50%","opacity":"0",'filter':'alpha(opacity=0)'},1500)					

		}



		$.fn.fullpage.moveSlideRight = function(){
				// $("#Config .config img").css({"left":"400px"})
				// $("#testDrive .wallpaper_list").css({"left":"80%"})
				// $("#moreWondfull .video_list").css({"left":"80%"})
				// $("#testDrive .submit").css({"left":"80%"})
				// $("#moreWondfull2 .wallpaper_list").css({"left":"80%"})
				// $("#moreWondfull3 #news_contact").css({"left":"80%"})





				removeMouseWheelHandler()
				removeTouchHandler();
				bzOver()
				var index=($("#slideIndex").html())
				var indexclass=$(".fp-slide").eq(index).find(".text4").attr("class")
				$(".fp-slide").find(".text4").removeClass("texto")
				//$("section").eq(index).siblings().find(".videoItem img").eq(0).addClass("show").siblings().removeClass("show")
				// text config
				//视频播放config
				function time()
				{
					$("#slide1 .videoItem img").eq(indexS+2).show().siblings().removeClass("show").css("z-index","0")
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#slide1").find(".btn").attr("class","btn")
					$("section").eq(1).find(".text3").animate({opacity:"0",filter:'alpha(opacity=0)'})
					$("section").eq(1).find(".text5").animate({opacity:"0",filter:'alpha(opacity=0)'})
					$("section").eq(1).find(".text4").animate({opacity:"0",filter:'alpha(opacity=0)'})
					$("section").eq(1).find(".pos").fadeOut();
					var url = window.location.toString();
					var id = url.split("#")[1];
				    var runs = indexL 
				    var interval = 120; //循环周期
				    var loopit = function(url){
						 if(indexS==indexL){
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()
							$("#slideIndex").html(indexTh)
							$("section").eq(1).find(".pos").css("z-index","4")
							return;
						 }else{
							$("#slide1 .videoItem img").eq(indexS+1).css("z-index","1").addClass("show").siblings().removeClass("show")
						 	$("#slide1 .videoItem img").eq(indexS+3).css("z-index","0").addClass("show").next().removeClass("show")
							indexS++;
						    stopC(indexTh)
							setTimeout(loopit,interval);
							
						 }
						if(indexS>indexL-2){
							indexTh1=indexTh-1
							$("section").eq(1).find(".text4 img").attr("src","images/text2/"+indexTh1+"-2.png")
							$("section").eq(1).find(".text3").attr("src","images/text3/"+indexTh1+"-1.png")
							$("section").eq(1).find(".text5").attr("src","images/text3/"+indexTh1+"-1-1.png")
							
							
							$(".text3").animate({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text5").animate({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text4").animate({opacity:"1",filter:'alpha(opacity=100)'})
							
							if(indexTh==2){
								$(".pos2").fadeIn().siblings(".pos").fadeOut();
							}
							if(indexTh==4){
								$(".pos3").fadeIn().siblings(".pos").fadeOut();
							}							
							if(indexTh==6){
								$(".pos5").fadeIn().siblings(".pos").fadeOut();
							}	
							if(indexTh==7){
								$(".pos6").fadeIn().siblings(".pos").fadeOut();
							}							
													
						}
						 
					}
					
					loopit();
				}					
				var id = $("#slideIndex").html()

				//$("#console").append(id+'id')
				setTimeout(function(){
				var index2=$("section.active").index()
				if(index2>=1){
					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"none","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
					moveSlide('next');
					addMouseWheelHandler()	
					addTouchHandler();
					
				}					
				else if(id==0){
					$(".fp-slides section").eq(0).css({opacity:"1",filter:'alpha(opacity=100)',display:'block'})
					removeMouseWheelHandler()
					removeTouchHandler();
					var IClass=$("#slide0").find(".text4").attr("class")
					if(IClass=="text4 texto"){ 
						$("#slideIndex").html('1')
						$("#slide0").hide()
							addMouseWheelHandler()	
							addTouchHandler();
						$("#menu .v7").trigger("click")

					}else{
						
						$("#slide0").find(".text4").animate({opacity:"1",filter:'alpha(opacity=100)'},500,function(){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#slide0").find(".text4").attr("class","text4 texto")

						})
					}	

				}
				
				
				else if(id==1){
					//首页进入文字隐藏	
					$(".text3").css({opacity:"0",filter:'alpha(opacity=0)'})
					$(".text5").css({opacity:"0",filter:'alpha(opacity=0)'})
					$(".text4").css({opacity:"0",filter:'alpha(opacity=0)'})		

					$("#slide0").hide()
					removeMouseWheelHandler()
					removeTouchHandler();
					//time(i=$(".active").eq(1).find(".videoItem img.show").index(),indexS=0,indexL=20,indexTh=2)	
					time(indexS=0,indexL=20,indexTh=2)	
			
					_smq.push(['custom','改变1','改变1_让科技得心应手']);

				}
				else if(id==2){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=21,indexL=43,indexTh=3)	
					_smq.push(['custom','改变2','改变2_让未知尽收眼底']);

				}				
				else if(id==3){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=44,indexL=106,indexTh=4)
					_smq.push(['custom','改变3','改变3_让内涵不彰自显']);
	
				}	
				else if(id==4){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=107,indexL=130,indexTh=5)
					_smq.push(['custom','改变4','改变4_让世界紧密联系']);
	
				}					
				else if(id==5){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=131,indexL=170,indexTh=6)
					_smq.push(['custom','改变5','改变5_让风速追随脚步']);

	
				}					
				else if(id==6){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=171,indexL=195,indexTh=7)	
					_smq.push(['custom','改变6','改变6_让空间尽其所长']);

				}									

				else if(id==7){
				    stopC2(indexTh=8)
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$("#divItem #Config").fadeIn().siblings("div").hide()
					$(".videoItem").fadeOut();
					var classD=$("#Config").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
						//	alert($("#slide1 .btn .testdrive").index())
							$("#divItem #Config").removeClass("select")
							$("#Config .config img").css({"left":"400px"})
					}else{
						$("#Config").addClass("select").siblings().removeClass("select")
						$("#Config .config img").stop().animate({opacity:"1",filter:'alpha(opacity=100)',left:'0'},1500,function(){
							$("#slideIndex").html('8')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()

						})
					}

					_smq.push(['custom','第7页','第7页_参数配置']);
				}else if(id==8){
					stopC2(indexTh=9)	
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$("#divItem #testDrive").fadeIn().siblings("div").hide()
					$(".videoItem").fadeOut();
					var classD=$("#testDrive").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
						//	alert($("#slide1 .btn .testdrive").index())
							$("#divItem #testDrive").removeClass("select")
							$("#testDrive .submit").css({"left":"80%"})
					}else{
						$("#testDrive").addClass("select").siblings().removeClass("select")

						$("#testDrive .submit").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('9')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()

						})
					}
					_smq.push(['custom','第8页','第8页_预约试驾']);

				}									
				else if(id==9){
					stopC2(indexTh=10)
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$("#divItem #moreWondfull").fadeIn().siblings("div").hide()
					$(".videoItem").fadeOut();
					var classD=$("#moreWondfull").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
						//	alert($("#slide1 .btn .testdrive").index())
							$("#divItem #moreWondfull").removeClass("select")
							//$("#moreWondfull .video_list").css({"left":"80%"})
					}else{
						$("#moreWondfull").addClass("select").siblings().removeClass("select")
						$("#moreWondfull .video_list").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('10')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()

						})
					}
					_smq.push(['custom','第9页','第9页_更多精彩']);

				}		
				else if(id==10){
					stopC2(indexTh=10)
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$("#divItem #moreWondfull2").fadeIn().siblings("div").hide()
					$(".videoItem").fadeOut();
					var classD=$("#moreWondfull2").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
						//	alert($("#slide1 .btn .testdrive").index())
							$("#divItem #moreWondfull2").removeClass("select")
							//$("#moreWondfull2 .wallpaper_list").css({"left":"80%"})
					}else{
						bzIn()
						$("#moreWondfull2").addClass("select").siblings().removeClass("select")
						$("#moreWondfull2 .wallpaper_list").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('11')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()

						})
					}

				}		
				else if(id>=11){
					stopC2(indexTh=10)
					// addMouseWheelHandler()	
					// addTouchHandler();
					$("#divItem").fadeIn()
					//$("#moreWondfull3 #news_contact").css({"left":"80%"})
					$("#divItem #moreWondfull3").fadeIn().siblings("div").hide()
					$(".videoItem").fadeOut();
					var classD=$("#moreWondfull3").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
						//	alert($("#slide1 .btn .testdrive").index())
							$("#divItem #moreWondfull3").removeClass("select")
							//$("#moreWondfull3 #news_contact").css({"left":"80%"})
					}else{
						bzIn()
						$("#moreWondfull3").addClass("select").siblings().removeClass("select")
						$("#moreWondfull3 #news_contact").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('12')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()

						})
					}

				}										
				
				if(id>=7&&id<=11){
					$("#divItem").show()
					$(".videoItem").hide()
					$("#divItem>div").removeClass("select")
					$("#Config .config img").css({"left":"400px"})
					$("#testDrive .wallpaper_list").css({"left":"80%"})
					$("#moreWondfull .video_list").css({"left":"80%"})
					$("#testDrive .submit").css({"left":"80%"})
					$("#moreWondfull2 .wallpaper_list").css({"left":"80%"})
					$("#moreWondfull3 #news_contact").css({"left":"80%"})




					
				}else if(id<7){
					$(".videoItem").fadeIn()
					$("#divItem").fadeOut()

				}					
					
									
				if(index2<=0){
//					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"none","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
					//$.fn.fullpage.moveTo('firstPage', 0);
					//$.fn.fullpage.moveSlideRight()
				//	text()

				}	

				},200)

		//	moveSlide('next');
			
			
			
			




		};

		$.fn.fullpage.moveSlideLeft = function(){

				//alert($("#slideIndex").html())
				//$("#slide1").find(".btn").attr("class","btn")
				
				
				removeMouseWheelHandler()
				removeTouchHandler();
			
				var index=($("#slideIndex").html()-1)
				var indexclass=$(".fp-slide").eq(index).find(".text4").attr("class")
				$(".fp-slide").find(".text4").removeClass("texto")
				//$("section").eq(index).siblings().find(".videoItem img").eq(0).addClass("show").siblings().removeClass("show")
				// text config
				//视频播放config
				function time()
				{
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#slide1 .videoItem img").eq(indexS-2).show().siblings().removeClass("show").css("z-index","0")
					$(".text3").animate({opacity:"0",filter:'alpha(opacity=0)'})
					$(".text5").animate({opacity:"0",filter:'alpha(opacity=0)'})
					$(".text4").animate({opacity:"0",filter:'alpha(opacity=0)'})

					$("section").eq(1).find(".pos").fadeOut();
				    var runs = indexL 
				    var interval = 120; //循环周期

				    var loopit = function(url){
				    	if(indexS==2){
				    		$("#slide0").show()	
				    	}
						 if(indexS==indexL){
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()
							$("#slideIndex").html(indexTh)
							$("section").eq(1).find(".pos").css("z-index","4")




							return;
						 }else{
							$("section").eq(1).find(".videoItem img").eq(indexS-1).addClass("show").css("z-index","1").siblings().removeClass("show").css("z-index","0")
							$("section").eq(1).find(".videoItem img").eq(indexS-3).addClass("show")
							indexS--;
						    stopC2(indexTh)
							setTimeout(loopit,interval);
							
						 }
						if(indexS<indexL+2){
							$(".text3").animate({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text5").animate({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text4").animate({opacity:"1",filter:'alpha(opacity=100)'})
							indexTh1=indexTh-1
							$("section").eq(1).find(".text4 img").attr("src","images/text2/"+indexTh1+"-2.png")
							$("section").eq(1).find(".text3").attr("src","images/text3/"+indexTh1+"-1.png")
							$("section").eq(1).find(".text5").attr("src","images/text3/"+indexTh1+"-1-1.png")
							

							if(indexTh==2){
								$(".pos2").fadeIn().siblings(".pos").fadeOut();
							}
							if(indexTh==4){
								$(".pos3").fadeIn().siblings(".pos").fadeOut();
							}							
							if(indexTh==6){
								$(".pos5").fadeIn().siblings(".pos").fadeOut();
							}	
							if(indexTh==7){
								$(".pos6").fadeIn().siblings(".pos").fadeOut();
							}							
													
						}
						 
					}

					loopit();
				}					
				var id = $("#slideIndex").html()-1
				//$("#console").append(id+'id')
				setTimeout(function(){
				var index2=$("section.active").index()
				if(index2>=1){
					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"none","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
					moveSlide('prev');
					addMouseWheelHandler()	
					addTouchHandler();
					
				}
				else if(id==0){
					$(".fp-slides section").eq(0).css({opacity:"1",filter:'alpha(opacity=100)',display:'block'})
					removeMouseWheelHandler()
					removeTouchHandler();
					var IClass=$("#slide0").find(".text4").attr("class")
					if(IClass=="text4 texto"){
						$("#slideIndex").html('0')
						$("#slide0").hide()
							addMouseWheelHandler()	
							addTouchHandler();

					}else{
						
						$("#slide0").find(".text4").animate({opacity:"1",filter:'alpha(opacity=100)'},500,function(){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#slide0").find(".text4").attr("class","text4 texto")

						})
					}


				}
								
									
				else if(id==1){
					removeMouseWheelHandler()
					removeTouchHandler();
					if($("section").eq(1).find(".videoItem img.show").index()==$("section").eq(1).find(".videoItem img").length-1){
						//text()
					}
						time(indexS=20,indexL=0,indexTh=1)	
						_smq.push(['custom','首页','首页_首页']);


				}
				else if(id==2){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=43,indexL=21,indexTh=2)	
						_smq.push(['custom','改变1','改变1_让科技得心应手']);


				}				
				else if(id==3){
					removeMouseWheelHandler()
					removeTouchHandler();

						time(indexS=106,indexL=44,indexTh=3)	
						_smq.push(['custom','改变2','改变2_让未知尽收眼底']);


				}	
				else if(id==4){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=130,indexL=107,indexTh=4)	
					_smq.push(['custom','改变3','改变3_让内涵不彰自显']);


				}					
				else if(id==5){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=170,indexL=131,indexTh=5)	
					_smq.push(['custom','改变4','改变4_让世界紧密联系']);


				}					
				else if(id==6){
					removeMouseWheelHandler()
					removeTouchHandler();
					time(indexS=195,indexL=171,indexTh=6)	
					_smq.push(['custom','改变5','改变5_让风速追随脚步']);

				}									

				else if(id==7){
					stopC2(indexTh=7)
				//	stopC2(indexTh=10)
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeOut()
					$(".videoItem").fadeIn();
					$("#slide1").find(".videoItem img").eq(193).addClass("show").siblings().removeClass("show")
					var classD=$("#moreWondfull3").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
							//$("#testDrive #news_contact").css({"left":"80%"})

					}else{
						bzIn()
						$("#moreWondfull3").addClass("select").siblings().removeClass("select")
						$("#moreWondfull3 #news_contact").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('7')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()
							$(".pos6").fadeIn().css("z-index","2").siblings(".pos").fadeOut();

							$(".text3").css({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text5").css({opacity:"1",filter:'alpha(opacity=100)'})
							$(".text4").animate({opacity:"1",filter:'alpha(opacity=100)'})
							// time(indexS=195,indexL=171,indexTh=6)	

						})
					}
					_smq.push(['custom','改变6','改变6_让空间尽其所长']);


				}									

				else if(id==8){
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$(".videoItem").fadeOut();
					stopC2(indexTh=8)
					var classD=$("#Config").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#Config .config img").css({"left":"80%"})
							EscStop()

					}else{
						bzIn()
						$("#Config").addClass("select").show().siblings("div").removeClass("select").hide()
						$("#Config .config img").animate({opacity:"1",filter:'alpha(opacity=100)',left:'0'},1500,function(){
							$("#slideIndex").html('8')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()	


						})
					}
					_smq.push(['custom','第7页','第7页_参数配置']);


				}	
				else if(id==9){
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$(".videoItem").fadeOut();
					var classD=$("#testDrive").attr("class")
					stopC2(indexTh=9)
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#testDrive .submit").css({"left":"80%"})
							EscStop()

					}else{
						bzIn()
						$("#testDrive").addClass("select").show().siblings("div").removeClass("select").hide()
						$("#testDrive .submit").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('9')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()	


						})
					}
					_smq.push(['custom','第8页','第8页_预约试驾']);

				}	

				else if(id==10){
					stopC2(indexTh=10)
					removeMouseWheelHandler()
					removeTouchHandler();
					$("#divItem").fadeIn()
					$(".videoItem").fadeOut();
					var classD=$("#moreWondfull").attr("class")
					if(classD=="select"){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#moreWondfull .video_list").css({"left":"80%"})
							EscStop()

					}else{
						bzOver2()
						setTimeout(function(){

							$("#moreWondfull").addClass("select").fadeIn().siblings("div").removeClass("select").hide()
							$("#moreWondfull .video_list").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){

								$("#slideIndex").html('10')
								addMouseWheelHandler()	
								addTouchHandler();
								EscStop()	

							})


						},800)


					}
					_smq.push(['custom','第9页','第9页_更多精彩']);

				}	

				else if(id==11){
					removeMouseWheelHandler()
					removeTouchHandler();
					stopC2(indexTh=10)
					$("#divItem").fadeIn()
					$(".videoItem").fadeOut();
					$("#moreWondfull2 .wallpaper_list").css({opacity:"0",filter:'alpha(opacity=0)',left:'80%'})
					var classD=$("#moreWondfull2").attr("class")
					if(classD=="select"){
							//addMouseWheelHandler()	
							//addTouchHandler();
							$("#moreWondfull2 .wallpaper_list").css({"left":"80%"})

					}else{
						bzIn()
						$("#moreWondfull2").addClass("select").show().siblings("div").removeClass("select").hide()
						$("#moreWondfull2 .wallpaper_list").animate({opacity:"1",filter:'alpha(opacity=100)',left:'50%'},1500,function(){
							$("#slideIndex").html('11')
							addMouseWheelHandler()	
							addTouchHandler();
							EscStop()	
							


						})
					}
					_smq.push(['custom','第9页','第9页_更多精彩']);
				}	

					
					
									
				if(id<=0){
							addMouseWheelHandler()	
							addTouchHandler();
							$("#slide0").show();
							$("#slideIndex").html("0")
				}	

				},100)
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
//				var index=($("#slideIndex").html())
//				var index2=$("section.active").index()
//				var indexclass=$(".fp-slide").eq(index).find(".text4").attr("class")
//				$(".fp-slide").find(".text4").removeClass("texto")
//				//$("section").eq(index).siblings().find(".videoItem img").eq(0).addClass("show").siblings().removeClass("show")
//				// text config
//				//视频播放config
//				function time()
//				{
//					
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					var url = window.location.toString();
//					var id = url.split("#")[1];
//				    var runs = indexL 
//				    var interval = 120; //循环周期
//				    var loopit = function(url){
//					  // console.info(i)
//					  // console.info(runs)
//						 if(indexS==indexL){
//							addMouseWheelHandler()	
//							addTouchHandler();
//							EscStop()
//							$("#slideIndex").html(indexTh)
//							$("section").eq(1).find(".pos").css("z-index","4")
//							//moveSlide('next');
//							return;
//						 }else{
//							$("section").eq(1).find(".videoItem img").eq(indexS-1).addClass("show").siblings().removeClass("show")
//							indexS--;
//							//console.info(indexS)
//							//console.info(indexL)
//							setTimeout(loopit,interval);
//						 }
//					}
//					indexTh1=indexTh-1
//					$("section").eq(1).find(".text4 img").attr("src","images/text2/"+indexTh1+"-2.png")
//					
//					loopit();
//				}					
//				var id = $("#slideIndex").html()*1-1
//				if(id==1){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(1).find(".videoItem img.show").index()==$("section").eq(1).find(".videoItem img").length-1){
//						//text()
//					}
//						time(i=$(".active").eq(1).find(".videoItem img.show").index(),indexS=20,indexL=0,indexTh=1)	
//				}
//				if(id==2){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(2).find(".videoItem img.show").index()==$("section").eq(2).find(".videoItem img").length-1){
//						//text()
//					}
//						time(indexS=43,indexL=21,indexTh=2)	
//				}				
//				if(id==3){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(3).find(".videoItem img.show").index()==$("section").eq(3).find(".videoItem img").length-1){
//						//text()
//					}
//						time(indexS=106,indexL=44,indexTh=3)	
//				}	
//				if(id==4){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(4).find(".videoItem img.show").index()==$("section").eq(4).find(".videoItem img").length-1){
//						//text()
//					}
//						time(indexS=130,indexL=107,indexTh=4)	
//				}					
//				if(id==5){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(5).find(".videoItem img.show").index()==$("section").eq(5).find(".videoItem img").length-1){
//						//text()
//					}
//						time(indexS=170,indexL=131,indexTh=5)	
//				}					
//				if(id==6){
//					removeMouseWheelHandler()
//					removeTouchHandler();
//					if($("section").eq(6).find(".videoItem img.show").index()==$("section").eq(6).find(".videoItem img").length-1){
//						//text()
//					}
//						time(indexS=195,indexL=171,indexTh=6)	
//				}									
//
//
//
//
//
//
//			
//				if(index2>=1){
//					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"none","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
//					moveSlide('prev');
//					addMouseWheelHandler()	
//					addTouchHandler();
//					
//				}
//				if(index2<=0){
//					$(".fp-slide").find(".text4").removeClass("texto").css({"display":"none","top":"173px","opacity":"0",'filter':'alpha(opacity=0)'})	
//					$("#menu a").eq(7).addClass("select2").siblings("a").removeClass("select2")
//					//window.location.href="#firstPage/0"
//					moveSlide('prev');
//					addMouseWheelHandler()	
//					addTouchHandler();
//					
//					
//				}	
//








			//	moveSlide('prev');

			
		};

		function moveSlide(direction){
		    var activeSection = $('.fp-section.active');
		    var slides = activeSection.find('.fp-slides');

		    // more than one slide needed and nothing should be sliding
			if (!slides.length || slideMoving) {
			    return;
			}

		    var currentSlide = slides.find('.fp-slide.active');
		    var destiny = null;

		    if(direction === 'prev'){
		        destiny = currentSlide.prev('.fp-slide');
		    }else{
		        destiny = currentSlide.next('.fp-slide');
		    }

		    //isn't there a next slide in the secuence?
			if(!destiny.length){
				//respect loopHorizontal settin
				if (!options.loopHorizontal) return;

			    if(direction === 'prev'){
			        destiny = currentSlide.siblings(':last');
			    }else{
			        destiny = currentSlide.siblings(':first');
			    }
			}

		    slideMoving = true;

		    landscapeScroll(slides, destiny);
		}

		function scrollPage(element, callback, isMovementUp){
			var scrollOptions = {}, scrolledElement;
			var dest = element.position();
			if(typeof dest === "undefined"){ return; } //there's no element to scroll, leaving the function
			var dtop = dest.top;
			var yMovement = getYmovement(element);
			var anchorLink  = element.data('anchor');
			var sectionIndex = element.index('.fp-section');
			var activeSlide = element.find('.fp-slide.active');
			var activeSection = $('.fp-section.active');
			var leavingSection = activeSection.index('.fp-section') + 1;

			//caching the value of isResizing at the momment the function is called
			//because it will be checked later inside a setTimeout and the value might change
			var localIsResizing = isResizing;

			if(activeSlide.length){
				var slideAnchorLink = activeSlide.data('anchor');
				var slideIndex = activeSlide.index();

			}

			// If continuousVertical && we need to wrap around
			if (options.autoScrolling && options.continuousVertical && typeof (isMovementUp) !== "undefined" &&
				((!isMovementUp && yMovement == 'up') || // Intending to scroll down but about to go up or
				(isMovementUp && yMovement == 'down'))) { // intending to scroll up but about to go down

				// Scrolling down
				if (!isMovementUp) {
					// Move all previous sections to after the active section
					$(".fp-section.active").after(activeSection.prevAll(".fp-section").get().reverse());
				}
				else { // Scrolling up
					// Move all next sections to before the active section
					$(".fp-section.active").before(activeSection.nextAll(".fp-section"));
				}

				// Maintain the displayed position (now that we changed the element order)
				silentScroll($('.fp-section.active').position().top);

				// save for later the elements that still need to be reordered
				var wrapAroundElements = activeSection;

				// Recalculate animation variables
				dest = element.position();
				dtop = dest.top;
				yMovement = getYmovement(element);
			}


			element.addClass('active').siblings().removeClass('active');

			//preventing from activating the MouseWheelHandler event
			//more than once if the page is scrolling
			isMoving = true;

			if(typeof anchorLink !== 'undefined'){
				setURLHash(slideIndex, slideAnchorLink, anchorLink);
			}

			if(options.autoScrolling){
				scrollOptions['top'] = -dtop;
				scrolledElement = '.'+wrapperSelector;
			}else{
				scrollOptions['scrollTop'] = dtop;
				scrolledElement = 'html, body';
			}

			// Fix section order after continuousVertical changes have been animated
			var continuousVerticalFixSectionOrder = function () {
				// If continuousVertical is in effect (and autoScrolling would also be in effect then),
				// finish moving the elements around so the direct navigation will function more simply
				if (!wrapAroundElements || !wrapAroundElements.length) {
					return;
				}

				if (isMovementUp) {
					$('.fp-section:first').before(wrapAroundElements);
				}
				else {
					$('.fp-section:last').after(wrapAroundElements);
				}

				silentScroll($('.fp-section.active').position().top);
			};


			// Use CSS3 translate functionality or...
			if (options.css3 && options.autoScrolling) {

				//callback (onLeave) if the site is not just resizing and readjusting the slides
				$.isFunction(options.onLeave) && !localIsResizing && options.onLeave.call(this, leavingSection, (sectionIndex + 1), yMovement);


				var translate3d = 'translate3d(0px, -' + dtop + 'px, 0px)';
				transformContainer(translate3d, true);

				setTimeout(function () {
					//fix section order from continuousVertical
					continuousVerticalFixSectionOrder();

					//callback (afterLoad) 	if the site is not just resizing and readjusting the slides
					$.isFunction(options.afterLoad) && !localIsResizing && options.afterLoad.call(this, anchorLink, (sectionIndex + 1));

					setTimeout(function () {
						isMoving = false;
						$.isFunction(callback) && callback.call(this);
					}, scrollDelay);
				}, options.scrollingSpeed);
			} else { // ... use jQuery animate

				//callback (onLeave) if the site is not just resizing and readjusting the slides
				$.isFunction(options.onLeave) && !localIsResizing && options.onLeave.call(this, leavingSection, (sectionIndex + 1), yMovement);

				$(scrolledElement).animate(
					scrollOptions
				, options.scrollingSpeed, options.easing, function () {
					//fix section order from continuousVertical
					continuousVerticalFixSectionOrder();

					//callback (afterLoad) if the site is not just resizing and readjusting the slides
					$.isFunction(options.afterLoad) && !localIsResizing && options.afterLoad.call(this, anchorLink, (sectionIndex + 1));

					setTimeout(function () {
						isMoving = false;
						$.isFunction(callback) && callback.call(this);
					}, scrollDelay);
				});
			}

			//flag to avoid callingn `scrollPage()` twice in case of using anchor links
			lastScrolledDestiny = anchorLink;

			//avoid firing it twice (as it does also on scroll)
			if(options.autoScrolling){
				activateMenuElement(anchorLink);
				activateNavDots(anchorLink, sectionIndex);
			}
		}

		function scrollToAnchor(){
			//getting the anchor link in the URL and deleting the `#`
			var value =  window.location.hash.replace('#', '').split('/');
			var section = value[0];
			var slide = value[1];

			if(section){  //if theres any #
				scrollPageAndSlide(section, slide);
			}
		}

		//detecting any change on the URL to scroll to the given anchor link
		//(a way to detect back history button as we play with the hashes on the URL)
		$(window).on('hashchange', hashChangeHandler);

		function hashChangeHandler(){
			if(!isScrolling){
				var value =  window.location.hash.replace('#', '').split('/');
				var section = value[0];
				var slide = value[1];

				if(section.length){
					//when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
					var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
					var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slide === 'undefined' && !slideMoving);

					/*in order to call scrollpage() only once for each destination at a time
					It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
					event is fired on every scroll too.*/
					if ((section && section !== lastScrolledDestiny) && !isFirstSlideMove || isFirstScrollMove || (!slideMoving && lastScrolledSlide != slide ))  {
						scrollPageAndSlide(section, slide);
					}
				}
			}
		}


		/**
		 * Sliding with arrow keys, both, vertical and horizontal
		 */
		$(document).keydown(function(e) {
			//Moving the main page with the keyboard arrows if keyboard scrolling is enabled
			if (options.keyboardScrolling && !isMoving) {
				switch (e.which) {
					//up
					case 38:
					case 33:
						$.fn.fullpage.moveSlideLeft();
						$.fn.fullpage.moveSectionUp();
						break;

					//down
					case 40:
					case 34:
						$.fn.fullpage.moveSectionDown();
						$.fn.fullpage.moveSlideRight();
						break;

					//Home
					case 36:
						$.fn.fullpage.moveTo(1);
						break;

					//End
					case 35:
						$.fn.fullpage.moveTo( $('.fp-section').length );
						break;

					//left
					case 37:
						$.fn.fullpage.moveSlideLeft();
						break;

					//right
					case 39:
						$.fn.fullpage.moveSlideRight();
						break;

					default:
						return; // exit this handler for other keys
				}
			}
		});

		//navigation action
		$(document).on('click', '#fp-nav a', function(e){
			e.preventDefault();
			var index = $(this).parent().index();
			scrollPage($('.fp-section').eq(index));
		});

		//navigation tooltips
		$(document).on({
			mouseenter: function(){
				var tooltip = $(this).data('tooltip');
				$('<div class="fp-tooltip ' + options.navigationPosition +'">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
			},
			mouseleave: function(){
				$(this).find('.fp-tooltip').fadeOut().remove();
			}
		}, '#fp-nav li');


		if(options.normalScrollElements){
			$(document).on('mouseenter', options.normalScrollElements, function () {
				$.fn.fullpage.setMouseWheelScrolling(false);
			});

			$(document).on('mouseleave', options.normalScrollElements, function(){
				$.fn.fullpage.setMouseWheelScrolling(true);
			});
		}

		/**
		 * Scrolling horizontally when clicking on the slider controls.
		 */
		$('.fp-section').on('click', '.fp-controlArrow', function() {
			if ($(this).hasClass('fp-prev')) {
				$.fn.fullpage.moveSlideLeft();
			} else {
				$.fn.fullpage.moveSlideRight();
			}
		});


		/**
		 * Scrolling horizontally when clicking on the slider controls.
		 */
		$('.fp-section').on('click', '.toSlide', function(e) {
			e.preventDefault();

			var slides = $(this).closest('.fp-section').find('.fp-slides');
			var currentSlide = slides.find('.fp-slide.active');
			var destiny = null;

			destiny = slides.find('.fp-slide').eq( ($(this).data('index') -1) );

			if(destiny.length > 0){
				landscapeScroll(slides, destiny);
			}
		});

		/**
		* Scrolls horizontal sliders.
		*/
		function landscapeScroll(slides, destiny){
			var destinyPos = destiny.position();
			var slidesContainer = slides.find('.fp-slidesContainer').parent();
			var slideIndex = destiny.index();
			var section = slides.closest('.fp-section');
			var sectionIndex = section.index('.fp-section');
			var anchorLink = section.data('anchor');
			var slidesNav = section.find('.fp-slidesNav');
			var slideAnchor = destiny.data('anchor');

			//caching the value of isResizing at the momment the function is called
			//because it will be checked later inside a setTimeout and the value might change
			var localIsResizing = isResizing;

			if(options.onSlideLeave){
				var prevSlideIndex = section.find('.fp-slide.active').index();
				var xMovement = getXmovement(prevSlideIndex, slideIndex);
				//alert(slideIndex)
				//$("#slideIndex").html(slideIndex)
				//if the site is not just resizing and readjusting the slides
				if(!localIsResizing){
					$.isFunction( options.onSlideLeave ) && options.onSlideLeave.call( this, anchorLink, (sectionIndex + 1), prevSlideIndex, xMovement);
				}
			}

			destiny.addClass('active').siblings().removeClass('active');


			if(typeof slideAnchor === 'undefined'){
				slideAnchor = slideIndex;
			}

			if(!options.loopHorizontal){
				//hidding it for the fist slide, showing for the rest
				section.find('.fp-controlArrow.fp-prev').toggle(slideIndex!=0);

				//hidding it for the last slide, showing for the rest
				section.find('.fp-controlArrow.fp-next').toggle(!destiny.is(':last-child'));
			}

			//only changing the URL if the slides are in the current section (not for resize re-adjusting)
			if(section.hasClass('active')){
				setURLHash(slideIndex, slideAnchor, anchorLink);
			}

			if(options.css3){
				var translate3d = 'translate3d(-' + destinyPos.left + 'px, 0px, 0px)';

				slides.find('.fp-slidesContainer').toggleClass('fp-easing', options.scrollingSpeed>0).css(getTransforms(translate3d));

				setTimeout(function(){
					//if the site is not just resizing and readjusting the slides
					if(!localIsResizing){
						$.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( this, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex );
					}

					slideMoving = false;
				}, options.scrollingSpeed, options.easing);
			}else{
				slidesContainer.animate({
					scrollLeft : destinyPos.left
				}, options.scrollingSpeed, options.easing, function() {

					//if the site is not just resizing and readjusting the slides
					if(!localIsResizing){
						$.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( this, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex);
					}
					//letting them slide again
					slideMoving = false;
				});
			}

			slidesNav.find('.active').removeClass('active');
			slidesNav.find('li').eq(slideIndex).find('a').addClass('active');
		}


	    var resizeId;

	    //when resizing the site, we adjust the heights of the sections, slimScroll...
	    $(window).resize(function() {
	    	// rebuild immediately on touch devices
			if (isTouchDevice) {
	        	$.fn.fullpage.reBuild();
	      	}else{
	      		//in order to call the functions only when the resize is finished
	    		//http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
	      		clearTimeout(resizeId);

	        	resizeId = setTimeout($.fn.fullpage.reBuild, 500);
	      	}
	    });


		/**
		 * When resizing is finished, we adjust the slides sizes and positions
		 */
		$.fn.fullpage.reBuild = function(){
			isResizing = true;

			var windowsWidth = $(window).width();
			windowsHeight = $(window).height();

			//text and images resizing
			if (options.resize) {
				resizeMe(windowsHeight, windowsWidth);
			}

			$('.fp-section').each(function(){
				var scrollHeight = windowsHeight - parseInt($(this).css('padding-bottom')) - parseInt($(this).css('padding-top'));

				//adjusting the height of the table-cell for IE and Firefox
				if(options.verticalCentered){
					$(this).find('.fp-tableCell').css('height', getTableHeight($(this)) + 'px');
				}

				$(this).css('height', windowsHeight + 'px');

				//resizing the scrolling divs
				if(options.scrollOverflow){
					var slides = $(this).find('.fp-slide');

					if(slides.length){
						slides.each(function(){
							createSlimScrolling($(this));
						});
					}else{
						createSlimScrolling($(this));
					}

				}

				//adjusting the position fo the FULL WIDTH slides...
				var slides = $(this).find('.fp-slides');
				if (slides.length) {
					landscapeScroll(slides, slides.find('.fp-slide.active'));
				}
			});

			//adjusting the position for the current section
			var destinyPos = $('.fp-section.active').position();

			var activeSection = $('.fp-section.active');

			//isn't it the first section?
			if(activeSection.index('.fp-section')){
				scrollPage(activeSection);
			}

			isResizing = false;
			$.isFunction( options.afterResize ) && options.afterResize.call( this);
		}

		/**
		 * Resizing of the font size depending on the window size as well as some of the images on the site.
		 */
		function resizeMe(displayHeight, displayWidth) {
			//Standard height, for which the body font size is correct
			var preferredHeight = 825;
			var windowSize = displayHeight;

			/* Problem to be solved

			if (displayHeight < 825) {
				var percentage = (windowSize * 100) / preferredHeight;
				var newFontSize = percentage.toFixed(2);

				$("img").each(function() {
					var newWidth = ((80 * percentage) / 100).toFixed(2);
					$(this).css("width", newWidth + '%');
				});
			} else {
				$("img").each(function() {
					$(this).css("width", '');
				});
			}*/

			if (displayHeight < 825 || displayWidth < 900) {
				if (displayWidth < 900) {
					windowSize = displayWidth;
					preferredHeight = 900;
				}
				var percentage = (windowSize * 100) / preferredHeight;
				var newFontSize = percentage.toFixed(2);

				$("body").css("font-size", newFontSize + '%');
			} else {
				$("body").css("font-size", '100%');
			}
		}

		/**
		 * Activating the website navigation dots according to the given slide name.
		 */
		function activateNavDots(name, sectionIndex){
			if(options.navigation){
				$('#fp-nav').find('.active').removeClass('active');
				if(name){
					$('#fp-nav').find('a[href="#' + name + '"]').addClass('active');
				}else{
					$('#fp-nav').find('li').eq(sectionIndex).find('a').addClass('active');
				}
			}
		}

		/**
		 * Activating the website main menu elements according to the given slide name.
		 */
		function activateMenuElement(name){
			if(options.menu){
				$(options.menu).find('.active').removeClass('active');
				$(options.menu).find('[data-menuanchor="'+name+'"]').addClass('active');

			}
		}

		/**
		* Return a boolean depending on whether the scrollable element is at the end or at the start of the scrolling
		* depending on the given type.
		*/
		function isScrolled(type, scrollable){
			if(type === 'top'){
				return !scrollable.scrollTop();
			}else if(type === 'bottom'){
				return scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
			}
		}

		/**
		* Retuns `up` or `down` depending on the scrolling movement to reach its destination
		* from the current section.
		*/
		function getYmovement(destiny){
			var fromIndex = $('.fp-section.active').index('.fp-section');
			var toIndex = destiny.index('.fp-section');

			if(fromIndex > toIndex){
				return 'up';
			}
			return 'down';
		}

		/**
		* Retuns `right` or `left` depending on the scrolling movement to reach its destination
		* from the current slide.
		*/
		function getXmovement(fromIndex, toIndex){
			if( fromIndex == toIndex){
				return 'none'
			}
			if(fromIndex > toIndex){
				return 'left';
			}
			return 'right';
		}


		function createSlimScrolling(element){
			//needed to make `scrollHeight` work under Opera 12
			element.css('overflow', 'hidden');

			//in case element is a slide
			var section = element.closest('.fp-section');
			var scrollable = element.find('.fp-scrollable');

			//if there was scroll, the contentHeight will be the one in the scrollable section
			if(scrollable.length){
				var contentHeight = scrollable.get(0).scrollHeight;
			}else{
				var contentHeight = element.get(0).scrollHeight;
				if(options.verticalCentered){
					contentHeight = element.find('.fp-tableCell').get(0).scrollHeight;
				}
			}

			var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));

			//needs scroll?
			if ( contentHeight > scrollHeight) {
				//was there already an scroll ? Updating it
				if(scrollable.length){
					scrollable.css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
				}
				//creating the scrolling
				else{
					if(options.verticalCentered){
						element.find('.fp-tableCell').wrapInner('<div class="fp-scrollable" />');
					}else{
						element.wrapInner('<div class="fp-scrollable" />');
					}


					element.find('.fp-scrollable').slimScroll({
						allowPageScroll: true,
						height: scrollHeight + 'px',
						size: '10px',
						alwaysVisible: true
					});
				}
			}

			//removing the scrolling when it is not necessary anymore
			else{
				removeSlimScroll(element);
			}

			//undo
			element.css('overflow', '');
		}

		function removeSlimScroll(element){
			element.find('.fp-scrollable').children().first().unwrap().unwrap();
			element.find('.slimScrollBar').remove();
			element.find('.slimScrollRail').remove();
		}

		function addTableClass(element){
			element.addClass('fp-table').wrapInner('<div class="fp-tableCell" style="height:' + getTableHeight(element) + 'px;" />');
		}

		function getTableHeight(element){
			var sectionHeight = windowsHeight;

			if(options.paddingTop || options.paddingBottom){
				var section = element;
				if(!section.hasClass('fp-section')){
					section = element.closest('.fp-section');
				}

				var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
				sectionHeight = (windowsHeight - paddings);
			}

			return sectionHeight;
		}

		/**
		* Adds a css3 transform property to the container class with or without animation depending on the animated param.
		*/
		function transformContainer(translate3d, animated){
			container.toggleClass('fp-easing', animated);

			container.css(getTransforms(translate3d));
		}


		/**
		* Scrolls to the given section and slide
		*/
		function scrollPageAndSlide(destiny, slide){
			if (typeof slide === 'undefined') {
			    slide = 0;
			}

			if(isNaN(destiny)){
				var section = $('[data-anchor="'+destiny+'"]');
			}else{
				var section = $('.fp-section').eq( (destiny -1) );
			}


			//we need to scroll to the section and then to the slide
			if (destiny !== lastScrolledDestiny && !section.hasClass('active')){
				scrollPage(section, function(){
					scrollSlider(section, slide)
				});
			}
			//if we were already in the section
			else{
				scrollSlider(section, slide);
			}
		}

		/**
		* Scrolls the slider to the given slide destination for the given section
		*/
		function scrollSlider(section, slide){
			if(typeof slide != 'undefined'){
				var slides = section.find('.fp-slides');
				var destiny =  slides.find('[data-anchor="'+slide+'"]');

				if(!destiny.length){
					destiny = slides.find('.fp-slide').eq(slide);
				}

				if(destiny.length){
					landscapeScroll(slides, destiny);
				}
			}
		}

		/**
		* Creates a landscape navigation bar with dots for horizontal sliders.
		*/
		function addSlidesNavigation(section, numSlides){
			section.append('<div class="fp-slidesNav"><ul></ul></div>');
			var nav = section.find('.fp-slidesNav');

			//top or bottom
			nav.addClass(options.slidesNavPosition);

			for(var i=0; i< numSlides; i++){
				nav.find('ul').append('<li><a href="#"><span></span></a></li>');
			}

			//centering it
			nav.css('margin-left', '-' + (nav.width()/2) + 'px');

			nav.find('li').first().find('a').addClass('active');
		}


		/**
		* Sets the URL hash for a section with slides
		*/
		function setURLHash(slideIndex, slideAnchor, anchorLink){
			var sectionHash = '';

			if(options.anchors.length){

				//isn't it the first slide?
				if(slideIndex){
					if(typeof anchorLink !== 'undefined'){
						sectionHash = anchorLink;
					}

					//slide without anchor link? We take the index instead.
					if(typeof slideAnchor === 'undefined'){
						slideAnchor = slideIndex;
					}

					lastScrolledSlide = slideAnchor;
					location.hash = sectionHash + '/' + slideAnchor;
//					setTimeout(function(){
//						if(slideIndex<=6){
//							$.fn.fullpage.moveSlideRight()//设定导航自动播放
//							$(".videoItem img").eq(0).addClass("show").siblings().removeClass("show")
//							
//								var l=$(".videoItem").length
//								for(ii=0;ii<=l;ii++){
//									$(".videoItem").eq(ii).find("img").eq(0).addClass("show").siblings().removeClass("show")
//								}							
//						}
//					},1000)
				//first slide won't have slide anchor, just the section one
				}else if(typeof slideIndex !== 'undefined'){
					lastScrolledSlide = slideAnchor;
					//location.hash = anchorLink;
				}

				//section without slides
				else{
					//location.hash = anchorLink;
				}
			}
		}

		/**
		* Scrolls the slider to the given slide destination for the given section
		*/
		$(document).on('click', '.fp-slidesNav a', function(e){
			e.preventDefault();
			var slides = $(this).closest('.fp-section').find('.fp-slides');
			var destiny = slides.find('.fp-slide').eq($(this).closest('li').index());

			landscapeScroll(slides, destiny);
		});


		/**
		* Checks for translate3d support
		* @return boolean
		* http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
		*/
		function support3d() {
			var el = document.createElement('p'),
				has3d,
				transforms = {
					'webkitTransform':'-webkit-transform',
					'OTransform':'-o-transform',
					'msTransform':'-ms-transform',
					'MozTransform':'-moz-transform',
					'transform':'transform'
				};

			// Add it to the body to get the computed style.
			document.body.insertBefore(el, null);

			for (var t in transforms) {
				if (el.style[t] !== undefined) {
					el.style[t] = "translate3d(1px,1px,1px)";
					has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
				}
			}

			document.body.removeChild(el);

			return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
		}



		/**
		* Removes the auto scrolling action fired by the mouse wheel and tackpad.
		* After this function is called, the mousewheel and trackpad movements won't scroll through sections.
		*/
		function removeMouseWheelHandler(){
			if (document.addEventListener) {
				document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
			} else {
				document.detachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
			}
		}


		/**
		* Adds the auto scrolling action for the mouse wheel and tackpad.
		* After this function is called, the mousewheel and trackpad movements will scroll through sections
		*/
		function addMouseWheelHandler(){
			if (document.addEventListener) {
				document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
				document.addEventListener("wheel", MouseWheelHandler, false); //Firefox
			} else {
				document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8

			}
		}


		/**
		* Adds the possibility to auto scroll through sections on touch devices.
		*/
		function addTouchHandler(){
			//Microsoft pointers
			MSPointer = getMSPointer();

			$(document).off('touchstart ' +  MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
			$(document).off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler);
		}

		/**
		* Removes the auto scrolling for touch devices.
		*/
		function removeTouchHandler(){
			//Microsoft pointers
			MSPointer = getMSPointer();

			$(document).off('touchstart ' + MSPointer.down);
			$(document).off('touchmove ' + MSPointer.move);
		}


		/*
		* Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
		* http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
		*/
		function getMSPointer(){
			var pointer;

			//IE >= 11
			if(window.PointerEvent){
				pointer = { down: "pointerdown", move: "pointermove"};
			}

			//IE < 11
			else{
				pointer = { down: "MSPointerDown", move: "MSPointerMove"};
			}

			return pointer;
		}
		/**
		* Gets the pageX and pageY properties depending on the browser.
		* https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
		*/
		function getEventsPage(e){
			var events = new Array();
			if (window.navigator.msPointerEnabled){
				events['y'] = e.pageY;
				events['x'] = e.pageX;
			}else{
				events['y'] = e.touches[0].pageY;
				events['x'] =  e.touches[0].pageX;
			}

			return events;
		}

		function silentLandscapeScroll(activeSlide){
			var prevScrollingSpeepd = options.scrollingSpeed;
			$.fn.fullpage.setScrollingSpeed (0);
			landscapeScroll(activeSlide.closest('.fp-slides'), activeSlide);
			$.fn.fullpage.setScrollingSpeed(prevScrollingSpeepd);
		}

		function silentScroll(top){
			if (options.css3) {
				var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
				transformContainer(translate3d, false);
			}
			else {
				container.css("top", -top);
			}
		}

		function getTransforms(translate3d){
			return {
				'-webkit-transform': translate3d,
				'-moz-transform': translate3d,
				'-ms-transform':translate3d,
				'transform': translate3d
			};
		}


		/*
		* Destroys fullpage.js plugin events and optinally its html markup and styles
		*/
		$.fn.fullpage.destroy = function(all){
			$.fn.fullpage.setAutoScrolling(false);
 			$.fn.fullpage.setAllowScrolling(false);
 			$.fn.fullpage.setKeyboardScrolling(false);


 			$(window)
				.off('scroll', scrollHandler)
  				.off('hashchange', hashChangeHandler);

			$(document)
				.off('click', '#fp-nav a')
				.off('mouseenter', '#fp-nav li')
				.off('mouseleave', '#fp-nav li')
				.off('click', '.fp-slidesNav a')
  				.off('mouseover', options.normalScrollElements)
  				.off('mouseout', options.normalScrollElements);

			$('.fp-section')
				.off('click', '.fp-controlArrow')
				.off('click', '.toSlide');

			//lets make a mess!
			if(all){
				destroyStructure();
			}
 		};

 		/*
		* Removes inline styles added by fullpage.js
		*/
		function destroyStructure(){
			//reseting the `top` or `translate` properties to 0
	 		silentScroll(0);

			$('#fp-nav, .fp-slidesNav, .fp-controlArrow').remove();

			//removing inline styles
			$('.fp-section').css( {
				'height': '',
				'background-color' : '',
				'padding': ''
			});

			$('.fp-slide').css( {
				'width': ''
			});

			container.css({
	 			'height': '',
	 			'position': '',
	 			'-ms-touch-action': ''
	 		});

			//removing added classes
			$('.fp-section, .fp-slide').each(function(){
				removeSlimScroll($(this));
				$(this).removeClass('fp-table active');
			})

			container.find('.fp-easing').removeClass('fp-easing');

			//Unwrapping content
			container.find('.fp-tableCell, .fp-slidesContainer, .fp-slides').each(function(){
				//unwrap not being use in case there's no child element inside and its just text
				$(this).replaceWith(this.childNodes);
			});

			//scrolling the page to the top with no animation
			$('html, body').scrollTop(0);

			//to know if the plugin was already used in case it is used in a future again
			container.addClass('fullpage-used');
		}
		
		//news contact	
		$("#news_contact .news dl dt.more a").click(function(){
				removeMouseWheelHandler()
				removeTouchHandler();
				var link_h=$(this).attr("title")
				$("#news_body").fadeIn().find("iframe").attr("src",link_h)
		})
		$("#news_body .iframe .close").click(function(){
				addMouseWheelHandler()
				addTouchHandler();
				$("#news_body").fadeOut()
		})
		

	};




})(jQuery);
