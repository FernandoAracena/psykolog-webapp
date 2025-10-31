from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.message import Message
from app import db
from datetime import datetime

message_bp = Blueprint('message', __name__)

@message_bp.route('/api/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    
    messages = Message.query.filter(
        (Message.sender_id == current_user_id) | 
        (Message.receiver_id == current_user_id)
    ).order_by(Message.timestamp.asc()).all()
    
    return jsonify([{
        'id': msg.id,
        'senderId': msg.sender_id,
        'receiverId': msg.receiver_id,
        'content': msg.content,
        'timestamp': msg.timestamp.isoformat(),
        'isRead': msg.is_read
    } for msg in messages])

@message_bp.route('/api/messages', methods=['POST'])
@jwt_required()
def send_message():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('content') or not data.get('receiverId'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_message = Message(
        sender_id=current_user_id,
        receiver_id=data['receiverId'],
        content=data['content'],
        timestamp=datetime.utcnow(),
        is_read=False
    )
    
    db.session.add(new_message)
    db.session.commit()
    
    return jsonify({
        'id': new_message.id,
        'senderId': new_message.sender_id,
        'receiverId': new_message.receiver_id,
        'content': new_message.content,
        'timestamp': new_message.timestamp.isoformat(),
        'isRead': new_message.is_read
    }), 201

@message_bp.route('/api/messages/mark-read', methods=['POST'])
@jwt_required()
def mark_messages_read():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('messageIds'):
        return jsonify({'error': 'Missing messageIds'}), 400
    
    # Oppdater meldinger som tilhører denne brukeren
    Message.query.filter(
        Message.id.in_(data['messageIds']),
        Message.receiver_id == current_user_id
    ).update({Message.is_read: True}, synchronize_session=False)
    
    db.session.commit()
    return jsonify({'message': 'Messages marked as read'})