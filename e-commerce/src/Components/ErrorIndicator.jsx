import {Alert,AlertIcon,AlertTitle,AlertDescription} from "@chakra-ui/react"

export function ErrorIndicator(){
    return <>
    <Alert status='error'>
    <AlertIcon />
    <AlertTitle>Something Went Wrong!</AlertTitle>
    <AlertDescription>Please try again.</AlertDescription>
    </Alert>
    </>
}