/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var settings = {

		// Parallax background effect?
			parallax: false,

		// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

	};

	skel.breakpoints({
		xlarge: '(max-width: 1800px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$footer = $('#footer'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Touch?
			if (skel.vars.mobile) {

				// Turn on touch mode.
					$body.addClass('is-touch');

				// Height fix (mostly for iOS).
					window.setTimeout(function() {
						$window.scrollTop($window.scrollTop() + 1);
					}, 0);

			}

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Footer.
			skel.on('+medium', function() {
				$footer.insertAfter($main);
			});

			skel.on('-medium !medium', function() {
				$footer.appendTo($header);
			});

		// Header.

			// Parallax background.

				// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
					if (skel.vars.browser == 'ie'
					||	skel.vars.mobile)
						settings.parallax = false;

				if (settings.parallax) {

					skel.on('change', function() {

						if (skel.breakpoint('medium').active) {

							$window.off('scroll.strata_parallax');
							$header.css('background-position', 'top left, center center');

						}
						else {

							$header.css('background-position', 'left 0px');

							$window.on('scroll.strata_parallax', function() {
								$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
							});

						}

					});

					$window.on('load', function() {
						$window.triggerHandler('scroll');
					});

				}

		// Contact Form
			var gotchaCorrect = false;
			window.gotchaCallback = function(key) {
				gotchaCorrect = key && key.length > 0;
				enableSubmitButton();
			}

			window.gotchaExpiredCallback = function() {
				gotchaCorrect = false;
				enableSubmitButton();
			}

			var $nameInput = $('#Name');
			var $emailInput = $('#Email');
			var $messageText = $('#Message');

			// Enable submit button
			function enableSubmitButton() {
				if (gotchaCorrect && $nameInput.val() && $emailInput.val() && $messageText.val()) {
					$submitButton.prop('disabled', false);
				} else {
					$submitButton.prop('disabled', true);
				}
			}
			$nameInput.on('keyup', enableSubmitButton);
			$emailInput.on('keyup', enableSubmitButton);
			$messageText.on('keyup', enableSubmitButton);

			var $submitButton = $('#Submit')
			$submitButton.click(function() {
				if (grecaptcha.getResponse().length > 0) {
					var name = $nameInput.val();
					var email = $emailInput.val();
					$submitButton.prop('disabled', true);
					$.post('https://formspree.io/hundeloh.consulting@gmail.com', {
						_subject: 'Contact Form',
						name: $nameInput.val(),
						_replyto: $emailInput.val(),
						message: $$messageText.val()
					}).always(function() {
						localStorage.setItem('Name', name);
						localStorage.setItem('Email', email);
						$messageText.val('');
						$submitButton.prop('disabled', false);
					})
				}
			});
			$nameInput.val(localStorage.getItem('Name'));
			$emailInput.val(localStorage.getItem('Email'));

		// Enable localScroll
		$.localScroll({
			target: 'body'
		});
	});

})(jQuery);
