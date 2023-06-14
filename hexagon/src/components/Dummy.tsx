const QUOTES = [
  'Experience is like a comb that life gives you when you are bald.',
  'People never learn anything by being told they have to find out for themselves.',
  'If men could learn from history, what lessons it might teach us! But passion and party blind our eyes, and the light which experience gives us is a lantern on the stern which shines only on the waves behind us.',
  'Experience is a jewel, and it had need be so, for it is often purchased at an infinite rate.',
  'He who has been bitten by a snake fears a piece of string.',
  'Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.',
  'There are many truths of which the full meaning cannot be realized until personal experience has brought it home.',
  'The greatest gift is a passion for reading. It is cheap, it consoles, it distracts, it excites, it gives you knowledge of the world and experience of a wide kind. It is a moral illumination.',
  'The only real mistake is the one from which we learn nothing.',
  'By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.',
  'My ultimate aim is to make euthanasia a positive experience.',
  'Taste every fruit of every tree in the garden at least once. It is an insult to creation not to experience it fully. Temperance is wickedness.',
  'If you do build a great experience, customers tell each other about that. Word of mouth is very powerful.',
  'Skill is the unified force of experience, intellect and passion in their operation.',
  "Experience has taught me how important it is to just keep going, focusing on running fast and relaxed. Eventually it passes and the flow returns. It's part of racing.",
  'We gain strength, and courage, and confidence by each experience in which we really stop to look fear in the face... we must do that which we think we cannot.',
  'The wise are instructed by reason, average minds by experience, the stupid by necessity and the brute by instinct.',
  "I don't believe people are looking for the meaning of life as much as they are looking for the experience of being alive.",
  'The only relevant test of the validity of a hypothesis is comparison of prediction with experience.',
  "No man's knowledge here can go beyond his experience."
]

interface DummyProps {
  seed: number
}

export function Dummy ({ seed }: DummyProps): JSX.Element {
  return (
    <div className="rounded-xl dark:text-white border-gray-300 bg-gray-100 dark:border-gray-900 dark:bg-gray-800 border-2 p-7">
      {QUOTES[seed % QUOTES.length]}
    </div>
  )
}
