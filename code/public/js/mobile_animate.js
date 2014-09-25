window.reqAnimFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;
var imgs=["timerbg.jpg","config.jpg","formbg.jpg","menubg.png"];
for(var i=0;i<=195;i++){
	var num="";
	if(i<10){
		num="00"+i
	}else if(i<100){
		num="0"+i
	}else{
		num=""+i;
	}
	imgs.push("frame/benz_"+num+".jpg");
}

var indexparam={
	"pro_all":0,
	"pro_1":1,
	"pro_2":2,
	"pro_3":3,
	"pro_4":4,
	"pro_5":5,
	"pro_6":6,
	"config":7,
	"ond":8,
	"tvc":9,
	"launch":10
}

var w=$(window);
var d=$(document);
var WW=w.width();
var HH=w.height();
var RATE=1136/640;

var RATE1=1136/534;

var THISW=0;
var THISH=0;
if(WW/HH>=RATE1){
	THISH=HH;
	THISW=HH*1136/534;
	$("#main").css({"left":(WW-THISW)/2,"width":THISW});
	//$("body").css({"background-size":"auto 100%"});
}else if(WW/HH<RATE1 && WW/HH>=RATE){
	THISH=HH;
	THISW=WW;
	$("#main").css({"top":(HH-THISH)/2,"height":THISH});
}else{
	THISW=WW;
	THISH=WW*640/1136;
	$("#main").css({"top":(HH-THISH)/2,"height":THISH});
	//$("body").css({"background-size":"100% auto"});
}
$(d).bind("touchmove",function(e){
	e.preventDefault();
});

