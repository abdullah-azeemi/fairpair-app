import ProjectDetailsPage from "@/components/projects-details-page";

interface PageProps{
  params:{
    id:string
  }
}
export default function page({params}: PageProps){
  return <div>
    <ProjectDetailsPage params={params} />
  </div>
}