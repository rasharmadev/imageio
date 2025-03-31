import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CollapsibleCodeBlockProps {
  codeSnippet: string;
}

const CollapsibleCodeBlock: React.FC<CollapsibleCodeBlockProps> = ({
  codeSnippet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold mt-20 mb-6">How it works?</h1>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        {isOpen ? "Hide Code" : "Show Code"}
      </Button>

      {isOpen && (
        <Card className="mt-4 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
          <CardContent className="p-4">
            <SyntaxHighlighter language="jsx" style={dracula} wrapLines>
              {codeSnippet}
            </SyntaxHighlighter>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollapsibleCodeBlock;
