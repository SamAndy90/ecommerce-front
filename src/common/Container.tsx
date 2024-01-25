import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container(props: ContainerProps) {
  const { children, className } = props;

  return (
    <div
      className={twMerge("container mx-auto max-w-screen-xl px-4", className)}
    >
      {children}
    </div>
  );
}
