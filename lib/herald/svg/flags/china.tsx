
export interface ChinaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function ChinaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of China",
}: ChinaFlagProps) {
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
        src="/canon/flags/china.svg"
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
