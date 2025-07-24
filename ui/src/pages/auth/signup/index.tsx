import { useNavigate } from "react-router";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "@/services/users";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";

const CreateRegisterSchema = z.object({
  email: z.email().min(1, "Este campo é obrigatório"),
  password: z.string().min(4, "Este campo é obrigatório"),
  fullName: z.string().min(3, "Este campo é obrigatório"),
  cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido"),
  admin: z.boolean(),
});

type RegisterSchema = z.infer<typeof CreateRegisterSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(CreateRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleRegisterSubmit(formsData: RegisterSchema) {
    console.log("formsData", formsData);

    const [error] = await tryCatch(createUser(formsData));

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Usuário ${formsData.email} criado com sucesso`);
    navigate("/");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>Crie a sua conta agora.</CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <NavLink to="/">Sign In</NavLink>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="register_user"
            onSubmit={form.handleSubmit(handleRegisterSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          type="fullName"
                          placeholder="Nome Sobrenome"
                          {...field}
                        />
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
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          type="cpf"
                          placeholder="CPF sem máscara"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Senha de acesso"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="register_user" type="submit" className="w-full">
          Criar Usuário
        </Button>
      </CardFooter>
    </Card>
  );
}
