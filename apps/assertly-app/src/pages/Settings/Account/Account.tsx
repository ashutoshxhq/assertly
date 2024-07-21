import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "src/components/ui/card";

import { Button } from "src/components/ui/button";

const Account = () => {
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
                </CardFooter>
            </Card>
        </div>
    );
};

export default Account;
