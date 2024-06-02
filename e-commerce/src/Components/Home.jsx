import { Box, Button, Container, Heading,Card, CardHeader, CardBody,HStack,Stack,Text,StackDivider, Flex, SimpleGrid,Select} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/ContextAPI";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { LoadingIndicator } from "./LoadingIndicator";
import { ErrorIndicator } from "./ErrorIndicator";
export function Home(){
    let [product,setProduct]=useState([])
    let [sortByPrice,setSortByPrice]=useState("")
    let [sortByCategory,setSortByCategory]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState(false)
    let navigate=useNavigate()
  
    async function getData(){
           let queryParams={}
            if(sortByPrice){
                queryParams.sort="price"
                queryParams.order=sortByPrice
            }
            if(sortByCategory){
                queryParams.filter=sortByCategory
            }
            setLoading(true)
            try {
                let resp=await axios("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products",{
                    method:"get",
                    params:queryParams
                })
                setProduct(resp.data.data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setErr(true)
            }
    }
    function handleSingle(id){
        navigate(`/allproducts/${id}`)
    }
    useEffect(function(){
            getData()
    },[sortByPrice,sortByCategory])

    if(loading){
      return <LoadingIndicator/>
    }
    if(err){
      return <ErrorIndicator/>
    }
    return <>
     <Box mt='2vh'>
         <Container maxW="80%">
            <Box>
            <HStack>
            <Select placeholder='Sort by Price' value={sortByPrice} onChange={(e)=>setSortByPrice(e.target.value)}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
            </Select>
            <Select placeholder='Filter by Category' value={sortByCategory} onChange={(e)=>setSortByCategory(e.target.value)}> 
                    <option value='men'>Men</option>
                    <option value='women'>Women</option>
                    <option value='kids'>Kids</option>
                    <option value='homedecor'>Home Decor</option>
            </Select>
            </HStack>
            </Box>
                <SimpleGrid columns={{base:1,sm:1,md:2,lg:3}} >
                {product.map((ele)=>(
                    <Card key={ele.id} border="2px solid red" m="20px">
                    <CardHeader>
                      <Heading size='md'>Title: {ele.title}</Heading>
                    </CardHeader>
                  
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                          <Heading size='xs' textTransform='uppercase'>
                          Category
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            {ele.category}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size='xs' textTransform='uppercase'>
                          Price
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            {ele.price}
                          </Text>
                        </Box>
                        <Box>
                         <Button variant="outline" colorScheme="blue" onClick={()=>handleSingle(ele.id)}>More Details</Button>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
                </SimpleGrid>
         </Container>
     </Box>
    </>
}