import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const validTypes = ['life', 'auto', 'home', 'health', 'disability', 'term-life', 'permanent-life', 'short-term-disability', 'supplemental-health'];

export default function QuotePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const type = searchParams.type as string;
  
  // If type is provided and valid, redirect to that type's page
  if (type && validTypes.includes(type)) {
    redirect(`/${type}`);
  }

  // Default to life insurance if no type is provided or type is invalid
  redirect('/life');
} 