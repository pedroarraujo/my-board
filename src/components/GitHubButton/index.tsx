import { signIn, signOut, useSession} from 'next-auth/client';
import { FaGithub } from "react-icons/fa";

export function GitHubButton(){
    const [session] = useSession();

    return session ? (
        <button
        className='btn-outline'
        onClick={() => signOut()}
        >
            Desconectar
        </button>
    ) : (
        <button
        className='btn-outline'
        onClick={() => signIn('github')}
        >
            <FaGithub />
            Entrar com GitHub
        </button>
    )
}