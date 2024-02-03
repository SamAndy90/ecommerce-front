"use client";

import { FormTextInput } from "common/FormInputs";
import { Button } from "common/ui";
import { getDefaults } from "utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useCartContext } from "context/cart-context";
import { OrderType, postOrder } from "data-fetchers/order";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const orderSchema = z.object({
  fullname: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .default(""),
  email: z.string().email().default(""),
  country: z.string().min(1, "Country must be filled").default(""),
  city: z.string().min(1, "City must be filled").default(""),
  postalcode: z.string().min(1, "Postal code must be filled").default(""),
  street: z.string().min(1, "Street must be filled").default(""),
});

type Form = z.infer<typeof orderSchema>;

export default function OrderForm() {
  const { cartProducts } = useCartContext();
  const router = useRouter();
  const form = useForm<Form>({
    resolver: zodResolver(orderSchema),
    defaultValues: getDefaults(orderSchema),
  });

  const sendOrder = useMutation({
    mutationKey: ["order"],
    mutationFn: postOrder,
  });

  async function onSubmit(data: Form) {
    const order: OrderType = { ...data, productsIds: cartProducts };
    sendOrder.mutate(order);
    // const res = await postOrder(order);
    console.log(sendOrder);
    console.log(sendOrder.data);

    // router.push(sendOrder.data.URL);

    form.reset(getDefaults(orderSchema));
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"bg-white p-4 rounded-lg overflow-hidden"}
      >
        <div className={"flex flex-col gap-2"}>
          <FormTextInput fieldName={"fullname"} placeholder={"Fullname"} />
          <FormTextInput fieldName={"email"} placeholder={"Email"} />
          <FormTextInput fieldName={"country"} placeholder={"Country"} />
          <div
            className={
              "flex sm:flex-row md:flex-col lg:flex-row flex-col gap-2"
            }
          >
            <FormTextInput
              fieldName={"city"}
              placeholder={"City"}
              className={{ container: "flex-1" }}
            />
            <FormTextInput
              fieldName={"postalcode"}
              placeholder={"Postal code"}
              className={{ container: "flex-1" }}
            />
          </div>
          <FormTextInput fieldName={"street"} placeholder={"Street"} />
          <Button type={"submit"}>Continue to payment</Button>
        </div>
      </form>
    </FormProvider>
  );
}
