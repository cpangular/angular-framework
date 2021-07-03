import { loadRemoteEntry } from '@angular-architects/module-federation';
import { IRemote } from './remotes';

export class ModuleFederationLoader {
  private static _load: Promise<IRemote[] | void>;
  private static _remotes: IRemote[] = [];

  public static async load(
    bootstrap: () => Promise<{ init: () => Promise<void> }>
  ) {
    const bs = await bootstrap();
    if (!this._load) {
      this._load = fetch('assets/remotes.json')
        .then((r) => r.json())
        .catch((err) => console.error('Error loading remotes list', err))
        .then(async (r: IRemote[]) => {
          this._remotes = r;
          await Promise.all(r.map((e) => loadRemoteEntry(e.url, e.name)));
        })
        .catch((err) => console.error('Error loading remote entries', err))
        .then(() => {
          return bs.init();
        });
    }
    return this._load;
  }

  public static get remotes() {
    return ModuleFederationLoader._remotes;
  }

  private constructor() {}
}
