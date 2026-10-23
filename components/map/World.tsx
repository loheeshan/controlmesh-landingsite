import { P, pts, quad, WORLD_H, WORLD_W } from "@/lib/iso";

// Static drawing of the city: ground, roads, buildings, people and trees.
// Everything interactive (labels, routes, hit areas) is layered on top in CommandMap.

type BoxProps = {
  i0: number; i1: number; j0: number; j1: number; h: number;
  top: string; left: string; right: string; base?: number;
};

function Box({ i0, i1, j0, j1, h, top, left, right, base = 0 }: BoxProps) {
  return (
    <g>
      <polygon points={pts(P(i0, j1, base), P(i1, j1, base), P(i1, j1, h), P(i0, j1, h))} fill={left} />
      <polygon points={pts(P(i1, j0, base), P(i1, j1, base), P(i1, j1, h), P(i1, j0, h))} fill={right} />
      <polygon points={quad(i0, i1, j0, j1, h)} fill={top} />
    </g>
  );
}

type WindowProps = {
  i0: number; i1: number; j0: number; j1: number; h: number;
  color: string; rows: number; base?: number; step?: number; opacity?: number; size?: number;
};

function Windows({ i0, i1, j0, j1, h, color, rows, base = 12, step = 1, opacity = 0.8, size = 7 }: WindowProps) {
  const out: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const hh = base + r * ((h - base - 8) / Math.max(rows, 1));
    for (let k = i0 + 0.35; k < i1 - 0.4; k += step) {
      out.push(
        <polygon key={`l${r}-${k}`} fill={color} fillOpacity={opacity}
          points={pts(P(k, j1, hh), P(k + 0.4, j1, hh), P(k + 0.4, j1, hh + size), P(k, j1, hh + size))} />,
      );
    }
    for (let k = j0 + 0.35; k < j1 - 0.4; k += step) {
      out.push(
        <polygon key={`r${r}-${k}`} fill={color} fillOpacity={opacity * 0.7}
          points={pts(P(i1, k, hh), P(i1, k + 0.4, hh), P(i1, k + 0.4, hh + size), P(i1, k, hh + size))} />,
      );
    }
  }
  return <g>{out}</g>;
}

type HouseProps = {
  i0: number; i1: number; j0: number; j1: number; h: number; roof: number;
  wallL: string; wallR: string; roofFront: string; roofBack: string;
};

function House({ i0, i1, j0, j1, h, roof, wallL, wallR, roofFront, roofBack }: HouseProps) {
  const jm = (j0 + j1) / 2;
  const r0 = P(i0, jm, h + roof);
  const r1 = P(i1, jm, h + roof);
  const di = i0 + (i1 - i0) * 0.3;
  const wi = i0 + (i1 - i0) * 0.62;
  const wj = j0 + (j1 - j0) * 0.4;
  return (
    <g>
      <polygon points={pts(P(i0, j0, h), P(i1, j0, h), r1, r0)} fill={roofBack} />
      <polygon points={pts(P(i0, j1), P(i1, j1), P(i1, j1, h), P(i0, j1, h))} fill={wallL} />
      <polygon points={pts(P(i1, j0), P(i1, j1), P(i1, j1, h), P(i1, j0, h))} fill={wallR} />
      <polygon points={pts(P(i1, j0, h), P(i1, j1, h), r1)} fill={wallR} />
      <polygon points={pts(P(i0, j1, h), P(i1, j1, h), r1, r0)} fill={roofFront} />
      <polygon points={pts(P(di, j1), P(di + 0.6, j1), P(di + 0.6, j1, 22), P(di, j1, 22))} fill="#2A2622" />
      <polygon points={pts(P(wi, j1, 10), P(wi + 0.8, j1, 10), P(wi + 0.8, j1, 22), P(wi, j1, 22))} fill="#FFB283" fillOpacity={0.85} />
      <polygon points={pts(P(i1, wj, 10), P(i1, wj + 0.8, 10), P(i1, wj + 0.8, 22), P(i1, wj, 22))} fill="#FFB283" fillOpacity={0.6} />
    </g>
  );
}

type CylProps = {
  i: number; j: number; rx: number; ry: number; h: number;
  body: string; top: string; side: string; band?: string; base?: number;
};

