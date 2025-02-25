import { IconTrash } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: "-50px", scale: 0.8 },
    visible: { opacity: 1, y: "0", scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 300 } },
    exit: { opacity: 0, y: "50px", scale: 0.8, transition: { duration: 0.3 } },
};

const DeleteModal = ({ isOpen, onClose, onDelete }: { isOpen: boolean, onClose: () => void, onDelete: () => void }) => {
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
                        className="w-full max-w-md rounded-2xl bg-gray-800 p-6 shadow-2xl text-center relative"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <IconTrash className="mx-auto text-rose-500 text-5xl mb-4 animate-pulse" />
                        <h2 className="text-white text-2xl font-semibold mb-2">Confirm Deletion</h2>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onDelete}
                                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition shadow-md"
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
