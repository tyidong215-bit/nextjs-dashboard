import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
    signIn: '/login',
    },

callbacks: {
    authorized({ auth, request: { nextUrl } }) {
    const isLoggedIn = !!auth?.user;

    const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    const isOnLogin = nextUrl.pathname.startsWith('/login');

    // 1) ダッシュボードは未ログインなら弾く
    if (isOnDashboard) {
        return isLoggedIn;
    }

    // 2) /login は常に表示OK（ログアウト直後のループ回避）
    if (isOnLogin) {
        return true;
    }

    // 3) それ以外は、ログイン済みならダッシュボードへ
    if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
    }

    return true;
    },
},

    providers: [],
} satisfies NextAuthConfig;