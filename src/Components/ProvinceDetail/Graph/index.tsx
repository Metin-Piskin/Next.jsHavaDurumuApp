import React, { useState, useRef } from "react";
import { useDimensions } from "webrix/hooks";

interface LineProps {
  path: number[];
  color: string;
}

const Line: React.FC<LineProps> = ({ path, color }) => {
  const dx = 100 / (path.length - 1);
  const d = `M0,${path[0]} ${path
    .slice(1)
    .map(
      (p, i) =>
        `C${dx * i + dx / 2},${path[i]} ` +
        `${dx * (i + 1) - dx / 2},${path[i + 1]} ` +
        `${dx * (i + 1)},${path[i + 1]} `
    )
    .join(" ")}`;
  return (
    <>
      <path stroke={color} d={d} fill="none" className="stroke" />
      <path
        d={d + ` V0 H0 Z`}
        fill={`url(#gradient-${color})`}
        className="gradient"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.15} />
        </linearGradient>
      </defs>
    </>
  );
};

interface PointsProps {
  data: number[][];
  width: number;
  height: number;
  setActive: React.Dispatch<
    React.SetStateAction<{ path: number; point: number } | null>
  >;
  range: [number, number];
}

const Points: React.FC<PointsProps> = ({
  data,
  width,
  height,
  setActive,
  range,
}) => {
  const timeout = useRef<NodeJS.Timeout>();
  const dr = Math.abs(range[1] - range[0]);
  const activate = (path: number, point: number) => {
    clearTimeout(timeout.current);
    setActive({ path, point });
  };
  const deactivate = (path: number, point: number) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setActive((cur) => {
        if (cur?.path === path && cur?.point === point) {
          return null;
        }
        return cur;
      });
    }, 200);
  };
  return (
    <div className="points">
      {data.map((row, r) =>
        row.map((y, i) => (
          <div
            key={i}
            style={{
              "--x": `${(i * width) / (row.length - 1)}px`,
              "--y": `${height - y * (height / dr)}px`,
            } as React.CSSProperties}
            onMouseEnter={() => activate(r, i)}
            onMouseLeave={() => deactivate(r, i)}
          />
        ))
      )}
    </div>
  );
};

interface MarkerProps {
  colors: string[];
  labels: string[];
  data: number[][];
  active: { path: number; point: number } | null;
  width: number;
  height: number;
  range: [number, number];
  state: string;
}

const Marker: React.FC<MarkerProps> = ({
  colors,
  labels,
  data,
  active,
  width,
  height,
  range,
  state,
}) => {
  if (!active) return null; // Return null if active is null or undefined

  const { path, point } = active;
  if (path === undefined || point === undefined) return null; // Additional guard

  const value = data[path]?.[point];
  if (value === undefined) return null; // Guard for value being undefined

  const dr = Math.abs(range[1] - range[0]);

  return (
    <div
      className="marker"
      style={{
        opacity: 1,
        "--color": colors[path],
        "--x": `${(point * width) / (data[path]?.length - 1)}px`,
        "--y": `${height - value * (height / dr)}px`,
      } as React.CSSProperties}
    >
      <div className="tooltip">
        <span>{labels[point]}</span>
        <span>
          {value.toLocaleString?.()}
          {state}
        </span>
      </div>
      <div className="line" />
      <div className="circle" />
    </div>
  );
};


interface GraphProps {
  data: number[][];
  colors: string[];
  range: [number, number];
  labels: string[];
  state: string;
}

const Graph: React.FC<GraphProps> = ({ data, colors, range, labels, state }) => {
  const [active, setActive] = useState<{ path: number; point: number } | null>({
    path: 1,
    point: 2,
  });
  const graph = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(graph);
  return (
    <div className="graph" ref={graph}>
      <Marker
        colors={colors}
        data={data}
        active={active}
        labels={labels}
        width={width}
        height={height}
        range={range}
        state={
          state === "Sıcaklık"
            ? "c°"
            : state === "Hissedilen"
            ? "c°"
            : state === "Nem"
            ? "%"
            : state === "Rüzgar"
            ? "km/s"
            : "null"
        }
      />
      <svg
        className="svg"
        viewBox={`0 ${range[0]} 100 ${range[1]}`}
        preserveAspectRatio="none"
      >
        {data.map((path, i) => (
          <Line key={i} path={path} color={colors[i]} />
        ))}
      </svg>
      <div className="labels">
        {labels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <Points
        data={data}
        width={width}
        height={height}
        setActive={setActive}
        range={range}
      />
    </div>
  );
};

interface AppProps {
  LABELS: string[];
  DATA: number[][];
  STATE: string;
  COLOR: number;
}

const App: React.FC<AppProps> = ({ LABELS, DATA, STATE, COLOR }) => (
  <Graph
    data={DATA}
    colors={[
      COLOR === 800
        ? "#FDE047"
        : COLOR === 500
        ? "#93C5FD"
        : COLOR === 801
        ? "#FCA5A5"
        : COLOR === 802
        ? "#F87171"
        : COLOR === 803
        ? "#60A5FA"
        : COLOR === 804
        ? "#818CF8"
        : "#4B5563",
    ]}
    range={[
      0,
      STATE === "Sıcaklık"
        ? 60
        : STATE === "Hissedilen"
        ? 60
        : STATE === "Nem"
        ? 110
        : STATE === "Rüzgar"
        ? 25
        : 100,
    ]}
    labels={LABELS}
    state={STATE}
  />
);

export default App;
