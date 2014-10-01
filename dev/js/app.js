(function() {
  var app;

  $(document).ready(function() {
    return app.init();
  });

  app = {
    init: function() {
      app.browsers();
      app.secretMenu.init();
      app.shares.init();
      app.tooltips();
      app.alert.init();
      app.validation.form($(".controls"));
      app.loading.init();
      app.gmap();
      app.scroll();
      return app.plugins.init();
    }
  };

  app.alert = {
    init: function() {
      app.alert.equidist();
      $(window).resize(function() {
        return app.alert.equidist();
      });
      if ($("[data-alert]").length) {
        $("a[data-alert]").live("click", function() {
          var element;
          element = $(this);
          app.alert.open({
            title: element.attr("data-title"),
            content: element.attr("data-content"),
            accept: true,
            cancel: true,
            callback_true: function() {
              return location.href = element.attr("href");
            }
          });
          return false;
        });
        return $("[data-alert]").each(function() {
          var element;
          element = $(this);
          if (!element.is("a") && !element.is("button")) {
            return app.alert.open({
              title: element.attr("data-title"),
              content: element.attr("data-content"),
              accept: true,
              cancel: true
            });
          }
        });
      }
    },
    open: function(options) {
      var alertclass, alertlightclass, buttons, close, content, html, title;
      title = "";
      content = "";
      buttons = "";
      close = "";
      if (options["static"] === true) {
        alertlightclass = '';
        options.close = false;
      } else {
        alertlightclass = ' false';
      }
      if (options.alertclass) {
        alertclass = "alert-" + options.alertclass;
      } else {
        alertclass = "alert-default";
      }
      if (options.title) {
        title = "<h2 class='alert-title'>" + options.title + "</h2>";
      }
      if (options.content) {
        content = "<div class='alert-content'>" + options.content + "</div>";
      }
      if (options.close === void 0) {
        options.close = true;
      }
      if (options.close === true) {
        close = '<button class="alert-close false"><i class="fa fa-times"></i></button>';
      }
      if (options.buttons) {
        buttons += options.buttons + " ";
      }
      if (options.cancel === true) {
        buttons += '<button class="button false">Cancelar</button> ';
      }
      if (options.accept === true) {
        buttons += '<button class="button button-primary true">Aceptar</button> ';
      }
      if (buttons) {
        buttons = '<div class="alert-buttons">' + buttons + '</div>';
      }
      html = '<div class="alert ' + alertclass + ' in">' + '<div class="alert-light ' + alertlightclass + '"></div>' + '<div class="alert-box equidist">' + '<div class="alert-inner">' + close + title + content + buttons + '</div>' + '</div>' + '</div>';
      $("body").append(html);
      $("body").addClass("alert-in");
      app.alert.equidist();
      setTimeout(function() {
        return app.alert.equidist();
      }, 100);
      return $(".alert .true, .alert .false").unbind("click").bind("click", function() {
        var alertorigin;
        alertorigin = $(this).closest(".alert");
        alertorigin.addClass("out");
        setTimeout(function() {
          alertorigin.remove();
          return $("body").removeClass("alert-in");
        }, 200);
        if ($(this).hasClass("true") && options.callback_true) {
          options.callback_true();
        }
        if ($(this).hasClass("false") && options.callback_false) {
          options.callback_false();
        }
        return true;
      });
    },
    closeall: function() {
      $(".alert").addClass("out");
      return $("body").removeClass("alert-in");
    },
    removeall: function() {
      $(".alert").addClass("out");
      return setTimeout(function() {
        $(".alert").remove();
        return $("body").removeClass("alert-in");
      }, 200);
    },
    equidist: function() {
      return $(".equidist").each(function() {
        var _left, _this, _top;
        _this = $(this);
        _left = (_this.parent().width() - _this.width()) / 2;
        if (_left < 0) {
          _left = 0;
        }
        _top = (_this.parent().height() - _this.height()) / 2;
        if (_top < 0) {
          _top = 0;
        }
        return _this.css({
          left: _left + "px",
          top: _top + "px"
        });
      });
    },
    load: function(href, cssclass, callback) {
      if (cssclass == null) {
        cssclass = "default";
      }
      if (callback == null) {
        callback = false;
      }
      return $.ajax({
        url: href,
        type: 'GET'
      }).done(function(result) {
        app.alert.open({
          content: result,
          alertclass: cssclass
        });
        if (callback) {
          return callback();
        }
      });
    }
  };

  app.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  };

  app.browsers = function() {
    if (app.isMobile()) {
      $("body").addClass("is-mobile");
    }
    if ($.browser.msie || navigator.appVersion.indexOf('Trident/') !== -1) {
      $("body").addClass("is-ie");
      $("body").addClass("is-ie" + $.browser.version);
      if (parseInt($.browser.version) <= 7) {
        return app.alert.open({
          title: "Estás usando un navegador muy antiguo",
          content: "Actualiza tu navegador ahora y disfruta de una mejor experiencia en Falabella Novios.",
          buttons: "<a href='http://browsehappy.com/?locale=es' target='_blank' class='button button-primary button-big'>Actualizar ahora</a>",
          "static": true
        });
      }
    }
  };

  app.cookie = {
    create: function(name, value, days) {
      var date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      return document.cookie = name + "=" + value + expires + "; path=/";
    },
    read: function(name) {
      var c, ca, i, nameEQ;
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
        i++;
      }
      return null;
    },
    "delete": function(name) {
      return app.cookie.create(name, "", -1);
    }
  };

  app.formatNumber = function(n) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      if (i && c !== "," && !((a.length - i) % 3)) {
        return "." + c;
      } else {
        return c;
      }
    });
  };

  app.gmap = function() {
    if ($(".map").length) {
      return $(".map").each(function() {
        var blackandwhite, infowindow, m, map, mapOptions, map_lat, map_lng, map_zoom, markers;
        m = $(this);
        markers = new Array();
        infowindow = false;
        map_zoom = parseInt(m.attr("data-zoom"));
        map_lat = m.attr("data-lat");
        map_lng = m.attr("data-lng");
        blackandwhite = [
          {
            featureType: "all",
            elementType: "all",
            stylers: [
              {
                saturation: -100
              }
            ]
          }
        ];
        mapOptions = {
          zoom: map_zoom,
          center: new google.maps.LatLng(map_lat, map_lng),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          scrollwheel: false,
          streetViewControl: false,
          styles: blackandwhite
        };
        if (!m.find(".map-gmap").length) {
          m.append('<div class="map-gmap"></div>');
        }
        map = new google.maps.Map(m.find(".map-gmap")[0], mapOptions);
        m.append('' + '<div class="map-zoom">' + '<button class="map-zoom-button map-zoom-in  button button-small button-dark"><i class="fa fa-plus"></i></button>' + '<button class="map-zoom-button map-zoom-out button button-small button-dark"><i class="fa fa-minus"></i></button>' + '</div>');
        m.find(".map-zoom-in").click(function() {
          map.setZoom(map.getZoom() + 1);
          return false;
        });
        m.find(".map-zoom-out").click(function() {
          map.setZoom(map.getZoom() - 1);
          return false;
        });
        return m.find(".map-marker").each(function() {
          var content, marker;
          marker = new google.maps.Marker({
            position: new google.maps.LatLng($(this).attr("data-lat"), $(this).attr("data-lng")),
            animation: google.maps.Animation.DROP,
            map: map
          });
          content = "<div class='map-infowindow'>" + $(this).html() + "</div>";
          marker['content'] = content;
          marker['value'] = $(this).val();
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow({
              content: "x"
            });
          }
          google.maps.event.addListener(map, 'click', function() {
            return infowindow.close();
          });
          if ($(this).html().length) {
            google.maps.event.addListener(marker, "click", function() {
              infowindow.close();
              infowindow.setContent(content);
              return infowindow.open(map, this);
            });
          }
          return markers.push(marker);
        });
      });
    }
  };

  app.loading = {
    init: function() {
      if ($("[data-loading]").length) {
        return app.loading["in"]();
      }

      /*
      		app.loading.in()
      		$("body").imagesLoaded ->
      			app.loading.out()
       */
    },
    "in": function(element) {
      if (!element) {
        element = $("body");
      }
      return element.append('' + '<div class="loading">' + '<div class="loading-icon">' + '<div class="loading-icon-circle"><div></div></div>' + '</div>' + '</div>');
    },
    out: function() {
      $(".loading").addClass("out");
      setTimeout(function() {
        return $(".loading").remove();
      }, 500);
      return $("body").addClass("loaded");
    }
  };

  app.plugins = {
    init: function() {

      /*
      		 *  Autosize
      		$("textarea").autosize
      			append: "\n"
      
      		 * Isotope
      		if $(".isotope").length
      			isotope = $(".isotope").isotope()
      
      		 * Slider
      		setTimeout ->
      			if $(".royalSlider").length
      
      				$(".royalSlider").royalSlider
      					imageScaleMode: 'fit'
      					sliderDrag: false
      					arrowsNavAutoHide: false
      					loop: true
      					 *loopRewind: true
      					slidesSpacing: 0
      					transitionSpeed: 600
      					autoPlay:
      						enabled: true
      						pauseOnHover: true
      						delay: 4000
      					imageScalePadding: 0
      					addActiveClass: true
      					navigateByClick: false
      					autoHeight: true
      		,50
      
      		$(window).on "load", ->
      			app.plugins.relayout()
      
      		r_time = false
      		$(window).resize ->
      			app.plugins.relayout()
      			r = true
      			clearTimeout(r_time)
      			r_time = setTimeout ->
      				app.plugins.relayout()
      				r = false
      			,600
       */
    },
    relayout: function() {

      /*
      		app.alert.equidist()
      		if $(".isotope").length
      			$(".isotope").isotope
      				relayout: true
      	
      		$("body").imagesLoaded ->
      			app.alert.equidist()
      			app.alert.equidist()
      			if $(".isotope").length
      				$(".isotope").isotope
      					relayout: true
       */
    }
  };

  app.scroll = function() {
    var scroll_prev;
    if (!app.isMobile() && !$.browser.msie) {
      scroll_prev = 0;
      return $(window).scroll(function() {

        /*
        			scroll = $(window).scrollTop()
        			height_window = $(window).height()
        			height_body = $("body").height()
        			if scroll > 50 && scroll + height_window < height_body - 50
        				if scroll-scroll_prev > 0
        					$(".header-top-elements").addClass "hide"
        				else
        					$(".header-top-elements").removeClass "hide"
        					scroll_init = 0
        			else
        				$(".header-top-elements").removeClass "hide"
        			scroll_prev = scroll
         */
        if ($(".displayscroll").length) {
          return $(".displayscroll").each(function() {
            var element, element_height, element_top;
            element = $(this);
            element_top = element.offset().top;
            element_height = element.height();
            if (scroll + height_window > element_height + element_top) {
              return element.addClass("in");
            }
          });
        }
      });
    }
  };

  app.secretMenu = {
    init: function() {

      /*
      		url = document.URL
      		url_split = url.split("/")
      		name_page = url_split[url_split.length-1]
      		name_page_split = name_page.split("?") 
      		name_page_clear = name_page_split[0]
      		li = $(".secretmenu-content a[href='"+name_page_clear+"']").parent("li")
      		li.addClass "current-item"
      		li.parent().parent("li").addClass "current-item"
       */
      $(".secretmenu-content ul li a").each(function() {
        if ($(this).parent().find("ul").length) {
          if (!$(this).hasClass("secretmenu-parent")) {
            $(this).addClass("secretmenu-parent").prepend('<i class="fa fa-chevron-right"></i>');
            return $(this).parent().find("ul").prepend('<li><a href="#" class="secretmenu-back"><i class="fa fa-chevron-left"></i> Atrás</a></li>');
          }
        }
      });
      if ($(".secretmenu-content ul li.current-item a.secretmenu-parent").length) {
        app.secretMenu.openLvlDesktop($(".secretmenu-content ul li.current-item a.secretmenu-parent"));
      }
      $(".secretmenu-button").click(function() {
        if (!$("body").hasClass("secretmenu-in")) {
          return app.secretMenu.open($(".secretmenu-content").html());
        } else {
          return app.secretMenu.close();
        }
      });
      $(".secretmenu-container-front").click(function() {
        if ($("body").hasClass("secretmenu-in")) {
          return app.secretMenu.close();
        }
      });
      return true;
    },
    openLvlDesktop: function(element) {
      var ul;
      ul = element.parent().find("ul");
      ul.addClass("in");
      return ul.find("a.secretmenu-back").unbind("click").bind("click", function() {
        ul.addClass("out");
        setTimeout(function() {
          return ul.removeClass("in out");
        }, 700);
        return false;
      });
    },
    open: function(html, children, direction) {
      var container, length;
      if (children == null) {
        children = false;
      }
      if (direction == null) {
        direction = "left";
      }
      length = $(".secretmenu").length + 1;
      container = '<div class="secretmenu secretmenu-lvl-' + ($(".secretmenu").length + 1) + '"></div>';
      if (!children) {
        $(".secretmenu-container-back").html(container);
      } else {
        $(".secretmenu-container-back").append(container);
      }
      $(".secretmenu").eq(-1).html('<div class="secretmenu-inner">' + html + '</div>');
      $("body").addClass("secretmenu-in secretmenu-" + direction);
      $("body").attr("data-secretmenu-lvl", length);
      $(".secretmenu ul li a").each(function() {
        if ($(this).parent().find("ul").length) {
          if (!$(this).hasClass("secretmenu-parent")) {
            return $(this).addClass("secretmenu-parent").prepend('<i class="fa fa-chevron-right"></i>');
          }
        }
      });
      $(".secretmenu ul li a.secretmenu-parent").unbind("click").bind("click", function() {
        app.secretMenu.open("<ul>" + $(this).parent().find("ul").html() + "</ul>", true);
        return false;
      });
      return $(".secretmenu a.secretmenu-back").unbind("click").bind("click", function() {
        var lastmenu;
        lastmenu = parseInt($("body").attr("data-secretmenu-lvl"));
        $("body").attr("data-secretmenu-lvl", lastmenu - 1);
        $(".secretmenu.secretmenu-lvl-" + lastmenu).addClass("out");
        setTimeout(function() {
          return $(".secretmenu.secretmenu-lvl-" + lastmenu).remove();
        }, 700);
        return false;
      });
    },
    close: function() {
      $("body").addClass("secretmenu-out");
      return setTimeout(function() {
        $("body").removeClass("secretmenu-in secretmenu-out secretmenu-left secretmenu-right secretmenu-lvl-" + $("body").attr("data-secretmenu-lvl"));
        $("body").removeAttr("data-secretmenu-lvl");
        return $(".secretmenu").remove();
      }, 700);
    }
  };

  app.shares = {
    init: function() {
      return $(".share").click(function() {
        return app.shares.share($(this));
      });
    },
    share: function(element) {
      var share_img, share_text, share_url;
      share_url = encodeURIComponent(element.attr("data-url"));
      share_text = encodeURIComponent(element.attr("data-text"));
      share_img = encodeURIComponent(element.attr("data-img"));
      if (element.hasClass("share-facebook")) {
        app.shares.popupWindow("https://www.facebook.com/sharer/sharer.php?u=" + share_url, 500, 310);
      }
      if (element.hasClass("share-twitter")) {
        app.shares.popupWindow("https://twitter.com/intent/tweet?source=webclient&amp;text=" + share_text + "&amp;url=" + share_url, 500, 310);
      }
      if (element.hasClass("share-pinterest")) {
        app.shares.popupWindow("http://pinterest.com/pin/create/button/?url=" + share_url + "&media=" + share_img + "&description=" + share_text, 620, 310);
      }
      if (element.hasClass("share-googleplus")) {
        app.shares.popupWindow("https://plus.google.com/share?url=" + share_url, 500, 310);
      }
      if (element.hasClass("share-linkedin")) {
        app.shares.popupWindow("http://www.linkedin.com/shareArticle?mini=true&url=" + share_url + "&title=" + share_text + "&summary=" + share_text + "&source=" + share_url, 500, 420);
      }
      return false;
    },
    popupWindow: function(url, w, h) {
      var left, top;
      left = ($(window).width() / 2) - (w / 2);
      top = ($(window).height() / 2) - (h / 2);
      return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }
  };

  app.tooltips = function() {
    return $("[data-tooltip]").each(function() {
      var pos;
      pos = $(this).attr("data-tooltip-position");
      if (!pos) {
        pos = "bottom";
      }
      $(this).addClass("tooltip-parent");
      return $(this).append("<span class='tooltip tooltip-" + pos + "'><span class='tooltip-container'><span class='tooltip-triangle'></span><span class='tooltip-content'>" + $(this).attr("data-tooltip") + "</span></span></span>");
    });
  };

  app.tour = {
    init: function() {
      if (!app.isMobile()) {
        return setTimeout(function() {
          var i;
          if ($("[data-tour]").length) {
            $("[data-tour][data-tour-in]").each(function() {
              var element, tour_in;
              element = $(this);
              tour_in = element.attr("data-tour-in");
              $(tour_in).attr("data-tour", element.attr("data-tour"));
              if (element.attr("data-tour-content")) {
                $(tour_in).attr("data-tour-content", element.attr("data-tour-content"));
              }
              if (element.attr("data-tour-next")) {
                $(tour_in).attr("data-tour-next", element.attr("data-tour-next"));
              }
              element.remove();
              return element = $(tour_in);
            });
            i = 1;
            $("[data-tour]").each(function() {
              $(this).attr("data-tour-id", i);
              return i++;
            });
            app.tour.open($("[data-tour]").eq(0));
            return $(window).resize(function() {
              return setTimeout(function() {
                return app.tour.styles($(".tour-active"));
              }, 600);
            });
          }
        }, 1000);
      }
    },
    open: function(element) {
      var button_next, content, index, next, title, top;
      title = element.attr("data-tour");
      content = element.attr("data-tour-content");
      next = element.attr("data-tour-next");
      top = element.offset().top;
      index = parseInt(element.attr("data-tour-id"));
      if (next) {
        button_next = '<a href="' + next + '" class="button button-line tour-button-nextpage">Siguiente página <i class="fa fa-angle-right"></i></a>';
      } else {
        button_next = "";
      }
      if (!$(".tour").length) {
        $("body").append("" + '<div class="tour-container">' + '<div class="tour">' + '<div class="tour-bg tour-bg-top"></div>' + '<div class="tour-bg tour-bg-bottom"></div>' + '<div class="tour-bg tour-bg-left"></div>' + '<div class="tour-bg tour-bg-right"></div>' + '<a class="tour-close"><i class="fa fa-times"></i></a>' + '<div class="tour-tip">' + '</div>' + '</div>' + '</div>');
      }
      $(".tour .tour-tip").html("" + '<div class="tour-tip-inner">' + '<div class="tour-body">' + '<div class="tour-title">' + title + '</div>' + '<div class="tour-content">' + content + '</div>' + '</div>' + '<div class="tour-buttons">' + '<a href="#" class="button button-line tour-button tour-button-prev"><i class="fa fa-angle-left"></i></a> ' + '<a href="#" class="button button-line tour-button tour-button-next"><i class="fa fa-angle-right"></i></a> ' + button_next + '</div>' + '</div>');
      $("body").addClass("tour-in");
      $("html,body").animate({
        scrollTop: top - 100
      }, 500);
      $("[data-tour]").removeClass("tour-active");
      element.addClass("tour-active");
      app.tour.styles(element);
      if (index === 1) {
        $(".tour-button-prev").addClass("tour-button-inactive");
      }
      if (index === $("[data-tour]").length) {
        $(".tour-button-next").addClass("tour-button-inactive");
      }
      if ($("[data-tour]").length === 1) {
        $(".tour-button").remove();
      }
      $(".tour-button").click(function() {
        var id;
        id = parseInt($(".tour-active").attr("data-tour-id"));
        if (!$(this).is(".tour-button-inactive")) {
          if ($(this).is(".tour-button-next")) {
            console.log(id + 1);
            app.tour.open($("[data-tour-id='" + (id + 1) + "']"));
          }
          if ($(this).is(".tour-button-prev")) {
            app.tour.open($("[data-tour-id='" + (id - 1) + "']"));
          }
        }
        return false;
      });
      return $(".tour-close").click(function() {
        $(".tour-container").addClass("out");
        $("body").removeClass("tour-in");
        setTimeout(function() {
          return $(".tour-container").remove();
        }, 500);
        return false;
      });
    },
    styles: function(element) {
      var height, height_container, left, padding, top, width;
      padding = 10;
      width = element.outerWidth() + padding * 2;
      height = element.outerHeight() + padding * 2;
      top = element.offset().top - padding;
      left = element.offset().left - padding;
      height_container = $(document).height();
      $(".tour-container").css({
        height: height_container
      });
      return $(".tour").css({
        left: left,
        top: top,
        width: width,
        height: height
      });
    }
  };

  app.validation = {
    form: function(forms, callback) {
      if (callback == null) {
        callback = false;
      }
      return forms.each(function() {
        var form;
        form = $(this);
        form.find(".control .control-value").append("<div class='control-message'></div>");
        form.find("input,textarea,select").each(function() {
          var input;
          input = $(this);
          if ($(this).is("input")) {
            input.addClass("input-" + $(this).attr("type"));
          }
          if (input.is(":disabled")) {
            input.addClass("disabled");
          }
          return input.live("blur, change", function() {
            return app.validation.formInput(input);
          });
        });
        form.find(".input-checkbox, .input-radio").each(function() {
          if ($(this).is(":checked")) {
            return $(this).closest("label").addClass("checked");
          } else {
            return $(this).closest("label").removeClass("checked");
          }
        });
        form.find(".input-checkbox, .input-radio").change(function() {
          return form.find(".input-checkbox, .input-radio").each(function() {
            if ($(this).is(":checked")) {
              return $(this).closest("label").addClass("checked");
            } else {
              return $(this).closest("label").removeClass("checked");
            }
          });
        });
        form.find("input.number").each(function() {
          return $(this).removeClass("number").wrap("<div class='number'>").after("<div class='number-button number-more'>+</div><div class='number-button number-less'>-</div>");
        });
        form.find(".number .number-button").live("click", function() {
          var _input, _max, _min, _steps, _val;
          _input = $(this).parent().find("input");
          _max = parseInt(_input.attr("data-max"));
          _min = parseInt(_input.attr("data-min"));
          if (!_min) {
            _min = 1;
          }
          _steps = parseInt(_input.attr("data-steps"));
          if (!_steps) {
            _steps = 1;
          }
          _val = parseInt(_input.val());
          if ($(this).hasClass("number-more")) {
            _val = _val + _steps;
          }
          if ($(this).hasClass("number-less")) {
            _val = _val - _steps;
          }
          if (_val >= _max) {
            _val = _max;
          }
          if (_val <= _min) {
            _val = _min;
          }
          _input.val(_val);
          return false;
        });
        form.find(".number input").live("blur", function() {
          var _input, _max, _min, _val;
          _input = $(this);
          _max = parseInt(_input.attr("data-max"));
          _min = parseInt(_input.attr("data-min"));
          if (!_min) {
            _min = 1;
          }
          _val = parseInt(_input.val());
          if (_val >= _max) {
            _val = _max;
          }
          if (_val <= _min) {
            _val = _min;
          }
          _input.val(_val);
          return true;
        });
        return form.submit(function() {
          var diverror, send, top;
          send = true;
          form = $(this);
          form.find("input,textarea,select").each(function() {
            return app.validation.formInput($(this), true);
          });
          diverror = form.find(".control-error").eq(0);
          if (diverror.length) {
            send = false;
            top = diverror.offset().top - $(".header-top").height() - 25;
            $("html,body").animate({
              scrollTop: top
            });
            setTimeout(function() {
              return diverror.find("input").eq(0).focus();
            }, 500);
          }
          if (send === true) {
            if (callback) {
              callback();
              send = false;
            }
          }
          return send;
        });
      });
    },
    formInput: function(input, validateEmpty) {
      var control, controls, error, fvErrors, parent;
      if (validateEmpty == null) {
        validateEmpty = false;
      }
      parent = input.closest(".control-value");
      controls = input.closest(".controls");
      control = input.closest(".control");
      fvErrors = {
        "empty": "Este campo es requerido",
        "emptySelect": "Selecciona una opción",
        "emptyRadio": "Selecciona una opción",
        "emptyCheckbox": "Selecciona al menos una opción",
        "invalidEmail": "Email inválido",
        "invalidEmailRepeat": "El email ingresado no es igual al anterior",
        "invalidPass": "La contraseña debe ser mayor a 6 carácteres",
        "invalidPassRepeat": "La contraseña no es igual a la anterior",
        "invalidRut": "RUT inválido",
        "terms": "Debes aceptar los términos legales"
      };
      if (!input.hasClass("optional") && input.attr("type") !== "submit" && input.attr("type") !== "hidden" && input.attr("name")) {
        error = false;
        if (!input.val()) {
          if (validateEmpty === true) {
            if (input.is("select")) {
              return app.validation.formInputMessage(input, fvErrors.emptySelect);
            } else {
              return app.validation.formInputMessage(input, fvErrors.empty);
            }
          }
        } else {
          if (input.is("[type='email']")) {
            if (!app.validation.email(input, input.val())) {
              app.validation.formInputMessage(input, fvErrors.invalidEmail);
              error = true;
            }
          }
          if (input.is("[type='password']")) {
            if (input.val().length < 6) {
              app.validation.formInputMessage(input, fvErrors.invalidPass);
              error = true;
            }
          }
          if (input.is("[data-repeat]")) {
            if (input.val() !== controls.find("[name='" + input.attr("data-repeat") + "']").val()) {
              if (input.is("[type='password']")) {
                app.validation.formInputMessage(input, fvErrors.invalidPassRepeat);
                error = true;
              }
              if (input.is("[type='email']")) {
                app.validation.formInputMessage(input, fvErrors.invalidEmailRepeat);
                error = true;
              }
            }
          }
          if (input.is("[type='checkbox']") || input.is("[type='radio']")) {
            if (!controls.find("input[name='" + input.attr("name") + "']:checked").length) {
              if (input.is("[type='checkbox']")) {
                app.validation.formInputMessage(input, fvErrors.emptyCheckbox);
              }
              if (input.is("[type='radio']")) {
                app.validation.formInputMessage(input, fvErrors.emptyRadio);
              }
              if (input.is(".input-terms")) {
                app.validation.formInputMessage(input, fvErrors.terms);
              }
              error = true;
              parent.find(".control-error").removeClass("error");
            }
          }
          if (input.is(".rut")) {
            input.val($.Rut.formatear($.Rut.quitarFormato(input.val()), $.Rut.getDigito($.Rut.quitarFormato(input.val()))));
            if (!$.Rut.validar(input.val())) {
              app.validation.formInputMessage(input, fvErrors.invalidRut);
              error = true;
            }
          }
          if (error === false) {
            return app.validation.formInputMessage(input, false);
          }
        }
      }
    },
    formInputMessage: function(input, message) {
      var parent;
      if (message) {
        input.addClass("control-error");
        parent = input.closest(".control-value");
        parent.addClass("control-error");
        return parent.find(".control-message").text(message).addClass("in");
      } else {
        input.removeClass("control-error");
        parent = input.closest(".control-value");
        parent.removeClass("control-error");
        parent.find(".control-message").addClass("out");
        return setTimeout(function() {
          return parent.find(".control-message").removeClass("in out").text("");
        }, 500);
      }
    },
    email: function(elemento, valor) {
      if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)) {
        return true;
      } else {
        return false;
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,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Q0EsTUFBQSxHQUFTLEtBQUssQ0FBQyxPQUFOLENBQWMsZ0JBQWQsQ0FEVCxDQUFBO0FBQUEsUUFFQSxNQUFNLENBQUMsUUFBUCxDQUFnQixlQUFoQixDQUZBLENBQUE7ZUFHQSxNQUFNLENBQUMsSUFBUCxDQUFZLGtCQUFaLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsT0FBckMsQ0FBNkMsQ0FBQyxRQUE5QyxDQUF1RCxJQUF2RCxFQUpEO09BQUEsTUFBQTtBQU1DLFFBQUEsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsZUFBbEIsQ0FBQSxDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZCxDQURULENBQUE7QUFBQSxRQUVBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLGVBQW5CLENBRkEsQ0FBQTtBQUFBLFFBR0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxrQkFBWixDQUErQixDQUFDLFFBQWhDLENBQXlDLEtBQXpDLENBSEEsQ0FBQTtlQUlBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7aUJBQ1YsTUFBTSxDQUFDLElBQVAsQ0FBWSxrQkFBWixDQUErQixDQUFDLFdBQWhDLENBQTRDLFFBQTVDLENBQXFELENBQUMsSUFBdEQsQ0FBMkQsRUFBM0QsRUFEVTtRQUFBLENBQVgsRUFFQyxHQUZELEVBVkQ7T0FEaUI7SUFBQSxDQXhMbEI7QUFBQSxJQXlNQSxLQUFBLEVBQU8sU0FBQyxRQUFELEVBQVUsS0FBVixHQUFBO0FBQ04sTUFBQSxJQUFHLDJKQUEySixDQUFDLElBQTVKLENBQWlLLEtBQWpLLENBQUg7QUFDQyxlQUFPLElBQVAsQ0FERDtPQUFBLE1BQUE7QUFHQyxlQUFPLEtBQVAsQ0FIRDtPQURNO0lBQUEsQ0F6TVA7R0Fud0JELENBQUE7QUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG5cdGFwcC5pbml0KClcblxuYXBwID1cblxuXHRpbml0OiAtPlxuXG5cdFx0IyBCcm93c2Vyc1xuXHRcdGFwcC5icm93c2VycygpXG5cblx0XHQjIE1lbsO6XG5cdFx0YXBwLnNlY3JldE1lbnUuaW5pdCgpXG5cblx0XHQjIFNoYXJlc1xuXHRcdGFwcC5zaGFyZXMuaW5pdCgpXG5cblx0XHQjIFRvb2x0aXBzXG5cdFx0YXBwLnRvb2x0aXBzKClcblxuXHRcdCMgQWxlcnRhc1xuXHRcdGFwcC5hbGVydC5pbml0KClcblxuXHRcdCMgVmFsaWRhY2nDs24gZGUgZm9ybXVsYXJpb3Ncblx0XHRhcHAudmFsaWRhdGlvbi5mb3JtICQoXCIuY29udHJvbHNcIilcblxuXHRcdCMgTG9hZGluZ1xuXHRcdGFwcC5sb2FkaW5nLmluaXQoKVxuXG5cdFx0IyBNYXBhXG5cdFx0YXBwLmdtYXAoKVxuXG5cdFx0IyBFdmVudG9zIGVuIHNjcm9sbFxuXHRcdGFwcC5zY3JvbGwoKVxuXG5cdFx0IyBQbHVnaW5zXG5cdFx0YXBwLnBsdWdpbnMuaW5pdCgpXG5cbiM9aW5jbHVkZV90cmVlIGFwcFxuXG5cbmFwcC5hbGVydCA9XG5cblx0aW5pdDogLT5cblxuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cblx0XHQkKHdpbmRvdykucmVzaXplIC0+XG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXG5cblx0XHRpZiAkKFwiW2RhdGEtYWxlcnRdXCIpLmxlbmd0aFxuXG5cdFx0XHQkKFwiYVtkYXRhLWFsZXJ0XVwiKS5saXZlIFwiY2xpY2tcIiwgLT5cblx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0XHR0aXRsZTogZWxlbWVudC5hdHRyKFwiZGF0YS10aXRsZVwiKVxuXHRcdFx0XHRcdGNvbnRlbnQ6IGVsZW1lbnQuYXR0cihcImRhdGEtY29udGVudFwiKVxuXHRcdFx0XHRcdGFjY2VwdDogdHJ1ZVxuXHRcdFx0XHRcdGNhbmNlbDogdHJ1ZVxuXHRcdFx0XHRcdGNhbGxiYWNrX3RydWU6IC0+XG5cdFx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gZWxlbWVudC5hdHRyKFwiaHJlZlwiKVxuXHRcdFx0XHRmYWxzZVxuXG5cdFx0XHQkKFwiW2RhdGEtYWxlcnRdXCIpLmVhY2ggLT5cblx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0aWYgIWVsZW1lbnQuaXMoXCJhXCIpICYmICFlbGVtZW50LmlzKFwiYnV0dG9uXCIpXG5cdFx0XHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0XHRcdHRpdGxlOiBlbGVtZW50LmF0dHIoXCJkYXRhLXRpdGxlXCIpXG5cdFx0XHRcdFx0XHRjb250ZW50OiBlbGVtZW50LmF0dHIoXCJkYXRhLWNvbnRlbnRcIilcblx0XHRcdFx0XHRcdGFjY2VwdDogdHJ1ZVxuXHRcdFx0XHRcdFx0Y2FuY2VsOiB0cnVlXG5cblxuXHRvcGVuOiAob3B0aW9ucykgLT5cblxuXHRcdHRpdGxlID0gXCJcIlxuXHRcdGNvbnRlbnQgPSBcIlwiXG5cdFx0YnV0dG9ucyA9IFwiXCJcblx0XHRjbG9zZSA9IFwiXCJcblxuXHRcdGlmIG9wdGlvbnMuc3RhdGljID09IHRydWVcblx0XHRcdGFsZXJ0bGlnaHRjbGFzcyAgICA9ICcnXG5cdFx0XHRvcHRpb25zLmNsb3NlID0gZmFsc2Vcblx0XHRlbHNlXG5cdFx0XHRhbGVydGxpZ2h0Y2xhc3MgPSAnIGZhbHNlJ1xuXG5cdFx0aWYgb3B0aW9ucy5hbGVydGNsYXNzXG5cdFx0XHRhbGVydGNsYXNzID0gXCJhbGVydC1cIiArIG9wdGlvbnMuYWxlcnRjbGFzc1xuXHRcdGVsc2Vcblx0XHRcdGFsZXJ0Y2xhc3MgPSBcImFsZXJ0LWRlZmF1bHRcIlxuXG5cdFx0aWYgb3B0aW9ucy50aXRsZVxuXHRcdFx0dGl0bGUgPSBcIjxoMiBjbGFzcz0nYWxlcnQtdGl0bGUnPlwiICsgb3B0aW9ucy50aXRsZSArIFwiPC9oMj5cIlxuXG5cdFx0aWYgb3B0aW9ucy5jb250ZW50XG5cdFx0XHRjb250ZW50ID0gXCI8ZGl2IGNsYXNzPSdhbGVydC1jb250ZW50Jz5cIiArIG9wdGlvbnMuY29udGVudCArIFwiPC9kaXY+XCJcblxuXHRcdGlmIG9wdGlvbnMuY2xvc2UgPT0gdW5kZWZpbmVkXG5cdFx0XHRvcHRpb25zLmNsb3NlID0gdHJ1ZVxuXG5cdFx0aWYgb3B0aW9ucy5jbG9zZSA9PSB0cnVlXG5cdFx0XHRjbG9zZSA9ICc8YnV0dG9uIGNsYXNzPVwiYWxlcnQtY2xvc2UgZmFsc2VcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYnV0dG9uPidcblxuXHRcdGlmIG9wdGlvbnMuYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyArPSBvcHRpb25zLmJ1dHRvbnMgKyBcIiBcIlxuXG5cdFx0aWYgb3B0aW9ucy5jYW5jZWwgPT0gdHJ1ZVxuXHRcdFx0YnV0dG9ucyArPSAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBmYWxzZVwiPkNhbmNlbGFyPC9idXR0b24+ICdcblxuXHRcdGlmIG9wdGlvbnMuYWNjZXB0ID09IHRydWVcblx0XHRcdGJ1dHRvbnMgKz0gJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgdHJ1ZVwiPkFjZXB0YXI8L2J1dHRvbj4gJ1xuXG5cdFx0aWYgYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQtYnV0dG9uc1wiPicrYnV0dG9ucysnPC9kaXY+J1xuXG5cblx0XHRodG1sID1cblx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQgJythbGVydGNsYXNzKycgaW5cIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWxpZ2h0ICcrYWxlcnRsaWdodGNsYXNzKydcIj48L2Rpdj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWJveCBlcXVpZGlzdFwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydC1pbm5lclwiPicrXG5cdFx0XHRcdFx0XHRjbG9zZSArXG5cdFx0XHRcdFx0XHR0aXRsZSArXG5cdFx0XHRcdFx0XHRjb250ZW50ICtcblx0XHRcdFx0XHRcdGJ1dHRvbnMgK1xuXHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cblxuXHRcdCQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHQsMTAwXG5cblxuXHRcdCQoXCIuYWxlcnQgLnRydWUsIC5hbGVydCAuZmFsc2VcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+IFxuXG5cdFx0XHRhbGVydG9yaWdpbiA9ICQodGhpcykuY2xvc2VzdChcIi5hbGVydFwiKVxuXG5cdFx0XHRhbGVydG9yaWdpbi5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRhbGVydG9yaWdpbi5yZW1vdmUoKVxuXHRcdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWluXCIpXG5cdFx0XHQsMjAwXG5cblx0XHRcdGlmICQodGhpcykuaGFzQ2xhc3MoXCJ0cnVlXCIpICYmIG9wdGlvbnMuY2FsbGJhY2tfdHJ1ZVxuXHRcdFx0XHRvcHRpb25zLmNhbGxiYWNrX3RydWUoKVxuXG5cdFx0XHRpZiAkKHRoaXMpLmhhc0NsYXNzKFwiZmFsc2VcIikgJiYgb3B0aW9ucy5jYWxsYmFja19mYWxzZVxuXHRcdFx0XHRvcHRpb25zLmNhbGxiYWNrX2ZhbHNlKClcblxuXHRcdFx0cmV0dXJuIHRydWVcblxuXHRjbG9zZWFsbDogLT5cblx0XHQkKFwiLmFsZXJ0XCIpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1pblwiKVxuXG5cdHJlbW92ZWFsbDogLT5cblx0XHQkKFwiLmFsZXJ0XCIpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0JChcIi5hbGVydFwiKS5yZW1vdmUoKVxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1pblwiKVxuXHRcdCwyMDBcblxuXHRlcXVpZGlzdDogLT5cblx0XHQkKFwiLmVxdWlkaXN0XCIpLmVhY2ggLT5cblx0XHRcdF90aGlzID0gJCh0aGlzKVxuXHRcdFx0X2xlZnQgPSAoX3RoaXMucGFyZW50KCkud2lkdGgoKSAtIF90aGlzLndpZHRoKCkpIC8gMlxuXHRcdFx0X2xlZnQgPSAwIGlmIF9sZWZ0IDwgMFxuXHRcdFx0X3RvcCA9IChfdGhpcy5wYXJlbnQoKS5oZWlnaHQoKSAtIF90aGlzLmhlaWdodCgpKSAvIDJcblx0XHRcdF90b3AgPSAwIGlmIF90b3AgPCAwXG5cdFx0XHRfdGhpcy5jc3Ncblx0XHRcdCAgbGVmdDogX2xlZnQgKyBcInB4XCJcblx0XHRcdCAgdG9wOiBfdG9wICsgXCJweFwiXG5cblx0bG9hZDogKGhyZWYsY3NzY2xhc3M9XCJkZWZhdWx0XCIsY2FsbGJhY2s9ZmFsc2UpIC0+XG5cdFx0JC5hamF4KFxuXHRcdFx0dXJsOiBocmVmXG5cdFx0XHR0eXBlOiAnR0VUJ1xuXHRcdCkuZG9uZSAocmVzdWx0KSAtPlxuXHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0Y29udGVudDogcmVzdWx0XG5cdFx0XHRcdGFsZXJ0Y2xhc3M6IGNzc2NsYXNzXG5cdFx0XHRpZiBjYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjaygpXG5cblxuXG5cbmFwcC5pc01vYmlsZSA9IC0+XG5cdGlmIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuXHRcdHRydWVcblx0ZWxzZVxuXHRcdGZhbHNlXG5cbmFwcC5icm93c2VycyA9IC0+XG5cblx0IyBNb2JpbGVcblx0aWYgYXBwLmlzTW9iaWxlKClcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLW1vYmlsZVwiKVxuXG5cdCMgSUVcblx0aWYgJC5icm93c2VyLm1zaWUgfHwgbmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZignVHJpZGVudC8nKSE9LTFcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLWllXCIpXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1pZVwiKyQuYnJvd3Nlci52ZXJzaW9uKVxuXHRcdGlmIHBhcnNlSW50KCQuYnJvd3Nlci52ZXJzaW9uKSA8PSA3XG5cdFx0XHRhcHAuYWxlcnQub3BlblxuXHRcdFx0XHR0aXRsZTogXCJFc3TDoXMgdXNhbmRvIHVuIG5hdmVnYWRvciBtdXkgYW50aWd1b1wiXG5cdFx0XHRcdGNvbnRlbnQ6IFwiQWN0dWFsaXphIHR1IG5hdmVnYWRvciBhaG9yYSB5IGRpc2ZydXRhIGRlIHVuYSBtZWpvciBleHBlcmllbmNpYSBlbiBGYWxhYmVsbGEgTm92aW9zLlwiXG5cdFx0XHRcdGJ1dHRvbnM6IFwiPGEgaHJlZj0naHR0cDovL2Jyb3dzZWhhcHB5LmNvbS8/bG9jYWxlPWVzJyB0YXJnZXQ9J19ibGFuaycgY2xhc3M9J2J1dHRvbiBidXR0b24tcHJpbWFyeSBidXR0b24tYmlnJz5BY3R1YWxpemFyIGFob3JhPC9hPlwiXG5cdFx0XHRcdHN0YXRpYzogdHJ1ZVxuXG5cblxuYXBwLmNvb2tpZSA9IFxuXG5cdGNyZWF0ZTogKG5hbWUsIHZhbHVlLCBkYXlzKSAtPlxuXHRcdGlmIGRheXNcblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpXG5cdFx0XHRkYXRlLnNldFRpbWUgZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApXG5cdFx0XHRleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKClcblx0XHRlbHNlXG5cdFx0XHRleHBpcmVzID0gXCJcIlxuXHRcdGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIlxuXG5cdHJlYWQ6IChuYW1lKSAtPlxuXHRcdG5hbWVFUSA9IG5hbWUgKyBcIj1cIlxuXHRcdGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKVxuXHRcdGkgPSAwXG5cblx0XHR3aGlsZSBpIDwgY2EubGVuZ3RoXG5cdFx0XHRjID0gY2FbaV1cblx0XHRcdGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCkgIHdoaWxlIGMuY2hhckF0KDApIGlzIFwiIFwiXG5cdFx0XHRyZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpICBpZiBjLmluZGV4T2YobmFtZUVRKSBpcyAwXG5cdFx0XHRpKytcblx0XHRudWxsXG5cblx0ZGVsZXRlOiAobmFtZSkgLT5cblx0XHRhcHAuY29va2llLmNyZWF0ZSBuYW1lLCBcIlwiLCAtMVxuXG5cblxuXG5hcHAuZm9ybWF0TnVtYmVyID0gKG4pIC0+XG5cdG4udG9GaXhlZCgwKS5yZXBsYWNlIC8uL2csIChjLCBpLCBhKSAtPlxuXHRcdChpZiBpIGFuZCBjIGlzbnQgXCIsXCIgYW5kIG5vdCAoKGEubGVuZ3RoIC0gaSkgJSAzKSB0aGVuIFwiLlwiICsgYyBlbHNlIGMpXG5cblxuXG5cbmFwcC5nbWFwID0gLT5cblxuXHRpZiAkKFwiLm1hcFwiKS5sZW5ndGhcblxuXHRcdCQoXCIubWFwXCIpLmVhY2ggLT5cblxuXHRcdFx0bSA9ICQodGhpcylcblxuXHRcdFx0bWFya2VycyA9IG5ldyBBcnJheSgpXG5cdFx0XHRpbmZvd2luZG93ID0gZmFsc2VcblxuXHRcdFx0bWFwX3pvb20gPSBwYXJzZUludChtLmF0dHIoXCJkYXRhLXpvb21cIikpXG5cblx0XHRcdG1hcF9sYXQgPSBtLmF0dHIoXCJkYXRhLWxhdFwiKVxuXHRcdFx0bWFwX2xuZyA9IG0uYXR0cihcImRhdGEtbG5nXCIpXG5cblx0XHRcdGJsYWNrYW5kd2hpdGUgPSBbXG5cdFx0XHRcdGZlYXR1cmVUeXBlOiBcImFsbFwiXG5cdFx0XHRcdGVsZW1lbnRUeXBlOiBcImFsbFwiXG5cdFx0XHRcdHN0eWxlcnM6IFtcblx0XHRcdFx0XHRzYXR1cmF0aW9uOiAtMTAwXG5cdFx0XHRcdF1cblx0XHRcdF1cblxuXHRcdFx0bWFwT3B0aW9ucyA9XG5cdFx0XHRcdHpvb206IG1hcF96b29tXG5cdFx0XHRcdGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhtYXBfbGF0LG1hcF9sbmcpXG5cdFx0XHRcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcblx0XHRcdFx0ZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxuXHRcdFx0XHRzY3JvbGx3aGVlbDogZmFsc2Vcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHRcdHN0eWxlczogYmxhY2thbmR3aGl0ZVxuXG5cdFx0XHRpZiAhbS5maW5kKFwiLm1hcC1nbWFwXCIpLmxlbmd0aFxuXHRcdFx0XHRtLmFwcGVuZCAnPGRpdiBjbGFzcz1cIm1hcC1nbWFwXCI+PC9kaXY+J1xuXG5cblx0XHRcdG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobS5maW5kKFwiLm1hcC1nbWFwXCIpWzBdLCBtYXBPcHRpb25zKVxuXG5cblx0XHRcdG0uYXBwZW5kICcnK1xuXHQgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1hcC16b29tXCI+Jytcblx0ICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwibWFwLXpvb20tYnV0dG9uIG1hcC16b29tLWluICBidXR0b24gYnV0dG9uLXNtYWxsIGJ1dHRvbi1kYXJrXCI+PGkgY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9pPjwvYnV0dG9uPicrXG5cdCAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm1hcC16b29tLWJ1dHRvbiBtYXAtem9vbS1vdXQgYnV0dG9uIGJ1dHRvbi1zbWFsbCBidXR0b24tZGFya1wiPjxpIGNsYXNzPVwiZmEgZmEtbWludXNcIj48L2k+PC9idXR0b24+Jytcblx0ICAgICAgICAgICAgJzwvZGl2PidcblxuXHRcdFx0bS5maW5kKFwiLm1hcC16b29tLWluXCIpLmNsaWNrIC0+XG5cdFx0XHRcdG1hcC5zZXRab29tIG1hcC5nZXRab29tKCkgKyAxXG5cdFx0XHRcdGZhbHNlXG5cblx0XHRcdG0uZmluZChcIi5tYXAtem9vbS1vdXRcIikuY2xpY2sgLT5cblx0XHRcdFx0bWFwLnNldFpvb20gbWFwLmdldFpvb20oKSAtIDFcblx0XHRcdFx0ZmFsc2VcblxuXG5cblx0XHRcdCMgQ2FyZ2FyIGNvb3JkZW5hZGFzXG5cblx0XHRcdG0uZmluZChcIi5tYXAtbWFya2VyXCIpLmVhY2ggLT5cblxuXHRcdFx0XHRtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKFxuXHRcdFx0XHRcdHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCQodGhpcykuYXR0cihcImRhdGEtbGF0XCIpLCAkKHRoaXMpLmF0dHIoXCJkYXRhLWxuZ1wiKSlcblx0XHRcdFx0XHRhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QXG5cdFx0XHRcdFx0I2ljb246IFwiaW1nL21hcmtlci5wbmdcIlxuXHRcdFx0XHRcdG1hcDogbWFwXG5cdFx0XHRcdClcblx0XHRcdFxuXHRcdFx0XHRjb250ZW50ID1cblx0XHRcdFx0XHRcIjxkaXYgY2xhc3M9J21hcC1pbmZvd2luZG93Jz5cIitcblx0XHRcdFx0XHRcdCQodGhpcykuaHRtbCgpK1xuXHRcdFx0XHRcdFwiPC9kaXY+XCJcblxuXG5cdFx0XHRcdG1hcmtlclsnY29udGVudCddID0gY29udGVudFxuXHRcdFx0XHRtYXJrZXJbJ3ZhbHVlJ10gPSAkKHRoaXMpLnZhbCgpXG5cblx0XHRcdFx0aWYgIWluZm93aW5kb3dcblx0XHRcdFx0XHRpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coY29udGVudDpcInhcIilcblxuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lciBtYXAsICdjbGljaycsIC0+XG5cdFx0XHRcdFx0aW5mb3dpbmRvdy5jbG9zZSgpXG5cblx0XHRcdFx0aWYgJCh0aGlzKS5odG1sKCkubGVuZ3RoXG5cdFx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIgbWFya2VyLCBcImNsaWNrXCIsIC0+XG5cdFx0XHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKClcblx0XHRcdFx0XHRcdGluZm93aW5kb3cuc2V0Q29udGVudCBjb250ZW50XG5cdFx0XHRcdFx0XHRpbmZvd2luZG93Lm9wZW4gbWFwLCB0aGlzXG5cdFx0XHRcdFx0XHQjbWFwLnNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSlcblxuXHRcdFx0XHRtYXJrZXJzLnB1c2gobWFya2VyKVxuXG5cblxuXG5cblxuXG5cbmFwcC5sb2FkaW5nID1cblxuXHRpbml0OiAtPlxuXHRcdGlmICQoXCJbZGF0YS1sb2FkaW5nXVwiKS5sZW5ndGhcblx0XHRcdGFwcC5sb2FkaW5nLmluKClcblx0XHQjIyNcblx0XHRhcHAubG9hZGluZy5pbigpXG5cdFx0JChcImJvZHlcIikuaW1hZ2VzTG9hZGVkIC0+XG5cdFx0XHRhcHAubG9hZGluZy5vdXQoKVxuXHRcdCMjI1xuXG5cdGluOiAoZWxlbWVudCkgLT5cblx0XHRlbGVtZW50ID0gJChcImJvZHlcIikgaWYgIWVsZW1lbnRcblx0XHRlbGVtZW50LmFwcGVuZCAnJytcblx0XHRcdCc8ZGl2IGNsYXNzPVwibG9hZGluZ1wiPicrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwibG9hZGluZy1pY29uXCI+Jytcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImxvYWRpbmctaWNvbi1jaXJjbGVcIj48ZGl2PjwvZGl2PjwvZGl2PicrXG5cdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0JzwvZGl2Pidcblx0b3V0OiAtPlxuXHRcdCQoXCIubG9hZGluZ1wiKS5hZGRDbGFzcyBcIm91dFwiXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0JChcIi5sb2FkaW5nXCIpLnJlbW92ZSgpXG5cdFx0LDUwMFxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwibG9hZGVkXCIpXG5cblxuXG5cbmFwcC5wbHVnaW5zID1cblxuXHRpbml0OiAtPlxuXG5cdFx0IyMjXG5cdFx0IyAgQXV0b3NpemVcblx0XHQkKFwidGV4dGFyZWFcIikuYXV0b3NpemVcblx0XHRcdGFwcGVuZDogXCJcXG5cIlxuXG5cdFx0IyBJc290b3BlXG5cdFx0aWYgJChcIi5pc290b3BlXCIpLmxlbmd0aFxuXHRcdFx0aXNvdG9wZSA9ICQoXCIuaXNvdG9wZVwiKS5pc290b3BlKClcblxuXHRcdCMgU2xpZGVyXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0aWYgJChcIi5yb3lhbFNsaWRlclwiKS5sZW5ndGhcblxuXHRcdFx0XHQkKFwiLnJveWFsU2xpZGVyXCIpLnJveWFsU2xpZGVyXG5cdFx0XHRcdFx0aW1hZ2VTY2FsZU1vZGU6ICdmaXQnXG5cdFx0XHRcdFx0c2xpZGVyRHJhZzogZmFsc2Vcblx0XHRcdFx0XHRhcnJvd3NOYXZBdXRvSGlkZTogZmFsc2Vcblx0XHRcdFx0XHRsb29wOiB0cnVlXG5cdFx0XHRcdFx0I2xvb3BSZXdpbmQ6IHRydWVcblx0XHRcdFx0XHRzbGlkZXNTcGFjaW5nOiAwXG5cdFx0XHRcdFx0dHJhbnNpdGlvblNwZWVkOiA2MDBcblx0XHRcdFx0XHRhdXRvUGxheTpcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcblx0XHRcdFx0XHRcdHBhdXNlT25Ib3ZlcjogdHJ1ZVxuXHRcdFx0XHRcdFx0ZGVsYXk6IDQwMDBcblx0XHRcdFx0XHRpbWFnZVNjYWxlUGFkZGluZzogMFxuXHRcdFx0XHRcdGFkZEFjdGl2ZUNsYXNzOiB0cnVlXG5cdFx0XHRcdFx0bmF2aWdhdGVCeUNsaWNrOiBmYWxzZVxuXHRcdFx0XHRcdGF1dG9IZWlnaHQ6IHRydWVcblx0XHQsNTBcblxuXHRcdCQod2luZG93KS5vbiBcImxvYWRcIiwgLT5cblx0XHRcdGFwcC5wbHVnaW5zLnJlbGF5b3V0KClcblxuXHRcdHJfdGltZSA9IGZhbHNlXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZSAtPlxuXHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXHRcdFx0ciA9IHRydWVcblx0XHRcdGNsZWFyVGltZW91dChyX3RpbWUpXG5cdFx0XHRyX3RpbWUgPSBzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdGFwcC5wbHVnaW5zLnJlbGF5b3V0KClcblx0XHRcdFx0ciA9IGZhbHNlXG5cdFx0XHQsNjAwXG5cdFx0IyMjXG5cblxuXG5cdHJlbGF5b3V0OiAtPlxuXG5cdFx0IyMjXG5cdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRpZiAkKFwiLmlzb3RvcGVcIikubGVuZ3RoXG5cdFx0XHQkKFwiLmlzb3RvcGVcIikuaXNvdG9wZVxuXHRcdFx0XHRyZWxheW91dDogdHJ1ZVxuXHRcblx0XHQkKFwiYm9keVwiKS5pbWFnZXNMb2FkZWQgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdFx0aWYgJChcIi5pc290b3BlXCIpLmxlbmd0aFxuXHRcdFx0XHQkKFwiLmlzb3RvcGVcIikuaXNvdG9wZVxuXHRcdFx0XHRcdHJlbGF5b3V0OiB0cnVlXG5cdFx0IyMjXG5cblxuXG5cbmFwcC5zY3JvbGwgPSAtPlxuXG5cdGlmICFhcHAuaXNNb2JpbGUoKSAmJiAhJC5icm93c2VyLm1zaWVcblx0XHRzY3JvbGxfcHJldiA9IDBcblx0XHQkKHdpbmRvdykuc2Nyb2xsIC0+XG5cblx0XHRcdCMgRXNjb25kZXIgaGVhZGVyXG5cdFx0XHQjIyNcblx0XHRcdHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuXHRcdFx0aGVpZ2h0X3dpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKVxuXHRcdFx0aGVpZ2h0X2JvZHkgPSAkKFwiYm9keVwiKS5oZWlnaHQoKVxuXHRcdFx0aWYgc2Nyb2xsID4gNTAgJiYgc2Nyb2xsICsgaGVpZ2h0X3dpbmRvdyA8IGhlaWdodF9ib2R5IC0gNTBcblx0XHRcdFx0aWYgc2Nyb2xsLXNjcm9sbF9wcmV2ID4gMFxuXHRcdFx0XHRcdCQoXCIuaGVhZGVyLXRvcC1lbGVtZW50c1wiKS5hZGRDbGFzcyBcImhpZGVcIlxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0JChcIi5oZWFkZXItdG9wLWVsZW1lbnRzXCIpLnJlbW92ZUNsYXNzIFwiaGlkZVwiXG5cdFx0XHRcdFx0c2Nyb2xsX2luaXQgPSAwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCQoXCIuaGVhZGVyLXRvcC1lbGVtZW50c1wiKS5yZW1vdmVDbGFzcyBcImhpZGVcIlxuXHRcdFx0c2Nyb2xsX3ByZXYgPSBzY3JvbGxcblx0XHRcdCMjI1xuXG5cdFx0XHQjIE1vc3RyYXIgZW4gc2Nyb2xsXG5cblx0XHRcdGlmICQoXCIuZGlzcGxheXNjcm9sbFwiKS5sZW5ndGhcblx0XHRcdFx0JChcIi5kaXNwbGF5c2Nyb2xsXCIpLmVhY2ggLT5cblx0XHRcdFx0XHRlbGVtZW50ID0gJCh0aGlzKVxuXHRcdFx0XHRcdGVsZW1lbnRfdG9wID0gZWxlbWVudC5vZmZzZXQoKS50b3Bcblx0XHRcdFx0XHRlbGVtZW50X2hlaWdodCA9IGVsZW1lbnQuaGVpZ2h0KClcblx0XHRcdFx0XHRpZiBzY3JvbGwgKyBoZWlnaHRfd2luZG93ID4gZWxlbWVudF9oZWlnaHQgKyBlbGVtZW50X3RvcFxuXHRcdFx0XHRcdFx0ZWxlbWVudC5hZGRDbGFzcyBcImluXCJcblxuXG5cblxuYXBwLnNlY3JldE1lbnUgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIENvbXBhcmUgVVJMIGluIG1lbnVcblx0XHQjIyNcblx0XHR1cmwgPSBkb2N1bWVudC5VUkxcblx0XHR1cmxfc3BsaXQgPSB1cmwuc3BsaXQoXCIvXCIpXG5cdFx0bmFtZV9wYWdlID0gdXJsX3NwbGl0W3VybF9zcGxpdC5sZW5ndGgtMV1cblx0XHRuYW1lX3BhZ2Vfc3BsaXQgPSBuYW1lX3BhZ2Uuc3BsaXQoXCI/XCIpIFxuXHRcdG5hbWVfcGFnZV9jbGVhciA9IG5hbWVfcGFnZV9zcGxpdFswXVxuXHRcdGxpID0gJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgYVtocmVmPSdcIituYW1lX3BhZ2VfY2xlYXIrXCInXVwiKS5wYXJlbnQoXCJsaVwiKVxuXHRcdGxpLmFkZENsYXNzIFwiY3VycmVudC1pdGVtXCJcblx0XHRsaS5wYXJlbnQoKS5wYXJlbnQoXCJsaVwiKS5hZGRDbGFzcyBcImN1cnJlbnQtaXRlbVwiXG5cdFx0IyMjXG5cblx0XHQjIERlc2t0b3Bcblx0XHQkKFwiLnNlY3JldG1lbnUtY29udGVudCB1bCBsaSBhXCIpLmVhY2ggLT5cblx0XHRcdGlmICQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmxlbmd0aFxuXHRcdFx0XHRpZiAhJCh0aGlzKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpLnByZXBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nKVxuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLnByZXBlbmQgJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwic2VjcmV0bWVudS1iYWNrXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+IEF0csOhczwvYT48L2xpPidcblxuXHRcdGlmICQoXCIuc2VjcmV0bWVudS1jb250ZW50IHVsIGxpLmN1cnJlbnQtaXRlbSBhLnNlY3JldG1lbnUtcGFyZW50XCIpLmxlbmd0aFxuXHRcdFx0YXBwLnNlY3JldE1lbnUub3Blbkx2bERlc2t0b3AgJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgdWwgbGkuY3VycmVudC1pdGVtIGEuc2VjcmV0bWVudS1wYXJlbnRcIilcblxuXHRcdCMgTW9iaWxlXG5cblx0XHQkKFwiLnNlY3JldG1lbnUtYnV0dG9uXCIpLmNsaWNrIC0+XG5cdFx0XHRpZiAhJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LWluXCIpXG5cdFx0XHRcdGFwcC5zZWNyZXRNZW51Lm9wZW4gJChcIi5zZWNyZXRtZW51LWNvbnRlbnRcIikuaHRtbCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGFwcC5zZWNyZXRNZW51LmNsb3NlKClcblx0XHQkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWZyb250XCIpLmNsaWNrIC0+XG5cdFx0XHRpZiAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtaW5cIilcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUuY2xvc2UoKVxuXHRcdHRydWVcblxuXHRvcGVuTHZsRGVza3RvcDogKGVsZW1lbnQpIC0+XG5cdFx0dWwgPSBlbGVtZW50LnBhcmVudCgpLmZpbmQoXCJ1bFwiKVxuXHRcdHVsLmFkZENsYXNzKFwiaW5cIilcblx0XHR1bC5maW5kKFwiYS5zZWNyZXRtZW51LWJhY2tcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHR1bC5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHR1bC5yZW1vdmVDbGFzcyhcImluIG91dFwiKVxuXHRcdFx0LDcwMFxuXHRcdFx0ZmFsc2VcblxuXG5cdG9wZW46IChodG1sLGNoaWxkcmVuPWZhbHNlLGRpcmVjdGlvbj1cImxlZnRcIikgLT5cblxuXHRcdGxlbmd0aCAgICA9ICQoXCIuc2VjcmV0bWVudVwiKS5sZW5ndGggKyAxXG5cdFx0Y29udGFpbmVyID0gJzxkaXYgY2xhc3M9XCJzZWNyZXRtZW51IHNlY3JldG1lbnUtbHZsLScrKCQoXCIuc2VjcmV0bWVudVwiKS5sZW5ndGggKyAxKSsnXCI+PC9kaXY+J1xuXG5cdFx0aWYgIWNoaWxkcmVuXG5cdFx0XHQkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWJhY2tcIikuaHRtbChjb250YWluZXIpIFxuXHRcdGVsc2Vcblx0XHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItYmFja1wiKS5hcHBlbmQoY29udGFpbmVyKVxuXG5cdFx0JChcIi5zZWNyZXRtZW51XCIpLmVxKC0xKS5odG1sKCc8ZGl2IGNsYXNzPVwic2VjcmV0bWVudS1pbm5lclwiPicraHRtbCsnPC9kaXY+JylcblxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VjcmV0bWVudS1pbiBzZWNyZXRtZW51LVwiK2RpcmVjdGlvbilcblx0XHQkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiLGxlbmd0aClcblxuXHRcdCMgU2kgdGllbmUgaGlqb3Ncblx0XHQkKFwiLnNlY3JldG1lbnUgdWwgbGkgYVwiKS5lYWNoIC0+XG5cdFx0XHRpZiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5sZW5ndGhcblx0XHRcdFx0aWYgISQodGhpcykuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKVxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKS5wcmVwZW5kKCc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+JylcblxuXHRcdCMgQ2xpY2sgZW4gaXRlbSBkZSBtZW7DulxuXHRcdCQoXCIuc2VjcmV0bWVudSB1bCBsaSBhLnNlY3JldG1lbnUtcGFyZW50XCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPlxuXHRcdFx0YXBwLnNlY3JldE1lbnUub3BlbiBcIjx1bD5cIiskKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5odG1sKCkrXCI8L3VsPlwiLCB0cnVlXG5cdFx0XHRmYWxzZVxuXG5cdFx0JChcIi5zZWNyZXRtZW51IGEuc2VjcmV0bWVudS1iYWNrXCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPlxuXHRcdFx0bGFzdG1lbnUgPSBwYXJzZUludCAkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiKVxuXHRcdFx0JChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIiwobGFzdG1lbnUtMSkpXG5cdFx0XHQkKFwiLnNlY3JldG1lbnUuc2VjcmV0bWVudS1sdmwtXCIrbGFzdG1lbnUpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdCQoXCIuc2VjcmV0bWVudS5zZWNyZXRtZW51LWx2bC1cIitsYXN0bWVudSkucmVtb3ZlKClcblx0XHRcdCw3MDBcblx0XHRcdGZhbHNlXG5cblx0Y2xvc2U6IC0+XG5cblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtb3V0XCIpXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MgXCJzZWNyZXRtZW51LWluIHNlY3JldG1lbnUtb3V0IHNlY3JldG1lbnUtbGVmdCBzZWNyZXRtZW51LXJpZ2h0IHNlY3JldG1lbnUtbHZsLVwiKyQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiKVxuXHRcdFx0JChcIi5zZWNyZXRtZW51XCIpLnJlbW92ZSgpXG5cdFx0LDcwMFxuXG5cblxuXG5cbmFwcC5zaGFyZXMgPVxuXG5cdGluaXQ6IC0+XG5cdFx0JChcIi5zaGFyZVwiKS5jbGljayAtPlxuXHRcdFx0YXBwLnNoYXJlcy5zaGFyZSAkKHRoaXMpXG5cblx0c2hhcmU6IChlbGVtZW50KSAtPlxuXG5cdFx0c2hhcmVfdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQuYXR0cihcImRhdGEtdXJsXCIpKVxuXHRcdHNoYXJlX3RleHQgPSBlbmNvZGVVUklDb21wb25lbnQoZWxlbWVudC5hdHRyKFwiZGF0YS10ZXh0XCIpKVxuXHRcdHNoYXJlX2ltZyA9IGVuY29kZVVSSUNvbXBvbmVudChlbGVtZW50LmF0dHIoXCJkYXRhLWltZ1wiKSlcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1mYWNlYm9va1wiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT1cIitzaGFyZV91cmwsIDUwMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtdHdpdHRlclwiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD9zb3VyY2U9d2ViY2xpZW50JmFtcDt0ZXh0PVwiK3NoYXJlX3RleHQrXCImYW1wO3VybD1cIitzaGFyZV91cmwsIDUwMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtcGludGVyZXN0XCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHA6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9XCIrc2hhcmVfdXJsK1wiJm1lZGlhPVwiK3NoYXJlX2ltZytcIiZkZXNjcmlwdGlvbj1cIitzaGFyZV90ZXh0LCA2MjAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWdvb2dsZXBsdXNcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1saW5rZWRpblwiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD1cIitzaGFyZV91cmwrXCImdGl0bGU9XCIrc2hhcmVfdGV4dCtcIiZzdW1tYXJ5PVwiK3NoYXJlX3RleHQrXCImc291cmNlPVwiK3NoYXJlX3VybCwgNTAwLCA0MjBcblxuXHRcdGZhbHNlXG5cblx0cG9wdXBXaW5kb3c6ICh1cmwsIHcsIGgpIC0+XG5cdFx0bGVmdCA9ICggJCh3aW5kb3cpLndpZHRoKCkgLyAyICkgIC0gKHcgLyAyKVxuXHRcdHRvcCAgPSAoICQod2luZG93KS5oZWlnaHQoKSAvIDIgKSAtIChoIC8gMilcblx0XHRyZXR1cm4gd2luZG93Lm9wZW4odXJsLCBcIkNvbXBhcnRpclwiLCAndG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPScrdysnLCBoZWlnaHQ9JytoKycsIHRvcD0nK3RvcCsnLCBsZWZ0PScrbGVmdClcblxuXG5cblxuYXBwLnRvb2x0aXBzID0gLT5cblxuXHQkKFwiW2RhdGEtdG9vbHRpcF1cIikuZWFjaCAtPlxuXHRcdHBvcyA9ICQodGhpcykuYXR0cihcImRhdGEtdG9vbHRpcC1wb3NpdGlvblwiKVxuXHRcdHBvcyA9IFwiYm90dG9tXCIgaWYgIXBvc1xuXHRcdCQodGhpcykuYWRkQ2xhc3MgXCJ0b29sdGlwLXBhcmVudFwiXG5cdFx0JCh0aGlzKS5hcHBlbmQgXCI8c3BhbiBjbGFzcz0ndG9vbHRpcCB0b29sdGlwLVwiK3BvcytcIic+PHNwYW4gY2xhc3M9J3Rvb2x0aXAtY29udGFpbmVyJz48c3BhbiBjbGFzcz0ndG9vbHRpcC10cmlhbmdsZSc+PC9zcGFuPjxzcGFuIGNsYXNzPSd0b29sdGlwLWNvbnRlbnQnPlwiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS10b29sdGlwXCIpICsgXCI8L3NwYW4+PC9zcGFuPjwvc3Bhbj5cIlxuXG5cblxuXG5hcHAudG91ciA9IFxuXG5cdGluaXQ6IC0+XG5cblx0XHRpZiAhYXBwLmlzTW9iaWxlKClcblxuXHRcdFx0c2V0VGltZW91dCAtPlxuXG5cdFx0XHRcdGlmICQoXCJbZGF0YS10b3VyXVwiKS5sZW5ndGhcblxuXG5cdFx0XHRcdFx0JChcIltkYXRhLXRvdXJdW2RhdGEtdG91ci1pbl1cIikuZWFjaCAtPlxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0XHRcdHRvdXJfaW4gPSBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXItaW5cIilcblx0XHRcdFx0XHRcdCQodG91cl9pbikuYXR0ciBcImRhdGEtdG91clwiLCBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXJcIilcblx0XHRcdFx0XHRcdCQodG91cl9pbikuYXR0ciBcImRhdGEtdG91ci1jb250ZW50XCIsIGVsZW1lbnQuYXR0cihcImRhdGEtdG91ci1jb250ZW50XCIpIGlmIGVsZW1lbnQuYXR0cihcImRhdGEtdG91ci1jb250ZW50XCIpIFxuXHRcdFx0XHRcdFx0JCh0b3VyX2luKS5hdHRyIFwiZGF0YS10b3VyLW5leHRcIiwgZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyLW5leHRcIikgaWYgZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyLW5leHRcIikgXG5cdFx0XHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gJCh0b3VyX2luKVxuXG5cdFx0XHRcdFx0aSA9IDFcblx0XHRcdFx0XHQkKFwiW2RhdGEtdG91cl1cIikuZWFjaCAtPlxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyIFwiZGF0YS10b3VyLWlkXCIsIGlcblx0XHRcdFx0XHRcdGkrK1xuXG5cdFx0XHRcdFx0YXBwLnRvdXIub3BlbiAkKFwiW2RhdGEtdG91cl1cIikuZXEoMClcblxuXHRcdFx0XHRcdCQod2luZG93KS5yZXNpemUgLT5cblx0XHRcdFx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0XHRcdFx0YXBwLnRvdXIuc3R5bGVzICQoXCIudG91ci1hY3RpdmVcIilcblx0XHRcdFx0XHRcdCwgNjAwXG5cblx0XHRcdCwxMDAwXG5cblxuXHRvcGVuOiAoZWxlbWVudCkgLT5cblxuXHRcdHRpdGxlICAgPSBlbGVtZW50LmF0dHIgXCJkYXRhLXRvdXJcIlxuXHRcdGNvbnRlbnQgPSBlbGVtZW50LmF0dHIgXCJkYXRhLXRvdXItY29udGVudFwiXG5cdFx0bmV4dCAgICA9IGVsZW1lbnQuYXR0ciBcImRhdGEtdG91ci1uZXh0XCJcblx0XHR0b3AgICAgID0gZWxlbWVudC5vZmZzZXQoKS50b3Bcblx0XHRpbmRleCAgID0gcGFyc2VJbnQgZWxlbWVudC5hdHRyIFwiZGF0YS10b3VyLWlkXCJcblxuXHRcdGlmIG5leHRcblx0XHRcdGJ1dHRvbl9uZXh0ID0gJzxhIGhyZWY9XCInK25leHQrJ1wiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1saW5lIHRvdXItYnV0dG9uLW5leHRwYWdlXCI+U2lndWllbnRlIHDDoWdpbmEgPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT48L2E+J1xuXHRcdGVsc2Vcblx0XHRcdGJ1dHRvbl9uZXh0ID0gXCJcIlxuXHRcblx0XHRpZiAhJChcIi50b3VyXCIpLmxlbmd0aFxuXHRcdFx0JChcImJvZHlcIikuYXBwZW5kIFwiXCIrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1jb250YWluZXJcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91clwiPicrXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYmcgdG91ci1iZy10b3BcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJnIHRvdXItYmctYm90dG9tXCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1iZyB0b3VyLWJnLWxlZnRcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJnIHRvdXItYmctcmlnaHRcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzxhIGNsYXNzPVwidG91ci1jbG9zZVwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPicrXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItdGlwXCI+Jytcblx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+J1xuXG5cdFx0JChcIi50b3VyIC50b3VyLXRpcFwiKS5odG1sIFwiXCIrXG5cdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItdGlwLWlubmVyXCI+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJvZHlcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci10aXRsZVwiPicrdGl0bGUrJzwvZGl2PicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWNvbnRlbnRcIj4nK2NvbnRlbnQrJzwvZGl2PicrXG5cdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYnV0dG9uc1wiPicrXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLWxpbmUgdG91ci1idXR0b24gdG91ci1idXR0b24tcHJldlwiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtbGVmdFwiPjwvaT48L2E+ICcrXG5cdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLWxpbmUgdG91ci1idXR0b24gdG91ci1idXR0b24tbmV4dFwiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9hPiAnK1xuXHRcdFx0XHRcdGJ1dHRvbl9uZXh0K1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyBcInRvdXItaW5cIlxuXG5cdFx0JChcImh0bWwsYm9keVwiKS5hbmltYXRlXG5cdFx0XHRzY3JvbGxUb3A6IHRvcCAtIDEwMFxuXHRcdCw1MDBcblxuXHRcdCQoXCJbZGF0YS10b3VyXVwiKS5yZW1vdmVDbGFzcyBcInRvdXItYWN0aXZlXCJcblx0XHRlbGVtZW50LmFkZENsYXNzIFwidG91ci1hY3RpdmVcIlxuXG5cdFx0YXBwLnRvdXIuc3R5bGVzIGVsZW1lbnRcblxuXHRcdGlmIGluZGV4ID09IDFcblx0XHRcdCQoXCIudG91ci1idXR0b24tcHJldlwiKS5hZGRDbGFzcyhcInRvdXItYnV0dG9uLWluYWN0aXZlXCIpXG5cblx0XHRpZiBpbmRleCA9PSAkKFwiW2RhdGEtdG91cl1cIikubGVuZ3RoXG5cdFx0XHQkKFwiLnRvdXItYnV0dG9uLW5leHRcIikuYWRkQ2xhc3MoXCJ0b3VyLWJ1dHRvbi1pbmFjdGl2ZVwiKVxuXG5cdFx0aWYgJChcIltkYXRhLXRvdXJdXCIpLmxlbmd0aCA9PSAxXG5cdFx0XHQkKFwiLnRvdXItYnV0dG9uXCIpLnJlbW92ZSgpXG5cblx0XHQkKFwiLnRvdXItYnV0dG9uXCIpLmNsaWNrIC0+XG5cdFx0XHRpZCA9IHBhcnNlSW50ICQoXCIudG91ci1hY3RpdmVcIikuYXR0cihcImRhdGEtdG91ci1pZFwiKVxuXHRcdFx0aWYgISQodGhpcykuaXMoXCIudG91ci1idXR0b24taW5hY3RpdmVcIilcblx0XHRcdFx0aWYgJCh0aGlzKS5pcyhcIi50b3VyLWJ1dHRvbi1uZXh0XCIpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgaWQrMVxuXHRcdFx0XHRcdGFwcC50b3VyLm9wZW4gJChcIltkYXRhLXRvdXItaWQ9J1wiKyhpZCsxKStcIiddXCIpXG5cdFx0XHRcdGlmICQodGhpcykuaXMoXCIudG91ci1idXR0b24tcHJldlwiKVxuXHRcdFx0XHRcdGFwcC50b3VyLm9wZW4gJChcIltkYXRhLXRvdXItaWQ9J1wiKyhpZC0xKStcIiddXCIpXG5cdFx0XHRmYWxzZVxuXG5cdFx0JChcIi50b3VyLWNsb3NlXCIpLmNsaWNrIC0+XG5cdFx0XHQkKFwiLnRvdXItY29udGFpbmVyXCIpLmFkZENsYXNzIFwib3V0XCJcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzIFwidG91ci1pblwiXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdCQoXCIudG91ci1jb250YWluZXJcIikucmVtb3ZlKClcblx0XHRcdCw1MDBcblx0XHRcdGZhbHNlXG5cblxuXHRzdHlsZXM6IChlbGVtZW50KSAtPlxuXG5cdFx0cGFkZGluZyA9IDEwXG5cblx0XHR3aWR0aCAgID0gZWxlbWVudC5vdXRlcldpZHRoKCkgICsgcGFkZGluZyoyXG5cdFx0aGVpZ2h0ICA9IGVsZW1lbnQub3V0ZXJIZWlnaHQoKSArIHBhZGRpbmcqMlxuXHRcdHRvcCAgICAgPSBlbGVtZW50Lm9mZnNldCgpLnRvcCAgLSBwYWRkaW5nXG5cdFx0bGVmdCAgICA9IGVsZW1lbnQub2Zmc2V0KCkubGVmdCAtIHBhZGRpbmdcblx0XHRcblx0XHRoZWlnaHRfY29udGFpbmVyID0gJChkb2N1bWVudCkuaGVpZ2h0KClcblxuXHRcdCQoXCIudG91ci1jb250YWluZXJcIikuY3NzXG5cdFx0XHRoZWlnaHQ6IGhlaWdodF9jb250YWluZXJcblxuXHRcdCQoXCIudG91clwiKS5jc3Ncblx0XHRcdGxlZnQ6IGxlZnRcblx0XHRcdHRvcDogdG9wXG5cdFx0XHR3aWR0aDogd2lkdGhcblx0XHRcdGhlaWdodDogaGVpZ2h0XG5cblxuXG5cblxuYXBwLnZhbGlkYXRpb24gPVxuXG5cdGZvcm06IChmb3JtcyxjYWxsYmFjaz1mYWxzZSkgLT5cblxuXHRcdGZvcm1zLmVhY2ggLT5cblxuXHRcdFx0Zm9ybSA9ICQodGhpcylcblxuXHRcdFx0Zm9ybS5maW5kKFwiLmNvbnRyb2wgLmNvbnRyb2wtdmFsdWVcIikuYXBwZW5kKFwiPGRpdiBjbGFzcz0nY29udHJvbC1tZXNzYWdlJz48L2Rpdj5cIilcblxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLmVhY2ggLT5cblx0XHRcdFx0aW5wdXQgPSAkKHRoaXMpXHRcdFx0XHRcblx0XHRcdFx0aW5wdXQuYWRkQ2xhc3MoIFwiaW5wdXQtXCIrJCh0aGlzKS5hdHRyKFwidHlwZVwiKSApIGlmICQodGhpcykuaXMgXCJpbnB1dFwiXG5cdFx0XHRcdGlucHV0LmFkZENsYXNzKCBcImRpc2FibGVkXCIgKSBpZiBpbnB1dC5pcyhcIjpkaXNhYmxlZFwiKVxuXHRcdFx0XHRpbnB1dC5saXZlIFwiYmx1ciwgY2hhbmdlXCIsIC0+XG5cdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0KGlucHV0KVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIuaW5wdXQtY2hlY2tib3gsIC5pbnB1dC1yYWRpb1wiKS5lYWNoIC0+XG5cdFx0XHRcdGlmICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKVxuXHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLmFkZENsYXNzKFwiY2hlY2tlZFwiKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcblx0XHRcdGZvcm0uZmluZChcIi5pbnB1dC1jaGVja2JveCwgLmlucHV0LXJhZGlvXCIpLmNoYW5nZSAtPlxuXHRcdFx0XHRmb3JtLmZpbmQoXCIuaW5wdXQtY2hlY2tib3gsIC5pbnB1dC1yYWRpb1wiKS5lYWNoIC0+XG5cdFx0XHRcdFx0aWYgJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsYWJlbFwiKS5hZGRDbGFzcyhcImNoZWNrZWRcIilcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIilcblxuXG5cdFx0XHRmb3JtLmZpbmQoXCJpbnB1dC5udW1iZXJcIikuZWFjaCAtPlxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwibnVtYmVyXCIpLndyYXAoXCI8ZGl2IGNsYXNzPSdudW1iZXInPlwiKS5hZnRlcihcIjxkaXYgY2xhc3M9J251bWJlci1idXR0b24gbnVtYmVyLW1vcmUnPis8L2Rpdj48ZGl2IGNsYXNzPSdudW1iZXItYnV0dG9uIG51bWJlci1sZXNzJz4tPC9kaXY+XCIpXG5cblx0XHRcdGZvcm0uZmluZChcIi5udW1iZXIgLm51bWJlci1idXR0b25cIikubGl2ZSBcImNsaWNrXCIsIC0+XG5cblx0XHRcdFx0X2lucHV0ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiaW5wdXRcIilcblxuXHRcdFx0XHRfbWF4ID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1heFwiKSlcblx0XHRcdFx0X21pbiA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1taW5cIikpXG5cdFx0XHRcdF9taW4gPSAxIGlmICFfbWluXG5cblx0XHRcdFx0X3N0ZXBzID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLXN0ZXBzXCIpKVxuXHRcdFx0XHRfc3RlcHMgPSAxIGlmICFfc3RlcHNcblxuXHRcdFx0XHRfdmFsID0gcGFyc2VJbnQoX2lucHV0LnZhbCgpKVxuXHRcdFx0XHRfdmFsID0gX3ZhbCArIF9zdGVwcyBpZiAkKHRoaXMpLmhhc0NsYXNzIFwibnVtYmVyLW1vcmVcIlxuXHRcdFx0XHRfdmFsID0gX3ZhbCAtIF9zdGVwcyBpZiAkKHRoaXMpLmhhc0NsYXNzIFwibnVtYmVyLWxlc3NcIlxuXHRcdFx0XHRfdmFsID0gX21heCBpZiBfdmFsID49IF9tYXhcblx0XHRcdFx0X3ZhbCA9IF9taW4gaWYgX3ZhbCA8PSBfbWluXG5cblx0XHRcdFx0X2lucHV0LnZhbChfdmFsKVxuXHRcdFx0XHRcblx0XHRcdFx0ZmFsc2VcblxuXHRcdFx0Zm9ybS5maW5kKFwiLm51bWJlciBpbnB1dFwiKS5saXZlIFwiYmx1clwiLCAtPlxuXG5cdFx0XHRcdF9pbnB1dCA9ICQodGhpcylcblxuXHRcdFx0XHRfbWF4ID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1heFwiKSlcblx0XHRcdFx0X21pbiA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1taW5cIikpXG5cdFx0XHRcdF9taW4gPSAxIGlmICFfbWluXG5cblx0XHRcdFx0X3ZhbCA9IHBhcnNlSW50KF9pbnB1dC52YWwoKSlcblx0XHRcdFx0X3ZhbCA9IF9tYXggaWYgX3ZhbCA+PSBfbWF4XG5cdFx0XHRcdF92YWwgPSBfbWluIGlmIF92YWwgPD0gX21pblxuXG5cdFx0XHRcdF9pbnB1dC52YWwoX3ZhbClcblxuXHRcdFx0XHR0cnVlXG5cblxuXG5cdFx0XHRmb3JtLnN1Ym1pdCAtPlxuXG5cdFx0XHRcdHNlbmQgPSB0cnVlXG5cdFx0XHRcdGZvcm0gPSAkKHRoaXMpIFxuXG5cdFx0XHRcdGZvcm0uZmluZChcImlucHV0LHRleHRhcmVhLHNlbGVjdFwiKS5lYWNoIC0+XG5cdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0KCQodGhpcyksdHJ1ZSlcblxuXHRcdFx0XHRkaXZlcnJvciA9IGZvcm0uZmluZChcIi5jb250cm9sLWVycm9yXCIpLmVxKDApXG5cblx0XHRcdFx0aWYgZGl2ZXJyb3IubGVuZ3RoXG5cblx0XHRcdFx0XHRzZW5kID0gZmFsc2Vcblx0XHRcdFx0XHR0b3AgPSBkaXZlcnJvci5vZmZzZXQoKS50b3AgLSAkKFwiLmhlYWRlci10b3BcIikuaGVpZ2h0KCkgLSAyNVxuXG5cdFx0XHRcdFx0JChcImh0bWwsYm9keVwiKS5hbmltYXRlXG5cdFx0XHRcdFx0XHRzY3JvbGxUb3A6IHRvcFxuXG5cdFx0XHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRcdFx0ZGl2ZXJyb3IuZmluZChcImlucHV0XCIpLmVxKDApLmZvY3VzKClcblx0XHRcdFx0XHQsNTAwXG5cblx0XHRcdFx0aWYgc2VuZCA9PSB0cnVlXG5cdFx0XHRcdFx0aWYgY2FsbGJhY2tcblx0XHRcdFx0XHRcdGNhbGxiYWNrKClcblx0XHRcdFx0XHRcdHNlbmQgPSBmYWxzZVxuXG5cdFx0XHRcdHJldHVybiBzZW5kXG5cblxuXHRmb3JtSW5wdXQ6IChpbnB1dCx2YWxpZGF0ZUVtcHR5PWZhbHNlKSAtPlxuXG5cdFx0cGFyZW50ID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sLXZhbHVlXCIpXG5cblx0XHRjb250cm9scyA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbHNcIilcblx0XHRjb250cm9sICA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbFwiKVxuXG5cdFx0ZnZFcnJvcnMgPSB7XG5cdFx0XHRcImVtcHR5XCI6IFwiRXN0ZSBjYW1wbyBlcyByZXF1ZXJpZG9cIixcblx0XHRcdFwiZW1wdHlTZWxlY3RcIjogXCJTZWxlY2Npb25hIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImVtcHR5UmFkaW9cIjogXCJTZWxlY2Npb25hIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImVtcHR5Q2hlY2tib3hcIjogXCJTZWxlY2Npb25hIGFsIG1lbm9zIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImludmFsaWRFbWFpbFwiOiBcIkVtYWlsIGludsOhbGlkb1wiLFxuXHRcdFx0XCJpbnZhbGlkRW1haWxSZXBlYXRcIjogXCJFbCBlbWFpbCBpbmdyZXNhZG8gbm8gZXMgaWd1YWwgYWwgYW50ZXJpb3JcIlxuXHRcdFx0XCJpbnZhbGlkUGFzc1wiOiBcIkxhIGNvbnRyYXNlw7FhIGRlYmUgc2VyIG1heW9yIGEgNiBjYXLDoWN0ZXJlc1wiXG5cdFx0XHRcImludmFsaWRQYXNzUmVwZWF0XCI6IFwiTGEgY29udHJhc2XDsWEgbm8gZXMgaWd1YWwgYSBsYSBhbnRlcmlvclwiXG5cdFx0XHRcImludmFsaWRSdXRcIjogXCJSVVQgaW52w6FsaWRvXCIsXG5cdFx0XHRcInRlcm1zXCI6IFwiRGViZXMgYWNlcHRhciBsb3MgdMOpcm1pbm9zIGxlZ2FsZXNcIixcblx0XHR9XG5cblxuXHRcdGlmICFpbnB1dC5oYXNDbGFzcyhcIm9wdGlvbmFsXCIpICYmIGlucHV0LmF0dHIoXCJ0eXBlXCIpIT1cInN1Ym1pdFwiICYmIGlucHV0LmF0dHIoXCJ0eXBlXCIpIT1cImhpZGRlblwiICYmIGlucHV0LmF0dHIoXCJuYW1lXCIpXG5cblx0XHRcdGVycm9yID0gZmFsc2Vcblx0XHRcdFxuXHRcdFx0aWYgIWlucHV0LnZhbCgpXG5cblx0XHRcdFx0IyBWYWxpZGFyIHNpIGVsIGNhbXBvIHNlIGxsZW5hIChvcGNpb25hbClcblx0XHRcdFx0aWYgdmFsaWRhdGVFbXB0eSA9PSB0cnVlXG5cdFx0XHRcdFx0aWYgaW5wdXQuaXMoXCJzZWxlY3RcIilcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlTZWxlY3QpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eSlcblx0XHRcdGVsc2VcblxuXHRcdFx0XHQjIFZhbGlkYXIgZW1haWxcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0nZW1haWwnXVwiKVxuXHRcdFx0XHRcdGlmICEgYXBwLnZhbGlkYXRpb24uZW1haWwoIGlucHV0LCBpbnB1dC52YWwoKSApIFxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkRW1haWwpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBjb250cmFzZcOxYVxuXHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdwYXNzd29yZCddXCIpXG5cdFx0XHRcdFx0aWYgaW5wdXQudmFsKCkubGVuZ3RoIDwgNlxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUGFzcylcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIHJlcGV0aXIgY29udHJhc2XDsWFcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbZGF0YS1yZXBlYXRdXCIpXG5cdFx0XHRcdFx0aWYgaW5wdXQudmFsKCkgIT0gY29udHJvbHMuZmluZChcIltuYW1lPSdcIitpbnB1dC5hdHRyKFwiZGF0YS1yZXBlYXRcIikrXCInXVwiKS52YWwoKVxuXHRcdFx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0ncGFzc3dvcmQnXVwiKVxuXHRcdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRQYXNzUmVwZWF0KVxuXHRcdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblx0XHRcdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J2VtYWlsJ11cIilcblx0XHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkRW1haWxSZXBlYXQpXG5cdFx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIGNoZWNrYm94cy9yYWRpb3Ncblx0XHRcdFx0aWYgKGlucHV0LmlzKFwiW3R5cGU9J2NoZWNrYm94J11cIikgfHwgaW5wdXQuaXMoXCJbdHlwZT0ncmFkaW8nXVwiKSlcblx0XHRcdFx0XHRpZiAhY29udHJvbHMuZmluZChcImlucHV0W25hbWU9J1wiK2lucHV0LmF0dHIoXCJuYW1lXCIpK1wiJ106Y2hlY2tlZFwiKS5sZW5ndGhcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlDaGVja2JveCkgaWYgaW5wdXQuaXMoXCJbdHlwZT0nY2hlY2tib3gnXVwiKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eVJhZGlvKSAgICBpZiBpbnB1dC5pcyhcIlt0eXBlPSdyYWRpbyddXCIpXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLnRlcm1zKSAgICAgICAgIGlmIGlucHV0LmlzKFwiLmlucHV0LXRlcm1zXCIpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblx0XHRcdFx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtZXJyb3JcIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIFJVVFxuXHRcdFx0XHRpZiBpbnB1dC5pcyhcIi5ydXRcIilcblx0XHRcdFx0XHRpbnB1dC52YWwoICQuUnV0LmZvcm1hdGVhcigkLlJ1dC5xdWl0YXJGb3JtYXRvKGlucHV0LnZhbCgpKSwkLlJ1dC5nZXREaWdpdG8oJC5SdXQucXVpdGFyRm9ybWF0byhpbnB1dC52YWwoKSkpKSApXG5cdFx0XHRcdFx0aWYgISQuUnV0LnZhbGlkYXIoaW5wdXQudmFsKCkpXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRSdXQpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXHRcdFx0XHQjIFNpIG5vIGhheSBlcnJvcmVzLCBzZSBxdWl0YSBlbCBtZW5zYWplIGRlIGVycm9yXG5cdFx0XHRcdGlmIGVycm9yID09IGZhbHNlXG5cdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmYWxzZSlcblxuXG5cblx0Zm9ybUlucHV0TWVzc2FnZTogKGlucHV0LG1lc3NhZ2UpIC0+XG5cdFx0aWYgbWVzc2FnZVxuXHRcdFx0aW5wdXQuYWRkQ2xhc3MoXCJjb250cm9sLWVycm9yXCIpXG5cdFx0XHRwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2wtdmFsdWVcIilcblx0XHRcdHBhcmVudC5hZGRDbGFzcyhcImNvbnRyb2wtZXJyb3JcIilcblx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtbWVzc2FnZVwiKS50ZXh0KG1lc3NhZ2UpLmFkZENsYXNzKFwiaW5cIilcblx0XHRlbHNlXG5cdFx0XHRpbnB1dC5yZW1vdmVDbGFzcyhcImNvbnRyb2wtZXJyb3JcIilcblx0XHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXHRcdFx0cGFyZW50LnJlbW92ZUNsYXNzKFwiY29udHJvbC1lcnJvclwiKVx0XG5cdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLW1lc3NhZ2VcIikuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0cGFyZW50LmZpbmQoXCIuY29udHJvbC1tZXNzYWdlXCIpLnJlbW92ZUNsYXNzKFwiaW4gb3V0XCIpLnRleHQoXCJcIilcblx0XHRcdCw1MDBcblxuXG5cblx0ZW1haWw6IChlbGVtZW50byx2YWxvcikgLT5cblx0XHRpZiAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHZhbG9yKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXG5cblxuXG4iXX0=