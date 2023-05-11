import { Select, Button, useDisclosure } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
import React, {useState} from 'react'
import axios from 'axios'

export default function MissionButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [selected, setSelected] = useState('Operational')
    const [choice, setChoice] = useState(null);
    //Get the value of the chakra ui select element
    const handleChange = (e) => {
        setChoice(e.target.value);
        onOpen();
    }

    const sendMission = () => {
        //Make a get request to /cli
        axios.get('http://localhost:4000/cli', {
            params: {
                command: 'opmode '+choice
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });

        
        setSelected(choice);
    } 

    return (<><Select size='md'
        bg={selected=="Operational" ? '#09a013' : (selected=="Low Power" ? '#f2cf24' : '#ce1414')}
        borderColor={selected=="Operational" ? '#09a013' : (selected=="Low-power" ? '#f2cf24' : '#ce1414')}
        color='black'
        onChange={(e)=>{handleChange(e)}}
        value={selected}
    >
        <option value='Operational'>Operational</option>
        <option value='Low Power'>Low Power</option>
        <option value='Recovery'>Recovery</option>
    </Select>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Change Mission Status to {choice}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? 
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={()=> { setChoice(null); onClose(); }}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={()=> { sendMission(); onClose();}} ml={3}>
                            Change
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>

    )

}