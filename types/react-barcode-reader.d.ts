declare module "react-barcode-reader" {
  import { Component } from "react";

  export interface BarcodeReaderProps {
    onScan: (data: string) => void;
    onError: (data: string, errorMsg: string) => void;
  }

  export default class BarcodeReader extends Component<BarcodeReaderProps> {}
}
