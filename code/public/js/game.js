var cv="";
var ctx="";
var tbs=0;
var tb=0;
var canvasimg=$("<img src=\"img/transparent.png\" />");
var preimg=$("<img src=\"img/transparent.png\" />");
var nextimg=$("<img src=\"img/transparent.png\"/>");
var preurl="";
var nexturl="";
var isimg=0;
var ci=1;
var reqAnimFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;


var w=$(window);
var d=$(document);
var WW=w.width();
var HH=w.height();
var RATE=1136/534;
var WFOREVER=WW;
var HFOREVER=HH;

var THISW=0;
var THISH=0;
if(WW/HH>RATE){
	THISH=HH;
	THISW=HH*1136/534;
	
	$("#outercon").css({"left":(WW-THISW)/2,"width":THISW});
	$("body").css({"background-size":"auto 100%"});
}else{
	THISW=WW;
	THISH=WW*534/1136;
	
	$("#outercon").css({"top":(HH-THISH)/2,"height":THISH});
	$("body").css({"background-size":"100% auto"});
}


var WR=1;
var HR=1;
var orient="orientationchange";
if(navigator.appVersion.toLowerCase().indexOf("android")>0){
	orient="resize"
}
function hfunc(){
	$("#outercon").show();
	$("#verticaltip").remove();
	$(this).scrollTop(0);
	
	RATE=1136/534;
	
	if(WW/HH>RATE){
		THISH=HH;
		THISW=HH*1136/534;
		
		$("#outercon").css({"left":(WW-THISW)/2,"top":0,"width":THISW,"height":"100%"});
		$("body").css({"background-size":"auto 100%"});
	}else{
		THISW=WW;
		THISH=WW*534/1136;
		
		$("#outercon").css({"top":(HH-THISH)/2,"left":0,"height":THISH,"width":"100%"});
		$("body").css({"background-size":"100% auto"});
	}
	if(!$(document).data("loaded")){
		setTimeout(function(){
			loadimages();
			//devicecanvas($("#animatelayer"),THISW,THISH,4,3);
		},200)
		$(document).data("loaded",true);
	}
}
function vfunc(){
	$("#outercon").hide();
	$("#verticaltip").remove();
	var _html="<div id=\"verticaltip\" style=\"width:100%;height:100%;background:url('img/game/hcover.jpg') no-repeat center top;background-size:100% auto;\"></div>";
	$(_html).appendTo($(document.body))
}
$(document.body).bind("touchmove",function(e){e.stopPropagation();});

$(window).bind(orient,function(e){
	clearInterval(weichatorientalahndler);
	WW=w.width();
	HH=w.height();
	if(navigator.appVersion.toLowerCase().indexOf("android")>0){
		if(WW/HH>1){
			hfunc();
		}else{
			vfunc();
		}
	}else{
		if(window.orientation){
			hfunc();
		}else{
			vfunc();
		}
	}	
}).trigger(orient);

//hfunc();

$(document).ready(function(){
	cv=document.getElementById("canvas");
	cv.setAttribute("width",THISW);
	cv.setAttribute("height",THISH);
	cv.style.position="absolute";
	cv.style.left=-999+"px";
	cv.style.top=-999+"px";
	cv.style.zIndex="999";
	ctx=cv.getContext("2d");
	$("#sharetip").click(function(){
		$(this).hide();
	})
	weichat();
});

