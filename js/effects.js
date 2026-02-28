/* ================================================================
   Kid Tick — Effects  (confetti, star bursts, sounds)
   ================================================================ */

/* eslint-disable no-unused-vars */
var Effects = (function () {
  'use strict';

  /* ── Web Audio beep helper ──────────────────────── */
  var audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { /* audio not supported */ }
    }
    return audioCtx;
  }

  function playTone(freq, duration, type, vol) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.value = vol || 0.08;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.2));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + (duration || 0.2));
    } catch (e) { /* ignore audio errors */ }
  }

  /* ── Sound effects ──────────────────────────────── */
  function soundTick() {
    playTone(880, 0.1, 'sine', 0.06);
  }

  function soundUntick() {
    playTone(440, 0.08, 'sine', 0.04);
  }

  function soundComplete() {
    // Little fanfare: three ascending notes
    var ctx = getAudioCtx();
    if (!ctx) return;
    var notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach(function (f, i) {
      setTimeout(function () { playTone(f, 0.2, 'sine', 0.07); }, i * 120);
    });
  }

  function soundAllDone() {
    // Bigger fanfare
    var ctx = getAudioCtx();
    if (!ctx) return;
    var notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach(function (f, i) {
      setTimeout(function () { playTone(f, 0.3, 'triangle', 0.08); }, i * 150);
    });
  }

  function soundTimerTick() {
    playTone(660, 0.05, 'sine', 0.03);
  }

  function soundTimerDone() {
    var notes = [784, 988, 784, 988]; // G5 B5 repeat
    notes.forEach(function (f, i) {
      setTimeout(function () { playTone(f, 0.15, 'sine', 0.06); }, i * 100);
    });
  }

  /* ── Star burst ─────────────────────────────────── */
  function burstStars(card) {
    var rect = card.getBoundingClientRect();
    var cx = rect.right - 30;
    var cy = rect.top + rect.height / 2;

    var burst = document.createElement('div');
    burst.className = 'star-burst';
    burst.style.left = cx + 'px';
    burst.style.top = cy + 'px';

    var symbols = ['⭐', '✨', '🌟'];
    for (var i = 0; i < 6; i++) {
      var p = document.createElement('span');
      p.className = 'star-particle';
      p.textContent = symbols[i % symbols.length];
      var angle = (Math.PI * 2 * i) / 6;
      var dist = 40 + Math.random() * 30;
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      burst.appendChild(p);
    }

    document.body.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 800);
  }

  /* ── Confetti ───────────────────────────────────── */
  function launchConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var ctx2 = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var pieces = [];
    var colors = ['#6C63FF','#FF6B9D','#FFD93D','#6BCB77','#4FC3F7','#FFB347'];

    for (var i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: 2 + Math.random() * 4,
        vx: -1.5 + Math.random() * 3,
        rot: Math.random() * 360,
        rv: -3 + Math.random() * 6,
      });
    }

    var frame = 0;
    function draw() {
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      pieces.forEach(function (p) {
        if (p.y > canvas.height + 20) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rot += p.rv;
        ctx2.save();
        ctx2.translate(p.x, p.y);
        ctx2.rotate((p.rot * Math.PI) / 180);
        ctx2.fillStyle = p.color;
        ctx2.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx2.restore();
      });
      frame++;
      if (alive && frame < 300) requestAnimationFrame(draw);
      else ctx2.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
  }

  /* ── Timer ──────────────────────────────────────── */
  var _timerId = null;
  var _timerCallback = null;

  function startTimer(seconds, onTick, onDone) {
    stopTimer();
    var remaining = seconds;
    _timerCallback = onTick;
    if (onTick) onTick(remaining);

    _timerId = setInterval(function () {
      remaining--;
      if (remaining <= 3 && remaining > 0) soundTimerTick();
      if (onTick) onTick(remaining);
      if (remaining <= 0) {
        stopTimer();
        soundTimerDone();
        if (onDone) onDone();
      }
    }, 1000);
  }

  function stopTimer() {
    if (_timerId) {
      clearInterval(_timerId);
      _timerId = null;
    }
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  /* ── Public API ─────────────────────────────────── */
  return {
    burstStars: burstStars,
    launchConfetti: launchConfetti,
    soundTick: soundTick,
    soundUntick: soundUntick,
    soundComplete: soundComplete,
    soundAllDone: soundAllDone,
    startTimer: startTimer,
    stopTimer: stopTimer,
    formatTime: formatTime,
  };
})();
