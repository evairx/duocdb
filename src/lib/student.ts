export async function getStudent(id: string, token: string): Promise<{ token: string } | null> {
    try {
        const response = await fetch(
            `${import.meta.env.STUDENT_URL}/${id}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        if (!response.ok) {
           console.log('Error response:', response);
           return null;
        }

        const data = await response.json()

        return data;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
}