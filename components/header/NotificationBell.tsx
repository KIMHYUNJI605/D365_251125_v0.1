/**
 * NotificationBell Component
 *
 * Notification bell with dropdown panel showing recent notifications.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  X,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  ExternalLink,
  Settings,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationBellProps {
  notifications?: Notification[];
  onMarkAllRead?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

// Mock notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Deal Closed!',
    message: 'Michael Ross signed the contract for Porsche 911',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Credit Approval Pending',
    message: 'Sarah Johnson\'s application needs review',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    action: {
      label: 'Review Now',
      onClick: () => console.log('Review credit'),
    },
  },
  {
    id: '3',
    type: 'info',
    title: 'New Lead Assigned',
    message: 'James Wilson - Interested in BMW X5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Test Drive Reminder',
    message: 'Appointment with David Kim at 3:00 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
];

// Format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Icon for notification type
const NotificationIcon: Record<string, React.FC<{ size?: number; className?: string }>> = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
  error: AlertCircle,
};

// Colors for notification type
const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  info: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  warning: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
  success: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  error: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
};

export const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications = MOCK_NOTIFICATIONS,
  onMarkAllRead,
  onNotificationClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Mark all as read
  const handleMarkAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
    onMarkAllRead?.();
  };

  // Mark single as read
  const handleNotificationClick = (notification: Notification) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    onNotificationClick?.(notification);
  };

  return (
    <div ref={panelRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-colors ${
          isOpen
            ? 'bg-slate-100 text-slate-700'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell size={20} />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  <Check size={12} />
                  Mark all read
                </button>
              )}
              <button
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
                title="Settings"
              >
                <Settings size={14} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {localNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <Bell size={32} className="text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {localNotifications.map((notification) => {
                  const Icon = NotificationIcon[notification.type];
                  const colors = typeColors[notification.type];

                  return (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${
                        !notification.read ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center shrink-0`}
                        >
                          <Icon size={16} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm truncate ${
                                !notification.read
                                  ? 'font-semibold text-slate-800'
                                  : 'font-medium text-slate-600'
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock size={10} />
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                            {notification.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.action?.onClick();
                                }}
                                className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-0.5"
                              >
                                {notification.action.label}
                                <ExternalLink size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {localNotifications.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
              <button className="w-full text-xs text-center text-slate-500 hover:text-slate-700 font-medium py-1">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
