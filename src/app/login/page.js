'use client'

// Authentication and form handling imports
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// UI components
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError('Invalid credentials')
      } else if (res?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2 h-[500px]">
            {/* Login form */}
            <form onSubmit={handleLogin} className="p-6 md:p-8 flex items-center justify-center">
              <div className="flex flex-col gap-6 w-full max-w-sm">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-gray-900">IReply ATS</h1>
                  <p className="text-gray-600 text-balance">
                    Login to your ATS account.
                  </p>
                </div>

                {/* Error display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm text-blue-600 underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-blue hover:bg-primary-dark-blue hover:cursor-pointer"
                >
                  {isLoading ? 'Signing in...' : 'Login'}
                </Button>

                {/* Registration link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    No account yet?{' '}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </form>

            {/* Logo UI */}
            <div className="bg-white hidden md:flex items-center justify-center">
              <Image
                src="/assets/images/auth/ireply-login-logo.png"
                width={500}
                height={350}
                alt="iReply ATS Logo"
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
