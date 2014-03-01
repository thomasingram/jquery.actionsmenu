/*
 * jQuery actionsmenu plugin v1.1
 * Provides access to functions from a drop-down menu
 *
 * Copyright (c) 2010 Thomas Ingram
 * Licensed under MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Author: Thomas Ingram (thomasaingram@gmail.com, @thomasingram)
 * Requires: jQuery 1.2.6+
 */
(function ($) {
	$.fn.actionsmenu = function (config) {
		return this.each(function () {
			
			var $wrappingElement = $(this),
			
				c = $.extend(true, {
					maxHeight: 300,
					width: 180,
					css: {
						ids: {
							button: '_button',
							menu: '_menu'
						},
						classes: {
							button: 'actions_menu_button',
							menu: 'actions_menu',
							separator: 'separator',
							hidden: 'actions_menu_hidden',
							active: 'actions_menu_button_active'
						}
					}
				}, config),
			
				menuTitle = $wrappingElement.children().eq(0).text(),
			
				$button = $('<button class="' + c.css.classes.button + '" id="' + $wrappingElement.attr('id') + c.css.ids.button + '" aria-haspopup="true" aria-owns="' + $wrappingElement.attr('id') + '_menu">' + menuTitle + '</button>'),
			
				$menu = $('<ul class="' + c.css.classes.menu + '" id="' + $wrappingElement.attr('id') + c.css.ids.menu + '" role="menu" aria-hidden="true" aria-labelledby="' + $wrappingElement.attr('id') + '_button"></ul>'),
			
				attrsToCarry = ['class', 'id', 'title'];
		
			if (!$('body').is('[role]')) {
				$('body').attr('role', 'application');
			}
		
			$button.insertAfter($wrappingElement);
			
			$wrappingElement.find('li > a')
				.each(function (i) {
					var $li = $('<li><a href="#" role="menuitem" tabindex="-1">' + $(this).text() + '</a></li>'),
						$a = $li.find('a');
						
					for (var j = 0; j < attrsToCarry.length; j++) {
						$a.attr(attrsToCarry[j], $(this).attr(attrsToCarry[j]));
					}
					
					if ($(this).parent().is(':last-child') && i < $wrappingElement.find('li > a').length - 1) {
						$li.addClass(c.css.classes.separator);
					}
					
					$li.appendTo($menu);
				});
				
			$menu.appendTo('body');
				
			if ($menu.outerHeight() > c.maxHeight) {
				$menu.height(c.maxHeight);
			}
			
			// hide the menu
			$menu.css('width', c.width).addClass(c.css.classes.hidden);

			$menu.bind('toggle', function () {
				if ($(this).is(':hidden')) {
					$(this).trigger('show');
				} else {
					$(this).trigger('hide');
				}
			});

			$menu.bind('show', function () {
				// close any open menus
				$('ul[id$=_menu]:not(:hidden)')
					.each(function () {
						$(this)
							.addClass(c.css.classes.hidden)
							.attr('aria-hidden', true);
						$('button[id=' + $(this).attr('aria-labelledby') + ']').removeClass(c.css.classes.active);
					});
				
				var posLeft = $button.offset().left,
					posTop = $button.offset().top + $button.outerHeight();
				
				// avoid collision with right edge of the screen
				if ($button.offset().left + $(this).outerWidth() > $(window).width()) {
					posLeft -= $(this).outerWidth() - $button.outerWidth();
				}
				
				// and the bottom
				if ($button.offset().top + $button.outerHeight() + $(this).outerHeight() > $(window).height()) {
					posTop -= $button.outerHeight() + $(this).outerHeight();
				}
				
				$(this)
					.appendTo('body')
					.removeClass(c.css.classes.hidden)
					.attr('aria-hidden', false)
					.css({
						left: posLeft,
						top: posTop
					});
				$button.addClass(c.css.classes.active);
			});

			$menu.bind('hide', function () {
				$(this)
					.addClass(c.css.classes.hidden)
					.attr('aria-hidden', true);
				$button.removeClass(c.css.classes.active);
			});

			$button.click(function () {
				return false;
			});

			$button.mousedown(function () {
				$menu.trigger('toggle');
				$(this).focus();
				return false;
			});
			
			$menu.click(function () {
				$(this).trigger('hide');
			});
			
			$(document).click(function () {
				$menu.trigger('hide');
			});

			$button.bind($.browser.opera ? 'keypress' : 'keydown', function (e) {
				switch (e.keyCode) {
				case 13: // return
				case 32: // space
				case 38: // up
				case 40: // down
					if (!$(this).hasClass(c.css.classes.active)) {
						$menu.trigger('toggle');
					}
					$menu.find('a:first').focus();
					return false;
				case 27: // esc
					$menu.trigger('hide');
					break;
				case 9: // tab
					$menu.trigger('hide');
					break;
				}
			});

			$menu.bind($.browser.opera ? 'keypress' : 'keydown', function (e) {
				switch (e.keyCode) {
				case 13:
					$(this).trigger('hide');
					break;
				case 32:
					$(e.target).click();
					$(this).trigger('hide');
					return false;
				case 38:
					if ($(e.target).parent().prev().length) {
						$(e.target).parent().prev().find('a').eq(0).focus();
					} else {
						$(e.target).parent().siblings('li:last').find('a').eq(0).focus();
					}
					return false;
				case 40:
					if ($(e.target).parent().next().length) {
						$(e.target).parent().next().find('a').eq(0).focus();
					} else {
						$(e.target).parent().siblings('li:first').find('a').eq(0).focus();
					}
					return false;
				case 27:
					$(this).trigger('hide');
					$button.focus();
					break;
				case 9:
					$(this).trigger('hide');
					break;
				}
			});
			
			$wrappingElement.remove();
			
		});
	};
})(jQuery);