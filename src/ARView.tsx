import { useState } from 'react'

/* ── tokens ───────────────────────────────────────────────── */
const C = {
  teal:   '#00D4A8',
  tealDk: '#00B894',
  amber:  '#FFB347',
  purple: '#A78BFA',
  rose:   '#FB7185',
  glass:  'rgba(8,18,22,0.72)',
  border: 'rgba(255,255,255,0.10)',
}

/* ── data — positions are % within the safe AR zone, not the screen ── */
const PLACES = [
  {
    id: 1, name: 'Circus Maximus',     cat: 'HISTORIC SITE',  rating: 4.8,
    dist: '0.3 km', dir: 'SW', dirDeg: 225,
    /* safe-zone anchor: left col, first row */
    x: 18, y: 38,
    accent: C.teal,   icon: '🏛️', open: true,
    desc: 'Ancient Roman chariot-racing stadium, once holding 250,000 spectators.',
  },
  {
    id: 2, name: 'Trattoria Roscioli', cat: 'RESTAURANT',     rating: 4.7,
    dist: '0.5 km', dir: 'W',  dirDeg: 270,
    /* right col, first row */
    x: 74, y: 30,
    accent: C.amber,  icon: '🍝', open: true,
    desc: 'Legendary Roman deli and restaurant. Reserve ahead.',
  },
  {
    id: 3, name: 'Palatine Hill',      cat: 'ARCHAEOLOGICAL', rating: 4.9,
    dist: '0.7 km', dir: 'S',  dirDeg: 180,
    /* center, mid row */
    x: 46, y: 56,
    accent: C.purple, icon: '⛰️', open: true,
    desc: 'Birthplace of Rome. Sweeping views of the Forum below.',
  },
  {
    id: 4, name: 'Bar San Calisto',    cat: 'CAFÉ & BAR',     rating: 4.5,
    dist: '1.1 km', dir: 'NW', dirDeg: 315,
    /* left col, lower row */
    x: 14, y: 74,
    accent: C.amber,  icon: '☕', open: true,
    desc: "Trastevere's most beloved neighbourhood bar. Cash only.",
  },
  {
    id: 5, name: 'Capitoline Museums', cat: 'MUSEUM',         rating: 4.8,
    dist: '0.4 km', dir: 'NE', dirDeg: 45,
    /* right col, lower row */
    x: 72, y: 66,
    accent: C.rose,   icon: '🎨', open: false,
    desc: "World's oldest public museums. Michelangelo-designed piazza.",
  },
]

const FILTERS = [
  { label: 'All',      icon: '◉', count: 14 },
  { label: 'Historic', icon: '🏛️', count: 5  },
  { label: 'Food',     icon: '🍴', count: 4  },
  { label: 'Museum',   icon: '🎨', count: 2  },
  { label: 'Nature',   icon: '🌿', count: 3  },
]

