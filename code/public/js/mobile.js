window.reqAnimFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;
var imgs=["p1.jpg","p2.jpg","p3.jpg","p4.jpg","p5.jpg","p6.jpg","p7.jpg","p8.jpg","timerbg.jpg","config.jpg","formbg.jpg","menubg.png"]
var indexparam={
	"pro_all":0,
	"pro_1":1,
	"pro_2":2,
	"pro_3":3,
	"pro_4":4,
	"pro_5":5,
	"pro_6":6,
	//"pro_7":7,
	//"config":8,
	//"ond":9,
	//"tvc":10,
	//"launch":11
	
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
/*
var cv=document.getElementById("productcanvas");
var ctx=cv.getContext("2d");
cv.setAttribute("height",THISH);
cv.setAttribute("width",THISW);
*/
var slider="";
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
	var aci=ci;
	var ai=0;
	var percent=0;
	var imgfiles=[];

	for(var i=0;i<imgs.length;i++){
		var _o={};
		_o.uri=imgs[i];
		imgfiles.push(_o)
	}
	ai=imgfiles.length;
	
	for(var i=0;i<ai;i++){
		var _per=(i+1)*Math.floor(100/ai);
		if(i<(100%ai)){
			_per+=(i+1);
		}else{
			_per+=(100%ai);
		}
		imgfiles[i].per=_per;
	}
	
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
			slider=$("#productcon").show().unslider({autoplay:false,"complete":function(){
					var index=parseInt(slider.data("unslider").i);
					switch(index){
						case 0:
							location.href=location.href.split("#")[0]+"#pos_pro_all";
							break;
						case 1:
							location.href=location.href.split("#")[0]+"#pos_pro_1";
							_smq.push(['custom','改变1','改变1_让科技得心应手']);
							break;
						case 2:
							location.href=location.href.split("#")[0]+"#pos_pro_2";
							_smq.push(['custom','改变2','改变2_让未知尽收眼底']);
							break;
						case 3:
							location.href=location.href.split("#")[0]+"#pos_pro_3";
							_smq.push(['custom','改变3','改变3_让内涵不彰自显']);
							break;
						case 4:
							location.href=location.href.split("#")[0]+"#pos_pro_4";
							_smq.push(['custom','改变4','改变4_让世界紧密相连']);
							break;
						case 5:
							location.href=location.href.split("#")[0]+"#pos_pro_5";
							_smq.push(['custom','改变5','改变5_让风速追随脚步']);
							break;
						case 6:
							location.href=location.href.split("#")[0]+"#pos_pro_6";
							_smq.push(['custom','改变6','改变6_让空间尽其所长']);
							break;
						//case 7:
							//location.href=location.href.split("#")[0]+"#pos_pro_7";
							//break;
						case 7:
							location.href=location.href.split("#")[0]+"#pos_config";
							_smq.push(['custom','参数配置页面','参数配置页面']);
							break;
						case 8:
							location.href=location.href.split("#")[0]+"#pos_ond";
							_smq.push(['custom','预约试驾页面','预约试驾页面']);
							break;
						case 9:
							if(navigator.appVersion.toLowerCase().indexOf("ucbrowser")){
								$("#tvccon").show();
							}
							location.href=location.href.split("#")[0]+"#pos_tvc";
							_smq.push(['custom','TVC页面','TVC页面']);
							break;
						case 10:
							location.href=location.href.split("#")[0]+"#pos_launch";
							break;
					}
			},starting:function(){
				if(i!=10){
					if(navigator.appVersion.toLowerCase().indexOf("ucbrowser")>0){
						$("#tvccon").hide();
					}
				}
			}
			});
			//slider.data("unslider").to(indexparam.launch);
			loadimages();
			$("#hourcon,#mincon,#seccon").css("top",0.27*(THISW*640/1136)+(THISH-(640/(1136/THISW)))/2 );
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
			imgfiles[ci].isready=true;
				ci++;
				if(ci<imgfiles.length){
					$(this).attr("src","images/mobile/"+imgfiles[ci].uri);
				}
		}).attr("src","images/mobile/"+imgfiles[ci].uri);
		animatefunc();
	}
	function animatefunc(){
		//console.log(percent)
		
		if(aci<imgfiles.length){
			if(imgfiles[aci].isready){
				percent++;
				$("#innercover").width(THISW*(1-percent/100));
				//console.log(percent+";"+imgfiles[aci].per)
				if(percent>=imgfiles[aci].per && !imgfiles[aci].flag){
					imgfiles[aci].flag=true;
					aci++;
				}
				$("#loadpercentcon").text(percent+"%")
				setTimeout(animatefunc,20);
			}else{
				if((imgfiles[aci].per<=percent)){
					percent=imgfiles[aci].per;
					$("#innercover").width(THISW*(1-percent/100));
					$("#loadpercentcon").text(percent+"%")
					setTimeout(animatefunc,100);
				}else{
					percent++;
					$("#innercover").width(THISW*(1-percent/100));
					$("#loadpercentcon").text(percent+"%")
					setTimeout(animatefunc,100*(1/(imgfiles[aci].per-percent)));
				}
			}
		}else{
			ci=0;
			var uritag=location.href.split("#")[1];
			if(uritag){
				var _tag=uritag.split("&")[0];
				if(_tag=="pos_pro_7"){
					$("#menu").hide();
					$("#productindtro").show().css("opacity",0).animate({"opacity":1},function(){
						$("#menubtn").show();
						slider.data("unslider").to(indexparam.pro_7);
					});
				}else{
					$("#"+_tag.replace("pos_","")).trigger("tapone");
				}
			}else{
				$("#loader").animate({"opacity":0});
				$("#productindtro").css({"opacity":0}).show().animate({"opacity":1});
				location.href=location.href+"#pro_all";
			}
			$("#loader").remove();
			$("#productcon .kvitem").each(function(i,v){
				if(i<7){
					$(v).css({"background-image":"url(images/mobile/"+imgfiles[i].uri+")","width":THISW});
				}
			});
			//重播
			$("#replaybtn").bind("tapone",function(){
				slider.data("unslider").to(indexparam.pro_all);
				_smq.push(['custom','见证6个改变结束后出现的页面','再次体验']);
			});
			//试驾
			$("#testbtn").bind("tapone",function(){
				slider.data("unslider").to(indexparam.ond);
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
	}

	
	
	
	
	function stopEvent(e){
		e.stopPropagation();
		e.preventDefault();
	}
	
	
	//倒计时
	var launchtime=new Date("2014","7","25","20","30","0");
	function timerInit(){
		var dt=Math.floor((launchtime.valueOf()-(new Date()).valueOf())/1000);
		var dh=Math.floor(dt/3600);
		var dm=Math.floor((dt-dh*3600)/60);
		var ds=dt-dh*3600-dm*60;
		//alert(THISH+";"+(640/(1136/THISW)))
		$("#hourcon,#mincon,#seccon").css("top",0.27*(THISW*640/1136)+(THISH-(640/(1136/THISW)))/2 );
		
		$("#seccon .left").each(function(i,v){
			var _num=Math.floor(ds/10);
			var tar=$(v);
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num5";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		$("#seccon .right").each(function(i,v){
			var tar=$(v);
			var _num=ds%10;
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num9";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		
		$("#mincon .left").each(function(i,v){
			var tar=$(v);
			var _num=Math.floor(dm/10);
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num5";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		$("#mincon .right").each(function(i,v){
			var tar=$(v);
			var _num=dm%10;
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num9";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		
		$("#hourcon .left").each(function(i,v){
			var tar=$(v);
			var _num=Math.floor(dh/10);
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num5";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		$("#hourcon .right").each(function(i,v){
			var tar=$(v);
			var _num=dh%10;
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num9";
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
			}
		});
		numfunc(dh,dm,ds);
	}
	
	function decatefunc(ctx,dn,dh,dm,ds){
		var _num=0;
		if(ctx=="seccon"){
			if(dn=="left"){
				_num=Math.floor(ds/10);
			}
		}else if(ctx=="mincon"){
			if(dn=="left"){
				_num=Math.floor(dm/10);
			}else{
				_num=dm%10;
			}
		}else if(ctx=="hourcon"){
			if(dn=="right"){
				_num=dh%10;
			}
		}
		$("#"+ctx+" ."+dn).each(function(i,v){
			var tar=$(v);
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
				tar.animate({"opacity":0},1000,function(){tar.removeClass("front").addClass("back");});
			}else{
				if((_num-1)<0){
					if(dn=="left"){
						if(ctx=="seccon"){
							ctx="mincon";
						}else if(ctx=="mincon"){
							ctx="hourcon"
						}else{
							//end
						}
						$(".num",tar)[0].className="num num5";
						decatefunc(ctx,"right",dh,dm,ds)
					}else{
						$(".num",tar)[0].className="num num9";
						decatefunc(ctx,"left",dh,dm,ds)
					}
					
						
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
				tar.animate({"opacity":1},1000,function(){tar.removeClass("back").addClass("front");});
			}
		});
	}
	
	function numfunc(dh,dm,ds){
		ds--;
		if(ds<0){
			dm--;
			ds=59;
			if(dm<0){
				dh--;
				dm=59;
			}
		}
		if(dh<0){
			dh=0;
			dm=0;
			ds=0;
		}
		$("#seccon .right").each(function(i,v){
			var tar=$(v);
			var _num=ds%10;
			
			if(tar.hasClass("front")){
				$(".num",tar)[0].className="num num"+_num;
				tar.removeClass("front").addClass("back");
				tar.animate({"opacity":0},1000,function(){});
			}else{
				if((_num-1)<0){
					$(".num",tar)[0].className="num num9";
					decatefunc("seccon","left",dh,dm,ds);
				}else{
					$(".num",tar)[0].className="num num"+(_num-1);
				}
				
				tar.removeClass("back").addClass("front");
				tar.animate({"opacity":1},1000,function(){numfunc(dh,dm,ds);});
			}
		});
	}
	timerInit();
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
			slider.data("unslider").to(indexparam.pro_all);
		});
		$("#menubtn").show();
	});
	$("#pro_1,#pro_2,#pro_3,#pro_4,#pro_5,#pro_6").bind("tapone",function(e,param){
		//hidelayer();
		
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
		}else{
			$("#menu").hide();
		}
		$("#productindtro").show().css("opacity",0).animate({"opacity":1},function(){
			$("#menubtn").show();
			slider.data("unslider").to(index);
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
		slider.data("unslider").to(indexparam.ond);
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
		$("#menubtn").show();
		//location.href=(location.href.split("#")[0]+"#tvc");
		//$("#ondcon").show().css("opacity",0).animate("opacity":1);
		$("#productindtro").show().css("opacity",0).animate({"opacity":1});
		slider.data("unslider").to(indexparam.tvc);
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
		$("#productindtro").show().css("opacity",0).animate({"opacity":1});
		slider.data("unslider").to(indexparam.config);
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
		slider.data("unslider").to(indexparam.launch);
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
	
	$(".returnhome").bind("tapone",function(){
		$("#pro_all").trigger("tapone");
	});
	
	$("#returnbtn").bind("tapone",function(){
		$("#menu").show().css("opacity",1).animate({"opacity":0},function(){
			$("#menu").hide();
			$("#menubtn").show();
		});
		$("#productindtro").css("opacity",0).show().animate({"opacity":1});
		//$("#"+location.href.split("&")[0].split("#")[1]).trigger("tapone");
	});
	
});

