'use client'

import { useSession } from "next-auth/react";

const UserProfilePage = ({ params }: { params: { username: string } }) => {
    const { data: session } = useSession();

    return (
        <div>UserProfilePage for: {params.username}
            <br />
            <a target="_blank" href={`http://localhost:3001/?token=${session?.user.token}`}>
                aboba
            </a>

        </div>
    )
}

export default UserProfilePage