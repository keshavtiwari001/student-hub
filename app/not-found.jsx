import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getFeaturedTools } from '@/data/toolsData';
import ToolCard from '@/components/ui/ToolCard';

export const metadata = {
  title: 'Page Not Found (404)',
  description: 'The page you are looking for doesn\'t exist. Explore StudentHub tools instead.',
};

export default function NotFound() {
  const featured = getFeaturedTools().slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
      <p className="text-7xl font-black text-blue-600 dark:text-blue-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you were looking for doesn't exist or may have moved. Head back home or try one
        of our most popular tools below.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/">
          <Button size="lg">Go to Homepage</Button>
        </Link>
        <Link href="/tools">
          <Button variant="outline" size="lg">Browse All Tools</Button>
        </Link>
      </div>

      <div className="mt-16 text-left">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 text-center">
          Popular tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
