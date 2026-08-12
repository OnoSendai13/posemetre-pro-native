# Contributing to Assistant Posemètre Pro

Merci de votre intérêt pour contribuer à ce projet ! 🙏

## 🐛 Rapporter un bug

1. Vérifier qu'il n'existe pas déjà dans les [Issues](https://github.com/laurent/lightmeter-app-pwa/issues)
2. Créer une nouvelle issue avec :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Screenshots si possible
   - Navigateur et version

## ✨ Proposer une fonctionnalité

1. Ouvrir une issue avec le tag `enhancement`
2. Décrire la fonctionnalité souhaitée
3. Expliquer le cas d'usage photographique
4. Attendre validation avant de développer

## 🔧 Contribuer du code

### Prérequis
- Connaissance HTML/CSS/JavaScript vanilla
- Compréhension des principes photographiques (IL, ouverture, etc.)
- Respect des standards PWA

### Processus
1. **Fork** le repository
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Développer** en suivant les conventions du projet
4. **Tester** sur smartphone (iOS et Android)
5. **Commit** avec messages clairs
6. **Push** : `git push origin feature/ma-fonctionnalite`
7. **Créer une Pull Request**

### Conventions de code

#### JavaScript
- Pas de librairies externes (vanilla JS)
- Commentaires en français
- Noms de variables explicites
- Fonctions documentées

```javascript
/**
 * Calcule la nouvelle ouverture avec compensation IL
 * @param {number} baseAperture - Ouverture de base (ex: 5.6)
 * @param {number} ilDelta - Différence en IL (ex: +1.33)
 * @returns {number} Nouvelle ouverture arrondie
 */
function calculateAperture(baseAperture, ilDelta) {
    // ...
}
```

#### CSS
- BEM naming si applicable
- Variables CSS pour couleurs
- Mobile-first approach
- Commentaires pour sections importantes

#### HTML
- Sémantique claire
- Accessibilité (labels, aria-*)
- Commentaires pour sections

### Tests

Tester sur :
- ✅ Chrome Desktop
- ✅ Safari iOS (iPhone)
- ✅ Chrome Android
- ✅ Mode offline (après installation)

Vérifier :
- ✅ Calculs photographiques corrects
- ✅ Interface responsive
- ✅ Boutons tactiles (min 44×44px)
- ✅ Lisibilité en plein soleil
- ✅ Performance (pas de lag)

## 📐 Principes photographiques à respecter

### Formules essentielles
```
IL ↔ Ouverture : f × 2^(IL/2)
IL ↔ Vitesse : v / 2^IL
IL ↔ ISO : ISO × 2^IL
```

### Valeurs standard
- **ISO** : Progression par tiers (100, 125, 160, 200, 250, 320, 400...)
- **Ouvertures** : f/1.0 à f/45
- **Vitesses** : 30" à 1/8000

### Logique compensation
- **Flashmètre** : +IL = Augmenter puissance flash
- **Posemètre/Estimation** : +IL = Ouvrir diaph / Ralentir vitesse / Augmenter ISO

## 🎨 Design

### Palette de couleurs
```css
--primary-color: #ff6b35;    /* Orange */
--secondary-color: #004e89;  /* Bleu foncé */
--bg-dark: #1a1a1a;          /* Fond sombre */
--success-color: #4caf50;    /* Vert */
```

### Principes UI
- Interface sombre par défaut
- Contraste élevé
- Boutons tactiles ≥ 44×44px
- Pas d'animations lourdes
- Lisibilité maximale

## 📝 Documentation

Toute nouvelle fonctionnalité doit inclure :
- Mise à jour du README.md
- Commentaires dans le code
- Cas d'usage photographique
- Tests de validation

## ⚖️ Licence

En contribuant, vous acceptez que votre code soit sous licence MIT.

## 🙋 Questions ?

N'hésitez pas à ouvrir une issue avec le tag `question` !

---

**Merci de contribuer à Assistant Posemètre Pro ! 📸**
