export default async function handler(request, response) {
    const date = Date()

    response.status(200).json(date)
}