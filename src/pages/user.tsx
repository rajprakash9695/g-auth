import useAuth from '../hooks/useAuth';

export default function User() {
  const { user } = useAuth();

  console.log('log: user', user);

  return (
    <>
      <h1>User</h1>
    </>
  );
}
