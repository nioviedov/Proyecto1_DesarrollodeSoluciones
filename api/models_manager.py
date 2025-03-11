# models_manager.py
from typing import Dict
from sklearn.base import BaseEstimator

class FakeModel():

    def __init__(self):
        pass

    def predict(self,data):
        return [.2]

class ModelManager:
    def __init__(self):
        self.models: Dict[str, BaseEstimator] = {}
    
    def add_model(self, name: str, model: BaseEstimator):
        self.models[name] = model
    
    def get_model(self, name: str) -> BaseEstimator:
        if name not in self.models:
            return FakeModel()
            # raise ValueError(f"Model {name} not found")
        return self.models[name]

