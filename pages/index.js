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
          <code className={styles.code}>Astrophysicist / Senior staff software engineer @ Cloudera</code>
        </p>

        <div className={styles.grid}>
          <a href="https://www.linkedin.com/in/guillermokardolus/" className={styles.card}>
            <h3>LinkedIn &rarr;</h3>
            <p>Cloudera, Spotify, Bison Trails (Coinbase), Pivotal (VMware), BlackRock, Gap and a few startups.</p>
          </a>

          <a href="https://github.com/kardolus" className={styles.card}>
            <h3>GitHub &rarr;</h3>
            <p>Core cloud native buildpack and VMware Tanzu contributor.<br></p>
          </a>

        </div>
      </main>
    </div>
  )
}
