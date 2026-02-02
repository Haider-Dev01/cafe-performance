# ☕ Cafe Performance Analysis

Projet complet d'analyse et de prédiction des ventes pour un réseau de cafés. Ce projet couvre toute la chaîne : de la génération de données à l'interface utilisateur.

## 🚀 Setup & Installation

1. **Cloner le projet**
2. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```
3. **Frontend (si besoin de rebuild)** :
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📈 Structure du Projet

- `notebooks/` : Pipeline de données (Visualisation, Feature Engineering, ML)
- `backend/` : API FastAPI pour les prédictions en temps réel
- `frontend/` : Interface React/Vite minimaliste et élégante
- `data/` : Données brutes et enrichies
- `outputs/figures/` : Visualisations auto-générées
- `docs/` : Documentation technique (UML, Pipeline)

## 🛠️ Exécution Pas à Pas

### 1. Analyse des données (Notebooks)

Exécutez les notebooks dans l'ordre pour voir l'analyse métier :

- `03_visualisation.ipynb` : Génération des graphiques.
- `04_feature_engineering.ipynb` : Création des indicateurs 'saison', 'panier_moyen'.
- `05_ml_baseline.ipynb` : Entraînement du modèle RandomForest.

### 2. Lancement du Backend

```bash
python backend/main.py
```

L'API sera disponible sur `http://localhost:8000`.

### 3. Utilisation de l'Interface

Ouvrez `frontend/index.html` (après build) ou utilisez `npm run dev`. Saisissez les paramètres prévus pour obtenir une estimation immédiate du chiffre d'affaires.

## 🎓 Note Pédagogique

Ce projet utilise des commentaires structurés :

- `# [LOGIQUE]` : Pourquoi cette opération métier.
- `# [SYNTAXE]` : Explication technique.
- `# [SENIOR]` : Conseils d'optimisation et bonnes pratiques.

---

_Projet Portfolio-Ready - Expert Fullstack AI/ML_
