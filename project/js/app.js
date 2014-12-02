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
      app.plugins.init();
      return app.tools();
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

  app.tools = function() {
    app.video.init();
    app.goto.init();
    app.faq.init();
    return app.placeholder.init();
  };

  app.video = {
    init: function() {
      return $("[data-video]").click(function() {
        return app.video.insert($(this));
      });
    },
    insert: function(element) {
      var id;
      id = element.attr("data-video");
      element.addClass("video-playing");
      return element.append('<iframe width="420" height="315" src="//www.youtube.com/embed/' + id + '?rel=0&controls=1&showinfo=0&autoplay=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
    }
  };

  app.goto = {
    init: function() {
      return $("[data-goto]").click(function() {
        var to;
        to = $(this).attr("data-goto");
        app.goto.to(to);
        return false;
      });
    },
    to: function(to, add) {
      var top;
      if (add == null) {
        add = 0;
      }
      top = $(to).offset().top - $(".header-primary").height() - add + $(".secretmenu-container-front").scrollTop();
      return $("html,body,.secretmenu-container-front").animate({
        scrollTop: top
      });
    }
  };

  app.faq = {
    init: function() {
      $(".faq .faq-item:not(.faq-open) .faq-answer").hide();
      return $(".faq .faq-question").click(function() {
        var faq_index;
        faq_index = $(this).parent().index();
        return $(".faq .faq-item").each(function() {
          if ($(this).index() === faq_index) {
            $(this).find(".faq-answer").slideToggle();
            return $(this).toggleClass("faq-open");
          } else {
            $(this).find(".faq-answer").slideUp();
            return $(this).removeClass("faq-open");
          }
        });
      });
    }
  };

  app.previewfile = {
    init: function() {
      return $("input[type='file'][data-to]").live("change", function(evt) {
        var esto, f, files, i, reader, to, _results;
        esto = $(this);
        files = evt.target.files;
        esto.parent(".prev").children(".sel").html("");
        i = 0;
        f = void 0;
        to = $(this).attr("data-to");
        _results = [];
        while (f = files[i]) {
          if (!f.type.match("image.*")) {
            continue;
          }
          reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              return $(to).html("<div class='preview'><div class='preview-bg' style='background-image:url(" + e.target.result + ")'></div><img src='" + e.target.result + "'' /></div>");
            };
          })(f);
          reader.readAsDataURL(f);
          _results.push(i++);
        }
        return _results;
      });
    }
  };

  app.placeholder = {
    init: function() {
      $("[placeholder]").focus(function() {
        var input;
        input = $(this);
        if (input.val() === input.attr("placeholder")) {
          input.val("");
          return input.removeClass("placeholder");
        }
      }).blur(function() {
        var input;
        input = $(this);
        if (input.val() === "" || input.val() === input.attr("placeholder")) {
          input.addClass("placeholder");
          return input.val(input.attr("placeholder"));
        }
      }).blur();
      return $("[placeholder]").parents("form").submit(function() {
        return $(this).find("[placeholder]").each(function() {
          var input;
          input = $(this);
          if (input.val() === input.attr("placeholder")) {
            return input.val("");
          }
        });
      });
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

//# sourceMappingURL=data:application/json;base64,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LFFBRUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsZUFBbkIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxNQUFNLENBQUMsSUFBUCxDQUFZLGtCQUFaLENBQStCLENBQUMsUUFBaEMsQ0FBeUMsS0FBekMsQ0FIQSxDQUFBO2VBSUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtpQkFDVixNQUFNLENBQUMsSUFBUCxDQUFZLGtCQUFaLENBQStCLENBQUMsV0FBaEMsQ0FBNEMsUUFBNUMsQ0FBcUQsQ0FBQyxJQUF0RCxDQUEyRCxFQUEzRCxFQURVO1FBQUEsQ0FBWCxFQUVDLEdBRkQsRUFWRDtPQURpQjtJQUFBLENBeExsQjtBQUFBLElBeU1BLEtBQUEsRUFBTyxTQUFDLFFBQUQsRUFBVSxLQUFWLEdBQUE7QUFDTixNQUFBLElBQUcsMkpBQTJKLENBQUMsSUFBNUosQ0FBaUssS0FBakssQ0FBSDtBQUNDLGVBQU8sSUFBUCxDQUREO09BQUEsTUFBQTtBQUdDLGVBQU8sS0FBUCxDQUhEO09BRE07SUFBQSxDQXpNUDtHQWgyQkQsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuJChkb2N1bWVudCkucmVhZHkgLT5cblx0YXBwLmluaXQoKVxuXG5hcHAgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIEJyb3dzZXJzXG5cdFx0YXBwLmJyb3dzZXJzKClcblxuXHRcdCMgTWVuw7pcblx0XHRhcHAuc2VjcmV0TWVudS5pbml0KClcblxuXHRcdCMgU2hhcmVzXG5cdFx0YXBwLnNoYXJlcy5pbml0KClcblxuXHRcdCMgVG9vbHRpcHNcblx0XHRhcHAudG9vbHRpcHMoKVxuXG5cdFx0IyBBbGVydGFzXG5cdFx0YXBwLmFsZXJ0LmluaXQoKVxuXG5cdFx0IyBWYWxpZGFjacOzbiBkZSBmb3JtdWxhcmlvc1xuXHRcdGFwcC52YWxpZGF0aW9uLmZvcm0gJChcIi5jb250cm9sc1wiKVxuXG5cdFx0IyBMb2FkaW5nXG5cdFx0YXBwLmxvYWRpbmcuaW5pdCgpXG5cblx0XHQjIE1hcGFcblx0XHRhcHAuZ21hcCgpXG5cblx0XHQjIEV2ZW50b3MgZW4gc2Nyb2xsXG5cdFx0YXBwLnNjcm9sbCgpXG5cblx0XHQjIFBsdWdpbnNcblx0XHRhcHAucGx1Z2lucy5pbml0KClcblxuXHRcdCMgVG9vbHNcblx0XHRhcHAudG9vbHMoKVxuXG4jPWluY2x1ZGVfdHJlZSBhcHBcblxuXG5hcHAuYWxlcnQgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZSAtPlxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblxuXG5cdFx0aWYgJChcIltkYXRhLWFsZXJ0XVwiKS5sZW5ndGhcblxuXHRcdFx0JChcImFbZGF0YS1hbGVydF1cIikubGl2ZSBcImNsaWNrXCIsIC0+XG5cdFx0XHRcdGVsZW1lbnQgPSAkKHRoaXMpXG5cdFx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdFx0dGl0bGU6IGVsZW1lbnQuYXR0cihcImRhdGEtdGl0bGVcIilcblx0XHRcdFx0XHRjb250ZW50OiBlbGVtZW50LmF0dHIoXCJkYXRhLWNvbnRlbnRcIilcblx0XHRcdFx0XHRhY2NlcHQ6IHRydWVcblx0XHRcdFx0XHRjYW5jZWw6IHRydWVcblx0XHRcdFx0XHRjYWxsYmFja190cnVlOiAtPlxuXHRcdFx0XHRcdFx0bG9jYXRpb24uaHJlZiA9IGVsZW1lbnQuYXR0cihcImhyZWZcIilcblx0XHRcdFx0ZmFsc2VcblxuXHRcdFx0JChcIltkYXRhLWFsZXJ0XVwiKS5lYWNoIC0+XG5cdFx0XHRcdGVsZW1lbnQgPSAkKHRoaXMpXG5cdFx0XHRcdGlmICFlbGVtZW50LmlzKFwiYVwiKSAmJiAhZWxlbWVudC5pcyhcImJ1dHRvblwiKVxuXHRcdFx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdFx0XHR0aXRsZTogZWxlbWVudC5hdHRyKFwiZGF0YS10aXRsZVwiKVxuXHRcdFx0XHRcdFx0Y29udGVudDogZWxlbWVudC5hdHRyKFwiZGF0YS1jb250ZW50XCIpXG5cdFx0XHRcdFx0XHRhY2NlcHQ6IHRydWVcblx0XHRcdFx0XHRcdGNhbmNlbDogdHJ1ZVxuXG5cblx0b3BlbjogKG9wdGlvbnMpIC0+XG5cblx0XHR0aXRsZSA9IFwiXCJcblx0XHRjb250ZW50ID0gXCJcIlxuXHRcdGJ1dHRvbnMgPSBcIlwiXG5cdFx0Y2xvc2UgPSBcIlwiXG5cblx0XHRpZiBvcHRpb25zLnN0YXRpYyA9PSB0cnVlXG5cdFx0XHRhbGVydGxpZ2h0Y2xhc3MgICAgPSAnJ1xuXHRcdFx0b3B0aW9ucy5jbG9zZSA9IGZhbHNlXG5cdFx0ZWxzZVxuXHRcdFx0YWxlcnRsaWdodGNsYXNzID0gJyBmYWxzZSdcblxuXHRcdGlmIG9wdGlvbnMuYWxlcnRjbGFzc1xuXHRcdFx0YWxlcnRjbGFzcyA9IFwiYWxlcnQtXCIgKyBvcHRpb25zLmFsZXJ0Y2xhc3Ncblx0XHRlbHNlXG5cdFx0XHRhbGVydGNsYXNzID0gXCJhbGVydC1kZWZhdWx0XCJcblxuXHRcdGlmIG9wdGlvbnMudGl0bGVcblx0XHRcdHRpdGxlID0gXCI8aDIgY2xhc3M9J2FsZXJ0LXRpdGxlJz5cIiArIG9wdGlvbnMudGl0bGUgKyBcIjwvaDI+XCJcblxuXHRcdGlmIG9wdGlvbnMuY29udGVudFxuXHRcdFx0Y29udGVudCA9IFwiPGRpdiBjbGFzcz0nYWxlcnQtY29udGVudCc+XCIgKyBvcHRpb25zLmNvbnRlbnQgKyBcIjwvZGl2PlwiXG5cblx0XHRpZiBvcHRpb25zLmNsb3NlID09IHVuZGVmaW5lZFxuXHRcdFx0b3B0aW9ucy5jbG9zZSA9IHRydWVcblxuXHRcdGlmIG9wdGlvbnMuY2xvc2UgPT0gdHJ1ZVxuXHRcdFx0Y2xvc2UgPSAnPGJ1dHRvbiBjbGFzcz1cImFsZXJ0LWNsb3NlIGZhbHNlXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2J1dHRvbj4nXG5cblx0XHRpZiBvcHRpb25zLmJ1dHRvbnNcblx0XHRcdGJ1dHRvbnMgKz0gb3B0aW9ucy5idXR0b25zICsgXCIgXCJcblxuXHRcdGlmIG9wdGlvbnMuY2FuY2VsID09IHRydWVcblx0XHRcdGJ1dHRvbnMgKz0gJzxidXR0b24gY2xhc3M9XCJidXR0b24gZmFsc2VcIj5DYW5jZWxhcjwvYnV0dG9uPiAnXG5cblx0XHRpZiBvcHRpb25zLmFjY2VwdCA9PSB0cnVlXG5cdFx0XHRidXR0b25zICs9ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IHRydWVcIj5BY2VwdGFyPC9idXR0b24+ICdcblxuXHRcdGlmIGJ1dHRvbnNcblx0XHRcdGJ1dHRvbnMgPSAnPGRpdiBjbGFzcz1cImFsZXJ0LWJ1dHRvbnNcIj4nK2J1dHRvbnMrJzwvZGl2PidcblxuXG5cdFx0aHRtbCA9XG5cdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0ICcrYWxlcnRjbGFzcysnIGluXCI+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydC1saWdodCAnK2FsZXJ0bGlnaHRjbGFzcysnXCI+PC9kaXY+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydC1ib3ggZXF1aWRpc3RcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQtaW5uZXJcIj4nK1xuXHRcdFx0XHRcdFx0Y2xvc2UgK1xuXHRcdFx0XHRcdFx0dGl0bGUgK1xuXHRcdFx0XHRcdFx0Y29udGVudCArXG5cdFx0XHRcdFx0XHRidXR0b25zICtcblx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+J1xuXG5cblx0XHQkKFwiYm9keVwiKS5hcHBlbmQoaHRtbClcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImFsZXJ0LWluXCIpXG5cblx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0LDEwMFxuXG5cblx0XHQkKFwiLmFsZXJ0IC50cnVlLCAuYWxlcnQgLmZhbHNlXCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPiBcblxuXHRcdFx0YWxlcnRvcmlnaW4gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYWxlcnRcIilcblxuXHRcdFx0YWxlcnRvcmlnaW4uYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0YWxlcnRvcmlnaW4ucmVtb3ZlKClcblx0XHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1pblwiKVxuXHRcdFx0LDIwMFxuXG5cdFx0XHRpZiAkKHRoaXMpLmhhc0NsYXNzKFwidHJ1ZVwiKSAmJiBvcHRpb25zLmNhbGxiYWNrX3RydWVcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja190cnVlKClcblxuXHRcdFx0aWYgJCh0aGlzKS5oYXNDbGFzcyhcImZhbHNlXCIpICYmIG9wdGlvbnMuY2FsbGJhY2tfZmFsc2Vcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja19mYWxzZSgpXG5cblx0XHRcdHJldHVybiB0cnVlXG5cblx0Y2xvc2VhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRyZW1vdmVhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCIuYWxlcnRcIikucmVtb3ZlKClcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblx0XHQsMjAwXG5cblx0ZXF1aWRpc3Q6IC0+XG5cdFx0JChcIi5lcXVpZGlzdFwiKS5lYWNoIC0+XG5cdFx0XHRfdGhpcyA9ICQodGhpcylcblx0XHRcdF9sZWZ0ID0gKF90aGlzLnBhcmVudCgpLndpZHRoKCkgLSBfdGhpcy53aWR0aCgpKSAvIDJcblx0XHRcdF9sZWZ0ID0gMCBpZiBfbGVmdCA8IDBcblx0XHRcdF90b3AgPSAoX3RoaXMucGFyZW50KCkuaGVpZ2h0KCkgLSBfdGhpcy5oZWlnaHQoKSkgLyAyXG5cdFx0XHRfdG9wID0gMCBpZiBfdG9wIDwgMFxuXHRcdFx0X3RoaXMuY3NzXG5cdFx0XHQgIGxlZnQ6IF9sZWZ0ICsgXCJweFwiXG5cdFx0XHQgIHRvcDogX3RvcCArIFwicHhcIlxuXG5cdGxvYWQ6IChocmVmLGNzc2NsYXNzPVwiZGVmYXVsdFwiLGNhbGxiYWNrPWZhbHNlKSAtPlxuXHRcdCQuYWpheChcblx0XHRcdHVybDogaHJlZlxuXHRcdFx0dHlwZTogJ0dFVCdcblx0XHQpLmRvbmUgKHJlc3VsdCkgLT5cblx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdGNvbnRlbnQ6IHJlc3VsdFxuXHRcdFx0XHRhbGVydGNsYXNzOiBjc3NjbGFzc1xuXHRcdFx0aWYgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2soKVxuXG5cblxuXG5hcHAuaXNNb2JpbGUgPSAtPlxuXHRpZiAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHR0cnVlXG5cdGVsc2Vcblx0XHRmYWxzZVxuXG5hcHAuYnJvd3NlcnMgPSAtPlxuXG5cdCMgTW9iaWxlXG5cdGlmIGFwcC5pc01vYmlsZSgpXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tb2JpbGVcIilcblxuXHQjIElFXG5cdGlmICQuYnJvd3Nlci5tc2llIHx8IG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ1RyaWRlbnQvJykhPS0xXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1pZVwiKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtaWVcIiskLmJyb3dzZXIudmVyc2lvbilcblx0XHRpZiBwYXJzZUludCgkLmJyb3dzZXIudmVyc2lvbikgPD0gN1xuXHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0dGl0bGU6IFwiRXN0w6FzIHVzYW5kbyB1biBuYXZlZ2Fkb3IgbXV5IGFudGlndW9cIlxuXHRcdFx0XHRjb250ZW50OiBcIkFjdHVhbGl6YSB0dSBuYXZlZ2Fkb3IgYWhvcmEgeSBkaXNmcnV0YSBkZSB1bmEgbWVqb3IgZXhwZXJpZW5jaWEgZW4gRmFsYWJlbGxhIE5vdmlvcy5cIlxuXHRcdFx0XHRidXR0b25zOiBcIjxhIGhyZWY9J2h0dHA6Ly9icm93c2VoYXBweS5jb20vP2xvY2FsZT1lcycgdGFyZ2V0PSdfYmxhbmsnIGNsYXNzPSdidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLWJpZyc+QWN0dWFsaXphciBhaG9yYTwvYT5cIlxuXHRcdFx0XHRzdGF0aWM6IHRydWVcblxuXG5cbmFwcC5jb29raWUgPSBcblxuXHRjcmVhdGU6IChuYW1lLCB2YWx1ZSwgZGF5cykgLT5cblx0XHRpZiBkYXlzXG5cdFx0XHRkYXRlID0gbmV3IERhdGUoKVxuXHRcdFx0ZGF0ZS5zZXRUaW1lIGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxuXHRcdFx0ZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpXG5cdFx0ZWxzZVxuXHRcdFx0ZXhwaXJlcyA9IFwiXCJcblx0XHRkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCJcblxuXHRyZWFkOiAobmFtZSkgLT5cblx0XHRuYW1lRVEgPSBuYW1lICsgXCI9XCJcblx0XHRjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIilcblx0XHRpID0gMFxuXG5cdFx0d2hpbGUgaSA8IGNhLmxlbmd0aFxuXHRcdFx0YyA9IGNhW2ldXG5cdFx0XHRjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpICB3aGlsZSBjLmNoYXJBdCgwKSBpcyBcIiBcIlxuXHRcdFx0cmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKSAgaWYgYy5pbmRleE9mKG5hbWVFUSkgaXMgMFxuXHRcdFx0aSsrXG5cdFx0bnVsbFxuXG5cdGRlbGV0ZTogKG5hbWUpIC0+XG5cdFx0YXBwLmNvb2tpZS5jcmVhdGUgbmFtZSwgXCJcIiwgLTFcblxuXG5cblxuYXBwLmZvcm1hdE51bWJlciA9IChuKSAtPlxuXHRuLnRvRml4ZWQoMCkucmVwbGFjZSAvLi9nLCAoYywgaSwgYSkgLT5cblx0XHQoaWYgaSBhbmQgYyBpc250IFwiLFwiIGFuZCBub3QgKChhLmxlbmd0aCAtIGkpICUgMykgdGhlbiBcIi5cIiArIGMgZWxzZSBjKVxuXG5cblxuXG5hcHAuZ21hcCA9IC0+XG5cblx0aWYgJChcIi5tYXBcIikubGVuZ3RoXG5cblx0XHQkKFwiLm1hcFwiKS5lYWNoIC0+XG5cblx0XHRcdG0gPSAkKHRoaXMpXG5cblx0XHRcdG1hcmtlcnMgPSBuZXcgQXJyYXkoKVxuXHRcdFx0aW5mb3dpbmRvdyA9IGZhbHNlXG5cblx0XHRcdG1hcF96b29tID0gcGFyc2VJbnQobS5hdHRyKFwiZGF0YS16b29tXCIpKVxuXG5cdFx0XHRtYXBfbGF0ID0gbS5hdHRyKFwiZGF0YS1sYXRcIilcblx0XHRcdG1hcF9sbmcgPSBtLmF0dHIoXCJkYXRhLWxuZ1wiKVxuXG5cdFx0XHRibGFja2FuZHdoaXRlID0gW1xuXHRcdFx0XHRmZWF0dXJlVHlwZTogXCJhbGxcIlxuXHRcdFx0XHRlbGVtZW50VHlwZTogXCJhbGxcIlxuXHRcdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdFx0c2F0dXJhdGlvbjogLTEwMFxuXHRcdFx0XHRdXG5cdFx0XHRdXG5cblx0XHRcdG1hcE9wdGlvbnMgPVxuXHRcdFx0XHR6b29tOiBtYXBfem9vbVxuXHRcdFx0XHRjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFwX2xhdCxtYXBfbG5nKVxuXHRcdFx0XHRtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG5cdFx0XHRcdGRpc2FibGVEZWZhdWx0VUk6IHRydWVcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlXG5cdFx0XHRcdHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuXHRcdFx0XHRzdHlsZXM6IGJsYWNrYW5kd2hpdGVcblxuXHRcdFx0aWYgIW0uZmluZChcIi5tYXAtZ21hcFwiKS5sZW5ndGhcblx0XHRcdFx0bS5hcHBlbmQgJzxkaXYgY2xhc3M9XCJtYXAtZ21hcFwiPjwvZGl2PidcblxuXG5cdFx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG0uZmluZChcIi5tYXAtZ21hcFwiKVswXSwgbWFwT3B0aW9ucylcblxuXG5cdFx0XHRtLmFwcGVuZCAnJytcblx0ICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtYXAtem9vbVwiPicrXG5cdCAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm1hcC16b29tLWJ1dHRvbiBtYXAtem9vbS1pbiAgYnV0dG9uIGJ1dHRvbi1zbWFsbCBidXR0b24tZGFya1wiPjxpIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvaT48L2J1dHRvbj4nK1xuXHQgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtYXAtem9vbS1idXR0b24gbWFwLXpvb20tb3V0IGJ1dHRvbiBidXR0b24tc21hbGwgYnV0dG9uLWRhcmtcIj48aSBjbGFzcz1cImZhIGZhLW1pbnVzXCI+PC9pPjwvYnV0dG9uPicrXG5cdCAgICAgICAgICAgICc8L2Rpdj4nXG5cblx0XHRcdG0uZmluZChcIi5tYXAtem9vbS1pblwiKS5jbGljayAtPlxuXHRcdFx0XHRtYXAuc2V0Wm9vbSBtYXAuZ2V0Wm9vbSgpICsgMVxuXHRcdFx0XHRmYWxzZVxuXG5cdFx0XHRtLmZpbmQoXCIubWFwLXpvb20tb3V0XCIpLmNsaWNrIC0+XG5cdFx0XHRcdG1hcC5zZXRab29tIG1hcC5nZXRab29tKCkgLSAxXG5cdFx0XHRcdGZhbHNlXG5cblxuXG5cdFx0XHQjIENhcmdhciBjb29yZGVuYWRhc1xuXG5cdFx0XHRtLmZpbmQoXCIubWFwLW1hcmtlclwiKS5lYWNoIC0+XG5cblx0XHRcdFx0bWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihcblx0XHRcdFx0XHRwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkKHRoaXMpLmF0dHIoXCJkYXRhLWxhdFwiKSwgJCh0aGlzKS5hdHRyKFwiZGF0YS1sbmdcIikpXG5cdFx0XHRcdFx0YW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUFxuXHRcdFx0XHRcdCNpY29uOiBcImltZy9tYXJrZXIucG5nXCJcblx0XHRcdFx0XHRtYXA6IG1hcFxuXHRcdFx0XHQpXG5cdFx0XHRcblx0XHRcdFx0Y29udGVudCA9XG5cdFx0XHRcdFx0XCI8ZGl2IGNsYXNzPSdtYXAtaW5mb3dpbmRvdyc+XCIrXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmh0bWwoKStcblx0XHRcdFx0XHRcIjwvZGl2PlwiXG5cblxuXHRcdFx0XHRtYXJrZXJbJ2NvbnRlbnQnXSA9IGNvbnRlbnRcblx0XHRcdFx0bWFya2VyWyd2YWx1ZSddID0gJCh0aGlzKS52YWwoKVxuXG5cdFx0XHRcdGlmICFpbmZvd2luZG93XG5cdFx0XHRcdFx0aW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KGNvbnRlbnQ6XCJ4XCIpXG5cblx0XHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIgbWFwLCAnY2xpY2snLCAtPlxuXHRcdFx0XHRcdGluZm93aW5kb3cuY2xvc2UoKVxuXG5cdFx0XHRcdGlmICQodGhpcykuaHRtbCgpLmxlbmd0aFxuXHRcdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyIG1hcmtlciwgXCJjbGlja1wiLCAtPlxuXHRcdFx0XHRcdFx0aW5mb3dpbmRvdy5jbG9zZSgpXG5cdFx0XHRcdFx0XHRpbmZvd2luZG93LnNldENvbnRlbnQgY29udGVudFxuXHRcdFx0XHRcdFx0aW5mb3dpbmRvdy5vcGVuIG1hcCwgdGhpc1xuXHRcdFx0XHRcdFx0I21hcC5zZXRDZW50ZXIobWFya2VyLmdldFBvc2l0aW9uKCkpXG5cblx0XHRcdFx0bWFya2Vycy5wdXNoKG1hcmtlcilcblxuXG5cblxuXG5cblxuXG5hcHAubG9hZGluZyA9XG5cblx0aW5pdDogLT5cblx0XHRpZiAkKFwiW2RhdGEtbG9hZGluZ11cIikubGVuZ3RoXG5cdFx0XHRhcHAubG9hZGluZy5pbigpXG5cdFx0IyMjXG5cdFx0YXBwLmxvYWRpbmcuaW4oKVxuXHRcdCQoXCJib2R5XCIpLmltYWdlc0xvYWRlZCAtPlxuXHRcdFx0YXBwLmxvYWRpbmcub3V0KClcblx0XHQjIyNcblxuXHRpbjogKGVsZW1lbnQpIC0+XG5cdFx0ZWxlbWVudCA9ICQoXCJib2R5XCIpIGlmICFlbGVtZW50XG5cdFx0ZWxlbWVudC5hcHBlbmQgJycrXG5cdFx0XHQnPGRpdiBjbGFzcz1cImxvYWRpbmdcIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImxvYWRpbmctaWNvblwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nLWljb24tY2lyY2xlXCI+PGRpdj48L2Rpdj48L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cdG91dDogLT5cblx0XHQkKFwiLmxvYWRpbmdcIikuYWRkQ2xhc3MgXCJvdXRcIlxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCIubG9hZGluZ1wiKS5yZW1vdmUoKVxuXHRcdCw1MDBcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImxvYWRlZFwiKVxuXG5cblxuXG5hcHAucGx1Z2lucyA9XG5cblx0aW5pdDogLT5cblxuXHRcdCMjI1xuXHRcdCMgIEF1dG9zaXplXG5cdFx0JChcInRleHRhcmVhXCIpLmF1dG9zaXplXG5cdFx0XHRhcHBlbmQ6IFwiXFxuXCJcblxuXHRcdCMgSXNvdG9wZVxuXHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdGlzb3RvcGUgPSAkKFwiLmlzb3RvcGVcIikuaXNvdG9wZSgpXG5cblx0XHQjIFNsaWRlclxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdGlmICQoXCIucm95YWxTbGlkZXJcIikubGVuZ3RoXG5cblx0XHRcdFx0JChcIi5yb3lhbFNsaWRlclwiKS5yb3lhbFNsaWRlclxuXHRcdFx0XHRcdGltYWdlU2NhbGVNb2RlOiAnZml0J1xuXHRcdFx0XHRcdHNsaWRlckRyYWc6IGZhbHNlXG5cdFx0XHRcdFx0YXJyb3dzTmF2QXV0b0hpZGU6IGZhbHNlXG5cdFx0XHRcdFx0bG9vcDogdHJ1ZVxuXHRcdFx0XHRcdCNsb29wUmV3aW5kOiB0cnVlXG5cdFx0XHRcdFx0c2xpZGVzU3BhY2luZzogMFxuXHRcdFx0XHRcdHRyYW5zaXRpb25TcGVlZDogNjAwXG5cdFx0XHRcdFx0YXV0b1BsYXk6XG5cdFx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0XHRwYXVzZU9uSG92ZXI6IHRydWVcblx0XHRcdFx0XHRcdGRlbGF5OiA0MDAwXG5cdFx0XHRcdFx0aW1hZ2VTY2FsZVBhZGRpbmc6IDBcblx0XHRcdFx0XHRhZGRBY3RpdmVDbGFzczogdHJ1ZVxuXHRcdFx0XHRcdG5hdmlnYXRlQnlDbGljazogZmFsc2Vcblx0XHRcdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0LDUwXG5cblx0XHQkKHdpbmRvdykub24gXCJsb2FkXCIsIC0+XG5cdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cblx0XHRyX3RpbWUgPSBmYWxzZVxuXHRcdCQod2luZG93KS5yZXNpemUgLT5cblx0XHRcdGFwcC5wbHVnaW5zLnJlbGF5b3V0KClcblx0XHRcdHIgPSB0cnVlXG5cdFx0XHRjbGVhclRpbWVvdXQocl90aW1lKVxuXHRcdFx0cl90aW1lID0gc2V0VGltZW91dCAtPlxuXHRcdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cdFx0XHRcdHIgPSBmYWxzZVxuXHRcdFx0LDYwMFxuXHRcdCMjI1xuXG5cblxuXHRyZWxheW91dDogLT5cblxuXHRcdCMjI1xuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0aWYgJChcIi5pc290b3BlXCIpLmxlbmd0aFxuXHRcdFx0JChcIi5pc290b3BlXCIpLmlzb3RvcGVcblx0XHRcdFx0cmVsYXlvdXQ6IHRydWVcblx0XG5cdFx0JChcImJvZHlcIikuaW1hZ2VzTG9hZGVkIC0+XG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdFx0JChcIi5pc290b3BlXCIpLmlzb3RvcGVcblx0XHRcdFx0XHRyZWxheW91dDogdHJ1ZVxuXHRcdCMjI1xuXG5cblxuXG5hcHAuc2Nyb2xsID0gLT5cblxuXHQjaWYgIWFwcC5pc01vYmlsZSgpICYmICEkLmJyb3dzZXIubXNpZVxuXG5cdHNjcm9sbF9wcmV2ID0gMFxuXHQkKHdpbmRvdykuc2Nyb2xsIC0+XG5cblx0XHQjIEVzY29uZGVyIGhlYWRlclxuXHRcdCMjI1xuXHRcdHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuXHRcdGhlaWdodF93aW5kb3cgPSAkKHdpbmRvdykuaGVpZ2h0KClcblx0XHRoZWlnaHRfYm9keSA9ICQoXCJib2R5XCIpLmhlaWdodCgpXG5cdFx0aWYgc2Nyb2xsID4gNTAgJiYgc2Nyb2xsICsgaGVpZ2h0X3dpbmRvdyA8IGhlaWdodF9ib2R5IC0gNTBcblx0XHRcdGlmIHNjcm9sbC1zY3JvbGxfcHJldiA+IDBcblx0XHRcdFx0JChcIi5oZWFkZXItdG9wLWVsZW1lbnRzXCIpLmFkZENsYXNzIFwiaGlkZVwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCQoXCIuaGVhZGVyLXRvcC1lbGVtZW50c1wiKS5yZW1vdmVDbGFzcyBcImhpZGVcIlxuXHRcdFx0XHRzY3JvbGxfaW5pdCA9IDBcblx0XHRlbHNlXG5cdFx0XHQkKFwiLmhlYWRlci10b3AtZWxlbWVudHNcIikucmVtb3ZlQ2xhc3MgXCJoaWRlXCJcblx0XHRzY3JvbGxfcHJldiA9IHNjcm9sbFxuXHRcdCMjI1xuXG5cdFx0IyBNb3N0cmFyIGVuIHNjcm9sbFxuXG5cdFx0aWYgJChcIi5kaXNwbGF5c2Nyb2xsXCIpLmxlbmd0aFxuXHRcdFx0JChcIi5kaXNwbGF5c2Nyb2xsXCIpLmVhY2ggLT5cblx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0ZWxlbWVudF90b3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcFxuXHRcdFx0XHRlbGVtZW50X2hlaWdodCA9IGVsZW1lbnQuaGVpZ2h0KClcblx0XHRcdFx0aWYgc2Nyb2xsICsgaGVpZ2h0X3dpbmRvdyA+IGVsZW1lbnRfaGVpZ2h0ICsgZWxlbWVudF90b3Bcblx0XHRcdFx0XHRlbGVtZW50LmFkZENsYXNzIFwiaW5cIlxuXG5cblxuXG5hcHAuc2VjcmV0TWVudSA9XG5cblx0aW5pdDogLT5cblxuXHRcdCMgQ29tcGFyZSBVUkwgaW4gbWVudVxuXHRcdCMjI1xuXHRcdHVybCA9IGRvY3VtZW50LlVSTFxuXHRcdHVybF9zcGxpdCA9IHVybC5zcGxpdChcIi9cIilcblx0XHRuYW1lX3BhZ2UgPSB1cmxfc3BsaXRbdXJsX3NwbGl0Lmxlbmd0aC0xXVxuXHRcdG5hbWVfcGFnZV9zcGxpdCA9IG5hbWVfcGFnZS5zcGxpdChcIj9cIikgXG5cdFx0bmFtZV9wYWdlX2NsZWFyID0gbmFtZV9wYWdlX3NwbGl0WzBdXG5cdFx0bGkgPSAkKFwiLnNlY3JldG1lbnUtY29udGVudCBhW2hyZWY9J1wiK25hbWVfcGFnZV9jbGVhcitcIiddXCIpLnBhcmVudChcImxpXCIpXG5cdFx0bGkuYWRkQ2xhc3MgXCJjdXJyZW50LWl0ZW1cIlxuXHRcdGxpLnBhcmVudCgpLnBhcmVudChcImxpXCIpLmFkZENsYXNzIFwiY3VycmVudC1pdGVtXCJcblx0XHQjIyNcblxuXHRcdCMgRGVza3RvcFxuXHRcdCQoXCIuc2VjcmV0bWVudS1jb250ZW50IHVsIGxpIGFcIikuZWFjaCAtPlxuXHRcdFx0aWYgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikubGVuZ3RoXG5cdFx0XHRcdGlmICEkKHRoaXMpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIilcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIikucHJlcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPicpXG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikucHJlcGVuZCAnPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzZWNyZXRtZW51LWJhY2tcIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4gQXRyw6FzPC9hPjwvbGk+J1xuXG5cdFx0aWYgJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgdWwgbGkuY3VycmVudC1pdGVtIGEuc2VjcmV0bWVudS1wYXJlbnRcIikubGVuZ3RoXG5cdFx0XHRhcHAuc2VjcmV0TWVudS5vcGVuTHZsRGVza3RvcCAkKFwiLnNlY3JldG1lbnUtY29udGVudCB1bCBsaS5jdXJyZW50LWl0ZW0gYS5zZWNyZXRtZW51LXBhcmVudFwiKVxuXG5cdFx0IyBNb2JpbGVcblxuXHRcdCQoXCIuc2VjcmV0bWVudS1idXR0b25cIikuY2xpY2sgLT5cblx0XHRcdGlmICEkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtaW5cIilcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUub3BlbiAkKFwiLnNlY3JldG1lbnUtY29udGVudFwiKS5odG1sKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUuY2xvc2UoKVxuXHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItZnJvbnRcIikuY2xpY2sgLT5cblx0XHRcdGlmICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1pblwiKVxuXHRcdFx0XHRhcHAuc2VjcmV0TWVudS5jbG9zZSgpXG5cdFx0dHJ1ZVxuXG5cdG9wZW5MdmxEZXNrdG9wOiAoZWxlbWVudCkgLT5cblx0XHR1bCA9IGVsZW1lbnQucGFyZW50KCkuZmluZChcInVsXCIpXG5cdFx0dWwuYWRkQ2xhc3MoXCJpblwiKVxuXHRcdHVsLmZpbmQoXCJhLnNlY3JldG1lbnUtYmFja1wiKS51bmJpbmQoXCJjbGlja1wiKS5iaW5kIFwiY2xpY2tcIiwgLT5cblx0XHRcdHVsLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdHVsLnJlbW92ZUNsYXNzKFwiaW4gb3V0XCIpXG5cdFx0XHQsNzAwXG5cdFx0XHRmYWxzZVxuXG5cblx0b3BlbjogKGh0bWwsY2hpbGRyZW49ZmFsc2UsZGlyZWN0aW9uPVwibGVmdFwiKSAtPlxuXG5cdFx0bGVuZ3RoICAgID0gJChcIi5zZWNyZXRtZW51XCIpLmxlbmd0aCArIDFcblx0XHRjb250YWluZXIgPSAnPGRpdiBjbGFzcz1cInNlY3JldG1lbnUgc2VjcmV0bWVudS1sdmwtJysoJChcIi5zZWNyZXRtZW51XCIpLmxlbmd0aCArIDEpKydcIj48L2Rpdj4nXG5cblx0XHRpZiAhY2hpbGRyZW5cblx0XHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItYmFja1wiKS5odG1sKGNvbnRhaW5lcikgXG5cdFx0ZWxzZVxuXHRcdFx0JChcIi5zZWNyZXRtZW51LWNvbnRhaW5lci1iYWNrXCIpLmFwcGVuZChjb250YWluZXIpXG5cblx0XHQkKFwiLnNlY3JldG1lbnVcIikuZXEoLTEpLmh0bWwoJzxkaXYgY2xhc3M9XCJzZWNyZXRtZW51LWlubmVyXCI+JytodG1sKyc8L2Rpdj4nKVxuXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LWluIHNlY3JldG1lbnUtXCIrZGlyZWN0aW9uKVxuXHRcdCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIsbGVuZ3RoKVxuXG5cdFx0IyBTaSB0aWVuZSBoaWpvc1xuXHRcdCQoXCIuc2VjcmV0bWVudSB1bCBsaSBhXCIpLmVhY2ggLT5cblx0XHRcdGlmICQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmxlbmd0aFxuXHRcdFx0XHRpZiAhJCh0aGlzKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpLnByZXBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nKVxuXG5cdFx0IyBDbGljayBlbiBpdGVtIGRlIG1lbsO6XG5cdFx0JChcIi5zZWNyZXRtZW51IHVsIGxpIGEuc2VjcmV0bWVudS1wYXJlbnRcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHRhcHAuc2VjcmV0TWVudS5vcGVuIFwiPHVsPlwiKyQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmh0bWwoKStcIjwvdWw+XCIsIHRydWVcblx0XHRcdGZhbHNlXG5cblx0XHQkKFwiLnNlY3JldG1lbnUgYS5zZWNyZXRtZW51LWJhY2tcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHRsYXN0bWVudSA9IHBhcnNlSW50ICQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiLChsYXN0bWVudS0xKSlcblx0XHRcdCQoXCIuc2VjcmV0bWVudS5zZWNyZXRtZW51LWx2bC1cIitsYXN0bWVudSkuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0JChcIi5zZWNyZXRtZW51LnNlY3JldG1lbnUtbHZsLVwiK2xhc3RtZW51KS5yZW1vdmUoKVxuXHRcdFx0LDcwMFxuXHRcdFx0ZmFsc2VcblxuXHRjbG9zZTogLT5cblxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VjcmV0bWVudS1vdXRcIilcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyBcInNlY3JldG1lbnUtaW4gc2VjcmV0bWVudS1vdXQgc2VjcmV0bWVudS1sZWZ0IHNlY3JldG1lbnUtcmlnaHQgc2VjcmV0bWVudS1sdmwtXCIrJChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIilcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiLnNlY3JldG1lbnVcIikucmVtb3ZlKClcblx0XHQsNzAwXG5cblxuXG5cblxuYXBwLnNoYXJlcyA9XG5cblx0aW5pdDogLT5cblx0XHQkKFwiLnNoYXJlXCIpLmNsaWNrIC0+XG5cdFx0XHRhcHAuc2hhcmVzLnNoYXJlICQodGhpcylcblxuXHRzaGFyZTogKGVsZW1lbnQpIC0+XG5cblx0XHRzaGFyZV91cmwgPSBlbmNvZGVVUklDb21wb25lbnQoZWxlbWVudC5hdHRyKFwiZGF0YS11cmxcIikpXG5cdFx0c2hhcmVfdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChlbGVtZW50LmF0dHIoXCJkYXRhLXRleHRcIikpXG5cdFx0c2hhcmVfaW1nID0gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQuYXR0cihcImRhdGEtaW1nXCIpKVxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWZhY2Vib29rXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS10d2l0dGVyXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3NvdXJjZT13ZWJjbGllbnQmYW1wO3RleHQ9XCIrc2hhcmVfdGV4dCtcIiZhbXA7dXJsPVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1waW50ZXJlc3RcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD1cIitzaGFyZV91cmwrXCImbWVkaWE9XCIrc2hhcmVfaW1nK1wiJmRlc2NyaXB0aW9uPVwiK3NoYXJlX3RleHQsIDYyMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtZ29vZ2xlcGx1c1wiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9XCIrc2hhcmVfdXJsLCA1MDAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWxpbmtlZGluXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPVwiK3NoYXJlX3VybCtcIiZ0aXRsZT1cIitzaGFyZV90ZXh0K1wiJnN1bW1hcnk9XCIrc2hhcmVfdGV4dCtcIiZzb3VyY2U9XCIrc2hhcmVfdXJsLCA1MDAsIDQyMFxuXG5cdFx0ZmFsc2VcblxuXHRwb3B1cFdpbmRvdzogKHVybCwgdywgaCkgLT5cblx0XHRsZWZ0ID0gKCAkKHdpbmRvdykud2lkdGgoKSAvIDIgKSAgLSAodyAvIDIpXG5cdFx0dG9wICA9ICggJCh3aW5kb3cpLmhlaWdodCgpIC8gMiApIC0gKGggLyAyKVxuXHRcdHJldHVybiB3aW5kb3cub3Blbih1cmwsIFwiQ29tcGFydGlyXCIsICd0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz1ubywgcmVzaXphYmxlPW5vLCBjb3B5aGlzdG9yeT1ubywgd2lkdGg9Jyt3KycsIGhlaWdodD0nK2grJywgdG9wPScrdG9wKycsIGxlZnQ9JytsZWZ0KVxuXG5cblxuYXBwLnRvb2xzID0gLT5cblx0YXBwLnZpZGVvLmluaXQoKVxuXHRhcHAuZ290by5pbml0KClcblx0YXBwLmZhcS5pbml0KClcblx0I2FwcC5wcmV2aWV3ZmlsZS5pbml0KClcblx0YXBwLnBsYWNlaG9sZGVyLmluaXQoKVxuXG5cbmFwcC52aWRlbyA9IFxuXHRpbml0OiAtPlxuXHRcdCQoXCJbZGF0YS12aWRlb11cIikuY2xpY2sgLT5cblx0XHRcdGFwcC52aWRlby5pbnNlcnQgJCh0aGlzKVxuXHRpbnNlcnQ6IChlbGVtZW50KSAtPlxuXHRcdGlkID0gZWxlbWVudC5hdHRyKFwiZGF0YS12aWRlb1wiKVxuXHRcdGVsZW1lbnQuYWRkQ2xhc3MoXCJ2aWRlby1wbGF5aW5nXCIpXG5cdFx0ZWxlbWVudC5hcHBlbmQgJzxpZnJhbWUgd2lkdGg9XCI0MjBcIiBoZWlnaHQ9XCIzMTVcIiBzcmM9XCIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nK2lkKyc/cmVsPTAmY29udHJvbHM9MSZzaG93aW5mbz0wJmF1dG9wbGF5PTEmYXV0b2hpZGU9MVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nXG5cblxuYXBwLmdvdG8gPVxuXHRpbml0OiAtPlxuXHRcdCQoXCJbZGF0YS1nb3RvXVwiKS5jbGljayAtPlxuXHRcdFx0dG8gPSAkKHRoaXMpLmF0dHIgXCJkYXRhLWdvdG9cIlxuXHRcdFx0YXBwLmdvdG8udG8gdG9cblx0XHRcdGZhbHNlXG5cdHRvOiAodG8sYWRkPTApIC0+XG5cdFx0dG9wID0gJCh0bykub2Zmc2V0KCkudG9wIC0gJChcIi5oZWFkZXItcHJpbWFyeVwiKS5oZWlnaHQoKSAtIGFkZCArICQoXCIuc2VjcmV0bWVudS1jb250YWluZXItZnJvbnRcIikuc2Nyb2xsVG9wKClcblx0XHQkKFwiaHRtbCxib2R5LC5zZWNyZXRtZW51LWNvbnRhaW5lci1mcm9udFwiKS5hbmltYXRlXG5cdFx0XHRzY3JvbGxUb3A6IHRvcFxuXG5cbmFwcC5mYXEgPVxuXHRpbml0OiAtPlxuXHRcdCQoXCIuZmFxIC5mYXEtaXRlbTpub3QoLmZhcS1vcGVuKSAuZmFxLWFuc3dlclwiKS5oaWRlKClcblx0XHQkKFwiLmZhcSAuZmFxLXF1ZXN0aW9uXCIpLmNsaWNrIC0+XG5cdFx0XHRmYXFfaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLmluZGV4KClcblx0XHRcdCQoXCIuZmFxIC5mYXEtaXRlbVwiKS5lYWNoIC0+XG5cdFx0XHRcdGlmICQodGhpcykuaW5kZXgoKSA9PSBmYXFfaW5kZXhcblx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoXCIuZmFxLWFuc3dlclwiKS5zbGlkZVRvZ2dsZSgpXG5cdFx0XHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcyhcImZhcS1vcGVuXCIpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoXCIuZmFxLWFuc3dlclwiKS5zbGlkZVVwKClcblx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmFxLW9wZW5cIilcblxuXG5hcHAucHJldmlld2ZpbGUgPVxuXHRpbml0OiAtPlxuXHRcdCQoXCJpbnB1dFt0eXBlPSdmaWxlJ11bZGF0YS10b11cIikubGl2ZSBcImNoYW5nZVwiLCAoZXZ0KSAtPlxuXHRcdFx0ZXN0byA9ICQodGhpcylcblx0XHRcdGZpbGVzID0gZXZ0LnRhcmdldC5maWxlc1xuXHRcdFx0ZXN0by5wYXJlbnQoXCIucHJldlwiKS5jaGlsZHJlbihcIi5zZWxcIikuaHRtbCBcIlwiXG5cdFx0XHRpID0gMFxuXHRcdFx0ZiA9IHVuZGVmaW5lZFxuXHRcdFx0dG8gPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXRvXCIpXG5cblx0XHRcdHdoaWxlIGYgPSBmaWxlc1tpXVxuXHRcdFx0XHQjY29uc29sZS5sb2cgZlxuXHRcdFx0XHRjb250aW51ZSB1bmxlc3MgZi50eXBlLm1hdGNoKFwiaW1hZ2UuKlwiKVxuXHRcdFx0XHRyZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQgPSAoKHRoZUZpbGUpIC0+XG5cdFx0XHRcdFx0KGUpIC0+XG5cdFx0XHRcdFx0XHQkKHRvKS5odG1sIFwiPGRpdiBjbGFzcz0ncHJldmlldyc+PGRpdiBjbGFzcz0ncHJldmlldy1iZycgc3R5bGU9J2JhY2tncm91bmQtaW1hZ2U6dXJsKFwiICsgZS50YXJnZXQucmVzdWx0ICsgXCIpJz48L2Rpdj48aW1nIHNyYz0nXCIgKyBlLnRhcmdldC5yZXN1bHQgKyBcIicnIC8+PC9kaXY+XCJcblx0XHRcdFx0XHQpKGYpXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMIGZcblx0XHRcdFx0aSsrXG5cblxuYXBwLnBsYWNlaG9sZGVyID1cblx0aW5pdDogLT5cblxuXHRcdCQoXCJbcGxhY2Vob2xkZXJdXCIpLmZvY3VzKC0+XG5cdFx0XHRpbnB1dCA9ICQodGhpcylcblx0XHRcdGlmIGlucHV0LnZhbCgpIGlzIGlucHV0LmF0dHIoXCJwbGFjZWhvbGRlclwiKVxuXHRcdFx0XHRpbnB1dC52YWwgXCJcIlxuXHRcdFx0XHRpbnB1dC5yZW1vdmVDbGFzcyBcInBsYWNlaG9sZGVyXCJcblx0XHQpLmJsdXIoLT5cblx0XHRcdGlucHV0ID0gJCh0aGlzKVxuXHRcdFx0aWYgaW5wdXQudmFsKCkgaXMgXCJcIiBvciBpbnB1dC52YWwoKSBpcyBpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIilcblx0XHRcdFx0aW5wdXQuYWRkQ2xhc3MgXCJwbGFjZWhvbGRlclwiXG5cdFx0XHRcdGlucHV0LnZhbCBpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIilcblx0XHQpLmJsdXIoKVxuXG5cdFx0JChcIltwbGFjZWhvbGRlcl1cIikucGFyZW50cyhcImZvcm1cIikuc3VibWl0IC0+XG5cdFx0XHQkKHRoaXMpLmZpbmQoXCJbcGxhY2Vob2xkZXJdXCIpLmVhY2ggLT5cblx0XHRcdFx0aW5wdXQgPSAkKHRoaXMpXG5cdFx0XHRcdGlucHV0LnZhbCBcIlwiICBpZiBpbnB1dC52YWwoKSBpcyBpbnB1dC5hdHRyKFwicGxhY2Vob2xkZXJcIilcblxuXG5cblxuXG5hcHAudG9vbHRpcHMgPSAtPlxuXG5cdCQoXCJbZGF0YS10b29sdGlwXVwiKS5lYWNoIC0+XG5cdFx0cG9zID0gJCh0aGlzKS5hdHRyKFwiZGF0YS10b29sdGlwLXBvc2l0aW9uXCIpXG5cdFx0cG9zID0gXCJib3R0b21cIiBpZiAhcG9zXG5cdFx0JCh0aGlzKS5hZGRDbGFzcyBcInRvb2x0aXAtcGFyZW50XCJcblx0XHQkKHRoaXMpLmFwcGVuZCBcIjxzcGFuIGNsYXNzPSd0b29sdGlwIHRvb2x0aXAtXCIrcG9zK1wiJz48c3BhbiBjbGFzcz0ndG9vbHRpcC1jb250YWluZXInPjxzcGFuIGNsYXNzPSd0b29sdGlwLXRyaWFuZ2xlJz48L3NwYW4+PHNwYW4gY2xhc3M9J3Rvb2x0aXAtY29udGVudCc+XCIgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLXRvb2x0aXBcIikgKyBcIjwvc3Bhbj48L3NwYW4+PC9zcGFuPlwiXG5cblxuXG5cbmFwcC50b3VyID0gXG5cblx0aW5pdDogLT5cblxuXHRcdGlmICFhcHAuaXNNb2JpbGUoKVxuXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cblx0XHRcdFx0aWYgJChcIltkYXRhLXRvdXJdXCIpLmxlbmd0aFxuXG5cblx0XHRcdFx0XHQkKFwiW2RhdGEtdG91cl1bZGF0YS10b3VyLWluXVwiKS5lYWNoIC0+XG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gJCh0aGlzKVxuXHRcdFx0XHRcdFx0dG91cl9pbiA9IGVsZW1lbnQuYXR0cihcImRhdGEtdG91ci1pblwiKVxuXHRcdFx0XHRcdFx0JCh0b3VyX2luKS5hdHRyIFwiZGF0YS10b3VyXCIsIGVsZW1lbnQuYXR0cihcImRhdGEtdG91clwiKVxuXHRcdFx0XHRcdFx0JCh0b3VyX2luKS5hdHRyIFwiZGF0YS10b3VyLWNvbnRlbnRcIiwgZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyLWNvbnRlbnRcIikgaWYgZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyLWNvbnRlbnRcIikgXG5cdFx0XHRcdFx0XHQkKHRvdXJfaW4pLmF0dHIgXCJkYXRhLXRvdXItbmV4dFwiLCBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXItbmV4dFwiKSBpZiBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXItbmV4dFwiKSBcblx0XHRcdFx0XHRcdGVsZW1lbnQucmVtb3ZlKClcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSAkKHRvdXJfaW4pXG5cblx0XHRcdFx0XHRpID0gMVxuXHRcdFx0XHRcdCQoXCJbZGF0YS10b3VyXVwiKS5lYWNoIC0+XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmF0dHIgXCJkYXRhLXRvdXItaWRcIiwgaVxuXHRcdFx0XHRcdFx0aSsrXG5cblx0XHRcdFx0XHRhcHAudG91ci5vcGVuICQoXCJbZGF0YS10b3VyXVwiKS5lcSgwKVxuXG5cdFx0XHRcdFx0JCh3aW5kb3cpLnJlc2l6ZSAtPlxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRcdFx0XHRhcHAudG91ci5zdHlsZXMgJChcIi50b3VyLWFjdGl2ZVwiKVxuXHRcdFx0XHRcdFx0LCA2MDBcblxuXHRcdFx0LDEwMDBcblxuXG5cdG9wZW46IChlbGVtZW50KSAtPlxuXG5cdFx0dGl0bGUgICA9IGVsZW1lbnQuYXR0ciBcImRhdGEtdG91clwiXG5cdFx0Y29udGVudCA9IGVsZW1lbnQuYXR0ciBcImRhdGEtdG91ci1jb250ZW50XCJcblx0XHRuZXh0ICAgID0gZWxlbWVudC5hdHRyIFwiZGF0YS10b3VyLW5leHRcIlxuXHRcdHRvcCAgICAgPSBlbGVtZW50Lm9mZnNldCgpLnRvcFxuXHRcdGluZGV4ICAgPSBwYXJzZUludCBlbGVtZW50LmF0dHIgXCJkYXRhLXRvdXItaWRcIlxuXG5cdFx0aWYgbmV4dFxuXHRcdFx0YnV0dG9uX25leHQgPSAnPGEgaHJlZj1cIicrbmV4dCsnXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLWxpbmUgdG91ci1idXR0b24tbmV4dHBhZ2VcIj5TaWd1aWVudGUgcMOhZ2luYSA8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvYT4nXG5cdFx0ZWxzZVxuXHRcdFx0YnV0dG9uX25leHQgPSBcIlwiXG5cdFxuXHRcdGlmICEkKFwiLnRvdXJcIikubGVuZ3RoXG5cdFx0XHQkKFwiYm9keVwiKS5hcHBlbmQgXCJcIitcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWNvbnRhaW5lclwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyXCI+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1iZyB0b3VyLWJnLXRvcFwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYmcgdG91ci1iZy1ib3R0b21cIj48L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJnIHRvdXItYmctbGVmdFwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYmcgdG91ci1iZy1yaWdodFwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHQnPGEgY2xhc3M9XCJ0b3VyLWNsb3NlXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci10aXBcIj4nK1xuXHRcdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdCc8L2Rpdj4nXG5cblx0XHQkKFwiLnRvdXIgLnRvdXItdGlwXCIpLmh0bWwgXCJcIitcblx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci10aXAtaW5uZXJcIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYm9keVwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLXRpdGxlXCI+Jyt0aXRsZSsnPC9kaXY+Jytcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItY29udGVudFwiPicrY29udGVudCsnPC9kaXY+Jytcblx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1idXR0b25zXCI+Jytcblx0XHRcdFx0XHQnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tbGluZSB0b3VyLWJ1dHRvbiB0b3VyLWJ1dHRvbi1wcmV2XCI+PGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPjwvYT4gJytcblx0XHRcdFx0XHQnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tbGluZSB0b3VyLWJ1dHRvbiB0b3VyLWJ1dHRvbi1uZXh0XCI+PGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT48L2E+ICcrXG5cdFx0XHRcdFx0YnV0dG9uX25leHQrXG5cdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0JzwvZGl2PidcblxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzIFwidG91ci1pblwiXG5cblx0XHQkKFwiaHRtbCxib2R5XCIpLmFuaW1hdGVcblx0XHRcdHNjcm9sbFRvcDogdG9wIC0gMTAwXG5cdFx0LDUwMFxuXG5cdFx0JChcIltkYXRhLXRvdXJdXCIpLnJlbW92ZUNsYXNzIFwidG91ci1hY3RpdmVcIlxuXHRcdGVsZW1lbnQuYWRkQ2xhc3MgXCJ0b3VyLWFjdGl2ZVwiXG5cblx0XHRhcHAudG91ci5zdHlsZXMgZWxlbWVudFxuXG5cdFx0aWYgaW5kZXggPT0gMVxuXHRcdFx0JChcIi50b3VyLWJ1dHRvbi1wcmV2XCIpLmFkZENsYXNzKFwidG91ci1idXR0b24taW5hY3RpdmVcIilcblxuXHRcdGlmIGluZGV4ID09ICQoXCJbZGF0YS10b3VyXVwiKS5sZW5ndGhcblx0XHRcdCQoXCIudG91ci1idXR0b24tbmV4dFwiKS5hZGRDbGFzcyhcInRvdXItYnV0dG9uLWluYWN0aXZlXCIpXG5cblx0XHRpZiAkKFwiW2RhdGEtdG91cl1cIikubGVuZ3RoID09IDFcblx0XHRcdCQoXCIudG91ci1idXR0b25cIikucmVtb3ZlKClcblxuXHRcdCQoXCIudG91ci1idXR0b25cIikuY2xpY2sgLT5cblx0XHRcdGlkID0gcGFyc2VJbnQgJChcIi50b3VyLWFjdGl2ZVwiKS5hdHRyKFwiZGF0YS10b3VyLWlkXCIpXG5cdFx0XHRpZiAhJCh0aGlzKS5pcyhcIi50b3VyLWJ1dHRvbi1pbmFjdGl2ZVwiKVxuXHRcdFx0XHRpZiAkKHRoaXMpLmlzKFwiLnRvdXItYnV0dG9uLW5leHRcIilcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBpZCsxXG5cdFx0XHRcdFx0YXBwLnRvdXIub3BlbiAkKFwiW2RhdGEtdG91ci1pZD0nXCIrKGlkKzEpK1wiJ11cIilcblx0XHRcdFx0aWYgJCh0aGlzKS5pcyhcIi50b3VyLWJ1dHRvbi1wcmV2XCIpXG5cdFx0XHRcdFx0YXBwLnRvdXIub3BlbiAkKFwiW2RhdGEtdG91ci1pZD0nXCIrKGlkLTEpK1wiJ11cIilcblx0XHRcdGZhbHNlXG5cblx0XHQkKFwiLnRvdXItY2xvc2VcIikuY2xpY2sgLT5cblx0XHRcdCQoXCIudG91ci1jb250YWluZXJcIikuYWRkQ2xhc3MgXCJvdXRcIlxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MgXCJ0b3VyLWluXCJcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0JChcIi50b3VyLWNvbnRhaW5lclwiKS5yZW1vdmUoKVxuXHRcdFx0LDUwMFxuXHRcdFx0ZmFsc2VcblxuXG5cdHN0eWxlczogKGVsZW1lbnQpIC0+XG5cblx0XHRwYWRkaW5nID0gMTBcblxuXHRcdHdpZHRoICAgPSBlbGVtZW50Lm91dGVyV2lkdGgoKSAgKyBwYWRkaW5nKjJcblx0XHRoZWlnaHQgID0gZWxlbWVudC5vdXRlckhlaWdodCgpICsgcGFkZGluZyoyXG5cdFx0dG9wICAgICA9IGVsZW1lbnQub2Zmc2V0KCkudG9wICAtIHBhZGRpbmdcblx0XHRsZWZ0ICAgID0gZWxlbWVudC5vZmZzZXQoKS5sZWZ0IC0gcGFkZGluZ1xuXHRcdFxuXHRcdGhlaWdodF9jb250YWluZXIgPSAkKGRvY3VtZW50KS5oZWlnaHQoKVxuXG5cdFx0JChcIi50b3VyLWNvbnRhaW5lclwiKS5jc3Ncblx0XHRcdGhlaWdodDogaGVpZ2h0X2NvbnRhaW5lclxuXG5cdFx0JChcIi50b3VyXCIpLmNzc1xuXHRcdFx0bGVmdDogbGVmdFxuXHRcdFx0dG9wOiB0b3Bcblx0XHRcdHdpZHRoOiB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBoZWlnaHRcblxuXG5cblxuXG5hcHAudmFsaWRhdGlvbiA9XG5cblx0Zm9ybTogKGZvcm1zLGNhbGxiYWNrPWZhbHNlKSAtPlxuXG5cdFx0Zm9ybXMuZWFjaCAtPlxuXG5cdFx0XHRmb3JtID0gJCh0aGlzKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIuY29udHJvbCAuY29udHJvbC12YWx1ZVwiKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdjb250cm9sLW1lc3NhZ2UnPjwvZGl2PlwiKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3RcIikuZWFjaCAtPlxuXHRcdFx0XHRpbnB1dCA9ICQodGhpcylcdFx0XHRcdFxuXHRcdFx0XHRpbnB1dC5hZGRDbGFzcyggXCJpbnB1dC1cIiskKHRoaXMpLmF0dHIoXCJ0eXBlXCIpICkgaWYgJCh0aGlzKS5pcyBcImlucHV0XCJcblx0XHRcdFx0aW5wdXQuYWRkQ2xhc3MoIFwiZGlzYWJsZWRcIiApIGlmIGlucHV0LmlzKFwiOmRpc2FibGVkXCIpXG5cdFx0XHRcdGlucHV0LmxpdmUgXCJibHVyLCBjaGFuZ2VcIiwgLT5cblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXQoaW5wdXQpXG5cblx0XHRcdGZvcm0uZmluZChcIi5pbnB1dC1jaGVja2JveCwgLmlucHV0LXJhZGlvXCIpLmVhY2ggLT5cblx0XHRcdFx0aWYgJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIilcblx0XHRcdFxuXHRcdFx0Zm9ybS5maW5kKFwiLmlucHV0LWNoZWNrYm94LCAuaW5wdXQtcmFkaW9cIikuY2hhbmdlIC0+XG5cdFx0XHRcdGZvcm0uZmluZChcIi5pbnB1dC1jaGVja2JveCwgLmlucHV0LXJhZGlvXCIpLmVhY2ggLT5cblx0XHRcdFx0XHRpZiAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIilcblx0XHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLmFkZENsYXNzKFwiY2hlY2tlZFwiKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tlZFwiKVxuXG5cblx0XHRcdGZvcm0uZmluZChcImlucHV0Lm51bWJlclwiKS5lYWNoIC0+XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJudW1iZXJcIikud3JhcChcIjxkaXYgY2xhc3M9J251bWJlcic+XCIpLmFmdGVyKFwiPGRpdiBjbGFzcz0nbnVtYmVyLWJ1dHRvbiBudW1iZXItbW9yZSc+KzwvZGl2PjxkaXYgY2xhc3M9J251bWJlci1idXR0b24gbnVtYmVyLWxlc3MnPi08L2Rpdj5cIilcblxuXHRcdFx0Zm9ybS5maW5kKFwiLm51bWJlciAubnVtYmVyLWJ1dHRvblwiKS5saXZlIFwiY2xpY2tcIiwgLT5cblxuXHRcdFx0XHRfaW5wdXQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJpbnB1dFwiKVxuXG5cdFx0XHRcdF9tYXggPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWF4XCIpKVxuXHRcdFx0XHRfbWluID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1pblwiKSlcblx0XHRcdFx0X21pbiA9IDEgaWYgIV9taW5cblxuXHRcdFx0XHRfc3RlcHMgPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtc3RlcHNcIikpXG5cdFx0XHRcdF9zdGVwcyA9IDEgaWYgIV9zdGVwc1xuXG5cdFx0XHRcdF92YWwgPSBwYXJzZUludChfaW5wdXQudmFsKCkpXG5cdFx0XHRcdF92YWwgPSBfdmFsICsgX3N0ZXBzIGlmICQodGhpcykuaGFzQ2xhc3MgXCJudW1iZXItbW9yZVwiXG5cdFx0XHRcdF92YWwgPSBfdmFsIC0gX3N0ZXBzIGlmICQodGhpcykuaGFzQ2xhc3MgXCJudW1iZXItbGVzc1wiXG5cdFx0XHRcdF92YWwgPSBfbWF4IGlmIF92YWwgPj0gX21heFxuXHRcdFx0XHRfdmFsID0gX21pbiBpZiBfdmFsIDw9IF9taW5cblxuXHRcdFx0XHRfaW5wdXQudmFsKF92YWwpXG5cdFx0XHRcdFxuXHRcdFx0XHRmYWxzZVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIubnVtYmVyIGlucHV0XCIpLmxpdmUgXCJibHVyXCIsIC0+XG5cblx0XHRcdFx0X2lucHV0ID0gJCh0aGlzKVxuXG5cdFx0XHRcdF9tYXggPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWF4XCIpKVxuXHRcdFx0XHRfbWluID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1pblwiKSlcblx0XHRcdFx0X21pbiA9IDEgaWYgIV9taW5cblxuXHRcdFx0XHRfdmFsID0gcGFyc2VJbnQoX2lucHV0LnZhbCgpKVxuXHRcdFx0XHRfdmFsID0gX21heCBpZiBfdmFsID49IF9tYXhcblx0XHRcdFx0X3ZhbCA9IF9taW4gaWYgX3ZhbCA8PSBfbWluXG5cblx0XHRcdFx0X2lucHV0LnZhbChfdmFsKVxuXG5cdFx0XHRcdHRydWVcblxuXG5cblx0XHRcdGZvcm0uc3VibWl0IC0+XG5cblx0XHRcdFx0c2VuZCA9IHRydWVcblx0XHRcdFx0Zm9ybSA9ICQodGhpcykgXG5cblx0XHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLmVhY2ggLT5cblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXQoJCh0aGlzKSx0cnVlKVxuXG5cdFx0XHRcdGRpdmVycm9yID0gZm9ybS5maW5kKFwiLmNvbnRyb2wtZXJyb3JcIikuZXEoMClcblxuXHRcdFx0XHRpZiBkaXZlcnJvci5sZW5ndGhcblxuXHRcdFx0XHRcdHNlbmQgPSBmYWxzZVxuXHRcdFx0XHRcdHRvcCA9IGRpdmVycm9yLm9mZnNldCgpLnRvcCAtICQoXCIuaGVhZGVyLXRvcFwiKS5oZWlnaHQoKSAtIDI1XG5cblx0XHRcdFx0XHQkKFwiaHRtbCxib2R5XCIpLmFuaW1hdGVcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogdG9wXG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdFx0XHRkaXZlcnJvci5maW5kKFwiaW5wdXRcIikuZXEoMCkuZm9jdXMoKVxuXHRcdFx0XHRcdCw1MDBcblxuXHRcdFx0XHRpZiBzZW5kID09IHRydWVcblx0XHRcdFx0XHRpZiBjYWxsYmFja1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0XHRcdFx0c2VuZCA9IGZhbHNlXG5cblx0XHRcdFx0cmV0dXJuIHNlbmRcblxuXG5cdGZvcm1JbnB1dDogKGlucHV0LHZhbGlkYXRlRW1wdHk9ZmFsc2UpIC0+XG5cblx0XHRwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2wtdmFsdWVcIilcblxuXHRcdGNvbnRyb2xzID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sc1wiKVxuXHRcdGNvbnRyb2wgID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sXCIpXG5cblx0XHRmdkVycm9ycyA9IHtcblx0XHRcdFwiZW1wdHlcIjogXCJFc3RlIGNhbXBvIGVzIHJlcXVlcmlkb1wiLFxuXHRcdFx0XCJlbXB0eVNlbGVjdFwiOiBcIlNlbGVjY2lvbmEgdW5hIG9wY2nDs25cIixcblx0XHRcdFwiZW1wdHlSYWRpb1wiOiBcIlNlbGVjY2lvbmEgdW5hIG9wY2nDs25cIixcblx0XHRcdFwiZW1wdHlDaGVja2JveFwiOiBcIlNlbGVjY2lvbmEgYWwgbWVub3MgdW5hIG9wY2nDs25cIixcblx0XHRcdFwiaW52YWxpZEVtYWlsXCI6IFwiRW1haWwgaW52w6FsaWRvXCIsXG5cdFx0XHRcImludmFsaWRFbWFpbFJlcGVhdFwiOiBcIkVsIGVtYWlsIGluZ3Jlc2FkbyBubyBlcyBpZ3VhbCBhbCBhbnRlcmlvclwiXG5cdFx0XHRcImludmFsaWRQYXNzXCI6IFwiTGEgY29udHJhc2XDsWEgZGViZSBzZXIgbWF5b3IgYSA2IGNhcsOhY3RlcmVzXCJcblx0XHRcdFwiaW52YWxpZFBhc3NSZXBlYXRcIjogXCJMYSBjb250cmFzZcOxYSBubyBlcyBpZ3VhbCBhIGxhIGFudGVyaW9yXCJcblx0XHRcdFwiaW52YWxpZFJ1dFwiOiBcIlJVVCBpbnbDoWxpZG9cIixcblx0XHRcdFwidGVybXNcIjogXCJEZWJlcyBhY2VwdGFyIGxvcyB0w6lybWlub3MgbGVnYWxlc1wiLFxuXHRcdH1cblxuXG5cdFx0aWYgIWlucHV0Lmhhc0NsYXNzKFwib3B0aW9uYWxcIikgJiYgaW5wdXQuYXR0cihcInR5cGVcIikhPVwic3VibWl0XCIgJiYgaW5wdXQuYXR0cihcInR5cGVcIikhPVwiaGlkZGVuXCIgJiYgaW5wdXQuYXR0cihcIm5hbWVcIilcblxuXHRcdFx0ZXJyb3IgPSBmYWxzZVxuXHRcdFx0XG5cdFx0XHRpZiAhaW5wdXQudmFsKClcblxuXHRcdFx0XHQjIFZhbGlkYXIgc2kgZWwgY2FtcG8gc2UgbGxlbmEgKG9wY2lvbmFsKVxuXHRcdFx0XHRpZiB2YWxpZGF0ZUVtcHR5ID09IHRydWVcblx0XHRcdFx0XHRpZiBpbnB1dC5pcyhcInNlbGVjdFwiKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eVNlbGVjdClcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5KVxuXHRcdFx0ZWxzZVxuXG5cdFx0XHRcdCMgVmFsaWRhciBlbWFpbFxuXHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdlbWFpbCddXCIpXG5cdFx0XHRcdFx0aWYgISBhcHAudmFsaWRhdGlvbi5lbWFpbCggaW5wdXQsIGlucHV0LnZhbCgpICkgXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRFbWFpbClcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIGNvbnRyYXNlw7FhXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J3Bhc3N3b3JkJ11cIilcblx0XHRcdFx0XHRpZiBpbnB1dC52YWwoKS5sZW5ndGggPCA2XG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRQYXNzKVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgcmVwZXRpciBjb250cmFzZcOxYVxuXHRcdFx0XHRpZiBpbnB1dC5pcyhcIltkYXRhLXJlcGVhdF1cIilcblx0XHRcdFx0XHRpZiBpbnB1dC52YWwoKSAhPSBjb250cm9scy5maW5kKFwiW25hbWU9J1wiK2lucHV0LmF0dHIoXCJkYXRhLXJlcGVhdFwiKStcIiddXCIpLnZhbCgpXG5cdFx0XHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdwYXNzd29yZCddXCIpXG5cdFx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZFBhc3NSZXBlYXQpXG5cdFx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXHRcdFx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0nZW1haWwnXVwiKVxuXHRcdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRFbWFpbFJlcGVhdClcblx0XHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgY2hlY2tib3hzL3JhZGlvc1xuXHRcdFx0XHRpZiAoaW5wdXQuaXMoXCJbdHlwZT0nY2hlY2tib3gnXVwiKSB8fCBpbnB1dC5pcyhcIlt0eXBlPSdyYWRpbyddXCIpKVxuXHRcdFx0XHRcdGlmICFjb250cm9scy5maW5kKFwiaW5wdXRbbmFtZT0nXCIraW5wdXQuYXR0cihcIm5hbWVcIikrXCInXTpjaGVja2VkXCIpLmxlbmd0aFxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eUNoZWNrYm94KSBpZiBpbnB1dC5pcyhcIlt0eXBlPSdjaGVja2JveCddXCIpXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5UmFkaW8pICAgIGlmIGlucHV0LmlzKFwiW3R5cGU9J3JhZGlvJ11cIilcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMudGVybXMpICAgICAgICAgaWYgaW5wdXQuaXMoXCIuaW5wdXQtdGVybXNcIilcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXHRcdFx0XHRcdFx0cGFyZW50LmZpbmQoXCIuY29udHJvbC1lcnJvclwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgUlVUXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiLnJ1dFwiKVxuXHRcdFx0XHRcdGlucHV0LnZhbCggJC5SdXQuZm9ybWF0ZWFyKCQuUnV0LnF1aXRhckZvcm1hdG8oaW5wdXQudmFsKCkpLCQuUnV0LmdldERpZ2l0bygkLlJ1dC5xdWl0YXJGb3JtYXRvKGlucHV0LnZhbCgpKSkpIClcblx0XHRcdFx0XHRpZiAhJC5SdXQudmFsaWRhcihpbnB1dC52YWwoKSlcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZFJ1dClcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cdFx0XHRcdCMgU2kgbm8gaGF5IGVycm9yZXMsIHNlIHF1aXRhIGVsIG1lbnNhamUgZGUgZXJyb3Jcblx0XHRcdFx0aWYgZXJyb3IgPT0gZmFsc2Vcblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZhbHNlKVxuXG5cblxuXHRmb3JtSW5wdXRNZXNzYWdlOiAoaW5wdXQsbWVzc2FnZSkgLT5cblx0XHRpZiBtZXNzYWdlXG5cdFx0XHRpbnB1dC5hZGRDbGFzcyhcImNvbnRyb2wtZXJyb3JcIilcblx0XHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXHRcdFx0cGFyZW50LmFkZENsYXNzKFwiY29udHJvbC1lcnJvclwiKVxuXHRcdFx0cGFyZW50LmZpbmQoXCIuY29udHJvbC1tZXNzYWdlXCIpLnRleHQobWVzc2FnZSkuYWRkQ2xhc3MoXCJpblwiKVxuXHRcdGVsc2Vcblx0XHRcdGlucHV0LnJlbW92ZUNsYXNzKFwiY29udHJvbC1lcnJvclwiKVxuXHRcdFx0cGFyZW50ID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sLXZhbHVlXCIpXG5cdFx0XHRwYXJlbnQucmVtb3ZlQ2xhc3MoXCJjb250cm9sLWVycm9yXCIpXHRcblx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtbWVzc2FnZVwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLW1lc3NhZ2VcIikucmVtb3ZlQ2xhc3MoXCJpbiBvdXRcIikudGV4dChcIlwiKVxuXHRcdFx0LDUwMFxuXG5cblxuXHRlbWFpbDogKGVsZW1lbnRvLHZhbG9yKSAtPlxuXHRcdGlmIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodmFsb3IpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cblxuXG5cbiJdfQ==