var imgfiles=[
	{"uri":"canvas1.jpg","per":0,"isready":false},
	{"uri":"canvas2.jpg","per":0,"isready":false},
	{"uri":"canvas3.jpg","per":0,"isready":false},
	{"uri":"canvas4.jpg","per":0,"isready":false},
	{"uri":"canvas5.jpg","per":0,"isready":false},
	{"uri":"canvasbg1.jpg","per":0,"isready":false},
	{"uri":"canvasbg2.jpg","per":0,"isready":false},
	{"uri":"canvasbg3.jpg","per":0,"isready":false},
	{"uri":"canvasbg4.jpg","per":0,"isready":false},
	{"uri":"canvasbg5.jpg","per":0,"isready":false},
	{"uri":"product1.jpg","per":0,"isready":false},
	{"uri":"product2.jpg","per":0,"isready":false},
	{"uri":"product3.jpg","per":0,"isready":false},
	{"uri":"product4.jpg","per":0,"isready":false},
	{"uri":"product5.jpg","per":0,"isready":false},
	{"uri":"result1.jpg","per":0,"isready":false},
	{"uri":"result2.jpg","per":0,"isready":false},
	{"uri":"result3.jpg","per":0,"isready":false},
	{"uri":"result4.jpg","per":0,"isready":false},
	{"uri":"result5.jpg","per":0,"isready":false},
	{"uri":"route1.jpg","per":0,"isready":false},
	{"uri":"route2.jpg","per":0,"isready":false},
	{"uri":"route3.jpg","per":0,"isready":false},
	{"uri":"route4.jpg","per":0,"isready":false},
	{"uri":"route5.jpg","per":0,"isready":false},
	{"uri":"score1.jpg","per":0,"isready":false},
	{"uri":"score2.jpg","per":0,"isready":false},
	{"uri":"score3.jpg","per":0,"isready":false},
	{"uri":"score4.jpg","per":0,"isready":false},
	{"uri":"score5.jpg","per":0,"isready":false},
	{"uri":"bronze.png","per":0,"isready":false},
	{"uri":"gold.png","per":0,"isready":false},
	{"uri":"pointer.png","per":0,"isready":false},
	{"uri":"sliver.png","per":0,"isready":false}
];
var percent=0;
var ifi=0;
function loadimages(){
	var lng=imgfiles.length;
	for(var i=0;i<lng;i++){
		var _per=(i+1)*Math.floor(100/lng);
		if(i<(100%lng)){
			_per+=(i+1);
		}else{
			_per+=(100%lng);
		}
		imgfiles[i].per=_per;
	}

	$("<img src=\"img/transparent.png\" />").load(function(){
		imgfiles[ifi].isready=true;
			ifi++;
			if(ifi<imgfiles.length){
				$(this).attr("src","img/game/"+imgfiles[ifi].uri);
			}
	}).attr("src","img/game/"+imgfiles[ifi].uri);
	loadfunc();
}
var aci=0;
function loadfunc(){
	if(aci<imgfiles.length){
		if(imgfiles[aci].isready){
			percent++;
			$("#innercover").width(THISW*(1-percent/100));
			if(percent>=imgfiles[aci].per && !imgfiles[aci].flag){
				imgfiles[aci].flag=true;
				aci++;
			}
			$("#loadpercentcon").text(percent+"%")
			setTimeout(loadfunc,50);
		}else{
			if((imgfiles[aci].per<=percent)){
				percent=imgfiles[aci].per;
				$("#innercover").width(THISW*(1-percent/100));
				$("#loadpercentcon").text(percent+"%")
				setTimeout(loadfunc,100);
			}else{
				percent++;
				$("#innercover").width(THISW*(1-percent/100));
				$("#loadpercentcon").text(percent+"%");
				setTimeout(loadfunc,100*(1/(imgfiles[aci].per-percent)));
			}
		}
	}else{
		$("#loader").css({"opacity":1}).animate({"opacity":0},500,function(){
			$("#loader").remove();
		});
		preimg.attr("src","img/cover.jpg");
		nextimg.attr("src","img/game/canvas1.jpg");
		$("#maincon").css({"opacity":0}).show().animate({"opacity":1},500,function(){
			
			$("#beginbtn").click(function(){
				$("#animatelayer").empty().css({"opacity":1,"background":"url('img/game/canvas"+ci+".jpg') no-repeat center center","background-size":"100% auto"}).show();
				$("#pregage").animate({"left":-THISW},{duration:1000,easing:"swing",complete:function(){
					$("#pregage").hide();
					setTimeout(
						function(){
							$("#canvas").hide();
							$("#animatelayer").animate({"opacity":0},1000,function(){
								$("#animatelayer").hide();
							});
							
							$("#tipcon").css({"background-image":"url('img/game/route"+ci+".jpg')"}).show().animate({"opacity":1},1000,function(){
								var tcv=document.getElementById("timmer");
								var tctx=tcv.getContext("2d");
								
								initTimer(tcv,function(){
									
									iscursor=false;
									
									$(".routecon").css({"background-image":"url('img/game/canvasbg"+ci+".jpg')"}).show().css({"opacity":0}).animate({"opacity":1},function(){
										_st=new Date();
										onLoadEvent();
										//halo.css("opacity",1).show().css({"left":0-71,"top":(posmapping[(ci+"")]*THISH/100)-71});
										routetime=0;
										$("#rtcon1").css("line-height",$("#rtcon1").height()+"px");
										rthandler=setInterval(timecalc,10);
									});
									
									$("#tipcon").hide().css({"opacity":0});	
								});
							});
						},500
					)
				}})
				/*
				animateeffect(function(){
					$("#animatelayer").show();
				},false,function(){
					
				})
				*/
			});
		});
		
	}
}

