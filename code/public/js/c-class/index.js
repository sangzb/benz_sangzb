//倒计时
//function countDown(time,id){
//	//var day_elem = $(id).find('.day');
//	var hour_elem = $(id).find('.hour');
//	var minute_elem = $(id).find('.minute');
//	var second_elem = $(id).find('.second');
//	var end_time = new Date(time).getTime(),//月份是实际月份-1
//	sys_second = (end_time-new Date().getTime())/1000;
//	var timer = setInterval(function(){
//		if (sys_second > 1) {
//			sys_second -= 1;
//			var day = Math.floor(((sys_second / 3600) / 24)*24);
//			var hour = Math.floor((sys_second / 3600) % 24);
//			var minute = Math.floor((sys_second / 60) % 60);
//			var second = Math.floor(sys_second % 60);
//			//day_elem && $(day_elem).text(day);//计算天
//			//console.info(day)
//			//$(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
//			$(hour_elem).text(day);//计算小时
//			$(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
//			$(second_elem).text(second<10?"0"+second:second);//计算秒杀
//		} else { 
//			$(".time_count").hide();
//			$("#slide12").find("iframe").attr("src","http://c.youku.com/NewC-Class/iframe");
//			$("#ipo_video").show();
//			clearInterval(timer);
//		}
//	}, 1000);
//}
function gotoUrl(){
	var url = window.location.toString();
    var id = url.split("/")[3];
    var id2 = url.split("/")[1];
    if(id=='final'){
	//	window.location.href="/final#firstPage/11"
    }else if(id=='final'){
		//window.location.href="/final#firstPage/11"
	}
}


