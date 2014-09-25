var w=$(window);
var d=$(document);
var WW=w.width();
var HH=w.height();
var RATE=1136/640;


var THISW=0;
var THISH=0;
if(WW/HH>RATE){
	THISH=HH;
	THISW=HH*1136/640;
	
	$("#outercon").css({"left":(WW-THISW)/2,"width":THISW});
	$("body").css({"background-size":"auto 100%"});
}else{
	THISW=WW;
	THISH=WW*640/1136;
	
	$("#outercon").css({"top":(HH-THISH)/2,"height":THISH});
	$("body").css({"background-size":"100% auto"});
}


var WR=1;
var HR=1;


//双屏页面
if($("#world").length){
	if(THISW<WW){
		WR=THISW/WW;
		$("#logo").css("width","31.86%");
		$("#logotext").css("width","9.45%");
		$("#soundicon").css("width","3.7%");
		$("#sharetext").css("width","4.22%");
		$("#slidercon .sliderhalo").css({"width":304*WR,"top":-(221*WR)*0.47,"left":-(304*WR)*0.55});
		$("#slidercon .slidertip").css("width","64.8%");
		
		$("#videocontrol").css("width","16.9%");
		$("#fullsc").css("width","29.4%");
		$("#skipvideo").css("width","23%")
		
		$("#room").css("height",THISW*0.9*350/971);
		//$(".endpagearea").css("background-size","");
	}else{
		WR=THISH/HH;
		$("#logo").css("width","31.86%");
		$("#logotext").css("width","9.45%");
		$("#soundicon").css("width","3.7%");
		$("#sharetext").css("width","4.22%");
		$("#slidercon .sliderhalo").css({"width":304*WR,"top":-(221*WR)*0.47,"left":-(304*WR)*0.55});
		$("#slidercon .slidertip").css("width","64.8%");
		
		$("#videocontrol").css("width","16.9%");
		$("#fullsc").css("width","29.4%");
		$("#skipvideo").css("width","23%")
		
		$("#room").css("height",THISW*0.9*350/971);
		//$(".endpagearea").css("background-size","");
	}
}
if($("#content").length){
	if(THISW<WW){
		WR=THISW/WW;
	}else{
		WR=THISH/HH;
	}
	
	$("#sharetext").css("width","4.22%");
	$("#logo").css("width","31.86%");
	$("#logotext").css("width","9.45%");
	$("#btns").css({"width":"32.57%","height":"41.56%"});
	$("#arrow").css("width","5.45%");
}

var orient="orientationchange";
if(navigator.appVersion.toLowerCase().indexOf("android")>0){
	orient="resize"
}

function hfunc(){
	$("#outercon").show();
	$("#verticaltip").remove();
	$(this).scrollTop(0);
	
	RATE=1136/640;

	if(WW/HH>RATE){
		THISH=HH;
		THISW=HH*1136/640;
		
		$("#outercon").css({"left":(WW-THISW)/2,"top":0,"width":THISW,"height":"100%"});
		$("body").css({"background-size":"auto 100%"});
	}else{
		THISW=WW;
		THISH=WW*640/1136;
		
		$("#outercon").css({"top":(HH-THISH)/2,"left":0,"height":THISH,"width":"100%"});
		$("body").css({"background-size":"100% auto"});
	}
	
	
	$("#room").css("height",THISW*0.9*350/971);
	$("#main").css("top",-(CP-1)*THISH);
}
function vfunc(){
	$("#outercon").hide();
	$("#verticaltip").remove();
	var _html="<div id=\"verticaltip\" style=\"width:100%;height:100%;background:url('img/vbg.jpg') no-repeat center center;background-size:100% 100%;\">";
	_html+="<div style=\"width:100%;height:100%;background:url('img/btip.png') no-repeat center center;background-size:90% auto;position:relative;\">";
	_html+="</div></div>";
	$(_html).appendTo($(document.body))
}
$(window).bind(orient,function(e){
	//setTimeout(function(){window.sendDebugInfo({"windows_oritentaion:":window.orientation});},1000);
	//alert("uc")
	//alert(window.orientation)
	WW=w.width();
	HH=w.height();
	//if(navigator.appVersion.toLowerCase().indexOf("ucbrowser")>0){
					hfunc()

//		if(WW/HH>1){
//			hfunc()
//		}else{
//			vfunc()
//		}
	//}//else{
//		if(window.orientation){
//			hfunc();
//		}else{
//			vfunc();
//		}
//	}
	
}).trigger(orient);


$(document).ready(function(){
	sharesns();
});

function sharesns(){
	var sns_title="全新梅赛德斯-奔驰长轴距C级车 驾驭改变";
	var sns_text="改变，灵动设计的创新者。驾驭，科技先锋的领跑者。全新梅赛德斯-奔驰长轴距C级车，革新上市！颠覆您的想象，邀您置身于超凡魅力的三维世界。";
	var sns_url="http://special.mercedes-benz.com.cn/NewC-Class/";
	$("#sharetext,#sharebtn").click(function(){
		var _url="http://v.t.sina.com.cn/share/share.php?&searchPic=false";
		_url+=("&url="+encodeURI(sns_url));
		_url+=("&title="+encodeURI(sns_text));
		_url+="&http://special.mercedes-benz.com.cn/NewC-Class/images/share.jpg";
		window.open(_url,"_blank");
	});
	
	$("#btn2").click(function(){
		var _url="http://v.t.sina.com.cn/share/share.php?&searchPic=false";
		_url+=("&url="+encodeURI(sns_url));
		_url+=("&title="+encodeURI("恭喜您完成探索之旅，真相已经全部呈现探索改变，更分享改变的激动一刻！不一样的互动，邀好友共体验"));
		_url+="http://v.t.sina.com.cn/share/share.php?&searchPic=false";
		window.open(_url,"_blank");
	});
}


$(document.body).bind("touchmove",function(e){e.stopPropagation();})

//android
/*
	var sUserAgent = navigator.userAgent.toLowerCase();
	var s = sUserAgent.match(/iPad/i);
    var bIsAndroid = sUserAgent.match(/android/i);
    var url=document.location.pathname;
	if(bIsAndroid == "android" ){
		window.location.href = "http://localhost/android";
	}
*/