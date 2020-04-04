initMap = !1,
    function(e) {
        if ("undefined" == typeof jQuery) throw "Requires jQuery to be loaded first";
        e(jQuery)
    }(function(e) {
        "use strict";
        e("body").addClass("loader-loading");
        var t = function() {
            e("body").removeClass("loader-loading").off(".pageLoader"), e(window).trigger("resize").trigger("scroll")
        };
        e(window).on("load.pageLoader", t), setTimeout(t, 6e4), e("body").pexInit(), e(".menu-items .toggle-icon").on("click", function() {
            e(this).closest("li").toggleClass("active")
        }), e(".accordion-item .accordion-title").on("click", function() {
            e(this).closest(".accordion-item").toggleClass("active")
        }), e("[data-parallax]").each(function(t, i) {
            new Waypoint({
                element: i,
                handler: function() {
                    e(window).trigger("resize").trigger("scroll")
                },
                offset: "100%"
            })
        }), e(".flexslider").each(function(t, i) {
            var o = e(i),
                l = o.find(".flex-custom-navigation a"),
                a = o.find(".flex-custom-controls"),
                n = {
                    animation: "slide",
                    selector: ".slides > .slide",
                    controlsContainer: a,
                    customDirectionNav: l,
                    controlNav: !!a.length,
                    directionNav: !!l.length,
                    video: !0
                };
            o.flexslider(n)
        }), e(".owl-carousel").each(function(t, i) {
            var o = e(i),
                l = o.data(),
                a = {
                    nav: !!l.owlNav,
                    dots: !!l.owlDots,
                    margin: l.owlMargin || 0,
                    autoplay: !l.hasOwnProperty("autoplay") || l.autoplay,
                    autoplayHoverPause: !0,
                    center: !!l.owlCenter,
                    items: l.owlItems || 3,
                    loop: !l.hasOwnProperty("owlLoop") || !!l.owlLoop,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        1200: {
                            items: 3
                        }
                    }
                };
            if (l.owlResponsive) {
                for (var n = l.owlResponsive.split(";"), s = {
                        0: 1
                    }, r = [0, 768, 992, 1200], c = 0; c < r.length && c < n.length; c++) n[c] && (s[r[c]] = {
                    items: parseInt(n[c], 10)
                });
                a.responsive = s
            }
            if (l.owlSectionArrows) {
                var f = o.closest("section").find(".owl-custom-navigation");
                f.length ? (a.nav = !0, a.navContainer = f[0], a.navText = ['<i class="fas fa-angle-left" aria-hidden="true"></i>', '<i class="fas fa-angle-right" aria-hidden="true"></i>']) : a.nav = !1
            }
            o.owlCarousel(a)
        }), e("[data-waypoint-counter]").each(function(t, i) {
            e(i).waypoint({
                handler: function() {
                    e(i).prop("CounterValue", 0).animate({
                        CounterValue: e(i).data("waypointCounter")
                    }, {
                        duration: 2e3,
                        step: function(t) {
                            e(this).text(Math.ceil(t))
                        }
                    }), this.destroy()
                },
                offset: "bottom-in-view"
            })
        }), e(".stick-menu").each(function(t, i) {
            var o, l = e(i).offset().top + e(i).outerHeight(),
                a = e(window).scrollTop(),
                n = 0,
                s = !1,
                r = function(t, n) {
                    o && (clearTimeout(o), o = !1);
                    var r = e(i),
                        c = r.closest(".header"),
                        f = n || t && c.hasClass("sticked-menu");
                    c.removeClass("sticked-menu"), c.css("height", ""), l = r.offset().top + r.outerHeight(), f && a > l ? (c.height(c.height()).addClass("sticked-menu"), l -= r.outerHeight(), s = !0) : s = !1, t || e(window).trigger("resize", ["skipCheck"])
                };
            e(window).on("scroll", function() {
                var t = e(window).scrollTop(),
                    i = t - a;
                n = Math[i > 0 ? "max" : "min"](n, 0) + i, a = t, s && (a <= l || n >= 50) ? r(!1, !1) : !s && n <= -100 && r(!0, !0)
            }), e(window).on("resize", function(t, i) {
                a = e(window).scrollTop(), "skipCheck" !== i && (o = setTimeout(function() {
                    r(!0)
                }, 50))
            })
        }), e(".field-file-control").each(function(t, i) {
            var o = e(i);
            o.on("change.fileField", function() {
                var t = e(this).closest(".field-wrap"),
                    i = t.find(".field-file-old");
                t.find(".field-control").val(!this.value && i.length ? i.attr("data-value") || i.val() : this.value)
            }).triggerHandler("change.fileField");
            var l = o.closest("form");
            l && l.length && l.data("fileFields", (l.data("fileFields") || e([])).add(o)).off(".fileFields").on("reset.fileFields", function() {
                var t = e(this);
                setTimeout(function() {
                    t.data("fileFields").each(function(t, i) {
                        e(i).triggerHandler("change.fileField")
                    })
                })
            }), o.closest(".field-wrap").find(".field-control, .field-file-btn").on("click", function(e) {
                e.preventDefault(), o.trigger("click")
            });
            var a = !1,
                n = e(i).closest(".field-type-image");
            n.length && "undefined" != typeof FileReader && (n.find(".file-preview-image img") && n.addClass("has-file"), n.find(".file-preview").on("click", function(e) {
                e.preventDefault(), o.trigger("click")
            }), (a = new FileReader).onloadstart = function() {
                n.removeClass("has-file")
            }, a.onload = function(e) {
                n.find(".file-preview-image").empty().html('<img src="' + e.target.result + '" alt="" />'), n.addClass("has-file")
            }, o.on("change.imageField", function() {
                var e = this.files ? this.files : this.currentTarget.files;
                e.length ? a.readAsDataURL(e[0]) : n.removeClass("has-file").find(".file-preview-image").empty()
            }), l && l.length && l.data("imageFields", (l.data("imageFields") || e([])).add(o)).off(".imageFields").on("reset.imageFields", function() {
                var t = e(this);
                setTimeout(function() {
                    t.data("imageFields").each(function(t, i) {
                        e(i).find('input[type="file"]').triggerHandler("change.imageField")
                    })
                })
            }))
        }), e("[data-inview-showup]").each(function() {
            var t = e(this);
            t.addClass("inview-showup"), new Waypoint({
                element: t,
                handler: function() {
                    t.removeClass("inview-showup");
                    var e = t.data("inviewShowup");
                    e && t.addClass(e), this.destroy()
                },
                offset: "100%",
                group: "inview"
            })
        }), e(".shuffle-js").each(function(t, i) {
            var o = e(i),
                l = e(i).find(".shuffle-items"),
                a = new Shuffle(l[0], {
                    itemSelector: ".shuffle-item"
                }),
                n = o.find("[data-filter]");
            n.on("click", function(t) {
                t.preventDefault(), o.find(".shuffle-empty").css("display", "none");
                var i, l = e(this);
                try {
                    i = JSON.parse(l.data("filter"))
                } catch (e) {
                    i = l.data("filter")
                }
                n.removeClass("active"), l.addClass("active"), a.filter(i)
            }), a.on(Shuffle.EventType.LAYOUT, function() {
                e(window).trigger("resize"), o.find(".shuffle-empty").css("display", a.visibleItems ? "none" : "block")
            })
        });
        var i = ["min", "max"],
            o = function(t, i) {
                t.each(function(t, o) {
                    var l = e(o);
                    l.is("input, textarea, select") ? l.val(i) : l.html(i)
                })
            };
        e("[data-ui-range-slider]").each(function(t, l) {
            for (var a = e(l), n = a.find(".slider-container"), s = a.find("[data-slider-from]"), r = a.find("[data-slider-to]"), c = a.data(), f = {
                    range: !0,
                    values: [s.filter("input").first().val() || c.from || c.min || 0, r.filter("input").first().val() || c.to || c.max || 0],
                    create: function() {
                        o(s, f.values[0]), o(r, f.values[1])
                    },
                    slide: function(e, t) {
                        o(s, t.values[0]), o(r, t.values[1])
                    }
                }, d = 0; d < i.length; d++) c.hasOwnProperty(i[d]) && (f[i[d]] = c[i[d]]);
            n.slider(f)
        }), e("[data-preview-image]").each(function(t, i) {
            var o = e(i),
                l = e([]),
                a = e([]),
                n = o.data("previewImage") || "";
            e('[data-preview-image-source="' + n + '"]').on("mouseenter.previewImage", function() {
                var t = e(this);
                l.is(t) || (a.clearQueue().fadeOut(500, function() {
                    e(this).remove()
                }), l = t, a = t.clone(!0, !0).removeClass().off(".previewImage").css({
                    display: "none",
                    transition: "none"
                }).appendTo(o).fadeIn(500))
            }).first().triggerHandler("mouseenter")
        });
        var l = function() {
            e(window).scrollTop() > 0 ? e(".scroll-top").removeClass("disabled") : e(".scroll-top").addClass("disabled")
        };
        l(), e(window).on("scroll resize orientationchange focus", l), e(".scroll-top").on("click", function(t) {
            t.preventDefault(), e("html, body").animate({
                scrollTop: 0
            }, 1e3)
        }), e("ul.categories-list > li .open-sub-link").on("click", function(t) {
            t.preventDefault();
            var i = e(this).closest("li").toggleClass("active"),
                o = i.hasClass("active") ? i : e([]);
            i.closest("ul").find("> li.active").not(o).removeClass("active")
        }), initMap = function() {
            var t = new google.maps.StyledMapType([{
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }]
            }, {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#616161"
                }]
            }, {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#f5f5f5"
                }]
            }, {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#bdbdbd"
                }]
            }, {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }]
            }, {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#757575"
                }]
            }, {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#e5e5e5"
                }]
            }, {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#757575"
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#dadada"
                }]
            }, {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#616161"
                }]
            }, {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }, {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{
                    color: "#e5e5e5"
                }]
            }, {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{
                    color: "#eeeeee"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#c9c9c9"
                }]
            }, {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9e9e9e"
                }]
            }], {
                name: "Styled Map"
            });
            // e(".gmap").each(function(i, o) {
            //     var l = e(o).data(),
            //         a = {
            //             lat: l.lat,
            //             lng: l.lng
            //         },
            //         n = {
            //             lat: l.centerLat || a.lat - .002,
            //             lng: l.centerLng || a.lng + .003
            //         },
            //         s = new google.maps.Map(o, {
            //             center: n,
            //             zoom: l.zoom || 15,
            //             scrollwheel: !1,
            //             zoomControl: !0,
            //             zoomControlOptions: {
            //                 position: google.maps.ControlPosition.LEFT_CENTER
            //             },
            //             streetViewControl: !0,
            //             streetViewControlOptions: {
            //                 position: google.maps.ControlPosition.LEFT_BOTTOM
            //             },
            //             mapTypeControlOptions: {
            //                 mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"]
            //             }
            //         });
            //     new google.maps.Marker({
            //         position: a,
            //         map: s,
            //         icon: l.marker || "./images/parts/map-marker.png"
            //     }), s.mapTypes.set("styled_map", t), s.setMapTypeId("styled_map"), e(window).on("resize", function() {
            //         google.maps.event.trigger(s, "resize"), s.setCenter(n)
            //     })
            // })
        }, e(".chosen-field select.field-control").each(function(t, i) {
            e(i).chosen({
                width: "100%",
                disable_search_threshold: 10
            })
        }), e(".user-tickets .user-ticket .item-header").on("click", function(t) {
            t.preventDefault();
            var i = e(this).closest(".user-ticket"),
                o = e(this).closest(".user-tickets").find(".user-ticket").not(i);
            i.toggleClass("active"), o.removeClass("active")
        }), e(".user-orders .user-order .item-header").on("click", function(t) {
            t.preventDefault();
            var i = e(this).closest(".user-order"),
                o = e(this).closest(".user-orders").find(".user-order").not(i);
            i.toggleClass("active"), o.removeClass("active")
        })
    });