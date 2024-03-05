import { useData } from "@/components/DataContext"

function Dashboard() {
  const data = useData()

  console.log(data)

  return (
    <div>Dashboard
    </div>
  )
}

export default Dashboard