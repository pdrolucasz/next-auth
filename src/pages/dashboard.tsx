import { GetServerSideProps } from "next"
import { useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { WithSSRAuth } from "../utils/WithSSRAuth"
import { api } from "../services/apiClient"
import { setupApiClient } from "../services/api"
import { useCan } from "../hooks/useCan"
import { Can } from "../components/Can"

export default function Dashboard() {
    const { user, signOut } = useAuthContext()

    const userCanSeeMetrics = useCan({
        permissions: ['metrics.list']
    })

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h1>Dashboard: {user?.email}</h1>

            <button onClick={signOut}>
                Sign Out
            </button>

            <Can permissions={['metrics.list']}>
                <div>Métricas</div>
            </Can>

            {/*userCanSeeMetrics && <div>Métricas</div>*/}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = WithSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
      props: {}
    }
})
