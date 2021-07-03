import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  IRemote,
  ModuleFederationLoader,
} from '@cpangular/web-module-federation-loader';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './application-loader.component.html',
  styleUrls: ['./application-loader.component.scss'],
})
export class ApplicationLoaderComponent implements OnInit {
  public static remotes: IRemote[] = [];

  @ViewChild('microComponents', { read: ViewContainerRef, static: true })
  public viewContainer!: ViewContainerRef;

  public constructor(
    private readonly router: Router,
    private readonly injector: Injector,
    private readonly cfr: ComponentFactoryResolver
  ) {
    ModuleFederationLoader.remotes.forEach((r) => {
      r.routes.forEach((mod) => {
        this.router.config.push({
          path: mod.path,
          loadChildren: () =>
            loadRemoteModule({
              remoteName: r.name,
              exposedModule: mod.modulePath || `./${mod.module}`,
            }).then((m) => m[mod.module]),
        });
      });
    });
  }
  public ngOnInit(): void {
    this.viewContainer.clear();
    ModuleFederationLoader.remotes.forEach((r) => {
      r.loadComponents.forEach(async (comp) => {
        const mod = await loadRemoteModule({
          remoteName: r.name,
          exposedModule: comp.componentPath || `./${comp.component}`,
        });
        const component = mod[comp.component];
        const factory = this.cfr.resolveComponentFactory(component);
        const ref = this.viewContainer.createComponent(
          factory,
          undefined,
          this.injector
        );
        console.log('Loaded Component:', ref.instance);
      });
    });
  }
}
