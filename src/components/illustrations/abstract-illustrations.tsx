interface IllustrationProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function DataFlowIllustration({
  className,
  primaryColor = "#004838",
  secondaryColor = "#6366F1",
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="df-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="df-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Flowing lines */}
      <path
        d="M0 200 C80 180, 120 100, 200 150 S320 80, 400 120"
        stroke={primaryColor}
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M0 200 C80 180, 120 100, 200 150 S320 80, 400 120;M0 180 C80 200, 120 120, 200 130 S320 100, 400 140;M0 200 C80 180, 120 100, 200 150 S320 80, 400 120"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M0 220 C100 200, 150 140, 200 170 S300 110, 400 140"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeOpacity="0.2"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M0 220 C100 200, 150 140, 200 170 S300 110, 400 140;M0 200 C100 220, 150 160, 200 150 S300 130, 400 160;M0 220 C100 200, 150 140, 200 170 S300 110, 400 140"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* Floating nodes */}
      {[
        { cx: 80, cy: 160, r: 6 },
        { cx: 160, cy: 120, r: 8 },
        { cx: 240, cy: 140, r: 5 },
        { cx: 320, cy: 100, r: 7 },
      ].map((node, i) => (
        <g key={i}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r * 3}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity="0.06"
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity="0.6"
          >
            <animate
              attributeName="cy"
              values={`${node.cy};${node.cy - 10};${node.cy}`}
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Orbiting ring */}
      <ellipse
        cx="200"
        cy="150"
        rx="120"
        ry="40"
        stroke={primaryColor}
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 200 150;360 200 150"
          dur="20s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}

export function ShieldIllustration({
  className,
  primaryColor = "#004838",
  secondaryColor = "#22D3EE",
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shield-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Shield shape */}
      <path
        d="M100 20 L160 50 L160 100 C160 140 130 170 100 185 C70 170 40 140 40 100 L40 50 Z"
        fill="url(#shield-grad)"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* Inner shield */}
      <path
        d="M100 40 L145 62 L145 100 C145 132 120 155 100 167 C80 155 55 132 55 100 L55 62 Z"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="3 4"
      />

      {/* Checkmark */}
      <path
        d="M78 100 L93 115 L122 86"
        stroke={primaryColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="60;0"
          dur="1.5s"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          values="0 60;60 0"
          dur="1.5s"
          fill="freeze"
        />
      </path>

      {/* Pulse rings */}
      <circle cx="100" cy="100" r="70" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.1">
        <animate attributeName="r" values="70;80;70" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.03;0.1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="85" stroke={secondaryColor} strokeWidth="0.5" fill="none" opacity="0.06">
        <animate attributeName="r" values="85;95;85" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.06;0.02;0.06" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function BrokenChainIllustration({
  className,
  primaryColor = "#EF4444",
  secondaryColor = "#EAB308",
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Broken chain links */}
      <g opacity="0.6">
        {/* Left chain group */}
        <rect x="30" y="70" width="60" height="60" rx="12" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.4" />
        <rect x="100" y="70" width="60" height="60" rx="12" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.3" />

        {/* Break indicator */}
        <line x1="175" y1="80" x2="225" y2="120" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="175" y1="120" x2="225" y2="80" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Right chain group */}
        <rect x="240" y="70" width="60" height="60" rx="12" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.3" />
        <rect x="310" y="70" width="60" height="60" rx="12" stroke={secondaryColor} strokeWidth="2" strokeOpacity="0.4" />
      </g>

      {/* Warning signals */}
      <circle cx="200" cy="100" r="4" fill={primaryColor} opacity="0.8">
        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Scattered data points */}
      {[
        { x: 60, y: 40 },
        { x: 130, y: 50 },
        { x: 270, y: 45 },
        { x: 340, y: 35 },
        { x: 60, y: 155 },
        { x: 130, y: 160 },
        { x: 270, y: 150 },
        { x: 340, y: 165 },
      ].map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r="2"
          fill={i < 4 ? primaryColor : secondaryColor}
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur={`${2 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export function PersonaIllustration({
  className,
  primaryColor = "#004838",
  secondaryColor = "#6366F1",
  variant = "manager",
}: IllustrationProps & { variant?: "manager" | "product" }) {
  const isManager = variant === "manager";

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`persona-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="60" cy="60" r="55" fill={`url(#persona-${variant})`} />
      <circle cx="60" cy="60" r="55" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.2" />

      {/* Abstract person silhouette */}
      <circle cx="60" cy="40" r="14" fill={primaryColor} opacity="0.3" />
      <path
        d="M35 85 C35 65 45 58 60 58 S85 65 85 85"
        fill={primaryColor}
        opacity="0.2"
      />

      {/* Role-specific icon elements */}
      {isManager ? (
        <>
          {/* Code brackets */}
          <path d="M42 45 L34 52 L42 59" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M78 45 L86 52 L78 59" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </>
      ) : (
        <>
          {/* Chart bars */}
          <rect x="38" y="50" width="6" height="14" rx="2" fill={secondaryColor} opacity="0.4" />
          <rect x="48" y="44" width="6" height="20" rx="2" fill={secondaryColor} opacity="0.5" />
          <rect x="58" y="48" width="6" height="16" rx="2" fill={secondaryColor} opacity="0.4" />
        </>
      )}

      {/* Floating particles */}
      <circle cx="25" cy="30" r="2" fill={primaryColor} opacity="0.3">
        <animate attributeName="cy" values="30;25;30" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="35" r="1.5" fill={secondaryColor} opacity="0.3">
        <animate attributeName="cy" values="35;30;35" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function CTAIllustration({
  className,
  primaryColor = "#004838",
  secondaryColor = "#6366F1",
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract wave background */}
      <path
        d="M0 100 C100 60, 200 140, 300 100 S500 60, 600 100"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeOpacity="0.15"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M0 100 C100 60, 200 140, 300 100 S500 60, 600 100;M0 120 C100 80, 200 120, 300 80 S500 120, 600 80;M0 100 C100 60, 200 140, 300 100 S500 60, 600 100"
          dur="12s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M0 120 C150 80, 250 160, 350 120 S500 80, 600 120"
        stroke={secondaryColor}
        strokeWidth="1"
        strokeOpacity="0.1"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M0 120 C150 80, 250 160, 350 120 S500 80, 600 120;M0 100 C150 140, 250 80, 350 140 S500 100, 600 140;M0 120 C150 80, 250 160, 350 120 S500 80, 600 120"
          dur="15s"
          repeatCount="indefinite"
        />
      </path>

      {/* Glowing dots */}
      {[
        { cx: 50, cy: 100 },
        { cx: 150, cy: 80 },
        { cx: 300, cy: 100 },
        { cx: 450, cy: 85 },
        { cx: 550, cy: 95 },
      ].map((dot, i) => (
        <g key={i}>
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r="15"
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity="0.04"
          />
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r="3"
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity="0.4"
          >
            <animate
              attributeName="opacity"
              values="0.4;0.15;0.4"
              dur={`${3 + i * 0.7}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function ComplianceBadge({
  label,
  className,
  color = "#004838",
}: {
  label: string;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Badge circle */}
      <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="2 3" />

      {/* Shield inner */}
      <path
        d="M40 18 L56 28 L56 42 C56 54 48 62 40 66 C32 62 24 54 24 42 L24 28 Z"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {/* Checkmark */}
      <path
        d="M33 42 L38 47 L48 37"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {/* Label */}
      <text
        x="40"
        y="76"
        textAnchor="middle"
        className="text-[7px] font-bold fill-current"
        style={{ fill: color }}
        opacity="0.6"
      >
        {label}
      </text>
    </svg>
  );
}
