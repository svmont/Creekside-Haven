/* ==========================================================================
   Creekside Haven — site interactions
   Vanilla JS, no build step, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------- Mobile navigation ------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------- Scroll reveal --------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------------------- Year stamp ----------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ------------------- Filter chips (plans and gallery) ----------------- */
  document.querySelectorAll("[data-filter-target]").forEach(function (bar) {
    var items = document.querySelectorAll(bar.getAttribute("data-filter-target"));
    var emptySel = bar.getAttribute("data-filter-empty");
    var empty = emptySel ? document.querySelector(emptySel) : null;

    bar.addEventListener("click", function (ev) {
      var chip = ev.target.closest(".chip");
      if (!chip) return;
      var want = chip.getAttribute("data-filter");
      bar.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      var shown = 0;
      items.forEach(function (item) {
        var cats = (item.getAttribute("data-cat") || "").split(" ");
        var match = want === "all" || cats.indexOf(want) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ------------------------------ Lightbox ------------------------------ */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbArt = lightbox.querySelector("[data-lightbox-art]");
    var lbCap = lightbox.querySelector("figcaption");
    var lastFocus = null;

    var openLightbox = function (shot) {
      var art = shot.querySelector("img, svg");
      var cap = shot.querySelector("figcaption");
      if (!art) return;
      lastFocus = shot;
      lbArt.innerHTML = art.outerHTML;
      lbCap.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    };
    var closeLightbox = function () {
      lightbox.classList.remove("open");
      lbArt.innerHTML = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll(".shot").forEach(function (shot) {
      shot.addEventListener("click", function () { openLightbox(shot); });
    });
    lightbox.addEventListener("click", function (ev) {
      if (ev.target === lightbox || ev.target.closest(".lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ------------------- Forms: front-end confirmation -------------------- */
  /* The tour form only claims to have sent something when it actually has.
     Put a form service URL in data-endpoint and it POSTs there and reports
     what came back; leave it empty and it says it is not connected and sends
     the visitor to the phone, rather than inventing a confirmation nobody
     will act on. See creekside-haven/README.md. */
  /* Analytics events. Page views arrive on their own; these are the two things
     that actually count as a lead here, and neither is a page view: the tour
     form being accepted, and somebody tapping the phone number. Without the
     second, phone leads are invisible and a listing that only produces calls
     looks like a listing that produced nothing.

     Guarded, because gtag is absent if the tag is blocked or removed, and a
     missing analytics call must never break a form. */
  function track(name, params) {
    if (typeof window.gtag === "function") { window.gtag("event", name, params || {}); }
  }

  /* Listening on pointerdown rather than click, because tapping a tel: link
     hands the page to the dialer and an event fired on click can be lost in
     that handoff -- the one case where the tap matters most. pointerdown runs
     before any navigation starts. The dedupe stops the click that follows the
     same press from counting twice, and transport_type beacon asks the browser
     to deliver the request even if the page goes away mid-flight. */
  var lastTel = 0;
  function telDown(e) {
    var tel = e.target && e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!tel) { return; }
    var now = Date.now();
    if (now - lastTel < 1000) { return; }
    lastTel = now;
    track("phone_click", {
      link_url: tel.getAttribute("href"),
      transport_type: "beacon"
    });
  }
  document.addEventListener("pointerdown", telDown);
  /* Fallback for anything without pointer events. */
  document.addEventListener("click", telDown);

  document.querySelectorAll("form[data-tour-form]").forEach(function (form) {
    var ok = form.querySelector(".form-success");
    var fail = form.querySelector(".form-error");
    var offline = form.querySelector(".form-offline");

    function show(el) {
      [ok, fail, offline].forEach(function (n) { if (n) n.classList.remove("show"); });
      if (!el) return;
      el.classList.add("show");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) { show(offline); return; }

      var btn = form.querySelector("button[type='submit']");
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending\u2026"; }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        /* A 200 is not the same as a send. Form services answer 200 with
           {"success": false} when an endpoint is not activated yet or the
           submission was rejected, so the body gets a look before anyone is
           told their request went through. */
        return res.json().catch(function () { return null; }).then(function (data) {
          var refused = data && (data.success === false || data.success === "false" ||
                                 data.ok === false || data.error);
          if (!res.ok || refused) throw new Error("rejected");
          show(ok);
          /* After the body check, so this counts delivered requests rather
             than attempts: a refused submission returns 200 too. */
          track("tour_request", { form_id: form.getAttribute("id") || "tour-form" });
          form.reset();
        });
      }).catch(function () {
        show(fail);
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
      });
    });
  });

  /* ------------- Prefill the plan select from a ?plan= param ------------ */
  var planParam = new URLSearchParams(window.location.search).get("plan");
  if (planParam) {
    document.querySelectorAll("select[name='plan']").forEach(function (sel) {
      Array.prototype.forEach.call(sel.options, function (opt) {
        if (opt.value.toLowerCase() === planParam.toLowerCase()) sel.value = opt.value;
      });
    });
  }
})();
