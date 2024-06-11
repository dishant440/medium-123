import PostCard from "../components/PostCard";

export default function AllPost() {
  return (
    <div className="mx-20">
      <div className=" flex flex-col justify-items-center ">
        <div className="TopBar flex flex-row mx-10 mt-2 h-16 items-center  shadow-lg">
            <span className="mx-4">For You</span>
            <span className="mx-4">Following</span>
        </div>
     <div className="flex flex-col mx-10 mt-2 shadow-md p-2">
    
     <PostCard 
        title="How to learn programming" 
        authorName="Dishant Nalwaya" 
        publishedDate="2024-06-08" 
      />  
         <PostCard 
        title="Stay Hydrated" 
        authorName="Kashi Shreshtha" 
        publishedDate="2022-01-07" 
      />
     <PostCard 
        title="Sample Title" 
        authorName="Dishant Nalwaya" 
        publishedDate="2024-06-08" 
      />
      
     </div>
      </div>
    </div>
  );
}
