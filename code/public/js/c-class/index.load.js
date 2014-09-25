$(document).ready( function() {
	var timer;	//timer for splash screen
	

	
	//calling jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		loaderVPos: '70%',
		autoClose: true,
		closeBtnText: "Let's Begin!",
		splashFunction: function() {  

		}
	}, function() {	//callback function
		$(".text").fadeIn();
	     $('.text').animate({left:'40px',duration: 3000,queue: false
		 }, function(){
			$(".text2").fadeIn();
			$(".text2").animate({top:"136px"},1000);
   		 }); 		
	});
	
});