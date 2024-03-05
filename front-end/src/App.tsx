import { DataProvider } from "./components/DataContext"
import AllRoutes from "./pages/AllRoutes"

function App() {
  return (
    <DataProvider>
      <AllRoutes />
    </DataProvider>
  )
}

export default App
