// ============================================
// SYSTÈME D'INTERNATIONALISATION (i18n)
// ============================================

const LANG_KEY = 'app-language';

// Traductions
const translations = {
    fr: {
        // Header
        appTitle: '📷 Assistant Posemètre Pro',
        helpBtn: '?',
        themeBtn: 'Changer de thème',
        
        // Power mode switch
        powerModeLabel: 'Puissance:',
        powerModeIL: 'IL',
        powerModeFractions: 'Fractions',
        
        // Navigation
        navPosemetre: '☀️ Continu',
        navFlash: '⚡ Flash',
        navRatios: '💡 Ratios',
        navEstimation: '🎯 Sans Cellule',
        
        // Mode Posemètre
        posemetreTitle: 'Mode Continu (Lumière ambiante)',
        labelMesureInitiale: 'Mesure initiale (Ouverture):',
        labelISO: 'ISO:',
        labelVitesse: 'Vitesse:',
        labelCompensation: 'Compensation d\'exposition:',
        resultsSuggeres: '🎯 Réglages suggérés',
        
        // Mode Flash
        flashTitle: 'Mode Flashmètre',
        labelVitesseSync: 'Vitesse sync:',
        labelMesureFlash: 'Mesure flash actuelle:',
        labelOuvertureSouhaitee: 'Ouverture souhaitée:',
        labelPuissanceActuelle: 'Puissance flash actuelle:',
        labelHSSEnabled: 'Mode HSS (High-Speed Sync)',
        labelHSSSyncMax: 'Vitesse sync max du flash:',
        labelCompSupp: 'Compensation supplémentaire:',
        resultsFlash: '⚡ Ajuster le flash à',
        
        // Mode Ratios
        ratiosTitle: 'Ratios Key/Fill Light',
        labelKeyLight: 'Key Light (mesure):',
        labelRatioFill: 'Ratio Fill vs Key:',
        resultsFill: '💡 Fill Light à régler',
        
        // Mode Estimation
        estimationTitle: 'Sans Cellule (Estimation incidente)',
        estimationSubtitle: 'Mesure spot sur une zone de référence',
        labelZoneMesuree: 'Zone mesurée (spot):',
        labelLectureAppareil: 'Lecture appareil (f/):',
        resultsEstimation: '🎯 Lumière incidente estimée',
        gridTitle: '📋 Grille de réflectance (Exemples concrets)',
        
        // Zones dropdown
        zoneWhiteBurnt: '⚠️ Blanc cramé (+4 IL) - sans détail',
        zoneWhiteDetail: 'Blanc avec détails / Nuages blancs (+3 IL)',
        zoneLightSkin: 'Peau très claire / Mur blanc / Sable blanc (+2 IL)',
        zoneSkyOvercast: 'Ciel couvert lumineux / Neige ombre (+1.5 IL)',
        zoneCaucasian: 'Peau claire / Sable clair / Ciel bleu clair (+1 IL)',
        zoneMediumLight: 'Peau moyenne claire / Ciel bleu moyen (+0.5 IL)',
        zoneGray18: 'Gris 18% / Herbe verte / Feuillage / Ciel bleu profond (0 IL)',
        zoneMediumDark: 'Peau moyenne foncée / Ciel coucher soleil (-0.5 IL)',
        zoneDarkSkin: 'Peau foncée / Feuillage ombre / Ciel orageux (-1 IL)',
        zoneDarkStone: 'Pierre sombre / Asphalte sec / Terre sombre (-2 IL)',
        zoneBlackDetail: 'Noir avec détails / Ombres profondes (-3 IL)',
        zoneBlackBlocked: '⚠️ Noir bouché (-4 IL) - sans détail',
        
        // Grille de réflectance
        grid4: '⚠️ +4 IL: Blanc cramé, reflets spéculaires - sans détail exploitable',
        grid3: '+3 IL: Blanc avec détails, nuages blancs lumineux, neige plein soleil, écorce de bouleau',
        grid2: '+2 IL: Peau très claire, mur blanc à l\'ombre, sable blanc, pierre calcaire',
        grid15: '+1.5 IL: Ciel couvert lumineux, neige à l\'ombre, brouillard',
        grid1: '+1 IL: Peau claire caucasienne, sable clair, ciel bleu clair, palmier',
        grid05: '+0.5 IL: Peau moyenne claire, ciel bleu moyen, béton clair',
        grid0: '0 IL (Zone V): Gris 18% (carte grise), herbe verte, feuillage ensoleillé, ciel bleu profond, jean délavé',
        gridM05: '-0.5 IL: Peau moyenne foncée, ciel au coucher du soleil (orange), tuiles',
        gridM1: '-1 IL: Peau foncée, feuillage à l\'ombre, ciel orageux, bois foncé',
        gridM2: '-2 IL: Pierre sombre, asphalte sec, terre sombre, écorce de chêne',
        gridM3: '-3 IL: Noir avec détails, ombres profondes, vêtement noir texturé, cheveux noirs',
        gridM4: '⚠️ -4 IL: Noir bouché, ombres très denses - sans détail exploitable',
        
        // Results - Posemètre
        resultOption1: 'Option 1: Modifier l\'ouverture',
        resultOption2: 'Option 2: Modifier la vitesse',
        resultOption3: 'Option 3: Modifier l\'ISO',
        resultSpeed: 'Vitesse',
        resultAperture: 'Ouverture',
        
        // Results - Flash
        resultFlashTarget: 'Réglage à appliquer',
        resultAtIsoSpeed: 'à {iso} ISO et {speed}',
        resultPowerAdjust: 'Ajustement de puissance',
        resultBaseDiff: 'Différence de base',
        resultCompApplied: 'Compensation appliquée',
        resultHSSComp: 'Compensation HSS',
        resultFrom: 'de',
        resultTo: 'vers',
        resultIncrease: 'Augmenter de',
        resultDecrease: 'Diminuer de',
        resultNoChange: 'Pas de changement',
        
        // Results - Ratios
        resultFillLight: 'Fill Light',
        resultRatio: 'Ratio',
        resultLightingRatio: 'Ratio d\'éclairage',
        
        // Results - Estimation
        resultIncidentLight: 'Lumière incidente équivalente',
        resultBeforeComp: 'Avant compensation d\'exposition',
        resultMeasuredZone: 'Zone mesurée',
        resultSpotReading: 'Lecture spot',
        resultZoneComp: 'Compensation de zone',
        resultAccordingReflectance: 'Selon la réflectance de la zone',
        resultFinalSettings: '✨ RÉGLAGES FINAUX (avec compensation {comp} IL)',
        
        // HSS
        hssWarningTitle: 'Rappel HSS',
        hssWarningText: 'Perte estimée: ~{loss} IL. Ces réglages tiennent compte de votre mesure en HSS. Si les réglages sont difficiles, essayez en sync normale ({speed}) et remesurez.',
        hssActive: 'HSS actif',
        hssNotRequired: 'HSS non nécessaire',
        
        // Footer
        footerInstall: '📱 Installer l\'application',
        footerText: 'Assistant Posemètre Pro v1.2 | Développé pour Laurent Suchet IG:@ono_sendai',
        
        // Modal Aide - Titres
        helpTitle: '📖 Aide',
        helpNavGeneral: 'Général',
        helpNavPosemetre: 'Continu',
        helpNavFlash: 'Flash',
        helpNavRatios: 'Ratios',
        helpNavEstimation: 'Sans Cellule',
        
        // Unité
        evUnit: 'IL'
    },
    
    en: {
        // Header
        appTitle: '📷 Light Meter Pro Assistant',
        helpBtn: '?',
        themeBtn: 'Change theme',
        
        // Power mode switch
        powerModeLabel: 'Power:',
        powerModeIL: 'EV',
        powerModeFractions: 'Fractions',
        
        // Navigation
        navPosemetre: '☀️ Ambient',
        navFlash: '⚡ Flash',
        navRatios: '💡 Ratios',
        navEstimation: '🎯 No Meter',
        
        // Mode Posemètre
        posemetreTitle: 'Ambient Mode (Continuous Light)',
        labelMesureInitiale: 'Initial reading (Aperture):',
        labelISO: 'ISO:',
        labelVitesse: 'Shutter Speed:',
        labelCompensation: 'Exposure Compensation:',
        resultsSuggeres: '🎯 Suggested Settings',
        
        // Mode Flash
        flashTitle: 'Flash Meter Mode',
        labelVitesseSync: 'Sync speed:',
        labelMesureFlash: 'Current flash reading:',
        labelOuvertureSouhaitee: 'Desired aperture:',
        labelPuissanceActuelle: 'Current flash power:',
        labelHSSEnabled: 'HSS Mode (High-Speed Sync)',
        labelHSSSyncMax: 'Flash max sync speed:',
        labelCompSupp: 'Additional compensation:',
        resultsFlash: '⚡ Adjust flash to',
        
        // Mode Ratios
        ratiosTitle: 'Key/Fill Light Ratios',
        labelKeyLight: 'Key Light (reading):',
        labelRatioFill: 'Fill vs Key ratio:',
        resultsFill: '💡 Set Fill Light to',
        
        // Mode Estimation
        estimationTitle: 'No Meter (Incident Estimation)',
        estimationSubtitle: 'Spot metering on a reference zone',
        labelZoneMesuree: 'Metered zone (spot):',
        labelLectureAppareil: 'Camera reading (f/):',
        resultsEstimation: '🎯 Estimated incident light',
        gridTitle: '📋 Reflectance Chart (Practical Examples)',
        
        // Zones dropdown
        zoneWhiteBurnt: '⚠️ Blown white (+4 EV) - no detail',
        zoneWhiteDetail: 'White with detail / Bright clouds (+3 EV)',
        zoneLightSkin: 'Very light skin / White wall / White sand (+2 EV)',
        zoneSkyOvercast: 'Bright overcast sky / Snow in shade (+1.5 EV)',
        zoneCaucasian: 'Light skin / Light sand / Light blue sky (+1 EV)',
        zoneMediumLight: 'Medium light skin / Medium blue sky (+0.5 EV)',
        zoneGray18: '18% Gray / Green grass / Foliage / Deep blue sky (0 EV)',
        zoneMediumDark: 'Medium dark skin / Sunset sky (-0.5 EV)',
        zoneDarkSkin: 'Dark skin / Foliage in shade / Stormy sky (-1 EV)',
        zoneDarkStone: 'Dark stone / Dry asphalt / Dark earth (-2 EV)',
        zoneBlackDetail: 'Black with detail / Deep shadows (-3 EV)',
        zoneBlackBlocked: '⚠️ Blocked black (-4 EV) - no detail',
        
        // Grille de réflectance
        grid4: '⚠️ +4 EV: Blown white, specular highlights - no usable detail',
        grid3: '+3 EV: White with detail, bright white clouds, snow in sun, birch bark',
        grid2: '+2 EV: Very light skin, white wall in shade, white sand, limestone',
        grid15: '+1.5 EV: Bright overcast sky, snow in shade, fog',
        grid1: '+1 EV: Light caucasian skin, light sand, light blue sky, palm tree',
        grid05: '+0.5 EV: Medium light skin, medium blue sky, light concrete',
        grid0: '0 EV (Zone V): 18% gray (gray card), green grass, sunlit foliage, deep blue sky, faded jeans',
        gridM05: '-0.5 EV: Medium dark skin, sunset sky (orange), roof tiles',
        gridM1: '-1 EV: Dark skin, foliage in shade, stormy sky, dark wood',
        gridM2: '-2 EV: Dark stone, dry asphalt, dark earth, oak bark',
        gridM3: '-3 EV: Black with detail, deep shadows, textured black clothing, black hair',
        gridM4: '⚠️ -4 EV: Blocked black, very dense shadows - no usable detail',
        
        // Results - Posemètre
        resultOption1: 'Option 1: Change aperture',
        resultOption2: 'Option 2: Change shutter speed',
        resultOption3: 'Option 3: Change ISO',
        resultSpeed: 'Speed',
        resultAperture: 'Aperture',
        
        // Results - Flash
        resultFlashTarget: 'Setting to apply',
        resultAtIsoSpeed: 'at {iso} ISO and {speed}',
        resultPowerAdjust: 'Power adjustment',
        resultBaseDiff: 'Base difference',
        resultCompApplied: 'Applied compensation',
        resultHSSComp: 'HSS compensation',
        resultFrom: 'from',
        resultTo: 'to',
        resultIncrease: 'Increase by',
        resultDecrease: 'Decrease by',
        resultNoChange: 'No change',
        
        // Results - Ratios
        resultFillLight: 'Fill Light',
        resultRatio: 'Ratio',
        resultLightingRatio: 'Lighting ratio',
        
        // Results - Estimation
        resultIncidentLight: 'Equivalent incident light',
        resultBeforeComp: 'Before exposure compensation',
        resultMeasuredZone: 'Metered zone',
        resultSpotReading: 'Spot reading',
        resultZoneComp: 'Zone compensation',
        resultAccordingReflectance: 'According to zone reflectance',
        resultFinalSettings: '✨ FINAL SETTINGS (with {comp} EV compensation)',
        
        // HSS
        hssWarningTitle: 'HSS Reminder',
        hssWarningText: 'Estimated loss: ~{loss} EV. These settings account for your HSS reading. If settings are difficult, try normal sync ({speed}) and re-measure.',
        hssActive: 'HSS active',
        hssNotRequired: 'HSS not required',
        
        // Footer
        footerInstall: '📱 Install app',
        footerText: 'Light Meter Pro Assistant v1.2 | Developed for Laurent Suchet IG:@ono_sendai',
        
        // Modal Aide - Titres
        helpTitle: '📖 Help',
        helpNavGeneral: 'General',
        helpNavPosemetre: 'Ambient',
        helpNavFlash: 'Flash',
        helpNavRatios: 'Ratios',
        helpNavEstimation: 'No Meter',
        
        // Unité
        evUnit: 'EV'
    }
};

