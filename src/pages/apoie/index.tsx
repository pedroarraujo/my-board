import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import firebase from "../../services/firebaseConnection";
import styles from "./styles.module.scss";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Image from "next/image";
import { RevealWrapper } from "next-reveal";

interface DonateProps {
  user: {
    name: string;
    id: string;
    image: string;
  };
}

export default function Apoie({ user }: DonateProps) {
  const [apoiador, setApoiador] = useState(false);

  async function handleSaveDonate() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image,
      })
      .then(() => {
        setApoiador(true);
      });
  }

  console.log(user.image);

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.content}>
        <section className="container d-flex flex-column flex-row__md align-items-center">
          <div className="w-100 w-50__md">
            <div className={styles.texts}>
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
                  <span>Seja um Apoiador</span>
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
                  <h1 className="text-center__sm">Seja um apoiador do Board</h1>
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
                  Seu apoio é muito importante para esse projeto.
                </p>
              </RevealWrapper>
              {apoiador && (
                <div className={styles.apoiador}>
                  <img src={user.image} alt="apoiador do Board" />{" "}
                  <p>Obrigado por apoiar esse projeto, {user.name}!</p>
                </div>
              )}
              <div className={styles.buttons}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "1",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handleSaveDonate();
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-100 w-50__md">
            <Image
              src="/images/apoie.webp"
              alt="Ferramenta Board gratuita"
              className={styles.heroImage}
              width={759}
              height={650}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // usuários não logados serão redirecionados
  if (!session?.id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // vamos enviar via prop as informações do usuário logado
  const user = {
    name: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: {
      user,
    },
  };
};
