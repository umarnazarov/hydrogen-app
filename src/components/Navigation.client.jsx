import {Link} from '@shopify/hydrogen/client';
import { Suspense } from 'react';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Suspense fallback="Load">
            <Link
              to={`/collections/${collection.handle}`}
              className="block p-4 text-sm font-medium hover:opacity-80"
            >
              {collection.title}
            </Link>
            </Suspense>
          </li>
        ))}
      </ul>
    </nav>
  );
}
