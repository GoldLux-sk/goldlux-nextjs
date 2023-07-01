import { cookies } from "next/headers";

export default function getSession() {
    const token = cookies().get('payload-token');

    if (!token) {
        return {
            isLoggedIn: false,
            token: null,
        };
    }

    if (token?.value !== '') {
        return {
            isLoggedIn: true,
            token,
        };
    } else {
        return {
            isLoggedIn: false,
            token: null,
        };
    }

}