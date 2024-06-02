import {Routes,Route} from "react-router-dom"
import {Home} from "../Components/Home"
import {Login} from "../Components/Login"
import {ProductDetails} from "../Components/ProductDetails"
import { PrivateRoute } from "./PrivateRoute"
export function AllRoutes(){
    return <>
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/allproducts/:id" element={<PrivateRoute><ProductDetails/></PrivateRoute>}/>
        </Routes>
    </>
}