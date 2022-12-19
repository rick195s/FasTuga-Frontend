import {
  mdiAccountCircle,
  mdiMonitor,
  mdiViewList,
  mdiPackageVariantClosed,
  mdiSilverware,
  mdiFormTextboxPassword,
  mdiClipboardTextClockOutline,
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
    label: "Products",
    icon: mdiSilverware,
    name: "products",
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
    label: "History",
    icon: mdiClipboardTextClockOutline,
    name: "history",
  },
];
