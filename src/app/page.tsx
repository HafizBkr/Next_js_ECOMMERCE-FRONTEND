import Image from "next/image";
import Navbar from "./components/Navbar"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from "./Mainstore/page"

import "./globals.css";


export default function Home() {
  return (
    <div>
         <Navbar></Navbar>
         <div style={{marginTop:"5%"}}>
         <Main></Main>
         </div>
    </div>
  );
}
