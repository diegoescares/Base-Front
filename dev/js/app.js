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
      return app.loading.init();
    }
  };

  app.alert = {
    init: function() {
      app.alert.equidist();
      setTimeout(function() {
        return app.alert.equidist();
      }, 1000);
      return $(window).resize(function() {
        return app.alert.equidist();
      });
    },
    open: function(options) {
      var alertclass, alertlightclass, buttons, close, content, html, title;
      title = "";
      content = "";
      buttons = "";
      close = "";
      if (options.title) {
        title = "<h2 class='alert-title'>" + options.title + "</h2>";
      }
      if (options.content) {
        content = "<div class='alert-content'>" + options.content + "</div>";
      }
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
      if (options.close === void 0) {
        options.close = true;
      }
      if (options.close === true) {
        close = '<button class="close false"><i class="fa fa-times"></i></button>';
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
          callback();
        }
        return app.plugins.relayout();
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
      if ($(".loadingIn").length) {
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
        var height_body, height_window, scroll, scroll_init;
        scroll = $(window).scrollTop();
        height_window = $(window).height();
        height_body = $("body").height();
        if (scroll > 50 && scroll + height_window < height_body - 50) {
          if (scroll - scroll_prev > 0) {
            $(".header-top-elements").addClass("hide");
          } else {
            $(".header-top-elements").removeClass("hide");
            scroll_init = 0;
          }
        } else {
          $(".header-top-elements").removeClass("hide");
        }
        scroll_prev = scroll;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixTQUFBLEdBQUE7V0FDakIsR0FBRyxDQUFDLElBQUosQ0FBQSxFQURpQjtFQUFBLENBQWxCLENBQUEsQ0FBQTs7QUFBQSxFQUdBLEdBQUEsR0FFQztBQUFBLElBQUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUdMLE1BQUEsR0FBRyxDQUFDLFFBQUosQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUdBLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUFBLENBSEEsQ0FBQTtBQUFBLE1BTUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFYLENBQUEsQ0FOQSxDQUFBO0FBQUEsTUFTQSxHQUFHLENBQUMsUUFBSixDQUFBLENBVEEsQ0FBQTtBQUFBLE1BWUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFWLENBQUEsQ0FaQSxDQUFBO0FBQUEsTUFlQSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQWYsQ0FBb0IsQ0FBQSxDQUFFLFdBQUYsQ0FBcEIsQ0FmQSxDQUFBO2FBa0JBLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBWixDQUFBLEVBckJLO0lBQUEsQ0FBTjtHQUxELENBQUE7O0FBQUEsRUF3Q0EsR0FBRyxDQUFDLEtBQUosR0FFQztBQUFBLElBQUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUNMLE1BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFWLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFWLENBQUEsRUFEVTtNQUFBLENBQVgsRUFFQyxJQUZELENBREEsQ0FBQTthQUlBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLFNBQUEsR0FBQTtlQUNoQixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVYsQ0FBQSxFQURnQjtNQUFBLENBQWpCLEVBTEs7SUFBQSxDQUFOO0FBQUEsSUFRQSxJQUFBLEVBQU0sU0FBQyxPQUFELEdBQUE7QUFFTCxVQUFBLGlFQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsRUFBUixDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQVUsRUFEVixDQUFBO0FBQUEsTUFFQSxPQUFBLEdBQVUsRUFGVixDQUFBO0FBQUEsTUFHQSxLQUFBLEdBQVEsRUFIUixDQUFBO0FBS0EsTUFBQSxJQUFHLE9BQU8sQ0FBQyxLQUFYO0FBQ0MsUUFBQSxLQUFBLEdBQVEsMEJBQUEsR0FBNkIsT0FBTyxDQUFDLEtBQXJDLEdBQTZDLE9BQXJELENBREQ7T0FMQTtBQVFBLE1BQUEsSUFBRyxPQUFPLENBQUMsT0FBWDtBQUNDLFFBQUEsT0FBQSxHQUFVLDZCQUFBLEdBQWdDLE9BQU8sQ0FBQyxPQUF4QyxHQUFrRCxRQUE1RCxDQUREO09BUkE7QUFXQSxNQUFBLElBQUcsT0FBTyxDQUFDLFFBQUQsQ0FBUCxLQUFrQixJQUFyQjtBQUNDLFFBQUEsZUFBQSxHQUFxQixFQUFyQixDQUFBO0FBQUEsUUFDQSxPQUFPLENBQUMsS0FBUixHQUFnQixLQURoQixDQUREO09BQUEsTUFBQTtBQUlDLFFBQUEsZUFBQSxHQUFrQixRQUFsQixDQUpEO09BWEE7QUFpQkEsTUFBQSxJQUFHLE9BQU8sQ0FBQyxVQUFYO0FBQ0MsUUFBQSxVQUFBLEdBQWEsUUFBQSxHQUFXLE9BQU8sQ0FBQyxVQUFoQyxDQUREO09BQUEsTUFBQTtBQUdDLFFBQUEsVUFBQSxHQUFhLGVBQWIsQ0FIRDtPQWpCQTtBQXNCQSxNQUFBLElBQXdCLE9BQU8sQ0FBQyxLQUFSLEtBQWlCLE1BQXpDO0FBQUEsUUFBQSxPQUFPLENBQUMsS0FBUixHQUFnQixJQUFoQixDQUFBO09BdEJBO0FBd0JBLE1BQUEsSUFBRyxPQUFPLENBQUMsS0FBUixLQUFpQixJQUFwQjtBQUNDLFFBQUEsS0FBQSxHQUFRLGtFQUFSLENBREQ7T0F4QkE7QUEyQkEsTUFBQSxJQUFHLE9BQU8sQ0FBQyxPQUFYO0FBQ0MsUUFBQSxPQUFBLElBQVcsT0FBTyxDQUFDLE9BQVIsR0FBa0IsR0FBN0IsQ0FERDtPQTNCQTtBQThCQSxNQUFBLElBQUcsT0FBTyxDQUFDLE1BQVIsS0FBa0IsSUFBckI7QUFDQyxRQUFBLE9BQUEsSUFBVyxpREFBWCxDQUREO09BOUJBO0FBaUNBLE1BQUEsSUFBRyxPQUFPLENBQUMsTUFBUixLQUFrQixJQUFyQjtBQUNDLFFBQUEsT0FBQSxJQUFXLDhEQUFYLENBREQ7T0FqQ0E7QUFvQ0EsTUFBQSxJQUFHLE9BQUg7QUFDQyxRQUFBLE9BQUEsR0FBVSw2QkFBQSxHQUE4QixPQUE5QixHQUFzQyxRQUFoRCxDQUREO09BcENBO0FBQUEsTUF3Q0EsSUFBQSxHQUNDLG9CQUFBLEdBQXFCLFVBQXJCLEdBQWdDLE9BQWhDLEdBQ0MsMEJBREQsR0FDNEIsZUFENUIsR0FDNEMsVUFENUMsR0FFQyxrQ0FGRCxHQUdFLDJCQUhGLEdBSUcsS0FKSCxHQUtHLEtBTEgsR0FNRyxPQU5ILEdBT0csT0FQSCxHQVFFLFFBUkYsR0FTQyxRQVRELEdBVUEsUUFuREQsQ0FBQTtBQUFBLE1Bc0RBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLElBQWpCLENBdERBLENBQUE7QUFBQSxNQXVEQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsUUFBVixDQUFtQixVQUFuQixDQXZEQSxDQUFBO0FBQUEsTUF5REEsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFWLENBQUEsQ0F6REEsQ0FBQTthQTREQSxDQUFBLENBQUUsNkJBQUYsQ0FBZ0MsQ0FBQyxNQUFqQyxDQUF3QyxPQUF4QyxDQUFnRCxDQUFDLElBQWpELENBQXNELE9BQXRELEVBQStELFNBQUEsR0FBQTtBQUU5RCxZQUFBLFdBQUE7QUFBQSxRQUFBLFdBQUEsR0FBYyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixRQUFoQixDQUFkLENBQUE7QUFBQSxRQUVBLFdBQVcsQ0FBQyxRQUFaLENBQXFCLEtBQXJCLENBRkEsQ0FBQTtBQUFBLFFBR0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNWLFVBQUEsV0FBVyxDQUFDLE1BQVosQ0FBQSxDQUFBLENBQUE7aUJBRUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFdBQVYsQ0FBc0IsVUFBdEIsRUFIVTtRQUFBLENBQVgsRUFJQyxHQUpELENBSEEsQ0FBQTtBQVNBLFFBQUEsSUFBRyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQixNQUFqQixDQUFBLElBQTRCLE9BQU8sQ0FBQyxhQUF2QztBQUNDLFVBQUEsT0FBTyxDQUFDLGFBQVIsQ0FBQSxDQUFBLENBREQ7U0FUQTtBQVlBLFFBQUEsSUFBRyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQixPQUFqQixDQUFBLElBQTZCLE9BQU8sQ0FBQyxjQUF4QztBQUNDLFVBQUEsT0FBTyxDQUFDLGNBQVIsQ0FBQSxDQUFBLENBREQ7U0FaQTtBQWVBLGVBQU8sSUFBUCxDQWpCOEQ7TUFBQSxDQUEvRCxFQTlESztJQUFBLENBUk47QUFBQSxJQXlGQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1QsTUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsUUFBWixDQUFxQixLQUFyQixDQUFBLENBQUE7YUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsV0FBVixDQUFzQixVQUF0QixFQUZTO0lBQUEsQ0F6RlY7QUFBQSxJQTZGQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1YsTUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsUUFBWixDQUFxQixLQUFyQixDQUFBLENBQUE7YUFDQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1YsUUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsTUFBWixDQUFBLENBQUEsQ0FBQTtlQUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxXQUFWLENBQXNCLFVBQXRCLEVBRlU7TUFBQSxDQUFYLEVBR0MsR0FIRCxFQUZVO0lBQUEsQ0E3Rlg7QUFBQSxJQW9HQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1QsQ0FBQSxDQUFFLFdBQUYsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsU0FBQSxHQUFBO0FBQ25CLFlBQUEsa0JBQUE7QUFBQSxRQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRixDQUFSLENBQUE7QUFBQSxRQUNBLEtBQUEsR0FBUSxDQUFDLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBYyxDQUFDLEtBQWYsQ0FBQSxDQUFBLEdBQXlCLEtBQUssQ0FBQyxLQUFOLENBQUEsQ0FBMUIsQ0FBQSxHQUEyQyxDQURuRCxDQUFBO0FBRUEsUUFBQSxJQUFhLEtBQUEsR0FBUSxDQUFyQjtBQUFBLFVBQUEsS0FBQSxHQUFRLENBQVIsQ0FBQTtTQUZBO0FBQUEsUUFHQSxJQUFBLEdBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTixDQUFBLENBQWMsQ0FBQyxNQUFmLENBQUEsQ0FBQSxHQUEwQixLQUFLLENBQUMsTUFBTixDQUFBLENBQTNCLENBQUEsR0FBNkMsQ0FIcEQsQ0FBQTtBQUlBLFFBQUEsSUFBWSxJQUFBLEdBQU8sQ0FBbkI7QUFBQSxVQUFBLElBQUEsR0FBTyxDQUFQLENBQUE7U0FKQTtlQUtBLEtBQUssQ0FBQyxHQUFOLENBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxLQUFBLEdBQVEsSUFBZDtBQUFBLFVBQ0EsR0FBQSxFQUFLLElBQUEsR0FBTyxJQURaO1NBREYsRUFObUI7TUFBQSxDQUFwQixFQURTO0lBQUEsQ0FwR1Y7QUFBQSxJQStHQSxJQUFBLEVBQU0sU0FBQyxJQUFELEVBQU0sUUFBTixFQUF5QixRQUF6QixHQUFBOztRQUFNLFdBQVM7T0FDcEI7O1FBRDhCLFdBQVM7T0FDdkM7YUFBQSxDQUFDLENBQUMsSUFBRixDQUNDO0FBQUEsUUFBQSxHQUFBLEVBQUssSUFBTDtBQUFBLFFBQ0EsSUFBQSxFQUFNLEtBRE47T0FERCxDQUdDLENBQUMsSUFIRixDQUdPLFNBQUMsTUFBRCxHQUFBO0FBQ04sUUFBQSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQVYsQ0FDQztBQUFBLFVBQUEsT0FBQSxFQUFTLE1BQVQ7QUFBQSxVQUNBLFVBQUEsRUFBWSxRQURaO1NBREQsQ0FBQSxDQUFBO0FBR0EsUUFBQSxJQUFHLFFBQUg7QUFDQyxVQUFBLFFBQUEsQ0FBQSxDQUFBLENBREQ7U0FIQTtlQUtBLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBWixDQUFBLEVBTk07TUFBQSxDQUhQLEVBREs7SUFBQSxDQS9HTjtHQTFDRCxDQUFBOztBQUFBLEVBd0tBLEdBQUcsQ0FBQyxRQUFKLEdBQWUsU0FBQSxHQUFBO0FBQ2QsSUFBQSxJQUFHLGdFQUFnRSxDQUFDLElBQWpFLENBQXNFLFNBQVMsQ0FBQyxTQUFoRixDQUFIO2FBQ0MsS0FERDtLQUFBLE1BQUE7YUFHQyxNQUhEO0tBRGM7RUFBQSxDQXhLZixDQUFBOztBQUFBLEVBOEtBLEdBQUcsQ0FBQyxRQUFKLEdBQWUsU0FBQSxHQUFBO0FBR2QsSUFBQSxJQUFHLEdBQUcsQ0FBQyxRQUFKLENBQUEsQ0FBSDtBQUNDLE1BQUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFFBQVYsQ0FBbUIsV0FBbkIsQ0FBQSxDQUREO0tBQUE7QUFJQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFWLElBQWtCLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBckIsQ0FBNkIsVUFBN0IsQ0FBQSxLQUEwQyxDQUFBLENBQS9EO0FBQ0MsTUFBQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsUUFBVixDQUFtQixPQUFuQixDQUFBLENBQUE7QUFBQSxNQUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxRQUFWLENBQW1CLE9BQUEsR0FBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQXJDLENBREEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxRQUFBLENBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFuQixDQUFBLElBQStCLENBQWxDO2VBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFWLENBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyx1Q0FBUDtBQUFBLFVBQ0EsT0FBQSxFQUFTLHVGQURUO0FBQUEsVUFFQSxPQUFBLEVBQVMsMkhBRlQ7QUFBQSxVQUdBLFFBQUEsRUFBUSxJQUhSO1NBREQsRUFERDtPQUhEO0tBUGM7RUFBQSxDQTlLZixDQUFBOztBQUFBLEVBaU1BLEdBQUcsQ0FBQyxNQUFKLEdBRUM7QUFBQSxJQUFBLE1BQUEsRUFBUSxTQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsSUFBZCxHQUFBO0FBQ1AsVUFBQSxhQUFBO0FBQUEsTUFBQSxJQUFHLElBQUg7QUFDQyxRQUFBLElBQUEsR0FBVyxJQUFBLElBQUEsQ0FBQSxDQUFYLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBSSxDQUFDLE9BQUwsQ0FBQSxDQUFBLEdBQWlCLENBQUMsSUFBQSxHQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQWpCLEdBQXNCLElBQXZCLENBQTlCLENBREEsQ0FBQTtBQUFBLFFBRUEsT0FBQSxHQUFVLFlBQUEsR0FBZSxJQUFJLENBQUMsV0FBTCxDQUFBLENBRnpCLENBREQ7T0FBQSxNQUFBO0FBS0MsUUFBQSxPQUFBLEdBQVUsRUFBVixDQUxEO09BQUE7YUFNQSxRQUFRLENBQUMsTUFBVCxHQUFrQixJQUFBLEdBQU8sR0FBUCxHQUFhLEtBQWIsR0FBcUIsT0FBckIsR0FBK0IsV0FQMUM7SUFBQSxDQUFSO0FBQUEsSUFTQSxJQUFBLEVBQU0sU0FBQyxJQUFELEdBQUE7QUFDTCxVQUFBLGdCQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBQSxHQUFPLEdBQWhCLENBQUE7QUFBQSxNQUNBLEVBQUEsR0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQWhCLENBQXNCLEdBQXRCLENBREwsQ0FBQTtBQUFBLE1BRUEsQ0FBQSxHQUFJLENBRkosQ0FBQTtBQUlBLGFBQU0sQ0FBQSxHQUFJLEVBQUUsQ0FBQyxNQUFiLEdBQUE7QUFDQyxRQUFBLENBQUEsR0FBSSxFQUFHLENBQUEsQ0FBQSxDQUFQLENBQUE7QUFDOEIsZUFBTSxDQUFDLENBQUMsTUFBRixDQUFTLENBQVQsQ0FBQSxLQUFlLEdBQXJCLEdBQUE7QUFBOUIsVUFBQSxDQUFBLEdBQUksQ0FBQyxDQUFDLFNBQUYsQ0FBWSxDQUFaLEVBQWUsQ0FBQyxDQUFDLE1BQWpCLENBQUosQ0FBOEI7UUFBQSxDQUQ5QjtBQUVBLFFBQUEsSUFBZ0QsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxNQUFWLENBQUEsS0FBcUIsQ0FBckU7QUFBQSxpQkFBTyxDQUFDLENBQUMsU0FBRixDQUFZLE1BQU0sQ0FBQyxNQUFuQixFQUEyQixDQUFDLENBQUMsTUFBN0IsQ0FBUCxDQUFBO1NBRkE7QUFBQSxRQUdBLENBQUEsRUFIQSxDQUREO01BQUEsQ0FKQTthQVNBLEtBVks7SUFBQSxDQVROO0FBQUEsSUFxQkEsUUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO2FBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFYLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCLENBQUEsQ0FBNUIsRUFETztJQUFBLENBckJSO0dBbk1ELENBQUE7O0FBQUEsRUE4TkEsR0FBRyxDQUFDLFlBQUosR0FBbUIsU0FBQyxDQUFELEdBQUE7V0FDbEIsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFWLENBQVksQ0FBQyxPQUFiLENBQXFCLElBQXJCLEVBQTJCLFNBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEdBQUE7QUFDekIsTUFBQSxJQUFHLENBQUEsSUFBTSxDQUFBLEtBQU8sR0FBYixJQUFxQixDQUFBLENBQUssQ0FBQyxDQUFDLENBQUMsTUFBRixHQUFXLENBQVosQ0FBQSxHQUFpQixDQUFsQixDQUE1QjtlQUFzRCxHQUFBLEdBQU0sRUFBNUQ7T0FBQSxNQUFBO2VBQW1FLEVBQW5FO09BRHlCO0lBQUEsQ0FBM0IsRUFEa0I7RUFBQSxDQTlObkIsQ0FBQTs7QUFBQSxFQXFPQSxHQUFHLENBQUMsSUFBSixHQUFXLFNBQUEsR0FBQTtBQUVWLFFBQUEsK0VBQUE7QUFBQSxJQUFBLElBQUcsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQWI7QUFFQyxNQUFBLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FBQSxDQUFkLENBQUE7QUFBQSxNQUNBLFVBQUEsR0FBYSxLQURiLENBQUE7QUFBQSxNQUdBLFFBQUEsR0FBVyxRQUFBLENBQVMsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxXQUFmLENBQVQsQ0FIWCxDQUFBO0FBQUEsTUFLQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxVQUFmLENBTFYsQ0FBQTtBQUFBLE1BTUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsVUFBZixDQU5WLENBQUE7QUFBQSxNQVFBLGFBQUEsR0FBZ0I7UUFDZjtBQUFBLFVBQUEsV0FBQSxFQUFhLEtBQWI7QUFBQSxVQUNBLFdBQUEsRUFBYSxLQURiO0FBQUEsVUFFQSxPQUFBLEVBQVM7WUFDUjtBQUFBLGNBQUEsVUFBQSxFQUFZLENBQUEsR0FBWjthQURRO1dBRlQ7U0FEZTtPQVJoQixDQUFBO0FBQUEsTUFnQkEsVUFBQSxHQUNDO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsTUFBQSxFQUFZLElBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFaLENBQW1CLE9BQW5CLEVBQTJCLE9BQTNCLENBRFo7QUFBQSxRQUVBLFNBQUEsRUFBVyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUZqQztBQUFBLFFBR0EsZ0JBQUEsRUFBa0IsSUFIbEI7QUFBQSxRQUlBLFdBQUEsRUFBYSxLQUpiO0FBQUEsUUFLQSxpQkFBQSxFQUFtQixLQUxuQjtBQUFBLFFBTUEsTUFBQSxFQUFRLGFBTlI7T0FqQkQsQ0FBQTtBQUFBLE1BMEJBLEdBQUEsR0FBVSxJQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBWixDQUFnQixRQUFRLENBQUMsY0FBVCxDQUF3QixLQUF4QixDQUFoQixFQUFnRCxVQUFoRCxDQTFCVixDQUFBO0FBQUEsTUE0QkEsQ0FBQSxDQUFFLGNBQUYsQ0FBaUIsQ0FBQyxLQUFsQixDQUF3QixTQUFBLEdBQUE7QUFDdkIsUUFBQSxHQUFHLENBQUMsT0FBSixDQUFZLEdBQUcsQ0FBQyxPQUFKLENBQUEsQ0FBQSxHQUFnQixDQUE1QixDQUFBLENBQUE7ZUFDQSxNQUZ1QjtNQUFBLENBQXhCLENBNUJBLENBQUE7QUFBQSxNQWdDQSxDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLEtBQW5CLENBQXlCLFNBQUEsR0FBQTtBQUN4QixRQUFBLEdBQUcsQ0FBQyxPQUFKLENBQVksR0FBRyxDQUFDLE9BQUosQ0FBQSxDQUFBLEdBQWdCLENBQTVCLENBQUEsQ0FBQTtlQUNBLE1BRndCO01BQUEsQ0FBekIsQ0FoQ0EsQ0FBQTtBQUFBLE1Bd0NBLENBQUEsQ0FBRSx3QkFBRixDQUEyQixDQUFDLElBQTVCLENBQWlDLFNBQUEsR0FBQTtBQUVoQyxZQUFBLGVBQUE7QUFBQSxRQUFBLE1BQUEsR0FBYSxJQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBWixDQUNaO0FBQUEsVUFBQSxRQUFBLEVBQWMsSUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQVosQ0FBbUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxVQUFiLENBQW5CLEVBQTZDLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsVUFBYixDQUE3QyxDQUFkO0FBQUEsVUFDQSxTQUFBLEVBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFEakM7QUFBQSxVQUVBLElBQUEsRUFBTSxnQkFGTjtBQUFBLFVBR0EsR0FBQSxFQUFLLEdBSEw7U0FEWSxDQUFiLENBQUE7QUFBQSxRQU9BLE9BQUEsR0FDQyw4QkFBQSxHQUNDLE1BREQsR0FDUSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFBLENBRFIsR0FDdUIsT0FEdkIsR0FFQyxNQUZELEdBR0UsaUNBSEYsR0FHb0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxjQUFiLENBSHBDLEdBR2lFLE9BSGpFLEdBSUUsbUJBSkYsR0FJc0IsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxZQUFiLENBSnRCLEdBSWlELGdDQUpqRCxHQUlrRixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLFlBQWIsQ0FKbEYsR0FJNkcsV0FKN0csR0FLRSxzQkFMRixHQUt5QixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLFlBQWIsQ0FMekIsR0FLb0QsbUNBTHBELEdBS3dGLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsWUFBYixDQUx4RixHQUttSCxXQUxuSCxHQU1DLE9BTkQsR0FPQSxRQWZELENBQUE7QUFBQSxRQWtCQSxNQUFPLENBQUEsU0FBQSxDQUFQLEdBQW9CLE9BbEJwQixDQUFBO0FBQUEsUUFtQkEsTUFBTyxDQUFBLE9BQUEsQ0FBUCxHQUFrQixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsR0FBUixDQUFBLENBbkJsQixDQUFBO0FBcUJBLFFBQUEsSUFBRyxDQUFBLFVBQUg7QUFDQyxVQUFBLFVBQUEsR0FBaUIsSUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVosQ0FBdUI7QUFBQSxZQUFBLE9BQUEsRUFBUSxHQUFSO1dBQXZCLENBQWpCLENBREQ7U0FyQkE7QUFBQSxRQXdCQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFsQixDQUE4QixHQUE5QixFQUFtQyxPQUFuQyxFQUE0QyxTQUFBLEdBQUE7aUJBQzNDLFVBQVUsQ0FBQyxLQUFYLENBQUEsRUFEMkM7UUFBQSxDQUE1QyxDQXhCQSxDQUFBO0FBQUEsUUEyQkEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBbEIsQ0FBOEIsTUFBOUIsRUFBc0MsT0FBdEMsRUFBK0MsU0FBQSxHQUFBO0FBQzlDLFVBQUEsVUFBVSxDQUFDLEtBQVgsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLFVBQVUsQ0FBQyxVQUFYLENBQXNCLE9BQXRCLENBREEsQ0FBQTtBQUFBLFVBRUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FGQSxDQUFBO0FBQUEsVUFHQSxDQUFBLENBQUUsYUFBRixDQUFnQixDQUFDLEdBQWpCLENBQXFCLE1BQU0sQ0FBQyxLQUE1QixDQUhBLENBQUE7aUJBSUEsR0FBRyxDQUFDLFNBQUosQ0FBYyxNQUFNLENBQUMsV0FBUCxDQUFBLENBQWQsRUFMOEM7UUFBQSxDQUEvQyxDQTNCQSxDQUFBO2VBa0NBLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixFQXBDZ0M7TUFBQSxDQUFqQyxDQXhDQSxDQUFBO2FBK0VBLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsTUFBakIsQ0FBd0IsU0FBQSxHQUFBO0FBQ3ZCLFlBQUEsS0FBQTtBQUFBLFFBQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxhQUFGLENBQWlCLENBQUEsQ0FBQSxDQUFFLENBQUMsYUFBcEIsR0FBb0MsQ0FBNUMsQ0FBQTtBQUNBLFFBQUEsSUFBRyxLQUFBLElBQVMsQ0FBWjtBQUNDLFVBQUEsVUFBVSxDQUFDLEtBQVgsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLFVBQVUsQ0FBQyxVQUFYLENBQXNCLE9BQVEsQ0FBQSxLQUFBLENBQU8sQ0FBQSxTQUFBLENBQXJDLENBREEsQ0FBQTtBQUFBLFVBRUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsR0FBaEIsRUFBcUIsT0FBUSxDQUFBLEtBQUEsQ0FBN0IsQ0FGQSxDQUFBO2lCQUdBLEdBQUcsQ0FBQyxTQUFKLENBQWMsT0FBUSxDQUFBLEtBQUEsQ0FBTSxDQUFDLFdBQWYsQ0FBQSxDQUFkLEVBSkQ7U0FGdUI7TUFBQSxDQUF4QixFQWpGRDtLQUZVO0VBQUEsQ0FyT1gsQ0FBQTs7QUFBQSxFQW9VQSxHQUFHLENBQUMsT0FBSixHQUVDO0FBQUEsSUFBQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0wsTUFBQSxJQUFHLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxNQUFuQjtlQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBRCxDQUFYLENBQUEsRUFERDtPQUFBO0FBRUE7QUFBQTs7OztTQUhLO0lBQUEsQ0FBTjtBQUFBLElBU0EsSUFBQSxFQUFJLFNBQUMsT0FBRCxHQUFBO0FBQ0gsTUFBQSxJQUF1QixDQUFBLE9BQXZCO0FBQUEsUUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLE1BQUYsQ0FBVixDQUFBO09BQUE7YUFDQSxPQUFPLENBQUMsTUFBUixDQUFlLEVBQUEsR0FDZCx1QkFEYyxHQUViLDRCQUZhLEdBR1osb0RBSFksR0FJYixRQUphLEdBS2QsUUFMRCxFQUZHO0lBQUEsQ0FUSjtBQUFBLElBaUJBLEdBQUEsRUFBSyxTQUFBLEdBQUE7QUFDSixNQUFBLENBQUEsQ0FBRSxVQUFGLENBQWEsQ0FBQyxRQUFkLENBQXVCLEtBQXZCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUNWLENBQUEsQ0FBRSxVQUFGLENBQWEsQ0FBQyxNQUFkLENBQUEsRUFEVTtNQUFBLENBQVgsRUFFQyxHQUZELENBREEsQ0FBQTthQUlBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxRQUFWLENBQW1CLFFBQW5CLEVBTEk7SUFBQSxDQWpCTDtHQXRVRCxDQUFBOztBQUFBLEVBaVdBLEdBQUcsQ0FBQyxPQUFKLEdBRUM7QUFBQSxJQUFBLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFFTDtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBRks7SUFBQSxDQUFOO0FBQUEsSUFpREEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUVUO0FBQUE7Ozs7Ozs7Ozs7OztTQUZTO0lBQUEsQ0FqRFY7R0FuV0QsQ0FBQTs7QUFBQSxFQXVhQSxHQUFHLENBQUMsTUFBSixHQUFhLFNBQUEsR0FBQTtBQUVaLFFBQUEsV0FBQTtBQUFBLElBQUEsSUFBRyxDQUFBLEdBQUksQ0FBQyxRQUFKLENBQUEsQ0FBRCxJQUFtQixDQUFBLENBQUUsQ0FBQyxPQUFPLENBQUMsSUFBakM7QUFDQyxNQUFBLFdBQUEsR0FBYyxDQUFkLENBQUE7YUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFBLEdBQUE7QUFJaEIsWUFBQSwrQ0FBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxTQUFWLENBQUEsQ0FBVCxDQUFBO0FBQUEsUUFDQSxhQUFBLEdBQWdCLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FEaEIsQ0FBQTtBQUFBLFFBRUEsV0FBQSxHQUFjLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FGZCxDQUFBO0FBR0EsUUFBQSxJQUFHLE1BQUEsR0FBUyxFQUFULElBQWUsTUFBQSxHQUFTLGFBQVQsR0FBeUIsV0FBQSxHQUFjLEVBQXpEO0FBQ0MsVUFBQSxJQUFHLE1BQUEsR0FBTyxXQUFQLEdBQXFCLENBQXhCO0FBQ0MsWUFBQSxDQUFBLENBQUUsc0JBQUYsQ0FBeUIsQ0FBQyxRQUExQixDQUFtQyxNQUFuQyxDQUFBLENBREQ7V0FBQSxNQUFBO0FBR0MsWUFBQSxDQUFBLENBQUUsc0JBQUYsQ0FBeUIsQ0FBQyxXQUExQixDQUFzQyxNQUF0QyxDQUFBLENBQUE7QUFBQSxZQUNBLFdBQUEsR0FBYyxDQURkLENBSEQ7V0FERDtTQUFBLE1BQUE7QUFPQyxVQUFBLENBQUEsQ0FBRSxzQkFBRixDQUF5QixDQUFDLFdBQTFCLENBQXNDLE1BQXRDLENBQUEsQ0FQRDtTQUhBO0FBQUEsUUFXQSxXQUFBLEdBQWMsTUFYZCxDQUFBO0FBZ0JBLFFBQUEsSUFBRyxDQUFBLENBQUUsZ0JBQUYsQ0FBbUIsQ0FBQyxNQUF2QjtpQkFDQyxDQUFBLENBQUUsZ0JBQUYsQ0FBbUIsQ0FBQyxJQUFwQixDQUF5QixTQUFBLEdBQUE7QUFDeEIsZ0JBQUEsb0NBQUE7QUFBQSxZQUFBLE9BQUEsR0FBVSxDQUFBLENBQUUsSUFBRixDQUFWLENBQUE7QUFBQSxZQUNBLFdBQUEsR0FBYyxPQUFPLENBQUMsTUFBUixDQUFBLENBQWdCLENBQUMsR0FEL0IsQ0FBQTtBQUFBLFlBRUEsY0FBQSxHQUFpQixPQUFPLENBQUMsTUFBUixDQUFBLENBRmpCLENBQUE7QUFHQSxZQUFBLElBQUcsTUFBQSxHQUFTLGFBQVQsR0FBeUIsY0FBQSxHQUFpQixXQUE3QztxQkFDQyxPQUFPLENBQUMsUUFBUixDQUFpQixJQUFqQixFQUREO2FBSndCO1VBQUEsQ0FBekIsRUFERDtTQXBCZ0I7TUFBQSxDQUFqQixFQUZEO0tBRlk7RUFBQSxDQXZhYixDQUFBOztBQUFBLEVBMGNBLEdBQUcsQ0FBQyxVQUFKLEdBRUM7QUFBQSxJQUFBLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFHTCxVQUFBLCtEQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sUUFBUSxDQUFDLEdBQWYsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLEdBQUcsQ0FBQyxLQUFKLENBQVUsR0FBVixDQURaLENBQUE7QUFBQSxNQUVBLFNBQUEsR0FBWSxTQUFVLENBQUEsU0FBUyxDQUFDLE1BQVYsR0FBaUIsQ0FBakIsQ0FGdEIsQ0FBQTtBQUFBLE1BR0EsZUFBQSxHQUFrQixTQUFTLENBQUMsS0FBVixDQUFnQixHQUFoQixDQUhsQixDQUFBO0FBQUEsTUFJQSxlQUFBLEdBQWtCLGVBQWdCLENBQUEsQ0FBQSxDQUpsQyxDQUFBO0FBQUEsTUFLQSxFQUFBLEdBQUssQ0FBQSxDQUFFLDhCQUFBLEdBQStCLGVBQS9CLEdBQStDLElBQWpELENBQXNELENBQUMsTUFBdkQsQ0FBOEQsSUFBOUQsQ0FMTCxDQUFBO0FBQUEsTUFNQSxFQUFFLENBQUMsUUFBSCxDQUFZLGNBQVosQ0FOQSxDQUFBO0FBQUEsTUFPQSxFQUFFLENBQUMsTUFBSCxDQUFBLENBQVcsQ0FBQyxNQUFaLENBQW1CLElBQW5CLENBQXdCLENBQUMsUUFBekIsQ0FBa0MsY0FBbEMsQ0FQQSxDQUFBO0FBQUEsTUFVQSxDQUFBLENBQUUsNkJBQUYsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxTQUFBLEdBQUE7QUFDckMsUUFBQSxJQUFHLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxNQUFSLENBQUEsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFzQixJQUF0QixDQUEyQixDQUFDLE1BQS9CO0FBQ0MsVUFBQSxJQUFHLENBQUEsQ0FBQyxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsbUJBQWpCLENBQUo7QUFDQyxZQUFBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLG1CQUFqQixDQUFxQyxDQUFDLE9BQXRDLENBQThDLHFDQUE5QyxDQUFBLENBQUE7bUJBQ0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE1BQVIsQ0FBQSxDQUFnQixDQUFDLElBQWpCLENBQXNCLElBQXRCLENBQTJCLENBQUMsT0FBNUIsQ0FBb0MsMkZBQXBDLEVBRkQ7V0FERDtTQURxQztNQUFBLENBQXRDLENBVkEsQ0FBQTtBQWdCQSxNQUFBLElBQUcsQ0FBQSxDQUFFLDREQUFGLENBQStELENBQUMsTUFBbkU7QUFDQyxRQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBZixDQUE4QixDQUFBLENBQUUsNERBQUYsQ0FBOUIsQ0FBQSxDQUREO09BaEJBO0FBQUEsTUFxQkEsQ0FBQSxDQUFFLG9CQUFGLENBQXVCLENBQUMsS0FBeEIsQ0FBOEIsU0FBQSxHQUFBO0FBQzdCLFFBQUEsSUFBRyxDQUFBLENBQUMsQ0FBRSxNQUFGLENBQVMsQ0FBQyxRQUFWLENBQW1CLGVBQW5CLENBQUo7aUJBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFmLENBQW9CLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLElBQXpCLENBQUEsQ0FBcEIsRUFERDtTQUFBLE1BQUE7aUJBR0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFmLENBQUEsRUFIRDtTQUQ2QjtNQUFBLENBQTlCLENBckJBLENBQUE7QUFBQSxNQTBCQSxDQUFBLENBQUUsNkJBQUYsQ0FBZ0MsQ0FBQyxLQUFqQyxDQUF1QyxTQUFBLEdBQUE7QUFDdEMsUUFBQSxJQUFHLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxRQUFWLENBQW1CLGVBQW5CLENBQUg7aUJBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFmLENBQUEsRUFERDtTQURzQztNQUFBLENBQXZDLENBMUJBLENBQUE7YUE2QkEsS0FoQ0s7SUFBQSxDQUFOO0FBQUEsSUFrQ0EsY0FBQSxFQUFnQixTQUFDLE9BQUQsR0FBQTtBQUNmLFVBQUEsRUFBQTtBQUFBLE1BQUEsRUFBQSxHQUFLLE9BQU8sQ0FBQyxNQUFSLENBQUEsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFzQixJQUF0QixDQUFMLENBQUE7QUFBQSxNQUNBLEVBQUUsQ0FBQyxRQUFILENBQVksSUFBWixDQURBLENBQUE7YUFFQSxFQUFFLENBQUMsSUFBSCxDQUFRLG1CQUFSLENBQTRCLENBQUMsTUFBN0IsQ0FBb0MsT0FBcEMsQ0FBNEMsQ0FBQyxJQUE3QyxDQUFrRCxPQUFsRCxFQUEyRCxTQUFBLEdBQUE7QUFDMUQsUUFBQSxFQUFFLENBQUMsUUFBSCxDQUFZLEtBQVosQ0FBQSxDQUFBO0FBQUEsUUFDQSxVQUFBLENBQVcsU0FBQSxHQUFBO2lCQUNWLEVBQUUsQ0FBQyxXQUFILENBQWUsUUFBZixFQURVO1FBQUEsQ0FBWCxFQUVDLEdBRkQsQ0FEQSxDQUFBO2VBSUEsTUFMMEQ7TUFBQSxDQUEzRCxFQUhlO0lBQUEsQ0FsQ2hCO0FBQUEsSUE2Q0EsSUFBQSxFQUFNLFNBQUMsSUFBRCxFQUFNLFFBQU4sRUFBcUIsU0FBckIsR0FBQTtBQUVMLFVBQUEsaUJBQUE7O1FBRlcsV0FBUztPQUVwQjs7UUFGMEIsWUFBVTtPQUVwQztBQUFBLE1BQUEsTUFBQSxHQUFZLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsTUFBakIsR0FBMEIsQ0FBdEMsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLHdDQUFBLEdBQXlDLENBQUMsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxNQUFqQixHQUEwQixDQUEzQixDQUF6QyxHQUF1RSxVQURuRixDQUFBO0FBR0EsTUFBQSxJQUFHLENBQUEsUUFBSDtBQUNDLFFBQUEsQ0FBQSxDQUFFLDRCQUFGLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsU0FBckMsQ0FBQSxDQUREO09BQUEsTUFBQTtBQUdDLFFBQUEsQ0FBQSxDQUFFLDRCQUFGLENBQStCLENBQUMsTUFBaEMsQ0FBdUMsU0FBdkMsQ0FBQSxDQUhEO09BSEE7QUFBQSxNQVFBLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsRUFBakIsQ0FBb0IsQ0FBQSxDQUFwQixDQUF1QixDQUFDLElBQXhCLENBQTZCLGdDQUFBLEdBQWlDLElBQWpDLEdBQXNDLFFBQW5FLENBUkEsQ0FBQTtBQUFBLE1BVUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFFBQVYsQ0FBbUIsMkJBQUEsR0FBNEIsU0FBL0MsQ0FWQSxDQUFBO0FBQUEsTUFXQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsSUFBVixDQUFlLHFCQUFmLEVBQXFDLE1BQXJDLENBWEEsQ0FBQTtBQUFBLE1BY0EsQ0FBQSxDQUFFLHFCQUFGLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsU0FBQSxHQUFBO0FBQzdCLFFBQUEsSUFBRyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsTUFBUixDQUFBLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMkIsQ0FBQyxNQUEvQjtBQUNDLFVBQUEsSUFBRyxDQUFBLENBQUMsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLG1CQUFqQixDQUFKO21CQUNDLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxRQUFSLENBQWlCLG1CQUFqQixDQUFxQyxDQUFDLE9BQXRDLENBQThDLHFDQUE5QyxFQUREO1dBREQ7U0FENkI7TUFBQSxDQUE5QixDQWRBLENBQUE7QUFBQSxNQW9CQSxDQUFBLENBQUUsdUNBQUYsQ0FBMEMsQ0FBQyxNQUEzQyxDQUFrRCxPQUFsRCxDQUEwRCxDQUFDLElBQTNELENBQWdFLE9BQWhFLEVBQXlFLFNBQUEsR0FBQTtBQUN4RSxRQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUFvQixNQUFBLEdBQU8sQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE1BQVIsQ0FBQSxDQUFnQixDQUFDLElBQWpCLENBQXNCLElBQXRCLENBQTJCLENBQUMsSUFBNUIsQ0FBQSxDQUFQLEdBQTBDLE9BQTlELEVBQXVFLElBQXZFLENBQUEsQ0FBQTtlQUNBLE1BRndFO01BQUEsQ0FBekUsQ0FwQkEsQ0FBQTthQXdCQSxDQUFBLENBQUUsK0JBQUYsQ0FBa0MsQ0FBQyxNQUFuQyxDQUEwQyxPQUExQyxDQUFrRCxDQUFDLElBQW5ELENBQXdELE9BQXhELEVBQWlFLFNBQUEsR0FBQTtBQUNoRSxZQUFBLFFBQUE7QUFBQSxRQUFBLFFBQUEsR0FBVyxRQUFBLENBQVMsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxxQkFBZixDQUFULENBQVgsQ0FBQTtBQUFBLFFBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxxQkFBZixFQUFzQyxRQUFBLEdBQVMsQ0FBL0MsQ0FEQSxDQUFBO0FBQUEsUUFFQSxDQUFBLENBQUUsNkJBQUEsR0FBOEIsUUFBaEMsQ0FBeUMsQ0FBQyxRQUExQyxDQUFtRCxLQUFuRCxDQUZBLENBQUE7QUFBQSxRQUdBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7aUJBQ1YsQ0FBQSxDQUFFLDZCQUFBLEdBQThCLFFBQWhDLENBQXlDLENBQUMsTUFBMUMsQ0FBQSxFQURVO1FBQUEsQ0FBWCxFQUVDLEdBRkQsQ0FIQSxDQUFBO2VBTUEsTUFQZ0U7TUFBQSxDQUFqRSxFQTFCSztJQUFBLENBN0NOO0FBQUEsSUFnRkEsS0FBQSxFQUFPLFNBQUEsR0FBQTtBQUVOLE1BQUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFFBQVYsQ0FBbUIsZ0JBQW5CLENBQUEsQ0FBQTthQUNBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVixRQUFBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxXQUFWLENBQXNCLCtFQUFBLEdBQWdGLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUscUJBQWYsQ0FBdEcsQ0FBQSxDQUFBO0FBQUEsUUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsVUFBVixDQUFxQixxQkFBckIsQ0FEQSxDQUFBO2VBRUEsQ0FBQSxDQUFFLGFBQUYsQ0FBZ0IsQ0FBQyxNQUFqQixDQUFBLEVBSFU7TUFBQSxDQUFYLEVBSUMsR0FKRCxFQUhNO0lBQUEsQ0FoRlA7R0E1Y0QsQ0FBQTs7QUFBQSxFQXlpQkEsR0FBRyxDQUFDLE1BQUosR0FFQztBQUFBLElBQUEsSUFBQSxFQUFNLFNBQUEsR0FBQTthQUNMLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUEsR0FBQTtlQUNqQixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQVgsQ0FBaUIsQ0FBQSxDQUFFLElBQUYsQ0FBakIsRUFEaUI7TUFBQSxDQUFsQixFQURLO0lBQUEsQ0FBTjtBQUFBLElBSUEsS0FBQSxFQUFPLFNBQUMsT0FBRCxHQUFBO0FBRU4sVUFBQSxnQ0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLGtCQUFBLENBQW1CLE9BQU8sQ0FBQyxJQUFSLENBQWEsVUFBYixDQUFuQixDQUFaLENBQUE7QUFBQSxNQUNBLFVBQUEsR0FBYSxrQkFBQSxDQUFtQixPQUFPLENBQUMsSUFBUixDQUFhLFdBQWIsQ0FBbkIsQ0FEYixDQUFBO0FBQUEsTUFFQSxTQUFBLEdBQVksa0JBQUEsQ0FBbUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxVQUFiLENBQW5CLENBRlosQ0FBQTtBQUlBLE1BQUEsSUFBRyxPQUFPLENBQUMsUUFBUixDQUFpQixnQkFBakIsQ0FBSDtBQUNDLFFBQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFYLENBQXVCLCtDQUFBLEdBQWdELFNBQXZFLEVBQWtGLEdBQWxGLEVBQXVGLEdBQXZGLENBQUEsQ0FERDtPQUpBO0FBT0EsTUFBQSxJQUFHLE9BQU8sQ0FBQyxRQUFSLENBQWlCLGVBQWpCLENBQUg7QUFDQyxRQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBWCxDQUF1Qiw2REFBQSxHQUE4RCxVQUE5RCxHQUF5RSxXQUF6RSxHQUFxRixTQUE1RyxFQUF1SCxHQUF2SCxFQUE0SCxHQUE1SCxDQUFBLENBREQ7T0FQQTtBQVVBLE1BQUEsSUFBRyxPQUFPLENBQUMsUUFBUixDQUFpQixpQkFBakIsQ0FBSDtBQUNDLFFBQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFYLENBQXVCLDhDQUFBLEdBQStDLFNBQS9DLEdBQXlELFNBQXpELEdBQW1FLFNBQW5FLEdBQTZFLGVBQTdFLEdBQTZGLFVBQXBILEVBQWdJLEdBQWhJLEVBQXFJLEdBQXJJLENBQUEsQ0FERDtPQVZBO0FBYUEsTUFBQSxJQUFHLE9BQU8sQ0FBQyxRQUFSLENBQWlCLGtCQUFqQixDQUFIO0FBQ0MsUUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVgsQ0FBdUIsb0NBQUEsR0FBcUMsU0FBNUQsRUFBdUUsR0FBdkUsRUFBNEUsR0FBNUUsQ0FBQSxDQUREO09BYkE7QUFnQkEsTUFBQSxJQUFHLE9BQU8sQ0FBQyxRQUFSLENBQWlCLGdCQUFqQixDQUFIO0FBQ0MsUUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVgsQ0FBdUIscURBQUEsR0FBc0QsU0FBdEQsR0FBZ0UsU0FBaEUsR0FBMEUsVUFBMUUsR0FBcUYsV0FBckYsR0FBaUcsVUFBakcsR0FBNEcsVUFBNUcsR0FBdUgsU0FBOUksRUFBeUosR0FBekosRUFBOEosR0FBOUosQ0FBQSxDQUREO09BaEJBO2FBbUJBLE1BckJNO0lBQUEsQ0FKUDtBQUFBLElBMkJBLFdBQUEsRUFBYSxTQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsQ0FBVCxHQUFBO0FBQ1osVUFBQSxTQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sQ0FBRSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsS0FBVixDQUFBLENBQUEsR0FBb0IsQ0FBdEIsQ0FBQSxHQUE2QixDQUFDLENBQUEsR0FBSSxDQUFMLENBQXBDLENBQUE7QUFBQSxNQUNBLEdBQUEsR0FBTyxDQUFFLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FBQSxHQUFxQixDQUF2QixDQUFBLEdBQTZCLENBQUMsQ0FBQSxHQUFJLENBQUwsQ0FEcEMsQ0FBQTtBQUVBLGFBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWlCLFdBQWpCLEVBQThCLHFIQUFBLEdBQXNILENBQXRILEdBQXdILFdBQXhILEdBQW9JLENBQXBJLEdBQXNJLFFBQXRJLEdBQStJLEdBQS9JLEdBQW1KLFNBQW5KLEdBQTZKLElBQTNMLENBQVAsQ0FIWTtJQUFBLENBM0JiO0dBM2lCRCxDQUFBOztBQUFBLEVBOGtCQSxHQUFHLENBQUMsUUFBSixHQUFlLFNBQUEsR0FBQTtXQUVkLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLElBQXBCLENBQXlCLFNBQUEsR0FBQTtBQUN4QixVQUFBLEdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLHVCQUFiLENBQU4sQ0FBQTtBQUNBLE1BQUEsSUFBa0IsQ0FBQSxHQUFsQjtBQUFBLFFBQUEsR0FBQSxHQUFNLFFBQU4sQ0FBQTtPQURBO0FBQUEsTUFFQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQixnQkFBakIsQ0FGQSxDQUFBO2FBR0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE1BQVIsQ0FBZSwrQkFBQSxHQUFnQyxHQUFoQyxHQUFvQyx3R0FBcEMsR0FBK0ksQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxjQUFiLENBQS9JLEdBQThLLHVCQUE3TCxFQUp3QjtJQUFBLENBQXpCLEVBRmM7RUFBQSxDQTlrQmYsQ0FBQTs7QUFBQSxFQTJsQkEsR0FBRyxDQUFDLFVBQUosR0FFQztBQUFBLElBQUEsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFPLFFBQVAsR0FBQTs7UUFBTyxXQUFTO09BRXJCO2FBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyxTQUFBLEdBQUE7QUFFVixZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxDQUFBLENBQUUsSUFBRixDQUFQLENBQUE7QUFBQSxRQUVBLElBQUksQ0FBQyxJQUFMLENBQVUseUJBQVYsQ0FBb0MsQ0FBQyxNQUFyQyxDQUE0QyxtQ0FBNUMsQ0FGQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsSUFBTCxDQUFVLHVCQUFWLENBQWtDLENBQUMsSUFBbkMsQ0FBd0MsU0FBQSxHQUFBO0FBQ3ZDLGNBQUEsS0FBQTtBQUFBLFVBQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxJQUFGLENBQVIsQ0FBQTtBQUFBLFVBQ0EsS0FBSyxDQUFDLFFBQU4sQ0FBZ0IsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQWhCLENBREEsQ0FBQTtBQUVBLFVBQUEsSUFBZ0MsS0FBSyxDQUFDLEVBQU4sQ0FBUyxXQUFULENBQWhDO0FBQUEsWUFBQSxLQUFLLENBQUMsUUFBTixDQUFnQixVQUFoQixDQUFBLENBQUE7V0FGQTtpQkFHQSxLQUFLLENBQUMsSUFBTixDQUFXLGNBQVgsRUFBMkIsU0FBQSxHQUFBO21CQUMxQixHQUFHLENBQUMsVUFBVSxDQUFDLFNBQWYsQ0FBeUIsS0FBekIsRUFEMEI7VUFBQSxDQUEzQixFQUp1QztRQUFBLENBQXhDLENBSkEsQ0FBQTtBQUFBLFFBV0EsSUFBSSxDQUFDLElBQUwsQ0FBVSw2QkFBVixDQUF3QyxDQUFDLElBQXpDLENBQThDLFNBQUEsR0FBQTtBQUM3QyxVQUFBLElBQUcsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLEVBQVIsQ0FBVyxVQUFYLENBQUg7bUJBQ0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE9BQVIsQ0FBZ0IsT0FBaEIsQ0FBd0IsQ0FBQyxRQUF6QixDQUFrQyxTQUFsQyxFQUREO1dBQUEsTUFBQTttQkFHQyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixPQUFoQixDQUF3QixDQUFDLFdBQXpCLENBQXFDLFNBQXJDLEVBSEQ7V0FENkM7UUFBQSxDQUE5QyxDQVhBLENBQUE7QUFBQSxRQWlCQSxJQUFJLENBQUMsSUFBTCxDQUFVLDZCQUFWLENBQXdDLENBQUMsTUFBekMsQ0FBZ0QsU0FBQSxHQUFBO2lCQUMvQyxJQUFJLENBQUMsSUFBTCxDQUFVLDZCQUFWLENBQXdDLENBQUMsSUFBekMsQ0FBOEMsU0FBQSxHQUFBO0FBQzdDLFlBQUEsSUFBRyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsRUFBUixDQUFXLFVBQVgsQ0FBSDtxQkFDQyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsT0FBUixDQUFnQixPQUFoQixDQUF3QixDQUFDLFFBQXpCLENBQWtDLFNBQWxDLEVBREQ7YUFBQSxNQUFBO3FCQUdDLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxPQUFSLENBQWdCLE9BQWhCLENBQXdCLENBQUMsV0FBekIsQ0FBcUMsU0FBckMsRUFIRDthQUQ2QztVQUFBLENBQTlDLEVBRCtDO1FBQUEsQ0FBaEQsQ0FqQkEsQ0FBQTtBQUFBLFFBeUJBLElBQUksQ0FBQyxJQUFMLENBQVUsY0FBVixDQUF5QixDQUFDLElBQTFCLENBQStCLFNBQUEsR0FBQTtpQkFDOUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEIsQ0FBNkIsQ0FBQyxJQUE5QixDQUFtQyxzQkFBbkMsQ0FBMEQsQ0FBQyxLQUEzRCxDQUFpRSw4RkFBakUsRUFEOEI7UUFBQSxDQUEvQixDQXpCQSxDQUFBO0FBQUEsUUE0QkEsSUFBSSxDQUFDLElBQUwsQ0FBVSx3QkFBVixDQUFtQyxDQUFDLElBQXBDLENBQXlDLE9BQXpDLEVBQWtELFNBQUEsR0FBQTtBQUVqRCxjQUFBLGdDQUFBO0FBQUEsVUFBQSxNQUFBLEdBQVMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLE1BQVIsQ0FBQSxDQUFnQixDQUFDLElBQWpCLENBQXNCLE9BQXRCLENBQVQsQ0FBQTtBQUFBLFVBRUEsSUFBQSxHQUFPLFFBQUEsQ0FBUyxNQUFNLENBQUMsSUFBUCxDQUFZLFVBQVosQ0FBVCxDQUZQLENBQUE7QUFBQSxVQUdBLElBQUEsR0FBTyxRQUFBLENBQVMsTUFBTSxDQUFDLElBQVAsQ0FBWSxVQUFaLENBQVQsQ0FIUCxDQUFBO0FBSUEsVUFBQSxJQUFZLENBQUEsSUFBWjtBQUFBLFlBQUEsSUFBQSxHQUFPLENBQVAsQ0FBQTtXQUpBO0FBQUEsVUFNQSxNQUFBLEdBQVMsUUFBQSxDQUFTLE1BQU0sQ0FBQyxJQUFQLENBQVksWUFBWixDQUFULENBTlQsQ0FBQTtBQU9BLFVBQUEsSUFBYyxDQUFBLE1BQWQ7QUFBQSxZQUFBLE1BQUEsR0FBUyxDQUFULENBQUE7V0FQQTtBQUFBLFVBU0EsSUFBQSxHQUFPLFFBQUEsQ0FBUyxNQUFNLENBQUMsR0FBUCxDQUFBLENBQVQsQ0FUUCxDQUFBO0FBVUEsVUFBQSxJQUF3QixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQixhQUFqQixDQUF4QjtBQUFBLFlBQUEsSUFBQSxHQUFPLElBQUEsR0FBTyxNQUFkLENBQUE7V0FWQTtBQVdBLFVBQUEsSUFBd0IsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsYUFBakIsQ0FBeEI7QUFBQSxZQUFBLElBQUEsR0FBTyxJQUFBLEdBQU8sTUFBZCxDQUFBO1dBWEE7QUFZQSxVQUFBLElBQWUsSUFBQSxJQUFRLElBQXZCO0FBQUEsWUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO1dBWkE7QUFhQSxVQUFBLElBQWUsSUFBQSxJQUFRLElBQXZCO0FBQUEsWUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO1dBYkE7QUFBQSxVQWVBLE1BQU0sQ0FBQyxHQUFQLENBQVcsSUFBWCxDQWZBLENBQUE7aUJBaUJBLE1BbkJpRDtRQUFBLENBQWxELENBNUJBLENBQUE7QUFBQSxRQWlEQSxJQUFJLENBQUMsSUFBTCxDQUFVLGVBQVYsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxNQUFoQyxFQUF3QyxTQUFBLEdBQUE7QUFFdkMsY0FBQSx3QkFBQTtBQUFBLFVBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxJQUFGLENBQVQsQ0FBQTtBQUFBLFVBRUEsSUFBQSxHQUFPLFFBQUEsQ0FBUyxNQUFNLENBQUMsSUFBUCxDQUFZLFVBQVosQ0FBVCxDQUZQLENBQUE7QUFBQSxVQUdBLElBQUEsR0FBTyxRQUFBLENBQVMsTUFBTSxDQUFDLElBQVAsQ0FBWSxVQUFaLENBQVQsQ0FIUCxDQUFBO0FBSUEsVUFBQSxJQUFZLENBQUEsSUFBWjtBQUFBLFlBQUEsSUFBQSxHQUFPLENBQVAsQ0FBQTtXQUpBO0FBQUEsVUFNQSxJQUFBLEdBQU8sUUFBQSxDQUFTLE1BQU0sQ0FBQyxHQUFQLENBQUEsQ0FBVCxDQU5QLENBQUE7QUFPQSxVQUFBLElBQWUsSUFBQSxJQUFRLElBQXZCO0FBQUEsWUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO1dBUEE7QUFRQSxVQUFBLElBQWUsSUFBQSxJQUFRLElBQXZCO0FBQUEsWUFBQSxJQUFBLEdBQU8sSUFBUCxDQUFBO1dBUkE7QUFBQSxVQVVBLE1BQU0sQ0FBQyxHQUFQLENBQVcsSUFBWCxDQVZBLENBQUE7aUJBWUEsS0FkdUM7UUFBQSxDQUF4QyxDQWpEQSxDQUFBO2VBbUVBLElBQUksQ0FBQyxNQUFMLENBQVksU0FBQSxHQUFBO0FBRVgsY0FBQSxtQkFBQTtBQUFBLFVBQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLFVBQ0EsSUFBQSxHQUFPLENBQUEsQ0FBRSxJQUFGLENBRFAsQ0FBQTtBQUFBLFVBR0EsSUFBSSxDQUFDLElBQUwsQ0FBVSx1QkFBVixDQUFrQyxDQUFDLElBQW5DLENBQXdDLFNBQUEsR0FBQTttQkFDdkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFmLENBQXlCLENBQUEsQ0FBRSxJQUFGLENBQXpCLEVBQWlDLElBQWpDLEVBRHVDO1VBQUEsQ0FBeEMsQ0FIQSxDQUFBO0FBQUEsVUFNQSxRQUFBLEdBQVcsSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWLENBQW1CLENBQUMsRUFBcEIsQ0FBdUIsQ0FBdkIsQ0FOWCxDQUFBO0FBT0EsVUFBQSxJQUFHLFFBQVEsQ0FBQyxNQUFaO0FBQ0MsWUFBQSxJQUFBLEdBQU8sS0FBUCxDQUFBO0FBQUEsWUFDQSxHQUFBLEdBQU0sUUFBUSxDQUFDLE1BQVQsQ0FBQSxDQUFpQixDQUFDLEdBQWxCLEdBQXdCLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsTUFBakIsQ0FBQSxDQUF4QixHQUFvRCxFQUQxRCxDQUFBO0FBQUEsWUFHQSxDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsT0FBZixDQUNDO0FBQUEsY0FBQSxTQUFBLEVBQVcsR0FBWDthQURELENBSEEsQ0FBQTtBQUFBLFlBTUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtxQkFDVixRQUFRLENBQUMsSUFBVCxDQUFjLE9BQWQsQ0FBc0IsQ0FBQyxFQUF2QixDQUEwQixDQUExQixDQUE0QixDQUFDLEtBQTdCLENBQUEsRUFEVTtZQUFBLENBQVgsRUFFQyxHQUZELENBTkEsQ0FERDtXQVBBO0FBa0JBLFVBQUEsSUFBRyxJQUFBLEtBQVEsSUFBWDtBQUNDLFlBQUEsSUFBRyxRQUFIO0FBQ0MsY0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsY0FDQSxJQUFBLEdBQU8sS0FEUCxDQUREO2FBREQ7V0FsQkE7QUF1QkEsaUJBQU8sSUFBUCxDQXpCVztRQUFBLENBQVosRUFyRVU7TUFBQSxDQUFYLEVBRks7SUFBQSxDQUFOO0FBQUEsSUFtR0EsU0FBQSxFQUFXLFNBQUMsS0FBRCxFQUFPLGFBQVAsR0FBQTtBQUVWLFVBQUEsdUJBQUE7O1FBRmlCLGdCQUFjO09BRS9CO0FBQUEsTUFBQSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZCxDQUFULENBQUE7QUFBQSxNQUVBLFFBQUEsR0FBVztBQUFBLFFBQ1YsT0FBQSxFQUFTLHlCQURDO0FBQUEsUUFFVixhQUFBLEVBQWUsdUJBRkw7QUFBQSxRQUdWLFlBQUEsRUFBYyx1QkFISjtBQUFBLFFBSVYsZUFBQSxFQUFpQixnQ0FKUDtBQUFBLFFBS1YsY0FBQSxFQUFnQixnQkFMTjtBQUFBLFFBTVYsb0JBQUEsRUFBc0IsNENBTlo7QUFBQSxRQU9WLGFBQUEsRUFBZSw2Q0FQTDtBQUFBLFFBUVYsbUJBQUEsRUFBcUIseUNBUlg7QUFBQSxRQVNWLFlBQUEsRUFBYyxjQVRKO0FBQUEsUUFVVixPQUFBLEVBQVMsb0NBVkM7T0FGWCxDQUFBO0FBZ0JBLE1BQUEsSUFBRyxDQUFBLEtBQU0sQ0FBQyxRQUFOLENBQWUsVUFBZixDQUFELElBQStCLEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBWCxDQUFBLEtBQW9CLFFBQW5ELElBQStELEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBWCxDQUFBLEtBQW9CLFFBQW5GLElBQStGLEtBQUssQ0FBQyxJQUFOLENBQVcsTUFBWCxDQUFsRztBQUVDLFFBQUEsS0FBQSxHQUFRLEtBQVIsQ0FBQTtBQUVBLFFBQUEsSUFBRyxDQUFBLEtBQU0sQ0FBQyxHQUFOLENBQUEsQ0FBSjtBQUdDLFVBQUEsSUFBRyxhQUFBLEtBQWlCLElBQXBCO0FBQ0MsWUFBQSxJQUFHLEtBQUssQ0FBQyxFQUFOLENBQVMsUUFBVCxDQUFIO3FCQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBc0MsUUFBUSxDQUFDLFdBQS9DLEVBREQ7YUFBQSxNQUFBO3FCQUdDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBc0MsUUFBUSxDQUFDLEtBQS9DLEVBSEQ7YUFERDtXQUhEO1NBQUEsTUFBQTtBQVdDLFVBQUEsSUFBRyxLQUFLLENBQUMsRUFBTixDQUFTLGdCQUFULENBQUg7QUFDQyxZQUFBLElBQUcsQ0FBQSxHQUFLLENBQUMsVUFBVSxDQUFDLEtBQWYsQ0FBc0IsS0FBdEIsRUFBNkIsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUE3QixDQUFMO0FBQ0MsY0FBQSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFmLENBQWdDLEtBQWhDLEVBQXNDLFFBQVEsQ0FBQyxZQUEvQyxDQUFBLENBQUE7QUFBQSxjQUNBLEtBQUEsR0FBUSxJQURSLENBREQ7YUFERDtXQUFBO0FBT0EsVUFBQSxJQUFHLEtBQUssQ0FBQyxFQUFOLENBQVMsbUJBQVQsQ0FBSDtBQUNDLFlBQUEsSUFBRyxLQUFLLENBQUMsR0FBTixDQUFBLENBQVcsQ0FBQyxNQUFaLEdBQXFCLENBQXhCO0FBQ0MsY0FBQSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFmLENBQWdDLEtBQWhDLEVBQXNDLFFBQVEsQ0FBQyxXQUEvQyxDQUFBLENBQUE7QUFBQSxjQUNBLEtBQUEsR0FBUSxJQURSLENBREQ7YUFERDtXQVBBO0FBY0EsVUFBQSxJQUFHLEtBQUssQ0FBQyxFQUFOLENBQVMsZUFBVCxDQUFIO0FBQ0MsWUFBQSxJQUFHLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBQSxLQUFlLENBQUEsQ0FBRSxTQUFBLEdBQVUsS0FBSyxDQUFDLElBQU4sQ0FBVyxhQUFYLENBQVYsR0FBb0MsSUFBdEMsQ0FBMkMsQ0FBQyxHQUE1QyxDQUFBLENBQWxCO0FBQ0MsY0FBQSxJQUFHLEtBQUssQ0FBQyxFQUFOLENBQVMsbUJBQVQsQ0FBSDtBQUNDLGdCQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBc0MsUUFBUSxDQUFDLGlCQUEvQyxDQUFBLENBQUE7QUFBQSxnQkFDQSxLQUFBLEdBQVEsSUFEUixDQUREO2VBQUE7QUFHQSxjQUFBLElBQUcsS0FBSyxDQUFDLEVBQU4sQ0FBUyxnQkFBVCxDQUFIO0FBQ0MsZ0JBQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZixDQUFnQyxLQUFoQyxFQUFzQyxRQUFRLENBQUMsa0JBQS9DLENBQUEsQ0FBQTtBQUFBLGdCQUNBLEtBQUEsR0FBUSxJQURSLENBREQ7ZUFKRDthQUREO1dBZEE7QUF5QkEsVUFBQSxJQUFJLEtBQUssQ0FBQyxFQUFOLENBQVMsbUJBQVQsQ0FBQSxJQUFpQyxLQUFLLENBQUMsRUFBTixDQUFTLGdCQUFULENBQXJDO0FBQ0MsWUFBQSxJQUFHLE1BQU0sQ0FBQyxNQUFQLElBQWlCLENBQUEsTUFBTyxDQUFDLElBQVAsQ0FBWSxjQUFBLEdBQWUsS0FBSyxDQUFDLElBQU4sQ0FBVyxNQUFYLENBQWYsR0FBa0MsWUFBOUMsQ0FBMkQsQ0FBQyxNQUFqRjtBQUNDLGNBQUEsSUFBaUUsS0FBSyxDQUFDLEVBQU4sQ0FBUyxtQkFBVCxDQUFqRTtBQUFBLGdCQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBc0MsUUFBUSxDQUFDLGFBQS9DLENBQUEsQ0FBQTtlQUFBO0FBQ0EsY0FBQSxJQUFpRSxLQUFLLENBQUMsRUFBTixDQUFTLGdCQUFULENBQWpFO0FBQUEsZ0JBQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZixDQUFnQyxLQUFoQyxFQUFzQyxRQUFRLENBQUMsVUFBL0MsQ0FBQSxDQUFBO2VBREE7QUFBQSxjQUVBLEtBQUEsR0FBUSxJQUZSLENBQUE7QUFBQSxjQUdBLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixDQUFxQixDQUFDLFdBQXRCLENBQWtDLE9BQWxDLENBSEEsQ0FERDthQUREO1dBekJBO0FBa0NBLFVBQUEsSUFBRyxLQUFLLENBQUMsRUFBTixDQUFTLE1BQVQsQ0FBSDtBQUNDLFlBQUEsS0FBSyxDQUFDLEdBQU4sQ0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQU4sQ0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFOLENBQW9CLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBcEIsQ0FBaEIsRUFBaUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFOLENBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBTixDQUFvQixLQUFLLENBQUMsR0FBTixDQUFBLENBQXBCLENBQWhCLENBQWpELENBQVgsQ0FBQSxDQUFBO0FBQ0EsWUFBQSxJQUFHLENBQUEsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxPQUFOLENBQWMsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUFkLENBQUo7QUFDQyxjQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBZ0MsS0FBaEMsRUFBc0MsUUFBUSxDQUFDLFVBQS9DLENBQUEsQ0FBQTtBQUFBLGNBQ0EsS0FBQSxHQUFRLElBRFIsQ0FERDthQUZEO1dBbENBO0FBeUNBLFVBQUEsSUFBRyxLQUFBLEtBQVMsS0FBWjttQkFDQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFmLENBQWdDLEtBQWhDLEVBQXNDLEtBQXRDLEVBREQ7V0FwREQ7U0FKRDtPQWxCVTtJQUFBLENBbkdYO0FBQUEsSUFrTEEsZ0JBQUEsRUFBa0IsU0FBQyxLQUFELEVBQU8sT0FBUCxHQUFBO0FBQ2pCLFVBQUEsTUFBQTtBQUFBLE1BQUEsSUFBRyxPQUFIO0FBQ0MsUUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLE9BQWYsQ0FBQSxDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZCxDQURULENBQUE7QUFBQSxRQUVBLE1BQU0sQ0FBQyxRQUFQLENBQWdCLE9BQWhCLENBRkEsQ0FBQTtlQUdBLE1BQU0sQ0FBQyxJQUFQLENBQVksZ0JBQVosQ0FBNkIsQ0FBQyxJQUE5QixDQUFtQyxPQUFuQyxDQUEyQyxDQUFDLFFBQTVDLENBQXFELElBQXJELEVBSkQ7T0FBQSxNQUFBO0FBTUMsUUFBQSxLQUFLLENBQUMsV0FBTixDQUFrQixPQUFsQixDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxLQUFLLENBQUMsT0FBTixDQUFjLGdCQUFkLENBRFQsQ0FBQTtBQUFBLFFBRUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsT0FBbkIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxNQUFNLENBQUMsSUFBUCxDQUFZLGdCQUFaLENBQTZCLENBQUMsUUFBOUIsQ0FBdUMsS0FBdkMsQ0FIQSxDQUFBO2VBSUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtpQkFDVixNQUFNLENBQUMsSUFBUCxDQUFZLGdCQUFaLENBQTZCLENBQUMsV0FBOUIsQ0FBMEMsUUFBMUMsQ0FBbUQsQ0FBQyxJQUFwRCxDQUF5RCxFQUF6RCxFQURVO1FBQUEsQ0FBWCxFQUVDLEdBRkQsRUFWRDtPQURpQjtJQUFBLENBbExsQjtBQUFBLElBbU1BLEtBQUEsRUFBTyxTQUFDLFFBQUQsRUFBVSxLQUFWLEdBQUE7QUFDTixNQUFBLElBQUcsMkpBQTJKLENBQUMsSUFBNUosQ0FBaUssS0FBakssQ0FBSDtBQUNDLGVBQU8sSUFBUCxDQUREO09BQUEsTUFBQTtBQUdDLGVBQU8sS0FBUCxDQUhEO09BRE07SUFBQSxDQW5NUDtHQTdsQkQsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuJChkb2N1bWVudCkucmVhZHkgLT5cblx0YXBwLmluaXQoKVxuXG5hcHAgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIEJyb3dzZXJzXG5cdFx0YXBwLmJyb3dzZXJzKClcblxuXHRcdCMgTWVuw7pcblx0XHRhcHAuc2VjcmV0TWVudS5pbml0KClcblxuXHRcdCMgU2hhcmVzXG5cdFx0YXBwLnNoYXJlcy5pbml0KClcblxuXHRcdCMgVG9vbHRpcHNcblx0XHRhcHAudG9vbHRpcHMoKVxuXG5cdFx0IyBBbGVydGFzXG5cdFx0YXBwLmFsZXJ0LmluaXQoKVxuXG5cdFx0IyBWYWxpZGFjacOzbiBkZSBmb3JtdWxhcmlvc1xuXHRcdGFwcC52YWxpZGF0aW9uLmZvcm0gJChcIi5jb250cm9sc1wiKVxuXG5cdFx0IyBMb2FkaW5nXG5cdFx0YXBwLmxvYWRpbmcuaW5pdCgpXG5cblx0XHQjIE1hcGFcblx0XHQjIGFwcC5nbWFwKClcblxuXHRcdCMgRXZlbnRvcyBlbiBzY3JvbGxcblx0XHQjIGFwcC5zY3JvbGwoKVxuXG5cdFx0IyBQbHVnaW5zXG5cdFx0IyBhcHAucGx1Z2lucy5pbml0KClcblxuIz1pbmNsdWRlX3RyZWUgYXBwXG5cblxuYXBwLmFsZXJ0ID1cblxuXHRpbml0OiAtPlxuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHQsMTAwMFxuXHRcdCQod2luZG93KS5yZXNpemUgLT5cblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cblx0b3BlbjogKG9wdGlvbnMpIC0+XG5cblx0XHR0aXRsZSA9IFwiXCJcblx0XHRjb250ZW50ID0gXCJcIlxuXHRcdGJ1dHRvbnMgPSBcIlwiXG5cdFx0Y2xvc2UgPSBcIlwiXG5cblx0XHRpZiBvcHRpb25zLnRpdGxlXG5cdFx0XHR0aXRsZSA9IFwiPGgyIGNsYXNzPSdhbGVydC10aXRsZSc+XCIgKyBvcHRpb25zLnRpdGxlICsgXCI8L2gyPlwiXG5cblx0XHRpZiBvcHRpb25zLmNvbnRlbnRcblx0XHRcdGNvbnRlbnQgPSBcIjxkaXYgY2xhc3M9J2FsZXJ0LWNvbnRlbnQnPlwiICsgb3B0aW9ucy5jb250ZW50ICsgXCI8L2Rpdj5cIlxuXG5cdFx0aWYgb3B0aW9ucy5zdGF0aWMgPT0gdHJ1ZVxuXHRcdFx0YWxlcnRsaWdodGNsYXNzICAgID0gJydcblx0XHRcdG9wdGlvbnMuY2xvc2UgPSBmYWxzZVxuXHRcdGVsc2Vcblx0XHRcdGFsZXJ0bGlnaHRjbGFzcyA9ICcgZmFsc2UnXG5cblx0XHRpZiBvcHRpb25zLmFsZXJ0Y2xhc3Ncblx0XHRcdGFsZXJ0Y2xhc3MgPSBcImFsZXJ0LVwiICsgb3B0aW9ucy5hbGVydGNsYXNzXG5cdFx0ZWxzZVxuXHRcdFx0YWxlcnRjbGFzcyA9IFwiYWxlcnQtZGVmYXVsdFwiXG5cblx0XHRvcHRpb25zLmNsb3NlID0gdHJ1ZSBpZiBvcHRpb25zLmNsb3NlID09IHVuZGVmaW5lZFxuXG5cdFx0aWYgb3B0aW9ucy5jbG9zZSA9PSB0cnVlXG5cdFx0XHRjbG9zZSA9ICc8YnV0dG9uIGNsYXNzPVwiY2xvc2UgZmFsc2VcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYnV0dG9uPidcblxuXHRcdGlmIG9wdGlvbnMuYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyArPSBvcHRpb25zLmJ1dHRvbnMgKyBcIiBcIlxuXG5cdFx0aWYgb3B0aW9ucy5jYW5jZWwgPT0gdHJ1ZVxuXHRcdFx0YnV0dG9ucyArPSAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBmYWxzZVwiPkNhbmNlbGFyPC9idXR0b24+ICdcblxuXHRcdGlmIG9wdGlvbnMuYWNjZXB0ID09IHRydWVcblx0XHRcdGJ1dHRvbnMgKz0gJzxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgdHJ1ZVwiPkFjZXB0YXI8L2J1dHRvbj4gJ1xuXG5cdFx0aWYgYnV0dG9uc1xuXHRcdFx0YnV0dG9ucyA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQtYnV0dG9uc1wiPicrYnV0dG9ucysnPC9kaXY+J1xuXG5cblx0XHRodG1sID1cblx0XHRcdCc8ZGl2IGNsYXNzPVwiYWxlcnQgJythbGVydGNsYXNzKycgaW5cIj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWxpZ2h0ICcrYWxlcnRsaWdodGNsYXNzKydcIj48L2Rpdj4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImFsZXJ0LWJveCBlcXVpZGlzdFwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJhbGVydC1pbm5lclwiPicrXG5cdFx0XHRcdFx0XHRjbG9zZSArXG5cdFx0XHRcdFx0XHR0aXRsZSArXG5cdFx0XHRcdFx0XHRjb250ZW50ICtcblx0XHRcdFx0XHRcdGJ1dHRvbnMgK1xuXHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nXG5cblxuXHRcdCQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cblxuXHRcdCQoXCIuYWxlcnQgLnRydWUsIC5hbGVydCAuZmFsc2VcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+IFxuXG5cdFx0XHRhbGVydG9yaWdpbiA9ICQodGhpcykuY2xvc2VzdChcIi5hbGVydFwiKVxuXG5cdFx0XHRhbGVydG9yaWdpbi5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRhbGVydG9yaWdpbi5yZW1vdmUoKVxuXHRcdFx0XHQjYWxlcnRvcmlnaW4ucmVtb3ZlQ2xhc3MoXCJpbiBvdXRcIilcblx0XHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1pblwiKVxuXHRcdFx0LDIwMFxuXG5cdFx0XHRpZiAkKHRoaXMpLmhhc0NsYXNzKFwidHJ1ZVwiKSAmJiBvcHRpb25zLmNhbGxiYWNrX3RydWVcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja190cnVlKClcblxuXHRcdFx0aWYgJCh0aGlzKS5oYXNDbGFzcyhcImZhbHNlXCIpICYmIG9wdGlvbnMuY2FsbGJhY2tfZmFsc2Vcblx0XHRcdFx0b3B0aW9ucy5jYWxsYmFja19mYWxzZSgpXG5cblx0XHRcdHJldHVybiB0cnVlXG5cblx0Y2xvc2VhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblxuXHRyZW1vdmVhbGw6IC0+XG5cdFx0JChcIi5hbGVydFwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdCQoXCIuYWxlcnRcIikucmVtb3ZlKClcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5cIilcblx0XHQsMjAwXG5cblx0ZXF1aWRpc3Q6IC0+XG5cdFx0JChcIi5lcXVpZGlzdFwiKS5lYWNoIC0+XG5cdFx0XHRfdGhpcyA9ICQodGhpcylcblx0XHRcdF9sZWZ0ID0gKF90aGlzLnBhcmVudCgpLndpZHRoKCkgLSBfdGhpcy53aWR0aCgpKSAvIDJcblx0XHRcdF9sZWZ0ID0gMCBpZiBfbGVmdCA8IDBcblx0XHRcdF90b3AgPSAoX3RoaXMucGFyZW50KCkuaGVpZ2h0KCkgLSBfdGhpcy5oZWlnaHQoKSkgLyAyXG5cdFx0XHRfdG9wID0gMCBpZiBfdG9wIDwgMFxuXHRcdFx0X3RoaXMuY3NzXG5cdFx0XHQgIGxlZnQ6IF9sZWZ0ICsgXCJweFwiXG5cdFx0XHQgIHRvcDogX3RvcCArIFwicHhcIlxuXG5cdGxvYWQ6IChocmVmLGNzc2NsYXNzPVwiZGVmYXVsdFwiLGNhbGxiYWNrPWZhbHNlKSAtPlxuXHRcdCQuYWpheChcblx0XHRcdHVybDogaHJlZlxuXHRcdFx0dHlwZTogJ0dFVCdcblx0XHQpLmRvbmUgKHJlc3VsdCkgLT5cblx0XHRcdGFwcC5hbGVydC5vcGVuXG5cdFx0XHRcdGNvbnRlbnQ6IHJlc3VsdFxuXHRcdFx0XHRhbGVydGNsYXNzOiBjc3NjbGFzc1xuXHRcdFx0aWYgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXG5cblxuXG5hcHAuaXNNb2JpbGUgPSAtPlxuXHRpZiAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHR0cnVlXG5cdGVsc2Vcblx0XHRmYWxzZVxuXG5hcHAuYnJvd3NlcnMgPSAtPlxuXG5cdCMgTW9iaWxlXG5cdGlmIGFwcC5pc01vYmlsZSgpXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1tb2JpbGVcIilcblxuXHQjIElFXG5cdGlmICQuYnJvd3Nlci5tc2llIHx8IG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ1RyaWRlbnQvJykhPS0xXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJpcy1pZVwiKVxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwiaXMtaWVcIiskLmJyb3dzZXIudmVyc2lvbilcblx0XHRpZiBwYXJzZUludCgkLmJyb3dzZXIudmVyc2lvbikgPD0gN1xuXHRcdFx0YXBwLmFsZXJ0Lm9wZW5cblx0XHRcdFx0dGl0bGU6IFwiRXN0w6FzIHVzYW5kbyB1biBuYXZlZ2Fkb3IgbXV5IGFudGlndW9cIlxuXHRcdFx0XHRjb250ZW50OiBcIkFjdHVhbGl6YSB0dSBuYXZlZ2Fkb3IgYWhvcmEgeSBkaXNmcnV0YSBkZSB1bmEgbWVqb3IgZXhwZXJpZW5jaWEgZW4gRmFsYWJlbGxhIE5vdmlvcy5cIlxuXHRcdFx0XHRidXR0b25zOiBcIjxhIGhyZWY9J2h0dHA6Ly9icm93c2VoYXBweS5jb20vP2xvY2FsZT1lcycgdGFyZ2V0PSdfYmxhbmsnIGNsYXNzPSdidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLWJpZyc+QWN0dWFsaXphciBhaG9yYTwvYT5cIlxuXHRcdFx0XHRzdGF0aWM6IHRydWVcblxuXG5cbmFwcC5jb29raWUgPSBcblxuXHRjcmVhdGU6IChuYW1lLCB2YWx1ZSwgZGF5cykgLT5cblx0XHRpZiBkYXlzXG5cdFx0XHRkYXRlID0gbmV3IERhdGUoKVxuXHRcdFx0ZGF0ZS5zZXRUaW1lIGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxuXHRcdFx0ZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpXG5cdFx0ZWxzZVxuXHRcdFx0ZXhwaXJlcyA9IFwiXCJcblx0XHRkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCJcblxuXHRyZWFkOiAobmFtZSkgLT5cblx0XHRuYW1lRVEgPSBuYW1lICsgXCI9XCJcblx0XHRjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIilcblx0XHRpID0gMFxuXG5cdFx0d2hpbGUgaSA8IGNhLmxlbmd0aFxuXHRcdFx0YyA9IGNhW2ldXG5cdFx0XHRjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpICB3aGlsZSBjLmNoYXJBdCgwKSBpcyBcIiBcIlxuXHRcdFx0cmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKSAgaWYgYy5pbmRleE9mKG5hbWVFUSkgaXMgMFxuXHRcdFx0aSsrXG5cdFx0bnVsbFxuXG5cdGRlbGV0ZTogKG5hbWUpIC0+XG5cdFx0YXBwLmNvb2tpZS5jcmVhdGUgbmFtZSwgXCJcIiwgLTFcblxuXG5cblxuYXBwLmZvcm1hdE51bWJlciA9IChuKSAtPlxuXHRuLnRvRml4ZWQoMCkucmVwbGFjZSAvLi9nLCAoYywgaSwgYSkgLT5cblx0XHQoaWYgaSBhbmQgYyBpc250IFwiLFwiIGFuZCBub3QgKChhLmxlbmd0aCAtIGkpICUgMykgdGhlbiBcIi5cIiArIGMgZWxzZSBjKVxuXG5cblxuXG5hcHAuZ21hcCA9IC0+XG5cblx0aWYgJChcIiNtYXBcIikubGVuZ3RoXG5cblx0XHRtYXJrZXJzID0gbmV3IEFycmF5KClcblx0XHRpbmZvd2luZG93ID0gZmFsc2VcblxuXHRcdG1hcF96b29tID0gcGFyc2VJbnQoJChcIiNtYXBcIikuYXR0cihcImRhdGEtem9vbVwiKSlcblxuXHRcdG1hcF9sYXQgPSAkKFwiI21hcFwiKS5hdHRyKFwiZGF0YS1sYXRcIilcblx0XHRtYXBfbG5nID0gJChcIiNtYXBcIikuYXR0cihcImRhdGEtbG5nXCIpXG5cblx0XHRibGFja2FuZHdoaXRlID0gW1xuXHRcdFx0ZmVhdHVyZVR5cGU6IFwiYWxsXCJcblx0XHRcdGVsZW1lbnRUeXBlOiBcImFsbFwiXG5cdFx0XHRzdHlsZXJzOiBbXG5cdFx0XHRcdHNhdHVyYXRpb246IC0xMDBcblx0XHRcdF1cblx0XHRdXG5cblx0XHRtYXBPcHRpb25zID1cblx0XHRcdHpvb206IG1hcF96b29tXG5cdFx0XHRjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFwX2xhdCxtYXBfbG5nKVxuXHRcdFx0bWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxuXHRcdFx0ZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxuXHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlXG5cdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcblx0XHRcdHN0eWxlczogYmxhY2thbmR3aGl0ZVxuXG5cblx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCBtYXBPcHRpb25zKVxuXG5cdFx0JChcIi5tYXAtem9vbS1pblwiKS5jbGljayAtPlxuXHRcdFx0bWFwLnNldFpvb20gbWFwLmdldFpvb20oKSArIDFcblx0XHRcdGZhbHNlXG5cblx0XHQkKFwiLm1hcC16b29tLW91dFwiKS5jbGljayAtPlxuXHRcdFx0bWFwLnNldFpvb20gbWFwLmdldFpvb20oKSAtIDFcblx0XHRcdGZhbHNlXG5cblxuXG5cdFx0IyBDYXJnYXIgY29vcmRlbmFkYXNcblxuXHRcdCQoXCIjbWFwLWNvb3JkcyAubWFwLWNvb3JkXCIpLmVhY2ggLT5cblxuXHRcdFx0bWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihcblx0XHRcdFx0cG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJCh0aGlzKS5hdHRyKFwiZGF0YS1sYXRcIiksICQodGhpcykuYXR0cihcImRhdGEtbG5nXCIpKVxuXHRcdFx0XHRhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QXG5cdFx0XHRcdGljb246IFwiaW1nL21hcmtlci5wbmdcIlxuXHRcdFx0XHRtYXA6IG1hcFxuXHRcdFx0KVxuXHRcdFxuXHRcdFx0Y29udGVudCA9XG5cdFx0XHRcdFwiPGRpdiBjbGFzcz0nbWFwLWluZm93aW5kb3cnPlwiK1xuXHRcdFx0XHRcdFwiPGgzPlwiKyQodGhpcykudGV4dCgpK1wiPC9oMz5cIitcblx0XHRcdFx0XHRcIjx1bD5cIitcblx0XHRcdFx0XHRcdCc8bGk+PGkgY2xhc3M9XCJmYSBmYS1ob21lXCI+PC9pPiAnKyQodGhpcykuYXR0cihcImRhdGEtYWRkcmVzc1wiKSsnPC9saT4nICtcblx0XHRcdFx0XHRcdCc8bGk+PGEgaHJlZj1cInRlbDonKyQodGhpcykuYXR0cihcImRhdGEtcGhvbmVcIikrJ1wiPjxpIGNsYXNzPVwiZmEgZmEtcGhvbmVcIj48L2k+ICcrJCh0aGlzKS5hdHRyKFwiZGF0YS1waG9uZVwiKSsnPC9hPjwvbGk+JyArXG5cdFx0XHRcdFx0XHQnPGxpPjxhIGhyZWY9XCJtYWlsdG86JyskKHRoaXMpLmF0dHIoXCJkYXRhLWVtYWlsXCIpKydcIj48aSBjbGFzcz1cImZhIGZhLWVudmVsb3BlXCI+PC9pPiAnKyQodGhpcykuYXR0cihcImRhdGEtZW1haWxcIikrJzwvYT48L2xpPicgK1xuXHRcdFx0XHRcdFwiPC91bD5cIitcblx0XHRcdFx0XCI8L2Rpdj5cIlxuXG5cblx0XHRcdG1hcmtlclsnY29udGVudCddID0gY29udGVudFxuXHRcdFx0bWFya2VyWyd2YWx1ZSddID0gJCh0aGlzKS52YWwoKVxuXG5cdFx0XHRpZiAhaW5mb3dpbmRvd1xuXHRcdFx0XHRpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coY29udGVudDpcInhcIilcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIgbWFwLCAnY2xpY2snLCAtPlxuXHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKClcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIgbWFya2VyLCBcImNsaWNrXCIsIC0+XG5cdFx0XHRcdGluZm93aW5kb3cuY2xvc2UoKVxuXHRcdFx0XHRpbmZvd2luZG93LnNldENvbnRlbnQgY29udGVudFxuXHRcdFx0XHRpbmZvd2luZG93Lm9wZW4gbWFwLCB0aGlzXG5cdFx0XHRcdCQoXCIjbWFwLWNvb3Jkc1wiKS52YWwobWFya2VyLnZhbHVlKVxuXHRcdFx0XHRtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKVxuXG5cdFx0XHRtYXJrZXJzLnB1c2gobWFya2VyKVxuXG5cblx0XHQkKFwiI21hcC1jb29yZHNcIikuY2hhbmdlIC0+XG5cdFx0XHRpbmRleCA9ICQoXCIjbWFwLWNvb3Jkc1wiKVswXS5zZWxlY3RlZEluZGV4IC0gMVxuXHRcdFx0aWYgaW5kZXggPj0gMFxuXHRcdFx0XHRpbmZvd2luZG93LmNsb3NlKClcblx0XHRcdFx0aW5mb3dpbmRvdy5zZXRDb250ZW50IG1hcmtlcnNbaW5kZXhdWydjb250ZW50J11cblx0XHRcdFx0aW5mb3dpbmRvdy5vcGVuIG1hcCwgbWFya2Vyc1tpbmRleF1cblx0XHRcdFx0bWFwLnNldENlbnRlcihtYXJrZXJzW2luZGV4XS5nZXRQb3NpdGlvbigpKVxuXG5cblxuXG5cbmFwcC5sb2FkaW5nID1cblxuXHRpbml0OiAtPlxuXHRcdGlmICQoXCIubG9hZGluZ0luXCIpLmxlbmd0aFxuXHRcdFx0YXBwLmxvYWRpbmcuaW4oKVxuXHRcdCMjI1xuXHRcdGFwcC5sb2FkaW5nLmluKClcblx0XHQkKFwiYm9keVwiKS5pbWFnZXNMb2FkZWQgLT5cblx0XHRcdGFwcC5sb2FkaW5nLm91dCgpXG5cdFx0IyMjXG5cblx0aW46IChlbGVtZW50KSAtPlxuXHRcdGVsZW1lbnQgPSAkKFwiYm9keVwiKSBpZiAhZWxlbWVudFxuXHRcdGVsZW1lbnQuYXBwZW5kICcnK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nXCI+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJsb2FkaW5nLWljb25cIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibG9hZGluZy1pY29uLWNpcmNsZVwiPjxkaXY+PC9kaXY+PC9kaXY+Jytcblx0XHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+J1xuXHRvdXQ6IC0+XG5cdFx0JChcIi5sb2FkaW5nXCIpLmFkZENsYXNzIFwib3V0XCJcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHQkKFwiLmxvYWRpbmdcIikucmVtb3ZlKClcblx0XHQsNTAwXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJsb2FkZWRcIilcblxuXG5cblxuYXBwLnBsdWdpbnMgPVxuXG5cdGluaXQ6IC0+XG5cblx0XHQjIyNcblx0XHQjICBBdXRvc2l6ZVxuXHRcdCQoXCJ0ZXh0YXJlYVwiKS5hdXRvc2l6ZVxuXHRcdFx0YXBwZW5kOiBcIlxcblwiXG5cblx0XHQjIElzb3RvcGVcblx0XHRpZiAkKFwiLmlzb3RvcGVcIikubGVuZ3RoXG5cdFx0XHRpc290b3BlID0gJChcIi5pc290b3BlXCIpLmlzb3RvcGUoKVxuXG5cdFx0IyBTbGlkZXJcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRpZiAkKFwiLnJveWFsU2xpZGVyXCIpLmxlbmd0aFxuXG5cdFx0XHRcdCQoXCIucm95YWxTbGlkZXJcIikucm95YWxTbGlkZXJcblx0XHRcdFx0XHRpbWFnZVNjYWxlTW9kZTogJ2ZpdCdcblx0XHRcdFx0XHRzbGlkZXJEcmFnOiBmYWxzZVxuXHRcdFx0XHRcdGFycm93c05hdkF1dG9IaWRlOiBmYWxzZVxuXHRcdFx0XHRcdGxvb3A6IHRydWVcblx0XHRcdFx0XHQjbG9vcFJld2luZDogdHJ1ZVxuXHRcdFx0XHRcdHNsaWRlc1NwYWNpbmc6IDBcblx0XHRcdFx0XHR0cmFuc2l0aW9uU3BlZWQ6IDYwMFxuXHRcdFx0XHRcdGF1dG9QbGF5OlxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdFx0cGF1c2VPbkhvdmVyOiB0cnVlXG5cdFx0XHRcdFx0XHRkZWxheTogNDAwMFxuXHRcdFx0XHRcdGltYWdlU2NhbGVQYWRkaW5nOiAwXG5cdFx0XHRcdFx0YWRkQWN0aXZlQ2xhc3M6IHRydWVcblx0XHRcdFx0XHRuYXZpZ2F0ZUJ5Q2xpY2s6IGZhbHNlXG5cdFx0XHRcdFx0YXV0b0hlaWdodDogdHJ1ZVxuXHRcdCw1MFxuXG5cdFx0JCh3aW5kb3cpLm9uIFwibG9hZFwiLCAtPlxuXHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXG5cdFx0cl90aW1lID0gZmFsc2Vcblx0XHQkKHdpbmRvdykucmVzaXplIC0+XG5cdFx0XHRhcHAucGx1Z2lucy5yZWxheW91dCgpXG5cdFx0XHRyID0gdHJ1ZVxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJfdGltZSlcblx0XHRcdHJfdGltZSA9IHNldFRpbWVvdXQgLT5cblx0XHRcdFx0YXBwLnBsdWdpbnMucmVsYXlvdXQoKVxuXHRcdFx0XHRyID0gZmFsc2Vcblx0XHRcdCw2MDBcblx0XHQjIyNcblxuXG5cblx0cmVsYXlvdXQ6IC0+XG5cblx0XHQjIyNcblx0XHRhcHAuYWxlcnQuZXF1aWRpc3QoKVxuXHRcdGlmICQoXCIuaXNvdG9wZVwiKS5sZW5ndGhcblx0XHRcdCQoXCIuaXNvdG9wZVwiKS5pc290b3BlXG5cdFx0XHRcdHJlbGF5b3V0OiB0cnVlXG5cdFxuXHRcdCQoXCJib2R5XCIpLmltYWdlc0xvYWRlZCAtPlxuXHRcdFx0YXBwLmFsZXJ0LmVxdWlkaXN0KClcblx0XHRcdGFwcC5hbGVydC5lcXVpZGlzdCgpXG5cdFx0XHRpZiAkKFwiLmlzb3RvcGVcIikubGVuZ3RoXG5cdFx0XHRcdCQoXCIuaXNvdG9wZVwiKS5pc290b3BlXG5cdFx0XHRcdFx0cmVsYXlvdXQ6IHRydWVcblx0XHQjIyNcblxuXG5cblxuYXBwLnNjcm9sbCA9IC0+XG5cblx0aWYgIWFwcC5pc01vYmlsZSgpICYmICEkLmJyb3dzZXIubXNpZVxuXHRcdHNjcm9sbF9wcmV2ID0gMFxuXHRcdCQod2luZG93KS5zY3JvbGwgLT5cblxuXHRcdFx0IyBFc2NvbmRlciBoZWFkZXJcblxuXHRcdFx0c2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXG5cdFx0XHRoZWlnaHRfd2luZG93ID0gJCh3aW5kb3cpLmhlaWdodCgpXG5cdFx0XHRoZWlnaHRfYm9keSA9ICQoXCJib2R5XCIpLmhlaWdodCgpXG5cdFx0XHRpZiBzY3JvbGwgPiA1MCAmJiBzY3JvbGwgKyBoZWlnaHRfd2luZG93IDwgaGVpZ2h0X2JvZHkgLSA1MFxuXHRcdFx0XHRpZiBzY3JvbGwtc2Nyb2xsX3ByZXYgPiAwXG5cdFx0XHRcdFx0JChcIi5oZWFkZXItdG9wLWVsZW1lbnRzXCIpLmFkZENsYXNzIFwiaGlkZVwiXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQkKFwiLmhlYWRlci10b3AtZWxlbWVudHNcIikucmVtb3ZlQ2xhc3MgXCJoaWRlXCJcblx0XHRcdFx0XHRzY3JvbGxfaW5pdCA9IDBcblx0XHRcdGVsc2Vcblx0XHRcdFx0JChcIi5oZWFkZXItdG9wLWVsZW1lbnRzXCIpLnJlbW92ZUNsYXNzIFwiaGlkZVwiXG5cdFx0XHRzY3JvbGxfcHJldiA9IHNjcm9sbFxuXG5cblx0XHRcdCMgTW9zdHJhciBlbiBzY3JvbGxcblxuXHRcdFx0aWYgJChcIi5kaXNwbGF5c2Nyb2xsXCIpLmxlbmd0aFxuXHRcdFx0XHQkKFwiLmRpc3BsYXlzY3JvbGxcIikuZWFjaCAtPlxuXHRcdFx0XHRcdGVsZW1lbnQgPSAkKHRoaXMpXG5cdFx0XHRcdFx0ZWxlbWVudF90b3AgPSBlbGVtZW50Lm9mZnNldCgpLnRvcFxuXHRcdFx0XHRcdGVsZW1lbnRfaGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQoKVxuXHRcdFx0XHRcdGlmIHNjcm9sbCArIGhlaWdodF93aW5kb3cgPiBlbGVtZW50X2hlaWdodCArIGVsZW1lbnRfdG9wXG5cdFx0XHRcdFx0XHRlbGVtZW50LmFkZENsYXNzIFwiaW5cIlxuXG5cblxuXG5hcHAuc2VjcmV0TWVudSA9XG5cblx0aW5pdDogLT5cblxuXHRcdCMgQ29tcGFyZSBVUkwgaW4gbWVudVxuXHRcdHVybCA9IGRvY3VtZW50LlVSTFxuXHRcdHVybF9zcGxpdCA9IHVybC5zcGxpdChcIi9cIilcblx0XHRuYW1lX3BhZ2UgPSB1cmxfc3BsaXRbdXJsX3NwbGl0Lmxlbmd0aC0xXVxuXHRcdG5hbWVfcGFnZV9zcGxpdCA9IG5hbWVfcGFnZS5zcGxpdChcIj9cIikgXG5cdFx0bmFtZV9wYWdlX2NsZWFyID0gbmFtZV9wYWdlX3NwbGl0WzBdXG5cdFx0bGkgPSAkKFwiLnNlY3JldG1lbnUtY29udGVudCBhW2hyZWY9J1wiK25hbWVfcGFnZV9jbGVhcitcIiddXCIpLnBhcmVudChcImxpXCIpXG5cdFx0bGkuYWRkQ2xhc3MgXCJjdXJyZW50LWl0ZW1cIlxuXHRcdGxpLnBhcmVudCgpLnBhcmVudChcImxpXCIpLmFkZENsYXNzIFwiY3VycmVudC1pdGVtXCJcblxuXHRcdCMgRGVza3RvcFxuXHRcdCQoXCIuc2VjcmV0bWVudS1jb250ZW50IHVsIGxpIGFcIikuZWFjaCAtPlxuXHRcdFx0aWYgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikubGVuZ3RoXG5cdFx0XHRcdGlmICEkKHRoaXMpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIilcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKFwic2VjcmV0bWVudS1wYXJlbnRcIikucHJlcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPicpXG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikucHJlcGVuZCAnPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzZWNyZXRtZW51LWJhY2tcIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4gQXRyw6FzPC9hPjwvbGk+J1xuXG5cdFx0aWYgJChcIi5zZWNyZXRtZW51LWNvbnRlbnQgdWwgbGkuY3VycmVudC1pdGVtIGEuc2VjcmV0bWVudS1wYXJlbnRcIikubGVuZ3RoXG5cdFx0XHRhcHAuc2VjcmV0TWVudS5vcGVuTHZsRGVza3RvcCAkKFwiLnNlY3JldG1lbnUtY29udGVudCB1bCBsaS5jdXJyZW50LWl0ZW0gYS5zZWNyZXRtZW51LXBhcmVudFwiKVxuXG5cdFx0IyBNb2JpbGVcblxuXHRcdCQoXCIuc2VjcmV0bWVudS1idXR0b25cIikuY2xpY2sgLT5cblx0XHRcdGlmICEkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtaW5cIilcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUub3BlbiAkKFwiLnNlY3JldG1lbnUtY29udGVudFwiKS5odG1sKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0YXBwLnNlY3JldE1lbnUuY2xvc2UoKVxuXHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItZnJvbnRcIikuY2xpY2sgLT5cblx0XHRcdGlmICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2VjcmV0bWVudS1pblwiKVxuXHRcdFx0XHRhcHAuc2VjcmV0TWVudS5jbG9zZSgpXG5cdFx0dHJ1ZVxuXG5cdG9wZW5MdmxEZXNrdG9wOiAoZWxlbWVudCkgLT5cblx0XHR1bCA9IGVsZW1lbnQucGFyZW50KCkuZmluZChcInVsXCIpXG5cdFx0dWwuYWRkQ2xhc3MoXCJpblwiKVxuXHRcdHVsLmZpbmQoXCJhLnNlY3JldG1lbnUtYmFja1wiKS51bmJpbmQoXCJjbGlja1wiKS5iaW5kIFwiY2xpY2tcIiwgLT5cblx0XHRcdHVsLmFkZENsYXNzKFwib3V0XCIpXG5cdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdHVsLnJlbW92ZUNsYXNzKFwiaW4gb3V0XCIpXG5cdFx0XHQsNzAwXG5cdFx0XHRmYWxzZVxuXG5cblx0b3BlbjogKGh0bWwsY2hpbGRyZW49ZmFsc2UsZGlyZWN0aW9uPVwibGVmdFwiKSAtPlxuXG5cdFx0bGVuZ3RoICAgID0gJChcIi5zZWNyZXRtZW51XCIpLmxlbmd0aCArIDFcblx0XHRjb250YWluZXIgPSAnPGRpdiBjbGFzcz1cInNlY3JldG1lbnUgc2VjcmV0bWVudS1sdmwtJysoJChcIi5zZWNyZXRtZW51XCIpLmxlbmd0aCArIDEpKydcIj48L2Rpdj4nXG5cblx0XHRpZiAhY2hpbGRyZW5cblx0XHRcdCQoXCIuc2VjcmV0bWVudS1jb250YWluZXItYmFja1wiKS5odG1sKGNvbnRhaW5lcikgXG5cdFx0ZWxzZVxuXHRcdFx0JChcIi5zZWNyZXRtZW51LWNvbnRhaW5lci1iYWNrXCIpLmFwcGVuZChjb250YWluZXIpXG5cblx0XHQkKFwiLnNlY3JldG1lbnVcIikuZXEoLTEpLmh0bWwoJzxkaXYgY2xhc3M9XCJzZWNyZXRtZW51LWlubmVyXCI+JytodG1sKyc8L2Rpdj4nKVxuXG5cdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJzZWNyZXRtZW51LWluIHNlY3JldG1lbnUtXCIrZGlyZWN0aW9uKVxuXHRcdCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIsbGVuZ3RoKVxuXG5cdFx0IyBTaSB0aWVuZSBoaWpvc1xuXHRcdCQoXCIuc2VjcmV0bWVudSB1bCBsaSBhXCIpLmVhY2ggLT5cblx0XHRcdGlmICQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmxlbmd0aFxuXHRcdFx0XHRpZiAhJCh0aGlzKS5oYXNDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInNlY3JldG1lbnUtcGFyZW50XCIpLnByZXBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nKVxuXG5cdFx0IyBDbGljayBlbiBpdGVtIGRlIG1lbsO6XG5cdFx0JChcIi5zZWNyZXRtZW51IHVsIGxpIGEuc2VjcmV0bWVudS1wYXJlbnRcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHRhcHAuc2VjcmV0TWVudS5vcGVuIFwiPHVsPlwiKyQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmh0bWwoKStcIjwvdWw+XCIsIHRydWVcblx0XHRcdGZhbHNlXG5cblx0XHQkKFwiLnNlY3JldG1lbnUgYS5zZWNyZXRtZW51LWJhY2tcIikudW5iaW5kKFwiY2xpY2tcIikuYmluZCBcImNsaWNrXCIsIC0+XG5cdFx0XHRsYXN0bWVudSA9IHBhcnNlSW50ICQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zZWNyZXRtZW51LWx2bFwiLChsYXN0bWVudS0xKSlcblx0XHRcdCQoXCIuc2VjcmV0bWVudS5zZWNyZXRtZW51LWx2bC1cIitsYXN0bWVudSkuYWRkQ2xhc3MoXCJvdXRcIilcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0JChcIi5zZWNyZXRtZW51LnNlY3JldG1lbnUtbHZsLVwiK2xhc3RtZW51KS5yZW1vdmUoKVxuXHRcdFx0LDcwMFxuXHRcdFx0ZmFsc2VcblxuXHRjbG9zZTogLT5cblxuXHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VjcmV0bWVudS1vdXRcIilcblx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyBcInNlY3JldG1lbnUtaW4gc2VjcmV0bWVudS1vdXQgc2VjcmV0bWVudS1sZWZ0IHNlY3JldG1lbnUtcmlnaHQgc2VjcmV0bWVudS1sdmwtXCIrJChcImJvZHlcIikuYXR0cihcImRhdGEtc2VjcmV0bWVudS1sdmxcIilcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUF0dHIoXCJkYXRhLXNlY3JldG1lbnUtbHZsXCIpXG5cdFx0XHQkKFwiLnNlY3JldG1lbnVcIikucmVtb3ZlKClcblx0XHQsNzAwXG5cblxuXG5cblxuYXBwLnNoYXJlcyA9XG5cblx0aW5pdDogLT5cblx0XHQkKFwiLnNoYXJlXCIpLmNsaWNrIC0+XG5cdFx0XHRhcHAuc2hhcmVzLnNoYXJlICQodGhpcylcblxuXHRzaGFyZTogKGVsZW1lbnQpIC0+XG5cblx0XHRzaGFyZV91cmwgPSBlbmNvZGVVUklDb21wb25lbnQoZWxlbWVudC5hdHRyKFwiZGF0YS11cmxcIikpXG5cdFx0c2hhcmVfdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudChlbGVtZW50LmF0dHIoXCJkYXRhLXRleHRcIikpXG5cdFx0c2hhcmVfaW1nID0gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQuYXR0cihcImRhdGEtaW1nXCIpKVxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWZhY2Vib29rXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS10d2l0dGVyXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3NvdXJjZT13ZWJjbGllbnQmYW1wO3RleHQ9XCIrc2hhcmVfdGV4dCtcIiZhbXA7dXJsPVwiK3NoYXJlX3VybCwgNTAwLCAzMTBcblxuXHRcdGlmKGVsZW1lbnQuaGFzQ2xhc3MoXCJzaGFyZS1waW50ZXJlc3RcIikpXG5cdFx0XHRhcHAuc2hhcmVzLnBvcHVwV2luZG93IFwiaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD1cIitzaGFyZV91cmwrXCImbWVkaWE9XCIrc2hhcmVfaW1nK1wiJmRlc2NyaXB0aW9uPVwiK3NoYXJlX3RleHQsIDYyMCwgMzEwXG5cblx0XHRpZihlbGVtZW50Lmhhc0NsYXNzKFwic2hhcmUtZ29vZ2xlcGx1c1wiKSlcblx0XHRcdGFwcC5zaGFyZXMucG9wdXBXaW5kb3cgXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9XCIrc2hhcmVfdXJsLCA1MDAsIDMxMFxuXG5cdFx0aWYoZWxlbWVudC5oYXNDbGFzcyhcInNoYXJlLWxpbmtlZGluXCIpKVxuXHRcdFx0YXBwLnNoYXJlcy5wb3B1cFdpbmRvdyBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPVwiK3NoYXJlX3VybCtcIiZ0aXRsZT1cIitzaGFyZV90ZXh0K1wiJnN1bW1hcnk9XCIrc2hhcmVfdGV4dCtcIiZzb3VyY2U9XCIrc2hhcmVfdXJsLCA1MDAsIDQyMFxuXG5cdFx0ZmFsc2VcblxuXHRwb3B1cFdpbmRvdzogKHVybCwgdywgaCkgLT5cblx0XHRsZWZ0ID0gKCAkKHdpbmRvdykud2lkdGgoKSAvIDIgKSAgLSAodyAvIDIpXG5cdFx0dG9wICA9ICggJCh3aW5kb3cpLmhlaWdodCgpIC8gMiApIC0gKGggLyAyKVxuXHRcdHJldHVybiB3aW5kb3cub3Blbih1cmwsIFwiQ29tcGFydGlyXCIsICd0b29sYmFyPW5vLCBsb2NhdGlvbj1ubywgZGlyZWN0b3JpZXM9bm8sIHN0YXR1cz1ubywgbWVudWJhcj1ubywgc2Nyb2xsYmFycz1ubywgcmVzaXphYmxlPW5vLCBjb3B5aGlzdG9yeT1ubywgd2lkdGg9Jyt3KycsIGhlaWdodD0nK2grJywgdG9wPScrdG9wKycsIGxlZnQ9JytsZWZ0KVxuXG5cblxuXG5hcHAudG9vbHRpcHMgPSAtPlxuXG5cdCQoXCJbZGF0YS10b29sdGlwXVwiKS5lYWNoIC0+XG5cdFx0cG9zID0gJCh0aGlzKS5hdHRyKFwiZGF0YS10b29sdGlwLXBvc2l0aW9uXCIpXG5cdFx0cG9zID0gXCJib3R0b21cIiBpZiAhcG9zXG5cdFx0JCh0aGlzKS5hZGRDbGFzcyBcInRvb2x0aXAtcGFyZW50XCJcblx0XHQkKHRoaXMpLmFwcGVuZCBcIjxzcGFuIGNsYXNzPSd0b29sdGlwIHRvb2x0aXAtXCIrcG9zK1wiJz48c3BhbiBjbGFzcz0ndG9vbHRpcC1jb250YWluZXInPjxzcGFuIGNsYXNzPSd0b29sdGlwLXRyaWFuZ2xlJz48L3NwYW4+PHNwYW4gY2xhc3M9J3Rvb2x0aXAtY29udGVudCc+XCIgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLXRvb2x0aXBcIikgKyBcIjwvc3Bhbj48L3NwYW4+PC9zcGFuPlwiXG5cblxuXG5cblxuXG5hcHAudmFsaWRhdGlvbiA9XG5cblx0Zm9ybTogKGZvcm1zLGNhbGxiYWNrPWZhbHNlKSAtPlxuXG5cdFx0Zm9ybXMuZWFjaCAtPlxuXG5cdFx0XHRmb3JtID0gJCh0aGlzKVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIuY29udHJvbCAuY29udHJvbC12YWx1ZVwiKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdjb250cm9sLWVycm9yJz48L2Rpdj5cIilcblxuXHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLmVhY2ggLT5cblx0XHRcdFx0aW5wdXQgPSAkKHRoaXMpXG5cdFx0XHRcdGlucHV0LmFkZENsYXNzKCAkKHRoaXMpLmF0dHIoXCJ0eXBlXCIpIClcblx0XHRcdFx0aW5wdXQuYWRkQ2xhc3MoIFwiZGlzYWJsZWRcIiApIGlmIGlucHV0LmlzKFwiOmRpc2FibGVkXCIpXG5cdFx0XHRcdGlucHV0LmxpdmUgXCJibHVyLCBjaGFuZ2VcIiwgLT5cblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXQoaW5wdXQpXG5cblx0XHRcdGZvcm0uZmluZChcImlucHV0LmNoZWNrYm94LCBpbnB1dC5yYWRpb1wiKS5lYWNoIC0+XG5cdFx0XHRcdGlmICQodGhpcykuaXMoXCI6Y2hlY2tlZFwiKVxuXHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLmFkZENsYXNzKFwiY2hlY2tlZFwiKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KFwibGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpXG5cdFx0XHRcblx0XHRcdGZvcm0uZmluZChcImlucHV0LmNoZWNrYm94LCBpbnB1dC5yYWRpb1wiKS5jaGFuZ2UgLT5cblx0XHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQuY2hlY2tib3gsIGlucHV0LnJhZGlvXCIpLmVhY2ggLT5cblx0XHRcdFx0XHRpZiAkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIilcblx0XHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLmFkZENsYXNzKFwiY2hlY2tlZFwiKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tlZFwiKVxuXG5cblx0XHRcdGZvcm0uZmluZChcImlucHV0Lm51bWJlclwiKS5lYWNoIC0+XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJudW1iZXJcIikud3JhcChcIjxkaXYgY2xhc3M9J251bWJlcic+XCIpLmFmdGVyKFwiPGRpdiBjbGFzcz0nbnVtYmVyLWJ1dHRvbiBudW1iZXItbW9yZSc+KzwvZGl2PjxkaXYgY2xhc3M9J251bWJlci1idXR0b24gbnVtYmVyLWxlc3MnPi08L2Rpdj5cIilcblxuXHRcdFx0Zm9ybS5maW5kKFwiLm51bWJlciAubnVtYmVyLWJ1dHRvblwiKS5saXZlIFwiY2xpY2tcIiwgLT5cblxuXHRcdFx0XHRfaW5wdXQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJpbnB1dFwiKVxuXG5cdFx0XHRcdF9tYXggPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWF4XCIpKVxuXHRcdFx0XHRfbWluID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1pblwiKSlcblx0XHRcdFx0X21pbiA9IDEgaWYgIV9taW5cblxuXHRcdFx0XHRfc3RlcHMgPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtc3RlcHNcIikpXG5cdFx0XHRcdF9zdGVwcyA9IDEgaWYgIV9zdGVwc1xuXG5cdFx0XHRcdF92YWwgPSBwYXJzZUludChfaW5wdXQudmFsKCkpXG5cdFx0XHRcdF92YWwgPSBfdmFsICsgX3N0ZXBzIGlmICQodGhpcykuaGFzQ2xhc3MgXCJudW1iZXItbW9yZVwiXG5cdFx0XHRcdF92YWwgPSBfdmFsIC0gX3N0ZXBzIGlmICQodGhpcykuaGFzQ2xhc3MgXCJudW1iZXItbGVzc1wiXG5cdFx0XHRcdF92YWwgPSBfbWF4IGlmIF92YWwgPj0gX21heFxuXHRcdFx0XHRfdmFsID0gX21pbiBpZiBfdmFsIDw9IF9taW5cblxuXHRcdFx0XHRfaW5wdXQudmFsKF92YWwpXG5cdFx0XHRcdFxuXHRcdFx0XHRmYWxzZVxuXG5cdFx0XHRmb3JtLmZpbmQoXCIubnVtYmVyIGlucHV0XCIpLmxpdmUgXCJibHVyXCIsIC0+XG5cblx0XHRcdFx0X2lucHV0ID0gJCh0aGlzKVxuXG5cdFx0XHRcdF9tYXggPSBwYXJzZUludChfaW5wdXQuYXR0cihcImRhdGEtbWF4XCIpKVxuXHRcdFx0XHRfbWluID0gcGFyc2VJbnQoX2lucHV0LmF0dHIoXCJkYXRhLW1pblwiKSlcblx0XHRcdFx0X21pbiA9IDEgaWYgIV9taW5cblxuXHRcdFx0XHRfdmFsID0gcGFyc2VJbnQoX2lucHV0LnZhbCgpKVxuXHRcdFx0XHRfdmFsID0gX21heCBpZiBfdmFsID49IF9tYXhcblx0XHRcdFx0X3ZhbCA9IF9taW4gaWYgX3ZhbCA8PSBfbWluXG5cblx0XHRcdFx0X2lucHV0LnZhbChfdmFsKVxuXG5cdFx0XHRcdHRydWVcblxuXG5cblx0XHRcdGZvcm0uc3VibWl0IC0+XG5cblx0XHRcdFx0c2VuZCA9IHRydWVcblx0XHRcdFx0Zm9ybSA9ICQodGhpcykgXG5cblx0XHRcdFx0Zm9ybS5maW5kKFwiaW5wdXQsdGV4dGFyZWEsc2VsZWN0XCIpLmVhY2ggLT5cblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXQoJCh0aGlzKSx0cnVlKVxuXG5cdFx0XHRcdGRpdmVycm9yID0gZm9ybS5maW5kKFwiLmVycm9yXCIpLmVxKDApXG5cdFx0XHRcdGlmIGRpdmVycm9yLmxlbmd0aFxuXHRcdFx0XHRcdHNlbmQgPSBmYWxzZVxuXHRcdFx0XHRcdHRvcCA9IGRpdmVycm9yLm9mZnNldCgpLnRvcCAtICQoXCIuaGVhZGVyLXRvcFwiKS5oZWlnaHQoKSAtIDI1XG5cblx0XHRcdFx0XHQkKFwiaHRtbCxib2R5XCIpLmFuaW1hdGVcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogdG9wXG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0IC0+XG5cdFx0XHRcdFx0XHRkaXZlcnJvci5maW5kKFwiaW5wdXRcIikuZXEoMCkuZm9jdXMoKVxuXHRcdFx0XHRcdCw1MDBcblxuXHRcdFx0XHRpZiBzZW5kID09IHRydWVcblx0XHRcdFx0XHRpZiBjYWxsYmFja1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0XHRcdFx0c2VuZCA9IGZhbHNlXG5cblx0XHRcdFx0cmV0dXJuIHNlbmRcblxuXG5cdGZvcm1JbnB1dDogKGlucHV0LHZhbGlkYXRlRW1wdHk9ZmFsc2UpIC0+XG5cblx0XHRwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2wtdmFsdWVcIilcblxuXHRcdGZ2RXJyb3JzID0ge1xuXHRcdFx0XCJlbXB0eVwiOiBcIkVzdGUgY2FtcG8gZXMgcmVxdWVyaWRvXCIsXG5cdFx0XHRcImVtcHR5U2VsZWN0XCI6IFwiU2VsZWNjaW9uYSB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJlbXB0eVJhZGlvXCI6IFwiU2VsZWNjaW9uYSB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJlbXB0eUNoZWNrYm94XCI6IFwiU2VsZWNjaW9uYSBhbCBtZW5vcyB1bmEgb3BjacOzblwiLFxuXHRcdFx0XCJpbnZhbGlkRW1haWxcIjogXCJFbWFpbCBpbnbDoWxpZG9cIixcblx0XHRcdFwiaW52YWxpZEVtYWlsUmVwZWF0XCI6IFwiRWwgZW1haWwgaW5ncmVzYWRvIG5vIGVzIGlndWFsIGFsIGFudGVyaW9yXCJcblx0XHRcdFwiaW52YWxpZFBhc3NcIjogXCJMYSBjb250cmFzZcOxYSBkZWJlIHNlciBtYXlvciBhIDYgY2Fyw6FjdGVyZXNcIlxuXHRcdFx0XCJpbnZhbGlkUGFzc1JlcGVhdFwiOiBcIkxhIGNvbnRyYXNlw7FhIG5vIGVzIGlndWFsIGEgbGEgYW50ZXJpb3JcIlxuXHRcdFx0XCJpbnZhbGlkUnV0XCI6IFwiUlVUIGludsOhbGlkb1wiLFxuXHRcdFx0XCJ0ZXJtc1wiOiBcIkRlYmVzIGFjZXB0YXIgbG9zIHTDqXJtaW5vcyBsZWdhbGVzXCIsXG5cdFx0fVxuXG5cblx0XHRpZiAhaW5wdXQuaGFzQ2xhc3MoXCJvcHRpb25hbFwiKSAmJiBpbnB1dC5hdHRyKFwidHlwZVwiKSE9XCJzdWJtaXRcIiAmJiBpbnB1dC5hdHRyKFwidHlwZVwiKSE9XCJoaWRkZW5cIiAmJiBpbnB1dC5hdHRyKFwibmFtZVwiKVxuXG5cdFx0XHRlcnJvciA9IGZhbHNlXG5cdFx0XHRcblx0XHRcdGlmICFpbnB1dC52YWwoKVxuXG5cdFx0XHRcdCMgVmFsaWRhciBzaSBlbCBjYW1wbyBzZSBsbGVuYSAob3BjaW9uYWwpXG5cdFx0XHRcdGlmIHZhbGlkYXRlRW1wdHkgPT0gdHJ1ZVxuXHRcdFx0XHRcdGlmIGlucHV0LmlzKFwic2VsZWN0XCIpXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5U2VsZWN0KVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHkpXG5cdFx0XHRlbHNlXG5cblx0XHRcdFx0IyBWYWxpZGFyIGVtYWlsXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J2VtYWlsJ11cIilcblx0XHRcdFx0XHRpZiAhIGFwcC52YWxpZGF0aW9uLmVtYWlsKCBpbnB1dCwgaW5wdXQudmFsKCkgKSBcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZEVtYWlsKVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgY29udHJhc2XDsWFcblx0XHRcdFx0aWYgaW5wdXQuaXMoXCJbdHlwZT0ncGFzc3dvcmQnXVwiKVxuXHRcdFx0XHRcdGlmIGlucHV0LnZhbCgpLmxlbmd0aCA8IDZcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZFBhc3MpXG5cdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciByZXBldGlyIGNvbnRyYXNlw7FhXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiW2RhdGEtcmVwZWF0XVwiKVxuXHRcdFx0XHRcdGlmIGlucHV0LnZhbCgpICE9ICQoXCJbbmFtZT0nXCIraW5wdXQuYXR0cihcImRhdGEtcmVwZWF0XCIpK1wiJ11cIikudmFsKClcblx0XHRcdFx0XHRcdGlmIGlucHV0LmlzKFwiW3R5cGU9J3Bhc3N3b3JkJ11cIilcblx0XHRcdFx0XHRcdFx0YXBwLnZhbGlkYXRpb24uZm9ybUlucHV0TWVzc2FnZShpbnB1dCxmdkVycm9ycy5pbnZhbGlkUGFzc1JlcGVhdClcblx0XHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cdFx0XHRcdFx0XHRpZiBpbnB1dC5pcyhcIlt0eXBlPSdlbWFpbCddXCIpXG5cdFx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZEVtYWlsUmVwZWF0KVxuXHRcdFx0XHRcdFx0XHRlcnJvciA9IHRydWVcblxuXG5cdFx0XHRcdCMgVmFsaWRhciBjaGVja2JveHMvcmFkaW9zXG5cdFx0XHRcdGlmIChpbnB1dC5pcyhcIlt0eXBlPSdjaGVja2JveCddXCIpIHx8IGlucHV0LmlzKFwiW3R5cGU9J3JhZGlvJ11cIikpXG5cdFx0XHRcdFx0aWYgcGFyZW50Lmxlbmd0aCAmJiAhcGFyZW50LmZpbmQoXCJpbnB1dFtuYW1lPSdcIitpbnB1dC5hdHRyKFwibmFtZVwiKStcIiddOmNoZWNrZWRcIikubGVuZ3RoXG5cdFx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZ2RXJyb3JzLmVtcHR5Q2hlY2tib3gpIGlmIGlucHV0LmlzKFwiW3R5cGU9J2NoZWNrYm94J11cIilcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuZW1wdHlSYWRpbykgICAgaWYgaW5wdXQuaXMoXCJbdHlwZT0ncmFkaW8nXVwiKVxuXHRcdFx0XHRcdFx0ZXJyb3IgPSB0cnVlXG5cdFx0XHRcdFx0XHRwYXJlbnQuZmluZChcIi5lcnJvclwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpXG5cblxuXHRcdFx0XHQjIFZhbGlkYXIgUlVUXG5cdFx0XHRcdGlmIGlucHV0LmlzKFwiLnJ1dFwiKVxuXHRcdFx0XHRcdGlucHV0LnZhbCggJC5SdXQuZm9ybWF0ZWFyKCQuUnV0LnF1aXRhckZvcm1hdG8oaW5wdXQudmFsKCkpLCQuUnV0LmdldERpZ2l0bygkLlJ1dC5xdWl0YXJGb3JtYXRvKGlucHV0LnZhbCgpKSkpIClcblx0XHRcdFx0XHRpZiAhJC5SdXQudmFsaWRhcihpbnB1dC52YWwoKSlcblx0XHRcdFx0XHRcdGFwcC52YWxpZGF0aW9uLmZvcm1JbnB1dE1lc3NhZ2UoaW5wdXQsZnZFcnJvcnMuaW52YWxpZFJ1dClcblx0XHRcdFx0XHRcdGVycm9yID0gdHJ1ZVxuXG5cdFx0XHRcdCMgU2kgbm8gaGF5IGVycm9yZXMsIHNlIHF1aXRhIGVsIG1lbnNhamUgZGUgZXJyb3Jcblx0XHRcdFx0aWYgZXJyb3IgPT0gZmFsc2Vcblx0XHRcdFx0XHRhcHAudmFsaWRhdGlvbi5mb3JtSW5wdXRNZXNzYWdlKGlucHV0LGZhbHNlKVxuXG5cblxuXHRmb3JtSW5wdXRNZXNzYWdlOiAoaW5wdXQsbWVzc2FnZSkgLT5cblx0XHRpZiBtZXNzYWdlXG5cdFx0XHRpbnB1dC5hZGRDbGFzcyhcImVycm9yXCIpXG5cdFx0XHRwYXJlbnQgPSBpbnB1dC5jbG9zZXN0KFwiLmNvbnRyb2wtdmFsdWVcIilcblx0XHRcdHBhcmVudC5hZGRDbGFzcyhcImVycm9yXCIpXG5cdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLWVycm9yXCIpLnRleHQobWVzc2FnZSkuYWRkQ2xhc3MoXCJpblwiKVxuXHRcdGVsc2Vcblx0XHRcdGlucHV0LnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcblx0XHRcdHBhcmVudCA9IGlucHV0LmNsb3Nlc3QoXCIuY29udHJvbC12YWx1ZVwiKVxuXHRcdFx0cGFyZW50LnJlbW92ZUNsYXNzKFwiZXJyb3JcIilcdFxuXHRcdFx0cGFyZW50LmZpbmQoXCIuY29udHJvbC1lcnJvclwiKS5hZGRDbGFzcyhcIm91dFwiKVxuXHRcdFx0c2V0VGltZW91dCAtPlxuXHRcdFx0XHRwYXJlbnQuZmluZChcIi5jb250cm9sLWVycm9yXCIpLnJlbW92ZUNsYXNzKFwiaW4gb3V0XCIpLnRleHQoXCJcIilcblx0XHRcdCw1MDBcblxuXG5cblx0ZW1haWw6IChlbGVtZW50byx2YWxvcikgLT5cblx0XHRpZiAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHZhbG9yKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXG5cblxuXG4iXX0=