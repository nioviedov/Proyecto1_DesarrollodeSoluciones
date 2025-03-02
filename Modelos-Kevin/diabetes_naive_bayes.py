### Importacion de librerias necesarias
import pandas as pd
from imblearn.under_sampling import NearMiss
from sklearn.model_selection import train_test_split 
from sklearn.metrics import accuracy_score, f1_score, mean_squared_error


import mlflow
import mlflow.sklearn
from sklearn.naive_bayes import GaussianNB

### Importacion conjunto de datos diabetes
data = pd.read_csv('diabetes_binary.csv')
data.head()

# eliminacion de registros duplicados
duplicates = len(data[data.duplicated()])
data = data.drop_duplicates()

# variable dependiente y variables independientes
X=data.drop('Diabetes_binary',axis=1)
y=data['Diabetes_binary']

# submuestreo para balanceo de clases
nm = NearMiss(version=1, n_neighbors=15)
x_sm, y_sm = nm.fit_resample(X,y)
y_sm.value_counts() 

# division datos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(x_sm, y_sm, test_size=0.2, random_state=42)

# defina el servidor para llevar el registro de modelos y artefactos
# mlflow.set_tracking_uri('http://localhost:5000')
# registre el experimento
experiment = mlflow.set_experiment("diabetes-naivebayes")

# Aquí se ejecuta MLflow sin especificar un nombre o id del experimento. MLflow los crea un experimento para este cuaderno por defecto y guarda las características del experimento y las métricas definidas. 
# Para ver el resultado de las corridas haga click en Experimentos en el menú izquierdo. 
with mlflow.start_run(experiment_id=experiment.experiment_id):
    # defina los parámetros del modelo
    var_smoothing = 1e-9 
  
    # Cree el modelo con los parámetros definidos y entrénelo
    nb = GaussianNB(var_smoothing = var_smoothing)
    
    nb.fit(X_train, y_train)
    # Realice predicciones de prueba
    predictions = nb.predict(X_test)
  
    # Registre los parámetros
    mlflow.log_param("suav_varianza", var_smoothing)
  
    # Registre el modelo
    mlflow.sklearn.log_model(nb, "naive-bayes-model")
  
    # Cree y registre la métrica de interés
    accuracy = accuracy_score(y_test, predictions)
    f1 = f1_score(y_test, predictions, average='weighted') 
    mse = mean_squared_error(y_test, predictions)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("f1-score", f1)
    mlflow.log_metric("mse", mse)
    print(accuracy)
    print(f1)
    print(mse)