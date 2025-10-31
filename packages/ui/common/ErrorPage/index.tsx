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
              style={{padding:'1.5rem', 'width': '150px', background: '#f3f3f3', borderRadius: '2rem', border: 'none', cursor: 'pointer', transition: 'all 0.25s'}}
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
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e6e6e6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f3f3f3")}
            >BACK</button>
          )
          : null
      }
    </div>
  )
}

export default ErrorComponent
