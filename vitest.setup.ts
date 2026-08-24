import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement IntersectionObserver. Components that only need it
// to exist (e.g. useReveal) get a no-op stub; tests that need to control
// intersection behavior provide their own mock via vi.stubGlobal.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('IntersectionObserver' in globalThis)) {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverStub,
  });
}

// jsdom's own matchMedia throws "not implemented" when called, rather than
// being absent — so it must be overridden unconditionally, unlike
// IntersectionObserver above. Default to "no match" (desktop); tests that
// need a specific viewport override via vi.stubGlobal.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});
