import AuthForm from "@/components/AuthForm";

interface AuthPageProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string, confirmPassword: string) => void;
}

export default function AuthPage({ onLogin, onRegister }: AuthPageProps) {
  return <AuthForm onLogin={onLogin} onRegister={onRegister} />;
}