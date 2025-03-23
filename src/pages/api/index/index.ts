import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify([
            {
                team1: 'ICE',
                team2: 'AI',
                score1: 2,
                score2: 1,
                date: '14/03/2025',
                week: 1,
                location: 'Chula',
            },
            {
                team1: 'NANO',
                team2: 'AERO',
                score1: 3,
                score2: 2,
                date: '15/03/2025',
                week: 1,
                location: 'Bangkok Arena',
            },
            {
                team1: 'SEMI',
                team2: 'ADME',
                score1: 1,
                score2: 1,
                date: '16/03/2025',
                week: 1,
                location: 'Tech Stadium',
            },
            {
                team1: 'AI',
                team2: 'NANO',
                score1: 0,
                score2: 2,
                date: '17/03/2025',
                week: 2,
                location: 'Chula',
            },
            {
                team1: 'AERO',
                team2: 'SEMI',
                score1: 4,
                score2: 3,
                date: '18/03/2025',
                week: 2,
                location: 'Innovation Field',
            },
            {
                team1: 'ADME',
                team2: 'ICE',
                score1: 1,
                score2: 3,
                date: '19/03/2025',
                week: 2,
                location: 'Bangkok Arena',
            },
            {
                team1: 'NANO',
                team2: 'SEMI',
                score1: 2,
                score2: 2,
                date: '20/03/2025',
                week: 3,
                location: 'Tech Stadium',
            },
            {
                team1: 'ICE',
                team2: 'AERO',
                score1: 0,
                score2: 1,
                date: '21/03/2025',
                week: 3,
                location: 'Chula',
            },
            {
                team1: 'AI',
                team2: 'ADME',
                score1: 3,
                score2: 0,
                date: '22/03/2025',
                week: 3,
                location: 'Innovation Field',
            },
            {
                team1: 'SEMI',
                team2: 'ICE',
                score1: 2,
                score2: 3,
                date: '23/03/2025',
                week: 4,
                location: 'Bangkok Arena',
            },
        ]),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    )
}
