from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.booking import Booking
from app.models.user import User
from app import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/bookings', methods=['GET'])
@jwt_required()
def get_bookings():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'psychologist':
        return jsonify({'error': 'Unauthorized'}), 403
    
    # Hent alle fremtidige bookinger
    bookings = Booking.query.join(User).filter(
        Booking.datetime >= datetime.utcnow()
    ).order_by(Booking.datetime.asc()).all()
    
    return jsonify([{
        'id': booking.id,
        'datetime': booking.datetime.isoformat(),
        'userId': booking.user_id,
        'userName': f"{booking.user.first_name} {booking.user.last_name}",
        'notes': booking.notes
    } for booking in bookings])

@admin_bp.route('/api/bookings/<int:booking_id>/<action>', methods=['POST'])
@jwt_required()
def handle_booking(booking_id, action):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'psychologist':
        return jsonify({'error': 'Unauthorized'}), 403
    
    booking = Booking.query.get_or_404(booking_id)
    
    if action == 'approve':
        booking.status = 'approved'
    elif action == 'reject':
        booking.status = 'rejected'
    elif action == 'complete':
        booking.status = 'completed'
    else:
        return jsonify({'error': 'Invalid action'}), 400
    
    db.session.commit()
    
    return jsonify({
        'message': f'Booking {action}d successfully',
        'bookingId': booking_id,
        'status': booking.status
    })