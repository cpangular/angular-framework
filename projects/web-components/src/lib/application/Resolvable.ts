import { Observable } from 'rxjs';

export type Resolvable<T> = T | Observable<T>;
