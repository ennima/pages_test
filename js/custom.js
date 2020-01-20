/*
Copyright (c) 2017 
------------------------------------------------------------------
[Master Javascript]

Project:	ui  - Responsive HTML Template

-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var ui = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*-------------- ui Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.RTL();
            this.nav();
            this.team_member();
            this.story_member();
            this.contact_form();
            this.popup_vid();
            this.work_slider();
            this.wow();
        },
        /*-------------- ui Functions definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/
        RTL: function() {
            var rtl_attr = $("html").attr('dir');
            if (rtl_attr) {
                $('html').find('body').addClass("rtl");
            }
        },
        
        // Fixed Menu
        nav: function() {
            var w_height = $(window).height();
            var w_width = $(window).width();

            if ($(".nav-opener").length) {
                $(".nav-opener").on("click", function(e) {
                    jQuery(this).toggleClass('active').find('i').toggleClass('fa-bars fa-times');
                    jQuery('.main-nav').toggleClass('nav-active');
                    e.preventDefault();
                });
            };

            if (w_width < 991 ) {
                $(".main-nav .nav#navigation-menu ul li a").on("click", function(e) {
                    $('.nav-opener').trigger("click");
                    e.preventDefault();
                });
            };

            
            if ($("#submit1-tr").length) {
                $( "#submit1-tr" ).on( "click", function(e) {
                    $("#submit1").trigger( "click" );
                    e.preventDefault();
                });
            };

            
            if (w_width > 768) {
              $('section.new-block, div.new-block.works').css("min-height", w_height);
            };
            
        },
        //team_member
        team_member: function() {
            if ($('.team_member').length > 0) {

                var team_member = $('.team_member');


               team_member.owlCarousel({
                    margin:0,
                    autoplay:true,
                    autoplayHoverPause: true,
                    loop:true,
                    nav:true,
                    animateIn: 'fadeIn',
                    navText: ['&nbsp;', '<span>More Members </span><i class="flaticon-long-arrow-pointing-to-the-right"></i>' ],
                    items:1
                });

                team_member.mouseover(function(){
                    team_member.trigger('stop.owl.autoplay');
                })

                team_member.mouseleave(function(){
                    team_member.trigger('play.owl.autoplay',[1000]);
                })
                
            }
        },
        // story_member
        story_member: function() {
            if ($('.story_member').length > 0) {
                var story_member =  $('.story_member');
                story_member.owlCarousel({
                    margin:0,
                    autoplay:true,
                    autoplayHoverPause: true,
                    loop:true,
                    nav:true,
                    animateIn: 'fadeIn',
                    navText: ['&nbsp;', '<span>View Next Post</span> <i class="flaticon-long-arrow-pointing-to-the-right"></i>' ],
                    items:1
                });
               story_member.mouseover(function(){
                    story_member.trigger('stop.owl.autoplay');
                })

                story_member.mouseleave(function(){
                    story_member.trigger('play.owl.autoplay',[1000]);
                })
                
            }
        },
		// contact_form
        contact_form: function() {
        	if ($('#contact_form').length > 0) {
            if ($('#contact_form').length > 0) {

            		$("#contact_form").submit(function(event){
                        event.preventDefault(); //prevent default action 
                        var proceed = true;
                        var form = this;

                            //get input field values data to be sent to server
                            var post_url = $(this).attr("action"); //get form action url
                            var request_method = $(this).attr("method"); //get form GET/POST method
                            var form_data = $(this).serialize(); //Encode form elements for submission
                            
                            //Ajax post data to server
                            $.ajax({
                                url : post_url,
                                type: request_method,
                                dataType : 'json',
                                data : form_data
                            })
                            .done(function(response){ 
                                if(response.type == 'error'){ //load json data from server and output message     
                                    output = '<div class="error">'+response.text+'</div>';
                                }else{
                                    $(form)[0].reset(); //reset this form upon success
                                    output = '<div class="success">'+response.text+'</div>';
                                }
                                $("#contact_form #contact_results").html(output);
                            });
                    });
            }
                
        	}
        },
        //input video
        popup_vid: function() {
            if ($('.video').length > 0) {
                $('.video').magnificPopup({
                      disableOn: 700,
                      type: 'iframe',
                      mainClass: 'mfp-with-zoom',
                      removalDelay: 300,
                      preloader: false,
                      fixedContentPos: false,
                      zoom: {
                                enabled: true,
                                duration: 400,
                                easing: 'ease-in-out',
                                opener: function(openerElement) {
                                    return openerElement.is('a') ? openerElement : openerElement.find('i');
                                }
                            }
                });
            };
        },

        //work_slider
        work_slider: function() {
            if ($('.work_slider').length > 0) {
                 //Owl Home page banner 
                 var owl = $(".work_slider").owlCarousel({
                 items: 1,
                 autoplay: true,
                 autoplayHoverPause: true,
                 dots: true,
                 dotsContainer: '#carousel-custom-dots',
                 nav: false,
                 navRewind: true,
                 smartSpeed:450,
                 loop: true,
                 responsive: {
                 991: {
                 dots: true
                 }
                 },
                 startPosition: randomPosition()
                 });
                 $('.owl-dot').on('click', function() {
                    owl.trigger('to.owl.carousel', [$(this).index(), 300]);

                 });
                 //Random index generator
                 function randomPosition(){
                 var r_hb = $('#carousel-custom-dots li').length;
                 var randomize = null;
                 
                 
                 randomize=1
                 
                 
                 if (randomize != 0) {
                 return (Math.floor(Math.random()* r_hb));
                 }
                 else { return 0 ;}
                 }
                 //Sort random function
                 function random(owlSelector){
                 owlSelector.children().sort(function(){
                 return Math.round(Math.random()) - 0.5;
                 }).each(function(){
                 $(this).appendTo(owlSelector);
                 });
                 };


                    owl.mouseover(function(){
                        owl.trigger('stop.owl.autoplay');
                    })

                    owl.mouseleave(function(){
                        owl.trigger('play.owl.autoplay',[1000]);
                    })

            }

        },
       

        wow: function() {
            if ($('.wow').length > 0) {
                new WOW().init();
            }
        }

        
    };
    $(document).ready(function() {
        ui.init();
    });
    //On load
     $(window).on('load', function() {
         var load;
         setTimeout(function() {
             $('body').addClass('load');
         }, 800);



         if ($('.screen').length) {
            $( '.screen' ).scrollImage();
          };

          if ($('#navigation-menu').length) {
             // scroll to next id js
             $("#navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
                highlightSelector:"#navigation-menu a"
              });
                  
              /* demo functions */
            $("a[rel='next']").on('click', function(e) {
                  console.log("NEXT");
                  e.preventDefault();
                  var to=$(this).parent().parent("section,div").next().attr("id");
                  console.log(to)
                  console.log($(this).parent().parent("section,div").next().attr("id"))
                  $.mPageScroll2id("scrollTo",to);
              });
            };
            $("#go-services").on('click', function(e){
                e.preventDefault();
                var to= "services";
                $.mPageScroll2id("scrollTo",to);
            })



     });

          
     // Switcher Switcher
        
        if ($(".theme-menu").length) {
            $('.btn-clr').on('click', function(){
                $(this).toggleClass('btn-clr-clicked');
                $('.theme-menu').toggleClass('show-sidebar hide-sidebar');
            });
        
                
            $('#style-switcher ul li').on('click', function(){
                var path = $(this).data('path');
                $('#ui-theme-color').attr('href', path);
                var url = $(this).data('url');
              
                $("body .logo img").each(function(index){
                    var src = $(this).attr("src")
                    // console.log(src);
                    var photoName = src.substr(src.lastIndexOf("/"));
                    $(this).attr("src", url + photoName)
                });
            });
            
        };


        // Window Scroll
        $(window).scroll(function() {
            //Go to top
            if ($(this).scrollTop() > 100) {
                $('#go_to_top').addClass('goto');
            } else {
                $('#go_to_top').removeClass('goto');
            };

        });


         $("#go_to_top").on("click", function() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false
        });



	
})(jQuery);