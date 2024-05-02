import { Metadata } from 'next';
import Auth from './components/Auth';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Home() {
  return <Auth />;
}
