import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "src/components/ui/card";

import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Button } from "src/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

const Organization = () => {
    return (
        <div className="flex flex-col gap-4">
            <Card className="max-w-6xl">
                <CardHeader>
                    <CardTitle>Organization Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <div className="flex gap-2 items-center">
                                    <Label htmlFor="orgId">Organization ID</Label>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-100"
                                    >
                                        <CopyIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Input
                                    id="orgId"
                                    value="0c691884-3204-451c-8020-d0d3ffbaf97a"
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="orgName">
                                    Organization Name
                                </Label>
                                <Input
                                    id="orgName"
                                    placeholder="Name of your organization"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="primaryEmaiId">
                                    Primary email address
                                </Label>
                                <Input
                                    id="primaryEmailId"
                                    placeholder="Primary email address"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant={"default"}>Update Settings</Button>
                </CardFooter>
            </Card>

            <Card className="max-w-6xl">
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>{/* table here */}</CardContent>
            </Card>
        </div>
    );
};

export default Organization;
