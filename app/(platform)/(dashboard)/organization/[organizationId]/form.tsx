"use client";

import { createBoard } from "@/actions/create-board";

import FormButton from "@/components/form/form-button";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.log(error, "ERROR");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput label="Titre du tableau" id="title" errors={fieldErrors} />
      </div>
      <FormButton>
        Créer
      </FormButton>
    </form>
  );
};
