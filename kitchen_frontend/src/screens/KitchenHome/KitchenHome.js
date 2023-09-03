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

import i18next from "i18next";


const KitchenHome = ({ setValue , t}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [language, setLanguage] = React.useState(i18next.language);

  // It is a hook imported from 'react-i18next'
  

  // This function put query that helps to
  // change the language
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleOrderConfirmationScreen = () => {
    setValue(1);
  };
  
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    let loc = "http://localhost:8000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  }

  const handleLoginAndRegisterScreen = (e) => {
    setValue(4);
  }
  const handleProductInfoScreen = (e) => {
    setValue(6);
  }
  const handleCategoryMaster = (e) => {
    setValue(7);
  }
  return (
    <Container className={styles.outermostContainer}>
      <Box className={styles.firstBox}>
      
          <img width="600px" height="600px" src={(kitchen)} alt="img"/>
      
      </Box>
      <Box className={styles.secondBox}>
        <Button key="language" className={styles.redButton}>{t('language')}
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={language}
    label="Age"
    onChange={handleLanguageChange}
    sx={{backgroundColor:"white"}}
  >
    <MenuItem value={"en"}>{t('language_1')}</MenuItem>
    <MenuItem value={"zh"}>{t('language_2')}</MenuItem>
    <MenuItem value={"ja"}>{t('language_3')}</MenuItem>
  </Select>
        </Button>
        <Box className={styles.buttonGroup}>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleOrderConfirmationScreen}
          >
            {t('kitchen_option_1')}
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleLoginAndRegisterScreen}
          >
           {t('kitchen_option_2')}
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleProductInfoScreen}
          >
            {t('kitchen_option_3')}
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleCategoryMaster}
          >
            {t('kitchen_option_4')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default KitchenHome;
