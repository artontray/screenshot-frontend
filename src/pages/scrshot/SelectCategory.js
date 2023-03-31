import { Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import React, { useState } from "react";
import { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import styles from "../../styles/ScrShotCreateEditForm.module.css";

/**
 * SelectCategory component is displaying 
 * the list of all category owned by current logged user
 * */

function SelectCategory(props) {
  const [results] = useState([]);
  const { setScrshotPrivateData, category_id, category_title } = props;
  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosReq.get(`/category/`);
      /*
      Because of the REST pagination, only 10 results will appears
      on the SELECT tag, We need to go within the pagination and push results into a tab
      */

      if (data.data.count > data.data.results.length) {
        var categoryTotal = data.data.count;
        var TotalDisplayed = data.data.results.length
        var page = 1;
        data.data.results.map((value) => (
          results.push({
            key: value.title,
            value: value.id,
          })
        ));
        while (TotalDisplayed < categoryTotal) {
          page++;
          const requete = await axiosReq.get(`/category/?page=${page}`);
          TotalDisplayed = TotalDisplayed + requete.data.results.length
          requete.data.results.map((value) => (
            results.push({
              key: value.title,
              value: value.id,
            })
          ));
        }
      } else {
        data.data.results.map((value) => (
          results.push({
            key: value.title,
            value: value.id,
          })
        ));
      }

    }
    fetchData();
  }, [results]);


  const handleChangeCategory = (event) => {
    setScrshotPrivateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

  };

  return (
    <Form.Group>
      <Form.Label>
        <Badge variant="light"><span className={styles.Labels}>Category : </span></Badge>
      </Form.Label>
      <div className={styles.bgwarning}>
        {category_id && `${category_title} (current selection)`}
      </div>
      <Form.Control as="select" id="category" name="category"
        onChange={handleChangeCategory}
        onClick={handleChangeCategory}
        defaultValue={category_id}
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
