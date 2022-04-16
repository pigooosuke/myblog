import React from "react";
import { EquationBlock } from "@/types/blog";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

const Equation = ({ equation }: { equation: EquationBlock }) => {
  if (!equation) {
    return null;
  }
  let token = "\\(" + equation.equation.expression + "\\)";
  return (
    <div>
      <Latex key={`latex`}>{token}</Latex>
    </div>
  );
};

export default Equation;
