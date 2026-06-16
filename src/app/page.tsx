'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── SIDEBAR ICONS (SVG inline) ── */
const IGrid   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IUsers  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IFile   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
const ICard   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
const IMap    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
const IChart  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const ICog    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>

const NAV = [
  { id:'dashboard',    label:'Dashboard',   Icon: IGrid  },
  { id:'contratos',    label:'Contratos',   Icon: IFile  },
  { id:'clientes',     label:'Clientes',    Icon: IUsers },
  { id:'cobradores',   label:'Cobradores',  Icon: IMap   },
  { id:'cobranza',     label:'Cobranza',    Icon: ICard  },
  { id:'reportes',     label:'Reportes',    Icon: IChart },
  { id:'configuracion',label:'Config',      Icon: ICog   },
]

/* DATA */
const STATS = [
  { label:'Contratos activos',    value:'164',     delta:'+8',  color:'var(--gold)',   icon:'📋' },
  { label:'Cobrado este mes',     value:'$67,600', delta:'+12%',color:'var(--green)',  icon:'💰' },
  { label:'Pendiente total',      value:'$18,900', delta:'-5%', color:'var(--orange)', icon:'⏳' },
  { label:'Cobradores activos',   value:'4',       delta:'=',   color:'var(--txt)',    icon:'👥' },
]

const COBRADORES = [
  { nombre:'Javier Hernández', zona:'Centro',  contratos:52, cobrado:22100, meta:24000 },
  { nombre:'Roberto Méndez',   zona:'Norte',   contratos:45, cobrado:18500, meta:20000 },
  { nombre:'Carmen Torres',    zona:'Sur',     contratos:38, cobrado:15200, meta:18000 },
  { nombre:'Daniela Ruiz',     zona:'Oriente', contratos:29, cobrado:11800, meta:14000 },
]

const CONTRATOS = [
  { folio:'PMX-2024-001', cliente:'María González',    paquete:'Paz Familiar',   mensual:2800, saldo:16800, estado:'al_corriente', cobrador:'Roberto Méndez'  },
  { folio:'PMX-2024-002', cliente:'José Luis Ramírez', paquete:'Serenidad',      mensual:1500, saldo:12000, estado:'atrasado',     cobrador:'Roberto Méndez'  },
  { folio:'PMX-2024-003', cliente:'Ana Flores',        paquete:'Eternidad Plus', mensual:4500, saldo:36000, estado:'al_corriente', cobrador:'Carmen Torres'   },
  { folio:'PMX-2024-004', cliente:'Carlos Morales',    paquete:'Paz Familiar',   mensual:2800, saldo:5600,  estado:'al_corriente', cobrador:'Carmen Torres'   },
  { folio:'PMX-2024-007', cliente:'Esperanza Díaz',    paquete:'Eternidad Plus', mensual:4500, saldo:0,     estado:'liquidado',    cobrador:'Javier Hernández'},
  { folio:'PMX-2024-008', cliente:'Fernando López',    paquete:'Serenidad',      mensual:1500, saldo:10500, estado:'al_corriente', cobrador:'Daniela Ruiz'    },
  { folio:'PMX-2024-009', cliente:'Gloria Rosas',      paquete:'Paz Familiar',   mensual:2800, saldo:19600, estado:'al_corriente', cobrador:'Daniela Ruiz'    },
]

const PAGOS = [
  { cliente:'Roberto Silva',   monto:2800, metodo:'Efectivo',    cobrador:'Javier Hernández', hora:'12 min', folio:'REC-006' },
  { cliente:'Héctor Jiménez',  monto:1500, metodo:'Mercado Pago',cobrador:'Roberto Méndez',   hora:'28 min', folio:'REC-009' },
  { cliente:'Ana Flores',      monto:4500, metodo:'Efectivo',    cobrador:'Carmen Torres',    hora:'1h',     folio:'REC-003' },
  { cliente:'María González',  monto:2800, metodo:'Efectivo',    cobrador:'Roberto Méndez',   hora:'5d',     folio:'REC-001' },
  { cliente:'Carlos Morales',  monto:2800, metodo:'Transferencia',cobrador:'Carmen Torres',   hora:'7d',     folio:'REC-004' },
]

