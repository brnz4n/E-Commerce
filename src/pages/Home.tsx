import { Hero } from '../components/Hero';
import { CategoryLinks } from '../components/CategoryLinks';
import { FeaturedProducts } from '../components/FeaturedProducts';

export function Home() {
return (
    <main>
        <Hero />
        <CategoryLinks />
        <FeaturedProducts />
    </main>
);
}