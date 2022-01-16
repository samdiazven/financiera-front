import React, { useCallback, useState } from "react";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

function Dropzone({ handleChangeFile, openModal, sendFile, setOpenModal }) {
  const [files, setFiles] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    handleChangeFile(acceptedFiles[0]);
    let reader = new FileReader();

    reader.onloadend = function () {
      setFiles(reader.result);
    };
    if (acceptedFiles) {
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      setFiles(null);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>Subir archivo</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            {...getRootProps()}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            p={4}
            width="100%"
            height="100%"
            border={"2px dashed"}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelto el archivo aca...</p>
            ) : (
              <p>Arrastra los archivos aca o haciendo click</p>
            )}
            {files && <img src={files} width={"200px"} height={"200px"} />}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variantColor="blue"
            mr={3}
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </Button>
          <Button variantColor="blue" onClick={sendFile}>
            Subir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Dropzone;
