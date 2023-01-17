import styles from './styles.module.scss'
import { GoThumbsup } from "react-icons/go";
import Link from 'next/link';

export default function SupportButton() {
    return(
        <div className={styles.btnSupport}>
            <Link href='/apoie'>
                <button className='btn-primary'>
                    <GoThumbsup />
                    Apoiar
                </button>
            </Link>
        </div>
    )
}