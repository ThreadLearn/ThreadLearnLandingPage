// Reusable framer-motion variants

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const hoverLift = {
  rest: { y: 0, boxShadow: '0 0 0 1px #e6e6e6' },
  hover: { y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', transition: { duration: 0.2, ease: 'easeOut' } },
}

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
}

export const tapScale = {
  tap: { scale: 0.97 },
}

export const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const popIn = {
  hidden: { scale: 0.7, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
}

export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}
