export default function MarginWidthWrapper({ children }) {
  return <div className="flex flex-col md:ml-64 sm:border-r sm:border-zinc-700 min-h-screen">{children}</div>;
}
