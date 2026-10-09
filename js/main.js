(function () {
  var t = document.getElementById("mob-toggle");
  var d = document.getElementById("mob-drawer");
  var o = document.getElementById("mob-overlay");
  var c = document.getElementById("drawer-close");
  function openDrawer() {
    d.removeAttribute("hidden");
    o.classList.add("visible");
    t.setAttribute("aria-expanded", "true");
    t.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.style.overflow = "hidden";
  }
  function closeDrawer() {
    d.setAttribute("hidden", "");
    o.classList.remove("visible");
    t.setAttribute("aria-expanded", "false");
    t.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.style.overflow = "";
  }
  if (t && d && o) {
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (c) { c.addEventListener("click", closeDrawer); }
    o.addEventListener("click", closeDrawer);
    d.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
  }
  document.querySelectorAll(".faq-q").forEach(function (b) {
    b.addEventListener("click", function () {
      var item = b.parentElement;
      var open = item.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  (function () {
    var out = document.getElementById("calc-out");
    if (!out) { return; }
    var people = document.getElementById("calc-people");
    var hard = document.getElementById("calc-hard");
    var custom = document.getElementById("calc-custom");
    var cap = document.getElementById("calc-cap");
    function update() {
      var p = parseFloat(people.value);
      var h = parseFloat(custom.value);
      if (isNaN(h) || h <= 0) { h = parseFloat(hard.value); }
      var c = parseFloat(cap.value);
      if (isNaN(p) || p < 1 || isNaN(h) || h <= 0 || isNaN(c) || c <= 0) {
        out.textContent = "Enter the number of people and a hardness value to see a result.";
        return;
      }
      var grains = p * 82 * h;
      var days = c / grains;
      out.textContent = p + " people at " + h + " grains per gallon remove about " + Math.round(grains).toLocaleString("en-US") + " grains a day, so a " + Math.round(c).toLocaleString("en-US") + " grain softener runs about " + (Math.round(days * 10) / 10) + " days between regenerations.";
    }
    [people, hard, custom, cap].forEach(function (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });
    update();
  })();
})();
