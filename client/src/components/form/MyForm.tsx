import { Section, Form, Input, Button } from './styles'
import { useState, useEffect } from 'react'
import socket from '../../services/ioSocket'

const MyForm = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('auth', async (data) => {
      socket.emit('auth', {
        username: await getUserName(),
        serverOffset: 0,
      })
      console.log('Authenticating...', data)
    })

    socket.on('connection', () => {
      console.log('Connected to the server')
    })

    socket.on('chat-message', (message, rowId) => {
      console.log('Received message:', message)
      console.log('Server offset:', rowId)
    })

    socket.on('connection', (data) => {
      console.log(data)
      setMessage(data)
    })
  }, [message])

  const getUserName = async () => {
    const username = localStorage.getItem('username')
    if (username) {
      console.log('User exists:', username)
      return username
    }

    const res = await fetch('https://randomuser.me/api/users/random_user')
    const { usernmane: randomUsername } = await res.json()

    localStorage.setItem('username', randomUsername)
    return randomUsername
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('chat-message', message)
    setMessage('')
  }

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="message"
          id="input-message"
          placeholder="Write a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Section>
  )
}

export default MyForm
