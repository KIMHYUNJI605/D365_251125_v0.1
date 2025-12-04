/**
 * UserMenu Component
 *
 * User profile dropdown with account settings and logout.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  HelpCircle,
  Moon,
  Sun,
  Shield,
} from 'lucide-react';

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
  onSettings?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user = {
    name: 'Alex M.',
    email: 'alex.m@dealer365.com',
    role: 'Sales Executive',
  },
  onLogout,
  onSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const menuItems = [
    {
      icon: User,
      label: 'My Profile',
      onClick: () => console.log('Profile'),
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: onSettings,
    },
    {
      icon: Bell,
      label: 'Notifications',
      onClick: () => console.log('Notifications'),
      badge: 3,
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onClick: () => console.log('Help'),
    },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${
          isOpen
            ? 'bg-slate-100'
            : 'hover:bg-slate-50'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-300 overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User size={16} />
          )}
        </div>

        {/* User Info (hidden on mobile) */}
        <div className="hidden lg:block text-left">
          <p className="text-xs font-semibold text-slate-800">{user.name}</p>
          <p className="text-[10px] text-slate-500">{user.role}</p>
        </div>

        <ChevronDown
          size={14}
          className={`text-slate-400 hidden lg:block transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
        >
          {/* User Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-300">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <Shield size={12} className="text-green-600" />
              <span className="text-[10px] font-medium text-green-600">
                {user.role}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  role="menuitem"
                >
                  <Icon size={16} className="text-slate-400" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <div className="px-4 py-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Dark Mode</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center transition-all ${
                    isDarkMode ? 'left-5' : 'left-0.5'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon size={10} className="text-slate-600" />
                  ) : (
                    <Sun size={10} className="text-yellow-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="py-1 border-t border-slate-100">
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              role="menuitem"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 text-center">
              Dealer365 v2.0.4 • © 2025
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
