import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./employeesList.css";
import { AiFillLinkedin } from "react-icons/ai";
import { RiTwitterFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import axios from "axios";
import Scroll from "./scroll";

const EmployeesList = () => {
  const [employeeData, setemployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.tretton37.com/ninjas", {
        mode: "cors",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      })
      .then((res) => {
        setemployeeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employeeData.filter((employee) => {
        return Object.values(employee)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, employeeData]);

  if (loading) {
    return <p>Loading employeeData...</p>;
  }

  return (
    <Container w-100>
      <h1 className='mt-5 col-12'>tretton37</h1>
      <Form inline className='pb-2 pt-3 justify-content-center'>
        <InputGroup className='speaker-search col-12'>
          <InputGroup.Prepend className='icon-button'>
            <InputGroup.Text>
              <ImSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className='form-control col-6'
            type='text'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Form>

      <Row xs='12' className='justify-content-md-center'>
        <Scroll>
          <Col className='card-columns mb-5 pt-3'>
            <div className='card-list justify-content-center'>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, idx) => {
                  return (
                    <>
                      <Row>
                        <Col xs='12'>
                          <Card key={idx}>
                            <Row>
                              <Col xs='6'>
                                <Card.Img
                                  variant='top'
                                  className='p-2'
                                  alt='img'
                                  width={100}
                                  height={200}
                                  key={employee.idx}
                                  src={employee.imagePortraitUrl}
                                />
                              </Col>
                              <Col xs='6'>
                                <h1
                                  className='h6 mt-5'
                                  aria-label={employee.name}
                                >
                                  {employee.name}
                                </h1>
                                <p aria-label={employee.office}>
                                  <MdPlace /> {employee.office}
                                </p>

                                <Row className='p-1'>
                                  <Col xs='1'>
                                    <a
                                      className='icon'
                                      aria-label='Linkedin'
                                      variant='light'
                                      href={
                                        "https://www.linkedin.com" +
                                        employee.linkedIn
                                      }
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      <AiFillLinkedin />
                                    </a>
                                  </Col>
                                  <Col xs='1'>
                                    <a
                                      className='icon'
                                      aria-label='github'
                                      variant='light'
                                      href={
                                        "https://github.com/" + employee.gitHub
                                      }
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      <AiFillGithub />
                                    </a>
                                  </Col>
                                  <Col xs='1'>
                                    <a
                                      className='icon'
                                      variant='light'
                                      aria-label='twitter'
                                      href={
                                        "https://twitter.com/" +
                                        employee.twitter
                                      }
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      <RiTwitterFill />
                                    </a>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  );
                })
              ) : (
                <p>No employeeData found...</p>
              )}
            </div>
          </Col>
        </Scroll>
      </Row>
    </Container>
  );
};

export default EmployeesList;
