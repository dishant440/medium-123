export default function Heading(props: any) {
  return (
    <div className=" p-2">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <span className="text-sm">Posted on August 5 2023</span>
    </div>
  );
}
