import useAuth from '../hooks/useAuth';
import { socket } from '../utils/socket';

export default function User() {
  const { user } = useAuth();

  function sendMessage() {
    socket.emit('chat:create', { ...user });
  }

  return (
    <>
      <h1>User</h1>

      <button onClick={sendMessage}>send message</button>
    </>
  );
}
