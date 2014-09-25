function Dealer(){
    this.init()
}
Dealer.prototype={
    reqPhone : /^0?(13[0-9]|17[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
    seriserId:-1,
    typeId:-1,
    seriseArr:{},
    typeArr:{},
    init:function(){
        var self= this;
        this.showPopup();
        this.sendAddress();
        this.toTop();
        $('[data-toggle=modal]').click(function(){
            self.seriserId=$(this).attr('data-seriesid')||-1 ;
            self.typeId=$(this).attr('data-typeid')||-1 ;
        })
    },
    toTop:function(){
         $('.to-top').click(function(){
             window.scrollTo(0,0)
         })
    },
    getTypeAndSeries:function($series,$type){
        var seriesList,typeList,self= this;
        $.get('/index.php?option=com_dealer&task=getCarSeries',function(data){
            seriesList= JSON.parse(data);
            var series ='<option value="-1">请选择车系</option>'
            for(var i=0;i<seriesList.length;i++){
                series+='<option value="'+seriesList[i].Id+'">'+seriesList[i].seriesName+'</option>';
                 self.seriseArr[seriesList[i].Id]=seriesList[i].alias;
            }
            $series.html(series);

            $series.val(self.seriserId)
        });


        if(!$type) return false;

        $.get('/index.php?option=com_dealer&task=getCarTypes',function(data){
            typeList= JSON.parse(data);
            getTypeById(self.seriserId)
            $series.on('change',function(){
                var val=$(this).val();
                getTypeById(val)
            })
        });
        function getTypeById(val){

            var type ='<option value="-1">请选择车型</option>'
            for(var i=0;i<typeList.length;i++){
                if(typeList[i].carseriesId==val){
                    type+= '<option value="'+typeList[i].Id+'">'+typeList[i].cartypeName+'</option>';
                    self.typeArr[typeList[i].Id]=typeList[i].code;
                }
            }
            $type.html(type);
            $type.val(self.typeId)
        }
    },
    showPopup:function(){
        /* type: 1试驾 2订车 3获取产品手册 4询价*/
        var reqPhone = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/
        $('#myModal-drive').on('show.bs.modal', function (e) {
           self.getTypeAndSeries($('#myModal-drive #demio'),$('#myModal-drive #vehicle-model'))
            Vcommon($('#drive'),1);
            setup()
        });
        $('#myModal-enquiry').on('show.bs.modal', function (e) {
            self.getTypeAndSeries($('#myModal-enquiry #demio'),$('#myModal-enquiry #vehicle-model'))
            Vcommon($('#enquiry'),4);
        });
        $('#myModal-book').on('show.bs.modal', function (e) {
            self.getTypeAndSeries($('#myModal-book #demio'),$('#myModal-book #vehicle-model'))
            Vcommon($('#book'),2);
        });
        var self = this;

        function Vcommon(parent,type) {
            var username = parent.find('#username');
            var phone = parent.find('#phone');
            var demio = parent.find('#demio');
            var vehicle_model = parent.find('#vehicle-model');
            var demio=parent.find('#demio');
            var province=parent.find('#province')
            username.val('');
            phone.val('') ;
            parent.find('.submit').unbind('click')
            parent.find('.submit').bind('click', function () {
               $('.form-group').removeClass('has-error');
                $('.modal .alert-danger').hide()
                if (username.val() == '') {
                    username.parents('.form-group').addClass('has-error');
                    $('.modal .alert-danger').show().text('请输入姓名');
                } else if (phone.val() == '' || !reqPhone.test(phone.val())) {
                    phone.parents('.form-group').addClass('has-error');
                    $('.modal .alert-danger').show().text('请输入正确的手机号码');
                } else if (type==1&&province.val() == '省份' ) {
                    province.parents('.form-group').addClass('has-error');
                    $('.modal .alert-danger').show().text('请选择省份');
                }else if (demio.val() == '-1') {
                    demio.parents('.form-group').addClass('has-error');
                    $('.modal .alert-danger').show().text('请选择车系');
                } else if ( type!=1 && vehicle_model.val() == '-1') {
                    vehicle_model.parents('.form-group').addClass('has-error');
                    $('.modal .alert-danger').show().text('请选择车型');
                } else {

                    function GetQueryString(name)
                    {
                        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                        var r = window.location.search.substr(1).match(reg);
                        if(r!=null)return  unescape(r[2]); return null;
                    }

                    var dealerId=GetQueryString("dealerId");
                    var sericeData=self.seriseArr[demio.val()];
                    var typeData= self.typeArr[vehicle_model.val()];
                    var urlJson={"tda_dealer":dealerId,"user_name":username.val(),"user_mobile":phone.val(),"leads_type":type,"conf_package":typeData}
                    urlJson.tda_model =sericeData;
                    if(type==1){
                        urlJson.purchase_date=$('#drive-time').val();
                        urlJson.purchase_budget=$('#drive-money').val();

                    }
                    $.post('/index.php?option=com_dealer&task=sendDDMS',urlJson,function(data){
                        var data=JSON.parse(data)
                        if(data.code==0){
                            alert("提交成功");
                            var demioText = parent.find("#demio option:selected").text();
                            var modelText = parent.find("#vehicle-model option:selected").text();
                            var msg = self.getPhoneMessage(type,username.val(),demioText,modelText);
                            self.sendSms(phone.val(),msg);
                        }else{
                            alert(data.message);
                        }
                        $('.close').trigger('click')
                    })
                }
                window.setTimeout(function(){
                    $('.form-group').removeClass('has-error');
                    $('.modal .alert-danger').hide()
                },5000)
            });

        }
    },
    sendAddress:function(){
        var self= this;
        $('#sendToEmail').click(function(){
            var phone=$('#sendAddressPhone');
            var addr=$('#this-dealer-addr');
            var dealername = $('#this-dealer-name');
            var dealertel = $('#this-dealer-tel');
            //alert(addr.html());return false;
            if(phone.val()==''|| !self.reqPhone.test(phone.val())){
                alert('请输入正确的手机号码')
            }else{
            	var msg = encodeURIComponent('您好，您索取的'+dealername.html()+'的联系电话：'+dealertel.html()+'，地址：'+addr.html()+'，感谢您的支持,谢谢！');
            	self.sendSms(phone.val(), msg);
            	alert('您的查询信息已发出，请查收！');
				$('#sendAddressPhone').val('');
            }
            window.setTimeout(function(){
                phone.val('')
            },1000)
        })
    },
    sendSms:function(phone,msg){
    	
		$.ajax({
			type: "POST",
			url: "/index.php?option=com_dealer&task=sendSms",
			data: "phone="+phone+'&msg='+msg,
			success: function(msg){
				return msg;
			}
		});
    },
    toDDMS:function(data,successMsg){
		$.ajax({
			type: "POST",
			url: "http://ddms-beta.baicmotorsales.com/?r=leads/save",
			data: data,
			success: function(msg){
				return msg;
			}
		});
    },
    getPhoneMessage:function(type,username,seriesname,cartypename){
    	if(type==1){
    		var msg = encodeURIComponent('尊敬的'+username+'您好，申请预约试驾'+seriesname+'车系的信息已收到，我们的专员会尽快与您联系！请保持手机畅通。');
    	}else if(type==4){
    		var msg = encodeURIComponent('尊敬的'+username+'您好，询问'+seriesname+'车系'+cartypename+'车型最新报价的信息已收到，我们的专员会尽快与您联系！请保持手机畅通。');
    	}else{
    		var msg = '';
    	}
    	return msg;
    }
}

$(function () {
    var dealer= new Dealer()
})