function animateeffect(prefx,nextfx,endfx){
	tb=0;
	canvasimg.unbind().load(function(){
		ctx.clearRect(0,0,THISW,THISH);
		ctx.drawImage(this,0,0,this.width,this.height,0,0,THISW,THISH);
		if(prefx){
			prefx();
		}
		$(".inneranimate").hide();
		$("#animatelayer .animate").css({"text-indent":0,"-webkit-transform":"rotateY(0deg)"})
		if(!isimg){
			preurl=cv.toDataURL();
			isimg++;
			$("#animatelayer .animate").css("background-image","url("+preurl+")");
			canvasimg.attr("src",nextimg.attr("src"));
		}else{
			isimg=0;
			
			nexturl=cv.toDataURL();
			$("#animatelayer .inneranimate").css("background-image","url("+nexturl+")");
			
			$("#animatelayer .animate").each(function(i,v){
				setTimeout(function(){
					$(v).animate({textIndent:180},{ 
						step:function(now,fx){ 
							if(now>90){
								$(".inneranimate",this).show();
								$(this).css("background-image","none");
							}
							$(this).css('-webkit-transform','rotateY('+now+'deg)'); 
						}, 
						duration:1000,
						complete:function(){
							tb++;
							if(tb==tbs){
								endfx();
							}
						}
					},'linear');
				},i*100);
			});
		}
	}).attr("src",preimg.attr("src"));
}

function devicecanvas(tar,w,h,x,y){
	tbs=x*y;
	var wa=w/x;
	var ha=h/y;
	var wb=Math.floor(wa);
	var hb=Math.floor(ha);

	var wl=parseInt((wa-wb)*x);
	var hl=parseInt((ha-hb)*y);
	for(var i=0;i<x;i++){
		var _w=wb;
		
		var _l=0;
		var _t=0;
		if(i<wl){
			_w++;
			_l=i*_w
		}else{
			_l=(_w+1)*wl+(i-wl)*_w;
		}
		for(var j=0;j<y;j++){
			var _h=hb;
			if(j<hl){
				_h++;
				_t=j*_h;
			}else{
				_t=(_h+1)*hl+(j-hl)*_h;
			}

			var _html="<div class=\"animate\" style=\"border-top:solid 1px black;position:absolute;left:"+_l+"px;top:"+_t+"px;width:"+_w+"px;height:"+_h+"px;background:url('img/transparent.png') no-repeat "+(-_l)+"px "+(-_t)+"px;\">";
			_html+="<div class=\"inneranimate\" style=\"-webkit-transform:rotateY(180deg);display:none;position:absolute;top:0px;left:0px;width:"+_w+"px;height:"+_h+"px;background:url('img/transparent.png') no-repeat "+(-_l)+"px "+(-_t)+"px;\">"
			_html+="</div></div>";
			$(_html).appendTo(tar);
		}
	}
}



var deg=-90;
var speed=2;
var iscursor=false;
function initCursor(){
	if(iscursor){
		$("#routecursor").show().stop().css({"opacity":1}).animate({"opacity":0},500,function(){
			$("#routecursor").animate({"opacity":1},500,initCursor);
		});
	}else{
		$("#routecursor").hide()
	}
}

function initTimer(cv,fx){
	var par=$(cv).parent();
	iscursor=true;
	initCursor();
	$("#routecursor").css({"top":THISH*promapping["ci_"+ci].cursor});
	cv.setAttribute("width",par.height()-10);
	cv.setAttribute("height",par.height()-10);
	cv.style.top=5+"px";
	cv.style.left=5+"px";
	cv.style.display="block";
	deg=-90;
	reqAnimFrame(function(){timerfunc(cv.getContext("2d"),fx,par.height()-10);});
}

