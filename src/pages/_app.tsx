import { Provider as NextAuthProvider } from "next-auth/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AppProps } from "next/app";
import { Header } from "../components/Header";
import Image from "next/image";
import "../styles/global.scss";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

const initialOptions = {
  "client-id":
    "AXfH1Ocz3BxdqFHoKmi1oUD6sPHGbwDgkJ_La40BWx98zyAL9MCee4fD_fzyAAsPu9phbwgCAkPqHjHu",
  currency: "BRL",
  intent: "capture",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />

        <Image
          src="/images/gradient-left.svg"
          alt="gradient left"
          className="gradient-left"
          width={1266}
          height={1211}
          style={{
            objectFit: "contain",
          }}
        />

        <Image
          src="/images/gradient-right.svg"
          alt="gradient right"
          className="gradient-right"
          width={1600}
          height={1590}
          style={{
            objectFit: "contain",
          }}
        />
      </PayPalScriptProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
