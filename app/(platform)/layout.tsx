import { frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider localization={frFR}>{children}</ClerkProvider>;
};

export default PlatformLayout;
