import { ServerRespond } from './DataStreamer';
//import {Simulate} from "react-dom/test-utils";
//import rateChange = Simulate.rateChange;

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const upperBoundShift = 0.1;
    const lowerBoundShift = 0.05;

    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upperBound = 1 + upperBoundShift;
    const lowerBound = 1 - lowerBoundShift;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
          serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
