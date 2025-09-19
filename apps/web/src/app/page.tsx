'use client';
import Image, { type ImageProps } from "next/image";
// import { Button } from 'ui/components/button'
import styles from "./page.module.css";
import withAuthenticated from "../hocs/with-auth-hoc";
// import { useAppDispatch } from "ui/store/hooks";
import { useRouter } from 'next/navigation'

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};


 function Home() {
  const router = useRouter()
  return (
    <div style={{backgroundColor:'#fff', width: '100%'}}>
          <button onClick={()=> router.push('/login')}>
          Navigate to Test
        </button>
      <main className={styles.main}>
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <button  className={styles.secondary}>
          Open alert
        </button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>
      </footer>
  
    </div>
  );
}

export default withAuthenticated(Home)
