$(function(){
    var reqPhone = /^0?(13[0-9]|17[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
    var $username=$('#username') ;
    var $gender=$('.gender');
    var $province=$('#province');
    var $city=$('#city');
    var $phone=$('#phone');
    var $item=$('.item');
    var $form=$('#pre-sale-form form');
    $('.error-msg').addClass('hide')
    $('#pre-sale-form .submit').click(function(){
        $('.error-msg').addClass('hide')
        if($username.val()==''){
            $username.siblings('.error-msg').text('用户名不能为空！').removeClass('hide');
            $username[0].focus()
        }else if($province.val()=='省份'){
            $province.siblings('.error-msg').text('请选择省份！').removeClass('hide')
            $province[0].focus()
        }else if($city.val()=='地级市'){
            $city.siblings('.error-msg').text('请选择城市！').removeClass('hide')
            $city[0].focus()
        }else if($phone.val()==""|| !reqPhone.test($phone.val())){
            $phone.siblings('.error-msg').text('请输入合法的手机号码！').removeClass('hide');
            $phone[0].focus()
        }else if(!$item.attr('checked')){
            $item.siblings('.error-msg').text('请同意隐私条款！').removeClass('hide')
            $item[0].focus()
        }else{
            $('.error-msg').hide();
            var data = {username:$username.val(),province:$province.val(),city:$city.val(),phone:$phone.val(),gender:$("input[name='gender']:checked").val(),source:'pc-launch',callback:'callback1'};
			//_smq.push(['custom','填写信息_提交',$username.val(),$phone.val()]);
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
    });
    $('#pre-sale-form .reset').click(function(){
        $form[0].reset();
        $('.error-msg').hide()
    });
    $('#pre-sale-form .close').click(function(){
        $('#pre-sale-form').hide()
    })

	
});

function callback1(data){
	if(data.code==1){
		//alert("提交成功");
		$("#sub_ok").show();
		var name=$('#username').val()
		var phone=$("#phone").val()
		_smq.push(['custom','参加预售_提交_PC',name,phone]);
		$("#form_container").hide();
		//$("pre-sale-form .close").trigger("click");
        //open_form();
	}else{
		alert(data.msg);
	}
}
$("#sub_ok a.close").click(function(){
	$("#sub_ok").hide();
	$("#form_container").show();
	open_form();
	
	})