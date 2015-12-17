
		var headingChanged = false;
		var randomFontObject;
		var randomFontObject2;
		var refreshCount = 0;
		$(document).ready(function(){
			randomizeAllFonts();
		});

		function randomizeAllFonts(){
			loadFont(true, true);
		}

		function loadFont(heading, paragraph, variantChangeClicked){
			refreshCount++;
			$.ajax({ 
			    type: 'GET', 
			    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDdklKz1qg_GvG_9ZjLL47pOq_1TdP5oD0', 
			    //data: { get_param: 'value' }, 
			    dataType: 'jsonp',
			    success: function (data) { 				    	
			    	var fontsArray = data.items;
			    	randomFontObject = fontsArray[Math.floor(Math.random() * fontsArray.length)];
			    	randomFontObject2 = fontsArray[Math.floor(Math.random() * fontsArray.length)];
			    	// console.log(randomFontObject);
			    	// console.log(randomFontObject2);

			    	if (heading && paragraph) {
						//changeFont(randomFontIndex.family, randomFontIndex2.family);
						//$('#heading, #paragraph').css('opacity', 0);
						randomizeHeading(randomFontObject);
						randomizeParagraph(randomFontObject2);
					}
					else if (heading && !paragraph) {
						//$('#heading').css('opacity', 0);
						randomizeHeading(randomFontObject);
					}
					else if (!heading && paragraph) {
						//$('#paragraph').css('opacity', 0);
						randomizeParagraph(randomFontObject2);
					}
			    },
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
	                console.log("error");
	           } 
			});
		}


		function randomizeHeading(fontObject){
			
			var fontName = fontObject.family;
			fontNameForUrl = fontName.replace(/\s+/g, '+');
		    WebFont.load({
	            google: { 
	                   families: [fontNameForUrl] 
	                } 
			 }); 
		    var fontVariants = '';
			for (var i = 0; i < fontObject.variants.length; i++) {
				fontVariants += '<span onclick="useThisFontVariant(this, \'heading\');">' + fontObject.variants[i] + '</span>';
			}
		    $('#heading').removeClass('fadeIn');
		    if (refreshCount !=1){
		    	$('.headingInfoWrapper.current').addClass('slideDown');

				$('#headingInfo').append(
					'<div class="headingInfoWrapper infoWrapper next">'+
						'<h2>Heading</h2>'+
						'<div class="divider"></div>'+
						'<span id="headingFontInfo"><a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl +'">' + fontName + '</a></span>'+
						'<h3>Font Variants:</h3>'+
						'<span id="headingFontVariants">'+fontVariants+'</span>'+
						'<button id="randomizeHeading" class="randomizeBtn" onclick="loadFont(true, false)";><i class="fa fa-refresh"></i></button>'+
					'</div>'
					);
			    setTimeout(function(){
			    	$('.headingInfoWrapper.current').remove();
					$('.headingInfoWrapper.next').removeClass('next').addClass('current');
			    	$('#heading').css({'font-family': fontName }).addClass('fadeIn');
			    }, 500)
			}
			else {
				$('#headingFontInfo').html('<a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl +'">' + fontName + '</a>');
				$('#headingFontVariants').html(fontVariants);
				$('#heading').css({'font-family': fontName }).addClass('fadeIn');
			}
		}

		function randomizeParagraph(fontObject2){

			fontName2 = fontObject2.family;
			fontNameForUrl2 = fontName2.replace(/\s+/g, '+');
  		    WebFont.load({
                google: { 
                     families: [fontNameForUrl2] 
                 } 
		     }); 
  		    var fontVariants = '';
			for (var i = 0; i < fontObject2.variants.length; i++) {
				fontVariants += '<span onclick="useThisFontVariant(this, \'paragraph\');">' + fontObject2.variants[i] + '</span>';
			}
			$('.paragraph').removeClass('fadeIn');
			if (refreshCount != 1){
				$('.paragraphInfoWrapper.current').addClass('slideDown');
				$('#paragraphInfo').append(
					'<div class="paragraphInfoWrapper infoWrapper next">'+
						'<h2>Paragraph</h2>'+
						'<div class="divider"></div>'+
						'<span id="paragraphFontInfo"><a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl2 +'">' + fontName2 + '</a></span>'+
						'<h3>Font Variants:</h3>'+
						'<span id="paragraphFontVariants">'+fontVariants+'</span>'+
						'<button id="randomizeParagraph" class="randomizeBtn" onclick="loadFont(false, true)";><i class="fa fa-refresh"></i></button>'+
					'</div>'
					);

				setTimeout(function(){
					$('.paragraphInfoWrapper.current').remove();
					$('.paragraphInfoWrapper.next').removeClass('next').addClass('current');
					$('.paragraph').css({'font-family': fontName2 }).addClass('fadeIn');
				}, 500)
			}
			else {
				$('#paragraphFontInfo').html('<a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl2 +'">' + fontName2 + '</a>');
				$('#paragraphFontVariants').html(fontVariants);
				$('.paragraph').css({'font-family': fontName2 }).addClass('fadeIn');
			}
		}

		// function randomizeFontVariant(element) {
		// 	if (element == heading) {
		// 		var fontVariantsQuantity = randomFontObject.variants.length;
		// 		var fontVariantsArray = randomFontObject.variants;
		// 		var randomVariant = fontVariantsArray[Math.floor(Math.random() * fontVariantsQuantity)];
		// 		$('#heading').css('font-weight', randomVariant);
		// 		alert(randomVariant);	
		// 	}
		// 	else {
		// 		var fontVariants = randomFontObject2.variants.length;
		// 	}
			
		// }


		function useThisFontVariant(variantName, element){
			var variantName = $(variantName).html();
			//load new font variant
			if (element == 'heading') {
				var fontName = randomFontObject.family;
			}
			else {
				var fontName = randomFontObject2.family;
			}
			
			fontNameUrl = fontName.replace(/\s+/g, '+');
		   	WebFont.load({
	            google: { 
	                   families: [fontNameUrl+':'+variantName] 
	                } 
			 });

			//check if font variant name contains just numbers, just letters or both

			var isNumber = /^\d+$/;
			var isWord = /^\D+$/;
			//a number
			if (isNumber.test(variantName) == true) {
				if (element == 'heading') {
					$('#heading').css({'font-weight': variantName, 'font-style':'normal'});
				}
				else {
					$('.paragraph').css({'font-weight': variantName, 'font-style':'normal'});	
				}
			}
				//a word
			else if (isWord.test(variantName) == true) {
				if (element == 'heading') {
					if (variantName == 'regular') {
						$('#heading').css({'font-weight': 400, 'font-style':'normal'});
					}
					if (variantName == 'italic') {
						$('#heading').css({'font-style': 'italic', 'font-weight': 400});
					}
				}
				else {
					if (variantName == 'regular') {
						$('.paragraph').css({'font-weight': 400, 'font-style':'normal'});
					}
					if (variantName == 'italic') {
						$('.paragraph').css({'font-style': 'italic', 'font-weight': 400});
					}
				}

			}
			//number and word		
			else {

				if (element == 'heading') {
					var weight = variantName.substring(0, 3);
					$('#heading').css({'font-style': 'italic', 'font-weight': weight});
				}
				else {
					var weight = variantName.substring(0, 3);
					$('.paragraph').css({'font-style': 'italic', 'font-weight': weight});
				}
			}

		}
			

