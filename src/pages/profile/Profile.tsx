import './Profile.css'
import UserProfile from '../../components/profile/profile';
import parseJwt from '../../util/parseJwt';
import { useEffect, useState } from 'react';

function Profile() {

    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) {
            const decodedToken = parseJwt(token)
            if (decodedToken) {
                const decodedToken = parseJwt(token);
                if (decodedToken) {
                    decodedToken.userId;
                    setUserId(decodedToken.userId)
                    console.log(decodedToken)
                }
            }
            setLoading(false);
        }
    }, [])
    if(loading) return <div>Loading...</div>

    return (
        <main>
            <UserProfile userIdNumber={userId} currentUserIdNumber={userId}/>
        </main>           

    )
}

export default Profile;