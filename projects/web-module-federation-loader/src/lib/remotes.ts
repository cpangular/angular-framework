export interface IRemote {
  name: string;
  url: string;
  routes: {
    path: string;
    module: string;
    modulePath?: string;
  }[];

  loadComponents: {
    component: string;
    componentPath?: string;
  }[];
}
