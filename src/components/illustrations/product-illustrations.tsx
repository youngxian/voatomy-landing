interface ProductIllustrationProps {
  className?: string;
}

export function AtlasIllustration({ className }: ProductIllustrationProps) {
  const color = "#f16e2c";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="atlas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Central convergence point */}
      <circle cx="200" cy="150" r="60" fill="url(#atlas-grad)" />
      <circle cx="200" cy="150" r="40" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="200" cy="150" r="60" stroke={color} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 5">
        <animateTransform attributeName="transform" type="rotate" values="0 200 150;360 200 150" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Six signal nodes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const cx = 200 + 110 * Math.cos(rad);
        const cy = 150 + 90 * Math.sin(rad);
        return (
          <g key={angle}>
            <line x1={200} y1={150} x2={cx} y2={cy} stroke={color} strokeWidth="1" strokeOpacity="0.12" strokeDasharray="2 4" />
            <circle cx={cx} cy={cy} r="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" strokeOpacity="0.3">
              <animate attributeName="r" values="8;10;8" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="3" fill={color} opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Center icon - brain/AI */}
      <circle cx="200" cy="150" r="18" fill={color} fillOpacity="0.2" />
      <path d="M192 148 C192 140, 200 135, 208 140 C216 135, 224 140, 224 148 C224 156, 216 162, 208 165 C200 162, 192 156, 192 148Z" fill={color} fillOpacity="0.4" />

      {/* Orbiting particle */}
      <circle r="3" fill={color} opacity="0.7">
        <animateMotion dur="8s" repeatCount="indefinite" path="M200,150 m-80,0 a80,65 0 1,0 160,0 a80,65 0 1,0 -160,0" />
      </circle>
    </svg>
  );
}

