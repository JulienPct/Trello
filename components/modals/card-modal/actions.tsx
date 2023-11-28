"use client";

import { deleteCard } from "@/actions/delete-card";
import { duplicateCard } from "@/actions/duplicate-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { TCardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface IActionsProps {
  data: TCardWithList;
}

const Actions = ({ data }: IActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeDuplicateCard, isLoading: isLoadingDuplicateCard } =
    useAction(duplicateCard, {
      onSuccess: (data) => {
        toast.success(`Carte "${data.title}" dupliquée avec succès}`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const { execute: executeDeleteCard, isLoading: isLoadingDeleteCard } =
    useAction(deleteCard, {
      onSuccess: (data) => {
        toast.success(`Carte "${data.title}" supprimée avec succès}`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  const onDuplicate = () => {
    const boardId = params.boardId as string;

    executeDuplicateCard({ boardId, id: data.id });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ boardId, id: data.id });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onDuplicate}
        disabled={isLoadingDuplicateCard}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        <Copy className="h-4 w-4 mr-2" />
        Dupliquer
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDeleteCard}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        <Trash className="h-4 w-4 mr-2" />
        Supprimer
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};

export default Actions;
