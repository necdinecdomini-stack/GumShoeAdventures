import type { Difficulty } from "./types";

export type TelescopeExchange = {
  speaker: string;
  text: string;
};

export type TelescopeSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  exchanges?: TelescopeExchange[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type TelescopeReport = {
  key:
    | "telescope_briefing"
    | "telescope_research"
    | "telescope_log"
    | "telescope_statements"
    | "telescope_newspaper";
  code: string;
  label: string;
  agency: string;
  title: string;
  meta: string[];
  sections: TelescopeSection[];
  stamp: string;
};

export const telescopeReports: TelescopeReport[] = [
  {
    key: "telescope_briefing",
    code: "01",
    label: "Case Briefing",
    agency: "Neuheim Police Department — Liaison Office",
    title: "Case Briefing",
    meta: [
      "From: Lt. Elke Hartmann, Neuheim Police Department Liaison",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Agent Bones,",
          "The Royal Neuheim Observatory has a problem. Their main telescope is broken. The worm gear is cracked. This is the gear that turns the telescope slowly and smoothly. Without it, the telescope cannot move.",
          "The four scientists at the observatory blame each other. They say someone moved the telescope incorrectly and broke it. They also say someone has been changing the telescope settings for weeks. The police looked into it, but there is no crime — just a broken machine and a lot of angry scientists.",
          "The university asked us to help. They want someone to investigate quietly.",
          "I asked the observatory for their activity logs. The system keeps thirty days of records and then deletes them automatically. I am sending you the last thirty days.",
          "I am also sending the scientists’ statements. Please read them carefully. These people do not like each other.",
          "Good luck.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 01",
  },
  {
    key: "telescope_research",
    code: "02",
    label: "Research Summaries",
    agency: "Royal Neuheim Observatory — Staff Directory",
    title: "Research Summaries (Current Projects)",
    meta: [
      "Source: Royal Neuheim Observatory — Staff Directory",
    ],
    sections: [
      {
        heading: "Dr. Viktor Marek",
        paragraphs: [
          "Dr. Marek studies special stars called Cepheid variables. These stars become brighter and darker in a regular pattern. He uses the telescope to measure how bright they are each night. He must point the telescope at the same stars every time.",
        ],
      },
      {
        heading: "Dr. Lukas Brenner",
        paragraphs: [
          "Dr. Brenner studies pairs of stars that move around each other. These are called binary stars. His project has become very difficult recently. He needs very clear nights and very exact measurements. Bad weather has made his work harder this year.",
        ],
      },
      {
        heading: "Dr. Heinrich Stahl",
        paragraphs: [
          "Dr. Stahl is the most experienced scientist at the observatory. He has worked here for twenty years. He studies distant galaxies and how they are shaped. He believes the telescope should be available to him whenever he needs it, because his research is the most important.",
        ],
      },
      {
        heading: "Dr. Katrin Zeller",
        paragraphs: [
          "Dr. Zeller studies the surface of the moon. She is looking for flat areas that could be good landing sites for rockets in the future. She uses the mechanical computer at the observatory to do calculations. Her notes and data are kept at the observatory.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 02",
  },
  {
    key: "telescope_log",
    code: "03",
    label: "Activity Log",
    agency: "Royal Neuheim Observatory — Automatic Record System",
    title: "Observatory Activity Log",
    meta: [
      "Source: Royal Neuheim Observatory — Automatic Record System",
      "Note: This log covers the last 30 days. The system keeps records for 30 days and then deletes them.",
    ],
    sections: [
      {
        paragraphs: [
          "Column key: Date — Day of the entry. Telescope User — Who was scheduled to use the telescope. Target — What the telescope was aimed at. Error Reported — Any problem reported by the scientist. Computer User — Who was using the mechanical computer. Notes — Weather or other information.",
        ],
        table: {
          headers: ["Date", "Telescope User", "Target", "Error Reported", "Computer User", "Notes"],
          rows: [
            ["Aug 1", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 2", "Dr. Stahl", "Andromeda galaxy", "—", "—", "—"],
            ["Aug 3", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 4", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 5", "Dr. Marek", "Cepheid stars", "Telescope was pointed at wrong coordinates. Had to spend 20 minutes correcting.", "—", "—"],
            ["Aug 6", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 7", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 9", "Dr. Marek", "Cepheid stars", "Focus ring had been adjusted. All images were blurred. Lost the whole session.", "—", "Aug 8: rest day."],
            ["Aug 10", "Dr. Stahl", "Andromeda galaxy", "—", "Dr. Brenner", "—"],
            ["Aug 11", "Dr. Marek", "Cepheid stars", "—", "—", "—"],
            ["Aug 12", "Dr. Brenner", "Binary stars", "—", "Dr. Zeller", "—"],
            ["Aug 13", "Dr. Stahl", "Sombrero galaxy", "—", "—", "—"],
            ["Aug 14", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 15", "Dr. Marek", "Cepheid stars", "Tracking motor was set to wrong speed. Stars moved across the frame.", "—", "—"],
            ["Aug 16", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 18", "Dr. Brenner", "Binary stars", "—", "—", "Aug 17: rest day."],
            ["Aug 19", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 20", "Dr. Stahl", "Andromeda galaxy", "Telescope was aimed at a completely different area of the sky.", "—", "—"],
            ["Aug 21", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 23", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations. Aug 22: rest day."],
            ["Aug 24", "Dr. Marek", "Cepheid stars", "Focus had been adjusted again. Images too blurred to use.", "—", "—"],
            ["Aug 25", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 26", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 27", "Dr. Stahl", "Sombrero galaxy", "Calibration settings had been changed. Two hours of work lost.", "Dr. Zeller", "—"],
            ["Aug 28", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 29", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 30", "Dr. Stahl", "Whirlpool galaxy", "MALFUNCTION. Worm gear cracked. Telescope locked in position. Cannot be moved.", "—", "Telescope out of service."],
          ],
        },
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 03",
  },
  {
    key: "telescope_statements",
    code: "04",
    label: "Researcher Statements",
    agency: "Neuheim Police Department — Statements taken 1 September 1947",
    title: "Researcher Statements",
    meta: [
      "Source: Neuheim Police Department",
      "Date: 1 September 1947",
    ],
    sections: [
      {
        heading: "Statement of Dr. Heinrich Stahl",
        paragraphs: [
          "I have worked at this observatory for twenty years. Twenty years! And now someone is destroying my work. Every week, the telescope is wrong. The focus is off. The coordinates are off. The calibration is off. This is not bad luck. This is a conspiracy.",
          "I think someone does not want me to finish my galaxy survey. Maybe it is Dr. Marek. He always wants more telescope time. He thinks his little blinking stars are more important than my galaxies. Maybe it is Dr. Brenner. He is always in the building at strange hours. Why? What is he doing in the dome when it is cloudy?",
          "I am the most senior scientist here. My work is the most important. My galaxy survey is almost finished — I only need a few more months of good observations. Someone is trying to stop me. I want to know who.",
        ],
      },
      {
        heading: "Statement of Dr. Viktor Marek",
        paragraphs: [
          "I do not know what is happening at this observatory, but I am very tired of it. Every week, something is wrong with the telescope. I sit down to observe my Cepheid stars, and the telescope is pointing at the wrong place. Or the focus is wrong. I have lost many nights of work.",
          "Dr. Stahl says it is a conspiracy against him. Dr. Stahl thinks everything is a conspiracy against him. He also thinks the telescope should belong to him because he is “senior.” He tells Dr. Zeller that lunar research is not real astronomy. He tells me that variable stars are boring. He is a very difficult man.",
          "I do not think it is a conspiracy. I think someone is being careless. But I do not know who.",
          "My own work is going well, but these problems are slowing me down. I have been studying Cepheid stars for three years now and my results are good. I just need the telescope to work properly.",
        ],
      },
      {
        heading: "Statement of Dr. Lukas Brenner",
        paragraphs: [
          "Everyone is very upset, and I understand that. The telescope has many problems recently. But telescopes are complicated machines. Sometimes things go wrong.",
          "Dr. Stahl is being very dramatic. He says it is a conspiracy. That is ridiculous. He says this about everything. Last year, he said the cleaning staff were moving his papers on purpose.",
          "My own research has been very difficult lately. The weather has been terrible. I need clear skies for my binary star observations, and I have had very few good nights. I spend a lot of time at the observatory working on my calculations instead. My project is now six months behind schedule. The university keeps asking me for results, but I cannot control the weather. Meanwhile, Dr. Marek and Dr. Stahl publish new findings every few weeks. It is very frustrating.",
          "I have not been at the observatory much this month. My research needs clear skies, and the weather has been mostly cloudy.",
          "I think the telescope is just getting old. It needs better maintenance.",
        ],
      },
      {
        heading: "Statement of Dr. Katrin Zeller",
        paragraphs: [
          "I do not use the telescope. I use the mechanical computer for my lunar calculations. I have nothing to do with this problem.",
          "But I will say this: Dr. Stahl is very difficult to work with. He once told me that lunar research is “not real astronomy.” He tells everyone that his work is the most important. He takes the best observation times for himself. Everyone argues with him.",
          "I feel sorry for Dr. Brenner. His project has been very unlucky this year. He works very hard, but the weather is always bad when he needs it to be good. He spends many evenings alone at the observatory, just doing calculations and waiting for clear skies. I think he is worried about his position. The rest of us are doing fine, but Dr. Brenner has not published anything new this year.",
          "I do not think anyone broke the telescope on purpose. I think it was an accident.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 04",
  },
  {
    key: "telescope_newspaper",
    code: "05",
    label: "Neuheim Daily Herald",
    agency: "Neuheim Daily Herald — 2 September 1947",
    title: "CHAOS AT THE OBSERVATORY! TELESCOPE DESTROYED!",
    meta: [
      "Publication: Neuheim Daily Herald",
      "Date: 2 September 1947",
    ],
    sections: [
      {
        paragraphs: [
          "The famous telescope at the Royal Neuheim Observatory is BROKEN! The expensive instrument stopped working on August 30 after what scientists are calling a “worm gear failure.”",
          "But was it really just a broken gear? Sources say the scientists have been FIGHTING for weeks! “They argue every day,” said one person close to the observatory. “Nobody can agree on anything!”",
          "The telescope cost the city 50,000 crowns when it was built. WHO will pay for the repairs? The TAXPAYERS of Neuheim want answers!",
          "The university was contacted for comment but DID NOT RESPOND. The observatory director also REFUSED to speak to reporters.",
          "Is someone SABOTAGING the telescope? Is the university HIDING something? The Daily Herald will continue to investigate!",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 05",
  },
];

export const telescopeQuestions: string[] = [
  "What is a worm gear, and what happened to the one in the observatory’s telescope?",
  "How many scientists work at the observatory? What does each one study?",
  "Dr. Brenner says “I have not been at the observatory much this month.” Look at the activity log. How many days was he at the observatory? Is his statement true?",
  "Look at each error in the activity log. Who was at the observatory (using the telescope or the computer) before each error was discovered?",
  "Dr. Brenner says the weather has been “mostly cloudy.” Count the cloudy days in the activity log. Is this accurate?",
  "Dr. Zeller says “I do not use the telescope.” Does the activity log support this claim?",
  "Two other people say that Dr. Brenner is often at the observatory. Who are they, and what do they say?",
  "Why might Dr. Brenner want to cause problems for the other scientists? What is his motive?",
  "The Neuheim Daily Herald uses words like “CHAOS” and “SABOTAGING.” Is the newspaper a reliable source of facts? Why or why not?",
  "Write your verdict in 80–120 words. Who is most likely responsible for the telescope problems, and why? Use at least three pieces of evidence from the documents.",
];

export const telescopeReportsByDifficulty: Record<Difficulty, TelescopeReport[]> = {
  "gumshoe": telescopeReports,
  "officer": telescopeReports,
  "lead-investigator": telescopeReports,
};

export const telescopeQuestionsByDifficulty: Record<Difficulty, string[]> = {
  "gumshoe": telescopeQuestions,
  "officer": telescopeQuestions,
  "lead-investigator": telescopeQuestions,
};
