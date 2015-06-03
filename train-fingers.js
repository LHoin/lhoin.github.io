$(function(){
	
	var $playGround = $('#play-ground');
	var inputLineDom = '<div class="line input-line"></div>';
	var questionLineDom = '<div class="line question-line"></div>';
	var coolTagDom = '<div class="cool-tag"></div>';

	var inputLineText = '';
	var inputLineHtml = '';
	var questionStr = '';
	var lineStartTime = 0;
	var totalTime = 0;
	$('body').on('keypress', function(event){
		var which = event.which; 
		if (48 <= which && which <=57){
			if (inputLineText == ''){
				lineStartTime = (new Date()).getTime();
			}
			var num = which - 48;
			inputLineText = inputLineText + num;	
			inputLineHtml = inputLineHtml + makeUpChar(num);	

			$('.input-line:last').html(inputLineHtml);
		} else if (which == 13 || which == 32){
			if (inputLineText != ''){
				totalTime += (new Date()).getTime() - lineStartTime;	
			}
			var $inputLineLast = $('.input-line:last');
			if (questionStr == inputLineText){
				var $coolTagDom = $(coolTagDom);
				$coolTagDom.appendTo($inputLineLast)
					.css({'margin-left':-100,opacity: 0})
					.animate({'margin-left':5,opacity: 1},200);
			}
			inputLineText = '';
			inputLineHtml = '';
			questionStr = ''+ Math.round(Math.random() * 100000000000); 
			$(questionLineDom).text(questionStr).appendTo($playGround);
			$(inputLineDom).appendTo($playGround);
			updateStatus();
		}
		$playGround.scrollTop($playGround.prop("scrollHeight"));
	});

	$(window).on('resize', function(){
		resizePlayGround();
	});

	resizePlayGround();

	function updateStatus(){
		var error = $('.error-char').length;
		var right = $('.right-char').length;
		var percent = Math.round(right/(error+right)*100000)/1000+ '%';
		var speed = Math.round((right-error*1.5)*60000/totalTime) + 'c/m'; 
		var cool = $('.cool-tag').length;

		$('.status .error span').text(error);
		$('.status .right span').text(right);
		$('.status .percent span').text(percent);
		$('.status .speed span').text(speed);
		$('.status .cool span').text(cool);
	}
	
	function resizePlayGround(){
		$playGround.height($(window).height()-70);
	}

	function makeUpChar(num){
		var questionChar = questionStr[inputLineText.length-1];
		var inputChar = '' + num;
		if (inputChar != questionChar){
			return '<span class="error-char">' + inputChar + '</span>';
		}
		return '<span class="right-char">' + inputChar + '</span>';
	}
});
