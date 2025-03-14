# caching.py
import pandas as pd
from functools import lru_cache

@lru_cache(maxsize=1)
def get_descriptive_data():
    df = pd.read_csv("data/descriptive_data.csv")
    return df.to_dict(orient="records")


