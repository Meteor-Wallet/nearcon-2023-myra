"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./components/icons/Logo/Logo";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Page() {
  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-[url('/stacked-waves-haikei-2.svg')] bg-cover bg-no-repeat">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full p-10 m-auto bg- rounded-lg shadow-md lg:max-w-lg bg-neutral-focus"
        >
          <h1 className="text-3xl font-semibold text-center mb-5 tracking-widest">
            {/* <Logo /> APP NAME */}
            APP NAME
          </h1>
          <form className="space-y-4">
            <div className="flex flex-col gap-5">
              <motion.div variants={item}>
                <Link className="btn btn-accent w-full" href="/chat/myra">
                  Chat with Myra
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link
                  className="btn btn-outline btn-neutral w-full"
                  href="/chat/alexander"
                >
                  Chat with Alexander
                </Link>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
