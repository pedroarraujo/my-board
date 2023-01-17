import { signOut, useSession} from 'next-auth/client';
import Link from 'next/link';
import styles from './styles.module.scss'
import { FiX } from "react-icons/fi"

export function SignInButton(){
    const [session] = useSession();

    return session ? (
        <button
        className={styles.btnSession}
        >
            <img src={session.user.image} alt="usuário" />
            Olá, {session.user.name}
            <FiX onClick={() => signOut()}/>
        </button>
    ) : (
        <Link href='/login'>
            <button className='btn-outline'>
                Fazer Login
            </button>
        </Link>
    )
}