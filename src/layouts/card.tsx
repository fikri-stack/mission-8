import { motion } from "framer-motion";
import type { DefaultLayoutProps } from "../utils/interfaces";

export const CardLayout: React.FC<DefaultLayoutProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`bg-white rounded-md shadow ${className}`}
    >
      {children}
    </motion.div>
  );
};
