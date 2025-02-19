import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function Component() {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        Required input <span className="text-red-500 dark:text-red-900">*</span>
      </Label>
      <Input id={id} placeholder="Email" type="email" required />
    </div>
  );
}
