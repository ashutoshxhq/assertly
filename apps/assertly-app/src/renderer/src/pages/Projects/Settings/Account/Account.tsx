import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@renderer/components/ui/card'

import { Button } from '@renderer/components/ui/button'
import { Switch } from '@renderer/components/ui/switch'
import { useAtom } from 'jotai'
import { isDarkMode } from '@renderer/store/app/app'

const Account = () => {
  const [darkMode, setDarkMode] = useAtom(isDarkMode)

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
          <Button variant={'default'}>Update Profile</Button>
          <div className="pt-2">
            <Switch
              checked={darkMode}
              onCheckedChange={(checked) => {
                setDarkMode(checked)
                // @ts-ignore
                checked && window?.colorMode ? window?.colorMode?.dark() : window?.colorMode?.light()
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Account
