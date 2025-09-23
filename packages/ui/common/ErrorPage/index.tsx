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
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      <div style={{ position: 'relative', height: '15em', width: '15em' }}>
      </div>
      <span style={{ fontSize: '1.5em', fontWeight: 500, marginTop: 10, color: "#333" }}>
        {props.title}
      </span>
      {
        !props.hideButton
          ? (
            <button
            //   label={props.buttonLabel || t('commons:BACK_TO_MAIN_PAGE')}
            //   width='max-content'
            //   containerStyle={{
            //     marginTop: '0.5em',
            //   }}
              onClick={() => {
                try {
                  if (props.buttonOnClick) {
                    props.buttonOnClick()
                  } else {
                    axios.get('/api/profile')
                      .then((res) => {
                        router.back()
                      })
                      .catch(() => {
                        router.back()
                      })
                  }
                } catch (err) { }
              }}
            >TEST</button>
          )
          : null
      }
    </div>
  )
}

export default ErrorComponent
