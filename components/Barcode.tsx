"use client";

import React, { Component } from "react";
import BarcodeReader from "react-barcode-reader";

interface BarcodeProps {
  user: { document: string };
  handleCode: (data: string) => void;
}

interface BarcodeState {
  result: string;
}

export default class Barcode extends Component<BarcodeProps, BarcodeState> {
  constructor(props: BarcodeProps) {
    super(props);
    this.state = {
      result: "|||||| ||| ||||||| ||||||| ||| |||||||||||||| || |||||||",
    };

    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data: string) {
    this.setState({
      result: data,
    });
    this.props.handleCode(data);
  }
  handleError(err: unknown) {
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
