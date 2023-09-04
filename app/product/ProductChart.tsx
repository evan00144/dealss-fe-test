import React from 'react'
import Echart from '../chart/Echart';

interface iProductChart{
    product:any
}
export default function ProductChart({product}:iProductChart) {
  return (
    <Echart
    opt={{
      xAxis: {
        type: "category",
        data: product?.map((e:any) => e.title),
      },
      yAxis: {
        type: "value",
      },
      grid:{
        top:'5%',
        right:'1%',
        bottom:'10%',
        left:'4%'
      },
      tooltip: {
        trigger: "axis", // Show tooltip when hovering over bars
        axisPointer: {
          type: "shadow", // Display a shadow under the hovered bar
        },
        formatter: function (params) {
          return (
            "Title: " +
            params[0].name +
            "<br>" +
            "Value: " +
            params[0].value
          );
        },
      },
      series: [
        {
          data: product?.map((e:any) => e.stock),
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    }}
  />  )
}
