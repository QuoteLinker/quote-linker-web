import { redirect } from 'next/navigation';

export default function AgentSignupRedirect() {
  redirect('/agents/signup');
  return null;
} 