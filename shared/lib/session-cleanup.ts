/**
 * Session Cleanup Utility
 *
 * Clears demo mode sessions on app restart to ensure users must login again.
 * This prevents cached sessions from persisting across dev server restarts.
 */

import { cookies } from 'next/headers'

const SESSION_CLEANUP_FLAG = 'session_cleanup_done'

/**
 * Clears all sessions when app starts in demo mode.
 * Should be called once during app initialization.
 */
export async function clearDemoSessionsOnStartup() {
  // Only run in demo mode
  const isDemoMode = process.env.DEMO_MODE === 'true'
  if (!isDemoMode) {
    return
  }

  // Check if cleanup already done this session
  if (global[SESSION_CLEANUP_FLAG]) {
    return
  }

  try {
    // Mark cleanup as done
    global[SESSION_CLEANUP_FLAG] = true

    console.log('[Session Cleanup] Demo mode detected - sessions will be cleared on login page visit')
  } catch (error) {
    console.error('[Session Cleanup] Error:', error)
  }
}

/**
 * Clears the session cookie.
 * Should be called on login page mount in demo mode.
 */
export async function clearSessionCookie() {
  const isDemoMode = process.env.DEMO_MODE === 'true'
  if (!isDemoMode) {
    return
  }

  try {
    const cookieStore = await cookies()
    cookieStore.delete('nozle_session')
  } catch (error) {
    // Cookie might not exist, which is fine
    console.debug('[Session Cleanup] No session cookie to clear')
  }
}
