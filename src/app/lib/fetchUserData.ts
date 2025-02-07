import { User } from "../types/User";

export async function fetchUserData(id: string): Promise<User | null> {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    if (!res.ok) {
        return null;
    }
    const { user } = await res.json();
    return user;
}
