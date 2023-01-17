import { GetStaticProps } from "next";

import Head from "next/head";
import { useState } from "react";
import firebase from "../services/firebaseConnection";
import { RevealWrapper } from "next-reveal";
import Image from "next/image";
import styles from "../styles/styles.module.scss";

interface HomeProps {
  data: string;
}

type Data = {
  id: string;
  donate: boolean;
  lasDonate: Date;
  image: string;
};

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.homeContent}>
        <section className="container d-flex flex-column flex-row__md align-items-center">
          <div className="w-100 w-50__md">
            <div className={styles.homeTexts}>
              <RevealWrapper
                className="load-hidden"
                origin="bottom"
                delay={500}
                duration={1000}
                distance="100px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
              >
                <div className="text-center__sm ">
                  <span>100% GRATUITA</span>
                </div>
              </RevealWrapper>

              <RevealWrapper
                className="load-hidden"
                origin="bottom"
                delay={200}
                duration={1000}
                distance="100px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
              >
                <div className="headline">
                  <h1 className="text-center__sm">
                    Uma ferramenta para organizar o seu dia
                  </h1>
                </div>
              </RevealWrapper>

              <RevealWrapper
                className="load-hidden"
                origin="bottom"
                delay={350}
                duration={1000}
                distance="100px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
              >
                <p className="text-center__sm ">
                  Escreva, planeje e organize-se.
                </p>
              </RevealWrapper>

              <div className={styles.homeApoiadores}>
                {donaters.length !== 0 && <p>Apoiadores:</p>}

                <div>
                  {donaters.map((u) => (
                    <img key={u.image} src={u.image} alt="doador do Board" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 w-50__md">
            <Image
              src="/images/hero-image.webp"
              alt="Ferramenta Board Gratuita"
              width={700}
              height={579}
              className={styles.heroImage}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const donaters = await firebase.firestore().collection("users").get();

  const data = JSON.stringify(
    donaters.docs.map((donater) => {
      return {
        id: donater.id,
        ...donater.data(),
      };
    })
  );

  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // atualiza a cada 60 minutos
  };
};
