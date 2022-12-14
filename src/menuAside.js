import {
  mdiAccountCircle,
  mdiMonitor,
  mdiViewList,
  mdiPackageVariantClosed,
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
