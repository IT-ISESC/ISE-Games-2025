export async function getStaticPaths() {
    return [
        { params: { collectionName: 'futsal_male' } },
        { params: { collectionName: 'futsal_female' } },
        { params: { collectionName: 'basketball_male' } },
        { params: { collectionName: 'basketball_female' } },
        { params: { collectionName: 'chairball_female' } },
        { params: { collectionName: 'futsal_male_score' } },
        { params: { collectionName: 'futsal_female_score' } },
        { params: { collectionName: 'basketball_male_score' } },
        { params: { collectionName: 'basketball_female_score' } },
        { params: { collectionName: 'chairball_female_score' } },
        { params: { collectionName: 'badminton_male' } },
        { params: { collectionName: 'badminton_female' } },
        { params: { collectionName: 'rov_mixed' } },
        { params: { collectionName: 'valorant_mixed' } },
    ]
}

import type { APIRoute } from 'astro'
import { getFirestore } from 'firebase-admin/firestore'
import { app } from '../../firebase/server.ts'

const db = getFirestore(app)

export const GET: APIRoute = async ({ params }) => {
    const { collectionName } = params
    try {
        const snapshot = await db.collection(collectionName).get()
        const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        return new Response(JSON.stringify(items), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error(`Error fetching ${collectionName}`, error)
        return new Response(
            JSON.stringify({
                success: false,
                message: `Failed to fetch ${collectionName}`,
            }),
            { status: 500 }
        )
    }
}

export const POST: APIRoute = async ({ request, params }) => {
    const { collectionName, documentId } = params

    try {
        // Parse the incoming match data
        const newMatch = await request.json()

        // If a documentId is provided in the path, use it
        if (documentId) {
            // Validate that the documentId matches the match data
            const generatedDocumentId = `${newMatch.team1}-${newMatch.team2}-${newMatch.date}`

            // Optional: Validate that the provided documentId matches the generated one
            if (documentId !== generatedDocumentId) {
                return new Response(
                    JSON.stringify({
                        error: 'Document ID does not match the generated ID from match data',
                        expectedId: generatedDocumentId,
                        providedId: documentId,
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
            }

            // Add the document with the specific ID
            const docRef = await db
                .collection(collectionName)
                .doc(documentId)
                .set(newMatch)

            return new Response(
                JSON.stringify({
                    id: documentId,
                    ...newMatch,
                }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        } else {
            // If no documentId is provided, use the default auto-generated ID
            const docRef = await db.collection(collectionName).add(newMatch)

            return new Response(
                JSON.stringify({
                    id: docRef.id,
                    ...newMatch,
                }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }
    } catch (error) {
        console.error('Error adding new match:', error)

        return new Response(
            JSON.stringify({
                error: 'Error adding new match',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
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
