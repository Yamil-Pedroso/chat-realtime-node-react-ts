import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Link to="/my-chat">
        <button>Go to my Chat</button>
    </Link>
  )
}

export default HomePage