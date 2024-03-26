import React, { useRef, useEffect } from 'react';

interface GaugeChartProps {
  value: number;
  width: number;
  height: number;
}

function GaugeChart(props: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("console check: " + props.value, props.width, props.height);
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        drawGauge(context, props.value, props.width, props.height);
      }
    }
  }, []);

  const drawGauge = (context: CanvasRenderingContext2D, gaugeValue: number, canvasWidth: number, canvasHeight: number) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight;
    const radius = canvasHeight;

    // Clear canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw gray background
    context.fillStyle = "#ccc";
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, Math.PI, Math.PI * 1.5, false);
    context.closePath();
    context.fill();

    // Draw gradient gauge
    const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(1, "green");
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, Math.PI, Math.PI * (1.5 - (gaugeValue / 100)), true);
    context.closePath();
    context.fill();
  };

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default GaugeChart;
