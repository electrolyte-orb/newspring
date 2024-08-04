import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Newspring: Nextjs
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Connect in new ways, faster and safer with Newspring.
      </p>
      <Link href="/login">
        <Button className="mt-4">Get started</Button>
      </Link>
    </main>
  );
}
