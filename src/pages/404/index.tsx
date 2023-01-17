import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Pagina404() {
    return (
        <section className={styles.page404}>
            <h1>404</h1>
            <Image
            src="/images/404.webp"
            alt='Página não encontrada'
            width={902}
            height={400}
            className={styles.image}
            />
            <h3>Parece que você está perdido</h3>
            <p>Essa página não está disponível</p>
            <Link href='/'><button className='btn-primary'>Voltar pro Início</button></Link>
        </section>
    )
}