'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface propsInterface {
  title?: string
  buttonLabel?: string
  buttonOnClick?: () => any
  hideButton?: boolean
}

const ErrorComponent = (props: propsInterface) => {
  const router = useRouter()
  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: 'var(--bg-base, #f5f6fa)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'fixed', top: 0, left: 0, zIndex: 1000,
      fontFamily: "'Kanit', sans-serif",
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
      <h2 style={{
        fontSize: '1.5rem', fontWeight: 700,
        color: 'var(--text-primary, #0f172a)',
        marginBottom: '0.5rem',
      }}>
        เกิดข้อผิดพลาด
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #64748b)', marginBottom: '1.5rem' }}>
        {props.title || 'ไม่สามารถโหลดข้อมูลได้'}
      </p>
      {!props.hideButton && (
        <button
          style={{
            padding: '0.65rem 1.5rem',
            fontFamily: "'Kanit', sans-serif",
            fontSize: '0.9rem', fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', border: 'none',
            borderRadius: '10px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => {
            try {
              if (props.buttonOnClick) {
                props.buttonOnClick()
              } else {
                axios.get('/api/profile').finally(() => router.back())
              }
            } catch (err) {}
          }}
        >
          ← ย้อนกลับ
        </button>
      )}
    </div>
  )
}

export default ErrorComponent
