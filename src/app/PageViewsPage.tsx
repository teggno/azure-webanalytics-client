import React from "react";
import PageViewsTable from "./PageViewsTable";
import { PageView } from "./Model";
import { removeTrailingSlash } from "../common/Strings";
import { addDays } from "../common/Dates";
import LoadingIndicator from "../common/LoadingIndicator";

export default class PageViewsPage extends React.Component<
  PageViewPageProps,
  PageViewsPageState
> {
  constructor(props: PageViewPageProps) {
    super(props);

    this.state = { pageViews: [], isLoading: false, loadError: "" };

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
        {this.state.isLoading ? (
          <LoadingIndicator className="tc">Loading...</LoadingIndicator>
        ) : this.state.loadError ? (
          <div className="tc red">{this.state.loadError}</div>
        ) : (
          <PageViewsTable pageViews={this.state.pageViews} />
        )}
      </>
    );
  }

  private refresh() {
    const url = pageViewsUrl(this.props.azureFunctionsUrl, new Date());
    this.setState({ isLoading: true });

    fetch(url)
      .then(res => res.json())
      .then((pageViews: PageView[]) =>
        this.setState({
          pageViews: pageViews,
          loadError: "",
          isLoading: false
        })
      )
      .catch(e => {
        console.debug(e);
        this.setState({
          isLoading: false,
          loadError: "An error happened, please try again"
        });
      });
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
  isLoading: boolean;
  loadError: string;
}
