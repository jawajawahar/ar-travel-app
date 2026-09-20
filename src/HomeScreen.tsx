import { useState } from 'react'

/* ── tokens ── */
const T = {
  forest:  '#0B4F3E',
  teal:    '#0E7A5F',
  tealMid: '#12A07A',
  tealLt:  '#E6F4F0',
  amber:   '#F59E0B',
  amberLt: '#FEF3C7',
  ink:     '#0D1B17',
  slate:   '#6B7B74',
  mist:    '#F2F5F4',
  white:   '#FFFFFF',
  border:  '#E4ECEA',
}

/* ── icon library — all SVG, 1.5px stroke, 20×20 viewBox ── */
const Icon = {
  compass: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8"/>
      <path d="M13.09 6.91 11.41 11.41 6.91 13.09l1.68-4.5 4.5-1.68z"/>
    </svg>
  ),
  locate: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z"/>
      <circle cx="10" cy="8" r="2"/>
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 9A5 5 0 005 9v3l-1.5 2.5h13L15 12V9z"/>
      <path d="M10 18a2 2 0 01-2-2h4a2 2 0 01-2 2z"/>
    </svg>
  ),
  camera: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="12" rx="2.5"/>
      <circle cx="10" cy="11" r="3"/>
      <path d="M6.5 5l1.5-2h4l1.5 2"/>
    </svg>
  ),
  arView: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="12" rx="2.5"/>
      <circle cx="10" cy="11" r="2.5"/>
      <path d="M2 8h2M16 8h2M10 5V3"/>
      <path d="M4 4l1.5 1.5M14.5 5.5 16 4"/>
    </svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L10 3l7 6.5"/>
      <path d="M5 8v8h4v-4h2v4h4V8"/>
    </svg>
  ),
  map: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5l6-2 6 2 6-2v12l-6 2-6-2-6 2V5z"/>
      <path d="M7 3v12M13 5v12"/>
    </svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="10" r="8"/>
      <path d="M10 2c-2.5 2.5-4 5-4 8s1.5 5.5 4 8"/>
      <path d="M10 2c2.5 2.5 4 5 4 8s-1.5 5.5-4 8"/>
      <path d="M2 10h16"/>
      <path d="M3 6h14M3 14h14"/>
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="7" r="3.5"/>
      <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7"/>
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="9" cy="9" r="6"/>
      <path d="M15 15l3 3"/>
    </svg>
  ),
  star: (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1l1.24 2.51 2.76.4-2 1.95.47 2.75L6 7.26l-2.47 1.3.47-2.75-2-1.95 2.76-.4z"/>
    </svg>
  ),
  arrowRight: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  ),
  share: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="3" r="1.5"/><circle cx="3" cy="8" r="1.5"/><circle cx="13" cy="13" r="1.5"/>
      <path d="M4.5 7.2l7-3.5M4.5 8.8l7 3.5"/>
    </svg>
  ),
  heart: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 14S2 9.5 2 5.5a4 4 0 018 0 4 4 0 018 0C18 9.5 8 14 8 14z" transform="scale(0.8) translate(2,1)"/>
    </svg>
  ),
  chat: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M14 10a2 2 0 01-2 2H5l-3 3V4a2 2 0 012-2h8a2 2 0 012 2v6z"/>
    </svg>
  ),
  chevronDown: (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 5l4 4 4-4"/>
    </svg>
  ),
  chevronRight: (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 3l4 4-4 4"/>
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83"/>
    </svg>
  ),
  list: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 4h8M6 8h8M6 12h8M2 4h.01M2 8h.01M2 12h.01"/>
    </svg>
  ),
}

/* ── data ── */
const NEARBY = [
  { name: 'AJEEDH Hote @ tea',    rating: 5.0, dist: '2.6km', dir: 'W'  },
  { name: 'M S NISKA Grocery',    rating: 3.3, dist: '2.7km', dir: 'NW' },
  { name: 'K.F.F Multi Shop',     rating: 4.0, dist: '2.7km', dir: 'NW' },
  { name: 'Neduntheevu Kinniya',  rating: 2.3, dist: '3.0km', dir: 'NE' },
  { name: 'Farook Hotel',         rating: 3.0, dist: '3.1km', dir: 'NE' },
  { name: 'Soorangal BBQ Shop',   rating: 3.2, dist: '3.3km', dir: 'N'  },
  { name: 'Restaurant Mansoorah', rating: 4.2, dist: '3.3km', dir: 'N'  },
]

