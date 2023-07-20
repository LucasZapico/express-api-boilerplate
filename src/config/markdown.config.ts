// @ts-nocheck
import markdownJson from "markdown-json";

type MdJsonType = {
  display?: boolean,
  dist?: string, 
  ignore?: string, 
  deterministicOrder?: boolean,
  filePatter?: string, 
  port?: number, 
  server?: boolean,
  src?: string, 
  cwd?: string, 

}

const mdJson = async (settings: MdJsonType) => {
  const defaultSettings = {
    name: "markdown-json",
    cwd: "./",
    display: true,
    filePattern: "**/**.md",
    ignore: "*(icon|input)*",
    dist: "src/output/output.json",
    metadata: true,
    server: false,
    port: 3001,
    deterministicOrder: false,
  }

  const func = await markdownJson({...defaultSettings, settings});
  const res = await func(string);
  console.log(res);
  const data = await res;
  console.log(data);
  return "markdwon";
};

export default mdJson;
