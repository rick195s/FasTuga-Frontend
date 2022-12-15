import {
  mdiAccountCircle,
  mdiMonitor,
  mdiViewList,
  mdiPackageVariantClosed,
  mdiSilverware
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/orders",
    label: "Orders",
    icon: mdiPackageVariantClosed,
  },
  {
    to: "/products",
    label: "Products",
    icon: mdiSilverware,
  },
  {
    to: "/orderItems",
    label: "Items To Prepare",
    icon: mdiPackageVariantClosed,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
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
