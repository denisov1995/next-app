import { User } from "../types/User";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
/**
 * Fetches user data from the server.
 * @param id The user ID to fetch.
 * @returns The user data, or null if the request failed.
 */
export async function fetchUserData(id: string): Promise<User | null> {
    const res = await fetch(`${apiUrl}/users/${id}`);

    if (!res.ok) {
        return null;
    }

    const { user }: { user: User } = await res.json();
    return user;
}
