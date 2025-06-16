import { IconTrash } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50px", scale: 0.8 },
  visible: {
    opacity: 1,
    y: "0",
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring" as const,
      stiffness: 300,
    },
  },
  exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};
const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative w-full max-w-md p-6 text-center bg-gray-800 shadow-2xl rounded-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <IconTrash className="mx-auto mb-4 text-5xl text-rose-500 animate-pulse" />
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-gray-400">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-5 py-2 text-white transition bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-5 py-2 text-white transition rounded-lg shadow-md bg-rose-600 hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
