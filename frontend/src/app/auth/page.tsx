import { redirect } from 'next/navigation';

export default async function AuthenticationPage() {
  redirect('/auth/login');
}
