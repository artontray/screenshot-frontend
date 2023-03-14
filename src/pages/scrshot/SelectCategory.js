import { Form } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import React, { useState } from "react";
import { useEffect } from "react";



function SelectCategory(props) {
  const [results] = useState([]);
  const { ScrshotPrivateData, setScrshotPrivateData } = props;
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data
      const data  = await axiosReq.get(`/category/`);

      console.log('in select cat')

      
      // Store results in the results array
      data.data.results.map((value) => (
        results.push({
        key: value.title,
         value: value.id,
        })
  ));




      
    }

    // Trigger the fetch
    fetchData();
  }, [results]);




  const handleChangeCategory = (event) => {
    setScrshotPrivateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
      }));
    console.log(ScrshotPrivateData);
  };


  //const { id, title, ...rest} = props;

  return (
<Form.Group>
        <Form.Label>Describe it!</Form.Label>
        <Form.Control as="select" id="category" name="category"
        onChange={handleChangeCategory}

        >
          <>
          {console.log(results)}
        {results && results.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
             
          );
        })}</>
        </Form.Control>
      </Form.Group>
  

  );
}

export default SelectCategory;
