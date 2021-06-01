import { GetServerSideProps } from 'next'
import { FormEvent, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'
import { WithSSRGuest } from '../utils/WithSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuthContext()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <button type="submit">
        Entrar
      </button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = WithSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
