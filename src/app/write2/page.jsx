export default async function Write2() {

    async function handleSubmit(formData) {
        'use server';
        // console.log(formData)
        // console.log(formData.get('title'))
        const db = (await connectDB).db('forum')
        await db.collection('post_test').insertOne({ title: formData.get('title') })
    }

    return (
        <form action={handleSubmit}>
            <input type="text" name="title" />
            <button type="submit">Submit</button>
        </form>
    );
} 