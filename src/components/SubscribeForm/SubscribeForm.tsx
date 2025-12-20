import * as React from "react";
import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { subscribeFormSchema } from "./schema";

interface SubscribeFormProps {}

const SubscribeForm: React.FC<SubscribeFormProps> = ({}) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validators: {
      onSubmit: subscribeFormSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await fetch(
        `${import.meta.env.DEV ? "http://localhost:4321" : import.meta.env.SITE}/api/subscribe`,
        {
          method: "POST",
          body: JSON.stringify(value),
        },
      );

      const { code, message } = await response.json();

      if (code === "BAD_REQUEST") {
        toast.error(message);
        return;
      }

      if (code === "CONFLICT") toast.info(message);
      if (code === "SUCCESS") toast.success(message);

      // TODO: Style Sonner
      // if (data.message === "") toast.info(data.message);

      // toast("You submitted the following values:", {
      //   description: (
      //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
      //       <code>{JSON.stringify(value, null, 2)}</code>
      //     </pre>
      //   ),
      //   position: "bottom-right",
      //   classNames: {
      //     content: "flex flex-col gap-2",
      //   },
      //   style: {
      //     "--border-radius": "calc(var(--radius)  + 4px)",
      //   } as React.CSSProperties,
      // });
      // console.log(post);

      form.reset();
    },
  });

  // const firstName = useStore(form.store, (state) => state.values.firstName);
  // const lastName = useStore(form.store, (state) => state.values.lastName);
  // const email = useStore(form.store, (state) => state.values.email);
  // const errors = useStore(form.store, (state) => state.errorMap);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const { data, error } = await actions.subscribe(formData);
  //   if (error) {
  //     return toast.error(error.message);
  //   }
  //   toast.success(data);
  // };

  return (
    <>
      <form
        id="subscribe-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <FieldGroup className="gap-4">
          <form.Field
            name="firstName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  {/*<FieldLabel htmlFor={field.name}>First Name</FieldLabel>*/}
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="First Name"
                    autoComplete="off"
                    className="bg-muted text-muted-foreground"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="lastName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  {/*<FieldLabel htmlFor={field.name}>Last Name</FieldLabel>*/}
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Last Name"
                    autoComplete="off"
                    className="bg-muted text-muted-foreground"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  {/*<FieldLabel htmlFor={field.name}>Email</FieldLabel>*/}
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="mail@example.com"
                    autoComplete="off"
                    className="bg-muted text-muted-foreground"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} variant="footer-button">
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          )}
        />
      </form>
      <Toaster />
    </>
  );
};

export default SubscribeForm;
