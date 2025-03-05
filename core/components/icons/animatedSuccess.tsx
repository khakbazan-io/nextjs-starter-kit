import { motion } from "framer-motion";

type Props = {
  size?: number;
  checkColor?: "#4CAF50";
  borderColor?: "#4CAF50";
};

export const AnimatedCheckmark: React.FC<Props> = ({
  size = 100,
  checkColor = "#4CAF50",
  borderColor = "#4CAF50",
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: [0.5, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 0.7,
        times: [0, 0.7, 1],
        ease: "easeInOut",
      }}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={borderColor}
        strokeWidth="5"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
      />

      <motion.path
        d="M25 50 L45 70 L75 30"
        fill="none"
        stroke={checkColor}
        strokeWidth="6"
        strokeLinecap="round"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        animate={{
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </motion.svg>
  );
};
