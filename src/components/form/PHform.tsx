import {ReactNode} from 'react';
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";


type TFormConfig = {
    defaultValues?:Record<string, any>;
}

type TFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
} & TFormConfig;

const PHform = ({ onSubmit, children, defaultValues }: TFormProps) => {

    const formConfig: TFormConfig = {};
    if(defaultValues){
        formConfig["defaultValues"] = defaultValues;
    }


  const methods = useForm( formConfig );
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHform;