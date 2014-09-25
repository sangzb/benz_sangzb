/* ------------------------------------
  script to animate jpg or any other image type from separate image files

	(c) eightize 2006-2013
	modified:

	Jan 7 2013		by:mb	v2.1
		Added check for array to avoid clobbering by re-defining if script 
		runs twice on a page.
	June 18 2013	by:mb	v2.1
		changed calculation of position, and put crossfade image adjacent to its
		main image to capture style on that image.
		added option to set zero border and margin on crossfade image, and calculate
		position based on images calculated style properties.
		//TODO: ie makes me crazy: the units aren't normalized to px, so I've
		got a hacky conversion of 16px=1em. Relating to body text-size may be
		a little better, but it's still not there.
	May 15 2013	by:mb	v2.0
		added options for fade between images, and max number of iterations,
		changed to use id instead of name.
	June 10 2007	by: mb
		changed preload to array, so not constantly re-loading from server
	July 15 2006
	------------------------------------
	To setup animations, add a script to the end of the page calling setupAnim()
		All images must have different ids, otherwise they will not animate
			(set by id='imageName' in the <img> tag) 
		Pass this information for each animation:
			setupAnim(seconds between images,id of image,Array(list of images))
*/
// initialise variables for animation
var maxSpd = 50; // minimum time between frames (milliseconds)
var maxFade = 15; // max number of frames for fade
var backImgSuffx = "_b"; // suffix used on background (preload) image name
var pauseButtonPaused = "paused"; // class added to pause button

// set forceImgSize to true to add the border and padding from the image
// to the cross-fade image, as well as set cross-fade image width based on
// calculated image width.
// This adds a bit of overhead to the script, so try with 'false' first.
var forceImgSize = false;

var defFS = getCStyle(document.body).fontSize; // ** this is used to convert em to px in explorer, but I need to update to calculate this for each image **

// uses animImages to check if script has already run, so arrays don't get clobbered
if(!window.animImages){
	var animImages = new Array();
	var thisImg = new Array();
	var imgCt = new Array();
	var imgSpd = new Array();
	var preImage = new Array();
	var imgFade = new Array();
	var imgRepeat = new Array();
	var thisImgTimeout = new Array();
}
//  pass (speed in seconds between frames,name of image to animate,Array(list of images))
//	note: the current image coded into the page is added by the script to
//		the list of images, so don't include that image in the array.
var beforefx,endfx=undefined;
function setupAnim(imgSpeed,imgName,imgList,imgFadePct,imgRept,beforefx,efx) {
if(document.images && document.images[imgName]){
	endfx=efx;
	imgFadePct = imgFadePct || 0;
	// force zero fade if not between 0 to 1
	imgFade[imgName] = new Object();
	imgFade[imgName].fade=(imgFadePct>1 || imgFadePct<0)?0:imgFadePct;
	imgRepeat[imgName] = imgRept || 0;
	animImages[imgName] = imgList;
	// add image from page to front of array
	animImages[imgName].unshift(document.images[imgName].src);
	imgCt[imgName] = animImages[imgName].length;
	thisImg[imgName] = 1;
	imgSpd[imgName] = imgSpeed;
	preImage[imgName] = new Array();
	preImage[imgName][1] = new Image;
	preImage[imgName][1].src = animImages[imgName][1];
	if (imgFade[imgName].fade > 0) setupFade(imgName);
	thisImgTimeout[imgName] = setTimeout("rotate('"+imgName+"')", imgSpeed * 1000 * (1-imgFade[imgName].fade));
}}

