import { Observable, Subscriber } from "rxjs";

export class IntersectObservable extends Observable<IntersectionObserverEntry> {
  private static subscribers: Map<Element, Set<Subscriber<IntersectionObserverEntry>>> = new Map();
  private static observer: IntersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const targetSubscribers = IntersectObservable.subscribers.get(entry.target)!;
      for (const sub of targetSubscribers) {
        sub.next(entry);
      }
    }
  }, {});

  constructor(target: Element) {
    super(sub => {
      if (!IntersectObservable.subscribers.has(target)) {
        IntersectObservable.subscribers.set(target, new Set());
        IntersectObservable.observer.observe(target);
      }
      const targetSubscribers = IntersectObservable.subscribers.get(target)!;
      targetSubscribers.add(sub);
      return () => {
        targetSubscribers.delete(sub);
        if (targetSubscribers.size === 0) {
          IntersectObservable.subscribers.delete(target);
          IntersectObservable.observer.unobserve(target);
        }
      }
    });
  }
}