$(function(){
if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
	$("#audio").attr("autoplay","autoplay")
}
$("#menu a").click(function(){
	var index=$(this).index()
	if(1<=index<=5){
		//$("#menu a").eq(index).addClass("select2").siblings("a").removeClass("select2")
		$("#slide0").fadeOut()
	}
	if(index==0){
		$("#menu a").eq(index).addClass("select2").siblings("a").removeClass("select2")
		$("#slideIndex").html("0")
		$("#slide0").fadeIn().find(".text4").removeClass("texto").css({"opacity":"0",'filter':'alpha(opacity=0)'})
		$("#slide1").find(".videoItem img").eq(0).addClass("show").siblings().removeClass("show")
	}

})
$("#slide1 .replay").click(function(){
						$(".videoItem img").hide()
	
})


	
	// gotoUrl()//判断url
	orient(); //判断是否为ipad横屏
	//倒计时
	// countDown("2014/8/25 20:30:00","#colockbox1");
	//div.icon_list hover第三屏，内饰介绍
	$("div.icon_list div,div.icon_list2 div,.icon_Item div").hover(function(){
		//$(this).animate({"width":"400px"})
	},function(){
		//$(this).animate({"width":"27px"})
	})
	

	$("div.icon_list div").click(function(){
		var index=$(this).index()
		$(".pop_list").fadeIn();
		$(".pop_list .info_f").eq(index).show().siblings("div").hide();
		$("body").css({"height":"100%","overflow":"hidden"})
	})


	$("div.icon_list div").click(function(){
		var index=$(this).index()
		$(".pop_list").fadeIn();
		$(".pop_list .info_f").eq(index).show().siblings("div").hide();
		$("body").css({"height":"100%","overflow":"hidden"})
	})
	$("div.icon_list2 .icon5").click(function(){
		$(".pop_list").fadeIn();
		$(".pop_list .info_f").eq(4).show().siblings("div").hide();
		$("body").css({"height":"100%","overflow":"hidden"})
	})
	$("div.icon_list2 .icon6").click(function(){
		$(".pop_list").fadeIn();
		$(".pop_list .info_f").eq(5).show().siblings("div").hide();
		$("body").css({"height":"100%","overflow":"hidden"})
	})
	$("div.icon_Item .icon0").click(function(){
		var ic=$(this).attr("class")
		$(".pop_list").fadeIn();
		$(".pop_list").find(".icon0").show().siblings("div").hide();
		
	})
	//pop list close
	$(".pop_list .close").click(function(){
		$(".pop_list").fadeOut();
		$("body").css({"height":"10000px","overflow":"auto"})
	})
	//.submit  ok
	$(".submit input[name='gender']").click(function(){
		var index=($(this).index())
		if(index==3){
			$(".submit .man_bg").show();
			$(".submit .woman_bg").hide();
		}else{
			$(".submit .man_bg").hide();
			$(".submit .woman_bg").show();
		}
	})
	$(".province_bg").html($("#province").val())
	$(".city_bg").html($("#city").val())
	$("#province").click(function(){
		$(".province_bg").html($("#province").val())
		$(".city_bg").html($("#city").val())
	})
	$("#city").click(function(){
		$(".city_bg").html($("#city").val())
	})
	$("#submit").click(function(){
		var reqPhone = /^0?(13[0-9]|17[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
		var $name=$(".submit .name").val()
		var $province=$("#province").val()
		var $city=$("#city").val()
		var $mobile=$(".submit .mobile").val()
		if($name==""){
			alert("用户名不能为空")
		}else if($province=="省份"){
			alert("请选择省份")
		}else if($mobile==""||!reqPhone.test($mobile)){
			alert("请输入合法的手机号码")

		}else{
            var data = {username:$name,province:$province,city:$city,phone:$mobile,gender:$("input[name='gender']:checked").val(),source:'pc-launch',callback:'callback1'};
			var url = 'http://special.mercedes-benz.com.cn/NewC-Class/pre-sale/deal_jsonp.php';
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "jsonp",
				success: function(data){
					
				}
			});
			
			
		}

	})
	$("#re_write").click(function(){
		$(".submit .name").val("")
		$(".submit .mobile").val("")
		$("#province option").first().attr("selected",true).trigger("click");
		$("#city").html('<option value="市/区" selected="selected">市/区</option>').trigger("click")
		$(".submit .man").trigger("click")
	})

//news list 
	var length2=$("#news_contact .list ul").length
	if(length2<=1){
		$("#news_contact .arrow_right").addClass("disable")	
	}else{
		$("#news_contact .arrow_right").removeClass("disable")	
	}
	$("#news_contact .arrow_right").click(function(){
		var index=$("#news_contact .list ul.select").index()
		var NextIndex=index+1
		if(NextIndex<length2){
			$("#news_contact .list ul").eq(NextIndex).fadeIn().addClass("select").siblings().hide().removeClass("select")
			$(this).removeClass("n_select")
			$("#news_contact .arrow_left").removeClass("n_select")
		}else{
			$(this).addClass("n_select")
			
		}
	})
	
	$("#news_contact .arrow_left").click(function(){
		var index=$("#news_contact .list ul.select").index()
		var NextIndex=index-1
		if(NextIndex<length2&&NextIndex>=0){
			$(this).removeClass("n_select")
			$("#news_contact .arrow_right").removeClass("n_select")
			$("#news_contact .list ul").eq(NextIndex).fadeIn().addClass("select").siblings().hide().removeClass("select")
			
		}else{
			$(this).addClass("n_select")
		}
	})	
	
	$("#news_contact .list ul li") .click(function(){
		var index=$(this).attr("title")
		if(index==0){
			$("#big_gallery .arrow_left").addClass("n_select")
		}else{
			$("#big_gallery .arrow_left").removeClass("n_select")
		}
		//var imgUrl=$(this).attr("title")	
		$("#big_gallery").fadeIn();
		$("#big_gallery .info .imglist").find("img").eq(index).fadeIn().siblings().fadeOut()
		$("#big_gallery .info .imglist").find("img").eq(index).addClass("select").siblings().removeClass("select")
	})
		$("#big_gallery .arrow_right").click(function(){
			var lenght=$("#big_gallery .imglist img").length
			var index5=$("#big_gallery .imglist img.select").index()
			if(index5<14){
			$("#big_gallery .info .imglist").find("img").eq(index5+1).addClass("select").fadeIn().siblings().removeClass("select").fadeOut()
			//$("#big_gallery .info .imglist").find("img").eq(index5+1).addClass("select").siblings().removeClass("select")
			$("#big_gallery .arrow_left").removeClass("n_select")	
			$(this).removeClass("n_select")	
			}
			else{
			$("#big_gallery .arrow_right").addClass("n_select")	
			}
		})
		$("#big_gallery .arrow_left").click(function(){
			var index6=$("#big_gallery .imglist .select").index()
			var index7=index6-1
			if(index7>=0){
			$("#big_gallery .arrow_right").removeClass("n_select")	
			$(this).removeClass("n_select")	
			$("#big_gallery .info .imglist").find("img").eq(index7).fadeIn().siblings(".big").fadeOut()
			$("#big_gallery .info .imglist").find("img").eq(index7).addClass("select").siblings("img").removeClass("select")
			}
			else{
			$("#big_gallery .arrow_left").addClass("n_select")	
			}
		})		
	
	
	
	
	$("#big_gallery .info .close").click(function(){
		$("#big_gallery").fadeOut();
		$("#big_gallery .info .imglist").removeClass("select")
		
	})

	
//news list over

	function audioPauce(){
		setTimeout(function(){
			   if (document.all) {//IE     
					doc = document.frames["radio"].document;  
					var bb=$(doc).find(".audiojs")
					//$(doc).find(".pause").trigger("click")
					if(bb.hasClass("playing")){
						$(doc).find(".pause").trigger("click")
					}else{

					}

				} else {//Firefox        
					doc = document.getElementById("radio").contentDocument;  
					var bb=$(doc).find(".audiojs")
					if(bb.hasClass("playing")){
						$(doc).find(".pause").trigger("click")
					}else{

					}
				}  
		 
		},1000);			
	}
	function audioPauceC(){
		setTimeout(function(){
			   if (document.all) {//IE     
					doc = document.frames["radio"].document;  
					var bb=$(doc).find(".audiojs")
					//$(doc).find(".pause").trigger("click")
					if(bb.hasClass("playing")){
					}else{

						$(doc).find(".pause").trigger("click")
					}

				} else {//Firefox        
					doc = document.getElementById("radio").contentDocument;  
					var bb=$(doc).find(".audiojs")
					if(bb.hasClass("playing")){
					}else{
						$(doc).find(".pause").trigger("click")

					}
				}  
		 
		},1000);			
	}


	//news video
	$("#news_video").click(function(){
		var close='<a class="close">X</a>'
		$("#newsVideoList").fadeIn()	
		$("#newsVideoList").find(".video").eq(0).fadeIn().append(close).siblings(".video").fadeOut()
		audioPauce()
	})
	$("#newsVideoList .close").live("click",function(){
		$("#newsVideoList").fadeOut();
		$(".play-pause .play").trigger("click")
		$(".vjs-default-skin .vjs-playing").trigger("click")
		audioPauceC()
	})





		
	//.wallpaper_list a span
	$(".wallpaper_list a").hover(function(){
		$(this).find("span").fadeIn();
	},function(){
		$(this).find("span").fadeOut();
	})	
	//video list hover
	$(".video_list a").hover(function(){
	//	var str=$(this).find("img").attr("src")
	//	var spt=str.split(".")[0]+"-h"
		//console.info(spt)
		//ert(str.split(".")[0])
	//	$(this).find("img").attr("src",spt+".jpg")

	},function(){
		//var str=$(this).find("img").attr("src")
		//var spt=str.substring(0,15)
		//console.info(spt)
		//ert(str.split(".")[0])
		//$(this).find("img").attr("src",spt+".jpg")
	})
	$(".video_list a").click(function(){
		$("#video_play").fadeIn()
		var $poster=$(this).attr("alt")
		var $src=$(this).attr("title")
		var close='<a class="close">X</a>'
//		var videoT="<video id='example_video_1' class='video-js vjs-default-skin' controls preload='none' width='800' height='400' poster='"+$poster+"' data-setup='{}'><source src='"+$src+"' type='video/mp4'></video>"
//		$("#video_play .video").empty()
		$("#video_play .video").fadeIn().append(close)
		//$(".play-pause .pause").trigger("click")
		//$(".vjs-big-play-button").trigger("click")
//		setTimeout(function(){
//			   if (document.all) {//IE     
//					doc = document.frames["radio"].document;  
//					var bb=$(doc).find(".pause")
//					$(doc).find(".pause").trigger("click")
//				} else {//Firefox        
//					doc = document.getElementById("radio").contentDocument;  
//					var bb=$(doc).find(".pause")
//					$(doc).find(".pause").trigger("click")
//				}  
//		 
//		},1000);		
		audioPauce()
	

	})
	$("#video_play .video a.close").live("click",function(){
		$("#video_play").fadeOut();
		$(".play-pause .play").trigger("click")
		$(".vjs-default-skin .vjs-playing").trigger("click")
		
		//setTimeout(function(){
//			   if (document.all) {//IE     
//					doc = document.frames["radio"].document;  
//					var bb=$(doc).find(".pause")
//					$(doc).find(".pause").trigger("click")
//				} else {//Firefox        
//					doc = document.getElementById("radio").contentDocument;  
//					var bb=$(doc).find(".pause")
//					$(doc).find(".pause").trigger("click")
//				}  
//		 
//		},1000);	
		audioPauceC()
		
	})
	
	
	
	
	

})


function callback1(data){
	if(data.code==1){
		$(".submit .submit_ok").show();
		var $name=$(".submit .name").val()
		var $mobile=$(".submit .mobile").val()
		_smq.push(['custom','填写信息_提交',$name,$mobile]);
		//$("pre-sale-form .close").trigger("click");
		//open_form();
	}else{
		alert(data.msg);
	}
}
	
function orient() {
   if (window.orientation == 0 || window.orientation == 180) { ///竖排
    orientation = 'portrait';
    $("#ipad_tip").css("display","block")
    return false;
   }
   else if (window.orientation == 90 || window.orientation == -90) { //横屏
    orientation = 'landscape';
   //	alert("尊敬的用户您好，为了更好的体验请您横屏浏览")
    $("#ipad_tip").css("display","none")

    return false;
   }
  }

 $(window).bind( 'orientationchange', function(e){
   orient();
  }); 	
	
	
	
	