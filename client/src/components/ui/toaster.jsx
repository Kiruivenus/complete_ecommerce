import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {Airplay,} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, icon, action, ...props }) => (
        <Toast className="bg-green-500 h-4" key={id} {...props}>
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl">{icon }</span>}
            <div className="grid  gap-1">
              {title &&  <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription> {description}</ToastDescription>}
            
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
