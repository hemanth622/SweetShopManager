import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <AuthForm
      onLogin={(username, password) => console.log('Login attempted:', username, password)}
      onRegister={(username, password, confirmPassword) => 
        console.log('Register attempted:', username, password, confirmPassword)
      }
    />
  );
}