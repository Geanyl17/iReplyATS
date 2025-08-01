import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 h-[500px]">
          <form className="p-6 md:p-8 flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full max-w-sm">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">IReply ATS</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your ATS account.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-blue hover:bg-primary-dark-blue hover:cursor-pointer"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="bg-white hidden md:flex items-center justify-center">
            <Image
              src={"/assets/images/auth/ireply-login-logo.png"}
              width={500}
              height={350}
              alt="iReply ATS Logo"
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
