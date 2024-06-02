import { Card, CardHeader, CardBody, CardFooter,Box,Container,Stack,StackDivider,Text,Heading,Button ,useToast} from '@chakra-ui/react'
import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from 'react'
import { LoadingIndicator } from './LoadingIndicator'
import { ErrorIndicator } from './ErrorIndicator'
export function ProductDetails(){
    let {id}=useParams()
    let [singleUser,setSingleUser]=useState({})
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState(false)
    const toast = useToast()
    async function SingleUserDetails(){
      setLoading(true)
        try {
            let resp=await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`)
            setSingleUser(resp.data.data);
            setLoading(false)
        } catch (error) {
           setLoading(false)
           setErr(true)
        }
    }
    function handleCart(item){
        let confirm=window.confirm(`Are you sure you want to add this item(${item}) to cart`)
        if(confirm){
            toast({
                title: 'Item added to cart.',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        }
    }
    useEffect(function(){
        SingleUserDetails()
    },[])

   let {brand,title,image,category,price} = singleUser

   if(loading){
    return <LoadingIndicator/>
   }
   if(err){
    return <ErrorIndicator/>
   }
    return <>
     <Box>
        <Container>
        <Card border="5px solid blue" borderRadius="10px" m="20px">
  <CardHeader>
        <Box>
         <img src={image}/>
      </Box>
    <Heading size='md'>{title}</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
         Brand:
        </Heading>
        <Text pt='2' fontSize='sm'>
         {brand}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Category:
        </Heading>
        <Text pt='2' fontSize='sm'>
          {category}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Price: 
        </Heading>
        <Text pt='2' fontSize='sm'>
          {price}
        </Text>
      </Box>
      <Button variant="outline" colorScheme='blue' onClick={()=>handleCart(title)}>Add to Cart</Button>
    </Stack>
  </CardBody>
</Card>
        </Container>
     </Box>
    </>
}