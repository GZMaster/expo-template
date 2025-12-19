/**
 * ToastProvider Component
 *
 * Provider for toast notification system.
 * Wraps the app and manages toast state.
 *
 * Note: Gluestack UI's toast system is built into GluestackUIProvider,
 * so this is just a pass-through wrapper for API consistency.
 */

import type { ReactNode } from 'react';

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Toast Provider component
 *
 * Wrap your app with this provider to enable toast notifications.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <YourApp />
 *     </ToastProvider>
 *   );
 * }
 * ```
 */
export function ToastProvider({ children }: ToastProviderProps) {
  // Gluestack UI's toast system is built into GluestackUIProvider
  // This is just a pass-through wrapper for API consistency
  return <>{children}</>;
}
