from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.database import users_collection
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

# Configuration
SECRET_KEY = "youss"  # Replace with a strong secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 255

# Create JWT
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})  # Ensure 'sub' is set
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Verify JWT
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    

# OAuth2 scheme for the token endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# get current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        return None  # Invalid token

    username = payload.get("sub")  # Extract username from token payload
    if not username:
        return None

    user = await users_collection.find_one({"username": username})
    return user
