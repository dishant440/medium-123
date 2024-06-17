interface BlogCardProps {
  title: string;
  authorName: string;
  onClick: (id: string) => void;
  id: string;
  content: string;
}

export default function PostCard({
  title,
  authorName,
  id,
  onClick,
  content
}: BlogCardProps) {

  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <div className="mt-10 max-w-6xl shadow-md py-2 cursor-pointer" onClick={() => onClick(id)}>
      <div className="Top flex flex-row justify-between text-md m-2">
        <span>{authorName}</span>
      </div>
      <div className="middle ml-2 w-full overflow-hidden">
        <h2 className="title text-3xl font-bold my-2">{title}</h2>
        <p className="text-xl break-words">
          {truncateContent(content, 50)}
        </p>
      </div>
    </div>
  );
}