function Cylinder({ i, j, rx, ry, h, body, top, side, band, base = 0 }: CylProps) {
  const [x, y] = P(i, j, base);
  const yt = y - h;
  const yb = y - h * 0.55;
  return (
    <g>
      <path d={`M${x - rx},${y} L${x - rx},${yt} A${rx},${ry} 0 0 1 ${x + rx},${yt} L${x + rx},${y} A${rx},${ry} 0 0 1 ${x - rx},${y} Z`} fill={body} />
      <path d={`M${x},${y + ry} A${rx},${ry} 0 0 0 ${x + rx},${y} L${x + rx},${yt} A${rx},${ry} 0 0 1 ${x},${yt + ry} Z`} fill={side} />
      {band && (
        <path d={`M${x - rx},${yb} A${rx},${ry} 0 0 0 ${x + rx},${yb} L${x + rx},${yb - 10} A${rx},${ry} 0 0 1 ${x - rx},${yb - 10} Z`} fill={band} />
      )}
      <ellipse cx={x} cy={yt} rx={rx} ry={ry} fill={top} />
    </g>
  );
}

function Tree({ i, j, big = false }: { i: number; j: number; big?: boolean }) {
  const [x, y] = P(i, j);
  const r = big ? 16 : 12;
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={r} ry={5} fill="#000" fillOpacity={0.35} />
      <rect x={x - 2} y={y - 14} width={4} height={14} fill="#4A3B2E" />
      <circle cx={x} cy={y - 14 - r + 2} r={r} fill="#3F6B4E" />
      <circle cx={x - 5} cy={y - 14 - r + 6} r={Math.round(r * 0.6)} fill="#4E8460" />
    </g>
  );
}

function Person({ i, j, body, head, phone = false }: { i: number; j: number; body: string; head: string; phone?: boolean }) {
  const [x, y] = P(i, j);
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={11} ry={4} fill="#000" fillOpacity={0.4} />
      <rect x={x - 8} y={y - 26} width={16} height={24} rx={7} fill={body} />
      <circle cx={x} cy={y - 34} r={8} fill={head} />
      {phone && <rect x={x + 6} y={y - 24} width={8} height={12} rx={2} fill="#8EC5FF" />}
    </g>
  );
}

function Lamp({ i, j }: { i: number; j: number }) {
  const [x, y] = P(i, j);
  return (
    <g>
      <ellipse cx={x} cy={y + 1} rx={22} ry={10} fill="#FFB283" fillOpacity={0.08} />
      <rect x={x - 1.5} y={y - 46} width={3} height={46} fill="#4A433C" />
      <circle cx={x} cy={y - 48} r={5} fill="#FFB283" />
    </g>
  );
}

const grid = Array.from({ length: 19 }, (_, n) => (n + 1) * 2);
const plates: { q: [number, number, number, number]; stroke: string; dashed?: boolean }[] = [
  { q: [2, 13, 2, 13], stroke: "#2E2A26" },
  { q: [18, 28.5, 2, 13], stroke: "#2E2A26" },
  { q: [2, 13, 18, 28.5], stroke: "#FF6B1A" },
  { q: [18, 38.5, 18, 29], stroke: "#8EC5FF", dashed: true },
];
const trees: [number, number][] = [
  [1, 1], [1, 14], [14, 1], [17, 1], [29.5, 1.5], [30, 7], [30, 12], [1, 17], [1, 29], [14, 28.5],
  [17, 17], [39, 19], [39, 25], [2.2, 32.6], [14, 33], [14, 38.5], [3, 38.8], [17.6, 33], [33, 33],
  [33, 38], [39, 34], [26, 39.6],
];
const lamps: [number, number][] = [[14.2, 20], [14.2, 26], [17, 30], [9, 29.4], [29, 29.4]];

