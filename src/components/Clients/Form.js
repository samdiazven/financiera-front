import React, { useState, useEffect } from "react";
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
  Text,
  Spinner,
} from "@chakra-ui/react";
import Clients from "apis/clients";

function Form({ handleChange, values, setForm, validate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [clientName, setClientName] = useState(null);
  useEffect(() => {
    if (documentNumber.length === 8 || documentNumber.length === 11) {
      console.log("here");
      setIsLoading(true);
      const clients = new Clients();
      clients
        .validateDocumentNumber(documentNumber)
        .then((res) => {
          setClientName(res);
          if (!res) {
            validate(true);
          } else {
            validate(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setClientName(null);
        });
      setIsLoading(false);
    } else {
      validate(false);
    }
  }, [documentNumber]);

  function handleBlur(e) {
    console.log(e.target.value);
    setDocumentNumber(e.target.value);
  }
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
              defaultValue={{
                label: !values.idDocumentType
                  ? "Seleccione un documento"
                  : values.idDocumentType === 1
                  ? "DNI"
                  : values.idDocumentType === 2
                  ? "Carnet de extranjeria"
                  : "Carnet de identidad",
                value: !values.idDocumentType ? null : values.idDocumentType,
              }}
              options={[
                { value: 1, label: "DNI", isFixed: true },
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
              onBlur={handleBlur}
            />
            {isLoading ? (
              <Spinner size={"sm"} />
            ) : (
              <Text py={2}>
                {!clientName ? `` : `Este usuario ya existe ${clientName}`}
              </Text>
            )}
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

          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Estado financiero </FormLabel>
            <Select
              defaultValue={{
                label: !values.idFinancialState
                  ? "Seleccione un estado"
                  : values.idFinancialState === 1
                  ? "Solvente"
                  : "En mora",
                value: !values.idFinancialState
                  ? null
                  : values.idFinancialState,
              }}
              options={[
                { value: 1, label: "Solvente" },
                { value: 2, label: "En mora" },
              ]}
              name="idFinancialState"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  idFinancialState: e.value,
                }))
              }
              size={"lg"}
              borderRadius={"6px"}
            />
          </Flex>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Sexo </FormLabel>
            <Select
              defaultValue={{
                label: !values.gender
                  ? "Seleccione un genero"
                  : values.gender === "M"
                  ? "Masculino"
                  : "Femenino",
                value: !values.gender ? null : values.gender,
              }}
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
              value={
                values.dateOfBirth
                  ? new Date(values.dateOfBirth).toISOString().split("T")[0]
                  : null
              }
            />
          </Flex>
        </Flex>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Estado civil </FormLabel>
            <Select
              defaultValue={{
                label: !values.idCivilState
                  ? "Seleccione un genero"
                  : values.idCivilState === 1
                  ? "Soltero"
                  : values.idCivilState === 2
                  ? "Casado"
                  : values.idCivilState === 3
                  ? "Divorciado"
                  : values.gender === 4 && "Viudo",
                value: !values.idCivilState ? null : values.idCivilState,
              }}
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
              defaultValue={{
                label: !values.extraClientData.idDegreeOfInstruction
                  ? "Seleccione un grado"
                  : values.extraClientData.idDegreeOfInstruction === 1
                  ? "Primaria"
                  : values.extraClientData.idDegreeOfInstruction === 2
                  ? "Secundaria"
                  : values.extraClientData.idDegreeOfInstruction === 3
                  ? "Universtaria"
                  : values.extraClientData.idDegreeOfInstruction === 4
                  ? "Viudo"
                  : values.extraClientData.idDegreeOfInstruction === 5 &&
                    "Incompleta",
                value: !values.extraClientData.idDegreeOfInstruction
                  ? null
                  : values.extraClientData.idDegreeOfInstruction,
              }}
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
              defaultValue={{
                label: !values.extraClientData.idDegreeOfInstruction
                  ? "Seleccione una situacion"
                  : values.extraClientData.idLaboralSituation === 1
                  ? "Dependiente"
                  : values.extraClientData.idLaboralSituation === 2
                  ? "Independiente"
                  : values.extraClientData.idLaboralSituation === 3
                  ? "Jubilada"
                  : values.extraClientData.idLaboralSituation === 4
                  ? "Estudiante"
                  : values.extraClientData.idLaboralSituation === 5 && "Otro",
                value: !values.extraClientData.idLaboralSituation
                  ? null
                  : values.extraClientData.idLaboralSituation,
              }}
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
        {values.extraClientData.idLaboralSituation === 5 && (
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex flexDir={"column"} width={"100%"}>
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
        )}
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
      </Stack>
    </Stack>
  );
}

export default Form;
