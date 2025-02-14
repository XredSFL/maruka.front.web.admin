import * as React from "react";

export function StatCard({ value, label, highlighted }) {
  return (
    <div className={`flex overflow-hidden flex-col grow shrink justify-center p-8 bg-white rounded-3xl shadow-2xl w-[188px] ${
      highlighted ? 'border-4 border-green-900 border-solid' : ''
    } max-md:px-5`}>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl font-semibold text-green-900">
            {value}
          </div>
          <div className="text-base text-black text-opacity-50">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}