'use client'

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
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
            <h1 className='font-eina font-bold text-2xl sm:text-4xl lg:text-5xl mt-6'>FAQ</h1>   
            <Accordion open={openAcc1} icon={<Icon id={1} open={openAcc1} />}>
            <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc1}>
                What is Material Tailwind?
            </AccordionHeader>
            <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </AccordionBody>
            </Accordion>
            <Accordion open={openAcc2} icon={<Icon id={1} open={openAcc2} />}>
            <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc2}>
                How to use Material Tailwind?
            </AccordionHeader>
            <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </AccordionBody>
            </Accordion>
            <Accordion open={openAcc3} icon={<Icon id={1} open={openAcc3} />}>
            <AccordionHeader className='font-eina font-semibold text-xl sm:text-2xl lg:text-3xl' onClick={handleOpenAcc3}>
                What can I do with Material Tailwind?
            </AccordionHeader>
            <AccordionBody className='font-eina font-semibold text-base sm:text-lg lg:text-xl'>
                We&apos;re not always in the position that we want to be at. We&apos;re constantly
                growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                ourselves and actualize our dreams.
            </AccordionBody>
            </Accordion>
        </div>
    </>
  );
}
export default Faq;