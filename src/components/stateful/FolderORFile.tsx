import { useState } from "react";
import { treeType } from "./FileExplorer";

export default function FolderORFile(props: FolderORFilePropTypes) {
  const { dataTree, setDataTree } = props;

  const [data, setData] = useState<setDataType>();
  const [inputState, setInputState] = useState(false);
  const [expandState, setExpandState] = useState(false);

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trimStart();

    if (event.key === "Escape") setInputState(false);

    if (event.key === "Enter") {
      if (!value && target.nextElementSibling) {
        target.nextElementSibling.textContent =
          "A file or folder name must be provided.";
        return;
      }

      if (
        value.includes(" ") &&
        target.nextElementSibling &&
        data?.type === items.FILE
      ) {
        target.nextElementSibling.textContent =
          "File name cannot contain spaces.";
        return;
      }

      if (
        !value.match(/\.[^.]+/g) &&
        target.nextElementSibling &&
        data?.type === items.FILE
      ) {
        target.nextElementSibling.textContent =
          "File should have a valid extenstion.";
        return;
      }

      setDataTree((prev) => {
        function traverse(root: treeType) {
          if (root?.id === data?.id) {
            const obj = {
              id: crypto.randomUUID(),
              type: data?.type,
              name: value.replace(value[0], value[0].toUpperCase()),
              children: [],
            };
            return root?.children?.push(obj);
          }
          if (root?.children) {
            root.children.map((child: treeType) => {
              return traverse(child);
            });
          }
        }
        traverse(prev);
        return { ...prev };
      });
      setInputState(false);
    }
  }

  const input = (
    <div className="my-1">
      <input
        type="text"
        className="my-1 w-full bg-skin-background px-2 py-1 outline-none focus:ring-1"
        autoFocus
        onBlur={() => setInputState(false)}
        onKeyDown={handleEnter}
      />
      <span className="block bg-skin-error px-2 py-[6px] text-[13px] leading-normal text-white ring-1 ring-red-600 empty:hidden dark:ring-red-500"></span>
    </div>
  );

  function createFileORFolder(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    type: string,
  ) {
    event.stopPropagation();
    setInputState(true);
    setExpandState(true);
    setData({
      id,
      type,
    });
  }

  function deleteNode(id: string) {
    setDataTree((prev) => {
      function find(id: string, root: treeType, prev: treeType | null) {
        if (root.id === id && prev?.children) {
          const filteredNodes = prev.children.filter(
            (node: treeType) => node.id !== id,
          );
          prev.children = filteredNodes;
          return;
        }
        if (!root.children) return;
        if (root.children.length !== 0) {
          root.children.map((child: treeType) => {
            return find(id, child, root);
          });
        }
      }
      find(id, prev, null);
      return { ...prev };
    });
  }

  if (!dataTree) return;

  return (
    <div className="flex-grow text-xs">
      {dataTree?.type === items.FOLDER ? (
        <div>
          <div
            className="group flex items-center justify-between gap-2 outline-none hover:bg-skin-color/5 focus:ring-1"
            tabIndex={0}
          >
            <button
              className="flex w-full cursor-pointer items-center justify-between gap-1 text-left font-medium outline-none focus:bg-skin-color/10 focus:ring-1"
              onClick={() => setExpandState((prev) => !prev)}
            >
              {expandState ? (
                <span className="flex items-center gap-1">
                  <svg
                    viewBox="0 -960 960 960"
                    className="aspect-square w-6 fill-skin-accent transition-transform"
                  >
                    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                  <svg
                    viewBox="0 -960 960 960"
                    className="aspect-square w-4 fill-skin-accent transition-transform"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H160v400l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Z" />
                  </svg>
                  <p>
                    {`
                  ${dataTree.name} 
                  ${dataTree.children?.length === 0 ? "(empty)" : ""}`}
                  </p>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg
                    viewBox="0 -960 960 960"
                    className="aspect-square w-6 -rotate-90 fill-skin-color/70 transition-transform"
                  >
                    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                  <svg
                    viewBox="0 -960 960 960"
                    className="aspect-square w-4 fill-skin-color/50 transition-transform"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z" />
                  </svg>
                  <p>
                    {`
                  ${dataTree.name} 
                  ${dataTree.children?.length === 0 ? "(empty)" : ""}`}
                  </p>
                </span>
              )}
            </button>
            <div className="hidden pr-1 group-focus-within:flex group-hover:flex">
              <button
                className="flex w-full cursor-pointer items-center p-1 outline-none hover:bg-skin-color/10 focus:bg-skin-color/10 focus:ring-1"
                onClick={(event) =>
                  createFileORFolder(event, dataTree.id, items.FOLDER)
                }
              >
                <svg
                  viewBox="0 -960 960 960"
                  className="aspect-square w-4 fill-skin-color/50 transition-transform"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z" />
                </svg>
              </button>
              <button
                className="flex w-full cursor-pointer items-center gap-1 p-1 text-left outline-none hover:bg-skin-color/10 focus:bg-skin-color/10 focus:ring-1"
                onClick={(event) =>
                  createFileORFolder(event, dataTree.id, items.FILE)
                }
              >
                <svg
                  viewBox="0 -960 960 960"
                  className="aspect-square w-4 fill-skin-color/50 transition-transform"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
                </svg>
              </button>

              {dataTree.name !== "Root" ? (
                <button
                  className="group flex w-full cursor-pointer items-center gap-1 p-1 text-left outline-none hover:bg-skin-color/5 focus:bg-skin-color/10 focus:ring-1"
                  onClick={() => deleteNode(dataTree.id)}
                >
                  <svg
                    viewBox="0 -960 960 960"
                    className="aspect-square w-4 fill-skin-color/50 transition-transform"
                  >
                    <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <div className="relative before:absolute before:left-[11px] before:block before:h-full before:w-[1.5px] before:bg-skin-color/20">
            {expandState && (
              <div className="pl-5">
                {inputState && input}
                {dataTree.children
                  ?.sort((a, b) => {
                    return a.type <= b.type ? 1 : -1;
                  })
                  ?.map((child) => {
                    return (
                      <FolderORFile
                        key={child.id}
                        dataTree={child}
                        setDataTree={setDataTree}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="group flex items-center justify-between gap-2 outline-none hover:bg-skin-color/5 focus:ring-1"
          tabIndex={0}
        >
          <button className="flex w-full cursor-pointer items-center gap-1 p-1 text-left font-medium outline-none focus:bg-skin-color/10 focus:ring-1">
            <svg
              viewBox="0 -960 960 960"
              className="aspect-square w-4 fill-skin-color/50 transition-transform"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
            </svg>
            {dataTree.name}
          </button>
          <div className="hidden pr-1 group-focus-within:flex group-hover:flex">
            <button
              className="group flex w-full cursor-pointer items-center gap-1 p-1 text-left outline-none hover:bg-skin-color/5 focus:bg-skin-color/10 focus:ring-1"
              onClick={() => deleteNode(dataTree.id)}
            >
              <svg
                viewBox="0 -960 960 960"
                className="aspect-square w-4 fill-skin-color/50 transition-transform"
              >
                <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type FolderORFilePropTypes = {
  dataTree: treeType | null;
  setDataTree: React.Dispatch<React.SetStateAction<treeType>>;
};

type setDataType = {
  id: string;
  type: string;
};

const items = {
  FOLDER: "FOLDER",
  FILE: "FILE",
} as const;
