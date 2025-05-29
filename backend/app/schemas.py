from pydantic import BaseModel

class Place(BaseModel):
    id: int
    name: str
    lat: float
    lon: float

    class Config:
        orm_mode = True