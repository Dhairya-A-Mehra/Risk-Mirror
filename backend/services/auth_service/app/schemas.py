from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str  # UUID will be converted to string
    email: EmailStr

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str
