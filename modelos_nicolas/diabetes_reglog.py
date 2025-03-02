# Experimentos Regresión Logística

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd

from imblearn.under_sampling import NearMiss
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

path_data = '../data.csv'
data_raw = pd.read_csv(path_data)

data = data_raw.copy()
data = data.rename(columns={'Diabetes_012': 'Diabetes'})
data.loc[data['Diabetes'] == 1, 'Diabetes'] = 0
data.loc[data['Diabetes'] == 2, 'Diabetes'] = 1
data = data.drop_duplicates().reset_index(drop=True)

X = data.drop(['Diabetes'], axis=1)
y = data['Diabetes']

nm = NearMiss(n_neighbors=10)
X_res, y_res = nm.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(X_res, y_res, test_size=0.2, random_state=42)

experiment = mlflow.set_experiment('diabetes-reglog')

with mlflow.start_run(experiment_id=experiment.experiment_id):

    c = 1.0
    solver = 'newton-cg' # newton-cg, lbfgs, liblinear
    class_weight = None
    random_state = 42
    
    model = LogisticRegression(c=c, solver=solver, class_weight=class_weight, random_state=random_state)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
  
    mlflow.log_param('c', c)
    mlflow.log_param('solver', solver)
    mlflow.log_param('class_weight', class_weight)
  
    mlflow.sklearn.log_model(model, 'logistic-regression-model')
  
    f1_macro = f1_score(y_test, y_pred, average='macro')
    acc = accuracy_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)

    mlflow.log_metric('f1_macro', f1_macro)
    mlflow.log_metric('accuracy', acc)
    mlflow.log_metric('mse', mse)
    
    print(f"Logged F1-Macro: {f1_macro}")
    print(f"Logged Accuracy: {acc}")
    print(f"Logged MSE: {mse}")