function timerfunc(ctx,cfx,size){
	
    deg += speed;
    if(deg<270){
        ctx.clearRect(0,0,size,size);
        draw();
		reqAnimFrame(function(){timerfunc(ctx,cfx,size);});
    }else{
    	ctx.clearRect(0,0,size,size);
    	cfx();
    }
    
    function draw() {
	    var ang = Math.PI/180;
	    ctx.fillStyle = 'rgba(255,255,255,0.5)';   
	    ctx.beginPath();   
	    ctx.moveTo(Math.round(size/2),Math.round(size/2));   
	    ctx.arc(Math.round(size/2),Math.round(size/2),size/2,-90*ang,ang*deg,true);   
	    ctx.fill();
	}	
}

var shadow=0;
var shadowHandler=null;
function shadowanimate(){
	shadow=shadow+2;
	_g.clearRect(0,0,THISW,THISH);
	_g.shadowBlur = parseInt(shadow);
	var lng=_points.length;
	for(var i=1;i<lng;i++){
		var _p=_points[i];
		var _p1=_points[i-1];
		
		_g.beginPath();
        _g.moveTo(_p.X, _p.Y)
        _g.arc(_p.X, _p.Y, 0.5, 0, Math.PI * 2, true);
        _g.closePath();
        _g.stroke();
        
        
        _g.beginPath();
        _g.moveTo(_p.X, _p.Y)
		_g.lineTo(_p1.X, _p1.Y);
		_g.closePath();
		_g.stroke();
	}
	if(shadow>=20){
		clearInterval(shadowHandler)
		_g.lineWidth = 1;
		_g.shadowBlur = 0;
		animate2();
		$(".routecon").animate({"opacity":0},2000,function(){
			$(".routecon").hide();
		});
		$("#productlayer").css("background-size","100% 100%");
		$("#productlayer").css({"background-image":"url(img/game/product"+(ci)+".jpg)","opacity":0}).show().animate({"opacity":1},2000);
	}
}

var ll=0;
var lll=Math.pow((Math.pow(THISW,2)+Math.pow(THISH,2)),0.5);
function animate2(){
	_g.clearRect(0,0,THISW,THISH);
	ll+=3;
	_g.fillStyle = "rgba(65,201,248,"+(1-ll/lll)+")";
	for(var i=0;i<_points.length;i++){
		var _p=_points[i];
		_g.beginPath();
        _g.moveTo(_p.X+Math.round(ll*Math.sin(_p.angle)), _p.Y+Math.round(ll*Math.cos(_p.angle)));
        _g.arc(_p.X+Math.round(ll*Math.sin(_p.angle)), _p.Y+Math.round(ll*Math.cos(_p.angle)), 2, 0, Math.PI * 2, true);
        _g.moveTo(_p.X+Math.round(ll*Math.sin(_p.angle+120)), (_p.Y-2)+Math.round(ll*Math.cos(_p.angle+120)));
        _g.arc(_p.X+Math.round(ll*Math.sin(_p.angle+120)), (_p.Y-2)+Math.round(ll*Math.cos(_p.angle+120)), 2, 0, Math.PI * 2, true);
        _g.moveTo(_p.X+Math.round(ll*Math.sin(_p.angle+240)), (_p.Y+2)+Math.round(ll*Math.cos(_p.angle+240)));
        _g.arc(_p.X+Math.round(ll*Math.sin(_p.angle+240)), (_p.Y+2)+Math.round(ll*Math.cos(_p.angle+240)), 2, 0, Math.PI * 2, true);
        _g.closePath();
        _g.fill();
	}
	if(ll<lll*0.3){
		reqAnimFrame(animate2);	
	}else{
		//hello there
		animateend();
	}
}

function productbgfunc(){
	$("#opacitybg").show().css({"background-image":"url('img/game/result"+ci+".jpg')","opacity":0}).animate({"opacity":1},3000);
}

var routetime=0;
var rthandler=false;
var rtcon=$("#rtcon1");
function timecalc(){
	routetime++;
	var _p=routetime%100;
	var _sec=(Math.floor(routetime/100))%60;
	var _min=(Math.floor(routetime/6000))%60;
	
	if(_p<10){
		_p="0"+_p;
	}
	if(_sec<10){
		_sec="0"+_sec;
	}
	if(_min<10){
		_min="0"+_min;
	}
	rtcon.text(_min+":"+_sec+":"+_p);
}

