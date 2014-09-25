var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var device = require('express-device');
var MobileDetect = require('mobile-detect'); 
var swig = require('swig');
var fileSystem = require('fs');

var sioserverIP=process.argv[2];
if(process.env.NODE_ENV === 'production')
{
	sioserverIP="c-class.mymb.com.cn";
}
else
{
	if(sioserverIP===undefined)
	{
		var os=require('os');
		var ifaces=os.networkInterfaces();	
		for (var dev in ifaces) {
		  var alias=0;
		  ifaces[dev].forEach(function(details){
			if (details.family=='IPv4' && (dev=="本地连接" ||dev=="en0" || dev=="无线网络连接")) {
			  sioserverIP=details.address;		  
			  ++alias;
			}
		  });
		}
	}	
}

// 这个等burn来优化...
if (sioserverIP===undefined) {
	sioserverIP = '58.211.23.194';
}

console.log("current socket server IP:"+sioserverIP);

/*
//mongodb init
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/benz_c-class');
var db = mongoose.connection;
var leadsSchema = mongoose.Schema({
    	name: String,
    	mobile: String,
    	province: Number,
    	city:Number,
    	sex:Number,
    	created:Date
	});
var leadsModel = db.model('Leads',leadsSchema);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {  
  console.log("#### mongodb connected ####");
});
*/


var cache = require('memory-cache');

var app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(device.capture());

//product use CDN
var img_path="";
var main_url="Main.swf";
var main_simple_url="Main_simple.swf";
var config_xml="xml/config.xml";
var ios_adaptor="deviceadaptor";
var android_adaptor="deviceadaptor2";
if (process.env.NODE_ENV === 'production') {
	img_path="http://st.mymb.com.cn/";
	//img_path="http://58.211.23.194/";
	main_url=img_path+main_url;
	config_xml=img_path+"xml/config_product.xml";
	// when in production use cache instead
	app.set('view cache', true);
	swig.setDefaults({ cache: "memory" });
}
else
{
	app.set('view cache', false);
	swig.setDefaults({ cache: false });	
}
console.log("img_path:"+img_path);
// Routing from static file
var oneDay = 86400000;
app.use(express.static(__dirname + '/public',{ maxAge: oneDay }));



// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

app.get('/pc_view', function (req, res) {	
	//if(req.device.type!="phone" && req.device.type!="tablet")
	md = new MobileDetect(req.headers['user-agent']);    
    if(!md.mobile())
	{
		res.render('pc_view', {
		  room: {sioIP:sioserverIP,
		  sioPort:app.get("port"),
	      roomid: randomRoomID()}    
	    });	
	}
	else
	{		
		res.render('product',{  
	      "img_path":img_path
	    });	
	}
});
app.get('', final_view);
app.get('/', final_view);
app.get('/index.html', final_view);
app.get('/flash_view', default_view);

function default_view(req, res) {		
    //if(req.device.type!="phone")    
    md = new MobileDetect(req.headers['user-agent']);    
    if(!md.mobile())
	{
		res.render('flash_view', {
		  room: {sioIP:sioserverIP,
		  sioPort:app.get("port"),
	      roomid: randomRoomID()},
	      "img_path":img_path,
	      "main_url":main_url,
	      "config_xml":config_xml
	    });
	}
	else
	{
		device_adaptor=android_adaptor;
		if(md.os()=="iOS")
		{
			device_adaptor=ios_adaptor;
		}
		/*
		res.render('product',{  
	      "img_path":img_path,
	      "device_adaptor":device_adaptor
	    });*/
	    res.render('product_android',{  
	      "img_path":img_path,
	      "device_adaptor":device_adaptor	      
	    });			
	}
}

//C-Class launch site
app.get('/final', final_view);
app.get('/final_mobile', function (req, res) {  
	res.render('mobile_animate',{  
	      "img_path":img_path,
	      "device_adaptor":ios_adaptor	      
	    });	
});

function final_view(req, res) {		
    //if(req.device.type!="phone")    
    md = new MobileDetect(req.headers['user-agent']);    
    if(!md.mobile() || md.tablet())
	{
		res.render('final-full',{  
	      "img_path":img_path
	    });	
	}
	else
	{
		device_adaptor=android_adaptor;
		if(md.os()=="iOS")
		{
			device_adaptor=ios_adaptor;
		}
	    res.render('mobile_animate',{  
	      "img_path":img_path,
	      "device_adaptor":device_adaptor	      
	    });			
	}
}


app.get('/android', function (req, res) {  
	res.render('product_android',{  
	      "img_path":img_path
	    });	
});

