export type CrestData = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
};

const symbolCharacters: Record<string, string> = {
  Lion: "♌",
  Eagle: "◆",
  Stag: "♜",
  Wolf: "◇",
};

const heritageCodes: Record<string, string> = {
  France: "FR",
  "United States": "US",
  Ireland: "IE",
  Italy: "IT",
  England: "EN",
  Scotland: "SC",
  Germany: "DE",
  Spain: "ES",
};

export function getCrestSymbol(symbol: string) {
  return symbolCharacters[symbol] ?? symbolCharacters.Lion;
}

export function getHeritageCode(heritage: string) {
  return (
    heritageCodes[heritage] ??
    heritage.trim().slice(0, 2).toUpperCase() ??
    "FR"
  );
}

export function createCrestSvg({
  familyName,
  initials,
  heritage,
  symbol,
  value,
  motto,
}: CrestData) {
  const safeFamilyName = escapeXml(familyName.trim() || "Family");
  const safeInitials = escapeXml(
    initials.trim() || getHeritageCode(heritage),
  );
  const safeHeritageCode = escapeXml(getHeritageCode(heritage));
  const safeHeritage = escapeXml(heritage || "Heritage");
  const safeSymbol = escapeXml(getCrestSymbol(symbol));
  const safeValue = escapeXml(value || "Courage");
  const safeMotto = escapeXml(motto || "Fortis in Familia");

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 760"
      role="img"
      aria-label="${safeFamilyName} family crest"
      style="display:block;width:100%;height:auto"
    >
      <defs>
        <filter
          id="crest-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="18"
            flood-color="#000000"
            flood-opacity="0.38"
          />
        </filter>

        <linearGradient
          id="shield-field"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stop-color="#3E4331" />
          <stop offset="100%" stop-color="#292D22" />
        </linearGradient>
      </defs>

      <g filter="url(#crest-shadow)">
        <path
          d="M300 54 L344 90 L391 76 L382 126 L425 152 L378 170 L365 220 L300 185 L235 220 L222 170 L175 152 L218 126 L209 76 L256 90 Z"
          fill="#B08D57"
          stroke="#E7D8B4"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <circle
          cx="300"
          cy="138"
          r="28"
          fill="#20231C"
          stroke="#E7D8B4"
          stroke-width="4"
        />

        <text
          x="300"
          y="148"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Georgia, serif"
          font-size="25"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeInitials}
        </text>

        <path
          d="M150 198
             Q300 130 450 198
             L430 440
             Q412 570 300 632
             Q188 570 170 440
             Z"
          fill="url(#shield-field)"
          stroke="#B08D57"
          stroke-width="12"
          stroke-linejoin="round"
        />

        <path
          d="M300 166 L300 622"
          stroke="#B08D57"
          stroke-width="7"
        />

        <path
          d="M166 337 L434 337"
          stroke="#B08D57"
          stroke-width="7"
        />

        <path
          d="M176 212
             Q232 180 292 174
             L292 329
             L168 329
             Z"
          fill="#20231C"
        />

        <path
          d="M308 174
             Q368 180 424 212
             L432 329
             L308 329
             Z"
          fill="#34382A"
        />

        <path
          d="M174 345
             L292 345
             L292 607
             Q214 556 190 458
             Z"
          fill="#34382A"
        />

        <path
          d="M308 345
             L426 345
             L410 458
             Q386 556 308 607
             Z"
          fill="#20231C"
        />

        <circle
          cx="300"
          cy="350"
          r="108"
          fill="#20231C"
          stroke="#B08D57"
          stroke-width="8"
        />

        <circle
          cx="300"
          cy="350"
          r="88"
          fill="none"
          stroke="#B08D57"
          stroke-width="3"
          stroke-dasharray="7 8"
        />

        <text
          x="300"
          y="384"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Georgia, serif"
          font-size="112"
        >
          ${safeSymbol}
        </text>

        <text
          x="231"
          y="268"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="18"
          font-weight="700"
          letter-spacing="4"
        >
          ${safeHeritageCode}
        </text>

        <text
          x="369"
          y="268"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="15"
          font-weight="700"
          letter-spacing="2"
        >
          ${safeValue.toUpperCase()}
        </text>

        <text
          x="232"
          y="490"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="14"
          font-weight="700"
          letter-spacing="2"
        >
          ${safeHeritage.toUpperCase()}
        </text>

        <text
          x="368"
          y="490"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Georgia, serif"
          font-size="30"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeInitials}
        </text>

        <path
          d="M102 602
             Q300 552 498 602
             L466 680
             Q300 640 134 680
             Z"
          fill="#20231C"
          stroke="#B08D57"
          stroke-width="7"
          stroke-linejoin="round"
        />

        <text
          x="300"
          y="632"
          text-anchor="middle"
          fill="#F6F2EA"
          font-family="Georgia, serif"
          font-size="24"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeFamilyName.toUpperCase()}
        </text>

        <text
          x="300"
          y="665"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Arial, sans-serif"
          font-size="14"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeMotto.toUpperCase()}
        </text>
      </g>
    </svg>
  `;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}