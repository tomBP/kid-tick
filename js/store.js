/* ================================================================
   Kid Tick — Store  (localStorage-backed state management)
   ================================================================
   All persistent data lives under the "kidtick" key in localStorage.
   The store is the single source of truth — mutate through methods.
   ================================================================ */

/* eslint-disable no-unused-vars */
var Store = (function () {
  'use strict';

  var STORAGE_KEY = 'kidtick';

  /* ── Helpers ────────────────────────────────────── */
  function uuid() {
    return ('xxxx-xxxx').replace(/x/g, function () {
      return ((Math.random() * 16) | 0).toString(16);
    });
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function dayKey(profileId, date) {
    return profileId + ':' + (date || todayStr());
  }

  /* ── Default shape ──────────────────────────────── */
  function defaultData() {
    return {
      profiles: [],
      activeProfileId: null,
      days: {},       // { "profileId:2026-02-28": { tasks: {}, stickers: [] } }
      stickers: {},   // { profileId: [ { emoji, type, date } ] }
      customTasks: {},// { profileId: { morning:[], afternoon:[], evening:[] } }
      theme: 'default',
      language: 'en', // 'en' | 'es' | 'ca'
    };
  }

  /* ── Persistence ────────────────────────────────── */
  var _data;

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      _data = raw ? JSON.parse(raw) : defaultData();
    } catch (e) {
      _data = defaultData();
    }
    // Ensure all keys exist (migration safety)
    var def = defaultData();
    for (var k in def) {
      if (_data[k] === undefined) _data[k] = def[k];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_data));
    } catch (e) { /* quota errors etc — fine for POC */ }
  }

  load(); // init

  /* ── Profiles ───────────────────────────────────── */
  function getProfiles()  { return _data.profiles; }
  function getActiveId()  { return _data.activeProfileId; }

  function getActiveProfile() {
    return _data.profiles.find(function (p) { return p.id === _data.activeProfileId; }) || null;
  }

  function addProfile(name, age, avatar) {
    var id = uuid();
    _data.profiles.push({ id: id, name: name, age: age, avatar: avatar });
    _data.activeProfileId = id;
    _data.stickers[id] = [];
    _data.customTasks[id] = { morning: [], afternoon: [], evening: [] };
    save();
    return id;
  }

  function setActiveProfile(id) {
    _data.activeProfileId = id;
    save();
  }

  function updateProfile(id, updates) {
    var p = _data.profiles.find(function (x) { return x.id === id; });
    if (p) {
      for (var k in updates) p[k] = updates[k];
      save();
    }
  }

  function deleteProfile(id) {
    _data.profiles = _data.profiles.filter(function (p) { return p.id !== id; });
    // Clean up related data
    delete _data.stickers[id];
    delete _data.customTasks[id];
    // Remove day entries for this profile
    var prefix = id + ':';
    for (var k in _data.days) {
      if (k.indexOf(prefix) === 0) delete _data.days[k];
    }
    // Reset active profile
    if (_data.activeProfileId === id) {
      _data.activeProfileId = _data.profiles.length ? _data.profiles[0].id : null;
    }
    save();
  }

  /* ── Day progress ───────────────────────────────── */
  function getDayData(profileId, date) {
    var key = dayKey(profileId, date);
    if (!_data.days[key]) {
      _data.days[key] = { tasks: {}, stickers: [] };
    }
    return _data.days[key];
  }

  function isTaskDone(profileId, taskId, date) {
    return !!getDayData(profileId, date).tasks[taskId];
  }

  function setTaskDone(profileId, taskId, done, date) {
    getDayData(profileId, date).tasks[taskId] = !!done;
    save();
  }

  function toggleTask(profileId, taskId, date) {
    var day = getDayData(profileId, date);
    day.tasks[taskId] = !day.tasks[taskId];
    save();
    return day.tasks[taskId];
  }

  function resetDay(profileId, date) {
    var key = dayKey(profileId, date);
    _data.days[key] = { tasks: {}, stickers: [] };
    save();
  }

  function getCompletionCount(profileId, allTasks, date) {
    var day = getDayData(profileId, date);
    var done = 0;
    allTasks.forEach(function (t) {
      if (day.tasks[t.id]) done++;
    });
    return done;
  }

  function getSectionCompletion(profileId, tasks, date) {
    var day = getDayData(profileId, date);
    var done = 0;
    tasks.forEach(function (t) { if (day.tasks[t.id]) done++; });
    return { done: done, total: tasks.length, complete: done === tasks.length };
  }

  /* ── Stickers ───────────────────────────────────── */
  function getStickers(profileId) {
    return _data.stickers[profileId] || [];
  }

  function addSticker(profileId, emoji, type, date) {
    if (!_data.stickers[profileId]) _data.stickers[profileId] = [];
    _data.stickers[profileId].push({ emoji: emoji, type: type, date: date || todayStr() });
    // Also store on the day entry
    getDayData(profileId, date).stickers.push(emoji);
    save();
  }

  function hasStickerForSection(profileId, type, date) {
    var stickers = _data.stickers[profileId] || [];
    var d = date || todayStr();
    return stickers.some(function (s) { return s.type === type && s.date === d; });
  }

  /* ── Streaks ────────────────────────────────────── */
  function getStreak(profileId, allTasks) {
    var streak = 0;
    var d = new Date();
    // Start from yesterday (today might still be in progress)
    d.setDate(d.getDate() - 1);
    while (true) {
      var ds = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      var key = dayKey(profileId, ds);
      var dayData = _data.days[key];
      if (!dayData) break;
      var allDone = allTasks.every(function (t) { return dayData.tasks[t.id]; });
      if (!allDone) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    // Check if today is also fully done — if so add 1
    var todayData = _data.days[dayKey(profileId, todayStr())];
    if (todayData) {
      var todayDone = allTasks.every(function (t) { return todayData.tasks[t.id]; });
      if (todayDone) streak++;
    }
    return streak;
  }

  /* ── Weekly data ────────────────────────────────── */
  function getWeekData(profileId, allTasks) {
    var today = new Date();
    var day = today.getDay(); // 0 = Sunday
    var monday = new Date(today);
    monday.setDate(today.getDate() - ((day + 6) % 7));
    var week = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(monday);
      d.setDate(monday.getDate() + i);
      var ds = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      var done = getCompletionCount(profileId, allTasks, ds);
      week.push({
        date: ds,
        dayName: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],
        dayNum: d.getDate(),
        done: done,
        total: allTasks.length,
        pct: allTasks.length ? done / allTasks.length : 0,
        isToday: ds === todayStr(),
        isFuture: d > today && ds !== todayStr(),
      });
    }
    return week;
  }

  /* ── Custom tasks ───────────────────────────────── */
  function getCustomTasks(profileId) {
    return _data.customTasks[profileId] || { morning: [], afternoon: [], evening: [] };
  }

  function addCustomTask(profileId, section, emoji, text) {
    if (!_data.customTasks[profileId]) {
      _data.customTasks[profileId] = { morning: [], afternoon: [], evening: [] };
    }
    var id = 'c' + uuid();
    _data.customTasks[profileId][section].push({ id: id, emoji: emoji, text: text });
    save();
    return id;
  }

  function removeCustomTask(profileId, section, taskId) {
    if (!_data.customTasks[profileId]) return;
    _data.customTasks[profileId][section] = _data.customTasks[profileId][section]
      .filter(function (t) { return t.id !== taskId; });
    save();
  }

  /* ── Theme ──────────────────────────────────────── */
  function getTheme() { return _data.theme || 'default'; }

  function setTheme(themeId) {
    _data.theme = themeId;
    save();
  }

  /* ── Language ─────────────────────────────────────── */
  function getLanguage() { return _data.language || 'en'; }

  function setLanguage(lang) {
    _data.language = lang;
    save();
  }

  /* ── Full reset ─────────────────────────────────── */
  function resetAll() {
    _data = defaultData();
    save();
  }

  /* ── Utility ────────────────────────────────────── */
  function todayString() { return todayStr(); }

  /* ── Build the effective task list (base + custom) ── */
  function getEffectiveTasks(profileId, age) {
    var ageKey = age === 'adult' ? 'adult' : age;
    var base = ROUTINES.forAge(ageKey);
    var custom = getCustomTasks(profileId);
    return {
      morning:   base.morning.concat(custom.morning),
      afternoon: base.afternoon.concat(custom.afternoon),
      evening:   base.evening.concat(custom.evening),
    };
  }

  function getAllEffectiveTasks(profileId, age) {
    var eff = getEffectiveTasks(profileId, age);
    return eff.morning.concat(eff.afternoon, eff.evening);
  }

  /* ── Public API ─────────────────────────────────── */
  return {
    // Profiles
    getProfiles: getProfiles,
    getActiveId: getActiveId,
    getActiveProfile: getActiveProfile,
    addProfile: addProfile,
    setActiveProfile: setActiveProfile,
    updateProfile: updateProfile,
    deleteProfile: deleteProfile,

    // Day progress
    getDayData: getDayData,
    isTaskDone: isTaskDone,
    setTaskDone: setTaskDone,
    toggleTask: toggleTask,
    resetDay: resetDay,
    getCompletionCount: getCompletionCount,
    getSectionCompletion: getSectionCompletion,

    // Stickers
    getStickers: getStickers,
    addSticker: addSticker,
    hasStickerForSection: hasStickerForSection,

    // Streaks & weekly
    getStreak: getStreak,
    getWeekData: getWeekData,

    // Custom tasks
    getCustomTasks: getCustomTasks,
    addCustomTask: addCustomTask,
    removeCustomTask: removeCustomTask,

    // Theme
    getTheme: getTheme,
    setTheme: setTheme,

    // Language
    getLanguage: getLanguage,
    setLanguage: setLanguage,

    // Effective tasks
    getEffectiveTasks: getEffectiveTasks,
    getAllEffectiveTasks: getAllEffectiveTasks,

    // Utility
    todayString: todayString,
    resetAll: resetAll,
  };
})();
