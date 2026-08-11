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

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      // One-time hydration from localStorage after mount — required so the
      // server-rendered markup (no access to localStorage) matches the
      // client's first render, avoiding a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore malformed/blocked storage
    } finally {
      hasLoaded.current = true;
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hasLoaded.current) return;
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
