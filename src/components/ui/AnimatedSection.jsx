import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInUp, staggerContainer } from '../../lib/animations'

// Triggers animation when element scrolls into view
export function AnimatedSection({ children, className = '', delay = 0, variants = fadeInUp }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children wrapper
export function AnimatedGroup({ children, className = '', stagger = 0.08, delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Single child that participates in parent stagger
export function AnimatedItem({ children, className = '', variants = fadeInUp }) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

// Page wrapper with enter animation
export function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
