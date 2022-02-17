import React from "react";
import { readFileSync } from "fs";

const defaultCss = readFileSync("./src/styles/default.css").toString();

const Head = ({ children }: { children?: string }) => (
  <head>
    <style type="text/css" dangerouslySetInnerHTML={{ __html: defaultCss }} />
    {children && (
      <style type="text/css" dangerouslySetInnerHTML={{ __html: children }} />
    )}
  </head>
);

export default Head;
