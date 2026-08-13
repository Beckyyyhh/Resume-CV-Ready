"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Persists state to localStorage under `key`. Starts from `initialValue` on the
 * server/first render (avoids hydration mismatch), then hydrates from
 * localStorage once mounted in the browser.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const hasLoaded = useRef(false);
  // When the read effect below hydrates state from storage, the write effect
  // fires in that same commit with the *stale* pre-hydration closure value
  // (React effects in one commit all see that render's props/state, not the
  // just-scheduled update) — so without this guard it would immediately
  // overwrite the just-loaded data with the empty initial value.
  const skipNextWrite = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      // One-time hydration from localStorage after mount — required so the
      // server-rendered markup (no access to localStorage) matches the
      // client's first render, avoiding a hydration mismatch.
      if (raw) {
        skipNextWrite.current = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore malformed/blocked storage
    } finally {
      hasLoaded.current = true;
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hasLoaded.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, data stays in memory
    }
  }, [key, value]);

  return { value, setValue, hydrated };
}

export function clearLocalStorageState(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