function rotate(imgName) {
	if (document.images) {
		var curImg = thisImg[imgName];
		var imgSpeed = maxSpd*2; // default timeout for non-loaded image
		var totIntvl = (1-imgFade[imgName].fade); // ratio of imgSpeed for next timout
		if (preImage[imgName][curImg].complete) {
			// if doFade returns false, the preload image is fading in
			if (doFade(imgName, totIntvl)) {
				// change image
				document.images[imgName].src=preImage[imgName][curImg].src;
				// set timeout speed
				imgSpeed = imgSpd[imgName]*1000 * totIntvl;
				// preload next image
				var nxtImg = ++thisImg[imgName];
				// limit number of repeats
				if (nxtImg >= imgCt[imgName]) {
					if (imgRepeat[imgName]!=1) {
					imgRepeat[imgName] -= (imgRepeat[imgName]>1)?1:0;
					nxtImg = thisImg[imgName] = 0;
					}else{
					imgSpeed = 0; // finish
					}
				}
				// reset transparency of fading image
				if (imgFade[imgName].fade)
					opacity(document.images[imgName+backImgSuffx], 0);
				if (!preImage[imgName][nxtImg] && imgSpeed)
					preLoadImg(imgName,nxtImg);
			}
		}
		if (imgSpeed){
			thisImgTimeout[imgName] = setTimeout("rotate('"+imgName+"')", imgSpeed);
		}else{
			if(endfx){
				endfx();
			}
		}
	  		
  	}
}

function setupFade(imgName) {
	if (document.images) {
		var imgNode = document.images[imgName];
		var imgHolder = imgNode.parentNode;
		// create a preload image in front of the image
		var preImage = new Image;
		preImage.style.cssText=imgNode.style.cssText;
		if (forceImgSize) { // force no border or padding when offsetting with position
			preImage.style.borderWidth="0px";
			preImage.style.padding="0px";
		}
		preImage.id = preImage.name = imgName+backImgSuffx;
		preImage.className = imgNode.className;
		preImage.style.position="absolute";
		opacity(preImage, 0);
		var z=getCStyle(imgNode);
		if (z.zIndex!="auto")
			preImage.style.zIndex = z.zIndex*1+1;
		imgHolder.insertBefore(preImage,imgNode);
		setPrePos(imgName);
		// this only catches resize events. Other changes to layout need
		// to manually call setPrePos() 
		addResizeEvent(function() {setPrePos(imgName);});
		// set fade increment
		// need to add ratio of fade percentage based on the maximum speed, and frames per fade
		// this may result in fewer than maxFade steps, so need to figure out fade steps
		imgFade[imgName].steps = Math.min(maxFade, imgFade[imgName].fade / maxSpd * imgSpd[imgName] * 1000)
	}
}

// Main fading loop
function doFade(imgName, toIvl) {
	if (imgFade[imgName].steps) {
		var preNode = document.images[imgName+backImgSuffx];
		var preS = preNode.style;
		// set foreground image to preloaded image
		if (!(preS.opacity*1))
			preNode.src = preImage[imgName][thisImg[imgName]].src;
		// percentage of overall interval for this fade step
		toIvl = imgFade[imgName].fade/imgFade[imgName].steps;
		// .opacity lower value is more transparent. *1 to force to number.
		opacity(preNode, preS.opacity*1 + 1/imgFade[imgName].steps);
		// if transparency is one, then pre-image
		return (preS.opacity >= 1);
	}else{
		return true;
	}
}

function preLoadImg(imgName,nxtImg) {
	preImage[imgName][nxtImg] = new Image;
	preImage[imgName][nxtImg].src = animImages[imgName][nxtImg];
}

function opacity(oNode, opVal) {
	oNode.style.opacity = opVal;
	// for ie (clobbers all filters on this object, though)
	if (document.body.filters)
		oNode.style.filter = "alpha(opacity="+Math.round(opVal*100)+")";
}

