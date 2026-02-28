/* ================================================================
   Kid Tick — Render  (DOM rendering for every view)
   ================================================================
   Depends on: ROUTINES, Store, Effects, I18n
   ================================================================ */

/* eslint-disable no-unused-vars */
var Render = (function () {
  'use strict';

  var CIRCUMFERENCE = 2 * Math.PI * 54; // progress ring r=54

  /* ── Helpers ────────────────────────────────────── */
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /** Build age picker buttons (1–5 + adult) */
  function buildAgePicker(container, selectedAge, onSelect) {
    // Kid ages 1-5
    for (var a = 1; a <= 5; a++) {
      (function (age) {
        var btn = el('button', 'age-option' + (age === selectedAge ? ' selected' : ''));
        btn.innerHTML = '<span class="age-num">' + age + '</span><span class="age-label">' + I18n.ageLabel(age) + '</span>';
        btn.addEventListener('click', function () {
          container.querySelectorAll('.age-option').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          onSelect(age);
        });
        container.appendChild(btn);
      })(a);
    }
    // Adult option
    var adultBtn = el('button', 'age-option age-option-adult' + (selectedAge === 'adult' ? ' selected' : ''));
    adultBtn.innerHTML = '<span class="age-num">👤</span><span class="age-label">' + I18n.ageLabel('adult') + '</span>';
    adultBtn.addEventListener('click', function () {
      container.querySelectorAll('.age-option').forEach(function (b) { b.classList.remove('selected'); });
      adultBtn.classList.add('selected');
      onSelect('adult');
    });
    container.appendChild(adultBtn);
  }

  /** Build avatar picker buttons */
  function buildAvatarPicker(container, selectedAvatar, onSelect) {
    ROUTINES.AVATARS.forEach(function (av) {
      var label = ROUTINES.AVATAR_LABELS[av];
      var isFeatured = !!label;
      var btn = el('button', 'avatar-option' + (av === selectedAvatar ? ' selected' : '') + (isFeatured ? ' featured' : ''));
      btn.innerHTML = av;
      if (isFeatured) {
        btn.innerHTML += '<span class="avatar-label">' + I18n.t(label) + '</span>';
      }
      btn.addEventListener('click', function () {
        container.querySelectorAll('.avatar-option').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        onSelect(av);
      });
      container.appendChild(btn);
    });
  }

  /* ──────────────────────────────────────────────────
     WELCOME / PROFILE SETUP VIEW
     ────────────────────────────────────────────────── */
  function renderWelcome(container, onSave) {
    container.innerHTML = '';
    var wrap = el('div', 'welcome-view fade-in');

    wrap.innerHTML =
      '<h2>' + I18n.t('welcome.title') + '</h2>' +
      '<p class="welcome-sub">' + I18n.t('welcome.sub') + '</p>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('welcome.name') + '</label>' +
        '<input class="setup-input" id="setup-name" type="text" placeholder="' + I18n.t('welcome.name.placeholder') + '" maxlength="20" autocomplete="off">' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('welcome.age') + '</label>' +
        '<div class="age-picker age-picker-with-adult" id="setup-age"></div>' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('welcome.avatar') + '</label>' +
        '<div class="avatar-picker" id="setup-avatar"></div>' +
      '</div>' +
      '<div style="text-align:center;margin-top:24px">' +
        '<button class="btn-primary" id="setup-save" disabled>' + I18n.t('welcome.go') + '</button>' +
      '</div>';

    container.appendChild(wrap);

    // Age buttons
    var agePicker = document.getElementById('setup-age');
    var selectedAge = null;
    buildAgePicker(agePicker, null, function (age) {
      selectedAge = age;
      checkReady();
    });

    // Avatar buttons
    var avatarPicker = document.getElementById('setup-avatar');
    var selectedAvatar = null;
    buildAvatarPicker(avatarPicker, null, function (av) {
      selectedAvatar = av;
      checkReady();
    });

    var saveBtn = document.getElementById('setup-save');
    var nameInput = document.getElementById('setup-name');

    function checkReady() {
      saveBtn.disabled = !(nameInput.value.trim() && selectedAge && selectedAvatar);
    }
    nameInput.addEventListener('input', checkReady);

    saveBtn.addEventListener('click', function () {
      if (nameInput.value.trim() && selectedAge && selectedAvatar) {
        onSave(nameInput.value.trim(), selectedAge, selectedAvatar);
      }
    });
  }

  /* ──────────────────────────────────────────────────
     PROFILE SWITCHER
     ────────────────────────────────────────────────── */
  function renderProfileSwitcher(container, onSwitch, onAdd) {
    container.innerHTML = '';
    var profiles = Store.getProfiles();
    var activeId = Store.getActiveId();

    profiles.forEach(function (p) {
      var chip = el('button', 'profile-chip' + (p.id === activeId ? ' active' : '') + (p.age === 'adult' ? ' adult-chip' : ''));
      var ageText = p.age === 'adult' ? I18n.t('profile.adult') : I18n.t('profile.age', { age: p.age });
      chip.innerHTML =
        '<span class="chip-avatar">' + p.avatar + '</span>' +
        '<span>' + p.name + '</span>' +
        '<span class="chip-age">' + ageText + '</span>';
      chip.addEventListener('click', function () { onSwitch(p.id); });
      container.appendChild(chip);
    });

    if (profiles.length < 6) {
      var addBtn = el('button', 'add-profile-chip', '+');
      addBtn.title = I18n.t('profile.add');
      addBtn.addEventListener('click', onAdd);
      container.appendChild(addBtn);
    }
  }

  /* ──────────────────────────────────────────────────
     STREAK BANNER
     ────────────────────────────────────────────────── */
  function renderStreak(container, profile) {
    var allTasks = Store.getAllEffectiveTasks(profile.id, profile.age);
    var streak = Store.getStreak(profile.id, allTasks);
    if (streak > 0) {
      container.classList.remove('hidden');
      var streakWord = streak > 1 ? I18n.t('streak.plural') : I18n.t('streak.singular');
      container.innerHTML =
        '<span class="streak-fire">🔥</span>' +
        '<span><span class="streak-num">' + streak + '</span> ' + streakWord + '</span>';
    } else {
      container.classList.add('hidden');
    }
  }

  /* ──────────────────────────────────────────────────
     DAILY TIP
     ────────────────────────────────────────────────── */
  function renderTip(container, age) {
    var ageKey = age === 'adult' ? 'adult' : age;
    var tips = ROUTINES.TIPS[ageKey] || ROUTINES.TIPS[5];
    var dayIndex = new Date().getDate() % tips.length;
    container.innerHTML = '<span class="tip-icon">💡</span> ' + I18n.tipText(tips[dayIndex]);
  }

  /* ──────────────────────────────────────────────────
     GREETING
     ────────────────────────────────────────────────── */
  function renderGreeting(greetingEl, profile) {
    var h = new Date().getHours();
    var name = profile ? profile.name : 'superstar';
    if (h < 12)      greetingEl.textContent = I18n.t('greeting.morning', { name: name });
    else if (h < 17) greetingEl.textContent = I18n.t('greeting.afternoon', { name: name });
    else             greetingEl.textContent = I18n.t('greeting.evening', { name: name });
  }

  /* ──────────────────────────────────────────────────
     PROGRESS
     ────────────────────────────────────────────────── */
  function renderProgress(profile) {
    var allTasks = Store.getAllEffectiveTasks(profile.id, profile.age);
    var total = allTasks.length;
    var done = Store.getCompletionCount(profile.id, allTasks);
    var pct = total ? done / total : 0;

    // Ring
    var fill = $('.progress-ring__fill');
    if (fill) {
      var offset = CIRCUMFERENCE * (1 - pct);
      fill.style.strokeDashoffset = offset;
    }

    // Stars
    var starsEl = document.getElementById('progress-stars');
    if (starsEl) {
      var filled = Math.round(pct * 5);
      starsEl.textContent = '⭐'.repeat(filled) + '☆'.repeat(5 - filled);
    }

    // Count
    var countEl = document.getElementById('progress-count');
    if (countEl) countEl.textContent = done + ' / ' + total;

    // Motivational text (translated)
    var textEl = document.getElementById('progress-text');
    if (textEl) {
      var msg = '';
      var keys = ['progress.start', 'progress.25', 'progress.50', 'progress.75', 'progress.99', 'progress.100'];
      var maxes = [0, 0.25, 0.5, 0.75, 0.99, 1];
      for (var i = 0; i < maxes.length; i++) {
        if (pct <= maxes[i]) { msg = I18n.t(keys[i]); break; }
      }
      textEl.textContent = msg;
    }

    // Celebration
    var celebEl = document.getElementById('celebration');
    if (celebEl) {
      var celebEmoji = celebEl.querySelector('.big-emoji');
      var celebMsg = celebEl.querySelector('.msg');
      if (celebEmoji) celebEmoji.textContent = I18n.t('celebration.emoji');
      if (celebMsg) celebMsg.textContent = I18n.t('celebration.msg');
      if (done === total && total > 0) {
        celebEl.classList.add('show');
      } else {
        celebEl.classList.remove('show');
      }
    }

    return { done: done, total: total, pct: pct };
  }

  /* ──────────────────────────────────────────────────
     TAB BADGES (show completion per section)
     ────────────────────────────────────────────────── */
  function renderTabBadges(profile) {
    var routines = Store.getEffectiveTasks(profile.id, profile.age);
    var sections = ['morning', 'afternoon', 'evening'];
    sections.forEach(function (sec) {
      var tab = document.querySelector('[data-tab="' + sec + '"]');
      if (!tab) return;
      var comp = Store.getSectionCompletion(profile.id, routines[sec]);
      var badge = tab.querySelector('.tab-badge');
      if (!badge) {
        badge = el('span', 'tab-badge');
        tab.appendChild(badge);
      }
      if (comp.done > 0) {
        badge.textContent = comp.done + '/' + comp.total;
        badge.style.display = '';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  /* ──────────────────────────────────────────────────
     UPDATE TAB LABELS (for language switching)
     ────────────────────────────────────────────────── */
  function updateTabLabels() {
    var tabKeys = { morning: 'tab.morning', afternoon: 'tab.afternoon', evening: 'tab.evening' };
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      var tab = btn.dataset.tab;
      if (tab && tabKeys[tab]) {
        // Preserve badge
        var badge = btn.querySelector('.tab-badge');
        btn.textContent = I18n.t(tabKeys[tab]);
        if (badge) btn.appendChild(badge);
      }
    });
  }

  /* ──────────────────────────────────────────────────
     UPDATE NAV LABELS (for language switching)
     ────────────────────────────────────────────────── */
  function updateNavLabels() {
    var navMap = { routine: 'nav.home', stickers: 'nav.stickers', weekly: 'nav.week', settings: 'nav.settings' };
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      var view = btn.dataset.view;
      if (view && navMap[view]) {
        var textSpan = btn.querySelector('.nav-text');
        if (textSpan) textSpan.textContent = I18n.t(navMap[view]);
      }
    });
  }

  /* ──────────────────────────────────────────────────
     TASK CARDS
     ────────────────────────────────────────────────── */
  function renderSection(sectionEl, tasks, profile, onToggle, onTimer) {
    sectionEl.innerHTML = '';
    tasks.forEach(function (task) {
      var isDone = Store.isTaskDone(profile.id, task.id);
      var card = el('div', 'task-card' + (isDone ? ' done' : ''));
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', String(isDone));
      card.setAttribute('tabindex', '0');
      card.dataset.id = task.id;

      var timerLabel = '';
      if (task.timer) {
        timerLabel = '<span class="task-timer-label">⏱ ' + Effects.formatTime(task.timer) + '</span>';
      }

      card.innerHTML =
        '<span class="task-emoji">' + task.emoji + '</span>' +
        '<span class="task-text">' + I18n.taskText(task) + timerLabel + '</span>' +
        '<span class="task-check"></span>';

      function handleToggle() {
        if (!isDone && task.timer && onTimer) {
          onTimer(task, card);
        } else {
          onToggle(task, card);
        }
      }

      card.addEventListener('click', handleToggle);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      });

      sectionEl.appendChild(card);
    });
  }

  /* ──────────────────────────────────────────────────
     STICKERS VIEW
     ────────────────────────────────────────────────── */
  function renderStickers(container, profile) {
    container.innerHTML = '';
    var stickers = Store.getStickers(profile.id);

    var header = el('div', 'stickers-header');
    header.innerHTML =
      '<h2>' + profile.avatar + ' ' + profile.name + I18n.t('stickers.title') + '</h2>' +
      '<p>' + I18n.t('stickers.sub') + '</p>';
    container.appendChild(header);

    // Stats
    var stats = el('div', 'sticker-stats');
    var morningCount = stickers.filter(function (s) { return s.type === 'morning'; }).length;
    var afternoonCount = stickers.filter(function (s) { return s.type === 'afternoon'; }).length;
    var eveningCount = stickers.filter(function (s) { return s.type === 'evening'; }).length;
    var allDayCount = stickers.filter(function (s) { return s.type === 'allDay'; }).length;

    stats.innerHTML =
      '<div class="sticker-stat"><div class="stat-num">' + morningCount + '</div><div class="stat-label">' + I18n.t('stickers.morning') + '</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + afternoonCount + '</div><div class="stat-label">' + I18n.t('stickers.afternoon') + '</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + eveningCount + '</div><div class="stat-label">' + I18n.t('stickers.evening') + '</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + allDayCount + '</div><div class="stat-label">' + I18n.t('stickers.allday') + '</div></div>';
    container.appendChild(stats);

    // Grid of stickers
    var grid = el('div', 'sticker-grid');
    var totalSlots = Math.max(20, stickers.length);
    for (var i = 0; i < totalSlots; i++) {
      var cell = el('div', 'sticker-cell');
      if (stickers[i]) {
        cell.textContent = stickers[i].emoji;
        cell.title = stickers[i].type + ' — ' + stickers[i].date;
      } else {
        cell.classList.add('empty');
      }
      grid.appendChild(cell);
    }
    container.appendChild(grid);
  }

  /* ──────────────────────────────────────────────────
     WEEKLY VIEW
     ────────────────────────────────────────────────── */
  function renderWeekly(container, profile) {
    container.innerHTML = '';
    var allTasks = Store.getAllEffectiveTasks(profile.id, profile.age);
    var week = Store.getWeekData(profile.id, allTasks);
    var streak = Store.getStreak(profile.id, allTasks);
    var dayNames = I18n.t('weekly.days').split(',');

    var header = el('div', 'weekly-header');
    header.innerHTML =
      '<h2>' + I18n.t('weekly.title') + '</h2>' +
      '<p>' + profile.name + I18n.t('weekly.sub') + '</p>';
    container.appendChild(header);

    // Week grid
    var grid = el('div', 'week-grid');
    week.forEach(function (day, idx) {
      var dayEl = el('div', 'week-day' + (day.isToday ? ' today' : '') + (day.isFuture ? ' future' : ''));
      var emojiForDay = '';
      if (!day.isFuture) {
        if (day.pct >= 1) emojiForDay = '🌟';
        else if (day.pct >= 0.5) emojiForDay = '👍';
        else if (day.pct > 0) emojiForDay = '🌱';
        else emojiForDay = '·';
      }

      var smallCircum = 2 * Math.PI * 13;
      var smallOffset = smallCircum * (1 - day.pct);
      var ringColor = day.pct >= 1 ? '#6BCB77' : day.pct >= 0.5 ? '#FFD93D' : day.pct > 0 ? '#FFB347' : '#EDE9FE';

      dayEl.innerHTML =
        '<div class="day-name">' + dayNames[idx] + '</div>' +
        '<div class="day-num">' + day.dayNum + '</div>' +
        '<svg class="day-ring" viewBox="0 0 32 32">' +
          '<circle cx="16" cy="16" r="13" fill="none" stroke="#EDE9FE" stroke-width="3"/>' +
          '<circle cx="16" cy="16" r="13" fill="none" stroke="' + ringColor + '" stroke-width="3" stroke-linecap="round" ' +
            'stroke-dasharray="' + smallCircum.toFixed(1) + '" stroke-dashoffset="' + smallOffset.toFixed(1) + '" ' +
            'transform="rotate(-90 16 16)"/>' +
        '</svg>' +
        '<div class="day-emoji">' + emojiForDay + '</div>';
      grid.appendChild(dayEl);
    });
    container.appendChild(grid);

    // Summary card
    var summary = el('div', 'weekly-summary');
    var totalWeekTasks = 0, totalWeekDone = 0, perfectDays = 0;
    week.forEach(function (day) {
      if (!day.isFuture) {
        totalWeekTasks += day.total;
        totalWeekDone += day.done;
        if (day.pct >= 1) perfectDays++;
      }
    });
    var weekPct = totalWeekTasks ? Math.round((totalWeekDone / totalWeekTasks) * 100) : 0;

    summary.innerHTML =
      '<h3>' + I18n.t('weekly.summary') + '</h3>' +
      '<div class="summary-row"><span class="label">' + I18n.t('weekly.completed') + '</span><span class="value">' + totalWeekDone + ' / ' + totalWeekTasks + '</span></div>' +
      '<div class="summary-row"><span class="label">' + I18n.t('weekly.rate') + '</span><span class="value">' + weekPct + '%</span></div>' +
      '<div class="summary-row"><span class="label">' + I18n.t('weekly.perfect') + '</span><span class="value">' + perfectDays + ' ⭐</span></div>' +
      '<div class="summary-row"><span class="label">' + I18n.t('weekly.streak') + '</span><span class="value">' + streak + ' 🔥</span></div>';
    container.appendChild(summary);
  }

  /* ──────────────────────────────────────────────────
     SETTINGS VIEW
     ────────────────────────────────────────────────── */
  function renderSettings(container, profile, callbacks) {
    container.innerHTML = '';

    var header = el('div', 'settings-header');
    header.innerHTML = '<h2>' + I18n.t('settings.title') + '</h2>';
    container.appendChild(header);

    // Current profile card
    if (profile) {
      var pe = el('div', 'profile-editor');
      var ageDisplay = profile.age === 'adult'
        ? I18n.t('age.adult')
        : 'Age ' + profile.age + ' · ' + I18n.ageLabel(profile.age);
      pe.innerHTML =
        '<div class="profile-editor-header">' +
          '<span class="pe-avatar">' + profile.avatar + '</span>' +
          '<div class="pe-info">' +
            '<div class="pe-name">' + profile.name + '</div>' +
            '<div class="pe-age">' + ageDisplay + '</div>' +
          '</div>' +
        '</div>';

      var editBtn = el('button', 'btn-secondary', I18n.t('settings.edit'));
      editBtn.style.width = '100%';
      editBtn.style.marginBottom = '8px';
      editBtn.addEventListener('click', function () { callbacks.onEditProfile(); });
      pe.appendChild(editBtn);

      if (Store.getProfiles().length > 1) {
        var delBtn = el('button', 'btn-danger', I18n.t('settings.remove'));
        delBtn.style.width = '100%';
        delBtn.addEventListener('click', function () {
          if (confirm(I18n.t('settings.remove.confirm', { name: profile.name }))) {
            callbacks.onDeleteProfile(profile.id);
          }
        });
        pe.appendChild(delBtn);
      }
      container.appendChild(pe);
    }

    // Language picker
    var langGroup = el('div', 'settings-group');
    langGroup.innerHTML = '<div class="settings-group-title">' + I18n.t('settings.language') + '</div>';
    var langPicker = el('div', 'language-picker');
    var currentLang = I18n.getLang();

    I18n.LANGUAGES.forEach(function (lang) {
      var opt = el('button', 'lang-option' + (lang.code === currentLang ? ' selected' : ''));
      opt.innerHTML =
        '<span class="lang-flag">' + lang.flag + '</span>' +
        '<span class="lang-name">' + lang.name + '</span>';
      opt.addEventListener('click', function () {
        callbacks.onLanguageChange(lang.code);
      });
      langPicker.appendChild(opt);
    });
    langGroup.appendChild(langPicker);
    container.appendChild(langGroup);

    // Theme picker
    var themeGroup = el('div', 'settings-group');
    themeGroup.innerHTML = '<div class="settings-group-title">' + I18n.t('settings.theme') + '</div>';
    var themePicker = el('div', 'theme-picker');
    var currentTheme = Store.getTheme();

    ROUTINES.THEMES.forEach(function (theme) {
      var opt = el('button', 'theme-option' + (theme.id === currentTheme ? ' selected' : ''));
      opt.innerHTML =
        '<div class="theme-swatch" style="background:' + theme.color + '"></div>' +
        '<span class="theme-name">' + theme.name + '</span>';
      opt.addEventListener('click', function () {
        callbacks.onThemeChange(theme.id);
      });
      themePicker.appendChild(opt);
    });
    themeGroup.appendChild(themePicker);
    container.appendChild(themeGroup);

    // Custom tasks
    if (profile) {
      var customGroup = el('div', 'settings-group');
      customGroup.innerHTML = '<div class="settings-group-title">' + I18n.t('settings.custom') + '</div>';
      var editor = el('div', 'custom-tasks-editor');
      renderCustomTasksEditor(editor, profile, callbacks);
      customGroup.appendChild(editor);
      container.appendChild(customGroup);
    }

    // Danger zone
    var dangerGroup = el('div', 'settings-group');
    dangerGroup.innerHTML = '<div class="settings-group-title">' + I18n.t('settings.data') + '</div>';
    var dangerCard = el('div', 'settings-card');

    var resetRow = el('div', 'settings-row');
    resetRow.innerHTML =
      '<span class="row-icon">🔄</span>' +
      '<span class="row-text">' + I18n.t('settings.resetday') + '</span>' +
      '<span class="row-arrow">›</span>';
    resetRow.addEventListener('click', function () {
      if (confirm(I18n.t('reset.confirm'))) {
        callbacks.onResetDay();
      }
    });
    dangerCard.appendChild(resetRow);

    var clearRow = el('div', 'settings-row');
    clearRow.innerHTML =
      '<span class="row-icon">⚠️</span>' +
      '<span class="row-text">' + I18n.t('settings.clearall') + '</span>' +
      '<span class="row-arrow">›</span>';
    clearRow.addEventListener('click', function () {
      if (confirm(I18n.t('settings.clearall.confirm'))) {
        callbacks.onResetAll();
      }
    });
    dangerCard.appendChild(clearRow);

    dangerGroup.appendChild(dangerCard);
    container.appendChild(dangerGroup);
  }

  /* ── Custom Tasks Editor ────────────────────────── */
  function renderCustomTasksEditor(container, profile, callbacks) {
    container.innerHTML = '';
    var custom = Store.getCustomTasks(profile.id);
    var sections = [
      { key: 'morning',   label: I18n.t('tab.morning'),   emoji: '⭐' },
      { key: 'afternoon', label: I18n.t('tab.afternoon'), emoji: '🎨' },
      { key: 'evening',   label: I18n.t('tab.evening'),   emoji: '🌟' },
    ];

    sections.forEach(function (sec) {
      var secDiv = el('div', 'custom-task-section');
      secDiv.innerHTML = '<h4>' + sec.label + '</h4>';

      var tasks = custom[sec.key] || [];
      tasks.forEach(function (task) {
        var item = el('div', 'custom-task-item');
        item.innerHTML =
          '<span class="ct-emoji">' + task.emoji + '</span>' +
          '<span class="ct-text">' + task.text + '</span>';
        var removeBtn = el('button', 'ct-remove', '×');
        removeBtn.addEventListener('click', function () {
          Store.removeCustomTask(profile.id, sec.key, task.id);
          renderCustomTasksEditor(container, profile, callbacks);
          callbacks.onTasksChanged();
        });
        item.appendChild(removeBtn);
        secDiv.appendChild(item);
      });

      var addRow = el('div', 'add-task-row');
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = I18n.t('settings.addtask', { section: sec.key });
      input.maxLength = 40;
      var addBtn = el('button', '', '+ Add');
      addBtn.addEventListener('click', function () {
        var text = input.value.trim();
        if (text) {
          Store.addCustomTask(profile.id, sec.key, sec.emoji, text);
          input.value = '';
          renderCustomTasksEditor(container, profile, callbacks);
          callbacks.onTasksChanged();
        }
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') addBtn.click();
      });
      addRow.appendChild(input);
      addRow.appendChild(addBtn);
      secDiv.appendChild(addRow);

      container.appendChild(secDiv);
    });
  }

  /* ──────────────────────────────────────────────────
     TIMER OVERLAY
     ────────────────────────────────────────────────── */
  function renderTimerOverlay(overlay, task, onComplete, onSkip) {
    overlay.innerHTML = '';
    overlay.classList.add('active');

    var box = el('div', 'timer-box');
    box.innerHTML =
      '<div class="timer-emoji">' + task.emoji + '</div>' +
      '<div class="timer-task">' + I18n.taskText(task) + '</div>' +
      '<div class="timer-display" id="timer-display">' + Effects.formatTime(task.timer) + '</div>' +
      '<div class="timer-label">Timer</div>' +
      '<div class="timer-actions">' +
        '<button class="timer-start-btn" id="timer-start">▶ Start</button>' +
        '<button class="timer-skip-btn" id="timer-skip">Skip</button>' +
      '</div>' +
      '<div class="timer-done-msg" id="timer-done-msg" style="display:none">Done! Great job! ✅</div>';

    overlay.appendChild(box);

    var display = document.getElementById('timer-display');
    var startBtn = document.getElementById('timer-start');
    var skipBtn = document.getElementById('timer-skip');
    var doneMsg = document.getElementById('timer-done-msg');
    var started = false;

    startBtn.addEventListener('click', function () {
      if (started) return;
      started = true;
      startBtn.style.display = 'none';
      Effects.startTimer(
        task.timer,
        function (remaining) {
          display.textContent = Effects.formatTime(remaining);
        },
        function () {
          doneMsg.style.display = '';
          skipBtn.textContent = 'Done!';
          skipBtn.className = 'timer-start-btn';
          skipBtn.onclick = function () {
            overlay.classList.remove('active');
            onComplete();
          };
        }
      );
    });

    skipBtn.addEventListener('click', function () {
      Effects.stopTimer();
      overlay.classList.remove('active');
      onSkip();
    });
  }

  /* ──────────────────────────────────────────────────
     EDIT PROFILE MODAL
     ────────────────────────────────────────────────── */
  function renderEditProfile(overlay, profile, onSave, onClose) {
    overlay.innerHTML = '';
    overlay.classList.add('active');

    var sheet = el('div', 'modal-sheet');
    sheet.innerHTML =
      '<h3>' + I18n.t('edit.title') + '</h3>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('edit.name') + '</label>' +
        '<input class="setup-input" id="edit-name" type="text" value="' + profile.name + '" maxlength="20">' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('edit.age') + '</label>' +
        '<div class="age-picker age-picker-with-adult" id="edit-age"></div>' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>' + I18n.t('edit.avatar') + '</label>' +
        '<div class="avatar-picker" id="edit-avatar"></div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:20px">' +
        '<button class="btn-secondary modal-close" id="edit-cancel">' + I18n.t('edit.cancel') + '</button>' +
        '<button class="btn-primary" id="edit-save" style="flex:1">' + I18n.t('edit.save') + '</button>' +
      '</div>';
    overlay.appendChild(sheet);

    // Age
    var agePicker = document.getElementById('edit-age');
    var selectedAge = profile.age;
    buildAgePicker(agePicker, selectedAge, function (age) {
      selectedAge = age;
    });

    // Avatar
    var avatarPicker = document.getElementById('edit-avatar');
    var selectedAvatar = profile.avatar;
    buildAvatarPicker(avatarPicker, selectedAvatar, function (av) {
      selectedAvatar = av;
    });

    document.getElementById('edit-save').addEventListener('click', function () {
      var name = document.getElementById('edit-name').value.trim();
      if (name) {
        overlay.classList.remove('active');
        onSave({ name: name, age: selectedAge, avatar: selectedAvatar });
      }
    });

    document.getElementById('edit-cancel').addEventListener('click', function () {
      overlay.classList.remove('active');
      onClose();
    });
  }

  /* ── Public API ─────────────────────────────────── */
  return {
    renderWelcome: renderWelcome,
    renderProfileSwitcher: renderProfileSwitcher,
    renderStreak: renderStreak,
    renderTip: renderTip,
    renderGreeting: renderGreeting,
    renderProgress: renderProgress,
    renderTabBadges: renderTabBadges,
    renderSection: renderSection,
    renderStickers: renderStickers,
    renderWeekly: renderWeekly,
    renderSettings: renderSettings,
    renderTimerOverlay: renderTimerOverlay,
    renderEditProfile: renderEditProfile,
    updateTabLabels: updateTabLabels,
    updateNavLabels: updateNavLabels,
    CIRCUMFERENCE: CIRCUMFERENCE,
  };
})();
