# services.py
from models import PredictionInput, PredictionResponse
from storage import Storage
from sklearn.base import BaseEstimator
import numpy as np
import pandas as pd
import datetime

def calculate_bmi(weight: float, height: float) -> float:
    """
    Calcula el Índice de Masa Corporal (BMI).
    
    Parámetros:
    weight (float): Peso en kilogramos.
    height (float): Altura en metros.
    
    Retorna:
    float: Valor del BMI.
    """
    if height <= 0:
        raise ValueError("La altura debe ser mayor que cero.")
    
    bmi = weight / (height ** 2)
    return round(bmi, 2)

def determinate_risk(p):
    p = float(p)
    if p < .2:
        return 0
    elif p < .4:
        return 1
    elif p < .6:
        return 2
    elif p < .8:
        return 3
    else:
        return 4

def predict_service(input_data: PredictionInput, user_id: str, model: BaseEstimator) -> PredictionResponse:
    features = np.array([[
        input_data.HighBP,
        input_data.HighChol,
        input_data.CholCheck,
        calculate_bmi(input_data.Weight,input_data.Height),
        input_data.Smoker,
        input_data.Stroke,
        input_data.HearthDiseaseOrAttack,
        input_data.PhysActivity,
        input_data.Fruits,
        input_data.Veggies,
        input_data.HvyAlcoholConsump,
        input_data.AnyHealthcare,
        input_data.NoDocbcCost,
        input_data.GenHlth,
        input_data.MentHlth,
        input_data.PhysHlth,
        input_data.DiffWalk,
        input_data.Sex,
        input_data.Age,
        input_data.Education,
        input_data.Income,
                          ]])
    prediction = model.predict(features)[0]
    return PredictionResponse(user_id=user_id, prediction=str(prediction))

def save_prediction_service(user_id: str, input_data: PredictionInput, storage: Storage, model: BaseEstimator):
    prediction = predict_service(input_data, user_id, model)
    input_data = input_data.dict()
    input_data['BMI'] = calculate_bmi(input_data['Weight'],input_data['Height'])
    prediction = prediction.dict()
    prediction['prediction_risk'] = determinate_risk(prediction['prediction'])
    input_data['date'] = datetime.date.today()
    input_data['date_time'] = datetime.datetime.now()
    storage.save(user_id,input_data, prediction)
    return {"message": "Prediction saved","prediction":prediction}

def get_predictions_service(user_id: str, storage: Storage):
    return storage.get_by_user(user_id)

def get_descriptive_data(storage:Storage):
    file_name = 'input_data.csv'
    df = pd.read_csv(file_name)
    binary_fields = ['HighBP','HighChol','CholCheck','Smoker','Stroke','HearthDiseaseOrAttack','PhysActivity',\
                     'Fruits','Veggies','HvyAlcoholConsump','AnyHealthcare','NoDocbcCost','DiffWalk','Sex']
    choice_fields = ['GenHlth','Age','Education','Income']
    fields = binary_fields + choice_fields
    histogram_fields = ['Height','Weight','BMI','MentHlth','PhysHlth']
    options = [[0,1] for i in binary_fields] + [[0,1,2,3,4] for i in choice_fields]
    names_to_show = [['No','Si'] for i in binary_fields] + [['Cat1','Cat2','Cat3','Cat4','Cat5'],['Cat1','Cat2','Cat3','Cat4','Cat5'],['Cat1','Cat2','Cat3','Cat4','Cat5'],['Cat1','Cat2','Cat3','Cat4','Cat5']]
    prediction_risks = [0,1,2,3,4]
    
    res = []
    temp = {'type':'total','total':None,'data':[]}
    for prediction in prediction_risks:
        temp['data'].append(len(df[df['prediction_risk'] == prediction]))
    temp['total'] = sum(temp['data'])
    res.append(temp)
    for index,field in enumerate(fields):
        temp = {'type':'bar_chart','name':field,'data':[],'prediction_risks':prediction_risks,'names_to_show':names_to_show[index]}
        for index2,option in enumerate(options[index]):
            res_aux = {'name':option,'name_to_show':names_to_show[index][index2]}
            for prediction in prediction_risks:
                res_aux[prediction] = len(df[(df[field] == option) & (df['prediction_risk'] == prediction)])
            # print('field',field,type(aux),'aux',aux.to_dict())
            temp['data'].append(res_aux)
        res.append(temp)
    for index,field in enumerate(histogram_fields):
        temp = {'type':'bar_chart','name':field,'data':[],'prediction_risks':prediction_risks,'names_to_show':names_to_show[index]}

        hist = df[field].value_counts(bins=5, sort=False)
        intervals = hist.index  # Esto devuelve un Index de Intervalos
        # print('\n\n>>>',intervals)
        for index2,selected_interval in enumerate(intervals):
            res_aux = {'name':option,'name_to_show':f'{selected_interval.left} , {selected_interval.right}'}

            for prediction in prediction_risks:
                res_aux[prediction] = len(df[df[field].between(selected_interval.left, selected_interval.right) & (df['prediction_risk'] == prediction)])
            temp['data'].append(res_aux)
        # print('\n\n>>',type(hist),hist.to_dict())
        res.append(temp)
    
    return res