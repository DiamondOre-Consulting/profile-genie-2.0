import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useEffect, useState } from "react";

const PhoneNumberDisplay = ({ phoneNumber }: { phoneNumber: string }) => {
  const [formattedNumber, setFormattedNumber] = useState<string>("");

  useEffect(() => {
    if (!phoneNumber) return;

    // Ensure the number starts with '+' (auto-detection works best with +)
    const numberWithPlus = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    // Try parsing (auto-detects country from the +code)
    const parsedNumber = parsePhoneNumberFromString(numberWithPlus);

    if (parsedNumber) {
      const formatted = parsedNumber.formatInternational();
      setFormattedNumber(formatted);
    } else {
      // Fallback: Show raw number if parsing fails
      setFormattedNumber(phoneNumber);
    }
  }, [phoneNumber]);

  return <p className="">{formattedNumber}</p>;
};

export default PhoneNumberDisplay;
