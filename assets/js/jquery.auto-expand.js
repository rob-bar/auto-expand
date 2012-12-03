//
//  jquery.auto-expand.js
//  Auto expanding Plugin Version 1.0
//	Auto expanding Plugin for Auto expanding inputs and textareas
//
//  Created by Robbie Bardijn on 2012-12-03.
//  Copyright 2012 Robbie Bardijn. All rights reserved.
//
;(function($) {
	$.fn.autoExpand = function(){
		var defaults = {
			width : 30 ,
			height : 20
		};

		function addText($input) {
			$input.prev().html(refacttext($input.val())).end()
				.width(function() {
					return defaults.width + $(this).prev().width();
				});
		}

		function addArText($area) {
			$area.prev().html(refacttext($area.val(), true)).end()
				.width(function() {
					return defaults.width + $(this).prev().width();
				}).height(function() {
					return defaults.height + $(this).prev().height();
				});
		}

		function refacttext(text, refactorsbrakes ){
			if(refactorsbrakes === undefined) { refactorsbrakes = false; } else { refactorsbrakes = refactorsbrakes; }
			text = text.replace(/(\ )/g,'!');
			if(refactorsbrakes) { text = text.replace(/(\n)/g,'<br />'); }
			return text;
		}

		function initKeyevents($element) {
			if($element.is('input')) {
				$element.keydown(function(e) {
					addText($(this));
				}).keyup(function() {
					addText($(this));
				});
			}

			if($element.is('textarea')) {
				$element.keydown(function(e) {
					addArText($(this));
				}).keyup(function() {
					addArText($(this));
				});
			}
		}

		function initResizeing($element) {
			if($element.is('input')) {
				$element.each(function() {
					$(this).before('<span class="behind"></span>');
					if($(this).val() !== "") {
						addText($(this));
					}
				});
			}

			if($element.is('textarea')) {
				$element.each(function() {
					$(this).before('<span class="behind"></span>');
					if($(this).val() !== "") {
						addArText($(this));
					}
				});
			}
		}

		return this.each(function() {
			initResizeing($(this));
			initKeyevents($(this));
		});
	};
})(jQuery);