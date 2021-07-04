import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Guillermo Kardolus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Guillermo Kardolus
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Astrophysicist | Senior Software Engineer @ Spotify</code>
        </p>

        <div className={styles.grid}>
          <a href="https://www.linkedin.com/in/guillermokardolus/" className={styles.card}>
            <h3>LinkedIn &rarr;</h3>
            <p>My professional identity. Let's get connected.</p>
          </a>

          <a href="https://github.com/kardolus" className={styles.card}>
            <h3>Github &rarr;</h3>
            <p>Core cloud native buildpack and VMware Tanzu contributor.</p>
          </a>

        </div>
      </main>
    </div>
  )
}
