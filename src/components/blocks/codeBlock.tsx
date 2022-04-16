import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import { CodeBlock, RichTextBlockText } from "@/types/blog";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const Code = ({ code }: { code: CodeBlock }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  if (!code) {
    return null;
  }
  const richTextBlockEquation = code.code.text[0] as RichTextBlockText;
  const content = richTextBlockEquation.text.content;
  const language = code.code.language || "javascript";

  return (
    <div>
      <pre className="line-numbers">
        <code
          className="language-jsx"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              content!,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript,
              language
            ),
          }}
        />
      </pre>
    </div>
  );
};
export default Code;
