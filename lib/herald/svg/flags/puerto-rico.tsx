
export interface PuertoRicoFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function PuertoRicoFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Puerto Rico",
}: PuertoRicoFlagProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src="/canon/flags/puertorico.svg"
        alt={title}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
