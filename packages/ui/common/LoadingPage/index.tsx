const LoadingPage = () => (
  <div style={{
    width: '100vw', height: '100vh',
    background: 'var(--sidebar-bg)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    position: 'fixed', top: 0, left: 0, zIndex: 1000,
    fontFamily: "'Kanit', sans-serif",
  }}>
    <div style={{
      width: '56px', height: '56px',
      background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
      borderRadius: '16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.75rem',
      animation: 'pulse 1.5s ease-in-out infinite',
      marginBottom: '1.25rem',
      boxShadow: '0 8px 24px var(--primary-shadow, rgba(99,102,241,0.4))',
    }}>💰</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--primary, #6366f1)',
          animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
        }}/>
      ))}
    </div>
    <style>{`
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.8;transform:scale(0.97)} }
      @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    `}</style>
  </div>
)

export default LoadingPage
