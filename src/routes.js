import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
import { useTranslation } from 'react-i18next';

// @mui icons
import Icon from "@mui/material/Icon";
import MyAds from "layouts/myads";

const AppRoutes = () => {
  const { t } = useTranslation();

  const routes = [
    {
      type: "collapse",
      name: t('routes.allAds'),
      key: "tables",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/tables",
      component: <Tables />,
    },
    {
      type: "collapse",
      name: t('routes.myAds'),
      key: "myads",
      icon: <Icon fontSize="small">table_view</Icon>,
      route: "/myads",
      component: <MyAds />,
    },
    {
      type: "collapse",
      name: t('routes.newAd'),
      key: "billing",
      icon: <Icon fontSize="small">add</Icon>,
      route: "/billing",
      component: <Billing />,
    },
    {
      type: "collapse",
      name: t('routes.signIn'),
      key: "sign-in",
      icon: <Icon fontSize="small">login</Icon>,
      route: "/authentication/sign-in",
      component: <SignIn />,
    }
  ];

  return routes;
};

export default AppRoutes;
