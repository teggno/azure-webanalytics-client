import { Config } from "./Model";

export default function() {
  const name = "config";
  return {
    save: (config: Config) =>
      (window.localStorage[name] = JSON.stringify(config)),
    get: () => {
      const raw = window.localStorage[name];
      if (raw) return JSON.parse(raw) as Config;
      return null;
    }
  };
}