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

function LaboralData({ handleChange, values, setForm }) {
  return (
    <Stack pt={10} w={"100%"} display="flex" flexDirection={"column"}>
      <Heading as="h3" size={"lg"}>
        Datos laborales/Negocio propio
      </Heading>
      <Stack pt={5}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Ruc </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="ruc"
              onChange={handleChange}
              value={values.ruc}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Empresa </FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="business"
              onChange={handleChange}
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
              onChange={handleChange}
              value={values.activity}
            />
          </Flex>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel> Direccion de Negocio</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="businessAddress"
              onChange={handleChange}
              value={values.businessAddress}
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} width={"45%"}>
            <FormLabel>Fecha de ingreso</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="startDate"
              type={"date"}
              onChange={handleChange}
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
                  idCurrentPosition: e.value,
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
            <FormLabel>Otra posicion</FormLabel>
            <Input
              size={"lg"}
              borderRadius={"6px"}
              name="otherCurrentPosition"
              onChange={handleChange}
              value={values.otherCurrentPosition}
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
              onChange={handleChange}
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
              onChange={handleChange}
              value={values.otherIncome}
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
            <FormLabel> Tipo de Renta </FormLabel>
            <Select
              size={"lg"}
              borderRadius={"6px"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  idTypeOfRent: e.value,
                }))
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

export default LaboralData;
