import type { Difficulty } from "./types";

export type OperaSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type OperaReport = {
  key:
    | "opera_case_brief"
    | "opera_arrest_report"
    | "opera_security_report"
    | "opera_richter_statement"
    | "opera_voss_statement"
    | "opera_fassbinder_statement"
    | "opera_insurance"
    | "opera_kastner"
    | "opera_brandt"
    | "opera_dressler"
    | "opera_voll"
    | "opera_holtz"
    | "opera_layout";
  code: string;
  label: string;
  agency: string;
  title: string;
  meta: string[];
  sections: OperaSection[];
  stamp: string;
};

export const operaReports: OperaReport[] = [
  {
    key: "opera_case_brief",
    code: "01",
    label: "S.I.D. Case Brief",
    agency: "Special Investigations Division",
    title: "S.I.D. Case Brief",
    meta: [
      "From: The Chief",
      "To: Agent Bones, Special Investigations Division",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "You know how it is. When people look at me they assume that I can barely read, never mind that I appreciate classical music. But I do. The opera is a weakness of mine. Always has been. You can imagine my chagrin when people come up to me to lecture me about classics I've read in their original languages.",
          "Plebs the lot of them.",
          "To the point: Someone has \"liberated\" a number of world-class instruments from the Opera House. The police have arrested Theodor Voss, the second violinist, but I've followed Voss's career. He's nineteen and a prodigy. I can't, don't want to, believe that he'd ruin his own future just to steal the first violin's chair. I especially don't want our best musicians to flee the city for fear of having their instruments stolen. I WILL NOT permit Neuheim to go the way of Altdorf and Freihafen.",
          "Look into it. For me and for the music.",
          "— The Chief",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 01",
  },
  {
    key: "opera_arrest_report",
    code: "02",
    label: "Arrest Report",
    agency: "Neuheim Police Department — Criminal Investigations Division",
    title: "Arrest Report",
    meta: [
      "Case File: NPD-4471",
      "Investigating Officer: Detective Sergeant Friedrich Haller",
      "Suspect: Theodor Voss, Second Violin, Neuheim Philharmonic",
      "Charge: Conspiracy to Commit Grand Theft",
    ],
    sections: [
      {
        heading: "Summary of Events",
        paragraphs: [
          "On the day in question, the Neuheim Philharmonic held a rehearsal at the State Opera House in preparation for the opening night of the concert season. First Violin Elias Richter left his instrument, a rare antique violin valued at approximately 45,000 marks, in the backstage staging area when he departed the building after rehearsal. The following morning, Richter returned and reported the violin missing.",
          "A subsequent search of the building revealed that fourteen additional instruments had been removed from the opera house's main storage room overnight. The combined estimated value of these instruments exceeds 350,000 marks.",
          "In the day following the thefts, several first-string performers withdrew from the season's opening concert, citing concerns about security. Their positions were filled by second-string players.",
        ],
      },
      {
        heading: "Evidence Against the Suspect",
        paragraphs: [
          "The suspect, Theodor Voss, had both motive and opportunity.",
          "As Second Violin, Voss stood to gain the most from Richter's inability to perform. Following the withdrawals, Voss was promoted to First Violin for the season opener and all subsequent performances until the situation is resolved. Several other second-string performers were similarly promoted.",
          "Building security records confirm that Voss exited the building through Side Entrance B at 5:10 PM after rehearsal concluded, for a cigarette. The door was propped open during his absence. A security officer on duty observed Voss holding this same door open for an unidentified individual upon his return at approximately 5:18 PM. The individual was wearing a reflective vest and carrying a dark bag. Side Entrance B provides direct access to the backstage corridor, the instrument staging area, and the main instrument storage room.",
          "Richter left his violin in the backstage staging area when he departed the building after rehearsal. The instrument was not secured. The following morning, Richter returned and reported the violin missing. A subsequent search revealed that fourteen additional instruments had been removed from the locked storage room overnight.",
          "It is the assessment of this department that the theft of Richter's violin was a preliminary action designed to test building security. When no immediate alarm was raised, the perpetrators returned that night and removed the remaining instruments through the same entrance. The unlocked door facilitated both entries.",
          "Voss denies involvement. He claims his cigarette break was routine and that he believed the unidentified individual was a member of the stage crew. These claims are not supported by corroborating witness testimony.",
        ],
      },
      {
        heading: "Recommendation",
        paragraphs: [
          "Hold Theodor Voss for trial on conspiracy charges. Continue investigation to identify additional suspects involved in the removal of the remaining fourteen instruments.",
          "— Detective Sergeant Friedrich Haller, Criminal Investigations Division",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 02",
  },
  {
    key: "opera_security_report",
    code: "03",
    label: "Security Incident Report",
    agency: "Neuheim State Opera House — Building Security",
    title: "Security Incident Report",
    meta: [
      "Prepared by: Karl Wendt, Head of Building Security",
      "Subject: Instrument thefts discovered the morning following a rehearsal day",
    ],
    sections: [
      {
        heading: "Building Access Points",
        paragraphs: [
          "The opera house has three entrances. The Main Entrance serves the public and ticket holders. Side Entrance A is used for crew, deliveries, and stage equipment. Side Entrance B is the performer entrance, located in the alley on the east side of the building, accessible from Schillerstrasse.",
        ],
      },
      {
        heading: "Chronological Record, Rehearsal Day",
        paragraphs: [
          "12:00 PM: Security detail takes daytime positions at all three entrances. All doors locked and staffed.",
          "12:15 PM: A group of approximately ten to fifteen of Mr. Richter's admirers begins gathering along the east side of the building near Side Entrance B. Several have brought folding chairs. This is typical when rehearsals are scheduled.",
          "12:30 PM: Performers and crew begin arriving through Side Entrance B and Side Entrance A. Credentials checked on entry.",
          "12:50 PM: Mr. Richter arrives at Side Entrance B. Fans approach him in the alley. Mr. Richter stops to sign programmes and talk with them for several minutes before entering the building.",
          "1:00 PM: Mr. Richter enters the building.",
          "1:15 PM: Rehearsal begins in the main hall.",
          "2:30 PM: During a routine check of the corridors, my officer reports that several members of the public have entered the building and are sitting in the upper balcony and in the corridor outside the main hall, listening to the rehearsal. This is technically not permitted, but it has become a regular occurrence that we have not been able to fully prevent. Mr. Richter is aware of it and has previously asked us not to eject listeners, as he considers it harmless. On this occasion, I counted approximately six individuals in the balcony and two in the corridor.",
          "4:45 PM: Rehearsal concludes for the day.",
          "4:50 PM: Performers begin packing up and departing. Mr. Richter is observed leaving his violin and personal belongings in the staging area by his chair.",
          "5:00 PM: Mr. Richter is observed exiting Side Entrance B with a group of approximately five or six individuals, several of whom had been waiting outside earlier. My officer at the door reports that Mr. Richter appeared to be making social plans with the group as they left together.",
          "5:10 PM: Mr. Voss exits through Side Entrance B for a cigarette. The officer on duty observes Mr. Voss prop the door open and step into the alley. The rehearsal had just ended, and several crew members and performers were still leaving through various exits, so this did not draw particular attention.",
          "5:18 PM: The officer on duty observes Mr. Voss re-entering through Side Entrance B. Mr. Voss holds the door for a person directly behind him. The officer describes this individual as wearing a reflective vest over dark work clothes and carrying a large dark bag. Given the general traffic of people leaving and the crew still packing equipment, the officer assumed this person belonged in the building and did not request credentials.",
          "5:20 PM: Side Entrance B closes behind Mr. Voss. The officer does not confirm that the lock re-engages.",
          "5:45 PM: Stage crew finishes packing. The building is mostly empty.",
          "6:00 PM: Evening security assumes positions. I instruct all officers to confirm that every entrance is locked and secured. I am told this has been done.",
        ],
      },
      {
        heading: "Chronological Record, Following Morning",
        paragraphs: [
          "8:15 AM: Mr. Richter arrives at the building and proceeds to the staging area. He reports that his violin and case are not where he left them.",
          "8:20 AM: A search of the backstage area begins.",
          "8:35 AM: During the search, the stage manager checks the main instrument storage room and discovers that it has been disturbed. Fourteen instruments are missing. The storage room door shows no sign of forced entry.",
          "8:45 AM: Police are contacted.",
        ],
      },
      {
        heading: "Additional Notes",
        paragraphs: [
          "The main storage room is accessible from the backstage corridor, which connects to Side Entrance B. If the door was not properly secured on the evening in question, despite my instructions, anyone with knowledge of the building's layout could have entered the building overnight.",
          "I cannot confirm whether Side Entrance B was actually locked that evening. The officer I assigned to verify this is the same officer who failed to check credentials earlier in the day. I have addressed this matter internally.",
          "The presence of Mr. Richter's admirers in and around the building is a daily reality that my team has struggled to manage. On any given rehearsal day, there are fans outside the entrances, fans who have found their way inside, and crew and performers moving freely through the building. It is not, in practice, a controlled environment. This is relevant because the person Mr. Voss held the door for would not have seemed out of place. On a busy rehearsal day, unfamiliar faces in the building are not unusual.",
          "I accept responsibility for the procedural failures described above.",
          "— Karl Wendt, Head of Building Security",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 03",
  },
  {
    key: "opera_richter_statement",
    code: "04",
    label: "Witness: Elias Richter",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Witness Statement — Elias Richter",
    meta: [
      "Case File: NPD-4471",
      "Witness: Elias Richter, First Violin, Neuheim Philharmonic",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I got to the opera house around one o'clock for rehearsal, same as I always do. There were fans outside, which isn't unusual. I stopped to sign a few things and talk with them before heading in. These people track our rehearsal schedules, they know when I'm coming, and they show up rain or shine. The least I can do is give them a few minutes.",
          "We rehearsed through the afternoon. I know some fans had gotten into the building to listen. They do that. They find their way into the balcony or sit in the corridors. I've asked security not to throw them out. It's harmless, and honestly, I find it flattering that people want to hear us practice.",
          "When rehearsal wrapped up around a quarter to five, I left my violin and my things in the staging area by my chair. A group of fans was waiting outside, and they asked if I wanted to come along for a drink and a bit of a jam session. I said yes. We went to one of the bars in the Bohemian District, had a few drinks, played some music. I got home late and didn't think twice about the violin. I've left it at the opera house overnight before. It's never been a problem.",
          "The next morning I came back, and it wasn't there. I've been performing with that instrument for over fifteen years. It sounds ridiculous, but I can't explain it any other way: that violin is part of me. I know every scratch on it, every quirk in the tone. I can't just pick up another one and play. It was built by the Marchetti workshop, and there are fewer than forty of them in the world. The insurance value is 45,000 marks, but that doesn't begin to cover what it actually means to me.",
          "And then they searched the storage room and found that fourteen more instruments had been taken overnight. The whole building had been cleaned out.",
          "As for Theodor, I don't believe he had anything to do with this. He's been with the orchestra for two seasons now, and he's the most talented young violinist I've heard in a long time. I've never once heard him complain about the seating order. He doesn't need to. Everyone in this building knows he'll have a first chair somewhere before he's twenty-five. The idea that he'd throw his career away over a shortcut is, frankly, ridiculous.",
          "What I will say is this. I have a following, and most of my admirers are perfectly wonderful people. But some of them are very dedicated. There are fans who attend every single performance, every public appearance. There's a group that has organized itself around the bars in the Bohemian District where I sometimes play. They alert each other whenever I show up so they can all come. It's flattering, but it can be unnerving.",
          "A few years back, I ran a sweepstakes where fans could win a violin I'd signed and played in concert. The response was enormous, and we had to close entries early. Some of the people who didn't win took it very badly. I still receive letters about it from time to time, and not all of them are friendly.",
          "Ms. Fassbinder has told me more than once that I'm too accessible, that I let people get too close. She's probably right. But I don't believe a musician should lock himself behind a stage door.",
          "I want my violin back. That's what matters to me.",
          "— Elias Richter",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 04",
  },
  {
    key: "opera_voss_statement",
    code: "05",
    label: "Witness: Theodor Voss",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Witness Statement — Theodor Voss",
    meta: [
      "Case File: NPD-4471",
      "Witness: Theodor Voss, Second Violin, Neuheim Philharmonic",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I'm nineteen years old. I've worked my entire life to get to this orchestra. Every teacher, every audition, every hour of practice since I was six has been building toward this. And now the police think I'd throw all of that away to skip ahead one chair?",
          "I went outside for a cigarette after rehearsal, before packing up my things. I propped the door, stepped into the alley, smoked for a few minutes. When I came back in, someone was right behind me, so I held the door. He had a bag, dark clothes, reflective vest. I thought he was a stagehand. There were people going in and out all afternoon; crew, performers, half a dozen of Richter's fans sneaking around the building. One more person with a bag didn't exactly raise any alarms.",
          "And honestly, if that door was such a critical vulnerability, why doesn't it have an auto-locking mechanism? It's a side entrance to a building full of valuable instruments. What is this, the eighteen hundreds? I propped a door open for a cigarette and somehow that makes me a criminal mastermind. Come on.",
          "Yes, I got Elias's chair after this happened. I didn't want it this way. I wanted to earn it, and I would have earned it. Everyone in this orchestra knows I'm good enough. That isn't arrogance, it's just how it is. Give me another two or three seasons and I'd have auditioned for first violin here or somewhere else. I didn't need to steal anything to get where I'm going.",
          "If the police want to talk to someone useful, they should be looking at Richter's fans. He's got more fans than I'll probably ever have, and some of them are, frankly, obsessive. They follow him to bars, they sneak into rehearsals, they organize little networks so they know where he is at all times. I'm not saying any of them did this, but if we're talking about people who are weirdly fixated on Elias Richter and his instruments, the list doesn't start with me.",
          "I left a door unlocked. That was stupid, and I know it. But I'm a musician, not a criminal, and the idea that I'd destroy my own future over a shortcut is insulting.",
          "— Theodor Voss",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 05",
  },
  {
    key: "opera_fassbinder_statement",
    code: "06",
    label: "Witness: Helena Fassbinder",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Witness Statement — Helena Fassbinder",
    meta: [
      "Case File: NPD-4471",
      "Witness: Helena Fassbinder, Director, Neuheim State Opera",
      "Statement taken by: Detective Sergeant Friedrich Haller",
    ],
    sections: [
      {
        paragraphs: [
          "The situation has been a catastrophe, and it is still getting worse.",
          "The morning after the rehearsal, Mr. Richter arrived to find his violin missing from the staging area where he'd left it the previous evening. A search of the building then revealed that fourteen instruments had been taken from the main storage room overnight. Two thefts, discovered within minutes of each other. The damage to this institution, both financial and reputational, is severe.",
          "In the days that followed, three first-string performers withdrew from the season opener. Their concern was the security of their own instruments, and I could not, in good conscience, tell them they were wrong to worry. We drew replacements from the second string. Mr. Voss took the first violin chair. The season opened, but I would not describe it as one of our prouder evenings.",
          "I want to address the question of access to this building, because it has become central to the investigation. I have spoken with Mr. Richter on multiple occasions about his habit of engaging with the public in and around the performer entrances. He regularly stops to sign autographs, pose for photographs, and hold extended conversations with admirers in areas that are supposed to be restricted. I understand his commitment to his audience, and I respect it. But the result is that his admirers know exactly which entrance the performers use, what time rehearsals begin, and what the building's routine looks like. They have learned our patterns.",
          "I raised this concern with Mr. Richter and with building security earlier this season. I was overruled on both counts.",
          "I don't wish to speculate about who is responsible. But I will say that whatever security failures occurred were not simply the result of one man stepping outside for a cigarette. They were the result of a culture of casual access that has developed around this building over years, driven in large part by Mr. Richter's own generosity with his time. I intend to see that this changes.",
          "— Helena Fassbinder, Director, Neuheim State Opera",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 06",
  },
  {
    key: "opera_insurance",
    code: "07",
    label: "Insurance Inventory",
    agency: "Mutual Insurance Cooperative of Neuheim",
    title: "Preliminary Inventory of Stolen Items",
    meta: [
      "Prepared for: Neuheim State Opera House",
      "Assessor: Gerhard Leitner, Senior Claims Investigator",
    ],
    sections: [
      {
        heading: "Item 1",
        paragraphs: [
          "Description: Violin, antique, Marchetti workshop",
          "Owner: Elias Richter (personal property, not opera house inventory)",
          "Estimated value: 45,000 marks",
          "Last confirmed present: Approximately 4:50 PM, rehearsal day (owner states he left the instrument in the staging area after rehearsal concluded)",
          "Reported missing: 8:15 AM, following morning (owner arrived and found it gone)",
          "Location when last seen: First violin position, instrument staging area, backstage",
          "Storage conditions: Open staging area, unsecured, no lock",
        ],
      },
      {
        heading: "Items 2 through 15",
        paragraphs: [
          "Description: Various orchestral instruments (see attached schedule for individual descriptions and valuations)",
          "Owner: Neuheim State Opera (institutional collection)",
          "Combined estimated value: 362,000 marks",
          "Last confirmed present: Verified as part of standard inventory prior to building closure on rehearsal day evening",
          "Reported missing: 8:35 AM, following morning (discovered during search prompted by the violin's disappearance)",
          "Location when last seen: Main instrument storage room, backstage",
          "Storage conditions: Locked room, keyed entry, no sign of forced entry on lock or door",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Total items reported stolen: 15",
          "Total estimated value: 407,000 marks",
        ],
      },
      {
        heading: "Assessor's Note",
        paragraphs: [
          "The circumstances surrounding Item 1 differ from those surrounding Items 2 through 15. Item 1 was left in an open, unsecured staging area accessible to anyone with backstage access. Items 2 through 15 were removed from a locked storage room, requiring either a key or the skill to defeat the lock without leaving visible damage.",
          "Item 1 is a single personal instrument of exceptional sentimental value to the owner. Items 2 through 15 are institutional property removed in bulk, representing a quite different kind of operation.",
          "For the purposes of claims processing, I recommend treating these as separate incidents. Mr. Richter's instrument is insured under his personal policy and is not covered by the opera house's institutional plan.",
          "— Gerhard Leitner, Senior Claims Investigator",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 07",
  },
];

const operaSuspectsB: OperaReport[] = [
  {
    key: "opera_kastner",
    code: "08",
    label: "Suspect: Frieda Kastner",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Suspect Statement — Frieda Kastner",
    meta: [
      "Case File: NPD-4471",
      "Witness: Frieda Kastner, 26, music student",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I've been following Elias Richter's music for as long as I can remember. He's the reason I started learning violin myself, actually, though I'll never be anywhere near his level. I go to every performance I can, and when I know there's a rehearsal coming up, I try to get to the opera house early so I can see the performers arrive.",
          "That day I got there around noon with my friend Margarethe. We waited outside by the performer entrance and caught Elias on his way in. He signed my programme, we chatted for a minute, it was lovely. Margarethe had to leave for class before rehearsal started, but I stayed outside with a few others. We could hear bits and pieces through the walls if you stood in the right spot.",
          "When Elias came out after rehearsal, he said he was heading to The Silver Note for a drink and some music, and did anyone want to come along. Of course I said yes. There were about five or six of us who walked over with him. It's a good twenty minutes across the bridge to the Bohemian District, so we got there maybe half past five, could have been a bit later. Emil was already sitting at the bar when we walked in. He must have gone straight there after rehearsal.",
          "We spent the whole evening at The Silver Note. Elias played for hours. It was one of those nights where everything just comes together, you know? I didn't leave until well after midnight.",
          "I don't know anything about the stolen instruments. I was with Elias from the moment he left the opera house until I went home. I can't imagine anyone in our group doing something like this. It's devastating.",
          "— Frieda Kastner",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 08",
  },
  {
    key: "opera_brandt",
    code: "09",
    label: "Suspect: Lukas Brandt",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Suspect Statement — Lukas Brandt",
    meta: [
      "Case File: NPD-4471",
      "Witness: Lukas Brandt, 34, printer",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I like Richter's playing. I'm not one of these people who follows him around to every bar and every event, but when I've got a free afternoon, I go to the opera house and listen from the corridor outside the main hall. The staff mostly look the other way. I sit on the floor with my back against the wall, close my eyes, and just listen. It's the best free entertainment in the city.",
          "I was there that day. Got in around half one, found my usual spot in the corridor, listened through the afternoon. Beautiful programme. When rehearsal finished around quarter to five, I packed up my things and left through the main entrance. I had to get to work. I do the evening shift at Krause and Sons, the printing press over in the Artisan Quarter. My tram was at five fifteen from the Schillerstrasse stop, the one just south of the opera house. I caught it with a couple of minutes to spare and got to work a few minutes before six. My foreman, Herr Dietrich, marked me in. I was on the press until midnight.",
          "I heard about the theft the next day. It's rotten luck for Richter. I hope they find whoever did it. But I was at work from six o'clock that evening, and I've got a dozen people who can confirm it.",
          "— Lukas Brandt",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 09",
  },
  {
    key: "opera_dressler",
    code: "10",
    label: "Suspect: Emil Dressler",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Suspect Statement — Emil Dressler",
    meta: [
      "Case File: NPD-4471",
      "Witness: Emil Dressler, 52, retired clerk",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I was in the balcony that day, same as usual. There were a handful of us up there, five or six. We try to stay quiet so the ushers don't make a fuss. I've been listening to rehearsals from the balcony for years, and most of the staff know my face by now. As long as we don't disturb anyone, they leave us be.",
          "It was a fine rehearsal. Richter was in good form. When they wrapped up around quarter to five, most of us in the balcony stood up and started heading for the main staircase. I remember looking around as we were filing out and noticing that Werner wasn't with us. He'd been sitting a few rows behind me during rehearsal, closer to the side aisle. I figured he'd slipped off to use the washroom or maybe wanted to avoid the crowd on the stairs. I didn't give it much thought.",
          "I went out through the main entrance and walked to The Silver Note. It's my usual spot. I'd heard that Richter sometimes drops in there after rehearsals, and I thought I'd sit with a beer and see if he turned up. It's about a twenty-minute walk from the opera house, across the Schiller Bridge and through the Bohemian District. I got there around ten past five, maybe quarter past. Ordered a beer and waited.",
          "Richter showed up about half an hour later with Frieda and a few others. We had a good evening. He played beautifully, as always.",
          "I didn't hear about the theft until the next day. I don't know who would have taken Richter's violin. It's a terrible loss.",
          "— Emil Dressler",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 10",
  },
  {
    key: "opera_voll",
    code: "11",
    label: "Suspect: Margarethe Voll",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Suspect Statement — Margarethe Voll",
    meta: [
      "Case File: NPD-4471",
      "Witness: Margarethe Voll, 23, university student",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I went to the opera house that morning with Frieda. We got there around noon and waited outside by the performer entrance. Elias signed my programme when he arrived, which was wonderful. But I had Professor Hartmann's seminar at two o'clock, so I had to leave before rehearsal even started. I walked to the university, which is only about ten minutes from the opera house, and I was in class by two.",
          "After the seminar I went to the university library and stayed there until the evening. I was working on a paper. I didn't leave the library until around eight o'clock.",
          "I wasn't at the opera house when any of this happened. I wish I could have stayed for the rehearsal, honestly. Now with the theft and everything that's followed, who knows when the season will get back on track.",
          "Frieda told me about it the next day. She was very upset. We all are. Elias is such a generous person, and the idea that someone would steal from him is just awful.",
          "— Margarethe Voll",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 11",
  },
  {
    key: "opera_holtz",
    code: "12",
    label: "Suspect: Werner Holtz",
    agency: "Neuheim Police Department — Witness Statement",
    title: "Suspect Statement — Werner Holtz",
    meta: [
      "Case File: NPD-4471",
      "Witness: Werner Holtz, 41, accountant",
      "Statement taken by: Officer Petra Lange",
    ],
    sections: [
      {
        paragraphs: [
          "I was in the balcony during rehearsal, same as I often am. I've been attending Elias Richter's performances and rehearsals for years. I know his repertoire better than most of the orchestra does. I'm one of his most dedicated followers, and I don't apologize for that. Some people collect stamps. I collect musical experiences.",
          "Yes, I entered the sweepstakes. And no, I didn't win. I was disappointed, and I wrote to Richter about it. I don't see anything wrong with that. They closed entries early, which I thought was handled poorly. A lot of people felt the same way. But being disappointed about a contest doesn't make a person a thief.",
          "When rehearsal finished, I made my way downstairs and left the building. I walked to Café Eichhorn on Lindenstrasse. It's just around the corner from the opera house, a few minutes on foot. I got there around five o'clock, had a coffee, read the evening edition of the Neuheimer Tagblatt, and sat for about an hour. It was a quiet afternoon. I don't think anyone I know was there, but I'm a regular; the staff would recognize me. I went home after that and was in for the night by half past six.",
          "I didn't take anything. I didn't see anything unusual. And I resent being questioned as a suspect simply because I happen to care deeply about Richter's music. There's nothing criminal about admiration.",
          "— Werner Holtz",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 12",
  },
];

const operaDocsC: OperaReport[] = [
  {
    key: "opera_layout",
    code: "13",
    label: "Building Layout Report",
    agency: "Neuheim State Opera House — Building Security",
    title: "Supplementary Report: Building Layout and Access",
    meta: [
      "Prepared by: Karl Wendt, Head of Building Security",
      "Subject: Supplementary report on internal layout and access routes, prepared at the request of the Neuheim Police Department",
    ],
    sections: [
      {
        heading: "Public Areas",
        paragraphs: [
          "The main entrance opens into the ground-floor foyer. From the foyer, the grand staircase leads up to the auditorium level and the upper balcony. During performances, the balcony is accessed via the grand staircase and through the upper foyer. Exiting the balcony by this route brings a person back to the grand staircase and down to the main entrance. This is the normal route for audience members and the route our staff directs people to use.",
        ],
      },
      {
        heading: "Backstage Areas",
        paragraphs: [
          "The backstage corridor runs behind the stage at ground level. It connects the instrument staging area, the main storage room, the green room, and the performer dressing rooms. The backstage corridor also connects to Side Entrance B (the performer entrance on Schillerstrasse).",
        ],
      },
      {
        heading: "Access Between Public and Backstage",
        paragraphs: [
          "A service door on the ground floor, at the end of the corridor behind the auditorium's east seating block, connects the public side of the building to the backstage corridor. During rehearsals, this door is left unlocked for the convenience of performers and crew who need to move between the stage and the front of house. During performances, it is locked.",
          "A person in the upper balcony who wished to reach the backstage area could descend the side stairs from the balcony to the ground-floor corridor, walk to the service door, and pass through into the backstage corridor. The walk from the balcony to the backstage staging area by this route takes approximately three to four minutes.",
        ],
      },
      {
        heading: "Distances From the Opera House (on foot)",
        paragraphs: [
          "From the main entrance to the Schillerstrasse tram stop: approximately 200 meters, two to three minutes.",
          "From the main entrance to Café Eichhorn on Lindenstrasse: approximately 150 meters, two minutes.",
          "From Side Entrance B (Schillerstrasse alley) to Café Eichhorn on Lindenstrasse: approximately 200 meters, two to three minutes.",
          "From the main entrance to The Silver Note, Bohemian District (via the Schiller Bridge): approximately 1.4 kilometers, eighteen to twenty minutes.",
        ],
      },
      {
        heading: "Note on Building Familiarity",
        paragraphs: [
          "Any person who has attended rehearsals regularly from the balcony would, over time, become familiar with the building's internal layout. The service door connecting the public corridor to the backstage area is not concealed or marked as restricted. It is a plain wooden door in the corridor, distinguishable only by its location.",
          "— Karl Wendt, Head of Building Security",
        ],
      },
    ],
    stamp: "THEFT AT THE OPERA / REPORT 13",
  },
];

export const operaReportsGumshoe: OperaReport[] = operaReports;
export const operaReportsOfficer: OperaReport[] = [...operaReports, ...operaSuspectsB];
export const operaReportsLeadInvestigator: OperaReport[] = [...operaReports, ...operaSuspectsB, ...operaDocsC];

export const operaQuestionsGumshoe: string[] = [
  "The police arrested Theodor Voss. What three pieces of evidence did they use to justify the arrest?",
  "The police believe the violin theft and the storage room theft were one coordinated plan. The insurance assessor disagrees. Who do you think is right? Use evidence from the documents to explain.",
  "Elias Richter left his violin in the staging area overnight. Was this area locked or unlocked? How is this different from where the other fourteen instruments were stored?",
  "Look at the security timeline (Document 3). What happened between 5:10 PM and 5:20 PM? Why does this matter to the investigation?",
  "Several people mention Richter's fans. What do we learn about them from the documents? List at least three specific details.",
  "Theodor Voss says: \"I left a door unlocked. That was stupid, and I know it.\" Does admitting this make him more or less likely to be guilty of conspiracy? Explain your reasoning.",
  "Helena Fassbinder says the security problems were not just about \"one man stepping outside for a cigarette.\" What does she mean? What broader problem is she describing?",
  "Write your verdict in 80–120 words. Did the police arrest the right person? What actually happened? Use evidence from at least three different documents.",
];

export const operaQuestionsOfficer: string[] = [
  "The police arrested Theodor Voss. What three pieces of evidence did they use? Do you think their reasoning is sound?",
  "The insurance assessor (Document 7) recommends treating the violin theft and the storage room theft as separate incidents. What specific differences does he identify between the two thefts?",
  "Read the five suspect statements (Documents 8–12). For each person, write down where they were during the rehearsal and what they did after rehearsal ended.",
  "Cross-reference the suspects' statements against each other. Which suspects confirm each other's accounts? Give specific examples.",
  "Frieda Kastner says \"Emil was already sitting at the bar when we walked in.\" How does this detail help or hurt Emil Dressler's alibi?",
  "Lukas Brandt claims he was at work by six o'clock. What evidence supports this claim? Is it strong or weak evidence?",
  "Werner Holtz admits he entered the sweepstakes and wrote to Richter about it \"more than once.\" Look back at Richter's statement (Document 4). How do these two accounts connect?",
  "Which of the five suspects has no corroborated alibi? Explain why their account cannot be independently verified.",
  "Write your verdict in 100–150 words. Who stole Richter's violin? Eliminate each of the other suspects using specific evidence, and explain why your chosen suspect is the most likely thief. Use evidence from at least four documents.",
];

export const operaQuestionsLeadInvestigator: string[] = [
  "Emil Dressler's statement (Document 10) contains a detail about Werner Holtz that most people would overlook. Find it. Why is it significant?",
  "Werner Holtz says he \"made my way downstairs and left the building.\" He does not say which staircase he used or which exit he took. Combined with Emil's observation, what does this suggest about Werner's route?",
  "Using the building layout report (Document 13), describe the route from the upper balcony to the backstage staging area without using the grand staircase. How long does this route take?",
  "Rehearsal ended at 4:45 PM. Werner Holtz says he arrived at Café Eichhorn \"around five o'clock.\" The café is a two-minute walk from the opera house. Account for the missing time. Construct a minute-by-minute timeline of Werner's likely movements.",
  "In the Chief's email, he writes: \"I WILL NOT permit Neuheim to go the way of Altdorf and Freihafen.\" What is the Chief implying about what happened in those cities? How does this change your understanding of the storage room theft?",
  "Contrast the violin theft and the storage room theft. For each one, describe the method, the target, the likely motive, and the type of person who committed it. Explain why these must be two separate crimes by two different actors.",
  "Write your verdict in 150–200 words. Construct two arguments: (1) Prove that Werner Holtz stole Richter's violin, using the building layout and time-distance evidence. (2) Explain what the Chief's reference to Altdorf and Freihafen tells us about the storage room theft and why the police theory of a single conspiracy is wrong. Reference evidence from at least five documents.",
];

export const operaReportsByDifficulty: Record<Difficulty, OperaReport[]> = {
  "gumshoe": operaReportsGumshoe,
  "officer": operaReportsOfficer,
  "lead-investigator": operaReportsLeadInvestigator,
};

export const operaQuestionsByDifficulty: Record<Difficulty, string[]> = {
  "gumshoe": operaQuestionsGumshoe,
  "officer": operaQuestionsOfficer,
  "lead-investigator": operaQuestionsLeadInvestigator,
};