// Contenu HTML de l'aide (séparé pour faciliter la maintenance)
const helpContent = {
    fr: {
        general: `
            <h3>🎯 Principe général</h3>
            <p>Cette application est un <strong>assistant pour posemètre/flashmètre</strong>. Elle vous aide à calculer les réglages de votre appareil photo à partir d'une mesure de lumière <strong>incidente</strong>.</p>
            
            <div class="help-box help-box-warning">
                <h4>⚠ Mode Manuel requis</h4>
                <p>Ce raisonnement n'est totalement applicable qu'en <strong>mode Manuel (M)</strong>. Dans les modes semi-automatiques (Av, Tv, P), vous ne contrôlez qu'un paramètre et devez utiliser la fonction <strong>compensation d'exposition</strong> propre à votre appareil. Vous êtes alors davantage soumis à la règle du gris 18% sur mesure de lumière réfléchie.</p>
                <p><strong>À noter :</strong> l'affichage sur l'écran de l'appareil (image et histogramme) est un JPEG construit à la volée avec une courbe de tonalité standard. Il ne reflète pas la réalité des données contenues dans le fichier RAW.</p>
            </div>
            
            <div class="help-box">
                <h4>Lumière incidente vs réfléchie</h4>
                <p><strong>Incidente</strong> : mesure la lumière qui ARRIVE sur le sujet (avec dôme blanc, posemètre vers la source).</p>
                <p><strong>Réfléchie</strong> : mesure la lumière RENVOYÉE par le sujet (= mesure par la cellule de l'appareil photo).</p>
                <p>Cette app travaille avec la mesure <strong>incidente</strong>, plus fiable car indépendante de la couleur/réflectance du sujet.</p>
            </div>
            
            <h4>Le triangle d'exposition</h4>
            <p>Trois paramètres liés contrôlent l'exposition :</p>
            <ul>
                <li><strong>Ouverture (f/)</strong> : contrôle la quantité de lumière + profondeur de champ</li>
                <li><strong>Vitesse</strong> : contrôle le temps d'exposition + figé/flou de mouvement</li>
                <li><strong>ISO</strong> : sensibilité du capteur (plus = plus de bruit)</li>
            </ul>
            <p>Modifier un paramètre d'1 IL (indice de lumination) = doubler ou diviser la lumière par 2.</p>
            
            <h4>📐 Tableau des ouvertures (diaphragme)</h4>
            <div class="aperture-grid">
                <table>
                    <tr>
                        <td class="third-stop"></td>
                        <td class="full-stop">1</td>
                        <td class="third-stop">1,1</td>
                        <td class="third-stop">1,2</td>
                    </tr>
                    <tr>
                        <td class="full-stop">1,4</td>
                        <td class="third-stop">1,6</td>
                        <td class="third-stop">1,8</td>
                        <td class="full-stop">2</td>
                    </tr>
                    <tr>
                        <td class="third-stop">2,2</td>
                        <td class="third-stop">2,5</td>
                        <td class="full-stop">2,8</td>
                        <td class="third-stop">3,2</td>
                    </tr>
                    <tr>
                        <td class="third-stop">3,5</td>
                        <td class="full-stop">4</td>
                        <td class="third-stop">4,5</td>
                        <td class="third-stop">5</td>
                    </tr>
                    <tr>
                        <td class="full-stop">5,6</td>
                        <td class="third-stop">6,3</td>
                        <td class="third-stop">7,1</td>
                        <td class="full-stop">8</td>
                    </tr>
                    <tr>
                        <td class="third-stop">9</td>
                        <td class="third-stop">10</td>
                        <td class="full-stop">11</td>
                        <td class="third-stop">13</td>
                    </tr>
                    <tr>
                        <td class="third-stop">14</td>
                        <td class="full-stop">16</td>
                        <td class="third-stop">18</td>
                        <td class="third-stop">20</td>
                    </tr>
                    <tr>
                        <td class="full-stop">22</td>
                        <td class="third-stop">25</td>
                        <td class="third-stop">29</td>
                        <td class="full-stop">32</td>
                    </tr>
                </table>
            </div>
            <div class="aperture-grid-legend">
                <p><span class="legend-box red"></span> Cases rouges = 1 IL complet (diaphragme plein)</p>
                <p><span class="legend-box gray"></span> Sur une ligne : 0,33 IL (⅓ de diaph) entre chaque case</p>
                <p>↕ En colonne : 1,33 IL (1 diaph + ⅓) entre chaque case</p>
            </div>
            <p class="aperture-grid-credit">Tableau inspiré de @nathsakuraofficial — <a href="https://nath-sakura.net/" target="_blank" rel="noopener">nath-sakura.net</a></p>
        `,
        posemetre: `
            <h3>☀️ Mode Continu (lumière ambiante)</h3>
            <p>Pour la photo en lumière naturelle ou continue (LED, tungstène...), avec votre posemètre.</p>
            
            <div class="help-box">
                <h4>Utilisation</h4>
                <ol>
                    <li>Mesurez la lumière incidente avec votre posemètre</li>
                    <li>Entrez l'ouverture indiquée (ex: f/5.6)</li>
                    <li>Sélectionnez votre ISO et vitesse de base</li>
                    <li>L'app calcule les réglages équivalents</li>
                </ol>
            </div>
            
            <h4>Compensation d'exposition</h4>
            <p>Utilisez la compensation pour :</p>
            <ul>
                <li><strong>+IL</strong> : surexposer (plus clair) - utile pour high-key, peaux claires</li>
                <li><strong>-IL</strong> : sous-exposer (plus sombre) - utile pour low-key, ambiances</li>
            </ul>
            <p>Les 3 options proposées sont équivalentes en terme d'exposition, choisissez selon votre priorité créative (profondeur de champ, mouvement, bruit).</p>
        `,
        flash: `
            <h3>⚡ Mode Flash</h3>
            <p>Pour le travail au flash de studio ou cobra.</p>
            
            <div class="help-box help-box-warning">
                <h4>⚠ Concept important : f/X a double sens</h4>
                <p><strong>f/X comme réglage</strong> : l'ouverture à appliquer sur votre appareil (ex: "réglez f/8")</p>
                <p><strong>f/X comme mesure</strong> : indique l'intensité lumineuse du flash. Un flash qui "donne f/11" est plus puissant qu'un flash qui "donne f/5.6".</p>
                <p>Dans cette app, la <strong>mesure flash</strong> = ce que votre flashmètre indique. L'<strong>ouverture souhaitée</strong> = le réglage que vous voulez utiliser dans votre choix artistique.</p>
            </div>
            
            <h4>Workflow typique</h4>
            <ol>
                <li>Réglez votre flash à une puissance de départ</li>
                <li>Mesurez au flashmètre → notez le f/X indiqué</li>
                <li>Entrez cette mesure et l'ouverture que vous souhaitez</li>
                <li>L'app vous dit de combien ajuster la puissance</li>
            </ol>
            
            <h4>Mode IL vs Fractions</h4>
            <ul>
                <li><strong>IL</strong> : ajustement en indices de lumination (style Profoto, Broncolor)</li>
                <li><strong>Fractions</strong> : ajustement en fractions de puissance (1/1, 1/2, 1/4... style Godox, Neewer)</li>
            </ul>
            
            <h4>Mode HSS (High-Speed Sync)</h4>
            <p>Permet de shooter au-dessus de la vitesse de synchro (ex: 1/1000 au lieu de 1/250).</p>
            <p><strong>Attention</strong> : le HSS cause une perte de puissance importante (~2-4 IL). La mesure doit être faite dans les conditions réelles (en HSS si vous shootez en HSS).</p>
        `,
        ratios: `
            <h3>💡 Mode Ratios Key/Fill</h3>
            <p>Pour gérer l'éclairage à plusieurs sources.</p>
            
            <div class="help-box">
                <h4>Key et Fill light</h4>
                <p><strong>Key light</strong> : source principale, définit l'exposition de base</p>
                <p><strong>Fill light</strong> : source secondaire, débouche les ombres</p>
            </div>
            
            <h4>Ratios courants</h4>
            <ul>
                <li><strong>1:1</strong> (0 IL) : éclairage plat, pas d'ombre</li>
                <li><strong>2:1</strong> (-1 IL) : léger contraste, portrait flatteur</li>
                <li><strong>4:1</strong> (-2 IL) : contraste marqué, portrait dramatique</li>
                <li><strong>8:1</strong> (-3 IL) : fort contraste, clair-obscur</li>
            </ul>
            <p>Entrez la mesure de votre Key light et le ratio souhaité, l'app calcule à quel f/ doit être réglée votre Fill light.</p>
        `,
        estimation: `
            <h3>🎯 Mode Sans Cellule (estimation incidente)</h3>
            <p>Pour estimer la lumière incidente sans posemètre externe, en utilisant la mesure spot de votre appareil sur une zone de référence.</p>
            
            <div class="help-box">
                <h4>Principe</h4>
                <p>La cellule de votre appareil suppose que tout est "gris 18%". Si vous mesurez une zone plus claire ou plus sombre, elle se trompe.</p>
                <p>Cette app corrige l'erreur en fonction de la zone mesurée.</p>
            </div>
            
            <h4>Comment faire</h4>
            <ol>
                <li>Passez en mode spot sur votre appareil</li>
                <li>Visez une zone de référence (peau, mur, ciel...)</li>
                <li>Notez l'ouverture suggérée par l'appareil</li>
                <li>Sélectionnez le type de zone dans l'app</li>
                <li>L'app corrige et donne l'exposition réelle</li>
            </ol>
            
            <h4>Zones de référence courantes</h4>
            <ul>
                <li><strong>Gris 18%</strong> (0 IL) : béton, herbe verte, feuillage</li>
                <li><strong>Peau claire</strong> (+1 IL) : caucasien éclairé</li>
                <li><strong>Peau foncée</strong> (-1 IL) : peau noire, ombre</li>
                <li><strong>Blanc</strong> (+2 à +5 IL) : neige, mur blanc</li>
                <li><strong>Noir</strong> (-2 à -4 IL) : asphalte, ombres profondes</li>
            </ul>
        `
    },
    en: {
        general: `
            <h3>🎯 General Principle</h3>
            <p>This application is a <strong>light meter/flash meter assistant</strong>. It helps you calculate your camera settings from an <strong>incident</strong> light reading.</p>
            
            <div class="help-box help-box-warning">
                <h4>⚠ Manual Mode Required</h4>
                <p>This reasoning is only fully applicable in <strong>Manual mode (M)</strong>. In semi-automatic modes (Av, Tv, P), you only control one parameter and must use your camera's built-in <strong>exposure compensation</strong> function. You are then more subject to the 18% gray rule on reflected light metering.</p>
                <p><strong>Note:</strong> The display on your camera screen (image and histogram) is a JPEG built on-the-fly with a standard tone curve. It does not reflect the actual data contained in the RAW file.</p>
            </div>
            
            <div class="help-box">
                <h4>Incident vs Reflected Light</h4>
                <p><strong>Incident</strong>: measures the light ARRIVING on the subject (with white dome, meter pointing toward the source).</p>
                <p><strong>Reflected</strong>: measures the light BOUNCED BACK by the subject (= camera's built-in meter reading).</p>
                <p>This app works with <strong>incident</strong> metering, more reliable as it's independent of the subject's color/reflectance.</p>
            </div>
            
            <h4>The Exposure Triangle</h4>
            <p>Three linked parameters control exposure:</p>
            <ul>
                <li><strong>Aperture (f/)</strong>: controls light quantity + depth of field</li>
                <li><strong>Shutter Speed</strong>: controls exposure time + freeze/blur motion</li>
                <li><strong>ISO</strong>: sensor sensitivity (higher = more noise)</li>
            </ul>
            <p>Changing one parameter by 1 EV (exposure value) = doubling or halving the light.</p>
            
            <h4>📐 Aperture Chart (f-stops)</h4>
            <div class="aperture-grid">
                <table>
                    <tr>
                        <td class="third-stop"></td>
                        <td class="full-stop">1</td>
                        <td class="third-stop">1.1</td>
                        <td class="third-stop">1.2</td>
                    </tr>
                    <tr>
                        <td class="full-stop">1.4</td>
                        <td class="third-stop">1.6</td>
                        <td class="third-stop">1.8</td>
                        <td class="full-stop">2</td>
                    </tr>
                    <tr>
                        <td class="third-stop">2.2</td>
                        <td class="third-stop">2.5</td>
                        <td class="full-stop">2.8</td>
                        <td class="third-stop">3.2</td>
                    </tr>
                    <tr>
                        <td class="third-stop">3.5</td>
                        <td class="full-stop">4</td>
                        <td class="third-stop">4.5</td>
                        <td class="third-stop">5</td>
                    </tr>
                    <tr>
                        <td class="full-stop">5.6</td>
                        <td class="third-stop">6.3</td>
                        <td class="third-stop">7.1</td>
                        <td class="full-stop">8</td>
                    </tr>
                    <tr>
                        <td class="third-stop">9</td>
                        <td class="third-stop">10</td>
                        <td class="full-stop">11</td>
                        <td class="third-stop">13</td>
                    </tr>
                    <tr>
                        <td class="third-stop">14</td>
                        <td class="full-stop">16</td>
                        <td class="third-stop">18</td>
                        <td class="third-stop">20</td>
                    </tr>
                    <tr>
                        <td class="full-stop">22</td>
                        <td class="third-stop">25</td>
                        <td class="third-stop">29</td>
                        <td class="full-stop">32</td>
                    </tr>
                </table>
            </div>
            <div class="aperture-grid-legend">
                <p><span class="legend-box red"></span> Red cells = 1 full EV (full stop)</p>
                <p><span class="legend-box gray"></span> On a row: 0.33 EV (⅓ stop) between each cell</p>
                <p>↕ In a column: 1.33 EV (1 stop + ⅓) between each cell</p>
            </div>
            <p class="aperture-grid-credit">Chart inspired by @nathsakuraofficial — <a href="https://nath-sakura.net/" target="_blank" rel="noopener">nath-sakura.net</a></p>
        `,
        posemetre: `
            <h3>☀️ Ambient Mode (continuous light)</h3>
            <p>For photography in natural or continuous light (LED, tungsten...), using your light meter.</p>
            
            <div class="help-box">
                <h4>How to use</h4>
                <ol>
                    <li>Measure incident light with your light meter</li>
                    <li>Enter the indicated aperture (e.g., f/5.6)</li>
                    <li>Select your base ISO and shutter speed</li>
                    <li>The app calculates equivalent settings</li>
                </ol>
            </div>
            
            <h4>Exposure Compensation</h4>
            <p>Use compensation for:</p>
            <ul>
                <li><strong>+EV</strong>: overexpose (brighter) - useful for high-key, light skin</li>
                <li><strong>-EV</strong>: underexpose (darker) - useful for low-key, moody shots</li>
            </ul>
            <p>The 3 options offered are equivalent in terms of exposure, choose according to your creative priority (depth of field, motion, noise).</p>
        `,
        flash: `
            <h3>⚡ Flash Mode</h3>
            <p>For working with studio or speedlight flash.</p>
            
            <div class="help-box help-box-warning">
                <h4>⚠ Important concept: f/X has dual meaning</h4>
                <p><strong>f/X as setting</strong>: the aperture to set on your camera (e.g., "set f/8")</p>
                <p><strong>f/X as measurement</strong>: indicates the flash light intensity. A flash that "gives f/11" is more powerful than one that "gives f/5.6".</p>
                <p>In this app, <strong>flash reading</strong> = what your flash meter shows. <strong>Desired aperture</strong> = the setting you want to use for your artistic choice.</p>
            </div>
            
            <h4>Typical Workflow</h4>
            <ol>
                <li>Set your flash to a starting power</li>
                <li>Measure with flash meter → note the indicated f/X</li>
                <li>Enter this reading and the aperture you want</li>
                <li>The app tells you how much to adjust the power</li>
            </ol>
            
            <h4>EV Mode vs Fractions</h4>
            <ul>
                <li><strong>EV</strong>: adjustment in exposure values (Profoto, Broncolor style)</li>
                <li><strong>Fractions</strong>: adjustment in power fractions (1/1, 1/2, 1/4... Godox, Neewer style)</li>
            </ul>
            
            <h4>HSS Mode (High-Speed Sync)</h4>
            <p>Allows shooting above sync speed (e.g., 1/1000 instead of 1/250).</p>
            <p><strong>Warning</strong>: HSS causes significant power loss (~2-4 EV). The reading must be taken in actual shooting conditions (in HSS if you're shooting in HSS).</p>
        `,
        ratios: `
            <h3>💡 Key/Fill Ratios Mode</h3>
            <p>For managing multi-source lighting.</p>
            
            <div class="help-box">
                <h4>Key and Fill light</h4>
                <p><strong>Key light</strong>: main source, defines base exposure</p>
                <p><strong>Fill light</strong>: secondary source, opens up shadows</p>
            </div>
            
            <h4>Common Ratios</h4>
            <ul>
                <li><strong>1:1</strong> (0 EV): flat lighting, no shadow</li>
                <li><strong>2:1</strong> (-1 EV): slight contrast, flattering portrait</li>
                <li><strong>4:1</strong> (-2 EV): marked contrast, dramatic portrait</li>
                <li><strong>8:1</strong> (-3 EV): strong contrast, chiaroscuro</li>
            </ul>
            <p>Enter your Key light reading and desired ratio, the app calculates what f/ your Fill light should be set to.</p>
        `,
        estimation: `
            <h3>🎯 No Meter Mode (incident estimation)</h3>
            <p>To estimate incident light without an external light meter, using your camera's spot metering on a reference zone.</p>
            
            <div class="help-box">
                <h4>Principle</h4>
                <p>Your camera's meter assumes everything is "18% gray". If you meter a lighter or darker zone, it will be wrong.</p>
                <p>This app corrects the error based on the metered zone.</p>
            </div>
            
            <h4>How to do it</h4>
            <ol>
                <li>Switch to spot metering mode on your camera</li>
                <li>Aim at a reference zone (skin, wall, sky...)</li>
                <li>Note the aperture suggested by the camera</li>
                <li>Select the zone type in the app</li>
                <li>The app corrects and gives the actual exposure</li>
            </ol>
            
            <h4>Common Reference Zones</h4>
            <ul>
                <li><strong>18% Gray</strong> (0 EV): concrete, green grass, foliage</li>
                <li><strong>Light skin</strong> (+1 EV): lit caucasian</li>
                <li><strong>Dark skin</strong> (-1 EV): black skin, shadow</li>
                <li><strong>White</strong> (+2 to +5 EV): snow, white wall</li>
                <li><strong>Black</strong> (-2 to -4 EV): asphalt, deep shadows</li>
            </ul>
        `
    }
};

