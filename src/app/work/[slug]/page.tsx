import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { getProjectBySlug, getAllSlugs } from "@/data/projects";
import { CaseStudyContent } from "./CaseStudyContent";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} | The Bot Company`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyContent project={project} />
      <Footer />
    </>
  );
}
