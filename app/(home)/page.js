import Image from "next/image";
import Jumbotron from "../components/site/home/jumbotron";
import CTA1 from "../components/site/home/CTA1";
export default function Home() {
  return (
    <div>
      <Jumbotron />
      <CTA1 />
    </div>
  );
}
