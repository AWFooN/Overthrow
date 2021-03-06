
(function(w, overthrow) {
	var lib = overthrow.sidescroller;
	function sendEvent( elem, evt, args, ieID ){
		// TODO needs IE8 support
		if( document.createEvent ){
			var event = document.createEvent( "Event" );
			event.initEvent( evt, true, true );
			event.overthrow = args;
			elem.dispatchEvent( event );
		}
		else {
			w.document.documentElement[ieID][ evt ] = {
				e: evt,
				overthrow: args
			};
			w.document.documentElement[ evt ]++;
		}
	}

	function determineNewSlide( num, currSlideNum ){
		var newSlide = 0, relative = false, sign;

		if( typeof num === "string" ){
			sign = num.charAt( 0 );
			if( sign === "+" || sign === "-" ){
				relative = true;
			}
		}
		if( relative ){
			newSlide = parseInt( num, 10 ) + currSlideNum;
		} else {
			newSlide = parseInt( num, 10 );
		}
		return newSlide;
	}

	function goTo( event ) {
		var options = event.overthrow || {}, goto, scroller, ul, thisScroll;

		if( options.name !== "goTo" ){
			return;
		}

		goto = options.arguments[0];
		scroller = event.target || event.srcElement;
		thisScroll = scroller.querySelector( ".overthrow" );
		ul = scroller.querySelector( "ul" );

		var slides = ul.querySelectorAll( "li" ),
			slidesWidth = thisScroll.offsetWidth,
			slideWidth = slides[ 0 ].offsetWidth,
			currScroll = thisScroll.scrollLeft,
			currSlideNum = Math.round( currScroll / slideWidth ),
			newSlide = determineNewSlide( goto, currSlideNum ),
			newScroll = slideWidth * newSlide,
			scrollWidth = thisScroll.scrollWidth - slidesWidth;

			if( newScroll < 0 ){
				newScroll = 0;
			} else if( newScroll > scrollWidth ){
				newScroll = scrollWidth;
			}
			var newActive = scroller.getActiveSlides( newScroll );

			overthrow.toss( thisScroll, {
				left: newScroll,
				easing: options.easing
			});

			sendEvent( scroller,
								"goto.overthrow",
								goto,
								thisScroll.ieID );
	}

	lib.onEvent( "overthrow-init", w.document.documentElement, function( event ) {
		var scroller = event.overthrow.sideScroll,
			options = event.overthrow.options || {};

		lib.onEvent( "overthrow-method", scroller, goTo);
	});
})( this, this.overthrow );
