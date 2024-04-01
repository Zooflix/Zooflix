import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

const CommonPageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      className="page"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default CommonPageTransition;
