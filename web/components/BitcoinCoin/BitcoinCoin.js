import React from 'react'
import PropTypes from 'prop-types'
import styles from './BitcoinCoin.module.css'

const LAYERS = 14

const BitcoinLogo = () => (
  <svg className={styles.logo} viewBox='0 0 64 64' aria-hidden='true'>
    <path
      fill='#fff'
      d='M46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768l-3.511-0.875l-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653l-3.509-0.875l-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018l-4.842-1.209l-0.934,3.75c0,0,2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117c-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834c0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019l4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834l3.507,0.875l1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745l3.511,0.875l1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739c1.527-4.36-0.076-6.875-3.226-8.515C44.067,31.743,45.754,30.106,46.103,27.444zM38.08,38.693c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729C31.582,32.97,39.215,34.149,38.08,38.693zM39.166,27.381c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.008C33.814,22.324,40.199,23.252,39.166,27.381z'
    />
  </svg>
)

function BitcoinCoin ({size = 200, thickness, speed = 4}) {
  const t = thickness || Math.round(size * 0.08)
  const layers = []
  for (let i = 0; i < LAYERS; i++) {
    const z = -t / 2 + (t * i) / (LAYERS - 1)
    layers.push(<div key={i} className={styles.edge} style={{'--z': `${z}px`}} />)
  }

  return (
    <div
      className={styles.scene}
      style={{'--size': `${size}px`, '--thickness': `${t}px`, '--speed': `${speed}s`}}
      role='img'
      aria-label='Moeda de Bitcoin girando'
    >
      <div className={styles.coin}>
        {layers}
        <div className={`${styles.face} ${styles.front}`}>
          <BitcoinLogo />
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <BitcoinLogo />
        </div>
      </div>
    </div>
  )
}

BitcoinCoin.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  speed: PropTypes.number
}

export default BitcoinCoin
