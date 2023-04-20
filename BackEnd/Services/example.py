import sys
sys.path.append('..')
from app import bcrypt, db
from models.models import User, UserSchema

def hashPassword(toHash):
    passHash = bcrypt.generate_password_hash(toHash).decode('utf-8')
    return passHash

def checkPassword(username, password):
    if bcrypt.check_password_hash(password, User.findAll(filter=username).getOne().passHash) :
        return True
    return False
