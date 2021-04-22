import { Observable } from 'rxjs';
export interface IUIAttachment {
  readonly id?: string;
  readonly idChange: Observable<string | undefined>;
  readonly element?: Element;
}
