$(function(){
	
	var $playGround = $('#play-ground');
	var $result = $('#play-ground .result');
    var $inputQuestion = $('.input-panel .question');
    var $inputAnswer = $('.input-panel .answer');
    var resultItem = '<div class="result-item"></div>';
	var inputLineDom = '<div class="line input-line"></div>';
	var questionLineDom = '<div class="line question-line"></div>';
	var coolTagDom = '<div class="cool-tag"></div>';

	var inputLineText = '';
	var inputLineHtml = '';
	var questionStr = '';
	var lineStartTime = 0;
	var totalTime = 0;

    var charMap = {
        '33': '!',
        '34': '"',
        '35': '#',
        '36': '$',
        '37': '%',
        '38': '&',
        '39': '\'',
        '40': '(',
        '41': ')',
        '42': '*',
        '43': '+',
        '44': ',',
        '45': '-',
        '46': '.',
        '47': '/',
        '48': '0',
        '49': '1',
        '50': '2',
        '51': '3',
        '52': '4',
        '53': '5',
        '54': '6',
        '55': '7',
        '56': '8',
        '57': '9',
        '58': ':',
        '59': ';',
        '60': '<',
        '61': '=',
        '62': '>',
        '63': '?',
        '64': '@',
        '94': '^',
        '95': '_',
        '96': '`',
        '123': '{',
        '124': '|',
        '125': '}',
        '126': '~'
    };

	$('body').on('keypress', function(event){
		var which = event.which; 
		if (charMap[which]){
			if (inputLineText == ''){
				lineStartTime = (new Date()).getTime();
			}
			var charIn = charMap[which];
			inputLineText = inputLineText + charIn;	
			inputLineHtml = inputLineHtml + makeUpChar(charIn);	

			var $resultItemLast = $('.result-item:last');
			var $inputLineLast = $resultItemLast.find('.input-line');
			$inputLineLast.html(inputLineHtml);
            $inputAnswer.html(inputLineHtml);
		} else if (which == 13 || which == 32){
			if (inputLineText != ''){
				totalTime += (new Date()).getTime() - lineStartTime;	
			}
			var $resultItemLast = $('.result-item:last');
			var $inputLineLast = $resultItemLast.find('.input-line');

			if (questionStr == inputLineText){
				var $coolTagDom = $(coolTagDom);
				$coolTagDom.appendTo($inputLineLast)
					.css({'right':100,opacity: 0})
					.animate({'right':0,opacity: 1},200)
					.animate({opacity: 0.6},1000);
			}
			inputLineText = '';
			inputLineHtml = '';
			questionStr = ''; 
            for (var i=0 ; i < 16 ; i ++ ){
                questionStr += charMap[33 + Math.round(Math.random() * 31)];
            }

            $inputAnswer.html('');
            var $resultItem = $(resultItem);
            $resultItem.appendTo($result);
			$(questionLineDom).text(questionStr).appendTo($resultItem);
			$(inputLineDom).appendTo($resultItem);
            $inputQuestion.text(questionStr);
            $result.scrollTop(999999999999);
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
