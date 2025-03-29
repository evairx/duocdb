import type { APIRoute } from "astro";
import { getGrades } from "@/lib/grades";

export const GET: APIRoute = async ({ params, request }) => {
    try {
        const { id } = params;
        const authorization = request.headers.get('Authorization');
        const url = new URL(request.url);
        const section = url.searchParams.get('section');
    
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
    
        if(!section) {
            return new Response(JSON.stringify({
                status: 400,
                error: {
                    code: 'missing_section_parameter',
                }
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 400
            });
        }
    
        const sectionValue = Number(section);
    
        if(isNaN(sectionValue)) {
            return new Response(JSON.stringify({
                status: 400,
                error: {
                    code: 'invalid_section_parameter',
                    message: 'Section must be a valid numeric value'
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
    
        const data = await getGrades(id, sectionValue, token);
        return new Response(JSON.stringify(data), { 
            headers: { 
                "Content-Type": "application/json" 
            } 
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: {
                code: 'internal_server_error',
            }
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};