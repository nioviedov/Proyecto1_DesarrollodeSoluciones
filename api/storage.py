# storage.py
from typing import List, Dict, Any
import pandas as pd

class Storage:
    def save(self, user_id: str,input_data:Dict, prediction: Dict[str, Any]):
        raise NotImplementedError
    
    def get_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        raise NotImplementedError
    
    def get_all(self) -> List[Dict[str, Any]]:
        raise NotImplementedError

class InMemoryStorage(Storage):
    def __init__(self):
        self.data = []
    
    def save(self, user_id: str,input_data:Dict, prediction: Dict[str, Any]):
        self.data.append({"user_id": user_id, **prediction})
    
    def get_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        return [p for p in self.data if p["user_id"] == user_id]
    
class CSVSotarge(Storage):
    def __init__(self):
        super().__init__()
        self.file_name = 'input_data.csv'

    def save(self,user_id: str,input_data:Dict, prediction: Dict[str, Any]):
        # Cargar el archivo CSV si existe, de lo contrario, crear un DataFrame vacío
        try:
            df = pd.read_csv(self.file_name)
        except FileNotFoundError:
            df = pd.DataFrame()
        
        # Crear un nuevo diccionario con los datos a agregar
        new_entry = {"UserID": user_id, **input_data, **prediction}
        
        # Convertirlo en un DataFrame y agregarlo al existente
        new_df = pd.DataFrame([new_entry])
        df = pd.concat([df, new_df], ignore_index=True)
        
        # Guardar el DataFrame actualizado en el archivo CSV
        df.to_csv(self.file_name, index=False)


    def get_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        try:
            df = pd.read_csv(self.file_name)
        except FileNotFoundError:
            return []
        
        if "UserID" not in df.columns:
            return []
        # print("LL",print(df.dtypes))
        df['date_time'] = pd.to_datetime(df['date_time'])
        # print("LLa",print(df.dtypes))

        user_data = df[df["UserID"] == user_id]
        user_data = user_data.sort_values(by="date_time", ascending=True)
        
        return user_data.to_dict(orient="records")