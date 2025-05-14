
import React from "react";
import { useAuth } from "@/contexts/auth";
import DemoAccountCard from "./demo/DemoAccountCard";
import { initDemoAccounts } from "./demo/initDemoAccounts";
import { DemoAccount } from "./demo/types";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DemoInfoAlert from "./demo/DemoInfoAlert";

// Get demo accounts data
const demoAccounts = initDemoAccounts();

const DemoAccounts = () => {
  const { loginWithDemo, isLoggingIn } = useAuth();

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      await loginWithDemo(account, () => {
        console.log(`Connexion avec le compte demo ${account.role} réussie`);
      });
    } catch (error) {
      console.error("Erreur lors de la connexion avec le compte demo:", error);
    }
  };

  const studentAccounts = demoAccounts.filter(account => account.role === "student");
  const instructorAccounts = demoAccounts.filter(account => account.role === "instructor");
  const adminAccounts = demoAccounts.filter(account => account.role === "super_admin");
  const businessAccounts = demoAccounts.filter(account => account.role === "business_admin");

  return (
    <div className="space-y-4">
      <DemoInfoAlert />
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Étudiant</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {studentAccounts.map((account) => (
            <DemoAccountCard
              key={account.email}
              account={account}
              onClick={() => handleDemoLogin(account)}
              isLoading={isLoggingIn}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Instructeur</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {instructorAccounts.map((account) => (
            <DemoAccountCard
              key={account.email}
              account={account}
              onClick={() => handleDemoLogin(account)}
              isLoading={isLoggingIn}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Admin</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {adminAccounts.map((account) => (
            <DemoAccountCard
              key={account.email}
              account={account}
              onClick={() => handleDemoLogin(account)}
              isLoading={isLoggingIn}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Entreprise</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {businessAccounts.map((account) => (
            <DemoAccountCard
              key={account.email}
              account={account}
              onClick={() => handleDemoLogin(account)}
              isLoading={isLoggingIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoAccounts;
