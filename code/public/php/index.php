<?php
/**
 * MIT License
 * ===========
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * -----------------------------------------------------------------------
 * The demo is running all the Mobile_Detect's internal methods.
 * Here you can spot detections errors instantly.
 * -----------------------------------------------------------------------
 *
 * @author      Serban Ghita <serbanghita@gmail.com>
 * @license     MIT License https://github.com/serbanghita/Mobile-Detect/blob/master/LICENSE.txt
 *
 */

require_once './Mobile_Detect.php';
$detect = new Mobile_Detect;
if($detect->isMobile())
	header('Location: http://c-class.mymb.com.cn/');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0014)about:internet -->
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" style="height:100%"> 

<head >
        <title>全新梅赛德斯-奔驰长轴距C级车 驾驭改变</title>
        <meta name="google" value="notranslate" />         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />		
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <script src="http://st.mymb.com.cn/js/mobile-detect.min.js"></script>        
        <script>
        	var md = new MobileDetect(window.navigator.userAgent);
        	if(md.mobile())
        		window.location.href="http://c-class.mymb.com.cn/";
        	
        	function loadIframe(){			
				var inside = document.getElementById('main_f');
				inside.src="http://c-class.mymb.com.cn/";        		
        	}
        </script>
</head>
<body style="margin:0px;padding:0px;overflow:hidden" onload="loadIframe()">
    <iframe id="main_f" src="" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>
    <div style="display: none">
    	<script src="http://exp.jiankongbao.com/loadtrace.php?host_id=13168&style=1&type=0" type="text/javascript"></script>
	</div>
</body>
</html>