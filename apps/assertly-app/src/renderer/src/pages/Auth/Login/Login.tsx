import { Link, useNavigate } from 'react-router-dom'
import { BsGithub } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { authAtom, loginMutationAtom } from '@renderer/store/auth/auth'
import { useAtom } from 'jotai'
import { cn } from '@renderer/lib/utils'
import { Button, buttonVariants } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { toast } from 'sonner'
import * as changeCase from 'change-case/keys'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [authState, setAuthState] = useAtom(authAtom)
  const [{ mutate, isPending }] = useAtom(loginMutationAtom)

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate('/')
    }
  }, [authState])

  const handleLogin = () =>
    mutate(
      {
        email,
        password
      },
      {
        onSuccess: (data: any) => {
          const res: any = changeCase.camelCase(data.data)
          setAuthState({
            isAuthenticated: true,
            userId: res.userId,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            teamId: res.teamId
          })
          navigate('/')
        },
        onError: (error: any) => {
          console.log(error)
          toast('Login Failed', {
            description: error?.response?.data?.description
          })
        }
      }
    )

  return (
    <>
      <div className="dark h-screen w-screen flex bg-zinc-900">
        <Link
          to="/auth/register"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 text-zinc-500 md:right-8 md:top-8'
          )}
        >
          Don't have an account?
        </Link>
        <div className="relative flex-1 max-w-[40%] h-full flex-col border-zinc-800 bg-zinc-200 text-white hidden md:flex dark:border-r custom-drag-region">
          <img src="/auth.jpg" alt="Auth Cover" className="object-cover w-full h-full" />
        </div>
        <div className="flex items-center justify-center flex-1 p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Login</h1>
              <p className="text-sm text-zinc-500">Enter your credentials below to login</p>
            </div>
            <div className={cn('grid gap-6 text-white')}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                  />
                </div>
                <Button onClick={handleLogin} className="mt-4 bg-orange-500" variant={'brand'} disabled={isPending}>
                  {isPending ? 'Logging in...' : 'Login'}
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>
              <Button className="text-zinc-50" variant="default" type="button">
                <BsGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-zinc-500">
              By clicking continue, you agree to our{' '}
              <Link to="/terms" className="hover:text-primary underline underline-offset-4">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="hover:text-primary underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
