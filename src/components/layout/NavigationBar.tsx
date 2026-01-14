import Link from 'next/link';
import navbarResources from '@/lib/resources/navbarResources';

export default function NavigationBar() {
  return (
    <nav className="bg-neutral-950 text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/"><img src="/logo.png" alt="CinemaPlatform Logo" className="w-auto pb-2" /></Link>
        </div>
        <div className="flex gap-8 mr-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            {navbarResources.homepage}
          </Link>
          <Link href="/program" className="hover:text-gray-300 transition-colors">
            {navbarResources.program}
          </Link>
          <Link href="/partners" className="hover:text-gray-300 transition-colors">
            {navbarResources.partners}
          </Link>
          <Link href="/rules" className="hover:text-gray-300 transition-colors">
            {navbarResources.rules}
          </Link>
        </div>
      </div>
    </nav>
  );
}