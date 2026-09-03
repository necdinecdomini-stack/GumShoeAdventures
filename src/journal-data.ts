import type { Difficulty } from "./types";

export interface JournalParagraph {
  text: string;
  type?: "quote";
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: JournalParagraph[];
  questions: ComprehensionQuestion[];
}

export const journalEntries: JournalEntry[] = [
  {
    id: "entry-1",
    title: "Entry 1",
    subtitle: "The Heimhof Steel Mill",
    paragraphs: [
      { text: "I want to record to show that I am writing this under duress." },
      { text: "Jack. The psychological consultant for the S.I.D. has insisted that all of us field agents should begin written a diary. Something about staying grounded and helping make sure we process all the things we see, the things we do, and the things we sometimes have to let happen." },
      { text: "Writing a diary." },
      { text: "Seems like something my niece would do. But maybe that’s okay. It’ll give me something to talk about with the kid, Matty, next time I see her. It’s not as if I can tell Matty ‘I shot a thug in an operation gone wrong and then tied his leg with my belt until the Ambulance arrived’ or ‘We broke up a gang fight but the gangsters bribed the police and walked right out of the cells’. Hah! God knows if I told that last one and then she asked Margaret ‘Mama, why are the police pigs? Mama, aren’t the police our friends?’, my sister would hit me upside the head with a rolling pin and kick me out before lunch." },
      { text: "Be a shame to make Margaret mad. She makes great pies." },
      { text: "Anyways. I’m to write a memoire, or journal, or diary or whatever about the things that go on." },
      { text: "Fine." },
      { text: "A couple days ago, the S.I.D. was contacted by the police liaison officer. It happens, sometimes they get cases they can’t deal with. Not because they don’t have the manpower or the tools, but because the politics makes it impossible. Sure, we might live in an age of laws and courts and justice, but the old families, the noble dynasties, they still have certain privileges. And one of those is being allowed to tell the police “No”." },
      { text: "In this case they didn’t actually say no. They said, and I quote:" },
      { text: "“We investigated the matter ourselves and have concluded that the only person with access to the safe, the money within, and the ability to manipulate records and logs was the shift foreman. Kindly do your jobs and arrest him. The relevant evidence has been handed over to the prosecutor’s office.”", type: "quote" },
      { text: "Which is what the nobility say when they want something to go away. Usually, it works. This time, it didn’t. The officer in charge decided to investigate further. And to do that. They needed us: The S.I.D. We answer to the Chief. And the Chief answers to the Emperor. There’s no point in that chain where the nobility can veto an investigation." },
      { text: "The case itself was strange from the beginning since it was, originally, the owners of the Heimhof Steel Mill, the von Heimhof’s, who reported payroll going missing. At some point between the payroll being delivered to the mill and the payroll being paid out, some of it had disappeared. This meant that there was either some grand conspiracy within the mill and everyone was pretending to see nothing, or that someone was breaking into rob the safe. The thing is, both seemed implausible." },
      { text: "First off: It makes no sense. They altered the police. Then they stonewalled the police and prevented them from conducting any sort of investigation." },
      { text: "Second of all: There’s no reason for anyone to steal “a bit” of the payroll. It adds up, yes, but steal from the nobility carries extra penalties and the difference between stealing 100 versus 1000 crowns is minimal so the thieves might as well lift the entire safe’s worth of cash. On the other hand the person isn’t just borrowing a stray crown or two to buy lunch. Not that that would save their job but at least it would be understandable." },
      { text: "Anyways…" },
      { text: "Once the case was transferred to me it really didn’t matter what the von Heimhof’s did or did not want to approve. I just had to wait for the payroll to be transferred and conduct a stakeout to see who went to dip their fingers into it. A streetcar and a subway later and I was walking towards the Heimhof steel mill, a cathedral of industry and a shrine of progress, it converted coal and iron ore into the refined steel which had built the city. All around me were factories, power plants, and trains. The flow of raw materials from the harbour, and the flood of manufactured goods from the factories meant that the trains never stopped, the district constantly filled by the thundering of iron wheels, crashing metal, and hissing steam." },
      { text: "Now see. Every part of the city has its own rules. And things that are normal in one part of the city aren’t normal in another. Take the soot, for example. Pretty standard in the industrial district, so is the strange metallic taste in the air and water. If I were to see or taste that in the Palace or Upper Districts that’s either forest fire or some other kind of catastrophic burn. On the other hand, personal motor vehicles are the opposite. I don’t think twice about them most of the time but, at two in the morning, right as the factory is shut down for its daily maintenance… That’s something worth thinking twice about." },
      { text: "Sure, a foreman or shift manager could probably scrape together enough cash to buy a car of their own but a foreign import? No chance. The only kinds of people who drove their expensive cars into the factory lots are the people who own the factories, the people who finance the factories, or the kind of people you don’t want anywhere near your factory. My approach was covered by the trains, and a flashed a badge ensured that any maintenance staff on site suddenly had the urge to head out for a smoke break. The overseer’s office, where the shift foreman, the factory manager, and the train controllers worked out of was on the high floor, connected to the rest of the factory by a long wrought iron staircase, giving the white collar workers inside a clear view of everything happening beneath them." },
      { text: "One thing I’ve noticed over the years: A lot of people thing that robbing places is best done at night, or when nobody else is around. The problem with that is that everyone knows how things should be at night or if no one is around. During the day, with people around, nobody looks twice at the man waiting at the corner, or the group of five talking to a group of two… and nobody questions why there’s a light burning in the office." },
      { text: "That’s when I relaxed. A bit. No criminal. No real one anyways is going to conduct a robbery at night and turn the lights on. It took a special kind of arrogance to do something like that." },
      { text: "Lo and behold. The youngest of the von Heimhof’s, Oswald, had the safe open and was ‘liberating’ some of the cash. The threat of being cuffed and frogmarched out of the office to await his father’s arrival was enough to get him to talk: He had a fondness for horseraces and, sometimes, lost more than he won. Occasionally, losing so much that he had to make an emergency transfer from the family’s factory payroll into his own wallet." },
      { text: "I don’t know what happened after. But, if the fury on the von Heimhof elder, Jürgen von Heimhof, was anything to go by, I don’t think that Oswald will be attending the races without supervision for a long time yet." },
      { text: "Well… I guess I do know that the investigation was quietly dropped, a round of bonuses were paid out to the staff who all forgot about the incidents pretty quick, and a message was relayed to the police that the matter had been resolved by the family." },
      { text: "In the end, nobody lost their jobs, the noble was caught and reprimanded, and everybody got to save face." },
      { text: "That’s a win in my books." },
    ],
    questions: [
      {
        id: "e1q1",
        question: "Why is Bones writing this diary?",
        options: [
          "He enjoys writing and wanted to start a creative hobby",
          "Jack, the S.I.D. psychological consultant, required all field agents to keep one",
          "He wanted to keep a record of his cases for court",
          "His sister Margaret asked him to write down his experiences",
        ],
        correctIndex: 1,
        explanation: "Jack, the psychological consultant for the S.I.D., insisted that all field agents begin writing a diary to help them stay grounded and process their experiences.",
      },
      {
        id: "e1q2",
        question: "What was the original crime that was reported to the police?",
        options: [
          "Equipment was being stolen from the factory floor",
          "A worker was caught forging payroll records",
          "Part of the payroll kept disappearing before it was paid out",
          "The factory safe was broken into and emptied",
        ],
        correctIndex: 2,
        explanation: "The von Heimhofs reported that some of the payroll was disappearing between when it was delivered to the mill and when it was supposed to be paid out to workers.",
      },
      {
        id: "e1q3",
        question: "Why couldn’t the police investigate the case themselves?",
        options: [
          "They didn’t have enough officers to spare",
          "The von Heimhof family used their noble privileges to block the investigation",
          "The industrial district was outside their jurisdiction",
          "The factory workers refused to cooperate with police",
        ],
        correctIndex: 1,
        explanation: "The nobility have the privilege of telling the police “No.” The von Heimhofs told the police the shift foreman was guilty and to arrest him, effectively shutting down any real investigation.",
      },
      {
        id: "e1q4",
        question: "What does the S.I.D. have that the regular police don’t? Why does that matter in this case?",
        options: [
          "Better weapons and training, which helped them enter the factory safely",
          "A chain of command that goes to the Emperor, which the nobility cannot veto",
          "Secret agents inside the factory who could spy on the workers",
          "Special permission to arrest nobles, which the police are forbidden from doing",
        ],
        correctIndex: 1,
        explanation: "The S.I.D. answers to the Chief, and the Chief answers to the Emperor. There is no point in that chain where the nobility can interfere, which is why the S.I.D. could investigate what the police could not.",
      },
      {
        id: "e1q5",
        question: "Why did Bones take the streetcar and subway instead of driving to the factory?",
        options: [
          "He doesn’t own a car and can’t afford one",
          "The factory district doesn’t allow personal vehicles at night",
          "A car arriving at the factory at 2 AM would draw attention and give away his stakeout",
          "The streets in the industrial district are too narrow for cars",
        ],
        correctIndex: 2,
        explanation: "Bones later notes that a car at the factory at 2 AM is highly suspicious. Arriving by public transport kept him inconspicuous and his stakeout a secret.",
      },
      {
        id: "e1q6",
        question: "Two things about the stolen money didn’t make sense. What were they?",
        options: [
          "The money was always stolen on the same day, and the safe showed no signs of forced entry",
          "The family reported the theft but then blocked the investigation, and the amounts stolen were too much for casual borrowing but too little for a real heist",
          "The workers never noticed the missing money, and the foreman had a perfect alibi",
          "The safe was in a locked room, and the missing amounts never matched the payroll records",
        ],
        correctIndex: 1,
        explanation: "First, the von Heimhofs reported the crime then stonewalled the police — why report it and then prevent an investigation? Second, the stolen amounts were strange: too much for casual borrowing but far too little for someone risking the harsh penalties of stealing from nobility.",
      },
      {
        id: "e1q7",
        question: "When Bones arrives at the factory at night, he sees a car parked outside. Why does that catch his attention?",
        options: [
          "The car was parked illegally in a loading zone",
          "He recognised the car from a previous investigation",
          "It was an expensive foreign import — too costly for anyone who’d normally be at the factory at 2 AM",
          "Cars were banned from the industrial district after dark",
        ],
        correctIndex: 2,
        explanation: "Bones noted that a foreman might afford a basic car, but a foreign import? No chance. Only factory owners, financiers, or criminals would drive such an expensive car into the factory lot at that hour.",
      },
      {
        id: "e1q8",
        question: "Bones sees a light on in the office and relaxes. Why would a light make him feel less worried, not more?",
        options: [
          "The light meant the security guards were doing their rounds",
          "A real criminal wouldn’t turn on the lights during a nighttime robbery — only someone very arrogant or careless would",
          "The light showed that the police had already arrived at the scene",
          "Factory regulations required the office lights to stay on during maintenance hours",
        ],
        correctIndex: 1,
        explanation: "Bones knew that no professional criminal would turn on lights during a robbery at night. Doing so took a “special kind of arrogance” — meaning whoever was inside wasn’t a dangerous thief, just someone who felt entitled.",
      },
      {
        id: "e1q9",
        question: "Who was stealing the money, and why?",
        options: [
          "The shift foreman, who was selling factory secrets to a competitor",
          "A group of workers, who split the money evenly among themselves",
          "Oswald von Heimhof, the youngest son, to cover horse racing debts",
          "Jürgen von Heimhof, the family patriarch, to hide money from tax collectors",
        ],
        correctIndex: 2,
        explanation: "Oswald, the youngest of the von Heimhofs, had a fondness for horse races and sometimes lost more than he won. He would take money from the factory payroll to cover his gambling debts.",
      },
      {
        id: "e1q10",
        question: "At the end, Bones says “That’s a win in my books.” Why did he call it a win?",
        options: [
          "The S.I.D. received a commendation from the Emperor",
          "Nobody lost their jobs, the thief was caught, and everyone saved face",
          "Oswald was arrested and sent to prison for his crimes",
          "The police finally admitted the S.I.D. was better at solving cases",
        ],
        correctIndex: 1,
        explanation: "Bones saw it as a win because no innocent workers lost their jobs, the guilty party was caught and dealt with by his family, and both the von Heimhofs and the police were able to save face.",
      },
      {
        id: "e1q11",
        question: "Do you agree that this is a win? Why or why not?",
      },
    ],
  },
];

export const journalEntriesByDifficulty: Record<Difficulty, JournalEntry[]> = {
  "gumshoe": journalEntries,
  "officer": journalEntries,
  "lead-investigator": journalEntries,
};
