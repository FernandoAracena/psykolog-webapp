from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(
            identity=user.id,
            additional_claims={'role': user.role}
        )
        
        return jsonify({
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role,
                'firstName': user.first_name,
                'lastName': user.last_name
            }
        })
        
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        email=data['email'],
        role='client',  # Standard rolle for nye brukere
        first_name=data.get('firstName'),
        last_name=data.get('lastName')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(
        identity=user.id,
        additional_claims={'role': user.role}
    )
    
    return jsonify({
        'token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'firstName': user.first_name,
            'lastName': user.last_name
        }
    }), 201

@auth_bp.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'firstName': user.first_name,
        'lastName': user.last_name
    })