const FadeIn = ({ children, delay=0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
    transition={{ duration:0.22, delay, ease:'easeOut' }}>
    {children}
  </motion.div>
)

export default function AdminApp() {
  const [section, setSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)' }}>

      {/* ── SIDEBAR DESKTOP (240px fijo) ── */}
      <aside style={{
        width: 240,
        flexShrink: 0,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border-sub)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, bottom: 0, left: 0,
        zIndex: 20,
        padding: '0',
      }} className="hidden-mobile">
        {/* Logo */}
        <div style={{ padding:'28px 24px 20px', borderBottom:'1px solid var(--border-sub)' }}>
          <div className="shimmer-text t-serif" style={{ fontSize:22, letterSpacing:'0.15em' }}>PREMMEX</div>
          <div className="t-micro mt-1" style={{ color:'var(--txt3)' }}>Panel Administrativo</div>
        </div>

        {/* Nav items */}
        <nav style={{ flex:1, padding:'12px 0', overflowY:'auto' }}>
          {NAV.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setSection(id)}
              style={{
                width:'100%', display:'flex', alignItems:'center', gap:12,
                padding:'11px 24px', border:'none', cursor:'pointer',
                background: section === id ? 'var(--gold-dim)' : 'transparent',
                color: section === id ? 'var(--gold)' : 'var(--txt2)',
                borderLeft: section === id ? '2px solid var(--gold)' : '2px solid transparent',
                transition:'all 0.15s',
                fontSize:13,
              }}>
              <div style={{ width:18, height:18, flexShrink:0 }}><Icon/></div>
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding:'16px 24px', borderTop:'1px solid var(--border-sub)' }}>
          <div className="t-body" style={{ fontWeight:500 }}>José Prudencio García</div>
          <div className="t-sub">Administrador General</div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, marginLeft:240, overflowY:'auto', paddingBottom:80 }}
        className="admin-main">

        {/* Topbar */}
        <div style={{
          padding:'16px 24px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid var(--border-sub)',
          background:'rgba(10,10,10,0.85)',
          backdropFilter:'blur(12px)',
          position:'sticky', top:0, zIndex:10,
        }}>
          <div>
            <div className="t-title">{NAV.find(n => n.id === section)?.label ?? 'Dashboard'}</div>
            <div className="t-sub">Sede Cancún · Lunes 16 Jun 2025</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn-primary" style={{ padding:'8px 16px', fontSize:12 }}>
              + Nuevo contrato
            </button>
          </div>
        </div>

        <div style={{ padding:'24px' }}>

          {/* ─── DASHBOARD ─── */}
          {section === 'dashboard' && (
            <>
              {/* KPIs — siempre arriba */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:12, marginBottom:24 }}>
                {STATS.map((s,i) => (
                  <FadeIn key={i} delay={i*0.07}>
                    <div className="card" style={{ padding:20, borderRadius:'var(--r-lg)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                        <span className="t-micro">{s.label}</span>
                        <span style={{ fontSize:18 }}>{s.icon}</span>
                      </div>
                      <div className="t-serif" style={{ fontSize:26, color:s.color, marginBottom:4 }}>{s.value}</div>
                      <div className="t-micro" style={{ color:s.color, opacity:0.7 }}>{s.delta} vs mes anterior</div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* 2 columnas — Cobradores + Cobros recientes */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>

                {/* Cobradores */}
                <FadeIn delay={0.2}>
                  <div className="card" style={{ padding:20, borderRadius:'var(--r-lg)' }}>
                    <div className="t-micro mb-4">RENDIMIENTO DEL EQUIPO</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                      {COBRADORES.map((c,i) => {
                        const pct = Math.round(c.cobrado/c.meta*100)
                        return (
                          <div key={i}>
                            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                              <div>
                                <div className="t-body" style={{ fontWeight:500 }}>{c.nombre}</div>
                                <div className="t-sub">Zona {c.zona} · {c.contratos} contratos</div>
                              </div>
                              <div style={{ textAlign:'right' }}>
                                <div className="t-body gold-text">${c.cobrado.toLocaleString()}</div>
                                <div className="t-sub">{pct}%</div>
                              </div>
                            </div>
                            <div className="progress-track">
                              <motion.div className="progress-fill"
                                initial={{ width:0 }}
                                animate={{ width:`${pct}%` }}
                                transition={{ delay:0.4+i*0.1, duration:0.8 }}
                                style={{ background: pct>=90?'var(--green)':pct>=70?'var(--gold)':'var(--red)' }}/>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </FadeIn>

                {/* Cobros recientes */}
                <FadeIn delay={0.25}>
                  <div className="card" style={{ padding:20, borderRadius:'var(--r-lg)' }}>
                    <div className="t-micro mb-4">COBROS RECIENTES</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      {PAGOS.map((p,i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                          paddingBottom: i < PAGOS.length-1 ? 12 : 0,
                          borderBottom: i < PAGOS.length-1 ? '1px solid var(--border-sub)' : 'none' }}>
                          <div>
                            <div className="t-body">{p.cliente}</div>
                            <div className="t-sub">{p.cobrador} · {p.metodo} · hace {p.hora}</div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div className="t-body" style={{ color:'var(--green)', fontWeight:500 }}>+${p.monto.toLocaleString()}</div>
                            <div className="t-sub">{p.folio}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </>
          )}

          {/* ─── CONTRATOS ─── */}
          {section === 'contratos' && (
            <>
              <FadeIn>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                  <div className="t-sub">{CONTRATOS.length} contratos · Todos</div>
                  <div style={{ display:'flex', gap:8 }}>
                    {['Todos','Al corriente','Atrasados','Liquidados'].map((f,i) => (
                      <button key={i} className={i===0?'btn-primary':'btn-ghost'}
                        style={{ padding:'6px 14px', fontSize:12, minHeight:34 }}>{f}</button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Tabla */}
              <FadeIn delay={0.05}>
                <div className="card" style={{ borderRadius:'var(--r-lg)', overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom:'1px solid var(--border-sub)' }}>
                        {['Folio','Cliente','Paquete','Mensual','Saldo','Cobrador','Estado'].map(h => (
                          <th key={h} className="t-micro" style={{ padding:'12px 16px', textAlign:'left', fontWeight:500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CONTRATOS.map((c, i) => (
                        <motion.tr key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
                          style={{ borderBottom: i < CONTRATOS.length-1 ? '1px solid var(--border-sub)' : 'none',
                            cursor:'pointer' }}
                          whileHover={{ background:'rgba(255,255,255,0.025)' }}>
                          <td style={{ padding:'12px 16px' }} className="t-sub gold-text">{c.folio}</td>
                          <td style={{ padding:'12px 16px' }} className="t-body">{c.cliente}</td>
                          <td style={{ padding:'12px 16px' }} className="t-sub">{c.paquete}</td>
                          <td style={{ padding:'12px 16px' }} className="t-body gold-text">${c.mensual.toLocaleString()}</td>
                          <td style={{ padding:'12px 16px' }} className="t-body">${c.saldo.toLocaleString()}</td>
                          <td style={{ padding:'12px 16px' }} className="t-sub">{c.cobrador}</td>
                          <td style={{ padding:'12px 16px' }}>
                            <span className={`badge ${c.estado==='liquidado'?'badge-green':c.estado==='atrasado'?'badge-orange':'badge-sub'}`}>
                              {c.estado.replace('_',' ')}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            </>
          )}

          {/* ─── COBRADORES ─── */}
          {section === 'cobradores' && (
            <>
              <FadeIn>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:16, marginBottom:20 }}>
                  {COBRADORES.map((c,i) => {
                    const pct = Math.round(c.cobrado/c.meta*100)
                    return (
                      <FadeIn key={i} delay={i*0.08}>
                        <div className="card" style={{ padding:20, borderRadius:'var(--r-lg)' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                            <div style={{ width:44, height:44, borderRadius:'50%', display:'flex', alignItems:'center',
                              justifyContent:'center', background:'var(--gold-dim)', color:'var(--gold)' }}
                              className="t-serif" >{c.nombre[0]}</div>
                            <div>
                              <div className="t-body" style={{ fontWeight:500 }}>{c.nombre}</div>
                              <div className="t-sub">Zona {c.zona}</div>
                            </div>
                          </div>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                            <div className="card" style={{ padding:'10px 12px', borderRadius:'var(--r-md)' }}>
                              <div className="t-micro mb-1">Contratos</div>
                              <div className="t-serif gold-text" style={{ fontSize:18 }}>{c.contratos}</div>
                            </div>
                            <div className="card" style={{ padding:'10px 12px', borderRadius:'var(--r-md)' }}>
                              <div className="t-micro mb-1">Cobrado</div>
                              <div className="t-serif" style={{ fontSize:14, color:'var(--green)' }}>${c.cobrado.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="t-micro mb-2">META {pct}%</div>
                          <div className="progress-track">
                            <motion.div className="progress-fill"
                              initial={{ width:0 }} animate={{ width:`${pct}%` }}
                              transition={{ delay:0.3+i*0.1, duration:0.8 }}
                              style={{ background: pct>=90?'var(--green)':pct>=70?'var(--gold)':'var(--red)' }}/>
                          </div>
                        </div>
                      </FadeIn>
                    )
                  })}
                </div>
              </FadeIn>
            </>
          )}

          {/* ─── COBRANZA ─── */}
          {section === 'cobranza' && (
            <FadeIn>
              <div className="card" style={{ padding:20, borderRadius:'var(--r-lg)' }}>
                <div className="t-micro mb-4">TODOS LOS COBROS</div>
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  {PAGOS.map((p,i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                      padding:'14px 0', borderBottom: i < PAGOS.length-1 ? '1px solid var(--border-sub)' : 'none' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(76,175,80,0.12)',
                          display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7l3 3 7-7" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="t-body" style={{ fontWeight:500 }}>{p.cliente}</div>
                          <div className="t-sub">{p.cobrador} · {p.metodo} · {p.folio}</div>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ color:'var(--green)', fontWeight:600 }}>+${p.monto.toLocaleString()}</div>
                        <div className="t-sub">hace {p.hora}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* ─── REPORTES / CONFIG placeholder ─── */}
          {(section === 'reportes' || section === 'clientes' || section === 'configuracion') && (
            <FadeIn>
              <div className="card" style={{ padding:60, borderRadius:'var(--r-lg)', textAlign:'center' }}>
                <div style={{ fontSize:36, marginBottom:12 }}>
                  {section==='reportes'?'📊':section==='clientes'?'👥':'⚙️'}
                </div>
                <div className="t-title mb-2">
                  {section==='reportes'?'Reportes':''}
                  {section==='clientes'?'Gestión de Clientes':''}
                  {section==='configuracion'?'Configuración':''}
                </div>
                <div className="t-sub">Módulo en construcción · Etapa 2</div>
              </div>
            </FadeIn>
          )}

        </div>
      </main>

      {/* BOTTOM NAV MOBILE */}
      <nav className="bottom-nav show-mobile" style={{ left:0 }}>
        {NAV.slice(0,5).map(({ id, label, Icon }) => (
          <motion.button key={id} onClick={() => setSection(id)}
            className={`nav-item ${section === id ? 'active' : ''}`}
            whileTap={{ scale:0.9 }}>
            <Icon/>
            <span>{label}</span>
          </motion.button>
        ))}
      </nav>

      {/* CSS responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
          .admin-main    { margin-left: 0 !important; padding: 0 !important; }
          .admin-main > div:first-child { position: sticky; top:0; z-index:10; }
          .admin-main > div:last-child  { padding: 16px !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
