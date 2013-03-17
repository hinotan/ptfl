// http://www.times-7.com/assets/templates/js/jquery.site.js
// learning :)

$(document).ready(function() {
	
	//
	// Tablet : @media only screen and (min-width: 721px) and (max-width: 960px)
	// Mobile : @media only screen and (max-width: 720px)
	// Screen : @media only screen and (min-width: 721px)
	//
	
   var history, events = [];

	
	$(window).bind('load resize orientationchange', function(){   
		waitForFinalEvent(function(){
			//
			var width = $(window).width();
			
			switch (true) {
				case (width < 721) :
					//
					//	Mobile
					//
					// console.debug("Mobile");
					for (v in events) { events[v].mobile(); }
					//bind();
				break;
				
				case (width > 720 && width < 961) : 
					//
					//	Tablet
					//
					// console.debug("Tablet");
					for (v in events) { events[v].tablet(); }
					//unbind();
				break;
				
				case (width > 960) :
					//
					//	Screen
					//
					// console.debug("Screen");
					for (v in events) { events[v].screen(); }
					//unbind();
				break;
			}
			
			var t = $('.product-tabs-inner.active');
			t.parent().height(t.height());

		}, 500, "resize");
   });	

	
	events["nav"] = ({
		//
		//	Navigation
		//
		mobile: function() {
			//
			//	Mobile
			//
			if (history == "set") { return }
			
			// console.debug("Bind");
			
			$('#navigation:first').click(function(event) {
				if (event.target === this){
					$(this).children().slideToggle("fast");
				}
			}).children().hide();		
			
			$('span.hoverable-m').click(function() {
	
				$(this).parent().parent().children("ul").slideToggle("fast");
				$(this).toggleClass("up");
				
				var t = $(this).text();
				$(this).text( t == "Show" ? "Hide" : "Show" );
	
				return false;
	
			}).parent().parent().children("ul").hide();		
			
			
			history = "set";
		},
		tablet : function() {
					
			if (history != "set") { return }
	
			// console.debug("unBind");
			
			$('#navigation:first').unbind('click').children().show();
			$('span.hoverable-m').unbind('click').parent().parent().children("ul").show();
			
			history = "unset";		
			
		},
		screen : function() {
					
			if (history != "set") { return }
	
			// console.debug("unBind");
			
			$('#navigation:first').unbind('click').children().show();
			$('span.hoverable-m').unbind('click').parent().parent().children("ul").show();
			
			history = "unset";		
			
		}
			
	});

	
	//
	//	Home page tabs Only
	//

	events["home-tabs"] = ({
		//
		//	Navigation
		//
		tablet : function() {
			hometabs();

		},
		screen : function() {
			hometabs();
		}
			
	});
});


var hometabs = function() {
	
	$('.product-tabs li').each(function(index) {
		$(this).bind (	"click", function(){
			$('.product-tabs li').removeClass("active");
			$(this).addClass("active");
			$('.product-tabs-content').cycle(index); 
		});	    
	});	
	
	$('.product-tabs-content').cycle({
		timeout: 0, 
		speed: 0,
		slideResize: false,
		containerResize: false,
		before: onBefore,
		after:  onAfter
	});
	
	function onBefore() {
		$(this).parent().height($(this).height());
		$('.product-tabs-inner').removeClass("active");
	}
	function onAfter() {
		$(this).addClass("active");
	}	
	
}

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();