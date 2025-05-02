export function getIntent(path: string): string {
  const map: Record<string, string> = {
    '/life': 'life',
    '/home': 'home',
    '/auto': 'auto',
    '/education': 'education',
    // add more routes as needed
  };
  return map[path] ?? 'general';
} 