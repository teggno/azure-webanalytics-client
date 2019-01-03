import React from "react";
import PageViewsTable from "./PageViewsTable";
import { PageView } from "./Model";
import { removeTrailingSlash } from "../common/Strings";
import { addDays } from "../common/Dates";

export default class PageViewsPage extends React.Component<
  PageViewPageProps,
  PageViewsPageState
> {
  constructor(props: PageViewPageProps) {
    super(props);

    this.state = { pageViews: [] };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <>
        <h1 className="tc">Page views last 24 hours</h1>
        <div className="pv3 tc">
          <button className="pointer" type="button" onClick={this.refresh}>
            Refresh
          </button>
        </div>
        <PageViewsTable pageViews={this.state.pageViews} />
      </>
    );
  }

  private refresh() {
    const url = pageViewsUrl(this.props.azureFunctionsUrl, new Date());
    fetch(url)
      .then(res => res.json())
      .then((pageViews: PageView[]) =>
        this.setState({
          pageViews: pageViews
        })
      );
  }
}

function pageViewsUrl(azureFunctionsUrl: string, now: Date) {
  return `${removeTrailingSlash(
    azureFunctionsUrl
  )}/PageViews?startUtc=${encodeURIComponent(
    addDays(now, -1).toISOString()
  )}&endUtc=${encodeURIComponent(now.toISOString())}`;
}

interface PageViewPageProps {
  azureFunctionsUrl: string;
}

interface PageViewsPageState {
  pageViews: PageView[];
}
