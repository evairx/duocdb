import { TOKEN_URL, TOKEN_BODY } from "astro:env/server";

export async function getToken() {
    try {
        const response = await fetch(`${TOKEN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: TOKEN_BODY,
                })
            }
        );
        
        if (!response.ok) {
           console.log('Error response:', response);
           return null;
        }

        const data = await response.json()

        return { token: data.token };
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
}