// Generated by CoffeeScript 1.6.3
var closeAlerts, equidist, formValidation, fvInput, fvInputMessage, isMobile, openAlert, popupWindow, scrolls, secretMenu, secretMenuClose, secretMenuOpen, setScroll, setTooltips, validarEmail, _in, _out;

_in = function(element) {
  return element.addClass("in");
};

_out = function(element) {
  element.addClass("out");
  return setTimeout(function() {
    return element.removeClass("in out");
  }, 500);
};

secretMenu = function() {
  $(".secretmenu-button").click(function() {
    if (!$("body").hasClass("secretmenu-in")) {
      return secretMenuOpen($("header nav").html());
    } else {
      return secretMenuClose();
    }
  });
  return $(".secretmenu-container-front").click(function() {
    if ($("body").hasClass("secretmenu-in")) {
      return secretMenuClose();
    }
  });
};

secretMenuOpen = function(html, children, direction) {
  var back, container, length;
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
    back = "";
  } else {
    $(".secretmenu-container-back").append(container);
    back = '<a href="#" class="secretmenu-back"><i class="fa fa-chevron-left"></i> Atrás</a>';
  }
  $(".secretmenu").eq(-1).html('<div class="secretmenu-inner">' + back + html + '</div>');
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
    secretMenuOpen("<ul>" + $(this).parent().find("ul").html() + "</ul>", true);
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
};

secretMenuClose = function() {
  $("body").addClass("secretmenu-out");
  return setTimeout(function() {
    $("body").removeClass("secretmenu-in secretmenu-out secretmenu-left secretmenu-right secretmenu-lvl-" + $("body").attr("data-secretmenu-lvl"));
    $("body").removeAttr("data-secretmenu-lvl");
    return $(".secretmenu").remove();
  }, 700);
};

popupWindow = function(url, w, h) {
  var left, top;
  left = ($(window).width() / 2) - (w / 2);
  top = ($(window).height() / 2) - (h / 2);
  return window.open(url, "Compartir", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
};

validarEmail = function(elemento, valor) {
  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)) {
    return true;
  } else {
    return false;
  }
};

equidist = function() {
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
};

openAlert = function(options) {
  var buttons, close, content, html, title;
  title = "";
  content = "";
  buttons = "";
  close = "";
  if (options.title) {
    title = "<h2>" + options.title + "</h2>";
  }
  if (options.content) {
    content = "<div class='alert-content'>" + options.content + "</p>";
  }
  if (options.close === void 0) {
    options.close = true;
  }
  if (options.close === true) {
    close = '<button class="close false">X</button>';
  }
  if (options.buttons) {
    buttons += options.buttons + " ";
  }
  if (options.cancelar === true) {
    buttons += '<button class="button false">Cancelar</button> ';
  }
  if (options.aceptar === true) {
    buttons += '<button class="button true">Aceptar</button> ';
  }
  html = '<div class="alert in ' + options.cssclass + '">' + '<div class="alert-light false"></div>' + '<div class="alert-box equidist">' + '<div class="inner">' + close + title + content + '<div class="buttons">' + buttons + '</div>' + '</div>' + '</div>' + '</div>';
  $("body").append(html);
  equidist();
  return $(".alert .true, .alert .false").unbind("click").bind("click", function() {
    var alertorigin;
    if ($(this).parent().is(".alert")) {
      alertorigin = $(this).parent();
    }
    if ($(this).parent().parent().is(".alert")) {
      alertorigin = $(this).parent().parent();
    }
    if ($(this).parent().parent().parent().is(".alert")) {
      alertorigin = $(this).parent().parent().parent();
    }
    if ($(this).parent().parent().parent().parent().is(".alert")) {
      alertorigin = $(this).parent().parent().parent().parent();
    }
    if ($(this).parent().parent().parent().parent().parent().is(".alert")) {
      alertorigin = $(this).parent().parent().parent().parent().parent();
    }
    alertorigin.addClass("out");
    setTimeout(function() {
      return alertorigin.remove();
    }, 200);
    if ($(this).hasClass("true") && options.callback_true) {
      options.callback_true();
    }
    if ($(this).hasClass("false") && options.callback_false) {
      options.callback_false();
    }
    return true;
  });
};

closeAlerts = function() {
  $(".alert").addClass("out");
  return setTimeout(function() {
    return $(".alert").remove();
  }, 200);
};

isMobile = function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
};

fvInputMessage = function(input, message) {
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
};