export function World() {
  const roadDash = [
    [P(15.5, 0), P(15.5, 40)],
    [P(0, 15.5), P(40, 15.5)],
    [P(0, 30.8), P(40, 30.8)],
  ];
  const [gx1, gy1] = P(20.4, 23.6, 22);
  const [gx2, gy2] = P(20.4, 26.8, 22);
  const [labX, labY] = P(25.6, 9.4);
  const [vx, vy] = P(12.4, 26, 24);
  const [hx, hy] = P(26.6, 35.5, 84);
  const [ax, ay] = P(31.4, 35.5, 12);

  return (
    <svg
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      width={WORLD_W}
      height={WORLD_H}
      aria-hidden="true"
      className="world-svg"
    >
      {/* ground */}
      <polygon points={quad(0, 40, 0, 40)} fill="#141210" />
      {grid.map((k) => {
        const a = P(0, k), b = P(40, k), c = P(k, 0), d = P(k, 40);
        return (
          <g key={k} stroke="#191715">
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            <line x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} />
          </g>
        );
      })}
      <polygon points={quad(1.5, 13.5, 32.5, 39.5)} fill="#18201A" />
      <polygon points={quad(17.5, 32, 32.5, 39.5)} fill="#1A1A18" />

      {/* roads */}
      {[[14.6, 16.4, 0, 40], [0, 40, 14.6, 16.4], [0, 40, 29.9, 31.7]].map((q, n) => (
        <polygon key={n} points={quad(q[0], q[1], q[2], q[3])} fill="#22201C" />
      ))}
      {roadDash.map(([a, b], n) => (
        <line key={n} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#5A524B" strokeWidth={2} strokeDasharray="14 14" />
      ))}
      <polygon points={quad(5.8, 7, 31.7, 33)} fill="#22201C" />
      <polygon points={quad(10.8, 12, 31.7, 34)} fill="#22201C" />
      <polygon points={quad(23, 25, 31.7, 33)} fill="#22201C" />

      {/* zone plates */}
      {plates.map(({ q, stroke, dashed }, n) => (
        <g key={n}>
          <Box i0={q[0]} i1={q[1]} j0={q[2]} j1={q[3]} h={6} top="#1A1815" left="#100F0E" right="#121110" />
          <polygon points={quad(q[0], q[1], q[2], q[3], 6)} fill="none" stroke={stroke} strokeOpacity={0.6}
            strokeWidth={2} strokeDasharray={dashed ? "10 8" : undefined} />
        </g>
      ))}

      {/* MediBook office */}
      <Box i0={4} i1={10} j0={4} j1={9.5} h={112} top="#3A3530" left="#24211E" right="#2E2A26" />
      <Windows i0={4} i1={10} j0={4} j1={9.5} h={112} color="#8EC5FF" rows={6} step={0.8} opacity={0.55} />
      <Box i0={10.6} i1={12.6} j0={9.6} j1={11.6} h={34} top="#4A433C" left="#2A2622" right="#36312C" />
      <Windows i0={10.6} i1={12.6} j0={9.6} j1={11.6} h={34} color="#FFB283" rows={1} base={14} />
      <Person i={6} j={11.2} body="#7FB7A4" head="#C68B59" />
      <Person i={8.4} j={11.6} body="#7FB7A4" head="#C68B59" />

      {/* staging copy + glass test lab */}
      <Box i0={19} i1={23} j0={3.8} j1={7.8} h={64} top="#4A433C" left="#2A2622" right="#36312C" />
      <Windows i0={19} i1={23} j0={3.8} j1={7.8} h={64} color="#8EC5FF" rows={3} />
      <g fillOpacity={0.12} stroke="#8EC5FF" strokeOpacity={0.6} strokeWidth={1.5}>
        <Box i0={23.6} i1={27.6} j0={7.4} j1={11.4} h={52} top="#8EC5FF" left="#8EC5FF" right="#8EC5FF" />
      </g>
      <circle cx={labX} cy={labY - 24} r={9} fill="#FF6B1A" />
      <rect x={labX - 7} y={labY - 16} width={14} height={14} rx={3} fill="#FF6B1A" />
      <rect x={labX + 10} y={labY - 22} width={18} height={12} rx={2} fill="#8EC5FF" />

      {/* ControlMesh HQ */}
      <Box i0={6} i1={8.6} j0={20} j1={22.6} h={170} top="#3A3530" left="#24211E" right="#2E2A26" />
      <Windows i0={6} i1={8.6} j0={20} j1={22.6} h={170} color="#FF8A47" rows={8} opacity={0.5} />
      <Box i0={5.4} i1={9.2} j0={19.4} j1={23.2} h={196} base={170} top="#FF6B1A" left="#B84A0E" right="#D9581A" />
      <Box i0={9.6} i1={12.4} j0={24.6} j1={27.4} h={46} top="#6A6058" left="#3A3530" right="#4A433C" />
      <circle cx={vx} cy={vy} r={7} fill="none" stroke="#FF6B1A" strokeWidth={2.5} />
      {[[3.2, 24.2], [3.2, 26.6], [5.8, 25.4]].map(([i, j]) => (
        <Box key={`${i}-${j}`} i0={i} i1={i + 1.5} j0={j} j1={j + 1.5} h={24} top="#FF6B1A" left="#2A2622" right="#36312C" />
      ))}

      {/* data centre: gate, hall, keycard door, silos, records vault */}
      <Box i0={18.6} i1={20.4} j0={20.4} j1={23.6} h={40} top="#D9D2CA" left="#6A6058" right="#8A8178" />
      <line x1={gx1} y1={gy1} x2={gx2} y2={gy2} stroke="#FF6B1A" strokeWidth={5} strokeDasharray="10 8" strokeLinecap="round" />
      <Box i0={22} i1={29} j0={19} j1={26.6} h={74} top="#3A3530" left="#24211E" right="#2E2A26" />
      <Windows i0={22} i1={29} j0={19} j1={26.6} h={74} color="#8EC5FF" rows={4} step={0.7} opacity={0.7} size={5} />
      {[[23.5, 20.5], [26, 20.5], [23.5, 23.5], [26, 23.5]].map(([i, j]) => (
        <Box key={`v${i}-${j}`} i0={i} i1={i + 1.2} j0={j} j1={j + 1.2} h={90} base={74} top="#4A433C" left="#2A2622" right="#36312C" />
      ))}
      <Box i0={30.2} i1={30.9} j0={19.6} j1={20.3} h={80} top="#4A433C" left="#2A2622" right="#36312C" />
      <Box i0={30.2} i1={30.9} j0={23.2} j1={23.9} h={80} top="#4A433C" left="#2A2622" right="#36312C" />
      <Box i0={30.2} i1={30.9} j0={19.6} j1={23.9} h={94} base={80} top="#FF8A47" left="#9A3F0C" right="#C4520F" />
      <Cylinder i={34.2} j={21.4} rx={30} ry={15} h={100} body="#B8AFA6" top="#D9D2CA" side="#8A8178" band="#FF6B1A" />
      <Cylinder i={36.2} j={23.8} rx={30} ry={15} h={84} body="#B8AFA6" top="#D9D2CA" side="#8A8178" band="#FF6B1A" />
      <Cylinder i={35.4} j={27.4} rx={28} ry={14} h={76} body="#B8AFA6" top="#D9D2CA" side="#8A8178" band="#8EC5FF" />
      {[0, 1, 2].map((k) => (
        <Cylinder key={k} i={20.6} j={27.4} rx={34} ry={17} h={16} base={k * 20} body="#2E4A60" top="#4A7A9E" side="#24394A" />
      ))}

      {/* homes */}
      <House i0={4.4} i1={8.2} j0={33} j1={36.2} h={36} roof={24} wallL="#B8AFA6" wallR="#8A8178" roofFront="#7A4E3A" roofBack="#5A3A2C" />
      <House i0={9.6} i1={13} j0={34} j1={37.2} h={32} roof={22} wallL="#CFC6BA" wallR="#9A9087" roofFront="#4A5A6A" roofBack="#36424E" />
      <Person i={6.6} j={37.6} body="#8EC5FF" head="#C68B59" phone />
      <Person i={11.6} j={38.6} body="#F08F8F" head="#E0B48C" />

      {/* City Hospital */}
      <Box i0={19.5} i1={28.5} j0={33} j1={38} h={84} top="#E2DACF" left="#B8AFA6" right="#CFC6BA" />
      <Windows i0={19.5} i1={28.5} j0={33} j1={38} h={84} color="#8EC5FF" rows={4} step={0.9} opacity={0.6} />
      <polygon points={quad(22.6, 25.4, 35.1, 35.9, 84)} fill="#8EC5FF" />
      <polygon points={quad(23.6, 24.4, 34.1, 36.9, 84)} fill="#8EC5FF" />
      <ellipse cx={hx} cy={hy} rx={34} ry={17} fill="none" stroke="#9A9087" strokeWidth={3} />
      <Box i0={29.4} i1={31.4} j0={35} j1={36} h={20} top="#F5EFE6" left="#CFC6BA" right="#E2DACF" />
      <rect x={ax - 12} y={ay - 4} width={16} height={5} fill="#FF6B1A" />

      {trees.map(([i, j]) => <Tree key={`t${i}-${j}`} i={i} j={j} big={j > 32} />)}
      {lamps.map(([i, j]) => <Lamp key={`l${i}-${j}`} i={i} j={j} />)}
    </svg>
  );
}
