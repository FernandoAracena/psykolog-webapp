'use client'

import * as React from 'react'
import { Calendar } from '@/components/booking/Calendar'
import { BookingForm } from '@/components/booking/BookingForm'
import { useAuth } from '@/contexts/AuthContext'

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const { user } = useAuth()

  return (
    <div className="bg-light py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary text-center mb-12">Bestill Time</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-md">
          <Calendar 
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          
          {selectedDate && (
            <BookingForm 
              selectedDate={selectedDate}
              userId={user?.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}