function reloadroute(){
	$(".routecon").show().css({"background-image":"url('img/route"+ci+".png')","opacity":0}).animate({"opacity":1},function(){
		initTimer();
		timerfunc(function(){
			$("#animatelayer").hide();
			$("#canvas").hide();
			onLoadEvent();
			halo.css("opacity",1).show().css({"left":0-71,"top":(posmapping[(ci+"")]*THISH/100)-71});
			$("#routetip").show();
		});
	});
	$("#productlayer").animate({"opacity":0},function(){
		$("#productlayer").hide();
	});
}
var isend=false;
function animateend(){
	$("#myCanvas").hide();
	console.log(result);
	var _o=promapping["ci_"+ci]
	var tar=$("#innerprolayer");
	tar.css({"background-image":"url('img/game/score"+ci+".jpg')","left":-tar.width()}).show().animate({"left":0},{duration:2000,easing:"easeOutBounce",complete:function(){}});
	
	if(isNaN(result[_o.rn])){
		result[_o.rn]=0;
	}
	
	
	var _p=routetime%100;
	var _sec=(Math.floor(routetime/100))%60;
	var _min=(Math.floor(routetime/6000))%60;
	if(_p<10){
		_p="0"+_p;
	}
	
	//记录分数，时间
	_o.time=routetime;
	var _score=parseFloat(result[_o.rn]).toFixed(2);
	
	var _adjust=parseFloat(_o.adjust);
	_score=(_score-_adjust)/(1-_adjust);
	_o.score=parseInt(_score*_o.x*100/(routetime/100)*_o.x,10);
	$("#accuracycon").text((parseInt(_score*100))+"%").css({"line-height":($("#accuracycon").height()+"px")});
	$("#scorecon").css("line-height",($("#scorecon").height()+"px")).text(_o.score);
	$("#timecalccon").text(_sec+"."+_p+"s").css({"line-height":($("#timecalccon").height()+"px")});
	if(_o.score<=0){
		$("#failedcon").show().unbind().click(function(){
			$("#replaybtn").trigger("click");
		})
	}else{
		$("#failedcon").hide();
	}
	weichat();
	//重玩
	$("#replaybtn").unbind().click(function(){
		isend=false;
		$("#animatelayer").empty().css({"opacity":1,"background":"url('img/game/canvas"+ci+".jpg') no-repeat center center","background-size":"100% auto"}).show();
		//$("#tipcon").css({"opacity":1,"background-image":"url('img/game/canvas"+ci+".jpg')"}).show();
		$("#productlayer").css({"background-image":"none"});
		$("#innerprolayer").animate({"left":-THISW},{duration:1000,easing:"swing",complete:function(){
			$("#productlayer").hide();
			$("#animatelayer").animate({"opacity":0},1000,function(){
				$("#animatelayer").hide();
			});
			$("#tipcon").css({"background-image":"url('img/game/route"+ci+".jpg')"}).show().animate({"opacity":1},1000,function(){
				var tcv=document.getElementById("timmer");
				var tctx=tcv.getContext("2d");
				$("#opacitybg").css({"background-image":"none","opacity":0}).hide();

				initTimer(tcv,function(){
					iscursor=false;
					$(".routecon").css({"background-image":"url('img/game/canvasbg"+ci+".jpg')"}).show().css({"opacity":0}).animate({"opacity":1},function(){
						_st=new Date();
						onLoadEvent();
						//halo.css("opacity",1).show().css({"left":0-71,"top":(posmapping[(ci+"")]*THISH/100)-71});
						routetime=0;
						$("#rtcon1").css("line-height",$("#rtcon1").height()+"px");
						rthandler=setInterval(timecalc,10);
					});
					$("#tipcon").hide().css({"opacity":0});
				});
			});
		}});
	});
	//继续
	$("#continuebtn").unbind().click(function(){
		if(ci>=5){
			//统计分数
			isend=true;
			weichat();
			$("#resultcon").css({"left":-THISW,"opacity":1}).show().animate({"left":0},{duration:1000,easing:"swing",complete:function(){
				console.log(promapping)
				$("#resultcon .star").attr("src","img/game/"+_star+".png").addClass("staranimate");
			}});
			var _ts=0;
    		var _tsc=0;
    		for(__ in promapping){
    			_ts+=parseFloat(promapping[__].time);
    			_tsc+=parseInt(promapping[__].score)
    		}
			var _star="gold";
			if(_tsc<200){
				_star="bronze";
			}else if(_tsc<400 && _tsc>=200){
				_star="sliver";
			}
			
			$("#totalscore").css("line-height",$("#totalscore").height()+"px").text(_tsc);
			$("#perper").css("line-height",$("#perper").height()+"px").text("60%");
		}else{
			ci++;
			$("#replaybtn").trigger("click");	
		}
	});
	//在玩一次
	$("#playagainbtn").unbind().click(function(){
		ci=1;
		$("#resultcon .star").removeClass("staranimate")
		$("#animatelayer").empty().css({"opacity":1,"background":"url('img/game/canvas"+ci+".jpg') no-repeat center center","background-size":"100% auto"}).show();
		//$("#tipcon").css({"opacity":1,"background-image":"url('img/game/canvas"+ci+".jpg')"}).show();
		$("#productlayer").css({"background-image":"none"});
		$("#innerprolayer").css("left",-THISW)
		$("#resultcon").animate({"left":-THISW},{duration:2000,easing:"easeOutBounce",complete:function(){
			$("#productlayer").hide();
			$("#animatelayer").animate({"opacity":0},1000,function(){
				$("#animatelayer").hide();
			});
			$("#tipcon").css({"background-image":"url('img/game/route"+ci+".jpg')"}).show().animate({"opacity":1},1000,function(){
				var tcv=document.getElementById("timmer");
				var tctx=tcv.getContext("2d");
				$("#opacitybg").css({"background-image":"none","opacity":0}).hide();

				initTimer(tcv,function(){
					iscursor=false;
					$(".routecon").css({"background-image":"url('img/game/canvasbg"+ci+".jpg')"}).show().css({"opacity":0}).animate({"opacity":1},function(){
						_st=new Date();
						onLoadEvent();
						//halo.css("opacity",1).show().css({"left":0-71,"top":(posmapping[(ci+"")]*THISH/100)-71});
						routetime=0;
						$("#rtcon1").css("line-height",$("#rtcon1").height()+"px");
						rthandler=setInterval(timecalc,10);
					});
					$("#tipcon").hide().css({"opacity":0});
				});
			});
		}});
	});
	//fengxiang
	$("#wechatshare,#wechatshare1").unbind().click(function(){$("#sharetip").show();});
}

