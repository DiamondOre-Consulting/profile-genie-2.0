import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>
        Required textarea <span className="text-red-500 dark:text-red-900">*</span>
      </Label>
      <Textarea id={id} placeholder="Leave a message" required />
    </div>
  );
}
