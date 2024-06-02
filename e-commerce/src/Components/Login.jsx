import { Box, Button, Container, Input, VStack ,Text} from "@chakra-ui/react";
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react";
import { ContextAPI } from "../Context/ContextAPI";
import { AuthContext } from "../Context/ContextAPI";
import { useNavigate} from "react-router-dom";
import { LoadingIndicator } from "./LoadingIndicator";
import { ErrorIndicator } from "./ErrorIndicator";
export function Login(){
        let [email,setEmail]=useState("")
        let [password,setPassword]=useState("")
        let {user,setUser}=useContext(AuthContext)
        let [loading,setLoading]=useState(false)
        let [err,setErr]=useState(false)
        let navigate=useNavigate()
        let refDiv=useRef()
    function handleRef(){
        refDiv.current.focus()
    }
    async function loginUserReq(){
        setLoading(true)
        try {
            let resp=await axios.post("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",{
                email,
                password
            })
            setUser({ isAuthenticated: true, token: resp.data.token, email: email })
            if(resp.status==200){
                alert("successful login")
                navigate("/")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(true)
        }
    }
    useEffect(function(){
            handleRef()
    },[])
    if(loading){
        return <LoadingIndicator/>
    }
    if(err){
        return <ErrorIndicator/>
    }
  
    return <>
     <Box>
        <Container maxW="20%" border="2px solid blue" mt="4rem" borderRadius="15px">
                    <VStack spacing="20px">
                    <Text>Email;</Text>
                    <Input placeholder="enter email" m="10px" value={email} onChange={(e)=>setEmail(e.target.value)} ref={refDiv}/>
                    <Input placeholder="enter password" m="10px" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Button variant="outline" colorScheme="blue" m="10px" onClick={loginUserReq}>Login</Button>
                    </VStack>
        </Container>
     </Box>
    </>
}