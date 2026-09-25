import type { Question } from "./partnership.ts";

// Patient questions on the state pages. Each answer restates facts already on the site:
// the centers are hospital services, patients arrive by referral from primary care, and
// appointments are made directly with the center. `{state}` is replaced per page.
export const stateFaqs: Question[] = [
  {
    id: "appointment",
    question:
      "How do I make an appointment at a PMG partner center in {state}?",
    answer: [
      "Appointments are made directly with the hospital pain management center, not through PMG. Each center in {state} is listed on this page with its phone number and hospital website where the directory has them.",
    ],
  },
  {
    id: "referral",
    question: "Do I need a referral?",
    answer: [
      "Most patients are referred by their primary care physician, who sends records to the center and receives the results of treatment. Ask your physician about a referral, or contact the center to learn how it accepts new patients.",
    ],
  },
  {
    id: "hospital",
    question: "Is the pain management center part of the hospital?",
    answer: [
      "Yes. Every PMG partner center is a service of its hospital and carries the hospital's name. Your care stays within the hospital's records and follow-up, and the center works with the other services your hospital offers.",
    ],
  },
];

export const fillState = (q: Question, state: string): Question => ({
  ...q,
  question: q.question.replaceAll("{state}", state),
  answer: q.answer.map((a) => a.replaceAll("{state}", state)),
});
