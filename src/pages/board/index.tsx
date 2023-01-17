import Head from "next/head";
import { GetServerSideProps } from "next";
import { useState, FormEvent } from "react";
import { getSession } from "next-auth/client";
import firebase from "../../services/firebaseConnection";
import Link from "next/link";

import styles from "./styles.module.scss";
import SupportButton from "../../components/SupportButton";
import { FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RevealWrapper } from "next-reveal";

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  userId: string;
  name: string;
};

interface BoardProps {
  user: {
    name: string;
    id: string;
    donater: boolean;
    lastDonate: string | Date;
  };
  data: string;
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState("");
  const [inputEmptyAlert, setInputEmptyAlert] = useState(null);
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

  function handleInputChange(e) {
    setInput(e.target.value);
    setInputEmptyAlert(null);
  }

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    setInputEmptyAlert(null);

    if (input === "") {
      setInputEmptyAlert(true);
      return;
    }

    // esse evento será disparado caso o usuário for editar uma tarefa já existente
    if (taskEdit) {
      await firebase
        .firestore()
        .collection("tasks")
        .doc(taskEdit.id)
        .update({
          task: input,
        })
        .then(() => {
          let data = taskList;
          let taskIndex = taskList.findIndex((item) => item.id === taskEdit.id);
          data[taskIndex].task = input;
        })
        .then(() => {
          handleCancelEdit();
        });

      return;
    }

    // Adicionar tarefa no banco de dados
    await firebase
      .firestore()
      .collection("tasks")
      .add({
        created: new Date(),
        task: input,
        userId: user.id,
        name: user.name,
      })
      .then((doc) => {
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), "dd MMM yyy"),
          task: input,
          userId: user.id,
          name: user.name,
        };
        setTaskList([...taskList, data]);
        setInput("");
      })
      .catch((err) => {
        console.log("Erro ao cadastrar:", err);
      });
  }

  // botão de excluir tarefa
  async function handleDeleteTask(id: string) {
    await firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        let taskDelete = taskList.filter((item) => {
          return item.id !== id;
        });

        setTaskList(taskDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // editar uma tarefa
  async function handleEditTask(task: TaskList) {
    setTaskEdit(task);
    setInput(task.task);
  }

  // cancelar uma edição de tarefa
  function handleCancelEdit() {
    setInput("");
    setTaskEdit(null);
  }

  return (
    <>
      <Head>
        <title>Minhas Tarefas | MyBoard</title>
      </Head>
      <main className="container">
        <div className={styles.content}>
          <h1>Board</h1>

          {taskEdit && (
            <div className={styles.editingTask}>
              <FiX onClick={handleCancelEdit} />
              Você está editando essa tarefa.
            </div>
          )}
          <form onSubmit={handleAddTask}>
            <input
              placeholder="Insira sua tarefa aqui..."
              type="text"
              value={input}
              onChange={handleInputChange}
              className={taskEdit && styles.InputEditingTask}
            />
            <div>
              <span
                className={
                  inputEmptyAlert == true
                    ? styles.inputEmptyAlertVisible
                    : styles.inputEmptyAlertHidden
                }
              >
                Insira alguma tarefa.
              </span>
              <button className="btn-primary">
                {taskEdit === null ? "Adicionar Tarefa" : "Atualizar Tarefa"}
                <FaPlus />
              </button>
            </div>
          </form>

          <div className={styles.tasks}>
            <h2>
              {taskList.length == 0
                ? "Nenhuma tarefa adicionada"
                : `Você tem ${taskList.length} ${
                    taskList.length == 1 ? "nova tarefa!" : "novas tarefas!"
                  }`}
            </h2>

            <section>
              <RevealWrapper
                className="load-hidden"
                origin="bottom"
                delay={200}
                duration={1000}
                distance="100px"
                reset={true}
                viewOffset={{ top: 25, right: 0, bottom: 10, left: 0 }}
              >
                {taskList.map((task) => (
                  <article key={task.id} className={styles.task}>
                    <Link href={`/board/${task.id}`}>
                      <p>{task.task}</p>
                    </Link>

                    <div className={styles.actions}>
                      <div>
                        <div>
                          <FiCalendar />
                          <time>{task.createdFormated}</time>
                        </div>

                        <button
                          onClick={() => handleEditTask(task)}
                          className={styles.btnEdit}
                        >
                          <FiEdit2 />
                          <span>Editar</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className={styles.btnDelete}
                      >
                        <FiTrash />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </article>
                ))}
              </RevealWrapper>
            </section>

            {user.donater && (
              <div className={styles.apoiador}>
                <h3>Obrigado por apoiar esse projeto!</h3>
                <div>
                  <FiClock />
                  <time>
                    Última doação feita a{" "}
                    {formatDistance(new Date(user.lastDonate), new Date(), {
                      locale: ptBR,
                    })}
                  </time>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <SupportButton />
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

  // vamos pegar as tarefas do banco de dados
  const tasks = await firebase
    .firestore()
    .collection("tasks")
    .where("userId", "==", session?.id)
    .orderBy("created", "asc")
    .get();
  const data = JSON.stringify(
    tasks.docs.map((info) => {
      return {
        id: info.id,
        createdFormated: format(info.data().created.toDate(), "dd MMM yyy"),
        ...info.data(),
      };
    })
  );

  // vamos enviar via prop as informações do usuário logado
  const user = {
    name: session?.user.name,
    id: session?.id,
    donater: session?.donater,
    lastDonate: session?.lastDonate,
  };

  return {
    props: {
      user,
      data,
    },
  };
};
