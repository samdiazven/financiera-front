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

function Form({ handleChange, values, setForm }) {
  return (
    <Stack pt={10} w={"100%"} display="flex" flexDirection={"column"}>
      <Heading as="h3" size={"lg"}>
        Datos personales
      </Heading>
      <Stack pt={5}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Tipo de documento </FormLabel>
            <Select
              options={[
                { value: 1, label: "DNI" },
                { value: 2, label: "Carnet de extranjeria" },
                { value: 3, label: "Carnet de identidad" },
              ]}
              name="documentType"
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

          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Numero de documento </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="documentNumber"
              onChange={handleChange}
              value={values.documentNumber}
            />
          </Flex>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Nombres </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="name"
              onChange={handleChange}
              value={values.name}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Apellidos </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Nacionalidad </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="citizenship"
              onChange={handleChange}
              value={values.citizenship}
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

          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Fecha de nacimiento </FormLabel>
            <Input
              required
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
            <FormLabel> Estado civil </FormLabel>
            <Select
              options={[
                { value: 1, label: "Soltero" },
                { value: 2, label: "Casado" },
                { value: 3, label: "Divorciado" },
                { value: 4, label: "Viudo" },
              ]}
              name="idCivilState"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  idCivilState: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Numero de telefono </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="phoneNumber"
              type={"text"}
              onChange={handleChange}
              value={values.phoneNumber}
            />
          </Flex>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Correo electronico </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="email"
              type={"text"}
              onChange={handleChange}
              value={values.email}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Otro </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="otherLaboralSituation"
              type={"text"}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  extraClientData: {
                    ...prev.extraClientData,
                    otherLaboralSituation: e.target.value,
                  },
                }));
              }}
              value={values.extraClientData.otherLaboralSituation}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <Flex flexDir={"column"} width={"100%"}>
            <FormLabel> Direcci&oacute;n </FormLabel>
            <Textarea
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
            <FormLabel> Grado de instruccion </FormLabel>
            <Select
              options={[
                { value: 1, label: "Primaria" },
                { value: 2, label: "Secundaria" },
                { value: 3, label: "Universitaria" },
                { value: 4, label: "Completa" },
                { value: 4, label: "Incompleta" },
              ]}
              name="instructionGrade"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  extraClientData: {
                    ...prev.extraClientData,
                    idDegreeOfInstruction: e.value,
                  },
                }));
              }}
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Situacion Laboral </FormLabel>
            <Select
              options={[
                { value: 1, label: "Dependiente" },
                { value: 2, label: "Independiente" },
                { value: 3, label: "Jubilada" },
                { value: 4, label: "Estudiante" },
                { value: 5, label: "Otro" },
              ]}
              name="idLaboralSituation"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  extraClientData: {
                    ...prev.extraClientData,
                    idLaboralSituation: e.value,
                  },
                }));
              }}
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Profesion </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="profession"
              type={"text"}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  extraClientData: {
                    ...prev.extraClientData,
                    profession: e.target.value,
                  },
                }));
              }}
              value={values.extraClientData.profession}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Ocupacion </FormLabel>
            <Input
              required
              size={"lg"}
              borderRadius={"6px"}
              name="occupation"
              type={"text"}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  extraClientData: {
                    ...prev.extraClientData,
                    occupation: e.target.value,
                  },
                }));
              }}
              value={values.extraClientData.occupation}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Tarjetas de credito </FormLabel>
            <Select
              isMulti={true}
              options={[
                { value: 1, label: "BCP" },
                { value: 2, label: "BBVA" },
                { value: 3, label: "CENCOSUD" },
                { value: 4, label: "INTERBANK" },
                { value: 4, label: "PICHINCHA" },
                { value: 5, label: "SCOTIABANK" },
                { value: 6, label: "RIPLEY" },
                { value: 7, label: "CMR" },
                { value: 8, label: "GNB" },
                { value: 9, label: "OTRO" },
              ]}
              name="instructionGrade"
              onChange={
                (e) => {}
                // setForm((prev) => ({
                //   ...prev,
                //   civilState: e.value,
                // }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}

export default Form;
