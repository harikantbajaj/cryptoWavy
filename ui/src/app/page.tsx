"use client";

import { useUser } from "@/components/AuthContext";
import { AuthDialog } from "@/components/AuthDialog";
import { ChatInterface } from "@/components/ChatInterface";
import { CryptoNews } from "@/components/CryptoNews";
import { CryptoTicker } from "@/components/CryptoTicker";
import { FeaturedCoins } from "@/components/FeaturedCoins";
import { PriceChart } from "@/components/PriceChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveSubscriber } from "@/lib/appwrite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Github, Twitter, BarChart3, MessageCircle, Newspaper, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const queryClient = new QueryClient();

const Index = () => {
  const user = useUser();
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await saveSubscriber(subscriberEmail);
      toast.success("Success!", {
        description: "You are now subscribed to our newsletter.",
      });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CryptoWavy
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <AuthDialog />
            </div>
          </nav>

          {/* Hero Section */}
          <section className="container mx-auto px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Future of Crypto
                </span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>
              {user.current ? (
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                  Welcome back, <span className="text-blue-400 font-semibold">{user.current.name.split(" ")[0]}</span>! Ready to explore the crypto universe with AI-powered insights?
                </p>
              ) : (
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                  Harness the power of AI for cryptocurrency analysis, real-time market insights, and intelligent trading decisions.
                </p>
              )}
            </div>
          </section>

          {/* Ticker */}
          <section className="border-y border-white/10 bg-black/20 backdrop-blur-sm">
            <CryptoTicker />
          </section>

          {/* Main Content */}
          <section className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
              {/* Top Performers */}
              <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  <span>Top Performers</span>
                </h2>
                <FeaturedCoins />
              </div>

              {/* Market Overview */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Market Overview</h2>
                </div>
                <PriceChart />
              </div>
            </div>

            {/* AI Chat */}
            <div className="mb-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">AI Crypto Assistant</h2>
                
              </div>
              <div className="min-h-[400px]">
                <ChatInterface coinId={"any cryptocurrency"} />
              </div>
            </div>

            {/* News */}
            <div className="mb-16 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Newspaper className="w-6 h-6 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">Latest Crypto News</h2>
              </div>
              <CryptoNews />
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-8 md:p-12 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Ahead of the Market</h3>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Get exclusive crypto insights, market analysis, and AI-powered predictions delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading}
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-12 px-8 rounded-xl font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">CryptoWavy</div>
                    <div className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <Link href="https://www.linkedin.com/in/harikant/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="https://github.com/harikantbajaj" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link href="https://x.com/harikantbajaj08" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-300">
                    <Twitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Index;
