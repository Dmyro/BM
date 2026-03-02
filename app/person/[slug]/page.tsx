import { notFound } from "next/navigation";
import Link from "next/link";
import { getPersonBySlug, getAllPeople } from "@/lib/people";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const person = getPersonBySlug(params.slug);
  if (!person) return {};
  return {
    title: `${person.name} — Life Stories`,
    description: person.tagline,
  };
}

export default function PersonPage({ params }: Props) {
  const person = getPersonBySlug(params.slug);
  if (!person) notFound();

  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <main className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="border-b border-gray-100 px-6 py-4">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          &larr; All stories
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-2xl mx-auto px-6 pt-16 pb-12">
        {/* Initials avatar */}
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-8">
          <span className="text-lg font-serif text-gray-500">{initials}</span>
        </div>

        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">
          {person.birthplace}
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight">
          {person.name}
        </h1>

        <p className="mt-2 text-base text-gray-400">
          {person.born}
          {person.died ? ` – ${person.died}` : ""}
        </p>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {person.tagline}
        </p>

        {/* Pull quote */}
        <blockquote className="mt-10 border-l-2 border-gray-200 pl-5">
          <p className="font-serif text-xl text-gray-700 italic leading-relaxed">
            &ldquo;{person.quote}&rdquo;
          </p>
        </blockquote>
      </header>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* Chapters / Timeline */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-12">
          Life in Chapters
        </h2>

        <ol className="space-y-0">
          {person.chapters.map((chapter, index) => (
            <li key={index} className="flex gap-8 group">
              {/* Year column */}
              <div className="flex flex-col items-center w-12 flex-shrink-0">
                <span className="text-sm font-medium text-gray-400 tabular-nums">
                  {chapter.year}
                </span>
                {/* Connector line */}
                {index < person.chapters.length - 1 && (
                  <div className="mt-3 w-px flex-1 bg-gray-100 min-h-[2rem]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-12">
                <h3 className="font-serif text-xl text-gray-900 leading-snug mb-3">
                  {chapter.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {chapter.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 text-center">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          &larr; Back to all stories
        </Link>
      </footer>
    </main>
  );
}
