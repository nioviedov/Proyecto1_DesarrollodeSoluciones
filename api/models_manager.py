# models_manager.py
from typing import Dict
from sklearn.base import BaseEstimator
import pickle
from sklearn.neural_network import MLPClassifier

file_path = "model_mlp.pkl"


class FakeModel():

    def __init__(self):
        pass

    def predict(self,data):
        return [.2]
    
class MyMLPClassifier():
    def __init__(self):
        # self.model  = MLPClassifier(solver='adam', alpha=5e-5, hidden_layer_sizes=(300, 5), random_state=42)
        with open(file_path, "rb") as file:
            self.model = pickle.load(file)
    
    def predict(self,data):
        print('DATA',type(data),data)
#         data = [[	1.0,
# 	1.0,
# 	1.0,
# 	27.0,
# 	1.0,
# 	0.0,
# 	0.0,
# 	1.0,
# 	1.0,
# 	0.0,
# 	0.0,
# 	1.0,
# 	0.0,
# 	3.0,
# 	0.0,
# 	0.0,
# 	0.0,
# 	1.0,
# 	11.0,
# 	5.0,
# 	7.0,
# ]]
        print('CC',len(data))
        prediction = self.model.predict_proba(data)
        print('P2PP',prediction)

        prediction = [prediction[0][1]]
        return prediction


class ModelManager:
    def __init__(self):
        self.models: Dict[str, BaseEstimator] = {}
    
    def add_model(self, name: str, model: BaseEstimator):
        self.models[name] = model
    
    def get_model(self, name: str) -> BaseEstimator:
        print('name model',name)
        if name == 'mlp':
            print('kkkk')
            return MyMLPClassifier()
        if name not in self.models:
            return FakeModel()
            # raise ValueError(f"Model {name} not found")
        return self.models[name]

