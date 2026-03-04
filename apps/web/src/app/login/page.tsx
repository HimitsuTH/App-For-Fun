'use client'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "ui/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { TSignInSchema, signInSchema } from 'ui/types/auth/type'
import { loginRequest } from 'ui/utils/requests/auth'

const STYLES = `
  @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
  @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(3deg)} 50%{transform:translateY(-10px) rotate(-1deg)} }
  @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse  { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes spin   { to{transform:rotate(360deg)} }

  .login-input {
    width:100%; padding:0.8rem 1rem;
    font-size:0.92rem; font-family:'Kanit',sans-serif; font-weight:400;
    color:var(--text-primary);
    background:var(--bg-subtle);
    border:1.5px solid var(--border);
    border-radius:var(--radius-md); outline:none;
    transition:border-color var(--transition), background var(--transition), box-shadow var(--transition);
  }
  .login-input:focus {
    border-color:var(--primary);
    background:var(--bg-surface);
    box-shadow:0 0 0 4px var(--primary-glow);
  }
  .login-input::placeholder { color:var(--text-muted); }
  .login-input.error { border-color:var(--danger); }
  .login-input.error:focus { box-shadow:0 0 0 4px rgba(239,68,68,0.1); }

  .submit-btn {
    width:100%; padding:0.85rem;
    font-size:0.95rem; font-weight:700; font-family:'Kanit',sans-serif;
    color:white; border:none; border-radius:var(--radius-md); cursor:pointer;
    background:linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    box-shadow:0 4px 20px var(--primary-shadow);
    transition:transform 0.15s, box-shadow 0.15s, opacity 0.2s;
    position:relative; overflow:hidden; letter-spacing:0.02em;
  }
  .submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px var(--primary-shadow); }
  .submit-btn:active:not(:disabled) { transform:translateY(0); }
  .submit-btn:disabled { opacity:0.7; cursor:not-allowed; }

  @media(max-width:768px){
    .login-left  { display:none!important; }
    .login-right { border-radius:0!important; }
    .login-wrap  { height:100vh!important; border-radius:0!important; }
  }
`

