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
  Divider,
} from "@chakra-ui/react";

function PartnerData({ values, handleChange, setForm, handleChangeLaboral }) {
  return (
    <Stack pt={10} w={"100%"} display="flex" flexDirection={"column"}>
      <Heading as="h3" size={"lg"}>
        Datos del conyúge
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
            <FormLabel> Nombre </FormLabel>
            <Input
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
              size={"lg"}
              borderRadius={"6px"}
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
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
            <FormLabel> Ciudadania </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="citizenShip"
              type={"text"}
              onChange={handleChange}
              value={values.citizenShip}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Numero de telefono </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="phoneNumber"
              type={"text"}
              onChange={handleChange}
              value={values.phoneNumber}
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

        <Flex pt={5} alignItems={"center"} justifyContent={"space-between"}>
          <Heading as="h5" size={"lg"}>
            Datos Laborales
          </Heading>
        </Flex>
        <Divider />

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> RUC </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="ruc"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.ruc}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Empresa </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="business"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.business}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Giro o actividad </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="activity"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.activity}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <Flex flexDir={"column"} width={"100%"}>
              <FormLabel> Direcci&oacute;n de empresa </FormLabel>
              <Textarea
                size={"lg"}
                borderRadius={"6px"}
                name="businessAddress"
                type={"text"}
                onChange={handleChangeLaboral}
                value={values.businessAddress}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Fecha de ingreso </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="startDate"
              type={"date"}
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.startDate}
            />
          </Flex>

          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Cargo actual </FormLabel>
            <Select
              size={"lg"}
              borderRadius={"6px"}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  spouseLaborData: {
                    ...prev.spouseLaborData,
                    idCurrentPosition: e.value,
                  },
                }));
              }}
              options={[
                { value: "1", label: "Gerente" },
                { value: "2", label: "Ejecutivo" },
                { value: "3", label: "Empleado" },
                { value: "4", label: "Otros" },
              ]}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Ingreso bruto mensual</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="monthlyGrossIncome"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.monthlyGrossIncome}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Otros ingresos </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="otherIncome"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.otherIncome}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Telefono </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="businessPhone"
              type={"text"}
              onChange={handleChangeLaboral}
              value={values.businessPhone}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Tipo de Renta </FormLabel>
            <Select
              size={"lg"}
              borderRadius={"6px"}
              onChange={(e) =>
                setForm({
                  ...form,
                  spouseLaborData: {
                    ...form.spouseLaborData,
                    idTypeOfRent: e.value,
                  },
                })
              }
              options={[
                { value: "1", label: "1a (alquiler)" },
                { value: "2", label: "3a (comercio)" },
                { value: "3", label: "4a (Recibos x honorarios)" },
                { value: "4", label: "5a (Planilla-colaborador)" },
              ]}
            />
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}

export default PartnerData;
