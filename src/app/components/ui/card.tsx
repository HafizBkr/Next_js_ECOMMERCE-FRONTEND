import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border rounded-lg shadow p-4 bg-white">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2 mb-2 font-bold text-lg">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
