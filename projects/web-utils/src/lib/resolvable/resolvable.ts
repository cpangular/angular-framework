import {
  BehaviorSubject,
  from,
  isObservable,
  Observable,
  Subscription,
} from 'rxjs';
export type Resolvable<TValue> = TValue | Promise<TValue> | Observable<TValue>;

export function resolve<TValue>(value: Resolvable<TValue>): Observable<TValue> {
  if (isObservable(value)) {
    return value;
  }
  return from(Promise.resolve(value));
}

export class ResolveStack<TValue> extends Observable<TValue | undefined> {
  private _sub: Subscription = new Subscription();
  private _subject: BehaviorSubject<TValue | undefined> = new BehaviorSubject<
    TValue | undefined
  >(undefined);
  private _stack: Resolvable<TValue>[] = [];
  private _stackValue: TValue[] = [];
  private _stackValueSet: boolean[] = [];

  constructor() {
    super((obs) => {
      const sub = this._subject.subscribe(obs);
      return () => {
        sub.unsubscribe();
      };
    });
  }

  public push(v: Resolvable<TValue>) {
    this._stack.push(v);
    this.invalidate();
  }

  public get length(): number {
    return this._stack.length;
  }

  public item(idx: number): Resolvable<TValue> | undefined {
    return this._stack[idx];
  }

  public indexOf(idx: Resolvable<TValue>): number {
    return this._stack.indexOf(idx);
  }

  public delete(idx: number): Resolvable<TValue> | undefined {
    const item = this.item(idx);
    if (!item) {
      return undefined;
    }
    if (item === this.current) {
      return this.pop();
    }
    this._stack.splice(idx, 1);
    this._stackValue.splice(idx, 1);
    this._stackValueSet.splice(idx, 1);
    return item;
  }

  public pop(): Resolvable<TValue> | undefined {
    const idx = this._stack.length - 1;
    this._stackValue.pop();
    this._stackValueSet.pop();
    const v = this._stack.pop();
    this.invalidate();
    return v;
  }

  private get current(): Resolvable<TValue> | undefined {
    return this._stack[this._stack.length - 1] ?? undefined;
  }

  public get value(): TValue | undefined {
    return this._subject.value;
  }

  private invalidate() {
    this._sub.unsubscribe();
    this._sub = new Subscription();

    const n = this.current;
    if (!n) {
      if (this._subject.value !== n) {
        this._subject.next(n);
      }
      return;
    }
    const newResolvable = resolve(n);
    const hasInitV = this._stackValueSet[this._stack.indexOf(n)];
    if (hasInitV) {
      const initV = this._stackValue[this._stack.indexOf(n)];
      if (this._subject.value !== initV) {
        this._subject.next(initV);
      }
    }

    this._sub.add(
      newResolvable.subscribe((v) => {
        if (this._subject.value !== v) {
          const idx = this._stack.indexOf(n);
          this._stackValue[idx] = v;
          this._stackValueSet[idx] = true;
          this._subject.next(v);
        }
      })
    );
  }
}

export class ResolveStackMap<TKey, TValue> extends Observable<
  TValue | undefined
> {
  private _stack: ResolveStack<TValue> = new ResolveStack();
  private _map: Map<TKey, Resolvable<TValue>> = new Map();

  constructor() {
    super((obs) => {
      const sub = this._stack.subscribe(obs);
      return () => {
        sub.unsubscribe();
      };
    });
  }

  public set(key: TKey, value: Resolvable<TValue>): void {
    this.delete(key);
    this._map.set(key, value);
    this._stack.push(value);
  }

  public get(key: TKey): Resolvable<TValue> | undefined {
    return this._map.get(key);
  }

  public has(key: TKey): boolean {
    return this._map.has(key);
  }

  public delete(key: TKey): void {
    if (this.has(key)) {
      const item = this.get(key)!;
      const idx = this._stack.indexOf(item);
      this._map.delete(key);
      this._stack.delete(idx);
    }
  }

  public get value(): TValue | undefined {
    return this._stack.value;
  }
}
