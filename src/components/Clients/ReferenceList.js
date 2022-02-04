import React, { useState } from "react";
import { Select } from "chakra-react-select";
import {
  FormLabel,
  Heading,
  Stack,
  Container,
  Flex,
  Checkbox,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react";

function ReferenceList({
  handleChange,
  values,
  setForm,
  handleChangeSecond,
  setFormSecond,
  valuesSecond,
}) {
  return (
    <Stack pt={10} w={"100%"} display="flex" flexDirection={"column"}>
      <Heading as="h4" size={"lg"} py={4}>
        Listado de referencia
      </Heading>
      <Heading as={"h3"} size={"md"} pt={5}>
        {" "}
        Primera referencia
      </Heading>
      <Stack>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Tipo de documento </FormLabel>
            <Select
              options={[
                { value: 1, label: "DNI" },
                { value: 2, label: "Carnet de extranjeria" },
                { value: 3, label: "Carnet de identidad" },
              ]}
              name="idDocumentType"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  idDocumentType: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Numero de documento </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="documentNumber"
              onChange={handleChange}
              value={values.documentNumber}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Nombre</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Apellido</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="lastname"
              type={"text"}
              onChange={handleChange}
              value={values.lastname}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="dateOfBirth"
              type={"date"}
              onChange={handleChange}
              value={values.dateOfBirth}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Sexo </FormLabel>
            <Select
              options={[
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" },
              ]}
              name="gender"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  gender: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Ciudadania</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="citizenship"
              type={"text"}
              onChange={handleChange}
              value={values.citizenship}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Direccion </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="address"
              type={"text"}
              onChange={handleChange}
              value={values.address}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Telefono</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="businessPhone"
              type={"text"}
              onChange={handleChange}
              value={values.businessPhone}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Otros ingresos </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="otherIncome"
              type={"text"}
              onChange={handleChange}
              value={values.otherIncome}
            />
          </Flex>
        </Flex>
      </Stack>
      <Stack>
        <Heading as={"h3"} size={"md"} pt={5}>
          {" "}
          Segunda referencia
        </Heading>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Tipo de documento </FormLabel>
            <Select
              options={[
                { value: 1, label: "DNI" },
                { value: 2, label: "Carnet de extranjeria" },
                { value: 3, label: "Carnet de identidad" },
              ]}
              name="idDocumentType"
              onChange={(e) =>
                setFormSecond((prev) => ({
                  ...prev,
                  idDocumentType: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Numero de documento </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="documentNumber"
              onChange={handleChangeSecond}
              value={valuesSecond.documentNumber}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Nombre</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="name"
              onChange={handleChangeSecond}
              value={valuesSecond.name}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Apellido</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="lastName"
              onChange={handleChangeSecond}
              value={valuesSecond.lastname}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              type={"date"}
              name={"dateOfBirth"}
              onChange={handleChangeSecond}
              value={valuesSecond.dateOfBirth}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Sexo </FormLabel>
            <Select
              options={[
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" },
              ]}
              name="gender"
              onChange={(e) =>
                setFormSecond((prev) => ({
                  ...prev,
                  gender: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Ciudadania</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="citizenship"
              type={"text"}
              onChange={handleChangeSecond}
              value={valuesSecond.citizenship}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Direccion </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="address"
              type={"text"}
              onChange={handleChangeSecond}
              value={valuesSecond.address}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Telefono</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="businessPhone"
              type={"text"}
              onChange={handleChangeSecond}
              value={valuesSecond.businessPhone}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Otros ingresos </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="otherIncome"
              type={"text"}
              onChange={handleChangeSecond}
              value={valuesSecond.otherIncome}
            />
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}

export default ReferenceList;
