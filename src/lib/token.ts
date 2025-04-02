import { TOKEN_URL, TOKEN_BODY } from "astro:env/server";

export async function getToken() {
    try {
        if(!TOKEN_URL || !TOKEN_BODY) {
            return { error: {}, status: 500 };
        }
        
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

        return { token: data.token, status: 200 };
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
}