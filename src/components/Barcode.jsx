import React, { Component } from "react";
import BarcodeReader from "react-barcode-reader";

export default class Barcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "----------",
    };

    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    this.setState({
      result: data,
    });
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <div>
        <BarcodeReader onError={this.handleError} onScan={this.handleScan} />
        <div className="scanner">
          <label>Código de barra:</label>
          <label>{this.state.result}</label>
          <button onClick={() => this.props.handleCode(this.state.result)}>
            Asignar
          </button>
        </div>
      </div>
    );
  }
}
