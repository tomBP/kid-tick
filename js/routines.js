/* ================================================================
   Kid Tick — Routine Data (Ages 1–5)
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

  /* ── Adult / Parent ───────────────────────────────── */
  var adult = {
    morning: [
      { id: 'am1', emoji: '🌅', text: 'Wake up & stretch' },
      { id: 'am2', emoji: '🚿', text: 'Shower & get ready' },
      { id: 'am3', emoji: '🍳', text: 'Prepare breakfast' },
      { id: 'am4', emoji: '🥪', text: "Pack kids' lunches" },
      { id: 'am5', emoji: '📅', text: 'Check family calendar' },
      { id: 'am6', emoji: '🏃', text: 'Morning exercise' },
      { id: 'am7', emoji: '💼', text: 'Start work' },
    ],
    afternoon: [
      { id: 'aa1', emoji: '🍽️', text: 'Lunch break' },
      { id: 'aa2', emoji: '📱', text: 'Check school messages' },
      { id: 'aa3', emoji: '🍲', text: 'Plan dinner' },
      { id: 'aa4', emoji: '🧹', text: 'Quick household task' },
      { id: 'aa5', emoji: '🚶', text: 'Personal time / walk' },
      { id: 'aa6', emoji: '🛒', text: 'Grocery run if needed' },
    ],
    evening: [
      { id: 'ae1', emoji: '👨‍🍳', text: 'Cook dinner' },
      { id: 'ae2', emoji: '🧽', text: 'Clean up kitchen' },
      { id: 'ae3', emoji: '📚', text: 'Help with homework' },
      { id: 'ae4', emoji: '👔', text: 'Prep for tomorrow' },
      { id: 'ae5', emoji: '🧘', text: 'Self-care time' },
      { id: 'ae6', emoji: '📋', text: "Review tomorrow's schedule" },
      { id: 'ae7', emoji: '😴', text: 'Bedtime wind-down' },
    ],
  };

  /* ── Lookup ────────────────────────────────────── */
  var byAge = { 1: age1, 2: age2, 3: age3, 4: age4, 5: age5, adult: adult };

  /* ── Avatars for profile selection ──────────────── */
  /* 🐦 = Hummingbird, 🦌 = Fawn — featured first for the kids */
  var AVATARS = ['🐦','🦌','🦄','🦊','🐼','🦁','🐸','🐱','🐶','🦋','🐙','🦖','🐧','🐰'];

  /* ── Labels for featured avatars ──────────────────── */
  var AVATAR_LABELS = {
    '🐦': 'avatar.hummingbird',
    '🦌': 'avatar.fawn',
  };

  /* ── Sticker pools (earned as rewards) ──────────── */
  var STICKER_POOLS = {
    morning:   ['🌅','🌞','🌈','🌻','🐓','🥐','☀️','🍳'],
    afternoon: ['🌺','🎨','⚽','🦋','🎪','🎸','🏖️','🌼'],
    evening:   ['🌙','⭐','🌟','🦉','🧸','🎵','🌠','💫'],
    allDay:    ['🏆','👑','💎','🎖️','🥇','🎯','💪','🦸'],
  };

  /* ── Age labels (keys for i18n lookup) ─────────── */
  var AGE_LABELS = {
    1: 'Baby',
    2: 'Toddler',
    3: 'Pre-school',
    4: 'Pre-K',
    5: 'School',
    adult: 'Adult',
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
      'A consistent morning routine sets the tone for the whole day.',
      'Planning meals ahead saves time and reduces stress.',
      'Taking short breaks improves productivity.',
      "Don't forget to take care of yourself too!",
      'A family calendar keeps everyone on the same page.',
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
    AVATAR_LABELS: AVATAR_LABELS,
    STICKER_POOLS: STICKER_POOLS,
    AGE_LABELS: AGE_LABELS,
    TIPS: TIPS,
    MOTIVATIONS: MOTIVATIONS,
    THEMES: THEMES,
  };
})();
