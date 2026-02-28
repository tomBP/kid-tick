/* ================================================================
   Kid Tick — App  (main orchestration & routing)
   ================================================================
   Depends on: ROUTINES, Store, Effects, Render, I18n
   ================================================================ */

(function () {
  'use strict';

  /* ── DOM references ─────────────────────────────── */
  var $app = document.querySelector('.app');

  // Views
  var $welcomeView  = document.getElementById('view-welcome');
  var $routineView  = document.getElementById('view-routine');
  var $stickersView = document.getElementById('view-stickers');
  var $weeklyView   = document.getElementById('view-weekly');
  var $settingsView = document.getElementById('view-settings');

  // Routine view elements
  var $greeting     = document.getElementById('greeting');
  var $profileBar   = document.getElementById('profile-switcher');
  var $streakBanner = document.getElementById('streak-banner');
  var $dailyTip     = document.getElementById('daily-tip');
  var $celebration  = document.getElementById('celebration');
  var $timerOverlay = document.getElementById('timer-overlay');
  var $modalOverlay = document.getElementById('modal-overlay');

  var $sectionMorning   = document.getElementById('section-morning');
  var $sectionAfternoon = document.getElementById('section-afternoon');
  var $sectionEvening   = document.getElementById('section-evening');

  /* ── State ──────────────────────────────────────── */
  var currentView = 'routine';
  var activeTab = 'morning';

  /* ── Apply theme ────────────────────────────────── */
  function applyTheme(themeId) {
    if (themeId === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    requestAnimationFrame(function () {
      var primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      var pink = getComputedStyle(document.documentElement).getPropertyValue('--accent-pink').trim();
      var stop0 = document.querySelector('#progressGradient stop:first-child');
      var stop1 = document.querySelector('#progressGradient stop:last-child');
      if (stop0 && primary) stop0.setAttribute('stop-color', primary);
      if (stop1 && pink) stop1.setAttribute('stop-color', pink);
    });
  }

  /* ── Navigation ─────────────────────────────────── */
  function showView(viewName) {
    currentView = viewName;
    var views = document.querySelectorAll('.view');
    views.forEach(function (v) { v.classList.remove('active'); });

    var target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Hide bottom nav on welcome if no profiles yet
    var nav = document.querySelector('.bottom-nav');
    if (nav) {
      nav.style.display = (viewName === 'welcome' && Store.getProfiles().length === 0) ? 'none' : '';
    }

    // Render the view
    var profile = Store.getActiveProfile();
    if (!profile) return;

    if (viewName === 'stickers') {
      Render.renderStickers($stickersView.querySelector('.view-content'), profile);
    } else if (viewName === 'weekly') {
      Render.renderWeekly($weeklyView.querySelector('.view-content'), profile);
    } else if (viewName === 'settings') {
      Render.renderSettings($settingsView.querySelector('.view-content'), profile, settingsCallbacks);
    }
  }

  /* ── Bottom nav setup ───────────────────────────── */
  function setupNav() {
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showView(btn.dataset.view);
      });
    });
  }

  /* ── Tab setup ──────────────────────────────────── */
  function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.routine-section').forEach(function (s) { s.classList.remove('active'); });
        btn.classList.add('active');
        activeTab = btn.dataset.tab;
        document.getElementById('section-' + activeTab).classList.add('active');
      });
    });
  }

  /* ── Auto-select tab based on time of day ──────── */
  function autoSelectTab() {
    var h = new Date().getHours();
    var tab;
    if (h < 12) tab = 'morning';
    else if (h < 17) tab = 'afternoon';
    else tab = 'evening';

    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.routine-section').forEach(function (s) { s.classList.remove('active'); });

    var tabBtn = document.querySelector('[data-tab="' + tab + '"]');
    if (tabBtn) tabBtn.classList.add('active');
    var section = document.getElementById('section-' + tab);
    if (section) section.classList.add('active');
    activeTab = tab;
  }

  /* ── Toggle task ────────────────────────────────── */
  function handleToggle(task, card) {
    var profile = Store.getActiveProfile();
    if (!profile) return;

    var newState = Store.toggleTask(profile.id, task.id);

    card.classList.toggle('done', newState);
    card.setAttribute('aria-checked', String(newState));

    card.classList.remove('pop');
    void card.offsetWidth;
    card.classList.add('pop');

    if (newState) {
      Effects.burstStars(card);
      Effects.soundTick();
    } else {
      Effects.soundUntick();
    }

    var result = Render.renderProgress(profile);
    Render.renderTabBadges(profile);
    Render.renderStreak($streakBanner, profile);

    checkAndAwardStickers(profile);

    if (result.done === result.total && result.total > 0) {
      Effects.soundAllDone();
      Effects.launchConfetti();
    }
  }

  /* ── Timer task ─────────────────────────────────── */
  function handleTimerTask(task, card) {
    Render.renderTimerOverlay(
      $timerOverlay,
      task,
      function () { handleToggle(task, card); },
      function () { handleToggle(task, card); }
    );
  }

  /* ── Sticker awards ─────────────────────────────── */
  function checkAndAwardStickers(profile) {
    var routines = Store.getEffectiveTasks(profile.id, profile.age);
    var sections = [
      { key: 'morning',   pool: ROUTINES.STICKER_POOLS.morning },
      { key: 'afternoon', pool: ROUTINES.STICKER_POOLS.afternoon },
      { key: 'evening',   pool: ROUTINES.STICKER_POOLS.evening },
    ];

    var allSectionsDone = true;
    sections.forEach(function (sec) {
      var comp = Store.getSectionCompletion(profile.id, routines[sec.key]);
      if (comp.complete && !Store.hasStickerForSection(profile.id, sec.key)) {
        var emoji = sec.pool[Math.floor(Math.random() * sec.pool.length)];
        Store.addSticker(profile.id, emoji, sec.key);
        Effects.soundComplete();
      }
      if (!comp.complete) allSectionsDone = false;
    });

    if (allSectionsDone && !Store.hasStickerForSection(profile.id, 'allDay')) {
      var pool = ROUTINES.STICKER_POOLS.allDay;
      var emoji = pool[Math.floor(Math.random() * pool.length)];
      Store.addSticker(profile.id, emoji, 'allDay');
    }
  }

  /* ── Render the full routine view ───────────────── */
  function renderRoutineView() {
    var profile = Store.getActiveProfile();
    if (!profile) return;

    var age = profile.age;
    var routines = Store.getEffectiveTasks(profile.id, age);

    // Age-based card sizing (young kids get bigger cards)
    var isYoung = (typeof age === 'number' && age <= 2);
    $app.classList.toggle('age-young', isYoung);

    Render.renderGreeting($greeting, profile);
    Render.renderProfileSwitcher($profileBar, handleProfileSwitch, handleAddProfile);
    Render.renderStreak($streakBanner, profile);
    Render.renderTip($dailyTip, age);
    Render.renderSection($sectionMorning, routines.morning, profile, handleToggle, handleTimerTask);
    Render.renderSection($sectionAfternoon, routines.afternoon, profile, handleToggle, handleTimerTask);
    Render.renderSection($sectionEvening, routines.evening, profile, handleToggle, handleTimerTask);
    Render.renderProgress(profile);
    Render.renderTabBadges(profile);
    Render.updateTabLabels();
  }

  /* ── Profile switching ──────────────────────────── */
  function handleProfileSwitch(id) {
    Store.setActiveProfile(id);
    renderRoutineView();
    if (currentView !== 'routine') showView(currentView);
  }

  function handleAddProfile() {
    showView('welcome');
    Render.renderWelcome($welcomeView.querySelector('.view-content'), function (name, age, avatar) {
      Store.addProfile(name, age, avatar);
      showView('routine');
      renderRoutineView();
    });
  }

  /* ── Refresh all translated labels ──────────────── */
  function refreshLabels() {
    Render.updateNavLabels();
    Render.updateTabLabels();
    // Update reset button text
    var resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.textContent = I18n.t('reset.btn') + ' 🔄';
  }

  /* ── Settings callbacks ─────────────────────────── */
  var settingsCallbacks = {
    onThemeChange: function (themeId) {
      Store.setTheme(themeId);
      applyTheme(themeId);
      var profile = Store.getActiveProfile();
      if (profile) {
        Render.renderSettings($settingsView.querySelector('.view-content'), profile, settingsCallbacks);
      }
    },
    onLanguageChange: function (langCode) {
      I18n.setLang(langCode);
      refreshLabels();
      var profile = Store.getActiveProfile();
      if (profile) {
        Render.renderSettings($settingsView.querySelector('.view-content'), profile, settingsCallbacks);
        renderRoutineView();
      }
    },
    onResetDay: function () {
      var profile = Store.getActiveProfile();
      if (profile) {
        Store.resetDay(profile.id);
        renderRoutineView();
        showView('routine');
      }
    },
    onResetAll: function () {
      Store.resetAll();
      boot();
    },
    onEditProfile: function () {
      var profile = Store.getActiveProfile();
      if (!profile) return;
      Render.renderEditProfile(
        $modalOverlay,
        profile,
        function (updates) {
          Store.updateProfile(profile.id, updates);
          renderRoutineView();
          showView('settings');
        },
        function () { /* cancelled */ }
      );
    },
    onDeleteProfile: function (id) {
      Store.deleteProfile(id);
      if (Store.getProfiles().length === 0) {
        boot();
      } else {
        renderRoutineView();
        showView('settings');
      }
    },
    onTasksChanged: function () {
      renderRoutineView();
    },
  };

  /* ── Reset button ───────────────────────────────── */
  function setupResetBtn() {
    var btn = document.getElementById('reset-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var profile = Store.getActiveProfile();
        if (profile) {
          Store.resetDay(profile.id);
          renderRoutineView();
        }
      });
    }
  }

  /* ── Boot ───────────────────────────────────────── */
  function boot() {
    applyTheme(Store.getTheme());
    setupNav();
    setupTabs();
    setupResetBtn();
    refreshLabels();

    var profiles = Store.getProfiles();
    if (profiles.length === 0) {
      showView('welcome');
      Render.renderWelcome($welcomeView.querySelector('.view-content'), function (name, age, avatar) {
        Store.addProfile(name, age, avatar);
        showView('routine');
        autoSelectTab();
        renderRoutineView();
      });
    } else {
      showView('routine');
      autoSelectTab();
      renderRoutineView();
    }
  }

  /* ── Kick off ───────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
