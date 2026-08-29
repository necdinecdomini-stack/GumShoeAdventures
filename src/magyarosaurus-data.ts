export type MagyarExchange = {
  speaker: string;
  text: string;
};

export type MagyarSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  exchanges?: MagyarExchange[];
};

export type MagyarReport = {
  key:
    | "magyar_police"
    | "magyar_security"
    | "magyar_acquisition"
    | "magyar_tachkis"
    | "magyar_green"
    | "magyar_lectures"
    | "magyar_jameson"
    | "magyar_personnel"
    | "magyar_voss"
    | "magyar_grissom"
    | "magyar_beggar";
  code: string;
  label: string;
  agency: string;
  title: string;
  meta: string[];
  sections: MagyarSection[];
  stamp: string;
};

export const magyarReports: MagyarReport[] = [
  {
    key: "magyar_police",
    code: "01",
    label: "Police & Crime-Scene Report",
    agency: "Neuheim Police Department — Major Property Unit",
    title: "Initial Police and Crime-Scene Report",
    meta: [
      "Location: Central Fossil Gallery, Neuheim Museum of Natural History",
      "Discovery: Tuesday, 06:40",
      "Probable Offence Window: Sunday, 18:05 to Tuesday, 06:40",
      "Reporting Officer: Detective Sergeant Marta Weiss",
    ],
    sections: [
      {
        paragraphs: [
          "At 06:40 on Tuesday, museum cleaner Clara Hoff entered the Central Fossil Gallery and found the main display platform empty. The metal support frame remained in place, but the complete mounted skeleton of Magyarosaurus Dacus was gone. Hoff informed the museum's night porter, who contacted Director Tachkis. Police were called at 06:48.",
          "The missing specimen is described by the museum as the only complete Magyarosaurus skeleton in the world. Magyarosaurus was a small member of the sauropod family: the same broad family as the famous long-necked giants, but much smaller. The museum has not provided a final market value. Its insurance value is listed as 1.8 million crowns. Scientific and cultural value may be greater.",
          "The museum closed to the public at 18:00 on Sunday and is normally closed throughout Monday. A gallery guard recorded the skeleton as present during the final Sunday inspection at approximately 17:45. No museum employee reports seeing it after that time. Cleaning staff do not enter the fossil gallery on Mondays.",
          "There are no signs of forced entry. Doors, locks and accessible windows show no fresh damage. The alarm and camera-recording systems were erased through an authorised security account at 02:17 on Monday. They remained inactive until the night porter restarted the system at 06:12 on Tuesday after noticing a warning light. No alert was transmitted to police or to the museum's private alarm company. No useful camera recordings survive from the disabled period.",
          "The thieves appear to have removed the fossil carefully. The main steel frame was not damaged. Twelve brackets had been opened, and several small holding pins had been placed together on the platform instead of being dropped. The brackets carry faint numbers from one to twelve. This suggests that somebody knew how the display was assembled. A pale yellow chip was recovered beneath bracket seven. Laboratory staff identify it as modern epoxy resin—a hard plastic material used in fossil repair and display mounting.",
          "The west loading door was opened from inside at 02:31 and closed at 03:46. Because the cameras were not recording, the number of people and vehicles involved is unknown. Patrol officers, traffic police and road-control posts received no report of an unusual lorry or oversized load between Sunday evening and Tuesday morning.",
          "Police have identified three persons of immediate interest. Anthropologist Dr. Krisztina Green has had a public dispute with Director Tachkis concerning the museum's purchasing practices and the ownership of disputed finds. Former Security Chief James John Jameson was dismissed three weeks ago. His security account was never deactivated, and witnesses heard him say that he would “make Tachkis pay.” Director Tachkis controlled the gallery, the acquisition records and senior access to the museum.",
          "Each person can account for substantial parts of the offence window. None was continuously observed from Sunday evening until Tuesday morning. At present, police have insufficient evidence to charge any person. Investigation continues.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 01",
  },
  {
    key: "magyar_security",
    code: "02",
    label: "Security-System Examination",
    agency: "Nils Kappel, Building Security Laboratory",
    title: "Security-System Examination",
    meta: [
      "System: Vigilant 6 integrated alarm and camera recorder",
      "Account Used: JAMESON-JJ-1, Senior Security Administrator",
      "Examination Completed: Wednesday, 14:20",
    ],
    sections: [
      {
        paragraphs: [
          "The museum's security equipment was functioning correctly before the incident. I found no damaged cable, failed camera, burned fuse or broken alarm sensor. This was not a general system failure.",
          "At 02:12 on Monday, the staff entrance accepted a valid mechanical key. At 02:17, somebody entered the username JAMESON-JJ-1 and the correct administrator password at the basement security terminal. The user selected Maintenance Mode, suspended alarm reporting and stopped new camera footage from being written to the archive. These three actions were completed in the correct order. If the order had been changed, the alarm company would have received an automatic warning.",
          "The account belonged to former Security Chief James John Jameson. His employment ended three weeks before the theft, but the account remained active. While the system normally records anyone accessing the alarm box, the files were all erased meaning it is impossible to tell who deleted the footage.",
          "Senior security passwords are changed every ninety days. Museum policy also requires a sealed emergency copy of each administrator password to be stored in the director's office safe. This allows the director to restore the system if a security officer is absent or injured. According to the security register, Jameson's current password was placed in such an envelope six weeks before his dismissal. The laboratory was not permitted to search Director Tachkis's office or safe.",
          "The person operating the terminal understood the system. Maintenance Mode is not available from the normal guard screen. It requires a second menu and a separate confirmation. The camera archive was stopped without switching off the live monitors, so a guard looking briefly at the screen could have believed that recording continued. This is competent work.",
          "At 06:12 on Tuesday, the night porter restarted the camera recorder but did not restore alarm reporting. Full service was restored by police technicians at 07:03. No deleted recordings were recovered because no recordings were created during the missing period.",
          "My conclusion is that the system was deliberately deactivated by someone with both valid security information and detailed knowledge of museum procedure. The available electronic evidence cannot identify that person.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 02",
  },
  {
    key: "magyar_acquisition",
    code: "03",
    label: "Acquisition & Delivery File",
    agency: "Neuheim Museum of Natural History — Registry Copies",
    title: "Acquisition and Delivery File",
    meta: [
      "Status: Selected records",
    ],
    sections: [
      {
        heading: "Selected Registry Entries",
        paragraphs: [
          "The following entries were copied from the museum's official acquisition folder. Blank fields and missing attachments are noted exactly as they appeared in the file.",
        ],
      },
      {
        heading: "3 February — Acquisition Announcement",
        paragraphs: [
          "Director Tachkis announces that the museum has purchased the only known complete skeleton of Magyarosaurus dacus from a private European dealer. The specimen originated in the Hațeg Basin. Purchase price: 240,000 crowns from the Special Acquisitions Fund.",
        ],
      },
      {
        heading: "20 February — Technical Material Received",
        paragraphs: [
          "A packet of detailed photographs, measurements and mounting drawings is received directly by the Director's Office. The covering note states that the material is for insurance planning and gallery preparation. No duplicate recipient is listed.",
        ],
      },
      {
        heading: "18 March — Registry Warning",
        paragraphs: [
          "The Collections Registrar requests the original excavation history, export licence and complete chain of ownership. Director Tachkis writes: ‘Dealer guarantees legality. Remaining documents to follow. Do not delay preparation.’",
        ],
      },
      {
        heading: "12 April, 22:40 — Goods Received",
        paragraphs: [
          "Twelve numbered crates are recorded at the west loading entrance. Description: ‘Magyarosaurus Dacus, complete mounted specimen, disassembled for transport.’ Gross weight: 1,840 kilograms. Received and signed by Director Tachkis. Carrier name: blank. Vehicle registration: blank. Second employee signature: blank.",
        ],
      },
      {
        heading: "13–16 April — Installation",
        paragraphs: [
          "The Central Fossil Gallery is closed for private installation. Four temporary workers are entered as ‘specialist contractors.’ Their names and employer are not recorded. The normal museum conservation team is marked ‘not required.’",
        ],
      },
      {
        heading: "22 April — Final Condition Report",
        paragraphs: [
          "The folder contains a cover sheet but no completed report, photographs or bone-by-bone condition list. A pencil note reads: ‘Director retains working copy.’",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 03",
  },
  {
    key: "magyar_tachkis",
    code: "04",
    label: "Director Tachkis",
    agency: "Detective Sergeant Marta Weiss",
    title: "Interview: Director Tachkis",
    meta: [
      "Status: Recorded Tuesday, 10:35",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "For the record, describe your position." },
          { speaker: "Tachkis", text: "I’ve directed the Neuheim Museum of Natural History for nineteen years. When I arrived, half the galleries were closed and the roof leaked onto the mineral collection. We’re now internationally respected. That transformation didn’t happen by accident." },
          { speaker: "Weiss", text: "When did you last see the Magyarosaurus skeleton?" },
          { speaker: "Tachkis", text: "At approximately half past five on Sunday afternoon. I passed through the gallery before attending the trustees’ dinner. It was undisturbed." },
          { speaker: "Weiss", text: "Your movements after that?" },
          { speaker: "Tachkis", text: "The trustees’ dinner began at seven. I remained until shortly before midnight. My driver took me home. On Monday I attended a city finance meeting, gave a radio interview and spent the evening at the opera with Deputy Mayor Falk. There’ll be witnesses and cameras. I realise there are intervals when I wasn’t being photographed. I don’t generally invite photographers into my bedroom." },
          { speaker: "Weiss", text: "How difficult would it be to remove the skeleton?" },
          { speaker: "Tachkis", text: "For amateurs, extremely difficult. It arrived in twelve numbered crates and was assembled in sections. A competent team with the mounting plan could separate it again. That’d still require time, care and suitable transport." },
          { speaker: "Weiss", text: "Who possessed the mounting plan?" },
          { speaker: "Tachkis", text: "The relevant departments. Security would’ve needed basic information for emergency planning. The Registrar’s Office should have the acquisition file. Chief Jameson certainly understood the gallery better than most people." },
          { speaker: "Weiss", text: "Jameson’s account disabled the system." },
          { speaker: "Tachkis", text: "Then I suggest you ask Jameson why. He was dismissed for repeated insubordination. Three nights later, he stood in a public house announcing that he’d make me pay. I don’t enjoy pointing the police toward a former employee, but refusing to notice the obvious would be irresponsible." },
          { speaker: "Weiss", text: "He says that referred to a lawsuit." },
          { speaker: "Tachkis", text: "Perhaps it did. Angry men sometimes mean several things at once." },
          { speaker: "Weiss", text: "Museum policy keeps an emergency copy of his password in your safe." },
          { speaker: "Tachkis", text: "As it keeps emergency copies of every senior security password. They’re sealed and audited. The policy exists because a museum can’t become helpless whenever one employee is unavailable. I’ve never used Jameson’s current password." },
          { speaker: "Weiss", text: "What about Dr. Green?" },
          { speaker: "Tachkis", text: "Dr. Green is an exceptional palaeontologist, gifted researcher, and an exhausting human being. She’s accused me of corruption, favouritism, disrespect toward local scholars and purchasing objects without caring how they were obtained. None of those accusations has produced a criminal charge. She believes the Magyarosaurus shouldn’t belong to this museum. People can persuade themselves that taking an object is the same as returning it." },
          { speaker: "Weiss", text: "What exactly was her objection to this specimen?" },
          { speaker: "Tachkis", text: "Ownership and professional ethics. She was scheduled to lead our lecture series this week, and the skeleton was its centrepiece. Its loss is a catastrophe for the museum and for me personally." },
          { speaker: "Weiss", text: "Could the museum substitute a cast and continue the lectures?" },
          { speaker: "Tachkis", text: "No. Some missing or weak elements in any mounted fossil may be supported by plaster or resin, but no complete duplicate skeleton exists. A unique object can’t simply be replaced by clever painting." },
          { speaker: "Weiss", text: "Do you know why your delivery record contains no carrier or second signature?" },
          { speaker: "Tachkis", text: "It arrived late, after an exhausting international journey. I accepted personal responsibility rather than leave it on a loading platform until morning. If saving an irreplaceable fossil from delay is now evidence against me, competence has become a dangerous habit." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 04",
  },
  {
    key: "magyar_green",
    code: "05",
    label: "Dr. Krisztina Green",
    agency: "Detective Sergeant Marta Weiss",
    title: "Interview: Dr. Krisztina Green",
    meta: [
      "Status: Recorded Tuesday, 13:10",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "What’s your professional connection to the missing skeleton?" },
          { speaker: "Green", text: "I’m a vertebrate palaeontologist. Specializing in the “Dinosaur Eras”. Specifically: my research concerns the islands of the ancient Tethys Ocean and the animals that became unusually small there. Magyarosaurus is one of the clearest examples. This specimen is of particular importance to me as I was part of the team which originally discovered it." },
          { speaker: "Weiss", text: "You’ve publicly accused Director Tachkis of corruption." },
          { speaker: "Green", text: "Among other things. Please don’t shorten a detailed criticism into a dramatic newspaper word. My central concern is provenance—the record of where an object came from, who owned it and whether it could legally be sold. Tachkis treats provenance as an inconvenience. He buys first and asks questions when journalists arrive. He also rewards personal favourites, ignores local experts and allows wealthy donors to influence which regions and national histories receive attention." },
          { speaker: "Weiss", text: "Did you believe the Magyarosaurus was stolen from its country of origin?" },
          { speaker: "Green", text: "I believe the museum hadn’t shown that its purchase was ethical or legal. Those aren’t the same claim. The excavation history was incomplete. The export documents were never made available to me. Nevermind that there were rumours from my former dig-site supervisor about how Romanian government officials suddenly got quite the payday when the skeleton was purchased." },
          { speaker: "Weiss", text: "Do you question the skeleton’s authenticity?" },
          { speaker: "Green", text: "No. I don’t have any reason to. I was there when it was being painstakingly dug up. My problem was how the specimen was acquired, not whether it existed." },
          { speaker: "Weiss", text: "Tell me about this week’s lecture series." },
          { speaker: "Green", text: "It was meant for students, the public and visiting scientists. Tuesday’s programme began with island dwarfism of the Late Cretaceous. Later we planned a carbon-dating demonstration using a piece of medieval timber. Then we’d have demonstrated on a shard of bone why the carbon dating doesn’t work on dinosaurs. On Wednesday and Thursday, specialists were going to discuss preservation, skeleton mounting and the detailed anatomy of Magyarosaurus." },
          { speaker: "Weiss", text: "Would the visiting specialists have handled the skeleton?" },
          { speaker: "Green", text: "Not carelessly. The public would remain behind the barrier. A smaller professional group had permission to enter the display area with museum staff. No destructive sampling was planned. And before you ask, taking a shard for demonstrative purposes, which can be reused, isn’t destructive. This is ordinary academic work when a unique specimen becomes available." },
          { speaker: "Weiss", text: "Would that be more detailed than an ordinary museum visit?" },
          { speaker: "Green", text: "Considerably. Specialists standing a few centimetres away may notice tiny anatomical errors, unusual repairs or modern materials that a visitor behind glass would never see. That doesn’t mean we expected anything dishonest. We believed we were coming to study a fossil, not to test whether the museum had lied about it." },
          { speaker: "Weiss", text: "Did Tachkis resist the event?" },
          { speaker: "Green", text: "Publicly, he supported it. It brought prestige to his museum. His office was slow with practical arrangements—keys, insurance forms, access times—but his office is slow with everything that doesn’t involve a photographer. I didn’t find that unusual." },
          { speaker: "Weiss", text: "Where were you during the offence window?" },
          { speaker: "Green", text: "I gave a university talk on Sunday and returned to my home shortly after eleven. On Monday I worked with students from eight in the morning until half past five, then ate with my PhD candidates until nine. After that I was alone in my office. I can’t prove that I remained there every minute. I also can’t carry twelve crates down a fire escape." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 05",
  },
  {
    key: "magyar_lectures",
    code: "06",
    label: "Lecture-Series Programme",
    agency: "Neuheim Museum Education Office",
    title: "Lecture-Series Programme and Planning Notice",
    meta: [
      "Status: Public programme with internal attachment",
    ],
    sections: [
      {
        heading: "A Small Giant from a Lost Sea — Three Days with Magyarosaurus dacus",
      },
      {
        heading: "Tuesday",
        paragraphs: [
          "09:00 — Opening remarks by Director Tachkis",
          "10:00 — Dr. Krisztina Green: Islands of the Tethys Ocean",
          "13:00 — Carbon Clocks: dating medieval timber",
          "15:30 — The Little Titan: guided gallery lecture",
        ],
      },
      {
        heading: "Wednesday",
        paragraphs: [
          "10:00 — Building a Dinosaur Display",
          "13:00 — Fossil, Stone and Repair: museum conservation",
          "16:00 — Visiting specialists’ round-table",
        ],
      },
      {
        heading: "Thursday",
        paragraphs: [
          "09:30 — Measuring Magyarosaurus",
          "12:00 — Dwarfism, food and island survival",
          "15:00 — Who Owns the Past? Museums, nations and private collectors",
        ],
      },
      {
        heading: "Internal Planning Notice",
        paragraphs: [
          "Nine visiting researchers have requested close professional access to the Magyarosaurus display. At 07:00 Tuesday, museum staff are to remove the front barrier and unlock the west side of the platform. The group may use portable lamps, hand lenses, rulers and still cameras under registrar supervision. No drilling, cutting or removal of material is authorised. Director Tachkis has approved access, provided that the public and press remain outside the gallery until the morning inspection is complete.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 06",
  },
  {
    key: "magyar_jameson",
    code: "07",
    label: "James John Jameson",
    agency: "Detective Sergeant Marta Weiss",
    title: "Interview: James John Jameson",
    meta: [
      "Status: Recorded Tuesday, 16:45",
    ],
    sections: [
      {
        exchanges: [
          { speaker: "Weiss", text: "Your former security account was used at 02:17 Monday morning." },
          { speaker: "Jameson", text: "Then somebody used my name. I was forty-six kilometres north of Neuheim. Your people already know that. There’s a toll camera and a fuel-station clerk who remembers me because my sister was sick in his washroom." },
          { speaker: "Weiss", text: "Your account should’ve been cancelled when you were dismissed." },
          { speaker: "Jameson", text: "Correct. I told Human Resources on my way out. They said the form had gone upstairs. I didn’t exactly have authority to walk back into the security office and cancel myself." },
          { speaker: "Weiss", text: "Did anyone else know your password?" },
          { speaker: "Jameson", text: "Not from me. But every senior password has an emergency copy in Tachkis’s safe. His rule. Years ago a security chief collapsed during a flood alarm and nobody could reach the control menu. Tachkis never forgot the embarrassment. After that, he demanded copies of everything." },
          { speaker: "Weiss", text: "You were heard saying you’d make Tachkis pay." },
          { speaker: "Jameson", text: "Yes. In a public house, while drunk and loud enough to educate the whole street. I’d filed a wrongful-termination case that afternoon. I meant he’d pay my lost wages, my legal costs and, if fortune showed mercy, enough damages to make him choke on his breakfast." },
          { speaker: "Weiss", text: "Why were you dismissed?" },
          { speaker: "Jameson", text: "Official answer: insubordination and failure to cooperate with the director. Actual answer: I stopped pretending every stupid order was brilliant. Tachkis reduced night staff, ignored maintenance warnings and brought people through the loading entrance without putting their names in the book. Whenever I complained, he called it ‘necessary discretion.’" },
          { speaker: "Weiss", text: "What people?" },
          { speaker: "Jameson", text: "Dealers. Donors. Contractors. Men in good coats who didn’t want guards asking what’s inside their crates. Museums sometimes need privacy. They don’t need mystery. I wrote three memoranda about it. Two disappeared from my file." },
          { speaker: "Weiss", text: "Did any of those deliveries involve the Magyarosaurus?" },
          { speaker: "Jameson", text: "The dinosaur arrived at night in April. I was told not to attend. That was strange because the object was worth more than the building. Tachkis said the transport insurer had supplied its own team. I saw the gallery doors locked and twelve clean crates stacked inside the next morning. No shipping marks. No customs seals. Just numbers." },
          { speaker: "Weiss", text: "Could you dismantle the display?" },
          { speaker: "Jameson", text: "With the plan, yes. Without it, slowly. The bones sat in twelve fitted sections. The frame used locking pins rather than permanent bolts so the specimen could travel to exhibitions. Whoever took it knew where the releases were. And that’s not something you learn by staring through the public barrier." },
          { speaker: "Weiss", text: "You had that knowledge and an active account." },
          { speaker: "Jameson", text: "So did the man who kept my password in his safe, approved every contractor and signed for every crate. But I’m the one who shouted in a pub, so here we are." },
          { speaker: "Weiss", text: "Are you accusing Tachkis of arranging the theft?" },
          { speaker: "Jameson", text: "I’m accusing him of running the museum like his private kingdom. I don’t know who stole the skeleton. If I knew, I’d say it plainly." },
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 07",
  },
  {
    key: "magyar_personnel",
    code: "08",
    label: "Personnel & Alibi Follow-Up",
    agency: "Detective Constable Emil Brandt",
    title: "Personnel, Lawsuit and Alibi Follow-Up",
    meta: [
      "Status: Verification memorandum",
    ],
    sections: [
      {
        paragraphs: [
          "I examined the records connected to James John Jameson’s dismissal, his public statement against Director Tachkis and his location when the security system was deactivated.",
          "Jameson filed a wrongful-termination claim at 12:42 on the Friday before the theft. The court clerk, filing stamp and payment receipt confirm the date. The claim requests reinstatement, lost wages, legal costs and damages. Two witnesses from the King’s Lantern public house state that Jameson later said, “I’ll make Tachkis pay if it takes every crown he owns.” Both witnesses understood that he was discussing the lawsuit. Neither heard him mention the museum, the dinosaur or theft.",
          "The termination form was incomplete. The section marked COMPUTER AND ALARM ACCESS contains no signature. Human Resources believed Museum Security would cancel the account. The acting security supervisor believed Human Resources had already done so. The account remained active through administrative error. No record shows Jameson entering any museum system between his dismissal and 02:17 on Monday.",
          "At 02:06 Monday, a toll camera photographed Jameson’s car travelling north at the Marden Gate, forty-six kilometres from the museum. At 02:33, a fuel-station camera recorded Jameson, his car and his sister in North Marden. The station clerk confirms that Jameson waited while his sister recovered from illness. Normal travel time from the toll gate to the museum is at least forty minutes. Travel from the museum to the fuel station is at least fifty minutes. Jameson could not have been at the museum terminal at 02:17.",
          "At 03:18, a neighbour saw Jameson help his sister into her apartment. This does not account for every hour between Sunday evening and Tuesday morning. Searches of Jameson’s flat and car found no fossil material, museum tools, unusual cash, crate fragments or communication with known art thieves.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 08",
  },
  {
    key: "magyar_voss",
    code: "09",
    label: "Helena Voss, Registrar",
    agency: "Neuheim Police Department",
    title: "Statement: Helena Voss, Collections Registrar",
    meta: [
      "Position: Senior Collections Registrar, eleven years",
      "Statement Taken: Wednesday, 09:05",
    ],
    sections: [
      {
        paragraphs: [
          "My responsibility is to maintain the museum’s legal and scientific records. That includes purchase documents, ownership history, delivery records and condition reports. I don’t decide what the museum buys. Director Tachkis makes final acquisition decisions with the trustees.",
          "Dr. Green has complained about our records for several years. She can be rude, and she sometimes speaks as if any disagreement proves dishonesty. Nevertheless, several of her complaints are reasonable. Important acquisitions have arrived before their export or ownership documents were complete. Director Tachkis says rare objects move quickly and that excessive caution allows richer museums to take them. He’s achieved remarkable things for Neuheim, but his methods make my work difficult.",
          "The Magyarosaurus file was especially incomplete. Before delivery, the Director’s Office received photographs, exact measurements and proposed mounting diagrams. I asked for copies and was told I’d receive them after the specimen arrived. I received only a reduced set of photographs.",
          "The delivery took place late on 12 April. Ordinarily, I or a museum conservator would witness the opening of every crate, compare each item with the packing list and record existing cracks or repairs. Director Tachkis instructed us not to attend. He said the transport insurer required its own specialist team and that too many people would increase the danger. I objected in writing. He overruled me.",
          "The next morning, I saw twelve pale wooden crates inside the locked gallery. I didn’t see a carrier’s name, customs seal or country label. Four unfamiliar workers were present. Director Tachkis introduced them as installation specialists but wouldn’t give me their names. The gallery remained closed for three days.",
          "When it reopened, the skeleton appeared excellent. I’m a registrar, not a dinosaur specialist. I had no reason to declare it false. I was concerned that the condition report hadn’t been completed. The displayed specimen was supposed to be made almost entirely from original fossil material, which is extraordinary… and made the missing report more serious, not less.",
          "Staff weren’t permitted to touch or move the skeleton after installation. Cleaning was done with air and long brushes while the public barrier remained in place. Director Tachkis kept what he called the “working conservation papers” in his office. I asked for them repeatedly. He always said the file would be completed after the next major project.",
          "The lecture series would’ve been the first occasion when several outside specialists entered the display area together. On Friday, I again requested the complete condition report because I expected questions about repaired bones and mounting materials. Director Tachkis said he’d bring the private papers on Monday. He didn’t do so. I assumed he had forgotten.",
          "I can’t say that Director Tachkis stole anything. I can say that he personally controlled the purchase, the technical information, the nighttime delivery, the outside installation team and the missing records. That concentration of control was unusual even for an important acquisition.",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 09",
  },
  {
    key: "magyar_grissom",
    code: "10",
    label: "Reggie 'Ears' Grissom",
    agency: "Reggie ‘Ears’ Grissom, Investigative Reporter",
    title: "Private Background Notes: Director Tachkis",
    meta: [
      "Status: Not for publication",
    ],
    sections: [
      {
        paragraphs: [
          "Bones.",
          "You asked where the museum king gets his money. Short answer: not from directing a museum.",
          "Tachkis declares an annual museum salary of 7,200 crowns. Add official speaking fees, trustee allowances and the two little books nobody reads, and I can generously push him to 8,500. Respectable money. Comfortable money. Not palace-on-the-hill money.",
          "His house on Adler Rise cost 43,000 crowns. Property records show no mortgage. The seller’s solicitor says the first payment arrived in cash certificates through a private bank. Tachkis renovated the place immediately: imported stone, new glasshouse, wine cellar. The workmen were paid on time, which already separates him from most of Neuheim’s respectable elite.",
          "Then there’s the Bellmann roadster: 9,600 crowns. Private box at the opera. Membership at the Crown Club. Tailor on Lindenstrasse. Dinners where the wine costs more than a museum guard earns in a week. He doesn’t merely look rich for photographers. He spends rich when he thinks nobody useful is watching.",
          "I asked about inheritance. His parents were schoolteachers. His father left debts. An aunt died four years ago and left him approximately 800 crowns and a cabinet nobody wanted. Tachkis told another reporter that old family investments support him. I found no family company, trust or meaningful property. Perhaps the money tree is planted somewhere records can’t see.",
          "He also claims to earn money buying and selling paintings. Possible. People can hide a herd of elephants behind the words ‘private art sale.’ I found no public auction sale large enough to explain the house. Three dealers know him. Two refused to talk. The third laughed and asked whether museums now paid bonuses for lost paperwork.",
          "The dinosaur isn’t the only acquisition with a dirty shadow. I found four objects purchased through dealers who wouldn’t reveal previous owners. In two cases, local researchers protested that material had left its country without permission. No charge stuck. Tachkis always had a letter saying somebody, somewhere, had promised everything was legal. The trustees accepted the letter, the exhibition opened, attendance rose and everybody important congratulated everybody else.",
          "That’s why he survives. He’s good at his job. He turned a dusty provincial museum into a place foreign newspapers mention. Powerful people enjoy the result and don’t ask how the display cases were filled.",
          "I can’t prove anything. Obviously.",
          "Still: a man earning 8,500 crowns doesn’t casually spend more than 60,000 unless money’s entering through another door.",
          "Find the other door.",
          "—Ears",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 10",
  },
  {
    key: "magyar_beggar",
    code: "11",
    label: "The Beggar King",
    agency: "Delivered by hand to Bones",
    title: "Message from the Beggar King",
    meta: [
      "Status: Unverified source information",
    ],
    sections: [
      {
        paragraphs: [
          "Bones,",
          "Heard you were looking into the museum business.",
          "Some of my people may have gotten wrapped up in it. Lots of loading, unloading, and driving around for a group of pros. Paid cash. Heavy unmarked crates out of the museum. Heavy unmarked crates into the museum. Smooth. Quiet.",
          "Also. Word is someone commissioned a fake of that dinosaur last spring. The one that was disappeared.",
          "Thought you might need the tip.",
          "Good luck.",
          "—Beggar King",
        ],
      },
    ],
    stamp: "MAGYAROSAURUS / REPORT 11",
  },
];
