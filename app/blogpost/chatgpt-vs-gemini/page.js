import fs from "fs";
import matter from "gray-matter";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import OnThisPage from "@/components/onThisPage";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export default async function page({ params }) {
  // const blog = {
  //   title : "C Tutorials in Hindi",
  //   author: "John Doe",
  //   description: "A comprehensive guide to modern web development.",
  //   date: "October 10, 2023",
  //   content: "<p>This is the content of the blog post.</p>",
  // };

  const filePath = `content/chatgpt-vs-gemini.md`;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  let blog = data;

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: "👋🌍" })
    .use(rehypeFormat)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .use(rehypePrettyCode, {
      theme: "github-dark-default",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    });

  const htmlContent = (await processor.process(content)).toString();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">
        &quot;{blog.description}&quot;
      </p>
      <div className="flex gap-2">
        <p className="text-base text-gray-500 mb-4 italic">By {blog.author}</p>
        <p className="text-base text-gray-500 mb-4">{blog.date}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="prose dark:prose-invert"
      ></div>
      <div>
        <OnThisPage htmlcontent={htmlContent} />
      </div>
    </div>
  );
}