app.get('/simple', function (req, res) {  
	res.render('simple_flash_view',{
		  room: {sioIP:sioserverIP,
		  sioPort:app.get("port"),
	      roomid: randomRoomID()},
	      "img_path":img_path,
	      "main_simple_url":main_simple_url,
	      "config_xml":config_xml
	    });
});

app.get('/interaction', function (req, res) {  
	res.render('simple_flash_view',{
		  room: {sioIP:sioserverIP,
		  sioPort:app.get("port"),
	      roomid: randomRoomID()},
	      "img_path":img_path,
	      "main_simple_url":main_simple_url,
	      "config_xml":config_xml
	    });
});

app.get('/simple_mobile_view', function (req, res) {  
	md = new MobileDetect(req.headers['user-agent']);
	device_adaptor=android_adaptor;
	if(md.os()=="iOS")
	{
		device_adaptor=ios_adaptor;
	}
	res.render('simple_mobile_view', {
      room: {sioIP:sioserverIP,
	  sioPort:app.get("port"),
      roomid: req.param("roomid")},
      "img_path":img_path,
       "device_adaptor":device_adaptor  
    });
});

app.get('/game', function (req, res) {  
	res.render('game',{  
	      "img_path":img_path
	    });	
});

app.get('/cluster', function (req, res) {  
	res.send("ProcessID"+process.pid);	
});

app.get('/mobile_view', function (req, res) {
	md = new MobileDetect(req.headers['user-agent']);
	device_adaptor=android_adaptor;
	if(md.os()=="iOS")
	{
		device_adaptor=ios_adaptor;
	}
	res.render('mobile_view', {
      room: {sioIP:sioserverIP,
	  sioPort:app.get("port"),
      roomid: req.param("roomid")},
      "img_path":img_path,
       "device_adaptor":device_adaptor  
    });
});

//文件下载的安全性尚待确认，Almond待确认
app.get('/dd', function (req,res){
	var filename=req.param("fn");
	//if(!(/^[a-zA-Z0-9]\w*\.(gif|jpg|jpeg|tiff|png)$/i).test(filename))
	if(!(/^(?!^(PRN|AUX|CLOCK\$|NUL|CON|COM\d|LPT\d|\..*)(\..+)?$)[^\x00-\x1f\\?*:\";|/]+\.(gif|jpg|jpeg|tiff|png)$/i).test(filename))
	{
		res.send(filename+' not found!');
		return;		
	}
	var escapedName = filename.replace(/"/g, '\"');
	var asciiName = escapedName.replace(/[^\x20-\x7E]/g, "?");
	var filePath = path.join(__dirname, 'public/images/Download/'+asciiName);
	/*
	var stat = fileSystem.statSync(filePath);
	var encodedName = encodeURIComponent(escapedName);
	res.setHeader('Content-Type', 'application/force-download');
	res.setHeader('Content-Length',  stat.size);
  	res.setHeader('Content-Disposition', "attachment; filename=\""+ asciiName + "\"; filename*=UTF-8''" + encodedName);
  	
  	var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);*/
    // using async method to ge file content
    var stat = fileSystem.stat(filePath,function(err,stats){    		
    		if(err!=null)
    		{    			
    			console.log(err); 
    			res.send(filename+' not found!');
    			return;
    		}
	    	var encodedName = encodeURIComponent(escapedName);
			res.setHeader('Content-Type', 'application/force-download');
			res.setHeader('Content-Length',  stats.size);
		  	res.setHeader('Content-Disposition', "attachment; filename=\""+ asciiName + "\"; filename*=UTF-8''" + encodedName);
		  	
		  	var readStream = fileSystem.createReadStream(filePath);
		    // We replaced all the event handlers with a simple call to readStream.pipe()
		    readStream.pipe(res);
	    }
    	);
    }
);

/*
app.post('/form_endpoint',function (req, res) {
	var leadsEntity = new leadsModel({
		name:req.body.uname,
		mobile:req.body.mobile,
		province:req.body.province,
		city:req.body.city,
		sex:req.body.sex,
		created:Date.now()
	});
  	leadsEntity.save(function (err) {
	  if (err) // ...
	  console.log('mongo db save err',err);
	});
	res.send("--"+req.param("uname")+req.param("mobile")+"leads submit");
});
*/

//add 404 page support
app.use(function(req, res, next){

	res.status(404);

  // respond with html page
  if (req.accepts('html')) {  	  	
    res.render('404', { url: req.url,errorMsg:" not found!"});    
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

function randomRoomID(){
	baseID=Date.now()*1000;
	roomID=baseID+randomInt(1,1000);
	cache.put(roomID,1);		
	return roomID;
}
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
/*
// view engine setup

app.use(logger('dev'));


/// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

module.exports = app;
