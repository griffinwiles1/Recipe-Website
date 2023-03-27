import React from "react"; 
import { Route, Routes } from "react-router-dom";

import { Create, Edit, RecordList, Navbar } from "./components";

 

 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;