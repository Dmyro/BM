import Link from "next/link";
import { getAllPeople } from "@/lib/people";

export default function Home() {
  const people = getAllPeople();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 px-6 py-24 text-center">
        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-6">
          Life Stories
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl text-gray-900 leading-tight max-w-2xl mx-auto">
          Every lifEe has a story worth telling.
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
          Not an obituary. Not a tribute. A real account of a real life —
          in chapters.
        </p>
      </section>

      {/* People list */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-10">
          Stories
        </h2>

        <ul className="space-y-px">
          {people.map((person) => (
            <li key={person.slug}>
              <Link
                href={`/person/${person.slug}`}
                className="group flex items-start justify-between py-7 border-t border-gray-100 hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-xl font-serif text-gray-900 group-hover:text-black transition-colors">
                      {person.name}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {person.born}
                      {person.died ? `\u2013${person.died}` : ""}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {person.tagline}
                  </p>
                </div>
                <span className="ml-8 mt-1 text-gray-300 group-hover:text-gray-500 transition-colors text-lg flex-shrink-0">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {people.length === 0 && (
          <p className="text-gray-400 text-sm">No stories yet.</p>
        )}
      </section>
    </main>
  );
}
