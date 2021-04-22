import { Observable, Subscriber } from "rxjs";



export class ResizeObservable extends Observable<ResizeObserverEntry> {
  private targets: Set<Element> = new Set();
  private subs: Set<Subscriber<ResizeObserverEntry>> = new Set();
  private observer!: ResizeObserver;

  constructor() {
    super(sub => {
      this.subs.add(sub);
      return () => {
        this.subs.delete(sub);
      }
    });

    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const sub of this.subs) {
        for (const entry of entries) {
          sub.next(entry);
        }
      }
    });
  }

  public add(target: Element) {
    this.targets.add(target);
    this.observer.observe(target);
  }

  public remove(target: Element) {
    this.targets.delete(target);
    this.observer.unobserve(target);
  }

}
