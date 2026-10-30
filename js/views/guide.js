import { h } from '../ui.js';

// [image, route, title, what it is, how to use it (steps)]
const FEATURES = [
  ['cartes', '#/cartes', 'Cartes mémoire', 'Le vocabulaire des textes et des thèmes du concours, revu au bon moment pour ne pas l’oublier.', [
    'Touche « Commencer ». Essaie de te souvenir du sens, puis touche la carte pour voir la réponse.',
    'Note-toi honnêtement : « Encore », « Difficile », « Bien » ou « Facile ». L’application te reproposera chaque mot juste avant que tu l’oublies.',
    '10 nouveaux mots par jour au maximum (réglable dans Progrès). Essaie aussi les sens « FR → 中 » et « 🔊 → sens ».',
  ]],
  ['oral', '#/oral', 'Oral', 'Ton point faible, à travailler un peu chaque jour pour prendre de l’assurance.', [
    '« 🔊 Modèle » fait entendre une voix naturelle ; « 🐢 Lent » la ralentit. Répète à voix haute.',
    '« 🎙 Prononcer » : parle, et l’application colore chaque caractère. Vert = bien prononcé, orange = vérifie le ton, rouge = pas reconnu.',
    '« ● M’enregistrer » puis « Modèle puis ma voix » pour comparer. « Une minute pour répondre » : réponds à une question du jury sans t’arrêter.',
  ]],
  ['ecoute', '#/ecoute', 'Écoute', 'Pour habituer l’oreille au chinois parlé.', [
    '« Quel mot ? » : écoute un mot et choisis les bons caractères.',
    '« Phrase à trous » : écoute une phrase des textes et retrouve le mot manquant.',
    '« Dictée » : écris la phrase entendue (clavier chinois pinyin), puis compare caractère par caractère.',
  ]],
  ['colle', '#/colle', 'Colle', 'Une vraie simulation de l’oral du concours, au format des rapports du jury HEC.', [
    'Tire un sujet au hasard. Tu as 20 minutes pour préparer, sans pinyin, comme le jour J. Tu peux toucher un mot pour l’aide (elle est comptée).',
    'Touche « Passer à l’oral » : synthèse (2-3 min), commentaire (4-5 min), puis les questions du jury, lues à voix haute. Tout est enregistré.',
    'À la fin : ton minutage partie par partie, ton enregistrement à réécouter (et à télécharger pour ton professeur) et une auto-évaluation sur les 4 critères du jury.',
  ]],
  ['lecture', '#/lecture', 'Lecture', 'Les articles du cours, avec le pinyin et le lexique.', [
    'Choisis le pinyin : toujours affiché, au toucher, ou masqué.',
    'Touche n’importe quel mot pour l’entendre et voir sa traduction. Les mots soulignés en pointillé sont dans tes cartes.',
    '« 🔊 Tout lire » ou « 🔊 paragraphe » pour écouter, puis réponds aux questions de compréhension.',
  ]],
  ['jeux', '#/jeux', 'Jeux', 'Pour réviser en s’amusant, quand tu as cinq minutes.', [
    '« Chasse aux tons » : écoute une syllabe et trouve son ton.',
    '« Paires », « Phrase en désordre » et « Éclair » (60 secondes) : bats ton record !',
  ]],
  ['progres', '#/progres', 'Progrès et réglages', 'Ton activité, et quelques réglages.', [
    'Tes jours de suite, tes mots maîtrisés et tes colles.',
    'Vitesse de la voix, nombre de nouvelles cartes par jour, thème clair ou sombre.',
    '« ⬇ Voix pour le hors-ligne » pour utiliser l’application sans Internet (dans le métro, par exemple).',
  ]],
];

const INSTALL = [
  ['iPhone', 'Ouvre le lien dans Safari → touche « Partager » (le carré avec la flèche) → « Sur l’écran d’accueil ».'],
  ['Android', 'Ouvre le lien dans Chrome → menu ⋮ → « Installer l’application » (ou « Ajouter à l’écran d’accueil »).'],
  ['Ordinateur', 'Dans Chrome ou Edge, clique sur l’icône d’installation à droite de la barre d’adresse. Sinon, ajoute simplement la page à tes favoris.'],
];

const FAQ = [
  ['Le micro ne marche pas.', 'Autorise le micro quand le navigateur le demande. Si tu as refusé : sur iPhone, Réglages › Safari › Microphone ; sur Chrome, l’icône à gauche de l’adresse › Microphone › Autoriser.'],
  ['« Prononcer » ne fonctionne pas.', 'La reconnaissance vocale marche dans Safari et Chrome, mais pas dans Firefox. Sur Chrome, elle a besoin d’Internet. Tu peux toujours t’enregistrer et comparer avec le modèle.'],
  ['Où sont mes progrès ?', 'Uniquement sur cet appareil, dans ce navigateur. Pas de compte, rien n’est envoyé. Pour changer d’appareil : Progrès › Exporter, puis Importer sur le nouvel appareil.'],
  ['Mes enregistrements de colle ?', 'Ils restent sur ton appareil jusqu’à ce que tu quittes la page. Touche « Télécharger » à la fin de la colle pour les garder ou les envoyer.'],
  ['Les textes vont changer ?', 'Oui : ce sont des exemples. Ils seront remplacés par les textes de ton cours dès qu’ils seront disponibles. Tes progrès seront conservés.'],
  ['Une question, une idée, un problème ?', 'Écris à Luke : chaque remarque aide à améliorer l’application.'],
];

export default function guide(el) {
  el.append(
    h('div.card',
      h('h2', 'Bienvenue !'),
      h('p', 'Cette application t’aide à préparer le chinois LV2 des concours : vocabulaire, écoute, oral et colles. Le mieux, c’est un peu chaque jour.'),
      h('h3', 'La routine conseillée (15 min par jour)'),
      h('ol',
        h('li', h('b', '5 min de cartes'), ' — tout ce qui est « à revoir »'),
        h('li', h('b', '5 min d’oral'), ' — quelques phrases de colle, à voix haute'),
        h('li', h('b', '5 min d’écoute ou de lecture')),
        h('li', h('b', 'Une colle par semaine'), ' — le week-end, par exemple')),
      h('p.small.muted', 'Commence par ce qui te fait le plus peur : l’oral. C’est en parlant souvent, même avec des erreurs, qu’on gagne en assurance.')),
    h('div.card',
      h('h2', 'Installer l’application'),
      INSTALL.map(([dev, how]) => h('p', h('b', `${dev} : `), how)),
      h('p.small.muted', 'Une fois installée, elle s’ouvre comme une vraie application, en plein écran.')),
    FEATURES.map(([img, href, title, what, steps]) => h('div.card.guide-feature',
      h('img', { src: `img/guide/${img}.jpg`, alt: `Écran ${title}`, loading: 'lazy', width: 390, height: 690 }),
      h('div',
        h('h2', title),
        h('p', what),
        h('ol.small', steps.map((s) => h('li', s))),
        h('a.btn.primary.small', { href }, 'Essayer →')))),
    h('div.card',
      h('h2', 'Questions fréquentes'),
      FAQ.map(([q, a]) => h('details', h('summary', q), h('p.small', a)))),
  );
}
