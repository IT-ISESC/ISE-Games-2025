import type { APIRoute } from 'astro'
import { db } from '../../firebase/server'

export const GET: APIRoute = async ({ request }) => {
    try {
        const snapshot = await db.collection('matches').get()
        const matches = snapshot.docs.map(
            (doc: { id: any; data: () => any }) => ({
                id: doc.id,
                ...doc.data(),
            })
        )
        return new Response(JSON.stringify(matches), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error("Don't have Matches", error)
        return new Response(
            JSON.stringify({ success: false, message: "Don't have Matches" }),
            { status: 500 }
        )
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const newMatch = await request.json()
        const docRef = await db.collection('matches').add(newMatch)
        return new Response(JSON.stringify({ id: docRef.id, ...newMatch }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error add new match' }), {
            status: 500,
        })
    }
}

export const PATCH: APIRoute = async ({ params, request }) => {
    try {
        const updates = await request.json()
        const matchRef = db.collection('matches').doc(params.id)
        await matchRef.update(updates)

        return new Response(
            JSON.stringify({ message: 'Match updated successfully' }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Match fail to update' }), {
            status: 500,
        })
    }
}

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const matchRef = db.collection('matches').doc(params.id)
        await matchRef.delete()

        return new Response(
            JSON.stringify({ message: 'Match deleted successfully' }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to delete match' }),
            {
                status: 500,
            }
        )
    }
}

//test
