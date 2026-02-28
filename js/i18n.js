/* ================================================================
   Kid Tick — i18n  (Internationalisation: EN / ES / CA)
   ================================================================
   Loaded FIRST.  Provides I18n.t(key) for UI strings,
   I18n.task(age, id) for routine-task text, and language management.
   ================================================================ */

/* eslint-disable no-unused-vars */
var I18n = (function () {
  'use strict';

  var STORAGE_KEY = 'kidtick_lang';
  var _lang = 'en';

  /* ── Detect / restore language ──────────────────── */
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'es' || stored === 'ca')) {
      _lang = stored;
    }
  } catch (e) { /* ignore */ }

  /* ================================================================
     UI TRANSLATIONS
     ================================================================ */
  var ui = {
    /* ── Navigation ─────────────────────────── */
    'nav.home':       { en: 'Home',       es: 'Inicio',        ca: 'Inici' },
    'nav.stickers':   { en: 'Stickers',   es: 'Pegatinas',     ca: 'Enganxines' },
    'nav.week':       { en: 'Week',       es: 'Semana',        ca: 'Setmana' },
    'nav.settings':   { en: 'Settings',   es: 'Ajustes',       ca: 'Ajustos' },
    'nav.parent':     { en: 'Parent',     es: 'Padres',        ca: 'Pares' },

    /* ── Tabs ───────────────────────────────── */
    'tab.morning':    { en: 'Morning',    es: 'Mañana',        ca: 'Matí' },
    'tab.afternoon':  { en: 'Afternoon',  es: 'Tarde',         ca: 'Tarda' },
    'tab.evening':    { en: 'Evening',    es: 'Noche',         ca: 'Nit' },

    /* ── Greeting ───────────────────────────── */
    'greet.morning':  { en: 'Good morning, ',  es: 'Buenos días, ',  ca: 'Bon dia, ' },
    'greet.afternoon':{ en: 'Good afternoon, ', es: 'Buenas tardes, ', ca: 'Bona tarda, ' },
    'greet.evening':  { en: 'Good evening, ',  es: 'Buenas noches, ', ca: 'Bona nit, ' },

    /* ── Welcome ────────────────────────────── */
    'welcome.title':    { en: 'Welcome to Kid Tick!',    es: '¡Bienvenido a Kid Tick!',    ca: 'Benvingut a Kid Tick!' },
    'welcome.sub':      { en: "Let's set up a profile",  es: 'Vamos a crear un perfil',    ca: 'Anem a crear un perfil' },
    'welcome.name':     { en: "Name",                    es: 'Nombre',                     ca: 'Nom' },
    'welcome.namePh':   { en: 'e.g. Emma',               es: 'p. ej. Emma',                ca: 'p. ex. Emma' },
    'welcome.age':      { en: 'Age',                     es: 'Edad',                       ca: 'Edat' },
    'welcome.avatar':   { en: 'Pick an avatar',          es: 'Elige un avatar',            ca: 'Tria un avatar' },
    'welcome.go':       { en: "Let's Go!",               es: '¡Vamos!',                    ca: 'Anem-hi!' },

    /* ── Age labels ─────────────────────────── */
    'age.1':      { en: 'Baby',       es: 'Bebé',        ca: 'Nadó' },
    'age.2':      { en: 'Toddler',    es: 'Pequeño',     ca: 'Petit' },
    'age.3':      { en: 'Pre-school', es: 'Preescolar',  ca: 'Preescolar' },
    'age.4':      { en: 'Pre-K',      es: 'Pre-K',       ca: 'Pre-K' },
    'age.5':      { en: 'School',     es: 'Escolar',     ca: 'Escolar' },
    'age.adult':  { en: 'Parent',     es: 'Padre/Madre', ca: 'Pare/Mare' },

    /* ── Progress / motivation ──────────────── */
    'mot.start':      { en: "Let's get started!",           es: '¡Empecemos!',                   ca: 'Comencem!' },
    'mot.going':      { en: 'Great start — keep going!',    es: '¡Buen inicio, sigue así!',      ca: 'Bon inici, continua així!' },
    'mot.awesome':    { en: "You're doing awesome!",        es: '¡Lo estás haciendo genial!',     ca: 'Ho estàs fent genial!' },
    'mot.halfway':    { en: 'More than halfway — wow!',     es: '¡Más de la mitad, guau!',       ca: 'Més de la meitat, uau!' },
    'mot.almost':     { en: 'Almost there, superstar!',     es: '¡Ya casi, superestrella!',       ca: 'Ja gairebé, superestrella!' },
    'mot.done':       { en: 'You did it!',                  es: '¡Lo lograste!',                  ca: 'Ho has aconseguit!' },

    /* ── Streak ─────────────────────────────── */
    'streak.day':     { en: ' day in a row!',   es: ' día seguido!',    ca: ' dia seguit!' },
    'streak.days':    { en: ' days in a row!',  es: ' días seguidos!',  ca: ' dies seguits!' },

    /* ── Celebration ────────────────────────── */
    'celeb.msg':      { en: 'Amazing! All done!',       es: '¡Increíble! ¡Todo hecho!',    ca: 'Increïble! Tot fet!' },

    /* ── Reset ──────────────────────────────── */
    'reset.btn':      { en: 'Start Fresh',        es: 'Empezar de nuevo',   ca: 'Començar de nou' },

    /* ── Stickers ───────────────────────────── */
    'stickers.title': { en: "'s Stickers",         es: ' — Pegatinas',       ca: ' — Enganxines' },
    'stickers.earn':  { en: 'Earn stickers by completing routines!', es: '¡Gana pegatinas completando rutinas!', ca: 'Guanya enganxines completant rutines!' },
    'stickers.morning':   { en: 'Morning',    es: 'Mañana',   ca: 'Matí' },
    'stickers.afternoon': { en: 'Afternoon',  es: 'Tarde',    ca: 'Tarda' },
    'stickers.evening':   { en: 'Evening',    es: 'Noche',    ca: 'Nit' },
    'stickers.fullDay':   { en: 'Full Day',   es: 'Día completo', ca: 'Dia complet' },

    /* ── Weekly ─────────────────────────────── */
    'weekly.title':   { en: 'This Week',            es: 'Esta semana',         ca: 'Aquesta setmana' },
    'weekly.sub':     { en: "'s weekly progress",    es: ' — progreso semanal', ca: ' — progrés setmanal' },
    'weekly.summary': { en: 'Weekly Summary',        es: 'Resumen semanal',     ca: 'Resum setmanal' },
    'weekly.tasks':   { en: 'Tasks completed',       es: 'Tareas completadas',  ca: 'Tasques completades' },
    'weekly.rate':    { en: 'Completion rate',        es: 'Tasa de finalización', ca: 'Taxa de finalització' },
    'weekly.perfect': { en: 'Perfect days',           es: 'Días perfectos',      ca: 'Dies perfectes' },
    'weekly.streak':  { en: 'Current streak',         es: 'Racha actual',        ca: 'Ratxa actual' },

    /* ── Day names ──────────────────────────── */
    'day.mon': { en: 'Mon', es: 'Lun', ca: 'Dll' },
    'day.tue': { en: 'Tue', es: 'Mar', ca: 'Dm' },
    'day.wed': { en: 'Wed', es: 'Mié', ca: 'Dc' },
    'day.thu': { en: 'Thu', es: 'Jue', ca: 'Dj' },
    'day.fri': { en: 'Fri', es: 'Vie', ca: 'Dv' },
    'day.sat': { en: 'Sat', es: 'Sáb', ca: 'Ds' },
    'day.sun': { en: 'Sun', es: 'Dom', ca: 'Dg' },

    /* ── Settings ───────────────────────────── */
    'settings.title':       { en: 'Settings',             es: 'Ajustes',              ca: 'Ajustos' },
    'settings.editProfile': { en: 'Edit Profile',         es: 'Editar perfil',        ca: 'Editar perfil' },
    'settings.removeProfile': { en: 'Remove Profile',     es: 'Eliminar perfil',      ca: 'Eliminar perfil' },
    'settings.theme':       { en: 'Theme',                es: 'Tema',                 ca: 'Tema' },
    'settings.language':    { en: 'Language',              es: 'Idioma',               ca: 'Idioma' },
    'settings.customTasks': { en: 'Custom Tasks',         es: 'Tareas personalizadas', ca: 'Tasques personalitzades' },
    'settings.data':        { en: 'Data',                 es: 'Datos',                ca: 'Dades' },
    'settings.resetDay':    { en: "Reset today's progress", es: 'Reiniciar progreso de hoy', ca: "Reiniciar el progrés d'avui" },
    'settings.clearAll':    { en: 'Clear all data',       es: 'Borrar todos los datos', ca: 'Esborrar totes les dades' },
    'settings.addTask':     { en: 'Add a',                es: 'Añadir tarea de',      ca: 'Afegir tasca de' },
    'settings.addBtn':      { en: '+ Add',                es: '+ Añadir',             ca: '+ Afegir' },

    /* ── Confirm dialogs ────────────────────── */
    'confirm.remove':    { en: "'s profile? This cannot be undone.", es: '? Esto no se puede deshacer.', ca: '? Això no es pot desfer.' },
    'confirm.removePre': { en: 'Remove ',     es: 'Eliminar a ',  ca: 'Eliminar ' },
    'confirm.resetDay':  { en: 'Reset all tasks for today?', es: '¿Reiniciar todas las tareas de hoy?', ca: "Reiniciar totes les tasques d'avui?" },
    'confirm.clearAll':  { en: 'Delete ALL profiles and data? This cannot be undone.', es: '¿Borrar TODOS los perfiles y datos? Esto no se puede deshacer.', ca: 'Esborrar TOTS els perfils i dades? Això no es pot desfer.' },

    /* ── Edit profile modal ─────────────────── */
    'edit.title':   { en: 'Edit Profile',  es: 'Editar perfil', ca: 'Editar perfil' },
    'edit.name':    { en: 'Name',           es: 'Nombre',        ca: 'Nom' },
    'edit.age':     { en: 'Age',            es: 'Edad',          ca: 'Edat' },
    'edit.avatar':  { en: 'Avatar',         es: 'Avatar',        ca: 'Avatar' },
    'edit.cancel':  { en: 'Cancel',         es: 'Cancelar',      ca: 'Cancel·lar' },
    'edit.save':    { en: 'Save',           es: 'Guardar',       ca: 'Desar' },

    /* ── Timer ──────────────────────────────── */
    'timer.start':  { en: 'Start',   es: 'Iniciar',  ca: 'Iniciar' },
    'timer.skip':   { en: 'Skip',    es: 'Saltar',   ca: 'Saltar' },
    'timer.done':   { en: 'Done! Great job!', es: '¡Hecho! ¡Buen trabajo!', ca: 'Fet! Bona feina!' },
    'timer.doneBtn':{ en: 'Done!',   es: '¡Hecho!',  ca: 'Fet!' },
    'timer.label':  { en: 'Timer',   es: 'Temporizador', ca: 'Temporitzador' },

    /* ── Profile chip ───────────────────────── */
    'chip.add': { en: 'Add child', es: 'Añadir niño/a', ca: 'Afegir nen/a' },

    /* ── Language names ─────────────────────── */
    'lang.en': { en: 'English', es: 'Inglés',   ca: 'Anglès' },
    'lang.es': { en: 'Spanish', es: 'Español',  ca: 'Castellà' },
    'lang.ca': { en: 'Catalan', es: 'Catalán',  ca: 'Català' },
  };

  /* ================================================================
     TASK TEXT TRANSLATIONS  (keyed by "age:taskId")
     ================================================================ */
  var tasks = {
    /* ── Age 1 ── */
    '1:m1': { es: '¡Buenos días, a despertar!',    ca: 'Bon dia, a despertar!' },
    '1:m2': { es: 'Hora del biberón / desayuno',   ca: 'Hora del biberó / esmorzar' },
    '1:m3': { es: 'Cambio de pañal',               ca: 'Canvi de bolquer' },
    '1:m4': { es: 'Vestirse',                       ca: 'Vestir-se' },
    '1:m5': { es: 'Hora de jugar',                  ca: 'Hora de jugar' },
    '1:a1': { es: 'Hora de comer',                  ca: 'Hora de dinar' },
    '1:a2': { es: 'Hora de la siesta',              ca: 'Hora de la migdiada' },
    '1:a3': { es: 'Hora de la merienda',            ca: 'Hora del berenar' },
    '1:a4': { es: 'Tiempo al aire libre',           ca: 'Estona a l\'aire lliure' },
    '1:e1': { es: 'Hora de cenar',                  ca: 'Hora de sopar' },
    '1:e2': { es: 'Hora del baño',                  ca: 'Hora del bany' },
    '1:e3': { es: 'Cambio de pañal',                ca: 'Canvi de bolquer' },
    '1:e4': { es: 'Ponerse el pijama',              ca: 'Posar-se el pijama' },
    '1:e5': { es: 'Hora del cuento',                ca: 'Hora del conte' },
    '1:e6': { es: '¡Buenas noches!',                ca: 'Bona nit!' },

    /* ── Age 2 ── */
    '2:m1': { es: '¡Buenos días!',                  ca: 'Bon dia!' },
    '2:m2': { es: 'Orinal / pañal',                 ca: 'Orinal / bolquer' },
    '2:m3': { es: 'Lavarse las manos',              ca: 'Rentar-se les mans' },
    '2:m4': { es: 'Vestirse',                        ca: 'Vestir-se' },
    '2:m5': { es: 'Desayunar',                      ca: 'Esmorzar' },
    '2:m6': { es: 'Juego libre',                    ca: 'Joc lliure' },
    '2:a1': { es: 'Comer',                          ca: 'Dinar' },
    '2:a2': { es: 'Hora de la siesta',              ca: 'Hora de la migdiada' },
    '2:a3': { es: 'Merienda saludable',             ca: 'Berenar saludable' },
    '2:a4': { es: 'Jugar fuera',                    ca: 'Jugar a fora' },
    '2:a5': { es: 'Recoger juguetes',               ca: 'Recollir joguines' },
    '2:e1': { es: 'Hora de cenar',                  ca: 'Hora de sopar' },
    '2:e2': { es: 'Hora del baño',                  ca: 'Hora del bany' },
    '2:e3': { es: 'Cepillarse los dientes',         ca: 'Rentar-se les dents' },
    '2:e4': { es: 'Ponerse el pijama',              ca: 'Posar-se el pijama' },
    '2:e5': { es: 'Hora del cuento',                ca: 'Hora del conte' },
    '2:e6': { es: 'A dormir',                       ca: 'A dormir' },

    /* ── Age 3 ── */
    '3:m1': { es: '¡Despertar contento!',           ca: 'Despertar content!' },
    '3:m2': { es: 'Usar el orinal',                 ca: 'Fer servir l\'orinal' },
    '3:m3': { es: 'Lavarse manos y cara',           ca: 'Rentar-se mans i cara' },
    '3:m4': { es: 'Cepillarse los dientes (con ayuda)', ca: 'Rentar-se les dents (amb ajuda)' },
    '3:m5': { es: 'Vestirse',                        ca: 'Vestir-se' },
    '3:m6': { es: 'Desayunar',                      ca: 'Esmorzar' },
    '3:a1': { es: 'Comer',                          ca: 'Dinar' },
    '3:a2': { es: 'Rato tranquilo / siesta',        ca: 'Estona tranquil·la / migdiada' },
    '3:a3': { es: 'Merienda saludable',             ca: 'Berenar saludable' },
    '3:a4': { es: 'Jugar fuera',                    ca: 'Jugar a fora' },
    '3:a5': { es: 'Arte o juego creativo',          ca: 'Art o joc creatiu' },
    '3:a6': { es: 'Ordenar juguetes',               ca: 'Endreçar joguines' },
    '3:e1': { es: 'Ayudar con la cena',             ca: 'Ajudar amb el sopar' },
    '3:e2': { es: 'Cenar',                          ca: 'Sopar' },
    '3:e3': { es: 'Baño o ducha',                   ca: 'Bany o dutxa' },
    '3:e4': { es: 'Cepillarse los dientes',         ca: 'Rentar-se les dents' },
    '3:e5': { es: 'Ponerse el pijama',              ca: 'Posar-se el pijama' },
    '3:e6': { es: 'Hora del cuento',                ca: 'Hora del conte' },
    '3:e7': { es: '¡Luces apagadas, buenas noches!', ca: 'Llums apagats, bona nit!' },

    /* ── Age 4 ── */
    '4:m1': { es: 'Hacer la cama (con ayuda)',      ca: 'Fer el llit (amb ajuda)' },
    '4:m2': { es: 'Ir al baño',                     ca: 'Anar al lavabo' },
    '4:m3': { es: 'Lavarme la cara',                ca: 'Rentar-me la cara' },
    '4:m4': { es: 'Cepillarme los dientes',         ca: 'Rentar-me les dents' },
    '4:m5': { es: 'Vestirme',                        ca: 'Vestir-me' },
    '4:m6': { es: 'Desayunar',                      ca: 'Esmorzar' },
    '4:m7': { es: 'Preparar mi mochila',            ca: 'Preparar la motxilla' },
    '4:a1': { es: 'Comer algo saludable',           ca: 'Menjar alguna cosa saludable' },
    '4:a2': { es: 'Actividad de aprendizaje',       ca: 'Activitat d\'aprenentatge' },
    '4:a3': { es: 'Ordenar mi espacio',             ca: 'Endreçar el meu espai' },
    '4:a4': { es: 'Jugar fuera',                    ca: 'Jugar a fora' },
    '4:a5': { es: 'Leer o que me lean',             ca: 'Llegir o que em llegeixin' },
    '4:a6': { es: 'Tiempo creativo',                ca: 'Temps creatiu' },
    '4:e1': { es: 'Ayudar con la cena',             ca: 'Ajudar amb el sopar' },
    '4:e2': { es: 'Cenar',                          ca: 'Sopar' },
    '4:e3': { es: 'Baño o ducha',                   ca: 'Bany o dutxa' },
    '4:e4': { es: 'Cepillarme los dientes',         ca: 'Rentar-me les dents' },
    '4:e5': { es: 'Ponerse el pijama',              ca: 'Posar-se el pijama' },
    '4:e6': { es: 'Hora del cuento',                ca: 'Hora del conte' },
    '4:e7': { es: '¡Luces apagadas, buenas noches!', ca: 'Llums apagats, bona nit!' },

    /* ── Age 5 ── */
    '5:m1': { es: 'Hacer mi cama',                  ca: 'Fer el meu llit' },
    '5:m2': { es: 'Cepillarme los dientes',         ca: 'Rentar-me les dents' },
    '5:m3': { es: 'Lavarme la cara',                ca: 'Rentar-me la cara' },
    '5:m4': { es: 'Vestirme',                        ca: 'Vestir-me' },
    '5:m5': { es: 'Desayunar',                      ca: 'Esmorzar' },
    '5:m6': { es: 'Preparar mi mochila',            ca: 'Preparar la motxilla' },
    '5:m7': { es: 'Mirar el tiempo',                ca: 'Mirar el temps' },
    '5:a1': { es: 'Comer algo saludable',           ca: 'Menjar alguna cosa saludable' },
    '5:a2': { es: 'Hacer mis deberes',              ca: 'Fer els deures' },
    '5:a3': { es: 'Ordenar mi espacio',             ca: 'Endreçar el meu espai' },
    '5:a4': { es: 'Jugar fuera o hacer ejercicio',  ca: 'Jugar a fora o fer exercici' },
    '5:a5': { es: 'Leer 15 minutos',                ca: 'Llegir 15 minuts' },
    '5:e1': { es: 'Ayudar con la cena',             ca: 'Ajudar amb el sopar' },
    '5:e2': { es: 'Baño o ducha',                   ca: 'Bany o dutxa' },
    '5:e3': { es: 'Cepillarme los dientes',         ca: 'Rentar-me les dents' },
    '5:e4': { es: 'Ponerse el pijama',              ca: 'Posar-se el pijama' },
    '5:e5': { es: 'Hora del cuento',                ca: 'Hora del conte' },
    '5:e6': { es: '¡Luces apagadas, buenas noches!', ca: 'Llums apagats, bona nit!' },

    /* ── Adult ── */
    'adult:m1': { es: 'Despertar y levantarse',     ca: 'Despertar-se i llevar-se' },
    'adult:m2': { es: 'Café / té',                  ca: 'Cafè / te' },
    'adult:m3': { es: 'Ejercicio o estiramientos',  ca: 'Exercici o estiraments' },
    'adult:m4': { es: 'Ducha',                      ca: 'Dutxa' },
    'adult:m5': { es: 'Desayunar',                  ca: 'Esmorzar' },
    'adult:m6': { es: 'Revisar agenda del día',     ca: 'Revisar l\'agenda del dia' },
    'adult:m7': { es: 'Preparar cosas de los niños', ca: 'Preparar les coses dels nens' },
    'adult:a1': { es: 'Comer',                      ca: 'Dinar' },
    'adult:a2': { es: 'Tareas del hogar',           ca: 'Tasques de la llar' },
    'adult:a3': { es: 'Recados y compras',          ca: 'Encàrrecs i compres' },
    'adult:a4': { es: 'Preparar la merienda',       ca: 'Preparar el berenar' },
    'adult:a5': { es: 'Preparar la cena',           ca: 'Preparar el sopar' },
    'adult:e1': { es: 'Cenar en familia',           ca: 'Sopar en família' },
    'adult:e2': { es: 'Rutina de los niños',        ca: 'Rutina dels nens' },
    'adult:e3': { es: 'Ordenar la casa',            ca: 'Endreçar la casa' },
    'adult:e4': { es: 'Tiempo personal',            ca: 'Temps personal' },
    'adult:e5': { es: 'Planificar el día siguiente', ca: 'Planificar l\'endemà' },
    'adult:e6': { es: 'A descansar',                ca: 'A descansar' },
  };

  /* ================================================================
     TIPS TRANSLATIONS  (keyed by "age:index")
     ================================================================ */
  var tips = {
    '1:0': { es: 'La rutina ayuda a los bebés a sentirse seguros.',    ca: 'La rutina ajuda els nadons a sentir-se segurs.' },
    '1:1': { es: '¡Cantar durante el cambio de pañal lo hace divertido!', ca: 'Cantar durant el canvi de bolquer ho fa divertit!' },
    '1:2': { es: 'El tiempo boca abajo fortalece los músculos.',      ca: 'El temps de panxa enforteix els muscles.' },
    '1:3': { es: 'Leer a los bebés estimula el desarrollo cerebral.', ca: 'Llegir als nadons estimula el desenvolupament cerebral.' },
    '1:4': { es: 'Deja que el bebé explore texturas mientras juega.', ca: 'Deixa que el nadó explori textures mentre juga.' },

    '2:0': { es: '¡A los pequeños les encanta ayudar — déjalos intentar!', ca: 'Als petits els encanta ajudar — deixa\'ls provar!' },
    '2:1': { es: 'Lavarse las manos puede ser un juego con agua.',    ca: 'Rentar-se les mans pot ser un joc amb aigua.' },
    '2:2': { es: 'Elogia el esfuerzo, no solo los resultados.',       ca: 'Elogia l\'esforç, no només els resultats.' },
    '2:3': { es: 'Jugar afuera mejora el equilibrio y la coordinación.', ca: 'Jugar a fora millora l\'equilibri i la coordinació.' },
    '2:4': { es: 'Opciones simples empoderan: "¿Camiseta roja o azul?"', ca: 'Opcions simples empoderen: "Samarreta vermella o blava?"' },

    '3:0': { es: '¡Cepillarse los dientes 90 segundos previene caries!', ca: 'Rentar-se les dents 90 segons prevé les càries!' },
    '3:1': { es: 'El tiempo de arte desarrolla la motricidad fina.',   ca: 'El temps d\'art desenvolupa la motricitat fina.' },
    '3:2': { es: 'Ordenar enseña responsabilidad.',                    ca: 'Endreçar ensenya responsabilitat.' },
    '3:3': { es: 'Leer juntos fomenta el amor por los libros.',       ca: 'Llegir junts fomenta l\'amor pels llibres.' },
    '3:4': { es: 'Jugar 30 min afuera mejora el ánimo y el sueño.',  ca: 'Jugar 30 min a fora millora l\'ànim i el son.' },

    '4:0': { es: 'Hacer la cama crea sensación de logro.',            ca: 'Fer el llit crea sensació d\'assoliment.' },
    '4:1': { es: 'Ayudar con la cena enseña habilidades para la vida.', ca: 'Ajudar amb el sopar ensenya habilitats per a la vida.' },
    '4:2': { es: 'El juego creativo estimula la imaginación.',        ca: 'El joc creatiu estimula la imaginació.' },
    '4:3': { es: 'Preparar tu propia mochila fomenta la independencia.', ca: 'Preparar la teva pròpia motxilla fomenta la independència.' },
    '4:4': { es: '¡2 minutos de cepillado = una súper sonrisa!',      ca: '2 minuts de raspallat = un súper somriure!' },

    '5:0': { es: 'Mirar el tiempo enseña habilidades de observación.', ca: 'Mirar el temps ensenya habilitats d\'observació.' },
    '5:1': { es: 'Leer 15 min al día construye vocabulario.',         ca: 'Llegir 15 min al dia construeix vocabulari.' },
    '5:2': { es: 'Los deberes van mejor justo después de merendar.',  ca: 'Els deures van millor just després de berenar.' },
    '5:3': { es: 'Ejercicio antes de cenar ayuda a dormir mejor.',    ca: 'Exercici abans de sopar ajuda a dormir millor.' },
    '5:4': { es: '¡Un espacio ordenado, una mente ordenada!',         ca: 'Un espai endreçat, una ment endreçada!' },

    'adult:0': { es: 'Mantener una rutina te da más energía durante el día.', ca: 'Mantenir una rutina et dóna més energia durant el dia.' },
    'adult:1': { es: '15 minutos de ejercicio diario cambian tu día.',  ca: '15 minuts d\'exercici diari canvien el teu dia.' },
    'adult:2': { es: 'Planificar la noche anterior reduce el estrés matutino.', ca: 'Planificar la nit anterior redueix l\'estrès matinal.' },
    'adult:3': { es: 'Un poco de tiempo personal cada día es fundamental.',  ca: 'Una mica de temps personal cada dia és fonamental.' },
    'adult:4': { es: '¡Completa tus tareas y da ejemplo a los peques!', ca: 'Completa les teves tasques i dóna exemple als petits!' },
  };

  /* ================================================================
     PUBLIC API
     ================================================================ */

  /** Get the current language code */
  function getLang() { return _lang; }

  /** Set the language and persist */
  function setLang(code) {
    if (code === 'en' || code === 'es' || code === 'ca') {
      _lang = code;
      try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
      document.documentElement.lang = code;
    }
  }

  /** Translate a UI key */
  function t(key) {
    var entry = ui[key];
    if (!entry) return key;
    return entry[_lang] || entry.en || key;
  }

  /** Translate a task's text — falls back to the English text from routine data */
  function task(age, taskId, fallbackText) {
    if (_lang === 'en') return fallbackText;
    var entry = tasks[age + ':' + taskId];
    if (entry && entry[_lang]) return entry[_lang];
    return fallbackText;
  }

  /** Translate a tip — falls back to the English tip */
  function tip(age, index, fallbackText) {
    if (_lang === 'en') return fallbackText;
    var entry = tips[age + ':' + index];
    if (entry && entry[_lang]) return entry[_lang];
    return fallbackText;
  }

  /** Get day name abbreviations (array Mon-Sun) */
  function dayNames() {
    return [t('day.mon'), t('day.tue'), t('day.wed'), t('day.thu'), t('day.fri'), t('day.sat'), t('day.sun')];
  }

  /** Available languages */
  var LANGUAGES = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'ca', flag: '🏳️' },
  ];

  // Set initial lang attribute
  document.documentElement.lang = _lang;

  return {
    getLang: getLang,
    setLang: setLang,
    t: t,
    task: task,
    tip: tip,
    dayNames: dayNames,
    LANGUAGES: LANGUAGES,
  };
})();
