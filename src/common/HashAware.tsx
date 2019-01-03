import React from "react";

export default class HashAware extends React.Component<{}, { hash: string }> {
  constructor(props: {}) {
    super(props);

    this.hashChanged = this.hashChanged.bind(this);
    this.state = {
      hash: window.location.hash
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.hashChanged);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChanged);
  }

  private hashChanged() {
    this.setState({ hash: window.location.hash });
  }

  render() {
    if (typeof this.props.children === "function")
      return this.props.children(this.state.hash);
    return React.Children.only(this.props.children);
  }
}
