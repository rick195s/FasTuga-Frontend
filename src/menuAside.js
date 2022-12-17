import {
  mdiAccountCircle,
  mdiMonitor,
  mdiViewList,
  mdiPackageVariantClosed,
  mdiFormTextboxPassword,
} from "@mdi/js";

export default [
  {
    label: "Dashboard",
    icon: mdiMonitor,
    name: "dashboard",
  },
  {
    label: "Orders",
    icon: mdiPackageVariantClosed,
    name: "orders",
  },
  {
    label: "Items To Prepare",
    icon: mdiPackageVariantClosed,
    name: "itemsToPrepare",
  },
  {
    label: "Items To Deliver",
    icon: mdiPackageVariantClosed,
    name: "ordersToDeliver",
  },
  {
    label: "Profile",
    icon: mdiAccountCircle,
    name: "profile",
  },
  {
    label: "Profile",
    icon: mdiAccountCircle,
    name: "customerProfile",
  },
  {
    label: "Change Password",
    icon: mdiFormTextboxPassword,
    name: "changePassword",
  },
  {
    label: "Dropdown",
    icon: mdiViewList,
    menu: [
      {
        label: "Item One",
      },
      {
        label: "Item Two",
      },
    ],
  },
];
