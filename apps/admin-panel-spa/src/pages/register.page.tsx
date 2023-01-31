import { Link } from "react-router-dom";
import { RegistrationForm } from "../features/auth/ui/RegistrationForm/RegistrationForm";

function RegisterPage() {
  return (
    <section className="flex flex-col h-full bg-gray-200 md:flex-row">
      <main className="m-4 bg-black rounded-2xl flex-[2_2_0%] text-white">
        <header className="flex justify-between w-full px-20 pt-10 text-xs text-white md:absolute h-14">
          <span>Logo</span>
          <span className="md:text-black">{"[in progress...]"}</span>
        </header>
        <div className="flex flex-col justify-center h-full max-w-xs mx-auto ">
          <h1 className="text-2xl">Registration</h1>
          <p className="mt-2 mb-12 text-xs text-gray-400">
            We are software development team that offers a wide <br /> range of
            services.
          </p>
          <RegistrationForm />
        </div>
        <span className="text-xs text-left text-white md:pl-20 md:absolute bottom-14 ">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login!
          </Link>
        </span>
      </main>
      <div className="items-center justify-center flex-1 hidden md:flex">
        <img
          loading="lazy"
          className="max-w-[300px]"
          src="images/entering.png"
          alt="Entering"
        />
      </div>
    </section>
  );
}

export default RegisterPage;
