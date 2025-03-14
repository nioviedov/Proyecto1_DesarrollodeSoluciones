# models.py
from pydantic import BaseModel

class PredictionInput(BaseModel):
    # binary questions
    HighBP: int
    HighChol: int
    CholCheck: int
    Smoker: int
    Stroke: int
    HearthDiseaseOrAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    AnyHealthcare: int
    NoDocbcCost: int
    DiffWalk: int

    #sex
    Sex:int
    
    #BMI
    Weight:int
    Height:float
    #1-30
    MentHlth:int
    PhysHlth:int


    #choice questions
    GenHlth:int
    Age:int
    Education:int
    Income:int

class PredictionResponse(BaseModel):
    user_id: str
    prediction: str