const STORIES = [
  {
    id: 1, tag: 'Hidden Gem', tagColor: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1603477849227-705c424d1d80?w=400&h=260&fit=crop&auto=format',
    user: 'Ravi Kumar', avatar: 'R', avatarBg: '#0E7A5F',
    time: '1 month ago', place: 'Nilaveli Beach',
    text: 'A stretch of powdery white sand rarely touched by tourists. Get there before sunrise.',
    likes: 14, comments: 3,
  },
  {
    id: 2, tag: 'Must Visit', tagColor: '#DC2626',
    img: 'https://images.unsplash.com/photo-1708346561250-ea0f8b54bc1c?w=400&h=260&fit=crop&auto=format',
    user: 'Siveswaran S.', avatar: 'S', avatarBg: '#1D4ED8',
    time: '3 months ago', place: 'Thirukoneswaram Kovil',
    text: 'Historically a massive complex known as the Aayiram Kaal Mandapam. The views from the cliff are breathtaking.',
    likes: 28, comments: 7,
  },
  {
    id: 3, tag: 'Hidden Gem', tagColor: '#7C3AED',
    img: 'https://images.unsplash.com/photo-1535262412227-85541e910204?w=400&h=260&fit=crop&auto=format',
    user: 'Amara Silva', avatar: 'A', avatarBg: '#B45309',
    time: '2 weeks ago', place: 'Marble Beach',
    text: 'Crystal-clear water over pristine pebbles. Bring snorkelling gear — the reef life is incredible.',
    likes: 9, comments: 2,
  },
]

