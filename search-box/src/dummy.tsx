import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const tabs = [
  { name: 'Small', size: 5 },
  { name: 'Medium', size: 20 },
  { name: 'Big', size: 100 }
]

export function Content (): JSX.Element {
  return (
    <div className="flex w-full justify-center px-4 bg-slate-800 text-sm/6">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4 sticky top-0 py-4 bg-slate-800/10 backdrop-blur-md">
            {tabs.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full w-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none duration-300 transition-colors border-0 data-[selected]:data-[hover]:bg-white/10 data-[selected]:bg-white/10 data-[hover]:bg-gray-800 data-[focus]:outline-1"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3 mb-8">
            {tabs.map(({ name, size }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                {Array.from({ length: size }).map((_, idx) => (
                  <p key={idx}>Dummy text</p>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}

const DummyText = (): JSX.Element => (
  <div className="w-full">
    <div className="h-2.5 bg-gray-800 rounded-full w-48 mb-4"></div>
    <div className="h-2 bg-gray-800 rounded-full max-w-[480px] mb-2.5"></div>
    <div className="h-2 bg-gray-800 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-800 rounded-full max-w-[440px] mb-2.5"></div>
    <div className="h-2 bg-gray-800 rounded-full max-w-[460px] mb-2.5"></div>
    <div className="h-2 bg-gray-800 rounded-full max-w-[360px]"></div>
  </div>
)

export const DummyBlock = (): JSX.Element => {
  return (
    <div className="space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
      <div className="flex items-center justify-center w-full h-48 bg-gray-800 rounded sm:w-96">
        <svg className="w-10 h-10 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
      <DummyText/>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
