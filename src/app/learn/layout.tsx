import { Metadata } from 'next';
import { metadata } from './metadata';
import EducationLayoutClient from '@/components/learn/EducationLayoutClient';

export { metadata };

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EducationLayoutClient>{children}</EducationLayoutClient>;
} 