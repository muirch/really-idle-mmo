import { Select as HeadlessUISelect } from "@headlessui/react";
import { ComponentPropsWithoutRef, FC } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "../../utils";

type Props = ComponentPropsWithoutRef<"select">;

export const Select: FC<Props> = props => {
  return (
    <div className="w-full relative">
      <HeadlessUISelect
        {...props}
        className={cn(
          "block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          // Make the text of each option black on Windows
          "*:text-black",
          props.className,
        )}>
        {props.children}
      </HeadlessUISelect>

      <ChevronDownIcon
        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
        aria-hidden="true"
      />
    </div>
  );
};