var promapping={
	"ci_1":{
		"rn":"benz_z",
		"cursor":0.2721,
		"x":0.75,
		"adjust":0.58
	},
	"ci_2":{
		"rn":"benz_e",
		"cursor":0.3401,
		"x":0.7,
		"adjust":0.58
	},
	"ci_3":{
		"rn":"benz_v",
		"cursor":0.24,
		"x":0.7,
		"adjust":0.58
	},
	"ci_4":{
		"rn":"benz_o",
		"cursor":0.8333,
		"x":0.8,
		"adjust":0.58
	},
	"ci_5":{
		"rn":"benz_eee3",
		"cursor":0.5782,
		"x":1.1,
		"adjust":0.58
	}
}




var weichat;
var OW=0,OH=0;
var tid = "";
        var aid = "";
        var uin = "";
        var key = "";
        var biz = "MjM5MjMwNTU0MA==";
        var networkType;
        
        var cookie = {
            get: function(name){
                if( name=='' ){
                    return '';
                }
                var reg = new RegExp(name+'=([^;]*)');
                var res = document.cookie.match(reg);
                return (res && res[1]) || '';
            },
            set: function(name, value){
                var now = new Date();
                    now.setDate(now.getDate() + 1);
                var exp = now.toGMTString();
                document.cookie = name + '=' + value + ';expires=' + exp;
                return true;
            }
        };

        function hash(str){
            var hash = 5381;
            for(var i=0; i<str.length; i++){
                hash = ((hash<<5) + hash) + str.charCodeAt(i);
                hash &= 0x7fffffff;
            }
            return hash;
        }

        function trim(str){
            return str.replace(/^\s*|\s*$/g,'');
        }

        function ajax(obj){
            var type  = (obj.type || 'GET').toUpperCase();
            var url   = obj.url;
            var async = typeof obj.async == 'undefined' ? true : obj.async;
            var data  = typeof obj.data  == 'string' ? obj.data : null;
            var xhr   = new XMLHttpRequest();
            var timer = null;
            xhr.open(type, url, async);
            xhr.onreadystatechange = function(){
                if( xhr.readyState == 3 ){
                    obj.received && obj.received(xhr);
                }
                if( xhr.readyState == 4 ){
                    if( xhr.status >= 200 && xhr.status < 400 ){
                        clearTimeout(timer);
                        obj.success && obj.success(xhr.responseText);
                    }
                    obj.complete && obj.complete();
                    obj.complete = null;
                }
            };
            if( type == 'POST' ){
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(data);
            if( typeof obj.timeout != 'undefined' ){
                timer = setTimeout(function(){
                    xhr.abort("timeout");
                    obj.complete && obj.complete();
                    obj.complete = null;
                }, obj.timeout);
            }
        }

        var title="";
        var sourceurl = trim(''.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
      


        function parseParams(str) {
            if( !str ) return {};

            var arr = str.split('&'), obj = {}, item = '';
            for( var i=0,l=arr.length; i<l; i++ ){
                item = arr[i].split('=');
                obj[item[0]] = item[1];
            }
            return obj;
        }

        function htmlDecode(str){
            return str
                  .replace(/&#39;/g, '\'')
                  .replace(/<br\s*(\/)?\s*>/g, '\n')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&amp;/g, '&');
        }
                  
        function report(link, fakeid, action_type){
            var queryStr = link.split('?').pop();
                queryStr = queryStr.split('#').shift();
            if( queryStr == '' ){
                return;
            }

            var param = [
                queryStr,
                'action_type=' + action_type,
                'uin=' + fakeid
            ].join('&');
            
            ajax({
                url : '/mp/appmsg/show',
                type: 'POST',
                timeout: 2000,
                data: param
            });
        }

        function reportTimeOnPage(){
            var link     = location.href;
            var fakeid   = "";
            var queryStr = link.split('?').pop();
                queryStr = queryStr.split('#').shift();
            if( queryStr == '' ){
                return;
            }

            var param = [
                queryStr,
                'start_time='+_wxao.begin,
                'end_time='+new Date().getTime(),
                'uin='+fakeid,
                'title='+encodeURIComponent(title),
                'action=pagetime'
            ].join('&');

            ajax({
                url: '/mp/appmsg/show?'+param,
                //url: '/mp/comm_report?'+param,
                async : false,
                timeout: 2000
            });
            //var img = new Image(1,1);
            //img.src = '/mp/appmsg/show?'+param;
        }

        function share_scene(link, scene_type){
            var extargs = "";
            if (tid != ""){//gdt traceid
                extargs = "tid=" + tid + "&aid=" + 54;//share must be 54
            }
            var queryStr = link.split('?')[1] || '';
                queryStr = queryStr.split('#')[0];
            if( queryStr == '' ){
                return;
            }
            
            var queryarr = [queryStr, 'scene='+scene_type];
            (extargs != "") && (queryarr.push(extargs));
            queryStr = queryarr.join('&');

            return link.split('?')[0] + '?' + queryStr + '#' + (link.split('#')[1]||'');
        }
        function get_url(link, extargs){
            extargs = extargs || "";
            var queryStr = link.split('?')[1] || '';
                queryStr = queryStr.split('#')[0];
            if( queryStr == '' ){
                return;
            }
            
            var queryarr = [queryStr];
            (extargs != "") && (queryarr.push(extargs));
            queryStr = queryarr.join('&');

            return link.split('?')[0] + '?' + queryStr + '#' + (link.split('#')[1]||'');
        }
        
        function viewProfile(){
            if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){
                WeixinJSBridge.invoke('profile',{
                    'username':'gh_504818f3570e',
                    'scene':'57'
                });
            }
        }
(function(){

function onBridgeReady() {
		var appId  = '',
        imgUrl = "http://special.mercedes-benz.com.cn/NewC-Class/images/share.jpg",
        link = "http://special.mercedes-benz.com.cn/NewC-Class/?token=1",
        title  = htmlDecode("全新梅赛德斯-奔驰长轴距C级车 驾驭改变"),
        desc   = htmlDecode("手脑并用，挑战最短时间，测试你的驾驶等级"),
        fakeid = "";
        desc   = desc || link; 
        if(ci && promapping["ci_"+ci].time){
        	if(isend){
        		var _ts=0;
        		var _tsc=0;
        		for(__ in promapping){
        			_ts+=parseFloat(promapping[__].time);
        			_tsc+=parseInt(promapping[__].score)
        		}
        		var _per=97;
        		var _scrore=_tsc;
        		if(_tsc>510){
        			_scrore=510;
        		}
        		_per=Math.round((_scrore/510)*_per);
        		title=htmlDecode((_ts/100)+"秒挑战手脑极限，打败了圈中"+_per+"%的好友！不服来战！")
        	}else{
        		
        	   title=htmlDecode("我已经闯过第"+ci+"关，用了"+promapping["ci_"+ci].time+"秒，来和我挑战！");
        	}
        	
        }  
		
    if( "1" == "0" ){
        WeixinJSBridge.call("hideOptionMenu");  
    }
	//console.log(WeixinJSBridge)
    // 发送给好友; 
    setTimeout(function(){
    	 WeixinJSBridge.on('menu:share:appmessage', function(argv){
    
                WeixinJSBridge.invoke('sendAppMessage',{
                                      "appid"      : appId,
                                      "img_url"    : imgUrl,
                                      "img_width"  : "640",
                                      "img_height" : "640",
                                      "link"       : share_scene(link, 1),
                                      "desc"       : desc,
                                      "title"      : title
                }, function(res) {report(link, fakeid, 1);
                });
    });

            // 分享到朋友圈;
    WeixinJSBridge.on('menu:share:timeline', function(argv){
                report(link, fakeid, 2);
                
                WeixinJSBridge.invoke('shareTimeline',{
                                      "img_url"    : imgUrl,
                                      "img_width"  : "640",
                                      "img_height" : "640",
                                      "link"       : share_scene(link, 2),
                                      "desc"       : desc,
                                      "title"      : title
                }, function(res) {
                	
                });
    
    });

            // 分享到微博;
    var weiboContent = '';
    WeixinJSBridge.on('menu:share:weibo', function(argv){
    
                WeixinJSBridge.invoke('shareWeibo',{
                                      "content" : title + share_scene(link, 3),
                                      "url"     : share_scene(link, 3) 
                                      }, function(res) {report(link, fakeid, 3);
                                      });
    });

            // 分享到Facebook
    WeixinJSBridge.on('menu:share:facebook', function(argv){
        report(link, fakeid, 4);
        WeixinJSBridge.invoke('shareFB',{
              "img_url"    : imgUrl,
              "img_width"  : "640",
              "img_height" : "640",
              "link"       : share_scene(link, 4),
              "desc"       : desc,
              "title"      : title
        }, function(res) {} );
    });

            // 新的接口
    WeixinJSBridge.on('menu:general:share', function(argv){
        var scene = 0;
        OW=w.width();
        OH=w.height();
        switch(argv.shareTo){
            case 'friend'  : scene = 1; break;
            case 'timeline': scene = 2; break;
            case 'weibo'   : scene = 3; break;
        }
            argv.generalShare({
                                "appid"      : appId,
                                "img_url"    : imgUrl,
                                "img_width"  : "640",
                                "img_height" : "640",
                                "link"       : share_scene(link,scene),
                                "desc"       : desc,
                                "title"      : title
            }, function(res){
            	report(link, fakeid, scene);
            });
    });
    },500)
   
	
    // get network type
	var nettype_map = {
		"network_type:fail" : "fail",
		"network_type:edge": "2g",
		"network_type:wwan": "3g",
		"network_type:wifi": "wifi"
	};
	if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){
		WeixinJSBridge.invoke('getNetworkType',{}, function(res) {
			networkType = nettype_map[res.err_msg];
			initpicReport();
		});
	}        
}
	
	weichat=onBridgeReady;

if (typeof WeixinJSBridge == "undefined"){
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else{
    onBridgeReady();
}

})();


var weichatorientalahndler=undefined;