const FEATURES = [
  { icon: '💳', label: 'ติดตามรายจ่าย',     sub: 'บันทึกทุกการใช้จ่ายแบบ real-time', delay: '0s',   anim: 'floatA' },
  { icon: '📊', label: 'วิเคราะห์งบประมาณ', sub: 'กราฟและสถิติครบครัน',             delay: '0.4s', anim: 'floatB' },
  { icon: '🗂️', label: 'จัดหมวดหมู่',       sub: 'แยกประเภทรายรับ-รายจ่าย',         delay: '0.8s', anim: 'floatC' },
]

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) })

  useEffect(() => {
    axios.get('/api/profile')
      .then(() => router.replace('/'))
      .catch(() => setIsInitialized(true))
  }, [])

  const onSubmit = (data: TSignInSchema) => loginRequest(data, dispatch, router)

  if (!isInitialized) return null

  return (
    <>
      <style>{STYLES}</style>
      <div style={{
        minHeight: '100vh',
        background: 'var(--primary-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', fontFamily: "'Kanit',sans-serif",
      }}>
        <div className="login-wrap" style={{
          display: 'flex', width: '100%', maxWidth: '900px', minHeight: '560px',
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 32px 80px var(--primary-shadow), 0 8px 24px rgba(0,0,0,0.08)',
          animation: 'fadeUp 0.5s ease both',
        }}>

          {/* ══ LEFT ══ */}
          <div className="login-left" style={{
            flex: '1 1 50%',
            background: 'linear-gradient(155deg, var(--sidebar-bg) 0%, #312e81 45%, #4c1d95 100%)',
            padding: '3rem', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
          }}>
            {/* blobs */}
            {[
              { top:'-60px', left:'-60px',    w:'220px', h:'220px', c:'rgba(139,92,246,0.3)' },
              { bottom:'-40px', right:'-40px', w:'180px', h:'180px', c:'rgba(99,102,241,0.25)' },
              { top:'40%', left:'30%',         w:'140px', h:'140px', c:'rgba(167,139,250,0.15)' },
            ].map((b, i) => (
              <div key={i} style={{
                position:'absolute', borderRadius:'50%',
                background:`radial-gradient(circle,${b.c} 0%,transparent 70%)`,
                width:b.w, height:b.h,
                top:(b as any).top, left:(b as any).left,
                bottom:(b as any).bottom, right:(b as any).right,
                pointerEvents:'none',
              }}/>
            ))}

            <div style={{ position: 'relative' }}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'0.75rem',
                background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)',
                borderRadius:'14px', padding:'0.6rem 1rem', marginBottom:'2rem',
                backdropFilter:'blur(8px)',
              }}>
                <span style={{ fontSize:'1.4rem' }}>💰</span>
                <span style={{ color:'#fff', fontWeight:700, fontSize:'1rem', letterSpacing:'-0.01em' }}>Expenses App</span>
              </div>
              <h2 style={{ color:'#fff', fontSize:'1.75rem', fontWeight:700, lineHeight:1.25, letterSpacing:'-0.03em', margin:0 }}>
                จัดการการเงิน<br/>
                <span style={{ background:'linear-gradient(90deg,#a5b4fc,#c4b5fd)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ได้ง่ายขึ้น</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.875rem', marginTop:'0.75rem', lineHeight:1.6 }}>
                บันทึก วิเคราะห์ และควบคุมรายรับ-รายจ่าย<br/>ของคุณในที่เดียว
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', position:'relative' }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:'0.9rem',
                  background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)',
                  borderRadius:'14px', padding:'0.9rem 1.1rem', backdropFilter:'blur(8px)',
                  animation:`${f.anim} ${3+i*0.5}s ease-in-out ${f.delay} infinite`,
                }}>
                  <div style={{
                    width:'38px', height:'38px', borderRadius:'10px', flexShrink:0,
                    background:'rgba(255,255,255,0.12)',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
                  }}>{f.icon}</div>
                  <div>
                    <p style={{ color:'#fff', fontWeight:600, fontSize:'0.85rem', margin:0 }}>{f.label}</p>
                    <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.75rem', margin:0 }}>{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', gap:'6px', justifyContent:'center', opacity:0.4 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width:i===1?'20px':'6px', height:'6px', borderRadius:'3px', background:'#fff',
                  animation:'pulse 2s ease infinite', animationDelay:`${i*0.3}s`,
                }}/>
              ))}
            </div>
          </div>

          {/* ══ RIGHT ══ */}
          <div className="login-right" style={{
            flex:'1 1 50%', background:'var(--bg-surface)',
            display:'flex', flexDirection:'column', justifyContent:'center',
            padding:'3rem 2.75rem',
          }}>
            <div style={{ marginBottom:'2.25rem' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--primary)', textTransform:'uppercase', letterSpacing:'0.12em', margin:'0 0 0.5rem' }}>ยินดีต้อนรับ</p>
              <h1 style={{ fontSize:'1.6rem', fontWeight:700, color:'var(--text-primary)', margin:0, letterSpacing:'-0.03em' }}>เข้าสู่ระบบ</h1>
              <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginTop:'0.4rem' }}>กรอกข้อมูลเพื่อเข้าใช้งานระบบ</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
              <div>
                <label style={{
                  display:'block', fontSize:'0.78rem', fontWeight:600, marginBottom:'0.4rem',
                  color: focusedField==='username' ? 'var(--primary)' : 'var(--text-secondary)',
                  transition:'color var(--transition)', letterSpacing:'0.02em',
                }}>อีเมล / ชื่อผู้ใช้</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'0.85rem', top:'50%', transform:'translateY(-50%)', fontSize:'1rem', opacity:0.5, pointerEvents:'none' }}>✉️</span>
                  <input {...register('username')} className={`login-input${errors.username?' error':''}`}
                    placeholder="xxx@xxx.xxx" style={{ paddingLeft:'2.5rem' }}
                    onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)} />
                </div>
                {errors.username && <p style={{ color:'var(--danger)', fontSize:'0.73rem', marginTop:'0.3rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>⚠️ {errors.username.message}</p>}
              </div>

              <div>
                <label style={{
                  display:'block', fontSize:'0.78rem', fontWeight:600, marginBottom:'0.4rem',
                  color: focusedField==='password' ? 'var(--primary)' : 'var(--text-secondary)',
                  transition:'color var(--transition)', letterSpacing:'0.02em',
                }}>รหัสผ่าน</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'0.85rem', top:'50%', transform:'translateY(-50%)', fontSize:'1rem', opacity:0.5, pointerEvents:'none' }}>🔑</span>
                  <input {...register('password')} type="password" className={`login-input${errors.password?' error':''}`}
                    placeholder="••••••••" style={{ paddingLeft:'2.5rem' }}
                    onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} />
                </div>
                {errors.password && <p style={{ color:'var(--danger)', fontSize:'0.73rem', marginTop:'0.3rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>⚠️ {errors.password.message}</p>}
              </div>

              <div style={{ height:'0.25rem' }}/>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', justifyContent:'center' }}>
                    <span style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block', animation:'spin 0.7s linear infinite' }}/>
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : 'เข้าสู่ระบบ →'}
              </button>
            </form>

            <p style={{ marginTop:'2rem', textAlign:'center', fontSize:'0.75rem', color:'var(--text-disabled)' }}>
              © {new Date().getFullYear()} Expenses App · สงวนสิทธิ์ทุกประการ
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
