import React from "react";
import ConfigForm from "./ConfigForm";
import PageViewsPage from "./PageViewsPage";
import HashAware from "../common/HashAware";
import configStore from "./ConfigStore";

const cs = configStore();
export default function() {
  let config: any = cs.get();

  if (config === null) {
    return <FirstVisit />;
  }

  return (
    <div>
      <header className="tc">
        <a className="pointer link dim blue f3" href="#config">
          Config
        </a>
      </header>
      <HashAware>
        {(hash: string) => {
          switch (hash.toLowerCase()) {
            case "#config":
              return (
                <ConfigForm
                  onChange={c => {
                    cs.save(c);
                    config = c;
                    window.location.hash = "#PageViews";
                  }}
                  onCancel={() => (window.location.hash = "#PageViews")}
                  config={config}
                />
              );
            default:
              return (
                <div>
                  <h1 className="tc">Page views last 24 hours</h1>
                  <PageViewsPage
                    pageViewsUrl={pageViewsUrl(
                      config.azureFunctionsUrl,
                      new Date()
                    )}
                  />
                </div>
              );
          }
        }}
      </HashAware>
    </div>
  );
}

function pageViewsUrl(azureFunctionsUrl: string, now: Date) {
  return `${removeTrailingSlash(
    azureFunctionsUrl
  )}/PageViews?start=${encodeURIComponent(
    addDays(now, -1).toISOString()
  )}&end=${encodeURIComponent(now.toISOString())}`;
}

function removeTrailingSlash(s: string) {
  return s.lastIndexOf("/") === s.length - 1 ? s.substr(0, s.length - 1) : s;
}

function addDays(date: Date, days: number) {
  return new Date(date.valueOf() + 24 * 60 * 60 * 1000 * days);
}

function FirstVisit() {
  return (
    <div>
      <p>
        You seem to be here for the first time. Please enter the configuration.
      </p>
      <ConfigForm onChange={cs.save} config={{ azureFunctionsUrl: "" }} />
    </div>
  );
}
