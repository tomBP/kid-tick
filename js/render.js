/* ================================================================
   Kid Tick — Render  (DOM rendering for every view)
   ================================================================
   Depends on: ROUTINES, Store, Effects
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

  /* ──────────────────────────────────────────────────
     WELCOME / PROFILE SETUP VIEW
     ────────────────────────────────────────────────── */
  function renderWelcome(container, onSave) {
    container.innerHTML = '';
    var wrap = el('div', 'welcome-view fade-in');

    wrap.innerHTML =
      '<h2>Welcome to Kid Tick!</h2>' +
      '<p class="welcome-sub">Let\'s set up a profile for your little one</p>' +
      '<div class="setup-section">' +
        '<label>Child\'s name</label>' +
        '<input class="setup-input" id="setup-name" type="text" placeholder="e.g. Emma" maxlength="20" autocomplete="off">' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>Age</label>' +
        '<div class="age-picker" id="setup-age"></div>' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>Pick an avatar</label>' +
        '<div class="avatar-picker" id="setup-avatar"></div>' +
      '</div>' +
      '<div style="text-align:center;margin-top:24px">' +
        '<button class="btn-primary" id="setup-save" disabled>Let\'s Go!</button>' +
      '</div>';

    container.appendChild(wrap);

    // Age buttons
    var agePicker = document.getElementById('setup-age');
    var selectedAge = null;
    for (var a = 1; a <= 5; a++) {
      (function (age) {
        var btn = el('button', 'age-option');
        btn.innerHTML = '<span class="age-num">' + age + '</span><span class="age-label">' + ROUTINES.AGE_LABELS[age] + '</span>';
        btn.addEventListener('click', function () {
          agePicker.querySelectorAll('.age-option').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          selectedAge = age;
          checkReady();
        });
        agePicker.appendChild(btn);
      })(a);
    }

    // Avatar buttons
    var avatarPicker = document.getElementById('setup-avatar');
    var selectedAvatar = null;
    ROUTINES.AVATARS.forEach(function (av) {
      var btn = el('button', 'avatar-option', av);
      btn.addEventListener('click', function () {
        avatarPicker.querySelectorAll('.avatar-option').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        selectedAvatar = av;
        checkReady();
      });
      avatarPicker.appendChild(btn);
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
      var chip = el('button', 'profile-chip' + (p.id === activeId ? ' active' : ''));
      chip.innerHTML =
        '<span class="chip-avatar">' + p.avatar + '</span>' +
        '<span>' + p.name + '</span>' +
        '<span class="chip-age">' + p.age + 'y</span>';
      chip.addEventListener('click', function () { onSwitch(p.id); });
      container.appendChild(chip);
    });

    if (profiles.length < 6) {
      var addBtn = el('button', 'add-profile-chip', '+');
      addBtn.title = 'Add child';
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
      container.innerHTML =
        '<span class="streak-fire">🔥</span>' +
        '<span><span class="streak-num">' + streak + '</span> day' + (streak > 1 ? 's' : '') + ' in a row!</span>';
    } else {
      container.classList.add('hidden');
    }
  }

  /* ──────────────────────────────────────────────────
     DAILY TIP
     ────────────────────────────────────────────────── */
  function renderTip(container, age) {
    var tips = ROUTINES.TIPS[age] || ROUTINES.TIPS[5];
    // Pick a "random" tip based on the day (stable for the day)
    var dayIndex = new Date().getDate() % tips.length;
    container.innerHTML = '<span class="tip-icon">💡</span> ' + tips[dayIndex];
  }

  /* ──────────────────────────────────────────────────
     GREETING
     ────────────────────────────────────────────────── */
  function renderGreeting(greetingEl, profile) {
    var h = new Date().getHours();
    var name = profile ? profile.name : 'superstar';
    if (h < 12)      greetingEl.textContent = 'Good morning, ' + name + '!';
    else if (h < 17) greetingEl.textContent = 'Good afternoon, ' + name + '!';
    else             greetingEl.textContent = 'Good evening, ' + name + '!';
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

    // Motivational text
    var textEl = document.getElementById('progress-text');
    if (textEl) {
      var msg = '';
      for (var i = 0; i < ROUTINES.MOTIVATIONS.length; i++) {
        var m = ROUTINES.MOTIVATIONS[i];
        if (pct <= m.max) { msg = m.text; break; }
      }
      textEl.textContent = msg;
    }

    // Celebration
    var celebEl = document.getElementById('celebration');
    if (celebEl) {
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
        '<span class="task-text">' + task.text + timerLabel + '</span>' +
        '<span class="task-check"></span>';

      function handleToggle() {
        // If the task has a timer and is being checked, open the timer
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
      '<h2>' + profile.avatar + ' ' + profile.name + '\'s Stickers</h2>' +
      '<p>Earn stickers by completing routines!</p>';
    container.appendChild(header);

    // Stats
    var stats = el('div', 'sticker-stats');
    var morningCount = stickers.filter(function (s) { return s.type === 'morning'; }).length;
    var afternoonCount = stickers.filter(function (s) { return s.type === 'afternoon'; }).length;
    var eveningCount = stickers.filter(function (s) { return s.type === 'evening'; }).length;
    var allDayCount = stickers.filter(function (s) { return s.type === 'allDay'; }).length;

    stats.innerHTML =
      '<div class="sticker-stat"><div class="stat-num">' + morningCount + '</div><div class="stat-label">🌅 Morning</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + afternoonCount + '</div><div class="stat-label">☀️ Afternoon</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + eveningCount + '</div><div class="stat-label">🌙 Evening</div></div>' +
      '<div class="sticker-stat"><div class="stat-num">' + allDayCount + '</div><div class="stat-label">🏆 Full Day</div></div>';
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

    var header = el('div', 'weekly-header');
    header.innerHTML =
      '<h2>📅 This Week</h2>' +
      '<p>' + profile.name + '\'s weekly progress</p>';
    container.appendChild(header);

    // Week grid
    var grid = el('div', 'week-grid');
    week.forEach(function (day) {
      var dayEl = el('div', 'week-day' + (day.isToday ? ' today' : '') + (day.isFuture ? ' future' : ''));
      var emojiForDay = '';
      if (!day.isFuture) {
        if (day.pct >= 1) emojiForDay = '🌟';
        else if (day.pct >= 0.5) emojiForDay = '👍';
        else if (day.pct > 0) emojiForDay = '🌱';
        else emojiForDay = '·';
      }

      // Small progress ring per day
      var smallCircum = 2 * Math.PI * 13;
      var smallOffset = smallCircum * (1 - day.pct);
      var ringColor = day.pct >= 1 ? '#6BCB77' : day.pct >= 0.5 ? '#FFD93D' : day.pct > 0 ? '#FFB347' : '#EDE9FE';

      dayEl.innerHTML =
        '<div class="day-name">' + day.dayName + '</div>' +
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
      '<h3>Weekly Summary</h3>' +
      '<div class="summary-row"><span class="label">Tasks completed</span><span class="value">' + totalWeekDone + ' / ' + totalWeekTasks + '</span></div>' +
      '<div class="summary-row"><span class="label">Completion rate</span><span class="value">' + weekPct + '%</span></div>' +
      '<div class="summary-row"><span class="label">Perfect days</span><span class="value">' + perfectDays + ' ⭐</span></div>' +
      '<div class="summary-row"><span class="label">Current streak</span><span class="value">' + streak + ' 🔥</span></div>';
    container.appendChild(summary);
  }

  /* ──────────────────────────────────────────────────
     SETTINGS VIEW
     ────────────────────────────────────────────────── */
  function renderSettings(container, profile, callbacks) {
    container.innerHTML = '';

    var header = el('div', 'settings-header');
    header.innerHTML = '<h2>⚙️ Settings</h2>';
    container.appendChild(header);

    // Current profile card
    if (profile) {
      var pe = el('div', 'profile-editor');
      pe.innerHTML =
        '<div class="profile-editor-header">' +
          '<span class="pe-avatar">' + profile.avatar + '</span>' +
          '<div class="pe-info">' +
            '<div class="pe-name">' + profile.name + '</div>' +
            '<div class="pe-age">Age ' + profile.age + ' · ' + ROUTINES.AGE_LABELS[profile.age] + '</div>' +
          '</div>' +
        '</div>';

      // Edit profile button
      var editBtn = el('button', 'btn-secondary', '✏️ Edit Profile');
      editBtn.style.width = '100%';
      editBtn.style.marginBottom = '8px';
      editBtn.addEventListener('click', function () { callbacks.onEditProfile(); });
      pe.appendChild(editBtn);

      // Delete profile (only if more than 1)
      if (Store.getProfiles().length > 1) {
        var delBtn = el('button', 'btn-danger', '🗑️ Remove Profile');
        delBtn.style.width = '100%';
        delBtn.addEventListener('click', function () {
          if (confirm('Remove ' + profile.name + '\'s profile? This cannot be undone.')) {
            callbacks.onDeleteProfile(profile.id);
          }
        });
        pe.appendChild(delBtn);
      }
      container.appendChild(pe);
    }

    // Theme picker
    var themeGroup = el('div', 'settings-group');
    themeGroup.innerHTML = '<div class="settings-group-title">Theme</div>';
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
      customGroup.innerHTML = '<div class="settings-group-title">Custom Tasks</div>';
      var editor = el('div', 'custom-tasks-editor');
      renderCustomTasksEditor(editor, profile, callbacks);
      customGroup.appendChild(editor);
      container.appendChild(customGroup);
    }

    // Danger zone
    var dangerGroup = el('div', 'settings-group');
    dangerGroup.innerHTML = '<div class="settings-group-title">Data</div>';
    var dangerCard = el('div', 'settings-card');

    var resetRow = el('div', 'settings-row');
    resetRow.innerHTML =
      '<span class="row-icon">🔄</span>' +
      '<span class="row-text">Reset today\'s progress</span>' +
      '<span class="row-arrow">›</span>';
    resetRow.addEventListener('click', function () {
      if (confirm('Reset all tasks for today?')) {
        callbacks.onResetDay();
      }
    });
    dangerCard.appendChild(resetRow);

    var clearRow = el('div', 'settings-row');
    clearRow.innerHTML =
      '<span class="row-icon">⚠️</span>' +
      '<span class="row-text">Clear all data</span>' +
      '<span class="row-arrow">›</span>';
    clearRow.addEventListener('click', function () {
      if (confirm('Delete ALL profiles and data? This cannot be undone.')) {
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
      { key: 'morning',   label: '🌅 Morning',   emoji: '⭐' },
      { key: 'afternoon', label: '☀️ Afternoon', emoji: '🎨' },
      { key: 'evening',   label: '🌙 Evening',   emoji: '🌟' },
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

      // Add new task row
      var addRow = el('div', 'add-task-row');
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Add a ' + sec.key + ' task…';
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
      '<div class="timer-task">' + task.text + '</div>' +
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
      '<h3>Edit Profile</h3>' +
      '<div class="setup-section">' +
        '<label>Name</label>' +
        '<input class="setup-input" id="edit-name" type="text" value="' + profile.name + '" maxlength="20">' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>Age</label>' +
        '<div class="age-picker" id="edit-age"></div>' +
      '</div>' +
      '<div class="setup-section">' +
        '<label>Avatar</label>' +
        '<div class="avatar-picker" id="edit-avatar"></div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:20px">' +
        '<button class="btn-secondary modal-close" id="edit-cancel">Cancel</button>' +
        '<button class="btn-primary" id="edit-save" style="flex:1">Save</button>' +
      '</div>';
    overlay.appendChild(sheet);

    // Age
    var agePicker = document.getElementById('edit-age');
    var selectedAge = profile.age;
    for (var a = 1; a <= 5; a++) {
      (function (age) {
        var btn = el('button', 'age-option' + (age === selectedAge ? ' selected' : ''));
        btn.innerHTML = '<span class="age-num">' + age + '</span><span class="age-label">' + ROUTINES.AGE_LABELS[age] + '</span>';
        btn.addEventListener('click', function () {
          agePicker.querySelectorAll('.age-option').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          selectedAge = age;
        });
        agePicker.appendChild(btn);
      })(a);
    }

    // Avatar
    var avatarPicker = document.getElementById('edit-avatar');
    var selectedAvatar = profile.avatar;
    ROUTINES.AVATARS.forEach(function (av) {
      var btn = el('button', 'avatar-option' + (av === selectedAvatar ? ' selected' : ''), av);
      btn.addEventListener('click', function () {
        avatarPicker.querySelectorAll('.avatar-option').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        selectedAvatar = av;
      });
      avatarPicker.appendChild(btn);
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
    CIRCUMFERENCE: CIRCUMFERENCE,
  };
})();
