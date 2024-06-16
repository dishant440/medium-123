
export default function AuthorSec(props:any) {
  return (
    <div className=" p-2 mt-10">
        <h1 className="text-3xl font-serif font-bold">Author</h1>
       <div className="ml-2 mt-2">
       <h3 className="text-md font-serif font-bold">{props.author}</h3>
       
       </div>

    </div>
  )
}
