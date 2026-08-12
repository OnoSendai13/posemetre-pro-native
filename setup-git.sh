#!/bin/bash

# Script d'initialisation et push vers GitHub
# Assistant Posemètre Pro - lightmeter-app-pwa

echo "🚀 Initialisation du repository Git..."
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si git est installé
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    echo "Installez Git depuis: https://git-scm.com/downloads"
    exit 1
fi

echo -e "${BLUE}📝 Configuration...${NC}"
echo ""

# Demander les informations GitHub
read -p "Nom d'utilisateur GitHub: " github_username
read -p "Email GitHub: " github_email
read -p "Nom du repository (défaut: lightmeter-app-pwa): " repo_name
repo_name=${repo_name:-lightmeter-app-pwa}

echo ""
echo -e "${BLUE}🔧 Initialisation du repository local...${NC}"

# Initialiser Git
git init

# Configurer l'utilisateur
git config user.name "$github_username"
git config user.email "$github_email"

# Ajouter tous les fichiers
echo ""
echo -e "${BLUE}📦 Ajout des fichiers...${NC}"
git add .

# Créer le premier commit
echo ""
echo -e "${BLUE}💾 Création du commit initial...${NC}"
git commit -m "Initial commit - Assistant Posemètre Pro v1.0

- 4 modes: Posemètre, Flashmètre, Ratios Key/Fill, Estimation
- Switch IL/Fractions (Profoto compatible)
- Grille réflectance enrichie (exemples concrets quotidien)
- Compensation d'exposition complète
- ISO standard uniquement (37 valeurs)
- Affichage dixièmes IL (format professionnel)
- PWA installable offline
- 20 Ko optimisé
- JavaScript vanilla (0 dépendances)"

# Renommer la branche en 'main'
git branch -M main

echo ""
echo -e "${GREEN}✅ Repository local initialisé${NC}"
echo ""
echo -e "${BLUE}📡 Prochaines étapes:${NC}"
echo ""
echo "1. Créer le repository sur GitHub:"
echo "   ${BLUE}https://github.com/new${NC}"
echo ""
echo "2. Nom du repository: ${GREEN}$repo_name${NC}"
echo ""
echo "3. Puis exécuter ces commandes:"
echo ""
echo -e "   ${GREEN}git remote add origin https://github.com/$github_username/$repo_name.git${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo "Ou avec SSH:"
echo ""
echo -e "   ${GREEN}git remote add origin git@github.com:$github_username/$repo_name.git${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${BLUE}💡 Astuce:${NC} Pour créer le repo via API GitHub:"
echo ""
echo "curl -u \"$github_username\" https://api.github.com/user/repos -d '{\"name\":\"$repo_name\",\"description\":\"Assistant Posemètre Pro - PWA pour photographes professionnels\",\"private\":false}'"
echo ""
echo -e "${GREEN}✨ Configuration terminée !${NC}"
