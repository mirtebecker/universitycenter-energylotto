jQuery(document).ready(function() {

	var today = new Date();
	var now = today.getDate();
	var year = today.getFullYear();
	var month = today.getMonth();

	var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	// check for leap year
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
	// display day left

	var suite;
	var total = 13.43;
	var draw = false;

	$(".daysleft").text((monarr[month]-now) + " days left until next draw");

	var socket = io.connect("/", {
		"reconnect": true,
		"reconnection delay": 500,
		"max reconnection attempts": 10
	});

	socket.on("message", function(data) {
		//data = process_data(data); /* Initialize position */
		console.log(data);
		if(data == "user1"){
			suite = 804;
		}
		if(data == "user2"){
			suite = 805;
		}
		if(data == "user3"){
			suite = 806;
		}

		$(".data").empty();
		$(".tips").empty();

		swipe();
	});

	$("#swipe").click(function(){
		draw = true;
		$(".daysleft").css("display","none");
		$("#logo").animate({marginTop:'150px'});

		$("#lotto").css("display","block");
		$("#number").css("display","block");
		$("#suite").css("display","block");

		$("#swipe").text("Swipe your card to see how you did.");
	});

	$("#logo").click(function(){
		if(draw){
			$(".daysleft").css("display","block");
			$("#logo").animate({marginTop:'230px'});

			$("#lotto").css("display","none");
			$("#number").css("display","none");
			$("#suite").css("display","none");

			$("#swipe").text("Swipe your card to see how you're doing.");
			draw = false;
		}
	});

	function swipe(){
  		$("#logo").animate({marginTop:'80px'});
  		$("#swipe").animate({right:'-430px'});
		$("#swiped").css("display","inline");

		$("#lotto").css("display","none");
		$("#number").css("display","none");
		$("#suite").css("display","none");
		if(draw){
			$(".data").append('<img src="img/draw'+suite+'.png">');
		}else{
			$(".data").append('<img src="img/'+suite+'.png">');
		}
		$(".tips").append('<p class="tips">Is your number too high? <br/>Here are some tips to lower your bill amount</p> <p><img src="img/tips.png"></p>');

		setTimeout(function(){reset()},10000);
	}

	function reset(){
		if(draw){
			$("#swipe").animate({right:'40px'});
	  		$("#logo").animate({marginTop:'150px'});
			$("#swiped").css("display","none");

			$(".daysleft").css("display","none");
			$("#lotto").css("display","block");
			$("#number").css("display","block");
			$("#suite").css("display","block");
			$("#swipe").text("Swipe your card to see how you did.");
		}else{
			$("#swipe").animate({right:'40px'});
			$("#logo").animate({marginTop:'230px'});
			$("#swiped").css("display","none");
		}
	}
	
});