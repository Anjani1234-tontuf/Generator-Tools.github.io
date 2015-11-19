
		var headingChanged = false;
		var randomFontObject;
		var randomFontObject2;
		$(document).ready(function(){
			randomizeAllFonts();

			$('#sidebar').height($(window).height());

			// document.getElementById("heading").addEventListener("input", function() {
			//     var value = document.getElementById("heading").value;
			//     document.getElementById("heading").innerHtml = value;
			//     headingChanged = true;
			// }, false);
		});

		function randomizeAllFonts(){
			loadFont(true, true);
		}

		function loadFont(heading, paragraph, variantChangeClicked){

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

		function randomizeFontVariant(element) {
			if (element == heading) {
				var fontVariantsQuantity = randomFontObject.variants.length;
				var fontVariantsArray = randomFontObject.variants;
				var randomVariant = fontVariantsArray[Math.floor(Math.random() * fontVariantsQuantity)];
				$('#heading').css('font-weight', randomVariant);
				alert(randomVariant);	
			}
			else {
				var fontVariants = randomFontObject2.variants.length;
			}
			
		}

		function randomizeHeading(fontObject){
			var fontName = fontObject.family;
			fontNameForUrl = fontName.replace(/\s+/g, '+');
		    WebFont.load({
	            google: { 
	                   families: [fontNameForUrl] 
	                } 
			 }); 

			$('#heading').css({'font-family': fontName , opacity:1 });
			$('#headingFontInfo').html('<a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl +'">' + fontName + '</a>');

			var fontVariants = '';
			for (var i = 0; i < fontObject.variants.length; i++) {
				fontVariants += '<span onclick="useThisFontVariant(this, \'heading\');">' + fontObject.variants[i] + '</span>';
			}
			$('#headingFontVariants').html(fontVariants);
		}

		function randomizeParagraph(fontObject2){
			fontName2 = fontObject2.family;
			fontNameForUrl2 = fontName2.replace(/\s+/g, '+');
  		    WebFont.load({
                google: { 
                     families: [fontNameForUrl2] 
                 } 
		     }); 

			$('#paragraph').css({'font-family': fontName2 , opacity: 1 });
			$('#paragraphFontInfo').html('<a target="_blank" href="https://www.google.com/fonts/specimen/'+ fontNameForUrl2 +'">' + fontName2 + '</a>');

			var fontVariants = '';
			for (var i = 0; i < fontObject2.variants.length; i++) {
				fontVariants += '<span onclick="useThisFontVariant(this, \'paragraph\');">' + fontObject2.variants[i] + '</span>';
			}
			$('#paragraphFontVariants').html(fontVariants);
		}

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
					$('#paragraph').css({'font-weight': variantName, 'font-style':'normal'});	
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
						$('#paragraph').css({'font-weight': 400, 'font-style':'normal'});
					}
					if (variantName == 'italic') {
						$('#paragraph').css({'font-style': 'italic', 'font-weight': 400});
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
					$('#paragraph').css({'font-style': 'italic', 'font-weight': weight});
				}
			}

		}
			

