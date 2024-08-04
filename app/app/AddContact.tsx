"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AddContact() {
  const [uuidField, setUuidField] = useState("");
  const [nameField, setNameField] = useState("");
  const [status, setStatus] = useState("");
  const supabase = createClient();

  async function handleSubmit() {
    const { data, error } = await supabase
      .rpc("create_contact_friendship", {
        p_friend_user_id: uuidField,
        p_name: nameField,
      })
      .single();

    setStatus(error ? error.message : data.id);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            placeholder="UUID"
            type="text"
            onChange={(e) => {
              setUuidField(e.target.value);
            }}
          />
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => {
              setNameField(e.target.value);
            }}
          />
          <input type="submit" />
          {status}
        </form>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
