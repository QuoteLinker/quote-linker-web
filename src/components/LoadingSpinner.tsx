export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 