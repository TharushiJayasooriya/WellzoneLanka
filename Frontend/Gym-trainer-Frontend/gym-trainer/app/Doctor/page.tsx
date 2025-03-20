import Link from "next/link";

export default function DoctorPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Back
          </button>
        </Link>
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Doctor Module Coming Soon
        </h2>
        <p className="mb-6 text-gray-700">
          The Doctor module is currently under development. This section will
          allow healthcare professionals to manage patient consultations,
          prescriptions, and health records.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
