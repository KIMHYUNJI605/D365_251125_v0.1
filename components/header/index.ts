/**
 * Header Components - Public Exports
 *
 * Unified header system for Dealer365 platform.
 */

// Main Header Container
export { GlobalHeader } from './GlobalHeader';

// Sub-components
export { Breadcrumb, BreadcrumbCompact } from './Breadcrumb';
export { GlobalSearch, SearchTrigger } from './GlobalSearch';
export { AIAssistant } from './AIAssistant';
export { NotificationBell } from './NotificationBell';
export { UserMenu } from './UserMenu';

// Types
export type {
  AppModule,
  NavigationState,
  GlobalHeaderProps,
  BreadcrumbProps,
  GlobalSearchProps,
  AIAssistantProps,
  SearchCategory,
  SearchResult,
  RecentSearch,
  AISuggestion,
  User,
  Notification,
  MenuItem,
} from './types';

// Constants
export { MENU_HIERARCHY, SEARCH_FILTERS } from './types';