//attempt to keep the preload image in front of the current image
// * call this function if javascript changes the page layout *
function setPrePos(imgName) {
	var preImgS = document.getElementById(imgName+backImgSuffx);
	if (preImgS) {
		preImgS = preImgS.style;
		var obj = document.getElementById(imgName);
		var o = obj;
		var l=o.offsetLeft;
		var t=o.offsetTop;
		var objS = getCStyle(o);
		if (forceImgSize) { // add border and padding of image
			var ll = pxUnits(objS.borderLeftWidth) + pxUnits(objS.paddingLeft);
			var tt =  pxUnits(objS.borderTopWidth) + pxUnits(objS.paddingTop);
			l += ll;
			t += tt;
			preImgS.width= (/px/.test(objS.width)) ? objS.width : (obj.offsetWidth- 2*ll +"px");
			preImgS.height=(/px/.test(objS.height)) ? objS.height : (obj.offsetHeight- 2*tt +"px");
		}
		while ((o = o.offsetParent) && (getCStyle(o).position == "static")) {
			l += o.offsetLeft;
			t += o.offsetTop;
		//  ** need to grab borders and padding of static parent objects for ie **
		//	[l,t] = addPBw(o,l,t);
			objS = getCStyle(o);
			l += pxUnits(objS.borderLeftWidth) + pxUnits(objS.paddingLeft);
			t +=  pxUnits(objS.borderTopWidth) + pxUnits(objS.paddingTop);
		}
		preImgS.left=Math.round(l)+"px";
		preImgS.top=Math.round(t)+"px";
	}
}

/*/ add padding and border width
function addPBw(o,l,t) {
	var objS = getCStyle(o);
	l += pxUnits(objS.borderLeftWidth) + pxUnits(objS.paddingLeft);
	t +=  pxUnits(objS.borderTopWidth) + pxUnits(objS.paddingTop);
	return [l,t]
}*/

// function to move to next image
function animFwd(imgName) {
	var tOut = thisImgTimeout[imgName];
	if (tOut) clearTimeout(thisImgTimeout[imgName]);
	// kludge. set opacity of preload to 1 to skip fade
	if (imgFade[imgName].fade)
		document.images[imgName+backImgSuffx].style.opacity = 1;
	rotate(imgName);
	if (!tOut) cto(imgName);
	return false;
}

// function to step back an image
function animBack(imgName) {
	var tOut = thisImgTimeout[imgName];
	if (tOut) clearTimeout(thisImgTimeout[imgName]);
	var nxtImg = thisImg[imgName]-2 + ((thisImg[imgName]<2)?imgCt[imgName]:0);
	thisImg[imgName] = nxtImg;
	if (!preImage[imgName][nxtImg])
		preLoadImg(imgName,nxtImg);
	// kludge. set opacity of preload to 1 to skip fade
	if (imgFade[imgName].fade)
		document.images[imgName+backImgSuffx].style.opacity = 1;
	rotate(imgName);
	if (!tOut) cto(imgName);
	return false;
}

// function to pause/restart the animation
function animPause(imgName,a) {
	var tOut = thisImgTimeout[imgName];
	if (tOut) { // pause
		cto(imgName);
	}else{ // restart
		rotate(imgName);
	}
	var y=new RegExp(" *"+pauseButtonPaused, "gi");
	if (a.className.match(y)) { // paused already
		a.className = a.className.replace(y,"");
	}else{
		// reset transparency of fading image
		if (imgFade[imgName].fade)
			opacity(document.images[imgName+backImgSuffx],0);
		a.className += " "+pauseButtonPaused;
	}
	return false;
}

// clear timeout and remove saved reference
function cto(imgName) {
	clearTimeout(thisImgTimeout[imgName]);
	delete thisImgTimeout[imgName];
}

//add onresize event handler
function addResizeEvent(func) {
  var oldonresize = window.onresize;
  if (typeof window.onload != 'function') {
    window.onresize = func;
  } else {
    window.onresize = function() {
      if (oldonresize) {
        oldonresize();
      }
      func();
    }
  }
}
// Get computed styles for an element. Returns array
function getCStyle(oNode) {
	var cStyle;
	if (typeof oNode.currentStyle != 'undefined') {
		cStyle = oNode.currentStyle;
	}else{
		cStyle = document.defaultView.getComputedStyle(oNode, null);
	}
 return cStyle;
}

// deal with non-normalized units. a is a string with possible units
// very rudimentary (fails on %, and inaccurate for em)
function pxUnits(a){
	var re = /[\d\.]+/g;
	var aV = a.match(re);
	var aU = a.replace(re,'');
	switch (aU) {
	 case "em":
		aV = aV * defFS.replace(re,'');
		break;
	 case "%":
	 	aV = aV / 100 * defFS.replace(re,'');
	 	break;
	 default:
	 	aV = aV*1; // convert to value
	}
	return aV;
}
