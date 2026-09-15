function toBase64Unicode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64Unicode(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

export function encodeContinueState(payload: unknown): string {
  return toBase64Unicode(JSON.stringify(payload));
}

export function decodeContinueState<T>(encoded: string): T | null {
  try {
    return JSON.parse(fromBase64Unicode(encoded)) as T;
  } catch {
    return null;
  }
}
