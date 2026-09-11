export type ClientStatus = "Lead" | "Active" | "Past";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  shootType: string;
  status: ClientStatus;
  lastContact: string;
  lifetimeValue: number;
  avatarInitials: string;
}

export type BookingStatus = "Inquiry" | "Confirmed" | "Shot" | "Delivered";

export interface Booking {
  id: string;
  client: string;
  shootType: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
  fee: number;
}

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export interface Invoice {
  id: string;
  client: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
}

export const clients: Client[] = [
  {
    id: "c1",
    name: "Marisol & Dean Ferreira",
    email: "marisol.ferreira@gmail.com",
    phone: "(415) 555-0132",
    shootType: "Wedding",
    status: "Active",
    lastContact: "Feb 3, 2025",
    lifetimeValue: 6200,
    avatarInitials: "MF",
  },
  {
    id: "c2",
    name: "Nora Callahan",
    email: "nora.callahan@outlook.com",
    phone: "(212) 555-0187",
    shootType: "Portrait",
    status: "Lead",
    lastContact: "Feb 18, 2025",
    lifetimeValue: 0,
    avatarInitials: "NC",
  },
  {
    id: "c3",
    name: "Whitmore & Co.",
    email: "hello@whitmoreco.com",
    phone: "(646) 555-0110",
    shootType: "Branding",
    status: "Active",
    lastContact: "Jan 27, 2025",
    lifetimeValue: 3400,
    avatarInitials: "WC",
  },
  {
    id: "c4",
    name: "Priya & Aman Sethi",
    email: "priya.sethi88@gmail.com",
    phone: "(773) 555-0199",
    shootType: "Engagement",
    status: "Active",
    lastContact: "Feb 10, 2025",
    lifetimeValue: 1850,
    avatarInitials: "PS",
  },
  {
    id: "c5",
    name: "The Alders Family",
    email: "j.alders@icloud.com",
    phone: "(303) 555-0144",
    shootType: "Family",
    status: "Past",
    lastContact: "Nov 12, 2024",
    lifetimeValue: 950,
    avatarInitials: "TA",
  },
  {
    id: "c6",
    name: "Solano Vineyards",
    email: "events@solanovineyards.com",
    phone: "(707) 555-0176",
    shootType: "Event",
    status: "Lead",
    lastContact: "Feb 20, 2025",
    lifetimeValue: 0,
    avatarInitials: "SV",
  },
  {
    id: "c7",
    name: "Elena Marsh",
    email: "elena.marsh@proton.me",
    phone: "(917) 555-0123",
    shootType: "Portrait",
    status: "Active",
    lastContact: "Feb 15, 2025",
    lifetimeValue: 640,
    avatarInitials: "EM",
  },
  {
    id: "c8",
    name: "Boro & Finch Studio",
    email: "studio@borofinch.com",
    phone: "(312) 555-0165",
    shootType: "Product",
    status: "Past",
    lastContact: "Oct 2, 2024",
    lifetimeValue: 2100,
    avatarInitials: "BF",
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    client: "Marisol & Dean Ferreira",
    shootType: "Wedding — Full Day",
    date: "Mar 14, 2025",
    time: "10:00 AM",
    location: "Cavallo Point, Sausalito",
    status: "Confirmed",
    fee: 4800,
  },
  {
    id: "b2",
    client: "Priya & Aman Sethi",
    shootType: "Engagement Session",
    date: "Mar 2, 2025",
    time: "5:30 PM",
    location: "Golden Gate Park",
    status: "Confirmed",
    fee: 650,
  },
  {
    id: "b3",
    client: "Nora Callahan",
    shootType: "Studio Portrait",
    date: "Feb 26, 2025",
    time: "1:00 PM",
    location: "Studio A, Downtown",
    status: "Inquiry",
    fee: 400,
  },
  {
    id: "b4",
    client: "Solano Vineyards",
    shootType: "Corporate Event",
    date: "Mar 21, 2025",
    time: "6:00 PM",
    location: "Solano Vineyards, Napa",
    status: "Inquiry",
    fee: 2200,
  },
  {
    id: "b5",
    client: "Whitmore & Co.",
    shootType: "Brand Photography",
    date: "Feb 24, 2025",
    time: "9:00 AM",
    location: "Client HQ, SoMa",
    status: "Shot",
    fee: 1800,
  },
  {
    id: "b6",
    client: "Elena Marsh",
    shootType: "Headshot Refresh",
    date: "Feb 12, 2025",
    time: "11:00 AM",
    location: "Studio A, Downtown",
    status: "Delivered",
    fee: 320,
  },
  {
    id: "b7",
    client: "The Alders Family",
    shootType: "Family Portrait",
    date: "Nov 9, 2024",
    time: "4:00 PM",
    location: "Chautauqua Park",
    status: "Delivered",
    fee: 480,
  },
];

export const invoices: Invoice[] = [
  {
    id: "INV-1042",
    client: "Marisol & Dean Ferreira",
    issued: "Feb 1, 2025",
    due: "Feb 15, 2025",
    amount: 2400,
    status: "Paid",
  },
  {
    id: "INV-1043",
    client: "Whitmore & Co.",
    issued: "Feb 5, 2025",
    due: "Feb 19, 2025",
    amount: 1800,
    status: "Sent",
  },
  {
    id: "INV-1044",
    client: "Priya & Aman Sethi",
    issued: "Jan 30, 2025",
    due: "Feb 13, 2025",
    amount: 650,
    status: "Overdue",
  },
  {
    id: "INV-1045",
    client: "Elena Marsh",
    issued: "Feb 12, 2025",
    due: "Feb 26, 2025",
    amount: 320,
    status: "Paid",
  },
  {
    id: "INV-1046",
    client: "The Alders Family",
    issued: "Nov 10, 2024",
    due: "Nov 24, 2024",
    amount: 480,
    status: "Paid",
  },
  {
    id: "INV-1047",
    client: "Solano Vineyards",
    issued: "Feb 22, 2025",
    due: "Mar 8, 2025",
    amount: 1100,
    status: "Draft",
  },
];

export const revenueByMonth = [
  { month: "Sep", amount: 5200 },
  { month: "Oct", amount: 6800 },
  { month: "Nov", amount: 4300 },
  { month: "Dec", amount: 7100 },
  { month: "Jan", amount: 6450 },
  { month: "Feb", amount: 8320 },
];

export function currency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
