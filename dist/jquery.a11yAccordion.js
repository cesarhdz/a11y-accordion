/*
 *  a11y Accordion - v.10
 *  An accessible jquery accordion plugin.
 *  
 *
 *  Made by Nathan Kleekamp
 *  Under MIT License
 */
//;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "a11yAccordion",
        keys = {
            enter: 13,
            space: 32,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        };

		// The actual plugin constructor
		function Plugin ( element ) {
				this.element = element;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
            this.$titles = $("dt", this.element);
            this.$panels = $("dd", this.element);

            this.bindUiActions();
            this.setDefaultAriaAttr();
				},

        bindUiActions: function() {
            this.click();
            this.keyDown();
        },

        setDefaultAriaAttr: function() {
            this.$titles.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            });

            this.$panels.addClass("hide").attr("aria-hidden", "true");
        },

        click: function() {
            var _this = this;

            _this.$titles.
                on("click", function() {
                    _this.toggle( $(this) );
            }).
                on("selectstart", function(e) {
                    e.preventDefault();
            });
        },

        keyDown: function() {
            var _this = this;

            _this.$titles.on("keydown", function(e) {
                switch(true) {
                    case(e.which === keys.enter):
                        _this.toggle( $(this) );
                        break;

                    case(e.which === keys.space):
                        _this.toggle( $(this) );
                        break;

                    case(e.which === keys.right):
                        _this.nextTab( $(this) );
                        break;

                    case(e.which === keys.down):
                        _this.nextTab( $(this) );
                        break;

                    case(e.which === keys.left):
                        _this.previousTab( $(this) );
                        break;

                    case(e.which === keys.up):
                        _this.previousTab( $(this) );
                        break;

                    case(e.which === keys.home):
                        _this.firstTab( $(this) );
                        break;

                    case(e.which === keys.end):
                        _this.lastTab( $(this) );
                        break;
                }
            });

            _this.$panels.on("keydown", function(e) {
                if (e.which === keys.up && e.ctrlKey) {
                    _this.parentTitle( $(this) );
                }
            });
        },

        show: function(ele) {
            var $title = ele.prev();

            ele.removeClass("hide").attr("aria-hidden", "false");
            $title.attr("aria-expanded", "true");
            this.focusedTitle();
            this.setChildrenTabIndex();
        },

        hide: function(ele) {
            var $title = ele.prev();

            ele.addClass("hide").attr("aria-hidden", "true");
            $title.attr("aria-expanded", "false");
            this.unsetChildrenTabIndex();
        },

        toggle: function(ele) {
            var $target = ele.next();

            if ( $target.hasClass("hide") ) {
                this.show($target);
            } else {
                this.hide($target);
            }
        },

        nextTab: function(ele) {
            try {
                var $target = ele.next("dd").next("dt")[0];
                $target.focus();
                this.focusedTitle();
            // Really hate this try...catch construct. @todo: fix it
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
            }
        },

        previousTab: function(ele) {
            try {
                var $target = ele.prev("dd").prev("dt")[0];
                $target.focus();
                this.focusedTitle();
            // Really hate this try...catch construct. @todo: fix it
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
            }
        },

        firstTab: function() {
            this.$title.first().focus();
            this.focusedTitle();
        },

        lastTab: function() {
            this.$title.last().focus();
            this.focusedTitle();
        },

        parentTitle: function(ele) {
            var $title = ele.prev();
            $title.focus();
            this.focusedTitle();
        },

        // Set proper aria-selected attribute on accordion titles
        // @todo: make this better. The "if" statement breaks keyboard
        // navigation if there"s more than one accordion on the page.
        focusedTitle: function() {
            var $prevSelected = $("dt[aria-selected='true']"),
                $focused = $(document.activeElement);

            if ($focused.is("dt")) {
                $prevSelected.attr("aria-selected", "false").attr("tabindex", "-1");
                $focused.attr("aria-selected", "true").attr("tabindex", "0");
            }
        },

        // Get the active title and assign tabindex on tabpanel children
        setChildrenTabIndex: function() {
            var $active = $("dt[aria-expanded='true']"),
                $activeTabPanel = $active.next();

            $activeTabPanel.children().attr("tabindex", "0");
        },

        // Get the non-active titles and unset tabindex on tabpanel children
        unsetChildrenTabIndex: function() {
            var $nonActive = $("dt[aria-expanded='false']"),
                $nonActiveTabPanel = $nonActive.next();

            $nonActiveTabPanel.children().attr("tabindex", "-1");
        }
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

//})( jQuery, window, document );
