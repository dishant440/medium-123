export default function Post(props: any) {
  return (
    <div className="p-4 font-sans w-full overflow-hidden">
      <p className="break-words">
        {props.content}
      </p>
    </div>
  );
}