export function LoopIllustration({ className }: ProductIllustrationProps) {
  const color = "#6366F1";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="loop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Infinity loop path */}
      <path
        d="M120 150 C120 100, 170 80, 200 120 C230 160, 280 160, 280 120 C280 80, 230 100, 200 150 C170 200, 120 200, 120 150Z"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="url(#loop-grad)"
      />

      {/* Traveling dot along infinity */}
      <circle r="5" fill={color} opacity="0.7">
        <animateMotion dur="6s" repeatCount="indefinite" path="M120,150 C120,100 170,80 200,120 C230,160 280,160 280,120 C280,80 230,100 200,150 C170,200 120,200 120,150" />
      </circle>

      {/* Revenue signals */}
      {[
        { x: 80, y: 100, label: "$" },
        { x: 320, y: 100, label: "$" },
        { x: 80, y: 200, label: "%" },
        { x: 320, y: 200, label: "%" },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="16" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fill={color} opacity="0.5" fontWeight="bold">
            {node.label}
          </text>
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur={`${3 + i}s`} repeatCount="indefinite" />
        </g>
      ))}

      {/* Pulse rings */}
      <circle cx="200" cy="150" r="30" stroke={color} strokeWidth="1" fill="none" opacity="0.1">
        <animate attributeName="r" values="30;50;30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.02;0.1" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function SignalIllustration({ className }: ProductIllustrationProps) {
  const color = "#EF4444";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Alert wave rings */}
      {[40, 60, 80, 100].map((r, i) => (
        <circle key={i} cx="200" cy="150" r={r} stroke={color} strokeWidth="1.5" fill="none" opacity="0.08">
          <animate attributeName="r" values={`${r};${r + 15};${r}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.08;0.02;0.08" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Central alert icon */}
      <circle cx="200" cy="150" r="24" fill={color} fillOpacity="0.15" />
      <path d="M200 135 L200 150" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <circle cx="200" cy="158" r="2" fill={color} opacity="0.6" />

      {/* Revenue impact lines */}
      <line x1="140" y1="220" x2="160" y2="200" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="160" y1="200" x2="180" y2="230" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="180" y1="230" x2="200" y2="195" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="200" y1="195" x2="220" y2="240" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="220" y1="240" x2="240" y2="210" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="240" y1="210" x2="260" y2="220" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Connection dots */}
      {[
        { x: 100, y: 80 },
        { x: 300, y: 80 },
        { x: 100, y: 220 },
        { x: 300, y: 220 },
      ].map((pt, i) => (
        <g key={i}>
          <line x1={200} y1={150} x2={pt.x} y2={pt.y} stroke={color} strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />
          <circle cx={pt.x} cy={pt.y} r="4" fill={color} opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function DriftIllustration({ className }: ProductIllustrationProps) {
  const color = "#8B5CF6";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Design frame (left) */}
      <rect x="60" y="80" width="120" height="140" rx="12" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" fill={color} fillOpacity="0.05" />
      <rect x="75" y="100" width="90" height="16" rx="4" fill={color} fillOpacity="0.1" />
      <rect x="75" y="124" width="60" height="12" rx="4" fill={color} fillOpacity="0.08" />
      <rect x="75" y="148" width="90" height="50" rx="8" fill={color} fillOpacity="0.06" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
      <text x="120" y="94" textAnchor="middle" fontSize="8" fill={color} opacity="0.5" fontWeight="bold">FIGMA</text>

      {/* Code frame (right) */}
      <rect x="220" y="80" width="120" height="140" rx="12" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.3" fill="#E2FB6C" fillOpacity="0.03" />
      <rect x="235" y="100" width="40" height="8" rx="2" fill="#E2FB6C" fillOpacity="0.15" />
      <rect x="235" y="114" width="70" height="8" rx="2" fill="#E2FB6C" fillOpacity="0.1" />
      <rect x="235" y="128" width="55" height="8" rx="2" fill="#E2FB6C" fillOpacity="0.1" />
      <rect x="235" y="148" width="90" height="50" rx="8" fill="#E2FB6C" fillOpacity="0.04" stroke="#E2FB6C" strokeWidth="0.5" strokeOpacity="0.2" />
      <text x="280" y="94" textAnchor="middle" fontSize="8" fill="#E2FB6C" opacity="0.5" fontWeight="bold">CODE</text>

      {/* Sync arrows */}
      <path d="M185 135 L215 135" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#drift-arrow)" />
      <path d="M215 165 L185 165" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#drift-arrow-g)" />
      <defs>
        <marker id="drift-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={color} fillOpacity="0.4" />
        </marker>
        <marker id="drift-arrow-g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="#E2FB6C" fillOpacity="0.4" />
        </marker>
      </defs>

      {/* Sync indicator */}
      <circle cx="200" cy="150" r="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" strokeOpacity="0.3">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M195 150 L198 153 L205 146" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function PhantomIllustration({ className }: ProductIllustrationProps) {
  const color = "#22D3EE";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Radar sweep */}
      <circle cx="200" cy="150" r="100" stroke={color} strokeWidth="1" strokeOpacity="0.1" fill="none" />
      <circle cx="200" cy="150" r="70" stroke={color} strokeWidth="1" strokeOpacity="0.08" fill="none" />
      <circle cx="200" cy="150" r="40" stroke={color} strokeWidth="1" strokeOpacity="0.06" fill="none" />

      {/* Radar sweep line */}
      <line x1="200" y1="150" x2="200" y2="50" stroke={color} strokeWidth="1.5" strokeOpacity="0.4">
        <animateTransform attributeName="transform" type="rotate" values="0 200 150;360 200 150" dur="4s" repeatCount="indefinite" />
      </line>

      {/* Sweep gradient */}
      <path d="M200 150 L200 50 A100,100 0 0,1 270 80 Z" fill={color} fillOpacity="0.05">
        <animateTransform attributeName="transform" type="rotate" values="0 200 150;360 200 150" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Debt hotspots */}
      {[
        { cx: 170, cy: 100, r: 6, severity: "high" },
        { cx: 240, cy: 120, r: 8, severity: "critical" },
        { cx: 180, cy: 180, r: 5, severity: "medium" },
        { cx: 250, cy: 170, r: 4, severity: "low" },
        { cx: 150, cy: 150, r: 7, severity: "high" },
      ].map((hotspot, i) => (
        <g key={i}>
          <circle cx={hotspot.cx} cy={hotspot.cy} r={hotspot.r * 2.5} fill={color} fillOpacity="0.05" />
          <circle cx={hotspot.cx} cy={hotspot.cy} r={hotspot.r} fill={hotspot.severity === "critical" ? "#EF4444" : color} fillOpacity={hotspot.severity === "critical" ? 0.5 : 0.3}>
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Dollar signs at the bottom */}
      <text x="160" y="260" fontSize="14" fill={color} opacity="0.2" fontWeight="bold">$42K</text>
      <text x="220" y="260" fontSize="10" fill={color} opacity="0.15">debt cost</text>
    </svg>
  );
}

export function NexusIllustration({ className }: ProductIllustrationProps) {
  const colors = ["#E2FB6C", "#f16e2c", "#6366F1", "#EF4444", "#8B5CF6", "#22D3EE"];
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central brain node */}
      <circle cx="200" cy="150" r="35" fill="#E2FB6C" fillOpacity="0.08" stroke="#E2FB6C" strokeWidth="1.5" strokeOpacity="0.25" />
      <circle cx="200" cy="150" r="50" stroke="#E2FB6C" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 4">
        <animateTransform attributeName="transform" type="rotate" values="0 200 150;360 200 150" dur="20s" repeatCount="indefinite" />
      </circle>

      {/* Product nodes around center */}
      {colors.map((c, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const cx = 200 + 95 * Math.cos(angle);
        const cy = 150 + 75 * Math.sin(angle);
        return (
          <g key={i}>
            <line x1={200} y1={150} x2={cx} y2={cy} stroke={c} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="2 3" />
            <circle cx={cx} cy={cy} r="14" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
            <circle cx={cx} cy={cy} r="5" fill={c} opacity="0.4">
              <animate attributeName="r" values="5;7;5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Central pulse */}
      <circle cx="200" cy="150" r="15" fill="#E2FB6C" fillOpacity="0.2">
        <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
        <animate attributeName="fillOpacity" values="0.2;0.08;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