/* ── bottom tab bar ── */
function TabBar({ onARPress }: { onARPress: () => void }) {
  const [active, setActive] = useState(0)

  const tabs = [
    { icon: Icon.home,    label: 'Home'    },
    { icon: Icon.arView,  label: 'AR',     onPress: onARPress },
    { icon: Icon.globe,   label: 'Explore' },
    { icon: Icon.map,     label: 'Maps'    },
    { icon: Icon.user,    label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2"
      style={{ background: 'linear-gradient(to top, rgba(242,245,244,1) 70%, transparent)' }}>
      <div className="flex items-center justify-around bg-white rounded-2xl px-1.5 py-1.5"
        style={{ boxShadow: '0 2px 24px rgba(11,79,62,0.10), 0 0 0 1px rgba(228,236,234,0.8)' }}>
        {tabs.map((t, i) => {
          const isActive = active === i
          return (
            <button
              key={i}
              onClick={() => { setActive(i); t.onPress?.() }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? T.forest : 'transparent',
                color:      isActive ? T.white  : T.slate,
              }}
            >
              {t.icon}
              {isActive && (
                <span className="text-[12px] font-semibold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
                  {t.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── main component ── */
export default function HomeScreen({ onOpenAR }: { onOpenAR: () => void }) {
  const [nearbyTab, setNearbyTab] = useState<'food' | 'poi'>('food')

  return (
    <div className="relative w-full h-full" style={{ background: T.mist, fontFamily: 'Inter,sans-serif' }}>
      <div className="h-full overflow-y-auto pb-32" style={{ scrollbarWidth: 'none' }}>

        {/* ── status bar ── */}
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="text-sm font-semibold tabular-nums" style={{ color: T.ink }}>9:41</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-px h-3">
              {[4,6,8,11].map((h,i) => (
                <div key={i} className="w-[3px] rounded-sm"
                  style={{ height: h, background: i < 3 ? T.ink : '#CBD5E1' }} />
              ))}
            </div>
            <span className="text-xs font-semibold" style={{ color: T.ink }}>5G</span>
            <div className="flex items-center gap-0.5">
              <div className="h-3 w-5 rounded-[3px] border flex items-center p-[2px]"
                style={{ borderColor: T.slate }}>
                <div className="flex-1 h-full rounded-[1px]" style={{ background: '#22C55E' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── top nav ── */}
        <div className="flex items-center justify-between px-4 mt-4">
          {/* location chip */}
          <div className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-2xl bg-white"
            style={{ boxShadow: `0 1px 8px rgba(11,79,62,0.10)`, border: `1px solid ${T.border}` }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: T.forest }}>
              <div style={{ color: 'white' }}>{Icon.locate}</div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: T.tealMid }}>
                Exploring
              </p>
              <p className="text-[13px] font-bold leading-none mt-0.5" style={{ color: T.ink }}>
                Kinniya
              </p>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
              style={{ border: `1px solid ${T.border}`, color: T.slate, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {Icon.search}
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
              style={{ border: `1px solid ${T.border}`, color: T.slate, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {Icon.bell}
            </button>
            {/* avatar */}
            <button className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{ background: T.teal, boxShadow: `0 2px 8px ${T.teal}55` }}>
              M
            </button>
          </div>
        </div>

        {/* ── greeting ── */}
        <div className="px-5 mt-6">
          <p className="text-sm" style={{ color: T.slate }}>Good morning, Mohammed 👋</p>
          <h1 className="text-[26px] font-extrabold leading-[1.15] mt-1" style={{ color: T.ink, fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
            Where shall we<br />discover today?
          </h1>
        </div>

        {/* ── AR card ── */}
        <div className="mx-4 mt-5 rounded-3xl overflow-hidden"
          style={{ background: T.ink, boxShadow: '0 8px 32px rgba(11,79,62,0.25)' }}>

          {/* visualization area */}
          <div className="relative h-44 overflow-hidden px-5 pt-5">
            {/* glow */}
            <div className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse 60% 55% at 48% 60%, ${T.tealMid}28 0%, transparent 70%)` }} />

            {/* grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 340 176" preserveAspectRatio="none">
              {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="white" strokeWidth="1"/>)}
              {[60,120,180,240,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="176" stroke="white" strokeWidth="1"/>)}
            </svg>

            {/* radar rings */}
            <div className="absolute" style={{ left: '45%', top: '55%', transform: 'translate(-50%,-50%)' }}>
              {[88, 60, 34].map((s, i) => (
                <div key={i} className="absolute rounded-full border border-white/10"
                  style={{ width: s, height: s, left: -s/2, top: -s/2, borderColor: i === 0 ? `${T.tealMid}30` : i === 1 ? `${T.tealMid}22` : `${T.tealMid}35` }} />
              ))}
              <div className="absolute w-2.5 h-2.5 rounded-full"
                style={{ background: T.tealMid, left: -5, top: -5, boxShadow: `0 0 12px ${T.tealMid}` }} />
            </div>

            {/* place chips */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}>
              <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: T.tealMid }}>
                <div className="text-white" style={{ transform: 'scale(0.65)' }}>{Icon.locate}</div>
              </div>
              <div>
                <p className="text-white text-[11px] font-semibold leading-none">Café Mocha</p>
                <p className="text-white/50 text-[9px] mt-0.5">85 m · <span style={{ color: T.amber }}>★ 4.6</span></p>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}>
              <div className="w-5 h-5 rounded-lg flex items-center justify-center bg-red-500">
                <div className="text-white" style={{ transform: 'scale(0.65)' }}>{Icon.locate}</div>
              </div>
              <div>
                <p className="text-white text-[11px] font-semibold leading-none">City Museum</p>
                <p className="text-white/50 text-[9px] mt-0.5">320 m · <span style={{ color: T.amber }}>★ 4.9</span></p>
              </div>
            </div>

            {/* floating dot markers */}
            {[
              { x: '42%', y: '52%', c: T.amber },
              { x: '56%', y: '38%', c: '#A78BFA' },
              { x: '34%', y: '68%', c: '#F87171' },
              { x: '62%', y: '60%', c: T.tealMid },
            ].map((d, i) => (
              <div key={i} className="absolute w-3 h-3 rounded-full border-2 border-white"
                style={{ left: d.x, top: d.y, background: d.c, transform: 'translate(-50%,-50%)', boxShadow: `0 0 10px ${d.c}88` }} />
            ))}
          </div>

          {/* bottom strip */}
          <div className="flex items-center justify-between px-4 pb-4 pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <div className="flex items-center gap-2">
                <div style={{ color: T.tealMid }}>{Icon.arView}</div>
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: T.tealMid }}>
                  AR View
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-white/40 text-[11px] mt-0.5">Point camera to discover places</p>
            </div>
            <button
              onClick={onOpenAR}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: T.white, color: T.ink }}>
              {Icon.camera}
              Open AR
            </button>
          </div>
        </div>

        {/* ── Odyssey card ── */}
        <div className="mx-4 mt-4 rounded-3xl p-5"
          style={{ background: `linear-gradient(135deg, ${T.forest} 0%, ${T.teal} 100%)`, boxShadow: `0 8px 24px ${T.forest}40` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div style={{ color: 'white' }}>{Icon.sparkle}</div>
              </div>
              <div>
                <p className="text-white/55 text-[9px] font-bold tracking-[0.14em] uppercase">Build an Odyssey</p>
                <p className="text-white font-bold text-[15px] leading-snug mt-0.5"
                  style={{ fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
                  Chart your journey with AI
                </p>
              </div>
            </div>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>
              {Icon.arrowRight}
            </button>
          </div>

          {/* progress track */}
          <div className="flex items-center gap-1 mt-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="flex-1 rounded-full"
                style={{ height: i < 5 ? 3 : 2, background: i < 5 ? 'white' : 'rgba(255,255,255,0.22)' }} />
            ))}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-[13px]"
            style={{ background: 'rgba(255,255,255,0.14)', color: 'white', border: '1px solid rgba(255,255,255,0.18)' }}>
            {Icon.list}
            View My Odysseys
          </button>
        </div>

        {/* ── Travel Stories ── */}
        <div className="mt-7">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="text-[18px] font-bold" style={{ color: T.ink, fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              Travel Stories
            </h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-[12px] font-medium"
                style={{ color: T.slate, border: `1px solid ${T.border}` }}>
                {Icon.globe}
                Global
                {Icon.chevronDown}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white"
                style={{ background: T.forest }}>
                {Icon.share}
                Share
              </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-1" style={{ scrollbarWidth: 'none' }}>
            {STORIES.map(s => (
              <div key={s.id} className="flex-shrink-0 w-56 bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: `1px solid ${T.border}` }}>
                <div className="relative h-36">
                  <img src={s.img} alt={s.place} className="w-full h-full object-cover bg-gray-200" />
                  {/* tag */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
                    <svg width="9" height="9" viewBox="0 0 10 10" fill={s.tagColor}>
                      <path d="M5 .5L6.18 3.6l3.32.27-2.5 2.16.77 3.17L5 7.27l-2.77 1.93.77-3.17L.5 3.87l3.32-.27z"/>
                    </svg>
                    <span className="text-[9px] font-bold" style={{ color: s.tagColor }}>{s.tag}</span>
                  </div>
                </div>
                <div className="p-3">
                  {/* user row */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                      style={{ background: s.avatarBg }}>
                      {s.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold truncate" style={{ color: T.ink }}>{s.user}</p>
                      <p className="text-[9px]" style={{ color: T.slate }}>{s.time}</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold mb-1" style={{ color: T.teal }}>{s.place}</p>
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: T.slate }}>{s.text}</p>
                  <div className="flex items-center gap-3 mt-2.5 pt-2.5"
                    style={{ borderTop: `1px solid ${T.border}` }}>
                    <button className="flex items-center gap-1 text-[11px]" style={{ color: T.slate }}>
                      {Icon.heart} {s.likes}
                    </button>
                    <button className="flex items-center gap-1 text-[11px]" style={{ color: T.slate }}>
                      {Icon.chat} {s.comments}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Around You ── */}
        <div className="mt-7 px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold" style={{ color: T.ink, fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              Around You
            </h2>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-[12px] font-medium"
              style={{ color: T.teal, border: `1px solid ${T.border}` }}>
              More {Icon.chevronRight}
            </button>
          </div>

          {/* category tabs */}
          <div className="flex gap-2 mb-4">
            {(['food', 'poi'] as const).map(tab => (
              <button key={tab} onClick={() => setNearbyTab(tab)}
                className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
                style={{
                  background: nearbyTab === tab ? T.forest : T.white,
                  color:      nearbyTab === tab ? T.white  : T.slate,
                  border:     `1px solid ${nearbyTab === tab ? T.forest : T.border}`,
                }}>
                {tab === 'food' ? '🍴 Food & Drink' : '🏛️ Points of Interest'}
              </button>
            ))}
          </div>

          {/* list */}
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${T.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            {NEARBY.map((p, i) => (
              <div key={i}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-gray-50"
                style={{ borderBottom: i < NEARBY.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                {/* rank */}
                <span className="text-[11px] font-bold w-4 flex-shrink-0 text-center"
                  style={{ color: T.slate }}>
                  {i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: T.ink }}>{p.name}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* rating */}
                  <div className="flex items-center gap-0.5" style={{ color: T.amber }}>
                    {Icon.star}
                    <span className="text-[11px] font-semibold" style={{ color: T.ink }}>{p.rating.toFixed(1)}</span>
                  </div>
                  {/* distance */}
                  <span className="text-[11px] font-semibold" style={{ color: T.teal }}>{p.dist}</span>
                  {/* dir badge */}
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded-lg"
                    style={{ background: T.tealLt }}>
                    <span className="text-[10px] font-bold" style={{ color: T.teal }}>{p.dir}</span>
                    {Icon.chevronRight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Museums banner ── */}
        <div className="mx-4 mt-5 rounded-3xl overflow-hidden h-28 relative">
          <img
            src="https://images.unsplash.com/photo-1535262412227-85541e910204?w=800&h=220&fit=crop&auto=format"
            alt="Top museums of the world"
            className="absolute inset-0 w-full h-full object-cover bg-gray-800"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(11,79,62,0.85) 0%, rgba(11,79,62,0.35) 100%)' }} />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <p className="text-white/60 text-[9px] font-bold tracking-[0.16em] uppercase">Featured Collection</p>
            <p className="text-white font-bold text-[15px] leading-snug mt-0.5"
              style={{ fontFamily: 'Plus Jakarta Sans,sans-serif' }}>
              Top Museums of the World
            </p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>
            {Icon.arrowRight}
          </div>
        </div>

      </div>

      {/* ── bottom tab bar ── */}
      <TabBar onARPress={onOpenAR} />
    </div>
  )
}
