import { FC, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  isRead: boolean
}

export const MessageCenter: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages')
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Feil ved henting av meldinger:', error)
      }
    }

    const interval = setInterval(fetchMessages, 30000) // Poll hver 30. sekund
    fetchMessages()

    return () => clearInterval(interval)
  }, [user?.id])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: user?.role === 'client' ? 'psykolog-id' : 'client-id', // Må tilpasses
        }),
      })

      if (response.ok) {
        setNewMessage('')
        // Oppdater meldingslisten
        const data = await response.json()
        setMessages(prev => [...prev, data])
      }
    } catch (error) {
      console.error('Feil ved sending av melding:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Meldinger</h2>
      
      <div className="h-96 overflow-y-auto mb-4 border rounded p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded ${
              message.senderId === user?.id
                ? 'bg-blue-100 ml-auto'
                : 'bg-gray-100'
            } max-w-[80%]`}
          >
            <p>{message.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleString('nb-NO')}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Skriv en melding..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}