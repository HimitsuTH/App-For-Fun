// import useTranslation from 'next-translate/useTranslation'
// import { colors } from '../../styles/colors'
// import { LoadingPageLogo } from 'ui/components/Switcher/index'

const LoadingPage = () => {
//   const { t } = useTranslation()
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      <div style={{ boxSizing: 'border-box', borderRadius: '1em', width: '16em' }}>
        {/* <LoadingPageLogo /> */}
      </div>
      <span style={{ fontSize: '0.8em', marginTop: 10, color: "#333" }}>
        loading ...
      </span>
    </div>
  )
}

export default LoadingPage