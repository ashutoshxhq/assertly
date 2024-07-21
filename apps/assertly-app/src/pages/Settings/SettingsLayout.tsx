import { RiBellLine, RiOrganizationChart, RiSettings2Line, RiTeamFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { GoWorkflow } from "react-icons/go";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";
import Account from "./Account/Account";
import Integrations from "./Integrations/Integrations";
import TeamMembers from "./TeamMembers/TeamMembers";
import Organization from "./Organization/Organization";
import Notification from "./Notification/Notification";

const SettingsLayout = () => {
    return (
        <div className="p-8">
            <div className="flex items-center justify-between px-6">
                <div className="flex items-center justify-between gap-4">
                    {/* <span className="text-2xl">
                        <RiSettings2Line />
                    </span> */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Settings
                        </h2>
                        {/* <p className="dark:text-zinc-500 text-sm">
                            Manage your settings
                        </p> */}
                    </div>
                </div>
            </div>
            <Tabs defaultValue="user-profile" className="w-full p-4">
                <TabsList className="bg-gray-200">
                    <TabsTrigger value="user-profile">
                        <MdManageAccounts className="mr-2" />
                        User Profile
                    </TabsTrigger>
                    <TabsTrigger value="organization">
                        <RiOrganizationChart className="mr-2" />
                        Organization
                    </TabsTrigger>
                    <TabsTrigger value="teamMembers">
                        <RiTeamFill className="mr-2" />
                        Team Members
                    </TabsTrigger>
                    <TabsTrigger value="integrations">
                        <GoWorkflow className="mr-2" />
                        Integrations
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <RiBellLine className="mr-2" />
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <div className="border-b-2 dark:border-zinc-900 my-4 mx-2"></div>
                <TabsContent value="user-profile">
                    <Account />
                </TabsContent>
                <TabsContent value="organization">
                    <Organization />
                </TabsContent>
                <TabsContent value="teamMembers">
                    <TeamMembers />
                </TabsContent>
                <TabsContent value="integrations">
                    <Integrations />
                </TabsContent>
                <TabsContent value="notifications">
                    <Notification />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsLayout;
