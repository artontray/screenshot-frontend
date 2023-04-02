import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";


/**
 * 
 * MoreDropdown component is used to display a quick menu 
 * available with just a click on an icon.
 */

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-circle-chevron-down fa-2x"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

const ThreeDotsVersion2 = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-ellipsis fa-2x"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));




/**
 * 
 * Used for several situations : 
 * - Edit or delete a comment
 * - Edit or delete a screenshot
 * 
 */


export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-auto  ${styles.MyDropDown} ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};


/**
 * 
 * Used as Category Quick menu so User can :
 * - See All category Page
 * - See All private Screenshot Page
 * - Search category Page
 * - Delete Category Page 
 * 
 */
export const SeeAllDropdown = ({ handleSeeAllCategory, handleSeeLastPrivateScrshot, SearchCategory, handleDeleteCategory }) => {
  return (
    <Dropdown className={`${styles.MyDropDown} ml-auto`} drop="left">
      <Dropdown.Toggle as={ThreeDotsVersion2} />
      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItemOnList}
          onClick={handleSeeAllCategory}
          aria-label="SeeAllCategory"
        >
          <i className={`fa-solid fa-folder-open fa-sm ${styles.Icons}`} /> All Category
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItemOnList}
          onClick={handleSeeLastPrivateScrshot}
          aria-label="SeeAllPrivScrShot"
        >
          <i className={`fa-solid fa-camera fa-sm ${styles.Icons}`} /> All Private
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItemOnList}
          onClick={SearchCategory}
          aria-label="SearchCategory"
        >
          <i className={`fas fa-search fa-sm ${styles.Icons}`} /> Search Category
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItemOnList}
          onClick={SearchCategory}
          aria-label="DeleteCategory"
        >
          <i className={`fa-solid fa-trash fa-sm ${styles.Icons}`} /> Delete Category
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};


/**
 * 
 * Used for Profile Edition Quick Menu so User can :
 * - Change Username
 * - Edit profile
 * - Change password
 * 
 */
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.MyDropDown} ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className={`fas fa-edit fa-sm ${styles.Icons}`} /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className={`far fa-id-card fa-sm ${styles.Icons}`} />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className={`fas fa-key fa-sm ${styles.Icons}`} />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};