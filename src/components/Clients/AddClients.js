import React, { useState, useEffect } from "react";
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Form from "./Form";
import LaboralData from "./LaboralData";
import PartnerData from "./PartnerData";
import ReferenceList from "./ReferenceList";
import { AddIcon } from "@chakra-ui/icons";
import Clients from "apis/clients";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getClientSelected } from "store/selectors/clients";

function AddClients() {
  const history = useHistory();

  const client = useSelector(getClientSelected);
  const [validateData, setValidateData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (client) {
      console.log(client);
      setIsLoading(true);
      const clients = new Clients();
      clients
        .getFullClient(client)
        .then((res) => {
          console.log(res);
          setClientData({
            ...res.client,
            extraClientData: res.extraClientData,
          });
          setClientLaboralData(res.laborData);
          setSpouseData(res.spouse);
          setReferenceListFirst(res.referenceList[0]);
          setReferenceListSecond(res.referenceList[1]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [client]);

  const [clientData, setClientData] = useState({
    idDocumentType: 1,
    documentNumber: null,
    name: null,
    lastname: null,
    dateOfBirth: null,
    gender: null,
    citizenship: null,
    idCivilState: 0,
    phoneNumber: null,
    email: null,
    address: null,
    idFinancialState: 0,
    extraClientData: {
      idDegreeOfInstruction: 0,
      idLaboralSituation: 0,
      otherLaboralSituation: null,
      profession: null,
      occupation: null,
      dependents: 0,
    },
  });
  const [clientLaboralData, setClientLaboralData] = useState({
    ruc: null,
    business: null,
    activity: null,
    businessAddress: null,
    startDate: null,
    idCurrentPosition: 0,
    otherCurrentPosition: null,
    monthlyGrossIncome: 0,
    otherIncome: 0,
    businessPhone: null,
    idTypeOfRent: 0,
  });
  const [spouseData, setSpouseData] = useState({
    spouseData: {
      idDocumentType: 0,
      documentNumber: null,
      name: null,
      lastname: null,
      dateOfBirth: null,
      gender: null,
      citizenship: null,
      address: null,
      phoneNumber: null,
    },
    spouseLaborData: {
      ruc: null,
      business: null,
      activity: null,
      businessAddress: null,
      startDate: null,
      idCurrentPosition: 0,
      otherCurrentPosition: null,
      monthlyGrossIncome: 0,
      otherIncome: 0,
      businessPhone: null,
      idTypeOfRent: 0,
    },
  });

  const [referenceListFirst, setReferenceListFirst] = useState({
    idDocumentType: 0,
    documentNumber: null,
    name: null,
    lastname: null,
    dateOfBirth: null,
    gender: null,
    citizenship: null,
    address: null,
    phoneNumber: null,
  });
  const [referenceListSecond, setReferenceListSecond] = useState({
    idDocumentType: 0,
    documentNumber: null,
    name: null,
    lastname: null,
    dateOfBirth: null,
    gender: null,
    citizenship: null,
    address: null,
    phoneNumber: null,
  });
  const handleChangeClientData = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeClientLaboralData = (e) => {
    setClientLaboralData({
      ...clientLaboralData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSpouseData = (e) => {
    setSpouseData({
      ...spouseData,
      spouseData: {
        ...spouseData.spouseData,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleChangeSpouseLaboralData = (e) => {
    setSpouseData({
      ...spouseData,
      spouseLaborData: {
        ...spouseData.spouseLaborData,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleChangeReferenceListFirst = (e) => {
    setReferenceListFirst({
      ...referenceListFirst,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeReferenceListSecond = (e) => {
    setReferenceListSecond({
      ...referenceListSecond,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { extraClientData, ...rest } = clientData;
    const { referenceRelation, ...r } = rest;
    if (Object.keys(rest).some((key) => r[key] === null)) return;
    const data = {
      client: rest,
      extraClientData,
      laborData: clientLaboralData,
      spouse: {
        spouseData: spouseData.spouseData,
        spouseLaborData: spouseData.spouseLaborData,
      },
      referenceList: [referenceListFirst, referenceListSecond],
    };
    const clientInstance = new Clients();
    try {
      if (client) {
        await clientInstance.updateClient(data);
      } else {
        await clientInstance.createClient(data);
      }
      history.push("/admin/clients");
    } catch (error) {
      console.log(data);
      console.log(error);
      alert(error.toString());
    }
    console.log(data);
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner size={"lg"} />
      </div>
    );

  return (
    <Tabs
      isFitted
      variant={"enclosed"}
      pt={{ base: "120px", md: "20px" }}
      mt={{ base: "120px", md: "50px" }}
      height={"200px"}
    >
      <TabList>
        <Tab>Datos del cliente</Tab>
        <Tab>Datos laborales del cliente</Tab>
        <Tab>Datos del conyuge</Tab>
        <Tab>Lista de referencia</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Form
            handleChange={handleChangeClientData}
            setForm={setClientData}
            values={clientData}
            validate={setValidateData}
          />

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Button
              disabled={!validateData}
              onClick={handleSubmit}
              leftIcon={<AddIcon />}
              p={4}
            >
              AGREGAR
            </Button>
          </div>
        </TabPanel>
        <TabPanel>
          <LaboralData
            handleChange={handleChangeClientLaboralData}
            setForm={setClientLaboralData}
            values={clientLaboralData}
          />
        </TabPanel>
        <TabPanel>
          <PartnerData
            handleChange={handleChangeSpouseData}
            setForm={setSpouseData}
            values={spouseData}
            handleChangeLaboralData={handleChangeSpouseLaboralData}
          />
        </TabPanel>
        <TabPanel>
          <ReferenceList
            handleChange={handleChangeReferenceListFirst}
            setForm={setReferenceListFirst}
            values={referenceListFirst}
            handleChangeSecond={handleChangeReferenceListSecond}
            setFormSecond={setReferenceListSecond}
            valuesSecond={referenceListSecond}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default AddClients;
