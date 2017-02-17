$(function() {    
    if (!window.ActiveXObject && !!document.createElement("canvas").getContext) {
        $.getScript("http://www.togic.com/js/cav.js", function() {
            var t = {width: 1.5,height: 1.5,depth: 10,segments: 12,slices: 6,xRange: 0.8,yRange: 0.1,zRange: 1,ambient: "#074980",diffuse: "#FFFFFF",speed: 0.0002};
            var G = {count: 2,xyScalar: 1,zOffset: 100,ambient: "#01a1ff",diffuse: "#00c4ff",speed: 0.001,gravity: 1200,dampening: 0.95,minLimit: 10,maxLimit: null,minDistance: 20,maxDistance: 400,autopilot: false,draw: false,bounds: CAV.Vector3.create(),step: CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))};
            var m = "canvas";
            var E = "svg";
            var x = {renderer: m};
            var i, n = Date.now();
            var L = CAV.Vector3.create();
            var k = CAV.Vector3.create();
            var z = document.getElementById("container");
            var w = document.getElementById("anit");
            var D, I, h, q, y;
            var g;
            var r;
            function C() {
                F();
                p();
                s();
                B();
                v();
                K(z.offsetWidth, z.offsetHeight);
                o()
            }
            function F() {
                g = new CAV.CanvasRenderer();
                H(x.renderer)
            }
            function H(N) {
                if (D) {
                    w.removeChild(D.element)
                }
                switch (N) {
                    case m:
                        D = g;
                        break
                }
                D.setSize(z.offsetWidth, z.offsetHeight);
                w.appendChild(D.element)
            }
            function p() {
                I = new CAV.Scene()
            }
            function s() {
                I.remove(h);
                D.clear();
                q = new CAV.Plane(t.width * D.width, t.height * D.height, t.segments, t.slices);
                y = new CAV.Material(t.ambient, t.diffuse);
                h = new CAV.Mesh(q, y);
                I.add(h);
                var N, O;
                for (N = q.vertices.length - 1; N >= 0; N--) {
                    O = q.vertices[N];
                    O.anchor = CAV.Vector3.clone(O.position);
                    O.step = CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
                    O.time = Math.randomInRange(0, Math.PIM2)
                }
            }
            function B() {
                var O, N;
                for (O = I.lights.length - 1; O >= 0; O--) {
                    N = I.lights[O];
                    I.remove(N)
                }
                D.clear();
                for (O = 0; O < G.count; O++) {
                    N = new CAV.Light(G.ambient, G.diffuse);
                    N.ambientHex = N.ambient.format();
                    N.diffuseHex = N.diffuse.format();
                    I.add(N);
                    N.mass = Math.randomInRange(0.5, 1);
                    N.velocity = CAV.Vector3.create();
                    N.acceleration = CAV.Vector3.create();
                    N.force = CAV.Vector3.create()
                }
            }
            function K(O, N) {
                D.setSize(O, N);
                CAV.Vector3.set(L, D.halfWidth, D.halfHeight);
                s()
            }
            function o() {
                i = Date.now() - n;
                u();
                M();
                requestAnimationFrame(o)
            }
            function u() {
                var Q, P, O, R, T, V, U, S = t.depth / 2;
                CAV.Vector3.copy(G.bounds, L);
                CAV.Vector3.multiplyScalar(G.bounds, G.xyScalar);
                CAV.Vector3.setZ(k, G.zOffset);
                for (R = I.lights.length - 1; R >= 0; R--) {
                    T = I.lights[R];
                    CAV.Vector3.setZ(T.position, G.zOffset);
                    var N = Math.clamp(CAV.Vector3.distanceSquared(T.position, k), G.minDistance, G.maxDistance);
                    var W = G.gravity * T.mass / N;
                    CAV.Vector3.subtractVectors(T.force, k, T.position);
                    CAV.Vector3.normalise(T.force);
                    CAV.Vector3.multiplyScalar(T.force, W);
                    CAV.Vector3.set(T.acceleration);
                    CAV.Vector3.add(T.acceleration, T.force);
                    CAV.Vector3.add(T.velocity, T.acceleration);
                    CAV.Vector3.multiplyScalar(T.velocity, G.dampening);
                    CAV.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
                    CAV.Vector3.add(T.position, T.velocity)
                }
                for (V = q.vertices.length - 1; V >= 0; V--) {
                    U = q.vertices[V];
                    Q = Math.sin(U.time + U.step[0] * i * t.speed);
                    P = Math.cos(U.time + U.step[1] * i * t.speed);
                    O = Math.sin(U.time + U.step[2] * i * t.speed);
                    CAV.Vector3.set(U.position, t.xRange * q.segmentWidth * Q, t.yRange * q.sliceHeight * P, t.zRange * S * O - S);
                    CAV.Vector3.add(U.position, U.anchor)
                }
                q.dirty = true
            }
            function M() {
                D.render(I)
            }
            function J(O) {
                var Q, N, S = O;
                var P = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.ambient.set(T);
                        N.ambientHex = N.ambient.format()
                    }
                };
                var R = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.diffuse.set(T);
                        N.diffuseHex = N.diffuse.format()
                    }
                };
                return {set: function() {
                    P(S[0]);
                    R(S[1])
                }}
            }
            function v() {
                window.addEventListener("resize", j)
            }
            function A(N) {
                CAV.Vector3.set(k, N.x, D.height - N.y);
                CAV.Vector3.subtract(k, L)
            }
            function j(N) {
                K(z.offsetWidth, z.offsetHeight);
                M()
            }
            C();
            J(["#1b7fe5", "#0963c0"]).set();
        });
    }
    
    var aRepbg = $('#content .repbg');
    $.each(aRepbg, function (i, o) {
        var _this = $(this);
        _this.data('pos', _this.offset().top);
        _this.data('sh', 'false');
    });
    
    function showbg(obj) {
        var aShbg = $('.repimg,.repatt', obj);
        aShbg.addClass('shbg');
    }
    
    $(window).on('scroll', function () {
        var t = $(this).scrollTop(), h = $(this).height(),
            isAll = true;
        
        $.each(aRepbg, function (i, o) {
            var _this = $(this);
            if (_this.data('sh') == 'false') {
                if (t + h > _this.data('pos') + 700) {
                    showbg(_this);
                    _this.data('sh', 'true');
                }
                isAll = false;
            }
        });
        if (isAll === true) {
            aRepbg = null;
            $(window).off();
        }
    });
    $('.cue').on('click', function () {$('html,body').animate({'scrollTop': $('.mpage').height()}, 1000);});
    
    $('.download').on('mouseover', '.downbtn,.qr', function () {
        $('.qr').show();
    });
    $('.download').on('mouseout', '.downbtn,.qr', function () {
        $('.qr').hide();
    });
    
    //盒子
    var timer1 = null;
    var timer2 = null;
    $(".nav .webox-layer-btn").on({"mouseenter": function () {
        var This = $(this);
        var oNav = This.parents(".nav");
        var oProductContainer = oNav.find(".product-container");
        
        clearTimeout(timer1);clearTimeout(timer2);
        oNav.addClass("toggle");
        This.addClass('hover');
        
        oProductContainer.stop();
        oProductContainer.animate({'height': 100}, {'duration': 400});
    }, "mouseleave": function () {
        var This = $(this);
        var oNav = This.parents(".nav");
        var oProductContainer = oNav.find(".product-container");
        clearTimeout(timer1);clearTimeout(timer2);
        timer1 = setTimeout(function () {
            oProductContainer.stop();
            oProductContainer.animate({'height': 0}, {'duration': 400,'complete': function () {
                oNav.removeClass("toggle");
                This.removeClass('hover');
            }});
        }, 200);
    }});
    
    $(".product-container").on({"mouseenter": function () {
        var This = $(this);
        var oNav = This.parents(".nav");
        clearTimeout(timer1);clearTimeout(timer2);
        oNav.addClass("toggle");
        
        This.stop();
        This.animate({'height': 100}, {'duration': 400});
    }, "mouseleave": function () {
        var This = $(this);
        var oNav = This.parents(".nav");
        var oWeboxBtn = oNav.find("a.webox-layer-btn");
        
        clearTimeout(timer1);clearTimeout(timer2);
        timer2 = setTimeout(function () {
            This.stop();
            This.animate({'height': 0}, {'duration': 400, 'complete':function () {
                oNav.removeClass("toggle");
                oWeboxBtn.removeClass('hover');
            }});
        }, 200);
    }});
    
});