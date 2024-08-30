import { RiListCheck3, RiMoreFill } from 'react-icons/ri'
import { Helmet } from 'react-helmet'
import { CreateProject } from './CreateNewProject'
import { useAtom } from 'jotai'
import { projectsAtom, selectedProjectIdAtom } from '@renderer/store/projects/projects'
import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const [projects] = useAtom(projectsAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)
  const navigate = useNavigate()

  if (selectedProjectId) {
    navigate(`/projects/${selectedProjectId}/tests`)
  }

  return (
    <>
      <div className="h-12 custom-drag-region"></div>
      <div className="flex flex-col gap-4 px-12">
        <Helmet>
          <title>Projects | Assertly</title>
        </Helmet>
        <div className="flex flex-col bg-white dark:bg-zinc-800/50 p-8 rounded-xl shadow-sm gap-8 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-4xl">
                <RiListCheck3 />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                <p className="dark:text-zinc-500 text-sm">Manage your projects here.</p>
              </div>
            </div>

            <div className="flex items-center mt-0">
              <CreateProject />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {projects?.data?.map((project: any) => (
            <div
              key={project.id}
              className="flex flex-col justify-start items-start cursor-pointer p-6 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl w-[calc(25%-16px)]"
              onClick={() => {
                setSelectedProjectId(project.id)
                navigate(`/projects/${project.id}/tests`)
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="text-lg font-bold">{project.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="text-lg">
                  <RiMoreFill />
                </Button>
              </div>
              <div>
                <span className="text-sm">{project.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Projects
