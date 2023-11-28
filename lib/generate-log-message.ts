import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `a créé ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `a modifié ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `a supprimé ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `action inconnue ${entityType.toLowerCase()} "${entityTitle}"`;;
  }
};
