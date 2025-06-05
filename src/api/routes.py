from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
CORS(api)

SECRET_KEY = "super-secret-key"

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=data["email"])
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token}), 200

@api.route('/private', methods=['GET'])
def private():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"msg": "Token requerido"}), 401

    try:
        token = auth_header.split(" ")[1]
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = User.query.get(data["user_id"])
        return jsonify({"msg": f"Bienvenido, usuario {user.email}"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"msg": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"msg": "Token inválido"}), 401
