import type StaticPress from "src/main";
import { FolderSetting, ISettings } from "src/shared/interfaces";

export default class RoutesController {
   
   private plugin: StaticPress;

   constructor(app: StaticPress) {
      this.plugin = app;
   }

   get records() {
      return this.plugin.settings.routes;
   }

   get keys() {
      const { routes } = this.plugin.settings;
      return Object.keys(routes);
   }

   private async save() {
      const { routes } = this.plugin.settings;
      this.plugin.settings.routes = Object.fromEntries(
         Object.entries(routes).sort(([a], [b]) => a.localeCompare(b))
      );
      await this.plugin.saveSettings();
   }

   public containsRoute(path: string) {
      const { routes } = this.plugin.settings;
      return routes[path] !== undefined;
   } 

   public async addRoute(path: string) {
      const { routes } = this.plugin.settings;

      if (this.containsRoute(path)) return;
      
      routes[path] = {
         source: path,
         destination: "",
         automaticSlug: false
      }
      
      this.save();
   }

   public removeRoute(path: string) {
      delete this.plugin.settings.routes[path];
      this.save();
   }

   public updateRoute(path: string, settings: FolderSetting) {
      const { routes } = this.plugin.settings;
      routes[path] = settings;
      this.save();
   }
   
}