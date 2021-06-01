import { GetServerSideProps } from "next"
import { useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { WithSSRAuth } from "../utils/WithSSRAuth"
import { api } from "../services/apiClient"
import { setupApiClient } from "../services/api"
import { destroyCookie } from "nookies"

export default function Dashboard() {
    const { user } = useAuthContext()

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <h1>Dashboard: {user?.email}</h1>
    )
}

export const getServerSideProps: GetServerSideProps = WithSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
      props: {}
    }
})
