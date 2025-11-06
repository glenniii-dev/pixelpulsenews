export type Newsletter = {
  id: number;
  date: string;
  title: string;
  edition: string;
  isPublished: boolean;
};

export async function getPublishedNewsletters(): Promise<Newsletter[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/newsletters`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to load newsletters: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.newsletters.filter((n: Newsletter) => n.isPublished);
  } catch (err) {
    console.error("Newsletter fetch error:", err);
    return [];
  }
}