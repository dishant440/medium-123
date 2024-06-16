interface BlogCardProps {
  title: string;
  authorName: string;
  onClick: (id: string) => void;
  id: string;
}

export default function PostCard({
  title,
  authorName,
  id,
  onClick,
}: BlogCardProps) {
  return (
    <div className="mt-10 shadow-md py-2" onClick={() => onClick(id)}>
      <div className="Top flex flex-row justify-between text-md m-2">
        <span>{authorName}</span>
      </div>
      <div className="middle ml-2">
        <h2 className="title text-3xl font-bold my-2">{title}</h2>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem explicabo est eaque, porro odit aliquam, modi tempore rerum doloremque velit eligendi inventore nam repellendus, animi quae voluptatibus odio eius! Culpa?
        </p>
        <img alt="" />
      </div>
    </div>
  );
}
