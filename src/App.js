import { Routes, Route } from "react-router-dom"
import SignUp from "./component/signUp"
import Test from "./component/test"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="Test" element={<Test />} />
      </Routes>
    </div>
  )
}
export default App