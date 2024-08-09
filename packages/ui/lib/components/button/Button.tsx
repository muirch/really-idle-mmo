import { Button as HeadlessUIButton } from "@headlessui/react";
import { cn } from "../../utils";
import { FC, ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export const Button: FC<Props> = props => {
  return (
    <HeadlessUIButton
      {...props}
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white",
        props.className,
      )}>
      {props.children}
    </HeadlessUIButton>
  );
};