// Langue courante
let currentLang = localStorage.getItem(LANG_KEY) || 'fr';

/**
 * Détecte la langue du navigateur
 */
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) return 'en';
    return 'fr'; // Français par défaut
}

/**
 * Initialise la langue
 */
function initLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY);
    if (!savedLang) {
        currentLang = detectBrowserLanguage();
        localStorage.setItem(LANG_KEY, currentLang);
    } else {
        currentLang = savedLang;
    }
    return currentLang;
}

/**
 * Obtient une traduction
 */
function t(key, params = {}) {
    let text = translations[currentLang]?.[key] || translations['fr'][key] || key;
    
    // Remplacer les paramètres {param}
    Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
    });
    
    return text;
}

/**
 * Obtient le contenu d'aide pour une section
 */
function getHelpContent(section) {
    return helpContent[currentLang]?.[section] || helpContent['fr'][section] || '';
}

/**
 * Change la langue
 */
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        
        // Mettre à jour les zones AVANT applyTranslations pour éviter le décalage
        updateEstimationZones();
        updateReflectanceGrid();
        
        applyTranslations();
        updateLanguageButton();
        
        // Recalculer les résultats pour mettre à jour les textes
        if (typeof window.calculatePosemetre === 'function') window.calculatePosemetre();
        if (typeof window.calculateFlashmetre === 'function') window.calculateFlashmetre();
        if (typeof window.calculateRatios === 'function') window.calculateRatios();
        if (typeof window.calculateEstimation === 'function') window.calculateEstimation();
        
        // Mettre à jour l'aide
        updateHelpContent();
        
        console.log('Language changed to:', lang);
    }
}

