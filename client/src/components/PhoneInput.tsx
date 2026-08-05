import type { ComponentType } from "react";
import PhoneInputModule from "react-phone-input-2";
import type { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// react-phone-input-2 is CommonJS. Vite 8 can expose it as a nested default
// export, so unwrap it before React renders the component.
const unwrapDefault = (value: unknown): ComponentType<PhoneInputProps> => {
  if (value && typeof value === "object" && "default" in value) {
    return unwrapDefault((value as { default: unknown }).default);
  }

  return value as ComponentType<PhoneInputProps>;
};

export default unwrapDefault(PhoneInputModule);
