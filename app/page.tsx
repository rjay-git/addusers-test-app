import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to User Management
        </h1>
        <p className="text-xl text-gray-600 max-w-md">
          Manage your users with ease. View all users and create new ones.
        </p>
        <Link
          href="/users"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200 text-lg"
        >
          View Users
        </Link>
      </main>
    </div>
  );
}
