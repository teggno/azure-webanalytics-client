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
                <PageViewsPage azureFunctionsUrl={config.azureFunctionsUrl} />
              );
          }
        }}
      </HashAware>
    </div>
  );
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
