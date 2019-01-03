import React from "react";
import PageViewsTable from "./PageViewsTable";
import { PageView } from "./Model";

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
    fetch(this.props.pageViewsUrl)
      .then(res => res.json())
      .then((pageViews: PageView[]) =>
        this.setState({
          pageViews: pageViews
        })
      );
  }
}

interface PageViewPageProps {
  pageViewsUrl: string;
}

interface PageViewsPageState {
  pageViews: PageView[];
}
