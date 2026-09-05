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
    | "telescope_interviews"
    | "telescope_grants"
    | "telescope_krisztina"
    | "telescope_tech_report"
    | "telescope_manufacturer"
    | "telescope_newspaper";
  code: string;
  label: string;
  agency: string;
  title: string;
  meta: string[];
  sections: TelescopeSection[];
  stamp: string;
};

export const telescopeReportsGumshoe: TelescopeReport[] = [
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

export const telescopeReportsOfficer: TelescopeReport[] = [
  {
    key: "telescope_briefing",
    code: "01",
    label: "Case Briefing",
    agency: "Neuheim Police Department — Liaison Office",
    title: "Case Briefing",
    meta: [
      "From: Lt. Gerhardt Voss, Neuheim Police Department Liaison",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Agent Bones,",
          "I need a favour. The Royal Neuheim Observatory has been dealing with an ongoing dispute between its four resident scientists. The main telescope suffered a mechanical failure on August 30: the worm gear cracked, which is the component that allows the telescope to rotate smoothly. The instrument is now completely out of service.",
          "The scientists have been complaining for weeks that someone has been interfering with the telescope settings between observation sessions: changing the focus, altering the coordinates, adjusting the calibration. Now that the telescope is actually broken, the accusations have become much worse. Each scientist blames the others.",
          "The police reviewed the case and found no clear evidence of a crime. The worm gear failure could be mechanical, could be caused by misuse. It’s difficult to say. The university would prefer this to be resolved quietly before it becomes a bigger embarrassment.",
          "I been given the observatory’s activity log for the last thirty days. The system automatically records telescope and mechanical computer usage, but the records are overwritten every thirty days, so this is all we have. I have also collected statements from the four scientists, as well as some background materials that may be relevant.",
          "I should warn you: these scientists have very strong opinions about each other.",
          "Good luck with this one.",
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
    title: "Research Summaries (Current Research Projects)",
    meta: [
      "Source: Royal Neuheim Observatory — Staff Directory (Current Research Projects)",
    ],
    sections: [
      {
        heading: "Dr. Viktor Marek — Cepheid Variable Star Survey",
        paragraphs: [
          "Dr. Marek’s research focuses on Cepheid variable stars — stars whose brightness increases and decreases in a predictable cycle. By measuring the period of these brightness changes, astronomers can calculate the distance to the star. Marek has been conducting a systematic survey of Cepheids in the northern sky for the past three years. His work requires repeated observations of the same star fields, which means the telescope must be aimed at precisely the same coordinates each session. Any unexpected change to the telescope’s position or focus results in lost observation time.",
        ],
      },
      {
        heading: "Dr. Lukas Brenner — Binary Star Orbital Mechanics",
        paragraphs: [
          "Dr. Brenner studies binary star systems — pairs of stars that orbit around a common centre of gravity. His current project involves measuring the orbital parameters of several close binary pairs, which requires exceptionally precise measurements taken under ideal atmospheric conditions. The project has become increasingly complex as his targets have demanded higher resolution data than the observatory’s telescope can easily deliver. A prolonged stretch of poor weather this year has further reduced his usable observation nights, leaving him significantly behind schedule.",
        ],
      },
      {
        heading: "Dr. Heinrich Stahl — Galaxy Morphology Survey",
        paragraphs: [
          "Dr. Stahl is the most senior researcher at the observatory, having held his position for over twenty years. His current project is a comprehensive survey of galaxy shapes and structures visible from Neuheim’s latitude. As the observatory’s longest-serving scientist, Stahl considers himself to have a certain priority when it comes to telescope scheduling and access to the dome. This view is not universally shared by his colleagues.",
        ],
      },
      {
        heading: "Dr. Katrin Zeller — Lunar Surface Mapping",
        paragraphs: [
          "Dr. Zeller’s research involves mapping the surface features of the moon in preparation for potential future rocket missions. She is identifying flat, stable areas that could serve as landing sites. Her work at the observatory is primarily computational — she uses the mechanical computer to process photographic data and calculate terrain gradients. Her notes, photographic plates, and reference materials are all stored at the observatory, which is why she maintains a regular presence in the building even though she rarely requires direct telescope access.",
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
      "Note: This log covers the last 30 days of activity. The recording system automatically overwrites data older than 30 days. These are all the records currently available.",
    ],
    sections: [
      {
        table: {
          headers: ["Date", "Telescope User", "Target", "Error Reported", "Computer User", "Notes"],
          rows: [
            ["Aug 1", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 2", "Dr. Stahl", "Andromeda galaxy", "—", "—", "—"],
            ["Aug 3", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 4", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 5", "Dr. Marek", "Cepheid stars", "Telescope was pointed at wrong coordinates. 20 min. lost to correction.", "—", "—"],
            ["Aug 6", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 7", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 8", "—", "—", "—", "Dr. Stahl", "Clear night. Telescope not scheduled. Stahl working on data reduction."],
            ["Aug 9", "Dr. Marek", "Cepheid stars", "Focus ring had been adjusted. All images blurred. Entire session lost.", "—", "—"],
            ["Aug 10", "Dr. Stahl", "Andromeda galaxy", "—", "Dr. Brenner", "—"],
            ["Aug 11", "Dr. Marek", "Cepheid stars", "—", "—", "—"],
            ["Aug 12", "Dr. Brenner", "Binary stars", "—", "Dr. Zeller", "—"],
            ["Aug 13", "Dr. Stahl", "Sombrero galaxy", "—", "—", "—"],
            ["Aug 14", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 15", "Dr. Marek", "Cepheid stars", "Tracking motor had been set to wrong speed. Stars drifted across frame.", "—", "—"],
            ["Aug 16", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 17", "—", "—", "—", "Dr. Marek", "Rest day. Marek reviewing photographic plates."],
            ["Aug 18", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 19", "—", "—", "—", "Dr. Marek", "Cloudy. No observations. Marek continuing data review."],
            ["Aug 20", "Dr. Stahl", "Andromeda galaxy", "Telescope was aimed at a completely different region of the sky. Entire session lost.", "—", "—"],
            ["Aug 21", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 22", "—", "—", "—", "Dr. Stahl", "Rest day. Stahl preparing publication draft."],
            ["Aug 23", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
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
          "I have been at this observatory for twenty years. In all that time, I have never experienced anything like this. The telescope does not simply lose its calibration on its own. Focus rings do not adjust themselves. Tracking motors do not change speed by accident. These are deliberate acts, and I want it on record that I believe someone at this observatory has been systematically interfering with the equipment.",
          "The pattern is obvious to anyone paying attention. I prepare my observation session. I arrive at the dome. The telescope is wrong — pointed at the wrong coordinates, or the focus has been changed, or the calibration has been tampered with. This has happened to me repeatedly throughout August. It has happened to Dr. Marek as well. It is not random chance. It is sabotage.",
          "I have my suspicions. Dr. Marek has been lobbying the observatory director for additional telescope time, which would come at the expense of my schedule. Dr. Brenner is constantly in the building, even on cloudy nights when he has no reason to be near the telescope. What exactly is he doing in the dome at those hours? Nobody seems able to answer that question.",
          "My galaxy survey is nearing completion — I need perhaps three more months of quality observations. This interference is threatening years of work. I demand that this matter be taken seriously.",
        ],
      },
      {
        heading: "Statement of Dr. Viktor Marek",
        paragraphs: [
          "I want to be clear that I have nothing to do with whatever is happening at the observatory. I am as much a victim of this situation as anyone else. My Cepheid survey has lost at least six full observation nights this month because of unexpected changes to the telescope settings.",
          "Dr. Stahl believes it is a targeted campaign against him personally. That is very typical of Dr. Stahl. He has a long history of interpreting normal inconveniences as personal attacks. He also believes that his seniority entitles him to schedule priority, which the rest of us find difficult to accept.",
          "That said, the frequency of these problems is unusual. I have been here for three years and have never seen so many equipment errors in a single month. I do not think the telescope is failing mechanically — the errors are too varied and too specific. Someone is changing these settings.",
          "I have noticed that Dr. Brenner often asks me about my observation schedule — which nights I am planning to observe, what time I will arrive at the dome. I did not think much of it at the time. Perhaps I should have.",
          "My own research is progressing well despite the interruptions. The Cepheid survey has produced strong results so far, and my most recent grant application was approved last month. I just need the telescope to function reliably.",
        ],
      },
      {
        heading: "Statement of Dr. Lukas Brenner",
        paragraphs: [
          "I understand that everyone is frustrated. The telescope has had an unusual number of problems recently, and I appreciate that this has been inconvenient for all of us. However, I think some of my colleagues are being somewhat dramatic about the situation.",
          "Dr. Stahl in particular has been making accusations that border on the absurd. He has suggested — not subtly — that I am somehow responsible, based on nothing more than the fact that I occasionally work late at the observatory. I work late because my research requires it. Binary star observations are time-sensitive, and when the weather cooperates, I need to be ready. When it does not cooperate, I use the time to work on my calculations at the mechanical computer. There is nothing suspicious about that.",
          "My own project has had a difficult year. The atmospheric conditions required for precise binary star measurement have been consistently poor, and my project is now roughly six months behind where it should be. The university has been asking about my progress, which is understandable. I have not been at the observatory much this month — when the skies are cloudy, there is limited value in being here. I am confident that the weather will improve and my work will get back on track.",
          "I suspect the telescope’s problems are mechanical in nature. The instrument is decades old and the maintenance schedule may not be adequate. The worm gear failure supports this view. Perhaps the university should invest in proper upkeep rather than looking for someone to blame.",
        ],
      },
      {
        heading: "Statement of Dr. Katrin Zeller",
        paragraphs: [
          "My work at the observatory involves the mechanical computer, not the telescope. I have no involvement in this dispute and no opinion on who may be responsible for the equipment problems.",
          "I will say, however, that the atmosphere at the observatory has become quite unpleasant. Dr. Stahl has always been difficult — he considers his research to be more important than everyone else’s, and he has told me on more than one occasion that lunar surface mapping is, in his words, “not real astronomy.” He has made similar comments about Dr. Marek’s Cepheid work. He treats the telescope as his personal instrument and resents sharing it.",
          "Dr. Brenner’s situation is unfortunate. He is a capable researcher who has been dealt a poor hand this year. His project requires atmospheric conditions that have simply not materialised, and I can see that the pressure is affecting him. He has been spending long evenings at the observatory, often alone, working on calculations or simply waiting for the skies to clear. I have occasionally found him still at the building when I arrive in the morning. He does not seem to be sleeping well.",
          "I do not believe he has published any new findings this year, which I imagine puts him in a difficult position with the university. The rest of us have been more fortunate — Dr. Marek’s survey is producing steady results, and Dr. Stahl’s galaxy work is well funded and nearly complete. Dr. Brenner is the only one who appears to be struggling, and I feel sorry for him.",
          "I cannot say who is responsible for the telescope problems. But I do not think it was done with the intention of causing real damage.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 04",
  },
  {
    key: "telescope_grants",
    code: "05",
    label: "Grant Application Records",
    agency: "Royal Neuheim University — Observatory Research Funding Committee",
    title: "Grant Application Records",
    meta: [
      "Source: Royal Neuheim University — Observatory Research Funding Committee, 1946–1947",
    ],
    sections: [
      {
        table: {
          headers: ["Date", "Applicant", "Project Description", "Budget (Crowns)", "Decision"],
          rows: [
            ["Mar 1946", "Dr. Stahl", "Galaxy morphology survey — year 4 continuation", "12,000", "Approved"],
            ["Mar 1946", "Dr. Marek", "Cepheid variable photometry — equipment upgrade", "8,500", "Approved"],
            ["Mar 1946", "Dr. Brenner", "Binary star orbital analysis — extended observation programme", "4,200", "Rejected. Committee notes: “insufficient preliminary results.”"],
            ["Sep 1946", "Dr. Brenner", "Binary star spectral comparison — reduced scope", "2,800", "Rejected. Committee notes: “project lacks clear timeline.”"],
            ["Mar 1947", "Dr. Stahl", "Galaxy survey — supplementary photographic plates", "6,500", "Approved"],
            ["Mar 1947", "Dr. Marek", "Cepheid distance calibration — new measuring instrument", "9,200", "Approved"],
            ["Mar 1947", "Dr. Brenner", "Binary star observation programme — revised proposal", "3,100", "Rejected. Committee notes: “applicant has not demonstrated adequate progress on existing commitments.”"],
            ["Jun 1947", "Dr. Zeller", "Lunar terrain computational analysis", "2,400", "Approved"],
          ],
        },
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 05",
  },
  {
    key: "telescope_krisztina",
    code: "06",
    label: "Note from Dr. Green",
    agency: "Royal Neuheim University — Department of Natural Sciences",
    title: "Note from Dr. Krisztina Green",
    meta: [
      "From: Dr. Krisztina Green, Department of Natural Sciences, Royal Neuheim University",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "You asked me to look into the situation at the observatory. I spoke with a few colleagues at the university who are familiar with the department.",
          "Dr. Brenner’s name came up several times. His research has stalled — apparently the project he designed requires atmospheric conditions that have been unusually poor this year, and the work has become more technically demanding than anyone anticipated. His grant applications have been rejected three times, which is not a good sign, though it is not unheard of either. The funding committee tends to favour projects that can demonstrate recent progress, and Brenner has not had much to show them.",
          "People feel sorry for him. Several colleagues described him as hardworking and dedicated, but clearly under strain. One professor mentioned that Brenner has been visibly anxious at department meetings.",
          "That said, I do not think his position is actually in danger. There has been no formal talk of termination or review. The university is slow to act on these things, and Brenner has a solid track record from previous years. My sense is that he is putting more pressure on himself than the institution is putting on him.",
          "Dr. Marek, by contrast, was apparently in a similar position two years ago — struggling with funding and falling behind — but his Cepheid survey has since taken off, and he is now considered one of the department’s success stories.",
          "I hope that helps. Let me know if you need anything else.",
          "Krisztina",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 06",
  },
  {
    key: "telescope_newspaper",
    code: "07",
    label: "Neuheim Gazette",
    agency: "Neuheim Gazette — 3 September 1947",
    title: "Equipment failure at Royal Observatory raises questions",
    meta: [
      "Publication: Neuheim Gazette",
      "Date: 3 September 1947",
    ],
    sections: [
      {
        paragraphs: [
          "The main telescope at the Royal Neuheim Observatory has been taken out of service following what officials describe as a mechanical failure of the instrument’s worm gear — a critical component that controls the telescope’s rotational movement.",
          "The failure occurred during an observation session on the evening of August 30. Sources familiar with the situation say the damage is significant and that repairs may take several weeks. The observatory has not issued an official statement.",
          "The Gazette has learned that the four scientists currently working at the observatory have been involved in an ongoing dispute over equipment access and what some have described as repeated interference with the telescope’s settings. It is unclear whether the worm gear failure is connected to these complaints.",
          "A university spokesperson was contacted for comment but declined to respond. The observatory director was also unavailable.",
          "The observatory’s telescope, installed in 1923, was funded by the city of Neuheim at a cost of approximately 50,000 crowns. Maintenance of the instrument is the responsibility of the university’s Department of Natural Sciences.",
          "Questions have been raised about whether the observatory’s maintenance schedule is adequate for an instrument of this age and level of use. No independent assessment of the telescope’s condition has been made available.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 07",
  },
];

export const telescopeReportsLeadInvestigator: TelescopeReport[] = [
  {
    key: "telescope_briefing",
    code: "01",
    label: "Case Briefing",
    agency: "Neuheim Police Department — Liaison Office",
    title: "Case Briefing",
    meta: [
      "From: Lt. Gerhardt Voss, Neuheim Police Department Liaison",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "I realise this isn’t exactly your usual line of work, but the university has asked for a solution and this is, legally, beyond the Police Department’s remit.",
          "The Royal Neuheim Observatory — the one on the ridge above the city — has a problem. Obviously. That’s why I’m writing to you. Their primary telescope suffered a mechanical failure on the evening of August 30th. The worm gear, which controls the telescope’s rotational drive, cracked under what the observatory’s technician describes as “unusual stress conditions.” The instrument is now locked in position and completely inoperable.",
          "Under normal circumstances, a mechanical failure would be a maintenance matter. However, the four resident scientists have been at each other’s throats for weeks over what they describe as repeated, deliberate interference with the telescope’s settings — focus, calibration, tracking, pointing coordinates, all of it. The accusations have been circulating for months, and the atmosphere has become increasingly venomous. Now that the telescope is actually damaged, each of them is convinced that one of the others is responsible.",
          "The police sent an officer to take statements but concluded there was no clear evidence of criminal activity. I tend to agree: this looks more like an academic feud than a crime scene. But the university would like it resolved before it leaks further into the press (too late, I’m afraid, the Gazette has already picked it up).",
          "The log system automatically overwrites every thirty days, so what I’ve sent you is all we have.",
          "Fair warning: these are not easy people.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 01",
  },
  {
    key: "telescope_research",
    code: "02",
    label: "Research Summaries",
    agency: "Royal Neuheim Observatory — Staff Research Directory",
    title: "Research Summaries (Staff Research Directory, 1947 Edition)",
    meta: [
      "Source: Royal Neuheim Observatory — Staff Research Directory, 1947 Edition",
    ],
    sections: [
      {
        heading: "Dr. Viktor Marek — Cepheid Variable Star Photometric Survey",
        paragraphs: [
          "Dr. Marek is conducting a multi-year photometric survey of Cepheid (pronounced “SEF-ee-id”) variable stars visible from Neuheim’s latitude. Cepheids are pulsating stars whose luminosity varies in a highly predictable cycle: the period of pulsation correlates directly with the star’s intrinsic brightness, which makes them invaluable as distance markers. By measuring a Cepheid’s apparent brightness and its pulsation period, one can calculate its distance from Earth — a technique that has fundamentally reshaped our understanding of the scale of the universe.",
          "Marek’s survey requires repeated observations of the same stellar fields over many months, building up a photometric record of each target’s brightness curve. The work is methodical, steady, and cumulative: each night’s data adds to the previous sessions. Disruption to the telescope’s pointing or focus between sessions can compromise the continuity of the entire data set.",
        ],
      },
      {
        heading: "Dr. Lukas Brenner — Close Binary Star Orbital Mechanics",
        paragraphs: [
          "Dr. Brenner’s research focuses on the orbital parameters of close binary star systems — pairs of stars in tight mutual orbit whose gravitational interaction produces measurable effects on their light output and spectral characteristics. His current project involves a set of particularly challenging targets: close binaries whose orbital periods are short enough that meaningful data must be captured within individual observation windows, and whose angular separation is near the resolving limit of the observatory’s telescope.",
          "The work has proven more technically demanding than initially anticipated. Several of Brenner’s target systems have required atmospheric conditions that rarely materialise over Neuheim: extended periods of exceptional clarity with minimal turbulence. A prolonged stretch of poor weather throughout the spring and summer has severely curtailed his usable observation nights, leaving the project significantly behind schedule and increasingly difficult to justify to the university’s funding committee.",
        ],
      },
      {
        heading: "Dr. Heinrich Stahl — Extragalactic Morphological Survey",
        paragraphs: [
          "Dr. Stahl is the observatory’s longest-serving researcher, having held his position continuously since 1927. His current project, a systematic survey of galaxy morphologies visible from the northern hemisphere, represents the culmination of more than a decade of preparatory work: cataloguing, classifying, and photographing galaxies across a range of distances and structural types. The survey is approximately eight months from completion.",
          "Stahl’s seniority is a matter of some tension at the observatory. He has occupied his post through two directors, three equipment upgrades, and the tenures of at least a dozen junior colleagues. He regards himself as the institution’s intellectual anchor and expects a degree of deference in matters of scheduling and equipment access that his colleagues do not always feel is warranted.",
        ],
      },
      {
        heading: "Dr. Katrin Zeller — Selenographic Terrain Analysis",
        paragraphs: [
          "Dr. Zeller’s work involves the systematic mapping and classification of the lunar surface, with particular attention to identifying terrain features suitable for future crewed landing missions. Her research is primarily computational, drawing on existing photographic data and employing the observatory’s mechanical computer to model terrain gradients, surface stability, and approach trajectories.",
          "Zeller maintains a regular presence at the observatory because her complete archive of photographic plates, computational records, and reference materials is housed there. She rarely requires direct access to the telescope, though she has occasionally used it for supplementary lunar photography under favourable conditions.",
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
      "Note: This log covers the last 30 days of recorded activity. The recording system overwrites data on a rolling 30-day cycle. No earlier records are available.",
    ],
    sections: [
      {
        table: {
          headers: ["Date", "Telescope User", "Target", "Error Reported", "Computer User", "Notes"],
          rows: [
            ["Aug 1", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 2", "Dr. Stahl", "Andromeda galaxy", "—", "—", "—"],
            ["Aug 3", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 4", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 5", "Dr. Marek", "Cepheid stars", "Telescope was pointed at wrong coordinates. 120 min. lost to correction.", "—", "—"],
            ["Aug 6", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 7", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 8", "—", "—", "—", "Dr. Stahl", "Clear night. Telescope not scheduled. Stahl working on data reduction."],
            ["Aug 9", "Dr. Marek", "Cepheid stars", "Focus ring had been adjusted. All images blurred. Entire session lost.", "—", "—"],
            ["Aug 10", "Dr. Stahl", "Andromeda galaxy", "—", "Dr. Brenner", "—"],
            ["Aug 11", "Dr. Marek", "Cepheid stars", "Slight focus drift noted. Minor correction required.", "—", "Temperature dropped sharply after midnight."],
            ["Aug 12", "Dr. Brenner", "Binary stars", "—", "Dr. Zeller", "—"],
            ["Aug 13", "Dr. Stahl", "Sombrero galaxy", "—", "—", "—"],
            ["Aug 14", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 15", "Dr. Marek", "Cepheid stars", "Tracking motor had been set to wrong speed. Stars drifted across frame.", "—", "—"],
            ["Aug 16", "Dr. Stahl", "Whirlpool galaxy", "—", "Dr. Zeller", "—"],
            ["Aug 17", "—", "—", "—", "Dr. Marek", "Rest day. Marek reviewing photographic plates."],
            ["Aug 18", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 19", "—", "—", "—", "Dr. Marek", "Cloudy. No observations. Marek continuing data review."],
            ["Aug 20", "Dr. Stahl", "Andromeda galaxy", "Telescope was aimed at a completely different region of the sky. Entire session lost.", "—", "—"],
            ["Aug 21", "Dr. Marek", "Cepheid stars", "—", "Dr. Brenner", "—"],
            ["Aug 22", "—", "—", "—", "Dr. Stahl", "Rest day. Stahl preparing publication draft."],
            ["Aug 23", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 24", "Dr. Marek", "Cepheid stars", "Focus had been adjusted again. Images too blurred to use.", "—", "—"],
            ["Aug 25", "Dr. Brenner", "Binary stars", "—", "—", "—"],
            ["Aug 26", "—", "—", "—", "—", "Cloudy. No observations."],
            ["Aug 27", "Dr. Stahl", "Sombrero galaxy", "Calibration settings had been changed. Two hours of work lost.", "Dr. Zeller", "—"],
            ["Aug 28", "Dr. Marek", "Cepheid stars", "Slight tracking irregularity.", "Dr. Brenner", "Windy conditions noted."],
            ["Aug 29", "—", "—", "—", "Dr. Brenner", "Cloudy. No observations."],
            ["Aug 30", "Dr. Stahl", "Whirlpool galaxy", "MALFUNCTION. Worm gear cracked. Telescope locked in position. Cannot be moved.", "—", "Telescope out of service."],
          ],
        },
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 03",
  },
  {
    key: "telescope_interviews",
    code: "04",
    label: "Researcher Interviews",
    agency: "S.I.D. — Field Interviews by Agent Bones",
    title: "Researcher Interviews",
    meta: [
      "Source: S.I.D. field interviews, conducted by Agent Bones.",
    ],
    sections: [
      {
        heading: "Interview with Dr. Heinrich Stahl",
        paragraphs: [
          "[Stahl requested that the interview be conducted in his office. He had prepared a written chronology of the telescope errors, which he offered before being asked a single question.]",
          "I appreciate that you’re taking this seriously, Agent Bones. I was beginning to lose faith that anyone would.",
          "Let me be direct. I’ve been an astronomer at this observatory for twenty years. I’ve seen equipment fail. Valves crack, mirrors need resilvering, clock drives lose accuracy. These things happen. What’s been occurring for months is more than just equipment failure. Equipment doesn’t spontaneously adjust its own focus between sessions. Calibration settings don’t drift by precisely the amount needed to ruin an evening’s observations. The tracking motor doesn’t independently decide to change speed. These are the actions of a person, not a machine.",
          "I kept a record. Seven separate incidents in which the telescope’s settings had been altered between my scheduled sessions and those of Dr. Marek. In every case, the telescope was in a state that would waste the next observer’s time. Wrong coordinates, defocused optics, miscalibrated instruments.",
          "My galaxy survey is eight months from completion. Eight months. I’ve invested the better part of a decade in this work. The classification scheme alone took three years to develop. The morphological categories I’ve proposed will, I believe, become the standard framework for extragalactic taxonomy. These delays are obstructions to the field itself and the progress of Science!",
          "Every last one of them is a suspect. Brenner is in the dome when it’s cloudy. Marek is gunning for my position, I just know he is! And Zeller… she’s the only one who doesn’t need the telescope and, surprise surprise, the events started AFTER she wrapped up her lunar measurements. Lunar! We’re supposed to be a deep space observatory. A SERIOUS discipline. And she’s looking into pop-science trash like lunar landing sites. It’s a mess, detective, an absolute mess. The University should have just listened to me and let me take over executive control of the observatory years ago.",
        ],
      },
      {
        heading: "Interview with Dr. Viktor Marek",
        paragraphs: [
          "[Marek was calm and cooperative throughout. He brought a notebook containing his observation logs for cross-reference.]",
          "I want to help however I can, but I should say upfront that I don’t have a theory about who’s doing this. I’ve been affected as much as anyone: I’ve lost at least six full observation nights this month to equipment settings that were wrong when I arrived at the dome.",
          "My Cepheid survey depends on continuity. Each observation session builds on the previous one as I’m constructing brightness curves over time. Any gaps or corrupted data points make the curves unreliable. The disruptions this month have been genuinely damaging to my work. Not catastrophically of course, the survey’s overall trajectory is strong and my recent grant application was approved. That said, I’ve had to repeat measurements that should have been settled weeks ago.",
          "Dr. Stahl is convinced it’s a conspiracy directed at him personally. That’s very much in character. Heinrich has always had a somewhat inflated sense of his own centrality — he once complained to the director that the cleaning schedule was designed to disturb his concentration. He’s a brilliant researcher and his galaxy survey is genuinely important work, but he treats every inconvenience as a personal attack.",
          "I will say one thing that I’ve only recently thought about. Dr. Brenner has, on several occasions over the past few months, asked me about my observation schedule — which nights I’d be using the telescope, what time I planned to arrive. I assumed it was collegial interest, or perhaps he was looking for gaps to book his own sessions. But in retrospect, if someone wanted to know when the dome would be unattended...",
          "I feel uncomfortable saying that. Lukas is a decent man who’s having a terrible year. His binary star project has hit a wall — the atmospheric requirements are punishing, and he’s been unable to collect the data he needs. We recently submitted a joint proposal for a cross-calibration study that would combine our datasets, and the committee approved it. I was glad to help — his previous applications had all been rejected, and I thought the collaboration might give him a path forward. But I’ve noticed he seemed ambivalent about it. Grateful, I think, but also... I don’t know. Proud, perhaps. It can’t be easy to have your independent proposals rejected repeatedly and then succeed only as someone else’s co-investigator.",
          "Besides. If I’m being thorough. Dr Stahl and Dr Zeller have also had plenty of opportunity to interfere with the telescope. And the schedule is publicly pinned so if he really wanted to sabotage the telescope he could have just checked the cork board and the pinned schedule.",
        ],
      },
      {
        heading: "Interview with Dr. Lukas Brenner",
        paragraphs: [
          "[Brenner appeared tired but composed. He spoke carefully and at length.]",
          "I suppose I should address the obvious. I’m aware that Dr. Stahl has been suggesting, to you, to the police, to anyone who’ll listen, that I’m somehow responsible for the telescope problems. His reasoning, as far as I can reconstruct it, is that I’m sometimes present in the building on cloudy evenings, and therefore I must be creeping into the dome to sabotage his precious galaxy survey.",
          "The reality is considerably less dramatic. My research requires clear, stable atmospheric conditions. When the weather cooperates, I observe. When it doesn’t, I work on data reduction and orbital calculations at the mechanical computer. That’s what the computer is for. I’m not the only person who uses the observatory’s facilities for non-telescope work. Dr. Zeller is here almost every day, and Dr. Stahl himself spends occasional evenings on data reduction. But apparently when I do it, it’s suspicious.",
          "My project has had a genuinely difficult year. I designed an observation programme around a set of close binary systems. Difficult research in the best of times and this has been… This has been the worst summer for astronomical observation in at least five years. I’m approximately six months behind where my original timeline projected, and the funding committee has noticed. Three rejected applications will do that.",
          "Viktor Marek was kind enough to include me as co-investigator on a cross-calibration proposal, which was approved in July. I appreciate the gesture, though I won’t pretend the circumstances were ideal. It’s not a comfortable thing to discover that the committee trusts your work only when someone else’s name is attached to it. My three previous proposals, each one less expensive than Marek’s solo applications, each one within my established area of expertise, were all turned down. His nine-thousand-crown instrument upgrade sailed through without comment.",
          "I haven’t been at the observatory much this month. When the skies are overcast, which they have been more often than not, there’s only so much computational work to justify the journey. I’m aware that everyone else’s research is progressing smoothly, which doesn’t improve my mood.",
          "As for the telescope, I believe it broke because it’s old and insufficiently maintained. The worm gear has been in service for over twenty years. Perhaps the university should consider spending money on upkeep rather than on finding someone to blame.",
        ],
      },
      {
        heading: "Interview with Dr. Katrin Zeller",
        paragraphs: [
          "[Zeller spoke quietly and chose her words with evident care.]",
          "I should clarify my position before we begin. My work is, at this stage, computational. I use the mechanical computer. I’ve little to no involvement in the telescope dispute and I’m not a telescope maintenance specialist. What I can offer you is the perspective of someone who’s present in the building almost every day and who’s watched this situation develop, and someone who has been using telescopes since I was a little girl.",
          "The observatory has always had tensions. Four researchers sharing one instrument, which can only be used at night on clear days, will inevitably argue about scheduling. Dr. Stahl has never made this easier. He is, and I say this with a degree of professional respect, one of the most difficult people I’ve ever worked alongside. His galaxy survey is important, and he’s unquestionably talented, but he operates on the assumption that his seniority entitles him to priority in all things. He’s told me, to my face, that selenographic research is “not real astronomy.” He’s said similar things about Dr. Marek’s Cepheid work. He treats the telescope as a personal instrument that others are occasionally permitted to borrow. This generates resentment. It has generated resentment for twenty years.",
          "Dr. Brenner is in a difficult position. He’s a capable scientist dealing with a project that’s turned out to be more demanding than expected, and the weather hasn’t helped. His funding has been refused three times. He’s been spending long evenings at the observatory, often alone, and I’ve found him still here when I arrive in the morning on a few occasions. He looks tired. I think the pressure is wearing on him, though he doesn’t complain about it much.",
          "Viktor Marek included Brenner on a joint proposal that was approved last month, which I think was a generous gesture. But I noticed that Brenner reacted to the news with something closer to resignation than relief. I suspect he finds it frustrating to succeed only as a co-investigator on someone else’s project when his own proposals are consistently turned down.",
          "I don’t believe anyone set out to damage the telescope. But I also don’t believe these equipment problems have been accidental. The pattern is too consistent. Someone has been careless or deliberate with the settings. Whether that’s connected to the worm gear failure, I genuinely don’t know. Those seem like separate questions to me.",
          "Brenner hasn’t published any new findings this year. He’s the only one of us in that position.",
          "Well… neither have I. But no one expects me to. My contracts are government subsidised and the timeline was known to be a multiyear one.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 04",
  },
  {
    key: "telescope_grants",
    code: "05",
    label: "Grant Application Records",
    agency: "Royal Neuheim University — Observatory Research Funding Committee",
    title: "Grant Application Records",
    meta: [
      "Source: Royal Neuheim University — Observatory Research Funding Committee",
    ],
    sections: [
      {
        table: {
          headers: ["Period", "Applicant(s)", "Project Description", "Budget (Crowns)", "Decision"],
          rows: [
            ["Spring 1944", "Dr. Stahl", "Galaxy morphology survey, year 2 continuation", "11,000", "Approved"],
            ["Spring 1944", "Dr. Brenner", "Binary star orbital mechanics, initial observation programme", "5,500", "Approved. “Promising research direction. Committee encourages timely publication of preliminary results.”"],
            ["Spring 1944", "Dr. Marek", "Cepheid variable preliminary survey", "4,800", "Rejected. “Insufficient methodological detail. Committee recommends resubmission with clearer observation protocol.”"],
            ["Autumn 1944", "Dr. Marek", "Cepheid variable survey, revised methodology", "5,200", "Approved"],
            ["Spring 1945", "Dr. Stahl", "Galaxy survey, year 3 continuation", "11,500", "Approved"],
            ["Spring 1945", "Dr. Brenner", "Binary star programme, extended targets", "6,000", "Approved"],
            ["Autumn 1945", "Dr. Brenner", "Binary star spectral analysis, supplementary equipment", "3,400", "Rejected. “Current programme has not yet produced publishable results to justify additional instrumentation.”"],
            ["Spring 1946", "Dr. Stahl", "Galaxy morphology survey, year 4 continuation", "12,000", "Approved"],
            ["Spring 1946", "Dr. Marek", "Cepheid photometry, equipment upgrade", "8,500", "Approved"],
            ["Spring 1946", "Dr. Brenner", "Binary star orbital analysis, extended observation programme", "4,200", "Rejected. “Insufficient preliminary results to justify expanded scope. Committee notes continued absence of published findings.”"],
            ["Autumn 1946", "Dr. Brenner", "Binary star spectral comparison, reduced scope", "2,800", "Rejected. “Project timeline remains unclear. Committee recommends resubmission with revised milestones and realistic assessment of atmospheric constraints.”"],
            ["Spring 1947", "Dr. Stahl", "Galaxy survey, supplementary photographic plates", "6,500", "Approved"],
            ["Spring 1947", "Dr. Marek", "Cepheid distance calibration, precision measuring instrument", "9,200", "Approved"],
            ["Spring 1947", "Dr. Brenner", "Binary star observation programme, revised proposal", "3,100", "Rejected. “Applicant has not demonstrated adequate progress on existing commitments. Committee notes that atmospheric constraints on the proposed targets may render the project unsuitable for Neuheim’s location.”"],
            ["Summer 1947", "Dr. Zeller", "Lunar terrain computational analysis", "2,400", "Approved"],
            ["Summer 1947", "Dr. Marek (PI), Dr. Brenner (co-investigator)", "Cepheid–binary cross-calibration study: leveraging overlapping stellar fields", "5,800", "Approved. “Strong synergy between datasets. Committee notes the value of inter-project collaboration.”"],
          ],
        },
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 05",
  },
  {
    key: "telescope_krisztina",
    code: "06",
    label: "Note from Dr. Green",
    agency: "Royal Neuheim University — Department of Natural Sciences",
    title: "Note from Dr. Krisztina Green",
    meta: [
      "From: Dr. Krisztina Green, Department of Natural Sciences, Royal Neuheim University",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "As requested, I made a few enquiries about the observatory situation and the astronomy department more broadly.",
          "Dr. Brenner’s name is the one that comes up most. His colleagues in the wider department are aware that his research has hit complications. The atmospheric requirements of his binary star targets have been a problem all year, and his funding rejections have been noticed. The committee’s feedback has become progressively sharper, particularly the last round, which essentially questioned whether his project is viable at Neuheim at all. That can’t have been easy to read.",
          "Colleagues speak well of him. The words I kept hearing were “methodical,” “dedicated,” and “rigorous.” Nobody questions his competence. But there’s a general awareness that he’s under more pressure than the others at the moment, and that the gap between his output and theirs has become hard to ignore. One senior professor mentioned that Brenner has seemed more tense than usual at department meetings, though he’s still engaged and still contributing. He’s not falling apart. He’s just clearly frustrated.",
          "The joint proposal with Marek that was approved in July seems to have eased some of the institutional concern. The committee’s note about “inter-project collaboration” reads to me like a signal that they want to keep him involved and give him a path forward. Whether Brenner reads it the same way is another question. Being approved as someone’s co-investigator after three solo rejections is a complicated thing to feel good about.",
          "I don’t think his position is in any real danger. There’s been no formal talk of review or termination. The university moves slowly on these things, and Brenner’s track record from earlier years is solid. My sense is that he’s putting more pressure on himself than the institution is putting on him. But I’ve been wrong about these things before. People under pressure don’t always behave the way you’d expect.",
          "Marek, for what it’s worth, was in a similar position about two years ago. Struggling with funding, falling behind. His Cepheid survey turned it around and he’s now considered one of the department’s success stories. These things can be cyclical.",
          "Krisztina",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 06",
  },
  {
    key: "telescope_tech_report",
    code: "07",
    label: "Technical Report",
    agency: "Royal Neuheim Observatory — Office of the Senior Instrument Technician",
    title: "Post-Incident Technical Report",
    meta: [
      "From: Ernst Kohl, Senior Instrument Technician, Royal Neuheim Observatory",
      "To: Observatory Director Prof. Fichte; University Department of Natural Sciences",
      "Date: 1 September 1947",
      "Subject: Examination of telescope drive failure, 30 August 1947",
    ],
    sections: [
      {
        heading: "Summary of Findings",
        paragraphs: [
          "On the evening of 30 August, the telescope’s primary worm gear failed during a scheduled observation session conducted by Dr. Stahl. The gear teeth along the lower engagement arc show a clean transverse fracture consistent with sudden overload — specifically, lateral torque applied perpendicular to the gear’s designed axis of rotation. The telescope locked in position immediately and could not be moved manually or by motor.",
        ],
      },
      {
        heading: "Condition of the Worm Gear",
        paragraphs: [
          "Upon disassembly, I observed the following:",
          "The fracture surfaces are fresh, with no significant oxidation, confirming the failure occurred during the August 30 session. However, examination of the adjacent teeth revealed pre-existing micro-fractures along the tooth flanks: hairline cracks running parallel to the engagement surface. These micro-fractures are not consistent with normal operational wear. They suggest the gear has been subjected to repeated episodes of abnormal lateral stress over an extended period — weeks to months, possibly longer.",
          "The pattern of micro-fracturing is concentrated on the teeth that engage when the telescope is repositioned through its full rotational arc. Under normal use, the telescope moves in small, controlled increments along its scheduled tracking path. Full-arc repositioning, swinging the telescope from one area of the sky to a completely different one, places significantly more stress on the worm gear, particularly if the drive clutch is not properly disengaged before manual repositioning.",
        ],
      },
      {
        heading: "Maintenance History",
        paragraphs: [
          "The telescope’s maintenance schedule follows an eight-month cycle, in accordance with the manufacturer’s standard recommendation. The most recent full inspection was conducted on 3 February 1947. At that time, the worm gear was examined and found to be in acceptable condition. Though, and this should be noted as such, I do recall some verbal assessment that the gear was wearing faster than expected. The next scheduled inspection was due in early October 1947.",
          "I should note that the frequency of telescope repositioning during August was, based on the activity log, somewhat higher than is typical for a standard observation month. The log records a significant number of sessions in which the arriving observer found the telescope aimed at coordinates unrelated to any scheduled programme, necessitating full-arc repositioning before work could begin. Each such repositioning event subjects the worm gear to stress levels well above those generated by normal tracking operations.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The immediate cause of failure was a sudden overload during the August 30 session. However, the pre-existing micro-fractures indicate that the gear had been progressively weakened by repeated abnormal stress prior to the final failure. The eight-month maintenance interval, while consistent with the manufacturer’s standard recommendation, may not have been adequate given the apparently unusual level of repositioning activity during the preceding weeks.",
          "I do not have the expertise to determine whether the repositioning was the result of human interference, mechanical drift, or some other cause. I can only report what the physical evidence shows.",
          "Ernst Kohl",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 07",
  },
  {
    key: "telescope_manufacturer",
    code: "08",
    label: "Manufacturer’s Notice",
    agency: "Hartmann & Söhne Precision Instruments, Stuttgart",
    title: "Manufacturer’s Technical Notice",
    meta: [
      "From: Hartmann & Söhne Precision Instruments, Stuttgart",
      "To: All observatories operating Model IV or Model IV-A equatorial drive assemblies",
      "Date: 14 April 1947",
      "Ref: Technical Bulletin H&S-1947-003",
      "Subject: Worm gear micro-fracture susceptibility — Model IV drive assemblies, production batches 1919–1926",
    ],
    sections: [
      {
        paragraphs: [
          "Hartmann & Söhne has received reports from three observatories regarding premature worm gear failure in Model IV equatorial drive assemblies manufactured between 1919 and 1926. Investigation has identified a material composition variance in the gear blanks supplied during this production period. The affected gears contain a slightly elevated phosphorus content in the steel alloy, which reduces the material’s resistance to fatigue cracking under repeated lateral loading.",
          "Under normal tracking operations, this variance does not present a significant risk. However, in situations involving frequent full-arc repositioning — particularly if conducted without proper disengagement of the drive clutch — the affected gears may develop micro-fractures along the tooth engagement surfaces. These micro-fractures can propagate under continued stress and may eventually result in sudden tooth fracture and complete gear failure.",
        ],
      },
      {
        heading: "Recommendations",
        paragraphs: [
          "Observatories operating Model IV assemblies from the affected production period should:",
        ],
        bullets: [
          "Reduce the interval between worm gear inspections from the standard eight months to four months.",
          "Instruct all personnel to fully disengage the drive clutch before any manual repositioning of the telescope.",
          "Consider replacement of the worm gear with the updated Model IV-R component (available from Hartmann & Söhne, catalogue ref. WG-IV-R-1946).",
        ],
      },
      {
        paragraphs: [
          "Hartmann & Söhne regrets any inconvenience and remains available for technical consultation.",
          "[Handwritten note in margin, in pencil: “Received 2 May 1947. Filed. — E. Kohl”]",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 08",
  },
  {
    key: "telescope_newspaper",
    code: "09",
    label: "Neuheim Gazette",
    agency: "Neuheim Gazette — 3 September 1947",
    title: "Telescope failure at Royal Observatory prompts questions about oversight",
    meta: [
      "Publication: Neuheim Gazette",
      "Date: 3 September 1947",
    ],
    sections: [
      {
        paragraphs: [
          "The primary telescope at the Royal Neuheim Observatory has been taken out of service following a mechanical failure that occurred during a routine observation session on the evening of August 30. The observatory has confirmed that the instrument’s worm gear — the precision component responsible for controlling the telescope’s rotational movement — fractured during operation, rendering the telescope inoperable.",
          "The Gazette has learned that the failure comes after a period of sustained internal dispute among the observatory’s four resident scientists. Sources with knowledge of the situation describe an atmosphere of escalating tension, with researchers accusing one another of deliberately interfering with the telescope’s calibration and positioning settings. It is unclear whether the worm gear failure is related to these complaints.",
          "The telescope, a Hartmann & Söhne Model IV equatorial reflector, was installed in 1923 and has been in continuous service since that date. It was funded by the City of Neuheim at a cost of approximately 50,000 crowns. Routine maintenance of the instrument is the responsibility of the university’s Department of Natural Sciences, which operates the observatory through an annual grant from the city budget.",
          "The Gazette understands that the manufacturer issued a technical notice earlier this year regarding a potential material defect affecting worm gears in certain Model IV drive assemblies. It has not been established whether the Neuheim instrument falls within the affected production range, or whether the observatory took any action in response to the notice.",
          "A university spokesperson was contacted for comment but was not available. The observatory’s director, Prof. Fichte, also declined to respond to questions. No independent technical assessment of the telescope’s condition has been made public.",
          "The City Council’s budget committee, which oversees the observatory’s annual allocation, has been informed of the situation.",
        ],
      },
    ],
    stamp: "BROKEN TELESCOPE / REPORT 09",
  },
];

export const telescopeQuestionsGumshoe: string[] = [
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

export const telescopeQuestionsOfficer: string[] = [
  "What is a worm gear, and why was the observatory’s telescope unable to function after it cracked?",
  "Look at the activity log carefully. On days when errors were reported, who had been at the observatory the day before? Write down each error and the person who was last recorded in the building.",
  "Dr. Brenner says “I have not been at the observatory much this month.” Count the days he appears in the activity log (either as telescope user or computer user). Is his statement accurate?",
  "Dr. Brenner says the weather has been “consistently poor.” Count the cloudy days in the activity log. What fraction of the month was cloudy? Does his description match the data?",
  "Look at the grant application records (Document 05). How many times has Dr. Brenner applied for funding? How many times was he approved? How does this compare to Dr. Marek and Dr. Stahl?",
  "Dr. Green’s note (Document 06) describes Dr. Brenner as “under strain.” What specific evidence from the other documents supports this description?",
  "Dr. Marek mentions that Dr. Brenner “often asks about my observation schedule.” Why might this detail be significant? Is there an innocent explanation?",
  "Consider all four scientists as suspects. For each one, identify their possible motive and their opportunity (based on the activity log). Then explain why three of them are less likely to be responsible.",
  "The Neuheim Gazette reports factually but raises questions about the observatory’s maintenance schedule. Is this a fair question? Use the documents to explain your answer.",
  "Write your verdict in 100–150 words. Who is most likely responsible for the telescope problems? Use evidence from at least four different documents to support your conclusion.",
];

export const telescopeQuestionsLeadInvestigator: string[] = [
  "The technical report (Document 07) describes “pre-existing micro-fractures” in the worm gear. What does this tell us about when the damage began? How does this affect your understanding of the case?",
  "Document 08 is a manufacturer’s notice about a material defect in certain worm gears. Ernst Kohl’s handwritten note says he received it on 2 May 1947. What action, if any, was taken? What should have been done?",
  "Examine the activity log (Document 03). Two entries record minor errors that could have natural explanations (weather, temperature). Identify these entries. How do they complicate the investigation?",
  "Dr. Brenner claims “I have not been at the observatory much this month.” Cross-reference this claim with the activity log. On how many days does his name appear? Is his statement truthful, misleading, or false? Explain the distinction.",
  "Using the grant records (Document 05), trace Dr. Brenner’s funding history from 1944 to 1947. What pattern emerges? How does the committee’s language change over time?",
  "Dr. Marek mentions that Dr. Brenner asked about his observation schedule. Marek also notes that “the schedule is publicly pinned.” Why does Marek raise both points? What is he implying, and does he undermine his own implication?",
  "Dr. Zeller says “I don’t believe anyone set out to damage the telescope. But I also don’t believe these equipment problems have been accidental.” What is the difference between these two statements? What theory of the case does this suggest?",
  "Compare how each of the four interviewees describes Dr. Brenner’s situation. What do they agree on? Where do their accounts diverge, and what might explain the differences?",
  "The Neuheim Gazette mentions the manufacturer’s technical notice but notes it is unclear whether the observatory acted on it. How does this affect the question of responsibility — not just who interfered with the telescope, but who allowed it to break?",
  "Write your verdict in 150–200 words. Identify the person most likely responsible for the telescope interference and explain your reasoning. Address at least one alternative theory and explain why you rejected it. Reference evidence from at least five different documents.",
];

export const telescopeReportsByDifficulty: Record<Difficulty, TelescopeReport[]> = {
  "gumshoe": telescopeReportsGumshoe,
  "officer": telescopeReportsOfficer,
  "lead-investigator": telescopeReportsLeadInvestigator,
};

export const telescopeQuestionsByDifficulty: Record<Difficulty, string[]> = {
  "gumshoe": telescopeQuestionsGumshoe,
  "officer": telescopeQuestionsOfficer,
  "lead-investigator": telescopeQuestionsLeadInvestigator,
};
