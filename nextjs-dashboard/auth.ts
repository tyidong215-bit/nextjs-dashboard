import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

import { authConfig } from './auth.config';
import type { User } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
    const users = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return users[0];
    } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
    Credentials({
        async authorize(credentials) {
        const parsed = z
            .object({
            email: z.string().email(),
            password: z.string().min(6),
            })
            .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return user;
        },
    }),
    ],
});