
export interface TrinidadAndTobagoFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function TrinidadAndTobagoFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Trinidad and Tobago",
}: TrinidadAndTobagoFlagProps) {
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
        src="/canon/flags/trinidadandtobago.svg"
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
