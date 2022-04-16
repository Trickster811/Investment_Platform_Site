"use strict";
!(function (u, p) {
  (u.Package.name = "DashLite"), (u.Package.version = "2.3");
  var c = p(window),
    a = p("body"),
    l = p(document),
    t = "nk-menu",
    s = "nk-header-menu",
    r = "nk-sidebar",
    d = u.Break;
  function f(e, n) {
    return (
      Object.keys(n).forEach(function (t) {
        e[t] = n[t];
      }),
      e
    );
  }
  (u.ClassBody = function () {
    u.AddInBody(r);
  }),
    (u.ClassNavMenu = function () {
      u.BreakClass("." + s, d.lg, { timeOut: 0 }),
        c.on("resize", function () {
          u.BreakClass("." + s, d.lg);
        });
    }),
    (u.Prettify = function () {
      window.prettyPrint && prettyPrint();
    }),
    (u.Copied = function () {
      var t = ".clipboard-init",
        i = ".clipboard-text",
        o = "clipboard-success",
        s = "clipboard-error";
      function e(t, e) {
        var t = p(t),
          n = t.parent(),
          a = { text: "Copy", done: "Copied", fail: "Failed" },
          t = {
            text: t.data("clip-text"),
            done: t.data("clip-success"),
            fail: t.data("clip-error"),
          };
        (a.text = t.text || a.text),
          (a.done = t.done || a.done),
          (a.fail = t.fail || a.fail);
        t = "success" === e ? a.done : a.fail;
        n
          .addClass("success" === e ? o : s)
          .find(i)
          .html(t),
          setTimeout(function () {
            n
              .removeClass(o + " " + s)
              .find(i)
              .html(a.text)
              .blur(),
              n.find("input").blur();
          }, 2e3);
      }
      ClipboardJS.isSupported()
        ? new ClipboardJS(t)
            .on("success", function (t) {
              e(t.trigger, "success"), t.clearSelection();
            })
            .on("error", function (t) {
              e(t.trigger, "error");
            })
        : p(t).css("display", "none");
    }),
    (u.CurrentLink = function () {
      var t = window.location.href,
        n = (n = t.substring(
          0,
          -1 == t.indexOf("#") ? t.length : t.indexOf("#")
        )).substring(0, -1 == n.indexOf("?") ? n.length : n.indexOf("?"));
      p(".nk-menu-link, .menu-link, .nav-link").each(function () {
        var t = p(this),
          e = t.attr("href");
        n.match(e)
          ? (t
              .closest("li")
              .addClass("active current-page")
              .parents()
              .closest("li")
              .addClass("active current-page"),
            t.closest("li").children(".nk-menu-sub").css("display", "block"),
            t
              .parents()
              .closest("li")
              .children(".nk-menu-sub")
              .css("display", "block"))
          : t
              .closest("li")
              .removeClass("active current-page")
              .parents()
              .closest("li:not(.current-page)")
              .removeClass("active");
      });
    }),
    (u.PassSwitch = function () {
      u.Passcode(".passcode-switch");
    }),
    (u.Toast = function (t, e, n) {
      var a =
          "info" === (e = e || "info")
            ? "ni ni-info-fill"
            : "success" === e
            ? "ni ni-check-circle-fill"
            : "error" === e
            ? "ni ni-cross-circle-fill"
            : "warning" === e
            ? "ni ni-alert-fill"
            : "",
        i = { position: "bottom-right", ui: "", icon: "auto", clear: !1 },
        i = n ? f(i, n) : i;
      (i.position = i.position ? "toast-" + i.position : "toast-bottom-right"),
        (i.icon = "auto" === i.icon ? a : i.icon || ""),
        (i.ui = i.ui ? " " + i.ui : ""),
        (a =
          "" !== i.icon
            ? '<span class="toastr-icon"><em class="icon ' +
              i.icon +
              '"></em></span>'
            : ""),
        "" !==
          (t =
            "" !== t ? a + '<div class="toastr-text">' + t + "</div>" : "") &&
          (!0 === i.clear && toastr.clear(),
          (a = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !1,
            progressBar: !1,
            positionClass: i.position + i.ui,
            closeHtml: '<span class="btn-trigger">Close</span>',
            preventDuplicates: !0,
            showDuration: "1500",
            hideDuration: "1500",
            timeOut: "2000",
            toastClass: "toastr",
            extendedTimeOut: "3000",
          }),
          (toastr.options = f(a, i)),
          toastr[e](t));
    }),
    (u.TGL.screen = function (t) {
      p(t).exists() &&
        p(t).each(function () {
          var t = p(this).data("toggle-screen");
          t && p(this).addClass("toggle-screen-" + t);
        });
    }),
    (u.TGL.content = function (t, e) {
      var n = p(t || ".toggle"),
        o = p("[data-content]"),
        s = !1,
        t = { active: "active", content: "content-active", break: !0 },
        r = e ? f(t, e) : t;
      u.TGL.screen(o),
        n.on("click", function (t) {
          (s = this),
            u.Toggle.trigger(p(this).data("target"), r),
            t.preventDefault();
        }),
        l.on("mouseup", function (t) {
          var e, n, a, i;
          s &&
            ((e = p(s)),
            (n = p(".select2-container")),
            (a = p(".datepicker-dropdown")),
            (i = p(".ui-timepicker-container")),
            e.is(t.target) ||
              0 !== e.has(t.target).length ||
              o.is(t.target) ||
              0 !== o.has(t.target).length ||
              n.is(t.target) ||
              0 !== n.has(t.target).length ||
              a.is(t.target) ||
              0 !== a.has(t.target).length ||
              i.is(t.target) ||
              0 !== i.has(t.target).length ||
              (u.Toggle.removed(e.data("target"), r), (s = !1)));
        }),
        c.on("resize", function () {
          o.each(function () {
            var t = p(this).data("content"),
              e = p(this).data("toggle-screen"),
              e = d[e];
            u.Win.width > e && u.Toggle.removed(t, r);
          });
        });
    }),
    (u.TGL.expand = function (t, e) {
      var n = t || ".expand",
        t = { toggle: !0 },
        a = e ? f(t, e) : t;
      p(n).on("click", function (t) {
        u.Toggle.trigger(p(this).data("target"), a), t.preventDefault();
      });
    }),
    (u.TGL.ddmenu = function (t, e) {
      var n = t || ".nk-menu-toggle",
        t = { active: "active", self: "nk-menu-toggle", child: "nk-menu-sub" },
        a = e ? f(t, e) : t;
      p(n).on("click", function (t) {
        (u.Win.width < d.lg || p(this).parents().hasClass(r)) &&
          u.Toggle.dropMenu(p(this), a),
          t.preventDefault();
      });
    }),
    (u.TGL.showmenu = function (t, e) {
      var n = p(t || ".nk-nav-toggle"),
        a = p("[data-content]"),
        i = a.hasClass(s) ? d.lg : d.xl,
        t = {
          active: "toggle-active",
          content: r + "-active",
          body: "nav-shown",
          overlay: "nk-sidebar-overlay",
          break: i,
          close: { profile: !0, menu: !1 },
        },
        o = e ? f(t, e) : t;
      n.on("click", function (t) {
        u.Toggle.trigger(p(this).data("target"), o), t.preventDefault();
      }),
        l.on("mouseup", function (t) {
          !n.is(t.target) &&
            0 === n.has(t.target).length &&
            !a.is(t.target) &&
            0 === a.has(t.target).length &&
            u.Win.width < i &&
            u.Toggle.removed(n.data("target"), o);
        }),
        c.on("resize", function () {
          (u.Win.width < d.xl || u.Win.width < i) &&
            !u.State.isMobile &&
            u.Toggle.removed(n.data("target"), o);
        });
    }),
    (u.sbCompact = function () {
      var t = p(".nk-nav-compact");
      p("[data-content]");
      t.on("click", function (t) {
        t.preventDefault();
        var e = p(this),
          t = e.data("target"),
          t = p("[data-content=" + t + "]");
        e.toggleClass("compact-active"), t.toggleClass("is-compact");
      });
    }),
    (u.Ani.formSearch = function (t, e) {
      var n = { active: "active", timeout: 400, target: "[data-search]" },
        a = e ? f(n, e) : n,
        i = p(t),
        o = p(a.target);
      i.exists() &&
        (i.on("click", function (t) {
          t.preventDefault();
          var t = p(this).data("target"),
            e = p("[data-search=" + t + "]"),
            t = p("[data-target=" + t + "]");
          e.hasClass(a.active)
            ? (t.add(e).removeClass(a.active),
              setTimeout(function () {
                e.find("input").val("");
              }, a.timeout))
            : (t.add(e).addClass(a.active), e.find("input").focus());
        }),
        l.on({
          keyup: function (t) {
            "Escape" === t.key && i.add(o).removeClass(a.active);
          },
          mouseup: function (t) {
            o.find("input").val() ||
              o.is(t.target) ||
              0 !== o.has(t.target).length ||
              i.is(t.target) ||
              0 !== i.has(t.target).length ||
              i.add(o).removeClass(a.active);
          },
        }));
    }),
    (u.Ani.formElm = function (t, e) {
      var n = { focus: "focused" },
        a = e ? f(n, e) : n;
      p(t).exists() &&
        p(t).each(function () {
          var t = p(this);
          t.val() && t.parent().addClass(a.focus),
            t.on({
              focus: function () {
                t.parent().addClass(a.focus);
              },
              blur: function () {
                t.val() || t.parent().removeClass(a.focus);
              },
            });
        });
    }),
    (u.Validate = function (t, e) {
      p(t).exists() &&
        p(t).each(function () {
          var t = { errorElement: "span" },
            t = e ? f(t, e) : t;
          p(this).validate(t);
        });
    }),
    (u.Validate.init = function () {
      u.Validate(".form-validate", {
        errorElement: "span",
        errorClass: "invalid",
        errorPlacement: function (t, e) {
          e.parents().hasClass("input-group")
            ? t.appendTo(e.parent().parent())
            : t.appendTo(e.parent());
        },
      });
    }),
    (u.Dropzone = function (a, i) {
      p(a).exists() &&
        p(a).each(function () {
          var t = (t = p(a).data("max-files")) || null,
            e = (e = p(a).data("max-file-size")) || 256,
            n = p(a).data("accepted-files"),
            n = {
              autoDiscover: !1,
              maxFiles: t,
              maxFilesize: e,
              acceptedFiles: (n = n || null),
            },
            n = i ? f(n, i) : n;
          p(this).addClass("dropzone").dropzone(n);
        });
    }),
    (u.Dropzone.init = function () {
      u.Dropzone(".upload-zone", { url: "/images" });
    }),
    (u.Wizard = function () {
      var t = p(".nk-wizard");
      t.exists() &&
        t.each(function () {
          var t = p(this).attr("id"),
            a = p("#" + t).show();
          a.steps({
            headerTag: ".nk-wizard-head",
            bodyTag: ".nk-wizard-content",
            labels: {
              finish: "Submit",
              next: "Next",
              previous: "Prev",
              loading: "Loading ...",
            },
            titleTemplate: '<span class="number">0#index#</span> #title#',
            onStepChanging: function (t, e, n) {
              return (
                n < e ||
                (e < n &&
                  (a.find(".body:eq(" + n + ") label.error").remove(),
                  a.find(".body:eq(" + n + ") .error").removeClass("error")),
                (a.validate().settings.ignore = ":disabled,:hidden"),
                a.valid())
              );
            },
            onFinishing: function (t, e) {
              return (a.validate().settings.ignore = ":disabled"), a.valid();
            },
            onFinished: function (t, e) {
              window.location.href = "#";
            },
          }).validate({
            errorElement: "span",
            errorClass: "invalid",
            errorPlacement: function (t, e) {
              t.appendTo(e.parent());
            },
          });
        });
    }),
    (u.DataTable = function (t, o) {
      p(t).exists() &&
        p(t).each(function () {
          var t = p(this).data("auto-responsive"),
            e = !(void 0 === o.buttons || !o.buttons),
            n = p(this).data("export-title")
              ? p(this).data("export-title")
              : "Export",
            a = e
              ? '<"dt-export-buttons d-flex align-center"<"dt-export-title d-none d-md-inline-block">B>'
              : "",
            i = e ? " with-export" : "",
            e =
              '<"row justify-between g-2' +
              i +
              '"<"col-7 col-sm-4 text-left"f><"col-5 col-sm-8 text-right"<"datatable-filter"<"d-flex justify-content-end g-2"' +
              a +
              'l>>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>',
            a =
              '<"row justify-between g-2' +
              i +
              '"<"col-7 col-sm-4 text-left"f><"col-5 col-sm-8 text-right"<"datatable-filter"<"d-flex justify-content-end g-2"' +
              a +
              'l>>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>',
            e = {
              responsive: !0,
              autoWidth: !1,
              dom: p(this).hasClass("is-separate") ? a : e,
              language: {
                search: "",
                searchPlaceholder: "Type in to Search",
                lengthMenu:
                  "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
                info: "_START_ -_END_ of _TOTAL_",
                infoEmpty: "No records found",
                infoFiltered: "( Total _MAX_  )",
                paginate: {
                  first: "First",
                  last: "Last",
                  next: "Next",
                  previous: "Prev",
                },
              },
            },
            e = o ? f(e, o) : e,
            e = !1 === t ? f(e, { responsive: !1 }) : e;
          p(this).DataTable(e), p(".dt-export-title").text(n);
        });
    }),
    (u.DataTable.init = function () {
      u.DataTable(".datatable-init", { responsive: { details: !0 } }),
        u.DataTable(".datatable-init-export", {
          responsive: { details: !0 },
          buttons: ["copy", "excel", "csv", "pdf"],
        }),
        (p.fn.DataTable.ext.pager.numbers_length = 7);
    }),
    (u.BS.ddfix = function (t, e) {
      var n =
        e ||
        "a:not(.clickable), button:not(.clickable), a:not(.clickable) *, button:not(.clickable) *";
      p(t || ".dropdown-menu").on("click", function (t) {
        p(t.target).is(n) || t.stopPropagation();
      }),
        u.State.isRTL &&
          p(".dropdown-menu").each(function () {
            var t = p(this);
            t.hasClass("dropdown-menu-right") &&
            !t.hasClass("dropdown-menu-center")
              ? t
                  .prev('[data-toggle="dropdown"]')
                  .dropdown({ popperConfig: { placement: "bottom-start" } })
              : t.hasClass("dropdown-menu-right") ||
                t.hasClass("dropdown-menu-center") ||
                t
                  .prev('[data-toggle="dropdown"]')
                  .dropdown({ popperConfig: { placement: "bottom-end" } });
          });
    }),
    (u.BS.tabfix = function (t) {
      p(t || '[data-toggle="modal"]').on("click", function () {
        var t = p(this),
          e = t.data("target"),
          n = t.attr("href"),
          t = t.data("tab-target"),
          n = e ? a.find(e) : a.find(n);
        t && "#" !== t && n
          ? n.find('[href="' + t + '"]').tab("show")
          : n &&
            ((n = n.find(".nk-nav.nav-tabs")),
            (n = p(n[0]).find('[data-toggle="tab"]')),
            p(n[0]).tab("show"));
      });
    }),
    (u.ModeSwitch = function () {
      var t = p(".dark-switch");
      a.hasClass("dark-mode") ? t.addClass("active") : t.removeClass("active"),
        t.on("click", function (t) {
          t.preventDefault(),
            p(this).toggleClass("active"),
            a.toggleClass("dark-mode");
        });
    }),
    (u.Knob = function (t, e) {
      var n, a;
      p(t).exists() &&
        "function" == typeof p.fn.knob &&
        ((n = { min: 0 }),
        (a = e ? f(n, e) : n),
        p(t).each(function () {
          p(this).knob(a);
        }));
    }),
    (u.Knob.init = function () {
      var t = { readOnly: !0, lineCap: "round" },
        e = { angleOffset: -90, angleArc: 180, readOnly: !0, lineCap: "round" };
      u.Knob(".knob", t), u.Knob(".knob-half", e);
    }),
    (u.Range = function (t, d) {
      p(t).exists() &&
        "undefined" != typeof noUiSlider &&
        p(t).each(function () {
          var t = p(this),
            e = t.attr("id"),
            n = t.data("start"),
            n = (n = /\s/g.test(n) ? n.split(" ") : n) || 0,
            a = t.data("connect"),
            a = void 0 === (a = /\s/g.test(a) ? a.split(" ") : a) ? "lower" : a,
            i = (i = t.data("min")) || 0,
            o = (o = t.data("max")) || 100,
            s = (s = t.data("min-distance")) || null,
            r = (r = t.data("max-distance")) || null,
            c = (c = t.data("step")) || 1,
            l = (l = t.data("orientation")) || "horizontal",
            t = (t = t.data("tooltip")) || !1;
          console.log(t);
          (e = document.getElementById(e)),
            (t = {
              start: n,
              connect: a,
              direction: u.State.isRTL ? "rtl" : "ltr",
              range: { min: i, max: o },
              margin: s,
              limit: r,
              step: c,
              orientation: l,
              tooltips: t,
            }),
            (t = d ? f(t, d) : t);
          noUiSlider.create(e, t);
        });
    }),
    (u.Range.init = function () {
      u.Range(".form-control-slider"), u.Range(".form-range-slider");
    }),
    (u.Select2.init = function () {
      u.Select2(".form-select");
    }),
    (u.Slick = function (t, e) {
      p(t).exists() &&
        "function" == typeof p.fn.slick &&
        p(t).each(function () {
          var t = {
              prevArrow:
                '<div class="slick-arrow-prev"><a href="javascript:void(0);" class="slick-prev"><em class="icon ni ni-chevron-left"></em></a></div>',
              nextArrow:
                '<div class="slick-arrow-next"><a href="javascript:void(0);" class="slick-next"><em class="icon ni ni-chevron-right"></em></a></div>',
              rtl: u.State.isRTL,
            },
            t = e ? f(t, e) : t;
          p(this).slick(t);
        });
    }),
    (u.Slider.init = function () {
      u.Slick(".slider-init");
    }),
    (u.Lightbox = function (t, e, n) {
      p(t).exists() &&
        p(t).each(function () {
          var t = {},
            t =
              "video" == e || "iframe" == e
                ? {
                    type: "iframe",
                    removalDelay: 160,
                    preloader: !0,
                    fixedContentPos: !1,
                    callbacks: {
                      beforeOpen: function () {
                        (this.st.image.markup = this.st.image.markup.replace(
                          "mfp-figure",
                          "mfp-figure mfp-with-anim"
                        )),
                          (this.st.mainClass = this.st.el.attr("data-effect"));
                      },
                    },
                  }
                : "content" == e
                ? {
                    type: "inline",
                    preloader: !0,
                    removalDelay: 400,
                    mainClass: "mfp-fade content-popup",
                  }
                : { type: "image", mainClass: "mfp-fade image-popup" },
            t = n ? f(t, n) : t;
          p(this).magnificPopup(t);
        });
    }),
    (u.Control = function (t) {
      document.querySelectorAll(t).forEach(function (t, e, n) {
        t.checked && t.parentNode.classList.add("checked"),
          t.addEventListener("change", function () {
            "checkbox" == t.type &&
              (t.checked
                ? t.parentNode.classList.add("checked")
                : t.parentNode.classList.remove("checked")),
              "radio" == t.type &&
                (document
                  .querySelectorAll('input[name="' + t.name + '"]')
                  .forEach(function (t, e, n) {
                    t.parentNode.classList.remove("checked");
                  }),
                t.checked && t.parentNode.classList.add("checked"));
          });
      });
    }),
    (u.NumberSpinner = function (t, e) {
      var a = document.querySelectorAll("[data-number='plus']"),
        i = document.querySelectorAll("[data-number='minus']");
      a.forEach(function (t, e, n) {
        a[e].parentNode;
        a[e].addEventListener("click", function () {
          var s = a[e].parentNode.children;
          s.forEach(function (t, e, n) {
            var a, i, o;
            s[e].classList.contains("number-spinner") &&
              ((a = "" == !s[e].value ? parseInt(s[e].value) : 0),
              (i = "" == !s[e].step ? parseInt(s[e].step) : 1),
              (o = "" == !s[e].max ? parseInt(s[e].max) : 1 / 0),
              (s[e].value = a + i < o + 1 ? a + i : a));
          });
        });
      }),
        i.forEach(function (t, e, n) {
          i[e].parentNode;
          i[e].addEventListener("click", function () {
            var s = i[e].parentNode.children;
            s.forEach(function (t, e, n) {
              var a, i, o;
              s[e].classList.contains("number-spinner") &&
                ((a = "" == !s[e].value ? parseInt(s[e].value) : 0),
                (i = "" == !s[e].step ? parseInt(s[e].step) : 1),
                (o = "" == !s[e].min ? parseInt(s[e].min) : 0),
                (s[e].value = o - 1 < a - i ? a - i : a));
            });
          });
        });
    }),
    (u.OtherInit = function () {
      u.ClassBody(),
        u.PassSwitch(),
        u.CurrentLink(),
        u.LinkOff(".is-disable"),
        u.ClassNavMenu(),
        u.SetHW("[data-height]", "height"),
        u.SetHW("[data-width]", "width"),
        u.NumberSpinner(),
        u.Lightbox(".popup-video", "video"),
        u.Lightbox(".popup-iframe", "iframe"),
        u.Lightbox(".popup-image", "image"),
        u.Lightbox(".popup-content", "content"),
        u.Control(".custom-control-input");
    }),
    (u.Ani.init = function () {
      u.Ani.formElm(".form-control-outlined"),
        u.Ani.formSearch(".toggle-search");
    }),
    (u.BS.init = function () {
      u.BS.menutip("a.nk-menu-link"),
        u.BS.tooltip(".nk-tooltip"),
        u.BS.tooltip(".btn-tooltip", { placement: "top" }),
        u.BS.tooltip('[data-toggle="tooltip"]'),
        u.BS.tooltip(".tipinfo,.nk-menu-tooltip", { placement: "right" }),
        u.BS.popover('[data-toggle="popover"]'),
        u.BS.progress("[data-progress]"),
        u.BS.fileinput(".custom-file-input"),
        u.BS.modalfix(),
        u.BS.ddfix(),
        u.BS.tabfix();
    }),
    (u.Picker.init = function () {
      u.Picker.date(".date-picker"),
        u.Picker.dob(".date-picker-alt"),
        u.Picker.time(".time-picker"),
        u.Picker.date(".date-picker-range", {
          todayHighlight: !1,
          autoclose: !1,
        });
    }),
    (u.Addons.Init = function () {
      u.Knob.init(),
        u.Range.init(),
        u.Select2.init(),
        u.Dropzone.init(),
        u.Slider.init(),
        u.DataTable.init();
    }),
    (u.TGL.init = function () {
      u.TGL.content(".toggle"),
        u.TGL.expand(".toggle-expand"),
        u.TGL.expand(".toggle-opt", { toggle: !1 }),
        u.TGL.showmenu(".nk-nav-toggle"),
        u.TGL.ddmenu("." + t + "-toggle", {
          self: t + "-toggle",
          child: t + "-sub",
        });
    }),
    (u.BS.modalOnInit = function () {
      p(".modal").on("shown.bs.modal", function () {
        u.Select2.init(), u.Validate.init();
      });
    }),
    (u.init = function () {
      u.coms.docReady.push(u.OtherInit),
        u.coms.docReady.push(u.Prettify),
        u.coms.docReady.push(u.ColorBG),
        u.coms.docReady.push(u.ColorTXT),
        u.coms.docReady.push(u.Copied),
        u.coms.docReady.push(u.Ani.init),
        u.coms.docReady.push(u.TGL.init),
        u.coms.docReady.push(u.BS.init),
        u.coms.docReady.push(u.Validate.init),
        u.coms.docReady.push(u.Picker.init),
        u.coms.docReady.push(u.Addons.Init),
        u.coms.docReady.push(u.Wizard),
        u.coms.docReady.push(u.sbCompact),
        u.coms.winLoad.push(u.ModeSwitch);
    }),
    u.init();
})(NioApp, jQuery);
