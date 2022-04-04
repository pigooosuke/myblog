import React from "react";
import { BaseBlock } from "@/types/blog";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const Equation = ({ block }: { block: BaseBlock }) => {
  if (!block) {
    return null;
  }
  let token = "\\(" + block.equation.expression + "\\)";
  return <Latex key={`latex`}>{token}</Latex>;
};

export default Equation;
