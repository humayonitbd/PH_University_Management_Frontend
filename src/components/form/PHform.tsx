import { Form } from 'antd';
import {ReactNode} from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from "react-hook-form";


type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?:any;
};

type TFormProps = {
  onSubmit?: SubmitHandler<any> | undefined;
  children: ReactNode;
} & TFormConfig;

const PHform = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  ///zod validation er jonno kaj korse
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const submit:SubmitHandler<FieldValues> =(data)=>{
    if (onSubmit) {
      onSubmit(data);
      methods.reset();
    }
  }
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods?.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHform;