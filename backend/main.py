from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import os

# [LOGIQUE] : Initialisation de l'API FastAPI
app = FastAPI(title="Cafe Performance API", description="API de prédiction des ventes")

# [LOGIQUE] : Configuration CORS pour permettre au Frontend (Vite/React) d'appeler l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # [SENIOR] : En prod, limiter aux domaines spécifiques
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# [LOGIQUE] : Modèle de données pour valider la requête entrante
# [SYNTAXE] : Pydantic garantit que les types sont corrects (int, bool, float)
class PredictionInput(BaseModel):
    nb_clients: int
    est_weekend: bool
    saison: str  # 'été' ou 'hiver'
    pic_journee: bool

# [LOGIQUE] : Chargement du modèle entraîné au démarrage
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models/model.joblib")
try:
    model = joblib.load(MODEL_PATH)
    print("✅ Modèle ML chargé avec succès")
except Exception as e:
    print(f"❌ Erreur chargement modèle : {e}")
    model = None

@app.get("/")
def home():
    return {"message": "API Cafe Performance est en ligne", "status": "ok"}

@app.post("/predict")
def predict(data: PredictionInput):
    # [LOGIQUE] : Transformation des inputs pour correspondre au format attendu par le modèle
    # [SYNTAXE] : On crée un DataFrame car le modèle a été entraîné avec pandas
    saison_encoded = 1 if data.saison.lower() == "été" else 0
    
    input_df = pd.DataFrame([{
        "nb_clients": data.nb_clients,
        "est_weekend": int(data.est_weekend),
        "saison_encoded": saison_encoded,
        "pic_journee": int(data.pic_journee)
    }])
    
    if model:
        # [LOGIQUE] : Exécution de la prédiction
        prediction = model.predict(input_df)[0]
        return {
            "prediction_ventes": round(float(prediction), 2),
            "devise": "€"
        }
    else:
        return {"error": "Modèle non disponible"}

if __name__ == "__main__":
    # [SYNTAXE] : Lancement du serveur uvicorn sur le port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
