import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { myTree } from "../../utils/tree";
import FolderORFile from "./FolderORFile";

export default function FileExplorer() {
  const rawData = localStorage.getItem("tree");
  const [theme, setTheme] = useState("light");
  const resizeDivRef = useRef<HTMLDivElement | null>(null);
  const sideBar = useRef<HTMLDivElement | null>(null);
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

  function resize(event: MouseEvent) {
    const target = sideBar.current as HTMLDivElement;
    if (target) {
      const selection = window.getSelection();
      if (selection) selection.removeAllRanges();
      target.style.width = `${event.clientX}px`;
    }
  }

  function removeEvents() {
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", removeEvents);
  }

  useEffect(() => {
    if (resizeDivRef?.current) {
      resizeDivRef.current.addEventListener("mousedown", () => {
        const selection = window.getSelection();
        if (selection) selection.removeAllRanges();
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", removeEvents);
      });
    }
    return () => {
      removeEvents();
    };
  });

  useEffect(() => {
    localStorage.setItem("tree", JSON.stringify(dataTree));
  }, [dataTree]);

  return (
    <div
      className="relative flex min-h-screen w-fit min-w-[280px] max-w-lg select-none flex-col bg-skin-color/5 p-2 px-3"
      ref={sideBar}
    >
      <div
        ref={resizeDivRef}
        className="absolute left-full top-0 h-full w-1 cursor-col-resize bg-skin-color/10"
      ></div>
      <h1 className="pb-2 pt-1 text-xs uppercase">Explorer: project name</h1>
      <div className="flex-grow">
        <FolderORFile dataTree={dataTree} setDataTree={setDataTree} />
      </div>
      <button
        className="p-1 text-left text-xs underline-offset-2 outline-none hover:underline hover:opacity-60 focus:underline focus:opacity-60"
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
