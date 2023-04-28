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

export default function MissionButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [selected, setSelected] = useState('operational')
    const [choice, setChoice] = useState(null);
    //Get the value of the chakra ui select element
    const handleChange = (e) => {
        setChoice(e.target.value);
        onOpen();
    }

    const sendMission = () => {
        //Send the mission to the server
        setSelected(choice);
    } 

    return (<><Select size='md'
        bg={selected=="operational" ? '#09a013' : (selected=="low-power" ? '#f2cf24' : '#ce1414')}
        borderColor={selected=="operational" ? '#09a013' : (selected=="low-power" ? '#f2cf24' : '#ce1414')}
        color='black'
        onChange={(e)=>{handleChange(e)}}
        value={selected}
    >
        <option value='operational'>Operational</option>
        <option value='low-power'>Low Power</option>
        <option value='recovery'>Recovery</option>
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