(function ($) {
    "use strict";


    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, CSSRulePlugin, ScrollToPlugin, MorphSVGPlugin, CustomEase, InertiaPlugin);

    let cursorLoading;

    cursorLoading = gsap.timeline({
        overwrite: true,
        paused: true
    });

    cursorLoading.to("#mouseCursor", .3, {
        width: 50,
        height: 50,
    }, 0)

    cursorLoading.to('#cursor', .3, {
        backgroundColor: 'transparent',
        borderWidth: 2,
    }, 0)

    cursorLoading.to('#dot', .3, {
        opacity: 1,
        x: '0%',
        y: '0%',
        top: '0%',
        left: '0%'
    }, 0)

    cursorLoading.to('#dot', .3, {
        opacity: 1,
        x: 0,
        y: 0,
        top: 0,
        left: 0
    }, 0)

    cursorLoading.to('#mouseCursor', 1, {
        rotate: 360,
        repeat: -1,
        ease: 'power2.inOut'
    }, 0)


    function aliothImageCarousel() {

        var aiCarousel = $('.alioth-image-carousel');

        aiCarousel.each(function () {

            let $this = $(this),
                navigate = $this.data('navigate'),
                wrapper = $this.children('.ai-wrapper'),
                xVal = wrapper.outerWidth() - $(window).outerWidth();

            if (navigate === 'scroll') {

                gsap.to(wrapper, {
                    x: -xVal,
                    scrollTrigger: {
                        trigger: $this,
                        scrub: 1.2,
                        start: 'center center',
                        end: 'bottom+=2000 top',
                        markers: false,
                        pin: true
                    }
                })

            } else if (navigate === 'drag') {

                var velocityX;

                Draggable.create(wrapper, {
                    type: "x",
                    duration: 1,
                    bounds: $this,
                    edgeResistance: 0.75,
                    dragResustance: 0.55,
                    throwProps: true,
                    intertia: true,
                    onPress: function () {
                        // track the x and y properties:
                        InertiaPlugin.track(wrapper, "x,y");


                        velocityX = InertiaPlugin.getVelocity(wrapper, "x");


                    },
                    onDrag: function () {


                        gsap.to(wrapper, {
                            x: this.x - velocityX / 100,
                            ease: "power2",
                            overwrite: "auto",
                            // skewX:"+=1", //meaningless - we tweak the values in the modifier below. We needed to make the skewX tween to something just so that it's included in the tweening values.

                        });
                    },

                });


            }



        })

    }



    /** Mouse Cursor **/
    function mouseCursor() {

        let mouseCursor = $('#mouseCursor'),
            circle = $('#cursor'),
            dot = $('#dot'),
            cursorActive;

        gsap.set(mouseCursor, {
            xPercent: -50,
            yPercent: -50
        });

        let ball = mouseCursor
        let pos = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        let mouse = {
            x: pos.x,
            y: pos.y
        };
        let speed = 0.1;

        cursorActive = true;

        let xSet = gsap.quickSetter(ball, "x", "px");
        let ySet = gsap.quickSetter(ball, "y", "px");

        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
        });


        gsap.ticker.add(() => {

            if (cursorActive) {
                let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

                pos.x += (mouse.x - pos.x) * dt;
                pos.y += (mouse.y - pos.y) * dt;
                xSet(pos.x);
                ySet(pos.y);
            }

        });

        function cursorHovers() {



            var darkCircle = mouseCursor.data('dark-circle'),
                darkDot = mouseCursor.data('dark-dot'),
                lightCircle = mouseCursor.data('light-circle'),
                lightDot = mouseCursor.data('light-dot'),
                curBg,
                iconColor;

            if ($('body').hasClass('dark')) {

                gsap.set(cursor, {
                    borderColor: lightCircle
                })

                gsap.set(dot, {
                    background: lightDot
                })

                curBg = lightCircle;
                iconColor = lightDot;

            } else {

                gsap.set(cursor, {
                    borderColor: darkCircle
                })

                gsap.set(dot, {
                    background: darkDot
                })

                curBg = darkCircle;
                iconColor = darkDot;

            }


            $('.section').on('mouseenter', function () {

                let $this = $(this),
                    color = $this.css('background-color'),
                    hsl = gsap.utils.splitColor(color, true),
                    lightness = hsl[hsl.length - 1];

                if ((lightness < 50) && (lightness != 0)) {

                    gsap.to(cursor, {
                        borderColor: lightCircle
                    })

                    gsap.to(dot, {
                        background: lightDot
                    })



                } else if ((lightness > 50) && (lightness != 0)) {

                    gsap.to(cursor, {
                        borderColor: darkCircle
                    })

                    gsap.to(dot, {
                        background: darkDot
                    })



                }
            })

            $('.section').on('mouseleave', function () {

                if ($('body').hasClass('dark')) {

                    gsap.to(cursor, {
                        borderColor: lightCircle
                    })

                    gsap.to(dot, {
                        background: lightDot
                    })

                } else {

                    gsap.to(cursor, {
                        borderColor: darkCircle
                    })

                    gsap.to(dot, {
                        background: darkDot
                    })

                }

            })



            var defaultHovers = $('a, .service, button')

            defaultHovers.on('mouseenter', function (e) {

                gsap.to(mouseCursor, {
                    width: 100,
                    height: 100
                })

                gsap.to(cursor, {
                    backgroundColor: curBg,
                    borderWidth: 0
                })

            })

            defaultHovers.on('mouseleave', function (e) {

                gsap.to(mouseCursor, {
                    width: 50,
                    height: 50
                })

                gsap.to(cursor, {
                    backgroundColor: 'transparent',
                    borderWidth: 2
                })

            })


            var projectHovers = $('.ar-work, .fw-project, .cs-title, .sl-project, .wall-project, .alioth-single-project, .aw-project');

            projectHovers.on('mouseenter', function (e) {

                gsap.to(mouseCursor, {
                    width: 120,
                    height: 120
                })

                gsap.to(cursor, {
                    backgroundColor: curBg,
                    borderWidth: 0
                })

            })

            projectHovers.on('mouseleave', function (e) {



                gsap.to(mouseCursor, {
                    width: 50,
                    height: 50
                })

                gsap.to(cursor, {
                    backgroundColor: 'transparent',
                    borderWidth: 2
                })

            })

            var borderHovers = $('.menu-toggle, .fs-prev, .fs-next, .ss1-dots, .ss2-dot, .ss2-prev, .ss2-next, .ss1-prev, .ss1-next, .a-plus-button, .scroll-notice, .a-test-next, .a-test-prev, .cart-button, .cpq-reduce, .cpq-increase, .swiper-pagination-bullet');

            borderHovers.on('mouseenter', function (e) {

                gsap.to(mouseCursor, {
                    width: 100,
                    height: 100
                })

                gsap.to(dot, {
                    opacity: 0
                })

            })

            borderHovers.on('mouseleave', function (e) {

                gsap.to(mouseCursor, {
                    width: 50,
                    height: 50
                })
                gsap.to(dot, {
                    opacity: 1
                })

            })

            var dotHovers = $('ul.main-menu a, .a-button, .a-client, .fs-button, .alioth-latest-posts .post, .field-wrap');

            dotHovers.on('mouseenter', function (e) {

                gsap.to(mouseCursor, {
                    width: 100,
                    height: 100
                })

                gsap.to(cursor, {
                    backgroundColor: curBg,
                    borderWidth: 0
                })

                gsap.to(dot, {
                    opacity: 0
                })
            })

            dotHovers.on('mouseleave', function (e) {
                gsap.to(mouseCursor, {
                    width: 50,
                    height: 50
                })

                gsap.to(cursor, {
                    backgroundColor: 'transparent',
                    borderWidth: 2
                })

                gsap.to(dot, {
                    opacity: 1
                })
            })


            var imageHovers = $('.single-image.lightbox');

            imageHovers.on('mouseenter', function (e) {

                mouseCursor.append('<i id="cursorIcon" class="icofont-search"></i>')

                gsap.set('#cursorIcon', {
                    color: iconColor,
                    fontSize: 25
                })

                gsap.to('#cursorIcon', {
                    scale: 1
                })

                gsap.to(mouseCursor, {
                    width: 100,
                    height: 100
                })

                gsap.to(dot, {
                    opacity: 0
                })

            })

            imageHovers.on('mouseleave', function (e) {

                gsap.to('#cursorIcon', {
                    scale: 0,
                    onComplete: function () {
                        $('#cursorIcon').remove();
                    }
                })

                gsap.to(mouseCursor, {
                    width: 50,
                    height: 50
                })

                gsap.to(dot, {
                    opacity: 1
                })

            })



        }

        cursorHovers();



        barba.hooks.before((data) => {

            cursorLoading = gsap.timeline({
                overwrite: true
            });

            cursorLoading.to(mouseCursor, .3, {
                width: 50,
                height: 50,
            }, 0)

            cursorLoading.to(cursor, .3, {
                backgroundColor: 'transparent',
                borderWidth: 2,
            }, 0)

            cursorLoading.to(dot, .3, {
                opacity: 1,
                x: '0%',
                y: '0%',
                top: '0%',
                left: '0%'
            }, 0)

            cursorLoading.to(dot, .3, {
                opacity: 1,
                x: 0,
                y: 0,
                top: 0,
                left: 0
            }, 0)

            cursorLoading.to(mouseCursor, 1, {
                rotate: 360,
                repeat: -1,
                ease: 'power2.inOut'
            }, 0)


        });

        barba.hooks.after((data) => {

            let cursorLoaded = gsap.timeline({
                onStart: function () {


                },
                onComplete: function () {
                    gsap.set(mouseCursor, {
                        rotate: 0,
                    })

                    cursorHovers();



                }
            });

            cursorLoading.pause();

            cursorLoaded.to(dot, .8, {
                top: '50%',
                left: '50%',
                ease: 'power2.inOut'
            }, .4)

        });


    }
    /** Mouse Cursor **/

    mouseCursor();

    var loader,
        loaderOv,
        loadAn;


    function pageLoader() {

        loader = $('.alioth-page-loader');


        $('.apl-count').wrap('<div class="apl-wrapper"></div>');

        var loaderLayout = loader.data('layout');

        loader.addClass(loaderLayout)


        const nums1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
            nums2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        let num1Text = '';
        let num2Text = '';

        for (let i = 0; i < nums1.length; i++) {
            num1Text += '<span>' + nums1[i] + '</span>';
        }

        for (let i = 0; i < nums2.length; i++) {
            num2Text += '<span>' + nums2[i] + '</span>';
        }

        $('.apl-count').append('<div class="apl-num apl-num-1"></div><div class="apl-num apl-num-2"></div><div class="apl-num apl-num-3"></div>')

        $('.apl-num-1').html(num1Text);
        $('.apl-num-2').html(num2Text);
        $('.apl-num-3').html('<span>%</span><span>0</span>');

        $('.apl-num').wrapInner('<div class="apl-num-wrapper"></div>')


        var aplCount = loader.find('.apl-count'),
            num1wrap = aplCount.find('.apl-num-1 .apl-num-wrapper'),
            num2wrap = aplCount.find('.apl-num-2 .apl-num-wrapper'),
            num3wrap = aplCount.find('.apl-num-3 .apl-num-wrapper'),

            duration = loader.data('duration');


        loadAn = gsap.timeline({
            yoyo: true,
            id: 'pageLoader',
            once: true,
            onStart: function () {
                $('body').addClass('loading');

            },
            onComplete: function () {

                $('body').removeClass('loading');
                gsap.set('#page', {
                    visibility: 'visible'
                })

                gsap.to('.apl-background', .7, {
                    height: '0%',
                    ease: 'power2.inOut',
                    onComplete: function () {
                        loader.hide();
                    }
                })



            }
        });

        loadAn.to(num1wrap, duration, {
            y: '-91%',
            ease: 'power2.inOut',
        }, .25)

        loadAn.to(num2wrap, duration, {
            y: '-95.3%',
            ease: 'power2.inOut',
        }, .25)

        loadAn.to(num3wrap, 1.5, {
            y: '0%',
            ease: 'power2.Out',
        }, .5)

        loadAn.to('.site-logo', 1, {
            y: '0%',
            ease: 'power2.out',
        }, 2)


        loadAn.to('.header-widget', 1.5, {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
        }, 4)

        loadAn.to(num3wrap, 1, {
            y: '-50%',
            ease: 'power2.Out',
        }, duration - .6)

        //  Loader Out

        loadAn.to('.apl-num-wrapper', .6, {
            y: '-100%',
            ease: 'power2.in',
            stagger: .1,
        }, duration + .6)

    }

    //    pageLoader()



    function landingPageHead() {

        var lpHead = $('.landing-page-head'),
            lpHeadText = lpHead.find('h1');

        new SplitText(lpHeadText, {
            type: 'lines, chars',
            linesClass: 'lph_line',
            charsClass: 'lph_char'
        })


        new SplitText('.ls-text', {
            type: 'lines, chars',
            linesClass: 'lst_line',
            charsClass: 'lst_char'
        })

        new SplitText('.ls-switcher a', {
            type: 'words, chars',
            wordsClass: 'lsa_word',
            charsClass: 'lsa_char'
        })

        new SplitText('.lph-description h4', {
            type: 'lines',
            linesClass: 'lpd_line'
        })

        $('.lpd_line').wrapInner('<span></span>')


    }

    function landingPageHolders() {


        var holder = $('.landing-page-hold');

        holder.each(function () {

            let $this = $(this),
                image = $this.find('.landing-page-image'),
                img = image.children('img'),
                delay = $this.data('delay');


            gsap.fromTo(img, {
                scale: 1.2
            }, {
                scale: 1,
                duration: 2,
                delay: delay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                },
                onStart: function () {

                    $this.addClass('inview')

                }
            })


        })

    }






    function landingPageOpen() {

        var lpOpen = gsap.timeline({
            onStart: function(){
                
                gsap.set('.lph-images' , {
                    visibility: 'visible'
                })
                
            }
        });

        lpOpen.fromTo('.lph_char', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            stagger: .02,
            ease: 'power2.out'
        }, 0)

        lpOpen.fromTo('.landing-logo img', 1, {
            y: '100%'
        }, {
            y: '0%',
            ease: 'power2.out'
        }, 3.5)

        lpOpen.fromTo('.header-cta-but', 1, {
            x: -30,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            ease: 'power2.out'
        }, 3.8)

        lpOpen.to('.lph_char', 1, {
            y: '-100%',
            stagger: .02,
            ease: 'power2.in'
        }, 3)



        lpOpen.fromTo('.lst_line', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            stagger: .05,
            ease: 'power2.out',
            onStart: function () {

                gsap.set('.layout-switch', {
                    visibility: 'visible'
                })

            }
        }, 4)

        lpOpen.fromTo('.lsa_char', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            stagger: .05,
            ease: 'power2.out',
            onComplete: function () {

                let cursorLoaded = gsap.timeline({
                    onStart: function () {


                    },
                    onComplete: function () {
                        gsap.set('#mouseCursor', {
                            rotate: '0',
                        })


                    }
                });

                cursorLoading.pause();

                cursorLoaded.to(dot, .8, {
                    top: '50%',
                    left: '50%',
                    ease: 'power2.inOut'
                }, .4)

            }

        }, 4)

        lpOpen.fromTo('.ls-switcher span', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            stagger: .05,
            ease: 'power2.out',

        }, 5)


        lpOpen.fromTo('.lph-image-3', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            ease: 'power3.out'
        }, 4)

        lpOpen.fromTo('.lph-image-2, .lph-image-4', 1.5, {
            y: '100%'
        }, {
            y: '0%',
            ease: 'power3.out'
        }, 4.3)

        lpOpen.fromTo('.lph-image-1, .lph-image-5', 1.5, {
            y: '100%'
        }, {
            y: '25%',
            ease: 'power3.out'
        }, 4.6)




    }

    function lphImages() {

        let lphImage = $('.lph-image');

        lphImage.each(function () {

            let $this = $(this),
                images = $this.find('.lph-img'),
                img = images.find('img'),
                height = images.outerHeight();

            gsap.set($this, {
                height: height
            })

            gsap.set(images, {
                position: 'absolute'
            })

            gsap.set(img, {
                height: height
            })

        });

        let darkSwitch = $('.dark-switch'),
            lightSwitch = $('.light-switch');


        darkSwitch.on('mouseenter', function () {

            gsap.to('.lph-img.lphi-light', {
                height: '0%',
                ease: 'power2.out',
                stagger: .05,
                duration: .75
            })

        })

        darkSwitch.on('mouseleave', function () {

            gsap.to('.lph-img.lphi-light', {
                height: '100%',
                ease: 'power2.out',
                stagger: .05,
                duration: .75
            })

        })


        lightSwitch.on('mouseenter', function () {

            gsap.to('.lph-img.lphi-dark', {
                height: '0%',
                ease: 'power2.out',
                stagger: .05,
                duration: .75
            })

        })

        lightSwitch.on('mouseleave', function () {

            gsap.to('.lph-img.lphi-dark', {
                height: '100%',
                ease: 'power2.out',
                stagger: .05,
                duration: .75
            })

        })

    }


    function aliothScrollAnimations() {

        var hasAnim = $('.has-anim');

        //GSDevTools.create();

        hasAnim.each(function () {

            var $this = $(this),
                anim = $this.data('animation'),
                delay = $this.data('delay'),
                stagger = $this.data('stagger'),
                duration = $this.data('duration'),
                parent = $this.parent('div');


            if ((anim === 'linesUp') || (anim === 'linesDown') || (anim === 'linesFadeUp') || (anim === 'linesFadeDown') || (anim === 'linesFadeLeft') || (anim === 'linesFadeRight')) {

                var splitType = 'lines'



            } else if ((anim === 'wordsFadeUp') || (anim === 'wordsFadeDown') || (anim === 'wordsFadeLeft') || (anim === 'wordsFadeRight') || (anim === 'wordsUp') || (anim === 'wordsDown') || (anim === 'wordsLeft') || (anim === 'wordsRight')) {

                var splitType = 'words'



            } else if ((anim === 'charsFadeUp') || (anim === 'charsFadeDown') || (anim === 'charsFadeRight') || (anim === 'charsFadeLeft') || (anim === 'charsUp') || (anim === 'charsDown') || (anim === 'charsLeft') || (anim === 'charsRight')) {

                var splitType = 'lines, chars'

            }



            new SplitText($this, {
                type: splitType,
                linesClass: 'anim_line',
                charsClass: 'anim_char',
                wordsClass: 'anim_word',
            });


            var lines = $this.find('.anim_line'),
                words = $this.find('.anim_word'),
                chars = $this.find('.anim_char');

            if (anim === 'linesFadeUp') {
                //                
                //                if (stagger == null) { var stagger = 0.1 }
                //                if (duration == null) { var duration = 1 }

                gsap.fromTo(lines, {
                    y: "100%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    ease: 'expo.out'
                })

            } else if (anim === 'linesFadeDown') {
                gsap.fromTo(lines, {
                    y: "-100%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'linesFadeLeft') {
                gsap.fromTo(lines, {
                    x: "-100px",
                    opacity: 0
                }, {
                    x: "0",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'linesFadeRight') {
                gsap.fromTo(lines, {
                    x: "100px",
                    opacity: 0
                }, {
                    x: "0",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'linesUp') {

                lines.wrap('<span class="line-holder"></span>');

                gsap.fromTo(lines, {
                    y: "100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top bottom',
                    },
                    delay: delay,
                    ease: "power4.out"
                })



            } else if (anim === 'linesDown') {

                lines.wrap('<span class="line-holder"></span>');

                gsap.fromTo(lines, {
                    y: "-100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })



            } else if (anim === 'wordsFadeUp') {

                gsap.fromTo(words, {
                    y: "100%",
                    opacity: 0

                }, {
                    y: "0%",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsFadeDown') {

                gsap.fromTo(words, {
                    y: "-100%",
                    opacity: 0

                }, {
                    y: "0%",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsFadeLeft') {

                gsap.fromTo(words, {
                    x: "-100px",
                    opacity: 0

                }, {
                    x: "0",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsFadeRight') {

                gsap.fromTo(words, {
                    x: "100px",
                    opacity: 0

                }, {
                    x: "0",
                    duration: duration,
                    opacity: 1,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsUp') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    y: "100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay,
                    ease: "power2.out"
                })

            } else if (anim === 'wordsDown') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    y: "-100%",

                }, {
                    y: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsLeft') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    x: "-100%",

                }, {
                    x: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'wordsRight') {

                words.wrap('<span class="word-holder"></span>');

                gsap.fromTo(words, {
                    x: "100%",

                }, {
                    x: "0%",
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'charsFadeUp') {

                gsap.fromTo(chars, {
                    y: "100%",
                    opacity: 0

                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsUp') {



                gsap.fromTo(chars, {
                    y: "100%",


                }, {
                    y: "0%",

                    duration: duration,
                    stagger: stagger,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsDown') {



                gsap.fromTo(chars, {
                    y: "-100%",


                }, {
                    y: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsLeft') {



                gsap.fromTo(chars, {
                    x: "-100%",


                }, {
                    x: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsRight') {



                gsap.fromTo(chars, {
                    x: "100%",


                }, {
                    x: "0%",

                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsFadeDown') {

                gsap.fromTo(chars, {
                    y: "-100%",
                    opacity: 0

                }, {
                    y: "0%",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsFadeLeft') {

                gsap.fromTo(chars, {
                    x: "-35px",
                    opacity: 0

                }, {
                    x: "0px",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })


            } else if (anim === 'charsFadeRight') {

                gsap.fromTo(chars, {
                    x: "35px",
                    opacity: 0

                }, {
                    x: "0px",
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        position: 'top top'
                    },
                    delay: delay
                })

            } else if (anim === 'fadeUp') {

                gsap.fromTo($this, {
                    y: 50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay
                })

            } else if (anim === 'fadeDown') {

                gsap.fromTo($this, {
                    y: -50,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay
                })

            } else if (anim === 'fadeLeft') {

                gsap.fromTo($this, {
                    x: -50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay
                })

            } else if (anim === 'fadeRight') {

                gsap.fromTo($this, {
                    x: 50,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: duration,
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: parent,
                        start: 'top center'
                    },
                    delay: delay
                })

            }

        });




        var imAnim = $('img.has-anim');
        CustomEase.create("blockEase", ".25,.74,.22,.99");

        imAnim.each(function (i) {
            i++

            let $this = $(this),
                anim = $this.data('animation'),
                delay = $this.data('delay'),
                duration = $this.data('duration'),
                ovColor = $this.data('color');

            if ((anim === 'blockUp') || (anim === 'blockLeft') || (anim === 'blockRight')) {

                $this.wrap('<div class="img-anim-wrapper"></div>');

                let parWrap = $this.parent('.img-anim-wrapper');

                parWrap.prepend('<span class="img-anim-ov"></span>');

                let animOv = parWrap.children('.img-anim-ov');

                gsap.to($this, {
                    scale: 1,
                    duration: duration * 2,
                    delay: delay,
                    scrollTrigger: {
                        trigger: parWrap,
                        start: 'top center'
                    },
                    ease: "power3.out",
                })



                if (anim === 'blockUp') {

                    gsap.set(animOv, {
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        height: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }

                if (anim === 'blockLeft') {

                    gsap.set(animOv, {
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        width: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }

                if (anim === 'blockRight') {

                    gsap.set(animOv, {
                        left: 'unset',
                        background: ovColor
                    })

                    gsap.to(animOv, {
                        width: "0%",
                        delay: delay,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top center'
                        },
                        duration: duration,
                        ease: 'blockEase'
                    })


                }


            } else if ((anim === 'slideUp') || (anim === 'slideLeft') || (anim === 'slideRight')) {

                let imgHeight = $this.outerHeight(),
                    imgWidth = $this.outerWidth();

                $this.wrap('<div class="img-anim-wrapper"></div>');

                let parWrap = $this.parent('.img-anim-wrapper'),
                    sImage = parWrap.parent('.single-image');

                gsap.set(parWrap, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                })

                gsap.set(sImage, {
                    width: imgWidth,
                    height: imgHeight
                })

                gsap.set($this, {
                    position: 'absolute',
                    width: imgWidth,
                    height: imgHeight,
                })



                gsap.to($this, {
                    scale: 1,
                    duration: duration * 2,
                    delay: delay,
                    scrollTrigger: {
                        trigger: parWrap,
                        start: 'top 85%'
                    },
                    ease: "power3.out",
                })


                if ((anim === 'slideUp')) {

                    gsap.set($this, {
                        left: 0,
                        top: 0
                    })

                    gsap.set(parWrap, {
                        width: imgWidth,
                        height: 0,

                    })

                    gsap.to(parWrap, {
                        height: imgHeight,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%',

                        },
                        delay: delay,
                        ease: "blockEase"
                    })


                } else if ((anim === 'slideLeft')) {

                    gsap.set($this, {
                        left: 0

                    })

                    gsap.set(parWrap, {
                        width: 0,
                        height: imgHeight,

                    })

                    gsap.to(parWrap, {
                        width: imgWidth,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%'

                        },
                        delay: delay,
                        ease: "blockEase"
                    })

                } else if ((anim === 'slideRight')) {

                    gsap.set($this, {
                        left: "unset",
                        right: 0

                    })

                    gsap.set(parWrap, {
                        width: 0,
                        height: imgHeight,
                        left: 'unset'

                    })

                    gsap.to(parWrap, {
                        width: imgWidth,
                        duration: duration,
                        scrollTrigger: {
                            trigger: parWrap,
                            start: 'top 85%'
                        },
                        delay: delay,
                        ease: "blockEase"
                    })

                }


            };



        })

    }

    function aliothPageNav() {

        $('.alioth-page-nav').each(function () {

            let $this = $(this),
                title = $this.find('.page-title'),
                text = title.text();

            title.append('&nbsp;' + text + '&nbsp;')
            title.append('&nbsp;' + text + '&nbsp;')

            title.marquee({
                duplicated: true,
                duration: 8000,
                delayBeforeStart: 0,
                direction: 'left',
            });




        })

    }

    /* Heading */

    function aliothHeading() {

        var heading = $('.alioth-heading');

        heading.each(function () {

            let $this = $(this),
                parallax = $this.data('parallax'),
                image = $this.data('image'),
                bgText = $this.data('background-text'),
                img = $this.children('.ah-image'),
                title = $this.children('.ah-title');

            if (parallax == true) {

                $this.addClass('will_anim')

                if (image == true) {

                    $this.addClass('with_image');

                    gsap.to(img, {
                        y: -100,
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top bottom',
                            scrub: true
                        }
                    })


                    gsap.to(title, {
                        y: 100,
                        scrollTrigger: {
                            trigger: $this,
                            start: 'top bottom',
                            scrub: true
                        }
                    })




                } else {

                    $this.addClass('no-image');

                    if (bgText != null) {

                        $this.prepend('<div class="heading-bg-text">' + bgText + '</div>')

                        gsap.fromTo($this.find('.heading-bg-text'), {
                            x: '50%'
                        }, {
                            x: '-10%',
                            scrollTrigger: {
                                trigger: $this,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.1,
                                markers: false

                            }

                        })


                    }


                }



            }

        })

    }

    /* Heading */


    barba.init({
        debug: true,
        transitions: [
            {
                name: 'main-transition',
                from: {
                    namespace: [
                                    'demo-main'
                                ]
                },
                to: {
                    namespace: [
                                    'demo-light'
                                ]
                },
                leave() {
                    return new Promise(function (resolve, reject) {


                        let mainOut = gsap.timeline({
                            onComplete: function () {
                                resolve();

                            }
                        });


                        mainOut.fromTo('.lph-image-3', 1, {
                            y: '0%'
                        }, {
                            y: '100%',
                            ease: 'power3.in'
                        }, .4)

                        mainOut.fromTo('.lph-image-2, .lph-image-4', 1, {
                            y: '0%'
                        }, {
                            y: '100%',
                            ease: 'power3.in'
                        }, .2)

                        mainOut.fromTo('.lph-image-1, .lph-image-5', 1, {
                            y: '25%'
                        }, {
                            y: '100%',
                            ease: 'power3.in'
                        }, 0)

                        mainOut.fromTo('.lsa_char', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in',


                        }, 0)

                        mainOut.fromTo('.lst_line', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in'
                        }, 0)

                        mainOut.fromTo('.ls-switcher span', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in',

                        }, 0)





                    })
                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        let demoIn = gsap.timeline({
                            onStart: function () {
                                resolve();
                            }
                        });

                        demoIn.fromTo('.lph-headline', 1.5, {
                            top: '45%'
                        }, {
                            top: '40%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lph_char', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lpd_line span', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 1)

                        demoIn.fromTo('.landing-page-head', 1.5, {
                            height: '100vh'
                        }, {
                            height: '90vh',
                            stagger: 0.02,
                            ease: 'power2.inOut'
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch', 1.5, {
                            width: 0,
                            height: 0
                        }, {
                            width: 150,
                            height: 150,
                            ease: 'power2.inOut',
                            onComplete: function () {

                            }
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch a', .5, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: 'power2.inOut'
                        }, 2.5)


                        demoIn.fromTo('.landing-menu a', 1, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.1,
                            ease: 'power2.out',
                            onStart: function () {


                                gsap.set('.landing-menu', {
                                    visibility: 'visible'
                                })
                            }
                        }, 1)




                    })

                },



            }, {
                name: 'main-transition',
                from: {
                    namespace: [
                                    'demo-main'
                                ]
                },
                to: {
                    namespace: [
                                    'demo-dark'
                                ]
                },
                leave() {
                    return new Promise(function (resolve, reject) {


                        let mainOut = gsap.timeline({
                            onComplete: function () {
                                resolve();

                            }
                        });

                        mainOut.fromTo('.lph-overlay', 1, {
                            height: '0%'
                        }, {
                            height: '100%',
                            ease: 'power3.inOut'
                        }, .6)



                        mainOut.fromTo('.lph-image-3', 1, {
                            y: '0%'
                        }, {
                            y: '100%',
                            ease: 'power3.in'
                        }, .4)

                        mainOut.fromTo('.lph-image-2, .lph-image-4', 1, {
                            y: '0%'
                        }, {
                            y: '100%',
                            ease: 'power3.in',
                            onComplete: function () {


                                $('.landing-header').addClass('dark')

                            }
                        }, .2)

                        mainOut.fromTo('.lph-image-1, .lph-image-5', 1, {
                            y: '25%'
                        }, {
                            y: '100%',
                            ease: 'power3.in'
                        }, 0)

                        mainOut.fromTo('.lsa_char', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in',


                        }, 0)

                        mainOut.fromTo('.lst_line', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in'
                        }, 0)

                        mainOut.fromTo('.ls-switcher span', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: .05,
                            ease: 'power2.in',

                        }, 0)





                    })
                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        let demoIn = gsap.timeline({
                            onStart: function () {
                                resolve();
                            }
                        });

                        demoIn.fromTo('.lph-headline', 1.5, {
                            top: '45%'
                        }, {
                            top: '40%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lph_char', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lpd_line span', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 1)

                        demoIn.fromTo('.landing-page-head', 1.5, {
                            height: '100vh'
                        }, {
                            height: '90vh',
                            stagger: 0.02,
                            ease: 'power2.inOut'
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch', 1.5, {
                            width: 0,
                            height: 0
                        }, {
                            width: 150,
                            height: 150,
                            ease: 'power2.inOut',
                            onComplete: function () {

                            }
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch a', .5, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: 'power2.inOut'
                        }, 2.5)


                        demoIn.fromTo('.landing-menu a', 1, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.1,
                            ease: 'power2.out',
                            onStart: function () {


                                gsap.set('.landing-menu', {
                                    visibility: 'visible'
                                })
                            }
                        }, 1)




                    })

                },



            }, {
                name: 'light-dark',
                from: {
                    namespace: [
                                    'demo-light'
                                ]
                },
                to: {
                    namespace: [
                                    'demo-dark'
                                ]
                },
                leave() {
                    return new Promise(function (resolve, reject) {

                        let lightToDark = gsap.timeline({
                            onStart: function () {

                                gsap.set('.lph-overlay', {
                                    zIndex: 5,
                                    background: '#191b1d'
                                })

                            },
                            onComplete: function () {

                                resolve();


                            }
                        });

                        lightToDark.to(window, .7, {
                            scrollTo: 0,
                            ease: 'power3.In',
                            onComplete: function () {


                                $('.landing-header').addClass('dark')
                            }
                        }, 0)

                        lightToDark.fromTo('.lph-overlay', 1, {
                            height: '0%'
                        }, {
                            height: '100%',
                            ease: 'power3.inOut'
                        }, 0)





                    })
                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        let demoIn = gsap.timeline({
                            onStart: function () {
                                resolve();
                            }
                        });

                        demoIn.fromTo('.lph-headline', 1.5, {
                            top: '45%'
                        }, {
                            top: '40%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lph_char', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lpd_line span', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 1)

                        demoIn.fromTo('.landing-page-head', 1.5, {
                            height: '100vh'
                        }, {
                            height: '90vh',
                            stagger: 0.02,
                            ease: 'power2.inOut'
                        }, 2.5)

                        demoIn.fromTo('.lph-layout-switch', 1.5, {
                            width: 0,
                            height: 0
                        }, {
                            width: 150,
                            height: 150,
                            ease: 'power2.inOut',
                            onComplete: function () {

                            }
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch a', .5, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: 'power2.inOut'
                        }, 2.5)



                    })

                },



            }, {
                name: 'light-dark',
                from: {
                    namespace: [
                                    'demo-dark'
                                ]
                },
                to: {
                    namespace: [
                                    'demo-light'
                                ]
                },
                leave() {
                    return new Promise(function (resolve, reject) {

                        let lightToDark = gsap.timeline({
                            onStart: function () {

                                gsap.set('.lph-overlay', {
                                    zIndex: 5,
                                    background: '#ebebeb'
                                })

                            },
                            onComplete: function () {

                                resolve();


                            }
                        });

                        lightToDark.to(window, .7, {
                            scrollTo: 0,
                            ease: 'power3.In',
                            onComplete: function () {


                                $('.landing-header').removeClass('dark')
                            }
                        }, 0)

                        lightToDark.fromTo('.lph-overlay', 1, {
                            height: '0%'
                        }, {
                            height: '100%',
                            ease: 'power3.inOut'
                        }, 0)





                    })
                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        let demoIn = gsap.timeline({
                            onStart: function () {
                                resolve();
                            }
                        });

                        demoIn.fromTo('.lph-headline', 1.5, {
                            top: '45%'
                        }, {
                            top: '40%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lph_char', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 0)

                        demoIn.fromTo('.lpd_line span', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: 0.02,
                            ease: 'power2.out'
                        }, 1)

                        demoIn.fromTo('.landing-page-head', 1.5, {
                            height: '100vh'
                        }, {
                            height: '90vh',
                            stagger: 0.02,
                            ease: 'power2.inOut'
                        }, 2.5)

                        demoIn.fromTo('.lph-layout-switch', 1.5, {
                            width: 0,
                            height: 0
                        }, {
                            width: 150,
                            height: 150,
                            ease: 'power2.inOut',
                            onComplete: function () {

                            }
                        }, 1)

                        demoIn.fromTo('.lph-layout-switch a', .5, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: 'power2.inOut'
                        }, 2.5)



                    })

                },



            }, {
                name: 'light-dark',
                from: {
                    namespace: [
                                    'demo-dark',
                                    'demo-light'
                                ]
                },
                to: {
                    namespace: [
                                    'demo-main'
                                ]
                },
                leave() {
                    return new Promise(function (resolve, reject) {

                        let lightToDark = gsap.timeline({
                            onStart: function () {

                                gsap.set('.lph-overlay', {
                                    zIndex: 5,
                                    background: '#ebebeb'
                                })

                            },
                            onComplete: function () {

                                resolve();


                            }
                        });

                        $('.landing-header').removeClass('dark')


                        lightToDark.fromTo('.lph-overlay', 1, {
                            height: '0%'
                        }, {
                            height: '100%',
                            ease: 'power3.inOut'
                        }, 0)





                    })
                },
                enter() {

                    return new Promise(function (resolve, reject) {

                        var lpOpen = gsap.timeline({
                            onStart: function () {
                                gsap.set('.lph-headline', {
                                    display: 'none',
                                })
                                resolve();
                            }
                        });

                        lpOpen.fromTo('.landing-menu a', 1, {
                            y: '0%'
                        }, {
                            y: '-100%',
                            stagger: 0.1,
                            ease: 'power2.out',

                        }, 0)


                        lpOpen.fromTo('.landing-logo img', 1, {
                            y: '100%'
                        }, {
                            y: '0%',
                            ease: 'power2.out'
                        }, 0)

                        lpOpen.fromTo('.header-cta-but', 1, {
                            x: -30,
                            opacity: 0
                        }, {
                            x: 0,
                            opacity: 1,
                            ease: 'power2.out'
                        }, .3)


                        lpOpen.fromTo('.lst_line', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: .05,
                            ease: 'power2.out',
                            onStart: function () {

                                gsap.set('.layout-switch', {
                                    visibility: 'visible'
                                })

                            }
                        }, .5)

                        lpOpen.fromTo('.lsa_char', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: .05,
                            ease: 'power2.out',
                            onComplete: function () {

                            }

                        }, .5)

                        lpOpen.fromTo('.ls-switcher span', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            stagger: .05,
                            ease: 'power2.out',

                        }, 1.5)


                        lpOpen.fromTo('.lph-image-3', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            ease: 'power3.out'
                        }, .5)

                        lpOpen.fromTo('.lph-image-2, .lph-image-4', 1.5, {
                            y: '100%'
                        }, {
                            y: '0%',
                            ease: 'power3.out'
                        }, .8)

                        lpOpen.fromTo('.lph-image-1, .lph-image-5', 1.5, {
                            y: '100%'
                        }, {
                            y: '25%',
                            ease: 'power3.out'
                        }, 1.1)





                    })

                },



            }]


    })


    $(window).on('load', function () {

        lphImages()

        landingPageHead();
        aliothImageCarousel()
        aliothPageNav()
        aliothScrollAnimations()
        aliothHeading()
        landingPageHolders();
        if ($('#page').hasClass('landing-main')) {
            landingPageOpen();
            cursorLoading.play();

        }



    });

    barba.hooks.leave((data) => {



    });

    barba.hooks.enter((data) => {


        lphImages()
        landingPageHead();
        aliothImageCarousel()
        aliothPageNav()
        aliothHeading()

        landingPageHolders();

    });

    barba.hooks.after((data) => {
        aliothScrollAnimations()
        ScrollTrigger.refresh()
        ScrollTrigger.update()

    });





}(jQuery));
