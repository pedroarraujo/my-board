import Head from "next/head";
import styles from "./styles.module.scss";
import { GitHubButton } from "../../components/GitHubButton";
import { RevealWrapper } from "next-reveal";

export default function Login() {
  return (
    <>
      <Head>
        <title>Área de Login | MyBoard</title>
      </Head>
      <main className={styles.content}>
        <div className={styles.contentLogin}>
          <RevealWrapper
            className="load-hidden"
            origin="bottom"
            delay={500}
            duration={1000}
            distance="100px"
            reset={true}
            viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
          >
            <div className={styles.contentLoginInside}>
              <h1>Bem-vindo ao MyBoard</h1>
              <p>Crie ou acesse sua conta abaixo.</p>
              <GitHubButton />
            </div>
          </RevealWrapper>
        </div>
        <div className={styles.contentImage}></div>
      </main>
    </>
  );
}
