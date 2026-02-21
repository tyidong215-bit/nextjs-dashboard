import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
    signIn: '/login',
    },
    callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

        if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 未ログインは /login へ
        } else if (isLoggedIn) {
        // ログイン済みで /login 等に来たら /dashboard へ
        return Response.redirect(new URL('/dashboard', nextUrl));
        }

        return true;
    },
    },
    providers: [],
} satisfies NextAuthConfig;