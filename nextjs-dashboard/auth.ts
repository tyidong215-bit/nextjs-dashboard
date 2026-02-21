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
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
    } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
  // 念のため明示（.env.local に AUTH_SECRET があってもOKだけど、これで MissingSecret を潰せる）
    secret: process.env.AUTH_SECRET,
    providers: [
    Credentials({
        async authorize(credentials) {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;

        return null;
        },
    }),
    ],
});