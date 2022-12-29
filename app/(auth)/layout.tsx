import "../globals.css";
import { redirect } from "next/navigation";
import { getUserBySessionCookieAdminServerSide } from "../../lib/server/getUserBySessionCookieAdminServerSide";
import GoogleOneTap from "../../components/GoogleOneTap";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserBySessionCookieAdminServerSide();
  if (user !== null && user !== undefined) {
    return redirect("/dashboard");
  }

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* <GoogleOneTap showButton={true} /> */}
        <div className="flex flex-col items-center justify-center w-4/5 py-6 mx-auto my-8 border-2 border-white border-solid rounded-lg shadow-xl bg-zinc-800 shadow-zinc-900 sm:px-6 sm:max-w-sm">
          {children}
        </div>
      </body>
    </html>
  );
}
