/**
 *  Themes: Velonic Admin theme
 *
 **/


! function($) {
    "use strict";

    /**
    Sidebar Module
    */
    var SideBar = function() {
        this.$body = $("body"),
        this.$sideBar = $('aside.left-panel'),
        this.$navbarToggle = $(".navbar-toggle"),
        this.$navbarItem = $("aside.left-panel nav.navigation > ul > li:has(ul) > a")
    };

    //initilizing 
    SideBar.prototype.init = function() {
        //on toggle side menu bar
        var $this = this;
        $(document).on('click', '.navbar-toggle', function () {
            $this.$sideBar.toggleClass('collapsed');
        }); 

        //on menu item clicking
        this.$navbarItem.click(function () {
            if ($this.$sideBar.hasClass('collapsed') == false || $(window).width() < 768) {
                $("aside.left-panel nav.navigation > ul > li > ul").slideUp(300);
                $("aside.left-panel nav.navigation > ul > li").removeClass('active');
                if (!$(this).next().is(":visible")) {
                    $(this).next().slideToggle(300, function () {
                        $("aside.left-panel:not(.collapsed)").getNiceScroll().resize();
                    });
                    $(this).closest('li').addClass('active');
                }
                return false;
            }
        });

        //adding nicescroll to sidebar
        if ($.isFunction($.fn.niceScroll)) {
            $("aside.left-panel:not(.collapsed)").niceScroll({
                cursorcolor: '#8e909a',
                cursorborder: '0px solid #fff',
                cursoropacitymax: '0.5',
                cursorborderradius: '0px'
            });
        }
    },

    //exposing the sidebar module
    $.SideBar = new SideBar, $.SideBar.Constructor = SideBar
    
}(window.jQuery),



//main app module
function($) {
    "use strict";
    
    var VelonicApp = function() {
        this.VERSION = "1.0.0", 
        this.AUTHOR = "Coderthemes", 
        this.SUPPORT = "coderthemes@gmail.com", 
        this.pageScrollElement = "html, body", 
        this.$body = $("body")
    };

    //initializing tooltip
    VelonicApp.prototype.initTooltipPlugin = function() {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip()
    }, 

    //initializing popover
    VelonicApp.prototype.initPopoverPlugin = function() {
        $.fn.popover && $('[data-toggle="popover"]').popover()
    }, 

    //initializing nicescroll
    VelonicApp.prototype.initNiceScrollPlugin = function() {
        //You can change the color of scroll bar here
        $.fn.niceScroll &&  $(".nicescroll").niceScroll({ cursorcolor: '#9d9ea5', cursorborderradius: '0px'});
    },

    //initializing knob
    VelonicApp.prototype.initKnob = function() {
        if ($(".knob").length > 0) {
            $(".knob").knob();
        }
    },
    
    //initilizing 
    VelonicApp.prototype.init = function() {
        this.initTooltipPlugin(),
        this.initPopoverPlugin(),
        this.initNiceScrollPlugin(),
        this.initKnob(),
        //creating side bar
        $.SideBar.init(),
        //creating portles
        $.Portlet.init();
    },

    $.VelonicApp = new VelonicApp, $.VelonicApp.Constructor = VelonicApp

}(window.jQuery),

//initializing main application module
function($) {
    "use strict";
    $.VelonicApp.init()
}(window.jQuery);

