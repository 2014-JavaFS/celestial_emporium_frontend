import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_MIN_BREAKPOINT } from 'react-bootstrap/esm/ThemeProvider';

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

interface UserProfileProps {
    userIdNumber: number;
    currentUserIdNumber: number;
}

const UserProfile: React.FC<UserProfileProps> = ({userIdNumber, currentUserIdNumber}) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assuming you have an endpoint like '/api/user/profile' for getting the logged-in user's profile
                const response = await axios.get<UserProfile>(`http://localhost:8080/profiles/${userIdNumber}`);
                setProfile(response.data);
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (formData) {
            setFormData({...formData, [name]: value});
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            await axios.patch(`http://localhost:8080/profiles/${userIdNumber}`, formData);
            setProfile(formData);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating user profile');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div>
        <h1>User Profile</h1>
        {isEditing && profile && currentUserIdNumber === userIdNumber ? (
            
            <form onSubmit={handleSubmit}>
                {/* <p><strong>First Name:</strong> {profile?.firstName}</p>
                <p><strong>Last Name:</strong> {profile?.lastName}</p> */}
                <label>First Name: 
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData?.firstName || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Last Name: 
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData?.lastName || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Bio: 
                    <input 
                        type="text" 
                        name="bio" 
                        value={formData?.bio || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Birthday: 
                    <input 
                        type="text" 
                        name="birthday" 
                        value={formData?.birthday || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Location: 
                    <input 
                        type="text" 
                        name="location" 
                        value={formData?.location || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Class: 
                    <input 
                        type="text" 
                        name="playerClass" 
                        value={formData?.playerClass || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Background: 
                    <input 
                        type="text" 
                        name="background" 
                        value={formData?.background || ''} 
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type='submit'>Save</button>
                <button type='button' onClick={handleEditToggle}>Cancel</button>
            </form>
        ) : (
            <div>
                <p><strong>First Name:</strong> {profile?.firstName}</p>
                <p><strong>Last Name:</strong> {profile?.lastName}</p>
                <p><strong>Bio:</strong> {profile?.bio}</p>
                <p><strong>Birthday:</strong> {profile?.birthday}</p>
                <p><strong>Location:</strong> {profile?.location}</p>
                <p><strong>Class:</strong> {profile?.playerClass}</p>
                <p><strong>Background:</strong> {profile?.background}</p>
                {currentUserIdNumber === userIdNumber && (
                    <button onClick={handleEditToggle}>
                        {isEditing? 'Cancel' : 'Edit'}
                    </button>
                )}
            </div>

        )}
        {/* <div className="user-profile">
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
        </div> */}
        </div>
        </>
        
    );
};

export default UserProfile;