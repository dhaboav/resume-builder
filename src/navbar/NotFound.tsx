import { Button } from '@/shared/ui';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <header className="flex h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <h1 className="mb-4 text-8xl font-bold tracking-tight text-red-600">404</h1>

      <p className="mb-2 text-4xl font-bold tracking-tight text-white">Page not found.</p>

      <p className="mb-2 max-w-sm text-lg font-light text-gray-400">
        Oops! We can't seem to find the page you're looking for.
      </p>

      <Link to="/">
        <Button>Home</Button>
      </Link>
    </header>
  );
}
