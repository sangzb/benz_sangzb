/**
 * Copyright (C) 2011 Hakim El Hattab, http://hakim.se
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * This script adjusts the perspective of a CSS 3D transformed
 * box based on device orientation and motion. The box itself, 
 * including wall sizes, positions and rotation, is defined 
 * entirely in the main.css file and it's only the perspective 
 * that is changed via JavaScript.
 * 
 * Thanks to Nassim Benghmiss for adding orientation support.
 * 
 * @author Hakim El Hattab (http://hakim.se)
 * @version 0.1
 */
var Holobox = (function(){
	
	var world = document.getElementById('world'),
		back = document.getElementById('back'),
		front = document.getElementById('front'),
		//wallLeft = document.getElementById('wall-left'),
		//wallRight = document.getElementById('wall-right'),
		//wallTop = document.getElementById('wall-top'),
		//wallBottom = document.getElementById('wall-bottom'),
		
		orientation = 0,
		perspective = {
			cx: 50, // current x
			cy: 50, // current y
			tx: 50, // target x
			ty: 50  // target y
		},
		window_focus=1,
		pc_disconnect = false;
		
	function initialize() {
		// Capture mouse movement for PC's
		addEventListener( 'mousemove', onMouseMove, false);
		
		addEventListener( 'orientationchange', onOrientationChange, false );
		addEventListener( 'devicemotion', onMotionChange, false );
		addEventListener("pc disconnect", function(data) {
			detail=(data.detail===undefined)?1:data.detail;
			pc_disconnect=(detail==1)?true:false;
		});
		addEventListener("mobile windowfocus", function(data) {
			window_focus=data.detail;
		});
		updateOrientation();
		update();
	}
	
	function onMouseMove( event ) {
		perspective.tx = Math.round( ( event.clientX / window.innerWidth ) * 100 );
		perspective.ty = Math.round( ( event.clientY / window.innerHeight ) * 100 );
		//Burn:PC test
		sendMovement(perspective);
	};
	function sendMovement(data){
		if(pc_disconnect || window_focus==0)
			return;
		data.roomid=roomid;
		socket.emit("update movement",data);
	}
	function onOrientationChange( event ) {
		updateOrientation();
		
		event.preventDefault();
	}
	
	function onMotionChange( event ) {
		var beta = orientation === 1 ? -event.accelerationIncludingGravity.z : -event.accelerationIncludingGravity.z;
		var gamma = orientation === 1 ? -event.accelerationIncludingGravity.y : -event.accelerationIncludingGravity.x;
		
		perspective.tx = ( ( gamma / 5 ) + 0.5 ) * 100;
		perspective.ty = ( ( beta / 5 ) - 0.5 ) * 100;
		
		//Burn:PC test
		sendMovement(perspective);
		
		event.preventDefault();
	}
	
	function updateOrientation() {
		// Check if we're in portrait or landscape mode as we'll need
		// to use different values from the accelerometer
		if( window.orientation == 90 || window.orientation == -90 ) {
			orientation = 1;
		} else {
			orientation = 0;
		}
	}
	var IOS=true;
	if(navigator.appVersion.toLowerCase().indexOf("android")>0){
		IOS=false;
	}
	//$("#room").style.WebkitTransform="rotateX(30deg)"
	function update() {
		// Interpolate towards the target perspective
		perspective.cx += ( perspective.tx - perspective.cx ) * 0.1;
		perspective.cy += ( perspective.ty - perspective.cy ) * 0.1;
		
		// Apply the current perspective
		//world.style.webkitPerspectiveOrigin = perspective.cx + '% ' + perspective.cy + '%';
		//world.style.perspectiveOrigin = perspective.cx + '% ' + perspective.cy + '%';
		//world.style.WebkitTransform="rotateX(90deg)"
		if(IOS){
			back.style.WebkitTransform="translateZ(30px) rotateX("+((perspective.cy-50)*0.3)+"deg) rotateY("+(perspective.cx-50)*0.3+"deg)"
		}else{
			back.style.WebkitTransform="translateZ(30px) rotateX("+(((perspective.cy-50)*0.5)+120)+"deg) rotateY("+(perspective.cx-50)*0.5+"deg)"
		}
		
		// Used to control z-indices of our elements, first item == bottom
		//var stack = [ back, wallLeft, wallRight, wallTop, wallBottom ];
		var stack = [ back ];
		// If we're looking in from the left, make sure the left wall is
		// positioned above all other elements
		if( perspective.cx < 25 ) {
			//stack.push( wallLeft );
		}
		// ... on the other hand, if we're looking at the box from the 
		// right side, make sure the right wall has the highest z-index
		else if( perspective.cx > 75 ) {
			//stack.push( wallRight );
		}
		
		// No matter what order, the front-facing cover of the box should
		// always be placed on top
		//stack.push( front );
		
		for( var i = 0, len = stack.length; i < len; i ++ ) {
			stack[i].style.zIndex = i;
		}
		
		// Rinse, repeat, use 100 ms
		setTimeout( update, 1000 / 10 );
	}
	

	// Initialize the program. Done right before returning to ensure
	// that any inline variable definitions are available to all
	// functions 
	initialize();
	
})();