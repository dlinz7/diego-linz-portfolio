type StorageKind = 'local' | 'session';

function getStorage(kind: StorageKind): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    // Some privacy modes throw on access to storage.
    return null;
  }
}

export function readJson<T>(kind: StorageKind, key: string): T | null {
  try {
    const raw = getStorage(kind)?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(kind: StorageKind, key: string, value: unknown): void {
  try {
    getStorage(kind)?.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or storage disabled: persistence is a convenience, never required.
  }
}
