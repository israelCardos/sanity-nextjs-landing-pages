import React from 'react'
import styles from './BitcoinCoin.module.css'

const LAYERS = 20
const LOGO =
  'M46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768l-3.511-0.875l-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653l-3.509-0.875l-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018l-4.842-1.209l-0.934,3.75c0,0,2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117c-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834c0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019l4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834l3.507,0.875l1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745l3.511,0.875l1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739c1.527-4.36-0.076-6.875-3.226-8.515C44.067,31.743,45.754,30.106,46.103,27.444zM38.08,38.693c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729C31.582,32.97,39.215,34.149,38.08,38.693zM39.166,27.381c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.008C33.814,22.324,40.199,23.252,39.166,27.381z'

// Textura de anéis concêntricos (acabamento "torneado" da moeda)
const RINGS = []
for (let r = 3; r < 64; r += 1.6) RINGS.push(r)

const CoinFace = () => (
  <svg className={styles.faceSvg} viewBox='0 0 200 200' aria-hidden='true'>
    <defs>
      <linearGradient id='btcRim' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#fff0b8' />
        <stop offset='.3' stopColor='#f2a92a' />
        <stop offset='.55' stopColor='#a35800' />
        <stop offset='.8' stopColor='#ffcf66' />
        <stop offset='1' stopColor='#9c5200' />
      </linearGradient>
      <radialGradient id='btcField' cx='40%' cy='35%' r='75%'>
        <stop offset='0' stopColor='#ffc24a' />
        <stop offset='.55' stopColor='#e8890c' />
        <stop offset='1' stopColor='#a85600' />
      </radialGradient>
      <linearGradient id='btcRaised' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#fff3c4' />
        <stop offset='.45' stopColor='#ffc040' />
        <stop offset='1' stopColor='#c06a00' />
      </linearGradient>
      <linearGradient id='btcGroove' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#5c3000' />
        <stop offset='.5' stopColor='#b36500' />
        <stop offset='1' stopColor='#ffe29a' />
      </linearGradient>
      <radialGradient id='btcGloss' cx='30%' cy='22%' r='60%'>
        <stop offset='0' stopColor='#fff' stopOpacity='.55' />
        <stop offset='.5' stopColor='#fff' stopOpacity='.08' />
        <stop offset='1' stopColor='#fff' stopOpacity='0' />
      </radialGradient>
      {/* Relevo: luz especular sobre a forma + sombra projetada */}
      <filter id='btcBevel' x='-20%' y='-20%' width='140%' height='140%'>
        <feGaussianBlur in='SourceAlpha' stdDeviation='1.2' result='b' />
        <feSpecularLighting in='b' surfaceScale='4' specularConstant='1.1' specularExponent='22' lightingColor='#fff6d8' result='s'>
          <feDistantLight azimuth='225' elevation='42' />
        </feSpecularLighting>
        <feComposite in='s' in2='SourceAlpha' operator='in' result='si' />
        <feComposite in='SourceGraphic' in2='si' operator='arithmetic' k2='1' k3='1' result='lit' />
        <feDropShadow dx='1.2' dy='1.6' stdDeviation='.8' floodColor='#4a2600' floodOpacity='.75' />
      </filter>
      <path id='btcText' d='M100,27 a73,73 0 1,1 -0.01,0' />
    </defs>

    {/* Aro externo elevado */}
    <circle cx='100' cy='100' r='99' fill='url(#btcRim)' filter='url(#btcBevel)' />
    {/* Campo rebaixado */}
    <circle cx='100' cy='100' r='91' fill='url(#btcField)' />
    <circle cx='100' cy='100' r='91' fill='none' stroke='url(#btcGroove)' strokeWidth='2.5' />
    <g fill='none' stroke='#5a2e00' strokeOpacity='.13' strokeWidth='.5'>
      {RINGS.map(r => <circle key={r} cx='100' cy='100' r={r} />)}
    </g>
    {/* Anel de pontos */}
    <circle cx='100' cy='100' r='86' fill='none' stroke='url(#btcRaised)' strokeWidth='3.4'
      strokeLinecap='round' strokeDasharray='0.01 6.754' filter='url(#btcBevel)' />
    {/* Texto gravado */}
    <text fill='url(#btcRaised)' filter='url(#btcBevel)' fontFamily='Georgia, "Times New Roman", serif'
      fontSize='10.5' fontWeight='700' letterSpacing='1.5'>
      <textPath href='#btcText' xlinkHref='#btcText' textLength='452' lengthAdjust='spacing'>
        BITCOIN • 21 000 000 • PEER TO PEER • 2009 •
      </textPath>
    </text>
    {/* Anel interno */}
    <circle cx='100' cy='100' r='64' fill='none' stroke='url(#btcRaised)' strokeWidth='2' filter='url(#btcBevel)' />
    {/* Símbolo em alto relevo */}
    <g transform='translate(100 100) scale(1.95) translate(-32 -32)' filter='url(#btcBevel)'>
      <path d={LOGO} fill='url(#btcRaised)' />
    </g>
    {/* Brilho metálico */}
    <circle cx='100' cy='100' r='99' fill='url(#btcGloss)' />
  </svg>
)

export default function BitcoinCoin ({size = 220, thickness, speed = 3}) {
  const t = thickness || Math.round(size * 0.07)
  const layers = []
  for (let i = 0; i < LAYERS; i++) {
    const z = -t / 2 + (t * i) / (LAYERS - 1)
    layers.push(<div key={i} className={styles.edge} style={{'--z': `${z}px`}} />)
  }
  return (
    <div className={styles.scene} role='img' aria-label='Moeda de Bitcoin'
      style={{'--size': `${size}px`, '--thickness': `${t}px`, '--speed': `${speed}s`}}>
      <div className={styles.float}>
        <div className={styles.coin}>
          {layers}
          <div className={`${styles.face} ${styles.front}`}><CoinFace /></div>
          <div className={`${styles.face} ${styles.back}`}><CoinFace /></div>
        </div>
      </div>
      <div className={styles.shadow} />
    </div>
  )
}