fvInput = function(input, validateEmpty) {
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
    "invalidPass": "La contraseña debe ser mayor a 6 carácteres",
    "invalidPassRepeat": "La contraseña no es igual a la anterior",
    "invalidRut": "RUT inválido",
    "terms": "Debes aceptar los términos legales"
  };
  if (!input.hasClass("optional") && input.attr("type") !== "submit" && input.attr("type") !== "hidden") {
    error = false;
    if (!input.val()) {
      if (validateEmpty === true) {
        if (input.is("select")) {
          return fvInputMessage(input, fvErrors.emptySelect);
        } else {
          return fvInputMessage(input, fvErrors.empty);
        }
      }
    } else {
      if (input.is("[type='email']")) {
        if (!validarEmail(input, input.val())) {
          fvInputMessage(input, fvErrors.invalidEmail);
          error = true;
        }
      }
      if (input.is("[type='password']")) {
        if (input.val().length < 6) {
          fvInputMessage(input, fvErrors.invalidPass);
          error = true;
        }
      }
      if (input.is("[data-repeat]")) {
        if (input.val() !== $("[name='" + input.attr("data-repeat") + "']").val()) {
          fvInputMessage(input, fvErrors.invalidPassRepeat);
          error = true;
        }
      }
      if (input.is("[type='checkbox']") || input.is("[type='radio']")) {
        if (!parent.find("input[name='" + input.attr("name") + "']:checked").length) {
          if (input.is("[type='checkbox']")) {
            fvInputMessage(input, fvErrors.emptyCheckbox);
          }
          if (input.is("[type='radio']")) {
            fvInputMessage(input, fvErrors.emptyRadio);
          }
          error = true;
          parent.find(".error").removeClass("error");
        }
      }
      if (input.is(".rut")) {
        input.val($.Rut.formatear($.Rut.quitarFormato(input.val()), $.Rut.getDigito($.Rut.quitarFormato(input.val()))));
        if (!$.Rut.validar(input.val())) {
          fvInputMessage(input, fvErrors.invalidRut);
          error = true;
        }
      }
      if (error === false) {
        return fvInputMessage(input, false);
      }
    }
  }
};

formValidation = function(forms, callback) {
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
      return input.live("blur, change", function() {
        return fvInput(input);
      });
    });
    return form.submit(function() {
      var diverror, send, top;
      send = true;
      form = $(this);
      form.find("input,textarea,select").each(function() {
        return fvInput($(this), true);
      });
      diverror = form.find(".error").eq(0);
      if (diverror.length) {
        send = false;
        top = diverror.offset().top - $("header").height() - 30;
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
};

scrolls = [];

setScroll = function(element) {
  var id;
  id = element.attr("id");
  if (element.is(":visible")) {
    if (element.hasClass("iscroll-loaded")) {
      scrolls[id].refresh();
      return console.log("refresh");
    } else {
      console.log(id);
      scrolls[id] = new IScroll("#" + id, {
        scrollX: true,
        mouseWheel: true,
        bounce: true,
        scrollbars: "custom"
      });
      return element.addClass("iscroll-loaded");
    }
  }
};

setTooltips = function() {
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

/* --------------------------------------------
     Begin scripts.coffee
--------------------------------------------
*/


$(document).ready(function() {
  var resizing_timeout;
  resizing_timeout = false;
  $(window).resize(function() {
    var resizing;
    equidist();
    resizing = true;
    clearTimeout(resizing_timeout);
    return resizing_timeout = setTimeout(function() {
      return resizing = false;
    }, 200);
  });
  secretMenu();
  setTooltips();
  $(".box-tabs .box-tabs-header a").live("click", function() {
    var index, parent;
    index = $(this).index();
    parent = $(this).parent().parent();
    parent.find(".box-tabs-header a").removeClass("active");
    parent.find(".box-tabs-header a").eq(index).addClass("active");
    parent.find(".box-tabs-content").removeClass("active");
    parent.find(".box-tabs-content").eq(index).addClass("active");
    return false;
  });
  $(".goto").click(function() {
    return $("html,body").animate({
      scrollTop: $(".gotoend").offset().top - $("header").height() - 20
    });
  });
  $(".load-more").click(function() {
    $(this).html("CARGANDO...");
    $.ajax({
      type: "GET",
      url: $(this).attr("href"),
      async: false,
      success: function(html) {
        var $newItems, link_next;
        html = $(html);
        $newItems = html.find(".articles >");
        link_next = html.find(".load-more").attr("href");
        setTimeout(function() {
          $(".load-more").html("CARGAR MÁS CONTENIDO").attr("href", link_next);
          return equidist();
        }, 500);
        return $(window).load(function() {
          return equidist();
        });
      }
    });
    return false;
  });
  formValidation($("form.controls"));
  $.each($(".scroll"), function() {
    return setScroll($(this));
  });
  return setTimeout(function() {
    var _n_slides;
    if ($("#sliderhome").length) {
      _n_slides = 0;
      $("#sliderhome .royalSlider .rsContent").each(function() {
        $(this).attr("data-slide", $(this).index());
        return _n_slides++;
      });
      return $("#sliderhome .royalSlider").royalSlider({
        imageScaleMode: 'fit',
        sliderDrag: false,
        arrowsNavAutoHide: false,
        loop: true,
        slidesSpacing: 10,
        transitionSpeed: 600,
        autoPlay: {
          enabled: true,
          pauseOnHover: true,
          delay: 4000
        },
        imageScalePadding: 0,
        addActiveClass: true,
        navigateByClick: false,
        autoHeight: true
      });
    }
  }, 50);
});
