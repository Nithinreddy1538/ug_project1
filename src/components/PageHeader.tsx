import { ArrowLeft, Home, MapPin } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onHome?: () => void;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  onBack,
  onHome,
  showBackButton = true,
  showHomeButton = true,
}: PageHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>

          {showHomeButton && onHome && (
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition font-medium"
              title="Go to home"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
