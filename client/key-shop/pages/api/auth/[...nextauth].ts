import NextAuth, { User } from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import http from 'http'

interface UserData {
	id: number,
	name: 'string',
	email: 'string'
}

function makeRequest(credentials: Record<"username" | "password", string>): Promise<UserData> {
	return new Promise((resolve, reject) => {
		const params = `${JSON.stringify({ password: credentials.password, username: credentials.username })}`
		http.get(`http://localhost:3001/signin?credentials=${params}`, (resp) => {
			let data = '';

			// A chunk of data has been received.
			resp.on('data', (chunk) => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				resolve(JSON.parse(data) as UserData);
			});
		}).on("error", (err) => {
			reject(err)
		});
	})
}

export default NextAuth({
	providers: [
		CredentialProvider({
			name: 'credentials',
			credentials: {
				username: { label: "Email", type: "email", placeholder: "testemail@mail.ru" },
				password: { label: "Password", type: "password" }
			},
			authorize: async (credentials) => {
				if(credentials) {
					const result = await makeRequest(credentials)
					return {
						id: result.id,
						name: result.name,
						email: result.email
					}
				} else {
					return null
				}
			}
		})
	],
	callbacks: {
		session({ session, token, user }) {
			return session // The return type will match the one returned in `useSession()`
		},
	},
})