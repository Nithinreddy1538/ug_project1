import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationItemProps extends NotificationProps {
  onClose: (id: string) => void;
}

export function NotificationItem({ id, type, title, message, duration = 3000, onClose }: NotificationItemProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-orange-50 border-orange-200 text-orange-800',
  };

  const bgColors = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    info: 'bg-orange-100',
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'info':
        return <Info className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border flex gap-4 items-start ${colors[type]} shadow-lg`}>
      <div className={`p-2 rounded-full ${bgColors[type]}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition flex-shrink-0"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

interface NotificationCenterProps {
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}

export default function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  return (
    <div className="fixed top-24 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
