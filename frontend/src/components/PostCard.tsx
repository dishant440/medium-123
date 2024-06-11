interface BlogCardProps {
  title: string;
  authorName: string;
  publishedDate: string;
}

export default function PostCard({
  title,
  authorName,
  publishedDate,
}: BlogCardProps) {
  return (
    <div className=" mt-10 shadow-md py-2   ">
      <div className="Top flex flex-row gap-x-2 text-md mt-2 ml-2 ">
        <span>{authorName}</span>
        <span>{publishedDate}</span>
      </div>
      <div className="middle ml-2 ">
        <h2 className="title text-3xl font-bold my-2">{title}</h2>
        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem explicabo est eaque, porro odit aliquam, modi tempore
          rerum doloremque velit eligendi inventore nam repellendus, animi quae
          voluptatibus odio eius! Culpa?
        </p>
        <img alt="" />
      </div>
    </div>
  );
}
