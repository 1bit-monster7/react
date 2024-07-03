import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const CharComponent = ({ option, style }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    // 监听窗口大小变化事件
    window.addEventListener("resize", handleResize);

    // 初始化 ResizeObserver
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [option]);

  return <div ref={chartRef} style={style} />;
};

export default CharComponent;
