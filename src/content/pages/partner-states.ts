// Intros for the 10 state pages. Each is specific to that state's partner hospitals and
// uses only facts from the partner data (inventory/partners.csv): center names, their host
// hospitals, cities where the live site gives one, and which listings carry a phone or
// website. Regions are named only for partners whose city is on the live site. Partners
// with no city on the live site are never placed in a town or region.
// tests/partner-states.test.ts checks length (100 to 200 words) and shared boilerplate.

export const stateIntros: Record<string, string[]> = {
  illinois: [
    "Pain Management Group works with three Illinois hospitals: Ferrell Hospital, where the program is the Ferrell Pain Management Center; Marshall Browning Hospital; and MASSAC Hospital. Each program is part of its hospital rather than a separate practice.",
    "The live PMG directory lists a website for each of the three, and those links are below. To schedule, start with the hospital itself: the pain management team works inside it and books its own appointments.",
    "If you run a hospital in Illinois and want to know how these programs were set up, PMG can walk you through the partnership model, from the first assessment to the ongoing management of the center.",
  ],
  indiana: [
    "In Indiana, PMG partners with four hospitals. Decatur County Memorial Hospital in Greensburg runs the Decatur County Memorial Pain Management Center. Hancock Regional Hospital in Greenfield operates Hancock Pain Management. Putnam County Hospital in Greencastle hosts the Putnam County Hospital Pain Management Center. Perry County Memorial is listed by name only, and its website is linked below.",
    "Greenfield sits east of Indianapolis and Greencastle to its west, while Greensburg is in southeastern Indiana, so the partner centers cover several parts of the state.",
    "Phone numbers are shown for the Greensburg, Greenfield, and Greencastle programs. Call the center directly to ask about referrals and appointments, or follow the hospital website for directions and hours.",
  ],
  kentucky: [
    "Five Kentucky hospitals partner with PMG. Harrison Memorial Pain Management serves Cynthiana. Ohio County Hospital in Hartford runs Ohio County Pain Care. Twin Lakes Regional Medical Center in Leitchfield houses the Twin Lakes Pain Management Center in its Kelley Medical Building. Meadowview Regional Medical Center operates Meadowview Interventional Pain Management, and Breckinridge Health runs the Breckinridge Health Pain Management Center.",
    "Hartford and Leitchfield are in the western half of the state, and Cynthiana lies north of Lexington. Each center is listed below with its phone number and hospital website where the directory has them.",
    "These programs carry their hospitals' names because they are hospital services. A patient, family member, or referring physician should contact the hospital's pain center to arrange a visit.",
  ],
  maine: [
    "PMG's Maine partners are Houlton Regional Hospital and Northern Maine Medical Center. They are the only New England hospitals in PMG's partner directory, and each runs its pain program as a service of the hospital.",
    "The directory lists each hospital by name with a link to its website. Northern Maine Medical Center's link goes straight to its outpatient pain management page; Houlton Regional Hospital's goes to the hospital's home page.",
    "Patients looking for an appointment should contact the hospital directly; the directory does not list a separate phone number for either program. For hospital leaders in Maine or elsewhere in New England, PMG can explain how a partnership like these is structured and managed.",
  ],
  michigan: [
    "Three Michigan hospitals partner with PMG, in three different parts of the state. In Allegan, in southwest Michigan, the Allegan Pain Management Center operates at Ascension Borgess Allegan. In Owosso, Memorial Healthcare's Memorial Pain Clinic is in the King Street Professional Building. In West Branch, in northern lower Michigan, MyMichigan Medical Center runs its Spine and Pain Program.",
    "All three listings below include a phone number and a link to the program's page on the hospital website. Those pages are the best source for hours, directions, and referral steps.",
    "Each of these programs belongs to its hospital, and appointments are made through the hospital's pain team. Michigan hospital leaders weighing a pain service line can talk with PMG about how these partnerships work.",
  ],
  "north-carolina": [
    "PMG's partner in North Carolina is Columbus Regional, whose pain management service is listed below with a link to its page on the Columbus Regional Healthcare website.",
    "Like every PMG partner program, it operates as a service of the hospital rather than as a separate practice. That means scheduling, referrals, and questions about coverage go through Columbus Regional itself. The hospital's pain management page is the most direct route for patients and referring physicians.",
    "North Carolina is one of the states where PMG has a single partner today. If you lead a hospital in the Carolinas and are considering an outpatient pain management service line, PMG can explain its partnership model, what the first assessment involves, and how the program is managed after launch.",
  ],
  ohio: [
    "Ohio is home to PMG's largest group of partner hospitals, and to PMG itself, which is based in Findlay. Blanchard Valley Hospital in Findlay runs the Blanchard Valley Pain Management Centers.",
    "Across northwest Ohio, partners include Henry County Hospital in Napoleon, Parkview in Bryan, Paulding County Hospital in Paulding, Van Wert County Hospital in Van Wert, and the Grand Lake Pain Management Center in St. Marys. Near Lake Erie are Magruder Hospital in Port Clinton and Fisher-Titus Medical Center in Norwalk, and in north-central Ohio, UH Samaritan in Ashland and Avita's Galion Community Hospital.",
    "In central Ohio, Knox Community Hospital in Mt. Vernon, Madison Health in London host programs, as does Memorial Pain Solutions in Marysville. Farther west and south are Wayne Healthcare in Greenville, Clinton Memorial in Wilmington, and Adams County Regional Medical Center in Seaman, home to ACRMC Restorative Pain Care. Crystal Clinic Orthopaedic Center in Akron and Southeastern Pain Management complete the list.",
  ],
  pennsylvania: [
    "In Pennsylvania, PMG partners with Edgewood Surgical Hospital in Transfer, in the western part of the state near the Ohio line. The hospital's program is the Edgewood Pain Management Center.",
    "The listing below includes the center's phone number and a link to its page on the Edgewood Surgical Hospital website. Patients and referring physicians can use either to ask about appointments and referrals.",
    "Edgewood's program runs inside the hospital, the same hospital-based model PMG uses with every partner. For Pennsylvania hospital leaders, it is a nearby example of what a partnership looks like in practice, and PMG can explain how the model would apply to your community.",
  ],
  tennessee: [
    "PMG has two partner hospitals in Tennessee. Rhea Medical Center in Dayton, in East Tennessee, runs the Rhea Pain Management Center. Hardin Medical Center is the second partner, and the directory links to the hospital's services page.",
    "The Rhea Pain Management Center listing includes a phone number for appointments and questions. For Hardin Medical Center, the directory lists no phone number, so the hospital website is the place to start.",
    "Both programs are hospital services, not independent clinics. Referrals come from the physicians who already care for the hospital's patients. Tennessee hospital leaders interested in how these partnerships were built can schedule a call with PMG.",
  ],
  wisconsin: [
    "Edgerton Hospital, in the southern Wisconsin city of Edgerton, is PMG's partner in the state. Its program, the Edgerton Hospital Pain & Spine Center, operates at North Sherman Road.",
    "The listing below gives the center's phone number and a link to its page on the Edgerton Hospital website, where patients can find directions and referral information. Appointments are arranged through the Pain & Spine Center itself.",
    "The program carries the hospital's name because it is part of the hospital. That is how every PMG partnership works: the hospital offers the service to its community, and PMG supplies the blueprint and ongoing program management behind it. Wisconsin hospital leaders can ask PMG how that model works for a hospital their size.",
  ],
};
