import Link from "next/link";
import { connectDB } from "../../util/database";

export default async function Home() {

  const db = (await connectDB).db("forum") // db명
  let result = await db.collection('post').find().toArray()

  return (
    <div className="main">
      <h1>FORUM</h1>
    </div>
  );
}
