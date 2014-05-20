$(function(){

	// Smooth scroll
	$('#mainMenu a').click(function(e){
		e.preventDefault();
		var anchor = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(anchor).offset().top
		}, 1000);
	});

	// Dropdowns
	$('li', '.dropdown').on('click', function(e){
    if($(this).index() !== 0) return;
		e.preventDefault();
		var $droplist = $(this).nextAll();
		var $dropdown = $(this).parents('.dropdown');
		$dropdown.toggleClass('open');
		$droplist.fadeToggle();
	});
	$('.dropdown').mouseleave(function(){
		var $dropfirst = $(this).find('li:first');
		$(this).removeClass('open');
		$(this).find('li').not($dropfirst).hide();
	});

	// Objectives slider	
	var sp = 1;
	var $slider = $('#objectives ul');
	setInterval(function(){
		$slider.attr('class', 'slider-pos-' + (sp%4));
		sp++;
	}, 4000);

	// Sign up
	$('#toggleSignUp').click(function(e){
		e.preventDefault();
		$(this).fadeOut();	
		var signupform = $(this).parent().prev();
		signupform.show();
		var signupformpos = signupform.offset().top;
		$('html, body').animate({scrollTop:signupformpos}, 2000);
	});

	// Signup dropdown
	$('.dropdown ul li', '#signup').click(function(e){
	e.preventDefault();
	var self = this;

	// Selectors
	var $dropdown = $(this).parents('.dropdown');
	var $hidden = $dropdown.next();

	// Change hidden input
	if($hidden.val() == $(this).find('a').data('rel')) return;
	$hidden.val($(this).children('a').data('rel'));

	// Re-insert old first element
	var $first = $dropdown.find('li:first');
	$dropdown.find('li').each(function(index, el){
	  if($(el).text() > $first.text()) { 
	    $(el).before($first.css('display', 'block'));
	    return false;
	  }
	});

	// Prepend new selected elements
	// and close dropdown
	$dropdown.find('ul').prepend($(self));
	$dropdown.removeClass('open')
	  .find('ul li:gt(0)').hide();
	});

	// Subscribe
	$('#signup form').submit(function(e){
		e.preventDefault();
		var $fieldset = $(this).children('fieldset');
		$fieldset.addClass('sending');
		$(this).append('<div class="loading"><span></span></div>');
		$.ajax({
			url: this.action,
			method: this.method,
			dataType: 'jsonp',
			data: $(this).serialize(),
			complete: function(){
				$('.loading').remove();
			},
			success: function(data){
				$fieldset.hide();
				$('#send-ok').slideDown();
			},
			error: function(){
				$fieldset.removeClass();
				$('#send-error').slideDown();
			}
		});
	});

	// Animations on scroll
	$('#values li, #solutions li, #team li').addClass('animation-able');
	$(window).scroll(function(){
		var scrollWindow = $(window).scrollTop();
		$('#values li, #solutions li, #team li').each(function(){
			var scrollPos = $(this).offset().top - scrollWindow;
			if(scrollPos < scrollWindow){
				$(this).addClass('animate');
			}
		});
	});

	// Errors i18n
	window.ParsleyValidator.setLocale('mango');

});