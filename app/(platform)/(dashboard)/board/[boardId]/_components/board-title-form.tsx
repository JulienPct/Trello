"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface IBoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: IBoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Tableau "${data.title}" mis à jour`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ id: data.id, title });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing)
    return (
      <form
        ref={formRef}
        className="flex items-center gap-x-2"
        action={onSubmit}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visble:ring-transparent border-none"
        />
      </form>
    );

  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
