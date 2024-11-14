'use client'
import React from 'react'
import Image from 'next/image'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import { FormFieldTypes } from './forms/PatientForm';

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldTypes,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string, 
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props;

    switch (fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className='flex rounded-md border-dark-500'>
                    {iconSrc && (
                        <Image 
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            width={24} 
                            height={24}
                            className='ml-2'
                        />
                    )}
                   <FormControl>
                   <Input 
                        {...field} 
                        placeholder={placeholder} 
                        disabled={props.disabled} 
                    />
                   </FormControl>
                </div>
            );
        default:
            return null;
    }
}

function CustomFormField(props: CustomProps) {
    const { control, fieldType, name, label } = props;
    
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        {fieldType !== FormFieldTypes.CHECKBOX && label && (
                            <FormLabel>
                                {label}
                            </FormLabel>
                        )}
                        <RenderField field={field} props={props} />
                        <FormMessage className='shad-error' />
                    </FormItem>
                )}
            />
        </div>
    );
}

export default CustomFormField;
