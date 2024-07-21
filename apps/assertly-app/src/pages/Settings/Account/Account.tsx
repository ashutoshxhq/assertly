import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "src/components/ui/card"

import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { Button } from "src/components/ui/button"
import { CopyIcon } from "@radix-ui/react-icons"

const Account = () => {
  return (
    <div>
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Modify your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="orgId">Organization ID</Label>
                  <div className="flex gap-1 items-center">
                    <Input id="orgId" value="0c691884-3204-451c-8020-d0d3ffbaf97a" disabled/>
                    <Button size="icon" variant="outline" className="h-8 w-8 opacity-100">
                        <CopyIcon className="h-4 w-4"/>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" placeholder="Name of your organization" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="primaryEmaiId">Primary email address</Label>
                  <Input id="primaryEmailId" placeholder="Primary email address" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
    </div>
  )
}

export default Account
