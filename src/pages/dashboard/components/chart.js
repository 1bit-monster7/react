import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const CharComponent = ({ option, style }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [option]);

  return <div ref={chartRef} style={style} />;
};

export default CharComponent;
