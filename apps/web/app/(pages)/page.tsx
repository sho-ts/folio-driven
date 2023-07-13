import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <div>
        <p>Hello World</p>
        <Link href='/login'>login</Link>
      </div>
    </main>
  );
}
