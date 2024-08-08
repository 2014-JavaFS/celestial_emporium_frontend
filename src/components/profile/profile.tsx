import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
    profileId: number;
    firstName: string;
    lastName: string;
    bio: string;
    birthday: string;
    location: string;
    playerClass: string;
    background: string;
}

interface ProfileProps {
    userIdNumber: number;
}

const UserProfile: React.FC<ProfileProps> = ({userIdNumber}) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assuming you have an endpoint like '/api/user/profile' for getting the logged-in user's profile
                const response = await axios.get<UserProfile>(`http://localhost:8080/profiles/${userIdNumber}`);
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profile">
            {profile ? (
                <div className="profile-details">
                    <h1>{profile.firstName}'s Profile</h1>
                    <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Class:</strong> {profile.playerClass}</p>
                    <p><strong>Background:</strong> {profile.background}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default UserProfile;