import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login - Mazo Sindhudurg',
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
