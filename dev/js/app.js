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
      setTimeout(function() {
        return app.alert.equidist();
      }, 100);
      setTimeout(function() {
        return app.alert.equidist();
      }, 1000);
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
    var blackandwhite, infowindow, map, mapOptions, map_lat, map_lng, map_zoom, markers;
    if ($("#map").length) {
      markers = new Array();
      infowindow = false;
      map_zoom = parseInt($("#map").attr("data-zoom"));
      map_lat = $("#map").attr("data-lat");
      map_lng = $("#map").attr("data-lng");
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
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      $(".map-zoom-in").click(function() {
        map.setZoom(map.getZoom() + 1);
        return false;
      });
      $(".map-zoom-out").click(function() {
        map.setZoom(map.getZoom() - 1);
        return false;
      });
      $("#map-coords .map-coord").each(function() {
        var content, marker;
        marker = new google.maps.Marker({
          position: new google.maps.LatLng($(this).attr("data-lat"), $(this).attr("data-lng")),
          animation: google.maps.Animation.DROP,
          icon: "img/marker.png",
          map: map
        });
        content = "<div class='map-infowindow'>" + "<h3>" + $(this).text() + "</h3>" + "<ul>" + '<li><i class="fa fa-home"></i> ' + $(this).attr("data-address") + '</li>' + '<li><a href="tel:' + $(this).attr("data-phone") + '"><i class="fa fa-phone"></i> ' + $(this).attr("data-phone") + '</a></li>' + '<li><a href="mailto:' + $(this).attr("data-email") + '"><i class="fa fa-envelope"></i> ' + $(this).attr("data-email") + '</a></li>' + "</ul>" + "</div>";
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
        google.maps.event.addListener(marker, "click", function() {
          infowindow.close();
          infowindow.setContent(content);
          infowindow.open(map, this);
          $("#map-coords").val(marker.value);
          return map.setCenter(marker.getPosition());
        });
        return markers.push(marker);
      });
      return $("#map-coords").change(function() {
        var index;
        index = $("#map-coords")[0].selectedIndex - 1;
        if (index >= 0) {
          infowindow.close();
          infowindow.setContent(markers[index]['content']);
          infowindow.open(map, markers[index]);
          return map.setCenter(markers[index].getPosition());
        }
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
      var li, name_page, name_page_clear, name_page_split, url, url_split;
      url = document.URL;
      url_split = url.split("/");
      name_page = url_split[url_split.length - 1];
      name_page_split = name_page.split("?");
      name_page_clear = name_page_split[0];
      li = $(".secretmenu-content a[href='" + name_page_clear + "']").parent("li");
      li.addClass("current-item");
      li.parent().parent("li").addClass("current-item");
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

  app.validation = {
    form: function(forms, callback) {
      if (callback == null) {
        callback = false;
      }
      return forms.each(function() {
        var form;
        form = $(this);
        form.find(".control .control-value").append("<div class='control-error'></div>");
        form.find("input,textarea,select").each(function() {
          var input;
          input = $(this);
          input.addClass($(this).attr("type"));
          if (input.is(":disabled")) {
            input.addClass("disabled");
          }
          return input.live("blur, change", function() {
            return app.validation.formInput(input);
          });
        });
        form.find("input.checkbox, input.radio").each(function() {
          if ($(this).is(":checked")) {
            return $(this).closest("label").addClass("checked");
          } else {
            return $(this).closest("label").removeClass("checked");
          }
        });
        form.find("input.checkbox, input.radio").change(function() {
          return form.find("input.checkbox, input.radio").each(function() {
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
          diverror = form.find(".error").eq(0);
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
      var error, fvErrors, parent;
      if (validateEmpty == null) {
        validateEmpty = false;
      }
      parent = input.closest(".control-value");
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
            if (input.val() !== $("[name='" + input.attr("data-repeat") + "']").val()) {
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
            if (parent.length && !parent.find("input[name='" + input.attr("name") + "']:checked").length) {
              if (input.is("[type='checkbox']")) {
                app.validation.formInputMessage(input, fvErrors.emptyCheckbox);
              }
              if (input.is("[type='radio']")) {
                app.validation.formInputMessage(input, fvErrors.emptyRadio);
              }
              error = true;
              parent.find(".error").removeClass("error");
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
        input.addClass("error");
        parent = input.closest(".control-value");
        parent.addClass("error");
        return parent.find(".control-error").text(message).addClass("in");
      } else {
        input.removeClass("error");
        parent = input.closest(".control-value");
        parent.removeClass("error");
        parent.find(".control-error").addClass("out");
        return setTimeout(function() {
          return parent.find(".control-error").removeClass("in out").text("");
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

//# sourceMappingURL=data:application/json;base64,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bEIsQ0FBQSxDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZCxDQURULENBQUE7QUFBQSxRQUVBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5CLENBRkEsQ0FBQTtBQUFBLFFBR0EsTUFBTSxDQUFDLElBQVAsQ0FBWSxnQkFBWixDQUE2QixDQUFDLFFBQTlCLENBQXVDLEtBQXZDLENBSEEsQ0FBQTtlQUlBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7aUJBQ1YsTUFBTSxDQUFDLElBQVAsQ0FBWSxnQkFBWixDQUE2QixDQUFDLFdBQTlCLENBQTBDLFFBQTFDLENBQW1ELENBQUMsSUFBcEQsQ0FBeUQsRUFBekQsRUFEVTtRQUFBLENBQVgsRUFFQyxHQUZELEVBVkQ7T0FEaUI7SUFBQSxDQWxMbEI7QUFBQSxJQW1NQSxLQUFBLEVBQU8sU0FBQyxRQUFELEVBQVUsS0FBVixHQUFBO0FBQ04sTUFBQSxJQUFHLDJKQUEySixDQUFDLElBQTVKLENBQWlLLEtBQWpLLENBQUg7QUFDQyxlQUFPLElBQVAsQ0FERDtPQUFBLE1BQUE7QUFHQyxlQUFPLEtBQVAsQ0FIRDtPQURNO0lBQUEsQ0FuTVA7R0F6bkJELENBQUE7QUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG5cdGFwcC5pbml0KClcblxuYXBwID1cblxuXHRpbml0OiAtPlxuXG5cdFx0IyBCcm93c2Vyc1xuXHRcdGFwcC5icm93c2VycygpXG5cblx0XHQjIE1lbsO6XG5cdFx0YXBwLnNlY3JldE1lbnUuaW5pdCgpXG5cblx0XHQjIFNoYXJlc1xuXHRcdGFwcC5zaGFyZXMuaW5pdCgpXG5cblx0XHQjIFRvb2x0aXBzXG5cdFx0YXBwLnRvb2x0aXBzKClcblxuXHRcdCMgQWxlcnRhc1xuXHRcdGFwcC5hbGVydC5pbml0KClcblxuXHRcdCMgVmFsaWRhY2nDs24gZGUgZm9ybXVsYXJpb3Ncblx0XHRhcHAudmFsaWRhdGlvbi5mb3JtICQoXCIuY29udHJvbHNcIilcblxuXHRcdCMgTG9hZGluZ1xuXHRcdGFwcC5sb2FkaW5nLmluaXQoKVxuXG5cdFx0IyBNYXBhXG5cdFx0YXBwLmdtYXAoKVxuXG5cdFx0IyBFdmVudG9zIGVuIHNjcm9sbFxuXHRcdGFwcC5zY3JvbGwoKVxuXG5cdFx0IyBQbHVnaW5zXG5cdFx0YXBwLnBsdWdpbnMuaW5pdCgpXG5cbiM9aW5jbHVkZV90cmVlIGFwcFxuXG5cbmFwcC5hbGVydCA9XG5cblx0aW5pdDogLT5cblx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0LDEwMFxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0LDEwMDBcblx0XHQkKHdpbmRvdykucmVzaXplIC0+XG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXG5cblx0XHRpZiAkKFwiW2RhdGEtYWxlcnRdXCIpLmxlbmd0aFxuXG5cdFx0XHQkKFwiYVtkYXRhLWFsZXJ0XVwiKS5saXZlIFwiY2xpY2tcIiwgLT5cblx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0XHR0aXRsZTogZWxlbWVudC5hdHRyKFwiZGF0YS10aXRsZVwiKVxuXHRcdFx0XHRcdGNvbnRlbnQ6IGVsZW1lbnQuYXR0cihcImRhdGEtY29udGVudFwiKVxuXHRcdFx0XHRcdGFjY2VwdDogdHJ1ZVxuXHRcdFx0XHRcdGNhbmNlbDogdHJ1ZVxuXHRcdFx0XHRcdGNhbGxiYWNrX3RydWU6IC0+XG5cdFx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gZWxlbWVudC5hdHRyKFwiaHJlZlwiKVxuXHRcdFx0XHRmYWxzZVxuXG5cdFx0XHQkKFwiW2RhdGEtYWxlcnRdXCIpLmVhY2ggLT5cblx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0aWYgIWVsZW1lbnQuaXMoXCJhXCIpICYmICFlbGVtZW50LmlzKFwiYnV0dG9uXCIpXG5cdFx0XHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0XHRcdHRpdGxlOiBlbGVtZW50LmF0dHIoXCJkYXRhLXRpdGxlXCIpXG5cdFx0XHRcdFx0XHRjb250ZW50OiBlbGVtZW50LmF0dHIoXCJkYXRhLWNvbnRlbnRcIilcblx0XHRcdFx0XHRcdGFjY2VwdDogdHJ1ZVxuXHRcdFx0XHRcdFx0Y2FuY2VsOiB0cnVlXG5cblxuXHRvcGVuOiAob3B0aW9ucykgLT5cblxuXHRcdHRpdGxlID0gXCJcIlxuXHRcdGNvbnRlbnQgPSBcIlwiXG5cdFx0YnV0dG9ucyA9IFwiXCJcblx0XHRjbG9zZSA9IFwiXCJcblxuXHRcdGlmIG9wdGlvbnMuc3RhdGljID09IHRydWVcblx0XHRcdGFsZXJ0bGlnaHRjbGFzcyAgICA9ICcnXG5cdFx0XHRvcHRpb25zLmNsb3NlID0gZmFsc2Vcblx0XHRlbHNlXG5cdFx0XHRhbGVydGxpZ2h0Y2xhc3MgPSAnIGZhbHNlJ1xuXG5cdFx0aWYgb3B0aW9ucy5hbGVydGNsYXNzXG5cdFx0XHRhbGVydGNsYXNzID0gXCJhbGVydC1cIiArIG9wdGlvbnMuYWxlcnRjbGFzc1xuXHRcdGVsc2Vcblx0XHRcdGFsZXJ0Y2xhc3MgPSBcImFsZXJ0LWRlZmF1bHRcIlxuXG5cdFx0aWYgb3B0aW9ucy50aXRsZVxuXHRcdFx0dGl0bGUgPSBcIjxoMiBjbGFzcz0nYWxlcnQtdGl0bGUnPlwiICsgb3B0aW9ucy50aXRsZSArIFwiPC9oMj5cIlxuXG5cdFx0aWYgb3B0aW9ucy5jb250ZW50XG5cdFx0XHRjb250ZW50ID0gXCI8ZGl2IGNsYXNzPSdhbGVydC1jb250ZW50Jz5cIiArIG9wdGlvbnMuY29udGVudCArIFwiPC9kaXY+XCJcblxuXHRcdGlmIG9wdGlvbnMuY2xvc2UgPT0gdW5kZWZpbmVkXG5cdFx0XHRvcHRpb25zLmNsb3NlID0gdHJ1ZVxuXG5cdFx0aWYgb3B0aW9ucy5jbG9zZSA9PSB0cnVlXG5cdFx0XHRjbG9zZSA9ICc8YnV0dG9uIGNsYXNzPVwiYWxlcnQtY2xvc2UgZmFsc2VcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYnV0dG9uPidcblxuXHRcdGlmIG9wdGlvbnMuYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyArPSBvcHRpb25zLmJ1dHRvbnMgKyBcIiBcIlxuXG5cdFx0aWYgb3B0aW9ucy5jYW5jZWwgPT0gdHJ1ZVxuXHRcdFx0YnV0dG9ucyArPSAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBmYWxzZVwiPkNhbmNlbGFyPC9idXR0b24+ICdcblxuXHRcdGlmIG9wdGlvbnMuYWNjZXB0ID09IHRydWVcblx0XHRcdGJ1dHRvbnMgKz0gJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgdHJ1ZVwiPkFjZXB0YXI8L2J1dHRvbj4gJ1xuXG5cdFx0aWYgYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQtYnV0dG9uc1wiPicrYnV0dG9ucysnPC9kaXY+J1xuXG5cblx0XHRodG1sID1cblx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQgJythbGVydGNsYXNzKycgaW5cIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWxpZ2h0ICcrYWxlcnRsaWdodGNsYXNzKydcIj48L2Rpdj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWJveCBlcXVpZGlzdFwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydC1pbm5lclwiPicrXG5cdFx0XHRcdFx0XHRjbG9zZSArXG5cdFx0XHRcdFx0XHR0aXRsZSArXG5cdFx0XHRcdFx0XHRjb250ZW50ICtcblx0XHRcdFx0XHRcdGJ1dHRvbnMgK1xuXHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cblxuXHRcdCQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cblxuXHRcdCQoXCIuYWxlcnQgLnRydWUsIC5hbGVydCAuZmFsc2VcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+IFxuXG5cdFx0XHRhbGVydG9yaWdpbiA9ICQodGhpcykuY2xvc2VzdChcIi5hbGVydFwiKVxuXG5cdFx0XHRhbGVydG9yaWdpbi5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRhbGVydG9yaWdpbi5yZW1vdmUoKVxuXHRcdFx0XHQjYWxlcnRvcmlnaW4ucmVtb3ZlQ2xhc3MoXCJpbiBvdXRcIilcblx0XHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1pblwiKVxuXHRcdFx0LDIwMFxuXG5cdFx0XHRpZiAkKHRoaXMpLmhhc0NsYXNzKFwidHJ1ZVwiKSAmJiBvcHRpb25zLmNhbGxiYWNrX3RydWVcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja190cnVlKClcblxuXHRcdFx0aWYgJCh0aGlzKS5oYXNDbGFzcyhcImZhbHNlXCIpICYmIG9wdGlvbnMuY2FsbGJhY2tfZmFsc2Vcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja19mYWxzZSgpXG5cblx0XHRcdHJldHVybiB0cnVlXG5cblx0Y2xvc2VhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRyZW1vdmVhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCIuYWxlcnRcIikucmVtb3ZlKClcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblx0XHQsMjAwXG5cblx0ZXF1aWRpc3Q6IC0+XG5cdFx0JChcIi5lcXVpZGlzdFwiKS5lYWNoIC0+XG5cdFx0XHRfdGhpcyA9ICQodGhpcylcblx0XHRcdF9sZWZ0ID0gKF90aGlzLnBhcmVudCgpLndpZHRoKCkgLSBfdGhpcy53aWR0aCgpKSAvIDJcblx0XHRcdF9sZWZ0ID0gMCBpZiBfbGVmdCA8IDBcblx0XHRcdF90b3AgPSAoX3RoaXMucGFyZW50KCkuaGVpZ2h0KCkgLSBfdGhpcy5oZWlnaHQoKSkgLyAyXG5cdFx0XHRfdG9wID0gMCBpZiBfdG9wIDwgMFxuXHRcdFx0X3RoaXMuY3NzXG5cdFx0XHQgIGxlZnQ6IF9sZWZ0ICsgXCJweFwiXG5cdFx0XHQgIHRvcDogX3RvcCArIFwicHhcIlxuXG5cdGxvYWQ6IChocmVmLGNzc2NsYXNzPVwiZGVmYXVsdFwiLGNhbGxiYWNrPWZhbHNlKSAtPlxuXHRcdCQuYWpheChcblx0XHRcdHVybDogaHJlZlxuXHRcdFx0dHlwZTogJ0dFVCdcblx0XHQpLmRvbmUgKHJlc3VsdCkgLT5cblx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdGNvbnRlbnQ6IHJlc3VsdFxuXHRcdFx0XHRhbGVydGNsYXNzOiBjc3NjbGFzc1xuXHRcdFx0aWYgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0I2FwcC5wbHVnaW5zLnJlbGF5b3V0KClcblxuXG5cblxuYXBwLmlzTW9iaWxlID0gLT5cblx0aWYgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0dHJ1ZVxuXHRlbHNlXG5cdFx0ZmFsc2VcblxuYXBwLmJyb3dzZXJzID0gLT5cblxuXHQjIE1vYmlsZVxuXHRpZiBhcHAuaXNNb2JpbGUoKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtbW9iaWxlXCIpXG5cblx0IyBJRVxuXHRpZiAkLmJyb3dzZXIubXNpZSB8fCBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKCdUcmlkZW50LycpIT0tMVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtaWVcIilcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImlzLWllXCIrJC5icm93c2VyLnZlcnNpb24pXG5cdFx0aWYgcGFyc2VJbnQoJC5icm93c2VyLnZlcnNpb24pIDw9IDdcblx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdHRpdGxlOiBcIkVzdMOhcyB1c2FuZG8gdW4gbmF2ZWdhZG9yIG11eSBhbnRpZ3VvXCJcblx0XHRcdFx0Y29udGVudDogXCJBY3R1YWxpemEgdHUgbmF2ZWdhZG9yIGFob3JhIHkgZGlzZnJ1dGEgZGUgdW5hIG1lam9yIGV4cGVyaWVuY2lhIGVuIEZhbGFiZWxsYSBOb3Zpb3MuXCJcblx0XHRcdFx0YnV0dG9uczogXCI8YSBocmVmPSdodHRwOi8vYnJvd3NlaGFwcHkuY29tLz9sb2NhbGU9ZXMnIHRhcmdldD0nX2JsYW5rJyBjbGFzcz0nYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi1iaWcnPkFjdHVhbGl6YXIgYWhvcmE8L2E+XCJcblx0XHRcdFx0c3RhdGljOiB0cnVlXG5cblxuXG5hcHAuY29va2llID0gXG5cblx0Y3JlYXRlOiAobmFtZSwgdmFsdWUsIGRheXMpIC0+XG5cdFx0aWYgZGF5c1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKClcblx0XHRcdGRhdGUuc2V0VGltZSBkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMClcblx0XHRcdGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKVxuXHRcdGVsc2Vcblx0XHRcdGV4cGlyZXMgPSBcIlwiXG5cdFx0ZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiXG5cblx0cmVhZDogKG5hbWUpIC0+XG5cdFx0bmFtZUVRID0gbmFtZSArIFwiPVwiXG5cdFx0Y2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpXG5cdFx0aSA9IDBcblxuXHRcdHdoaWxlIGkgPCBjYS5sZW5ndGhcblx0XHRcdGMgPSBjYVtpXVxuXHRcdFx0YyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKSAgd2hpbGUgYy5jaGFyQXQoMCkgaXMgXCIgXCJcblx0XHRcdHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCkgIGlmIGMuaW5kZXhPZihuYW1lRVEpIGlzIDBcblx0XHRcdGkrK1xuXHRcdG51bGxcblxuXHRkZWxldGU6IChuYW1lKSAtPlxuXHRcdGFwcC5jb29raWUuY3JlYXRlIG5hbWUsIFwiXCIsIC0xXG5cblxuXG5cbmFwcC5mb3JtYXROdW1iZXIgPSAobikgLT5cblx0bi50b0ZpeGVkKDApLnJlcGxhY2UgLy4vZywgKGMsIGksIGEpIC0+XG5cdFx0KGlmIGkgYW5kIGMgaXNudCBcIixcIiBhbmQgbm90ICgoYS5sZW5ndGggLSBpKSAlIDMpIHRoZW4gXCIuXCIgKyBjIGVsc2UgYylcblxuXG5cblxuYXBwLmdtYXAgPSAtPlxuXG5cdGlmICQoXCIjbWFwXCIpLmxlbmd0aFxuXG5cdFx0bWFya2VycyA9IG5ldyBBcnJheSgpXG5cdFx0aW5mb3dpbmRvdyA9IGZhbHNlXG5cblx0XHRtYXBfem9vbSA9IHBhcnNlSW50KCQoXCIjbWFwXCIpLmF0dHIoXCJkYXRhLXpvb21cIikpXG5cblx0XHRtYXBfbGF0ID0gJChcIiNtYXBcIikuYXR0cihcImRhdGEtbGF0XCIpXG5cdFx0bWFwX2xuZyA9ICQoXCIjbWFwXCIpLmF0dHIoXCJkYXRhLWxuZ1wiKVxuXG5cdFx0YmxhY2thbmR3aGl0ZSA9IFtcblx0XHRcdGZlYXR1cmVUeXBlOiBcImFsbFwiXG5cdFx0XHRlbGVtZW50VHlwZTogXCJhbGxcIlxuXHRcdFx0c3R5bGVyczogW1xuXHRcdFx0XHRzYXR1cmF0aW9uOiAtMTAwXG5cdFx0XHRdXG5cdFx0XVxuXG5cdFx0bWFwT3B0aW9ucyA9XG5cdFx0XHR6b29tOiBtYXBfem9vbVxuXHRcdFx0Y2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcF9sYXQsbWFwX2xuZylcblx0XHRcdG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcblx0XHRcdGRpc2FibGVEZWZhdWx0VUk6IHRydWVcblx0XHRcdHNjcm9sbHdoZWVsOiBmYWxzZVxuXHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXG5cdFx0XHRzdHlsZXM6IGJsYWNrYW5kd2hpdGVcblxuXG5cdFx0bWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSwgbWFwT3B0aW9ucylcblxuXHRcdCQoXCIubWFwLXpvb20taW5cIikuY2xpY2sgLT5cblx0XHRcdG1hcC5zZXRab29tIG1hcC5nZXRab29tKCkgKyAxXG5cdFx0XHRmYWxzZVxuXG5cdFx0JChcIi5tYXAtem9vbS1vdXRcIikuY2xpY2sgLT5cblx0XHRcdG1hcC5zZXRab29tIG1hcC5nZXRab29tKCkgLSAxXG5cdFx0XHRmYWxzZVxuXG5cblxuXHRcdCMgQ2FyZ2FyIGNvb3JkZW5hZGFzXG5cblx0XHQkKFwiI21hcC1jb29yZHMgLm1hcC1jb29yZFwiKS5lYWNoIC0+XG5cblx0XHRcdG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoXG5cdFx0XHRcdHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCQodGhpcykuYXR0cihcImRhdGEtbGF0XCIpLCAkKHRoaXMpLmF0dHIoXCJkYXRhLWxuZ1wiKSlcblx0XHRcdFx0YW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUFxuXHRcdFx0XHRpY29uOiBcImltZy9tYXJrZXIucG5nXCJcblx0XHRcdFx0bWFwOiBtYXBcblx0XHRcdClcblx0XHRcblx0XHRcdGNvbnRlbnQgPVxuXHRcdFx0XHRcIjxkaXYgY2xhc3M9J21hcC1pbmZvd2luZG93Jz5cIitcblx0XHRcdFx0XHRcIjxoMz5cIiskKHRoaXMpLnRleHQoKStcIjwvaDM+XCIrXG5cdFx0XHRcdFx0XCI8dWw+XCIrXG5cdFx0XHRcdFx0XHQnPGxpPjxpIGNsYXNzPVwiZmEgZmEtaG9tZVwiPjwvaT4gJyskKHRoaXMpLmF0dHIoXCJkYXRhLWFkZHJlc3NcIikrJzwvbGk+JyArXG5cdFx0XHRcdFx0XHQnPGxpPjxhIGhyZWY9XCJ0ZWw6JyskKHRoaXMpLmF0dHIoXCJkYXRhLXBob25lXCIpKydcIj48aSBjbGFzcz1cImZhIGZhLXBob25lXCI+PC9pPiAnKyQodGhpcykuYXR0cihcImRhdGEtcGhvbmVcIikrJzwvYT48L2xpPicgK1xuXHRcdFx0XHRcdFx0JzxsaT48YSBocmVmPVwibWFpbHRvOicrJCh0aGlzKS5hdHRyKFwiZGF0YS1lbWFpbFwiKSsnXCI+PGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZVwiPjwvaT4gJyskKHRoaXMpLmF0dHIoXCJkYXRhLWVtYWlsXCIpKyc8L2E+PC9saT4nICtcblx0XHRcdFx0XHRcIjwvdWw+XCIrXG5cdFx0XHRcdFwiPC9kaXY+XCJcblxuXG5cdFx0XHRtYXJrZXJbJ2NvbnRlbnQnXSA9IGNvbnRlbnRcblx0XHRcdG1hcmtlclsndmFsdWUnXSA9ICQodGhpcykudmFsKClcblxuXHRcdFx0aWYgIWluZm93aW5kb3dcblx0XHRcdFx0aW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KGNvbnRlbnQ6XCJ4XCIpXG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyIG1hcCwgJ2NsaWNrJywgLT5cblx0XHRcdFx0aW5mb3dpbmRvdy5jbG9zZSgpXG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyIG1hcmtlciwgXCJjbGlja1wiLCAtPlxuXHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKClcblx0XHRcdFx0aW5mb3dpbmRvdy5zZXRDb250ZW50IGNvbnRlbnRcblx0XHRcdFx0aW5mb3dpbmRvdy5vcGVuIG1hcCwgdGhpc1xuXHRcdFx0XHQkKFwiI21hcC1jb29yZHNcIikudmFsKG1hcmtlci52YWx1ZSlcblx0XHRcdFx0bWFwLnNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSlcblxuXHRcdFx0bWFya2Vycy5wdXNoKG1hcmtlcilcblxuXG5cdFx0JChcIiNtYXAtY29vcmRzXCIpLmNoYW5nZSAtPlxuXHRcdFx0aW5kZXggPSAkKFwiI21hcC1jb29yZHNcIilbMF0uc2VsZWN0ZWRJbmRleCAtIDFcblx0XHRcdGlmIGluZGV4ID49IDBcblx0XHRcdFx0aW5mb3dpbmRvdy5jbG9zZSgpXG5cdFx0XHRcdGluZm93aW5kb3cuc2V0Q29udGVudCBtYXJrZXJzW2luZGV4XVsnY29udGVudCddXG5cdFx0XHRcdGluZm93aW5kb3cub3BlbiBtYXAsIG1hcmtlcnNbaW5kZXhdXG5cdFx0XHRcdG1hcC5zZXRDZW50ZXIobWFya2Vyc1tpbmRleF0uZ2V0UG9zaXRpb24oKSlcblxuXG5cblxuXG5hcHAubG9hZGluZyA9XG5cblx0aW5pdDogLT5cblx0XHRpZiAkKFwiW2RhdGEtbG9hZGluZ11cIikubGVuZ3RoXG5cdFx0XHRhcHAubG9hZGluZy5pbigpXG5cdFx0IyMjXG5cdFx0YXBwLmxvYWRpbmcuaW4oKVxuXHRcdCQoXCJib2R5XCIpLmltYWdlc0xvYWRlZCAtPlxuXHRcdFx0YXBwLmxvYWRpbmcub3V0KClcblx0XHQjIyNcblxuXHRpbjogKGVsZW1lbnQpIC0+XG5cdFx0ZWxlbWVudCA9ICQoXCJib2R5XCIpIGlmICFlbGVtZW50XG5cdFx0ZWxlbWVudC5hcHBlbmQgJycrXG5cdFx0XHQnPGRpdiBjbGFzcz1cImxvYWRpbmdcIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImxvYWRpbmctaWNvblwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nLWljb24tY2lyY2xlXCI+PGRpdj48L2Rpdj48L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cdG91dDogLT5cblx0XHQkKFwiLmxvYWRpbmdcIikuYWRkQ2xhc3MgXCJvdXRcIlxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCIubG9hZGluZ1wiKS5yZW1vdmUoKVxuXHRcdCw1MDBcblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcImxvYWRlZFwiKVxuXG5cblxuXG5hcHAucGx1Z2lucyA9XG5cblx0aW5pdDogLT5cblxuXHRcdCMjI1xuXHRcdCMgIEF1dG9zaXplXG5cdFx0JChcInRleHRhcmVhXCIpLmF1dG9zaXplXG5cdFx0XHRhcHBlbmQ6IFwiXFxuXCJcblxuXHRcdCMgSXNvdG9wZVxuXHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdGlzb3RvcGUgPSAkKFwiLmlzb3RvcGVcIikuaXNvdG9wZSgpXG5cblx0XHQjIFNsaWRlclxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdGlmICQoXCIucm95YWxTbGlkZXJcIikubGVuZ3RoXG5cblx0XHRcdFx0JChcIi5yb3lhbFNsaWRlclwiKS5yb3lhbFNsaWRlclxuXHRcdFx0XHRcdGltYWdlU2NhbGVNb2RlOiAnZml0J1xuXHRcdFx0XHRcdHNsaWRlckRyYWc6IGZhbHNlXG5cdFx0XHRcdFx0YXJyb3dzTmF2QXV0b0hpZGU6IGZhbHNlXG5cdFx0XHRcdFx0bG9vcDogdHJ1ZVxuXHRcdFx0XHRcdCNsb29wUmV3aW5kOiB0cnVlXG5cdFx0XHRcdFx0c2xpZGVzU3BhY2luZzogMFxuXHRcdFx0XHRcdHRyYW5zaXRpb25TcGVlZDogNjAwXG5cdFx0XHRcdFx0YXV0b1BsYXk6XG5cdFx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0XHRwYXVzZU9uSG92ZXI6IHRydWVcblx0XHRcdFx0XHRcdGRlbGF5OiA0MDAwXG5cdFx0XHRcdFx0aW1hZ2VTY2FsZVBhZGRpbmc6IDBcblx0XHRcdFx0XHRhZGRBY3RpdmVDbGFzczogdHJ1ZVxuXHRcdFx0XHRcdG5hdmlnYXRlQnlDbGljazogZmFsc2Vcblx0XHRcdFx0XHRhdXRvSGVpZ2h0OiB0cnVlXG5cdFx0LDUwXG5cblx0XHQkKHdpbmRvdykub24gXCJsb2FkXCIsIC0+XG5cdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cblx0XHRyX3RpbWUgPSBmYWxzZVxuXHRcdCQod2luZG93KS5yZXNpemUgLT5cblx0XHRcdGFwcC5wbHVnaW5zLnJlbGF5b3V0KClcblx0XHRcdHIgPSB0cnVlXG5cdFx0XHRjbGVhclRpbWVvdXQocl90aW1lKVxuXHRcdFx0cl90aW1lID0gc2V0VGltZW91dCAtPlxuXHRcdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cdFx0XHRcdHIgPSBmYWxzZVxuXHRcdFx0LDYwMFxuXHRcdCMjI1xuXG5cblxuXHRyZWxheW91dDogLT5cblxuXHRcdCMjI1xuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0aWYgJChcIi5pc290b3BlXCIpLmxlbmd0aFxuXHRcdFx0JChcIi5pc290b3BlXCIpLmlzb3RvcGVcblx0XHRcdFx0cmVsYXlvdXQ6IHRydWVcblx0XG5cdFx0JChcImJvZHlcIikuaW1hZ2VzTG9hZGVkIC0+XG5cdFx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdFx0JChcIi5pc290b3BlXCIpLmlzb3RvcGVcblx0XHRcdFx0XHRyZWxheW91dDogdHJ1ZVxuXHRcdCMjI1xuXG5cblxuXG5hcHAuc2Nyb2xsID0gLT5cblxuXHRpZiAhYXBwLmlzTW9iaWxlKCkgJiYgISQuYnJvd3Nlci5tc2llXG5cdFx0c2Nyb2xsX3ByZXYgPSAwXG5cdFx0JCh3aW5kb3cpLnNjcm9sbCAtPlxuXG5cdFx0XHQjIEVzY29uZGVyIGhlYWRlclxuXHRcdFx0IyMjXG5cdFx0XHRzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcblx0XHRcdGhlaWdodF93aW5kb3cgPSAkKHdpbmRvdykuaGVpZ2h0KClcblx0XHRcdGhlaWdodF9ib2R5ID0gJChcImJvZHlcIikuaGVpZ2h0KClcblx0XHRcdGlmIHNjcm9sbCA+IDUwICYmIHNjcm9sbCArIGhlaWdodF93aW5kb3cgPCBoZWlnaHRfYm9keSAtIDUwXG5cdFx0XHRcdGlmIHNjcm9sbC1zY3JvbGxfcHJldiA+IDBcblx0XHRcdFx0XHQkKFwiLmhlYWRlci10b3AtZWxlbWVudHNcIikuYWRkQ2xhc3MgXCJoaWRlXCJcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCQoXCIuaGVhZGVyLXRvcC1lbGVtZW50c1wiKS5yZW1vdmVDbGFzcyBcImhpZGVcIlxuXHRcdFx0XHRcdHNjcm9sbF9pbml0ID0gMFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQkKFwiLmhlYWRlci10b3AtZWxlbWVudHNcIikucmVtb3ZlQ2xhc3MgXCJoaWRlXCJcblx0XHRcdHNjcm9sbF9wcmV2ID0gc2Nyb2xsXG5cdFx0XHQjIyNcblxuXHRcdFx0IyBNb3N0cmFyIGVuIHNjcm9sbFxuXG5cdFx0XHRpZiAkKFwiLmRpc3BsYXlzY3JvbGxcIikubGVuZ3RoXG5cdFx0XHRcdCQoXCIuZGlzcGxheXNjcm9sbFwiKS5lYWNoIC0+XG5cdFx0XHRcdFx0ZWxlbWVudCA9ICQodGhpcylcblx0XHRcdFx0XHRlbGVtZW50X3RvcCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wXG5cdFx0XHRcdFx0ZWxlbWVudF9oZWlnaHQgPSBlbGVtZW50LmhlaWdodCgpXG5cdFx0XHRcdFx0aWYgc2Nyb2xsICsgaGVpZ2h0X3dpbmRvdyA+IGVsZW1lbnRfaGVpZ2h0ICsgZWxlbWVudF90b3Bcblx0XHRcdFx0XHRcdGVsZW1lbnQuYWRkQ2xhc3MgXCJpblwiXG5cblxuXG5cbmFwcC5zZWNyZXRNZW51ID1cblxuXHRpbml0OiAtPlxuXG5cdFx0IyBDb21wYXJlIFVSTCBpbiBtZW51XG5cdFx0dXJsID0gZG9jdW1lbnQuVVJMXG5cdFx0dXJsX3NwbGl0ID0gdXJsLnNwbGl0KFwiL1wiKVxuXHRcdG5hbWVfcGFnZSA9IHVybF9zcGxpdFt1cmxfc3BsaXQubGVuZ3RoLTFdXG5cdFx0bmFtZV9wYWdlX3NwbGl0ID0gbmFtZV9wYWdlLnNwbGl0KFwiP1wiKSBcblx0XHRuYW1lX3BhZ2VfY2xlYXIgPSBuYW1lX3BhZ2Vfc3BsaXRbMF1cblx0XHRsaSA9ICQoXCIuc2VjcmV0bWVudS1jb250ZW50IGFbaHJlZj0nXCIrbmFtZV9wYWdlX2NsZWFyK1wiJ11cIikucGFyZW50KFwibGlcIilcblx0XHRsaS5hZGRDbGFzcyBcImN1cnJlbnQtaXRlbVwiXG5cdFx0bGkucGFyZW50KCkucGFyZW50KFwibGlcIikuYWRkQ2xhc3MgXCJjdXJyZW50LWl0ZW1cIlxuXG5cdFx0IyBEZXNrdG9wXG5cdFx0JChcIi5zZWNyZXRtZW51LWNvbnRlbnQgdWwgbGkgYVwiKS5lYWNoIC0+XG5cdFx0XHRpZiAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5sZW5ndGhcblx0XHRcdFx0aWYgISQodGhpcykuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKVxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LXBhcmVudFwiKS5wcmVwZW5kKCc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+Jylcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5wcmVwZW5kICc8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cInNlY3JldG1lbnUtYmFja1wiPjxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPiBBdHLDoXM8L2E+PC9saT4nXG5cblx0XHRpZiAkKFwiLnNlY3JldG1lbnUtY29udGVudCB1bCBsaS5jdXJyZW50LWl0ZW0gYS5zZWNyZXRtZW51LXBhcmVudFwiKS5sZW5ndGhcblx0XHRcdGFwcC5zZWNyZXRNZW51Lm9wZW5MdmxEZXNrdG9wICQoXCIuc2VjcmV0bWVudS1jb250ZW50IHVsIGxpLmN1cnJlbnQtaXRlbSBhLnNlY3JldG1lbnUtcGFyZW50XCIpXG5cblx0XHQjIE1vYmlsZVxuXG5cdFx0JChcIi5zZWNyZXRtZW51LWJ1dHRvblwiKS5jbGljayAtPlxuXHRcdFx0aWYgISQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1pblwiKVxuXHRcdFx0XHRhcHAuc2VjcmV0TWVudS5vcGVuICQoXCIuc2VjcmV0bWVudS1jb250ZW50XCIpLmh0bWwoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRhcHAuc2VjcmV0TWVudS5jbG9zZSgpXG5cdFx0JChcIi5zZWNyZXRtZW51LWNvbnRhaW5lci1mcm9udFwiKS5jbGljayAtPlxuXHRcdFx0aWYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzZWNyZXRtZW51LWluXCIpXG5cdFx0XHRcdGFwcC5zZWNyZXRNZW51LmNsb3NlKClcblx0XHR0cnVlXG5cblx0b3Blbkx2bERlc2t0b3A6IChlbGVtZW50KSAtPlxuXHRcdHVsID0gZWxlbWVudC5wYXJlbnQoKS5maW5kKFwidWxcIilcblx0XHR1bC5hZGRDbGFzcyhcImluXCIpXG5cdFx0dWwuZmluZChcImEuc2VjcmV0bWVudS1iYWNrXCIpLnVuYmluZChcImNsaWNrXCIpLmJpbmQgXCJjbGlja1wiLCAtPlxuXHRcdFx0dWwuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0dWwucmVtb3ZlQ2xhc3MoXCJpbiBvdXRcIilcblx0XHRcdCw3MDBcblx0XHRcdGZhbHNlXG5cblxuXHRvcGVuOiAoaHRtbCxjaGlsZHJlbj1mYWxzZSxkaXJlY3Rpb249XCJsZWZ0XCIpIC0+XG5cblx0XHRsZW5ndGggICAgPSAkKFwiLnNlY3JldG1lbnVcIikubGVuZ3RoICsgMVxuXHRcdGNvbnRhaW5lciA9ICc8ZGl2IGNsYXNzPVwic2VjcmV0bWVudSBzZWNyZXRtZW51LWx2bC0nKygkKFwiLnNlY3JldG1lbnVcIikubGVuZ3RoICsgMSkrJ1wiPjwvZGl2PidcblxuXHRcdGlmICFjaGlsZHJlblxuXHRcdFx0JChcIi5zZWNyZXRtZW51LWNvbnRhaW5lci1iYWNrXCIpLmh0bWwoY29udGFpbmVyKSBcblx0XHRlbHNlXG5cdFx0XHQkKFwiLnNlY3JldG1lbnUtY29udGFpbmVyLWJhY2tcIikuYXBwZW5kKGNvbnRhaW5lcilcblxuXHRcdCQoXCIuc2VjcmV0bWVudVwiKS5lcSgtMSkuaHRtbCgnPGRpdiBjbGFzcz1cInNlY3JldG1lbnUtaW5uZXJcIj4nK2h0bWwrJzwvZGl2PicpXG5cblx0XHQkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtaW4gc2VjcmV0bWVudS1cIitkaXJlY3Rpb24pXG5cdFx0JChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIixsZW5ndGgpXG5cblx0XHQjIFNpIHRpZW5lIGhpam9zXG5cdFx0JChcIi5zZWNyZXRtZW51IHVsIGxpIGFcIikuZWFjaCAtPlxuXHRcdFx0aWYgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikubGVuZ3RoXG5cdFx0XHRcdGlmICEkKHRoaXMpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIilcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIikucHJlcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPicpXG5cblx0XHQjIENsaWNrIGVuIGl0ZW0gZGUgbWVuw7pcblx0XHQkKFwiLnNlY3JldG1lbnUgdWwgbGkgYS5zZWNyZXRtZW51LXBhcmVudFwiKS51bmJpbmQoXCJjbGlja1wiKS5iaW5kIFwiY2xpY2tcIiwgLT5cblx0XHRcdGFwcC5zZWNyZXRNZW51Lm9wZW4gXCI8dWw+XCIrJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikuaHRtbCgpK1wiPC91bD5cIiwgdHJ1ZVxuXHRcdFx0ZmFsc2VcblxuXHRcdCQoXCIuc2VjcmV0bWVudSBhLnNlY3JldG1lbnUtYmFja1wiKS51bmJpbmQoXCJjbGlja1wiKS5iaW5kIFwiY2xpY2tcIiwgLT5cblx0XHRcdGxhc3RtZW51ID0gcGFyc2VJbnQgJChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIilcblx0XHRcdCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIsKGxhc3RtZW51LTEpKVxuXHRcdFx0JChcIi5zZWNyZXRtZW51LnNlY3JldG1lbnUtbHZsLVwiK2xhc3RtZW51KS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHQkKFwiLnNlY3JldG1lbnUuc2VjcmV0bWVudS1sdmwtXCIrbGFzdG1lbnUpLnJlbW92ZSgpXG5cdFx0XHQsNzAwXG5cdFx0XHRmYWxzZVxuXG5cdGNsb3NlOiAtPlxuXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LW91dFwiKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzIFwic2VjcmV0bWVudS1pbiBzZWNyZXRtZW51LW91dCBzZWNyZXRtZW51LWxlZnQgc2VjcmV0bWVudS1yaWdodCBzZWNyZXRtZW51LWx2bC1cIiskKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiKVxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIilcblx0XHRcdCQoXCIuc2VjcmV0bWVudVwiKS5yZW1vdmUoKVxuXHRcdCw3MDBcblxuXG5cblxuXG5hcHAuc2hhcmVzID1cblxuXHRpbml0OiAtPlxuXHRcdCQoXCIuc2hhcmVcIikuY2xpY2sgLT5cblx0XHRcdGFwcC5zaGFyZXMuc2hhcmUgJCh0aGlzKVxuXG5cdHNoYXJlOiAoZWxlbWVudCkgLT5cblxuXHRcdHNoYXJlX3VybCA9IGVuY29kZVVSSUNvbXBvbmVudChlbGVtZW50LmF0dHIoXCJkYXRhLXVybFwiKSlcblx0XHRzaGFyZV90ZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQuYXR0cihcImRhdGEtdGV4dFwiKSlcblx0XHRzaGFyZV9pbWcgPSBlbmNvZGVVUklDb21wb25lbnQoZWxlbWVudC5hdHRyKFwiZGF0YS1pbWdcIikpXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtZmFjZWJvb2tcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9XCIrc2hhcmVfdXJsLCA1MDAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLXR3aXR0ZXJcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/c291cmNlPXdlYmNsaWVudCZhbXA7dGV4dD1cIitzaGFyZV90ZXh0K1wiJmFtcDt1cmw9XCIrc2hhcmVfdXJsLCA1MDAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLXBpbnRlcmVzdFwiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPVwiK3NoYXJlX3VybCtcIiZtZWRpYT1cIitzaGFyZV9pbWcrXCImZGVzY3JpcHRpb249XCIrc2hhcmVfdGV4dCwgNjIwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1nb29nbGVwbHVzXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD1cIitzaGFyZV91cmwsIDUwMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtbGlua2VkaW5cIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9XCIrc2hhcmVfdXJsK1wiJnRpdGxlPVwiK3NoYXJlX3RleHQrXCImc3VtbWFyeT1cIitzaGFyZV90ZXh0K1wiJnNvdXJjZT1cIitzaGFyZV91cmwsIDUwMCwgNDIwXG5cblx0XHRmYWxzZVxuXG5cdHBvcHVwV2luZG93OiAodXJsLCB3LCBoKSAtPlxuXHRcdGxlZnQgPSAoICQod2luZG93KS53aWR0aCgpIC8gMiApICAtICh3IC8gMilcblx0XHR0b3AgID0gKCAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyICkgLSAoaCAvIDIpXG5cdFx0cmV0dXJuIHdpbmRvdy5vcGVuKHVybCwgXCJDb21wYXJ0aXJcIiwgJ3Rvb2xiYXI9bm8sIGxvY2F0aW9uPW5vLCBkaXJlY3Rvcmllcz1ubywgc3RhdHVzPW5vLCBtZW51YmFyPW5vLCBzY3JvbGxiYXJzPW5vLCByZXNpemFibGU9bm8sIGNvcHloaXN0b3J5PW5vLCB3aWR0aD0nK3crJywgaGVpZ2h0PScraCsnLCB0b3A9Jyt0b3ArJywgbGVmdD0nK2xlZnQpXG5cblxuXG5cbmFwcC50b29sdGlwcyA9IC0+XG5cblx0JChcIltkYXRhLXRvb2x0aXBdXCIpLmVhY2ggLT5cblx0XHRwb3MgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXRvb2x0aXAtcG9zaXRpb25cIilcblx0XHRwb3MgPSBcImJvdHRvbVwiIGlmICFwb3Ncblx0XHQkKHRoaXMpLmFkZENsYXNzIFwidG9vbHRpcC1wYXJlbnRcIlxuXHRcdCQodGhpcykuYXBwZW5kIFwiPHNwYW4gY2xhc3M9J3Rvb2x0aXAgdG9vbHRpcC1cIitwb3MrXCInPjxzcGFuIGNsYXNzPSd0b29sdGlwLWNvbnRhaW5lcic+PHNwYW4gY2xhc3M9J3Rvb2x0aXAtdHJpYW5nbGUnPjwvc3Bhbj48c3BhbiBjbGFzcz0ndG9vbHRpcC1jb250ZW50Jz5cIiArICQodGhpcykuYXR0cihcImRhdGEtdG9vbHRpcFwiKSArIFwiPC9zcGFuPjwvc3Bhbj48L3NwYW4+XCJcblxuXG5cblxuXG5cbmFwcC52YWxpZGF0aW9uID1cblxuXHRmb3JtOiAoZm9ybXMsY2FsbGJhY2s9ZmFsc2UpIC0+XG5cblx0XHRmb3Jtcy5lYWNoIC0+XG5cblx0XHRcdGZvcm0gPSAkKHRoaXMpXG5cblx0XHRcdGZvcm0uZmluZChcIi5jb250cm9sIC5jb250cm9sLXZhbHVlXCIpLmFwcGVuZChcIjxkaXYgY2xhc3M9J2NvbnRyb2wtZXJyb3InPjwvZGl2PlwiKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3RcIikuZWFjaCAtPlxuXHRcdFx0XHRpbnB1dCA9ICQodGhpcylcblx0XHRcdFx0aW5wdXQuYWRkQ2xhc3MoICQodGhpcykuYXR0cihcInR5cGVcIikgKVxuXHRcdFx0XHRpbnB1dC5hZGRDbGFzcyggXCJkaXNhYmxlZFwiICkgaWYgaW5wdXQuaXMoXCI6ZGlzYWJsZWRcIilcblx0XHRcdFx0aW5wdXQubGl2ZSBcImJsdXIsIGNoYW5nZVwiLCAtPlxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dChpbnB1dClcblxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQuY2hlY2tib3gsIGlucHV0LnJhZGlvXCIpLmVhY2ggLT5cblx0XHRcdFx0aWYgJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIilcblx0XHRcdFxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQuY2hlY2tib3gsIGlucHV0LnJhZGlvXCIpLmNoYW5nZSAtPlxuXHRcdFx0XHRmb3JtLmZpbmQoXCJpbnB1dC5jaGVja2JveCwgaW5wdXQucmFkaW9cIikuZWFjaCAtPlxuXHRcdFx0XHRcdGlmICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKVxuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpXG5cblxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQubnVtYmVyXCIpLmVhY2ggLT5cblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm51bWJlclwiKS53cmFwKFwiPGRpdiBjbGFzcz0nbnVtYmVyJz5cIikuYWZ0ZXIoXCI8ZGl2IGNsYXNzPSdudW1iZXItYnV0dG9uIG51bWJlci1tb3JlJz4rPC9kaXY+PGRpdiBjbGFzcz0nbnVtYmVyLWJ1dHRvbiBudW1iZXItbGVzcyc+LTwvZGl2PlwiKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIubnVtYmVyIC5udW1iZXItYnV0dG9uXCIpLmxpdmUgXCJjbGlja1wiLCAtPlxuXG5cdFx0XHRcdF9pbnB1dCA9ICQodGhpcykucGFyZW50KCkuZmluZChcImlucHV0XCIpXG5cblx0XHRcdFx0X21heCA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1tYXhcIikpXG5cdFx0XHRcdF9taW4gPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWluXCIpKVxuXHRcdFx0XHRfbWluID0gMSBpZiAhX21pblxuXG5cdFx0XHRcdF9zdGVwcyA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1zdGVwc1wiKSlcblx0XHRcdFx0X3N0ZXBzID0gMSBpZiAhX3N0ZXBzXG5cblx0XHRcdFx0X3ZhbCA9IHBhcnNlSW50KF9pbnB1dC52YWwoKSlcblx0XHRcdFx0X3ZhbCA9IF92YWwgKyBfc3RlcHMgaWYgJCh0aGlzKS5oYXNDbGFzcyBcIm51bWJlci1tb3JlXCJcblx0XHRcdFx0X3ZhbCA9IF92YWwgLSBfc3RlcHMgaWYgJCh0aGlzKS5oYXNDbGFzcyBcIm51bWJlci1sZXNzXCJcblx0XHRcdFx0X3ZhbCA9IF9tYXggaWYgX3ZhbCA+PSBfbWF4XG5cdFx0XHRcdF92YWwgPSBfbWluIGlmIF92YWwgPD0gX21pblxuXG5cdFx0XHRcdF9pbnB1dC52YWwoX3ZhbClcblx0XHRcdFx0XG5cdFx0XHRcdGZhbHNlXG5cblx0XHRcdGZvcm0uZmluZChcIi5udW1iZXIgaW5wdXRcIikubGl2ZSBcImJsdXJcIiwgLT5cblxuXHRcdFx0XHRfaW5wdXQgPSAkKHRoaXMpXG5cblx0XHRcdFx0X21heCA9IHBhcnNlSW50KF9pbnB1dC5hdHRyKFwiZGF0YS1tYXhcIikpXG5cdFx0XHRcdF9taW4gPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWluXCIpKVxuXHRcdFx0XHRfbWluID0gMSBpZiAhX21pblxuXG5cdFx0XHRcdF92YWwgPSBwYXJzZUludChfaW5wdXQudmFsKCkpXG5cdFx0XHRcdF92YWwgPSBfbWF4IGlmIF92YWwgPj0gX21heFxuXHRcdFx0XHRfdmFsID0gX21pbiBpZiBfdmFsIDw9IF9taW5cblxuXHRcdFx0XHRfaW5wdXQudmFsKF92YWwpXG5cblx0XHRcdFx0dHJ1ZVxuXG5cblxuXHRcdFx0Zm9ybS5zdWJtaXQgLT5cblxuXHRcdFx0XHRzZW5kID0gdHJ1ZVxuXHRcdFx0XHRmb3JtID0gJCh0aGlzKSBcblxuXHRcdFx0XHRmb3JtLmZpbmQoXCJpbnB1dCx0ZXh0YXJlYSxzZWxlY3RcIikuZWFjaCAtPlxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dCgkKHRoaXMpLHRydWUpXG5cblx0XHRcdFx0ZGl2ZXJyb3IgPSBmb3JtLmZpbmQoXCIuZXJyb3JcIikuZXEoMClcblx0XHRcdFx0aWYgZGl2ZXJyb3IubGVuZ3RoXG5cdFx0XHRcdFx0c2VuZCA9IGZhbHNlXG5cdFx0XHRcdFx0dG9wID0gZGl2ZXJyb3Iub2Zmc2V0KCkudG9wIC0gJChcIi5oZWFkZXItdG9wXCIpLmhlaWdodCgpIC0gMjVcblxuXHRcdFx0XHRcdCQoXCJodG1sLGJvZHlcIikuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiB0b3BcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0XHRcdGRpdmVycm9yLmZpbmQoXCJpbnB1dFwiKS5lcSgwKS5mb2N1cygpXG5cdFx0XHRcdFx0LDUwMFxuXG5cdFx0XHRcdGlmIHNlbmQgPT0gdHJ1ZVxuXHRcdFx0XHRcdGlmIGNhbGxiYWNrXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdFx0XHRzZW5kID0gZmFsc2VcblxuXHRcdFx0XHRyZXR1cm4gc2VuZFxuXG5cblx0Zm9ybUlucHV0OiAoaW5wdXQsdmFsaWRhdGVFbXB0eT1mYWxzZSkgLT5cblxuXHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXG5cdFx0ZnZFcnJvcnMgPSB7XG5cdFx0XHRcImVtcHR5XCI6IFwiRXN0ZSBjYW1wbyBlcyByZXF1ZXJpZG9cIixcblx0XHRcdFwiZW1wdHlTZWxlY3RcIjogXCJTZWxlY2Npb25hIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImVtcHR5UmFkaW9cIjogXCJTZWxlY2Npb25hIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImVtcHR5Q2hlY2tib3hcIjogXCJTZWxlY2Npb25hIGFsIG1lbm9zIHVuYSBvcGNpw7NuXCIsXG5cdFx0XHRcImludmFsaWRFbWFpbFwiOiBcIkVtYWlsIGludsOhbGlkb1wiLFxuXHRcdFx0XCJpbnZhbGlkRW1haWxSZXBlYXRcIjogXCJFbCBlbWFpbCBpbmdyZXNhZG8gbm8gZXMgaWd1YWwgYWwgYW50ZXJpb3JcIlxuXHRcdFx0XCJpbnZhbGlkUGFzc1wiOiBcIkxhIGNvbnRyYXNlw7FhIGRlYmUgc2VyIG1heW9yIGEgNiBjYXLDoWN0ZXJlc1wiXG5cdFx0XHRcImludmFsaWRQYXNzUmVwZWF0XCI6IFwiTGEgY29udHJhc2XDsWEgbm8gZXMgaWd1YWwgYSBsYSBhbnRlcmlvclwiXG5cdFx0XHRcImludmFsaWRSdXRcIjogXCJSVVQgaW52w6FsaWRvXCIsXG5cdFx0XHRcInRlcm1zXCI6IFwiRGViZXMgYWNlcHRhciBsb3MgdMOpcm1pbm9zIGxlZ2FsZXNcIixcblx0XHR9XG5cblxuXHRcdGlmICFpbnB1dC5oYXNDbGFzcyhcIm9wdGlvbmFsXCIpICYmIGlucHV0LmF0dHIoXCJ0eXBlXCIpIT1cInN1Ym1pdFwiICYmIGlucHV0LmF0dHIoXCJ0eXBlXCIpIT1cImhpZGRlblwiICYmIGlucHV0LmF0dHIoXCJuYW1lXCIpXG5cblx0XHRcdGVycm9yID0gZmFsc2Vcblx0XHRcdFxuXHRcdFx0aWYgIWlucHV0LnZhbCgpXG5cblx0XHRcdFx0IyBWYWxpZGFyIHNpIGVsIGNhbXBvIHNlIGxsZW5hIChvcGNpb25hbClcblx0XHRcdFx0aWYgdmFsaWRhdGVFbXB0eSA9PSB0cnVlXG5cdFx0XHRcdFx0aWYgaW5wdXQuaXMoXCJzZWxlY3RcIilcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlTZWxlY3QpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eSlcblx0XHRcdGVsc2VcblxuXHRcdFx0XHQjIFZhbGlkYXIgZW1haWxcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0nZW1haWwnXVwiKVxuXHRcdFx0XHRcdGlmICEgYXBwLnZhbGlkYXRpb24uZW1haWwoIGlucHV0LCBpbnB1dC52YWwoKSApIFxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkRW1haWwpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBjb250cmFzZcOxYVxuXHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdwYXNzd29yZCddXCIpXG5cdFx0XHRcdFx0aWYgaW5wdXQudmFsKCkubGVuZ3RoIDwgNlxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUGFzcylcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIHJlcGV0aXIgY29udHJhc2XDsWFcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbZGF0YS1yZXBlYXRdXCIpXG5cdFx0XHRcdFx0aWYgaW5wdXQudmFsKCkgIT0gJChcIltuYW1lPSdcIitpbnB1dC5hdHRyKFwiZGF0YS1yZXBlYXRcIikrXCInXVwiKS52YWwoKVxuXHRcdFx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0ncGFzc3dvcmQnXVwiKVxuXHRcdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmludmFsaWRQYXNzUmVwZWF0KVxuXHRcdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblx0XHRcdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J2VtYWlsJ11cIilcblx0XHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkRW1haWxSZXBlYXQpXG5cdFx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cblx0XHRcdFx0IyBWYWxpZGFyIGNoZWNrYm94cy9yYWRpb3Ncblx0XHRcdFx0aWYgKGlucHV0LmlzKFwiW3R5cGU9J2NoZWNrYm94J11cIikgfHwgaW5wdXQuaXMoXCJbdHlwZT0ncmFkaW8nXVwiKSlcblx0XHRcdFx0XHRpZiBwYXJlbnQubGVuZ3RoICYmICFwYXJlbnQuZmluZChcImlucHV0W25hbWU9J1wiK2lucHV0LmF0dHIoXCJuYW1lXCIpK1wiJ106Y2hlY2tlZFwiKS5sZW5ndGhcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlDaGVja2JveCkgaWYgaW5wdXQuaXMoXCJbdHlwZT0nY2hlY2tib3gnXVwiKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5lbXB0eVJhZGlvKSAgICBpZiBpbnB1dC5pcyhcIlt0eXBlPSdyYWRpbyddXCIpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblx0XHRcdFx0XHRcdHBhcmVudC5maW5kKFwiLmVycm9yXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBSVVRcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCIucnV0XCIpXG5cdFx0XHRcdFx0aW5wdXQudmFsKCAkLlJ1dC5mb3JtYXRlYXIoJC5SdXQucXVpdGFyRm9ybWF0byhpbnB1dC52YWwoKSksJC5SdXQuZ2V0RGlnaXRvKCQuUnV0LnF1aXRhckZvcm1hdG8oaW5wdXQudmFsKCkpKSkgKVxuXHRcdFx0XHRcdGlmICEkLlJ1dC52YWxpZGFyKGlucHV0LnZhbCgpKVxuXHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUnV0KVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblx0XHRcdFx0IyBTaSBubyBoYXkgZXJyb3Jlcywgc2UgcXVpdGEgZWwgbWVuc2FqZSBkZSBlcnJvclxuXHRcdFx0XHRpZiBlcnJvciA9PSBmYWxzZVxuXHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZmFsc2UpXG5cblxuXG5cdGZvcm1JbnB1dE1lc3NhZ2U6IChpbnB1dCxtZXNzYWdlKSAtPlxuXHRcdGlmIG1lc3NhZ2Vcblx0XHRcdGlucHV0LmFkZENsYXNzKFwiZXJyb3JcIilcblx0XHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXHRcdFx0cGFyZW50LmFkZENsYXNzKFwiZXJyb3JcIilcblx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtZXJyb3JcIikudGV4dChtZXNzYWdlKS5hZGRDbGFzcyhcImluXCIpXG5cdFx0ZWxzZVxuXHRcdFx0aW5wdXQucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKVxuXHRcdFx0cGFyZW50ID0gaW5wdXQuY2xvc2VzdChcIi5jb250cm9sLXZhbHVlXCIpXG5cdFx0XHRwYXJlbnQucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKVx0XG5cdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLWVycm9yXCIpLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdHBhcmVudC5maW5kKFwiLmNvbnRyb2wtZXJyb3JcIikucmVtb3ZlQ2xhc3MoXCJpbiBvdXRcIikudGV4dChcIlwiKVxuXHRcdFx0LDUwMFxuXG5cblxuXHRlbWFpbDogKGVsZW1lbnRvLHZhbG9yKSAtPlxuXHRcdGlmIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodmFsb3IpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cblxuXG5cbiJdfQ==