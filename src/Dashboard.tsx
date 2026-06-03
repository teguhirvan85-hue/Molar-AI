import {
  Search,
  LayoutDashboard,
  CalendarCheck2,
  Users2,
  Sparkles,
  FileText,
  Inbox as InboxIcon,
  Settings,
  Plug,
  ChevronDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  Send,
  Phone,
  MessageSquareText,
  ClipboardEdit,
  CalendarClock,
  Stethoscope,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Mic,
  Paperclip,
  Sparkle,
  DollarSign,
  ShieldCheck,
  Hourglass,
  Smile,
  Wrench,
  Scissors,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

/* Tiny sparkline (SVG path generator) */
function Sparkline({
  data,
  color,
  width = 64,
  height = 22,
  filled = true,
}: {
  data: number[]
  color: string
  width?: number
  height?: number
  filled?: boolean
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * (height - 2) - 1
    return [x, y] as [number, number]
  })
  const line = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(' ')
  const area = `${line} L ${width} ${height} L 0 ${height} Z`
  return (
    <svg width={width} height={height} className="block">
      {filled && (
        <>
          <defs>
            <linearGradient id={`spk-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#spk-${color.replace('#', '')})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="2" fill={color} />
    </svg>
  )
}

/* ---------- Narrow icon rail ---------- */
function IconRail() {
  const items = [
    { icon: <Stethoscope size={16} className="text-fuchsia-600" /> },
    { icon: <Sparkles size={16} className="text-violet-600" /> },
    { icon: <UserPlus size={16} className="text-blue-600" /> },
    { icon: <FileText size={16} className="text-emerald-600" /> },
  ]
  return (
    <div className="absolute left-0 top-0 h-[900px] w-[58px] bg-[#fafafa] border-r border-[#ebebeb] flex flex-col items-center justify-between pt-3 pb-5">
      <div className="flex flex-col items-center gap-4">
        <div className="w-[34.6px] h-2 flex items-center justify-center gap-[2px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#d4d4d4]"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-[#d4d4d4]"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-[#d4d4d4]"></span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-9 h-9 bg-white border border-[#efefef] rounded-lg shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)] flex items-center justify-center">
            <div className="w-[22px] h-[22px] rounded-md bg-gradient-to-br from-[#6060d8] to-[#8e51ff] text-white flex items-center justify-center font-jakarta font-bold text-[12px]">
              M
            </div>
          </div>
          {items.map((it, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-lg bg-[#f0f0f0] flex items-center justify-center hover:bg-[#e6e6e6]"
            >
              {it.icon}
            </button>
          ))}
          <button className="w-9 h-9 rounded-lg bg-[#f0f0f0] flex items-center justify-center">
            <Plus size={16} className="text-[#737373]" />
          </button>
        </div>
      </div>
      <div className="w-[35px] h-[35px] rounded-[6.4px] bg-[#02474f] overflow-hidden">
        <img src="/assets/avatar.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

/* ---------- Wide sidebar ---------- */
type NavItem = {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
}

function NavRow({ it }: { it: NavItem }) {
  return (
    <div
      className={
        'flex items-center gap-2 h-[36px] rounded-lg pl-3 py-1.5 ' +
        (it.active
          ? 'bg-white border border-[#efefef] px-3 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]'
          : '')
      }
    >
      <span className="w-5 h-5 flex items-center justify-center text-[#111]">
        {it.icon}
      </span>
      <p className="flex-1 text-[14px] font-medium text-[#111]">{it.label}</p>
      {it.badge !== undefined && (
        <span className="bg-[#f4f4f4] border border-[#e6e6e6] rounded-md min-w-[22px] h-[20px] px-1.5 flex items-center justify-center text-[11px] font-semibold text-[#444]">
          {it.badge}
        </span>
      )}
    </div>
  )
}

function MenuSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="border-b border-[#ebebeb] pb-3 w-full flex flex-col gap-2">
      <p className="text-[11px] tracking-[0.4px] uppercase font-medium text-[#737373]">
        {title}
      </p>
      <div className="flex flex-col w-full">
        {items.map((it, i) => (
          <NavRow key={i} it={it} />
        ))}
      </div>
    </div>
  )
}

function WideSidebar() {
  return (
    <div className="absolute left-[58px] top-0 h-[900px] w-[248px] bg-[#fafafa] border-r border-[#ebebeb] p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-4 w-[216px]">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-1.5 pb-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#6060d8] to-[#8e51ff] flex items-center justify-center shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
              <span className="text-white font-jakarta font-bold text-[14px]">M</span>
            </div>
            <span className="text-[14px] font-jakarta font-semibold text-[#111] tracking-tight">
              Molar AI
            </span>
          </div>
          <div className="relative bg-[#f4f4f4] border border-[#e6e6e6] rounded-[10px] h-[40px] flex items-center gap-2 pl-2 pr-1.5 shadow-[inset_1px_2px_5px_0_rgba(0,0,0,0.05)]">
            <div className="w-[24px] h-[24px] rounded-md bg-white border border-[#e6e6e6] flex items-center justify-center">
              <Stethoscope size={12} className="text-[#6060d8]" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <p className="text-[10px] text-[#8a8a8a] leading-none">Clinic</p>
              <p className="text-[12px] font-semibold text-[#111] leading-tight truncate">
                Beverly Hills Dental
              </p>
            </div>
            <ChevronDown size={12} className="text-[#737373]" />
          </div>
          <div className="relative bg-white border border-[#e6e6e6] rounded-[10px] h-[36px] flex items-center gap-1.5 pl-3 pr-1.5">
            <Search size={13} className="text-[#8a8a8a]" />
            <p className="flex-1 text-[#8a8a8a] text-[13px]">Search</p>
            <span className="bg-white border border-[#e6e6e6] rounded-md w-[24px] h-[22px] flex items-center justify-center text-[11px] font-jakarta font-medium text-[#333]">
              /
            </span>
          </div>
        </div>

        <MenuSection
          title="WORKSPACE"
          items={[
            { icon: <LayoutDashboard size={16} />, label: 'Dashboard', active: true },
            { icon: <CalendarCheck2 size={16} />, label: 'Appointments', badge: 12 },
            { icon: <Users2 size={16} />, label: 'Patients' },
            { icon: <Sparkles size={16} />, label: 'AI Agent' },
            { icon: <FileText size={16} />, label: 'Claims', badge: 3 },
            { icon: <InboxIcon size={16} />, label: 'Inbox' },
          ]}
        />

        <MenuSection
          title="MANAGE"
          items={[
            { icon: <Settings size={16} />, label: 'Settings' },
            { icon: <Plug size={16} />, label: 'Integrations' },
          ]}
        />
      </div>

      {/* User card */}
      <div className="relative bg-white border border-[#efefef] rounded-xl w-[216px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 0%, rgba(197,171,233,0.55), transparent 60%), linear-gradient(180deg, #f5efff 0%, #ffffff 60%)',
          }}
        />
        <div className="relative pt-3 px-3 pb-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#e6e6e6] shrink-0">
              <img src="/assets/avatar.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#171717] truncate">
                Dr. Bennett
              </p>
              <p className="text-[11px] text-[#171717b3] tracking-[-0.12px]">
                Practice Owner
              </p>
            </div>
            <ChevronDown size={12} className="text-[#737373]" />
          </div>
          <div className="bg-gradient-to-b from-[#444] to-[#262630] border border-[#262630] rounded-md py-[8px] flex items-center justify-center gap-2 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
            <Sparkles size={12} className="text-white" />
            <span className="text-white text-[13px] font-medium tracking-[-0.28px]">
              Ask Molar
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Header ---------- */
function Header() {
  return (
    <div className="absolute left-[306px] top-0 w-[1134px] h-[76px] border-b border-[#ebebeb] flex items-center justify-between px-5 py-3.5">
      <div className="flex flex-col">
        <p className="text-[10px] font-semibold text-[#6060d8] tracking-[0.6px] flex items-center gap-1">
          <Sparkle size={10} className="text-[#6060d8]" />
          MONDAY · MAY 21, 2026
        </p>
        <p className="text-[18px] font-semibold text-[#111] leading-[1.3]">
          Good morning, Dr. Bennett
        </p>
        <p className="text-[12px] text-[#777] leading-[1.4]">
          <span className="font-normal">Molar has handled </span>
          <span className="font-semibold text-[#6060d8]">47 tasks</span>
          <span className="font-normal"> this morning. Here's today at a glance.</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-white border border-[#efefef] rounded-lg pl-3 pr-3 py-2 flex items-center gap-2 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
          <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          <p className="text-[#444] text-[13px] font-medium">
            All systems normal
          </p>
        </div>
        <button className="bg-gradient-to-b from-[#444] to-[#262630] border border-[#262630] rounded-md h-9 pl-2.5 pr-3 flex items-center gap-2 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
          <span className="relative">
            <AlertTriangle size={14} className="text-white" />
            <span className="absolute -top-0.5 -right-1 w-[8px] h-[8px] rounded-full bg-[#fbbf24] ring-2 ring-[#262630]"></span>
          </span>
          <span className="text-white text-[13px] font-semibold">3 claims to review</span>
        </button>
      </div>
    </div>
  )
}

/* ---------- 1. AI AGENT HERO (full-width banner) ---------- */
function AudioBars() {
  // Live audio-wave indicator next to orb
  const bars = [10, 18, 14, 22, 9, 16, 12]
  return (
    <div className="flex items-center gap-[3px] h-[24px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-gradient-to-b from-[#c8abff] to-[#8e51ff] animate-pulse"
          style={{
            height: `${h}px`,
            animationDelay: `${i * 120}ms`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  )
}

function AIAgentHero() {
  const heroStats = [
    {
      v: '47',
      d: '+12',
      l: 'tasks today',
      icon: <Activity size={11} className="text-[#c8abff]" />,
      spark: [22, 28, 24, 31, 29, 35, 33, 40, 38, 45, 47],
      sparkColor: '#c8abff',
    },
    {
      v: '8.4h',
      d: '+1.2h',
      l: 'staff time saved',
      icon: <Hourglass size={11} className="text-[#c8abff]" />,
      spark: [4, 5, 4.5, 5.6, 6, 6.4, 7, 7.2, 7.8, 8.1, 8.4],
      sparkColor: '#c8abff',
    },
    {
      v: '98%',
      d: '+3 pts',
      l: 'patients confirmed',
      icon: <CheckCircle2 size={11} className="text-[#c8abff]" />,
      spark: [88, 90, 91, 89, 92, 94, 95, 93, 96, 97, 98],
      sparkColor: '#c8abff',
    },
  ]
  return (
    <div
      className="relative w-full rounded-2xl border border-[#efefef] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]"
      style={{
        background:
          'linear-gradient(135deg, #15122a 0%, #2a1f55 50%, #3b1f6e 100%)',
      }}
    >
      {/* decorative orbs */}
      <div
        className="absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(200,171,255,0.5), transparent 60%)',
        }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-[280px] h-[280px] rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(96,96,216,0.7), transparent 60%)',
        }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative flex items-center justify-between px-5 py-4 gap-5">
        {/* Left: orb + tasks */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* orb with rings */}
          <div className="relative shrink-0">
            <div
              className="absolute -inset-4 rounded-full animate-ping opacity-30"
              style={{ background: 'rgba(200,171,255,0.35)' }}
            />
            <div
              className="absolute -inset-1 rounded-full opacity-60 blur-[2px]"
              style={{
                background:
                  'conic-gradient(from 0deg, #c8abff 0%, transparent 50%, #6060d8 100%)',
              }}
            />
            <div className="relative w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#c8abff] via-[#8e51ff] to-[#6060d8] flex items-center justify-center shadow-[0_0_28px_rgba(142,81,255,0.7)] border border-white/30">
              <Sparkles size={24} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur border border-white/15 rounded-full px-2 py-0.5">
                <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-[10px] font-semibold text-white tracking-[0.4px]">
                  AI AGENT · LIVE
                </span>
              </span>
              <AudioBars />
            </div>
            <p className="text-[18px] font-semibold text-white leading-tight">
              Molar is handling{' '}
              <span className="text-[#c8abff]">4 tasks</span> right now
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] text-white/85 bg-white/[0.07] rounded-full px-2 py-[3px] border border-white/10">
                <Phone size={10} className="text-emerald-300" />
                Calling 2 patients
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-white/85 bg-white/[0.07] rounded-full px-2 py-[3px] border border-white/10">
                <ClipboardEdit size={10} className="text-[#c8abff]" />
                Drafting 1 claim
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-white/85 bg-white/[0.07] rounded-full px-2 py-[3px] border border-white/10">
                <MessageSquareText size={10} className="text-pink-300" />
                Post-op follow-up · 1
              </span>
            </div>
          </div>
        </div>

        {/* Right: 3 stat cards with spark */}
        <div className="flex items-stretch gap-2 shrink-0">
          {heroStats.map((s, i) => (
            <div
              key={i}
              className="w-[112px] bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-2.5 flex flex-col justify-between gap-1 relative overflow-hidden"
            >
              <div className="flex items-center gap-1">
                {s.icon}
                <span className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">
                  {s.l}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-[22px] font-semibold text-white leading-none">
                  {s.v}
                </p>
                <div className="-mb-0.5">
                  <Sparkline data={s.spark} color={s.sparkColor} width={48} height={18} />
                </div>
              </div>
              <div className="inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-emerald-300">
                <ArrowUpRight size={10} />
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- 2. KPI tiles (4) ---------- */
function KpiTile({
  icon,
  iconColor,
  iconBg,
  label,
  value,
  delta,
  deltaDir,
  deltaColor,
  sub,
  spark,
  sparkColor,
}: {
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  label: string
  value: string
  delta: string
  deltaDir: 'up' | 'down' | 'flat'
  deltaColor: string
  sub: string
  spark: number[]
  sparkColor: string
}) {
  const Arrow =
    deltaDir === 'up' ? ArrowUpRight : deltaDir === 'down' ? ArrowDownRight : Activity
  return (
    <div className="flex-1 bg-white border border-[#efefef] rounded-2xl px-3 pt-3 pb-2 flex flex-col gap-2 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)] overflow-hidden min-w-0 relative group hover:border-[#e6e6e6] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-[30px] h-[30px] rounded-[10px] border-[0.74px] border-white flex items-center justify-center shadow-[0_2px_1.48px_rgba(0,0,0,0.06)] shrink-0"
            style={{ background: iconBg }}
          >
            <span style={{ color: iconColor }}>{icon}</span>
          </div>
          <p className="text-[11px] text-[#6b7280] tracking-[-0.2px] truncate">
            {label}
          </p>
        </div>
        <div
          className="inline-flex items-center gap-0.5 rounded-md px-1.5 h-[20px]"
          style={{ background: deltaColor + '14', color: deltaColor }}
        >
          <Arrow size={10} strokeWidth={2.5} />
          <span className="text-[10px] font-semibold">{delta}</span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-[24px] font-semibold text-[#111] leading-none tracking-tight">
          {value}
        </p>
        <div className="mb-0.5">
          <Sparkline data={spark} color={sparkColor} width={64} height={22} />
        </div>
      </div>
      <p className="text-[10.5px] text-[#6b7280] leading-tight truncate border-t border-[#f3f4f6] pt-1.5 -mx-3 px-3">
        {sub}
      </p>
    </div>
  )
}

/* ---------- 3. Today's Schedule (compact list) ---------- */
type ApptStatus = 'Confirmed' | 'Pending' | 'AI reminder sent' | 'AI calling now'
type Appt = {
  time: string
  duration: string
  patient: string
  procedure: string
  insurance: string
  status: ApptStatus
  catColor: string
}

const APPTS: Appt[] = [
  {
    time: '09:30',
    duration: '30 min',
    patient: 'James Carter',
    procedure: 'Scaling & polishing',
    insurance: 'Delta Dental',
    status: 'Confirmed',
    catColor: '#10b981',
  },
  {
    time: '10:00',
    duration: '45 min',
    patient: 'Emma Rodriguez',
    procedure: 'Invisalign consultation',
    insurance: 'First visit',
    status: 'AI reminder sent',
    catColor: '#6060d8',
  },
  {
    time: '10:45',
    duration: '60 min',
    patient: 'Michael Chen',
    procedure: 'Crown placement #16',
    insurance: 'Cigna',
    status: 'Confirmed',
    catColor: '#cf029f',
  },
  {
    time: '11:45',
    duration: '30 min',
    patient: 'Olivia Park',
    procedure: 'Wisdom tooth follow-up',
    insurance: 'Post-op day 7',
    status: 'Pending',
    catColor: '#ea580c',
  },
  {
    time: '13:00',
    duration: '90 min',
    patient: 'Mr. Harrison',
    procedure: 'Implant #36 — session 2',
    insurance: 'Self-pay',
    status: 'Confirmed',
    catColor: '#ea580c',
  },
  {
    time: '15:00',
    duration: '45 min',
    patient: 'Sophia Martinez',
    procedure: 'Composite filling #21 #22',
    insurance: 'Aetna',
    status: 'AI calling now',
    catColor: '#cf029f',
  },
]

function StatusPill({ status }: { status: ApptStatus }) {
  const styles: Record<ApptStatus, { bg: string; color: string; dot: string }> = {
    Confirmed: { bg: '#ecfdf5', color: '#047857', dot: '#10b981' },
    Pending: { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
    'AI reminder sent': { bg: '#eef2ff', color: '#4338ca', dot: '#6060d8' },
    'AI calling now': { bg: '#fdf4ff', color: '#a21caf', dot: '#c026d3' },
  }
  const s = styles[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-[3px] text-[10px] font-semibold whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-[6px] h-[6px] rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  )
}

function SchedulePanel() {
  return (
    <div className="bg-white border border-[#efefef] rounded-2xl p-4 h-full overflow-hidden flex flex-col gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[16px] font-medium text-[#111]">Today's schedule</p>
          <p className="text-[12px] text-[#6b7280]">12 of 24 appointments completed</p>
        </div>
        <div className="flex gap-1">
          <button className="w-[26px] h-[26px] rounded-md bg-white border border-[#e6e6e6] flex items-center justify-center">
            <ChevronLeft size={12} className="text-[#333]" />
          </button>
          <button className="w-[26px] h-[26px] rounded-md bg-white border border-[#e6e6e6] flex items-center justify-center">
            <ChevronRight size={12} className="text-[#333]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#fafafa] rounded-xl p-1 flex gap-1">
        {[
          { l: 'Today', n: 24, a: true },
          { l: 'Tomorrow', n: 18, a: false },
          { l: 'This week', n: 142, a: false },
        ].map((t) => (
          <button
            key={t.l}
            className={
              'flex-1 rounded-lg px-2 py-1.5 text-[12px] font-medium flex items-center justify-center gap-1.5 ' +
              (t.a
                ? 'bg-white text-[#111] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]'
                : 'text-[#6b7280]')
            }
          >
            {t.l}
            <span
              className={
                'rounded-full px-1.5 text-[10px] font-semibold ' +
                (t.a ? 'bg-[#eef2ff] text-[#6060d8]' : 'bg-white text-[#6b7280]')
              }
            >
              {t.n}
            </span>
          </button>
        ))}
      </div>

      {/* Appointments list */}
      <div className="flex flex-col gap-2.5 w-full overflow-y-auto pr-1 -mr-1 flex-1">
        {APPTS.map((a, i) => (
          <div key={i} className="flex gap-2 items-start w-full">
            <div className="w-[44px] shrink-0 flex flex-col items-end pr-1">
              <p className="text-[13px] font-semibold text-[#111] leading-tight">
                {a.time}
              </p>
              <p className="text-[10px] text-[#6b7280]">{a.duration}</p>
            </div>
            <div className="w-[3px] self-stretch rounded-sm" style={{ background: a.catColor }} />
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#111] truncate">
                  {a.patient}
                </p>
                <StatusPill status={a.status} />
              </div>
              <p className="text-[12px] text-[#111] truncate">{a.procedure}</p>
              <p className="text-[11px] text-[#6b7280]">{a.insurance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- 4. Activity Feed ---------- */
type FeedItem = {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  verb: string
  rest: string
  time: string
  action?: string
}

const FEED: FeedItem[] = [
  {
    icon: <CheckCircle2 size={16} />,
    iconBg: '#ecfdf5',
    iconColor: '#10b981',
    verb: 'Confirmed',
    rest: 'Sophia M. via SMS for tomorrow 14:30.',
    time: '2 min ago',
  },
  {
    icon: <ClipboardEdit size={16} />,
    iconBg: '#eef2ff',
    iconColor: '#6060d8',
    verb: 'Drafted',
    rest: 'claim for Michael C. · scaling procedure, ready for review.',
    time: '18 min ago',
    action: 'Review',
  },
  {
    icon: <CalendarClock size={16} />,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    verb: 'Rescheduled',
    rest: '1 patient from Tue 14:00 → Wed 10:30 (staff conflict).',
    time: '1 hour ago',
  },
  {
    icon: <MessageSquareText size={16} />,
    iconBg: '#fdf4ff',
    iconColor: '#a21caf',
    verb: 'Follow-up',
    rest: 'sent to Olivia P. — day 7. Reply: "No pain, thanks Doc."',
    time: '2 hours ago',
  },
  {
    icon: <UserPlus size={16} />,
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    verb: 'Onboarded',
    rest: '3 new patients via website overnight. Intake forms prepared.',
    time: '9 hours ago',
  },
  {
    icon: <AlertTriangle size={16} />,
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    verb: 'Escalated',
    rest: 'Rachel A. didn\'t reply to 3 reminders. Manual call needed.',
    time: 'yesterday 16:42',
  },
]

function ActivityPanel() {
  return (
    <div className="bg-white border border-[#efefef] rounded-2xl px-4 py-4 flex flex-col gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)] h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[16px] font-medium text-[#111]">AI Agent activity</p>
          <p className="text-[11px] text-[#6b7280] flex items-center gap-1.5">
            <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
            Live · last 24 hours
          </p>
        </div>
        <a className="text-[12px] font-semibold text-[#6060d8]">View all</a>
      </div>
      <div className="flex flex-col overflow-y-auto pr-1 -mr-1 flex-1">
        {FEED.map((it, i) => (
          <div
            key={i}
            className="border-b border-[#f3f4f6] flex items-start gap-3 py-2.5 last:border-b-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-[#ebebeb]"
              style={{ background: it.iconBg, color: it.iconColor }}
            >
              {it.icon}
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <p className="text-[12.5px] text-[#111] leading-tight">
                <span className="font-semibold">{it.verb}</span> {it.rest}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10.5px] text-[#6b7280] flex items-center gap-1">
                  <Sparkles size={9} className="text-[#6060d8]" />
                  AI agent · {it.time}
                </p>
                {it.action && (
                  <a className="text-[10.5px] font-semibold text-[#6060d8]">
                    {it.action} →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- 5. Insurance Claims (compact, polished) ---------- */
function ClaimsPanel() {
  const total = 142 + 28 + 3
  const approvalPct = 94.2
  // SVG ring (donut) circumference math
  const R = 22
  const C = 2 * Math.PI * R
  const dash = (approvalPct / 100) * C
  return (
    <div className="bg-white border border-[#efefef] rounded-2xl px-4 py-4 flex flex-col gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)] h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[16px] font-medium text-[#111]">Insurance claims</p>
          <p className="text-[11px] text-[#6b7280]">
            Last 30 days · {total} total
          </p>
        </div>
        <a className="text-[12px] font-semibold text-[#6060d8] flex items-center gap-0.5">
          View <ArrowUpRight size={11} />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Approved */}
        <div className="relative bg-[#ecfdf5] border border-emerald-100 rounded-xl p-2.5 flex flex-col gap-0.5 overflow-hidden">
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-emerald-200/30" />
          <div className="relative flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-700" />
            <p className="text-[9px] font-semibold text-emerald-700 uppercase tracking-wider">
              Approved
            </p>
          </div>
          <p className="relative text-[20px] font-semibold text-[#111] leading-none">
            142
          </p>
          <p className="relative text-[10px] text-emerald-700 font-semibold">
            $84,200
          </p>
        </div>
        {/* Processing */}
        <div className="relative bg-[#eff6ff] border border-blue-100 rounded-xl p-2.5 flex flex-col gap-0.5 overflow-hidden">
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-blue-200/30" />
          <div className="relative flex items-center gap-1">
            <Hourglass size={11} className="text-blue-700" />
            <p className="text-[9px] font-semibold text-blue-700 uppercase tracking-wider">
              Processing
            </p>
          </div>
          <p className="relative text-[20px] font-semibold text-[#111] leading-none">
            28
          </p>
          <p className="relative text-[10px] text-blue-700 font-semibold">
            $18,400
          </p>
        </div>
        {/* Review */}
        <div className="relative bg-[#fef3c7] border border-amber-100 rounded-xl p-2.5 flex flex-col gap-0.5 overflow-hidden">
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-amber-200/40 animate-pulse" />
          <div className="relative flex items-center gap-1">
            <AlertTriangle size={11} className="text-amber-800" />
            <p className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider">
              Review
            </p>
          </div>
          <p className="relative text-[20px] font-semibold text-[#111] leading-none">
            3
          </p>
          <p className="relative text-[10px] text-amber-800 font-semibold">
            Action needed
          </p>
        </div>
      </div>

      {/* Approval rate donut + caption */}
      <div className="bg-gradient-to-br from-[#fafaff] to-white border border-[#efefef] rounded-xl px-3 py-2.5 mt-auto flex gap-3 items-center shadow-[0_2px_2px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)]">
        {/* Donut */}
        <div className="relative w-[54px] h-[54px] shrink-0">
          <svg width="54" height="54" viewBox="0 0 54 54" className="-rotate-90">
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c8abff" />
                <stop offset="100%" stopColor="#8e51ff" />
              </linearGradient>
            </defs>
            <circle
              cx="27"
              cy="27"
              r={R}
              fill="none"
              stroke="#f3f0fa"
              strokeWidth="5"
            />
            <circle
              cx="27"
              cy="27"
              r={R}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${C - dash}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="text-[13px] font-semibold text-[#111]">94.2%</span>
            <span className="text-[7.5px] text-[#6b7280] font-medium uppercase tracking-wider">
              approval
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          <p className="text-[11px] text-[#6b7280] leading-tight">
            AI-drafted claim approval rate
          </p>
          <p className="text-[12px] text-[#111] leading-tight">
            <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold">
              <ArrowUpRight size={11} strokeWidth={2.5} />
              +8.4 pts
            </span>{' '}
            since Jan 2026
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- 6. Procedure Mix ---------- */
function ProcedurePanel() {
  const total = 142
  const mix = [
    {
      l: 'Preventive',
      v: 42,
      c: '#10b981',
      icon: <ShieldCheck size={11} />,
      trend: 'up',
    },
    {
      l: 'Restorative',
      v: 28,
      c: '#6060d8',
      icon: <Wrench size={11} />,
      trend: 'up',
    },
    {
      l: 'Cosmetic',
      v: 18,
      c: '#cf029f',
      icon: <Smile size={11} />,
      trend: 'flat',
    },
    {
      l: 'Surgical',
      v: 12,
      c: '#ea580c',
      icon: <Scissors size={11} />,
      trend: 'down',
    },
  ] as const
  return (
    <div className="bg-white border border-[#efefef] rounded-2xl px-4 py-4 flex flex-col gap-3 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)] h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[16px] font-medium text-[#111]">Procedure mix</p>
          <p className="text-[11px] text-[#6b7280]">{total} procedures this week</p>
        </div>
        <a className="text-[12px] font-semibold text-[#6060d8] flex items-center gap-0.5">
          Details <ArrowUpRight size={11} />
        </a>
      </div>

      {/* stacked bar — segmented with white gaps */}
      <div className="flex gap-1 h-[10px]">
        {mix.map((p) => (
          <div
            key={p.l}
            className="rounded-full relative overflow-hidden"
            style={{ width: `${p.v}%`, background: p.c }}
            title={`${p.l} ${p.v}%`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* legend rows w/ icon + count */}
      <div className="flex flex-col gap-1 flex-1">
        {mix.map((p) => {
          const count = Math.round((p.v / 100) * total)
          return (
            <div
              key={p.l}
              className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-[#fafafa]"
            >
              <span
                className="w-[22px] h-[22px] rounded-md flex items-center justify-center shrink-0"
                style={{ background: p.c + '1a', color: p.c }}
              >
                {p.icon}
              </span>
              <span className="text-[12px] text-[#111] flex-1 font-medium">
                {p.l}
              </span>
              <span className="text-[11px] text-[#6b7280] tabular-nums">
                {count}
              </span>
              <span className="text-[12px] font-semibold text-[#111] w-[34px] text-right tabular-nums">
                {p.v}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Main center column with NEW layout ---------- */
function MainColumn() {
  return (
    <div className="absolute left-[326px] top-[92px] w-[801px] h-[778px] flex flex-col gap-3">
      {/* 1. AI Agent Hero — full width banner */}
      <AIAgentHero />

      {/* 2. 4 KPI tiles */}
      <div className="flex gap-3 w-full">
        <KpiTile
          icon={<CalendarCheck2 size={14} />}
          iconColor="#6060d8"
          iconBg="#eef2ff"
          label="Appointments today"
          value="24"
          delta="18%"
          deltaDir="up"
          deltaColor="#10b981"
          sub="12 done · 12 to go"
          spark={[14, 17, 15, 18, 16, 20, 19, 22, 21, 23, 24]}
          sparkColor="#6060d8"
        />
        <KpiTile
          icon={<ShieldCheck size={14} />}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          label="No-show rate"
          value="3.2%"
          delta="5.1%"
          deltaDir="down"
          deltaColor="#10b981"
          sub="with AI reminders enabled"
          spark={[9, 8.4, 7.8, 7.2, 6.5, 5.8, 5.4, 4.8, 4.2, 3.6, 3.2]}
          sparkColor="#10b981"
        />
        <KpiTile
          icon={<FileText size={14} />}
          iconColor="#d97706"
          iconBg="#fef3c7"
          label="Claims pending review"
          value="3"
          delta="Action"
          deltaDir="flat"
          deltaColor="#d97706"
          sub="awaiting Dr. Bennett"
          spark={[1, 2, 4, 3, 5, 4, 6, 5, 4, 3, 3]}
          sparkColor="#d97706"
        />
        <KpiTile
          icon={<DollarSign size={14} />}
          iconColor="#cf029f"
          iconBg="#fdf4ff"
          label="Revenue MTD"
          value="$48.2k"
          delta="24%"
          deltaDir="up"
          deltaColor="#10b981"
          sub="on track for $62k"
          spark={[18, 22, 26, 28, 32, 35, 38, 41, 43, 46, 48]}
          sparkColor="#cf029f"
        />
      </div>

      {/* 3. 2-col: Schedule + Activity */}
      <div className="flex gap-3 w-full" style={{ height: '270px' }}>
        <div className="flex-1 min-w-0">
          <SchedulePanel />
        </div>
        <div className="flex-1 min-w-0">
          <ActivityPanel />
        </div>
      </div>

      {/* 4. 2-col: Claims + Procedure */}
      <div className="flex gap-3 w-full flex-1 min-h-0">
        <div className="flex-1 min-w-0">
          <ClaimsPanel />
        </div>
        <div className="flex-1 min-w-0">
          <ProcedurePanel />
        </div>
      </div>
    </div>
  )
}

/* ---------- Right Molar chat panel ---------- */
function AIChatPanel() {
  return (
    <div className="absolute left-[1147px] top-[92px] w-[281px] h-[778px] bg-white flex items-center">
      <div className="flex-1 h-full bg-[#fafafa] border border-[#f5f5f5] rounded-xl overflow-hidden flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
        <div className="bg-white border-b border-[#efefef] p-4 flex items-center">
          <div className="flex-1 flex items-center gap-2">
            <div className="w-[22px] h-[22px] rounded-md bg-gradient-to-br from-[#6060d8] to-[#8e51ff] flex items-center justify-center">
              <Sparkles size={11} className="text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] font-semibold text-[#171717] tracking-[-0.2px] leading-tight">
                Ask Molar
              </p>
              <p className="text-[10px] text-[#10b981] font-semibold flex items-center gap-1">
                <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </p>
            </div>
          </div>
          <ChevronDown size={16} className="text-[#737373] rotate-[-90deg]" />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col gap-3 px-3 py-4 overflow-y-auto">
            <div className="flex justify-center">
              <span className="bg-[#f1f1f1] rounded-full px-3 py-1 text-[11px] font-medium text-[#444]">
                Today · 09:42
              </span>
            </div>

            {/* AI greeting */}
            <div className="flex gap-2 items-end">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c8abff] to-[#8e51ff] flex items-center justify-center shrink-0">
                <Sparkles size={11} className="text-white" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[10px] text-[#939393]">Molar · 09:42</p>
                <div className="bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)] p-3 relative overflow-hidden">
                  <div
                    className="absolute -top-[20px] -right-[40px] w-[140px] h-[70px] opacity-40"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(142,81,255,0.5), transparent 60%)',
                    }}
                  />
                  <div className="relative flex flex-col gap-2">
                    <p className="text-[12px] font-semibold text-[#222]">
                      Good morning, Dr. Bennett.
                    </p>
                    <p className="text-[11.5px] text-[#444] leading-[1.5]">
                      I've handled 47 tasks since 06:00.
                      <br />Want a quick summary?
                    </p>
                    <div className="flex flex-col gap-1 pt-1">
                      <button className="bg-white border border-[#e6e6e6] rounded-md px-2.5 py-1.5 text-left text-[11.5px] font-medium text-[#474747] hover:bg-[#fafafa]">
                        Show today's schedule
                      </button>
                      <button className="bg-gradient-to-r from-white to-[#f2f2ff] border border-white rounded-md px-2.5 py-1.5 text-left text-[11.5px] font-medium text-[#474747] shadow-[0_2px_4px_rgba(96,96,216,0.17),0_1px_0_rgba(0,0,0,0.06)]">
                        Review the 3 pending claims
                      </button>
                      <button className="bg-white border border-[#e6e6e6] rounded-md px-2.5 py-1.5 text-left text-[11.5px] font-medium text-[#474747] hover:bg-[#fafafa]">
                        Who hasn't confirmed yet?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* user reply */}
            <div className="flex gap-1 items-end justify-end">
              <div className="flex flex-col gap-1 items-end max-w-[200px]">
                <p className="text-[10px] text-[#939393]">You · 09:43</p>
                <div className="bg-[#e9e9e9] rounded-tl-[16px] rounded-bl-[16px] rounded-tr-xl px-3 py-2">
                  <p className="text-[12px] font-medium text-[#111]">
                    Review the 3 pending claims
                  </p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#f2f4f5] border border-[#ebebeb] overflow-hidden">
                <img src="/assets/avatar.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* AI response */}
            <div className="flex gap-2 items-end">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c8abff] to-[#8e51ff] flex items-center justify-center shrink-0">
                <Sparkles size={11} className="text-white" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[10px] text-[#939393]">Molar · 09:43</p>
                <div className="bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)] p-3 flex flex-col gap-2">
                  <p className="text-[12px] font-semibold text-[#222]">
                    3 claims ready for review
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#111]">Michael Chen · Cigna</span>
                      <span className="text-[#6b7280] font-medium">$840</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#111]">James Carter · Delta</span>
                      <span className="text-[#6b7280] font-medium">$220</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#111]">Sophia M. · Aetna</span>
                      <span className="text-[#6b7280] font-medium">$410</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[10.5px] text-[#6b6b6b]">Drafting summary</span>
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-[#bbb] animate-pulse" />
                      <span
                        className="w-1 h-1 rounded-full bg-[#bbb] animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <span
                        className="w-1 h-1 rounded-full bg-[#bbb] animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stop generating */}
          <div className="flex justify-center pb-2 px-3">
            <button className="bg-gradient-to-b from-[#444] to-[#262630] border border-[#262630] rounded-xl px-3 py-2 flex items-center gap-2 shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
              <span className="w-3 h-3 rounded-sm bg-[#c8abff] shadow-[0_0_7px_rgba(200,171,255,0.8)]" />
              <span className="text-white text-[13px] font-medium">Stop generating</span>
            </button>
          </div>

          {/* Input area */}
          <div className="p-3 w-full">
            <div className="bg-white border border-[#efefef] rounded-[10px] p-3 h-[96px] flex flex-col gap-2 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_0_rgba(0,0,0,0.04)] relative">
              <div className="bg-white border border-[#e6e6e6] rounded-md px-2 h-[24px] w-fit flex items-center gap-1.5">
                <Paperclip size={11} className="text-[#737373]" />
                <span className="w-px h-3 bg-[#e6e6e6]" />
                <Mic size={11} className="text-[#737373]" />
              </div>
              <p className="text-[12px] text-[#737373] tracking-[-0.28px] opacity-60">
                e.g. "Reschedule my 14:00 to Friday 15:30"
              </p>
              <button className="absolute bottom-2.5 right-2.5 w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#444] to-[#262630] border border-[#262630] flex items-center justify-center shadow-[0_2px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(0,0,0,0.06)]">
                <Send size={13} className="text-white -rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <div className="absolute left-[306px] bottom-0 w-[1134px] h-[28px] border-t border-[#ebebeb] bg-[#fafafa] flex items-center justify-between px-5">
      <p className="text-[10.5px] text-[#9ca3af] flex items-center gap-1.5">
        <Sparkle size={10} className="text-[#6060d8]" />
        <span className="font-semibold text-[#6b7280]">Molar AI</span>
        <span>·</span>
        <span>v2.4</span>
        <span className="text-[#d4d4d4]">|</span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck size={10} className="text-emerald-500" />
          Healthcare-grade encryption
        </span>
      </p>
      <p className="text-[10.5px] text-[#9ca3af] flex items-center gap-1.5">
        <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
        Last synced 12 seconds ago
      </p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center py-4">
      <div className="relative w-[1440px] h-[900px] bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <IconRail />
        <WideSidebar />
        <Header />
        <MainColumn />
        <AIChatPanel />
        <Footer />
      </div>
    </div>
  )
}