/**
 * Obtient la langue courante
 */
function getLanguage() {
    return currentLang;
}

/**
 * Bascule entre les langues
 */
function toggleLanguage() {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
}

/**
 * Met à jour le bouton de langue
 */
function updateLanguageButton() {
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        langBtn.title = currentLang === 'fr' ? 'Switch to English' : 'Passer en français';
    }
}

/**
 * Met à jour le contenu de l'aide
 */
function updateHelpContent() {
    const sections = ['general', 'posemetre', 'flash', 'ratios', 'estimation'];
    sections.forEach(section => {
        const el = document.getElementById(`help-${section}`);
        if (el) {
            el.innerHTML = getHelpContent(section);
        }
    });
}

/**
 * Met à jour les options de zones pour l'estimation
 */
function updateEstimationZones() {
    const select = document.getElementById('estim-zone');
    if (!select) {
        console.log('updateEstimationZones: select not found');
        return;
    }
    
    console.log('updateEstimationZones called, currentLang:', currentLang);
    
    const zones = [
        { value: '4', key: 'zoneWhiteBurnt' },
        { value: '3', key: 'zoneWhiteDetail' },
        { value: '2', key: 'zoneLightSkin' },
        { value: '1.5', key: 'zoneSkyOvercast' },
        { value: '1', key: 'zoneCaucasian' },
        { value: '0.5', key: 'zoneMediumLight' },
        { value: '0', key: 'zoneGray18' },
        { value: '-0.5', key: 'zoneMediumDark' },
        { value: '-1', key: 'zoneDarkSkin' },
        { value: '-2', key: 'zoneDarkStone' },
        { value: '-3', key: 'zoneBlackDetail' },
        { value: '-4', key: 'zoneBlackBlocked' }
    ];
    
    // Preserve current value or default to '1' (Light skin)
    const currentValue = select.value || '1';
    const newHTML = zones.map(z => 
        `<option value="${z.value}"${z.value === currentValue ? ' selected' : ''}>${t(z.key)}</option>`
    ).join('');
    
    console.log('updateEstimationZones: first option will be:', t('zoneWhiteBurnt'));
    select.innerHTML = newHTML;
}