var slider=0;
function callback(res){
	if(res.code){
		var name=$('#uname').val()
		var phone=$("#mobile").val()
		//_smq.push(['custom','参加预售_提交_M',name,phone]);
		$("#formrescover").show();
		$("#formres").show().unbind().click(function(){
			$(this).hide();
			$("#formrescover").hide();
		});
	}else{
		$("#formtip .tiptxt").text("请重新提交");
	}
}
$(document).ready(function(){
	var ci=0;
	var ai=0;
	var percent=0;

	sliderfunc();
	//or
	var orient="orientationchange";
	if(navigator.appVersion.toLowerCase().indexOf("android")>0){
		orient="resize"
	}
	function hfunc(){
		$("#main").show();
		$("#verticaltip").remove();
		$(window).scrollTop(0);
		
		if(!$(document).data("isinit")){
			$(document).data("isinit",true);
			//WW=w.width();
			//HH=w.height();
			if(WW/HH>=RATE1){
				THISH=HH;
				THISW=HH*1136/534;
				$("#main").css({"left":(WW-THISW)/2,"width":THISW,"top":0,"height":THISH});
				//$("body").css({"background-size":"auto 100%"});
			}else if(WW/HH<RATE1 && WW/HH>=RATE){
				THISH=HH;
				THISW=WW;
				$("#main").css({"top":(HH-THISH)/2,"height":THISH,"left":(WW-THISW)/2,"width":THISW});
			}else{
				THISW=WW;
				THISH=WW*640/1136;
				$("#main").css({"top":(HH-THISH)/2,"height":THISH,"left":0,"width":THISW});
				//$("body").css({"background-size":"100% auto"});
			}
			loadimages();
		}
	}
	function vfunc(){
		$("#main").hide();
		$("#verticaltip").remove();
		var _html="<div id=\"verticaltip\" style=\"width:100%;height:100%;background:url('img/vbg.jpg') no-repeat center center;background-size:100% 100%;\">";
		_html+="<div style=\"width:100%;height:100%;background:url('img/btip.png') no-repeat center center;background-size:90% auto;position:relative;\">";
		_html+="</div></div>";
		$(_html).appendTo($(document.body));
	}
	
	$(window).bind(orient,function(e){
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
	
	
	function loadimages(){
		$("<img src=\"img/transparent.png\" />").load(function(){
				percent=parseFloat(ai/imgs.length).toFixed(2);
				$("#innercover").width(Math.round(THISW*(1-percent)));
				$("#loadpercentcon").text(parseInt(percent*100)+"%");

				if(ai<imgs.length-1){
					ai++;
					$(this).attr("src","images/mobile/"+imgs[ai]);
					
				}else{
					$("#innercover").width(THISW);
					$("#loadpercentcon").text("100%");
					animatefunc();
				}
		}).attr("src","images/mobile/"+imgs[ai]);
	}
	function animatefunc(){
		ci=0;
		var uritag=location.href.split("#")[1];
		
		$("#pro_allcon").css({"background":"url('images/mobile/frame/benz_000.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_1con").css({"background":"url('images/mobile/frame/benz_020.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_2con").css({"background":"url('images/mobile/frame/benz_043.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_3con").css({"background":"url('images/mobile/frame/benz_106.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_4con").css({"background":"url('images/mobile/frame/benz_130.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_5con").css({"background":"url('images/mobile/frame/benz_170.jpg') no-repeat center center","background-size":"100% auto"});
		$("#pro_6con").css({"background":"url('images/mobile/frame/benz_195.jpg') no-repeat center center","background-size":"100% auto"});
		
		
		_oh=640*THISW/1136;
		$("#animateimgcon").css("top",(THISH-_oh)/2);
		
		
		
		
		$("#innermc123>div").width(THISW).hide();
		if(uritag){
			var _tag=uritag.split("&")[0];
			
			if(_tag=="pos_pro_7"){
				$("#menu").hide();
				$("#productindtro").show().css("opacity",0).animate({"opacity":1},function(){
					$("#menubtn").show();
				});
			}else{
				$("#"+_tag.replace("pos_","")).trigger("tapone");
				$("#"+_tag.replace("pos_","")+"con").show();
			}
			$("#loader").animate({"opacity":0},function(){$("#loader").remove();});
			uritag=uritag.split("&")[0];
			switch(uritag){
				case "pos_pro_all":
					$("#animateingobj").attr("src","images/mobile/frame/benz_000.jpg");
					break;
				case "pos_pro_1":
					$("#animateingobj").attr("src","images/mobile/frame/benz_020.jpg");
					break;
				case "pos_pro_2":
					$("#animateingobj").attr("src","images/mobile/frame/benz_043.jpg");
					break;
				case "pos_pro_3":
					$("#animateingobj").attr("src","images/mobile/frame/benz_106.jpg");
					break;
				case "pos_pro_4":
					$("#animateingobj").attr("src","images/mobile/frame/benz_130.jpg");
					break;
				case "pos_pro_5":
					$("#animateingobj").attr("src","images/mobile/frame/benz_170.jpg");
					break;
				case "pos_pro_6":
					$("#animateingobj").attr("src","images/mobile/frame/benz_195.jpg");
					break;
			}
		}else{
			$("#loader").animate({"opacity":0},function(){$("#loader").remove();});
			$("#productindtro").css({"opacity":0}).show().animate({"opacity":1});
			location.href=location.href+"#pos_pro_all";
			$("#animateingobj").attr("src","images/mobile/frame/benz_000.jpg");
			$("#pro_allcon").show();
		}
		//重播
		$("#replaybtn").bind("tapone",function(){
			_smq.push(['custom','见证6个改变结束后出现的页面','再次体验']);
		});
		//试驾
		$("#testbtn").bind("tapone",function(){
			_smq.push(['custom','见证6个改变结束后出现的页面','预约试驾']);
		});
		//性别
		$("#sexmale").bind("tapone",function(){
			this.src="images/mobile/sexsel.jpg";
			$("#sexfemale").attr("src","images/mobile/sexcom.jpg")
			$("#sex").attr("value",1);
		});
		$("#sexfemale").bind("tapone",function(){
			this.src="images/mobile/sexsel.jpg";
			$("#sexmale").attr("src","images/mobile/sexcom.jpg")
			$("#sex").attr("value",0);
		});
		//提交
		var reqPhone = /^0?(13[0-9]|17[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
	    var $username=$('#uname').blur(function(){$(window).scrollTop(0)});
	    var $province=$('#province').blur(function(){$(window).scrollTop(0)});
	    var $city=$('#city').blur(function(){$(window).scrollTop(0)});
	    var $phone=$('#mobile').blur(function(){$(window).scrollTop(0)});
		$("#submitbtn").bind("tapone",function(){
			
	        if($username.val()==''){
	            $username[0].focus();
	            $(".tiptxt",$("#formtip").show()).html("用户名不能为空！");
	            return false;
	        }else if($province.val()=='省份'){
	            $province[0].focus();
	            $(".tiptxt",$("#formtip").show()).text("请选择省份！");
	            return false;
	        }else if($city.val()=='市/区'){
	            $city[0].focus();
	             $(".tiptxt",$("#formtip").show()).text("请选择城市！");
	            return false;
	        }else if($phone.val()==""|| !reqPhone.test($phone.val())){
	            $phone[0].focus();
	            $(".tiptxt",$("#formtip").show()).text("请输入合法的手机号码！");
	            return false;
	        }else{
	        	_smq.push(['custom','填写信息_提交',$username.val(),$phone.val()]);
				var data = {username:$username.val(),province:$province.val(),city:$city.val(),phone:$phone.val(),gender:$("#sex").val()?"男":"女",source:'mobile-launch',callback:'callback'};
				var url = 'http://special.mercedes-benz.com.cn/NewC-Class/pre-sale/deal_jsonp.php';
				$.ajax({
					type: "POST",
					url: url,
					data: data,
					dataType: "jsonp",
					success: function(data){
						if(data.code==1){
							
						}else{
							alert(data.msg);
						}
					}
				});
	        }
		});
		$("#formtip").unbind().bind("tapone",function(){
			$(this).hide();
		});
		//重置
		$("#resetbtn").bind("tapone",function(){
			$("#uname,#mobile").attr("value","");
			$("#province option").first().attr("selected",true);
			$("#city option").first().attr("selected",true);
			$("#sexmale").trigger("tapone");
		});
		
		//产品点
		$(".morebtn").bind("tapone",morebtnfunc).bind("touchmove",stopEvent);
		function morebtnfunc(){
			_smq.push(['custom','六个改变页面左侧','六个改变页面左侧_了解更多']);
			var tar=$(this).unbind().css("opacity",1).show().animate({"opacity":0},function(){tar.hide()});
			var par=tar.parent();
			var o=$(".moretxt",par).css("opacity",0).show().animate({"opacity":1},function(){
				o.bind("tapone",moretxtfunc);
			});
		}
		
		function moretxtfunc(){
			var tar=$(this).unbind().css("opacity",1).show().animate({"opacity":0},function(){tar.hide()});
			var par=tar.parent();
			var o=$(".morebtn",par).css("opacity",0).show().animate({"opacity":1},function(){
				o.bind("tapone",morebtnfunc);
			});
		}
		
		//tvc
		$("#example_video").attr("width",THISW*431/1136).attr("height",THISH*238/543).css({"left":THISW*((1-431/1136)/2)});
		//launch
		$("#launch_video").attr("width",THISW*431/1136).attr("height",THISH*238/543).css({"left":THISW*((1-431/1136)/2)});
	}

	
	
	function muenbtnfx(id){
		location.href=location.href.split("#")[0]+"#pos_"+id;
		$("#innermc123").show().css("left",-animateobj[id].index*THISW)
		$("#innermc123>div").hide();
		$("#"+id+"con").show();
		ctip=id;
	}
	
	function stopEvent(e){
		e.stopPropagation();
		e.preventDefault();
	}
	
	
	//menu button
	$("#pro_all").bind("tapone",{"type":1},function(e,param){
		//hidelayer();
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			_smq.push(['custom','menu页面','menu页面_产品体验']);
		}else{
			$("#menu").hide();
		}
		$("#productindtro").show().css("opacity",0).animate({"opacity":1},function(){
			$("#menubtn").show();
		});
		$("#menubtn").show();
		muenbtnfx(this.id);
		$("#animateingobj").attr("src","images/mobile/frame/benz_000.jpg");
	});
	$("#pro_1,#pro_2,#pro_3,#pro_4,#pro_5,#pro_6").bind("tapone",function(e,param){
		var index=parseInt(this.id.split("_")[1]);
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			switch(index){
				case 1:
					_smq.push(['custom','menu页面','menu页面_科技']);
					break;
				case 2:
					_smq.push(['custom','menu页面','menu页面_照明']);
					break;
				case 3:
					_smq.push(['custom','menu页面','menu页面_内饰']);
					break;
				case 4:
					_smq.push(['custom','menu页面','menu页面_触控']);
					break;
				case 5:
					_smq.push(['custom','menu页面','menu页面_动力']);
					break;
				case 6:
					_smq.push(['custom','menu页面','menu页面_空间']);
					break;	
			}
			ctip=this.id;
			var frames=animateobj[animateobj[ctip].prev].frames.split("-");
			var sf=parseInt(frames[0]);
			var ef=parseInt(frames[1]);
			var ca=[];
			$("#animateingobj").width(THISW).show().attr("images/mobile/frame/benz_"+getFullDigit(sf)+".jpg");
			for(var i=sf;i<=ef;i++){
				ca.push("images/mobile/frame/benz_"+getFullDigit(i)+".jpg")
			}
			$("#animateimgcon").show();
			$("#innermc123>div").hide();
			setupAnim(0.12,'animateingobj',ca,0.25,1,false,function(){
				if(animateobj[ctip].next){
					//ctip=animateobj[ctip].next;
					$("#"+ctip+"con").show();
					$("#animateimgcon").hide();
					sliderfunc();
				}
			});
			
			
		}else{
			$("#menu").hide();
		}
		
		muenbtnfx(this.id);
		switch(index){
			case 1:
				$("#animateingobj").attr("src","images/mobile/frame/benz_020.jpg");
				break;
			case 2:
				$("#animateingobj").attr("src","images/mobile/frame/benz_043.jpg");
				break;
			case 3:
				$("#animateingobj").attr("src","images/mobile/frame/benz_106.jpg");
				break;
			case 4:
				$("#animateingobj").attr("src","images/mobile/frame/benz_130.jpg");
				break;
			case 5:
				$("#animateingobj").attr("src","images/mobile/frame/benz_170.jpg");
				break;
			case 6:
				$("#animateingobj").attr("src","images/mobile/frame/benz_195.jpg");
				break;
		}
		$("#productindtro").show().css({"opacity":0,"left":0}).animate({"opacity":1},function(){
			$("#menubtn").show();
		});
		$("#menubtn").show();
	});
	$("#ond").bind("tapone",function(e,param){
		//hidelayer();
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			_smq.push(['custom','menu页面','menu页面_预约试驾']);
		}else{
			$("#menu").hide();
		}
		/*
		$("#ondcon").show().css("opacity",0).animate({"opacity":1},function(){
			$("#menubtn").show();
		});
		location.href=(location.href.split("#")[0]+"#ond");
		*/
		
		$("#productindtro").show().css("opacity",0).animate({"opacity":1});
		muenbtnfx(this.id);
		$("#menubtn").show();
	});
	$("#tvc").bind("tapone",function(e,param){
		//hidelayer();
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			_smq.push(['custom','menu页面','menu页面_TVC']);
		}else{
			$("#menu").hide();
		}
		//location.href=(location.href.split("#")[0]+"#tvc");
		//$("#ondcon").show().css("opacity",0).animate("opacity":1);
		$("#productindtro").show().css("opacity",0).animate({"opacity":1});
		muenbtnfx(this.id);
		$("#menubtn").show();
	});
	$("#config").bind("tapone",function(e,param){
		//hidelayer();
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			_smq.push(['custom','menu页面','menu页面_参数配置']);
		}else{
			$("#menu").hide();
		}
		/*
		$("#configcon").show().css("opacity",0).animate({"opacity":1},function(){
			$("#menubtn").show();
		});
		location.href=(location.href.split("#")[0]+"#config");
		*/
		$("#productindtro").show().css({"opacity":0}).animate({"opacity":1});
		muenbtnfx(this.id);
		$("#menubtn").show();
	});
	$("#launch").bind("tapone",function(e,param){
		//倒计时，直播，视频
		//hidelayer();
		if(param){
			$("#menu").show().css("opacity",1).animate({"opacity":0},function(){$("#menu").hide()});
			_smq.push(['custom','menu页面','menu页面_上市盛典']);
		}else{
			$("#menu").hide();
		}
		/*
		$("#timercon").show().css("opacity",0).animate({"opacity":1},function(){
			$("#menubtn").show();
		});
		$("#launchlive").attr({"src":"http://c.youku.com/NewC-Class/m-iframe","height":THISH,"width":THISW}).parent().css("opacity",0).show().animate({"opacity":1});
		location.href=(location.href.split("#")[0]+"#launch");
		*/
		$("#productindtro").show().css("opacity",0).animate({"opacity":1});
		$("#launchlive").attr("src","http://c.youku.com/NewC-Class/m-iframe").attr("height",THISH).attr("width",480).css("margin-left",(THISW-480)/2).parent().css("opacity",0).show().animate({"opacity":1});
		muenbtnfx(this.id);
		$("#menubtn").show();
	});
	
	$("#sharebtn").bind("tapone",function(){
		var sns_title="全新梅赛德斯-奔驰长轴距C级车 驾驭改变";
		var sns_text="改变，灵动设计的创新者。驾驭，科技先锋的领跑者。全新梅赛德斯-奔驰长轴距C级车，革新上市！颠覆您的想象，邀您置身于超凡魅力的三维世界。";
		var sns_url="http://special.mercedes-benz.com.cn/NewC-Class/";
		$("#sharetext,#sharebtn").click(function(){
			var _url="http://v.t.sina.com.cn/share/share.php?&searchPic=false";
			_url+=("&url="+encodeURI(sns_url));
			_url+=("&title="+encodeURI(sns_text));
			_url+="&pic=http://special.mercedes-benz.com.cn/NewC-Class/images/share.jpg";
			window.open(_url,"_blank");
		});
		
		_smq.push(['custom','menu页面','menu页面_分享']);
	});
	
	function hidelayer(){
		$("#productindtro").hide();
		$("#ondcon").hide();
		$("#configcon").hide();
		$("#timercon").hide();
	}
	
	$("#menubtn").bind("tapone",function(){
		$(this).hide();
		$("#menu").show().css("opacity",0).animate({"opacity":1});
		location.href=location.href.split("&")[0]+"&menu";
		//hidelayer();
		$("#productindtro").css("opacity",1).animate({"opacity":0},function(){$("#productindtro").css("opacity",1).hide()});
		
		_smq.push(['custom','右下角导航按钮','右下角导航按钮_右下角导航按钮']);
	});
	
	$("#returnhome").bind("tapone",function(){
		$("#pro_all").trigger("tapone");
	});
	
	$("#returnbtn").bind("tapone",function(){
		$("#menu").show().css("opacity",1).animate({"opacity":0},function(){
			$("#menu").hide();
			$("#menubtn").show();
		});
		$("#productindtro").css("opacity",0).show().animate({"opacity":1});
		location.href=location.href.replace("&menu","");
	});
	
});
/*
_smq.push(['custom','改变1','改变1_让科技得心应手']);
_smq.push(['custom','改变2','改变2_让未知尽收眼底']);
_smq.push(['custom','改变3','改变3_让内涵不彰自显']);
_smq.push(['custom','改变4','改变4_让世界紧密相连']);
_smq.push(['custom','改变5','改变5_让风速追随脚步']);
_smq.push(['custom','改变6','改变6_让空间尽其所长']);
_smq.push(['custom','参数配置页面','参数配置页面']);
_smq.push(['custom','预约试驾页面','预约试驾页面']);
_smq.push(['custom','TVC页面','TVC页面']);
 * */
var animateobj={
	"pro_all":{"frames":"0-20","next":"pro_1","prev":false,"index":0},
	"pro_1":{"frames":"20-43","next":"pro_2","prev":"pro_all","index":0},
	"pro_2":{"frames":"43-106","next":"pro_3","prev":"pro_1","index":0},
	"pro_3":{"frames":"106-130","next":"pro_4","prev":"pro_2","index":0},
	"pro_4":{"frames":"130-170","next":"pro_5","prev":"pro_3","index":0},
	"pro_5":{"frames":"170-195","next":"pro_6","prev":"pro_4","index":0},
	"pro_6":{"next":"config","prev":"pro_5","index":0},
	"config":{"next":"ond","prev":"pro_6","index":1},
	"ond":{"next":"tvc","prev":"config","index":2},
	"tvc":{"next":"launch","prev":"ond","index":3},
	"launch":{"next":false,"prev":"tvc","index":4}
}
var ctip="pro_all";
function sliderfunc(){
	$("#productindtro").bind("swipeleft",leftslider).bind("swipeleftup",leftslider).bind("swipeleftdown",leftslider);
	$("#productindtro").bind("swiperight",rightslider).bind("swiperightup",rightslider).bind("swiperightdown",rightslider);
}

function eventlistenlist(tip){
	switch(tip){
		case "pro_1":
			_smq.push(['custom','改变1','改变1_让科技得心应手']);
			break;
		case "pro_2":
			_smq.push(['custom','改变2','改变2_让未知尽收眼底']);
			break;
		case "pro_3":
			_smq.push(['custom','改变3','改变3_让内涵不彰自显']);
			break;
		case "pro_4":
			_smq.push(['custom','改变4','改变4_让世界紧密相连']);
			break;
		case "pro_5":
			_smq.push(['custom','改变5','改变5_让风速追随脚步']);
			break;
		case "pro_6":
			_smq.push(['custom','改变6','改变6_让空间尽其所长']);
			break;
		case "config":
			_smq.push(['custom','参数配置页面','参数配置页面']);
			break;
		case "ond":
			_smq.push(['custom','预约试驾页面','预约试驾页面']);
			break;
		case "tvc":
			_smq.push(['custom','TVC页面','TVC页面']);
			break;
	}
}


function leftslider(e){
	$("#productindtro").unbind();
	if(animateobj[ctip].frames){ 
		var frames=animateobj[ctip].frames.split("-");
		var sf=parseInt(frames[0]);
		var ef=parseInt(frames[1]);
		var ca=[];
		$("#animateingobj").width(THISW).show().attr("images/mobile/frame/benz_"+getFullDigit(sf)+".jpg");
		for(var i=sf;i<=ef;i++){
			ca.push("images/mobile/frame/benz_"+getFullDigit(i)+".jpg")
		}
		$("#animateimgcon").show();
		$("#innermc123>div").hide();
		setupAnim(0.12,'animateingobj',ca,0.25,1,false,function(){
			if(animateobj[ctip].next){
				ctip=animateobj[ctip].next;		
				$("#"+ctip+"con").show();
				$("#animateimgcon").hide();
				eventlistenlist(ctip);
				sliderfunc();
			}
		});
	}else{
		if(animateobj[ctip].next){
			$("#"+animateobj[ctip].next+"con").show();
			$("#innermc123").animate({"left":-(animateobj[ctip].index+1)*THISW},function(){
				ctip=animateobj[ctip].next;
				eventlistenlist(ctip);
				sliderfunc();
			});
		}else{
			sliderfunc();
		}
	}
	if(animateobj[ctip].next){
		window.location.href=window.location.href.split("#")[0]+"#pos_"+animateobj[ctip].next;		
	}
}


function rightslider(e){
	if(animateobj[ctip].prev){
		$("#innermc123>div").hide();
		$("#productindtro").unbind();
		if(animateobj[animateobj[ctip].prev].frames){
			var frames=animateobj[animateobj[ctip].prev].frames.split("-");
			var ef=parseInt(frames[0]);
			var sf=parseInt(frames[1]);
			var ca=[];
			$("#animateingobj").width(THISW).show().attr("images/mobile/frame/benz_"+getFullDigit(sf)+".jpg");
			for(var i=sf;i>=ef;i--){
				ca.push("images/mobile/frame/benz_"+getFullDigit(i)+".jpg")
			}
			$("#animateimgcon").show();
			setupAnim(0.12,'animateingobj',ca,0.25,1,false,function(){
				ctip=animateobj[ctip].prev;
				$("#"+ctip+"con").show();
				$("#animateimgcon").hide();
				eventlistenlist(ctip);
				sliderfunc();
			});
		}else{
			$("#"+animateobj[ctip].prev+"con").show();
			$("#innermc123").animate({"left":-(animateobj[ctip].index-1)*THISW},function(){
				ctip=animateobj[ctip].prev;
				eventlistenlist(ctip);
				sliderfunc();
			});
		}
		window.location.href=window.location.href.split("#")[0]+"#pos_"+animateobj[ctip].prev;
	}
}



function getFullDigit(num){
	num=parseInt(num);
	if(num<10){
		num="00"+num
	}else if(num<100){
		num="0"+num
	}else{
		num=""+num
	}
	return num
}

