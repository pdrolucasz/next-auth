import { GetServerSideProps } from "next"
import { WithSSRAuth } from "../utils/WithSSRAuth"
import { setupApiClient } from "../services/api"
import decode from 'jwt-decode'

export default function Dashboard() {
    return (
        <div>
            <h1>Metrics</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = WithSSRAuth(async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get('/me')

    return {
      props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
})
