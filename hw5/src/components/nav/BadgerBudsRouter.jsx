import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerBuds from "../BadgerBuds";
import BadgerBudsLanding from "./pages/BadgerBudsLanding"
import BadgerBudsAdopatble from "./pages/BadgerBudsAdoptable"
import BadgerBudsBasket from "./pages/BadgerBudsBasket";

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                <Route path="available-cats" element={<BadgerBudsAdopatble />} />
                <Route path="basket" element={<BadgerBudsBasket />} />
            </Route>
        </Routes>
    </BrowserRouter>
}