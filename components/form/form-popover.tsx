"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./form-input";
import FormButton from "./form-button";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface IFormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: IFormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Tableau créé avec succès");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Créer un tableau
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormInput
              id="title"
              label="Titre"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Créer</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
