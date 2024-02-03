import { Container } from "common/Container";

export default function Success() {
  return (
    <section className={"py-8 bg-gray-100 flex-1"}>
      <Container>
        <div
          className={
            "flex flex-col items-center text-center gap-4 rounded-3xl bg-white mx-auto max-w-screen-lg py-28 md:py-32 lg:py-40 px-2"
          }
        >
          <p className={"text-4xl md:text-5xl font-semibold text-center"}>
            Thanks for your order!
          </p>
          <p className={"text-2xl md:text-3xl font-medium text-center"}>
            We will email you when your order will be sent.
          </p>
        </div>
      </Container>
    </section>
  );
}
