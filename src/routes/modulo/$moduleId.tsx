import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modulo/$moduleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modulo/$moduleId"!</div>
}
