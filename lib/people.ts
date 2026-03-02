import peopleData from "@/data/people.json";

export type Chapter = {
  year: string;
  title: string;
  body: string;
};

export type Person = {
  slug: string;
  name: string;
  born: string;
  died?: string;
  birthplace: string;
  tagline: string;
  quote: string;
  chapters: Chapter[];
};

export function getAllPeople(): Person[] {
  return peopleData as Person[];
}

export function getPersonBySlug(slug: string): Person | undefined {
  return (peopleData as Person[]).find((p) => p.slug === slug);
}
