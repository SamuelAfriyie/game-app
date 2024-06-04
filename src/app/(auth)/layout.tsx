import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}



const AuthLayout = ({ children }: LayoutProps) => {
    return (

        <main className="w-screen h-screen flex flex-row overflow-hidden">
            <section className="w-full xl:w-1/2 bg-white">{children}</section>
            
            <section className="w-0 h-0 xl:w-1/2 xl:h-full flex-1 bg-auth opacity-70">

                <div className="flex flex-col h-full justify-end items-start space-y-12 pl-10 pb-24 ">
                    <header className="flex flex-col space-y-3">
                        <p className="text-4xl font-bold text-white">{`A Better Learning Experience`}</p>
                        <p className="text-xl font-medium text-zinc-50">
                            {`Sign in to your account to continue`}
                        </p>
                    </header>
                </div>


            </section>

        </main>

    );
};

export default AuthLayout;

