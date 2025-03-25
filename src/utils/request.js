// Put data here

const collections = [
    { name: 'futsal_female', data: futsal_female },
    { name: 'badminton_male', data: badminton_male },
    { name: 'badminton_female', data: badminton_female },
    { name: 'basketball_male', data: basketball_male },
    { name: 'basketball_female', data: basketball_female },
    { name: 'futsal_male', data: futsal_male },
    { name: 'rov_mixed', data: rov_mixed },
    { name: 'valorant_mixed', data: valorant_mixed },
    { name: 'chairball_female', data: chairball_female },
]

const sendPostRequests = async () => {
    for (let collection of collections) {
        const { name: collectionName, data: matchData } = collection
        if (!matchData || matchData.length === 0) {
            console.log(`No matches found for ${collectionName}`)
            continue
        }
        console.log(`Processing matches for ${collectionName}...`)
        for (let match of matchData) {
            try {
                const documentId = `${match.team1}-${match.team2}-${match.date}`
                const response = await fetch(
                    `http://localhost:4321/api/${collectionName}/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(match),
                    }
                )
                if (response.ok) {
                    const result = await response.json()
                    console.log(
                        `Match posted successfully in ${collectionName}:`,
                        `${match.team1} vs ${match.team2} (ID: ${documentId})`,
                        result
                    )
                } else {
                    const errorResponse = await response.text()
                    console.error(
                        `Failed to post match in ${collectionName}:`,
                        `${match.team1} vs ${match.team2} (ID: ${documentId})`,
                        response.status,
                        errorResponse
                    )
                }
            } catch (error) {
                console.error(
                    `Error sending POST request for match in ${collectionName}:`,
                    `${match.team1} vs ${match.team2}`,
                    error.message
                )
                if (error.stack) {
                    console.error('Stack Trace:', error.stack)
                }
            }
        }
    }
}

sendPostRequests()
