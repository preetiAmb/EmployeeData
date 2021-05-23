import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "./employeesList.css";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { MdPlace } from "react-icons/md";

const EmployeesList = () => {
  const [employeeData, setemployeeData] = useState([]);

  useEffect(() => {
    fetch(`https://api.tretton37.com/ninjas`, {
      mode: "cors",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    })
      .then((res) => res.json())
      .then((res) => setemployeeData(res));
    /* .then((data) => data.json())
      .then((resp) => {
        if(resp.success) {
          setemployeeData(resp);
        } else {
          console.log(resp);
        }
        {resp.map(e => console.log(e.name))}
    
      })  */
  });

  return (
    <Container w-100>
      <h1 className="mt-5 align-items-center">tretton37</h1>
      <Form className="mb-5 mt-5">
        <Form.Row className="align-items-center">
          <Col xs="8" className="my-1 align-items-center">
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              custom
            >
              <option value="0">Choose...</option>
              <option value="1">Name</option>
              <option value="2">Office</option>
            </Form.Control>
          </Col>
        </Form.Row>
      </Form>
      <Row xs="12" className="justify-content-md-center">
        <Col className="card-columns mb-5 image-flip">
          <div className="justify-content-center">
          {employeeData.length &&
            employeeData.map((employee, name) => {
              return (
                <>
                <Row>
                  <Col xs="12">
                  <Col xs="4">
                  <Card.Img
                    variant="top"
                    alt="img"
                    width={50}
                    height={100}
                    key={employee.name}
                    src={employee.imagePortraitUrl}
                  />
                  </Col>
                  <Col xs="8">
                  <Row xs="12">
                    <Col xs="6">
                      <h5 aria-label={employee.name}>{employee.name}</h5>
                    </Col>
                    <Col xs="1">
                      <Button variant="light" href={"https://www.linkedin.com"+employee.linkedIn} target="_blank">
                        <RiLinkedinBoxFill />
                      </Button>
                    </Col>
                    <Col xs="1">
                      <Button variant="light" href={"https://github.com/"+employee.gitHub} target="_blank">
                        {" "}
                        <AiFillGithub />
                      </Button>
                    </Col>
                    <Col xs="1">
                      <Button variant="light" href={"https://twitter.com/"+employee.twitter} target="_blank">
                        <AiFillTwitterCircle />
                      </Button>
                    </Col>
                  </Row>
                  <h6 aria-label={employee.office}>
                    <MdPlace /> {employee.office}
                  </h6>
                  </Col>
                  </Col>
                  </Row>
                </>             
              );
            })}
            
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeesList;
