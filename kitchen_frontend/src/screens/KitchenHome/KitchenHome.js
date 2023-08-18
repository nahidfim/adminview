import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./KitchenHome.module.css";
import kitchen from "../../static/Images/kitchen.jpg";


const KitchenHome = ({ setValue }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [language, setLanguage] = React.useState("English")
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleOrderConfirmationScreen = () => {
    setValue(1);
  };
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const handleLoginAndRegisterScreen = (e) => {
    setValue(4);
  }
  const handleProductInfoScreen = (e) => {
    setValue(6);
  }
  return (
    <Container className={styles.outermostContainer}>
      <Box className={styles.firstBox}>
      
          <img width="600px" height="600px" src={(kitchen)} alt="img"/>
      
      </Box>
      <Box className={styles.secondBox}>
        <Button key="language" className={styles.redButton}>Language
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={language}
    label="Age"
    onChange={handleLanguageChange}
    sx={{backgroundColor:"white"}}
  >
    <MenuItem value={"English"}>English</MenuItem>
    <MenuItem value={"Chinese"}>Chinese</MenuItem>
    <MenuItem value={"Japanese"}>Japanese</MenuItem>
  </Select>
        </Button>
        <Box className={styles.buttonGroup}>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleOrderConfirmationScreen}
          >
            Order Confirmation Screen
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleLoginAndRegisterScreen}
          >
            Login And Register Screen
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleProductInfoScreen}
          >
            Product Info Screen
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default KitchenHome;
