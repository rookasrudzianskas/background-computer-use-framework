import type { Metadata } from "next";
import { editorialPages, legalPages } from "@/lib/site-data";
import { BenchPage } from "@/components/bench-page";
import { BlogPage } from "@/components/blog-page";
import { DocsPage } from "@/components/docs-page";
import { DriverPage } from "@/components/driver-page";
import { EditorialRoute, NotFoundRoute } from "@/components/editorial-route";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const root = slug[0];
  const page = editorialPages[root] ?? legalPages[root];
  if (page) return { title: page.title, description: page.intro };
  if (root === "cua-driver") return { title: "Cua Driver", description: "Background computer-use for native desktop applications." };
  if (root === "cuabench") return { title: "Cua-Bench", description: "Benchmark computer-use agents with verifiable desktop and mobile tasks." };
  if (root === "docs") return { title: "Documentation", description: "Build computer-use agents with Cua." };
  if (root === "blog") return { title: "Blog" };
  if (root === "changelog") return { title: "Changelog" };
  return { title: "Page not found" };
}

export default async function DynamicRoute({ params }: Props) {
  const { slug } = await params;
  const root = slug[0];
  const page = editorialPages[root] ?? legalPages[root];
  if (page) return <EditorialRoute page={page} />;
  if (root === "cua-driver") return <DriverPage />;
  if (root === "cuabench") return <BenchPage subpage={slug[1]} />;
  if (root === "docs") return <DocsPage slug={slug} />;
  if (root === "blog") return <BlogPage />;
  if (root === "changelog") return <BlogPage changelog />;
  return <NotFoundRoute />;
}

