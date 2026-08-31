import React from "react";

type CardContainerProps = {
  title: string;
  children: React.ReactNode;
};

const CardContainer = ({ title, children }: CardContainerProps) => {
  return (
    <>
      <div className="border-2 border-brown-500 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="container-content">{children}</div>
      </div>
    </>
  );
};

export const MainApp = () => {
  return (
    <>
      <CardContainer title="Nota Belanja">
        {/* Cildren */}
        <p>1x Expresso {"(Rp 20.000)"}</p>
        <p>1x Croissant {"(Rp 18.000)"}</p>
        <button className="bg-green-500">Cetak Nota</button>
        {/* Cildren */}
      </CardContainer>
    </>
  );
};
