/* ================================================================
   Kid Tick — Routine Data (Ages 1–5 + Adult)
   ================================================================
   Each age has morning / afternoon / evening task arrays.
   Tasks may include an optional `timer` (seconds) for timed activities.
   ================================================================ */

/* eslint-disable no-unused-vars */
var ROUTINES = (function () {
  'use strict';

  /* ── Age 1  (Baby / Toddler) ──────────────────── */
  var age1 = {
    morning: [
      { id: 'm1', emoji: '😃', text: 'Good morning wake-up!' },
      { id: 'm2', emoji: '🍼', text: 'Milk / breakfast time' },
      { id: 'm3', emoji: '👶', text: 'Nappy change' },
      { id: 'm4', emoji: '👕', text: 'Get dressed' },
      { id: 'm5', emoji: '🧸', text: 'Play time' },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍌', text: 'Lunch time' },
      { id: 'a2', emoji: '😴', text: 'Nap time' },
      { id: 'a3', emoji: '🍎', text: 'Snack time' },
      { id: 'a4', emoji: '🌳', text: 'Outside time' },
    ],
    evening: [
      { id: 'e1', emoji: '🍽️', text: 'Dinner time' },
      { id: 'e2', emoji: '🛁', text: 'Bath time' },
      { id: 'e3', emoji: '👶', text: 'Nappy change' },
      { id: 'e4', emoji: '👔', text: 'Pyjamas on' },
      { id: 'e5', emoji: '📖', text: 'Story time' },
      { id: 'e6', emoji: '😴', text: 'Night-night!' },
    ],
  };

  /* ── Age 2  (Toddler) ─────────────────────────── */
  var age2 = {
    morning: [
      { id: 'm1', emoji: '😃', text: 'Good morning!' },
      { id: 'm2', emoji: '🚽', text: 'Potty / nappy' },
      { id: 'm3', emoji: '🫧', text: 'Wash hands' },
      { id: 'm4', emoji: '👕', text: 'Get dressed' },
      { id: 'm5', emoji: '🥣', text: 'Eat breakfast' },
      { id: 'm6', emoji: '🧸', text: 'Free play' },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍌', text: 'Eat lunch' },
      { id: 'a2', emoji: '😴', text: 'Nap time' },
      { id: 'a3', emoji: '🍎', text: 'Healthy snack' },
      { id: 'a4', emoji: '🌳', text: 'Play outside' },
      { id: 'a5', emoji: '🧹', text: 'Pick up toys' },
    ],
    evening: [
      { id: 'e1', emoji: '🍽️', text: 'Dinner time' },
      { id: 'e2', emoji: '🛁', text: 'Bath time' },
      { id: 'e3', emoji: '🪥', text: 'Brush teeth', timer: 60 },
      { id: 'e4', emoji: '👔', text: 'Pyjamas on' },
      { id: 'e5', emoji: '📖', text: 'Story time' },
      { id: 'e6', emoji: '😴', text: 'Bedtime' },
    ],
  };

  /* ── Age 3  (Pre-school) ──────────────────────── */
  var age3 = {
    morning: [
      { id: 'm1', emoji: '😃', text: 'Wake up happy' },
      { id: 'm2', emoji: '🚽', text: 'Use the potty' },
      { id: 'm3', emoji: '🫧', text: 'Wash hands & face' },
      { id: 'm4', emoji: '🪥', text: 'Brush teeth (with help)', timer: 90 },
      { id: 'm5', emoji: '👕', text: 'Get dressed' },
      { id: 'm6', emoji: '🥣', text: 'Eat breakfast' },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍌', text: 'Eat lunch' },
      { id: 'a2', emoji: '😴', text: 'Quiet time / nap' },
      { id: 'a3', emoji: '🍎', text: 'Healthy snack' },
      { id: 'a4', emoji: '🌳', text: 'Play outside' },
      { id: 'a5', emoji: '🎨', text: 'Art or creative play' },
      { id: 'a6', emoji: '🧹', text: 'Tidy up toys' },
    ],
    evening: [
      { id: 'e1', emoji: '🍽️', text: 'Help with dinner' },
      { id: 'e2', emoji: '🍽️', text: 'Eat dinner' },
      { id: 'e3', emoji: '🛁', text: 'Bath or shower' },
      { id: 'e4', emoji: '🪥', text: 'Brush teeth', timer: 90 },
      { id: 'e5', emoji: '👔', text: 'Put on pyjamas' },
      { id: 'e6', emoji: '📖', text: 'Story time' },
      { id: 'e7', emoji: '😴', text: 'Lights out — goodnight!' },
    ],
  };

  /* ── Age 4  (Pre-K) ───────────────────────────── */
  var age4 = {
    morning: [
      { id: 'm1', emoji: '🛏️', text: 'Make my bed (with help)' },
      { id: 'm2', emoji: '🚽', text: 'Use the bathroom' },
      { id: 'm3', emoji: '😊', text: 'Wash my face' },
      { id: 'm4', emoji: '🪥', text: 'Brush my teeth', timer: 120 },
      { id: 'm5', emoji: '👕', text: 'Get dressed' },
      { id: 'm6', emoji: '🥣', text: 'Eat breakfast' },
      { id: 'm7', emoji: '🎒', text: 'Pack my bag' },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍎', text: 'Eat a healthy snack' },
      { id: 'a2', emoji: '📚', text: 'Learning activity' },
      { id: 'a3', emoji: '🧹', text: 'Tidy my space' },
      { id: 'a4', emoji: '🚴', text: 'Play outside' },
      { id: 'a5', emoji: '📖', text: 'Read or be read to' },
      { id: 'a6', emoji: '🎨', text: 'Creative time' },
    ],
    evening: [
      { id: 'e1', emoji: '🍽️', text: 'Help with dinner' },
      { id: 'e2', emoji: '🍽️', text: 'Eat dinner' },
      { id: 'e3', emoji: '🛁', text: 'Bath or shower' },
      { id: 'e4', emoji: '🪥', text: 'Brush my teeth', timer: 120 },
      { id: 'e5', emoji: '👔', text: 'Put on pyjamas' },
      { id: 'e6', emoji: '📖', text: 'Story time' },
      { id: 'e7', emoji: '😴', text: 'Lights out — goodnight!' },
    ],
  };

  /* ── Age 5  (Kindergarten) ─────────────────────── */
  var age5 = {
    morning: [
      { id: 'm1', emoji: '🛏️', text: 'Make my bed' },
      { id: 'm2', emoji: '🪥', text: 'Brush my teeth', timer: 120 },
      { id: 'm3', emoji: '😊', text: 'Wash my face' },
      { id: 'm4', emoji: '👕', text: 'Get dressed' },
      { id: 'm5', emoji: '🥣', text: 'Eat breakfast' },
      { id: 'm6', emoji: '🎒', text: 'Pack my bag' },
      { id: 'm7', emoji: '🌤️', text: 'Check the weather' },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍎', text: 'Eat a healthy snack' },
      { id: 'a2', emoji: '📚', text: 'Do my homework' },
      { id: 'a3', emoji: '🧹', text: 'Tidy my space' },
      { id: 'a4', emoji: '🚴', text: 'Play outside or exercise' },
      { id: 'a5', emoji: '📖', text: 'Read for 15 minutes', timer: 900 },
    ],
    evening: [
      { id: 'e1', emoji: '🍽️', text: 'Help with dinner' },
      { id: 'e2', emoji: '🛁', text: 'Take a bath or shower' },
      { id: 'e3', emoji: '🪥', text: 'Brush my teeth', timer: 120 },
      { id: 'e4', emoji: '👔', text: 'Put on pyjamas' },
      { id: 'e5', emoji: '📖', text: 'Story time' },
      { id: 'e6', emoji: '😴', text: 'Lights out — goodnight!' },
    ],
  };

  /* ── Adult (Parent) ────────────────────────────── */
  var ageAdult = {
    morning: [
      { id: 'm1', emoji: '⏰', text: 'Wake up & get moving' },
      { id: 'm2', emoji: '☕', text: 'Coffee / tea' },
      { id: 'm3', emoji: '🏃', text: 'Exercise or stretch' },
      { id: 'm4', emoji: '🚿', text: 'Shower' },
      { id: 'm5', emoji: '🥣', text: 'Eat breakfast' },
      { id: 'm6', emoji: '📋', text: "Review today's schedule" },
      { id: 'm7', emoji: '🎒', text: "Prep kids' stuff" },
    ],
    afternoon: [
      { id: 'a1', emoji: '🍽️', text: 'Lunch' },
      { id: 'a2', emoji: '🏠', text: 'Household chores' },
      { id: 'a3', emoji: '🛒', text: 'Errands & shopping' },
      { id: 'a4', emoji: '🍎', text: 'Prep snack for kids' },
      { id: 'a5', emoji: '🍳', text: 'Prep dinner' },
    ],
    evening: [
      { id: 'e1', emoji: '👨‍👩‍👧‍👦', text: 'Family dinner' },
      { id: 'e2', emoji: '🧒', text: "Kids' bedtime routine" },
      { id: 'e3', emoji: '🧹', text: 'Tidy up the house' },
      { id: 'e4', emoji: '🧘', text: 'Personal time' },
      { id: 'e5', emoji: '📝', text: 'Plan tomorrow' },
      { id: 'e6', emoji: '😴', text: 'Lights out — rest well' },
    ],
  };

  /* ── Lookup ────────────────────────────────────── */
  var byAge = { 1: age1, 2: age2, 3: age3, 4: age4, 5: age5, adult: ageAdult };

  /* ── Avatars for profile selection ──────────────── */
  /* 'hummingbird' and 'fawn' are special SVG-based avatars */
  var AVATARS = ['🦄','🦊','🐼','🦁','🐸','🐱','🐶','🦋','🐙','🦖','🐧','🐰','hummingbird','fawn'];

  /* ── SVG definitions for custom avatars ─────────── */
  var AVATAR_SVGS = {
    hummingbird: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="18" cy="17" rx="6" ry="8" fill="#00BCD4" transform="rotate(-10,18,17)"/>' +
      '<ellipse cx="15" cy="14" rx="3.5" ry="4" fill="#E91E63" opacity="0.75"/>' +
      '<circle cx="14" cy="11" r="4.5" fill="#00ACC1"/>' +
      '<circle cx="13" cy="10" r="1.5" fill="#263238"/>' +
      '<circle cx="12.5" cy="9.5" r="0.5" fill="white"/>' +
      '<line x1="10" y1="12" x2="3" y2="14" stroke="#546E7A" stroke-width="1.5" stroke-linecap="round"/>' +
      '<ellipse cx="24" cy="13" rx="8" ry="3" fill="#4DD0E1" opacity="0.8" transform="rotate(-25,24,13)"/>' +
      '<ellipse cx="25" cy="15" rx="7" ry="2.5" fill="#80DEEA" opacity="0.6" transform="rotate(-15,25,15)"/>' +
      '<path d="M22 24 Q24 30 20 32" stroke="#00BCD4" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 24 Q22 31 18 33" stroke="#00ACC1" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
      '</svg>',
    fawn: '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="18" cy="24" rx="8" ry="7" fill="#D7A86E"/>' +
      '<circle cx="14" cy="22" r="1.2" fill="#FFECD2" opacity="0.8"/>' +
      '<circle cx="20" cy="20" r="1" fill="#FFECD2" opacity="0.8"/>' +
      '<circle cx="17" cy="26" r="0.9" fill="#FFECD2" opacity="0.8"/>' +
      '<circle cx="22" cy="24" r="1.1" fill="#FFECD2" opacity="0.8"/>' +
      '<line x1="13" y1="30" x2="12" y2="35" stroke="#C49A6C" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="23" y1="30" x2="24" y2="35" stroke="#C49A6C" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="18" cy="12" r="6" fill="#D7A86E"/>' +
      '<ellipse cx="12" cy="7" rx="2.5" ry="4" fill="#C49A6C" transform="rotate(-20,12,7)"/>' +
      '<ellipse cx="12.5" cy="7.5" rx="1.5" ry="2.5" fill="#FFCCBC" transform="rotate(-20,12.5,7.5)"/>' +
      '<ellipse cx="24" cy="7" rx="2.5" ry="4" fill="#C49A6C" transform="rotate(20,24,7)"/>' +
      '<ellipse cx="23.5" cy="7.5" rx="1.5" ry="2.5" fill="#FFCCBC" transform="rotate(20,23.5,7.5)"/>' +
      '<circle cx="15.5" cy="11" r="2" fill="#3E2723"/>' +
      '<circle cx="20.5" cy="11" r="2" fill="#3E2723"/>' +
      '<circle cx="15" cy="10.5" r="0.7" fill="white"/>' +
      '<circle cx="20" cy="10.5" r="0.7" fill="white"/>' +
      '<ellipse cx="18" cy="14.5" rx="1.5" ry="1" fill="#5D4037"/>' +
      '<path d="M16.5 16 Q18 17 19.5 16" stroke="#5D4037" stroke-width="0.7" fill="none"/>' +
      '</svg>',
  };

  /** Return display HTML for any avatar (emoji string or SVG id) */
  function avatarHTML(avatar, sizePx) {
    if (AVATAR_SVGS[avatar]) {
      var s = sizePx || 36;
      return '<span class="svg-avatar" style="width:' + s + 'px;height:' + s + 'px;display:inline-block;vertical-align:middle;">' + AVATAR_SVGS[avatar] + '</span>';
    }
    return avatar; // plain emoji
  }

  /** Small thumbnail for the avatar picker */
  function avatarPickerHTML(avatar) {
    if (AVATAR_SVGS[avatar]) {
      return '<span class="svg-avatar" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">' + AVATAR_SVGS[avatar] + '</span>';
    }
    return avatar;
  }

  /* ── Sticker pools (earned as rewards) ──────────── */
  var STICKER_POOLS = {
    morning:   ['🌅','🌞','🌈','🌻','🐓','🥐','☀️','🍳'],
    afternoon: ['🌺','🎨','⚽','🦋','🎪','🎸','🏖️','🌼'],
    evening:   ['🌙','⭐','🌟','🦉','🧸','🎵','🌠','💫'],
    allDay:    ['🏆','👑','💎','🎖️','🥇','🎯','💪','🦸'],
  };

  /* ── Age labels (English, used as fallback) ─────── */
  var AGE_LABELS = {
    1: 'Baby',
    2: 'Toddler',
    3: 'Pre-school',
    4: 'Pre-K',
    5: 'School',
    adult: 'Parent',
  };

  /* ── Tips (per age) ─────────────────────────────── */
  var TIPS = {
    1: [
      'Routine helps babies feel safe and secure.',
      'Singing during nappy changes makes it fun!',
      'Tummy time builds strong muscles.',
      'Reading to babies boosts brain development.',
      'Let baby explore textures during play.',
    ],
    2: [
      'Toddlers love helping — let them try!',
      'Washing hands can be a splashy game.',
      'Praise effort, not just results.',
      'Outdoor play builds balance and coordination.',
      'Simple choices empower little ones: "Red shirt or blue?"',
    ],
    3: [
      'Brushing teeth for 90 seconds keeps cavities away!',
      'Art time builds fine motor skills.',
      'Tidying up teaches responsibility.',
      'Reading together builds a love of books.',
      'Playing outside for 30 min boosts mood and sleep.',
    ],
    4: [
      'Making the bed builds a sense of achievement.',
      'Helping with dinner teaches life skills.',
      'Creative play fuels imagination and problem-solving.',
      'Packing your own bag builds independence.',
      '2 minutes of brushing = a super smile!',
    ],
    5: [
      'Checking the weather teaches observation skills.',
      'Reading 15 min a day builds strong vocabulary.',
      'Homework time works best right after a snack.',
      'Exercise before dinner helps you sleep better.',
      'A tidy space means a tidy mind!',
    ],
    adult: [
      'Keeping a routine gives you more energy throughout the day.',
      '15 minutes of daily exercise can transform your mood.',
      'Planning the night before reduces morning stress.',
      'A little personal time each day is essential.',
      'Complete your tasks and set a great example for the kids!',
    ],
  };

  /* ── Motivational messages ──────────────────────── */
  var MOTIVATIONS = [
    { max: 0,    text: "Let's get started!" },
    { max: 0.25, text: 'Great start — keep going!' },
    { max: 0.5,  text: "You're doing awesome!" },
    { max: 0.75, text: 'More than halfway — wow!' },
    { max: 0.99, text: 'Almost there, superstar!' },
    { max: 1,    text: 'You did it! 🏆' },
  ];

  /* ── Theme definitions ──────────────────────────── */
  var THEMES = [
    { id: 'default', name: 'Magic',  color: '#6C63FF' },
    { id: 'ocean',   name: 'Ocean',  color: '#0891B2' },
    { id: 'forest',  name: 'Forest', color: '#16A34A' },
    { id: 'sunset',  name: 'Sunset', color: '#EA580C' },
    { id: 'space',   name: 'Space',  color: '#7C3AED' },
    { id: 'candy',   name: 'Candy',  color: '#EC4899' },
  ];

  /* ── Public API ─────────────────────────────────── */
  return {
    forAge: function (age) {
      return byAge[age] || byAge[5];
    },
    allTasksForAge: function (age) {
      var r = this.forAge(age);
      return r.morning.concat(r.afternoon, r.evening);
    },
    AVATARS: AVATARS,
    AVATAR_SVGS: AVATAR_SVGS,
    avatarHTML: avatarHTML,
    avatarPickerHTML: avatarPickerHTML,
    STICKER_POOLS: STICKER_POOLS,
    AGE_LABELS: AGE_LABELS,
    TIPS: TIPS,
    MOTIVATIONS: MOTIVATIONS,
    THEMES: THEMES,
  };
})();
