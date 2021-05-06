import { IUiOutlet } from './IUiOutlet';
import { Observable } from "rxjs";

export interface IUiOutletAttachment {
  readonly name: string | undefined;
  readonly nameChange: Observable<string | undefined>;
  readonly inlineFallback: boolean;
  readonly inlineFallbackChange: Observable<boolean>;
  readonly nodes?: Node[];
  readonly origin?: Node;
  onAdded(outlet: IUiOutlet): void;
  onRemoved(outlet: IUiOutlet): void;
  onBeforeAdded(outlet: IUiOutlet): void;
  onBeforeRemoved(outlet: IUiOutlet): void;
}
