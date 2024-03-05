import React from 'react';
import styles from "../styles/Home.module.css";
import Head from 'next/head';

const Index = () => {
  return (
    <>
    <Head>
      <title></title>
    </Head>
    <main>
      
    <div className={styles.grid}></div>
      <div className={styles.top}>
      <button className={styles.signin}>Sign in</button>
      <h1>D<i>O</i>OP</h1>
      <p><small>a todo app</small></p>

      <div className={styles.main}>
      <button className={styles.tsk}>Add task</button>
      </div>

      </div>
    
    </main>
    </>
  );
}

export default Index;
