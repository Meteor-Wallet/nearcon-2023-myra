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
          className="w-[80%] p-10 m-auto bg- rounded-lg shadow-md lg:max-w-[60%] bg-neutral-focus"
        >
          <h1 className="text-3xl font-semibold text-center mb-5 tracking-widest">
            {/* <Logo /> APP NAME */}
            NEAR Insight
          </h1>
          <h2 className="text-center mb-5">
            Clear Blockchain Insights, Powered by AI
          </h2>
          <form className="space-y-4">
            <div className="flex gap-5">
              <motion.div
                variants={item}
                className="card w-[50%] bg-base-100 shadow-xl"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Chronos</h2>
                  <p>Complex queries made easy.</p>
                  <p>
                    Access comprehensive blockchain history through Google
                    BigQuery for in-depth insights powered by AI. Enjoy the
                    flexibility of pay-per-use.
                  </p>
                  <div className="card-actions">
                    <Link
                      className="btn btn-outline btn-accent w-full"
                      href="/chat/alexander"
                    >
                      Chat with Chronos
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="card w-[50%] bg-base-100 shadow-xl"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Pulse</h2>
                  <p>
                    Ask and receive blockchain answers quickly. Always free via
                    RPC.
                  </p>
                  <div className="card-actions">
                    <Link
                      className="btn btn-outline btn-accent w-full"
                      href="/chat/pulse"
                    >
                      Chat with Pulse
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
