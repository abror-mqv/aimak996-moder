// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useTranslation } from 'react-i18next';

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import AdvertisementForm from "./сomps/AdvertisementForm";
import axios from "axios";
import { POST_AD } from "constants/crud";

function Billing() {
  const { t } = useTranslation();

  const handleSubmit = (formData) => {
    const token = localStorage.getItem("authToken")
    axios.post(`${POST_AD}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Token ${token}`
      }
    })
    .then(response => {
      alert(t('newAd.success'));
    })
    .catch(error => {
      console.error(t('newAd.error'), error);
      if (error.response) {
        console.error('Данные ошибки:', error.response.data);
        console.error('Статус ошибки:', error.response.status);
      }
    });
  };

  return (
    <DashboardLayout>
      <MDBox mt={0}>
        <MDTypography variant="h6" mb={3}>
          {t('newAd.title')}
        </MDTypography>
        <AdvertisementForm onSubmit={handleSubmit} />
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
