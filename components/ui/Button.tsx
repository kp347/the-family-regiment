import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type NativeButtonType = ButtonHTMLAttributes<HTMLButtonElement>["type"];

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type NativeButtonProps = SharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  > & {
    href?: never;
  };

type LinkButtonProps = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href"
  > & {
    href: string;
  };

type ButtonProps = NativeButtonProps | LinkButtonProps;

const baseStyles =
  "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[#8b542f] bg-[#6f4328] text-white hover:bg-[#875235]",
  secondary:
    "border border-[#9d835f] bg-transparent text-[#5b4433] hover:bg-[#efe5d6]",
  ghost:
    "border border-transparent bg-transparent text-[#653b23] hover:text-[#8b542f]",
};

export default function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      children,
      className = "",
      variant = "primary",
      ...linkProps
    } = props;

    const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className = "",
    variant = "primary",
    type,
    ...buttonProps
  } = props as NativeButtonProps;

  const buttonType: NativeButtonType = type ?? "button";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type={buttonType}
      className={styles}
      {...buttonProps}
    >
      {children}
    </button>
  );
}