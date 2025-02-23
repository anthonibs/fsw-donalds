"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf } from "@/helpers/cpf-valid";

interface IFinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  username: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  cpf: z
    .string({ message: "O CPF é obrigatório" })
    .trim()
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderDialog = ({ onOpenChange, open }: IFinishOrderDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        customInput={Input}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button type="submit" className="w-full rounded-full" variant="default">
                  Finalizar
                </Button>
                <DrawerClose>
                  <Button className="w-full rounded-full" variant="secondary">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
