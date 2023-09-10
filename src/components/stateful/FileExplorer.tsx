import { useEffect, useLayoutEffect, useState } from "react";

import { myTree } from "../../utils/tree";
import FolderORFile from "./FolderORFile";

export default function FileExplorer() {
  const rawData = localStorage.getItem("tree");
  const [theme, setTheme] = useState("light");
  const initalData = rawData ? JSON.parse(rawData) : myTree.root;
  const [dataTree, setDataTree] = useState<treeType>(initalData);

  function toggleTheme() {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    setTheme((prev) => {
      localStorage.setItem("theme", prev === "light" ? "dark" : "light");
      return prev === "light" ? "dark" : "light";
    });
  }

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) localStorage.setItem("theme", "light");
    else setTheme(theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tree", JSON.stringify(dataTree));
  }, [dataTree]);

  return (
    <div className="min-h-screen w-[320px] min-w-[300px] select-none bg-skin-color/5 p-2 px-3 flex flex-col">
      <h1 className="pt-1 pb-2 uppercase text-xs">Explorer: project name</h1>
      <FolderORFile dataTree={dataTree} setDataTree={setDataTree} />
      <button
        className="text-xs p-1 text-left underline-offset-2 outline-none hover:underline hover:opacity-60 focus:underline focus:opacity-60"
        onClick={toggleTheme}
      >
        Toggle theme
      </button>
    </div>
  );
}

export type treeType = {
  id: string;
  type: string;
  name: string;
  children?: treeType[];
};
