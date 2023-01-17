import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";
import styles from "./task.module.scss";
import Head from "next/head";
import Link from "next/link";
import { MdOutlineCalendarToday, MdKeyboardBackspace } from "react-icons/md";
import SupportButton from "../../components/SupportButton";
import { RevealWrapper } from "next-reveal";

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
};

interface TaskListProps {
  data: string;
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task;
  return (
    <>
      <Head>
        <title>{task.task}</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.actions}>
          <div className={styles.btnBack}>
            <button className="btn-outline">
              <Link href="/board">
                <MdKeyboardBackspace /> Voltar para lista de Tarefas
              </Link>
            </button>
          </div>
          <div className={styles.dateCreated}>
            <MdOutlineCalendarToday /> Tarefa criada em {task.createdFormated}
          </div>
        </div>
        <RevealWrapper
          className="load-hidden"
          origin="bottom"
          delay={500}
          duration={1000}
          distance="100px"
          reset={true}
          viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
        >
          <div className={styles.content}>{task.task}</div>
        </RevealWrapper>

        <SupportButton />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;
  const session = await getSession({ req });

  // se o usuário não estiver logado será redirecionado
  if (!session?.id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // retorna as informações da tarefa
  const data = await firebase
    .firestore()
    .collection("tasks")
    .doc(String(id))
    .get()
    .then((snapshot) => {
      const data = {
        id: snapshot.id,
        create: snapshot.data().created,
        createdFormated: format(
          snapshot.data().created.toDate(),
          "dd MMMM yyyy"
        ),
        task: snapshot.data().task,
        userId: snapshot.data().userId,
        name: snapshot.data().name,
      };

      return JSON.stringify(data);
    })
    .catch(() => {
      return {};
    });

  // redirecionar o usuário pro board se a tarefa acessada não existe
  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
