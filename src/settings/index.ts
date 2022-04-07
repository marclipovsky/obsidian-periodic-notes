import { App, PluginSettingTab } from "obsidian";
import type { CalendarSet, PeriodicConfig } from "src/types";
import type { SvelteComponent } from "svelte";

import type WeeklyNotesPlugin from "../main";
import SettingsRouter from "./pages/Router.svelte";

export interface ISettings {
  showGettingStartedBanner: boolean;
  hasMigratedDailyNoteSettings: boolean;
  hasMigratedWeeklyNoteSettings: boolean;

  activeCalendarSet: string;
  calendarSets: CalendarSet[];

  enableTimelineComplication: boolean;
}

export const DEFAULT_SETTINGS = {
  showGettingStartedBanner: true,
  hasMigratedDailyNoteSettings: false,
  hasMigratedWeeklyNoteSettings: false,
  calendarSets: [],
  enableTimelineComplication: true,
};

export const DEFAULT_PERIODIC_CONFIG: PeriodicConfig = Object.freeze({
  enabled: false,
  format: "",
  templatePath: "",
  folder: "",
});

export class PeriodicNotesSettingsTab extends PluginSettingTab {
  private view: SvelteComponent;

  constructor(readonly app: App, readonly plugin: WeeklyNotesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();

    this.view = new SettingsRouter({
      target: this.containerEl,
      props: {
        app: this.app,
        manager: this.plugin.calendarSetManager,
        settings: this.plugin.settings,
      },
    });
  }

  hide() {
    super.hide();
    this.view.$destroy();
  }
}
