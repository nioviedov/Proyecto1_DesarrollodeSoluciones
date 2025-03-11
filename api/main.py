from fastapi import FastAPI
from storage import InMemoryStorage,CSVSotarge
from models import PredictionInput, PredictionResponse
from services import predict_service, save_prediction_service, get_predictions_service
from models_manager import ModelManager
from sklearn.linear_model import LogisticRegression
from services import get_descriptive_data
from typing import List, Dict, Any
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
storage = CSVSotarge()
model_manager = ModelManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP
    allow_headers=["*"],  # Permite todos los encabezados
)

# Agregar modelos disponibles
model_manager.add_model("logistic_regression", LogisticRegression())

@app.post("/predict", response_model=PredictionResponse)
def predict(input_data: PredictionInput, user_id: str='user_1', model_name: str = None):
    return predict_service(input_data, user_id, model_manager.get_model(model_name))

@app.post("/save_prediction")
def save_prediction( input_data: PredictionInput,user_id: str='user_1', model_name: str =None):
    # if user_id is None:
    #     user_id = 'user_1'
    return save_prediction_service(user_id, input_data, storage, model_manager.get_model(model_name))

@app.get("/predictions", response_model=list[Any])
def get_predictions(user_id: str):
    return get_predictions_service(user_id, storage)

@app.get("/descriptive_data")
def descriptive_data():
    res = get_descriptive_data(storage)
    print('-->',res)
    return jsonable_encoder(res)







