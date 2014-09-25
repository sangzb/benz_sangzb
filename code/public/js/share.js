var ISWP = !!(navigator.userAgent.match(/Windows\sPhone/i));
        var sw = 0;

        if (ISWP){
            var profile = document.getElementById('post-user');
            if (profile){
                profile.setAttribute("href", "weixin://profile/gh_504818f3570e");
            }
        }
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
      
        var weichat;
        (function(){

        function onBridgeReady() {
                var appId  = '',
                imgUrl = "http://special.mercedes-benz.com.cn/NewC-Class/images/share.jpg",
                link = "http://special.mercedes-benz.com.cn/NewC-Class/?token=1";
                title  = htmlDecode("全新梅赛德斯-奔驰长轴距C级车 驾驭改变 "),
                desc   = htmlDecode("改变，灵动设计的创新者。驾驭，科技先锋的领跑者。全新梅赛德斯-奔驰长轴距C级车，革新上市！颠覆您的想象，邀您置身于超凡魅力的三维世界。"),
                fakeid = "";
                desc   = desc || link;  
                
            // 发送给好友; 
            setTimeout(function(){
                if(typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined')
                	return;
                    
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
                    }, function(res){report(link, fakeid, scene);
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