/* ── helpers ──────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-px">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="9" height="9" viewBox="0 0 9 9">
          <path
            d="M4.5.5l1 2.1 2.3.3-1.7 1.6.4 2.3L4.5 5.7 2 6.8l.4-2.3L.7 2.9l2.3-.3z"
            fill={i <= Math.round(n) ? C.amber : 'rgba(255,255,255,0.18)'}
          />
        </svg>
      ))}
    </span>
  )
}

function CompassRose({ deg, accent }: { deg: number; accent: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" style={{ transform: `rotate(${deg}deg)` }}>
      <path d="M9 1l2 7H7z" fill={accent} />
      <path d="M9 17l-2-7h4z" fill="rgba(255,255,255,0.22)" />
      <path d="M1 9l7-2v4z"   fill="rgba(255,255,255,0.22)" />
      <path d="M17 9l-7 2V7z" fill="rgba(255,255,255,0.22)" />
    </svg>
  )
}

/* ── AR card — anchored at bottom (card renders upward from anchor) ── */
function ARCard({
  p, sel, onClick,
}: { p: typeof PLACES[0]; sel: boolean; onClick: () => void }) {
  return (
    /* anchor sits at x%, y% of the safe zone; card grows upward via translate(-50%,-100%) */
    <div
      className="absolute"
      style={{
        left: `${p.x}%`,
        top:  `${p.y}%`,
        transform: 'translate(-50%, -100%)',
        zIndex: sel ? 25 : 20,
      }}
    >
      <button
        onClick={onClick}
        className="flex items-stretch rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: sel
            ? 'linear-gradient(135deg, rgba(8,24,20,0.94), rgba(4,14,12,0.94))'
            : C.glass,
          border: `1.5px solid ${sel ? p.accent : C.border}`,
          boxShadow: sel
            ? `0 0 0 1px ${p.accent}28, 0 8px 32px rgba(0,0,0,0.65), 0 0 40px ${p.accent}22`
            : '0 4px 20px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          width: 190,
        }}
      >
        {/* left accent stripe */}
        <div className="w-[3px] flex-shrink-0 rounded-l-2xl"
          style={{ background: sel ? p.accent : 'transparent' }} />

        <div className="flex items-center gap-2.5 px-2.5 py-2.5 flex-1 min-w-0">
          {/* icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: sel ? `${p.accent}18` : 'rgba(255,255,255,0.07)',
              border: `1px solid ${sel ? p.accent + '30' : C.border}`,
            }}
          >
            {p.icon}
          </div>

          {/* text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12.5px] font-semibold leading-tight truncate"
              style={{ fontFamily: 'Outfit,sans-serif' }}>
              {p.name}
            </p>
            <div className="flex items-center gap-1 mt-[2px]">
              <Stars n={p.rating} />
              <span className="text-white/45 text-[10px]">{p.rating}</span>
            </div>
            <div className="flex items-center gap-1 mt-[2px]">
              <span className="text-[9.5px] font-semibold"
                style={{ color: sel ? p.accent : 'rgba(255,255,255,0.36)' }}>
                {p.cat}
              </span>
              <span className="text-white/25 text-[9px]">·</span>
              <span className="text-white/45 text-[9px] font-mono">{p.dist}</span>
            </div>
          </div>

          {/* compass badge */}
          <div
            className="w-8 h-8 rounded-xl flex flex-col items-center justify-center gap-[2px] flex-shrink-0"
            style={{
              background: sel ? `${p.accent}20` : 'rgba(255,255,255,0.07)',
              border: `1px solid ${sel ? p.accent + '35' : C.border}`,
            }}
          >
            <CompassRose
              deg={p.dirDeg}
              accent={sel ? p.accent : 'rgba(255,255,255,0.45)'}
            />
            <span className="text-[8px] font-bold leading-none"
              style={{ color: sel ? p.accent : 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>
              {p.dir}
            </span>
          </div>
        </div>
      </button>

      {/* dotted stem */}
      <div className="flex flex-col items-center mt-[2px] pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width:      sel ? 2 : 1.5,
              height:     sel ? 5 : 4,
              marginBottom: 3,
              background: sel ? p.accent : 'rgba(255,255,255,0.4)',
              opacity:    1 - i * 0.1,
            }}
          />
        ))}

        {/* ground dot with pulse rings when selected */}
        <div className="relative flex items-center justify-center">
          {sel && (
            <>
              <div className="ring-pulse absolute w-4 h-4 rounded-full"
                style={{ background: p.accent }} />
              <div className="ring-pulse-2 absolute w-4 h-4 rounded-full"
                style={{ background: p.accent }} />
            </>
          )}
          <div
            className="relative w-3 h-3 rounded-full border-2 border-white"
            style={{ background: sel ? p.accent : 'rgba(255,255,255,0.55)', zIndex: 1 }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── detail sheet — always bottom-anchored, never overlaps top UI ── */
function DetailSheet({
  p, onClose,
}: { p: typeof PLACES[0]; onClose: () => void }) {
  return (
    <div
      className="float-up absolute left-3 right-3 z-30 rounded-3xl overflow-hidden"
      style={{
        /* sits just above the bottom nav (nav ≈ 136px tall) */
        bottom: 144,
        background: 'linear-gradient(160deg, rgba(8,20,18,0.96) 0%, rgba(4,10,8,0.97) 100%)',
        border: `1px solid ${p.accent}44`,
        boxShadow: `0 -4px 60px ${p.accent}18, 0 16px 48px rgba(0,0,0,0.7)`,
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
    >
      {/* top glow line */}
      <div className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

      <div className="p-4 pb-4">
        {/* header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${p.accent}15`, border: `1.5px solid ${p.accent}30` }}
            >
              {p.icon}
            </div>
            <div>
              <h2 className="text-white text-[17px] font-bold leading-tight"
                style={{ fontFamily: 'Outfit,sans-serif' }}>
                {p.name}
              </h2>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: p.accent }}>
                {p.cat}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${C.border}` }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* pills row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,179,71,0.12)' }}>
            <Stars n={p.rating} />
            <span className="text-[11px] font-semibold text-white">{p.rating}</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[11px]"
            style={{ background: `${p.accent}14`, color: p.accent }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 9C5 9 2 6.5 2 4.5a3 3 0 016 0C8 6.5 5 9 5 9z"
                stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {p.dist}
          </div>

          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: p.open ? 'rgba(0,212,168,0.12)' : 'rgba(251,113,133,0.12)',
              color:      p.open ? C.teal                 : C.rose,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full live-breathe"
              style={{ background: p.open ? C.teal : C.rose }} />
            {p.open ? 'Open now' : 'Closed'}
          </div>
        </div>

        {/* description */}
        <p className="text-white/50 text-[12px] leading-relaxed mb-3.5">{p.desc}</p>

        {/* CTAs */}
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${p.accent}, ${C.tealDk})` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l1.2 4L13 7l-4.8 2L7 13 5.8 9 1 7l4.8-2z"
                stroke="black" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Navigate
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/65 hover:bg-white/8 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2C7 2 2.5 5 2.5 8a4.5 4.5 0 009 0C11.5 5 7 2 7 2z"
                stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Save
          </button>

          <button
            className="w-11 flex items-center justify-center rounded-xl text-white/45 hover:bg-white/8 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}` }}
          >
            <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
              <circle cx="2"  cy="2" r="1.5" fill="currentColor" />
              <circle cx="8"  cy="2" r="1.5" fill="currentColor" />
              <circle cx="14" cy="2" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── main ─────────────────────────────────────────────────── */
export default function ARView({ onBack }: { onBack?: () => void }) {
  const [filter, setFilter] = useState('All')
  const [selId,  setSelId]  = useState<number | null>(null)

  const visible = PLACES.filter(p => {
    if (filter === 'All')     return true
    if (filter === 'Historic') return p.cat.includes('HISTORIC') || p.cat.includes('ARCHAEOLOGICAL')
    if (filter === 'Food')    return p.cat.includes('RESTAURANT') || p.cat.includes('CAFÉ')
    if (filter === 'Museum')  return p.cat.includes('MUSEUM')
    return false
  })

  const sel = PLACES.find(p => p.id === selId) ?? null

  /* bottom nav height ≈ 136px; detail sheet height ≈ 210px + 8px gap → reserve 354px when open */
  const safeBottom = sel ? 354 : 144

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ fontFamily: 'Inter,sans-serif' }}
    >
      {/* ── background ── */}
      <img
        src="https://images.unsplash.com/photo-1782053491696-08f147c35647?w=900&h=1800&fit=crop&auto=format"
        alt="AR camera view of ancient ruins at sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/80 pointer-events-none" />

      {/* ── top scrim — ensures status bar + filters never vanish behind camera ── */}
      <div
        className="absolute top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: 110,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 70%, transparent 100%)',
        }}
      />

      {/* ── status bar (z:50) ── */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-white text-sm font-semibold tabular-nums">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            {[0,1,2,3].map(i => (
              <rect key={i} x={i * 4} y={12 - 3 * (i + 1)} width="3" height={3 * (i + 1)}
                rx="0.8" fill="white" opacity={0.3 + i * 0.23} />
            ))}
          </svg>
          <span className="text-white text-xs font-semibold ml-0.5">5G</span>
          <div className="flex items-center gap-0.5 ml-1">
            <div className="w-6 h-3 rounded-sm border border-white/50 flex items-center px-0.5">
              <div className="h-1.5 rounded-[1px] flex-1" style={{ background: '#4ADE80' }} />
            </div>
            <div className="w-1 h-2 rounded-r-sm bg-white/50" />
          </div>
        </div>
      </div>

      {/* ── filter bar (z:50, top:60px — clears Dynamic Island / camera notch) ── */}
      <div className="absolute left-0 right-0 z-50 flex items-center gap-2 px-4 overflow-x-auto"
        style={{ top: 60 }}>
        <button
          onClick={onBack}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: C.glass, border: `1px solid ${C.border}`, backdropFilter: 'blur(16px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {FILTERS.map(f => {
          const active = filter === f.label
          return (
            <button
              key={f.label}
              onClick={() => { setFilter(f.label); setSelId(null) }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200"
              style={{
                background:  active ? C.teal  : C.glass,
                color:       active ? '#000'  : 'rgba(255,255,255,0.8)',
                border:      `1px solid ${active ? C.teal : C.border}`,
                boxShadow:   active ? `0 0 20px ${C.teal}45` : 'none',
                backdropFilter: 'blur(16px)',
              }}
            >
              <span>{f.icon}</span>
              {f.label} <span style={{ opacity: 0.65 }}>{f.count}</span>
            </button>
          )
        })}
      </div>

      {/* ── safe AR zone: below filter bar, above bottom UI ── */}
      {/* Cards are positioned as % within THIS wrapper, not the whole screen */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          /* filter bar at top:60, height~44px → ends at ~104px; add 12px breathing room */
          top:    118,
          /* shrinks when detail sheet is open to prevent card/sheet overlap */
          bottom: safeBottom,
          transition: 'bottom 0.3s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 20,
        }}
      >
        {visible.map(p => (
          <div key={p.id} className="pointer-events-auto">
            <ARCard
              p={p}
              sel={selId === p.id}
              onClick={() => setSelId(selId === p.id ? null : p.id)}
            />
          </div>
        ))}
      </div>

      {/* ── detail sheet (z:30, bottom-anchored above nav) ── */}
      {sel && <DetailSheet p={sel} onClose={() => setSelId(null)} />}

      {/* ── bottom nav (z:40) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        {/* location row */}
        <div className="flex items-center justify-between px-4 mb-3">
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            style={{ background: C.glass, border: `1px solid ${C.border}`, backdropFilter: 'blur(16px)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 8.5V18h5v-5h4v5h5V8.5z" stroke="currentColor" strokeWidth="1.5"
                strokeLinejoin="round" fill="none" />
            </svg>
          </button>

          <button
            className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, rgba(0,180,140,0.88), rgba(0,120,92,0.88))',
              border:     `1px solid ${C.teal}55`,
              boxShadow:  `0 4px 24px ${C.teal}38`,
              backdropFilter: 'blur(16px)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="2.2" stroke="white" strokeWidth="1.3" />
              <path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2"
                stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-center leading-none">
              <span className="text-[9px] text-white/65 font-normal">Your Location</span>
              <span className="text-[13px] font-bold">Trincomalee</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="5" r="2.2" stroke="white" strokeWidth="1.3" />
                <path d="M3 12c0-1.93 1.57-3.5 3.5-3.5S10 10.07 10 12"
                  stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          </button>

          <button
            className="w-11 h-11 flex items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            style={{ background: C.glass, border: `1px solid ${C.border}`, backdropFilter: 'blur(16px)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 4l6-2 6 2 6-2v14l-6 2-6-2-6 2V4z" stroke="currentColor" strokeWidth="1.5"
                strokeLinejoin="round" fill="none" />
              <path d="M7 2v14M13 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* search bar */}
        <div
          className="mx-3 mb-5 flex items-center gap-3 px-3.5 py-3 rounded-2xl"
          style={{
            background: 'rgba(5,11,9,0.90)',
            border:     `1px solid ${C.border}`,
            boxShadow:  '0 -2px 40px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* amber compass pill */}
          <div
            className="w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[2px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#F59E0B,#D97706)' }}
          >
            <CompassRose deg={225} accent="white" />
            <span className="text-white text-[8px] font-bold font-mono leading-none">SW</span>
          </div>

          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="flex-shrink-0 text-white/32">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          <span className="flex-1 text-white/28 text-[13px]">Search place…</span>

          <div className="w-px h-5 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <button
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
              className="text-white/40">
              <path d="M7.5 1.5a3 3 0 013 3v3.5a3 3 0 01-6 0V4.5a3 3 0 013-3z"
                stroke="currentColor" strokeWidth="1.3" />
              <path d="M2.5 7.5a5 5 0 0010 0"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M7.5 12.5v2"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
