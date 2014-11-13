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
    return app.faq.init();
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

//# sourceMappingURL=data:application/json;base64,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T0FEaUI7SUFBQSxDQXhMbEI7QUFBQSxJQXlNQSxLQUFBLEVBQU8sU0FBQyxRQUFELEVBQVUsS0FBVixHQUFBO0FBQ04sTUFBQSxJQUFHLDJKQUEySixDQUFDLElBQTVKLENBQWlLLEtBQWpLLENBQUg7QUFDQyxlQUFPLElBQVAsQ0FERDtPQUFBLE1BQUE7QUFHQyxlQUFPLEtBQVAsQ0FIRDtPQURNO0lBQUEsQ0F6TVA7R0EzMEJELENBQUE7QUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG5cdGFwcC5pbml0KClcblxuYXBwID1cblxuXHRpbml0OiAtPlxuXG5cdFx0IyBCcm93c2Vyc1xuXHRcdGFwcC5icm93c2VycygpXG5cblx0XHQjIE1lbsO6XG5cdFx0YXBwLnNlY3JldE1lbnUuaW5pdCgpXG5cblx0XHQjIFNoYXJlc1xuXHRcdGFwcC5zaGFyZXMuaW5pdCgpXG5cblx0XHQjIFRvb2x0aXBzXG5cdFx0YXBwLnRvb2x0aXBzKClcblxuXHRcdCMgQWxlcnRhc1xuXHRcdGFwcC5hbGVydC5pbml0KClcblxuXHRcdCMgVmFsaWRhY2nDs24gZGUgZm9ybXVsYXJpb3Ncblx0XHRhcHAudmFsaWRhdGlvbi5mb3JtICQoXCIuY29udHJvbHNcIilcblxuXHRcdCMgTG9hZGluZ1xuXHRcdGFwcC5sb2FkaW5nLmluaXQoKVxuXG5cdFx0IyBNYXBhXG5cdFx0YXBwLmdtYXAoKVxuXG5cdFx0IyBFdmVudG9zIGVuIHNjcm9sbFxuXHRcdGFwcC5zY3JvbGwoKVxuXG5cdFx0IyBQbHVnaW5zXG5cdFx0YXBwLnBsdWdpbnMuaW5pdCgpXG5cblx0XHQjIFRvb2xzXG5cdFx0YXBwLnRvb2xzKClcblxuIz1pbmNsdWRlX3RyZWUgYXBwXG5cblxuYXBwLmFsZXJ0ID1cblxuXHRpbml0OiAtPlxuXG5cdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblxuXHRcdCQod2luZG93KS5yZXNpemUgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cblxuXHRcdGlmICQoXCJbZGF0YS1hbGVydF1cIikubGVuZ3RoXG5cblx0XHRcdCQoXCJhW2RhdGEtYWxlcnRdXCIpLmxpdmUgXCJjbGlja1wiLCAtPlxuXHRcdFx0XHRlbGVtZW50ID0gJCh0aGlzKVxuXHRcdFx0XHRhcHAuYWxlcnQub3BlblxuXHRcdFx0XHRcdHRpdGxlOiBlbGVtZW50LmF0dHIoXCJkYXRhLXRpdGxlXCIpXG5cdFx0XHRcdFx0Y29udGVudDogZWxlbWVudC5hdHRyKFwiZGF0YS1jb250ZW50XCIpXG5cdFx0XHRcdFx0YWNjZXB0OiB0cnVlXG5cdFx0XHRcdFx0Y2FuY2VsOiB0cnVlXG5cdFx0XHRcdFx0Y2FsbGJhY2tfdHJ1ZTogLT5cblx0XHRcdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSBlbGVtZW50LmF0dHIoXCJocmVmXCIpXG5cdFx0XHRcdGZhbHNlXG5cblx0XHRcdCQoXCJbZGF0YS1hbGVydF1cIikuZWFjaCAtPlxuXHRcdFx0XHRlbGVtZW50ID0gJCh0aGlzKVxuXHRcdFx0XHRpZiAhZWxlbWVudC5pcyhcImFcIikgJiYgIWVsZW1lbnQuaXMoXCJidXR0b25cIilcblx0XHRcdFx0XHRhcHAuYWxlcnQub3BlblxuXHRcdFx0XHRcdFx0dGl0bGU6IGVsZW1lbnQuYXR0cihcImRhdGEtdGl0bGVcIilcblx0XHRcdFx0XHRcdGNvbnRlbnQ6IGVsZW1lbnQuYXR0cihcImRhdGEtY29udGVudFwiKVxuXHRcdFx0XHRcdFx0YWNjZXB0OiB0cnVlXG5cdFx0XHRcdFx0XHRjYW5jZWw6IHRydWVcblxuXG5cdG9wZW46IChvcHRpb25zKSAtPlxuXG5cdFx0dGl0bGUgPSBcIlwiXG5cdFx0Y29udGVudCA9IFwiXCJcblx0XHRidXR0b25zID0gXCJcIlxuXHRcdGNsb3NlID0gXCJcIlxuXG5cdFx0aWYgb3B0aW9ucy5zdGF0aWMgPT0gdHJ1ZVxuXHRcdFx0YWxlcnRsaWdodGNsYXNzICAgID0gJydcblx0XHRcdG9wdGlvbnMuY2xvc2UgPSBmYWxzZVxuXHRcdGVsc2Vcblx0XHRcdGFsZXJ0bGlnaHRjbGFzcyA9ICcgZmFsc2UnXG5cblx0XHRpZiBvcHRpb25zLmFsZXJ0Y2xhc3Ncblx0XHRcdGFsZXJ0Y2xhc3MgPSBcImFsZXJ0LVwiICsgb3B0aW9ucy5hbGVydGNsYXNzXG5cdFx0ZWxzZVxuXHRcdFx0YWxlcnRjbGFzcyA9IFwiYWxlcnQtZGVmYXVsdFwiXG5cblx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHR0aXRsZSA9IFwiPGgyIGNsYXNzPSdhbGVydC10aXRsZSc+XCIgKyBvcHRpb25zLnRpdGxlICsgXCI8L2gyPlwiXG5cblx0XHRpZiBvcHRpb25zLmNvbnRlbnRcblx0XHRcdGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J2FsZXJ0LWNvbnRlbnQnPlwiICsgb3B0aW9ucy5jb250ZW50ICsgXCI8L2Rpdj5cIlxuXG5cdFx0aWYgb3B0aW9ucy5jbG9zZSA9PSB1bmRlZmluZWRcblx0XHRcdG9wdGlvbnMuY2xvc2UgPSB0cnVlXG5cblx0XHRpZiBvcHRpb25zLmNsb3NlID09IHRydWVcblx0XHRcdGNsb3NlID0gJzxidXR0b24gY2xhc3M9XCJhbGVydC1jbG9zZSBmYWxzZVwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9idXR0b24+J1xuXG5cdFx0aWYgb3B0aW9ucy5idXR0b25zXG5cdFx0XHRidXR0b25zICs9IG9wdGlvbnMuYnV0dG9ucyArIFwiIFwiXG5cblx0XHRpZiBvcHRpb25zLmNhbmNlbCA9PSB0cnVlXG5cdFx0XHRidXR0b25zICs9ICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGZhbHNlXCI+Q2FuY2VsYXI8L2J1dHRvbj4gJ1xuXG5cdFx0aWYgb3B0aW9ucy5hY2NlcHQgPT0gdHJ1ZVxuXHRcdFx0YnV0dG9ucyArPSAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeSB0cnVlXCI+QWNlcHRhcjwvYnV0dG9uPiAnXG5cblx0XHRpZiBidXR0b25zXG5cdFx0XHRidXR0b25zID0gJzxkaXYgY2xhc3M9XCJhbGVydC1idXR0b25zXCI+JytidXR0b25zKyc8L2Rpdj4nXG5cblxuXHRcdGh0bWwgPVxuXHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydCAnK2FsZXJ0Y2xhc3MrJyBpblwiPicrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQtbGlnaHQgJythbGVydGxpZ2h0Y2xhc3MrJ1wiPjwvZGl2PicrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQtYm94IGVxdWlkaXN0XCI+Jytcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWlubmVyXCI+Jytcblx0XHRcdFx0XHRcdGNsb3NlICtcblx0XHRcdFx0XHRcdHRpdGxlICtcblx0XHRcdFx0XHRcdGNvbnRlbnQgK1xuXHRcdFx0XHRcdFx0YnV0dG9ucyArXG5cdFx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0JzwvZGl2PidcblxuXG5cdFx0JChcImJvZHlcIikuYXBwZW5kKGh0bWwpXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJhbGVydC1pblwiKVxuXG5cdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdCwxMDBcblxuXG5cdFx0JChcIi5hbGVydCAudHJ1ZSwgLmFsZXJ0IC5mYWxzZVwiKS51bmJpbmQoXCJjbGlja1wiKS5iaW5kIFwiY2xpY2tcIiwgLT4gXG5cblx0XHRcdGFsZXJ0b3JpZ2luID0gJCh0aGlzKS5jbG9zZXN0KFwiLmFsZXJ0XCIpXG5cblx0XHRcdGFsZXJ0b3JpZ2luLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdGFsZXJ0b3JpZ2luLnJlbW92ZSgpXG5cdFx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblx0XHRcdCwyMDBcblxuXHRcdFx0aWYgJCh0aGlzKS5oYXNDbGFzcyhcInRydWVcIikgJiYgb3B0aW9ucy5jYWxsYmFja190cnVlXG5cdFx0XHRcdG9wdGlvbnMuY2FsbGJhY2tfdHJ1ZSgpXG5cblx0XHRcdGlmICQodGhpcykuaGFzQ2xhc3MoXCJmYWxzZVwiKSAmJiBvcHRpb25zLmNhbGxiYWNrX2ZhbHNlXG5cdFx0XHRcdG9wdGlvbnMuY2FsbGJhY2tfZmFsc2UoKVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdGNsb3NlYWxsOiAtPlxuXHRcdCQoXCIuYWxlcnRcIikuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWluXCIpXG5cblx0cmVtb3ZlYWxsOiAtPlxuXHRcdCQoXCIuYWxlcnRcIikuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHQkKFwiLmFsZXJ0XCIpLnJlbW92ZSgpXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWluXCIpXG5cdFx0LDIwMFxuXG5cdGVxdWlkaXN0OiAtPlxuXHRcdCQoXCIuZXF1aWRpc3RcIikuZWFjaCAtPlxuXHRcdFx0X3RoaXMgPSAkKHRoaXMpXG5cdFx0XHRfbGVmdCA9IChfdGhpcy5wYXJlbnQoKS53aWR0aCgpIC0gX3RoaXMud2lkdGgoKSkgLyAyXG5cdFx0XHRfbGVmdCA9IDAgaWYgX2xlZnQgPCAwXG5cdFx0XHRfdG9wID0gKF90aGlzLnBhcmVudCgpLmhlaWdodCgpIC0gX3RoaXMuaGVpZ2h0KCkpIC8gMlxuXHRcdFx0X3RvcCA9IDAgaWYgX3RvcCA8IDBcblx0XHRcdF90aGlzLmNzc1xuXHRcdFx0ICBsZWZ0OiBfbGVmdCArIFwicHhcIlxuXHRcdFx0ICB0b3A6IF90b3AgKyBcInB4XCJcblxuXHRsb2FkOiAoaHJlZixjc3NjbGFzcz1cImRlZmF1bHRcIixjYWxsYmFjaz1mYWxzZSkgLT5cblx0XHQkLmFqYXgoXG5cdFx0XHR1cmw6IGhyZWZcblx0XHRcdHR5cGU6ICdHRVQnXG5cdFx0KS5kb25lIChyZXN1bHQpIC0+XG5cdFx0XHRhcHAuYWxlcnQub3BlblxuXHRcdFx0XHRjb250ZW50OiByZXN1bHRcblx0XHRcdFx0YWxlcnRjbGFzczogY3NzY2xhc3Ncblx0XHRcdGlmIGNhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrKClcblxuXG5cblxuYXBwLmlzTW9iaWxlID0gLT5cblx0aWYgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0dHJ1ZVxuXHRlbHNlXG5cdFx0ZmFsc2VcblxuYXBwLmJyb3dzZXJzID0gLT5cblxuXHQjIE1vYmlsZVxuXHRpZiBhcHAuaXNNb2JpbGUoKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbW9iaWxlXCIpXG5cblx0IyBJRVxuXHRpZiAkLmJyb3dzZXIubXNpZSB8fCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdUcmlkZW50LycpIT0tMVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtaWVcIilcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLWllXCIrJC5icm93c2VyLnZlcnNpb24pXG5cdFx0aWYgcGFyc2VJbnQoJC5icm93c2VyLnZlcnNpb24pIDw9IDdcblx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdHRpdGxlOiBcIkVzdMOhcyB1c2FuZG8gdW4gbmF2ZWdhZG9yIG11eSBhbnRpZ3VvXCJcblx0XHRcdFx0Y29udGVudDogXCJBY3R1YWxpemEgdHUgbmF2ZWdhZG9yIGFob3JhIHkgZGlzZnJ1dGEgZGUgdW5hIG1lam9yIGV4cGVyaWVuY2lhIGVuIEZhbGFiZWxsYSBOb3Zpb3MuXCJcblx0XHRcdFx0YnV0dG9uczogXCI8YSBocmVmPSdodHRwOi8vYnJvd3NlaGFwcHkuY29tLz9sb2NhbGU9ZXMnIHRhcmdldD0nX2JsYW5rJyBjbGFzcz0nYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi1iaWcnPkFjdHVhbGl6YXIgYWhvcmE8L2E+XCJcblx0XHRcdFx0c3RhdGljOiB0cnVlXG5cblxuXG5hcHAuY29va2llID0gXG5cblx0Y3JlYXRlOiAobmFtZSwgdmFsdWUsIGRheXMpIC0+XG5cdFx0aWYgZGF5c1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKClcblx0XHRcdGRhdGUuc2V0VGltZSBkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMClcblx0XHRcdGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKVxuXHRcdGVsc2Vcblx0XHRcdGV4cGlyZXMgPSBcIlwiXG5cdFx0ZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiXG5cblx0cmVhZDogKG5hbWUpIC0+XG5cdFx0bmFtZUVRID0gbmFtZSArIFwiPVwiXG5cdFx0Y2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpXG5cdFx0aSA9IDBcblxuXHRcdHdoaWxlIGkgPCBjYS5sZW5ndGhcblx0XHRcdGMgPSBjYVtpXVxuXHRcdFx0YyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKSAgd2hpbGUgYy5jaGFyQXQoMCkgaXMgXCIgXCJcblx0XHRcdHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCkgIGlmIGMuaW5kZXhPZihuYW1lRVEpIGlzIDBcblx0XHRcdGkrK1xuXHRcdG51bGxcblxuXHRkZWxldGU6IChuYW1lKSAtPlxuXHRcdGFwcC5jb29raWUuY3JlYXRlIG5hbWUsIFwiXCIsIC0xXG5cblxuXG5cbmFwcC5mb3JtYXROdW1iZXIgPSAobikgLT5cblx0bi50b0ZpeGVkKDApLnJlcGxhY2UgLy4vZywgKGMsIGksIGEpIC0+XG5cdFx0KGlmIGkgYW5kIGMgaXNudCBcIixcIiBhbmQgbm90ICgoYS5sZW5ndGggLSBpKSAlIDMpIHRoZW4gXCIuXCIgKyBjIGVsc2UgYylcblxuXG5cblxuYXBwLmdtYXAgPSAtPlxuXG5cdGlmICQoXCIubWFwXCIpLmxlbmd0aFxuXG5cdFx0JChcIi5tYXBcIikuZWFjaCAtPlxuXG5cdFx0XHRtID0gJCh0aGlzKVxuXG5cdFx0XHRtYXJrZXJzID0gbmV3IEFycmF5KClcblx0XHRcdGluZm93aW5kb3cgPSBmYWxzZVxuXG5cdFx0XHRtYXBfem9vbSA9IHBhcnNlSW50KG0uYXR0cihcImRhdGEtem9vbVwiKSlcblxuXHRcdFx0bWFwX2xhdCA9IG0uYXR0cihcImRhdGEtbGF0XCIpXG5cdFx0XHRtYXBfbG5nID0gbS5hdHRyKFwiZGF0YS1sbmdcIilcblxuXHRcdFx0YmxhY2thbmR3aGl0ZSA9IFtcblx0XHRcdFx0ZmVhdHVyZVR5cGU6IFwiYWxsXCJcblx0XHRcdFx0ZWxlbWVudFR5cGU6IFwiYWxsXCJcblx0XHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHRcdHNhdHVyYXRpb246IC0xMDBcblx0XHRcdFx0XVxuXHRcdFx0XVxuXG5cdFx0XHRtYXBPcHRpb25zID1cblx0XHRcdFx0em9vbTogbWFwX3pvb21cblx0XHRcdFx0Y2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcF9sYXQsbWFwX2xuZylcblx0XHRcdFx0bWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuXHRcdFx0XHRkaXNhYmxlRGVmYXVsdFVJOiB0cnVlXG5cdFx0XHRcdHNjcm9sbHdoZWVsOiBmYWxzZVxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcblx0XHRcdFx0c3R5bGVzOiBibGFja2FuZHdoaXRlXG5cblx0XHRcdGlmICFtLmZpbmQoXCIubWFwLWdtYXBcIikubGVuZ3RoXG5cdFx0XHRcdG0uYXBwZW5kICc8ZGl2IGNsYXNzPVwibWFwLWdtYXBcIj48L2Rpdj4nXG5cblxuXHRcdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtLmZpbmQoXCIubWFwLWdtYXBcIilbMF0sIG1hcE9wdGlvbnMpXG5cblxuXHRcdFx0bS5hcHBlbmQgJycrXG5cdCAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXpvb21cIj4nK1xuXHQgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJtYXAtem9vbS1idXR0b24gbWFwLXpvb20taW4gIGJ1dHRvbiBidXR0b24tc21hbGwgYnV0dG9uLWRhcmtcIj48aSBjbGFzcz1cImZhIGZhLXBsdXNcIj48L2k+PC9idXR0b24+Jytcblx0ICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwibWFwLXpvb20tYnV0dG9uIG1hcC16b29tLW91dCBidXR0b24gYnV0dG9uLXNtYWxsIGJ1dHRvbi1kYXJrXCI+PGkgY2xhc3M9XCJmYSBmYS1taW51c1wiPjwvaT48L2J1dHRvbj4nK1xuXHQgICAgICAgICAgICAnPC9kaXY+J1xuXG5cdFx0XHRtLmZpbmQoXCIubWFwLXpvb20taW5cIikuY2xpY2sgLT5cblx0XHRcdFx0bWFwLnNldFpvb20gbWFwLmdldFpvb20oKSArIDFcblx0XHRcdFx0ZmFsc2VcblxuXHRcdFx0bS5maW5kKFwiLm1hcC16b29tLW91dFwiKS5jbGljayAtPlxuXHRcdFx0XHRtYXAuc2V0Wm9vbSBtYXAuZ2V0Wm9vbSgpIC0gMVxuXHRcdFx0XHRmYWxzZVxuXG5cblxuXHRcdFx0IyBDYXJnYXIgY29vcmRlbmFkYXNcblxuXHRcdFx0bS5maW5kKFwiLm1hcC1tYXJrZXJcIikuZWFjaCAtPlxuXG5cdFx0XHRcdG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoXG5cdFx0XHRcdFx0cG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJCh0aGlzKS5hdHRyKFwiZGF0YS1sYXRcIiksICQodGhpcykuYXR0cihcImRhdGEtbG5nXCIpKVxuXHRcdFx0XHRcdGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1Bcblx0XHRcdFx0XHQjaWNvbjogXCJpbWcvbWFya2VyLnBuZ1wiXG5cdFx0XHRcdFx0bWFwOiBtYXBcblx0XHRcdFx0KVxuXHRcdFx0XG5cdFx0XHRcdGNvbnRlbnQgPVxuXHRcdFx0XHRcdFwiPGRpdiBjbGFzcz0nbWFwLWluZm93aW5kb3cnPlwiK1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5odG1sKCkrXG5cdFx0XHRcdFx0XCI8L2Rpdj5cIlxuXG5cblx0XHRcdFx0bWFya2VyWydjb250ZW50J10gPSBjb250ZW50XG5cdFx0XHRcdG1hcmtlclsndmFsdWUnXSA9ICQodGhpcykudmFsKClcblxuXHRcdFx0XHRpZiAhaW5mb3dpbmRvd1xuXHRcdFx0XHRcdGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhjb250ZW50OlwieFwiKVxuXG5cdFx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyIG1hcCwgJ2NsaWNrJywgLT5cblx0XHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKClcblxuXHRcdFx0XHRpZiAkKHRoaXMpLmh0bWwoKS5sZW5ndGhcblx0XHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lciBtYXJrZXIsIFwiY2xpY2tcIiwgLT5cblx0XHRcdFx0XHRcdGluZm93aW5kb3cuY2xvc2UoKVxuXHRcdFx0XHRcdFx0aW5mb3dpbmRvdy5zZXRDb250ZW50IGNvbnRlbnRcblx0XHRcdFx0XHRcdGluZm93aW5kb3cub3BlbiBtYXAsIHRoaXNcblx0XHRcdFx0XHRcdCNtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKVxuXG5cdFx0XHRcdG1hcmtlcnMucHVzaChtYXJrZXIpXG5cblxuXG5cblxuXG5cblxuYXBwLmxvYWRpbmcgPVxuXG5cdGluaXQ6IC0+XG5cdFx0aWYgJChcIltkYXRhLWxvYWRpbmddXCIpLmxlbmd0aFxuXHRcdFx0YXBwLmxvYWRpbmcuaW4oKVxuXHRcdCMjI1xuXHRcdGFwcC5sb2FkaW5nLmluKClcblx0XHQkKFwiYm9keVwiKS5pbWFnZXNMb2FkZWQgLT5cblx0XHRcdGFwcC5sb2FkaW5nLm91dCgpXG5cdFx0IyMjXG5cblx0aW46IChlbGVtZW50KSAtPlxuXHRcdGVsZW1lbnQgPSAkKFwiYm9keVwiKSBpZiAhZWxlbWVudFxuXHRcdGVsZW1lbnQuYXBwZW5kICcnK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nXCI+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nLWljb25cIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibG9hZGluZy1pY29uLWNpcmNsZVwiPjxkaXY+PC9kaXY+PC9kaXY+Jytcblx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+J1xuXHRvdXQ6IC0+XG5cdFx0JChcIi5sb2FkaW5nXCIpLmFkZENsYXNzIFwib3V0XCJcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHQkKFwiLmxvYWRpbmdcIikucmVtb3ZlKClcblx0XHQsNTAwXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJsb2FkZWRcIilcblxuXG5cblxuYXBwLnBsdWdpbnMgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIyNcblx0XHQjICBBdXRvc2l6ZVxuXHRcdCQoXCJ0ZXh0YXJlYVwiKS5hdXRvc2l6ZVxuXHRcdFx0YXBwZW5kOiBcIlxcblwiXG5cblx0XHQjIElzb3RvcGVcblx0XHRpZiAkKFwiLmlzb3RvcGVcIikubGVuZ3RoXG5cdFx0XHRpc290b3BlID0gJChcIi5pc290b3BlXCIpLmlzb3RvcGUoKVxuXG5cdFx0IyBTbGlkZXJcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRpZiAkKFwiLnJveWFsU2xpZGVyXCIpLmxlbmd0aFxuXG5cdFx0XHRcdCQoXCIucm95YWxTbGlkZXJcIikucm95YWxTbGlkZXJcblx0XHRcdFx0XHRpbWFnZVNjYWxlTW9kZTogJ2ZpdCdcblx0XHRcdFx0XHRzbGlkZXJEcmFnOiBmYWxzZVxuXHRcdFx0XHRcdGFycm93c05hdkF1dG9IaWRlOiBmYWxzZVxuXHRcdFx0XHRcdGxvb3A6IHRydWVcblx0XHRcdFx0XHQjbG9vcFJld2luZDogdHJ1ZVxuXHRcdFx0XHRcdHNsaWRlc1NwYWNpbmc6IDBcblx0XHRcdFx0XHR0cmFuc2l0aW9uU3BlZWQ6IDYwMFxuXHRcdFx0XHRcdGF1dG9QbGF5OlxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdFx0cGF1c2VPbkhvdmVyOiB0cnVlXG5cdFx0XHRcdFx0XHRkZWxheTogNDAwMFxuXHRcdFx0XHRcdGltYWdlU2NhbGVQYWRkaW5nOiAwXG5cdFx0XHRcdFx0YWRkQWN0aXZlQ2xhc3M6IHRydWVcblx0XHRcdFx0XHRuYXZpZ2F0ZUJ5Q2xpY2s6IGZhbHNlXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdCw1MFxuXG5cdFx0JCh3aW5kb3cpLm9uIFwibG9hZFwiLCAtPlxuXHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXG5cdFx0cl90aW1lID0gZmFsc2Vcblx0XHQkKHdpbmRvdykucmVzaXplIC0+XG5cdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cdFx0XHRyID0gdHJ1ZVxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJfdGltZSlcblx0XHRcdHJfdGltZSA9IHNldFRpbWVvdXQgLT5cblx0XHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXHRcdFx0XHRyID0gZmFsc2Vcblx0XHRcdCw2MDBcblx0XHQjIyNcblxuXG5cblx0cmVsYXlvdXQ6IC0+XG5cblx0XHQjIyNcblx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdCQoXCIuaXNvdG9wZVwiKS5pc290b3BlXG5cdFx0XHRcdHJlbGF5b3V0OiB0cnVlXG5cdFxuXHRcdCQoXCJib2R5XCIpLmltYWdlc0xvYWRlZCAtPlxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0XHRpZiAkKFwiLmlzb3RvcGVcIikubGVuZ3RoXG5cdFx0XHRcdCQoXCIuaXNvdG9wZVwiKS5pc290b3BlXG5cdFx0XHRcdFx0cmVsYXlvdXQ6IHRydWVcblx0XHQjIyNcblxuXG5cblxuYXBwLnNjcm9sbCA9IC0+XG5cblx0I2lmICFhcHAuaXNNb2JpbGUoKSAmJiAhJC5icm93c2VyLm1zaWVcblxuXHRzY3JvbGxfcHJldiA9IDBcblx0JCh3aW5kb3cpLnNjcm9sbCAtPlxuXG5cdFx0IyBFc2NvbmRlciBoZWFkZXJcblx0XHQjIyNcblx0XHRzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcblx0XHRoZWlnaHRfd2luZG93ID0gJCh3aW5kb3cpLmhlaWdodCgpXG5cdFx0aGVpZ2h0X2JvZHkgPSAkKFwiYm9keVwiKS5oZWlnaHQoKVxuXHRcdGlmIHNjcm9sbCA+IDUwICYmIHNjcm9sbCArIGhlaWdodF93aW5kb3cgPCBoZWlnaHRfYm9keSAtIDUwXG5cdFx0XHRpZiBzY3JvbGwtc2Nyb2xsX3ByZXYgPiAwXG5cdFx0XHRcdCQoXCIuaGVhZGVyLXRvcC1lbGVtZW50c1wiKS5hZGRDbGFzcyBcImhpZGVcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQkKFwiLmhlYWRlci10b3AtZWxlbWVudHNcIikucmVtb3ZlQ2xhc3MgXCJoaWRlXCJcblx0XHRcdFx0c2Nyb2xsX2luaXQgPSAwXG5cdFx0ZWxzZVxuXHRcdFx0JChcIi5oZWFkZXItdG9wLWVsZW1lbnRzXCIpLnJlbW92ZUNsYXNzIFwiaGlkZVwiXG5cdFx0c2Nyb2xsX3ByZXYgPSBzY3JvbGxcblx0XHQjIyNcblxuXHRcdCMgTW9zdHJhciBlbiBzY3JvbGxcblxuXHRcdGlmICQoXCIuZGlzcGxheXNjcm9sbFwiKS5sZW5ndGhcblx0XHRcdCQoXCIuZGlzcGxheXNjcm9sbFwiKS5lYWNoIC0+XG5cdFx0XHRcdGVsZW1lbnQgPSAkKHRoaXMpXG5cdFx0XHRcdGVsZW1lbnRfdG9wID0gZWxlbWVudC5vZmZzZXQoKS50b3Bcblx0XHRcdFx0ZWxlbWVudF9oZWlnaHQgPSBlbGVtZW50LmhlaWdodCgpXG5cdFx0XHRcdGlmIHNjcm9sbCArIGhlaWdodF93aW5kb3cgPiBlbGVtZW50X2hlaWdodCArIGVsZW1lbnRfdG9wXG5cdFx0XHRcdFx0ZWxlbWVudC5hZGRDbGFzcyBcImluXCJcblxuXG5cblxuYXBwLnNlY3JldE1lbnUgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIENvbXBhcmUgVVJMIGluIG1lbnVcblx0XHQjIyNcblx0XHR1cmwgPSBkb2N1bWVudC5VUkxcblx0XHR1cmxfc3BsaXQgPSB1cmwuc3BsaXQoXCIvXCIpXG5cdFx0bmFtZV9wYWdlID0gdXJsX3NwbGl0W3VybF9zcGxpdC5sZW5ndGgtMV1cblx0XHRuYW1lX3BhZ2Vfc3BsaXQgPSBuYW1lX3BhZ2Uuc3BsaXQoXCI/XCIpIFxuXHRcdG5hbWVfcGFnZV9jbGVhciA9IG5hbWVfcGFnZV9zcGxpdFswXVxuXHRcdGxpID0gJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgYVtocmVmPSdcIituYW1lX3BhZ2VfY2xlYXIrXCInXVwiKS5wYXJlbnQoXCJsaVwiKVxuXHRcdGxpLmFkZENsYXNzIFwiY3VycmVudC1pdGVtXCJcblx0XHRsaS5wYXJlbnQoKS5wYXJlbnQoXCJsaVwiKS5hZGRDbGFzcyBcImN1cnJlbnQtaXRlbVwiXG5cdFx0IyMjXG5cblx0XHQjIERlc2t0b3Bcblx0XHQkKFwiLnNlY3JldG1lbnUtY29udGVudCB1bCBsaSBhXCIpLmVhY2ggLT5cblx0XHRcdGlmICQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmxlbmd0aFxuXHRcdFx0XHRpZiAhJCh0aGlzKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpLnByZXBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nKVxuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLnByZXBlbmQgJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwic2VjcmV0bWVudS1iYWNrXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+IEF0csOhczwvYT48L2xpPidcblxuXHRcdGlmICQoXCIuc2VjcmV0bWVudS1jb250ZW50IHVsIGxpLmN1cnJlbnQtaXRlbSBhLnNlY3JldG1lbnUtcGFyZW50XCIpLmxlbmd0aFxuXHRcdFx0YXBwLnNlY3JldE1lbnUub3Blbkx2bERlc2t0b3AgJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgdWwgbGkuY3VycmVudC1pdGVtIGEuc2VjcmV0bWVudS1wYXJlbnRcIilcblxuXHRcdCMgTW9iaWxlXG5cblx0XHQkKFwiLnNlY3JldG1lbnUtYnV0dG9uXCIpLmNsaWNrIC0+XG5cdFx0XHRpZiAhJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LWluXCIpXG5cdFx0XHRcdGFwcC5zZWNyZXRNZW51Lm9wZW4gJChcIi5zZWNyZXRtZW51LWNvbnRlbnRcIikuaHRtbCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGFwcC5zZWNyZXRNZW51LmNsb3NlKClcblx0XHQkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWZyb250XCIpLmNsaWNrIC0+XG5cdFx0XHRpZiAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtaW5cIilcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUuY2xvc2UoKVxuXHRcdHRydWVcblxuXHRvcGVuTHZsRGVza3RvcDogKGVsZW1lbnQpIC0+XG5cdFx0dWwgPSBlbGVtZW50LnBhcmVudCgpLmZpbmQoXCJ1bFwiKVxuXHRcdHVsLmFkZENsYXNzKFwiaW5cIilcblx0XHR1bC5maW5kKFwiYS5zZWNyZXRtZW51LWJhY2tcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHR1bC5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHR1bC5yZW1vdmVDbGFzcyhcImluIG91dFwiKVxuXHRcdFx0LDcwMFxuXHRcdFx0ZmFsc2VcblxuXG5cdG9wZW46IChodG1sLGNoaWxkcmVuPWZhbHNlLGRpcmVjdGlvbj1cImxlZnRcIikgLT5cblxuXHRcdGxlbmd0aCAgICA9ICQoXCIuc2VjcmV0bWVudVwiKS5sZW5ndGggKyAxXG5cdFx0Y29udGFpbmVyID0gJzxkaXYgY2xhc3M9XCJzZWNyZXRtZW51IHNlY3JldG1lbnUtbHZsLScrKCQoXCIuc2VjcmV0bWVudVwiKS5sZW5ndGggKyAxKSsnXCI+PC9kaXY+J1xuXG5cdFx0aWYgIWNoaWxkcmVuXG5cdFx0XHQkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWJhY2tcIikuaHRtbChjb250YWluZXIpIFxuXHRcdGVsc2Vcblx0XHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItYmFja1wiKS5hcHBlbmQoY29udGFpbmVyKVxuXG5cdFx0JChcIi5zZWNyZXRtZW51XCIpLmVxKC0xKS5odG1sKCc8ZGl2IGNsYXNzPVwic2VjcmV0bWVudS1pbm5lclwiPicraHRtbCsnPC9kaXY+JylcblxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VjcmV0bWVudS1pbiBzZWNyZXRtZW51LVwiK2RpcmVjdGlvbilcblx0XHQkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiLGxlbmd0aClcblxuXHRcdCMgU2kgdGllbmUgaGlqb3Ncblx0XHQkKFwiLnNlY3JldG1lbnUgdWwgbGkgYVwiKS5lYWNoIC0+XG5cdFx0XHRpZiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5sZW5ndGhcblx0XHRcdFx0aWYgISQodGhpcykuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKVxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKS5wcmVwZW5kKCc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+JylcblxuXHRcdCMgQ2xpY2sgZW4gaXRlbSBkZSBtZW7DulxuXHRcdCQoXCIuc2VjcmV0bWVudSB1bCBsaSBhLnNlY3JldG1lbnUtcGFyZW50XCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPlxuXHRcdFx0YXBwLnNlY3JldE1lbnUub3BlbiBcIjx1bD5cIiskKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5odG1sKCkrXCI8L3VsPlwiLCB0cnVlXG5cdFx0XHRmYWxzZVxuXG5cdFx0JChcIi5zZWNyZXRtZW51IGEuc2VjcmV0bWVudS1iYWNrXCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPlxuXHRcdFx0bGFzdG1lbnUgPSBwYXJzZUludCAkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiKVxuXHRcdFx0JChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIiwobGFzdG1lbnUtMSkpXG5cdFx0XHQkKFwiLnNlY3JldG1lbnUuc2VjcmV0bWVudS1sdmwtXCIrbGFzdG1lbnUpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdCQoXCIuc2VjcmV0bWVudS5zZWNyZXRtZW51LWx2bC1cIitsYXN0bWVudSkucmVtb3ZlKClcblx0XHRcdCw3MDBcblx0XHRcdGZhbHNlXG5cblx0Y2xvc2U6IC0+XG5cblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtb3V0XCIpXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MgXCJzZWNyZXRtZW51LWluIHNlY3JldG1lbnUtb3V0IHNlY3JldG1lbnUtbGVmdCBzZWNyZXRtZW51LXJpZ2h0IHNlY3JldG1lbnUtbHZsLVwiKyQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVBdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiKVxuXHRcdFx0JChcIi5zZWNyZXRtZW51XCIpLnJlbW92ZSgpXG5cdFx0LDcwMFxuXG5cblxuXG5cbmFwcC5zaGFyZXMgPVxuXG5cdGluaXQ6IC0+XG5cdFx0JChcIi5zaGFyZVwiKS5jbGljayAtPlxuXHRcdFx0YXBwLnNoYXJlcy5zaGFyZSAkKHRoaXMpXG5cblx0c2hhcmU6IChlbGVtZW50KSAtPlxuXG5cdFx0c2hhcmVfdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQuYXR0cihcImRhdGEtdXJsXCIpKVxuXHRcdHNoYXJlX3RleHQgPSBlbmNvZGVVUklDb21wb25lbnQoZWxlbWVudC5hdHRyKFwiZGF0YS10ZXh0XCIpKVxuXHRcdHNoYXJlX2ltZyA9IGVuY29kZVVSSUNvbXBvbmVudChlbGVtZW50LmF0dHIoXCJkYXRhLWltZ1wiKSlcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1mYWNlYm9va1wiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT1cIitzaGFyZV91cmwsIDUwMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtdHdpdHRlclwiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD9zb3VyY2U9d2ViY2xpZW50JmFtcDt0ZXh0PVwiK3NoYXJlX3RleHQrXCImYW1wO3VybD1cIitzaGFyZV91cmwsIDUwMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtcGludGVyZXN0XCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHA6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9XCIrc2hhcmVfdXJsK1wiJm1lZGlhPVwiK3NoYXJlX2ltZytcIiZkZXNjcmlwdGlvbj1cIitzaGFyZV90ZXh0LCA2MjAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWdvb2dsZXBsdXNcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1saW5rZWRpblwiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJnVybD1cIitzaGFyZV91cmwrXCImdGl0bGU9XCIrc2hhcmVfdGV4dCtcIiZzdW1tYXJ5PVwiK3NoYXJlX3RleHQrXCImc291cmNlPVwiK3NoYXJlX3VybCwgNTAwLCA0MjBcblxuXHRcdGZhbHNlXG5cblx0cG9wdXBXaW5kb3c6ICh1cmwsIHcsIGgpIC0+XG5cdFx0bGVmdCA9ICggJCh3aW5kb3cpLndpZHRoKCkgLyAyICkgIC0gKHcgLyAyKVxuXHRcdHRvcCAgPSAoICQod2luZG93KS5oZWlnaHQoKSAvIDIgKSAtIChoIC8gMilcblx0XHRyZXR1cm4gd2luZG93Lm9wZW4odXJsLCBcIkNvbXBhcnRpclwiLCAndG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPScrdysnLCBoZWlnaHQ9JytoKycsIHRvcD0nK3RvcCsnLCBsZWZ0PScrbGVmdClcblxuXG5cbmFwcC50b29scyA9IC0+XG5cdGFwcC52aWRlby5pbml0KClcblx0YXBwLmdvdG8uaW5pdCgpXG5cdGFwcC5mYXEuaW5pdCgpXG5cdCNhcHAucHJldmlld2ZpbGUuaW5pdCgpXG5cblxuXG5hcHAudmlkZW8gPSBcblx0aW5pdDogLT5cblx0XHQkKFwiW2RhdGEtdmlkZW9dXCIpLmNsaWNrIC0+XG5cdFx0XHRhcHAudmlkZW8uaW5zZXJ0ICQodGhpcylcblx0aW5zZXJ0OiAoZWxlbWVudCkgLT5cblx0XHRpZCA9IGVsZW1lbnQuYXR0cihcImRhdGEtdmlkZW9cIilcblx0XHRlbGVtZW50LmFkZENsYXNzKFwidmlkZW8tcGxheWluZ1wiKVxuXHRcdGVsZW1lbnQuYXBwZW5kICc8aWZyYW1lIHdpZHRoPVwiNDIwXCIgaGVpZ2h0PVwiMzE1XCIgc3JjPVwiLy93d3cueW91dHViZS5jb20vZW1iZWQvJytpZCsnP3JlbD0wJmNvbnRyb2xzPTEmc2hvd2luZm89MCZhdXRvcGxheT0xJmF1dG9oaWRlPTFcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+J1xuXG5cbmFwcC5nb3RvID1cblx0aW5pdDogLT5cblx0XHQkKFwiW2RhdGEtZ290b11cIikuY2xpY2sgLT5cblx0XHRcdHRvID0gJCh0aGlzKS5hdHRyIFwiZGF0YS1nb3RvXCJcblx0XHRcdGFwcC5nb3RvLnRvIHRvXG5cdFx0XHRmYWxzZVxuXHR0bzogKHRvLGFkZD0wKSAtPlxuXHRcdHRvcCA9ICQodG8pLm9mZnNldCgpLnRvcCAtICQoXCIuaGVhZGVyLXByaW1hcnlcIikuaGVpZ2h0KCkgLSBhZGQgKyAkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWZyb250XCIpLnNjcm9sbFRvcCgpXG5cdFx0JChcImh0bWwsYm9keSwuc2VjcmV0bWVudS1jb250YWluZXItZnJvbnRcIikuYW5pbWF0ZVxuXHRcdFx0c2Nyb2xsVG9wOiB0b3BcblxuXG5hcHAuZmFxID1cblx0aW5pdDogLT5cblx0XHQkKFwiLmZhcSAuZmFxLWl0ZW06bm90KC5mYXEtb3BlbikgLmZhcS1hbnN3ZXJcIikuaGlkZSgpXG5cdFx0JChcIi5mYXEgLmZhcS1xdWVzdGlvblwiKS5jbGljayAtPlxuXHRcdFx0ZmFxX2luZGV4ID0gJCh0aGlzKS5wYXJlbnQoKS5pbmRleCgpXG5cdFx0XHQkKFwiLmZhcSAuZmFxLWl0ZW1cIikuZWFjaCAtPlxuXHRcdFx0XHRpZiAkKHRoaXMpLmluZGV4KCkgPT0gZmFxX2luZGV4XG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiLmZhcS1hbnN3ZXJcIikuc2xpZGVUb2dnbGUoKVxuXHRcdFx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJmYXEtb3BlblwiKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiLmZhcS1hbnN3ZXJcIikuc2xpZGVVcCgpXG5cdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImZhcS1vcGVuXCIpXG5cblxuYXBwLnByZXZpZXdmaWxlID1cblx0aW5pdDogLT5cblx0XHQkKFwiaW5wdXRbdHlwZT0nZmlsZSddW2RhdGEtdG9dXCIpLmxpdmUgXCJjaGFuZ2VcIiwgKGV2dCkgLT5cblx0XHRcdGVzdG8gPSAkKHRoaXMpXG5cdFx0XHRmaWxlcyA9IGV2dC50YXJnZXQuZmlsZXNcblx0XHRcdGVzdG8ucGFyZW50KFwiLnByZXZcIikuY2hpbGRyZW4oXCIuc2VsXCIpLmh0bWwgXCJcIlxuXHRcdFx0aSA9IDBcblx0XHRcdGYgPSB1bmRlZmluZWRcblx0XHRcdHRvID0gJCh0aGlzKS5hdHRyKFwiZGF0YS10b1wiKVxuXG5cdFx0XHR3aGlsZSBmID0gZmlsZXNbaV1cblx0XHRcdFx0I2NvbnNvbGUubG9nIGZcblx0XHRcdFx0Y29udGludWUgdW5sZXNzIGYudHlwZS5tYXRjaChcImltYWdlLipcIilcblx0XHRcdFx0cmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXHRcdFx0XHRyZWFkZXIub25sb2FkID0gKCh0aGVGaWxlKSAtPlxuXHRcdFx0XHRcdChlKSAtPlxuXHRcdFx0XHRcdFx0JCh0bykuaHRtbCBcIjxkaXYgY2xhc3M9J3ByZXZpZXcnPjxkaXYgY2xhc3M9J3ByZXZpZXctYmcnIHN0eWxlPSdiYWNrZ3JvdW5kLWltYWdlOnVybChcIiArIGUudGFyZ2V0LnJlc3VsdCArIFwiKSc+PC9kaXY+PGltZyBzcmM9J1wiICsgZS50YXJnZXQucmVzdWx0ICsgXCInJyAvPjwvZGl2PlwiXG5cdFx0XHRcdFx0KShmKVxuXHRcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTCBmXG5cdFx0XHRcdGkrK1xuXG5cblxuXG5cbmFwcC50b29sdGlwcyA9IC0+XG5cblx0JChcIltkYXRhLXRvb2x0aXBdXCIpLmVhY2ggLT5cblx0XHRwb3MgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXRvb2x0aXAtcG9zaXRpb25cIilcblx0XHRwb3MgPSBcImJvdHRvbVwiIGlmICFwb3Ncblx0XHQkKHRoaXMpLmFkZENsYXNzIFwidG9vbHRpcC1wYXJlbnRcIlxuXHRcdCQodGhpcykuYXBwZW5kIFwiPHNwYW4gY2xhc3M9J3Rvb2x0aXAgdG9vbHRpcC1cIitwb3MrXCInPjxzcGFuIGNsYXNzPSd0b29sdGlwLWNvbnRhaW5lcic+PHNwYW4gY2xhc3M9J3Rvb2x0aXAtdHJpYW5nbGUnPjwvc3Bhbj48c3BhbiBjbGFzcz0ndG9vbHRpcC1jb250ZW50Jz5cIiArICQodGhpcykuYXR0cihcImRhdGEtdG9vbHRpcFwiKSArIFwiPC9zcGFuPjwvc3Bhbj48L3NwYW4+XCJcblxuXG5cblxuYXBwLnRvdXIgPSBcblxuXHRpbml0OiAtPlxuXG5cdFx0aWYgIWFwcC5pc01vYmlsZSgpXG5cblx0XHRcdHNldFRpbWVvdXQgLT5cblxuXHRcdFx0XHRpZiAkKFwiW2RhdGEtdG91cl1cIikubGVuZ3RoXG5cblxuXHRcdFx0XHRcdCQoXCJbZGF0YS10b3VyXVtkYXRhLXRvdXItaW5dXCIpLmVhY2ggLT5cblx0XHRcdFx0XHRcdGVsZW1lbnQgPSAkKHRoaXMpXG5cdFx0XHRcdFx0XHR0b3VyX2luID0gZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyLWluXCIpXG5cdFx0XHRcdFx0XHQkKHRvdXJfaW4pLmF0dHIgXCJkYXRhLXRvdXJcIiwgZWxlbWVudC5hdHRyKFwiZGF0YS10b3VyXCIpXG5cdFx0XHRcdFx0XHQkKHRvdXJfaW4pLmF0dHIgXCJkYXRhLXRvdXItY29udGVudFwiLCBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXItY29udGVudFwiKSBpZiBlbGVtZW50LmF0dHIoXCJkYXRhLXRvdXItY29udGVudFwiKSBcblx0XHRcdFx0XHRcdCQodG91cl9pbikuYXR0ciBcImRhdGEtdG91ci1uZXh0XCIsIGVsZW1lbnQuYXR0cihcImRhdGEtdG91ci1uZXh0XCIpIGlmIGVsZW1lbnQuYXR0cihcImRhdGEtdG91ci1uZXh0XCIpIFxuXHRcdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmUoKVxuXHRcdFx0XHRcdFx0ZWxlbWVudCA9ICQodG91cl9pbilcblxuXHRcdFx0XHRcdGkgPSAxXG5cdFx0XHRcdFx0JChcIltkYXRhLXRvdXJdXCIpLmVhY2ggLT5cblx0XHRcdFx0XHRcdCQodGhpcykuYXR0ciBcImRhdGEtdG91ci1pZFwiLCBpXG5cdFx0XHRcdFx0XHRpKytcblxuXHRcdFx0XHRcdGFwcC50b3VyLm9wZW4gJChcIltkYXRhLXRvdXJdXCIpLmVxKDApXG5cblx0XHRcdFx0XHQkKHdpbmRvdykucmVzaXplIC0+XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdFx0XHRcdGFwcC50b3VyLnN0eWxlcyAkKFwiLnRvdXItYWN0aXZlXCIpXG5cdFx0XHRcdFx0XHQsIDYwMFxuXG5cdFx0XHQsMTAwMFxuXG5cblx0b3BlbjogKGVsZW1lbnQpIC0+XG5cblx0XHR0aXRsZSAgID0gZWxlbWVudC5hdHRyIFwiZGF0YS10b3VyXCJcblx0XHRjb250ZW50ID0gZWxlbWVudC5hdHRyIFwiZGF0YS10b3VyLWNvbnRlbnRcIlxuXHRcdG5leHQgICAgPSBlbGVtZW50LmF0dHIgXCJkYXRhLXRvdXItbmV4dFwiXG5cdFx0dG9wICAgICA9IGVsZW1lbnQub2Zmc2V0KCkudG9wXG5cdFx0aW5kZXggICA9IHBhcnNlSW50IGVsZW1lbnQuYXR0ciBcImRhdGEtdG91ci1pZFwiXG5cblx0XHRpZiBuZXh0XG5cdFx0XHRidXR0b25fbmV4dCA9ICc8YSBocmVmPVwiJytuZXh0KydcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tbGluZSB0b3VyLWJ1dHRvbi1uZXh0cGFnZVwiPlNpZ3VpZW50ZSBww6FnaW5hIDxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9hPidcblx0XHRlbHNlXG5cdFx0XHRidXR0b25fbmV4dCA9IFwiXCJcblx0XG5cdFx0aWYgISQoXCIudG91clwiKS5sZW5ndGhcblx0XHRcdCQoXCJib2R5XCIpLmFwcGVuZCBcIlwiK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItY29udGFpbmVyXCI+Jytcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXJcIj4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJnIHRvdXItYmctdG9wXCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1iZyB0b3VyLWJnLWJvdHRvbVwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItYmcgdG91ci1iZy1sZWZ0XCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1iZyB0b3VyLWJnLXJpZ2h0XCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8YSBjbGFzcz1cInRvdXItY2xvc2VcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLXRpcFwiPicrXG5cdFx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0JzwvZGl2PidcblxuXHRcdCQoXCIudG91ciAudG91ci10aXBcIikuaHRtbCBcIlwiK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLXRpcC1pbm5lclwiPicrXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1ib2R5XCI+Jytcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInRvdXItdGl0bGVcIj4nK3RpdGxlKyc8L2Rpdj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG91ci1jb250ZW50XCI+Jytjb250ZW50Kyc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ0b3VyLWJ1dHRvbnNcIj4nK1xuXHRcdFx0XHRcdCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1saW5lIHRvdXItYnV0dG9uIHRvdXItYnV0dG9uLXByZXZcIj48aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+PC9hPiAnK1xuXHRcdFx0XHRcdCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1saW5lIHRvdXItYnV0dG9uIHRvdXItYnV0dG9uLW5leHRcIj48aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvYT4gJytcblx0XHRcdFx0XHRidXR0b25fbmV4dCtcblx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+J1xuXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MgXCJ0b3VyLWluXCJcblxuXHRcdCQoXCJodG1sLGJvZHlcIikuYW5pbWF0ZVxuXHRcdFx0c2Nyb2xsVG9wOiB0b3AgLSAxMDBcblx0XHQsNTAwXG5cblx0XHQkKFwiW2RhdGEtdG91cl1cIikucmVtb3ZlQ2xhc3MgXCJ0b3VyLWFjdGl2ZVwiXG5cdFx0ZWxlbWVudC5hZGRDbGFzcyBcInRvdXItYWN0aXZlXCJcblxuXHRcdGFwcC50b3VyLnN0eWxlcyBlbGVtZW50XG5cblx0XHRpZiBpbmRleCA9PSAxXG5cdFx0XHQkKFwiLnRvdXItYnV0dG9uLXByZXZcIikuYWRkQ2xhc3MoXCJ0b3VyLWJ1dHRvbi1pbmFjdGl2ZVwiKVxuXG5cdFx0aWYgaW5kZXggPT0gJChcIltkYXRhLXRvdXJdXCIpLmxlbmd0aFxuXHRcdFx0JChcIi50b3VyLWJ1dHRvbi1uZXh0XCIpLmFkZENsYXNzKFwidG91ci1idXR0b24taW5hY3RpdmVcIilcblxuXHRcdGlmICQoXCJbZGF0YS10b3VyXVwiKS5sZW5ndGggPT0gMVxuXHRcdFx0JChcIi50b3VyLWJ1dHRvblwiKS5yZW1vdmUoKVxuXG5cdFx0JChcIi50b3VyLWJ1dHRvblwiKS5jbGljayAtPlxuXHRcdFx0aWQgPSBwYXJzZUludCAkKFwiLnRvdXItYWN0aXZlXCIpLmF0dHIoXCJkYXRhLXRvdXItaWRcIilcblx0XHRcdGlmICEkKHRoaXMpLmlzKFwiLnRvdXItYnV0dG9uLWluYWN0aXZlXCIpXG5cdFx0XHRcdGlmICQodGhpcykuaXMoXCIudG91ci1idXR0b24tbmV4dFwiKVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIGlkKzFcblx0XHRcdFx0XHRhcHAudG91ci5vcGVuICQoXCJbZGF0YS10b3VyLWlkPSdcIisoaWQrMSkrXCInXVwiKVxuXHRcdFx0XHRpZiAkKHRoaXMpLmlzKFwiLnRvdXItYnV0dG9uLXByZXZcIilcblx0XHRcdFx0XHRhcHAudG91ci5vcGVuICQoXCJbZGF0YS10b3VyLWlkPSdcIisoaWQtMSkrXCInXVwiKVxuXHRcdFx0ZmFsc2VcblxuXHRcdCQoXCIudG91ci1jbG9zZVwiKS5jbGljayAtPlxuXHRcdFx0JChcIi50b3VyLWNvbnRhaW5lclwiKS5hZGRDbGFzcyBcIm91dFwiXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyBcInRvdXItaW5cIlxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHQkKFwiLnRvdXItY29udGFpbmVyXCIpLnJlbW92ZSgpXG5cdFx0XHQsNTAwXG5cdFx0XHRmYWxzZVxuXG5cblx0c3R5bGVzOiAoZWxlbWVudCkgLT5cblxuXHRcdHBhZGRpbmcgPSAxMFxuXG5cdFx0d2lkdGggICA9IGVsZW1lbnQub3V0ZXJXaWR0aCgpICArIHBhZGRpbmcqMlxuXHRcdGhlaWdodCAgPSBlbGVtZW50Lm91dGVySGVpZ2h0KCkgKyBwYWRkaW5nKjJcblx0XHR0b3AgICAgID0gZWxlbWVudC5vZmZzZXQoKS50b3AgIC0gcGFkZGluZ1xuXHRcdGxlZnQgICAgPSBlbGVtZW50Lm9mZnNldCgpLmxlZnQgLSBwYWRkaW5nXG5cdFx0XG5cdFx0aGVpZ2h0X2NvbnRhaW5lciA9ICQoZG9jdW1lbnQpLmhlaWdodCgpXG5cblx0XHQkKFwiLnRvdXItY29udGFpbmVyXCIpLmNzc1xuXHRcdFx0aGVpZ2h0OiBoZWlnaHRfY29udGFpbmVyXG5cblx0XHQkKFwiLnRvdXJcIikuY3NzXG5cdFx0XHRsZWZ0OiBsZWZ0XG5cdFx0XHR0b3A6IHRvcFxuXHRcdFx0d2lkdGg6IHdpZHRoXG5cdFx0XHRoZWlnaHQ6IGhlaWdodFxuXG5cblxuXG5cbmFwcC52YWxpZGF0aW9uID1cblxuXHRmb3JtOiAoZm9ybXMsY2FsbGJhY2s9ZmFsc2UpIC0+XG5cblx0XHRmb3Jtcy5lYWNoIC0+XG5cblx0XHRcdGZvcm0gPSAkKHRoaXMpXG5cblx0XHRcdGZvcm0uZmluZChcIi5jb250cm9sIC5jb250cm9sLXZhbHVlXCIpLmFwcGVuZChcIjxkaXYgY2xhc3M9J2NvbnRyb2wtbWVzc2FnZSc+PC9kaXY+XCIpXG5cblx0XHRcdGZvcm0uZmluZChcImlucHV0LHRleHRhcmVhLHNlbGVjdFwiKS5lYWNoIC0+XG5cdFx0XHRcdGlucHV0ID0gJCh0aGlzKVx0XHRcdFx0XG5cdFx0XHRcdGlucHV0LmFkZENsYXNzKCBcImlucHV0LVwiKyQodGhpcykuYXR0cihcInR5cGVcIikgKSBpZiAkKHRoaXMpLmlzIFwiaW5wdXRcIlxuXHRcdFx0XHRpbnB1dC5hZGRDbGFzcyggXCJkaXNhYmxlZFwiICkgaWYgaW5wdXQuaXMoXCI6ZGlzYWJsZWRcIilcblx0XHRcdFx0aW5wdXQubGl2ZSBcImJsdXIsIGNoYW5nZVwiLCAtPlxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dChpbnB1dClcblxuXHRcdFx0Zm9ybS5maW5kKFwiLmlucHV0LWNoZWNrYm94LCAuaW5wdXQtcmFkaW9cIikuZWFjaCAtPlxuXHRcdFx0XHRpZiAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIilcblx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsYWJlbFwiKS5hZGRDbGFzcyhcImNoZWNrZWRcIilcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tlZFwiKVxuXHRcdFx0XG5cdFx0XHRmb3JtLmZpbmQoXCIuaW5wdXQtY2hlY2tib3gsIC5pbnB1dC1yYWRpb1wiKS5jaGFuZ2UgLT5cblx0XHRcdFx0Zm9ybS5maW5kKFwiLmlucHV0LWNoZWNrYm94LCAuaW5wdXQtcmFkaW9cIikuZWFjaCAtPlxuXHRcdFx0XHRcdGlmICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKVxuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpXG5cblxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQubnVtYmVyXCIpLmVhY2ggLT5cblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm51bWJlclwiKS53cmFwKFwiPGRpdiBjbGFzcz0nbnVtYmVyJz5cIikuYWZ0ZXIoXCI8ZGl2IGNsYXNzPSdudW1iZXItYnV0dG9uIG51bWJlci1tb3JlJz4rPC9kaXY+PGRpdiBjbGFzcz0nbnVtYmVyLWJ1dHRvbiBudW1iZXItbGVzcyc+LTwvZGl2PlwiKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIubnVtYmVyIC5udW1iZXItYnV0dG9uXCIpLmxpdmUgXCJjbGlja1wiLCAtPlxuXG5cdFx0XHRcdF9pbnB1dCA9ICQodGhpcykucGFyZW50KCkuZmluZChcImlucHV0XCIpXG5cblx0XHRcdFx0X21heCA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1tYXhcIikpXG5cdFx0XHRcdF9taW4gPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWluXCIpKVxuXHRcdFx0XHRfbWluID0gMSBpZiAhX21pblxuXG5cdFx0XHRcdF9zdGVwcyA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1zdGVwc1wiKSlcblx0XHRcdFx0X3N0ZXBzID0gMSBpZiAhX3N0ZXBzXG5cblx0XHRcdFx0X3ZhbCA9IHBhcnNlSW50KF9pbnB1dC52YWwoKSlcblx0XHRcdFx0X3ZhbCA9IF92YWwgKyBfc3RlcHMgaWYgJCh0aGlzKS5oYXNDbGFzcyBcIm51bWJlci1tb3JlXCJcblx0XHRcdFx0X3ZhbCA9IF92YWwgLSBfc3RlcHMgaWYgJCh0aGlzKS5oYXNDbGFzcyBcIm51bWJlci1sZXNzXCJcblx0XHRcdFx0X3ZhbCA9IF9tYXggaWYgX3ZhbCA+PSBfbWF4XG5cdFx0XHRcdF92YWwgPSBfbWluIGlmIF92YWwgPD0gX21pblxuXG5cdFx0XHRcdF9pbnB1dC52YWwoX3ZhbClcblx0XHRcdFx0XG5cdFx0XHRcdGZhbHNlXG5cblx0XHRcdGZvcm0uZmluZChcIi5udW1iZXIgaW5wdXRcIikubGl2ZSBcImJsdXJcIiwgLT5cblxuXHRcdFx0XHRfaW5wdXQgPSAkKHRoaXMpXG5cblx0XHRcdFx0X21heCA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1tYXhcIikpXG5cdFx0XHRcdF9taW4gPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWluXCIpKVxuXHRcdFx0XHRfbWluID0gMSBpZiAhX21pblxuXG5cdFx0XHRcdF92YWwgPSBwYXJzZUludChfaW5wdXQudmFsKCkpXG5cdFx0XHRcdF92YWwgPSBfbWF4IGlmIF92YWwgPj0gX21heFxuXHRcdFx0XHRfdmFsID0gX21pbiBpZiBfdmFsIDw9IF9taW5cblxuXHRcdFx0XHRfaW5wdXQudmFsKF92YWwpXG5cblx0XHRcdFx0dHJ1ZVxuXG5cblxuXHRcdFx0Zm9ybS5zdWJtaXQgLT5cblxuXHRcdFx0XHRzZW5kID0gdHJ1ZVxuXHRcdFx0XHRmb3JtID0gJCh0aGlzKSBcblxuXHRcdFx0XHRmb3JtLmZpbmQoXCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3RcIikuZWFjaCAtPlxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dCgkKHRoaXMpLHRydWUpXG5cblx0XHRcdFx0ZGl2ZXJyb3IgPSBmb3JtLmZpbmQoXCIuY29udHJvbC1lcnJvclwiKS5lcSgwKVxuXG5cdFx0XHRcdGlmIGRpdmVycm9yLmxlbmd0aFxuXG5cdFx0XHRcdFx0c2VuZCA9IGZhbHNlXG5cdFx0XHRcdFx0dG9wID0gZGl2ZXJyb3Iub2Zmc2V0KCkudG9wIC0gJChcIi5oZWFkZXItdG9wXCIpLmhlaWdodCgpIC0gMjVcblxuXHRcdFx0XHRcdCQoXCJodG1sLGJvZHlcIikuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiB0b3BcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0XHRcdGRpdmVycm9yLmZpbmQoXCJpbnB1dFwiKS5lcSgwKS5mb2N1cygpXG5cdFx0XHRcdFx0LDUwMFxuXG5cdFx0XHRcdGlmIHNlbmQgPT0gdHJ1ZVxuXHRcdFx0XHRcdGlmIGNhbGxiYWNrXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdFx0XHRzZW5kID0gZmFsc2VcblxuXHRcdFx0XHRyZXR1cm4gc2VuZFxuXG5cblx0Zm9ybUlucHV0OiAoaW5wdXQsdmFsaWRhdGVFbXB0eT1mYWxzZSkgLT5cblxuXHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXG5cdFx0Y29udHJvbHMgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2xzXCIpXG5cdFx0Y29udHJvbCAgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2xcIilcblxuXHRcdGZ2RXJyb3JzID0ge1xuXHRcdFx0XCJlbXB0eVwiOiBcIkVzdGUgY2FtcG8gZXMgcmVxdWVyaWRvXCIsXG5cdFx0XHRcImVtcHR5U2VsZWN0XCI6IFwiU2VsZWNjaW9uYSB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJlbXB0eVJhZGlvXCI6IFwiU2VsZWNjaW9uYSB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJlbXB0eUNoZWNrYm94XCI6IFwiU2VsZWNjaW9uYSBhbCBtZW5vcyB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJpbnZhbGlkRW1haWxcIjogXCJFbWFpbCBpbnbDoWxpZG9cIixcblx0XHRcdFwiaW52YWxpZEVtYWlsUmVwZWF0XCI6IFwiRWwgZW1haWwgaW5ncmVzYWRvIG5vIGVzIGlndWFsIGFsIGFudGVyaW9yXCJcblx0XHRcdFwiaW52YWxpZFBhc3NcIjogXCJMYSBjb250cmFzZcOxYSBkZWJlIHNlciBtYXlvciBhIDYgY2Fyw6FjdGVyZXNcIlxuXHRcdFx0XCJpbnZhbGlkUGFzc1JlcGVhdFwiOiBcIkxhIGNvbnRyYXNlw7FhIG5vIGVzIGlndWFsIGEgbGEgYW50ZXJpb3JcIlxuXHRcdFx0XCJpbnZhbGlkUnV0XCI6IFwiUlVUIGludsOhbGlkb1wiLFxuXHRcdFx0XCJ0ZXJtc1wiOiBcIkRlYmVzIGFjZXB0YXIgbG9zIHTDqXJtaW5vcyBsZWdhbGVzXCIsXG5cdFx0fVxuXG5cblx0XHRpZiAhaW5wdXQuaGFzQ2xhc3MoXCJvcHRpb25hbFwiKSAmJiBpbnB1dC5hdHRyKFwidHlwZVwiKSE9XCJzdWJtaXRcIiAmJiBpbnB1dC5hdHRyKFwidHlwZVwiKSE9XCJoaWRkZW5cIiAmJiBpbnB1dC5hdHRyKFwibmFtZVwiKVxuXG5cdFx0XHRlcnJvciA9IGZhbHNlXG5cdFx0XHRcblx0XHRcdGlmICFpbnB1dC52YWwoKVxuXG5cdFx0XHRcdCMgVmFsaWRhciBzaSBlbCBjYW1wbyBzZSBsbGVuYSAob3BjaW9uYWwpXG5cdFx0XHRcdGlmIHZhbGlkYXRlRW1wdHkgPT0gdHJ1ZVxuXHRcdFx0XHRcdGlmIGlucHV0LmlzKFwic2VsZWN0XCIpXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5U2VsZWN0KVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHkpXG5cdFx0XHRlbHNlXG5cblx0XHRcdFx0IyBWYWxpZGFyIGVtYWlsXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J2VtYWlsJ11cIilcblx0XHRcdFx0XHRpZiAhIGFwcC52YWxpZGF0aW9uLmVtYWlsKCBpbnB1dCwgaW5wdXQudmFsKCkgKSBcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZEVtYWlsKVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgY29udHJhc2XDsWFcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0ncGFzc3dvcmQnXVwiKVxuXHRcdFx0XHRcdGlmIGlucHV0LnZhbCgpLmxlbmd0aCA8IDZcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZFBhc3MpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciByZXBldGlyIGNvbnRyYXNlw7FhXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiW2RhdGEtcmVwZWF0XVwiKVxuXHRcdFx0XHRcdGlmIGlucHV0LnZhbCgpICE9IGNvbnRyb2xzLmZpbmQoXCJbbmFtZT0nXCIraW5wdXQuYXR0cihcImRhdGEtcmVwZWF0XCIpK1wiJ11cIikudmFsKClcblx0XHRcdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J3Bhc3N3b3JkJ11cIilcblx0XHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUGFzc1JlcGVhdClcblx0XHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cdFx0XHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdlbWFpbCddXCIpXG5cdFx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZEVtYWlsUmVwZWF0KVxuXHRcdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBjaGVja2JveHMvcmFkaW9zXG5cdFx0XHRcdGlmIChpbnB1dC5pcyhcIlt0eXBlPSdjaGVja2JveCddXCIpIHx8IGlucHV0LmlzKFwiW3R5cGU9J3JhZGlvJ11cIikpXG5cdFx0XHRcdFx0aWYgIWNvbnRyb2xzLmZpbmQoXCJpbnB1dFtuYW1lPSdcIitpbnB1dC5hdHRyKFwibmFtZVwiKStcIiddOmNoZWNrZWRcIikubGVuZ3RoXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5Q2hlY2tib3gpIGlmIGlucHV0LmlzKFwiW3R5cGU9J2NoZWNrYm94J11cIilcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlSYWRpbykgICAgaWYgaW5wdXQuaXMoXCJbdHlwZT0ncmFkaW8nXVwiKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy50ZXJtcykgICAgICAgICBpZiBpbnB1dC5pcyhcIi5pbnB1dC10ZXJtc1wiKVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cdFx0XHRcdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLWVycm9yXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBSVVRcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCIucnV0XCIpXG5cdFx0XHRcdFx0aW5wdXQudmFsKCAkLlJ1dC5mb3JtYXRlYXIoJC5SdXQucXVpdGFyRm9ybWF0byhpbnB1dC52YWwoKSksJC5SdXQuZ2V0RGlnaXRvKCQuUnV0LnF1aXRhckZvcm1hdG8oaW5wdXQudmFsKCkpKSkgKVxuXHRcdFx0XHRcdGlmICEkLlJ1dC52YWxpZGFyKGlucHV0LnZhbCgpKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUnV0KVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblx0XHRcdFx0IyBTaSBubyBoYXkgZXJyb3Jlcywgc2UgcXVpdGEgZWwgbWVuc2FqZSBkZSBlcnJvclxuXHRcdFx0XHRpZiBlcnJvciA9PSBmYWxzZVxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZmFsc2UpXG5cblxuXG5cdGZvcm1JbnB1dE1lc3NhZ2U6IChpbnB1dCxtZXNzYWdlKSAtPlxuXHRcdGlmIG1lc3NhZ2Vcblx0XHRcdGlucHV0LmFkZENsYXNzKFwiY29udHJvbC1lcnJvclwiKVxuXHRcdFx0cGFyZW50ID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sLXZhbHVlXCIpXG5cdFx0XHRwYXJlbnQuYWRkQ2xhc3MoXCJjb250cm9sLWVycm9yXCIpXG5cdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLW1lc3NhZ2VcIikudGV4dChtZXNzYWdlKS5hZGRDbGFzcyhcImluXCIpXG5cdFx0ZWxzZVxuXHRcdFx0aW5wdXQucmVtb3ZlQ2xhc3MoXCJjb250cm9sLWVycm9yXCIpXG5cdFx0XHRwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2wtdmFsdWVcIilcblx0XHRcdHBhcmVudC5yZW1vdmVDbGFzcyhcImNvbnRyb2wtZXJyb3JcIilcdFxuXHRcdFx0cGFyZW50LmZpbmQoXCIuY29udHJvbC1tZXNzYWdlXCIpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtbWVzc2FnZVwiKS5yZW1vdmVDbGFzcyhcImluIG91dFwiKS50ZXh0KFwiXCIpXG5cdFx0XHQsNTAwXG5cblxuXG5cdGVtYWlsOiAoZWxlbWVudG8sdmFsb3IpIC0+XG5cdFx0aWYgL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdCh2YWxvcilcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblxuXG5cblxuIl19