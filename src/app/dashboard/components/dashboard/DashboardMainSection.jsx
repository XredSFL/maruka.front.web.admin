'use client';
import { StatCard } from './StatCard';
import { useEffect, useState } from 'react';

export function DashboardMainSection() {
    const [visitorStats, setVisitorStats] = useState([
        { value: "Loading...", label: "This Month" },
        { value: "Loading...", label: "Last Month", highlighted: true },
        { value: "Loading...", label: "Total" }
      ]);
    
      useEffect(() => {
        async function fetchAnalyticsData() {
          try {
            const response = await fetch('/api/analytics');
            const data = await response.json();
            setVisitorStats([
              { value: data.thisMonth, label: "This Month" },
              { value: data.lastMonth, label: "Last Month", highlighted: true },
              { value: data.total, label: "Total" }
            ]);
          } catch (error) {
            console.error('Failed to fetch analytics data:', error);
          }
        }
    
        fetchAnalyticsData();
      }, []);
  return (
    <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full min-h-[960px] max-md:mt-10 max-md:max-w-full">
                <header className="flex flex-wrap gap-10 justify-between items-center w-full text-base text-center max-md:max-w-full">
                  <form className="overflow-hidden self-stretch px-14 py-3.5 my-auto whitespace-nowrap bg-white rounded-3xl shadow-2xl min-w-[240px] w-[394px] max-md:px-5">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input
                      type="search"
                      id="search"
                      placeholder="Search"
                      className="w-full bg-transparent text-black text-opacity-50 outline-none"
                    />
                  </form>
                  
                  <div className="flex gap-3 items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ec5732d6df394edf0e6c8af0fd060efd25d2e80f74014841e12bc27c66bff4d?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                      alt="John Doe profile picture"
                      className="object-contain shrink-0 self-stretch my-auto w-12 shadow-2xl aspect-square"
                    />
                    <div className="flex flex-col items-start self-stretch my-auto">
                      <div className="font-semibold text-black">John Doe</div>
                      <div className="text-black text-opacity-50">3rd year</div>
                    </div>
                  </div>
                  <button aria-label="Notifications">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c32ad1a50f2bd2dc9e6afd4a2646cf9f9ed3d491ad525669fad08a77860502f?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                      alt=""
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                  </button>
                </header>
    
                <section className="flex overflow-hidden flex-col flex-1 mt-8 max-w-full bg-white">
                  <div className="flex flex-col w-full bg-white max-md:max-w-full">
                    <div className="flex overflow-hidden flex-col w-full rounded-3xl max-md:max-w-full" style={{backgroundImage: 'linear-gradient(324deg, rgba(179,179,179,1) 0%, rgba(154,183,164,1) 20%, rgba(53,112,73,1) 100%)'}}>
                      <div className="flex relative flex-col py-16 w-full bg-blend-overlay min-h-[326px] max-md:max-w-full">
                        <div className="flex relative flex-wrap justify-between items-start ps-8 w-full">
                          {/* <div className="mt-3 text-base text-center text-white">
                            September 4, 2023
                          </div> */}
                          <div className="gap-1.5 text-2xl font-black tracking-tight leading-none text-white">
                            PT. Maruka Indonesia
                          </div>
                        </div>
                        <div className="relative shrink-0 mt-12 h-px bg-white border border-white border-dashed opacity-40 max-md:mt-10 max-md:max-w-full" />
                        <div className="flex relative flex-col justify-between items-start self-start mt-11 ml-10 text-center text-white min-h-[73px] max-md:mt-10 max-md:ml-2.5">
                          <h1 className="text-3xl font-semibold">
                            Welcome back, John!
                          </h1>
                          <p className="mt-2.5 text-base">
                            Always stay updated in your student portal
                          </p>
                        </div>
                      </div>
                    </div>
    
                    <div className="flex flex-wrap gap-10 items-start mt-12 max-md:mt-10 max-md:max-w-full">
                      <div className="flex flex-col min-w-[240px] max-md:max-w-full">
                        <h2 className="text-xl font-semibold text-green-900 max-md:max-w-full">
                          Visitor
                        </h2>
                        <div className="flex flex-wrap gap-6 items-start mt-3 w-full text-center max-md:max-w-full">
                          {visitorStats.map((stat, index) => (
                            <StatCard
                              key={index}
                              value={stat.value}
                              label={stat.label}
                              highlighted={stat.highlighted}
                            />
                          ))}
                        </div>
                      </div>
    
                      <div className="flex flex-col text-xl font-semibold text-green-900 min-w-[240px] w-[292px]">
                        <h2>Most Visitors</h2>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/024354bc09b3ef91c3666abd16f33f8177ce8ddc8189707e732444487907c88e?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                          alt="Visitor statistics chart"
                          className="object-contain gap-0 mt-6 w-full aspect-[7.3]"
                        />
                        <button className="gap-10 self-stretch mt-6 w-full text-center">
                          See all
                        </button>
                      </div>
                    </div>
    
                    <div className="flex flex-col justify-center p-6 mt-12 w-full bg-white rounded-3xl shadow-[8px_8px_48px_rgba(0,0,0,0.08)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                      <div className="flex flex-col w-full max-md:max-w-full">
                        <h2 className="text-xl font-semibold text-green-900 max-md:max-w-full">
                          Visitors Country
                        </h2>
                        <p className="mt-1.5 text-sm leading-snug text-slate-400 max-md:max-w-full">
                          <span className="text-green-400">(+5) more</span>
                          <span className=""> in 2021</span>
                        </p>
                      </div>
                      <div className="flex flex-col mt-10 w-full max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                          <div className="flex justify-between items-center w-full max-md:max-w-full">
                            <div className="flex self-stretch my-auto min-h-[192px] w-[22px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>
  )
}