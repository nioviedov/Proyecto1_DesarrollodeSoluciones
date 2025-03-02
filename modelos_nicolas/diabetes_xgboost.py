# Experimentos XGBoost Classifier

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd

from imblearn.under_sampling import NearMiss
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier

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

experiment = mlflow.set_experiment('diabetes-xgboost')

with mlflow.start_run(experiment_id=experiment.experiment_id):

    n_estimators = 100
    objective = 'binary:logistic'
    eval_metric = 'logloss'
    gamma = 0
    max_depth = 4
    min_child_weight = 3

    model = XGBClassifier(
        n_estimators=n_estimators,
        objective=objective,
        eval_metric=eval_metric,
        gamma=gamma,
        max_depth=max_depth,
        min_child_weight=min_child_weight
    )
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
  
    mlflow.log_param('n_estimators', n_estimators)
    mlflow.log_param('gamma', gamma)
    mlflow.log_param('max_depth', max_depth)
    mlflow.log_param('min_child_weight', min_child_weight)
  
    mlflow.sklearn.log_model(model, 'xbgoost-model')
  
    f1_macro = f1_score(y_test, y_pred, average='macro')
    acc = accuracy_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)

    mlflow.log_metric('f1_macro', f1_macro)
    mlflow.log_metric('accuracy', acc)
    mlflow.log_metric('mse', mse)
    
    print(f"Logged F1-Macro: {f1_macro}")
    print(f"Logged Accuracy: {acc}")
    print(f"Logged MSE: {mse}")