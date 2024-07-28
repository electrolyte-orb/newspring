import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Newspring Debug build</h1>
      <h3>Not for production</h3>
      <Link href="/login">Get started</Link>
    </main>
  );
}
