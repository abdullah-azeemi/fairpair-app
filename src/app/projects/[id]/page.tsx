import ProjectDetailsPage from "@/components/projects-details-page";

interface PageProps{
  params:{
    id:string
  }
}
export default async function page({params}: PageProps){
  const resolvedParams = await params;
  return <div>
    <ProjectDetailsPage params={resolvedParams} />
  </div>
}