import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// forward refs
export function fr<T = HTMLElement, P = React.HTMLAttributes<T>>(
  component: ForwardRefRenderFunction<T, P>
) {
  const wrapped = forwardRef(component);
  wrapped.displayName = component.name;
  return wrapped;
}

// styled element
export function se<
  T = HTMLElement,
  P extends React.HTMLAttributes<T> = React.HTMLAttributes<T>
>(Tag: keyof React.ReactHTML, ...classNames: ClassValue[]) {
  const component = fr<T, P>(({ className, ...props }, ref) => (
    // @ts-expect-error Too complicated for TypeScript
    <Tag ref={ref} className={cn(...classNames, className)} {...props} />
  ));
  component.displayName = Tag[0].toUpperCase() + Tag.slice(1);
  return component;
}

export function copyText(promptText: string) {
  // Copy prompt text to clipboard
  void navigator.clipboard.writeText(promptText);

  // Construct the URL with the prompt text as a query parameter
  const chatGPTUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(
    promptText
  )}`;

  // Show toast notification
  toast({
    title: "Prompt copied to clipboard",
    description: (
      <a
        href={chatGPTUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Click here to paste the prompt into ChatGPT.
      </a>
    ),
  });
}
