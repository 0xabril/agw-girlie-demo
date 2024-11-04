"use client";

import Image from "next/image";
import { useLoginWithAbstract, useWriteContractSponsored } from "@abstract-foundation/agw-react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getGeneralPaymasterInput } from "viem/zksync";
import { parseAbi } from "viem";

export default function Home() {
  const { login } = useLoginWithAbstract();
  const { status, address } = useAccount();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { writeContractSponsored, data: transactionHash } = useWriteContractSponsored();
  const { data: transactionReceipt } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (status === "connected") {
      router.push("/welcome");
    }
  }, [status, router]);

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (showPopup) return;
    
    const { clientX, clientY } = e;
    setClickCount(prev => prev + 1);
    

    const emoji = ['💖', '💝', '💕', '💗'][Math.floor(Math.random() * 4)];
    const explosion = document.createElement('div');
    explosion.innerText = emoji;
    explosion.style.position = 'fixed';
    explosion.style.left = `${clientX}px`;
    explosion.style.top = `${clientY}px`;
    explosion.style.pointerEvents = 'none';
    explosion.className = 'animate-explosion';
    document.body.appendChild(explosion);
    
    setTimeout(() => explosion.remove(), 1000);
  }, [showPopup]);

  return (
    <div 
      className="min-h-screen relative bg-gradient-to-br from-pink-200 via-white to-pink-100 cursor-pointer font-[family-name:var(--font-roobert)]"
      onClick={handleBackgroundClick}
    >
      {}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#ffb6c1,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_100%,#ffd1dc,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_50%,#ffe4e1,transparent)]" />
        <div className="absolute w-full h-full opacity-30">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff2f4_0px,#fff2f4_1px,transparent_2px,transparent_12px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#fff2f4_0px,#fff2f4_1px,transparent_2px,transparent_12px)]" />
        </div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${Math.random() * 15 + 10}px`
            }}
          >
            {['💖', '💝', '💕', '💗'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {}
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-8 max-w-xl mx-auto">
          <h1 className="text-5xl font-bold text-pink-600 hover:scale-105 transition-transform duration-300 font-[family-name:var(--font-avenue-mono)]">
            Welcome to Abstract!
          </h1>

          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
          >
            <span className="flex items-center gap-2">
              <Image
                src="/abs.svg"
                alt="Abstract"
                width={20}
                height={20}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              Connect Wallet
            </span>
          </button>
        </div>
      </div>

      {}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          <div className="relative bg-white/80 backdrop-blur-xl border-2 border-pink-200 rounded-2xl p-8 shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 max-w-md w-full mx-4 animate-scale-up">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-pink-600 font-[family-name:var(--font-avenue-mono)]">
                Connect Wallet
              </h2>
              
              {status === "reconnecting" || status === "connecting" ? (
                <div className="p-8">
                  <div className="animate-spin">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 p-1 mx-auto">
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                        <Image src="/abs.svg" alt="Loading" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
                  onClick={login}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Image
                      src="/abs.svg"
                      alt="Abstract"
                      width={20}
                      height={20}
                      className="group-hover:rotate-180 transition-transform duration-500"
                    />
                    Connect with Abstract
                  </span>
                </button>
              )}

              {status === "connected" && (
                <button
                  className="mt-4 w-full px-8 py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-medium hover:from-pink-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-300/50"
                  onClick={() =>
                    writeContractSponsored({
                      abi: parseAbi([
                        "function mint(address,uint256) external",
                      ]),
                      address: "0xC4822AbB9F05646A9Ce44EFa6dDcda0Bf45595AA",
                      functionName: "mint",
                      args: [address, BigInt(1)],
                      paymaster: "0x5407B5040dec3D339A9247f3654E59EEccbb6391",
                      paymasterInput: getGeneralPaymasterInput({
                        innerInput: "0x",
                      }),
                    })
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    Sign Transaction
                  </span>
                </button>
              )}

              {!!transactionReceipt && (
                <div className="mt-4 text-sm text-pink-600 font-[family-name:var(--font-avenue-mono)]">
                  <a
                    href={`https://explorer.testnet.abs.xyz/tx/${transactionReceipt?.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-700"
                  >
                    Transaction Status: {transactionReceipt?.status}
                    <div className="text-xs text-pink-400">
                      {transactionReceipt?.transactionHash?.slice(0, 8)}...
                      {transactionReceipt?.transactionHash?.slice(-6)}
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {clickCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-pink-500 font-medium shadow-lg font-[family-name:var(--font-avenue-mono)]">
          Hearts spawned: {clickCount}
        </div>
      )}
    </div>
  );
}
