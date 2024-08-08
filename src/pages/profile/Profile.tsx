import './Profile.css'
import UserProfile from '../../components/profile/profile';
import parseJwt from '../../util/parseJwt';
import { useEffect, useState } from 'react';

function Profile() {

    const [userId, setUserId] = useState(0);

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

        }
    }, [])
    return (
        <main>

            <UserProfile userIdNumber={userId} currentUserIdNumber={userId} />

        </main>           

    )
}

export default Profile;