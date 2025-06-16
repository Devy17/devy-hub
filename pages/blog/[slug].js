import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 이건 더더욱 이해못함 젠장할

export default function Post({ title, date, contentHtml }) {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4">
      <div className="prose prose-zinc prose-invert max-w-none">
        <h1>{title}</h1>
        <p className="text-sm text-gray-400">{date}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postPath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContent = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      title: data.title,
      date: data.date,
      contentHtml,
    },
  };
}
