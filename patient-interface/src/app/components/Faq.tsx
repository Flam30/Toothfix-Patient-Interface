'use client'

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }: { id: number, open: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transition-transform transform ${
        id === open ? "rotate-180" : ""
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const Faq: React.FC = () => {
  const [openAcc1, setOpenAcc1] = React.useState(false);
  const [openAcc2, setOpenAcc2] = React.useState(false);
  const [openAcc3, setOpenAcc3] = React.useState(false);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  return (
    <>
        <div className="flex flex-col items-start">
            <h1 className='font-eina font-bold text-2xl sm:text-4xl lg:text-5xl mt-24'>FAQ</h1>   
            <Accordion open={openAcc1} icon={<Icon id={1} open={openAcc1} />}>
              <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc1}>
                  How do I book an appointment?
              </AccordionHeader>
              <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </AccordionBody>
            </Accordion>
            <Accordion open={openAcc2} icon={<Icon id={2} open={openAcc2} />}>
              <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc2}>
                How do I cancel an appointment?
              </AccordionHeader>
              <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </AccordionBody>
            </Accordion>
            <Accordion open={openAcc3} icon={<Icon id={3} open={openAcc3} />}>
              <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc3}>
                Where can I see my appointments?
              </AccordionHeader>
              <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </AccordionBody>
            </Accordion>
        </div>
    </>
  );
}
export default Faq;