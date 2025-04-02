import type { APIRoute } from "astro";
import { getStats } from "@/lib/statistic";

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        const authorization = request.headers.get('Authorization');

        if (!authorization) {
            return new Response(JSON.stringify({
                status: 401,
                error: {
                    code: 'authorization_header_missing',
                }
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 401
            });
        }

        if(!id) {
            return new Response(JSON.stringify({
                status: 400,
                error: {
                    code: 'missing_id_parameter',
                }
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({
                status: 400,
                error: {
                    code: 'invalid_authorization_header'
                }
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            });
        }

        const student = await getStats(id, token);
        
        if (!student) {
            return new Response(JSON.stringify({ error: "student not found" }), {
                status: 404,
                headers: { 
                    "Content-Type": "application/json" 
                }
            });
        }
        const planEstudios = student.planesEstudios[0];

        return new Response(JSON.stringify(planEstudios), { 
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