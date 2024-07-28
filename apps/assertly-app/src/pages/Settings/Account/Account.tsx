import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "src/components/ui/card";

import { Button } from "src/components/ui/button";
import { Switch } from "src/components/ui/switch";
import { useAtom } from "jotai";
import { isDarkMode } from "src/store/app/app";

const Account = () => {
    const [darkMode, setDarkMode] = useAtom(isDarkMode);

    return (
        <div>
            <Card className="max-w-6xl">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>{/* user profile update form here */}</form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant={"default"}>Update Profile</Button>
                    <div className="pt-2">
                        <Switch
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                        />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Account;
