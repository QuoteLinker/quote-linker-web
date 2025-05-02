export function getIntent(path: string): string {
  const map: Record<string, string> = {
    '/life': 'LIFE',
    '/home': 'HOME',
    '/auto': 'AUTO',
    '/education': 'LIFE', // or another supported type if preferred
    // add more routes as needed
  };
  // Default to 'AUTO' if not found
  return map[path] ?? 'AUTO';
} 