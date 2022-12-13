import {
  mdiAccountCircle,
  mdiMonitor,
  mdiViewList,
  mdiPackageVariantClosed,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: mdiMonitor,
    name: "dashboard",
  },
  {
    to: "/orders",
    label: "Orders",
    icon: mdiPackageVariantClosed,
    name: "orders",
  },
  {
    to: "/orderItems",
    label: "Items To Prepare",
    icon: mdiPackageVariantClosed,
    name: "itemsToPrepare",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
    name: "profile",
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
