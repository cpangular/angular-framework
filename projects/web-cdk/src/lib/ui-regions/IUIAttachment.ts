import { IUIRegion } from './IUIRegion';
import { Observable } from 'rxjs';
export interface IUIAttachment {
  readonly id?: string;
  readonly idChange: Observable<string | undefined>;
  readonly inlineOnMissingRegion: boolean;
  readonly inlineOnMissingRegionChange: Observable<boolean>;
  readonly element?: Element;
  readonly origin?: Node;
  onAdded(region: IUIRegion): void;
  onRemoved(region: IUIRegion): void;
  onBeforeAdded(region: IUIRegion): void;
  onBeforeRemoved(region: IUIRegion): void;
}