/**
 * Met à jour la grille de réflectance
 */
function updateReflectanceGrid() {
    const grid = document.querySelector('.reflectance-grid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div><strong>${t('grid4')}</strong></div>
        <div><strong>${t('grid3')}</strong></div>
        <div><strong>${t('grid2')}</strong></div>
        <div><strong>${t('grid15')}</strong></div>
        <div><strong>${t('grid1')}</strong></div>
        <div><strong>${t('grid05')}</strong></div>
        <div><strong>${t('grid0')}</strong></div>
        <div><strong>${t('gridM05')}</strong></div>
        <div><strong>${t('gridM1')}</strong></div>
        <div><strong>${t('gridM2')}</strong></div>
        <div><strong>${t('gridM3')}</strong></div>
        <div><strong>${t('gridM4')}</strong></div>
    `;
}

/**
 * Applique les traductions à tous les éléments avec data-i18n
 */
function applyTranslations() {
    // Éléments avec data-i18n (texte)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            el.innerHTML = translation;
        }
    });
    
    // Éléments avec data-i18n-title (attribut title)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key);
    });
    
    // Mettre à jour le titre de la page
    document.title = t('appTitle').replace(/[📷⚡💡📊🎯📋📱📖]/g, '').trim();
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = currentLang;
}

/**
 * Initialise le système i18n
 */
function initI18n() {
    initLanguage();
    
    // Ajouter l'écouteur pour le bouton de langue
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Appliquer les traductions initiales
    applyTranslations();
    updateLanguageButton();
    updateHelpContent();
    updateEstimationZones();
    updateReflectanceGrid();
    
    console.log('i18n initialized, language:', currentLang);
}

// Export pour utilisation globale
window.i18n = {
    t,
    setLanguage,
    getLanguage,
    toggleLanguage,
    applyTranslations,
    initI18n,
    getHelpContent,
    updateHelpContent
};
