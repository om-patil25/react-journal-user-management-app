import CRUDapp from "./pages/CRUDapp";
import DailyJournal from "./pages/DailyJournal";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/crud" element={<CRUDapp />} />
        <Route path="/" element={<DailyJournal />} />
      </Routes>
    </>
  );
};

export default App;
