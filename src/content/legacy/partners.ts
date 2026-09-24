// Generated from inventory/partners.csv: the 40 partner hospitals behind the live
// /our-partners/ state filter. Names are exactly as the live site shows them, including
// "Hosplital", until PMG confirms (deliverables/partners-to-confirm.csv). City and phone
// appear only where the live site has them; guessed cities are never included.
//
// Sanity holds partner data once imported (scripts/import-partners.ts). Until then, and
// whenever the dataset has no partner records, the site reads this list.

export type PartnerHospital = {
  name: string;
  state: string;
  city?: string;
  phone?: string;
  website?: string;
  legacyUrl?: string;
};

export const partnerHospitals: PartnerHospital[] = [
  {
    name: "Ferrell Pain Management Center",
    state: "illinois",
    website: "https://www.ferrellhosp.org/",
    legacyUrl: "/em_portfolios/ferrell-pain-management-center/",
  },
  {
    name: "Marshall Browning",
    state: "illinois",
    website:
      "https://www.marshallbrowninghospital.com/getpage.php?name=Pain_Management_Clinic&sub=Services",
    legacyUrl: "/em_portfolios/marshall-browning/",
  },
  {
    name: "MASSAC Hospital",
    state: "illinois",
    website: "https://www.massachealth.org/",
    legacyUrl: "/em_portfolios/massac-hospital/",
  },
  {
    name: "Decatur County Memorial Pain Management Center",
    state: "indiana",
    city: "Greensburg",
    phone: "812-663-1185",
    website: "https://www.dcmh.net/health-services/clinical-services/pain/",
    legacyUrl: "/em_portfolios/decatur-county-memorial-pain-management-center/",
  },
  {
    name: "Hancock Pain Management",
    state: "indiana",
    city: "Greenfield",
    phone: "317-468-4090",
    website:
      "https://www.hancockhealth.org/location/hancock-pain-management-center/",
    legacyUrl: "/em_portfolios/hancock-pain-management/",
  },
  {
    name: "Perry County Memorial Hosplital",
    state: "indiana",
    website: "https://www.pchospital.org/",
    legacyUrl: "/em_portfolios/perry-county-memorial-hosplital/",
  },
  {
    name: "PUTNAM COUNTY HOSPITAL PAIN MANAGEMENT CENTER",
    state: "indiana",
    city: "Greencastle",
    phone: "765-658-2706",
    website: "https://www.pchosp.org/pain-management-center",
    legacyUrl: "/em_portfolios/putnam-county-hospital-pain-management-center/",
  },
  {
    name: "Breckinridge Health Pain Management Center",
    state: "kentucky",
    website: "https://www.mybreckhealth.org/",
    legacyUrl: "/em_portfolios/breckinridge-health-pain-management-center/",
  },
  {
    name: "Harrison Memorial Pain Management",
    state: "kentucky",
    city: "Cynthiana",
    phone: "859-235-3724",
    website: "https://harrisonmemhosp.com/services/pain-management/",
    legacyUrl: "/em_portfolios/harrison-memorial-pain-management/",
  },
  {
    name: "MEADOWVIEW INTERVENTIONAL PAIN MANAGEMENT",
    state: "kentucky",
    city: "Marysville",
    phone: "606-759-2180",
    website: "https://www.meadowviewregional.com/pain-management-services",
    legacyUrl: "/em_portfolios/meadowview-interventional-pain-management/",
  },
  {
    name: "OHIO COUNTY PAIN CARE",
    state: "kentucky",
    city: "Hartford",
    phone: "270-298-5445",
    website: "https://ochcares.com/Pain",
    legacyUrl: "/em_portfolios/ohio-county-pain-care/",
  },
  {
    name: "TWIN LAKES PAIN MANAGEMENT CENTER",
    state: "kentucky",
    city: "Leitchfield",
    phone: "270-259-9405",
    website: "https://www.tlrmc.com/",
    legacyUrl: "/em_portfolios/twin-lakes-pain-management-center/",
  },
  {
    name: "Houlton Regional Hospital",
    state: "maine",
    website: "https://houltonregional.org/",
    legacyUrl: "/em_portfolios/houlton-regional-hospital/",
  },
  {
    name: "Northern Maine Medical Center",
    state: "maine",
    website: "https://nmmc.org/services/outpatient/pain-management/",
    legacyUrl: "/em_portfolios/northern-maine-medical-center/",
  },
  {
    name: "Allegan Pain Management Center",
    state: "michigan",
    city: "Allegan",
    phone: "269-686-4300",
    website:
      "https://locations.beaconhealthsystem.org/mi/allegan/beacon-allegan-pain-mangement-center",
    legacyUrl: "/em_portfolios/allegan-pain-management-center/",
  },
  {
    name: "MEMORIAL PAIN CLINIC",
    state: "michigan",
    city: "Owosso",
    phone: "989-729-4190",
    website:
      "https://www.memorialhealthcare.org/location/memorial-healthcare-pain-management/",
    legacyUrl: "/em_portfolios/memorial-pain-clinic/",
  },
  {
    name: "SPINE AND PAIN PROGRAM AT MYMICHIGAN MEDICAL CENTER",
    state: "michigan",
    city: "West Branch",
    phone: "989-343-3730",
    website:
      "https://www.mymichigan.org/conditions-treatments/pain-management/outpatient-pain-management-programs/spine-and-pain-program/",
    legacyUrl:
      "/em_portfolios/spine-and-pain-program-at-mymichigan-medical-center-west-branch/",
  },
  {
    name: "Columbus Regional",
    state: "north-carolina",
    website: "https://crhealthcare.org/services/pain-management/",
    legacyUrl: "/em_portfolios/columbus-regional/",
  },
  {
    name: "ACRMC Restorative Pain Care",
    state: "ohio",
    city: "Seaman",
    phone: "937-386-3099",
    website: "https://acrmc.com/restorative-pain-care/",
    legacyUrl: "/em_portfolios/acrmc-restorative-pain-care/",
  },
  {
    name: "Avita Pain Management",
    state: "ohio",
    city: "Galion",
    phone: "419-462-4547",
    website: "https://avitahealth.org/services/pain-management/",
    legacyUrl: "/em_portfolios/avita-pain-management-center-galion/",
  },
  {
    name: "Blanchard Valley Pain Management Centers",
    state: "ohio",
    city: "Findlay",
    phone: "419-423-5555",
    website:
      "https://www.bvhealthsystem.org/services/pain-management/pain-management",
    legacyUrl:
      "/em_portfolios/blanchard-valley-pain-management-center-findlay/",
  },
  {
    name: "Clinton Pain Management Center",
    state: "ohio",
    city: "Wilmington",
    phone: "937-283-2580",
    website: "https://www.cmhregional.com/pain-management",
    legacyUrl: "/em_portfolios/clinton-pain-management-center/",
  },
  {
    name: "Crystal Clinic Pain Management Center",
    state: "ohio",
    city: "Akron",
    phone: "330-668-6789",
    website: "https://www.crystalclinic.com/services/pain-management",
    legacyUrl: "/em_portfolios/crystal-clinic-pain-management-center/",
  },
  {
    name: "Fisher-Titus Pain Management Centers",
    state: "ohio",
    city: "Norwalk",
    phone: "419-660-6901",
    website: "https://www.fishertitus.org/medical-services/pain-management/",
    legacyUrl: "/em_portfolios/fisher-titus-pain-management-center-sandusky/",
  },
  {
    name: "Grand Lake PAIN MANAGEMENT CENTER",
    state: "ohio",
    city: "St. Marys",
    phone: "419-394-9520",
    website: "https://grandlakehealth.org/services/pain-management/",
    legacyUrl: "/em_portfolios/new-day-pain-management-center/",
  },
  {
    name: "Henry County Pain Management Center",
    state: "ohio",
    city: "Napoleon",
    phone: "419-591-3859",
    website:
      "https://www.henrycountyhospital.org/our-services/pain-management-center/",
    legacyUrl: "/em_portfolios/henry-county-pain-management-center/",
  },
  {
    name: "Knox Center for Pain Management",
    state: "ohio",
    city: "Mt. Vernon",
    phone: "740-393-9866",
    website: "https://www.kch.org/center-pain-management",
    legacyUrl: "/em_portfolios/knox-center-for-pain-management/",
  },
  {
    name: "MADISON HEALTH PAIN MANAGEMENT",
    state: "ohio",
    city: "London",
    phone: "740-845-7660",
    website: "http://www.madison-health.com/painmanagement.php",
    legacyUrl: "/em_portfolios/madison-health-pain-management/",
  },
  {
    name: "MAGRUDER PAIN MANAGEMENT CENTER",
    state: "ohio",
    city: "Port Clinton",
    phone: "419-732-3972",
    website: "https://www.magruderhospital.com/",
    legacyUrl: "/em_portfolios/magruder-pain-management-center/",
  },
  {
    name: "MEMORIAL PAIN SOLUTIONS",
    state: "ohio",
    city: "Marysville",
    phone: "937-578-4580",
    website: "https://memorialohio.com/services/pain-solutions/",
    legacyUrl: "/em_portfolios/memorial-pain-solutions/",
  },
  {
    name: "Parkview Pain Management Clinic",
    state: "ohio",
    city: "Bryan",
    phone: "419-633-7343",
    website:
      "https://www.parkview.com/locations/pain-management-clinic-at-parkview-bryan-hospital",
    legacyUrl:
      "/em_portfolios/community-hospitals-wellness-centers-pain-management-center/",
  },
  {
    name: "PAULDING COUNTY PAIN MANAGEMENT",
    state: "ohio",
    city: "Paulding",
    phone: "419-399-1136",
    website: "https://pauldingcountyhospital.com/pain-management/",
    legacyUrl: "/em_portfolios/paulding-county-pain-management/",
  },
  {
    name: "Southeastern Pain Management",
    state: "ohio",
    website:
      "https://www.ohiohealth.com/locations/hospitals/southeastern-medical-center",
    legacyUrl: "/em_portfolios/southeastern-pain-management/",
  },
  {
    name: "UH SAMARITAN PAIN CLINIC",
    state: "ohio",
    city: "Ashland",
    phone: "419-207-2721",
    website:
      "https://www.uhhospitals.org/locations/uh-samaritan-medical-center/services/pain-clinic",
    legacyUrl: "/em_portfolios/uh-samaritan-pain-clinic/",
  },
  {
    name: "VAN WERT COUNTY PAIN MANAGEMENT CENTER",
    state: "ohio",
    city: "Van Wert",
    phone: "419-232-6060",
    website:
      "https://www.ohiohealth.com/locations/hospitals/van-wert-hospital/physician-practices",
    legacyUrl: "/em_portfolios/van-wert-county-pain-management-center/",
  },
  {
    name: "WAYNE HEALTH PAIN MANAGEMENT",
    state: "ohio",
    city: "Greenville",
    phone: "937-569-7246",
    website: "https://www.waynehealthcare.org/our-services/pain-management/",
    legacyUrl: "/em_portfolios/wayne-health-pain-management/",
  },
  {
    name: "Edgewood Pain Management Center",
    state: "pennsylvania",
    city: "Transfer",
    phone: "724-646-7246",
    website: "https://edgewoodsurgical.com/pain-management-2/",
    legacyUrl: "/em_portfolios/edgewood-pain-management-center/",
  },
  {
    name: "Hardin Medical Center",
    state: "tennessee",
    website: "https://www.hardinmedicalcenter.org/services",
    legacyUrl: "/em_portfolios/hardin-medical-center/",
  },
  {
    name: "RHEA PAIN MANAGEMENT CENTER",
    state: "tennessee",
    city: "Dayton",
    phone: "423-285-5220",
    website: "https://rheamedical.org/services/pain-management-center/",
    legacyUrl: "/em_portfolios/rhea-pain-management-center/",
  },
  {
    name: "Edgerton Hospital Pain & Spine Center",
    state: "wisconsin",
    city: "Edgerton",
    phone: "608-561-6641",
    website: "https://www.edgertonhospital.com/our-services/pain-spine-center/",
    legacyUrl: "/em_portfolios/edgerton-hospital-pain-spine-center/",
  },
];
