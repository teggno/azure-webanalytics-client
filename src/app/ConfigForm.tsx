import React, { FormEvent } from "react";

export default class ConfigForm extends React.Component<
  ConfigFormProps,
  ConfigFormState
> {
  constructor(props: ConfigFormProps) {
    super(props);

    this.state = {
      azureFunctionsUrl: props.config.azureFunctionsUrl
    };

    this.urlChange = this.urlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="pv3">
          <label>
            <div>Azure functions URL</div>
            <div>
              <input
                className="w-100"
                onChange={this.urlChange}
                value={this.state.azureFunctionsUrl}
              />
            </div>
          </label>
        </div>
        <div className="tc">
          <button className="pointer" type="submit">
            Save
          </button>{" "}
          <button
            className="pointer"
            type="button"
            onClick={e => {
              if (this.props.onCancel) this.props.onCancel();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.props.onChange({
      azureFunctionsUrl: this.state.azureFunctionsUrl
    });
  }

  urlChange(e: FormEvent<HTMLInputElement>) {
    this.setState({ azureFunctionsUrl: e.currentTarget.value });
  }
}

interface ConfigFormProps {
  onChange: (config: ConfigFormState) => void;
  onCancel?: () => void;
  config: ConfigFormState;
}

export interface ConfigFormState {
  azureFunctionsUrl: string;
}
