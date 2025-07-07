import { useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import Logo from "@/assets/fingerprint-scanner.gif";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange", // 👈 enables live validation
  });

  const [checking, setChecking] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");

  const checkUsernameUnique = async (username: string) => {
    setChecking(true);

    // ⛏ Replace this with your actual API call
    const isTaken = await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(username === "sachin"), 500)
    );

    setChecking(false);

    if (isTaken) {
      setError("username", {
        type: "manual",
        message: "Username is already taken",
      });
    } else {
      clearErrors("username");
    }
  };

  const onLogin: SubmitHandler<FormValues> = (data) => {
    console.log("Login data:", data);
    // const formData = new FormData(event.currentTarget);
    // const username = formData.get("username") as string;
    // const password = formData.get("password") as string;

    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Login failed");
    //   }

    //   // Handle successful login (e.g., redirect or show a success message)
    //   console.log("Login successful");
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   // Handle error (e.g., show an error message)
    // }
  };
  const userNameRightIcon = useMemo(() => {
    if (checking) {
      return <Spinner className="size-5 animate-spin" />;
    }
    if (errors.username) {
      return <span className="text-red-500">!</span>;
    }
    if (!errors.username && !checking && !!usernameValue) {
      return <span className="text-green-500">✓</span>;
    }
    return null;
  }, [checking, errors.username, usernameValue]);

  return (
    <Card className="w-[350px] p-6">
      <CardTitle className="text-center text-2xl font-bold">
        <img src={Logo} alt="logo" /> Auth Starter
      </CardTitle>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="space-y-2">
            <Label htmlFor="username" className="block text-sm font-medium">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              onBlur={(e) =>
                !!e.target.value && checkUsernameUnique(e.target.value)
              }
              onChange={(e) => {
                setUsernameValue(e.target.value);
                clearErrors("username");
              }}
              rightIcon={userNameRightIcon}
            />
            {checking && <small>Checking username...</small>}
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-sm font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isValid || checking}
          >
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500 gap-2">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
