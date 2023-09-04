import * as echarts from "echarts";
import { useEffect } from "react";

export default function Echart({
  opt,
  id = "earning",
  height = 300,
  width,
}: {
  opt?: echarts.EChartsOption;
  id?: string;
  height?: number;
  width?: number | string;
}) {
  useEffect(() => {
    const dom = document.getElementById(`${id}`) as HTMLDivElement;
    const myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    const option: echarts.EChartsOption = opt || {
      angleAxis: {
        show: false,
        max: 100,
      },
      radiusAxis: {
        show: false,
        data: ["", ""],
      },
      polar: {
        radius: [35, "100%"],
      },

      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        containLabel: true, // Ensure labels are within the chart area
      },
      series: [
        {
          type: "bar",
          data: [
            { value: 60, name: "Search Engine" },
            { value: 80, name: "Direct" },
          ],
          colorBy: "data",
          name: "data1",
          barWidth: 10,
          showBackground: true,
          barCategoryGap: "100%", // Add gap between different categories

          backgroundStyle: {
            color: "#1F2849",
          },
          color: ["#FF814A", "#0BB885"],
          roundCap: true,
          label: {
            show: false,
            position: "start",
            formatter: "{a}",
          },
          coordinateSystem: "polar",
        },
      ],
      responsive: true, // Enable responsiveness
    };

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    const handleResize = () => {
      myChart.resize(); // Call the resize method
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose(); // Dispose the chart instance when the component is unmounted
    };

  }, [id,opt]);
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <div id={`${id}`} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

