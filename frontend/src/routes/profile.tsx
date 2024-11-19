import { useAuthStore } from '../hooks/store/auth-store'

type Props = {}

export default function profile({}: Props) {
    const accessToken = useAuthStore((state) => state.accessToken);
    console.log("accessToken", accessToken);
    if (!accessToken) {
        return (
            <div>
                <h1>Log in to see your profile</h1>
            </div>
        ) 
    }
  return (
    <div>profile</div>
  )
}