//
var sioserver = require('socket.io')();
var cache = require('memory-cache');
sioserver.on('connection', function (socket) {

  socket.on('pc connect', function (data) {
	//roomid
	roomid=data;	
	console.log("pc connect,roomid:"+roomid+"=sid:"+socket.id+",process id:"+process.pid);
	socket.join(roomid);
	cache.put(roomid,1);		
  });
  socket.on('pc disconnect', function (data) {
	//roomid
	roomid=data;		
	socket.to(roomid).emit("pc disconnect",roomid);
	//remove roomid	
	cache.del(roomid);
	socket.leave(roomid);
	console.log("pc disconnect,roomid:"+roomid);
  });
  socket.on('pc use mouse', function (data) {
	//roomid
	roomid=data;		
	socket.to(roomid).emit("pc use mouse",roomid);
	
	//console.log("pc use mouse,roomid:"+roomid);
  });
  socket.on('pc reuse mobile', function (data) {
	//roomid
	roomid=data;		
	socket.to(roomid).emit("pc reuse mobile",roomid);	
	//console.log("pc reuse mobile,roomid:"+roomid);
  });

  socket.on('mobile connect', function (data) {
	//roomid
	roomid=data;
	if(!sessionCheck(roomid))
	{
		socket.to(roomid).emit("pc disconnect",roomid);	
	}
	socket.join(roomid);
	console.log("mobile connect,roomid:"+roomid+"=sid:"+socket.id+",process id:"+process.pid);
	socket.to(roomid).emit("room matched",data);	
  }); 
  socket.on('update movement', function (data) {    
	//roomid
	roomid=data.roomid;	
	if(!sessionCheck(roomid))
	{
		socket.to(roomid).emit("pc disconnect",roomid);	
	}
	socket.to(roomid).emit("pc update movement",data);
  });
  socket.on('mobile command', function (data) {    
	//roomid
	roomid=data.roomid;	
	if(!sessionCheck(roomid))
	{
		socket.to(roomid).emit("pc disconnect",roomid);	
	}
	if (process.env.NODE_ENV === 'development')
		console.log("mobile command detail:"+JSON.stringify(data)+"=sid:"+socket.id+",process id:"+process.pid);
	socket.to(roomid).emit("mobile command",data);
  });
  if (process.env.NODE_ENV === 'development') {
	  socket.on('mobile debug', function (data) {  	
		console.log("****- mobile debug:'"+JSON.stringify(data)+"'; -****");	
	  });   
	}
  
  socket.on('mobile blur', function () {
  	if (process.env.NODE_ENV === 'development')
    	console.log("mobile blur");
  });
  socket.on('disconnect', function () {
  	if (process.env.NODE_ENV === 'development')
    	console.log("connection lost");
  });
  function sessionCheck(roomid){
	room_exists=cache.get(roomid);
	return room_exists===undefined ?false:true;
  }
});
module.exports = sioserver;
