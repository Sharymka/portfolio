import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { revealStyle, useReveal } from './use-reveal';

type ObserverCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;

let lastCallback: ObserverCallback | null = null;
let observedTarget: Element | null = null;
let unobserveSpy: ReturnType<typeof vi.fn>;

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    lastCallback = callback;
  }
  observe(target: Element) {
    observedTarget = target;
  }
  unobserve = unobserveSpy;
  disconnect = vi.fn();
}

function TestComponent() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="target">
      {visible ? 'visible' : 'hidden'}
    </div>
  );
}

describe('useReveal', () => {
  beforeEach(() => {
    lastCallback = null;
    observedTarget = null;
    unobserveSpy = vi.fn();
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts hidden and observes the element', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('target')).toHaveTextContent('hidden');
    expect(observedTarget).toBe(screen.getByTestId('target'));
  });

  it('becomes visible once the element intersects, then stops observing it', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');

    act(() => {
      lastCallback?.([{ isIntersecting: true, target }]);
    });

    expect(screen.getByTestId('target')).toHaveTextContent('visible');
    expect(unobserveSpy).toHaveBeenCalledWith(target);
  });

  it('stays hidden if the element has not intersected yet', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');

    act(() => {
      lastCallback?.([{ isIntersecting: false, target }]);
    });

    expect(screen.getByTestId('target')).toHaveTextContent('hidden');
    expect(unobserveSpy).not.toHaveBeenCalled();
  });
});

describe('revealStyle', () => {
  it('is invisible and offset when not visible', () => {
    expect(revealStyle(false)).toMatchObject({ opacity: 0, transform: 'translateY(24px)' });
  });

  it('is fully visible and in place when visible', () => {
    expect(revealStyle(true)).toMatchObject({ opacity: 1, transform: 'translateY(0)' });
  });
});
