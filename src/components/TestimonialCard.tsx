import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface TestimonialCardProps {
  text: string;
}

export default function TestimonialCard({ text }: TestimonialCardProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 shadow-sm">
      <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
      <span className="text-sm text-blue-900 font-medium">{text}</span>
    </div>
  );
} 