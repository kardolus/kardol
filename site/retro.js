/* kardol.us — 90s MODE decorator. Injects/removes the non-semantic Web-1.0 cruft
   when html.retro toggles. The real DOM is never modified; everything lives in a
   single #retro-layer that's added on and removed on off. Self-contained: no
   external assets, sound is WebAudio-synthesized and opt-in (click only). */
(function () {
  var ORIGINAL_TITLE = document.title;
  var RETRO_TITLE = "~~~* kardol.us HOMEPAGE ZONE *~~~";

  function hitCount() {
    var n = parseInt(localStorage.getItem("retro-hits") || "1336", 10);
    n += 1 + Math.floor(Math.random() * 3);
    localStorage.setItem("retro-hits", String(n));
    return String(n).padStart(6, "0");
  }

  function build() {
    var layer = document.createElement("div");
    layer.id = "retro-layer";
    layer.setAttribute("aria-hidden", "true");
    var badges = [
      ["BEST VIEWED IN<br>NETSCAPE", "#000080"],
      ["OPTIMIZED FOR<br>800 x 600", "#800000"],
      ["MADE WITH<br>NOTEPAD", "#006000"],
      ["VALID<br>HTML 3.2", "#606000"],
      ["Y2K<br>READY", "#600060"]
    ].map(function (b) {
      return '<span class="rl-badge" style="background:' + b[1] + '">' + b[0] + "</span>";
    }).join("");

    layer.innerHTML =
      '<marquee class="rl-marquee" scrollamount="8" behavior="scroll">' +
        "*** WELCOME TO MY HOMEPAGE *** BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 AT 800x600 " +
        "*** THANKS 4 VISITING *** DON’T FORGET TO SIGN MY GUESTBOOK *** " +
      "</marquee>" +
      '<div class="rl-status">Transferring data from users.aol.com/kardol/homepage_final_FINAL2.html … Done.</div>' +
      '<button class="rl-sound" type="button">♫ Play</button>' +
      '<div class="rl-footer">' +
        '<div class="rl-construction">🚧 UNDER CONSTRUCTION SINCE 1998 🚧</div>' +
        '<div class="rl-webring">[ &laquo; <a href="#">Prev</a> | The KARDOL WEBRING | <a href="#">Next</a> &raquo; ]</div>' +
        '<div class="rl-badges">' + badges + "</div>" +
        '<div>You are visitor <span class="rl-counter">' + hitCount() + "</span></div>" +
        '<a class="rl-guestbook" href="mailto:kardol@kardol.us?subject=Signing%20your%20guestbook!!!">✍ Sign my guestbook!!!</a>' +
      "</div>";
    document.body.appendChild(layer);

    layer.querySelector(".rl-sound").addEventListener("click", playSound);

    // one-shot "You've Got Mail!" that fades itself out
    var mail = document.createElement("div");
    mail.className = "rl-mail";
    mail.textContent = "📬 You've Got Mail!";
    layer.appendChild(mail);
    setTimeout(function () { mail.remove(); }, 2600);
  }

  // WebAudio: a short dial-up-ish handshake then a 3-note chime. Opt-in only.
  function playSound() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ac = new Ctx();
      var t = ac.currentTime;
      function tone(freq, start, dur, type, gain) {
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = type || "square"; o.frequency.value = freq;
        g.gain.setValueAtTime(gain || 0.12, t + start);
        g.gain.exponentialRampToValueAtTime(0.0001, t + start + dur);
        o.connect(g); g.connect(ac.destination); o.start(t + start); o.stop(t + start + dur);
      }
      // "dialing" DTMF-ish blips
      [941, 1336, 1209, 852, 1477, 697].forEach(function (f, i) { tone(f, i * 0.12, 0.1, "sine", 0.08); });
      // handshake screech (noise burst)
      var n = ac.createBufferSource();
      var buf = ac.createBuffer(1, ac.sampleRate * 1.1, ac.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
      n.buffer = buf;
      var ng = ac.createGain(); ng.gain.setValueAtTime(0.05, t + 0.8); ng.gain.exponentialRampToValueAtTime(0.0001, t + 1.9);
      n.connect(ng); ng.connect(ac.destination); n.start(t + 0.8); n.stop(t + 1.9);
      // "you've got mail" chime
      [523, 659, 784].forEach(function (f, i) { tone(f, 2.0 + i * 0.18, 0.3, "sine", 0.16); });
    } catch (e) { /* no audio, no problem */ }
  }

  window.applyRetro = function (on) {
    var btn = document.querySelector(".retro-toggle");
    if (btn) btn.textContent = on ? "« BACK TO 2026" : "90s";
    if (on) {
      document.title = RETRO_TITLE;
      if (!document.getElementById("retro-layer")) build();
    } else {
      document.title = ORIGINAL_TITLE;
      var l = document.getElementById("retro-layer");
      if (l) l.remove();
    }
  };

  // If the pre-paint script already turned retro on, inject now.
  if (document.documentElement.classList.contains("retro")) window.applyRetro(true);

  // Konami code → toggle retro (easter egg within the easter egg).
  var seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    pos = (e.key === seq[pos]) ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; if (window.toggleRetro) window.toggleRetro(); }
  });
})();
