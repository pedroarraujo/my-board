import styles from './styles.module.scss';
import Link from 'next/link';
import { useSession} from 'next-auth/client';
import { SignInButton } from '../SignInButton'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function Header() {

    const [active, setActive] = useState(false)
    const router = useRouter()
    const [session] = useSession();

    useEffect(() => {
        setActive(false)
    }, [router])

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerLogo}>
                    <Link href='/'>
                        <img src="/images/logo.svg" alt="Logo do MyBoard" />
                    </Link>
                </div>
                <div className={active ? styles.headerMenuMobile : styles.headerMenu}>
                    <nav>
                        <ul>
                            <li>
                                <Link href='/'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='/board'>
                                    Board
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.headerButtons}>
                        <SignInButton />
                        <Link href='/apoie'>
                            <button className='btn-primary'>
                                Seja um Apoiador
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles.headerHamburguer}>
                    <button className={active ? styles.headerHamburguerOpen : styles.headerHamburguerClosed} onClick={() => { setActive(!active) }}>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </div>
        </header>
    )
}