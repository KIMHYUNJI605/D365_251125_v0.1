/**
 * Breadcrumb Component
 *
 * Dynamic breadcrumb navigation based on menu hierarchy.
 * Automatically generates path from current module/view state.
 *
 * @usage <Breadcrumb module="sales" view="deals" onNavigate={handleNavigate} />
 */

import React, { useMemo } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbProps, AppModule, MENU_HIERARCHY } from './types';

// Module display labels
const MODULE_LABELS: Record<AppModule, string> = {
  landing: 'Home',
  sales: 'Sales',
  service: 'Service',
  analytics: 'Analytics',
  portal: 'Portal',
  admin: 'Admin',
};

// View labels per module
const VIEW_LABELS: Record<string, Record<string, string>> = {
  sales: {
    dashboard: 'Dashboard',
    deals: 'Deals Pipeline',
    inventory: 'Inventory',
    calendar: 'Calendar',
    customers: 'Customers',
    config: 'Configurator',
  },
  service: {
    workshop: 'Workshop',
    appointments: 'Appointments',
    parts: 'Parts',
    history: 'History',
  },
  analytics: {
    overview: 'Overview',
    reports: 'Reports',
  },
};

interface BreadcrumbItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  module,
  view,
  subView,
  onNavigate,
}) => {
  // Build breadcrumb items from current state
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [];

    // Root level - always show home
    items.push({
      id: 'home',
      label: 'Dealer365',
      path: 'landing',
      isActive: module === 'landing',
    });

    // Module level
    if (module !== 'landing') {
      items.push({
        id: module,
        label: MODULE_LABELS[module] || module,
        path: module === 'sales' ? 'dashboard' : module,
        isActive: !view,
      });
    }

    // View level
    if (view && module !== 'landing') {
      const viewLabel = VIEW_LABELS[module]?.[view] || view;
      items.push({
        id: view,
        label: viewLabel,
        path: view,
        isActive: !subView,
      });
    }

    // Subview level
    if (subView) {
      items.push({
        id: subView,
        label: subView,
        path: subView,
        isActive: true,
      });
    }

    return items;
  }, [module, view, subView]);

  // Don't render on landing page
  if (module === 'landing') {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.id}>
          {/* Separator */}
          {index > 0 && (
            <ChevronRight
              size={14}
              className="text-slate-400 mx-0.5 shrink-0"
              aria-hidden="true"
            />
          )}

          {/* Breadcrumb Item */}
          {item.isActive ? (
            // Current page (not clickable)
            <span
              className="font-semibold text-slate-900 truncate max-w-[150px]"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            // Navigable link
            <button
              onClick={() => onNavigate(item.path)}
              className="text-slate-500 hover:text-slate-900 hover:underline transition-colors truncate max-w-[120px] flex items-center gap-1"
            >
              {item.id === 'home' && <Home size={14} className="shrink-0" />}
              <span>{item.label}</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

/**
 * Compact breadcrumb variant for mobile/constrained spaces
 * Shows only current path with back navigation
 */
export const BreadcrumbCompact: React.FC<BreadcrumbProps> = ({
  module,
  view,
  onNavigate,
}) => {
  const moduleLabel = MODULE_LABELS[module] || module;
  const viewLabel = view ? VIEW_LABELS[module]?.[view] || view : null;

  if (module === 'landing') return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {moduleLabel}
      </span>
      {viewLabel && (
        <>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-700 truncate">
            {viewLabel}
          </span>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
