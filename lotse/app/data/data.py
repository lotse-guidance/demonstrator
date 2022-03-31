import datetime
import os
from typing import List, Optional
import pandas as pd

from fastapi import APIRouter
from pydantic import BaseModel


class SimpleMeasurement(BaseModel):
    id: int
    station: str
    date: str
    continent: str = None

    humidity: float
    pressure: float
    temperature: float

    hovered: Optional[List[str]] = []


router = APIRouter(
    prefix="/measurements",
    tags=["measurements"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[SimpleMeasurement])
def read_measurements():
    base_path = os.path.dirname(__file__)
    df = pd.read_csv(os.path.join(base_path, 'measurements.csv'), sep=';')
    return [SimpleMeasurement(**row) for row in df.to_dict(orient='records')]


