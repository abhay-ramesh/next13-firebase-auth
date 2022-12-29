export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js 13{" "}
          </a>
          <a className="px-2 text-white bg-teal-400 rounded-md">with</a>
          <a className="text-red-500"> Sanity!</a>
        </h1>
      </main>
    </div>
  );
}
