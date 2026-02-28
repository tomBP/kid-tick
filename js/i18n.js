/* ================================================================
   Kid Tick — Internationalization (EN / ES / CA)
   ================================================================
   Provides translated UI strings and task text.
   Usage:  I18n.t('key')  →  translated string
           I18n.taskText(task)  →  task text in current language
   ================================================================ */

/* eslint-disable no-unused-vars */
var I18n = (function () {
  'use strict';

  var _lang = 'en';

  /* ── UI Translations ─────────────────────────────── */
  var ui = {
    en: {
      // App
      'app.title': 'Kid Tick',

      // Nav
      'nav.home': 'Home',
      'nav.stickers': 'Stickers',
      'nav.week': 'Week',
      'nav.settings': 'Settings',

      // Welcome
      'welcome.title': 'Welcome to Kid Tick!',
      'welcome.sub': "Let's set up a profile for your little one",
      'welcome.name': "Child's name",
      'welcome.name.placeholder': 'e.g. Emma',
      'welcome.age': 'Age',
      'welcome.avatar': 'Pick an avatar',
      'welcome.go': "Let's Go!",

      // Greetings
      'greeting.morning': 'Good morning, {name}!',
      'greeting.afternoon': 'Good afternoon, {name}!',
      'greeting.evening': 'Good evening, {name}!',

      // Tabs
      'tab.morning': '🌅 Morning',
      'tab.afternoon': '☀️ Afternoon',
      'tab.evening': '🌙 Evening',

      // Progress
      'progress.start': "Let's get started!",
      'progress.25': 'Great start — keep going!',
      'progress.50': "You're doing awesome!",
      'progress.75': 'More than halfway — wow!',
      'progress.99': 'Almost there, superstar!',
      'progress.100': 'You did it! 🏆',

      // Celebration
      'celebration.emoji': '🎉🌟🎉',
      'celebration.msg': 'Amazing! All done!',

      // Streak
      'streak.singular': 'day in a row!',
      'streak.plural': 'days in a row!',

      // Reset
      'reset.btn': 'Start Fresh 🔄',
      'reset.confirm': 'Reset all tasks for today?',

      // Stickers
      'stickers.title': "'s Stickers",
      'stickers.sub': 'Earn stickers by completing routines!',
      'stickers.morning': '🌅 Morning',
      'stickers.afternoon': '☀️ Afternoon',
      'stickers.evening': '🌙 Evening',
      'stickers.allday': '🏆 Full Day',

      // Weekly
      'weekly.title': '📅 This Week',
      'weekly.sub': "'s weekly progress",
      'weekly.summary': 'Weekly Summary',
      'weekly.completed': 'Tasks completed',
      'weekly.rate': 'Completion rate',
      'weekly.perfect': 'Perfect days',
      'weekly.streak': 'Current streak',
      'weekly.days': 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',

      // Settings
      'settings.title': '⚙️ Settings',
      'settings.edit': '✏️ Edit Profile',
      'settings.remove': '🗑️ Remove Profile',
      'settings.remove.confirm': "Remove {name}'s profile? This cannot be undone.",
      'settings.theme': 'Theme',
      'settings.language': 'Language',
      'settings.custom': 'Custom Tasks',
      'settings.data': 'Data',
      'settings.resetday': "Reset today's progress",
      'settings.clearall': 'Clear all data',
      'settings.clearall.confirm': 'Delete ALL profiles and data? This cannot be undone.',
      'settings.addtask': 'Add a {section} task…',

      // Edit profile
      'edit.title': 'Edit Profile',
      'edit.name': 'Name',
      'edit.age': 'Age',
      'edit.avatar': 'Avatar',
      'edit.save': 'Save',
      'edit.cancel': 'Cancel',

      // Age labels
      'age.1': 'Baby',
      'age.2': 'Toddler',
      'age.3': 'Pre-school',
      'age.4': 'Pre-K',
      'age.5': 'School',
      'age.adult': 'Adult',

      // Profile
      'profile.add': 'Add child',
      'profile.age': '{age}y',
      'profile.adult': 'Parent',

      // Avatar labels
      'avatar.hummingbird': 'Hummingbird',
      'avatar.fawn': 'Fawn',

      // Adult section
      'adult.section.title': '👨‍👩‍👧‍👦 Parent Tasks',
      'adult.section.sub': 'Your tasks for the day',
    },

    es: {
      'app.title': 'Kid Tick',
      'nav.home': 'Inicio',
      'nav.stickers': 'Pegatinas',
      'nav.week': 'Semana',
      'nav.settings': 'Ajustes',
      'welcome.title': '¡Bienvenido a Kid Tick!',
      'welcome.sub': 'Configuremos un perfil para tu peque',
      'welcome.name': 'Nombre del niño/a',
      'welcome.name.placeholder': 'ej. Emma',
      'welcome.age': 'Edad',
      'welcome.avatar': 'Elige un avatar',
      'welcome.go': '¡Vamos!',
      'greeting.morning': '¡Buenos días, {name}!',
      'greeting.afternoon': '¡Buenas tardes, {name}!',
      'greeting.evening': '¡Buenas noches, {name}!',
      'tab.morning': '🌅 Mañana',
      'tab.afternoon': '☀️ Tarde',
      'tab.evening': '🌙 Noche',
      'progress.start': '¡Empecemos!',
      'progress.25': '¡Buen comienzo, sigue así!',
      'progress.50': '¡Lo estás haciendo genial!',
      'progress.75': '¡Más de la mitad, guau!',
      'progress.99': '¡Casi lo consigues, superestrella!',
      'progress.100': '¡Lo lograste! 🏆',
      'celebration.emoji': '🎉🌟🎉',
      'celebration.msg': '¡Increíble! ¡Todo listo!',
      'streak.singular': '¡día seguido!',
      'streak.plural': '¡días seguidos!',
      'reset.btn': 'Empezar de nuevo 🔄',
      'reset.confirm': '¿Reiniciar todas las tareas de hoy?',
      'stickers.title': ' — Pegatinas',
      'stickers.sub': '¡Gana pegatinas completando rutinas!',
      'stickers.morning': '🌅 Mañana',
      'stickers.afternoon': '☀️ Tarde',
      'stickers.evening': '🌙 Noche',
      'stickers.allday': '🏆 Día completo',
      'weekly.title': '📅 Esta semana',
      'weekly.sub': ' — progreso semanal',
      'weekly.summary': 'Resumen semanal',
      'weekly.completed': 'Tareas completadas',
      'weekly.rate': 'Tasa de finalización',
      'weekly.perfect': 'Días perfectos',
      'weekly.streak': 'Racha actual',
      'weekly.days': 'Lun,Mar,Mié,Jue,Vie,Sáb,Dom',
      'settings.title': '⚙️ Ajustes',
      'settings.edit': '✏️ Editar perfil',
      'settings.remove': '🗑️ Eliminar perfil',
      'settings.remove.confirm': '¿Eliminar el perfil de {name}? No se puede deshacer.',
      'settings.theme': 'Tema',
      'settings.language': 'Idioma',
      'settings.custom': 'Tareas personalizadas',
      'settings.data': 'Datos',
      'settings.resetday': 'Reiniciar progreso de hoy',
      'settings.clearall': 'Borrar todos los datos',
      'settings.clearall.confirm': '¿Eliminar TODOS los perfiles y datos? No se puede deshacer.',
      'settings.addtask': 'Añadir tarea de {section}…',
      'edit.title': 'Editar perfil',
      'edit.name': 'Nombre',
      'edit.age': 'Edad',
      'edit.avatar': 'Avatar',
      'edit.save': 'Guardar',
      'edit.cancel': 'Cancelar',
      'age.1': 'Bebé',
      'age.2': 'Pequeño',
      'age.3': 'Preescolar',
      'age.4': 'Pre-K',
      'age.5': 'Escolar',
      'age.adult': 'Adulto',
      'profile.add': 'Añadir niño/a',
      'profile.age': '{age}a',
      'profile.adult': 'Padre/Madre',
      'avatar.hummingbird': 'Colibrí',
      'avatar.fawn': 'Cervatillo',
      'adult.section.title': '👨‍👩‍👧‍👦 Tareas de padres',
      'adult.section.sub': 'Tus tareas del día',
    },

    ca: {
      'app.title': 'Kid Tick',
      'nav.home': 'Inici',
      'nav.stickers': 'Enganxines',
      'nav.week': 'Setmana',
      'nav.settings': 'Configuració',
      'welcome.title': 'Benvingut a Kid Tick!',
      'welcome.sub': 'Configurem un perfil per al teu petit/a',
      'welcome.name': 'Nom del nen/a',
      'welcome.name.placeholder': 'ex. Emma',
      'welcome.age': 'Edat',
      'welcome.avatar': 'Tria un avatar',
      'welcome.go': 'Anem-hi!',
      'greeting.morning': 'Bon dia, {name}!',
      'greeting.afternoon': 'Bona tarda, {name}!',
      'greeting.evening': 'Bona nit, {name}!',
      'tab.morning': '🌅 Matí',
      'tab.afternoon': '☀️ Tarda',
      'tab.evening': '🌙 Nit',
      'progress.start': 'Comencem!',
      'progress.25': 'Bon començament, segueix!',
      'progress.50': 'Ho estàs fent genial!',
      'progress.75': 'Més de la meitat, uau!',
      'progress.99': 'Quasi ho tens, superestrella!',
      'progress.100': 'Ho has aconseguit! 🏆',
      'celebration.emoji': '🎉🌟🎉',
      'celebration.msg': 'Increïble! Tot llest!',
      'streak.singular': 'dia seguit!',
      'streak.plural': 'dies seguits!',
      'reset.btn': 'Començar de nou 🔄',
      'reset.confirm': 'Reiniciar totes les tasques d\'avui?',
      'stickers.title': ' — Enganxines',
      'stickers.sub': 'Guanya enganxines completant rutines!',
      'stickers.morning': '🌅 Matí',
      'stickers.afternoon': '☀️ Tarda',
      'stickers.evening': '🌙 Nit',
      'stickers.allday': '🏆 Dia complet',
      'weekly.title': '📅 Aquesta setmana',
      'weekly.sub': ' — progrés setmanal',
      'weekly.summary': 'Resum setmanal',
      'weekly.completed': 'Tasques completades',
      'weekly.rate': 'Taxa de finalització',
      'weekly.perfect': 'Dies perfectes',
      'weekly.streak': 'Ratxa actual',
      'weekly.days': 'Dll,Dm,Dc,Dj,Dv,Ds,Dg',
      'settings.title': '⚙️ Configuració',
      'settings.edit': '✏️ Editar perfil',
      'settings.remove': '🗑️ Eliminar perfil',
      'settings.remove.confirm': 'Eliminar el perfil de {name}? No es pot desfer.',
      'settings.theme': 'Tema',
      'settings.language': 'Idioma',
      'settings.custom': 'Tasques personalitzades',
      'settings.data': 'Dades',
      'settings.resetday': 'Reiniciar progrés d\'avui',
      'settings.clearall': 'Esborrar totes les dades',
      'settings.clearall.confirm': 'Eliminar TOTS els perfils i dades? No es pot desfer.',
      'settings.addtask': 'Afegir tasca de {section}…',
      'edit.title': 'Editar perfil',
      'edit.name': 'Nom',
      'edit.age': 'Edat',
      'edit.avatar': 'Avatar',
      'edit.save': 'Desar',
      'edit.cancel': 'Cancel·lar',
      'age.1': 'Nadó',
      'age.2': 'Petit',
      'age.3': 'Preescolar',
      'age.4': 'Pre-K',
      'age.5': 'Escolar',
      'age.adult': 'Adult',
      'profile.add': 'Afegir nen/a',
      'profile.age': '{age}a',
      'profile.adult': 'Pare/Mare',
      'avatar.hummingbird': 'Colibrí',
      'avatar.fawn': 'Cervatell',
      'adult.section.title': '👨‍👩‍👧‍👦 Tasques dels pares',
      'adult.section.sub': 'Les teves tasques del dia',
    },
  };

  /* ── Task Text Translations ──────────────────────── */
  /* Keyed by English text → translated text            */
  var tasks = {
    es: {
      // Age 1
      'Good morning wake-up!': '¡Buenos días, a despertar!',
      'Milk / breakfast time': 'Hora del biberón / desayuno',
      'Nappy change': 'Cambio de pañal',
      'Get dressed': 'Vestirse',
      'Play time': 'Hora de jugar',
      'Lunch time': 'Hora de comer',
      'Nap time': 'Hora de la siesta',
      'Snack time': 'Hora de la merienda',
      'Outside time': 'Hora de salir',
      'Dinner time': 'Hora de cenar',
      'Bath time': 'Hora del baño',
      'Pyjamas on': 'Ponerse el pijama',
      'Story time': 'Hora del cuento',
      'Night-night!': '¡A dormir!',
      // Age 2
      'Good morning!': '¡Buenos días!',
      'Potty / nappy': 'Orinal / pañal',
      'Wash hands': 'Lavarse las manos',
      'Eat breakfast': 'Desayunar',
      'Free play': 'Juego libre',
      'Eat lunch': 'Comer',
      'Healthy snack': 'Merienda saludable',
      'Play outside': 'Jugar fuera',
      'Pick up toys': 'Recoger juguetes',
      'Brush teeth': 'Cepillarse los dientes',
      'Bedtime': 'Hora de dormir',
      // Age 3
      'Wake up happy': '¡Despertar feliz!',
      'Use the potty': 'Usar el orinal',
      'Wash hands & face': 'Lavarse manos y cara',
      'Brush teeth (with help)': 'Cepillarse los dientes (con ayuda)',
      'Quiet time / nap': 'Tiempo tranquilo / siesta',
      'Art or creative play': 'Arte o juego creativo',
      'Tidy up toys': 'Ordenar juguetes',
      'Help with dinner': 'Ayudar con la cena',
      'Eat dinner': 'Cenar',
      'Bath or shower': 'Baño o ducha',
      'Put on pyjamas': 'Ponerse el pijama',
      'Lights out — goodnight!': '¡Luces apagadas — buenas noches!',
      // Age 4
      'Make my bed (with help)': 'Hacer la cama (con ayuda)',
      'Use the bathroom': 'Usar el baño',
      'Wash my face': 'Lavarme la cara',
      'Brush my teeth': 'Cepillarme los dientes',
      'Pack my bag': 'Preparar mi mochila',
      'Eat a healthy snack': 'Comer algo saludable',
      'Learning activity': 'Actividad de aprendizaje',
      'Tidy my space': 'Ordenar mi espacio',
      'Read or be read to': 'Leer o que me lean',
      'Creative time': 'Tiempo creativo',
      // Age 5
      'Make my bed': 'Hacer mi cama',
      'Check the weather': 'Mirar el tiempo',
      'Do my homework': 'Hacer los deberes',
      'Play outside or exercise': 'Jugar fuera o hacer ejercicio',
      'Read for 15 minutes': 'Leer 15 minutos',
      'Take a bath or shower': 'Bañarse o ducharse',
      // Adult
      'Wake up & stretch': 'Despertar y estirarse',
      'Shower & get ready': 'Ducha y prepararse',
      'Prepare breakfast': 'Preparar el desayuno',
      "Pack kids' lunches": 'Preparar el almuerzo de los niños',
      'Check family calendar': 'Revisar el calendario familiar',
      'Morning exercise': 'Ejercicio matutino',
      'Start work': 'Empezar a trabajar',
      'Lunch break': 'Pausa para comer',
      'Check school messages': 'Revisar mensajes del colegio',
      'Plan dinner': 'Planificar la cena',
      'Quick household task': 'Tarea rápida del hogar',
      'Personal time / walk': 'Tiempo personal / paseo',
      'Grocery run if needed': 'Compras si es necesario',
      'Cook dinner': 'Cocinar la cena',
      'Clean up kitchen': 'Limpiar la cocina',
      'Help with homework': 'Ayudar con los deberes',
      'Prep for tomorrow': 'Preparar para mañana',
      'Self-care time': 'Tiempo de autocuidado',
      "Review tomorrow's schedule": 'Revisar el horario de mañana',
      'Bedtime wind-down': 'Relajarse antes de dormir',
    },
    ca: {
      // Age 1
      'Good morning wake-up!': 'Bon dia, a despertar!',
      'Milk / breakfast time': 'Hora del biberó / esmorzar',
      'Nappy change': 'Canvi de bolquer',
      'Get dressed': 'Vestir-se',
      'Play time': 'Hora de jugar',
      'Lunch time': 'Hora de dinar',
      'Nap time': 'Hora de la migdiada',
      'Snack time': 'Hora del berenar',
      'Outside time': 'Hora de sortir',
      'Dinner time': 'Hora de sopar',
      'Bath time': 'Hora del bany',
      'Pyjamas on': 'Posar-se el pijama',
      'Story time': 'Hora del conte',
      'Night-night!': 'A dormir!',
      // Age 2
      'Good morning!': 'Bon dia!',
      'Potty / nappy': 'Orinal / bolquer',
      'Wash hands': 'Rentar-se les mans',
      'Eat breakfast': 'Esmorzar',
      'Free play': 'Joc lliure',
      'Eat lunch': 'Dinar',
      'Healthy snack': 'Berenar saludable',
      'Play outside': 'Jugar a fora',
      'Pick up toys': 'Recollir joguines',
      'Brush teeth': 'Rentar-se les dents',
      'Bedtime': 'Hora de dormir',
      // Age 3
      'Wake up happy': 'Despertar feliç!',
      'Use the potty': 'Usar l\'orinal',
      'Wash hands & face': 'Rentar-se mans i cara',
      'Brush teeth (with help)': 'Rentar-se les dents (amb ajuda)',
      'Quiet time / nap': 'Temps tranquil / migdiada',
      'Art or creative play': 'Art o joc creatiu',
      'Tidy up toys': 'Endreçar joguines',
      'Help with dinner': 'Ajudar amb el sopar',
      'Eat dinner': 'Sopar',
      'Bath or shower': 'Bany o dutxa',
      'Put on pyjamas': 'Posar-se el pijama',
      'Lights out — goodnight!': 'Llums apagats — bona nit!',
      // Age 4
      'Make my bed (with help)': 'Fer el llit (amb ajuda)',
      'Use the bathroom': 'Usar el lavabo',
      'Wash my face': 'Rentar-me la cara',
      'Brush my teeth': 'Rentar-me les dents',
      'Pack my bag': 'Preparar la motxilla',
      'Eat a healthy snack': 'Menjar alguna cosa saludable',
      'Learning activity': 'Activitat d\'aprenentatge',
      'Tidy my space': 'Endreçar el meu espai',
      'Read or be read to': 'Llegir o que em llegeixin',
      'Creative time': 'Temps creatiu',
      // Age 5
      'Make my bed': 'Fer el meu llit',
      'Check the weather': 'Mirar el temps',
      'Do my homework': 'Fer els deures',
      'Play outside or exercise': 'Jugar a fora o fer exercici',
      'Read for 15 minutes': 'Llegir 15 minuts',
      'Take a bath or shower': 'Banyar-se o dutxar-se',
      // Adult
      'Wake up & stretch': 'Despertar i estirar-se',
      'Shower & get ready': 'Dutxa i preparar-se',
      'Prepare breakfast': 'Preparar l\'esmorzar',
      "Pack kids' lunches": 'Preparar el dinar dels nens',
      'Check family calendar': 'Revisar el calendari familiar',
      'Morning exercise': 'Exercici matinal',
      'Start work': 'Començar a treballar',
      'Lunch break': 'Pausa per dinar',
      'Check school messages': 'Revisar missatges de l\'escola',
      'Plan dinner': 'Planificar el sopar',
      'Quick household task': 'Tasca ràpida de la llar',
      'Personal time / walk': 'Temps personal / passeig',
      'Grocery run if needed': 'Compres si cal',
      'Cook dinner': 'Cuinar el sopar',
      'Clean up kitchen': 'Netejar la cuina',
      'Help with homework': 'Ajudar amb els deures',
      'Prep for tomorrow': 'Preparar per demà',
      'Self-care time': 'Temps d\'autocura',
      "Review tomorrow's schedule": 'Revisar l\'horari de demà',
      'Bedtime wind-down': 'Relaxar-se abans de dormir',
    },
  };

  /* ── Tips Translations ───────────────────────────── */
  var tips = {
    es: {
      // Age 1
      'Routine helps babies feel safe and secure.': 'La rutina ayuda a los bebés a sentirse seguros.',
      'Singing during nappy changes makes it fun!': '¡Cantar durante el cambio de pañal lo hace divertido!',
      'Tummy time builds strong muscles.': 'El tiempo boca abajo fortalece los músculos.',
      'Reading to babies boosts brain development.': 'Leer a los bebés estimula el desarrollo cerebral.',
      'Let baby explore textures during play.': 'Deja que el bebé explore texturas mientras juega.',
      // Age 2
      'Toddlers love helping — let them try!': '¡A los pequeños les encanta ayudar — déjales intentarlo!',
      'Washing hands can be a splashy game.': 'Lavarse las manos puede ser un juego con agua.',
      'Praise effort, not just results.': 'Elogia el esfuerzo, no solo los resultados.',
      'Outdoor play builds balance and coordination.': 'Jugar fuera mejora el equilibrio y la coordinación.',
      'Simple choices empower little ones: "Red shirt or blue?"': 'Las opciones simples empoderan: "¿Camiseta roja o azul?"',
      // Age 3
      'Brushing teeth for 90 seconds keeps cavities away!': '¡Cepillarse los dientes 90 segundos previene las caries!',
      'Art time builds fine motor skills.': 'El tiempo de arte mejora la motricidad fina.',
      'Tidying up teaches responsibility.': 'Ordenar enseña responsabilidad.',
      'Reading together builds a love of books.': 'Leer juntos fomenta el amor por los libros.',
      'Playing outside for 30 min boosts mood and sleep.': 'Jugar fuera 30 min mejora el ánimo y el sueño.',
      // Age 4
      'Making the bed builds a sense of achievement.': 'Hacer la cama da sensación de logro.',
      'Helping with dinner teaches life skills.': 'Ayudar con la cena enseña habilidades para la vida.',
      'Creative play fuels imagination and problem-solving.': 'El juego creativo estimula la imaginación.',
      'Packing your own bag builds independence.': 'Preparar tu mochila fomenta la independencia.',
      '2 minutes of brushing = a super smile!': '¡2 minutos de cepillado = una súper sonrisa!',
      // Age 5
      'Checking the weather teaches observation skills.': 'Mirar el tiempo enseña a observar.',
      'Reading 15 min a day builds strong vocabulary.': 'Leer 15 min al día amplía el vocabulario.',
      'Homework time works best right after a snack.': 'Los deberes funcionan mejor después de merendar.',
      'Exercise before dinner helps you sleep better.': 'Ejercicio antes de cenar ayuda a dormir mejor.',
      'A tidy space means a tidy mind!': '¡Un espacio ordenado, una mente ordenada!',
      // Adult
      'A consistent morning routine sets the tone for the whole day.': 'Una rutina matutina constante marca el tono del día.',
      'Planning meals ahead saves time and reduces stress.': 'Planificar comidas ahorra tiempo y reduce el estrés.',
      'Taking short breaks improves productivity.': 'Las pausas cortas mejoran la productividad.',
      "Don't forget to take care of yourself too!": '¡No olvides cuidarte a ti también!',
      'A family calendar keeps everyone on the same page.': 'Un calendario familiar mantiene a todos coordinados.',
    },
    ca: {
      // Age 1
      'Routine helps babies feel safe and secure.': 'La rutina ajuda els nadons a sentir-se segurs.',
      'Singing during nappy changes makes it fun!': 'Cantar durant el canvi de bolquer ho fa divertit!',
      'Tummy time builds strong muscles.': 'El temps de panxa enforteix els músculs.',
      'Reading to babies boosts brain development.': 'Llegir als nadons estimula el desenvolupament cerebral.',
      'Let baby explore textures during play.': 'Deixa que el nadó explori textures mentre juga.',
      // Age 2
      'Toddlers love helping — let them try!': 'Als petits els encanta ajudar — deixa\'ls provar!',
      'Washing hands can be a splashy game.': 'Rentar-se les mans pot ser un joc amb aigua.',
      'Praise effort, not just results.': 'Elogia l\'esforç, no només els resultats.',
      'Outdoor play builds balance and coordination.': 'Jugar a fora millora l\'equilibri i la coordinació.',
      'Simple choices empower little ones: "Red shirt or blue?"': 'Les opcions simples empoderen: "Samarreta vermella o blava?"',
      // Age 3
      'Brushing teeth for 90 seconds keeps cavities away!': 'Rentar-se les dents 90 segons prevé les càries!',
      'Art time builds fine motor skills.': 'El temps d\'art millora la motricitat fina.',
      'Tidying up teaches responsibility.': 'Endreçar ensenya responsabilitat.',
      'Reading together builds a love of books.': 'Llegir junts fomenta l\'amor pels llibres.',
      'Playing outside for 30 min boosts mood and sleep.': 'Jugar a fora 30 min millora l\'ànim i el son.',
      // Age 4
      'Making the bed builds a sense of achievement.': 'Fer el llit dóna sensació d\'èxit.',
      'Helping with dinner teaches life skills.': 'Ajudar amb el sopar ensenya habilitats per a la vida.',
      'Creative play fuels imagination and problem-solving.': 'El joc creatiu estimula la imaginació.',
      'Packing your own bag builds independence.': 'Preparar la motxilla fomenta la independència.',
      '2 minutes of brushing = a super smile!': '2 minuts de raspallat = un súper somriure!',
      // Age 5
      'Checking the weather teaches observation skills.': 'Mirar el temps ensenya a observar.',
      'Reading 15 min a day builds strong vocabulary.': 'Llegir 15 min al dia amplia el vocabulari.',
      'Homework time works best right after a snack.': 'Els deures funcionen millor després de berenar.',
      'Exercise before dinner helps you sleep better.': 'Exercici abans de sopar ajuda a dormir millor.',
      'A tidy space means a tidy mind!': 'Un espai endreçat, una ment endreçada!',
      // Adult
      'A consistent morning routine sets the tone for the whole day.': 'Una rutina matinal constant marca el to del dia.',
      'Planning meals ahead saves time and reduces stress.': 'Planificar àpats estalvia temps i redueix l\'estrès.',
      'Taking short breaks improves productivity.': 'Les pauses curtes milloren la productivitat.',
      "Don't forget to take care of yourself too!": 'No oblidis cuidar-te a tu també!',
      'A family calendar keeps everyone on the same page.': 'Un calendari familiar manté a tothom coordinat.',
    },
  };

  /* ── Language names for picker ────────────────────── */
  var LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ca', name: 'Català',  flag: '🏳️' },
  ];

  /* ── Public API ──────────────────────────────────── */
  function setLang(lang) {
    _lang = lang;
  }

  function getLang() {
    return _lang;
  }

  /** Get a UI translation. Supports {placeholder} substitution. */
  function t(key, params) {
    var str = (ui[_lang] && ui[_lang][key]) || ui.en[key] || key;
    if (params) {
      for (var k in params) {
        str = str.replace('{' + k + '}', params[k]);
      }
    }
    return str;
  }

  /** Get translated task text */
  function taskText(task) {
    if (_lang === 'en') return task.text;
    return (tasks[_lang] && tasks[_lang][task.text]) || task.text;
  }

  /** Get translated tip text */
  function tipText(tip) {
    if (_lang === 'en') return tip;
    return (tips[_lang] && tips[_lang][tip]) || tip;
  }

  /** Get translated age label */
  function ageLabel(age) {
    if (age === 'adult') return t('age.adult');
    return t('age.' + age);
  }

  return {
    setLang: setLang,
    getLang: getLang,
    t: t,
    taskText: taskText,
    tipText: tipText,
    ageLabel: ageLabel,
    LANGUAGES: LANGUAGES,
  };
})();
