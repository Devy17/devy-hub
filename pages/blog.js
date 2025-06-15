import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 아직 이거 이해 못함 나중에 천천히 해보자

export default function Blog({ posts }) {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">블로그 글 목록</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border p-4 rounded hover:bg-zinc-800">
            <a href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-zinc-400">{post.date}</p>
              <p className="text-zinc-200">{post.summary}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(/\.md$/, ""),
      ...data,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
