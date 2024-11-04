"use client";

import Image from "next/image";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { getGeneralPaymasterInput } from "viem/zksync";
import { parseAbi } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";

export default function Welcome() {
  const { logout } = useLoginWithAbstract();
  const { address, status } = useAccount();
  const router = useRouter();
  const { writeContractSponsored, data: transactionHash } = useWriteContractSponsored();
  const { data: transactionReceipt } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (status !== "connected") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen relative bg-pink-50 font-[family-name:var(--font-roobert)]">
      {}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffd1d1_1px,transparent_1px),linear-gradient(to_bottom,#ffd1d1_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-transparent to-pink-50/50" />
      </div>

      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {['✨', '💖', '🌟', '💫'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="animate-bounce-slow">
            <Image
              src="/abs.svg"
              alt="Abstract"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 animate-pulse font-[family-name:var(--font-avenue-mono)]">
            You&apos;re connected!
          </h1>

          <p className="text-2xl text-pink-500 animate-fade-in">
          </p>

          <div className="backdrop-blur-xl bg-white/60 border-2 border-pink-200 rounded-2xl p-4 md:p-8 shadow-xl space-y-4">
            <p className="text-pink-600 font-medium">your awesome wallet:</p>
            <a 
              href={`https://explorer.testnet.abs.xyz/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-75 transition-opacity"
            >
              <p className="font-[family-name:var(--font-avenue-mono)] text-xs md:text-sm bg-pink-100/50 rounded-lg p-3 text-pink-500 break-all">
                {address}
              </p>
            </a>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
            <button
              onClick={logout}
              className="group px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm md:text-base font-[family-name:var(--font-roobert)] hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
            >
              <span className="flex items-center gap-2">
                Disconnect 
                <span className="group-hover:rotate-180 transition-transform duration-300">
                </span>
              </span>
            </button>

            <button
              onClick={() =>
                writeContractSponsored({
                  abi: parseAbi([
                    "function mint(address,uint256) external",
                  ]),
                  address: "0xC4822AbB9F05646A9Ce44EFa6dDcda0Bf45595AA",
                  functionName: "mint",
                  args: [address! || "0x", BigInt(1)],
                  paymaster: "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
                  paymasterInput: getGeneralPaymasterInput({
                    innerInput: "0x",
                  }),
                })
              }
              className="group px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm md:text-base font-[family-name:var(--font-roobert)] hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
            >
              <span className="flex items-center gap-2">
                Submit Transaction
              </span>
            </button>
            
            <a
              href="https://docs.abs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 md:px-6 py-2 md:py-3 rounded-full bg-white text-pink-500 text-sm md:text-base font-[family-name:var(--font-roobert)] hover:bg-pink-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
            >
              <span className="flex items-center gap-2">
                Learn More 
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                </span>
              </span>
            </a>
          </div>

          {!!transactionReceipt && (
            <div className="mt-6 backdrop-blur-xl bg-white/60 border-2 border-pink-200 rounded-2xl p-4 md:p-6 shadow-xl">
              <p className="text-pink-600 font-medium mb-2">Transaction Status:</p>
              <a
                href={`https://explorer.testnet.abs.xyz/tx/${transactionReceipt?.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-75 transition-opacity"
              >
                <div className="space-y-2">
                  <p className="font-[family-name:var(--font-avenue-mono)] text-xs md:text-sm bg-pink-100/50 rounded-lg p-3 text-pink-500">
                    Status: {transactionReceipt?.status === 'success' ? '✅ Success' : '❌ Failed'}
                  </p>
                  <p className="font-[family-name:var(--font-avenue-mono)] text-xs bg-pink-100/50 rounded-lg p-3 text-pink-500 break-all">
                    TX: {transactionReceipt?.transactionHash?.slice(0, 8)}...
                    {transactionReceipt?.transactionHash?.slice(-6)}
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}