import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const AnimateNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const prevValueRef = useRef(value);

    useEffect(() => {
        prevValueRef.current = displayValue;
        setDisplayValue(value);
    }, [value]);

    return (
        <AnimatePresence mode="popLayout">
            <motion.p
                className="text-center min-w-[2.5rem]"
                key={displayValue}
                initial={{ opacity: 0, y: value > prevValueRef.current ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: value > prevValueRef.current ? -20 : 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {displayValue}
            </motion.p>
        </AnimatePresence>
    );
};

export default AnimateNumber;
