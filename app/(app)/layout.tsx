import "../globals.css";
import { redirect } from "next/navigation";
import { getUserBySessionCookieAdminServerSide } from "../../lib/server/getUserBySessionCookieAdminServerSide";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserBySessionCookieAdminServerSide();
  if (user === null || user === undefined) {
    return redirect("/signin");
  }

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
