import React, {useEffect, useRef, useState} from 'react'
import styles from './BitcoinCoin.module.css'

const LAYERS = 20
const LOGO =
  'M46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768l-3.511-0.875l-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653l-3.509-0.875l-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018l-4.842-1.209l-0.934,3.75c0,0,2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117c-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834c0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019l4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834l3.507,0.875l1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745l3.511,0.875l1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739c1.527-4.36-0.076-6.875-3.226-8.515C44.067,31.743,45.754,30.106,46.103,27.444zM38.08,38.693c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729C31.582,32.97,39.215,34.149,38.08,38.693zM39.166,27.381c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.008C33.814,22.324,40.199,23.252,39.166,27.381z'

// Textura de anéis concêntricos (acabamento "torneado")
const RINGS = []
for (let r = 3; r < 64; r += 1.6) RINGS.push(r)

const SharedDefs = () => (
  <React.Fragment>
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
    <clipPath id='btcPortrait'><circle cx='100' cy='100' r='62' /></clipPath>
  </React.Fragment>
)

const CoinFace = ({side, text, image}) => {
  const pathId = `btcText-${side}`
  return (
    <svg className={styles.faceSvg} viewBox='0 0 200 200' aria-hidden='true'>
      <defs>
        <SharedDefs />
        <path id={pathId} d='M100,27 a73,73 0 1,1 -0.01,0' />
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
        <textPath href={`#${pathId}`} xlinkHref={`#${pathId}`} textLength='452' lengthAdjust='spacing'>
          {text}
        </textPath>
      </text>

      {side === 'front' && (
        <g transform='translate(100 100) scale(1.95) translate(-32 -32)' filter='url(#btcBevel)'>
          <path d={LOGO} fill='url(#btcRaised)' />
        </g>
      )}
      {side === 'back' && image && (
        <g clipPath='url(#btcPortrait)'>
          <image href={image} xlinkHref={image} x='38' y='38' width='124' height='124'
            preserveAspectRatio='xMidYMid slice' />
        </g>
      )}
      {side === 'back' && !image && (
        <text x='100' y='118' textAnchor='middle' fill='url(#btcRaised)' filter='url(#btcBevel)'
          fontFamily='Georgia, "Times New Roman", serif' fontSize='54' fontWeight='700'>21M</text>
      )}

      {/* Anel interno */}
      <circle cx='100' cy='100' r='64' fill='none' stroke='url(#btcRaised)' strokeWidth='2' filter='url(#btcBevel)' />
      {/* Brilho metálico */}
      <circle cx='100' cy='100' r='99' fill='url(#btcGloss)' />
    </svg>
  )
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

export default function BitcoinCoin ({
  size = 220,
  thickness,
  speed = 4,
  frontText = 'BITCOIN • 21 000 000 • PEER TO PEER • 2009 •',
  backText = 'IN CRYPTO WE TRUST • 21 000 000 • 2009 •',
  backImage, // retrato já em relevo dourado, ex.: '/static/trump-moeda.png'
  motionStrength = 1, // quanto o movimento do celular mexe a moeda
  flipVelocity = 0.8, // velocidade mínima do dedo (px/ms) para virar a moeda
  showButtons = true // botões "Cara" e "Coroa"
}) {
  const tiltRef = useRef(null)
  const flipRef = useRef(null)
  const tossRef = useRef(null)
  const angle = useRef(0)
  const drag = useRef(null)
  const [side, setSide] = useState('coroa') // coroa = Bitcoin, cara = retrato
  const [spinning, setSpinning] = useState(false)
  const spinTimer = useRef(null)
  useEffect(() => () => clearTimeout(spinTimer.current), [])

  // 1) Movimento do celular: quanto mais a pessoa mexe, mais a moeda reage.
  //    Física de mola: o movimento dá um "empurrão", a moeda balança e volta ao centro.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pos = {x: 0, y: 0}
    const vel = {x: 0, y: 0}
    const target = {x: 0, y: 0}
    const base = {beta: null, gamma: null}
    let raf = null
    let last = 0

    const STIFFNESS = 55 // força que puxa de volta ao centro
    const DAMPING = 6 // quanto menor, mais a moeda "chacoalha"

    const loop = now => {
      const dt = Math.min((now - (last || now)) / 1000, 0.04) || 0.016
      last = now
      for (const k of ['x', 'y']) {
        const acc = -STIFFNESS * (pos[k] - target[k]) - DAMPING * vel[k]
        vel[k] += acc * dt
        pos[k] = clamp(pos[k] + vel[k] * dt, -70, 70)
      }
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${pos.x.toFixed(2)}deg) rotateY(${pos.y.toFixed(2)}deg)`
      }
      const still = Math.abs(vel.x) + Math.abs(vel.y) < 0.05 &&
        Math.abs(pos.x - target.x) + Math.abs(pos.y - target.y) < 0.05
      raf = still ? null : requestAnimationFrame(loop)
    }
    const wake = () => { if (!raf) { last = 0; raf = requestAnimationFrame(loop) } }

    // Inclinação: reage à MUDANÇA de posição e volta ao centro quando o celular para
    const onOrient = e => {
      if (e.beta == null || e.gamma == null) return
      if (base.beta === null) { base.beta = e.beta; base.gamma = e.gamma }
      base.beta += (e.beta - base.beta) * 0.03
      base.gamma += (e.gamma - base.gamma) * 0.03
      target.x = clamp((e.beta - base.beta) * -1.4 * motionStrength, -45, 45)
      target.y = clamp((e.gamma - base.gamma) * 1.8 * motionStrength, -60, 60)
      wake()
    }

    // Giro e chacoalhada do celular dão impulso direto na moeda
    const onMotion = e => {
      const r = e.rotationRate || {}
      const a = e.acceleration || {}
      const kick = 0.9 * motionStrength
      vel.x += clamp((r.beta || 0) * -kick, -120, 120)
      vel.y += clamp((r.gamma || 0) * kick + (a.x || 0) * 12 * motionStrength, -160, 160)
      if (Math.abs(r.beta || 0) + Math.abs(r.gamma || 0) + Math.abs(a.x || 0) > 2) wake()
    }

    // iPhone exige permissão, pedida no primeiro toque na página
    const askPermission = () => {
      [window.DeviceOrientationEvent, window.DeviceMotionEvent].forEach(Evt => {
        if (Evt && typeof Evt.requestPermission === 'function') Evt.requestPermission().catch(() => {})
      })
    }

    window.addEventListener('deviceorientation', onOrient)
    window.addEventListener('devicemotion', onMotion)
    document.addEventListener('touchend', askPermission, {once: true})
    return () => {
      window.removeEventListener('deviceorientation', onOrient)
      window.removeEventListener('devicemotion', onMotion)
      document.removeEventListener('touchend', askPermission)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [motionStrength])

  const setFlip = (deg, transition) => {
    const el = flipRef.current
    if (!el) return
    el.style.transition = transition
    el.style.transform = `rotateY(${deg}deg)`
  }

  const sideOf = deg => (Math.round(deg / 180) % 2 === 0 ? 'coroa' : 'cara')

  // 2) Deslize forte do dedo vira a moeda
  const onPointerDown = e => {
    if (spinning) return
    drag.current = {startX: e.clientX, startT: e.timeStamp, samples: [{x: e.clientX, t: e.timeStamp}]}
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = e => {
    const d = drag.current
    if (!d) return
    d.samples.push({x: e.clientX, t: e.timeStamp})
    if (d.samples.length > 8) d.samples.shift()
    setFlip(angle.current + clamp((e.clientX - d.startX) * 0.35, -55, 55), 'none')
  }

  const onPointerUp = e => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const recent = d.samples.filter(s => e.timeStamp - s.t < 120)
    const first = recent[0] || d.samples[0]
    const dt = Math.max(e.timeStamp - first.t, 1)
    const dx = e.clientX - d.startX
    const v = (e.clientX - first.x) / dt
    const sign = Math.sign(v) || Math.sign(dx)
    const quickFlick = e.timeStamp - d.startT < 220 && Math.abs(dx) > 50

    if ((Math.abs(v) >= flipVelocity && Math.abs(dx) > 30) || quickFlick) {
      const turns = Math.abs(v) > flipVelocity * 3 ? 3 : 1
      angle.current += 180 * turns * sign
      setFlip(angle.current, `transform ${0.8 + turns * 0.2}s cubic-bezier(.2, 1.3, .4, 1)`)
      setSide(sideOf(angle.current))
    } else {
      setFlip(angle.current, 'transform .5s cubic-bezier(.3, 1.4, .5, 1)')
    }
  }

  // 3) Botões: a moeda sobe girando forte e vai desacelerando até parar no lado escolhido
  const SPIN_TURNS = 6 // voltas completas
  const SPIN_TIME = 3400 // ms

  const toss = wanted => {
    if (spinning) return
    let next = angle.current + 360 * SPIN_TURNS
    if (sideOf(next) !== wanted) next += 180
    angle.current = next
    // começa rápido e desacelera suave, sem passar do ponto (para exatamente no lado)
    setFlip(next, `transform ${SPIN_TIME}ms cubic-bezier(.33, 1, .68, 1)`)
    setSpinning(true)

    const el = tossRef.current
    if (el) {
      el.classList.remove(styles.tossing)
      void el.offsetWidth // reinicia a animação do pulo
      el.classList.add(styles.tossing)
    }

    clearTimeout(spinTimer.current)
    spinTimer.current = setTimeout(() => {
      setSpinning(false)
      setSide(wanted)
    }, SPIN_TIME)
  }

  const t = thickness || Math.round(size * 0.07)
  const layers = []
  for (let i = 0; i < LAYERS; i++) {
    const z = -t / 2 + (t * i) / (LAYERS - 1)
    layers.push(<div key={i} className={styles.edge} style={{'--z': `${z}px`}} />)
  }

  return (
    <div className={styles.root} style={{'--size': `${size}px`, '--thickness': `${t}px`, '--speed': `${speed}s`}}>
      <div
        className={styles.scene}
        role='img'
        aria-label={`Moeda mostrando ${side}. Deslize rápido para virar.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.float}>
          <div className={styles.toss} ref={tossRef}>
            <div className={styles.tilt} ref={tiltRef}>
              <div className={styles.flip} ref={flipRef}>
                <div className={styles.coin}>
                  {layers}
                  <div className={`${styles.face} ${styles.front}`}><CoinFace side='front' text={frontText} /></div>
                  <div className={`${styles.face} ${styles.back}`}><CoinFace side='back' text={backText} image={backImage} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.shadow} />
      </div>

      {showButtons && (
        <div className={`${styles.buttons} ${spinning ? styles.busy : ''}`} aria-busy={spinning}>
          <button type='button' className={styles.button} disabled={spinning}
            aria-pressed={!spinning && side === 'cara'} onClick={() => toss('cara')}>
            Cara
          </button>
          <button type='button' className={styles.button} disabled={spinning}
            aria-pressed={!spinning && side === 'coroa'} onClick={() => toss('coroa')}>
            Coroa
          </button>
        </div>
      )}
    </div>
  )
}
