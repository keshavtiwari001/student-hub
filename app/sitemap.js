import { TOOLS, CATEGORIES } from '@/data/toolsData';

export default async function sitemap() {
  const baseUrl = 'https://studenthub.com';

  // Static routes
  const staticRoutes = [
    '',
    '/student-dashboard',
    '/tools',
    '/calculators',
    '/productivity',
    '/about',
    '/contact',
    '/faq',
    '/feedback',
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Tool routes
  const toolRoutes = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...toolRoutes];
}
