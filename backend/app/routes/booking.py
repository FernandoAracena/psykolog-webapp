from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required
from app.models.booking import Booking
from app import db

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/api/availability', methods=['GET'])
def get_availability():
    week_start = request.args.get('week')
    if not week_start:
        return jsonify({'error': 'Week parameter is required'}), 400

    try:
        start_date = datetime.strptime(week_start, '%Y-%m-%d')
        end_date = start_date + timedelta(days=5)  # Man-Fre
        
        # Hent alle bookinger for denne uken
        bookings = Booking.query.filter(
            Booking.datetime >= start_date,
            Booking.datetime < end_date
        ).all()
        
        # Generer tilgjengelighet
        availability = {}
        booked_slots = {b.datetime.strftime('%Y-%m-%d %H:%M'): True for b in bookings}
        
        current_date = start_date
        while current_date < end_date:
            date_key = current_date.strftime('%Y-%m-%d')
            availability[date_key] = []
            
            # Arbeidstimer 09:00-16:00
            for hour in range(9, 17):
                time_str = f"{hour:02d}:00"
                slot_datetime = f"{date_key} {time_str}"
                
                availability[date_key].append({
                    'time': time_str,
                    'available': not booked_slots.get(slot_datetime, False)
                })
            
            current_date += timedelta(days=1)
        
        return jsonify(availability)
    
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

@booking_bp.route('/api/book', methods=['POST'])
@jwt_required()
def book_appointment():
    data = request.get_json()
    
    try:
        booking_datetime = datetime.fromisoformat(data['datetime'])
        
        # Sjekk om tiden er tilgjengelig
        existing_booking = Booking.query.filter_by(datetime=booking_datetime).first()
        if existing_booking:
            return jsonify({'error': 'Time already booked'}), 400
        
        new_booking = Booking(
            user_id=data['userId'],
            datetime=booking_datetime,
            notes=data.get('notes', '')
        )
        
        db.session.add(new_booking)
        db.session.commit()
        
        # Send bekreftelsesmail (implementeres senere)
        
        return jsonify({
            'message': 'Booking confirmed',
            'booking_id': new_booking.id
        }), 201
        
    except KeyError:
        return jsonify({'error': 'Missing required fields'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid datetime format'}), 400