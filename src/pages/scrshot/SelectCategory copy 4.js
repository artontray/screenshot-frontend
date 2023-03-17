import { Form } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import React, { useState } from "react";
import { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import styles from "../../styles/ScrShotCreateEditForm.module.css";

function SelectCategory(props) {
  const [results] = useState([]);
  const { ScrshotPrivateData, setScrshotPrivateData, category_id, category_title } = props;
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data
      const data  = await axiosReq.get(`/category/?page=2`);
      //const {data : category}  = await axiosReq.get(`/category/`);
      console.log(data.total);

      const totalCat = data.data.count;

      console.log(data.data);

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

  };


  //const { id, title, ...rest} = props;

  return (
<Form.Group>
        <Form.Label><Badge variant="light"><span className={styles.Labels}>Category : </span></Badge></Form.Label>
       
     
        <div className={styles.bgwarning}>{category_id && `Current : ${category_title}`}</div>
        <Form.Control as="select" id="category" name="category"
        onChange={handleChangeCategory}
        onClick={handleChangeCategory}
        defaultValue = {category_id}
        >
          <>
          
          <option key="0" value="none">
          Select Category
            </option>
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
