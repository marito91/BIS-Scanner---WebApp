import React, { Component } from "react";
import BarcodeReader from "react-barcode-reader";

export default class Barcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "|||||| ||| ||||||| ||||||| ||| |||||||||||||| || |||||||",
    };

    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    this.setState({
      result: data,
    });
    this.props.handleCode(data);
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <>
        <BarcodeReader onError={this.handleError} onScan={this.handleScan} />
        <label>Barcode / Student Document</label>
        {this.props.user.document === "" ? (
          <label>
            |||||| ||| ||||||| ||||||| ||| |||||||||||||| || |||||||
          </label>
        ) : (
          <label>{this.props.user.document}</label>
        )}
      </>
    );
  }
}
