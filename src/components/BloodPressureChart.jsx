import { useRef, useEffect } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Filler);

export default function BloodPressureChart({ history }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !history.length) return;

    const labels = history.map(h => `${h.month?.substring(0, 3) ?? ""}, ${h.year ?? ""}`);
    const sysData = history.map(h => h.blood_pressure?.systolic?.value ?? null);
    const diaData = history.map(h => h.blood_pressure?.diastolic?.value ?? null);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            data: sysData,
            borderColor: "#C97F7F",
            backgroundColor: "rgba(201,127,127,0.10)",
            pointBackgroundColor: "#C97F7F",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.4,
            fill: false,
          },
          {
            label: "Diastolic",
            data: diaData,
            borderColor: "#7B9CBB",
            backgroundColor: "rgba(123,156,187,0.10)",
            pointBackgroundColor: "#7B9CBB",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1E2A2A",
            titleColor: "#fff",
            bodyColor: "#9AABA9",
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} mmHg`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: "#9AABA9", font: { family: "'DM Sans'", size: 11 } },
          },
          y: {
            min: 60,
            max: 180,
            grid: { color: "#EDE8DF" },
            border: { display: false },
            ticks: { color: "#9AABA9", font: { family: "'DM Sans'", size: 11 }, stepSize: 20 },
          },
        },
        interaction: { mode: "index", intersect: false },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [history]);

  return (
    <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }} />
  );
}