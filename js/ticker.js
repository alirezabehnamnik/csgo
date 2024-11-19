(function($) {
	
	function runTicker(settings) {
		if(settings.firstRun == 1){
			currentLength = settings.currentLength;
			currentItem = settings.currentItem;
			settings.firstRun = 0;
		}
		if(currentItem == settings.newsItemCounter + 1){
			currentItem = 0;
		}
		
		if(currentLength == 0) {
			if(settings.newsLinks[currentItem].length > 0) {
				$(settings.newsList).empty().append('<li><a href="'+ settings.newsLinks[currentItem] +'"></a></li>');
			}
			else {
				$(settings.newsList).empty().append('<li></li>');
			}
		}
		
		if( currentLength % 2 == 0) {
				placeHolder = settings.placeHolder1;
		}
		else {
			placeHolder = settings.placeHolder2;
		}
		
		if( currentLength <= settings.newsItems[currentItem].length + 1) {
			var tickerText = settings.newsItems[currentItem].substring(0,currentLength);
			if(settings.newsLinks[currentItem].length > 0) {
				$(settings.newsList + ' li a').text(tickerText + placeHolder);
			}
			else {
				$(settings.newsList + ' li').text(tickerText + placeHolder);
			}
			currentLength ++;
			setTimeout(function(){runTicker(settings); settings = null;},settings.tickerRate);
		}
		else {
			if(settings.newsLinks[currentItem].length > 0) {
				$(settings.newsList + ' li a').text(settings.newsItems[currentItem]);
			}
			else {
				$(settings.newsList + ' li').text(settings.newsItems[currentItem]);
			}
			currentLength = 0;
			currentItem ++;
			setTimeout(function(){runTicker(settings); settings = null;},settings.loopDelay);	
		}	
	}
	
	$.fn.extend({
		newsTicker: function(settings) {
			settings = jQuery.extend({
		 	  	newsList: "#news",
		   		tickerRate: 80,
		    	startDelay: 100,
		    	loopDelay: 3000,
		    	placeHolder1: " |",
		    	placeHolder2: "_"
			}, settings);
			
			var newsItems = new Array();
			var newsLinks = new Array();
			var newsItemCounter = 0;
			
			$(settings.newsList + ' li').hide();
			
			$(settings.newsList + ' li').each(function(){
				if($(this).children('a').length) {
					newsItems[newsItemCounter] = $(this).children('a').text();
					newsLinks[newsItemCounter] = $(this).children('a').attr('href');
				}
				else {
					newsItems[newsItemCounter] = $(this).text();
					newsLinks[newsItemCounter] = '';
				}
				newsItemCounter ++;
			});
			
			settings = jQuery.extend(settings,{
				newsItems: newsItems,
				newsLinks: newsLinks,
				newsItemCounter: newsItemCounter - 1,
				currentItem: 0,
				currentLength: 0,
				firstRun:1
			});
			
			setTimeout(function(){runTicker(settings); settings = null;},settings.startDelay);
		}
	
	});
	

})(jQuery);

