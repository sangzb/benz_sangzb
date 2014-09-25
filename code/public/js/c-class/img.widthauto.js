(function($) {
$.fn.fullBg = function(){
var bgImg = $(".b_img");
bgImg.addClass('fullBg');
function resizeImg() {
var imgwidth = bgImg.width();
var imgheight = bgImg.height();
var winwidth = $(window).width();
var winheight = $(window).height();
var widthratio = winwidth/imgwidth;
var heightratio = winheight/imgheight;
var widthdiff = heightratio*imgwidth;
var heightdiff = widthratio*imgheight;
//console.info("imgwidth"+imgwidth)
//console.info("imgheight"+imgheight)
//console.info("winwidth"+winwidth)
//console.info("winheight"+winheight)
//console.info("widthratio"+widthratio)
//console.info("heightratio"+heightratio)
//console.info("widthdiff"+widthdiff)
//console.info("heightdiff"+heightdiff)
if(heightdiff>winheight) {
	bgImg.css({
		width: winwidth+'px',
		height: heightdiff+'px',
	});
	$("div.pos,.img2").css({
		width: winwidth+'px',
		height: heightdiff+'px',
	})
} else {
	bgImg.css({
	width: widthdiff+'px',
	height: winheight+'px',
	});

	$("div.pos,.img2").css({
		width: widthdiff+'px',
		height: winheight+'px',
	})

	}
	
if($(window).height()>bgImg.height()){
var top=$(window).height()-bgImg.height()
	bgImg.css({
		top:-top
	});	

	$("div.pos").css({
		top:top
	})

	} else {

var top=($(window).height()-bgImg.height())/2
	bgImg.css({
		top:top
	});	
	$("div.pos").css({
		top:top
	})		
}	
	
	
}


resizeImg();
$(window).resize(function() {
	resizeImg();
});
};
})(jQuery)