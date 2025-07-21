export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      // className="border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors"
      onClick={onClick}
    >
      {text}
    </button>
  );
}