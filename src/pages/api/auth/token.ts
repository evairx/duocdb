import type { APIRoute } from "astro";
import { getToken } from "@/lib/token";

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const token = await getToken();
        
        if (!token) {
            return new Response(JSON.stringify({ error: "Token not found" }), {
                status: 404,
                headers: { 
                    "Content-Type": "application/json" 
                }
            });
        }
        return new Response(JSON.stringify(token), { 
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch token" }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json" 
            }
        });
    }
}