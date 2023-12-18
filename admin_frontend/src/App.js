import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminHome from "./screens/AdminHome/AdminHome";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen/OrderConfirmationScreen";
import ViewOrder from "./screens/ViewOrder/ViewOrder";
import DeliveryConfirmationScreen from "./screens/DeliveryConfirmationScreen/DeliveryConfirmationScreen";
import AdminSignInSide from "./screens/AdminLoginAndRegister/Login";
import AdminSignUp from "./screens/AdminLoginAndRegister/Register";
import ProductInfo from "./screens/ProductInfo/ProductInfo";
import CategoryMaster from "./screens/CategoryMaster/CategoryMaster";
import AdminControlScreen from "./screens/AdminControlScreen/AdminControlScreen";
import SattelementProcess from "./screens/SattelementProcess/SattelementProcess";
import { useTranslation } from 'react-i18next'
import "./i18n.js";

function App() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [sum, setSum] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      {/* <Avatar sx={{ bgcolor: "red" }}>
        <LocalDiningIcon />
      </Avatar> */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{backgroundColor:"lightblue", display:"none"}}
      >
        <Tab label="AdminHome" />
        <Tab label="OrderConfirmationScreen" />
        <Tab label="ViewOrder" />
        <Tab label="DeliveryConfirmationScreen" />
        <Tab label="LoginScreen"/>
        <Tab label="SignupScreen"/>
        <Tab label="AdminLoginScreen"/>
        <Tab label="AdminSignupScreen"/>
        <Tab label="ProductInfoScreen"/>
        <Tab label="CategoryMaster"/>
        <Tab label="AdminControlScreen"/>
      </Tabs>
      <TabPanel value={value} index={0} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminHome setValue={setValue} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <OrderConfirmationScreen setValue={setValue} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={2} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ViewOrder setValue={setValue} setData={setData} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={3} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <DeliveryConfirmationScreen setValue={setValue} data={data} iamge={image} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={8} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminSignInSide setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={9} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminSignUp setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={6} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ProductInfo setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={7} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <CategoryMaster setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={10} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminControlScreen setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={11} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <SattelementProcess setValue={setValue} data={data} t={t}/>
      </TabPanel>

      <Box sx={{ p: 3 }}>{/* Your content goes here */}</Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default App;
