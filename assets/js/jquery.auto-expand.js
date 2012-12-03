//
//  loader.jquery.js
//  Loader Plugin Version 1.0
//	Loader Plugin for preloading images and background images
//
//  Created by Robbie Bardijn on 2012-05-22.
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

		function initKeyevents($form) {
			$form.find('input').keydown(function(e) {
				addText($(this));
			}).keyup(function() {
				addText($(this));
			});

			$form.find('textarea').keydown(function(e) {
				addArText($(this));
			}).keyup(function() {
				addArText($(this));
			});
		}

		function initResizeing($form) {
			$form.find('input').each(function() {
				$(this).before('<span class="behind"></span>');
				if($(this).val() !== "") {
					addText($(this));
				}
			});

			$form.find('textarea').each(function() {
				$(this).before('<span class="behind"></span>');
				if($(this).val() !== "") {
					addArText($(this));
				}
			});
		}

		return this.each(function() {
			initResizeing($(this));
			initKeyevents($(this));
		});
	};
})(jQuery);