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
            // These are all "dt" elements on the page in an accordion
            this.$allTitles = $(".js-accordion dt");

            // These are only the "dt" elements in the element
            this.$titles = $("dt", this.element);

            this.$panels = $("dd", this.element);

            this.bindUiActions();
            this.setDefaultAriaAttr();
				},

        bindUiActions: function() {
            this.click();
            this.keyDown();
            this.focus();
        },

        setDefaultAriaAttr: function() {
            // Sets all default Aria related attributes
            this.$titles.
                attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
            }).
                not(":first").attr("tabindex", "-1");

            // Prevents tabbing through all DOM elements in a non-selected panel
            this.$panels.addClass("hide")
                        .attr("aria-hidden", "true")
                        .find("*").each(function() {
                            $(this).attr("tabindex", "-1");
                        });
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
                        _this.moveTo("next");
                        break;

                    case(e.which === keys.down):
                        _this.moveTo("next");
                        break;

                    case(e.which === keys.left):
                        _this.moveTo("previous");
                        break;

                    case(e.which === keys.up):
                        _this.moveTo("previous");
                        break;

                    case(e.which === keys.home):
                        _this.moveTo("first");
                        break;

                    case(e.which === keys.end):
                        _this.moveTo("last");
                        break;
                }
            });

            _this.$panels.on("keydown", function(e) {
                if (e.which === keys.up && e.ctrlKey) {
                    var $title = $(this).prev();
                    $title.focus();
                }
            });
        },

        focus: function() {
            var _this = this;

            _this.$titles.
                on("focus", function() {
                    var $self = $(this),
                        $otherTitles = _this.$titles.not($self),
                        $allOtherTitles = _this.$allTitles.not($self);

                    // Set appropriate attributes on selected title
                    $self.attr({
                        "aria-selected": "true",
                        "tabindex": "0"
                    });

                    // Disable tabing to other titles in the current accordion
                    $otherTitles.attr("tabindex", "-1");

                    // Set aria-selected="false" on all other accordion titles on the page
                    $allOtherTitles.attr("aria-selected", "false");
            });
        },

        show: function(ele) {
            var $title = ele.prev();

            ele.removeClass("hide").attr("aria-hidden", "false");
            $title.attr("aria-expanded", "true");
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

        moveTo: function(target) {
            var _this = this,
                $focused = $(document.activeElement),
                $next = $focused.nextAll("dt").first(),
                $previous = $focused.prevAll("dt").first();

            switch(true) {
                case(target === "first"):
                    _this.$titles.first().focus();
                    break;

                case(target === "last"):
                    _this.$titles.last().focus();
                    break;

                case(target === "next"):
                    $next.focus();
                    break;

                case(target === "previous"):
                    $previous.focus();
                    break;
            }
        },

        // Get the active title and assign tabindex on tabpanel children
        setChildrenTabIndex: function() {
            var $active = $("dt[aria-expanded='true']"),
                $activeTabPanel = $active.next();

            // The children needs to be replaced with find like in setDefaultAriaAttr
            $activeTabPanel.children().attr("tabindex", "0");
        },

        // Get the non-active titles and unset tabindex on tabpanel children
        unsetChildrenTabIndex: function() {
            var $nonActive = $("dt[aria-expanded='false']"),
                $nonActiveTabPanel = $nonActive.next();

            // The children needs to be replaced with find like in setDefaultAriaAttr
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
