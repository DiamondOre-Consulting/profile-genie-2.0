import React, { useState } from 'react'
import { Badge } from './ui/badge'
import Hero from '@/Templates/Components/Template1/Hero'
import { useForm } from 'react-hook-form'
import { addProfileDetailSchema, profileDetail } from '../validations/PortfolioValidation'
import { zodResolver } from '@hookform/resolvers/zod'


const Preview = () => {

    const { register, getValues } = useForm<profileDetail>({
        resolver: zodResolver(addProfileDetailSchema),
        defaultValues: {
            fullName: "Akash Singh",
            tagline: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        }
    });

    // Example of how to get the form values
    const formValues = getValues();
    console.log(formValues);

    return (
        <div className="min-h-screen mx-auto text-white w-[97.5%] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background div */}
            <div className="absolute top-0 w-full h-[39rem] productBg z-0"></div>
            <div className="relative z-[10] h-full">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Badge className="bg-[#1b1638] border border-[#2e2e2e]">Preview Portfolio</Badge>
                    <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h1>
                    <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure necessitatibus unde dolore inventore omnis earum, eligendi tenetur porro delectus voluptate dolores maxime iste cumque illo vitae tempora modi. Repudiandae architecto alias perspiciatis, enim quam repellat tempore at expedita pariatur dignissimos, id delectus, eum nemo?</p>
                </div>
            </div>

            <div className='w-[99%] bg-white z-[100] rounded-xl m-4'>
                <Hero portfolio={formValues} />
            </div>

        </div>
    )
}

export default Preview
