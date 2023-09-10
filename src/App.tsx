import FileExplorer from "./components/stateful/FileExplorer";

export default function App() {
  return (
    <div className="flex bg-skin-background text-skin-color">
      <div className="grid flex-grow items-center justify-center">
        <svg
          className="aspect-square w-full fill-neutral-400 transition-transform dark:fill-neutral-700"
          viewBox="0,0,256,256"
        >
          <g transform="scale(5.33333,5.33333)">
            <path d="M44,11.11v25.78c0,1.27 -0.79,2.4 -1.98,2.82l-8.82,4.14l0.8,-10.85v-18l-0.8,-10.85l8.82,4.14c1.19,0.42 1.98,1.55 1.98,2.82z"></path>
            <path d="M9,33.896l25,-18.896v-9.647c0,-1.198 -1.482,-1.758 -2.275,-0.86l-27.067,24.746c-0.9,0.83 -0.849,2.267 0.107,3.032c0,0 1.324,1.232 1.803,1.574c0.736,0.525 1.703,0.585 2.432,0.051z"></path>
            <path d="M9,14.104l25,18.896v9.647c0,1.198 -1.482,1.758 -2.275,0.86l-27.067,-24.746c-0.9,-0.83 -0.849,-2.267 0.107,-3.032c0,0 1.324,-1.232 1.803,-1.574c0.736,-0.525 1.703,-0.585 2.432,-0.051z"></path>
          </g>
        </svg>
      </div>
      <FileExplorer />
    </div>
  );
}
