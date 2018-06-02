(function(t) {

    t.extend(t.fn, {

        syncOwl: function(e) {

            e = t.extend({

                    main: {

                        items: 1

                    },

                    sub: {

                        items: 4,

                        afterInit: function(e) {

                            e.data({

                                items: e.find('.owl-item').each(function(e) {

                                    t(this).data({

                                        owlItem: e

                                    })

                                })

                            }).data('items').first().addClass('active')

                        }

                    }

                }, e),

                e.main.afterAction = function(t) {

                    var e = this.currentItem,

                        a = t.data('sub');

                    if (!a || !a.length) {
                        return;
                    }

                    a.data('items').removeClass('active').eq(e).addClass('active'),

                        a.trigger('center', e)

                },

                e.sub.afterInit = function(e) {

                    e.data({

                        items: e.find('.owl-item').each(function(e) {

                            t(this).data({

                                owlItem: e

                            })

                        })

                    }).data('items').first().addClass('active')

                };

            var a = e.main.selector,

                i = e.sub.selector;

            return this.each(function() {

                var n = t(this),

                    o = n.find(a),

                    s = n.find(i);

                s.owlCarousel(e.sub).delegate('.owl-item', 'click', function(e) {

                        e.preventDefault(),

                            o.trigger('owl.goTo', t(this).data('owlItem'))

                    }).on({

                        center: function(e, a) {

                            var i = t(this),

                                n = i.data('owlCarousel').owl.visibleItems,

                                o = t.inArray(a, n) > -1 ? 1 : 0;

                            o ? a === n[n.length - 1] ? i.trigger('owl.goTo', n[1]) : a === n[0] && i.trigger('owl.goTo', a - 1) : a > n[n.length - 1] ? i.trigger('owl.goTo', a - n.length + 2) : (a - 1 === -1 && (a = 0), i.trigger('owl.goTo', a))

                        }

                    }),

                    o.data({

                        sub: s

                    }).owlCarousel(e.main)

            })

        }

    });

})(jQuery);
jQuery(function(t) {

    t('.shopImages').syncOwl({

        main: {

            selector: '.imgMainProduct',
            transitionStyle: 'fade',
            singleItem: true,
			pagination: false,
			navigation : false,

            items: 1

        },

        sub: {

            selector: '.imgsubproduct',
            items: 5,
			pagination: false,
			navigation : false,

            itemsTablet: [768, 4],

            itemsMobile: [479, 4]

        }

    })


});

