from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.metrics import mean_squared_error, accuracy_score, f1_score, classification_report
from sklearn.neural_network import MLPClassifier
from imblearn.under_sampling import NearMiss

data = pd.read_csv("diabetes_binary_health_indicators_BRFSS2015.csv")
data = data.drop_duplicates()

X = data.drop('Diabetes_binary', axis=1)
y = data["Diabetes_binary"]

## Implementación de submuestreo:
nm = NearMiss(version = 1 , n_neighbors = 10)
x_sm, y_sm= nm.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(x_sm, y_sm, test_size=0.3, random_state=42)

import mlflow
import mlflow.sklearn

# defina el servidor para llevar el registro de modelos y artefactos
#mlflow.set_tracking_uri('http://localhost:5000')
# registre el experimento
experiment = mlflow.set_experiment("sklearn-diab-mlp")

# Aquí se ejecuta MLflow sin especificar un nombre o id del experimento. MLflow los crea un experimento para este cuaderno por defecto y guarda las características del experimento y las métricas definidas. 
# Para ver el resultado de las corridas haga click en Experimentos en el menú izquierdo. 
with mlflow.start_run(experiment_id=experiment.experiment_id):
    # defina los parámetros del modelo
    solver = "adam"
    alpha=5e-5
    hidden_layer_sizes=(50,10)
    # Cree el modelo con los parámetros definidos y entrénelo
    clf_mlp = MLPClassifier(solver=solver, alpha=alpha, hidden_layer_sizes=hidden_layer_sizes, random_state=42)
    clf_mlp.fit(x_sm, y_sm)
    # Realice predicciones de prueba
    predictions = clf_mlp.predict(X_test)
  
    # Registre los parámetros
    mlflow.log_param("solver", solver)
    mlflow.log_param("alpha", alpha)
    mlflow.log_param("hidden_layer_sizes", hidden_layer_sizes)
  
    # Registre el modelo
    mlflow.sklearn.log_model(clf_mlp, "MLP-model")
  
    # Cree y registre la métrica de interés
    mse = mean_squared_error(y_test, predictions)
    acc = accuracy_score(y_test, predictions)
    f1_macro = f1_score(y_test, predictions, average='macro')
    mlflow.log_metric("mse", mse)
    mlflow.log_metric("accuracy", acc)
    mlflow.log_metric("f1_macro", f1_macro)
    print(mse, acc, f1_macro)