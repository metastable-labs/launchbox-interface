"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { LBClickAnimation, LBContainer, LBTokenCard } from "@/components";
import EmptyState from "./empty";
import { tokens } from "./dummy";
import { PlusIconAlt } from "@/public/icons";
import { Network } from "@/components/button/types";

const TokensView = ({ network }: { network: Network }) => {
  return (
    <LBContainer>
      <div className="pt-12 flex flex-col gap-[86px] lg:px-8 items-center pb-14">
        <div className="flex flex-col items-start gap-1 flex-1 self-stretch">
          <h1 className="text-primary-650 text-[30px] leading-[38px] font-Biform">
            Token launch
          </h1>
          <p className="text-base text-primary-700">
            Generate and deploy your own L2 tokens without coding
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {!Boolean(tokens.length) && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState network={network} />
            </motion.div>
          )}

          {Boolean(tokens.length) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="tokens-list"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-6 flex-1 self-stretch"
            >
              {tokens.map((token) => (
                <LBTokenCard key={token?.id} {...token} network={network} />
              ))}

              <Link href={`/${network}/tokens/new`}>
                <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-2 h-[275px] justify-center items-center">
                  <PlusIconAlt />

                  <span className="text-primary-2050 text-base">
                    Add new token
                  </span>
                </LBClickAnimation>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LBContainer>
  );
};

export default TokensView;
