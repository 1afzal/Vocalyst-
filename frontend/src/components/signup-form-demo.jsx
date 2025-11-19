"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div
      className="mx-auto w-full max-w-md rounded-none border border-black bg-white p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-black">
        Welcome to Vocalyst
      </h2>
       
      <div className="my-8">
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" className="bg-white border-black text-black" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" className="bg-white border-black text-white" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" className="bg-white border-black text-black" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" className="bg-white border-black text-black" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Your twitter password</Label>
          <Input id="twitterpassword" placeholder="••••••••" type="twitterpassword" className="bg-white border-black text-black" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md border border-black bg-white font-medium text-black hover:bg-gray-50 transition-colors"
          type="submit"
          onClick={handleSubmit}>
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-black" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-black bg-white px-4 font-medium text-black hover:bg-gray-50 transition-colors"
            type="button">
            <IconBrandGithub className="h-4 w-4 text-black" />
            <span className="text-sm text-black">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-black bg-white px-4 font-medium text-black hover:bg-gray-50 transition-colors"
            type="button">
            <IconBrandGoogle className="h-4 w-4 text-black" />
            <span className="text-sm text-black">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-black bg-white px-4 font-medium text-black hover:bg-gray-50 transition-colors"
            type="button">
            <IconBrandOnlyfans className="h-4 w-4 text-black" />
            <span className="text-sm text-black">
              reddit
            </span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2 bg-white", className)}>
      {children}
    </div>
  );
};