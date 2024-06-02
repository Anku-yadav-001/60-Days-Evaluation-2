import {Link} from "react-router-dom"
import {Box, Flex, HStack, Heading,Button} from "@chakra-ui/react"
import { AuthContext } from "../Context/ContextAPI"
import { useContext } from "react"
export function Navbar(){
    let {user,setUser} =useContext(AuthContext)
    function Logout(){
      setUser({ isAuthenticated: false, token: null, email: null })
}
    return <>
      <Box bg="red" p="1rem">
       <Flex justify={"space-between"}>
        <Box>
        {user.isAuthenticated?<Heading as="h6" size="md" color="white">{user.email}</Heading>:""}
        </Box>
        <Box>
        <HStack spacing="8rem">
      <Link to="/"><Heading as="h6" size="md">Home</Heading></Link>
      {user.isAuthenticated?<Button variant="outline" colorScheme="white" onClick={Logout}>Logout</Button>:""}
      </HStack>
        </Box>
       </Flex>
      </Box>
    </>
}