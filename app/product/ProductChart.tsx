import React from "react";
import Echart from "../chart/Echart";
import { TooltipComponentOption } from "echarts/components";

interface iProductChart {
  product: any;
}

type Unified<T> = Exclude<T, T[]>;
type TooltipFormatterCallback = Exclude<
  NonNullable<TooltipComponentOption["formatter"]>,
  string
>;
// single and multiple params
type TooltipFormatterParams = Parameters<TooltipFormatterCallback>[0];
// single params
type SingleTooltipFormatterParams = Unified<TooltipFormatterParams>;
const formatter0: TooltipFormatterCallback = (
  params: TooltipFormatterParams
) => {
  if (Array.isArray(params)) {
    return (
      "Title: " + params[0].name + "<br>" + "Value: " + params[0].value ||
      "no value"
    );
  }
  return params.data.toString() || "";
};
export default function ProductChart({ product }: iProductChart) {
  return (
    <Echart
      opt={{
        xAxis: {
          type: "category",
          data: product?.map((e: any) => e.title),
        },
        yAxis: {
          type: "value",
        },
        grid: {
          top: "5%",
          right: "1%",
          bottom: "10%",
          left: "4%",
        },
        tooltip: {
          trigger: "axis", // Show tooltip when hovering over bars
          axisPointer: {
            type: "shadow", // Display a shadow under the hovered bar
          },
          formatter: formatter0,
        },
        series: [
          {
            data: product?.map((e: any) => e.stock),
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      }}
    />
  );
}
