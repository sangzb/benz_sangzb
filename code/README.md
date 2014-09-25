# Benz C-class project spec
* bin 启动文件目录(launcher)
	* 生产环境使用production, 此环境下所有静态资源均引用至cdn server
	* 开发使用www，此环境下所有静态资源均引用至本地public/目录
* package.json, decrible which node module is needed for current app, you can use  

	>your_path/code/npm install

* public/ folder, which contains all static content for this website
* view/ folder,contain all the template, we used SWIG as our default template engine,  
http://paularmstrong.github.io/swig/
* app.js,  launcher will load app.js, app.js use express as our web framework,  
http://expressjs.com/
* sioserver.js, this is socket.io server,   
http://socket.io/
* we used nodemon as startup script, nodemon.json is configuration
* 相关Server
	* node server: 58.211.23.194, domain:http://c-class.mymb.com.cn
	* cdn source server: 58.211.23.192, domain:http://st.mymb.com.cn
	* benz campaign server: 58.211.23.192, domain: http://special.mercedes-benz.com.cn
* 目前网站结构
	* 外部露出URL:http://special.mercedes-benz.com.cn/NewC-Class/,实际文件 http://special.mercedes-benz.com.cn/NewC-Class/index.html
		* 访问端如果是PC,会直接在页面iframe内引用 http://c-class.mymb.com.cn/
		* 访问端如果是Mobile,会直接转向 http://c-class.mymb.com.cn/

		> FTP地址：58.211.23.192  
		> FTP用户：NewC-Class  
		> FTP密码：ER45yu67OK

	* CDN: http://c-class.mymb.com.cn/ 的服务器上的前端页面当中的所有静态资源均引用自 http://st.mymb.com.cn/,比如[img/bg.png](http://st.mymb.com.cn/img/bg.png)
		* 所有通过git pull到node server上的静态文件都会被自动同步到cdn source server上

		> Benz  
		> 用户名：benz  
		> 密码：150U+6D8i#  
	* Flash Config 文件,包含返回地址，分享内容等 
		内网环境：public/xml/config.xml
		内网环境：public/xml/config_product.xml
***
### 2014-8-24 上线
1. 所有小杰提供的简化版swf,均引用view/ 根目录下的loader4_simple.swf,和Main_simple.swf, 不要去覆盖loader4.swf,和*Main.swf*
2. Final版本pc地址  c-class.mymb.com.cn/final.对应view/final-full.html 模板
3. Final版本mobile地址  c-class.mymb.com.cn/final_mobile,对应view/mobile.html 模板
	